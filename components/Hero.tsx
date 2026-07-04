'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Link from 'next/link'
import MagneticButton from './MagneticButton'

const rotatingWords = ['Branding', 'UI/UX', 'Web Dev', 'Mobile', 'Video']

const statCards = [
  { val: '47+',  label: 'Proyek Selesai' },
  { val: '5',    label: 'Core Services' },
  { val: '< 6',  label: 'Minggu Pengerjaan' },
  { val: '2024', label: 'Tahun Berdiri' },
]

const up = (d = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] as const },
})

export default function Hero() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % rotatingWords.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '130px 0 80px',
    }}>

      {/* bg */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: -300, right: -300,
          width: 800, height: 800,
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: -150, left: -150,
          width: 600, height: 600,
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }} />
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '6vw',
          alignItems: 'center',
        }} className="hero-two-col">

          {/* ── LEFT ── */}
          <div>
            <motion.div {...up(0)} style={{ marginBottom: 28 }}>
              <span className="pill" style={{ fontSize: '0.75rem', letterSpacing: '0.06em' }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--accent)', flexShrink: 0,
                  boxShadow: 'var(--accent-glow)',
                  animation: 'heroBlink 2s ease-in-out infinite',
                }} />
                Agensi Kreatif Digital Terintegrasi
              </span>
            </motion.div>

            <motion.h1 {...up(0.07)} style={{
              fontSize: 'clamp(3rem, 6vw, 5.2rem)',
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: '-0.05em',
              marginBottom: 8,
            }}>
              Satu Vendor.
            </motion.h1>

            <motion.div {...up(0.12)} style={{
              fontSize: 'clamp(3rem, 6vw, 5.2rem)',
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: '-0.05em',
              display: 'flex', alignItems: 'center', gap: '0.2em',
              marginBottom: 28,
            }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Solusi</span>
              <span style={{ position: 'relative', display: 'inline-block', height: '1.2em', minWidth: '4.5em', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={idx}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-110%' }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: 'absolute', left: 0, top: '0.05em', color: 'var(--accent)', display: 'block', whiteSpace: 'nowrap' }}
                  >
                    {rotatingWords[idx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.p {...up(0.2)} style={{
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              maxWidth: 420,
              marginBottom: 36,
            }}>
              Menghapus hambatan multi-vendor dengan menghadirkan solusi kreatif dan teknis dalam satu alur kerja yang presisi.
            </motion.p>

            <motion.div {...up(0.26)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <MagneticButton>
                <Link href="/order" className="btn btn-primary">
                  Mulai Proyek <i className="fas fa-arrow-right" style={{ fontSize: '0.85em' }} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/work" className="btn btn-ghost">Lihat Portofolio</Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* ── RIGHT: stat cards ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}>
            {statCards.map((card, i) => {
              const isAccent = i === 0
              const rotations = [-2, 2, 1.5, -1.5]
              return (
                <motion.div
                  key={card.val}
                  initial={{ opacity: 0, y: 40, rotate: rotations[i] }}
                  animate={{ opacity: 1, y: 0, rotate: rotations[i] }}
                  transition={{ delay: 0.35 + i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, rotate: 0, transition: { duration: 0.2 } }}
                  style={{
                    padding: '28px 24px',
                    borderRadius: 20,
                    background: isAccent ? 'var(--accent)' : 'var(--bg-surface)',
                    border: isAccent ? 'none' : '1px solid var(--border)',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: isAccent ? '#000' : 'var(--accent)',
                    letterSpacing: '-0.03em',
                    marginBottom: 10,
                  }}>
                    {card.val}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: isAccent ? '#000' : 'var(--text)',
                  }}>
                    {card.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* scroll */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
        style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          color: 'var(--text-muted)', fontSize: '0.62rem', letterSpacing: '0.14em',
          textTransform: 'uppercase', zIndex: 1,
        }}
      >
        <span>scroll</span>
        <motion.div
          animate={{ scaleY: [0, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, background: 'var(--accent)', transformOrigin: 'top' }}
        />
      </motion.div>

      <style>{`
        @keyframes heroBlink {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:.2;transform:scale(.6)}
        }
        @media(max-width:900px){
          .hero-two-col{grid-template-columns:1fr!important}
        }
        @media(max-width:767px){
          #home{padding:110px 0 60px!important}
        }
      `}</style>
    </section>
  )
}
