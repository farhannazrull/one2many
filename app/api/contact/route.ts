import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { name, email, service, message } = await req.json()

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Field tidak lengkap' }, { status: 400 })
  }

  await prisma.contact.create({ data: { name, email, service, message } })

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'one2many Website <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL ?? 'hello@one2many.id',
        replyTo: email,
        subject: `Brief Baru: ${name} — ${service || 'Belum dipilih'}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="border-bottom:2px solid #C2FF00;padding-bottom:12px">Brief Baru dari Website</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;color:#666;width:120px">Nama</td><td style="padding:10px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:10px 0;color:#666">Email</td><td style="padding:10px 0"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:10px 0;color:#666">Layanan</td><td style="padding:10px 0">${service || '—'}</td></tr>
            </table>
            <div style="margin-top:20px;padding:20px;background:#f8f8f5;border-radius:8px">
              <p style="color:#666;margin:0 0 8px;font-size:13px">PESAN</p>
              <p style="margin:0;line-height:1.7">${message.replace(/\n/g, '<br/>')}</p>
            </div>
          </div>
        `,
      })
    } catch (err) {
      console.error('[contact] email error:', err)
    }
  }

  return NextResponse.json({ success: true })
}
