'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Berapa kali revisi yang termasuk dalam paket?',
    a: 'Minimal 2 putaran revisi per deliverable di semua paket. Paket Professional ke atas mendapat unlimited revisi dalam scope yang sudah disepakati di brief awal — tidak ada biaya tambahan selama masih dalam scope.',
  },
  {
    q: 'Bagaimana sistem pembayaran?',
    a: '50% DP di awal untuk memulai proyek, 50% pelunasan sebelum file final atau deployment diserahkan. Untuk proyek di atas Rp 50Jt tersedia opsi cicilan 3 tahap. Semua diatur dalam kontrak.',
  },
  {
    q: 'Apakah ada kontrak dan NDA?',
    a: 'Ya. Setiap proyek dilindungi perjanjian kerja tertulis dan NDA (Non-Disclosure Agreement). Semua IP dan aset final menjadi milik penuh klien setelah pelunasan — tidak ada retensi hak dari sisi kami.',
  },
  {
    q: 'Bisa kerja sepenuhnya remote?',
    a: '100% bisa. Semua proses dari discovery, presentasi, hingga handoff berjalan via Zoom, Figma, Notion, dan WhatsApp. Kami sudah terbiasa bekerja dengan klien dari berbagai kota di Indonesia.',
  },
  {
    q: 'Apa yang perlu disiapkan sebelum proyek dimulai?',
    a: 'Cukup gambaran kebutuhan (tidak harus formal), referensi visual yang Anda sukai, dan aset yang sudah ada (logo lama, foto produk, dll). Tim kami membantu mengisi gap-nya di sesi discovery.',
  },
  {
    q: 'Apa jaminan jika proyek melewati deadline?',
    a: 'Timeline dijamin dalam kontrak. Jika keterlambatan berasal dari sisi kami, klien mendapat kompensasi perpanjangan support tanpa biaya tambahan. Kami menerapkan sprint 2 minggu dengan update transparan setiap minggu.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ padding: '120px 0', background: 'var(--bg-surface)' }}>
      <div className="wrap">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr',
          gap: '6vw', alignItems: 'start',
        }} className="faq-grid">

          {/* Left */}
          <div style={{ position: 'sticky', top: 120 }}>
            <span className="section-label">FAQ</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 16 }}>
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: 32 }}>
              Tidak menemukan jawaban yang Anda cari? Langsung tanyakan ke tim kami.
            </p>
            <a href="/order" className="btn btn-ghost">
              Hubungi Tim Kami <i className="fas fa-arrow-right" style={{ fontSize: '0.85em' }} />
            </a>
          </div>

          {/* Right — accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {faqs.map((faq, i) => {
              const isOpen = open === i
              return (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                    borderColor: isOpen ? 'var(--accent)' : 'var(--border)',
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', gap: 16,
                      padding: '20px 24px', background: 'none',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: isOpen ? 'var(--accent)' : 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}>
                      <i className={`fas fa-${isOpen ? 'minus' : 'plus'}`}
                        style={{ fontSize: '0.62rem', color: isOpen ? '#000' : 'var(--text-muted)' }} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p style={{
                          padding: '0 24px 20px',
                          fontSize: '0.88rem', color: 'var(--text-muted)',
                          lineHeight: 1.8, margin: 0,
                        }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:860px){
          .faq-grid{grid-template-columns:1fr!important}
          .faq-grid > div:first-child{position:static!important}
        }
      `}</style>
    </section>
  )
}
