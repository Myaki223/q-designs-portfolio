import { useCallback, useLayoutEffect, useRef, useState } from 'react'

// Cinematic entrance: an electric-blue HUD assembles, a scan sweeps through,
// "QRISHUN AMIK" decodes, "CREATIVE SYSTEM ONLINE" appears, then the HUD
// expands and dissolves into the site. About 4.9s in total. Styles live in
// the "Entrance intro" block of src/styles.css.
//
// Plays once per browser-tab session (sessionStorage) and never under
// prefers-reduced-motion — see shouldPlayIntro(). Skippable with the button
// or Escape, and a failsafe timer always dismisses it.

const SESSION_KEY = 'qd-intro-played'
const NAME = 'QRISHUN AMIK'
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#%+'

// Timeline (ms)
const DECODE_START = 1700
const DECODE_LENGTH = 1200
const ONLINE_AT = 3100
const EXIT_AT = 3900
const DONE_AT = 4900
const FAILSAFE_AT = 6500

// Decided synchronously before the first render, so the website never
// flashes before the intro and repeat visits in the session skip it.
export function shouldPlayIntro() {
  if (typeof window === 'undefined') return false
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return window.sessionStorage.getItem(SESSION_KEY) !== '1'
  } catch {
    return false
  }
}

const C = 200
const rad = (deg) => (deg * Math.PI) / 180
const point = (r, deg) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))]
const arc = (r, from, to) => {
  const [x1, y1] = point(r, from)
  const [x2, y2] = point(r, to)
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`
}
const ticks = Array.from({ length: 60 }, (_, i) => i * 6)

function scramble(progress) {
  const revealed = Math.floor(progress * NAME.length)
  return NAME.split('')
    .map((char, i) => {
      if (char === ' ' || i < revealed) return char
      return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    })
    .join('')
}

// `onReveal` fires when the exit starts, so the site underneath becomes live
// and its own entrance plays while the HUD dissolves over it. `onFinished`
// fires when the overlay is gone and can be unmounted. Skipping fires both.
function HudIntro({ onReveal, onFinished }) {
  const [phase, setPhase] = useState('assemble') // assemble → decode → online → exit
  const [name, setName] = useState('')
  const skipRef = useRef(null)
  const revealed = useRef(false)
  const finished = useRef(false)

  const reveal = useCallback(() => {
    if (revealed.current) return
    revealed.current = true
    onReveal()
  }, [onReveal])

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    reveal()
    onFinished()
  }, [reveal, onFinished])

  // Layout effect: the Escape listener, focus, and timers are in place before
  // the first paint, so an early Escape press is never missed.
  useLayoutEffect(() => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // Storage unavailable (private mode etc.): the intro simply may replay.
    }

    // Keep focus inside the intro while the page underneath is inert.
    skipRef.current?.focus({ preventScroll: true })

    const timers = []
    let decodeTimer
    const decodeStart = performance.now() + DECODE_START

    // Timer-driven (not rAF) so the decode keeps pace with the timeline even
    // if the browser throttles animation frames.
    timers.push(
      window.setTimeout(() => {
        setPhase('decode')
        decodeTimer = window.setInterval(() => {
          const progress = Math.min(1, (performance.now() - decodeStart) / DECODE_LENGTH)
          setName(progress >= 1 ? NAME : scramble(progress))
          if (progress >= 1) window.clearInterval(decodeTimer)
        }, 65)
      }, DECODE_START),
    )

    timers.push(
      window.setTimeout(() => {
        window.clearInterval(decodeTimer)
        setName(NAME) // the full name is always in place by "online"
        setPhase('online')
      }, ONLINE_AT),
    )
    timers.push(
      window.setTimeout(() => {
        setPhase('exit')
        reveal()
      }, EXIT_AT),
    )
    timers.push(window.setTimeout(finish, DONE_AT))
    // Failsafe: dismiss even if timers were throttled or something threw.
    timers.push(window.setTimeout(finish, FAILSAFE_AT))

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        finish()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      timers.forEach(window.clearTimeout)
      window.clearInterval(decodeTimer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [finish, reveal])

  return (
    <div className="hud-intro" data-phase={phase} role="dialog" aria-modal="true" aria-label="Intro animation">
      <div className="hud-intro__grid" aria-hidden="true" />

      <div className="hud-intro__stage" aria-hidden="true">
        <span className="hud-intro__pulse" />
        <svg className="hud-intro__svg" viewBox="0 0 400 400" fill="none">
          <defs>
            <filter id="intro-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="intro-clip">
              <circle cx={C} cy={C} r="172" />
            </clipPath>
          </defs>

          {/* Outer segmented ring */}
          <g className="hud-intro__ring hud-intro__ring--outer">
            <circle cx={C} cy={C} r="184" stroke="var(--color-accent)" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="58 12 8 12 26 12" />
          </g>

          {/* Tick ring */}
          <g className="hud-intro__ring hud-intro__ring--ticks" stroke="var(--color-accent-soft)">
            {ticks.map((a) => {
              const long = a % 30 === 0
              const [x1, y1] = point(160, a)
              const [x2, y2] = point(long ? 148 : 154, a)
              return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity={long ? 0.8 : 0.35} strokeWidth={long ? 1.4 : 1} />
            })}
          </g>

          {/* Inner arcs, drawn in */}
          <g filter="url(#intro-glow)" stroke="var(--color-accent)" strokeWidth="2.4" strokeLinecap="round">
            <path className="hud-intro__draw" d={arc(126, -160, -60)} pathLength="1" />
            <path className="hud-intro__draw hud-intro__draw--late" d={arc(126, -20, 80)} pathLength="1" />
            <path className="hud-intro__draw hud-intro__draw--late" d={arc(126, 120, 170)} pathLength="1" stroke="var(--color-cyan)" />
          </g>

          {/* Core + crosshair */}
          <g className="hud-intro__core" stroke="var(--color-accent-soft)" strokeOpacity="0.5">
            <circle cx={C} cy={C} r="96" strokeOpacity="0.22" />
            <line x1={C - 112} y1={C} x2={C - 100} y2={C} />
            <line x1={C + 100} y1={C} x2={C + 112} y2={C} />
            <line x1={C} y1={C - 112} x2={C} y2={C - 100} />
            <line x1={C} y1={C + 100} x2={C} y2={C + 112} />
          </g>

          {/* Nodes */}
          <g className="hud-intro__core" fill="var(--color-cyan)" filter="url(#intro-glow)">
            {[-160, -60, -20, 80].map((a) => {
              const [x, y] = point(126, a)
              return <circle key={a} cx={x} cy={y} r="3" />
            })}
          </g>

          {/* Scan line, clipped to the HUD */}
          <g clipPath="url(#intro-clip)">
            <rect className="hud-intro__scan" x="0" y="0" width="400" height="44" fill="url(#intro-scan)" />
          </g>
          <defs>
            <linearGradient id="intro-scan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7de3ff" stopOpacity="0" />
              <stop offset="0.85" stopColor="#7de3ff" stopOpacity="0.18" />
              <stop offset="1" stopColor="#7de3ff" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        <div className="hud-intro__text">
          <p className="hud-intro__name">{name || ' '}</p>
          <p className="hud-intro__status">
            <span className="hud-intro__dot" />
            Creative System Online
          </p>
        </div>
      </div>

      <button ref={skipRef} type="button" className="hud-intro__skip" onClick={finish}>
        Skip intro
        <span aria-hidden="true" className="hud-intro__key">Esc</span>
      </button>
    </div>
  )
}

export default HudIntro
