// Animated graphics for the Design Focus holographic display. One scene per
// service, all in a 400×400 box, drawn with lightweight SVG and the `sv-*`
// classes in src/styles.css. Each scene replays when it becomes active
// (the parent re-mounts it with a new `key`). Decorative: aria-hidden.
//
// Under reduced motion every animation jumps to its end state, so each scene
// still shows a finished composition.

const A = 'var(--color-accent)'
const SOFT = 'var(--color-accent-soft)'
const CYAN = 'var(--color-cyan)'
const INK = 'var(--color-ink)'

const d = (seconds) => ({ '--d': `${seconds}s` })

function Label({ children, y = 372 }) {
  return (
    <text x="200" y={y} textAnchor="middle" className="sv-label sv-fade" style={d(0.9)}>
      {children}
    </text>
  )
}

// Brand Visuals — identity shapes and color swatches assembling.
function BrandVisuals() {
  return (
    <>
      <circle cx="200" cy="160" r="62" stroke={A} strokeWidth="2" pathLength="1" className="sv-draw" />
      <path d="M200 112 L246 196 L154 196 Z" stroke={CYAN} strokeWidth="2" className="sv-fly-l" style={d(0.35)} />
      {/* Wrapped: the CSS fly-in transform would otherwise replace the rotation */}
      <g className="sv-fly-r" style={d(0.5)}>
        <rect x="176" y="136" width="48" height="48" stroke={SOFT} strokeWidth="1.5" transform="rotate(45 200 160)" />
      </g>
      <circle cx="200" cy="160" r="6" fill={CYAN} className="sv-pop" style={d(0.85)} />
      {[A, CYAN, SOFT, INK].map((color, i) => (
        <rect key={color} x={110 + i * 48} y="262" width="36" height="36" rx="3" fill={color} className="sv-pop" style={d(0.6 + i * 0.12)} />
      ))}
      <Label>Identity · Shapes · Color</Label>
    </>
  )
}

// Social Media Graphics — one composition adapting to three formats.
function SocialGraphics() {
  const frames = [
    { x: 54, w: 92, h: 92, label: '1:1' },
    { x: 166, w: 80, h: 100, label: '4:5' },
    { x: 266, w: 70, h: 124, label: '9:16' },
  ]
  return (
    <>
      {frames.map((f, i) => {
        const y = 230 - f.h
        return (
          <g key={f.label} className="sv-rise" style={d(0.15 + i * 0.2)}>
            <rect x={f.x} y={y} width={f.w} height={f.h} rx="4" stroke={SOFT} strokeOpacity="0.7" />
            <rect x={f.x + 8} y={y + 8} width={f.w - 16} height={f.h * 0.45} rx="2" fill={A} fillOpacity="0.3" />
            <rect x={f.x + 8} y={y + f.h * 0.6} width={(f.w - 16) * 0.8} height="6" rx="1" fill={INK} fillOpacity="0.85" />
            <rect x={f.x + 8} y={y + f.h * 0.6 + 12} width={(f.w - 16) * 0.55} height="4" rx="1" fill={SOFT} fillOpacity="0.6" />
            <circle cx={f.x + f.w - 14} cy={y + f.h - 12} r="5" fill={CYAN} />
            <text x={f.x + f.w / 2} y="256" textAnchor="middle" className="sv-label">{f.label}</text>
          </g>
        )
      })}
      {/* A selection marker that steps across the formats */}
      <rect x="48" y="132" width="104" height="104" rx="6" stroke={CYAN} strokeWidth="1.5" className="sv-cycle" />
      <Label y={320}>Post · Portrait · Story</Label>
    </>
  )
}

// Posters & Banners — layout guides, then typography builds the composition.
function Poster() {
  return (
    <>
      <rect x="110" y="44" width="180" height="252" stroke={SOFT} strokeOpacity="0.6" pathLength="1" className="sv-draw" />
      <g stroke={CYAN} strokeOpacity="0.35" strokeDasharray="3 5">
        {[155, 200, 245].map((x, i) => (
          <line key={x} x1={x} y1="56" x2={x} y2="284" pathLength="1" className="sv-draw-dash" style={d(0.3 + i * 0.1)} />
        ))}
        <rect x="124" y="58" width="152" height="224" fill="none" className="sv-fade" style={d(0.45)} />
      </g>
      <rect x="124" y="74" width="140" height="22" fill={INK} className="sv-grow" style={d(0.7)} />
      <rect x="124" y="102" width="98" height="22" fill={INK} className="sv-grow" style={d(0.82)} />
      <rect x="124" y="134" width="72" height="6" fill={A} className="sv-grow" style={d(0.95)} />
      <circle cx="232" cy="214" r="40" fill={A} fillOpacity="0.35" stroke={CYAN} className="sv-pop" style={d(1.05)} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="124" y={250 + i * 10} width={110 - i * 24} height="4" fill={SOFT} fillOpacity="0.7" className="sv-grow" style={d(1.15 + i * 0.08)} />
      ))}
      <Label y={330}>Grid · Hierarchy · Type</Label>
    </>
  )
}

