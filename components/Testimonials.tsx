'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import SplitText from './SplitText'

const testi = [
  {
    quote: '"Working with one2many has been an amazing experience. They delivered beyond our expectations — single vendor, single point of contact, zero hassle."',
    name:  'Sarah Johnson',
    role:  'CEO, Tech Innovators',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    stars: 5,
  },
  {
    quote: '"The UI/UX design team delivered exceptional work that significantly improved our user engagement. Proses terstruktur, hasilnya jauh melampaui ekspektasi kami."',
    name:  'Michael Chen',
    role:  'Product Manager, AppSolutions',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    stars: 5,
  },
  {
    quote: '"Their video production quality is outstanding. They captured our brand\'s essence — dan 40% lebih cepat dari estimasi awal. Impressive."',
    name:  'Emma Davis',
    role:  'Marketing Director, BrandVision',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    stars: 5,
  },
]

export default function Testimonials() {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % testi.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="testimonials" style={{ padding: '120px 0', background: 'var(--bg-surface)' }}>
      <div className="wrap">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.8fr',
          gap: '7vw', alignItems: 'center',
        }} className="testi-grid">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">Klien Kami</span>
            <h2 className="section-title" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 0 }}>
              <SplitText text="Real People," />
              <SplitText text="Real Results" accentWords={['Results']} delay={0.18} />
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>
              Bukan sekadar testimoni — ini adalah hasil nyata dari klien yang mempercayakan brand mereka kepada kami.
            </p>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 8 }}>
              {testi.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCur(i)}
                  style={{
                    width: cur === i ? 28 : 8, height: 8,
                    borderRadius: 4, border: 'none', cursor: 'pointer',
                    background: cur === i ? 'var(--accent)' : 'var(--border-strong)',
                    transition: 'all 0.25s',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <div style={{ position: 'relative', minHeight: 280 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={cur}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.38 }}
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 24,
                  padding: '44px 48px',
                }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: 4, color: 'var(--accent)', marginBottom: 24, fontSize: '0.9rem' }}>
                  {[...Array(testi[cur].stars)].map((_, i) => (
                    <i key={i} className="fas fa-star" />
                  ))}
                </div>

                {/* Quote */}
                <p style={{
                  fontSize: '1.15rem',
                  lineHeight: 1.85,
                  fontStyle: 'italic',
                  marginBottom: 36,
                  color: 'var(--text)',
                }}>
                  {testi[cur].quote}
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Image
                    src={testi[cur].avatar}
                    alt={testi[cur].name}
                    width={48}
                    height={48}
                    style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-strong)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{testi[cur].name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{testi[cur].role}</div>
                  </div>
                  {/* Nav buttons */}
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                    {['fa-chevron-left', 'fa-chevron-right'].map((ic, i) => (
                      <button key={ic} onClick={() => setCur(c => (c + (i === 0 ? -1 : 1) + testi.length) % testi.length)} style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'var(--bg-surface)', border: '1px solid var(--border)',
                        color: 'var(--text-muted)', fontSize: '0.75rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}>
                        <i className={`fas ${ic}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .testi-grid{grid-template-columns:1fr!important;gap:40px!important}
        }
        @media(max-width:767px){
          .testi-grid > div:last-child > div{padding:28px 24px!important}
        }
      `}</style>
    </section>
  )
}
