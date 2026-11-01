import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { FiArrowUpRight } from 'react-icons/fi'
import ProjectHoverPreview from './components/ProjectHoverPreview.jsx'
import ProjectImageSlider from './ProjectImageSlider.jsx'

function ProjectSlide({ project, direction, onNext, onPrevious, onViewProject }) {
  const shouldReduceMotion = useReducedMotion()
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)

  const handleDragEnd = (_event, info) => {
    if (Math.abs(info.offset.x) < 80 && Math.abs(info.velocity.x) < 450) {
      return
    }

    if (info.offset.x < 0 || info.velocity.x < -450) {
      onNext()
      return
    }

    onPrevious()
  }

  return (
    <motion.article
      key={project.id}
      className="group relative grid overflow-hidden rounded-lg border border-line surface-glass shadow-2xl shadow-black/45 backdrop-blur-xl lg:grid-cols-[0.78fr_1.22fr]"
      custom={direction}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: direction * 90, scale: 0.98 }
      }
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: direction * -90, scale: 0.98 }
      }
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      drag={shouldReduceMotion ? false : 'x'}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.08}
      onDragEnd={handleDragEnd}
      role="group"
      aria-roledescription="slide"
      aria-label={`${project.number}. ${project.title}`}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-silver/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-silver/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(115deg,rgba(255,255,255,0.06),transparent_42%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col justify-center gap-6 p-6 sm:gap-8 sm:p-8 lg:p-10">
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-5xl font-semibold leading-none text-muted sm:text-6xl">
              {project.number}
            </span>
            <span className="rounded-full border border-line bg-white/8 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-muted backdrop-blur">
              {project.year}
            </span>
          </div>

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.1em] text-ink">
            {project.category}
          </p>
          <h3 className="mt-4 max-w-lg text-4xl font-medium leading-[1.25] text-ink sm:text-5xl">
            {project.title}
          </h3>
        </div>

        <div
          className="relative w-fit"
          onMouseEnter={() => setIsPreviewVisible(true)}
          onMouseLeave={() => setIsPreviewVisible(false)}
        >
          <ProjectHoverPreview
            images={project.images}
            isVisible={isPreviewVisible}
          />
          <button
            type="button"
            aria-label={`View ${project.title}`}
            onClick={(event) => {
              event.stopPropagation()
              onViewProject(project)
            }}
            onFocus={() => setIsPreviewVisible(true)}
            onBlur={() => setIsPreviewVisible(false)}
            onPointerDown={(event) => event.stopPropagation()}
            className="relative z-10 inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-canvas shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-copy hover:shadow-xl hover:shadow-white/10 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-highlight"
          >
            View Project
            <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative z-10 p-3 sm:p-4 lg:p-5">
        <div className="relative overflow-hidden rounded-lg border border-line bg-canvas/35 p-3 shadow-2xl shadow-black/35 backdrop-blur-xl">
          <div
            className="pointer-events-none absolute inset-4 rounded-lg bg-silver/12 opacity-70 blur-3xl transition duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute left-5 top-5 z-20 rounded-full border border-line bg-canvas/60 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-ink opacity-0 shadow-lg shadow-black/20 backdrop-blur transition duration-300 group-hover:opacity-100">
            {project.category}
          </div>
          <ProjectImageSlider
            images={project.images}
            title={project.title}
            fallbackCaption={project.description}
            className="aspect-[4/3] rounded-lg"
          />
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectSlide
