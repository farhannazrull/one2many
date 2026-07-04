import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function isAuthed(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  return token === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { service, packageType, company, industry, referenceUrl, budget, timeline, description, name, email, phone } = body

  if (!service || !description?.trim() || !name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Field wajib tidak lengkap' }, { status: 400 })
  }

  const order = await prisma.order.create({
    data: { service, packageType, company, industry, referenceUrl, budget, timeline, description, name, email, phone },
  })

  return NextResponse.json({ id: order.id }, { status: 201 })
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(orders)
}
