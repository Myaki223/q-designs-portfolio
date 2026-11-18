import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import HeroBackdrop from './components/HeroBackdrop.jsx'
import HeroHud, { HUD_ANCHORS } from './components/HeroHud.jsx'
import HudButton from './components/ui/HudButton.jsx'
import { getImage } from './utils/images.js'

const portrait = getImage('site/portrait')
const spring = { stiffness: 70, damping: 20, mass: 0.4 }

// The HUD is a square stage at the original portrait size: 25rem on phones,
// 34rem on tablets, 40rem on desktop (portrait ≈ 600px tall). The size is a
// CSS variable set on the hero container (see --hud-stage below).
const stageSize = 'var(--hud-stage)'

const services = ['Brand Identity', 'Packaging Design', 'Visual Communication']

// `ready` turns true once the logo intro has finished; the interface then
// runs its short initialization (status switches from Initializing to Online).
function Hero({ ready = true }) {
  const reduceMotion = useReducedMotion()
  const [online, setOnline] = useState(false)

  useEffect(() => {
    if (!ready) return undefined
    const id = window.setTimeout(() => setOnline(true), reduceMotion ? 0 : 1500)
    return () => window.clearTimeout(id)
  }, [ready, reduceMotion])

  // Mouse-responsive depth: each layer moves a different amount, so the
  // background, circuits, HUD and portrait separate into planes.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const layer = (x, y) => [
    useSpring(useTransform(pointerX, [-1, 1], [-x, x]), spring),
    useSpring(useTransform(pointerY, [-1, 1], [-y, y]), spring),
  ]
  const [gridX, gridY] = layer(4, 3)
  const [circuitX, circuitY] = layer(-10, -6)
  const [hudX, hudY] = layer(-8, -5)
  const [portraitX, portraitY] = layer(12, 6)

  const onPointerMove = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2)))
    pointerY.set(Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2)))
  }

  const resetPointer = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-16"
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
    >
      {/* ---------- Environment (all decorative) ---------- */}
      {/* The mask fades the whole environment out at the bottom so the hero
          flows into the next section without a hard edge. */}
      <div
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#0b1530_0%,transparent_60%)]" />
        <div className="hud-light hud-in-fade absolute inset-0" />
        <motion.div className="hud-grid hud-in-fade absolute inset-0" style={{ x: gridX, y: gridY }} />
        {/* Holographic floor */}
        <div className="hud-floor hud-in-fade absolute inset-x-0 bottom-0 h-[46%]">
          <div className="hud-floor__plane" />
        </div>
        {/* Circuit pathways with travelling light (hidden on phones) */}
        <motion.div className="hud-secondary absolute inset-0" style={{ x: circuitX, y: circuitY }}>
          <HeroBackdrop className="h-full w-full" />
        </motion.div>
        {/* Occasional full-width scan */}
        <div className="hud-sweep absolute inset-x-0 top-0" />
        {/* Edge vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_45%,rgba(0,0,0,0.75)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 text-center [--hud-stage:25rem] sm:px-6 sm:pb-16 sm:pt-10 sm:[--hud-stage:34rem] lg:px-10 lg:[--hud-stage:40rem]">
        {/* Eyebrow + initialization bar */}
        <div className="hud-in-text inline-flex flex-col items-center gap-2.5" style={{ '--hud-delay': '0.1s' }}>
          <p className="hud-label inline-flex items-center gap-3 text-copy">
            <span className="hidden h-px w-6 bg-accent/60 sm:block" aria-hidden="true" />
            Qrishun Amik / Creative Portfolio
            <span className="hidden h-px w-6 bg-accent/60 sm:block" aria-hidden="true" />
          </p>
          <span className="relative block h-px w-40 overflow-hidden bg-accent/15" aria-hidden="true">
            <span className="hud-boot-bar absolute inset-0 bg-gradient-to-r from-accent/40 via-cyan to-accent/40" />
          </span>
        </div>

        {/* HUD stage */}
        <div
          // Centered with left/translate so the 25rem phone stage stays centered
          // even when it's a little wider than the screen (the hero clips it).
          className="relative left-1/2 mt-5 -translate-x-1/2 sm:mt-7"
          style={{ width: stageSize, height: stageSize }}
        >
          <motion.div className="pointer-events-none absolute inset-0" style={{ x: hudX, y: hudY }} aria-hidden="true">
            <HeroHud className="absolute inset-0 h-full w-full" />

            {/* Interface labels — wide screens only, aligned to the leader lines.
                `absolute inset-0` matters: the entrance animation makes this the
                labels' positioning box, so it needs the stage's full size. */}
            <div className="hud-in-text absolute inset-0 hidden xl:block" style={{ '--hud-delay': '1.3s' }}>
              <div
                className="absolute grid w-max justify-items-end gap-2.5 whitespace-nowrap text-right"
                style={{ right: `${100 - HUD_ANCHORS.left.x}%`, top: `${HUD_ANCHORS.left.y}%`, marginRight: '0.6rem', transform: 'translateY(-0.55rem)' }}
              >
                <p className="hud-label text-ink">Qrishun Amik</p>
                <p className="hud-label flex items-center gap-2 text-copy">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${online ? 'hud-pulse bg-cyan shadow-[0_0_10px_var(--color-cyan)]' : 'bg-accent/60'}`}
                  />
                  Creative System /{' '}
                  {online ? (
                    <span className="text-cyan">Online</span>
                  ) : (
                    <span>
                      Initializing<span className="hud-blink">…</span>
                    </span>
                  )}
                </p>
              </div>
              <ul
                className="absolute grid w-max gap-2.5 whitespace-nowrap text-left"
                style={{ left: `${HUD_ANCHORS.right.x}%`, top: `${HUD_ANCHORS.right.y}%`, marginLeft: '0.6rem', transform: 'translateY(-0.55rem)' }}
              >
                {services.map((service, index) => (
                  <li
                    key={service}
                    className={`hud-label flex items-center gap-2 ${index === 0 ? 'text-accent-soft' : 'text-copy'}`}
                  >
                    <span className={`h-1 w-1 ${index === 0 ? 'bg-cyan' : 'bg-copy/60'}`} />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Portrait frame, holographic scanlines, and rim light */}
          <div className="hud-frame hud-in-fade pointer-events-none absolute inset-[13%] rounded-full" aria-hidden="true" />
          <div className="hud-frame-lines hud-in-fade pointer-events-none absolute inset-[13%] rounded-full" aria-hidden="true" />
          <div className="hud-rim hud-in-portrait pointer-events-none absolute inset-x-[18%] bottom-[8%] top-[30%]" aria-hidden="true" />

          {/* Portrait */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[94%] justify-center"
            style={{ x: portraitX, y: portraitY }}
          >
            <div className="hud-in-portrait h-full">
              <img
                src={portrait.src}
                srcSet={portrait.srcSet}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 350px, 60vw"
                width={portrait.width}
                height={portrait.height}
                alt="Portrait of Qrishun Amik"
                fetchPriority="high"
                decoding="async"
                className="hero-portrait-mask h-full w-auto object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
              />
            </div>
          </motion.div>

          {/* Occasional scan, clipped to the portrait frame */}
          <div className="pointer-events-none absolute inset-[13%] overflow-hidden rounded-full mix-blend-screen" aria-hidden="true">
            <div className="hud-scan absolute inset-x-0 top-0 h-full" />
          </div>

          {/* Blends the portrait's base into the background */}
          <div
            className="hero-fade pointer-events-none absolute inset-x-[-50vw] -bottom-24 h-64 sm:h-72"
            aria-hidden="true"
          />
        </div>

        {/* Headline block, framed by HUD corner brackets */}
        <div
          className="hud-brackets relative z-10 mx-auto w-fit max-w-full px-2 pb-6 pt-4 sm:px-12"
          // Overlap the faded base of the portrait by a share of the stage,
          // so the overlap stays proportional on small and short screens.
          style={{ marginTop: `calc(${stageSize} * -0.15)` }}
        >
          <h1
            id="hero-title"
            className="hero-title hud-title hud-in-text text-[clamp(2.35rem,8.6vw,5.25rem)] font-semibold leading-[1.1] whitespace-nowrap tracking-[-0.02em] text-ink"
            style={{ '--hud-delay': '0.7s' }}
          >
            Graphic <span className="editorial-accent font-normal">Designer</span>
          </h1>
          <p
            className="hud-in-text mx-auto mt-4 max-w-[34rem] text-base leading-relaxed text-copy sm:text-lg"
            style={{ '--hud-delay': '0.82s' }}
          >
            I create distinctive brand identities, packaging, and digital visuals
            that help brands stand out.
          </p>
        </div>

        <div
          className="hud-in-text relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3"
          style={{ '--hud-delay': '0.94s' }}
        >
          <HudButton href="#work" variant="primary">
            Explore My Work
            <span aria-hidden="true">→</span>
          </HudButton>
          <HudButton href="#contact">Let’s Talk</HudButton>
        </div>

        {/* Scroll cue */}
        <div
          className="hud-in-text mt-10 hidden flex-col items-center gap-2 sm:flex"
          style={{ '--hud-delay': '1.4s' }}
          aria-hidden="true"
        >
          <span className="hud-label text-[0.65rem] text-muted">Scroll to explore</span>
          <span className="relative block h-8 w-px overflow-hidden bg-accent/15">
            <span className="hud-cue-line absolute inset-0 bg-gradient-to-b from-cyan to-accent/0" />
          </span>
        </div>
      </div>
    </section>
  )
}

export default Hero
