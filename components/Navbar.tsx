'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/services', label: 'Layanan' },
  { href: '/work', label: 'Portofolio' },
  { href: '/pricing', label: 'Harga' },
  { href: '/partners', label: 'Mitra' },
  { href: '/contact', label: 'Kontak' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(saved)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setTimeout(() => setMenuOpen(false), 0)
  }, [pathname])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 16,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 48px)',
    maxWidth: 1200,
    zIndex: 1000,
  }

  const innerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
    background: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: `1px solid ${scrolled ? 'var(--border-strong)' : 'var(--border)'}`,
    borderRadius: 100,
    padding: '10px 10px 10px 20px',
    transition: 'background 0.3s, border-color 0.3s',
  }

  const innerStyleLight = innerStyle

  return (
    <nav style={navStyle}>
      <div style={theme === 'light' ? innerStyleLight : innerStyle}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/O2M.png" alt="one2many" width={80} height={30} style={{ height: 30, width: 'auto' }} priority />
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="nav-links-desktop">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: '8px 14px',
                borderRadius: 100,
                fontSize: '0.875rem',
                fontWeight: 500,
                color: pathname === l.href ? 'var(--text)' : 'var(--text-muted)',
                background: pathname === l.href ? 'rgba(128,128,128,0.1)' : 'transparent',
                transition: 'color 0.2s, background 0.2s',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            href="/profile"
            aria-label="Profil"
            style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'var(--bg-surface)', border: '1px solid var(--border)',
              color: pathname === '/profile' ? 'var(--accent)' : 'var(--text-muted)',
              fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { if (pathname !== '/profile') { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' } }}
          >
            <i className="fas fa-user" />
          </Link>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.2s, color 0.2s',
            }}
          >
            <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`} />
          </button>

          <Link
            href="/contact"
            style={{
              padding: '9px 18px',
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              borderRadius: 100,
              fontSize: '0.82rem',
              fontWeight: 600,
              transition: 'border-color 0.2s, color 0.2s',
              display: 'none',
              whiteSpace: 'nowrap',
            }}
            className="btn-consult-desktop"
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            Konsultasi Gratis
          </Link>
          <Link
            href="/order"
            style={{
              padding: '9px 20px',
              background: 'var(--accent)',
              color: '#000',
              borderRadius: 100,
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'filter 0.2s',
              display: 'none',
            }}
            className="btn-nav-desktop"
          >
            Mulai Proyek
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              background: 'none',
              border: 'none',
              padding: 6,
            }}
            className="hamburger-btn"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  background: 'var(--text)',
                  borderRadius: 2,
                  transition: 'transform 0.3s, opacity 0.3s, width 0.3s',
                  transform:
                    menuOpen
                      ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                      : i === 1 ? 'translateX(-20px)'
                      : 'rotate(-45deg) translate(5px,-5px)'
                      : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: theme === 'light' ? 'rgba(248,248,252,0.98)' : 'rgba(14,14,18,0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            zIndex: 999,
          }}
          onClick={() => setMenuOpen(false)}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--text)',
                padding: '14px 28px',
                borderRadius: 12,
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{
              marginTop: 12,
              padding: '12px 32px',
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              borderRadius: 100,
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            Konsultasi Gratis
          </Link>
          <Link
            href="/order"
            style={{
              marginTop: 8,
              padding: '12px 32px',
              background: 'var(--accent)',
              color: '#000',
              borderRadius: 100,
              fontWeight: 700,
              fontSize: '1rem',
            }}
          >
            Mulai Proyek
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .nav-links-desktop { display: flex !important; }
          .btn-nav-desktop { display: inline-flex !important; }
          .btn-consult-desktop { display: inline-flex !important; }
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-links-desktop { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
