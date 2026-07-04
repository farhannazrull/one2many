import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')?.trim().toLowerCase()
  if (!email) return NextResponse.json({ error: 'Email wajib diisi' }, { status: 400 })

  const orders = await prisma.order.findMany({
    where: { email },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, createdAt: true, service: true, packageType: true,
      company: true, budget: true, timeline: true, status: true,
      description: true, name: true, phone: true,
    },
  })

  return NextResponse.json({ email, orders })
}
