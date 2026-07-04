'use client'
import { motion } from 'framer-motion'

const container = (delay: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: delay },
  },
})

const wordVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

interface Props {
  text: string
  accentWords?: string[]
  style?: React.CSSProperties
  className?: string
  delay?: number
}

export default function SplitText({ text, accentWords = [], style, className, delay = 0 }: Props) {
  const words = text.split(' ')

  return (
    <motion.span
      className={className}
      variants={container(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-20px' }}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.24em', ...style }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariant}
          style={{
            display: 'inline-block',
            color: accentWords.includes(word) ? 'var(--accent)' : 'inherit',
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
