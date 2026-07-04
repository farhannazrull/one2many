import type { Metadata } from 'next'
import { Suspense } from 'react'
import SectionReveal from '@/components/SectionReveal'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: 'Mulai Proyek | one2many',
  description: 'Konsultasikan kebutuhan transformasi digital bisnis Anda. Tim one2many siap membantu dari brief hingga launch — desain, web, dan video dalam satu pipeline.',
}

export default function ContactPage() {
  return (
    <main>
      <SectionReveal>
        <Suspense fallback={<div>Loading...</div>}>
          <Contact />
        </Suspense>
      </SectionReveal>
    </main>
  )
}
