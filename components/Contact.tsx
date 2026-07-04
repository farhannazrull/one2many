'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

const fadeLeft = { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }
const fadeRight = { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: 0.1 } }

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const serviceQuery = searchParams.get('service')
    if (!serviceQuery) return
    const slugMap: Record<string, string> = {
      'graphic-design':     'Graphic Design',
      'ui-ux-design':       'UI/UX Design',
      'web-development':    'Web Development',
      'video-production':   'Video Production',
      'mobile-development': 'Mobile App Dev',
    }
    const validTitles = ['Graphic Design', 'UI/UX Design', 'Web Development', 'Video Production', 'Mobile App Dev', 'Full Bundle (Semua Layanan)']
    const resolved = slugMap[serviceQuery] ?? (validTitles.includes(serviceQuery) ? serviceQuery : '')
    if (resolved && resolved !== selectedService) {
      setTimeout(() => setSelectedService(resolved), 0)
    }
  }, [searchParams, selectedService])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const body = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      service: selectedService,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      form.reset()
      setSelectedService('')
      setTimeout(() => setSent(false), 5000)
    } catch {
      setError('Gagal mengirim. Silakan coba lagi atau email kami langsung.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px',
    background: 'var(--bg)', border: '1px solid var(--border)',
    borderRadius: 'var(--r-sm)', color: 'var(--text)', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <section id="contact" style={{ padding: '120px 0' }}>
      <div className="wrap">
        <motion.div {...fadeLeft} style={{ marginBottom: 60, paddingBottom: 40, borderBottom: '1px solid var(--border)' }}>
          <span className="section-label">Hubungi Kami</span>
          <h1 className="display-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', textTransform: 'none', marginTop: 12, marginBottom: 20 }}>
            Mulai <span style={{ color: 'var(--accent)' }}>Proyek</span>
          </h1>
          <p className="section-sub" style={{ margin: 0, maxWidth: 600 }}>
            Kami membatasi maksimal 30–50 klien dalam 24 bulan pertama untuk menjaga kualitas premium. Hubungi kami sekarang untuk mengamankan slot Anda.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80, alignItems: 'start' }}>

          {/* Info */}
          <motion.div {...fadeLeft}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 20 }}>Informasi Kontak</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
              {[
                { icon: 'fa-envelope', text: 'hello@one2many.id' },
                { icon: 'fa-map-marker-alt', text: 'Surabaya, Jawa Timur, Indonesia' },
              ].map((item) => (
                <div key={item.icon} style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  <i className={`fas ${item.icon}`} style={{ color: 'var(--accent)', width: 16, textAlign: 'center' }} />
                  {item.text}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['fa-instagram', 'fa-linkedin', 'fa-twitter', 'fa-github'].map((ic) => (
                <a key={ic} href="#" aria-label={ic} style={{
                  width: 38, height: 38, background: 'var(--bg-surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', fontSize: '0.875rem', transition: 'all 0.2s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  <i className={`fab ${ic}`} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...fadeRight} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: 40 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                {[{ id: 'name', label: 'Nama Lengkap', placeholder: 'John Doe', type: 'text' },
                  { id: 'email', label: 'Email Bisnis', placeholder: 'john@company.com', type: 'email' }].map((f) => (
                  <div key={f.id} style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    <label htmlFor={f.id} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>{f.label}</label>
                    <input id={f.id} type={f.type} placeholder={f.placeholder} required style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,255,157,0.07)' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 18 }}>
                <label htmlFor="service" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>Layanan yang Dibutuhkan</label>
                <select id="service" value={selectedService} onChange={(e) => setSelectedService(e.target.value)} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                  <option value="">Pilih layanan...</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Dev">Mobile App Dev</option>
                  <option value="Video Production">Video Production</option>
                  <option value="Full Bundle (Semua Layanan)">Full Bundle (Semua Layanan)</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 24 }}>
                <label htmlFor="message" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>Ceritakan Proyeknya</label>
                <textarea id="message" rows={5} required placeholder="Jelaskan kebutuhan proyek, target market, timeline, dan budget estimasi Anda..."
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,255,157,0.07)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                />
              </div>
              {error && (
                <p style={{ fontSize: '0.85rem', color: '#ff4d4d', marginBottom: 12 }}>
                  <i className="fas fa-exclamation-circle" style={{ marginRight: 6 }} />{error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading || sent}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', background: sent ? '#00c97a' : 'var(--accent)', opacity: loading ? 0.7 : 1 }}
              >
                {sent
                  ? <><i className="fas fa-check" /> Brief Terkirim!</>
                  : loading
                    ? <><i className="fas fa-spinner fa-spin" /> Mengirim...</>
                    : <><span>Kirim Brief</span> <i className="fas fa-arrow-right" /></>
                }
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          #contact > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          #contact .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
