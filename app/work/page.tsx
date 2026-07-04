import type { Metadata } from 'next'
import SectionReveal from '@/components/SectionReveal'
import Work from '@/components/Work'
import Repository from '@/components/Repository'

export const metadata: Metadata = {
  title: 'Portofolio & Karya | one2many',
  description: 'Jelajahi studi kasus transformasi digital dari berbagai industri — branding, UI/UX, web development, dan video production untuk UMKM dan startup Indonesia.',
}

export default function WorkPage() {
  return (
    <main>
      <SectionReveal><Work /></SectionReveal>
      <SectionReveal><Repository /></SectionReveal>
    </main>
  )
}
