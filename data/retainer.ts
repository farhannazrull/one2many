export type RetainerPlan = {
  id: string
  name: string
  price: string
  desc: string
  includes: string[]
  popular?: boolean
}

export const RETAINER_PLANS: RetainerPlan[] = [
  {
    id: 'web-care',
    name: 'Web Care',
    price: 'Rp 3Jt / bln',
    desc: 'Untuk website aktif yang butuh pemeliharaan rutin tanpa perubahan besar.',
    includes: [
      'Security & dependency update bulanan',
      'Backup mingguan otomatis',
      '1× content update / bulan',
      'Uptime monitoring 24/7',
      'Bug fix response < 48 jam',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Retainer',
    price: 'Rp 8Jt / bln',
    popular: true,
    desc: 'Partner digital aktif — konten, SEO, dan desain sosmed dalam satu kontrak.',
    includes: [
      'Semua fitur Web Care',
      '4× halaman / konten baru per bulan',
      'SEO on-page optimization bulanan',
      'Performance & Core Web Vitals audit',
      '8× desain sosial media per bulan',
      'Bug fix response < 24 jam',
    ],
  },
  {
    id: 'full-partner',
    name: 'Full-Service Partner',
    price: 'Rp 15Jt / bln',
    desc: 'Tim digital on-demand — desain, web, konten, dan video dalam satu retainer.',
    includes: [
      'Semua fitur Growth Retainer',
      'Unlimited minor content update',
      '16× desain sosial media per bulan',
      '2× video reels per bulan',
      'Dedicated Project Manager',
      'Priority bug fix response < 4 jam',
      'Monthly strategy call 1-on-1',
    ],
  },
]
