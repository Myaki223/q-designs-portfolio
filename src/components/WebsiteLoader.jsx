import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { LiquidGlassLogo } from './liquid-glass-logo'
import './website-loader.css'

const LOGO = '/images/qf-design-logo.png'
const HOLD_MS = 500

export default function WebsiteLoader({ onFinished }) {
  const overlay = useRef(null)
  const [sequenceComplete, setSequenceComplete] = useState(false)
  const [pageReady, setPageReady] = useState(false)
  const [phase, setPhase] = useState('animating')
  const completeSequence = useCallback(() => setSequenceComplete(true), [])

  useLayoutEffect(() => {
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    return () => { root.style.overflow = previousOverflow }
  }, [])

  useEffect(() => {
    let cancelled = false
    // Only the images in the opening viewport need to gate the reveal. The
    // portfolio remains mounted so its layout and other assets load normally.
    const images = [...document.querySelectorAll('#portfolio-content img')].filter((image) => {
      const rect = image.getBoundingClientRect()
      return rect.bottom > 0 && rect.top < window.innerHeight
    })
    const finish = () => { if (!cancelled) setPageReady(true) }
    const deadline = window.setTimeout(finish, 6000)
    Promise.allSettled([
      document.fonts?.ready,
      ...images.map((image) => image.decode()),
    ]).then(() => {
      window.clearTimeout(deadline)
      finish()
    })
    return () => {
      cancelled = true
      window.clearTimeout(deadline)
    }
  }, [])

  useEffect(() => {
    const canvas = overlay.current?.querySelector('canvas')
    canvas?.addEventListener('webglcontextlost', completeSequence)
    // Failure-only escape hatch for a stalled asset or GPU. Normal completion
    // comes exclusively from the renderer's final-frame callback.
    let deadline
    const armDeadline = () => {
      window.clearTimeout(deadline)
      if (!document.hidden) deadline = window.setTimeout(completeSequence, 12000)
    }
    armDeadline()
    document.addEventListener('visibilitychange', armDeadline)
    return () => {
      window.clearTimeout(deadline)
      document.removeEventListener('visibilitychange', armDeadline)
      canvas?.removeEventListener('webglcontextlost', completeSequence)
    }
  }, [completeSequence])

  useEffect(() => {
    if (!sequenceComplete || !pageReady) return undefined
    setPhase('holding')
    const hold = window.setTimeout(() => setPhase('exiting'), HOLD_MS)
    return () => window.clearTimeout(hold)
  }, [sequenceComplete, pageReady])

  useEffect(() => {
    if (phase !== 'exiting') return undefined
    // The Web Animations lifecycle also handles zero-duration reduced motion.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fade = overlay.current.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: reduced ? 0 : 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards',
    })
    let cancelled = false
    fade.finished.then(() => { if (!cancelled) onFinished() }).catch(() => {})
    return () => {
      cancelled = true
      fade.cancel()
    }
  }, [phase, onFinished])

  return (
    <div
      ref={overlay}
      className="website-loader"
      data-phase={phase}
      role="status"
      aria-label="Loading Q Designs"
      data-lenis-prevent
    >
      <LiquidGlassLogo
        logo={LOGO}
        logoColor="original"
        ending="logo"
        background="#000000"
        tileColor="#141414"
        textColor="#ffffff"
        style={{ height: 480 }}
        className="website-loader__glass"
        aria-label="Q Designs logo"
        onComplete={completeSequence}
      />
    </div>
  )
}
