'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SplitText from './SplitText'
import { projects } from '@/data/projects'
import Modal from './Modal'

const filters = [
  { key: 'all',      label: 'Semua' },
  { key: 'branding', label: 'Branding' },
  { key: 'ui-ux',    label: 'UI/UX' },
  { key: 'video',    label: 'Video' },
  { key: 'web',      label: 'Web Dev' },
]

const tagColors: Record<string, string> = {
  'ui-ux':  '#60a5fa',
  video:    '#f97316',
  web:      '#a78bfa',
}

export default function Work() {
  const [active, setActive] = useState('all')
  const [modalId, setModalId] = useState<string | null>(null)

  const visible = projects.filter(p => active === 'all' || p.category === active)

  return (
    <>
      <section id="work" style={{ padding: '120px 0' }}>
        <div className="wrap">

          {/* Display header */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 60, paddingBottom: 40, borderBottom: '1px solid var(--border)' }}
          >
            <span className="section-label">Portofolio</span>
            <h1 className="display-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', textTransform: 'none', marginTop: 12, marginBottom: 20 }}>
              <SplitText text="Karya Terbaik" accentWords={['Terbaik']} />
            </h1>
            <p className="section-sub" style={{ margin: 0, maxWidth: 600 }}>
              Jelajahi berbagai studi kasus transformasi digital yang telah kami selesaikan untuk UMKM dan startup dari berbagai industri.
            </p>
          </motion.div>

          {/* Filter bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 12, marginBottom: 40,
          }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {filters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setActive(f.key)}
                  style={{
                    padding: '8px 20px', borderRadius: 100,
                    border: `1px solid ${active === f.key ? 'var(--accent)' : 'var(--border)'}`,
                    background: active === f.key ? 'var(--accent)' : 'transparent',
                    color: active === f.key ? '#000' : 'var(--text-muted)',
                    fontSize: '0.82rem', fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{visible.length} proyek</span>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="work-grid">
            {visible.map((p, i) => (
              <motion.article
                key={p.id}
                className="work-card"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.055 }}
                onClick={() => setModalId(p.id)}
                style={{
                  background: 'var(--bg-surface)', border: '1px solid var(--border)',
                  borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column',
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="work-thumb" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/10' }}>
                  <Image src={p.thumb} alt={p.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                  {/* Stat badge */}
                  <div style={{
                    position: 'absolute', bottom: 12, left: 12, zIndex: 2,
                    background: 'rgba(0,0,0,0.72)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 100,
                    padding: '5px 12px',
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: '0.7rem', fontWeight: 700, color: '#fff',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}>
                    <i className="fas fa-chart-line" style={{ fontSize: '0.6rem', color: 'var(--accent)' }} />
                    {p.stat}
                  </div>
                  <div className="work-overlay" style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'var(--accent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#000', fontSize: '1rem',
                    }}>
                      <i className="fas fa-arrow-right" />
                    </div>
                  </div>
                </div>

                <div style={{ padding: '20px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                    {p.tags.map(t => {
                      const hex = tagColors[p.category]
                      return (
                        <span key={t} style={{
                          padding: '3px 10px', borderRadius: 100,
                          background: hex ? `${hex}18` : 'var(--accent-dim)',
                          border: hex ? `1px solid ${hex}35` : '1px solid var(--accent)',
                          fontSize: '0.7rem', fontWeight: 600,
                          color: hex || 'var(--accent)',
                        }}>{t}</span>
                      )
                    })}
                    <span style={{ padding: '3px 10px', borderRadius: 100, background: 'var(--bg-elevated)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {p.year}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: 5, lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>{p.client}</p>

                  <div style={{
                    marginTop: 'auto',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: 14, borderTop: '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {p.status}
                    </span>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-muted)', fontSize: '0.7rem',
                    }}>
                      <i className="fas fa-arrow-right" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Modal id={modalId} onClose={() => setModalId(null)} />
    </>
  )
}
