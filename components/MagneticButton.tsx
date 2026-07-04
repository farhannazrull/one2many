'use client'
import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function MagneticButton({
  children,
  strength = 0.38,
}: {
  children: React.ReactNode
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.08 })
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.08 })

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width  / 2) * strength)
    y.set((e.clientY - rect.top  - rect.height / 2) * strength)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ display: 'inline-flex', x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}
