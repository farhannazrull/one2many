import Hero from '@/components/Hero'
import SectionReveal from '@/components/SectionReveal'
import Why from '@/components/Why'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import ConsultasiCTA from '@/components/ConsultasiCTA'
import Marquee from '@/components/Marquee'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <SectionReveal><Why /></SectionReveal>
        <SectionReveal><Testimonials /></SectionReveal>
        <SectionReveal><FAQ /></SectionReveal>
        <ConsultasiCTA />
      </main>
      <Marquee />
    </>
  )
}
