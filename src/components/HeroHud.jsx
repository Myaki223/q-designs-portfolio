// Decorative heads-up display around the hero portrait, drawn in a 600×600
// box centered on (300, 300). Angles are in degrees, clockwise from 3 o'clock
// (so -90 is the top). Elements marked `hud-secondary` are dropped on phones.
// Everything here is aria-hidden and ignores the pointer.

const C = 300
const rad = (deg) => (deg * Math.PI) / 180
const point = (r, deg) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))]
const fmt = ([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`

const arc = (r, from, to) => {
  const large = to - from > 180 ? 1 : 0
  return `M ${fmt(point(r, from))} A ${r} ${r} 0 ${large} 1 ${fmt(point(r, to))}`
}

// Fine radial ticks over two asymmetric sectors; every 30° is a long tick.
const ticks = [
  [118, 236],
  [-46, 34],
].flatMap(([from, to]) => {
  const list = []
  for (let a = from; a <= to; a += 4) {
    const long = ((a % 30) + 30) % 30 === 0
    list.push([point(262, a), point(long ? 250 : 256, a), long])
  }
  return list
})

// Inner arc pair and its illuminated end nodes.
const innerArcs = [
  [-162, -74],
  [-32, 40],
]
const nodes = innerArcs.flatMap(([a, b]) => [point(228, a), point(228, b)])
const status = point(228, -32) // pulsing node that leads to the right-hand labels
const leftNode = point(228, -162)

export const HUD_ANCHORS = {
  // Where the leader lines end, as percentages of the HUD box, so the HTML
  // labels in Hero.jsx can line up with them.
  right: { x: (644 / 600) * 100, y: ((status[1] - 26) / 600) * 100 },
  left: { x: (-44 / 600) * 100, y: (leftNode[1] / 600) * 100 },
}

function HeroHud({ className = '' }) {
  return (
    <svg
      className={`pointer-events-none overflow-visible ${className}`}
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="hud-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer segmented arc — the one slow rotation */}
      <g className="hud-in-lines">
        <g className="hud-spin">
          <circle
            cx={C}
            cy={C}
            r="292"
            stroke="var(--color-accent)"
            strokeOpacity="0.45"
            strokeWidth="1.2"
            strokeDasharray="70 16 10 16 34 16"
          />
        </g>
      </g>

      {/* Counter-rotating fine dashed ring (opposite direction, slower) */}
      <g className="hud-in-lines hud-secondary">
        <g className="hud-spin-reverse">
          <circle
            cx={C}
            cy={C}
            r="244"
            stroke="var(--color-cyan)"
            strokeOpacity="0.28"
            strokeWidth="1"
            strokeDasharray="2 9"
          />
          <path d={arc(244, 200, 232)} stroke="var(--color-cyan)" strokeOpacity="0.7" strokeWidth="1.6" />
        </g>
      </g>

      {/* Crosshair ticks at the four compass points */}
      <g className="hud-in-lines" stroke="var(--color-accent-soft)" strokeOpacity="0.55" strokeWidth="1.2">
        {[0, 90, 180, 270].map((a) => {
          const [x1, y1] = point(298, a)
          const [x2, y2] = point(316, a)
          return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} />
        })}
      </g>

      {/* Radial ticks */}
      <g className="hud-in-lines hud-secondary" stroke="var(--color-accent-soft)">
        {ticks.map(([a, b, long], i) => (
          <line
            key={i}
            x1={a[0]}
            y1={a[1]}
            x2={b[0]}
            y2={b[1]}
            strokeOpacity={long ? 0.7 : 0.32}
            strokeWidth={long ? 1.4 : 1}
          />
        ))}
      </g>

      {/* Faint full guide ring + inner arcs drawn in */}
      <circle cx={C} cy={C} r="228" stroke="var(--color-accent-soft)" strokeOpacity="0.1" className="hud-in-lines" />
      {innerArcs.map(([a, b], i) => (
        <path
          key={i}
          d={arc(228, a, b)}
          pathLength="1"
          className="hud-draw"
          style={{ '--hud-delay': `${0.35 + i * 0.25}s` }}
          stroke="var(--color-accent)"
          strokeWidth="2.2"
          strokeLinecap="round"
          filter="url(#hud-glow)"
        />
      ))}

      {/* Illuminated nodes at the arc ends */}
      <g className="hud-in-lines" fill="var(--color-cyan)" filter="url(#hud-glow)">
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.2" />
        ))}
      </g>
      <circle
        cx={status[0]}
        cy={status[1]}
        r="5"
        stroke="var(--color-cyan)"
        strokeWidth="1.2"
        className="hud-node-ring hud-secondary"
      />

      {/* Leader lines toward the labels */}
      <g className="hud-secondary" stroke="var(--color-accent-soft)" strokeOpacity="0.45" strokeWidth="1">
        <path
          d={`M ${fmt(status)} L ${status[0] + 46} ${status[1] - 26} H 640`}
          pathLength="1"
          className="hud-draw"
          style={{ '--hud-delay': '1.1s' }}
        />
        <path
          d={`M ${fmt(leftNode)} L ${leftNode[0] - 40} ${leftNode[1]} H -40`}
          pathLength="1"
          className="hud-draw"
          style={{ '--hud-delay': '1.2s' }}
        />
      </g>

      {/* Asymmetrical corner brackets */}
      <g className="hud-in-lines hud-secondary" stroke="var(--color-copy)" strokeOpacity="0.4" strokeWidth="1.2">
        <path d="M -34 64 V -18 H 54" />
        <path d="M 634 498 V 582 H 562" />
        <path d="M 600 -18 H 634 V 14" strokeOpacity="0.22" />
      </g>
    </svg>
  )
}

export default HeroHud
