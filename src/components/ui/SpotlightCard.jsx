import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(147, 197, 253, 0.16)',
}) {
  const shouldReduceMotion = useReducedMotion()
  const [spotlight, setSpotlight] = useState({ x: '50%', y: '50%' })

  const handleMouseMove = (event) => {
    if (shouldReduceMotion) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    setSpotlight({ x: `${x}%`, y: `${y}%` })
  }

  return (
    <motion.article
      className={`group relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={shouldReduceMotion ? undefined : { y: -5, scale: 1.01 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${spotlight.x} ${spotlight.y}, ${spotlightColor}, transparent 44%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </motion.article>
  )
}

export default SpotlightCard
