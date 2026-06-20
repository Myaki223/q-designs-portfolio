import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

function SpotlightBackground({ className = '', intensity = 'default' }) {
  const shouldReduceMotion = useReducedMotion()
  const layerRef = useRef(null)
  const [spotlight, setSpotlight] = useState({ x: '68%', y: '24%' })

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined
    }

    const updateSpotlight = (event) => {
      const layer = layerRef.current

      if (!layer) {
        return
      }

      const rect = layer.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100

      if (x < -10 || x > 110 || y < -10 || y > 110) {
        return
      }

      setSpotlight({ x: `${x}%`, y: `${y}%` })
    }

    window.addEventListener('pointermove', updateSpotlight, { passive: true })

    return () => window.removeEventListener('pointermove', updateSpotlight)
  }, [shouldReduceMotion])

  const glow =
    intensity === 'strong'
      ? 'rgba(147, 197, 253, 0.24)'
      : 'rgba(147, 197, 253, 0.16)'

  return (
    <div
      ref={layerRef}
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${spotlight.x} ${spotlight.y}, ${glow} 0%, rgba(59, 130, 246, 0.16) 14%, rgba(34, 211, 238, 0.08) 30%, transparent 54%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.08),transparent_42%)]" />
    </div>
  )
}

export default SpotlightBackground
