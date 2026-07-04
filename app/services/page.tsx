import type { Metadata } from 'next'
import SectionReveal from '@/components/SectionReveal'
import Services from '@/components/Services'
import Process from '@/components/Process'

export const metadata: Metadata = {
  title: 'Layanan | one2many',
  description: 'Satu ekosistem layanan terintegrasi: Graphic Design, UI/UX Design, Web Development, Mobile App Dev, dan Video Production. Satu kontrak, satu titik kontak, tanpa friksi.',
}

export default function ServicesPage() {
  return (
    <main>
      <SectionReveal><Services /></SectionReveal>
      <SectionReveal><Process /></SectionReveal>
    </main>
  )
}
