'use client'
import { useState } from 'react'
import Image from 'next/image'

import Link from 'next/link'

export default function Footer() {
  const [done, setDone] = useState(false)

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    setDone(true)
    setTimeout(() => setDone(false), 3500)
  }

  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '80px 0 40px' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.3fr', gap: 48, marginBottom: 60 }}>

          {/* Brand */}
          <div>
            <Image src="/O2M.png" alt="one2many" width={80} height={26} style={{ height: 26, width: 'auto', marginBottom: 16 }} />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 16, maxWidth: 220 }}>
              One-stop solution untuk transformasi digital brand Anda.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 20 }}>
              <i className="fas fa-map-marker-alt" style={{ color: 'var(--accent)', fontSize: '0.7rem', width: 12 }} />
              Surabaya, Indonesia · Melayani seluruh Indonesia
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { ic: 'fa-instagram', href: '#' },
                { ic: 'fa-linkedin',  href: 'https://linkedin.com/company/one2many' },
                { ic: 'fa-twitter',   href: '#' },
                { ic: 'fa-github',    href: '#' },
              ].map(({ ic, href }) => (
                <a key={ic} href={href} target={href !== '#' ? '_blank' : undefined} rel="noopener noreferrer" aria-label={ic} style={{
                  width: 34, height: 34, background: 'var(--bg-surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', fontSize: '0.8rem', transition: 'all 0.2s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  <i className={`fab ${ic}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 18, letterSpacing: '0.04em' }}>Layanan</h4>
            {['Graphic Design', 'UI/UX Design', 'Web Development', 'Mobile App Dev', 'Video Production'].map((s) => (
              <Link key={s} href="/services" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', padding: '5px 0', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >{s}</Link>
            ))}
          </div>

          {/* Perusahaan */}
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 18, letterSpacing: '0.04em' }}>Perusahaan</h4>
            {[['About', '/about'], ['Mitra Freelancer', '/partners'], ['Portofolio', '/work'], ['Pricing', '/pricing'], ['Cara Kerja', '/services'], ['Kontak', '/contact'], ['Lacak Order', '/profile']].map(([label, href]) => (
              <Link key={label} href={href} style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', padding: '5px 0', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >{label}</Link>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 18, letterSpacing: '0.04em' }}>Buletin</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.55 }}>
              Tips transformasi digital untuk UMKM &amp; Startup.
            </p>
            <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                placeholder="email@anda.com"
                required
                style={{
                  flex: 1, minWidth: 0, padding: '10px 14px',
                  background: 'var(--bg-surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-sm)', color: 'var(--text)', fontSize: '0.85rem', outline: 'none',
                }}
              />
              <button type="submit" style={{
                width: 38, height: 38, background: done ? '#00c97a' : 'var(--accent)',
                color: '#000', border: 'none', borderRadius: 'var(--r-sm)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.78rem', flexShrink: 0, cursor: 'pointer',
              }}>
                <i className={`fas fa-${done ? 'check' : 'arrow-right'}`} />
              </button>
            </form>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 28, borderTop: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: 12 }}>
          <p>© 2025 one2many. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Kebijakan Privasi', 'Syarat & Ketentuan'].map((l) => (
              <a key={l} href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:480px){
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
