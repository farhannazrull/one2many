export type SatuanItem = {
  id: string
  name: string
  price: string
  delivery: string
  desc: string
}

export const SATUAN: Record<string, SatuanItem[]> = {
  'graphic-design': [
    { id: 'logo',         name: 'Logo Design',          price: 'Rp 2.5Jt',  delivery: '5–7 hari kerja',   desc: '3 konsep awal, 2 putaran revisi, file AI / PDF / PNG / SVG' },
    { id: 'social-kit',   name: 'Social Media Kit',     price: 'Rp 3Jt',    delivery: '4–6 hari kerja',   desc: '15 template editable (feed + story), siap di Figma atau Canva' },
    { id: 'poster',       name: 'Poster / Banner',      price: 'Rp 500rb',  delivery: '1–2 hari kerja',   desc: 'Satu layout, 2 revisi, file siap cetak & digital' },
    { id: 'brand-guide',  name: 'Brand Guideline',      price: 'Rp 4Jt',    delivery: '7–10 hari kerja',  desc: 'Dokumen 20+ halaman: warna, tipografi, logo usage, do & don\'t' },
    { id: 'packaging',    name: 'Packaging Design',     price: 'Rp 3.5Jt',  delivery: '5–8 hari kerja',   desc: 'Desain kemasan + mockup 3D realistis + file siap cetak' },
    { id: 'stationery',   name: 'Stationery Set',       price: 'Rp 2Jt',    delivery: '3–5 hari kerja',   desc: 'Business card, kop surat, amplop — siap produksi' },
    { id: 'infografis',   name: 'Infografis',           price: 'Rp 1.5Jt',  delivery: '3–4 hari kerja',   desc: 'Visualisasi data / alur, format landscape atau portrait' },
    { id: 'presentation', name: 'Template Presentasi',  price: 'Rp 2.5Jt',  delivery: '4–6 hari kerja',   desc: '20 slide editable, Google Slides atau PowerPoint, on-brand' },
  ],
  'ui-ux-design': [
    { id: 'landing-ui',   name: 'Landing Page UI',      price: 'Rp 3.5Jt',  delivery: '5–7 hari kerja',   desc: '1 halaman penuh, desktop + mobile, Figma ready untuk dev' },
    { id: 'screen-5',     name: 'Screen Design (per 5)',price: 'Rp 2Jt',    delivery: '3–5 hari kerja',   desc: 'High-fidelity, iOS/Android atau web, component-based' },
    { id: 'ux-audit',     name: 'UX Audit',             price: 'Rp 3Jt',    delivery: '5–7 hari kerja',   desc: 'Evaluasi heuristik + laporan rekomendasi prioritas tertulis' },
    { id: 'wireframe-10', name: 'Wireframe (per 10)',   price: 'Rp 1.5Jt',  delivery: '3–5 hari kerja',   desc: 'Low-fidelity dengan anotasi, siap untuk review stakeholder' },
    { id: 'design-system',name: 'Design System',        price: 'Rp 8Jt',    delivery: '10–14 hari kerja', desc: '50+ komponen, token warna & tipografi, Figma + dokumentasi' },
    { id: 'prototype',    name: 'Prototype Interaktif', price: 'Rp 2Jt',    delivery: '3–5 hari kerja',   desc: 'Clickable prototype dari desain yang sudah ada, Figma / Framer' },
    { id: 'icon-set',     name: 'Custom Icon Set',      price: 'Rp 2.5Jt',  delivery: '5–7 hari kerja',   desc: '30 ikon konsisten, format SVG + PNG, dua style (outline & solid)' },
  ],
  'web-development': [
    { id: 'landing-dev',  name: 'Landing Page',         price: 'Rp 5Jt',    delivery: '7–10 hari kerja',  desc: '1 halaman, Next.js, SEO on-page, form, deploy ke Vercel' },
    { id: 'company-web',  name: 'Company Profile',      price: 'Rp 12Jt',   delivery: '14–21 hari kerja', desc: '5–8 halaman, CMS sederhana, responsive, SEO dasar' },
    { id: 'ecommerce',    name: 'E-Commerce Basic',     price: 'Rp 18Jt',   delivery: '21–30 hari kerja', desc: 'Katalog produk, keranjang belanja, integrasi payment gateway' },
    { id: 'api-int',      name: 'API Integration',      price: 'Rp 3Jt',    delivery: '3–7 hari kerja',   desc: 'Integrasi third-party API (WhatsApp, Maps, Payment, dsb.) ke sistem existing' },
    { id: 'seo-setup',    name: 'SEO Technical Setup',  price: 'Rp 2Jt',    delivery: '2–4 hari kerja',   desc: 'Sitemap, meta tags, schema markup, Google Analytics + Search Console' },
    { id: 'cms-setup',    name: 'CMS Setup',            price: 'Rp 4Jt',    delivery: '5–7 hari kerja',   desc: 'Setup Sanity / Contentful / Notion CMS + integrasi ke website existing' },
    { id: 'perf-audit',   name: 'Performance Audit',    price: 'Rp 2.5Jt',  delivery: '3–5 hari kerja',   desc: 'Analisis Core Web Vitals + laporan optimasi tertulis + implementasi perbaikan' },
  ],
  'video-production': [
    { id: 'reels-1',      name: 'Video Reels / TikTok', price: 'Rp 1.5Jt',  delivery: '3–5 hari kerja',   desc: '1 video 30–60 detik, editing + subtitle + musik royalty-free' },
    { id: 'reels-3',      name: 'Paket 3 Reels',        price: 'Rp 4Jt',    delivery: '7–10 hari kerja',  desc: '3 video 30–60 detik, konsep terpadu, musik + subtitle' },
    { id: 'motion-15',    name: 'Motion Graphic (15 dtk)',price: 'Rp 2.5Jt', delivery: '5–7 hari kerja',  desc: 'Animasi 2D full, voice-over opsional, format MP4 + GIF' },
    { id: 'company-vid',  name: 'Company Profile Video', price: 'Rp 12Jt',   delivery: '14–21 hari kerja', desc: '1–2 menit, script + shooting + editing + color grading' },
    { id: 'product-vid',  name: 'Product Highlight',    price: 'Rp 7Jt',    delivery: '7–10 hari kerja',  desc: 'Demo / promo produk 30–60 detik, siap untuk iklan digital' },
    { id: 'thumbnail-10', name: 'Thumbnail Set (10)',    price: 'Rp 1Jt',    delivery: '2–3 hari kerja',   desc: '10 thumbnail YouTube / sosmed, branding konsisten' },
    { id: 'color-grade',  name: 'Color Grading',        price: 'Rp 1.5Jt',  delivery: '2–4 hari kerja',   desc: 'Color grading sinematik untuk footage yang sudah ada (per 3 menit)' },
  ],
  'pelajar': [
    { id: 'cv-resume',      name: 'CV / Resume Design',         price: 'Rp 49rb',   delivery: '1 hari kerja',     desc: 'CV profesional 1–2 halaman, ATS-friendly + desain modern siap kirim lamaran' },
    { id: 'poster-event',   name: 'Poster Event Kampus',        price: 'Rp 49rb',   delivery: '1 hari kerja',     desc: 'Poster digital untuk acara seminar, lomba, open recruitment organisasi' },
    { id: 'banner-digital', name: 'Banner Digital / Spanduk',   price: 'Rp 39rb',   delivery: '1 hari kerja',     desc: 'Banner digital untuk webinar, acara kampus, atau keperluan sosial media' },
    { id: 'feed-set',       name: 'Feed Instagram (3 post)',     price: 'Rp 89rb',   delivery: '1–2 hari kerja',   desc: '3 desain konten feed Instagram bertemakan kohesif, siap posting' },
    { id: 'kaos-merch',     name: 'Desain Kaos / Merch',        price: 'Rp 69rb',   delivery: '1–2 hari kerja',   desc: 'Desain sablon kaos, totebag, atau merchandise untuk kepanitiaan & organisasi' },
    { id: 'pitch-deck',     name: 'Pitch Deck / Presentasi',    price: 'Rp 149rb',  delivery: '2–3 hari kerja',   desc: 'Slide presentasi profesional (10–15 halaman) untuk PKM, kompetisi bisnis, atau tugas akhir' },
    { id: 'logo-simple',    name: 'Logo Usaha Sederhana',        price: 'Rp 199rb',  delivery: '2–3 hari kerja',   desc: 'Logo minimalis 1 konsep untuk usaha sampingan atau organisasi kampus' },
    { id: 'landing-simple', name: 'Landing Page Sederhana',     price: 'Rp 999rb',  delivery: '3–5 hari kerja',   desc: 'Landing page statis 1 halaman untuk portofolio, side project, atau usaha kecil' },
  ],
  'mobile-development': [
    { id: 'splash-onboard', name: 'Splash + Onboarding',       price: 'Rp 3Jt',   delivery: '4–6 hari kerja',   desc: 'Animasi splash screen + 3–5 layar onboarding, React Native / Flutter' },
    { id: 'auth-flow',      name: 'Auth Flow',                  price: 'Rp 4Jt',   delivery: '5–7 hari kerja',   desc: 'Login, register, forgot password, OTP — siap integrasi ke backend' },
    { id: 'screen-mobile',  name: 'Screen Design (per 5)',      price: 'Rp 2.5Jt', delivery: '3–5 hari kerja',   desc: 'High-fidelity mobile screen, iOS atau Android, component-based Figma' },
    { id: 'push-notif',     name: 'Push Notification Setup',    price: 'Rp 3Jt',   delivery: '3–5 hari kerja',   desc: 'Integrasi FCM / APNs + segmentasi notifikasi ke existing app' },
    { id: 'app-store',      name: 'App Store Submission',       price: 'Rp 2Jt',   delivery: '3–5 hari kerja',   desc: 'Persiapan & submit ke Google Play Store dan Apple App Store' },
    { id: 'payment-mobile', name: 'Payment Gateway Integration',price: 'Rp 4.5Jt', delivery: '5–8 hari kerja',   desc: 'Integrasi Midtrans / Xendit ke aplikasi mobile existing' },
    { id: 'app-audit',      name: 'Mobile App Audit',           price: 'Rp 3.5Jt', delivery: '4–6 hari kerja',   desc: 'Audit performa, keamanan, dan UX aplikasi yang sudah ada + laporan rekomendasi' },
  ],
}


export const SATUAN_LABELS: Record<string, string> = {
  'pelajar':            'Pelajar & Freelancer',
  'graphic-design':     'Graphic Design',
  'ui-ux-design':       'UI/UX Design',
  'web-development':    'Web Development',
  'video-production':   'Video Production',
  'mobile-development': 'Mobile App Dev',
}
