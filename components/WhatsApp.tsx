'use client'
import { useState, useEffect } from 'react'

const WA_NUMBER = '6281234567890'
const WA_MESSAGE = 'Halo one2many, saya ingin konsultasi mengenai layanan digital untuk bisnis saya.'

export default function WhatsApp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 900,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: '#25D366',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.7)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
    >
      <i className="fab fa-whatsapp" />
    </a>
  )
}
