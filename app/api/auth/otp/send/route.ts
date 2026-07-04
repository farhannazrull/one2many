import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email?.trim()) return NextResponse.json({ error: 'Email wajib diisi' }, { status: 400 })

  const normalized = email.trim().toLowerCase()
  const code = generateOtp()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 menit

  // Invalidate OTP lama untuk email ini
  await prisma.otpCode.updateMany({
    where: { email: normalized, used: false },
    data: { used: true },
  })

  await prisma.otpCode.create({ data: { email: normalized, code, expiresAt } })

  console.log(`[OTP] ${normalized} → ${code}`)

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'one2many <noreply@one2many.id>',
        to: normalized,
        subject: `Kode verifikasi one2many: ${code}`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
            <h2 style="font-size:1.4rem;margin-bottom:8px">Kode Masuk one2many</h2>
            <p style="color:#666;margin-bottom:24px">Gunakan kode ini untuk masuk ke halaman profil kamu. Berlaku 10 menit.</p>
            <div style="background:#f4f4f0;border-radius:12px;padding:32px;text-align:center;margin-bottom:24px">
              <span style="font-size:2.5rem;font-weight:900;letter-spacing:0.2em;color:#111">${code}</span>
            </div>
            <p style="font-size:0.8rem;color:#999">Jika kamu tidak meminta kode ini, abaikan email ini.</p>
          </div>
        `,
      })
    } catch (err) {
      console.error('[OTP] email error:', err)
    }
  }

  const isDev = process.env.NODE_ENV !== 'production'
  return NextResponse.json({ success: true, ...(isDev && { _dev_otp: code }) })
}
