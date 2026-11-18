import { useRef, useState } from 'react'
import ServiceVisual from './components/ServiceVisual.jsx'
import ToolLogoMarquee from './components/ToolLogoMarquee.jsx'
import HudCorners from './components/ui/HudCorners.jsx'
import SectionHeading from './components/ui/SectionHeading.jsx'
import { creativeServices } from './data/services.js'
import { useOffscreenPause } from './utils/useOffscreenPause.js'

// Which animated graphic each service shows in the display.
const visualFor = {
  'Brand Visuals': 'brandVisuals',
  'Social Media Graphics': 'social',
  'Posters & Banners': 'poster',
  Mockups: 'mockup',
  'Packaging Layouts': 'packaging',
  Branding: 'branding',
}

const pad = (n) => String(n + 1).padStart(2, '0')

// The holographic display: unboxed — rings, ticks, brackets, and a caption
// around the active service's graphic. Stable square size, so switching
// services never shifts the layout.
function HoloDisplay({ index, className = '' }) {
  const service = creativeServices[index]
  return (
    <div className={`svc-display relative mx-auto aspect-square w-full max-w-[34rem] ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <g className="hud-spin svc-ambient" style={{ transformOrigin: '200px 200px' }}>
          <circle cx="200" cy="200" r="196" stroke="var(--color-accent)" strokeOpacity="0.35" strokeDasharray="48 14 8 14" />
        </g>
        <circle cx="200" cy="200" r="178" stroke="var(--color-accent-soft)" strokeOpacity="0.1" />
        {Array.from({ length: 72 }, (_, i) => {
          const a = (i * 5 * Math.PI) / 180
          const long = i % 6 === 0
          const r1 = 186
          const r2 = long ? 176 : 181
          return (
            <line
              key={i}
              x1={200 + r1 * Math.cos(a)}
              y1={200 + r1 * Math.sin(a)}
              x2={200 + r2 * Math.cos(a)}
              y2={200 + r2 * Math.sin(a)}
              stroke="var(--color-accent-soft)"
              strokeOpacity={long ? 0.55 : 0.2}
            />
          )
        })}
      </svg>
      <div className="pointer-events-none absolute inset-[14%] rounded-full bg-[radial-gradient(circle,rgba(91,140,255,0.16),transparent_70%)]" />
      <div className="hud-frame-lines pointer-events-none absolute inset-[14%] rounded-full opacity-60" />

      {/* Graphic — re-mounted per service so its assembly replays */}
      <div className="absolute inset-[12%]">
        <ServiceVisual key={service.title} visual={visualFor[service.title]} />
      </div>

      {/* Caption + brackets */}
      <p className="eyebrow absolute left-0 top-0 flex items-center gap-2 text-muted">
        <span className="h-1.5 w-1.5 bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
        Display / <span className="text-cyan">{pad(index)}</span>
      </p>
      <p key={service.title} className="eyebrow fade-in absolute bottom-0 right-0 text-accent-soft">
        {service.title}
      </p>
      <div className="pointer-events-none absolute inset-[4%]">
        <HudCorners corners={['tl', 'br']} />
      </div>
    </div>
  )
}

function Services() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  useOffscreenPause(sectionRef)

  // Arrow keys move between services, like a vertical list of options.
  const onKeyDown = (event, index) => {
    const last = creativeServices.length - 1
    const next = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    setActive(next)
    listRef.current?.querySelectorAll('button')[next]?.focus()
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative scroll-mt-28 overflow-hidden px-4 py-24 sm:px-6 lg:py-32"
      aria-labelledby="services-title"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading id="services-title" index="02" label="Capabilities">
          Design <span className="editorial-accent font-normal">Focus</span>
        </SectionHeading>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          {/* Service list */}
          <ol ref={listRef} className="relative">
            <span className="hud-hairline absolute inset-x-0 top-0" aria-hidden="true" />
            {creativeServices.map((service, index) => {
              const isActive = index === active
              return (
                <li key={service.title} className="relative">
                  <button
                    type="button"
                    className={`svc-item group relative flex w-full items-baseline gap-5 py-5 text-left ${isActive ? 'is-active' : ''}`}
                    aria-expanded={isActive}
                    aria-controls={`svc-desc-${index}`}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                  >
                    <span className={`font-mono text-sm tabular-nums transition-colors ${isActive ? 'text-cyan' : 'text-muted'}`}>
                      {pad(index)}
                    </span>
                    <span
                      className={`text-2xl font-semibold tracking-[-0.01em] transition-colors duration-300 sm:text-3xl ${
                        isActive ? 'text-ink' : 'text-copy/60 group-hover:text-copy'
                      }`}
                    >
                      {service.title}
                    </span>
                    {/* Cyan indicator + a one-off scan when the item activates */}
                    <span className="svc-indicator" aria-hidden="true" />
                    <span key={isActive ? `scan-${index}` : 'idle'} className={isActive ? 'svc-scan' : 'hidden'} aria-hidden="true" />
                  </button>

                  <div id={`svc-desc-${index}`} className={`svc-desc ${isActive ? 'is-open' : ''}`}>
                    <div className="overflow-hidden">
                      <p className="pb-6 pl-[2.6rem] text-[0.95rem] leading-7 text-copy">{service.description}</p>
                      {/* Phones: the display sits right under the active service */}
                      {isActive && <HoloDisplay index={index} className="mb-8 max-w-[22rem] lg:hidden" />}
                    </div>
                  </div>
                  <span className="hud-hairline absolute inset-x-0 bottom-0" aria-hidden="true" />
                </li>
              )
            })}
          </ol>

          {/* Desktop display */}
          <HoloDisplay index={active} className="hidden lg:block" />
        </div>

        <ToolLogoMarquee />
      </div>
    </section>
  )
}

export default Services
