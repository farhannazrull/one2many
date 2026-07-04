import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About | one2many',
  description: 'Kenali pasukan khusus di balik one2many — Creative Director, Frontend Engineer, Videographer, dan UI/UX Specialist yang berdedikasi penuh untuk transformasi digital bisnis Anda.',
}

export default function AboutPage() {
  return <AboutClient />
}
