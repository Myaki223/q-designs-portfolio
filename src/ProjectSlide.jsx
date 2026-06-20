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
      className="group relative grid overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(14,26,43,0.92),rgba(14,26,43,0.78),rgba(3,7,18,0.94))] shadow-2xl shadow-black/45 backdrop-blur-xl lg:grid-cols-[0.78fr_1.22fr]"
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
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-cyan-200/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(115deg,rgba(255,255,255,0.06),transparent_42%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[420px] flex-col justify-between p-6 sm:p-8 lg:p-10">
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-5xl font-black leading-none text-white/12 sm:text-6xl">
              {project.number}
            </span>
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-white/55 backdrop-blur">
              {project.year}
            </span>
          </div>

          <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-sky-300">
            {project.category}
          </p>
          <h3 className="mt-3 max-w-lg text-4xl font-black leading-[1.02] text-white sm:text-5xl">
            {project.title}
          </h3>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#CBD5E1] sm:text-base">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-bold text-white/70 shadow-sm shadow-black/10 backdrop-blur transition group-hover:border-sky-100/20 group-hover:text-sky-50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className="relative mt-8 w-fit"
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
            className="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-xl hover:shadow-sky-500/20 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            View Project
            <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative z-10 p-3 sm:p-4 lg:p-5">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/35 p-3 shadow-2xl shadow-black/35 backdrop-blur-xl">
          <div
            className="pointer-events-none absolute inset-4 rounded-lg bg-sky-300/12 opacity-70 blur-3xl transition duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute left-5 top-5 z-20 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-sky-100 opacity-0 shadow-lg shadow-black/20 backdrop-blur transition duration-300 group-hover:opacity-100">
            {project.category}
          </div>
          <ProjectImageSlider
            images={project.images}
            title={project.title}
            fallbackCaption={project.description}
            className="aspect-[4/3] rounded-lg lg:min-h-[500px]"
          />
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectSlide
