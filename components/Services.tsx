'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SplitText from './SplitText'

const services: { icon: string; title: string; slug: string; tagline: string; desc: string; deliverables: string[]; timeline: string; price: string; projects: number; badge?: string }[] = [
  {
    icon: 'fa-paint-brush',
    title: 'Graphic Design',
    slug: 'graphic-design',
    tagline: 'Brand identity yang memorable & konsisten',
    desc: 'Visual identity dari logo, social media kit, hingga materi marketing — semua dalam satu sistem yang kohesif dan siap produksi.',
    deliverables: ['Logo & Brand System', 'Social Media Kit', 'Marketing Collateral', 'Brand Guideline'],
    timeline: '2–4 minggu',
    price: 'Mulai Rp 8jt',
    projects: 12,
  },
  {
    icon: 'fa-laptop-code',
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    tagline: 'Antarmuka intuitif yang meningkatkan konversi',
    desc: 'UX research, wireframe, hingga design system lengkap — antarmuka yang pengguna cinta dan mudah di-handoff ke developer.',
    deliverables: ['UX Research & Audit', 'Wireframe & Prototype', 'UI Design System', 'Usability Testing'],
    timeline: '3–6 minggu',
    price: 'Mulai Rp 12jt',
    projects: 18,
  },
  {
    icon: 'fa-code',
    title: 'Web Development',
    slug: 'web-development',
    tagline: 'Website performa tinggi, SEO dari hari pertama',
    desc: 'Next.js, React, full-stack — dibangun dengan PageSpeed 95+ dan arsitektur scalable yang siap untuk pertumbuhan bisnis.',
    deliverables: ['Next.js / React App', 'CMS Integration', 'SEO & Core Web Vitals', 'Deployment & Support'],
    timeline: '4–8 minggu',
    price: 'Mulai Rp 15jt',
    projects: 8,
  },
  {
    icon: 'fa-video',
    title: 'Video Production',
    slug: 'video-production',
    tagline: 'Storytelling visual yang stop the scroll',
    desc: 'Brand film, motion graphics, dan konten video yang diproduksi untuk semua platform — dari TikTok hingga YouTube dan pitch deck.',
    deliverables: ['Creative Concept & Script', 'On-Location Shooting', 'Editing & Color Grading', 'Motion Graphics'],
    timeline: '2–5 minggu',
    price: 'Mulai Rp 10jt',
    projects: 9,
  },
  {
    icon: 'fa-mobile-alt',
    title: 'Mobile App Dev',
    slug: 'mobile-development',
    tagline: 'iOS & Android — dari MVP hingga production-ready',
    desc: 'Aplikasi mobile cross-platform dengan React Native atau Flutter. Satu codebase untuk iOS & Android, performa mendekati native, siap submit ke App Store & Play Store.',
    deliverables: ['UI/UX Mobile Design', 'React Native / Flutter', 'API & Backend Integration', 'App Store Submission'],
    timeline: '6–16 minggu',
    price: 'Mulai Rp 25jt',
    projects: 4,
  },
  {
    icon: 'fa-graduation-cap',
    title: 'Pelajar & Freelancer',
    slug: 'pelajar',
    tagline: 'Desain profesional mulai Rp 39rb — tanpa minimum order',
    desc: 'CV, poster kampus, pitch deck PKM, kaos organisasi, hingga landing page portofolio — semua tersedia satuan maupun bundle dengan harga yang ramah di kantong pelajar.',
    deliverables: ['CV / Resume ATS-friendly', 'Poster & Banner Digital', 'Pitch Deck / Presentasi', 'Bundle Kepanitiaan'],
    timeline: '1–3 hari kerja',
    price: 'Mulai Rp 39rb',
    projects: 0,
    badge: 'Khusus Pelajar',
  },
]

export default function Services() {
  return (
    <section id="services" style={{ padding: '120px 0' }}>
      <div className="wrap">

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 60, paddingBottom: 40, borderBottom: '1px solid var(--border)' }}
        >
          <span className="section-label">Layanan Kami</span>
          <h1 className="display-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', textTransform: 'none', marginTop: 12, marginBottom: 20 }}>
            <SplitText text="Layanan Terintegrasi" accentWords={['Terintegrasi']} />
          </h1>
          <p className="section-sub" style={{ margin: 0, maxWidth: 600 }}>
            Satu ekosistem layanan terintegrasi. Bukan kumpulan vendor terpisah — satu kontrak, satu titik kontak, tanpa friksi.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="services-grid">
          {services.map((s, i) => {
            const isHighlight = i === 0
            const isLastOdd = i === services.length - 1 && services.length % 2 === 1
            return (
              <Link href={`/services/${s.slug}`} key={s.slug} style={{ display: 'contents' }}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  style={{
                    padding: '32px',
                    borderRadius: 20,
                    background: isHighlight ? 'var(--accent)' : 'var(--bg-surface)',
                    border: isHighlight ? 'none' : '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    gridColumn: isLastOdd ? '1 / -1' : undefined,
                  }}
                >
                  {/* Top row: icon + badge */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 14,
                      background: isHighlight ? 'rgba(0,0,0,0.12)' : 'rgba(194,255,0,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.1rem',
                      color: isHighlight ? '#000' : 'var(--accent)',
                    }}>
                      <i className={`fas ${s.icon}`} />
                    </div>
                    {s.badge ? (
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '4px 10px', borderRadius: 100, background: isHighlight ? 'rgba(0,0,0,0.12)' : 'var(--accent)', color: isHighlight ? 'rgba(0,0,0,0.7)' : '#000', letterSpacing: '0.04em' }}>
                        {s.badge}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '4px 10px', borderRadius: 100, background: isHighlight ? 'rgba(0,0,0,0.12)' : 'var(--bg-elevated)', color: isHighlight ? 'rgba(0,0,0,0.7)' : 'var(--text-muted)', letterSpacing: '0.04em' }}>
                        {s.projects} proyek selesai
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.3rem', fontWeight: 800,
                    color: isHighlight ? '#000' : 'var(--text)',
                    marginBottom: 4, lineHeight: 1.2,
                  }}>
                    {s.title}
                  </h3>

                  {/* Tagline */}
                  <p style={{
                    fontSize: '0.78rem', fontWeight: 600,
                    color: isHighlight ? 'rgba(0,0,0,0.5)' : 'var(--accent)',
                    marginBottom: 14,
                  }}>
                    {s.tagline}
                  </p>

                  {/* Desc */}
                  <p style={{
                    fontSize: '0.875rem', lineHeight: 1.75,
                    color: isHighlight ? 'rgba(0,0,0,0.62)' : 'var(--text-muted)',
                    marginBottom: 24,
                  }}>
                    {s.desc}
                  </p>

                  {/* Deliverables */}
                  <div style={{
                    padding: '16px 0',
                    borderTop: `1px solid ${isHighlight ? 'rgba(0,0,0,0.12)' : 'var(--border)'}`,
                    borderBottom: `1px solid ${isHighlight ? 'rgba(0,0,0,0.12)' : 'var(--border)'}`,
                    marginBottom: 20,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '9px 12px',
                  }}>
                    {s.deliverables.map(d => (
                      <div key={d} style={{
                        display: 'flex', alignItems: 'center', gap: 7,
                        fontSize: '0.775rem', fontWeight: 600,
                        color: isHighlight ? 'rgba(0,0,0,0.75)' : 'var(--text)',
                      }}>
                        <i className="fas fa-check" style={{
                          fontSize: '0.58rem', flexShrink: 0,
                          color: isHighlight ? '#000' : 'var(--accent)',
                        }} />
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Bottom: timeline + price + arrow */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    marginTop: 'auto',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <i className="fas fa-clock" style={{
                        fontSize: '0.62rem',
                        color: isHighlight ? 'rgba(0,0,0,0.4)' : 'var(--text-muted)',
                      }} />
                      <span style={{
                        fontSize: '0.75rem', fontWeight: 600,
                        color: isHighlight ? 'rgba(0,0,0,0.6)' : 'var(--text-muted)',
                      }}>
                        {s.timeline}
                      </span>
                    </div>
                    <div style={{ width: 1, height: 12, background: isHighlight ? 'rgba(0,0,0,0.15)' : 'var(--border)' }} />
                    <div style={{
                      fontSize: '0.8rem', fontWeight: 800,
                      color: isHighlight ? '#000' : 'var(--text)',
                    }}>
                      {s.price}
                    </div>
                    <div style={{
                      marginLeft: 'auto',
                      width: 36, height: 36, borderRadius: '50%',
                      background: isHighlight ? 'rgba(0,0,0,0.12)' : 'var(--bg-elevated)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem',
                      color: isHighlight ? '#000' : 'var(--text-muted)',
                    }}>
                      <i className="fas fa-arrow-right" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>

      <style>{`
        @media(max-width:640px){
          .services-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  )
}
