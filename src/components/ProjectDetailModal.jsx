import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi'

function normalizeImage(image, title) {
  if (typeof image === 'string') {
    return {
      src: image,
      alt: `${title} project preview`,
      caption: '',
    }
  }

  if (!image?.src) {
    return null
  }

  return {
    src: image.src,
    alt: image.alt || `${title} project preview`,
    caption: image.caption || '',
  }
}

function ProjectDetailModal({ project, onClose }) {
  const shouldReduceMotion = useReducedMotion()
  const closeButtonRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const images = useMemo(() => {
    if (!project) {
      return []
    }

    return project.images
      .map((image) => normalizeImage(image, project.title))
      .filter(Boolean)
  }, [project])

  const activeImage = images[activeIndex] || images[0]
  const hasMultipleImages = images.length > 1
  const tools = project?.tools || project?.tags || []

  useEffect(() => {
    if (!project) {
      return undefined
    }

    setActiveIndex(0)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'ArrowLeft' && hasMultipleImages) {
        setActiveIndex((current) =>
          current === 0 ? images.length - 1 : current - 1,
        )
      }

      if (event.key === 'ArrowRight' && hasMultipleImages) {
        setActiveIndex((current) => (current + 1) % images.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.setTimeout(() => closeButtonRef.current?.focus(), 80)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [hasMultipleImages, images.length, onClose, project])

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[10000] overflow-y-auto bg-slate-950/78 px-4 py-5 backdrop-blur-xl sm:px-6 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose()
            }
          }}
        >
          <motion.div
            className="relative mx-auto grid min-h-[min(48rem,calc(100vh-3rem))] max-w-6xl overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(14,26,43,0.94),rgba(7,17,31,0.9),rgba(3,7,18,0.96))] shadow-2xl shadow-black/60 backdrop-blur-xl lg:grid-cols-[0.95fr_1.35fr]"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.97 }
            }
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            data-lenis-prevent
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-300/12 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-32 left-10 h-96 w-96 rounded-full bg-blue-500/12 blur-3xl"
              aria-hidden="true"
            />

            <button
              type="button"
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white shadow-lg shadow-black/30 backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-200/30 hover:bg-white/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              aria-label="Close project details"
            >
              <FiX className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-black leading-none text-white/12 sm:text-6xl">
                    {project.number}
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-300">
                      {project.category}
                    </p>
                    <p className="mt-1 text-xs font-bold text-white/45">
                      {project.year}
                    </p>
                  </div>
                </div>

                <h2
                  id="project-detail-title"
                  className="mt-7 text-4xl font-black leading-tight text-white sm:text-5xl"
                >
                  {project.title}
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[#CBD5E1] sm:text-base">
                  {project.description}
                </p>

                <div className="mt-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">
                    Tools / Focus
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-bold text-white/75"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {activeImage?.caption && (
                <motion.div
                  key={activeImage.src}
                  className="mt-8 rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-lg shadow-black/20 backdrop-blur"
                  initial={
                    shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-sky-200">
                    Image caption
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    {activeImage.caption}
                  </p>
                </motion.div>
              )}
            </div>

            <div className="relative z-10 flex flex-col gap-4 p-4 sm:p-5 lg:p-6">
              <div className="relative min-h-[22rem] overflow-hidden rounded-lg border border-white/10 bg-black/35 shadow-2xl shadow-black/40 sm:min-h-[30rem]">
                {activeImage ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage.src}
                      src={activeImage.src}
                      alt={activeImage.alt}
                      className="h-full min-h-[22rem] w-full object-contain sm:min-h-[30rem]"
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 1.025 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </AnimatePresence>
                ) : (
                  <div className="flex h-full min-h-[22rem] items-center justify-center text-white/60 sm:min-h-[30rem]">
                    No image available
                  </div>
                )}

                {hasMultipleImages && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex((current) =>
                          current === 0 ? images.length - 1 : current - 1,
                        )
                      }
                      className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white shadow-lg shadow-black/25 backdrop-blur transition hover:-translate-y-[52%] hover:bg-white/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                      aria-label={`Show previous image for ${project.title}`}
                    >
                      <FiArrowLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveIndex((current) => (current + 1) % images.length)
                      }
                      className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white shadow-lg shadow-black/25 backdrop-blur transition hover:-translate-y-[52%] hover:bg-white/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                      aria-label={`Show next image for ${project.title}`}
                    >
                      <FiArrowRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-7">
                  {images.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`group overflow-hidden rounded-lg border bg-black/35 p-1 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
                        index === activeIndex
                          ? 'border-sky-200/50 shadow-lg shadow-sky-950/35'
                          : 'border-white/10 hover:border-white/25'
                      }`}
                      aria-label={`Show image ${index + 1} for ${project.title}`}
                    >
                      <img
                        src={image.src}
                        alt=""
                        className="aspect-square w-full rounded-md object-cover transition group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default ProjectDetailModal
