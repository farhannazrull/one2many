'use client'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/data/projects'

interface Props {
  id: string | null
  onClose: () => void
}

export default function Modal({ id, onClose }: Props) {
  const p = projects.find((x) => x.id === id)

  useEffect(() => {
    if (id) {
      document.body.style.overflow = 'hidden'
      const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', handler)
      return () => {
        window.removeEventListener('keydown', handler)
        document.body.style.overflow = ''
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [id, onClose])

  return (
    <AnimatePresence>
      {id && p && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.3, ease: [0.34, 1.4, 0.64, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--r-xl)',
              width: '100%', maxWidth: 880, maxHeight: '88vh',
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Tutup"
              style={{
                position: 'absolute', top: 14, right: 14, zIndex: 10,
                width: 34, height: 34, borderRadius: '50%',
                background: 'rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'white', fontSize: '0.85rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <i className="fas fa-xmark" />
            </button>

            <div style={{ overflowY: 'auto', flex: 1 }}>
              {/* Hero image */}
              <div style={{ position: 'relative', aspectRatio: '16/7', overflow: 'hidden' }}>
                <Image src={p.image} alt={p.title} fill sizes="(max-width: 767px) 100vw, 880px" style={{ objectFit: 'cover' }} priority />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
                  background: 'linear-gradient(to top, var(--bg-surface), transparent)',
                }} />
                <div style={{ position: 'absolute', bottom: 18, left: 24, display: 'flex', gap: 8 }}>
                  {[p.tags[0], p.year, 'Completed'].map((b, i) => (
                    <span key={i} style={{
                      padding: '4px 12px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 600,
                      background: i === 2 ? 'rgba(0,168,102,0.35)' : 'rgba(0,0,0,0.55)',
                      border: `1px solid ${i === 2 ? 'rgba(0,255,157,0.4)' : 'rgba(255,255,255,0.2)'}`,
                      color: i === 2 ? '#6dffc4' : 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(8px)',
                    }}>{b}</span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '26px 32px 36px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, marginBottom: 16, flexWrap: 'wrap' }}>
                  <div>
                    <h2 style={{ fontSize: '1.7rem', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1 }}>{p.title}</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 6 }}>
                      {p.client} · {p.location}
                    </p>
                  </div>
                  <Link href="/contact" onClick={onClose} className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px', flexShrink: 0 }}>
                    Diskusi Proyek <i className="fas fa-arrow-right" />
                  </Link>
                </div>

                <p style={{
                  fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.85,
                  marginBottom: 30, paddingBottom: 30, borderBottom: '1px solid var(--border)',
                }}>
                  {p.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
                  <div>
                    <h4 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>Layanan</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                      {p.services.map((s) => (
                        <li key={s} style={{ fontSize: '0.925rem', color: 'var(--text-muted)', paddingLeft: 18, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, top: 9, width: 8, height: 1, background: 'var(--accent)', display: 'block' }} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>Tech Stack</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 28 }}>
                      {p.tech.map((t) => (
                        <span key={t} style={{
                          padding: '5px 12px', background: 'var(--bg-elevated)',
                          border: '1px solid var(--border)', borderRadius: 'var(--r-sm)',
                          fontSize: '0.78rem', fontWeight: 500, color: 'var(--text-muted)',
                        }}>{t}</span>
                      ))}
                    </div>
                    <h4 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>Hasil Terukur</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                      {p.results.map((r) => (
                        <li key={r} style={{ fontSize: '0.925rem', color: 'var(--text-muted)', paddingLeft: 18, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, top: 2, color: 'var(--accent)', fontSize: '0.72rem', fontWeight: 700 }}>✓</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
