import { useEffect } from 'react'

// Marks a section with `data-offscreen` while it's out of view, so CSS can
// pause its continuous animations (see ".hud-offscreen-pause" in styles.css).
export function useOffscreenPause(ref) {
  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) element.removeAttribute('data-offscreen')
        else element.setAttribute('data-offscreen', '')
      },
      { rootMargin: '120px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])
}
