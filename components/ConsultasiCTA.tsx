'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const WA_NUMBER  = '6281234567890'
const WA_MESSAGE = 'Halo one2many! Saya ingin book free discovery call untuk diskusi kebutuhan digital bisnis saya.'

const points = [
  { icon: 'fa-clock',        text: '30 menit, tanpa komitmen' },
  { icon: 'fa-map',          text: 'Peta kebutuhan digital bisnis Anda' },
  { icon: 'fa-lightbulb',    text: 'Rekomendasi layanan & estimasi biaya' },
  { icon: 'fa-file-contract', text: 'NDA & kontrak disiapkan jika lanjut' },
]

export default function ConsultasiCTA() {
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

  return (
    <section style={{ padding: '100px 0', background: 'var(--accent)', overflow: 'hidden', position: 'relative' }}>
      {/* Decorative circle */}
      <div style={{
        position: 'absolute', top: -120, right: -120,
        width: 400, height: 400, borderRadius: '50%',
        background: 'rgba(0,0,0,0.06)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, left: -60,
        width: 260, height: 260, borderRadius: '50%',
        background: 'rgba(0,0,0,0.04)', pointerEvents: 'none',
      }} />

      <div className="wrap" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6vw', alignItems: 'center' }} className="consult-grid">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginBottom: 16 }}>
              Free Discovery Call
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#000', marginBottom: 20 }}>
              Belum yakin mau<br />mulai dari mana?
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.75, marginBottom: 36, maxWidth: 440 }}>
              Ceritakan bisnis Anda ke tim kami. Dalam 30 menit kita petakan kebutuhan, rekomendasikan solusi yang tepat, dan hitung estimasi biayanya — gratis, tanpa tekanan.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
              {points.map(p => (
                <div key={p.text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(0,0,0,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.78rem', color: '#000',
                  }}>
                    <i className={`fas ${p.icon}`} />
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#000' }}>{p.text}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px', background: '#000', color: 'var(--accent)',
                  borderRadius: 100, fontWeight: 700, fontSize: '0.9rem',
                  textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '1rem' }} />
                Book via WhatsApp
              </a>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px', background: 'transparent', color: '#000',
                  border: '2px solid rgba(0,0,0,0.2)', borderRadius: 100,
                  fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >
                Kirim Brief Dulu <i className="fas fa-arrow-right" style={{ fontSize: '0.82em' }} />
              </Link>
            </div>
          </motion.div>

          {/* Right — info card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }} transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              background: '#000', borderRadius: 24, padding: 40, color: '#fff',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -40, right: -40,
                width: 160, height: 160, borderRadius: '50%',
                background: 'rgba(194,255,0,0.07)',
              }} />

              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 24 }}>
                Alur Discovery Call
              </p>

              {[
                { n: '01', title: 'Booking',        desc: 'Hubungi kami via WhatsApp atau form kontak. Kami konfirmasi jadwal dalam 1×24 jam.' },
                { n: '02', title: 'Call 30 Menit', desc: 'Diskusi kebutuhan, target, dan referensi bisnis Anda bersama tim spesialis kami.' },
                { n: '03', title: 'Proposal',       desc: 'Dalam 2–3 hari kerja kami kirim proposal lengkap dengan scope, timeline, dan estimasi biaya.' },
                { n: '04', title: 'Kickoff',        desc: 'Jika cocok, tanda tangani kontrak dan proyek dimulai. Tidak cocok? Tidak ada kewajiban.' },
              ].map((s, i, arr) => (
                <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < arr.length - 1 ? 4 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: 'var(--accent)', color: '#000',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', fontWeight: 900,
                    }}>
                      {s.n}
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.12)', margin: '4px 0' }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < arr.length - 1 ? 16 : 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: 3, color: '#fff' }}>{s.title}</div>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .consult-grid { grid-template-columns: 1fr 1fr; }
        @media(max-width: 860px) { .consult-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
