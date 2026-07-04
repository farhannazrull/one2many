import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PACKAGES } from '@/data/packages'
import { SATUAN } from '@/data/satuan'
import { projects } from '@/data/projects'

const serviceDetails: Record<string, {
  title: string
  desc: string
  longDesc: string
  icon: string
  category: 'branding' | 'ui-ux' | 'video' | 'web'
  process: { icon: string; title: string; desc: string }[]
  faqs: { q: string; a: string }[]
}> = {
  'graphic-design': {
    title: 'Graphic Design',
    desc: 'Visual identity yang konsisten dari logo, social media, hingga materi marketing print dan digital.',
    longDesc: 'Identitas visual yang kuat adalah fondasi dari semua komunikasi brand. Layanan desain grafis kami memastikan bisnis Anda tampil profesional, konsisten, dan menonjol di setiap touchpoint — dari kartu nama hingga banner digital. Kami tidak hanya membuat logo cantik, tapi merancang sistem visual yang scalable dan siap digunakan di semua medium.',
    icon: 'fa-paint-brush',
    category: 'branding',
    process: [
      { icon: 'fa-search', title: 'Brand Discovery', desc: 'Riset mendalam tentang bisnis, kompetitor, dan target market Anda untuk menemukan positioning visual yang tepat.' },
      { icon: 'fa-pencil-alt', title: 'Konsep & Eksplorasi', desc: 'Kami menghasilkan 3 arah konsep yang berbeda. Anda pilih, kami kembangkan hingga sempurna.' },
      { icon: 'fa-check-double', title: 'Finalisasi & Handoff', desc: 'Semua file source (AI, PDF, PNG, SVG) diserahkan bersama brand guideline siap produksi.' },
    ],
    faqs: [
      { q: 'Berapa lama proses pembuatan logo?', a: 'Paket Starter selesai dalam 2–3 minggu. Paket Professional 3–4 minggu karena mencakup sistem visual lengkap.' },
      { q: 'Format file apa saja yang diserahkan?', a: 'Semua format: AI (editable), PDF, PNG (transparan), SVG, dan JPG. Siap untuk cetak maupun digital.' },
      { q: 'Apakah bisa minta revisi total di tengah proses?', a: 'Jika revisi masih dalam scope brief awal, kami akomodasi. Jika berubah arah total, kita diskusikan penyesuaiannya.' },
    ],
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    desc: 'UX research, wireframe, hingga design system — antarmuka yang intuitif dan meningkatkan konversi.',
    longDesc: 'Antarmuka yang baik bukan hanya soal tampilan — ia harus memandu pengguna mencapai tujuannya dengan mudah. Pendekatan kami berbasis riset: kami memahami pengguna nyata Anda sebelum mulai mendesain. Hasilnya: produk digital yang pengguna cinta dan bisnis banggakan, dengan design system yang memudahkan developer untuk implementasi.',
    icon: 'fa-laptop-code',
    category: 'ui-ux',
    process: [
      { icon: 'fa-users', title: 'UX Research', desc: 'User interview, competitive analysis, dan pemetaan user journey untuk memahami kebutuhan nyata pengguna.' },
      { icon: 'fa-sitemap', title: 'Wireframe & Flow', desc: 'Struktur informasi dan alur interaksi dalam wireframe low-fidelity untuk divalidasi sebelum desain visual.' },
      { icon: 'fa-magic', title: 'UI Design & Handoff', desc: 'High-fidelity design dengan design system lengkap dan dev-ready specs via Figma untuk zero-friction implementasi.' },
    ],
    faqs: [
      { q: 'Apa bedanya Essentials vs Professional?', a: 'Essentials untuk produk sederhana (10 screen, tanpa research). Professional mencakup UX research nyata, 30+ screen, dan design system 50+ komponen.' },
      { q: 'Apakah file Figma diserahkan?', a: 'Ya, semua file Figma (termasuk komponen dan auto-layout) diserahkan penuh. Tidak ada lock-in.' },
      { q: 'Apakah bisa langsung lanjut ke web development setelah UI/UX selesai?', a: 'Bisa! Bahkan lebih efisien. Desain kami dirancang dengan dev handoff yang bersih supaya implementasi lebih cepat.' },
    ],
  },
  'web-development': {
    title: 'Web Development',
    desc: 'Next.js, React, full-stack — website dan aplikasi performa tinggi dengan SEO optimal.',
    longDesc: 'Website bukan sekadar brosur digital — ia adalah aset bisnis yang bekerja 24/7 untuk Anda. Kami membangun dengan Next.js dan React: framework pilihan untuk performa tinggi, SEO optimal, dan developer experience terbaik. Setiap website yang kami build memiliki PageSpeed 90+, struktur SEO yang benar, dan arsitektur yang siap scale.',
    icon: 'fa-code',
    category: 'web',
    process: [
      { icon: 'fa-sitemap', title: 'Arsitektur & Setup', desc: 'Pemilihan tech stack, setup repository, CI/CD pipeline, dan environment (dev, staging, production).' },
      { icon: 'fa-code', title: 'Development Sprint', desc: 'Build iteratif per sprint 2 minggu dengan staging URL yang bisa Anda akses dan review langsung.' },
      { icon: 'fa-rocket', title: 'QA & Deployment', desc: 'Testing lintas browser, performance audit, SEO checklist, lalu deployment ke production dengan monitoring.' },
    ],
    faqs: [
      { q: 'Teknologi apa yang digunakan?', a: 'Next.js (App Router), React, TypeScript, Tailwind CSS untuk frontend. Backend sesuai kebutuhan: Prisma + PostgreSQL/SQLite, atau integrasi ke API yang sudah ada.' },
      { q: 'Apakah termasuk hosting?', a: 'Kami handle deployment ke Vercel (gratis untuk kebanyakan kasus). Untuk kebutuhan server sendiri, kami bantu setup dan konfigurasi.' },
      { q: 'Bagaimana dengan maintenance setelah launch?', a: 'Semua paket termasuk 30 hari post-launch support. Setelah itu tersedia paket retainer bulanan jika dibutuhkan.' },
    ],
  },
  'video-production': {
    title: 'Video Production',
    desc: 'Brand film, motion graphics, dan konten video untuk semua platform digital.',
    longDesc: 'Di era attention economy, video adalah medium paling efektif untuk membangun koneksi emosional dengan audiens. Kami memproduksi video dari concept hingga final cut — bukan hanya estetik, tapi strategis. Setiap frame diarahkan untuk memperkuat pesan brand dan mendorong action dari penonton, baik untuk social media maupun presentasi enterprise.',
    icon: 'fa-video',
    category: 'video',
    process: [
      { icon: 'fa-lightbulb', title: 'Creative Development', desc: 'Penulisan konsep kreatif, script, storyboard, dan shot list. Semua disetujui klien sebelum hari produksi.' },
      { icon: 'fa-camera', title: 'Production Day', desc: 'Shooting on-location atau studio dengan kru profesional. Dokumentasi semua footage dalam resolusi tertinggi.' },
      { icon: 'fa-film', title: 'Post-Production', desc: 'Editing, color grading sinematik, sound design, dan motion graphics. Dikirim dalam format siap upload per platform.' },
    ],
    faqs: [
      { q: 'Apakah termasuk talent/aktor?', a: 'Talent bisa disediakan (biaya terpisah) atau klien menyiapkan sendiri. Kami bantu briefing talent untuk hasil terbaik.' },
      { q: 'Berapa lama proses editing setelah shooting?', a: 'Rata-rata 1–2 minggu untuk Brand Film. Short Form bisa selesai dalam 3–5 hari kerja setelah materi diterima.' },
      { q: 'Format apa yang diserahkan?', a: 'MP4 H.264 dan H.265 dalam berbagai resolusi (4K, 1080p) dan aspect ratio (16:9, 9:16, 1:1) sesuai platform.' },
    ],
  },
  'mobile-development': {
    title: 'Mobile App Development',
    desc: 'Aplikasi iOS & Android native maupun cross-platform — dari MVP hingga production-ready.',
    longDesc: 'Aplikasi mobile adalah channel terdepan bisnis modern. Kami membangun dengan React Native dan Flutter untuk cross-platform yang efisien, atau Kotlin/Swift jika performa native menjadi prioritas. Dari splash screen sampai submission ke App Store & Play Store — semua kami handle. Arsitektur kami scalable, UI-nya terasa native, dan codebase-nya clean untuk iterasi cepat.',
    icon: 'fa-mobile-alt',
    category: 'ui-ux',
    process: [
      { icon: 'fa-sitemap',    title: 'Architecture & Flow',   desc: 'Perancangan user flow, arsitektur komponen, pemilihan stack (React Native / Flutter / Kotlin), dan setup CI/CD pipeline.' },
      { icon: 'fa-code',       title: 'Sprint Development',    desc: 'Build iteratif per sprint 2 minggu — update progress via Notion board yang bisa Anda akses real-time.' },
      { icon: 'fa-cloud-upload-alt', title: 'QA & Store Submission', desc: 'Testing di device nyata (iOS & Android), bug fixing, persiapan asset store, dan submission ke App Store & Play Store.' },
    ],
    faqs: [
      { q: 'React Native, Flutter, atau native Kotlin/Swift?', a: 'Untuk mayoritas kasus bisnis, React Native adalah pilihan terbaik — satu codebase untuk iOS & Android, performa mendekati native. Flutter kami rekomendasikan untuk UI yang sangat custom. Native Kotlin/Swift untuk performa kritis atau integrasi hardware.' },
      { q: 'Berapa lama dari brief ke App Store?', a: 'MVP sederhana: 6–8 minggu. Full App dengan fitur lengkap: 12–16 minggu. Review Apple biasanya 1–3 hari kerja setelah submission.' },
      { q: 'Bagaimana dengan update dan maintenance pasca launch?', a: 'Tersedia paket retainer bulanan untuk update fitur, kompatibilitas OS baru, dan monitoring. Atau bisa one-off per request.' },
    ],
  },
  'pelajar': {
    title: 'Pelajar & Freelancer',
    desc: 'Desain profesional mulai Rp 39rb — CV, poster kampus, pitch deck PKM, kaos organisasi, dan lebih banyak lagi.',
    longDesc: 'Kami tahu budget pelajar itu terbatas, tapi kebutuhan desain tetap ada — mulai dari CV buat magang, poster acara BEM, kaos kepanitiaan, sampai pitch deck PKM. Semua tersedia dengan harga transparan per item. Tidak ada biaya tersembunyi, tidak ada paket wajib beli — cukup pilih yang kamu butuhkan. Tim kami respons dalam 1 jam kerja dan hasil selesai dalam 1–3 hari.',
    icon: 'fa-graduation-cap',
    category: 'branding',
    process: [
      { icon: 'fa-mouse-pointer', title: 'Pilih Item', desc: 'Pilih item yang kamu butuhkan dari daftar satuan atau ambil bundle untuk hemat lebih banyak.' },
      { icon: 'fa-comments', title: 'Konfirmasi via WhatsApp', desc: 'Tim kami menghubungi dalam 1 jam kerja untuk konfirmasi detail, referensi, dan kirim invoice.' },
      { icon: 'fa-paper-plane', title: 'Terima File', desc: 'File final dikirim via Google Drive atau email dalam 1–3 hari kerja, siap pakai langsung.' },
    ],
    faqs: [
      { q: 'Apakah ada minimum order?', a: 'Tidak ada. Kamu bisa order 1 item saja — misalnya cuma CV atau cuma 1 poster.' },
      { q: 'Bagaimana cara bayarnya?', a: 'Transfer bank atau dompet digital (GoPay, OVO, QRIS). Invoice dikirim via WhatsApp sebelum mulai pengerjaan.' },
      { q: 'Kalau tidak puas bisa revisi?', a: 'Setiap item sudah termasuk 1× revisi gratis. Revisi tambahan bisa didiskusikan dengan biaya kecil.' },
      { q: 'Apakah harga bisa nego?', a: 'Untuk order bundle atau kuantitas banyak (misalnya 10 poster sekaligus), kita bisa diskusikan harga spesial.' },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(serviceDetails).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = serviceDetails[slug]
  if (!data) return {}
  return {
    title: `${data.title} | one2many`,
    description: data.desc,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = serviceDetails[slug]
  if (!data) return notFound()

  const packages    = PACKAGES[slug] ?? []
  const satuanItems = SATUAN[slug] ?? []
  const related     = projects.filter(p => p.category === data.category).slice(0, 3)

  return (
    <main style={{ paddingBottom: 120 }}>

      {/* Hero */}
      <section style={{ padding: '120px 0 80px', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap">
          <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 28, transition: 'color 0.2s' }}>
            <i className="fas fa-arrow-left" /> Semua Layanan
          </Link>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '6vw', alignItems: 'center' }} className="svc-hero-grid">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(194,255,0,0.1)', border: '1px solid rgba(194,255,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '0.9rem' }}>
                  <i className={`fas ${data.icon}`} />
                </div>
                <span className="section-label" style={{ margin: 0 }}>Layanan</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: 20 }}>
                {data.title}
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
                {data.longDesc}
              </p>
              <Link href={`/order?service=${slug}`} className="btn btn-primary">
                Pesan Layanan Ini <i className="fas fa-arrow-right" style={{ fontSize: '0.85em' }} />
              </Link>
            </div>

            {/* Sticky CTA card */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 32 }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Mulai dari</p>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.03em', marginBottom: 4 }}>
                {packages[0]?.price ?? 'Hubungi Kami'}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 24 }}>Harga bisa disesuaikan sesuai scope proyek Anda.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {[
                  { icon: 'fa-redo',         text: 'Min. 2 putaran revisi' },
                  { icon: 'fa-file-contract',text: 'Kontrak & NDA tertulis' },
                  { icon: 'fa-chart-line',   text: 'Akses Notion board tracking real-time' },
                  { icon: 'fa-headset',      text: '30 hari post-launch support' },
                ].map(item => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem' }}>
                    <i className={`fas ${item.icon}`} style={{ color: 'var(--accent)', fontSize: '0.75rem', width: 14 }} />
                    {item.text}
                  </div>
                ))}
              </div>
              <Link href={`/order?service=${slug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Mulai Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 8 }}>Pilih Paket</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 36, fontSize: '0.9rem' }}>Semua harga estimasi — penawaran resmi dikirim setelah discovery call.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {packages.map(pkg => (
              <div key={pkg.id} style={{ background: 'var(--bg-surface)', border: `1.5px solid ${pkg.popular ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 18, padding: '28px 24px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {pkg.popular && (
                  <span style={{ position: 'absolute', top: -11, right: 16, background: 'var(--accent)', color: '#000', fontSize: '0.6rem', fontWeight: 800, padding: '2px 10px', borderRadius: 100 }}>
                    POPULER
                  </span>
                )}
                <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 3 }}>{pkg.label}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--accent)', marginBottom: 8 }}>{pkg.price}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.55 }}>{pkg.desc}</p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8, flex: 1, marginBottom: 20 }}>
                  {pkg.includes.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: '0.775rem' }}>
                      <i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.56rem', marginTop: 4, flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
                <Link href={`/order?service=${slug}`} className={pkg.popular ? 'btn btn-primary' : 'btn btn-ghost'} style={{ justifyContent: 'center', fontSize: '0.82rem' }}>
                  Pilih Paket Ini
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan Satuan */}
      {satuanItems.length > 0 && (
        <section style={{ padding: '80px 0', borderBottom: '1px solid var(--border)' }}>
          <div className="wrap">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 6 }}>
                  Layanan <span style={{ color: 'var(--accent)' }}>Satuan</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 480 }}>
                  Butuh satu item spesifik saja? Pesan tanpa harus ambil paket lengkap.
                </p>
              </div>
              <Link href="/pricing#satuan" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
                Semua Harga <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {satuanItems.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr auto',
                    background: 'var(--bg-surface)', border: '1px solid var(--border)',
                    borderRadius: 14, padding: '18px 22px', gap: 20, alignItems: 'center',
                  }}
                  className="satuan-row"
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.93rem', marginBottom: 3 }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.55 }}>{item.desc}</div>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                      borderRadius: 100, padding: '2px 9px', fontSize: '0.68rem', color: 'var(--text-muted)',
                    }}>
                      <i className="fas fa-clock" style={{ fontSize: '0.58rem' }} />
                      {item.delivery}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 9, flexShrink: 0 }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                      {item.price}
                    </div>
                    <Link
                      href={`/order?service=${slug}&item=${item.id}`}
                      className="btn btn-ghost"
                      style={{ fontSize: '0.75rem', padding: '6px 14px', whiteSpace: 'nowrap' }}
                    >
                      Pesan <i className="fas fa-arrow-right" style={{ fontSize: '0.72em' }} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="wrap">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 8 }}>Bagaimana Prosesnya?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 36, fontSize: '0.9rem' }}>3 tahap sederhana dari brief hingga file final di tangan Anda.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="svc-process-grid">
            {data.process.map((step, i) => (
              <div key={i} style={{ padding: '28px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(194,255,0,0.1)', border: '1px solid rgba(194,255,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '0.8rem', flexShrink: 0 }}>
                    <i className={`fas ${step.icon}`} />
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--border-strong)', letterSpacing: '0.1em' }}>0{i + 1}</span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section style={{ padding: '80px 0', borderBottom: '1px solid var(--border)' }}>
          <div className="wrap">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 4 }}>Proyek Terkait</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Hasil nyata yang sudah kami deliver untuk klien.</p>
              </div>
              <Link href="/work" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6 }}>
                Lihat Semua <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {related.map(p => (
                <div key={p.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                    <Image src={p.thumb} alt={p.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 767px) 100vw, 33vw" />
                    <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', borderRadius: 100, padding: '4px 10px', fontSize: '0.68rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <i className="fas fa-chart-line" style={{ fontSize: '0.58rem', color: 'var(--accent)' }} />
                      {p.stat}
                    </div>
                  </div>
                  <div style={{ padding: '18px 20px' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>{p.client}</p>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: 4 }}>{p.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.year} · {p.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section style={{ padding: '80px 0' }}>
        <div className="wrap" style={{ maxWidth: 720 }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 32 }}>
            Pertanyaan tentang <span style={{ color: 'var(--accent)' }}>{data.title}</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {data.faqs.map((faq, i) => (
              <details key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '18px 22px', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.q}
                  <i className="fas fa-plus" style={{ fontSize: '0.65rem', color: 'var(--accent)', flexShrink: 0, marginLeft: 12 }} />
                </summary>
                <p style={{ padding: '0 22px 18px', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <div style={{ marginTop: 40, padding: '28px 32px', background: 'var(--accent)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#000', marginBottom: 4 }}>Siap memulai proyek {data.title}?</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)' }}>Tim kami menghubungi dalam 1×24 jam.</div>
            </div>
            <Link href={`/order?service=${slug}`} style={{ background: '#000', color: 'var(--accent)', padding: '12px 24px', borderRadius: 100, fontWeight: 700, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Pesan Sekarang <i className="fas fa-arrow-right" style={{ fontSize: '0.8em' }} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .svc-hero-grid{grid-template-columns:1.4fr 1fr}
        .svc-process-grid{grid-template-columns:repeat(3,1fr)}
        @media(max-width:900px){
          .svc-hero-grid{grid-template-columns:1fr!important}
          .svc-process-grid{grid-template-columns:1fr!important}
        }
        details summary::-webkit-details-marker{display:none}
        details[open] summary i{transform:rotate(45deg)}
        details summary i{transition:transform 0.2s}
        .satuan-row{transition:border-color 0.15s}
        .satuan-row:hover{border-color:rgba(194,255,0,0.35)!important}
      `}</style>
    </main>
  )
}
