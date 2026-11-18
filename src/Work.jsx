import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import ProjectHoverPreview from './components/ProjectHoverPreview.jsx'
import ResponsiveImage from './components/ResponsiveImage.jsx'
import HudButton from './components/ui/HudButton.jsx'
import HudCorners from './components/ui/HudCorners.jsx'
import SectionHeading from './components/ui/SectionHeading.jsx'
import SpotlightBackground from './components/SpotlightBackground.jsx'
import { projects } from './data/projects.js'
import { getImage } from './utils/images.js'

const AUTOPLAY_MS = 3800
const SIDE_CARDS = 3 // visible cards on each side of the center
const count = projects.length

// Signed distance from the active card, wrapped so the row loops forever.
const offsetOf = (index, active) => {
  let d = (index - active) % count
  if (d > count / 2) d -= count
  if (d < -count / 2) d += count
  return d
}

// Every card shares one height (--h); its width follows the artwork's own
// proportions so the full image fits, capped for very wide pieces.
const widths = projects.map((project) => {
  const { width, height } = getImage(project.cover.image)
  return Math.min(1.9, Math.max(0.8, width / height))
})

// Horizontal position (in --h units) of the card `d` steps from the center,
// based on the real widths of the cards between them.
const positionOf = (index, d) => {
  if (d === 0) return 0
  const sign = Math.sign(d)
  let pos = widths[(index - d + count) % count] / 2 // half of the center card
  for (let k = 1; k <= Math.abs(d); k += 1) {
    const w = widths[(index - d + sign * k + count * 2) % count]
    pos += k === Math.abs(d) ? 0.21 * w : 0.42 * w
  }
  return sign * pos
}

// Coverflow transform: side cards slide out, recede in depth, turn toward
// the center, shrink, and dim with distance.
const cardStyle = (index, d) => {
  const abs = Math.abs(d)
  return {
    transform: `translateX(-50%) translateX(calc(var(--h) * ${positionOf(index, d).toFixed(3)})) translateZ(${-abs * 170}px) rotateY(${d === 0 ? 0 : d < 0 ? 42 : -42}deg) scale(${1 - abs * 0.06})`,
    zIndex: 20 - abs,
    opacity: abs > SIDE_CARDS ? 0 : 1,
    filter: `brightness(${1 - abs * 0.2})`,
    pointerEvents: abs > SIDE_CARDS ? 'none' : undefined,
  }
}

