'use client'
import { useState } from 'react'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import { PACKAGES, SERVICE_LABELS } from '@/data/packages'
import { SATUAN, SATUAN_LABELS } from '@/data/satuan'
import { RETAINER_PLANS } from '@/data/retainer'

const SERVICE_ICONS: Record<string, string> = {
  'pelajar':            'fa-graduation-cap',
  'graphic-design':     'fa-paint-brush',
  'ui-ux-design':       'fa-laptop-code',
  'web-development':    'fa-code',
  'video-production':   'fa-video',
  'mobile-development': 'fa-mobile-alt',
}

const serviceKeys  = Object.keys(PACKAGES)
const satuanKeys   = Object.keys(SATUAN_LABELS)

export default function PricingClient() {
  const [activePkg, setActivePkg]       = useState(serviceKeys[0])
  const [activeSatuan, setActiveSatuan] = useState('pelajar')

  const packages    = PACKAGES[activePkg]
  const satuanItems = SATUAN[activeSatuan] ?? []

  return (
    <main>
      <section style={{ padding: '120px 0 80px' }}>
        <div className="wrap">

          {/* Header */}
          <div style={{ marginBottom: 60, paddingBottom: 40, borderBottom: '1px solid var(--border)' }}>
            <span className="section-label">Investasi</span>
            <h1 className="display-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', textTransform: 'none', marginTop: 12, marginBottom: 20 }}>
              Transparan & <span style={{ color: 'var(--accent)' }}>Terukur</span>
            </h1>
            <p className="section-sub" style={{ margin: 0, maxWidth: 700 }}>
              Pilih model investasi yang paling sesuai — dari satu item spesifik, paket per layanan, hingga transformasi digital skala penuh.
            </p>
          </div>

          {/* Budget Guide */}
          <SectionReveal>
            <div style={{ marginBottom: 64 }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 20 }}>
                Mulai dari mana? <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '1rem' }}>— pilih sesuai skala bisnis</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                {[
                  { budget: '< Rp 10jt', label: 'Mulai Kecil', icon: 'fa-seedling', desc: 'Coba satu layanan satuan dulu — logo, landing page, atau 1 video reels.', cta: 'Lihat Satuan', href: '#satuan', dim: true },
                  { budget: 'Rp 10–35jt', label: 'Naik Kelas', icon: 'fa-arrow-trend-up', desc: 'Paket per layanan lengkap — branding, web, atau app dari Starter hingga Pro.', cta: 'Pilih Paket', href: '#per-layanan', dim: true },
                  { budget: 'Rp 35–100jt', label: 'Transformasi', icon: 'fa-rocket', desc: 'Bundle end-to-end: brand identity + web + video dalam satu proyek terintegrasi.', cta: 'Lihat Bundle', href: '#bundle', dim: false },
                  { budget: 'Rp 100jt+', label: 'Enterprise', icon: 'fa-building', desc: 'Scope enterprise, dedicated PM, SLA tertulis, dan 6 bulan post-launch support.', cta: 'Hubungi Kami', href: '/contact', dim: true },
                ].map(t => (
                  <a key={t.label} href={t.href} style={{ textDecoration: 'none', display: 'block', padding: '20px 22px', border: `1px solid ${t.dim ? 'var(--border)' : 'var(--accent)'}`, borderRadius: 16, background: t.dim ? 'var(--bg-surface)' : 'var(--accent-dim)', transition: 'border-color 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = t.dim ? 'var(--border)' : 'var(--accent)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <i className={`fas ${t.icon}`} style={{ color: 'var(--accent)', fontSize: '0.85rem' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>{t.label}</span>
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--accent)', marginBottom: 6, letterSpacing: '-0.02em' }}>{t.budget}</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 14 }}>{t.desc}</p>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 5 }}>
                      {t.cta} <i className="fas fa-arrow-right" style={{ fontSize: '0.65rem' }} />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Bundle section */}
          <SectionReveal>
            <div id="bundle" style={{ marginBottom: 100, scrollMarginTop: 100 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Paket <span style={{ color: 'var(--accent)' }}>Bundle</span></h2>
                <span style={{ background: 'var(--accent)', color: '#000', padding: '4px 12px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 700 }}>Paling Diminati B2B</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
                {/* Quick Launch */}
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(194,255,0,0.08)', border: '1px solid rgba(194,255,0,0.2)', borderRadius: 100, padding: '3px 10px', fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 16, width: 'fit-content' }}>
                    <i className="fas fa-seedling" style={{ fontSize: '0.6rem' }} /> Entry Level
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 8 }}>Quick Launch</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24 }}>Untuk UMKM &amp; bisnis kecil yang baru mulai go digital.</p>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 8, letterSpacing: '-0.02em' }}>
                    Rp 10<span style={{ color: 'var(--accent)' }}>Jt</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 32 }}>Harga bisa disesuaikan sesuai scope</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40, flex: 1 }}>
                    {['Landing page 1 halaman (Next.js, mobile-friendly)', 'Logo 1 konsep + file siap pakai', '3 template desain sosial media', 'Deploy ke Vercel + setup domain'].map(f => (
                      <li key={f} style={{ display: 'flex', gap: 10, fontSize: '0.875rem' }}>
                        <i className="fas fa-check" style={{ color: 'var(--accent)', marginTop: 4, flexShrink: 0, fontSize: '0.75rem' }} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/order?service=bundle-quick" className="btn btn-ghost" style={{ justifyContent: 'center' }}>Mulai dengan Paket Ini</Link>
                </div>

                {/* Seed */}
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 8 }}>Seed Startup</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24 }}>Solusi lengkap untuk peluncuran produk pertama.</p>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 8, letterSpacing: '-0.02em' }}>
                    Rp 35<span style={{ color: 'var(--accent)' }}>Jt</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 32 }}>Harga bisa disesuaikan sesuai scope</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40, flex: 1 }}>
                    {['Brand identity lengkap (logo, guideline, kit)', 'UI design produk (15 screen + prototype)', 'Landing page + company profile (Next.js)', '3 bulan post-launch support'].map(f => (
                      <li key={f} style={{ display: 'flex', gap: 10, fontSize: '0.875rem' }}>
                        <i className="fas fa-check" style={{ color: 'var(--accent)', marginTop: 4, flexShrink: 0, fontSize: '0.75rem' }} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/order?service=bundle-seed" className="btn btn-ghost" style={{ justifyContent: 'center' }}>Mulai dengan Paket Ini</Link>
                </div>

                {/* Transform */}
                <div style={{ background: 'var(--bg-elevated)', border: '2px solid var(--accent)', borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#000', padding: '4px 16px', borderRadius: 100, fontSize: '0.78rem', fontWeight: 800, whiteSpace: 'nowrap' }}>
                    Rekomendasi Utama
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 8 }}>Digital Transformation</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24 }}>Transformasi digital komprehensif dalam satu proyek terpadu.</p>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: 8, letterSpacing: '-0.02em' }}>
                    Rp 65<span style={{ color: 'var(--accent)' }}>Jt</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 32 }}>Harga bisa disesuaikan sesuai scope</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40, flex: 1 }}>
                    {['Full rebranding identity system', 'Company website baru (Next.js + CMS)', 'Brand film sinematik + 3 reels sosmed', '6 bulan retainer support'].map(f => (
                      <li key={f} style={{ display: 'flex', gap: 10, fontSize: '0.875rem' }}>
                        <i className="fas fa-check" style={{ color: 'var(--accent)', marginTop: 4, flexShrink: 0, fontSize: '0.75rem' }} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/order?service=bundle-transform" className="btn btn-primary" style={{ justifyContent: 'center' }}>Mulai dengan Paket Ini</Link>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* ── Paket per Layanan ── */}
          <SectionReveal>
            <div id="per-layanan" style={{ marginBottom: 100, scrollMarginTop: 100 }}>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>Paket <span style={{ color: 'var(--text-muted)' }}>per Layanan</span></h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: 600, lineHeight: 1.7 }}>
                  Butuh satu layanan lengkap dengan deliverables terkurasi? Pilih tier yang sesuai.
                </p>
              </div>

              {/* Service tabs */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
                {serviceKeys.map(key => (
                  <button
                    key={key}
                    onClick={() => setActivePkg(key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '9px 18px', borderRadius: 100, cursor: 'pointer',
                      border: `1.5px solid ${activePkg === key ? 'var(--accent)' : 'var(--border)'}`,
                      background: activePkg === key ? 'var(--accent-dim)' : 'transparent',
                      color: activePkg === key ? 'var(--accent)' : 'var(--text-muted)',
                      fontSize: '0.82rem', fontWeight: 700, transition: 'all 0.18s',
                    }}
                  >
                    <i className={`fas ${SERVICE_ICONS[key]}`} style={{ fontSize: '0.8rem' }} />
                    {SERVICE_LABELS[key]}
                  </button>
                ))}
              </div>

              {/* Package cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {packages.map(pkg => (
                  <div
                    key={pkg.id}
                    style={{
                      background: 'var(--bg-surface)', border: `1.5px solid ${pkg.popular ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius: 20, padding: '32px 28px',
                      display: 'flex', flexDirection: 'column', position: 'relative',
                    }}
                  >
                    {pkg.popular && (
                      <span style={{ position: 'absolute', top: -11, right: 20, background: 'var(--accent)', color: '#000', fontSize: '0.62rem', fontWeight: 800, padding: '2px 10px', borderRadius: 100 }}>
                        POPULER
                      </span>
                    )}
                    <div style={{ marginBottom: 6, fontWeight: 800, fontSize: '1.05rem' }}>{pkg.label}</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent)', marginBottom: 8, letterSpacing: '-0.02em' }}>{pkg.price}</div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>{pkg.desc}</p>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 9, flex: 1, marginBottom: 24 }}>
                      {pkg.includes.map(item => (
                        <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8rem', color: 'var(--text)' }}>
                          <i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.58rem', marginTop: 4, flexShrink: 0 }} />
                          {item}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/order?service=${activePkg}`}
                      className={pkg.popular ? 'btn btn-primary' : 'btn btn-ghost'}
                      style={{ justifyContent: 'center', fontSize: '0.85rem' }}
                    >
                      Pilih Paket Ini
                    </Link>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 20, textAlign: 'center' }}>
                Semua harga estimasi & bisa disesuaikan. Tim kami akan kirim penawaran resmi setelah discovery call.
              </p>
            </div>
          </SectionReveal>

          {/* ── Layanan Satuan ── */}
          <SectionReveal>
            <div id="satuan" style={{ scrollMarginTop: 100 }}>
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>
                  Layanan <span style={{ color: 'var(--accent)' }}>Satuan</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: 600, lineHeight: 1.7 }}>
                  Hanya butuh satu item? Pesan satu deliverable spesifik tanpa harus ambil paket lengkap.
                </p>
              </div>

              {/* Pelajar callout */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: 'var(--accent-dim)', border: '1px solid rgba(194,255,0,0.25)', borderRadius: 14, marginBottom: 24 }}>
                <i className="fas fa-graduation-cap" style={{ color: 'var(--accent)', fontSize: '1rem', flexShrink: 0 }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
                  <strong>Pelajar & Mahasiswa</strong> — ada tab khusus dengan harga mulai <strong style={{ color: 'var(--accent)' }}>Rp 39rb</strong> untuk CV, poster event, pitch deck, dan keperluan kampus lainnya.
                </p>
              </div>

              {/* Service tabs */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
                {satuanKeys.map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveSatuan(key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '9px 18px', borderRadius: 100, cursor: 'pointer',
                      border: `1.5px solid ${activeSatuan === key ? 'var(--accent)' : 'var(--border)'}`,
                      background: activeSatuan === key ? 'var(--accent-dim)' : 'transparent',
                      color: activeSatuan === key ? 'var(--accent)' : 'var(--text-muted)',
                      fontSize: '0.82rem', fontWeight: 700, transition: 'all 0.18s',
                      position: 'relative',
                    }}
                  >
                    <i className={`fas ${SERVICE_ICONS[key] ?? 'fa-circle'}`} style={{ fontSize: '0.8rem' }} />
                    {SATUAN_LABELS[key]}
                    {key === 'pelajar' && (
                      <span style={{ position: 'absolute', top: -8, right: -4, background: 'var(--accent)', color: '#000', fontSize: '0.55rem', fontWeight: 900, padding: '1px 6px', borderRadius: 100, letterSpacing: '0.04em' }}>
                        ab Rp 39rb
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Item rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {satuanItems.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'grid', gridTemplateColumns: '1fr auto',
                      background: 'var(--bg-surface)', border: '1px solid var(--border)',
                      borderRadius: 16, padding: '20px 24px', gap: 24, alignItems: 'center',
                      transition: 'border-color 0.15s',
                    }}
                    className="satuan-row"
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.97rem', marginBottom: 4 }}>{item.name}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.55 }}>{item.desc}</div>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                        borderRadius: 100, padding: '3px 10px', fontSize: '0.7rem', color: 'var(--text-muted)',
                      }}>
                        <i className="fas fa-clock" style={{ fontSize: '0.62rem' }} />
                        {item.delivery}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
                      <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                        {item.price}
                      </div>
                      <Link
                        href={`/order?service=${activeSatuan}&item=${item.id}${activeSatuan === 'pelajar' ? '&plan=satuan-pelajar' : ''}`}
                        className="btn btn-ghost"
                        style={{ fontSize: '0.78rem', padding: '7px 16px', whiteSpace: 'nowrap' }}
                      >
                        Pesan <i className="fas fa-arrow-right" style={{ fontSize: '0.75em' }} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 20, textAlign: 'center' }}>
                Semua harga estimasi. Pesan → tim kami konfirmasi scope & kirim invoice resmi.
              </p>
            </div>
          </SectionReveal>

          {/* ── Retainer Bulanan ── */}
          <SectionReveal>
            <div style={{ marginTop: 100, paddingTop: 80, borderTop: '1px solid var(--border)' }}>
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
                    Retainer <span style={{ color: 'var(--accent)' }}>Bulanan</span>
                  </h2>
                  <span style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '3px 10px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    Kontrak minimum 3 bulan
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', maxWidth: 600, lineHeight: 1.7 }}>
                  Partner digital jangka panjang. Satu kontrak, tim tetap, tanpa biaya overhead internal.
                  Bayar bulanan, hentikan kapan saja setelah periode minimum.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {RETAINER_PLANS.map(plan => (
                  <div
                    key={plan.id}
                    style={{
                      background: plan.popular ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                      border: `1.5px solid ${plan.popular ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius: 20, padding: '32px 28px',
                      display: 'flex', flexDirection: 'column', position: 'relative',
                    }}
                  >
                    {plan.popular && (
                      <span style={{ position: 'absolute', top: -11, right: 20, background: 'var(--accent)', color: '#000', fontSize: '0.62rem', fontWeight: 800, padding: '2px 10px', borderRadius: 100 }}>
                        POPULER
                      </span>
                    )}

                    <div style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 4 }}>{plan.name}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                      {plan.price}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>{plan.desc}</p>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 24 }}>
                      {plan.includes.map(item => (
                        <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.8rem' }}>
                          <i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '0.58rem', marginTop: 4, flexShrink: 0 }} />
                          {item}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/order?service=retainer&plan=${plan.id}`}
                      className={plan.popular ? 'btn btn-primary' : 'btn btn-ghost'}
                      style={{ justifyContent: 'center', fontSize: '0.85rem' }}
                    >
                      Mulai Retainer Ini
                    </Link>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, padding: '20px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <i className="fas fa-info-circle" style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                  Semua paket retainer mencakup laporan bulanan, akses ke Notion workspace proyek, dan jaminan SLA tertulis. Harga bisa disesuaikan untuk scope khusus.{' '}
                  <Link href="/contact" style={{ color: 'var(--accent)', fontWeight: 700 }}>Diskusikan kebutuhan Anda →</Link>
                </p>
              </div>
            </div>
          </SectionReveal>

        </div>
      </section>

      <style>{`
        .satuan-row:hover { border-color: rgba(194,255,0,0.35) !important; }
      `}</style>
    </main>
  )
}
