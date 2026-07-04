import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'

export async function POST(req: NextRequest) {
  const { email, code } = await req.json()
  if (!email || !code) return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 })

  const normalized = email.trim().toLowerCase()

  const otp = await prisma.otpCode.findFirst({
    where: { email: normalized, code, used: false, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: 'desc' },
  })

  if (!otp) return NextResponse.json({ error: 'Kode salah atau sudah kedaluwarsa' }, { status: 401 })

  await prisma.otpCode.update({ where: { id: otp.id }, data: { used: true } })

  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 hari

  await prisma.customerSession.create({ data: { email: normalized, token, expiresAt } })

  const res = NextResponse.json({ success: true, email: normalized })
  res.cookies.set('customer_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  return res
}
