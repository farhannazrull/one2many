'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Partner = {
  name: string
  role: string
  spec: string
  location: string
  projects: number
  tags: string[]
  socials: Partial<Record<'linkedin' | 'instagram' | 'github' | 'dribbble' | 'behance', string>>
  since: string
}

const SPECS = ['Semua', 'Desainer Grafis', 'UI/UX Designer', 'Frontend Dev', 'Backend Dev', 'Videografer', 'Copywriter', 'Motion Designer']

const partners: Partner[] = [
  {
    name: 'Rizky Aditya',
    role: 'Desainer Grafis',
    spec: 'Desainer Grafis',
    location: 'Surabaya',
    projects: 24,
    tags: ['Brand Identity', 'Ilustrasi', 'Print'],
    socials: { instagram: '#', behance: '#' },
    since: '2023',
  },
  {
    name: 'Siti Nurhaliza',
    role: 'UI/UX Designer',
    spec: 'UI/UX Designer',
    location: 'Jakarta',
    projects: 18,
    tags: ['Figma', 'UX Research', 'Mobile Design'],
    socials: { linkedin: '#', dribbble: '#' },
    since: '2024',
  },
  {
    name: 'Bagas Prasetyo',
    role: 'Frontend Developer',
    spec: 'Frontend Dev',
    location: 'Bandung',
    projects: 12,
    tags: ['React', 'Next.js', 'Tailwind'],
    socials: { linkedin: '#', github: '#' },
    since: '2024',
  },
  {
    name: 'Nadia Aulia',
    role: 'Copywriter & Content Strategist',
    spec: 'Copywriter',
    location: 'Yogyakarta',
    projects: 31,
    tags: ['Copywriting', 'SEO', 'Social Media'],
    socials: { instagram: '#', linkedin: '#' },
    since: '2023',
  },
  {
    name: 'Andi Firmansyah',
    role: 'Videografer & Editor',
    spec: 'Videografer',
    location: 'Surabaya',
    projects: 9,
    tags: ['Cinematic', 'Color Grading', 'Drone'],
    socials: { instagram: '#', linkedin: '#' },
    since: '2024',
  },
  {
    name: 'Dewi Rahmawati',
    role: 'Motion Designer',
    spec: 'Motion Designer',
    location: 'Malang',
    projects: 15,
    tags: ['After Effects', 'Lottie', 'Explainer Video'],
    socials: { behance: '#', instagram: '#' },
    since: '2023',
  },
  {
    name: 'Irfan Maulana',
    role: 'Backend Developer',
    spec: 'Backend Dev',
    location: 'Jakarta',
    projects: 8,
    tags: ['Node.js', 'PostgreSQL', 'REST API'],
    socials: { github: '#', linkedin: '#' },
    since: '2024',
  },
  {
    name: 'Putri Wulandari',
    role: 'Desainer Grafis',
    spec: 'Desainer Grafis',
    location: 'Bali',
    projects: 20,
    tags: ['Packaging', 'Social Media', 'Typography'],
    socials: { instagram: '#', behance: '#' },
    since: '2023',
  },
  {
    name: 'Yoga Pratama',
    role: 'UI/UX Designer',
    spec: 'UI/UX Designer',
    location: 'Surabaya',
    projects: 11,
    tags: ['Web Design', 'Wireframe', 'Design System'],
    socials: { dribbble: '#', linkedin: '#' },
    since: '2025',
  },
]

const PLATFORM_ICONS: Record<string, string> = {
  linkedin:  'fa-linkedin',
  instagram: 'fa-instagram',
  github:    'fa-github',
  dribbble:  'fa-dribbble',
  behance:   'fa-behance',
}

