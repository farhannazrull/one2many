'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import SplitText from './SplitText'

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let startTime: number | null = null
    const duration = 1800

    function step(ts: number) {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * target))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return (
    <div ref={ref} style={{ lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 4 }}>
      <span style={{ fontSize: 'clamp(4rem, 7vw, 7rem)', fontWeight: 900, color: 'var(--accent)' }}>
        {count}
      </span>
      <span style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontWeight: 900, color: 'var(--text)', marginTop: '0.15em' }}>
        {suffix}
      </span>
    </div>
  )
}

const numbers = [
  {
    val: '35',
    unit: '+',
    label: 'Klien B2B',
    desc: 'Bisnis dari skala UMKM hingga startup Series A yang sudah menjadi klien atau dalam pipeline kami.',
  },
  {
    val: '40',
    unit: '%',
    label: 'Faster Launch',
    desc: 'Penghematan time-to-market berkat internal component library & SOP kami.',
  },
  {
    val: '78',
    unit: 'JT',
    label: 'Avg Revenue',
    desc: 'Rata-rata nilai proyek per klien (blended ARPC) di semua layanan terintegrasi.',
  },
]

const reasons = [
  {
    n: '01',
    icon: 'fa-layer-group',
    title: 'Single-Vendor Bundling',
    desc: 'Satu kontrak, satu PM, satu alur kerja. Tidak ada miskomunikasi antar vendor, tidak ada gap tanggung jawab.',
    metric: '1 titik kontak',
    metricSub: 'untuk semua layanan',
  },
  {
    n: '02',
    icon: 'fa-gem',
    title: 'Lebih Hemat dari Multi-Vendor',
    desc: 'Satu tim terintegrasi memangkas overhead koordinasi 3–5 vendor — tidak ada markup berlapis, tidak ada brief yang hilang di tengah jalan.',
    metric: '~40% lebih efisien',
    metricSub: 'vs. pakai multi-vendor terpisah',
  },
  {
    n: '03',
    icon: 'fa-bolt',
    title: 'Internal Component Library',
    desc: 'UI kit & design tokens privat siap pakai — sprint lebih cepat tanpa kompromikan standar kualitas output.',
    metric: '40% faster',
    metricSub: 'time-to-market rata-rata',
  },
]

export default function Why() {
  return (
    <section style={{ padding: '120px 0', background: 'var(--bg-surface)' }}>
      <div className="wrap">

        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: '6vw',
          alignItems: 'end',
          marginBottom: 80,
        }} className="why-header-row">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">Kenapa one2many?</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
              <SplitText text="The Numbers" />
              <SplitText text="Behind Us" style={{ color: 'var(--accent)' }} delay={0.18} />
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8 }}
          >
            Data yang berbicara. Setiap angka adalah komitmen nyata kami terhadap kualitas eksekusi
            dan hasil terukur untuk klien B2B.
          </motion.p>
        </div>

        {/* Big number cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          background: 'var(--border)',
          borderRadius: 24,
          overflow: 'hidden',
          marginBottom: 80,
        }} className="numbers-grid">
          {numbers.map((n, i) => (
            <motion.div
              key={n.val}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'var(--bg-surface)',
                padding: '52px 40px',
              }}
            >
              <AnimatedCounter target={parseInt(n.val)} suffix={n.unit} />
              <div style={{
                fontSize: '0.8rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--text)', marginBottom: 12,
              }}>
                {n.label}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                {n.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reason cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }} className="why-reasons">
          {reasons.map((r, i) => (
            <motion.div
              key={r.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '32px',
                border: '1px solid var(--border)',
                borderRadius: 20,
                background: 'var(--bg)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Icon + number */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'rgba(194,255,0,0.08)',
                  border: '1px solid rgba(194,255,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)', fontSize: '1rem',
                }}>
                  <i className={`fas ${r.icon}`} />
                </div>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 800,
                  color: 'var(--border-strong)', letterSpacing: '0.1em',
                }}>
                  {r.n}
                </span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 10, lineHeight: 1.3 }}>{r.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 24 }}>{r.desc}</p>

              {/* Metric */}
              <div style={{
                marginTop: 'auto',
                paddingTop: 20,
                borderTop: '1px solid var(--border)',
              }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--accent)', lineHeight: 1, marginBottom: 4 }}>
                  {r.metric}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {r.metricSub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){
          .why-header-row{grid-template-columns:1fr!important;gap:24px!important}
          .numbers-grid{grid-template-columns:1fr!important}
          .why-reasons{grid-template-columns:1fr!important}
        }
        @media(max-width:767px){
          .numbers-grid div{padding:36px 28px!important}
        }
      `}</style>
    </section>
  )
}
