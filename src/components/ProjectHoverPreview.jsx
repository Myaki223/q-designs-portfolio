import { useMemo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { getImage } from '../utils/images.js'

// Scrolling strip of a project's images, shown above "View case study" on
// hover or focus. Uses the smallest derivative of each image, and only
// mounts (and so only downloads) while visible.
function ProjectHoverPreview({ project, isVisible }) {
  const reduceMotion = useReducedMotion()

  const images = useMemo(() => {
    const keys = [...new Set(project.sections.flatMap((s) => s.items.map((i) => i.image)))]
    const unique = keys.slice(0, 8).map((key) => getImage(key).smallest)
    const filled = Array.from({ length: Math.max(6, unique.length) }, (_, i) => unique[i % unique.length])
    return [...filled, ...filled]
  }, [project])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="hud-panel pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 hidden w-[min(20rem,calc(100vw-3rem))] -translate-x-1/2 overflow-hidden p-2 sm:block"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(var(--studio-rgb),0.077),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_50%)]" />
          <div className="relative overflow-hidden rounded-md">
            <div className="absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black/80 to-transparent" />
            <div className="absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black/80 to-transparent" />
            <div className={`flex w-max gap-2 ${reduceMotion ? '' : 'animate-project-hover-marquee'}`}>
              {images.map((src, index) => (
                <img
                  key={`${src}-${index}`}
                  src={src}
                  alt=""
                  width="112"
                  height="80"
                  decoding="async"
                  className="h-20 w-28 rounded-sm border border-[var(--hud-line)] object-cover"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectHoverPreview
