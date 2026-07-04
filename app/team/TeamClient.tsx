'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'

const teamMembers: Array<{
  name: string
  role: string
  desc: string
  img: string
  socials: Record<string, string>
}> = [
  {
    name: 'Farhan Nazrul',
    role: 'Creative Director',
    desc: 'Mantan Senior Designer di agensi multinasional dengan pengalaman 10+ tahun dalam menangani identitas visual brand-brand besar.',
    img: 'https://picsum.photos/seed/farhan1/400/500',
    socials: { linkedin: '#', instagram: '#' }
  },
  {
    name: 'Farhan Nazrul',
    role: 'Lead Frontend Engineer',
    desc: 'Arsitek di balik performa website One2Many. Pakar dalam ekosistem React, Next.js, dan optimasi arsitektur cloud.',
    img: 'https://picsum.photos/seed/farhan2/400/500',
    socials: { linkedin: '#', github: '#' }
  },
  {
    name: 'Farhan Nazrul',
    role: 'Head of Videography',
    desc: 'Sutradara dan visual storyteller yang berfokus pada produksi video kampanye dengan standar estetika sinematik.',
    img: 'https://picsum.photos/seed/farhan3/400/500',
    socials: { instagram: '#', linkedin: '#' }
  },
  {
    name: 'Farhan Nazrul',
    role: 'UI/UX Specialist',
    desc: 'Penggila riset pengguna (UX) dengan spesialisasi mengubah struktur aplikasi kompleks menjadi antarmuka yang sangat intuitif.',
    img: 'https://picsum.photos/seed/farhan4/400/500',
    socials: { linkedin: '#', dribbble: '#' }
  }
]

export default function TeamClient() {
  return (
    <main>
      <section style={{ padding: '120px 0 80px' }}>
        <div className="wrap">
          <div style={{ marginBottom: 80, paddingBottom: 40, borderBottom: '1px solid var(--border)' }}>
            <span className="section-label">Tentang Kami</span>
            <h1 className="display-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', textTransform: 'none', marginTop: 12, marginBottom: 20 }}>
              Tim <span style={{ color: 'var(--accent)' }}>Inti</span>
            </h1>
            <p className="section-sub" style={{ margin: 0, maxWidth: 700 }}>
              Alih-alih menyewa ratusan freelancer secara acak, kami beroperasi sebagai skuad pasukan khusus. Sekelompok elit kecil yang sangat terspesialisasi, gesit, dan menjamin standar kualitas tertinggi di industri.
            </p>
          </div>

          <SectionReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
              {teamMembers.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{
                    position: 'relative', overflow: 'hidden', borderRadius: 'var(--r-lg)',
                    marginBottom: 20, aspectRatio: '4/5', background: 'var(--bg-surface)'
                  }}>
                    <Image
                      src={m.img}
                      alt={m.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 260px"
                      style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 60%)',
                      opacity: 0.8
                    }} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>{m.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>{m.role}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>{m.desc}</p>

                  <div style={{ display: 'flex', gap: 12 }}>
                    {Object.keys(m.socials).map(platform => (
                      <a key={platform} href={m.socials[platform]} aria-label={platform} style={{
                        color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.2s'
                      }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}>
                        <i className={`fab fa-${platform}`} />
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal>
            <div style={{ marginTop: 100, background: 'var(--bg-surface)', padding: '60px 40px', borderRadius: 'var(--r-xl)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16 }}>Bergabung Bersama Kami</h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto 32px' }}>
                Kami selalu membuka pintu bagi talenta kreatif dan teknikal (Desainer, Developer, Videografer) yang ingin menciptakan standar baru di industri agensi digital.
              </p>
              <a href="mailto:careers@one2many.id" className="btn btn-primary" style={{ display: 'inline-flex', padding: '12px 32px' }}>
                Kirim CV / Portofolio <i className="fas fa-arrow-right" />
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  )
}
