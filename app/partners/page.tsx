import type { Metadata } from 'next'
import PartnersClient from './PartnersClient'

export const metadata: Metadata = {
  title: 'Mitra Freelancer | one2many',
  description: 'Jaringan mitra freelancer terseleksi — desainer, developer, videografer, dan copywriter yang mengerjakan proyek One2Many.',
}

export default function PartnersPage() {
  return <PartnersClient />
}
