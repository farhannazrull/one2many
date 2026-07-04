import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{
          fontSize: 'clamp(6rem, 20vw, 12rem)', fontWeight: 900,
          lineHeight: 1, letterSpacing: '-0.06em',
          color: 'var(--accent)', marginBottom: 16,
        }}>
          404
        </div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, marginBottom: 14 }}>
          Halaman Tidak Ditemukan
        </h1>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 40 }}>
          URL yang Anda cari tidak ada atau sudah dipindahkan. Coba kembali ke halaman utama.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">
            <i className="fas fa-home" /> Kembali ke Beranda
          </Link>
          <Link href="/order" className="btn btn-ghost">
            Mulai Proyek
          </Link>
        </div>
      </div>
    </main>
  )
}
