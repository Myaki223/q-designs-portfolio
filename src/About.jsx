import { motion } from 'motion/react'

function About() {
  return (
    <section id="about" className="scroll-mt-28 px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <motion.div
          className="relative mx-auto w-full max-w-sm"
          initial={{ opacity: 0, y: 18, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div
            className="absolute -left-4 top-10 h-24 w-20 rotate-[-10deg] rounded-lg bg-gradient-to-br from-white/18 to-sky-300/20 shadow-lg shadow-black/20"
            aria-hidden="true"
          />
          <div
            className="absolute -right-4 bottom-12 h-20 w-28 rotate-[8deg] rounded-lg bg-gradient-to-br from-sky-200/22 to-white/14 shadow-lg shadow-black/20"
            aria-hidden="true"
          />

          <div className="relative rounded-lg border border-white/12 bg-black p-4 shadow-2xl shadow-black/40">
            <img
              src="/images/qf-design-logo.png"
              alt="Q Designs logo"
              className="aspect-square w-full rounded-lg object-contain"
            />
            <div className="absolute -bottom-4 left-5 rotate-[-2deg] rounded-lg border border-white/10 bg-white px-4 py-2 text-xs font-black text-slate-950 shadow-lg">
              Q DESIGNS
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(14,26,43,0.86),rgba(11,22,40,0.7),rgba(7,17,31,0.82))] p-6 shadow-xl shadow-black/35 backdrop-blur-xl sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-sm font-black uppercase text-sky-300">
            About Q Designs
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
            A creative space for bold visuals, clean layouts, and useful digital design.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#CBD5E1]">
            Q Designs is my creative space for bold visuals, clean layouts, and
            digital designs that help brands stand out. I combine graphic
            design, web knowledge, and AI-assisted workflows to create visuals
            that feel fresh, useful, and memorable.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {['Brand Visuals', 'Posters', 'Packaging', 'Social Graphics'].map(
              (item, index) => (
                <span
                  key={item}
                  className={`rounded-full border px-3 py-1.5 text-xs font-black shadow-sm ${
                    index === 0
                      ? 'border-sky-300/25 bg-sky-300/10 text-sky-100'
                      : 'border-white/10 bg-white/[0.08] text-white/70'
                  }`}
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
