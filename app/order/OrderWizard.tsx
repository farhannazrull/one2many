'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { PACKAGES as BASE_PACKAGES, type Package } from '@/data/packages'
import { SATUAN } from '@/data/satuan'
import { RETAINER_PLANS } from '@/data/retainer'

/* ── Data ── */
const SERVICES = [
  { id: 'graphic-design',     label: 'Graphic Design',         icon: 'fa-paint-brush',   desc: 'Logo, brand identity, social media kit' },
  { id: 'ui-ux-design',       label: 'UI/UX Design',           icon: 'fa-laptop-code',   desc: 'Research, wireframe, design system' },
  { id: 'web-development',    label: 'Web Development',        icon: 'fa-code',          desc: 'Next.js, React, full-stack' },
  { id: 'mobile-development', label: 'Mobile App Dev',         icon: 'fa-mobile-alt',    desc: 'iOS & Android — React Native / Flutter' },
  { id: 'video-production',   label: 'Video Production',       icon: 'fa-video',         desc: 'Brand film, motion graphics, reels' },
  { id: 'pelajar',          label: 'Pelajar & Freelancer',   icon: 'fa-graduation-cap', desc: 'CV, poster, pitch deck, logo — mulai Rp 39rb', badge: 'Mulai 39rb' },
  { id: 'bundle-quick',     label: 'Quick Launch',           icon: 'fa-bolt',        desc: 'Landing page + logo + sosmed kit — mulai Rp 10Jt', badge: 'UMKM' },
  { id: 'bundle-seed',      label: 'Seed Startup Bundle',    icon: 'fa-seedling',    desc: 'Identity + UI + Web Dev — mulai Rp 35Jt', badge: 'Bundle' },
  { id: 'bundle-transform', label: 'Digital Transformation', icon: 'fa-rocket',      desc: 'Rebranding + Web + Video — mulai Rp 65Jt', badge: 'Bundle ★' },
  { id: 'retainer',         label: 'Retainer Bulanan',       icon: 'fa-calendar-check', desc: 'Maintenance, konten & desain sosmed rutin', badge: 'Berulang' },
]

const PACKAGES: Record<string, Package[]> = {
  ...BASE_PACKAGES,
  'pelajar': [
    { id: 'satuan-pelajar', label: 'Layanan Satuan', price: 'Sesuai item', desc: 'Harga transparan per item, tim kami konfirmasi scope & kirim invoice via WhatsApp', includes: ['Harga tertera per item — tidak ada biaya tersembunyi', 'Revisi 1× included', 'Konfirmasi via WhatsApp dalam 1 jam kerja', 'File final dikirim via Google Drive / email'] },
  ],
  'bundle-quick': [
    { id: 'quick', label: 'Quick Launch', price: 'Rp 10jt', desc: 'Untuk UMKM & bisnis kecil yang baru mulai go digital', includes: ['Landing page 1 halaman (Next.js, mobile-friendly)', 'Logo 1 konsep + file siap pakai', '3 template desain sosial media', 'Deploy ke Vercel + setup domain'] },
  ],
  'bundle-seed': [
    { id: 'seed', label: 'Seed Bundle', price: 'Rp 35jt', desc: 'Semua yang startup butuhkan di fase awal', includes: ['Brand identity lengkap (Graphic Design Pro)', 'UI design produk (15 screen)', 'Landing page + company profile', '3 bulan post-launch support'] },
  ],
  'bundle-transform': [
    { id: 'transform', label: 'Transform', price: 'Rp 65jt', desc: 'Transformasi digital komprehensif dalam satu proyek', includes: ['Full rebranding (Graphic Design Enterprise)', 'Company website baru (Web Dev Pro)', 'Brand film + 3 reels sosmed', '6 bulan retainer support'] },
  ],
}

const RETAINER_AS_PACKAGES: Package[] = RETAINER_PLANS.map(r => ({
  id:       r.id,
  label:    r.name,
  price:    r.price,
  desc:     r.desc,
  includes: r.includes,
  popular:  r.popular,
}))

const BUDGETS    = ['< Rp 10Jt', 'Rp 10–30Jt', 'Rp 30–65Jt', '> Rp 65Jt', 'Minta Penawaran Khusus']
const TIMELINES  = ['Secepatnya (< 1 bulan)', '1–2 bulan', '3–6 bulan', '6 bulan+', 'Belum tahu / Fleksibel']
const INDUSTRIES = ['F&B / Kuliner', 'Fashion & Lifestyle', 'Teknologi / SaaS', 'Kesehatan & Wellness', 'Pendidikan & E-Learning', 'Properti & Real Estate', 'Keuangan & Fintech', 'Retail & E-commerce', 'Manufaktur', 'Jasa Profesional', 'Media & Entertainment', 'Lainnya']

const STEPS = ['Layanan', 'Paket', 'Proyek', 'Kontak', 'Konfirmasi']

type FormData = {
  service: string; packageType: string
  company: string; industry: string; referenceUrl: string
  budget: string; timeline: string; description: string
  name: string; email: string; phone: string
}
const EMPTY: FormData = {
  service: '', packageType: '',
  company: '', industry: '', referenceUrl: '',
  budget: '', timeline: '', description: '',
  name: '', email: '', phone: '',
}

const slide = (dir: number) => ({
  initial:    { opacity: 0, x: dir * 36 },
  animate:    { opacity: 1, x: 0 },
  exit:       { opacity: 0, x: dir * -36 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
})

const inputCss: React.CSSProperties = {
  width: '100%', padding: '12px 14px',
  background: 'var(--bg)', border: '1px solid var(--border)',
  borderRadius: 10, color: 'var(--text)', fontSize: '0.9rem',
  outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
}
const labelCss: React.CSSProperties = {
  display: 'block', fontSize: '0.82rem', fontWeight: 600,
  marginBottom: 7, color: 'var(--text-muted)',
}
function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = 'var(--accent)'
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = 'var(--border)'
}

function buildDefaultDescription(service?: string, itemId?: string): string {
  if (!service || !itemId) return ''
  const item = SATUAN[service]?.find(i => i.id === itemId)
  if (!item) return ''
  return `Layanan satuan: ${item.name} (${item.price}, estimasi ${item.delivery})\n\n`
}

