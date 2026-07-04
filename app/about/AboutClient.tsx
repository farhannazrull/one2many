'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'

const team = [
  {
    name: 'Farhan Nazrul',
    role: 'Founder & Creative Director',
    desc: 'Membangun One2Many dengan satu keyakinan: bisnis kecil sekalipun berhak punya identitas visual dan digital yang kuat — tanpa harus bayar mahal ke agensi besar.',
    img: 'https://picsum.photos/seed/farhan1/400/500',
    socials: { linkedin: '#', instagram: '#' },
  },
  {
    name: 'Farhan Nazrul',
    role: 'Lead Frontend Engineer',
    desc: 'Bertanggung jawab atas arsitektur teknis semua produk digital One2Many. Obsesi utama: performa, aksesibilitas, dan kode yang bisa di-maintain 3 tahun ke depan.',
    img: 'https://picsum.photos/seed/farhan2/400/500',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Farhan Nazrul',
    role: 'Head of Visual Production',
    desc: 'Mengawasi seluruh produksi visual — dari brand identity sampai video kampanye. Standarnya sederhana: tidak keluar ke klien kalau belum layak dipajang di portofolio.',
    img: 'https://picsum.photos/seed/farhan3/400/500',
    socials: { instagram: '#', linkedin: '#' },
  },
  {
    name: 'Farhan Nazrul',
    role: 'UI/UX & Strategy Lead',
    desc: 'Menjembatani antara riset pengguna dan desain visual. Percaya bahwa antarmuka terbaik adalah yang tidak terasa seperti antarmuka sama sekali.',
    img: 'https://picsum.photos/seed/farhan4/400/500',
    socials: { linkedin: '#', dribbble: '#' },
  },
]

const values = [
  {
    icon: 'fa-bullseye',
    title: 'Outcome, Bukan Output',
    desc: 'Kami tidak dibayar untuk menghasilkan file — kami dibayar untuk menghasilkan dampak. Setiap keputusan desain dan teknis berakar dari pertanyaan: apakah ini menggerakkan bisnis klien?',
  },
  {
    icon: 'fa-handshake',
    title: 'Transparansi Penuh',
    desc: 'Tidak ada biaya tersembunyi, tidak ada scope yang sengaja dikabur. Harga, timeline, dan ekspektasi — semua dikomunikasikan di awal, bukan saat invoice sudah di tangan.',
  },
  {
    icon: 'fa-layer-group',
    title: 'Kualitas Tanpa Kompromi',
    desc: 'Lebih baik menolak satu proyek daripada mengerjakan dua proyek di bawah standar. Setiap deliverable yang keluar dari One2Many harus layak masuk portofolio.',
  },
  {
    icon: 'fa-seedling',
    title: 'Tumbuh Bersama Klien',
    desc: 'Kesuksesan klien adalah ukuran kesuksesan kami. Kami bangun relasi jangka panjang, bukan transaksi satu kali — karena klien yang berkembang akan selalu kembali.',
  },
]

const stats = [
  { value: '2023', label: 'Berdiri' },
  { value: '50+', label: 'Proyek Selesai' },
  { value: '30+', label: 'Klien Aktif' },
  { value: '9+', label: 'Mitra Freelancer' },
]

