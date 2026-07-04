import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionReveal from '@/components/SectionReveal'
import WhatsApp from '@/components/WhatsApp'

const font = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'one2many — Digital Creative Agency',
  description: 'Agensi kreatif digital B2B. UI/UX, web development, graphic design, mobile app & video production dalam satu pipeline — mulai dari Rp 10jt hingga enterprise scale.',
}

// Injected before paint — prevents flash of wrong theme
const themeScript = `(function(){
  var s=localStorage.getItem('theme');
  var d=s||'light';
  document.documentElement.setAttribute('data-theme', d);
})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={font.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body style={{ fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif' }}>
        <Navbar />
        {children}
        <SectionReveal><Footer /></SectionReveal>
        <WhatsApp />
      </body>
    </html>
  )
}
