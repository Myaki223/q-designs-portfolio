// Full-width environment behind the hero: circuit pathways that run in from
// both edges toward the portrait, with small light pulses travelling along
// them, plus a few faint crosshair markers. Drawn in a 1440×900 box that
// covers the hero (sliced to fill). Hidden on phones (`hud-secondary`).
// Decorative only: aria-hidden and ignores the pointer.

const W = 1440

// Left-side pathways; the right side mirrors them.
const leftPaths = [
  'M 0 228 H 168 L 214 274 V 410 H 372',
  'M 0 612 H 132 L 182 562 H 318 L 350 530',
  'M 74 0 V 108 L 122 156 H 262',
  'M 0 760 H 236 L 268 728 H 410',
]

const mirror = (d) =>
  d.replace(/([MLHV]) ([\d.]+)(?: ([\d.]+))?/g, (_, cmd, a, b) => {
    if (cmd === 'H') return `H ${W - Number(a)}`
    if (cmd === 'V') return `V ${a}`
    return `${cmd} ${W - Number(a)} ${b}`
  })

const paths = [...leftPaths, ...leftPaths.map(mirror)]

// End points of each pathway get a small square terminal.
const terminal = (d) => {
  const nums = d.match(/[MLHV] [\d.]+(?: [\d.]+)?/g)
  let x = 0
  let y = 0
  nums.forEach((part) => {
    const [cmd, a, b] = part.split(' ')
    if (cmd === 'M' || cmd === 'L') {
      x = Number(a)
      y = Number(b)
    } else if (cmd === 'H') x = Number(a)
    else if (cmd === 'V') y = Number(a)
  })
  return [x, y]
}

const crosshairs = [
  [212, 118],
  [1236, 152],
  [128, 470],
  [1322, 640],
  [520, 820],
  [960, 92],
]

function HeroBackdrop({ className = '' }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Pathways */}
      <g stroke="var(--color-accent)" strokeOpacity="0.22" strokeWidth="1">
        {paths.map((d) => (
          <path key={d} d={d} pathLength="1" className="hud-draw" style={{ '--hud-delay': '0.2s' }} />
        ))}
      </g>

      {/* Travelling light pulses, staggered so only a few move at once */}
      <g stroke="var(--color-cyan)" strokeWidth="1.6" strokeLinecap="round">
        {paths.map((d, i) => (
          <path
            key={d}
            d={d}
            pathLength="1"
            className="circuit-pulse"
            style={{ animationDelay: `${1.6 + i * 1.35}s` }}
          />
        ))}
      </g>

      {/* Terminals */}
      <g fill="var(--color-navy)" stroke="var(--color-accent-soft)" strokeOpacity="0.6" strokeWidth="1">
        {paths.map((d) => {
          const [x, y] = terminal(d)
          return <rect key={d} x={x - 3} y={y - 3} width="6" height="6" />
        })}
      </g>

      {/* Faint crosshair markers */}
      <g stroke="var(--color-accent-soft)" strokeOpacity="0.28" strokeWidth="1">
        {crosshairs.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
            <line x1={x} y1={y - 7} x2={x} y2={y + 7} />
          </g>
        ))}
      </g>
    </svg>
  )
}

export default HeroBackdrop
