import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  target,
  rel,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const Component = href ? motion.a : motion.button

  const handleMouseMove = (event) => {
    if (shouldReduceMotion) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * 0.16
    const y = (event.clientY - rect.top - rect.height / 2) * 0.16

    setOffset({ x, y })
  }

  const resetOffset = () => setOffset({ x: 0, y: 0 })

  return (
    <Component
      href={href}
      type={href ? undefined : type}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetOffset}
      onBlur={resetOffset}
      animate={shouldReduceMotion ? undefined : offset}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 240, damping: 18, mass: 0.4 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}

export default MagneticButton
