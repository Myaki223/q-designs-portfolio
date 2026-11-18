import { useRef, useState } from 'react'
import HudCorners from './components/ui/HudCorners.jsx'
import SectionHeading from './components/ui/SectionHeading.jsx'
import { toolCategories, toolboxNotes } from './data/tools.js'
import { useOffscreenPause } from './utils/useOffscreenPause.js'

// Short cluster names for the network.
const shortName = (title) => title.replace(/ Tools$/, '')

// Network geometry, in % of the stage (desktop). The hub sits in the middle;
// each cluster fans its tools out on an arc facing away from the hub.
// Arcs are centred on the direction pointing away from the hub, so the top
// clusters fan upward and the bottom clusters fan downward — groups never
// drift into each other.
const HUB = { x: 50, y: 51 }
const CLUSTERS = [
  { x: 23, y: 30, from: 150, to: 290 }, // Design (top left)
  { x: 75, y: 30, from: -165, to: 45 }, // Web (top right)
  { x: 23, y: 72, from: 45, to: 225 }, // Productivity (bottom left)
  { x: 77, y: 72, from: -25, to: 105 }, // AI (bottom right)
]
// Bigger clusters get a wider arc so their tools stay evenly spaced.
const radiusFor = (n) => ({ rx: 9.5 + n * 0.9, ry: 15 + n * 1.1 })

const layout = toolCategories.map((category, c) => {
  const cluster = CLUSTERS[c]
  const n = category.tools.length
  const { rx, ry } = radiusFor(n)
  const tools = category.tools.map((tool, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1)
    const angle = ((cluster.from + (cluster.to - cluster.from) * t) * Math.PI) / 180
    return { tool, x: cluster.x + rx * Math.cos(angle), y: cluster.y + ry * Math.sin(angle) }
  })
  return { category, cluster, tools }
})

function ToolGlyph({ tool, className = 'h-5 w-5' }) {
  if (tool.logo) return <img src={tool.logo} alt="" className={className} aria-hidden="true" />
  const Icon = tool.icon
  return Icon ? <Icon className={className} aria-hidden="true" /> : null
}

// Shared caption: the selected tool (or the active category) and the
// category's existing summary. Fixed min-height so it never jumps.
function Caption({ category, tool, className = '' }) {
  return (
    <div className={`relative min-h-[7.5rem] ${className}`} aria-live="polite">
      <p className="eyebrow flex flex-wrap items-center gap-2 text-muted">
        <span className="text-cyan">{shortName(category.title)}</span>
        {tool && (
          <>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{tool.name}</span>
          </>
        )}
        <span aria-hidden="true" className="hud-hairline hidden w-16 sm:block" />
        <span>{category.eyebrow}</span>
      </p>
      <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-copy">{category.summary}</p>
      <p className="mt-2 font-mono text-xs text-muted">
        {category.tools.length} tools · {category.tools.map((t) => t.name).join(' · ')}
      </p>
    </div>
  )
}

