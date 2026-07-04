import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get('customer_token')?.value
  if (token) {
    await prisma.customerSession.deleteMany({ where: { token } }).catch(() => {})
  }
  const res = NextResponse.json({ success: true })
  res.cookies.delete('customer_token')
  return res
}
