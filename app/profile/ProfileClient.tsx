'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

/* ── Dummy data ─────────────────────────────── */
const USER = {
  name: 'Budi Santoso', email: 'budi@naturabites.co.id',
  phone: '0812 3456 7890', company: 'Natura Bites', since: 'Januari 2025',
}

const ORDERS = [
  {
    id: 'clx1a2b3c',
    service: 'UI/UX Design', pkg: 'Paket Growth', status: 'accepted',
    date: '3 Mar 2025', budget: 'Rp 15–25 juta', timeline: '4–6 minggu',
    desc: 'Redesign aplikasi mobile pemesanan produk F&B. Target: urban millennial 25–35 tahun. Referensi: Kopi Kenangan app, Fore Coffee. Kesan modern-minimalis dengan earth tone.',
  },
  {
    id: 'clx2b3c4d',
    service: 'Graphic Design', pkg: 'Paket Starter', status: 'reviewing',
    date: '21 Mei 2025', budget: 'Rp 5–10 juta', timeline: '2 minggu',
    desc: 'Social media kit untuk rebranding Natura Bites. 15 template feed + story Instagram, on-brand dengan identitas visual yang sudah ada.',
  },
  {
    id: 'clx3c4d5e',
    service: 'Web Development', pkg: 'Company Profile', status: 'new',
    date: '10 Jun 2025', budget: 'Rp 10–15 juta', timeline: '3–4 minggu',
    desc: 'Company profile website baru. 6–8 halaman, CMS produk, SEO optimal, integrasi WhatsApp catalog.',
  },
]

const STATUS: Record<string, { label: string; color: string; bg: string; icon: string; desc: string }> = {
  new:       { label: 'Brief Diterima',    color: '#3b82f6', bg: '#3b82f610', icon: 'fa-inbox',       desc: 'Brief sudah kami terima dan masuk antrian tinjauan.' },
  reviewing: { label: 'Sedang Ditinjau',   color: '#f59e0b', bg: '#f59e0b10', icon: 'fa-search',      desc: 'Tim sedang mengevaluasi brief dan menyiapkan proposal.' },
  accepted:  { label: 'Diterima',          color: '#22c55e', bg: '#22c55e10', icon: 'fa-check-circle', desc: 'Proyek disetujui! Tim akan menghubungi untuk kickoff.' },
  rejected:  { label: 'Tidak Dilanjutkan', color: '#ef4444', bg: '#ef444410', icon: 'fa-times-circle', desc: 'Proyek tidak dilanjutkan. Hubungi kami untuk info lebih lanjut.' },
}

const STEPS = ['new', 'reviewing', 'accepted']