export default function PartnersClient() {
  const [activeSpec, setActiveSpec] = useState('Semua')

  const filtered = activeSpec === 'Semua'
    ? partners
    : partners.filter(p => p.spec === activeSpec)

  return (
    <main style={{ minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ padding: '120px 0 80px', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap">
          <span className="section-label">Jaringan Mitra</span>
          <h1 className="display-title" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', textTransform: 'none', marginTop: 12, marginBottom: 20 }}>
            Dikerjakan oleh <span style={{ color: 'var(--accent)' }}>Orang Nyata</span>
          </h1>
          <p className="section-sub" style={{ margin: '0 0 48px', maxWidth: 600 }}>
            One2Many beroperasi bersama jaringan mitra freelancer terseleksi — spesialis di bidangnya masing-masing. Bukan generalis, bukan asal murah: setiap mitra sudah melewati seleksi portofolio dan uji kolaborasi sebelum bergabung.
          </p>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { value: `${partners.length}+`, label: 'Mitra Aktif' },
              { value: `${partners.reduce((a, p) => a + p.projects, 0)}+`, label: 'Proyek Selesai' },
              { value: '7', label: 'Spesialisasi' },
              { value: '5 kota', label: 'Lokasi Mitra' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + grid */}
      <section style={{ padding: '60px 0 120px' }}>
        <div className="wrap">

          {/* Spec filter */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
            {SPECS.map(spec => (
              <button
                key={spec}
                onClick={() => setActiveSpec(spec)}
                style={{
                  padding: '8px 18px', borderRadius: 100, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: 'none',
                  background: activeSpec === spec ? 'var(--accent)' : 'var(--bg-surface)',
                  color:      activeSpec === spec ? '#000' : 'var(--text-muted)',
                  border:     activeSpec === spec ? 'none' : '1px solid var(--border)',
                  transition: 'all 0.15s',
                } as React.CSSProperties}
              >
                {spec}
              </button>
            ))}
          </div>

          {/* Partner grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            <AnimatePresence mode="popLayout">
              {filtered.map(p => (
                <motion.div
                  key={p.name + p.spec}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    background: 'var(--bg-surface)', border: '1px solid var(--border)',
                    borderRadius: 'var(--r-xl)', padding: 24, display: 'flex', flexDirection: 'column', gap: 16,
                  }}
                >
                  {/* Avatar + name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                      background: `hsl(${(p.name.charCodeAt(0) * 47) % 360}, 55%, 42%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.3rem', fontWeight: 900, color: '#fff',
                    }}>
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1.2 }}>{p.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, marginTop: 2 }}>{p.role}</div>
                    </div>
                  </div>

                  {/* Meta */}
                  <div style={{ display: 'flex', gap: 16, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span><i className="fas fa-map-marker-alt" style={{ marginRight: 5, color: 'var(--accent)', fontSize: '0.65rem' }} />{p.location}</span>
                    <span><i className="fas fa-briefcase" style={{ marginRight: 5, color: 'var(--accent)', fontSize: '0.65rem' }} />{p.projects} proyek</span>
                    <span><i className="fas fa-calendar-alt" style={{ marginRight: 5, color: 'var(--accent)', fontSize: '0.65rem' }} />Sejak {p.since}</span>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Social */}
                  <div style={{ display: 'flex', gap: 10, marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                    {(Object.entries(p.socials) as [string, string][]).map(([platform, href]) => (
                      <a key={platform} href={href} aria-label={platform} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
                      >
                        <i className={`fab ${PLATFORM_ICONS[platform]}`} />
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA bergabung */}
      <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '80px 0' }}>
        <div className="wrap">
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', background: 'var(--accent-dim)', color: 'var(--accent)', fontSize: '0.72rem', fontWeight: 700, padding: '4px 14px', borderRadius: 100, border: '1px solid rgba(194,255,0,0.3)', letterSpacing: '0.06em', marginBottom: 20 }}>
              OPEN COLLABORATION
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 16 }}>
              Bergabung sebagai Mitra Freelancer
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 36, fontSize: '0.95rem' }}>
              Kami mencari desainer, developer, videografer, dan copywriter yang ingin mengerjakan proyek nyata bersama tim One2Many. Tidak perlu ngejar klien sendiri — kamu fokus pada keahlianmu, kami yang handle brief dan pembayaran.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
              {['Portofolio kuat', 'Komunikatif & on-time', 'Berpengalaman min. 1 tahun', 'Open untuk feedback'].map(r => (
                <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.6rem' }} />
                  {r}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? '6281234567890'}?text=Halo%2C%20saya%20tertarik%20bergabung%20sebagai%20mitra%20freelancer%20One2Many.`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-flex', gap: 8, padding: '13px 28px' }}
              >
                <i className="fab fa-whatsapp" /> Chat via WhatsApp
              </a>
              <a href="mailto:partners@one2many.id" className="btn btn-outline" style={{ display: 'inline-flex', gap: 8, padding: '13px 28px' }}>
                <i className="fas fa-envelope" /> Kirim Portofolio
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