export default function AboutClient() {
  return (
    <main style={{ minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ padding: '120px 0 100px', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <span className="section-label">Tentang One2Many</span>
            <h1 className="display-title" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', textTransform: 'none', marginTop: 12, marginBottom: 28, maxWidth: 800, lineHeight: 1.1 }}>
              Satu Ekosistem.<br />
              <span style={{ color: 'var(--accent)' }}>Banyak Solusi.</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 620, marginBottom: 48 }}>
              One2Many adalah studio kreatif dan teknologi berbasis di Surabaya. Kami mengerjakan proyek desain, pengembangan web, dan produksi konten — bukan sebagai vendor terpisah, tapi sebagai satu tim terpadu yang bicara satu bahasa.
            </p>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent)', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: 5, letterSpacing: '0.04em' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section style={{ padding: '100px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8vw', alignItems: 'center' }} className="about-two-col">
            <SectionReveal>
              <span className="section-label">Cerita Kami</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.15, marginTop: 12, marginBottom: 24 }}>
                Dibuat karena frustrasi<br />
                <span style={{ color: 'var(--accent)' }}>yang produktif</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: 20, fontSize: '0.95rem' }}>
                One2Many lahir dari pengalaman langsung melihat bagaimana bisnis — terutama UMKM dan startup awal — kesulitan mendapatkan hasil kerja kreatif yang konsisten dan berkualitas. Terlalu mahal untuk agensi besar, terlalu berisiko untuk freelancer random.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: 32, fontSize: '0.95rem' }}>
                Jawabannya bukan memilih salah satu — tapi membangun model baru: tim inti yang kecil dan terspesialisasi, diperkuat jaringan mitra freelancer terseleksi, beroperasi dengan standar agensi tapi fleksibilitas studio independen.
              </p>
              <Link href="/work" className="btn btn-outline" style={{ display: 'inline-flex', gap: 8 }}>
                Lihat Portofolio <i className="fas fa-arrow-right" />
              </Link>
            </SectionReveal>

            <SectionReveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { icon: 'fa-city', label: 'Berbasis di', value: 'Surabaya, Indonesia', color: '#3b82f6' },
                  { icon: 'fa-globe', label: 'Jangkauan', value: 'Seluruh Indonesia', color: '#8b5cf6' },
                  { icon: 'fa-bolt', label: 'Respons', value: '< 24 jam kerja', color: '#f59e0b' },
                  { icon: 'fa-shield-alt', label: 'Garansi', value: 'Revisi sampai sesuai', color: '#22c55e' },
                ].map(item => (
                  <div key={item.label} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 24 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${item.color}15`, border: `1px solid ${item.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                      <i className={`fas ${item.icon}`} style={{ color: item.color, fontSize: '0.9rem' }} />
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: '100px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap">
          <SectionReveal>
            <div style={{ marginBottom: 64 }}>
              <span className="section-label">Cara Kami Bekerja</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', marginTop: 12 }}>
                Prinsip yang tidak<br />
                <span style={{ color: 'var(--accent)' }}>pernah kami kompromikan</span>
              </h2>
            </div>
          </SectionReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {values.map((v, i) => (
              <SectionReveal key={v.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: 32, height: '100%' }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(194,255,0,0.08)', border: '1px solid rgba(194,255,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <i className={`fas ${v.icon}`} style={{ color: 'var(--accent)', fontSize: '1rem' }} />
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 12, lineHeight: 1.3 }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.8 }}>{v.desc}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ padding: '100px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap">
          <SectionReveal>
            <div style={{ marginBottom: 64 }}>
              <span className="section-label">Tim Inti</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', marginTop: 12 }}>
                Orang-orang di <span style={{ color: 'var(--accent)' }}>balik layar</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: 560, marginTop: 16, lineHeight: 1.75, fontSize: '0.95rem' }}>
                Bukan ratusan orang — tim inti kami kecil dan disengaja. Setiap orang punya ownership nyata atas kualitas kerjanya.
              </p>
            </div>
          </SectionReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28 }}>
            {team.map((m, i) => (
              <motion.div
                key={m.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--r-lg)', marginBottom: 20, aspectRatio: '4/5', background: 'var(--bg-surface)' }}>
                  <Image src={m.img} alt={m.name} fill sizes="(max-width: 768px) 100vw, 260px"
                    style={{ objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 55%)', opacity: 0.85 }} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 4 }}>{m.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>{m.role}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 18, flex: 1 }}>{m.desc}</p>
                <div style={{ display: 'flex', gap: 12 }}>
                  {Object.entries(m.socials).map(([platform, href]) => (
                    <a key={platform} href={href} aria-label={platform}
                      style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
                    >
                      <i className={`fab fa-${platform}`} />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '100px 0' }}>
        <div className="wrap">
          <SectionReveal>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'stretch' }} className="about-cta-grid">

              <div style={{ background: 'var(--accent)', borderRadius: 'var(--r-xl)', padding: '52px 48px' }}>
                <i className="fas fa-rocket" style={{ fontSize: '2rem', color: '#000', marginBottom: 24, display: 'block' }} />
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#000', marginBottom: 12, lineHeight: 1.2 }}>
                  Punya proyek di kepala?
                </h3>
                <p style={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, marginBottom: 32, fontSize: '0.92rem' }}>
                  Ceritakan ke kami — kami balas dalam 24 jam dengan estimasi dan rekomendasi awal, tanpa komitmen apapun.
                </p>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#000', color: '#fff', padding: '12px 24px', borderRadius: 100, fontWeight: 700, fontSize: '0.88rem' }}>
                  Mulai Diskusi <i className="fas fa-arrow-right" />
                </Link>
              </div>

              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '52px 48px' }}>
                <i className="fas fa-users" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: 24, display: 'block' }} />
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: 12, lineHeight: 1.2 }}>
                  Freelancer atau studio kecil?
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32, fontSize: '0.92rem' }}>
                  Kami selalu mencari mitra kolaborasi yang serius — desainer, developer, videografer, dan copywriter yang punya standar tinggi dan mau tumbuh bersama.
                </p>
                <Link href="/partners" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--border)', color: 'var(--text)', padding: '12px 24px', borderRadius: 100, fontWeight: 700, fontSize: '0.88rem' }}>
                  Lihat Halaman Mitra <i className="fas fa-arrow-right" />
                </Link>
              </div>

            </div>
          </SectionReveal>
        </div>
      </section>

      <style>{`
        @media(max-width:768px){
          .about-two-col { grid-template-columns: 1fr !important; }
          .about-cta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