export default function ProfileClient() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [tab, setTab]           = useState<'semua' | 'aktif' | 'selesai'>('semua')

  const filtered = ORDERS.filter(o =>
    tab === 'aktif'   ? ['new','reviewing'].includes(o.status) :
    tab === 'selesai' ? ['accepted','rejected'].includes(o.status) : true
  )

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Profile hero ── */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', paddingTop: 110, paddingBottom: 0 }}>
        <div className="wrap" style={{ maxWidth: 920 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 28, flexWrap: 'wrap', paddingBottom: 0 }}>

            {/* Avatar */}
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', fontWeight: 900, flexShrink: 0, border: '4px solid var(--bg-surface)', marginBottom: -4 }}>
              {USER.name.charAt(0)}
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} style={{ flex: 1, minWidth: 220, paddingBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.02em' }}>{USER.name}</h1>
                <span style={{ background: 'var(--accent-dim)', color: 'var(--accent)', fontSize: '0.72rem', fontWeight: 700, padding: '2px 10px', borderRadius: 100, border: '1px solid rgba(194,255,0,0.3)' }}>
                  Klien Aktif
                </span>
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {[
                  { ic: 'fa-building',  fab: false, val: USER.company },
                  { ic: 'fa-envelope',  fab: false, val: USER.email   },
                  { ic: 'fa-whatsapp', fab: true,  val: USER.phone, color: '#22c55e' },
                ].map(({ ic, fab, val, color }) => (
                  <span key={val} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <i className={`${fab?'fab':'fas'} ${ic}`} style={{ fontSize: '0.7rem', color: color ?? 'var(--accent)', width: 14, textAlign: 'center' }} />{val}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
              style={{ display: 'flex', gap: 1, marginBottom: 24, flexShrink: 0, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
              {[
                { label: 'Total Order', value: ORDERS.length,                              color: 'var(--accent)' },
                { label: 'Aktif',       value: ORDERS.filter(o=>['new','reviewing'].includes(o.status)).length, color: '#f59e0b' },
                { label: 'Selesai',     value: ORDERS.filter(o=>o.status==='accepted').length, color: '#22c55e' },
              ].map((s, i, arr) => (
                <div key={s.label} style={{ padding: '16px 24px', borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none', textAlign: 'center', minWidth: 90 }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--border)', marginTop: 8 }}>
            {(['semua','aktif','selesai'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '14px 22px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                border: 'none', background: 'transparent',
                color: tab === t ? 'var(--accent)' : 'var(--text-muted)',
                borderBottom: tab === t ? '2px solid var(--accent)' : '2px solid transparent',
                transition: 'all 0.15s', textTransform: 'capitalize',
              }}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
                <span style={{ marginLeft: 6, fontSize: '0.72rem', opacity: 0.6 }}>
                  ({t==='semua' ? ORDERS.length : t==='aktif' ? ORDERS.filter(o=>['new','reviewing'].includes(o.status)).length : ORDERS.filter(o=>o.status==='accepted').length})
                </span>
              </button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', paddingRight: 4 }}>
              <Link href="/order" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
                <i className="fas fa-plus" /> Order Baru
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Order cards ── */}
      <div className="wrap" style={{ maxWidth: 920, padding: '32px 24px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((order, i) => {
            const st = STATUS[order.status]
            const isOpen = expanded === order.id
            const stepIdx = STEPS.indexOf(order.status)

            return (
              <motion.div key={order.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                style={{ background: 'var(--bg-surface)', border: `1px solid ${isOpen ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--r-xl)', overflow: 'hidden', transition: 'border-color 0.2s' }}>

                {/* Card header */}
                <div onClick={() => setExpanded(isOpen ? null : order.id)}
                  style={{ display: 'grid', gridTemplateColumns: '4px 1fr auto', cursor: 'pointer' }}>

                  {/* Accent strip */}
                  <div style={{ background: st.color, borderRadius: '12px 0 0 12px' }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 22px', flexWrap: 'wrap' }}>
                    {/* Service icon */}
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: st.bg, border: `1px solid ${st.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fas ${st.icon}`} style={{ color: st.color, fontSize: '1rem' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 140 }}>
                      <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 3 }}>{order.service}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{order.pkg} · {order.date}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                      <span style={{ padding: '5px 13px', borderRadius: 100, fontSize: '0.74rem', fontWeight: 700, background: st.bg, color: st.color, border: `1px solid ${st.color}35` }}>
                        <i className={`fas ${st.icon}`} style={{ marginRight: 5, fontSize: '0.62rem' }} />{st.label}
                      </span>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.7rem', transition: 'all 0.15s' }}>
                        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
                      <div style={{ borderTop: '1px solid var(--border)', padding: '24px 26px 28px' }}>

                        {/* Progress stepper */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28 }}>
                          {STEPS.map((sv, idx, arr) => {
                            const s     = STATUS[sv]
                            const done  = stepIdx >= 0 && idx <= stepIdx
                            const active = sv === order.status
                            return (
                              <div key={sv} style={{ display: 'flex', alignItems: 'center', flex: idx < arr.length - 1 ? 1 : undefined }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, minWidth: 90 }}>
                                  <div style={{ width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', background: active ? s.color : done ? `${s.color}20` : 'var(--bg)', border: `2.5px solid ${active || done ? s.color : 'var(--border)'}`, color: active ? '#fff' : done ? s.color : 'var(--text-muted)', transition: 'all 0.25s' }}>
                                    <i className={`fas ${done && !active ? 'fa-check' : s.icon}`} />
                                  </div>
                                  <span style={{ fontSize: '0.67rem', fontWeight: active ? 700 : 500, color: active ? s.color : done ? 'var(--text)' : 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                    {s.label}
                                  </span>
                                </div>
                                {idx < arr.length - 1 && (
                                  <div style={{ flex: 1, height: 2.5, borderRadius: 2, background: done && idx < stepIdx ? STATUS[STEPS[idx]].color : 'var(--border)', margin: '0 8px', marginBottom: 24, transition: 'background 0.3s' }} />
                                )}
                              </div>
                            )
                          })}
                        </div>

                        {/* Status desc */}
                        <div style={{ padding: '12px 16px', background: st.bg, border: `1px solid ${st.color}25`, borderRadius: 10, marginBottom: 22, display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.84rem' }}>
                          <i className={`fas ${st.icon}`} style={{ color: st.color, flexShrink: 0 }} />
                          {st.desc}
                        </div>

                        {/* Detail + Brief */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
                          <div>
                            <p style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>Detail</p>
                            {([
                              ['Layanan',   order.service],
                              ['Paket',     order.pkg],
                              ['Budget',    order.budget],
                              ['Timeline',  order.timeline],
                              ['Tanggal',   order.date],
                              ['ID',        order.id + '…'],
                            ] as [string,string][]).map(([k,v]) => (
                              <div key={k} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: '0.84rem' }}>
                                <span style={{ color: 'var(--text-muted)', width: 76, flexShrink: 0 }}>{k}</span>
                                <span style={{ fontWeight: 600 }}>{v}</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            <p style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>Brief</p>
                            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>{order.desc}</p>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media(max-width:640px){
          .profile-stats { flex-direction: column !important; }
        }
      `}</style>
    </main>
  )
}
