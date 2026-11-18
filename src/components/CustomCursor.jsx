import { useEffect, useRef, useState } from 'react'

// Elements that make the ring grow. Any element can also set
// data-cursor="Label" to show a word inside the ring (e.g. "View").
const INTERACTIVE = 'a, button, [role="button"], label, summary, [data-cursor]'

// Custom cursor: a blue dot that tracks the pointer exactly and a ring that
// trails it smoothly. Only on precise pointers (mouse/trackpad) and when the
// visitor hasn't asked for reduced motion; everyone else keeps the system cursor.
function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    const update = () => setEnabled(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    let x = -100
    let y = -100
    let ringX = x
    let ringY = y
    let frame

    const onMove = (event) => {
      x = event.clientX
      y = event.clientY
      setVisible(true)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
    }

    const loop = () => {
      ringX += (x - ringX) * 0.18
      ringY += (y - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      frame = window.requestAnimationFrame(loop)
    }

    const onOver = (event) => {
      const target = event.target.closest?.(INTERACTIVE)
      setHover(Boolean(target))
      setLabel(target?.closest('[data-cursor]')?.getAttribute('data-cursor') || '')
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = (event) => {
      if (!event.relatedTarget) setVisible(false)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerout', onLeave)
    frame = window.requestAnimationFrame(loop)

    return () => {
      root.classList.remove('has-custom-cursor')
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerout', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  const state = label ? 'label' : hover ? 'hover' : 'idle'

  return (
    <div
      className="custom-cursor"
      data-state={state}
      data-pressed={pressed || undefined}
      data-visible={visible || undefined}
      aria-hidden="true"
    >
      <div ref={ringRef} className="custom-cursor__ring">
        <span className="custom-cursor__ring-shape">
          <span className="custom-cursor__label">{label}</span>
        </span>
      </div>
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  )
}

export default CustomCursor
