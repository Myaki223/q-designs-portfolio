import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import ToolSticker from './ToolSticker.jsx'

function ToolCategoryCard({
  category,
  index,
  isOpen,
  onOpen,
  onClose,
  onToggle,
}) {
  const shouldReduceMotion = useReducedMotion()
  const isFeatured = category.featured
  const logoColumns = isFeatured ? 'grid-cols-3' : 'grid-cols-4 sm:grid-cols-5'

  const revealTransition = {
    duration: shouldReduceMotion ? 0 : 0.32,
    ease: 'easeOut',
  }

  return (
    <motion.article
      layout
      className={`group relative cursor-pointer overflow-hidden rounded-lg border surface-glass shadow-2xl shadow-black/35 outline-none backdrop-blur-xl transition hover:bg-white/[0.08] hover:shadow-black/45 focus-visible:ring-2 focus-visible:ring-highlight/60 focus-within:bg-white/[0.08] ${
        isOpen ? 'border-white/20' : 'border-line'
      } ${isFeatured ? 'lg:col-span-7' : 'lg:col-span-5'} ${category.rotation}`}
      initial={{ opacity: 0, y: 22, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      whileHover={
        shouldReduceMotion ? undefined : { y: -8, rotate: 0, scale: 1.012 }
      }
      transition={{
        duration: 0.48,
        delay: index * 0.06,
        ease: 'easeOut',
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`${category.title}, ${category.tools.length} tools`}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={(event) => {
        if (
          !event.relatedTarget ||
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          onClose()
        }
      }}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onToggle()
        }
      }}
    >
      <div className="group/card relative z-10 block w-full p-5 text-left sm:p-6">
        <div
          className={`pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-10 rounded-full bg-gradient-to-br ${category.accent} opacity-25 blur-2xl transition duration-300 group-hover:opacity-50 group-focus-visible/card:opacity-50`}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-8 -bottom-10 h-16 rounded-full bg-silver/14 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-medium uppercase text-ink/85">
                {category.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-ink">
                {category.title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-copy">
                {category.summary}
              </p>
            </div>
            <span
              className={`mt-1 shrink-0 rounded-full border border-line bg-white/[0.07] px-3 py-1 text-xs font-medium text-copy backdrop-blur transition ${
                isOpen ? 'border-highlight/30 text-ink' : ''
              }`}
            >
              {category.tools.length} tools
            </span>
          </div>

          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
            transition={revealTransition}
          >
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  className={`mt-7 grid ${logoColumns} gap-3`}
                  onClick={(event) => event.stopPropagation()}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: shouldReduceMotion ? 0 : 0.045,
                      },
                    },
                  }}
                >
                  {category.tools.map((tool) => (
                    <ToolSticker
                      key={tool.name}
                      tool={tool}
                      compact={!isFeatured}
                      variants={{
                        hidden: { opacity: 0, y: 10, scale: 0.9 },
                        visible: { opacity: 1, y: 0, scale: 1 },
                      }}
                    />
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

export default ToolCategoryCard