export default function OrderWizard({ defaultService, defaultItem, defaultPlan }: { defaultService?: string; defaultItem?: string; defaultPlan?: string }) {
  const [step,           setStep]           = useState(0)
  const [dir,            setDir]            = useState(1)
  const [activeSatuanId, setActiveSatuanId] = useState<string | null>(defaultItem ?? null)
  const [form,           setForm]           = useState<FormData>({
    ...EMPTY,
    service:     defaultService ?? '',
    packageType: defaultPlan    ?? '',
    description: buildDefaultDescription(defaultService, defaultItem),
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [orderId, setOrderId] = useState<string | null>(null)

  const satuanItem = form.service && activeSatuanId
    ? SATUAN[form.service]?.find(i => i.id === activeSatuanId)
    : undefined

  function go(next: number) { setDir(next > step ? 1 : -1); setStep(next) }
  function set(k: keyof FormData, v: string) { setForm(f => ({ ...f, [k]: v })) }

  function pickPackage(pkgId: string) {
    setActiveSatuanId(null)
    set('packageType', pkgId)
  }

  function pickSatuan(itemId: string) {
    const item = SATUAN[form.service]?.find(i => i.id === itemId)
    if (!item) return
    setActiveSatuanId(itemId)
    setForm(f => ({
      ...f,
      packageType: '',
      description: `Layanan satuan: ${item.name} (${item.price}, estimasi ${item.delivery})\n\n`,
    }))
  }

  const selectedService  = SERVICES.find(s => s.id === form.service)
  const packages         = form.service === 'retainer' ? RETAINER_AS_PACKAGES : (PACKAGES[form.service] ?? [])
  const selectedPkg      = packages.find(p => p.id === form.packageType)
  const isRetainer       = form.service === 'retainer'
  const isPelajar        = form.service === 'pelajar'
  const satuanOptions    = !isRetainer ? (SATUAN[form.service] ?? []) : []

  async function submit() {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: form.service, packageType: form.packageType || null,
          company: form.company || null, industry: form.industry || null,
          referenceUrl: form.referenceUrl || null,
          budget: form.budget || null, timeline: form.timeline || null,
          description: form.description,
          name: form.name, email: form.email, phone: form.phone || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setOrderId(data.id)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Gagal mengirim. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  /* ── Success screen ── */
  if (orderId) return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
      <div style={{ textAlign: 'center', padding: '40px 0 32px' }}>
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
          style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--accent)', color: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', margin: '0 auto 28px',
          }}
        >
          <i className="fas fa-check" />
        </motion.div>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 10 }}>Pesanan Diterima!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 6 }}>
          Tim kami akan menghubungi <strong>{form.email}</strong> dalam 1×24 jam.
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 40 }}>
          ID Pesanan:&nbsp;
          <code style={{ background: 'var(--bg-elevated)', padding: '2px 8px', borderRadius: 4 }}>{orderId}</code>
        </p>
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 32px', marginBottom: 28 }}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 24 }}>
          Apa yang terjadi selanjutnya
        </p>
        {[
          { icon: 'fa-envelope',  time: '1×24 jam',       label: 'Kontak Awal',         desc: 'Tim kami menghubungi via email atau WhatsApp untuk konfirmasi kebutuhan.' },
          { icon: 'fa-file-alt',  time: '2–3 hari kerja', label: 'Proposal & Estimasi', desc: 'Kami siapkan proposal detail, timeline proyek, dan estimasi biaya.' },
          { icon: 'fa-handshake', time: 'Setelah deal',   label: 'Rapat Kickoff',       desc: 'Sesi 30–60 menit untuk finalisasi scope, brief, dan mulai sprint.' },
        ].map((s, i, arr) => (
          <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < arr.length - 1 ? 4 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(194,255,0,0.1)', border: '1px solid rgba(194,255,0,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', fontSize: '0.82rem',
              }}>
                <i className={`fas ${s.icon}`} />
              </div>
              {i < arr.length - 1 && <div style={{ width: 1, height: 28, background: 'var(--border)', margin: '4px 0' }} />}
            </div>
            <div style={{ paddingBottom: i < arr.length - 1 ? 16 : 0 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{s.label}</span>
                <span style={{ fontSize: '0.65rem', background: 'var(--bg-elevated)', padding: '2px 8px', borderRadius: 100, color: 'var(--text-muted)', fontWeight: 600 }}>{s.time}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <Link href="/" className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>Kembali ke Beranda</Link>
        <Link href="/work" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Lihat Portofolio Kami</Link>
      </div>
    </motion.div>
  )

  const canNext = [
    !!form.service,
    !!(form.packageType || activeSatuanId),
    !!form.description.trim(),
    !!(form.name.trim() && form.email.trim()),
    true,
  ]

  return (
    <div>
      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 48 }}>
        {STEPS.map((label, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: i <= step ? 'var(--accent)' : 'var(--bg-surface)',
                border: `2px solid ${i <= step ? 'var(--accent)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.78rem', fontWeight: 700,
                color: i <= step ? '#000' : 'var(--text-muted)',
                transition: 'all 0.3s',
              }}>
                {i < step ? <i className="fas fa-check" style={{ fontSize: '0.68rem' }} /> : i + 1}
              </div>
              <span style={{ fontSize: '0.65rem', fontWeight: 600, color: i === step ? 'var(--text)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: i < step ? 'var(--accent)' : 'var(--border)', margin: '0 6px', marginBottom: 22, transition: 'background 0.3s' }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', overflow: 'hidden', minHeight: 380 }}>
        <AnimatePresence mode="wait" initial={false}>

          {/* STEP 0 — Pilih Layanan */}
          {step === 0 && (
            <motion.div key="s0" {...slide(dir)}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 6 }}>Layanan apa yang Anda butuhkan?</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: '0.88rem' }}>Pilih satu layanan atau paket bundle terintegrasi.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
                {SERVICES.map(s => {
                  const active = form.service === s.id
                  return (
                    <button key={s.id} onClick={() => set('service', s.id)}
                      style={{
                        padding: '18px 20px', textAlign: 'left', cursor: 'pointer',
                        border: `2px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                        borderRadius: 14,
                        background: active ? 'var(--accent-dim)' : 'var(--bg-surface)',
                        transition: 'all 0.18s', position: 'relative',
                      }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = 'var(--accent)' }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = 'var(--border)' }}
                    >
                      {s.badge && (
                        <span style={{ position: 'absolute', top: -10, right: 10, background: 'var(--accent)', color: '#000', fontSize: '0.6rem', fontWeight: 800, padding: '2px 8px', borderRadius: 100 }}>
                          {s.badge}
                        </span>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <i className={`fas ${s.icon}`} style={{ color: 'var(--accent)', fontSize: '1rem' }} />
                        {active && <i className="fas fa-check-circle" style={{ color: 'var(--accent)', fontSize: '0.9rem' }} />}
                      </div>
                      <div style={{ fontWeight: 700, marginBottom: 3, fontSize: '0.92rem' }}>{s.label}</div>
                      <div style={{ fontSize: '0.77rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{s.desc}</div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 1 — Pilih Paket */}
          {step === 1 && (
            <motion.div key="s1" {...slide(dir)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                  {isRetainer ? 'Pilih paket retainer' : isPelajar ? 'Pilih item yang kamu butuhkan' : 'Pilih paket untuk'}
                </h2>
                {!isRetainer && !isPelajar && (
                  <span style={{ background: 'var(--accent-dim)', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700, padding: '3px 12px', borderRadius: 100 }}>
                    {selectedService?.label}
                  </span>
                )}
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: '0.88rem' }}>
                {isRetainer
                  ? 'Minimum kontrak 3 bulan. Harga & scope bisa disesuaikan setelah diskusi awal.'
                  : isPelajar
                  ? 'Harga transparan per item. Tim kami konfirmasi via WhatsApp dalam 1 jam kerja.'
                  : 'Harga bisa disesuaikan. Kami akan diskusikan lebih lanjut setelah menghubungi Anda.'}
              </p>
              {!isPelajar && <div style={{ display: 'grid', gridTemplateColumns: packages.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
                {packages.map(pkg => {
                  const active = form.packageType === pkg.id
                  return (
                    <button key={pkg.id} onClick={() => pickPackage(pkg.id)}
                      style={{
                        padding: '22px 22px', textAlign: 'left', cursor: 'pointer',
                        border: `2px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                        borderRadius: 14,
                        background: active ? 'var(--accent-dim)' : 'var(--bg-surface)',
                        transition: 'all 0.18s', position: 'relative',
                      }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = 'var(--accent)' }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = 'var(--border)' }}
                    >
                      {pkg.popular && (
                        <span style={{ position: 'absolute', top: -10, right: 14, background: 'var(--accent)', color: '#000', fontSize: '0.6rem', fontWeight: 800, padding: '2px 10px', borderRadius: 100 }}>
                          POPULER
                        </span>
                      )}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 3 }}>{pkg.label}</div>
                          <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--accent)' }}>{pkg.price}</div>
                        </div>
                        {active && <i className="fas fa-check-circle" style={{ color: 'var(--accent)', fontSize: '1.1rem', marginTop: 2 }} />}
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>{pkg.desc}</p>
                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {pkg.includes.map(item => (
                          <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: '0.78rem', color: 'var(--text)' }}>
                            <i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.58rem', marginTop: 4, flexShrink: 0 }} />
                            {item}
                          </div>
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>}

              {/* ── Satuan items ── */}
              {satuanOptions.length > 0 && (
                <div style={{ marginTop: isPelajar ? 0 : 28 }}>
                  {!isPelajar && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, whiteSpace: 'nowrap', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        atau pilih item satuan
                      </span>
                      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {satuanOptions.map(item => {
                      const active = activeSatuanId === item.id
                      return (
                        <button key={item.id} onClick={() => pickSatuan(item.id)}
                          style={{
                            display: 'grid', gridTemplateColumns: '1fr auto',
                            padding: '13px 18px', textAlign: 'left', cursor: 'pointer', gap: 16,
                            border: `1.5px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                            borderRadius: 12, alignItems: 'center',
                            background: active ? 'var(--accent-dim)' : 'var(--bg-surface)',
                            transition: 'all 0.15s',
                          }}
                          onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = 'var(--accent)' }}
                          onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = 'var(--border)' }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 2 }}>{item.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {item.desc} &nbsp;·&nbsp;
                              <i className="fas fa-clock" style={{ fontSize: '0.65em', marginRight: 3 }} />{item.delivery}
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                            <span style={{ fontWeight: 900, color: 'var(--accent)', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>{item.price}</span>
                            {active && <i className="fas fa-check-circle" style={{ color: 'var(--accent)', fontSize: '1rem' }} />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 2 — Detail Proyek */}
          {step === 2 && (
            <motion.div key="s2" {...slide(dir)}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 6 }}>Detail proyek Anda</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: satuanItem ? 14 : 28, fontSize: '0.88rem' }}>Semakin detail, semakin akurat proposal dan estimasi yang kami berikan.</p>

              {satuanItem && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, padding: '11px 16px', background: 'var(--accent-dim)', border: '1px solid rgba(194,255,0,0.3)', borderRadius: 10 }}>
                  <i className="fas fa-tag" style={{ color: 'var(--accent)', fontSize: '0.78rem', flexShrink: 0 }} />
                  <div style={{ fontSize: '0.83rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{satuanItem.name}</span>
                    <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>{satuanItem.price} · {satuanItem.delivery}</span>
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="order-two-col">
                  <div>
                    <label style={labelCss}>Nama Perusahaan / Brand</label>
                    <input value={form.company} onChange={e => set('company', e.target.value)}
                      placeholder="contoh: Natura Bites" style={inputCss} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label style={labelCss}>Industri / Bidang Bisnis</label>
                    <select value={form.industry} onChange={e => set('industry', e.target.value)}
                      style={{ ...inputCss, cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur}>
                      <option value="">Pilih industri...</option>
                      {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="order-two-col">
                  <div>
                    <label style={labelCss}>Estimasi Budget</label>
                    <select value={form.budget} onChange={e => set('budget', e.target.value)}
                      style={{ ...inputCss, cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur}>
                      <option value="">Pilih range...</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelCss}>Target Timeline</label>
                    <select value={form.timeline} onChange={e => set('timeline', e.target.value)}
                      style={{ ...inputCss, cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur}>
                      <option value="">Pilih timeline...</option>
                      {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelCss}>Website / Link Referensi (opsional)</label>
                  <input value={form.referenceUrl} onChange={e => set('referenceUrl', e.target.value)}
                    placeholder="https://example.com atau link Figma / Notion / Drive..."
                    style={inputCss} onFocus={onFocus} onBlur={onBlur} />
                </div>

                <div>
                  <label style={labelCss}>
                    Ceritakan Proyeknya <span style={{ color: '#ff4d4d' }}>*</span>
                  </label>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.5 }}>
                    Apa tujuannya? Siapa target market-nya? Ada kompetitor / referensi visual yang disukai?
                  </p>
                  <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={5}
                    placeholder="Contoh: Kami F&B startup yang butuh rebrand karena target market bergeser ke premium millennial. Referensi: Kopi Kenangan, Fore Coffee. Ingin kesan modern-minimalis. Target launch Q3 2025..."
                    style={{ ...inputCss, resize: 'vertical' }}
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  />
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 5, textAlign: 'right' }}>
                    {form.description.length} karakter
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Kontak */}
          {step === 3 && (
            <motion.div key="s3" {...slide(dir)}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 6 }}>Informasi kontak</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: '0.88rem' }}>Kami menghubungi via email dalam 1×24 jam. WhatsApp jika ada nomor.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={labelCss}>Nama Lengkap <span style={{ color: '#ff4d4d' }}>*</span></label>
                  <input value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="Nama Lengkap" style={inputCss} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label style={labelCss}>Email Bisnis <span style={{ color: '#ff4d4d' }}>*</span></label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    placeholder="email@perusahaan.com" style={inputCss} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label style={labelCss}>Nomor WhatsApp (opsional)</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                    placeholder="0812 3456 7890" style={inputCss} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div style={{
                  background: 'var(--bg-surface)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '14px 18px',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}>
                  <i className="fas fa-shield-alt" style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                    Data Anda aman dan hanya digunakan untuk proses penawaran proyek. Kami tidak mengirim spam atau membagikan data ke pihak ketiga.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4 — Konfirmasi */}
          {step === 4 && (
            <motion.div key="s4" {...slide(dir)}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 6 }}>Periksa & kirim pesanan</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: '0.88rem' }}>Pastikan semua informasi sudah benar sebelum mengirim.</p>

              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
                {/* Service + Package header */}
                <div style={{ background: 'var(--accent)', padding: '16px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(0,0,0,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Layanan dipilih</div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#000' }}>
                      {selectedService?.label}
                      {satuanItem
                        ? ` — ${satuanItem.name}`
                        : selectedPkg && !['seed','transform'].includes(selectedPkg.id) && ` — ${selectedPkg.label}`}
                    </div>
                  </div>
                  {satuanItem
                    ? <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#000' }}>{satuanItem.price}</div>
                    : selectedPkg && <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#000' }}>{selectedPkg.price}</div>}
                </div>

                {/* Detail rows */}
                {([
                  ['Perusahaan / Brand', form.company   || '—'],
                  ['Industri',           form.industry  || '—'],
                  ['Budget',             form.budget    || '—'],
                  ['Timeline',           form.timeline  || '—'],
                  ['Referensi URL',      form.referenceUrl || '—'],
                ] as [string, string][]).map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', gap: 12, padding: '11px 22px', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', width: 130, flexShrink: 0 }}>{label}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, wordBreak: 'break-all' }}>{val}</span>
                  </div>
                ))}

                <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 7 }}>Deskripsi Proyek</div>
                  <p style={{ fontSize: '0.855rem', color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{form.description}</p>
                </div>

                <div style={{ padding: '14px 22px', background: 'var(--bg-surface)' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Kontak</div>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    {([['fa-user', form.name], ['fa-envelope', form.email], ...(form.phone ? [['fa-phone', form.phone]] : [])] as [string, string][]).map(([icon, val]) => (
                      <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.85rem', fontWeight: 600 }}>
                        <i className={`fas ${icon}`} style={{ color: 'var(--accent)', fontSize: '0.75rem' }} />
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div style={{ padding: '12px 16px', background: 'rgba(255,77,77,0.08)', border: '1px solid rgba(255,77,77,0.25)', borderRadius: 10 }}>
                  <p style={{ fontSize: '0.85rem', color: '#ff4d4d', margin: 0 }}>
                    <i className="fas fa-exclamation-circle" style={{ marginRight: 8 }} />{error}
                  </p>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: step === 0 ? 'flex-end' : 'space-between', alignItems: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
        {step > 0 && (
          <button onClick={() => go(step - 1)} className="btn btn-ghost">
            <i className="fas fa-arrow-left" style={{ fontSize: '0.85em' }} /> Kembali
          </button>
        )}
        {step < 4 ? (
          <button onClick={() => go(step + 1)} className="btn btn-primary"
            disabled={!canNext[step]}
            style={{ opacity: canNext[step] ? 1 : 0.45, cursor: canNext[step] ? 'pointer' : 'not-allowed' }}>
            Lanjut <i className="fas fa-arrow-right" style={{ fontSize: '0.85em' }} />
          </button>
        ) : (
          <button onClick={submit} disabled={loading} className="btn btn-primary" style={{ opacity: loading ? 0.7 : 1, minWidth: 160 }}>
            {loading
              ? <><i className="fas fa-spinner fa-spin" /> Mengirim...</>
              : <><i className="fas fa-paper-plane" /> Kirim Pesanan</>}
          </button>
        )}
      </div>

      <style>{`
        @media(max-width:560px){
          .order-two-col{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  )
}
