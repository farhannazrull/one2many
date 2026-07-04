'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import Modal from './Modal'

const filters = [
  { key: 'all', label: 'Semua' },
  { key: 'branding', label: 'Branding' },
  { key: 'ui-ux', label: 'UI/UX' },
  { key: 'video', label: 'Video' },
  { key: 'web', label: 'Web Dev' },
]

const iconMap: Record<string, string> = {
  'paint-brush': 'fa-paint-brush',
  'laptop-code': 'fa-laptop-code',
  video: 'fa-video',
  gem: 'fa-gem',
  'mobile-alt': 'fa-mobile-alt',
  code: 'fa-code',
}

export default function Repository() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [modalId, setModalId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return projects.filter((p) => {
      const matchFilter = filter === 'all' || p.category === filter
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      return matchFilter && matchSearch
    })
  }, [filter, search])

  return (
    <>
      <section id="repository" style={{ padding: '120px 0', background: 'var(--bg-surface)' }}>
        <div className="wrap">
          <div style={{ marginBottom: 60, paddingBottom: 40, borderBottom: '1px solid var(--border)' }}>
            <span className="section-label">Repositori Proyek</span>
            <h1 className="display-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', textTransform: 'none', marginTop: 12, marginBottom: 20 }}>
              Katalog <span style={{ color: 'var(--accent)' }}>Proyek</span>
            </h1>
            <p className="section-sub" style={{ margin: 0, maxWidth: 600 }}>
              Seluruh proyek yang telah kami kerjakan — lengkap dengan detail layanan, tech stack, dan hasil terukur.
            </p>
          </div>

          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 360, minWidth: 200 }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.78rem', pointerEvents: 'none' }} />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari proyek, klien, atau teknologi..."
                autoComplete="off"
                style={{
                  width: '100%', padding: '11px 14px 11px 38px',
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-sm)', color: 'var(--text)', fontSize: '0.875rem',
                  outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '8px 16px',
                    border: `1px solid ${filter === f.key ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 100,
                    background: filter === f.key ? 'var(--accent)' : 'transparent',
                    color: filter === f.key ? '#000' : 'var(--text-muted)',
                    fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {f.label}
                  {f.key === 'all' && (
                    <span style={{ background: 'rgba(0,0,0,0.15)', borderRadius: 10, padding: '1px 7px', fontSize: '0.7rem', fontWeight: 700 }}>
                      {filtered.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          {filtered.length > 0 ? (
            <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden', background: 'var(--bg)' }}>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  onClick={() => setModalId(p.id)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setModalId(p.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 18,
                    padding: '18px 24px',
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                    cursor: 'pointer', transition: 'background 0.2s',
                  }}
                  whileHover={{ backgroundColor: 'var(--bg-surface)' } as never}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 'var(--r-sm)',
                    background: p.accentColor,
                    border: `1px solid ${p.iconColor}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.95rem', flexShrink: 0,
                  }}>
                    <i className={`fas ${iconMap[p.icon] || 'fa-folder'}`} style={{ color: p.iconColor }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.925rem', fontWeight: 700 }}>{p.title}</span>
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 600, padding: '2px 9px', borderRadius: 100,
                        background: 'rgba(0,168,102,0.12)', color: '#00a866',
                        border: '1px solid rgba(0,168,102,0.25)',
                      }}>{p.status}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 7 }}>
                      {p.description.substring(0, 90)}…
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      {p.tags.map((t) => (
                        <span key={t} style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 4, background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{t}</span>
                      ))}
                      <span style={{ color: 'var(--border-strong)', fontSize: '0.6rem' }}>·</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.client}</span>
                      <span style={{ color: 'var(--border-strong)', fontSize: '0.6rem' }}>·</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.year}</span>
                    </div>
                  </div>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    border: '1px solid var(--border)', color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem',
                    transition: 'all 0.2s',
                  }}>
                    <i className="fas fa-arrow-right" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 24px', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)' }}>
              <i className="fas fa-folder-open" style={{ fontSize: '2rem', display: 'block', marginBottom: 12, opacity: 0.4 }} />
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Tidak ada proyek yang cocok dengan pencarian.</p>
            </div>
          )}
        </div>
      </section>

      <Modal id={modalId} onClose={() => setModalId(null)} />
    </>
  )
}
