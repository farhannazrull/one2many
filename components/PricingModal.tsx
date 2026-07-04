'use client'
import { motion, AnimatePresence } from 'framer-motion'

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    title: string
    slug: string
    items: { name: string; price: string }[]
  } | null
}

export default function PricingModal({ isOpen, onClose, data }: PricingModalProps) {
  if (!data) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 500,
              background: 'var(--bg-surface)',
              borderRadius: 'var(--r-xl)',
              border: '1px solid var(--border)',
              padding: 40,
              boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
              overflow: 'hidden'
            }}
          >
            <button 
              onClick={onClose}
              style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              <i className="fas fa-times" />
            </button>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>{data.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 32 }}>Detail investasi untuk layanan spesifik.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              {data.items.map((item) => (
                <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text)' }}>{item.name}</span>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent)' }}>{item.price}</span>
                </div>
              ))}
            </div>

            <a
              href={`/order?service=${data.slug}`}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Mulai Konsultasi <i className="fas fa-arrow-right" />
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
