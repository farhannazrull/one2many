import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'

// Dev-only bypass — TIDAK berfungsi di production
export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const email = process.env.CONTACT_EMAIL ?? 'dev@one2many.id'
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  await prisma.customerSession.create({ data: { email, token, expiresAt } })

  const res = NextResponse.json({ success: true, email })
  res.cookies.set('customer_token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  return res
}
