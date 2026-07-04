'use client'
import { useState } from 'react'
import Link from 'next/link'

const items = Array(8).fill(['MULAI PROYEK', '→', "LET'S GO", '→']).flat()

export default function Marquee() {
  const [paused, setPaused] = useState(false)

  return (
    <Link
      href="/contact"
      style={{ display: 'block', background: 'var(--accent)', overflow: 'hidden', height: 72, cursor: 'pointer' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: 'max-content',
        animation: 'marqueeScroll 22s linear infinite',
        animationPlayState: paused ? 'paused' : 'running',
      }}>
        {[0, 1].map(track => (
          <div key={track} style={{ display: 'flex', alignItems: 'center' }}>
            {items.map((item, i) => (
              <span
                key={i}
                style={{
                  fontSize: item === '→' ? '1.2rem' : '0.85rem',
                  fontWeight: 800,
                  letterSpacing: item === '→' ? '0' : '0.14em',
                  textTransform: 'uppercase',
                  color: '#000',
                  padding: item === '→' ? '0 20px' : '0 28px',
                  whiteSpace: 'nowrap',
                  opacity: item === '→' ? 0.45 : 1,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Link>
  )
}
