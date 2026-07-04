import type { Metadata } from 'next'
import PricingClient from './PricingClient'

export const metadata: Metadata = {
  title: 'Harga & Paket Layanan | one2many',
  description: 'Investasi transparan untuk transformasi digital bisnis Anda. Paket bundle End-to-End mulai Rp 35Jt, atau pilih layanan satuan sesuai kebutuhan.',
}

export default function PricingPage() {
  return <PricingClient />
}
