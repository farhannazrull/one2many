import type { Metadata } from 'next'
import { Suspense } from 'react'
import OrderContent from './OrderContent'

export const metadata: Metadata = {
  title: 'Mulai Pesanan | one2many',
  description: 'Pesan layanan digital one2many — pilih layanan, isi detail proyek, dan tim kami siap menghubungi Anda dalam 24 jam.',
}

export default function OrderPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '120px 0 80px' }}>
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: '1px solid var(--border)' }}>
          <span className="section-label">Pemesanan</span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', marginTop: 12, marginBottom: 12 }}>
            Mulai <span style={{ color: 'var(--accent)' }}>Proyek</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7 }}>
            Isi formulir pemesanan di bawah. Tim kami akan menghubungi Anda dalam <strong>1×24 jam</strong> dengan estimasi dan penawaran.
          </p>
        </div>
        <Suspense>
          <OrderContent />
        </Suspense>
      </div>
    </main>
  )
}
