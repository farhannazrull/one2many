export type Package = {
  id: string
  label: string
  price: string
  desc: string
  includes: string[]
  popular?: boolean
}

export const PACKAGES: Record<string, Package[]> = {
  'graphic-design': [
    {
      id: 'starter',
      label: 'Starter',
      price: 'Mulai Rp 8jt',
      desc: 'Identitas visual dasar untuk bisnis baru',
      includes: ['Logo 3 konsep + revisi', 'Brand color & typography', 'Business card design', 'File siap produksi (AI, PDF, PNG)'],
    },
    {
      id: 'professional',
      label: 'Professional',
      price: 'Mulai Rp 18jt',
      desc: 'Sistem visual lengkap untuk brand yang serius',
      includes: ['Logo + variasi & submark', 'Full brand guideline (30+ hal)', 'Social media kit (12 template)', 'Stationery set'],
      popular: true,
    },
    {
      id: 'enterprise',
      label: 'Enterprise',
      price: 'Hubungi Kami',
      desc: 'Brand system enterprise dengan konsultasi mendalam',
      includes: ['Semua di Professional', 'Packaging & merchandise design', 'Brand activation kit', 'Konsultasi brand (6 sesi)'],
    },
  ],
  'ui-ux-design': [
    {
      id: 'essentials',
      label: 'Essentials',
      price: 'Mulai Rp 12jt',
      desc: 'UI design untuk produk digital sederhana',
      includes: ['UX audit & brief', 'Wireframe low-fidelity', 'UI design (10 screen)', 'Prototype interaktif Figma'],
    },
    {
      id: 'professional',
      label: 'Professional',
      price: 'Mulai Rp 28jt',
      desc: 'Design system + product design penuh',
      includes: ['UX research (10 user)', 'Wireframe & user flow', 'UI design (30+ screen)', 'Design system (50+ komponen)'],
      popular: true,
    },
    {
      id: 'enterprise',
      label: 'Enterprise',
      price: 'Hubungi Kami',
      desc: 'End-to-end product design dengan support',
      includes: ['Semua di Professional', 'Usability testing & laporan', 'Dev handoff & dokumentasi', 'Post-launch iteration support'],
    },
  ],
  'web-development': [
    {
      id: 'landing',
      label: 'Landing Page',
      price: 'Mulai Rp 8jt',
      desc: 'Landing page konversi tinggi, cepat launch',
      includes: ['1 halaman + form lead', 'Mobile responsive & fast', 'SEO on-page dasar', 'Deploy ke Vercel / hosting'],
    },
    {
      id: 'company',
      label: 'Company Site',
      price: 'Mulai Rp 22jt',
      desc: 'Website perusahaan profesional multi-halaman',
      includes: ['5–10 halaman', 'CMS (blog, portofolio, tim)', 'SEO + Google Analytics', 'Performance 95+ PageSpeed'],
      popular: true,
    },
    {
      id: 'webapp',
      label: 'Web App',
      price: 'Mulai Rp 45jt',
      desc: 'Aplikasi web dengan fitur & backend custom',
      includes: ['Auth, database, & API', 'Dashboard & admin panel', 'Third-party integration', 'CI/CD + deployment'],
    },
  ],
  'video-production': [
    {
      id: 'shortform',
      label: 'Short Form',
      price: 'Mulai Rp 5jt',
      desc: 'Konten video vertikal untuk sosial media',
      includes: ['1 video (30–60 detik)', 'Script & storyboard', 'Editing + subtitle', 'Musik royalty-free'],
    },
    {
      id: 'brandfilm',
      label: 'Brand Film',
      price: 'Mulai Rp 18jt',
      desc: 'Brand film sinematik 2–5 menit',
      includes: ['Pre-production & shot list', '1–2 hari shooting on-location', 'Color grading sinematik', 'Motion graphics + sound design'],
      popular: true,
    },
    {
      id: 'campaign',
      label: 'Full Campaign',
      price: 'Hubungi Kami',
      desc: 'Paket video kampanye multi-format',
      includes: ['Semua di Brand Film', '3–5 cut versi per platform', 'Thumbnail & social media kit', 'Campaign strategy & brief'],
    },
  ],
  'pelajar': [
    {
      id: 'starter-pelajar',
      label: 'Satuan',
      price: 'Mulai Rp 39rb',
      desc: 'Bayar per item, harga transparan — cocok untuk kebutuhan satu-dua desain',
      includes: ['Pilih dari 8 item (CV, poster, banner, dll)', 'Revisi 1×', 'Selesai 1–2 hari kerja', 'File siap kirim / upload'],
    },
    {
      id: 'bundle-kepanitiaan',
      label: 'Bundle Kepanitiaan',
      price: 'Rp 149rb',
      desc: 'Paket visual lengkap untuk kepanitiaan & organisasi kampus',
      includes: ['Poster event kampus', 'Banner digital / spanduk', 'Desain kaos / merch', 'Revisi 1× per item'],
      popular: true,
    },
    {
      id: 'bundle-pkm',
      label: 'Bundle PKM / Kompetisi',
      price: 'Rp 349rb',
      desc: 'Semua materi visual untuk PKM, kompetisi bisnis, atau tugas akhir',
      includes: ['Pitch deck 10–15 slide', 'Logo usaha sederhana', 'Poster / banner event', 'Feed Instagram 3 post'],
    },
  ],
  'mobile-development': [
    {
      id: 'mvp',
      label: 'MVP App',
      price: 'Mulai Rp 25jt',
      desc: 'Aplikasi mobile untuk validasi produk & early adopter',
      includes: ['UI design (15 screen)', 'React Native (iOS & Android)', 'Auth + API dasar', 'Deploy ke App Store & Play Store'],
    },
    {
      id: 'full-app',
      label: 'Full App',
      price: 'Mulai Rp 55jt',
      desc: 'Aplikasi mobile production-ready dengan fitur lengkap',
      includes: ['UI/UX design (40+ screen)', 'React Native atau Flutter', 'Backend + database + dashboard admin', 'Push notification, payment, analytics'],
      popular: true,
    },
    {
      id: 'enterprise-app',
      label: 'Enterprise App',
      price: 'Hubungi Kami',
      desc: 'Aplikasi skala enterprise dengan SLA & dedicated support',
      includes: ['Semua di Full App', 'Kotlin native (Android) / Swift (iOS)', 'Security audit & pentest', 'SLA + 6 bulan post-launch support'],
    },
  ],
}

export const SERVICE_LABELS: Record<string, string> = {
  'graphic-design':     'Graphic Design',
  'ui-ux-design':       'UI/UX Design',
  'web-development':    'Web Development',
  'video-production':   'Video Production',
  'mobile-development': 'Mobile App Dev',
  'pelajar':            'Pelajar & Freelancer',
}
