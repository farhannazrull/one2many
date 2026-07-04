'use client'
import { useSearchParams } from 'next/navigation'
import OrderWizard from './OrderWizard'

export default function OrderContent() {
  const params  = useSearchParams()
  const service = params.get('service') ?? undefined
  const item    = params.get('item')    ?? undefined
  const plan    = params.get('plan')    ?? undefined
  return <OrderWizard defaultService={service} defaultItem={item} defaultPlan={plan} />
}
