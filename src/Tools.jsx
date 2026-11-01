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
            <h2 className="text-4xl font-semibold leading-[1.3] tracking-normal text-ink sm:text-5xl lg:text-6xl">
              Tools
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {toolboxNotes.map((note) => {
              const Icon = note.icon

              return (
                <span
                  key={note.label}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.07] px-3 py-2 text-xs font-medium text-copy shadow-sm shadow-black/20 backdrop-blur"
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
            className="pointer-events-none absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_20%_20%,rgba(var(--studio-rgb),0.066),transparent_28%),radial-gradient(circle_at_86%_42%,rgba(var(--studio-rgb),0.077),transparent_30%)]"
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