// Mockups — a product silhouette with a label, turning gently in perspective
// (the perspective motion is on the wrapper: .sv-scene--mockup).
function Mockup() {
  return (
    <>
      <ellipse cx="200" cy="312" rx="70" ry="10" fill={A} fillOpacity="0.25" className="sv-fade" style={d(0.6)} />
      <g className="sv-rise" style={d(0.1)}>
        <rect x="168" y="70" width="64" height="30" rx="5" fill="#0f1d44" stroke={SOFT} strokeWidth="1.5" />
        <path d="M158 112 Q158 100 172 100 L228 100 Q242 100 242 112 L246 296 Q246 308 234 308 L166 308 Q154 308 154 296 Z" fill="#0b1530" stroke={SOFT} strokeWidth="1.5" />
        <rect x="156" y="160" width="88" height="96" fill={A} fillOpacity="0.22" stroke={CYAN} strokeOpacity="0.8" className="sv-fade" style={d(0.5)} />
        <rect x="172" y="182" width="56" height="8" fill={INK} className="sv-grow" style={d(0.75)} />
        <rect x="172" y="198" width="38" height="5" fill={SOFT} className="sv-grow" style={d(0.85)} />
        <circle cx="200" cy="232" r="10" stroke={CYAN} className="sv-pop" style={d(0.95)} />
        <path d="M172 118 L172 290" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="6" strokeLinecap="round" />
      </g>
      <Label y={352}>Product · Label · Presentation</Label>
    </>
  )
}

// Packaging Layouts — a dieline draws, then folds into a simple box.
function Packaging() {
  return (
    <>
      <g className="sv-net">
        <path
          d="M160 60 H240 V100 H290 V180 H240 V260 H160 V180 H110 V100 H160 Z M160 100 H240 V180 H160 Z M240 100 V180 M160 180 H240"
          stroke={SOFT}
          strokeWidth="1.5"
          pathLength="1"
          className="sv-draw"
        />
        <path d="M160 100 H240 M160 180 H240 M160 100 V180 M240 100 V180" stroke={CYAN} strokeDasharray="4 4" strokeOpacity="0.8" />
      </g>
      <g className="sv-box">
        <path d="M200 128 L262 160 L200 192 L138 160 Z" fill={A} fillOpacity="0.55" stroke={CYAN} />
        <path d="M138 160 L200 192 L200 272 L138 240 Z" fill="#0f1d44" stroke={SOFT} />
        <path d="M262 160 L200 192 L200 272 L262 240 Z" fill="#132654" stroke={SOFT} />
        <path d="M150 214 L180 230" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        <path d="M150 226 L170 236" stroke={SOFT} strokeWidth="3" strokeLinecap="round" />
      </g>
      <Label y={330}>Dieline · Fold · Package</Label>
    </>
  )
}

// Branding — logo, type, color, and pattern connecting into one system.
function Branding() {
  const nodes = [
    { x: 92, y: 96 },
    { x: 308, y: 96 },
    { x: 92, y: 248 },
    { x: 308, y: 248 },
  ]
  return (
    <>
      <g stroke={SOFT} strokeOpacity="0.55">
        {nodes.map((n, i) => (
          <line key={i} x1="200" y1="172" x2={n.x} y2={n.y} pathLength="1" className="sv-draw" style={d(0.3 + i * 0.1)} />
        ))}
      </g>
      <circle cx="200" cy="172" r="44" stroke={A} strokeWidth="2" fill="#0b1530" className="sv-pop" style={d(0.05)} />
      <text x="200" y="188" textAnchor="middle" className="sv-mark sv-pop" style={d(0.15)}>Q</text>
      <g className="sv-pop" style={d(0.6)}>
        <circle cx="92" cy="96" r="30" stroke={SOFT} fill="#070c1a" />
        <text x="92" y="104" textAnchor="middle" className="sv-type">Aa</text>
      </g>
      <g className="sv-pop" style={d(0.7)}>
        <circle cx="308" cy="96" r="30" stroke={SOFT} fill="#070c1a" />
        {[A, CYAN, INK].map((c, i) => (
          <circle key={c} cx={294 + i * 14} cy="96" r="6" fill={c} />
        ))}
      </g>
      <g className="sv-pop" style={d(0.8)}>
        <circle cx="92" cy="248" r="30" stroke={SOFT} fill="#070c1a" />
        <path d="M92 230 L97 243 L110 243 L100 251 L104 264 L92 256 L80 264 L84 251 L74 243 L87 243 Z" fill={CYAN} />
      </g>
      <g className="sv-pop" style={d(0.9)}>
        <circle cx="308" cy="248" r="30" stroke={SOFT} fill="#070c1a" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={294 + c * 10} y={234 + r * 10} width="6" height="6" fill={A} fillOpacity="0.8" />),
        )}
      </g>
      <Label y={330}>Logo · Type · Color · Pattern</Label>
    </>
  )
}

const scenes = {
  brandVisuals: BrandVisuals,
  social: SocialGraphics,
  poster: Poster,
  mockup: Mockup,
  packaging: Packaging,
  branding: Branding,
}

function ServiceVisual({ visual }) {
  const Scene = scenes[visual] || BrandVisuals
  return (
    <div className={`sv-scene sv-scene--${visual}`}>
      <svg viewBox="0 0 400 400" fill="none" className="h-full w-full overflow-visible" aria-hidden="true" focusable="false">
        <Scene />
      </svg>
    </div>
  )
}

export default ServiceVisual
