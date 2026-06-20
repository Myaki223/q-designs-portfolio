import { useEffect } from 'react'
import Lenis from 'lenis'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function LenisSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      return undefined
    }

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    })

    window.__qDesignsLenis = lenis

    return () => {
      lenis.destroy()
      delete window.__qDesignsLenis
    }
  }, [])

  return null
}

export default LenisSmoothScroll
