import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Smooth page scrolling. Pauses while a case study is open (the dialog keeps
// native scrolling via data-lenis-prevent) and glides to in-page section
// links such as #work or #contact. Case-study links (#work/<slug>) are left
// to the router.
function LenisSmoothScroll({ stopped = false }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]')
      const id = link?.getAttribute('href').slice(1)
      if (!id || id.includes('/')) return
      const target = id === 'top' ? 0 : document.getElementById(id)
      if (target === null) return
      event.preventDefault()
      window.history.pushState(null, '', `#${id}`)
      lenis.scrollTo(target, { offset: id === 'top' ? 0 : -72 })
      // Keep keyboard users (and the skip link) in step with the scroll.
      if (target instanceof HTMLElement) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      }
    }

    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    if (stopped) lenisRef.current?.stop()
    else lenisRef.current?.start()
  }, [stopped])

  return null
}

export default LenisSmoothScroll
