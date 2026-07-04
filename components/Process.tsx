'use client'
import { motion } from 'framer-motion'
import SplitText from './SplitText'

const steps = [
  {
    n: '01', icon: 'fa-lightbulb', title: 'Discovery',
    duration: '1–2 minggu',
    client: 'Brief, referensi, & aset yang ada',
    desc: 'Stakeholder interview, analisis kompetitor, dan riset target market untuk memahami bisnis Anda secara menyeluruh.',
    deliverables: ['Project brief dokumen', 'Competitive analysis', 'Moodboard & direction'],
  },
  {
    n: '02', icon: 'fa-map', title: 'Planning',
    duration: '1 minggu',
    client: 'Review & tanda tangan kontrak',
    desc: 'Project roadmap, arsitektur solusi, sprint planning, dan finalisasi kontrak + DP sebelum eksekusi dimulai.',
    deliverables: ['Project roadmap', 'Timeline & milestones', 'Kontrak & invoice DP'],
  },
  {
    n: '03', icon: 'fa-code', title: 'Execution',
    duration: 'Sprint 2 minggu',
    client: 'Feedback tiap akhir sprint',
    desc: 'Pengerjaan iteratif dengan update setiap minggu via Notion & Figma. Klien review dan approve tiap milestone.',
    deliverables: ['Weekly progress update', 'Draft untuk review', 'Revisi per sprint'],
  },
  {
    n: '04', icon: 'fa-rocket', title: 'Launch & Handoff',
    duration: '1 minggu',
    client: 'Final approval & pelunasan',
    desc: 'QA menyeluruh, deployment, serah terima semua source file terorganisir, dan 30 hari post-launch support.',
    deliverables: ['Semua file source', 'Dokumentasi teknis', '30 hari post-launch support'],
  },
]

export default function Process() {
  return (
    <section id="process" style={{ padding: '120px 0' }}>
      <div className="wrap">

        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr',
          gap: '6vw', alignItems: 'end', marginBottom: 80,
        }} className="process-header">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">Cara Kerja</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
              <SplitText text="Dari Brief ke" />
              <SplitText text="Launch" style={{ color: 'var(--accent)' }} delay={0.2} />
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8 }}
          >
            Metodologi Agile Scrum dengan sprint 2 minggu. Setiap langkah transparan,
            terukur, dan selalu on-track sesuai brief awal.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 2,
          background: 'var(--border)',
          borderRadius: 24,
          overflow: 'hidden',
        }} className="process-steps-grid">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'var(--bg)',
                padding: '32px 28px',
                display: 'flex', flexDirection: 'column', gap: 0,
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.1em' }}>
                  {s.n}
                </span>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: 'var(--bg-surface)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)', fontSize: '0.85rem',
                }}>
                  <i className={`fas ${s.icon}`} />
                </div>
              </div>

              {/* Duration badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: '0.68rem', fontWeight: 700,
                color: 'var(--text-muted)', marginBottom: 10,
              }}>
                <i className="fas fa-clock" style={{ fontSize: '0.6rem' }} />
                {s.duration}
              </span>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: '0.845rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 18 }}>{s.desc}</p>

              {/* Deliverables */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
                {s.deliverables.map(d => (
                  <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--text)' }}>
                    <i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.55rem', flexShrink: 0 }} />
                    {d}
                  </div>
                ))}
              </div>

              {/* Client action */}
              <div style={{
                marginTop: 'auto',
                padding: '10px 12px',
                background: 'var(--bg-surface)',
                borderRadius: 8, fontSize: '0.72rem',
                color: 'var(--text-muted)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <i className="fas fa-user" style={{ fontSize: '0.6rem', color: 'var(--accent)' }} />
                <span><strong style={{ color: 'var(--text)' }}>Klien:</strong> {s.client}</span>
              </div>

              <div style={{ marginTop: 16, height: 3, borderRadius: 2, background: i === 0 ? 'var(--accent)' : 'var(--bg-elevated)' }} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){
          .process-header{grid-template-columns:1fr!important;gap:24px!important}
          .process-steps-grid{grid-template-columns:repeat(2,1fr)!important}
        }
        @media(max-width:640px){
          .process-steps-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  )
}
