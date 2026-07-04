import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function isAuthed(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  return token === process.env.ADMIN_PASSWORD
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const { status, adminNotes } = await req.json()
  const order = await prisma.order.update({
    where: { id },
    data: { ...(status && { status }), ...(adminNotes !== undefined && { adminNotes }) },
  })
  return NextResponse.json(order)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await prisma.order.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
