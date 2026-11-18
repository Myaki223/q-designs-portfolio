import { motion } from 'motion/react'
import HudCorners from './components/ui/HudCorners.jsx'
import SectionHeading from './components/ui/SectionHeading.jsx'

const tags = ['Brand Visuals', 'Posters', 'Packaging', 'Social Graphics']

function About() {
  return (
    <section id="about" className="scroll-mt-28 px-4 py-24 sm:px-6" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        {/* Logo, presented inside a HUD frame */}
        <motion.div
          className="relative mx-auto w-full max-w-sm"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="hud-panel hud-panel-grid group relative overflow-hidden p-6">
            <HudCorners inset />
            <div className="hud-frame-lines pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(91,140,255,0.22),transparent_62%)]" aria-hidden="true" />
            <p className="eyebrow relative flex items-center justify-between text-muted">
              <span>ID / Q Designs</span>
              <span className="flex items-center gap-2 text-cyan">
                <span className="hud-pulse h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" aria-hidden="true" />
                Active
              </span>
            </p>
            <img
              src="/images/qf-design-logo.png"
              alt="Q Designs logo"
              width="1080"
              height="1080"
              loading="lazy"
              decoding="async"
              className="relative mx-auto mt-4 aspect-square w-full max-w-[18rem] object-contain drop-shadow-[0_0_24px_rgba(91,140,255,0.35)]"
            />
            <p className="hud-tag hud-tag--accent relative mt-4">Q Designs</p>
          </div>
        </motion.div>

        <motion.div
          className="hud-panel relative p-6 sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <HudCorners />
          <SectionHeading id="about-title" index="04" label="About Q Designs" size="sm">
            A creative space for bold visuals, clean layouts, and{' '}
            <span className="editorial-accent font-normal">useful digital design.</span>
          </SectionHeading>
          <p className="mt-6 text-base leading-8 text-copy">
            Q Designs is my creative space for bold visuals, clean layouts, and
            digital designs that help brands stand out. I combine graphic
            design, web knowledge, and AI-assisted workflows to create visuals
            that feel fresh, useful, and memorable.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <li key={tag} className={`hud-tag ${index === 0 ? 'hud-tag--accent' : ''}`}>
                {tag}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

export default About
