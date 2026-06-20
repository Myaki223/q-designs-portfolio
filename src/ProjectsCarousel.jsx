import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import ProjectDetailModal from './components/ProjectDetailModal.jsx'
import SpotlightBackground from './components/SpotlightBackground.jsx'
import ProjectSlide from './ProjectSlide.jsx'
import { projects } from './data/projects.js'

function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [selectedProject, setSelectedProject] = useState(null)

  const goToPrevious = useCallback(() => {
    setDirection(-1)
    setActiveIndex((current) =>
      current === 0 ? projects.length - 1 : current - 1,
    )
  }, [])

  const goToNext = useCallback(() => {
    setDirection(1)
    setActiveIndex((current) => (current + 1) % projects.length)
  }, [])

  const goToProject = (index) => {
    if (index === activeIndex) {
      return
    }

    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious()
      }

      if (event.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious])

  const activeProject = projects[activeIndex]
  const progress = `${((activeIndex + 1) / projects.length) * 100}%`

  return (
    <section
      id="projects"
      className="relative -mt-1 scroll-mt-28 overflow-hidden bg-[linear-gradient(180deg,rgba(3,7,18,0)_0%,rgba(7,17,31,0.5)_18%,rgba(3,7,18,0.42)_100%)] pb-24 pt-16"
    >
      <SpotlightBackground className="opacity-70" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-300">
              Selected Works
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Graphic design showcase for bold visual ideas.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/70">
              Browse Q Designs work by category, with multiple previews,
              image captions, tags, and case-study style details for each
              featured project.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="mr-1 hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-2 text-xs font-black text-white/70 shadow-lg shadow-black/20 backdrop-blur sm:flex">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="text-sky-100"
                >
                  {activeProject.number}
                </motion.span>
              </AnimatePresence>
              <span className="text-white/30">/</span>
              <span>{String(projects.length).padStart(2, '0')}</span>
            </div>
            <button
              type="button"
              onClick={goToPrevious}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-200/40 hover:bg-white hover:text-slate-950 hover:shadow-sky-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              aria-label="Show previous project"
            >
              <FiArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-xl hover:shadow-sky-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              aria-label="Show next project"
            >
              <FiArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        <div className="relative mt-10">
          <div
            className="pointer-events-none absolute -left-6 top-10 hidden h-[78%] w-24 rounded-lg border border-white/10 bg-white/5 opacity-50 blur-[1px] lg:block"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-6 top-10 hidden h-[78%] w-24 rounded-lg border border-white/10 bg-white/5 opacity-50 blur-[1px] lg:block"
            aria-hidden="true"
          />

          <div className="relative overflow-hidden rounded-lg">
            <AnimatePresence mode="wait" custom={direction}>
              <ProjectSlide
                key={activeProject.id}
                project={activeProject}
                direction={direction}
                onNext={goToNext}
                onPrevious={goToPrevious}
                onViewProject={setSelectedProject}
              />
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky-300 via-cyan-100 to-white"
              initial={false}
              animate={{ width: progress }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => goToProject(index)}
                className={`h-2.5 rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
                  index === activeIndex
                    ? 'w-9 bg-sky-300'
                    : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Show ${project.title}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing project {activeIndex + 1} of {projects.length}:{' '}
          {activeProject.title}
        </p>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}

export default ProjectsCarousel
