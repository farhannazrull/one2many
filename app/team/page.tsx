import type { Metadata } from 'next'
import TeamClient from './TeamClient'

export const metadata: Metadata = {
  title: 'Tim Inti | one2many',
  description: 'Kenali pasukan khusus di balik one2many — Creative Director, Frontend Engineer, Videographer, dan UI/UX Specialist yang berdedikasi penuh untuk transformasi digital bisnis Anda.',
}

export default function TeamPage() {
  return <TeamClient />
}
