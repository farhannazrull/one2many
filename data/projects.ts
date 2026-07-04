export interface Project {
  id: string
  title: string
  category: 'branding' | 'ui-ux' | 'video' | 'web'
  client: string
  location: string
  year: string
  status: 'Completed' | 'Ongoing'
  image: string
  thumb: string
  description: string
  services: string[]
  tech: string[]
  results: string[]
  tags: string[]
  accentColor: string
  iconColor: string
  icon: string
  stat: string
}

export const projects: Project[] = [
  {
    id: 'alpha',
    title: 'Project Alpha',
    category: 'branding',
    client: 'Natura Bites — F&B Startup',
    location: 'Surabaya',
    year: '2024',
    status: 'Completed',
    image: 'https://picsum.photos/seed/brand1o2m/880/400',
    thumb: 'https://picsum.photos/seed/brand1o2m/600/400',
    description: 'Complete brand identity redesign untuk Natura Bites, F&B startup premium asal Surabaya yang berfokus pada healthy snacking. Proyek mencakup repositioning merek, visual system baru, dan brand guideline komprehensif.',
    services: ['Brand Strategy & Positioning', 'Logo Design System', 'Visual Identity', 'Brand Guideline (48 hal)', 'Packaging Design Concept'],
    tech: ['Figma', 'Adobe Illustrator', 'Adobe InDesign'],
    results: ['40% peningkatan brand recall dalam customer survey', 'Konsistensi visual di 12 touchpoint berbeda', 'Brand guideline siap produksi dalam 6 minggu'],
    tags: ['Branding', 'Design'],
    accentColor: 'rgba(0,168,102,0.12)',
    iconColor: '#00a866',
    icon: 'paint-brush',
    stat: '40% brand recall ↑',
  },
  {
    id: 'beta',
    title: 'Project Beta',
    category: 'ui-ux',
    client: 'NexaStack — SaaS Platform',
    location: 'Jakarta',
    year: '2024',
    status: 'Completed',
    image: 'https://picsum.photos/seed/uiux2o2m/880/400',
    thumb: 'https://picsum.photos/seed/uiux2o2m/600/400',
    description: 'Redesign dashboard analytics untuk NexaStack, platform SaaS B2B yang melayani 500+ bisnis di Indonesia. Fokus pada simplifikasi cognitive load dan peningkatan task completion rate pengguna.',
    services: ['UX Research & Audit', 'Information Architecture', 'UI Design System', 'Interactive Prototyping', 'Usability Testing (20 partisipan)'],
    tech: ['Figma', 'FigJam', 'Maze', 'Principle'],
    results: ['28% peningkatan task completion rate', 'Waktu onboarding baru berkurang 35%', 'Design system dengan 120+ komponen siap dev'],
    tags: ['UI/UX', 'Web'],
    accentColor: 'rgba(10,132,255,0.12)',
    iconColor: '#0a84ff',
    icon: 'laptop-code',
    stat: '28% task completion ↑',
  },
  {
    id: 'gamma',
    title: 'Project Gamma',
    category: 'video',
    client: 'Velo Sports — Lifestyle Brand',
    location: 'Bali',
    year: '2024',
    status: 'Completed',
    image: 'https://picsum.photos/seed/vid3o2m/880/400',
    thumb: 'https://picsum.photos/seed/vid3o2m/600/400',
    description: 'Brand film untuk peluncuran koleksi terbaru Velo Sports, merek lifestyle olahraga premium asal Bali. Produksi 3-hari di lokasi Seminyak dan Canggu dengan fokus pada storytelling visual yang otentik.',
    services: ['Creative Concept & Scripting', 'Production Planning', 'On-Location Shooting (3 hari)', 'Color Grading', 'Motion Graphics', 'Sound Design'],
    tech: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Cinema 4D'],
    results: ['2.1 juta tayangan organik dalam 30 hari', 'Featured di 3 media lifestyle nasional', '47% conversion rate dari campaign video'],
    tags: ['Video', 'Motion'],
    accentColor: 'rgba(255,107,53,0.12)',
    iconColor: '#ff6b35',
    icon: 'video',
    stat: '2.1 juta tayangan',
  },
  {
    id: 'delta',
    title: 'Project Delta',
    category: 'branding',
    client: 'Aurum Collective — Premium Retail',
    location: 'Jakarta',
    year: '2024',
    status: 'Completed',
    image: 'https://picsum.photos/seed/logo4o2m/880/400',
    thumb: 'https://picsum.photos/seed/logo4o2m/600/400',
    description: 'Visual identity lengkap untuk Aurum Collective, butik fashion premium Jakarta yang menarget segmen millennial affluent. Identitas dirancang untuk tampil premium di konteks phygital — toko fisik dan digital presence.',
    services: ['Brand Research & Strategy', 'Logo & Symbol Design', 'Color & Typography System', 'Brand Application (retail)', 'Social Media Kit'],
    tech: ['Figma', 'Adobe Illustrator', 'Procreate'],
    results: ['Diakui oleh 3 design award lokal', 'Engagement sosial media meningkat 65%', 'Pembukaan 2 cabang baru pasca-rebrand'],
    tags: ['Branding', 'Logo'],
    accentColor: 'rgba(191,140,0,0.12)',
    iconColor: '#bf8c00',
    icon: 'gem',
    stat: '65% engagement ↑',
  },
  {
    id: 'epsilon',
    title: 'Project Epsilon',
    category: 'ui-ux',
    client: 'Dana+ — Fintech Startup',
    location: 'Surabaya',
    year: '2025',
    status: 'Completed',
    image: 'https://picsum.photos/seed/mob5o2m/880/400',
    thumb: 'https://picsum.photos/seed/mob5o2m/600/400',
    description: 'Desain aplikasi mobile untuk Dana+, startup fintech yang menyediakan layanan pinjaman mikro bagi UMKM. Tantangan utama: membuat antarmuka keuangan yang kompleks menjadi mudah dipahami oleh pengguna non-teknis.',
    services: ['User Research (30 wawancara)', 'Competitive Analysis', 'Mobile UI Design (iOS & Android)', 'Micro-interaction Design', 'Accessibility Audit (WCAG 2.1)'],
    tech: ['Figma', 'Framer', 'Principle', 'Zeplin'],
    results: ['Rating App Store 4.8/5 sejak launch', 'Drop-off rate onboarding berkurang 52%', 'Featured "Best Fintech Apps" media nasional'],
    tags: ['UI/UX', 'Mobile'],
    accentColor: 'rgba(94,92,230,0.12)',
    iconColor: '#5e5ce6',
    icon: 'mobile-alt',
    stat: '4.8★ App Store',
  },
  {
    id: 'zeta',
    title: 'Project Zeta',
    category: 'web',
    client: 'Archipelago Labs — Tech Company',
    location: 'Jakarta',
    year: '2025',
    status: 'Completed',
    image: 'https://picsum.photos/seed/web6o2m/880/400',
    thumb: 'https://picsum.photos/seed/web6o2m/600/400',
    description: 'Company website dengan WebGL 3D experience untuk Archipelago Labs, firma teknologi di bidang AI dan data infrastructure. Website dibangun sebagai showcase kompetensi teknis sekaligus lead generation tool.',
    services: ['Web Design & Development', 'Three.js / WebGL Integration', 'Next.js 14 App Router', 'Sanity CMS Setup', 'SEO & Core Web Vitals', 'Analytics & Conversion Setup'],
    tech: ['Next.js 14', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Sanity CMS', 'Vercel'],
    results: ['PageSpeed Insights score 98/100', 'Waktu load < 1.2 detik (LCP)', '3× peningkatan qualified leads dari organic'],
    tags: ['Web Dev', 'Next.js'],
    accentColor: 'rgba(0,184,255,0.12)',
    iconColor: '#00b8ff',
    icon: 'code',
    stat: 'PageSpeed 98/100',
  },
]
