import { useState } from 'react'
import { motion } from 'motion/react'
import ToolCategoryCard from './components/ToolCategoryCard.jsx'
import { toolCategories, toolboxNotes } from './data/tools.js'

function Tools() {
  const [activeCategory, setActiveCategory] = useState(null)

  return (
    <section id="tools" className="scroll-mt-28 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-sky-300">
              Tools
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
              Creative Toolbox
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/70">
              The tools I use to turn ideas into visuals, layouts, websites,
              and smarter workflows.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {toolboxNotes.map((note) => {
              const Icon = note.icon

              return (
                <span
                  key={note.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-2 text-xs font-black text-white/70 shadow-sm shadow-black/20 backdrop-blur"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {note.label}
                </span>
              )
            })}
          </div>
        </motion.div>

        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_20%_20%,rgba(147,197,253,0.12),transparent_28%),radial-gradient(circle_at_86%_42%,rgba(59,130,246,0.14),transparent_30%)]"
            aria-hidden="true"
          />
          <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-12">
            {toolCategories.map((category, index) => (
              <ToolCategoryCard
                key={category.title}
                category={category}
                index={index}
                isOpen={activeCategory === index}
                onOpen={() => setActiveCategory(index)}
                onClose={() => setActiveCategory(null)}
                onToggle={() =>
                  setActiveCategory((current) =>
                    current === index ? null : index,
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tools