function Tools() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [selectedTool, setSelectedTool] = useState(null)
  const sectionRef = useRef(null)
  useOffscreenPause(sectionRef)

  const category = toolCategories[activeCategory]
  const tool = category.tools.find((t) => t.name === selectedTool) || null

  const selectCategory = (index) => {
    setActiveCategory(index)
    setSelectedTool(null)
  }
  const selectTool = (index, name) => {
    setActiveCategory(index)
    setSelectedTool(name)
  }

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative scroll-mt-28 overflow-hidden px-4 py-24 sm:px-6 lg:py-32"
      aria-labelledby="tools-title"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="tools-title" index="03" label="Toolkit">
            Tools
          </SectionHeading>
          <ul className="flex flex-wrap gap-2">
            {toolboxNotes.map((note) => {
              const Icon = note.icon
              return (
                <li key={note.label} className="hud-tag">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {note.label}
                </li>
              )
            })}
          </ul>
        </div>

        {/* ---------- Desktop: network ---------- */}
        <div className="relative mt-16 hidden h-[46rem] lg:block">
          {/* Connections */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {layout.map(({ cluster, tools }, c) => {
              const on = c === activeCategory
              return (
                <g key={c}>
                  <line x1={HUB.x} y1={HUB.y} x2={cluster.x} y2={cluster.y} className={`net-line ${on ? 'is-active' : ''}`} vectorEffect="non-scaling-stroke" />
                  {on && (
                    <line x1={HUB.x} y1={HUB.y} x2={cluster.x} y2={cluster.y} pathLength="1" className="net-flow" vectorEffect="non-scaling-stroke" />
                  )}
                  {tools.map(({ tool: t, x, y }) => {
                    const lit = on && (!selectedTool || selectedTool === t.name)
                    return (
                      <g key={t.name}>
                        <line x1={cluster.x} y1={cluster.y} x2={x} y2={y} className={`net-line ${lit ? 'is-active' : ''}`} vectorEffect="non-scaling-stroke" />
                        {on && selectedTool === t.name && (
                          <line x1={cluster.x} y1={cluster.y} x2={x} y2={y} pathLength="1" className="net-flow" vectorEffect="non-scaling-stroke" />
                        )}
                      </g>
                    )
                  })}
                </g>
              )
            })}
          </svg>

          {/* Decorative floating nodes at the hub→cluster midpoints */}
          {layout.map(({ cluster }, c) => (
            <span
              key={c}
              aria-hidden="true"
              className={`net-float pointer-events-none absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                c === activeCategory ? 'bg-cyan shadow-[0_0_10px_var(--color-cyan)]' : 'bg-accent-soft/40'
              }`}
              style={{ left: `${(HUB.x + cluster.x) / 2}%`, top: `${(HUB.y + cluster.y) / 2}%`, animationDelay: `${c * -1.2}s` }}
            />
          ))}

          {/* Hub */}
          <div
            className="pointer-events-none absolute flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
              <g className="hud-spin svc-ambient" style={{ transformOrigin: '50px 50px' }}>
                <circle cx="50" cy="50" r="48" stroke="var(--color-accent)" strokeOpacity="0.45" strokeDasharray="14 6 3 6" />
              </g>
              <circle cx="50" cy="50" r="38" stroke="var(--color-accent-soft)" strokeOpacity="0.18" />
            </svg>
            <span className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(91,140,255,0.35),transparent_70%)]" />
            <p className="relative text-center font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.18em] text-copy">
              Creative
              <br />
              <span className="text-cyan">Toolkit</span>
            </p>
          </div>

          {/* Cluster nodes (select a category) */}
          {layout.map(({ category: cat, cluster }, c) => {
            const on = c === activeCategory
            return (
              <button
                key={cat.title}
                type="button"
                onClick={() => selectCategory(c)}
                aria-pressed={on}
                className={`group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-sm px-3 py-2 text-center transition-opacity ${
                  on ? '' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ left: `${cluster.x}%`, top: `${cluster.y}%` }}
              >
                <span
                  className={`h-3 w-3 rotate-45 border transition-all ${
                    on ? 'border-cyan bg-cyan shadow-[0_0_14px_var(--color-cyan)]' : 'border-accent-soft/60 bg-[#04060d] group-hover:border-cyan'
                  }`}
                  aria-hidden="true"
                />
                <span className={`font-mono text-[0.72rem] uppercase tracking-[0.18em] ${on ? 'text-cyan' : 'text-copy'}`}>
                  {shortName(cat.title)}
                </span>
                <span className="font-mono text-[0.62rem] text-muted">{cat.tools.length} tools</span>
              </button>
            )
          })}

          {/* Tool nodes (select a tool) */}
          {layout.map(({ category: cat, tools }, c) =>
            tools.map(({ tool: t, x, y }) => {
              const on = c === activeCategory
              const pressed = on && selectedTool === t.name
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => selectTool(c, t.name)}
                  aria-pressed={pressed}
                  aria-label={`${t.name} — ${shortName(cat.title)}`}
                  className={`net-tool absolute flex w-[5.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 ${on ? 'is-lit' : 'is-dim'}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span className="net-tool__tile flex h-11 w-11 items-center justify-center rounded-sm border border-[var(--hud-line-strong)] bg-[#070c1a]/90 text-accent-soft">
                    <ToolGlyph tool={t} />
                  </span>
                  <span className="text-[0.72rem] leading-tight text-copy">{t.name}</span>
                </button>
              )
            }),
          )}
        </div>

        {/* Desktop caption */}
        <div className="relative mt-6 hidden lg:block">
          <span className="hud-hairline absolute inset-x-0 top-0" aria-hidden="true" />
          <Caption category={category} tool={tool} className="pt-6" />
        </div>

        {/* ---------- Phones / tablets: grouped lists ---------- */}
        <div className="mt-10 grid gap-8 lg:hidden">
          {toolCategories.map((cat, c) => {
            const on = c === activeCategory
            return (
              <div key={cat.title} className="relative pl-5">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1 h-[calc(100%-0.25rem)] w-px ${on ? 'bg-cyan shadow-[0_0_8px_var(--color-cyan)]' : 'bg-[var(--hud-line-strong)]'}`}
                />
                <button
                  type="button"
                  onClick={() => selectCategory(c)}
                  aria-pressed={on}
                  className="flex min-h-11 items-center gap-3 text-left"
                >
                  <span className={`h-2.5 w-2.5 rotate-45 border ${on ? 'border-cyan bg-cyan' : 'border-accent-soft/60'}`} aria-hidden="true" />
                  <span className={`font-mono text-sm uppercase tracking-[0.16em] ${on ? 'text-cyan' : 'text-copy'}`}>{shortName(cat.title)}</span>
                  <span className="font-mono text-xs text-muted">{cat.tools.length}</span>
                </button>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cat.tools.map((t) => {
                    const pressed = on && selectedTool === t.name
                    return (
                      <li key={t.name}>
                        <button
                          type="button"
                          onClick={() => selectTool(c, t.name)}
                          aria-pressed={pressed}
                          className={`net-tool flex min-h-11 items-center gap-2 rounded-sm pr-3 ${on ? 'is-lit' : ''}`}
                        >
                          <span className="net-tool__tile flex h-11 w-11 items-center justify-center rounded-sm border border-[var(--hud-line-strong)] bg-[#070c1a]/90 text-accent-soft">
                            <ToolGlyph tool={t} className="h-4.5 w-4.5" />
                          </span>
                          <span className="text-sm text-copy">{t.name}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
                {on && <Caption category={cat} tool={tool} className="mt-5 border-t border-[var(--hud-line)] pt-4" />}
              </div>
            )
          })}
        </div>

        <div className="pointer-events-none absolute -bottom-10 right-0 hidden h-24 w-48 lg:block" aria-hidden="true">
          <HudCorners corners={['br']} />
        </div>
      </div>
    </section>
  )
}

export default Tools
