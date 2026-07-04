'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Types ─────────────────────────────────────────────── */
type Order = {
  id: string; createdAt: string; service: string; packageType: string | null
  company: string | null; industry: string | null; budget: string | null
  timeline: string | null; referenceUrl: string | null; description: string
  name: string; email: string; phone: string | null
  status: string; adminNotes: string | null
}

type Contact = {
  id: string; createdAt: string; name: string; email: string
  service: string | null; message: string; status: string
}

/* ── Constants ─────────────────────────────────────────── */
const WA = process.env.NEXT_PUBLIC_WA_NUMBER ?? '6281234567890'

const ORDER_STATUS = [
  { value: 'new',       label: 'Baru',      color: '#3b82f6' },
  { value: 'reviewing', label: 'Ditinjau',  color: '#f59e0b' },
  { value: 'accepted',  label: 'Diterima',  color: '#22c55e' },
  { value: 'rejected',  label: 'Ditolak',   color: '#ef4444' },
]

const CONTACT_STATUS = [
  { value: 'unread',   label: 'Belum dibaca', color: '#3b82f6' },
  { value: 'read',     label: 'Sudah dibaca', color: '#6b7280' },
  { value: 'archived', label: 'Diarsipkan',   color: '#9ca3af' },
]

/* ── Helpers ───────────────────────────────────────────── */
function fmt(d: string) {
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function fmtTime(d: string) {
  return new Date(d).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

function StatusBadge({ status, options }: { status: string; options: typeof ORDER_STATUS }) {
  const s = options.find(o => o.value === status) ?? options[0]
  return (
    <span style={{ padding: '3px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700, background: `${s.color}20`, color: s.color, border: `1px solid ${s.color}40`, whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  )
}

function exportCSV(orders: Order[]) {
  const cols = ['ID','Tanggal','Nama','Email','WA','Perusahaan','Industri','Layanan','Paket','Budget','Timeline','Status','Catatan Admin','Deskripsi']
  const rows = orders.map(o => [
    o.id, fmt(o.createdAt), o.name, o.email, o.phone ?? '', o.company ?? '',
    o.industry ?? '', o.service, o.packageType ?? '', o.budget ?? '', o.timeline ?? '',
    o.status, o.adminNotes ?? '', `"${(o.description ?? '').replace(/"/g, '""')}"`
  ])
  const csv = [cols, ...rows].map(r => r.join(',')).join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  a.download = `orders-${new Date().toISOString().slice(0,10)}.csv`
  a.click()
}

/* ── Main Component ────────────────────────────────────── */
export default function AdminClient() {
  const [authed, setAuthed]         = useState(false)
  const [password, setPassword]     = useState('')
  const [authError, setAuthError]   = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [tab, setTab]               = useState<'orders' | 'contacts'>('orders')

  /* Orders state */
  const [orders, setOrders]         = useState<Order[]>([])
  const [ordersLoading, setOL]      = useState(false)
  const [expandedOrder, setEO]      = useState<string | null>(null)
  const [filterStatus, setFilter]   = useState('all')
  const [filterService, setFS]      = useState('all')
  const [search, setSearch]         = useState('')
  const [notes, setNotes]           = useState<Record<string, string>>({})
  const [saving, setSaving]         = useState<string | null>(null)
  const [deleting, setDeleting]     = useState<string | null>(null)

  /* Contacts state */
  const [contacts, setContacts]     = useState<Contact[]>([])
  const [contactsLoading, setCL]    = useState(false)
  const [expandedContact, setEC]    = useState<string | null>(null)
  const [contactFilter, setCF]      = useState('all')

  /* ── Fetch ── */
  const fetchOrders = useCallback(async () => {
    setOL(true)
    const res = await fetch('/api/orders')
    if (res.ok) setOrders(await res.json())
    setOL(false)
  }, [])

  const fetchContacts = useCallback(async () => {
    setCL(true)
    const res = await fetch('/api/contacts')
    if (res.ok) setContacts(await res.json())
    setCL(false)
  }, [])

  useEffect(() => {
    if (authed) {
      const fetchData = async () => {
        await fetchOrders()
        await fetchContacts()
      }
      fetchData()
    }
  }, [authed, fetchOrders, fetchContacts])

  /* ── Auth ── */
  async function login(e: React.FormEvent) {
    e.preventDefault()
    setAuthLoading(true); setAuthError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) setAuthed(true)
    else { const d = await res.json(); setAuthError(d.error ?? 'Login gagal') }
    setAuthLoading(false)
  }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setAuthed(false); setOrders([]); setContacts([])
  }

  /* ── Order actions ── */
  async function updateOrderStatus(id: string, status: string) {
    setSaving(id)
    await fetch(`/api/orders/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    setSaving(null)
  }

  async function saveNotes(id: string) {
    setSaving(id)
    await fetch(`/api/orders/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ adminNotes: notes[id] ?? '' }) })
    setOrders(prev => prev.map(o => o.id === id ? { ...o, adminNotes: notes[id] ?? null } : o))
    setSaving(null)
  }

  async function deleteOrder(id: string) {
    if (!confirm('Hapus pesanan ini? Tindakan tidak bisa dibatalkan.')) return
    setDeleting(id)
    await fetch(`/api/orders/${id}`, { method: 'DELETE' })
    setOrders(prev => prev.filter(o => o.id !== id))
    if (expandedOrder === id) setEO(null)
    setDeleting(null)
  }

  /* ── Contact actions ── */
  async function updateContactStatus(id: string, status: string) {
    await fetch(`/api/contacts/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c))
  }

  async function deleteContact(id: string) {
    if (!confirm('Hapus pesan ini?')) return
    await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
    setContacts(prev => prev.filter(c => c.id !== id))
    if (expandedContact === id) setEC(null)
  }

  /* ── WA deeplink ── */
  function openWA(order: Order) {
    const msg = encodeURIComponent(
      `Halo ${order.name}! 👋\n\nTerima kasih sudah menghubungi one2many.\n\nKami telah menerima brief Anda untuk layanan *${order.service}*${order.packageType ? ` (${order.packageType})` : ''}.\n\nKami akan segera membalas dengan detail proposal dan langkah selanjutnya. Ada yang bisa kami bantu sementara?`
    )
    window.open(`https://wa.me/${WA}?text=${msg}`, '_blank')
  }

  /* ── Login screen ── */
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: 400, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: 48 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto 16px' }}>
              <i className="fas fa-lock" />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Admin Panel</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 6 }}>one2many — Dashboard Operasional</p>
          </div>
          <form onSubmit={login}>
            <input type="password" placeholder="Password admin" value={password} onChange={e => setPassword(e.target.value)} required autoFocus
              style={{ width: '100%', padding: '12px 14px', marginBottom: 12, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
            />
            {authError && <p style={{ color: '#ef4444', fontSize: '0.82rem', marginBottom: 12 }}>{authError}</p>}
            <button type="submit" disabled={authLoading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {authLoading ? <><i className="fas fa-spinner fa-spin" /> Masuk...</> : 'Masuk'}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  /* ── Derived ── */
  const serviceList = ['all', ...Array.from(new Set(orders.map(o => o.service)))]

  const displayedOrders = orders.filter(o => {
    if (filterStatus !== 'all' && o.status !== filterStatus) return false
    if (filterService !== 'all' && o.service !== filterService) return false
    if (search) {
      const q = search.toLowerCase()
      return o.name.toLowerCase().includes(q) || o.email.toLowerCase().includes(q) || (o.company ?? '').toLowerCase().includes(q)
    }
    return true
  })

  const displayedContacts = contactFilter === 'all' ? contacts : contacts.filter(c => c.status === contactFilter)

  const orderCounts  = ORDER_STATUS.reduce((a, s) => ({ ...a, [s.value]: orders.filter(o => o.status === s.value).length }), {} as Record<string, number>)
  const unreadCount  = contacts.filter(c => c.status === 'unread').length

  return (
    <div style={{ minHeight: '100vh', padding: '80px 0 80px' }}>
      <div className="wrap">

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="section-label">Admin Panel</span>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, marginTop: 4 }}>Dashboard <span style={{ color: 'var(--accent)' }}>Operasional</span></h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => exportCSV(orders)} className="btn btn-ghost" style={{ fontSize: '0.82rem' }}>
              <i className="fas fa-download" /> Export CSV
            </button>
            <button onClick={loadAllData} className="btn btn-ghost" style={{ fontSize: '0.82rem' }}>
              <i className="fas fa-sync-alt" /> Refresh
            </button>
            <button onClick={logout} className="btn btn-ghost" style={{ fontSize: '0.82rem' }}>
              <i className="fas fa-sign-out-alt" /> Keluar
            </button>
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: 32 }}>
          {[
            { label: 'Total Order',  value: orders.length,                    color: 'var(--accent)' },
            ...ORDER_STATUS.map(s => ({ label: s.label, value: orderCounts[s.value] ?? 0, color: s.color })),
            { label: 'Pesan Masuk',  value: contacts.length,                  color: '#8b5cf6' },
            { label: 'Belum Dibaca', value: unreadCount,                      color: '#ec4899' },
          ].map(c => (
            <div key={c.label} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '18px 18px' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: c.color, lineHeight: 1 }}>{c.value}</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 6, fontWeight: 600 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
          {([
            { id: 'orders',   label: 'Pesanan',       count: orders.length },
            { id: 'contacts', label: 'Pesan Kontak',  count: contacts.length, badge: unreadCount },
          ] as { id: 'orders' | 'contacts'; label: string; count: number; badge?: number }[]).map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                padding: '10px 20px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
                border: 'none', background: 'transparent', position: 'relative',
                color: tab === t.id ? 'var(--accent)' : 'var(--text-muted)',
                borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent',
                transition: 'all 0.15s',
              }}>
              {t.label}
              {!!t.badge && (
                <span style={{ marginLeft: 6, background: '#ec4899', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '1px 6px', borderRadius: 100 }}>
                  {t.badge}
                </span>
              )}
              <span style={{ marginLeft: 6, color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 500 }}>({t.count})</span>
            </button>
          ))}
        </div>

        {/* ════════════════ ORDERS TAB ════════════════ */}
        {tab === 'orders' && (
          <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Filters */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                placeholder="Cari nama, email, perusahaan…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, minWidth: 200, padding: '8px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text)', fontSize: '0.85rem', outline: 'none' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
              />
              <select value={filterService} onChange={e => setFS(e.target.value)}
                style={{ padding: '8px 12px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text)', fontSize: '0.82rem', cursor: 'pointer', outline: 'none' }}>
                {serviceList.map(s => <option key={s} value={s}>{s === 'all' ? 'Semua Layanan' : s}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
              {[{ value: 'all', label: 'Semua' }, ...ORDER_STATUS].map(f => (
                <button key={f.value} onClick={() => setFilter(f.value)} style={{
                  padding: '5px 14px', borderRadius: 100, fontSize: '0.78rem', fontWeight: 600,
                  border: `1px solid ${filterStatus === f.value ? 'var(--accent)' : 'var(--border)'}`,
                  background: filterStatus === f.value ? 'var(--accent)' : 'transparent',
                  color: filterStatus === f.value ? '#000' : 'var(--text-muted)', cursor: 'pointer',
                }}>{f.label}</button>
              ))}
              <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                {displayedOrders.length} dari {orders.length}
              </span>
            </div>

            {/* Order list */}
            {ordersLoading ? (
              <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
                <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.5rem' }} />
              </div>
            ) : displayedOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', color: 'var(--text-muted)' }}>
                <i className="fas fa-inbox" style={{ fontSize: '2rem', marginBottom: 12, display: 'block', opacity: 0.4 }} />
                Tidak ada pesanan ditemukan
              </div>
            ) : (
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                {displayedOrders.map((order, i) => (
                  <div key={order.id} style={{ borderBottom: i < displayedOrders.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    {/* Row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: expandedOrder === order.id ? 'var(--bg-surface)' : 'var(--bg)', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 140, cursor: 'pointer' }} onClick={() => setEO(expandedOrder === order.id ? null : order.id)}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 2 }}>{order.name}</div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{order.email}</div>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minWidth: 110 }} onClick={() => setEO(expandedOrder === order.id ? null : order.id)}>
                        {order.service}{order.packageType ? <><br /><span style={{ fontSize: '0.72rem' }}>{order.packageType}</span></> : null}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }} onClick={() => setEO(expandedOrder === order.id ? null : order.id)}>
                        {fmt(order.createdAt)}<br />{fmtTime(order.createdAt)}
                      </div>
                      <StatusBadge status={order.status} options={ORDER_STATUS} />
                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        {order.phone && (
                          <button onClick={() => openWA(order)} title="Balas via WhatsApp"
                            style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #22c55e40', background: '#22c55e15', color: '#22c55e', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fab fa-whatsapp" />
                          </button>
                        )}
                        <button onClick={() => deleteOrder(order.id)} disabled={deleting === order.id} title="Hapus pesanan"
                          style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #ef444440', background: '#ef444415', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {deleting === order.id ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-trash" />}
                        </button>
                        <button onClick={() => setEO(expandedOrder === order.id ? null : order.id)}
                          style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className={`fas fa-chevron-${expandedOrder === order.id ? 'up' : 'down'}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expanded */}
                    <AnimatePresence>
                      {expandedOrder === order.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
                          <div style={{ padding: '20px 22px 28px', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 22 }}>
                              {/* Detail */}
                              <div>
                                <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>Detail Pesanan</p>
                                {([
                                  ['ID',          order.id],
                                  ['Layanan',     order.service],
                                  ['Paket',       order.packageType || '—'],
                                  ['Perusahaan',  order.company     || '—'],
                                  ['Industri',    order.industry    || '—'],
                                  ['Budget',      order.budget      || '—'],
                                  ['Timeline',    order.timeline    || '—'],
                                  ['WhatsApp',    order.phone       || '—'],
                                  ['Ref URL',     order.referenceUrl|| '—'],
                                ] as [string, string][]).map(([k, v]) => (
                                  <div key={k} style={{ display: 'flex', gap: 10, marginBottom: 7, fontSize: '0.83rem' }}>
                                    <span style={{ color: 'var(--text-muted)', width: 84, flexShrink: 0 }}>{k}</span>
                                    <span style={{ fontWeight: 500, wordBreak: 'break-all' }}>{v}</span>
                                  </div>
                                ))}
                              </div>
                              {/* Deskripsi */}
                              <div>
                                <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>Deskripsi</p>
                                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{order.description}</p>
                              </div>
                            </div>

                            {/* Status + Notes */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Update Status</label>
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                  {ORDER_STATUS.map(s => (
                                    <button key={s.value} onClick={() => updateOrderStatus(order.id, s.value)} disabled={saving === order.id}
                                      style={{ padding: '5px 12px', borderRadius: 100, fontSize: '0.74rem', fontWeight: 700, border: `1px solid ${s.color}`, background: order.status === s.value ? s.color : 'transparent', color: order.status === s.value ? '#fff' : s.color, cursor: 'pointer', opacity: saving === order.id ? 0.6 : 1 }}>
                                      {s.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Catatan Admin</label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                  <input
                                    value={notes[order.id] ?? (order.adminNotes ?? '')}
                                    onChange={e => setNotes(n => ({ ...n, [order.id]: e.target.value }))}
                                    placeholder="Catatan internal…"
                                    style={{ flex: 1, padding: '8px 12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text)', fontSize: '0.82rem', outline: 'none' }}
                                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                                  />
                                  <button onClick={() => saveNotes(order.id)} disabled={saving === order.id} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
                                    {saving === order.id ? <i className="fas fa-spinner fa-spin" /> : 'Simpan'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ════════════════ CONTACTS TAB ════════════════ */}
        {tab === 'contacts' && (
          <motion.div key="contacts" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Filter pills */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
              {[{ value: 'all', label: 'Semua' }, ...CONTACT_STATUS].map(f => (
                <button key={f.value} onClick={() => setCF(f.value)} style={{
                  padding: '5px 14px', borderRadius: 100, fontSize: '0.78rem', fontWeight: 600,
                  border: `1px solid ${contactFilter === f.value ? 'var(--accent)' : 'var(--border)'}`,
                  background: contactFilter === f.value ? 'var(--accent)' : 'transparent',
                  color: contactFilter === f.value ? '#000' : 'var(--text-muted)', cursor: 'pointer',
                }}>{f.label}</button>
              ))}
              <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                {displayedContacts.length} pesan
              </span>
            </div>

            {contactsLoading ? (
              <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
                <i className="fas fa-spinner fa-spin" style={{ fontSize: '1.5rem' }} />
              </div>
            ) : displayedContacts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', color: 'var(--text-muted)' }}>
                <i className="fas fa-envelope-open" style={{ fontSize: '2rem', marginBottom: 12, display: 'block', opacity: 0.4 }} />
                Tidak ada pesan
              </div>
            ) : (
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                {displayedContacts.map((c, i) => (
                  <div key={c.id} style={{ borderBottom: i < displayedContacts.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    {/* Row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: expandedContact === c.id ? 'var(--bg-surface)' : c.status === 'unread' ? 'color-mix(in srgb, var(--accent) 4%, var(--bg))' : 'var(--bg)', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 140, cursor: 'pointer' }} onClick={() => { setEC(expandedContact === c.id ? null : c.id); if (c.status === 'unread') updateContactStatus(c.id, 'read') }}>
                        <div style={{ fontWeight: c.status === 'unread' ? 800 : 600, fontSize: '0.9rem', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                          {c.status === 'unread' && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b82f6', display: 'inline-block', flexShrink: 0 }} />}
                          {c.name}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{c.email}</div>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 2, cursor: 'pointer' }}
                        onClick={() => { setEC(expandedContact === c.id ? null : c.id); if (c.status === 'unread') updateContactStatus(c.id, 'read') }}>
                        {c.service && <span style={{ color: 'var(--accent)', fontWeight: 600, marginRight: 6 }}>[{c.service}]</span>}
                        {c.message}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                        {fmt(c.createdAt)}
                      </div>
                      <StatusBadge status={c.status} options={CONTACT_STATUS} />
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <button onClick={() => { window.location.href = `mailto:${c.email}?subject=Re: Brief dari one2many&body=Halo ${c.name},%0D%0A%0D%0A` }} title="Balas via Email"
                          style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--accent)40', background: 'var(--accent-dim)', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-reply" />
                        </button>
                        <button onClick={() => deleteContact(c.id)} title="Hapus pesan"
                          style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #ef444440', background: '#ef444415', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="fas fa-trash" />
                        </button>
                        <button onClick={() => { setEC(expandedContact === c.id ? null : c.id); if (c.status === 'unread') updateContactStatus(c.id, 'read') }}
                          style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className={`fas fa-chevron-${expandedContact === c.id ? 'up' : 'down'}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expanded */}
                    <AnimatePresence>
                      {expandedContact === c.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
                          <div style={{ padding: '20px 24px 28px', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 20 }}>
                              <div>
                                <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>Info Pengirim</p>
                                {([['Nama', c.name], ['Email', c.email], ['Layanan', c.service ?? '—'], ['Diterima', `${fmt(c.createdAt)} ${fmtTime(c.createdAt)}`]] as [string,string][]).map(([k,v]) => (
                                  <div key={k} style={{ display: 'flex', gap: 10, marginBottom: 7, fontSize: '0.83rem' }}>
                                    <span style={{ color: 'var(--text-muted)', width: 80, flexShrink: 0 }}>{k}</span>
                                    <span style={{ fontWeight: 500 }}>{v}</span>
                                  </div>
                                ))}
                              </div>
                              <div>
                                <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>Pesan</p>
                                <p style={{ fontSize: '0.85rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', color: 'var(--text)' }}>{c.message}</p>
                              </div>
                            </div>
                            {/* Status actions */}
                            <div>
                              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Tandai sebagai</label>
                              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                {CONTACT_STATUS.map(s => (
                                  <button key={s.value} onClick={() => updateContactStatus(c.id, s.value)}
                                    style={{ padding: '5px 12px', borderRadius: 100, fontSize: '0.74rem', fontWeight: 700, border: `1px solid ${s.color}`, background: c.status === s.value ? s.color : 'transparent', color: c.status === s.value ? '#fff' : s.color, cursor: 'pointer' }}>
                                    {s.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  )
}