function Work({ paused = false }) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [preview, setPreview] = useState(false)
  const drag = useRef(null)
  const stageRef = useRef(null)

  const go = useCallback((step) => setActive((i) => (i + step + count) % count), [])
  const goTo = useCallback((index) => setActive(index), [])

  // Mouse wheel / trackpad over the cards moves the carousel. Deltas are
  // accumulated and throttled so one wheel notch moves one card. Needs a
  // non-passive listener so the page doesn't scroll at the same time.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    let accumulated = 0
    let lockedUntil = 0

    const onWheel = (event) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (delta === 0) return
      event.preventDefault()
      const now = performance.now()
      if (now < lockedUntil) return
      accumulated += delta
      if (Math.abs(accumulated) >= 40) {
        go(accumulated > 0 ? 1 : -1)
        accumulated = 0
        lockedUntil = now + 450
      }
    }

    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [go])

  // Auto-advance like the reference coverflow; never under reduced motion.
  useEffect(() => {
    if (reduceMotion || paused || hovered || focused) return undefined
    const id = window.setInterval(() => {
      if (!document.hidden) go(1)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion, paused, hovered, focused, go, active])

  // If a card had keyboard focus, keep focus on whichever card is now centered.
  useEffect(() => {
    const focusedCard = document.activeElement?.closest?.('.coverflow')
    if (focusedCard) {
      focusedCard
        .querySelector(`a[href="#work/${projects[active].slug}"]`)
        ?.focus({ preventScroll: true })
    }
  }, [active])

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    }
  }

  // Swipe / drag on the stage.
  const onPointerDown = (event) => {
    drag.current = { x: event.clientX, moved: false }
  }
  const onPointerMove = (event) => {
    if (drag.current && Math.abs(event.clientX - drag.current.x) > 8) drag.current.moved = true
  }
  const onPointerUp = (event) => {
    if (!drag.current) return
    const dx = event.clientX - drag.current.x
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
    window.setTimeout(() => {
      drag.current = null
    }, 0)
  }
  const swallowDragClick = (event) => {
    if (drag.current?.moved) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const project = projects[active]
  const number = String(active + 1).padStart(2, '0')

  return (
    <section
      id="work"
      className="relative scroll-mt-20 overflow-hidden pb-24 pt-16 lg:pb-32"
      aria-labelledby="work-title"
      onKeyDown={onKeyDown}
    >
      <SpotlightBackground className="opacity-70 [mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_78%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center gap-5 text-center">
          <SectionHeading id="work-title" index="01" label="Portfolio" align="center" size="sm">
            Selected <span className="editorial-accent font-normal">Works</span>
          </SectionHeading>
          <div className="flex items-center gap-3">
            <p className="hud-tag mr-1 tabular-nums">
              <span className="text-cyan">{number}</span>
              <span className="text-muted">/</span>
              {String(count).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={() => go(-1)}
              className="hud-icon-btn"
              aria-label="Previous project"
            >
              <FiArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="hud-icon-btn hud-icon-btn--primary"
              aria-label="Next project"
            >
              <FiArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Coverflow stage */}
      <div
        className="relative mt-12 select-none"
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected works"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
        }}
      >
        <div
          ref={stageRef}
          data-lenis-prevent-wheel
          className="coverflow relative mx-auto touch-pan-y"
          style={{
            '--h': 'clamp(10.5rem, 27vw, 21rem)',
            height: 'calc(var(--h) + 1rem)',
            perspective: '1400px',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            drag.current = null
          }}
          onClickCapture={swallowDragClick}
        >
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {projects.map((item, index) => {
              const d = offsetOf(index, active)
              const isActive = d === 0
              // The whole artwork, uncropped (object-contain), over a blurred
              // copy of itself so the letterbox area isn't flat black.
              const content = (
                <>
                  <img
                    src={getImage(item.cover.image).smallest}
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full scale-125 object-cover opacity-50 blur-2xl"
                  />
                  <ResponsiveImage
                    image={item.cover.image}
                    alt=""
                    sizes="(min-width: 1024px) 640px, 90vw"
                    priority={isActive && index === 0}
                    className="relative h-full w-full object-contain p-2 sm:p-3"
                  />
                  <HudCorners inset />
                </>
              )

              // HUD frame: fine navy border on every card; the centered card
              // lights up (blue border, glow, cyan corner brackets).
              const shared = {
                className: `coverflow-card absolute left-1/2 top-0 block overflow-hidden rounded-md border bg-[#070c1a] shadow-2xl shadow-black/60 ${
                  isActive ? 'hud-panel--active' : 'border-[var(--hud-line)]'
                }`,
                style: {
                  ...cardStyle(index, d),
                  width: `calc(var(--h) * ${widths[index].toFixed(3)})`,
                  height: 'var(--h)',
                },
              }

              // Same element for every position, so cards animate between
              // slots instead of remounting. Only the center card is a tab
              // stop and opens the case study; side cards bring themselves
              // to the center.
              return (
                <a
                  key={item.slug}
                  href={`#work/${item.slug}`}
                  {...shared}
                  tabIndex={isActive ? undefined : -1}
                  data-cursor={isActive ? 'View' : undefined}
                  aria-hidden={isActive ? undefined : 'true'}
                  aria-label={isActive ? `${item.title} — ${item.type}. Open case study` : undefined}
                  onClick={(event) => {
                    if (!isActive) {
                      event.preventDefault()
                      goTo(index)
                    }
                  }}
                >
                  {content}
                </a>
              )
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Project {active + 1} of {count}: {project.title}
        </p>
      </div>

      {/* Active project details */}
      <div className="relative mx-auto mt-10 max-w-3xl px-4 text-center sm:px-6">
        <div key={project.slug} className="fade-in">
          <p className="eyebrow">
            <span className="text-cyan">{number}</span> <span className="text-muted">/</span> {project.type}
          </p>
          <h3 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{project.title}</h3>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-copy">{project.summary}</p>
          <div
            className="relative mt-7 inline-block"
            onMouseEnter={() => setPreview(true)}
            onMouseLeave={() => setPreview(false)}
            onFocus={() => setPreview(true)}
            onBlur={() => setPreview(false)}
          >
            <ProjectHoverPreview project={project} isVisible={preview} />
            <HudButton href={`#work/${project.slug}`} variant="primary">
              View case study
              <span aria-hidden="true">↗</span>
            </HudButton>
          </div>
        </div>

        {/* Progress and dots */}
        <div className="mx-auto mt-10 h-px max-w-md overflow-hidden bg-[var(--hud-line)]">
          <div
            className="h-full bg-gradient-to-r from-accent/40 via-accent to-cyan shadow-[0_0_8px_var(--color-cyan)] transition-[width] duration-500"
            style={{ width: `${((active + 1) / count) * 100}%` }}
          />
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-1">
          {projects.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => goTo(index)}
              className="flex h-11 min-w-6 items-center justify-center px-1"
              aria-label={`Show ${item.title}`}
              aria-current={index === active ? 'true' : undefined}
            >
              <span
                className={`block h-1.5 transition-all ${
                  index === active
                    ? 'w-8 bg-cyan shadow-[0_0_8px_var(--color-cyan)]'
                    : 'w-3 bg-accent-soft/30 hover:bg-accent-soft/70'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
