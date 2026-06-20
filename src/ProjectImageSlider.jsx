import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

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
    alt: image.alt || title,
    caption: image.caption || '',
  }
}

function ProjectPlaceholder({ title }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(14,26,43,0.95),rgba(17,34,58,0.72),rgba(11,18,17,0.92))]"
      role="img"
      aria-label={`${title} placeholder`}
    >
      <div className="rounded-lg border border-white/12 bg-white/10 px-5 py-4 text-center shadow-sm shadow-black/20 backdrop-blur">
        <p className="text-sm font-black text-white">{title}</p>
        <p className="mt-1 text-xs font-semibold text-sky-100">
          Image placeholder
        </p>
      </div>
    </div>
  )
}

function ProjectImageSlider({
  images = [],
  title,
  fallbackCaption = '',
  className = '',
  imageClassName = '',
}) {
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [failedImages, setFailedImages] = useState([])

  const usableImages = useMemo(() => {
    return images
      .map((image) => normalizeImage(image, title))
      .filter((image) => image && !failedImages.includes(image.src))
  }, [failedImages, images, title])

  const hasMultipleImages = usableImages.length > 1
  const normalizedActiveIndex = activeIndex % Math.max(usableImages.length, 1)
  const activeImage = usableImages[normalizedActiveIndex]
  const activeCaption = activeImage?.caption || fallbackCaption

  const showPreviousImage = (event) => {
    event.stopPropagation()
    setDirection(-1)
    setActiveIndex((current) =>
      current === 0 ? usableImages.length - 1 : current - 1,
    )
  }

  const showNextImage = (event) => {
    event.stopPropagation()
    setDirection(1)
    setActiveIndex((current) => (current + 1) % usableImages.length)
  }

  const handleImageError = () => {
    if (!activeImage) {
      return
    }

    setFailedImages((current) =>
      current.includes(activeImage.src)
        ? current
        : [...current, activeImage.src],
    )
    setActiveIndex(0)
  }

  return (
    <div
      className={`relative aspect-[16/11] w-full overflow-hidden bg-[#07111F] ${className}`}
    >
      <AnimatePresence mode="wait" custom={direction}>
        {activeImage ? (
          <motion.img
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt || title}
            className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${imageClassName}`}
            custom={direction}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: direction * 24 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: direction * -24 }
            }
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onError={handleImageError}
          />
        ) : (
          <motion.div
            key="placeholder"
            className="h-full w-full transition duration-500 group-hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <ProjectPlaceholder title={title} />
          </motion.div>
        )}
      </AnimatePresence>

      {hasMultipleImages && (
        <>
          <button
            type="button"
            onClick={showPreviousImage}
            onPointerDown={(event) => event.stopPropagation()}
            className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-[52%] hover:bg-white/15 hover:text-sky-100"
            aria-label={`Show previous image for ${title}`}
          >
            <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={showNextImage}
            onPointerDown={(event) => event.stopPropagation()}
            className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-[52%] hover:bg-white/15 hover:text-sky-100"
            aria-label={`Show next image for ${title}`}
          >
            <FiArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="absolute right-3 top-3 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 shadow-lg shadow-black/20 backdrop-blur">
            {usableImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation()
                  setDirection(index > normalizedActiveIndex ? 1 : -1)
                  setActiveIndex(index)
                }}
                className={`h-1.5 rounded-full transition ${
                  index === normalizedActiveIndex
                    ? 'w-5 bg-sky-300'
                    : 'w-1.5 bg-white/30 hover:bg-white/55'
                }`}
                aria-label={`Show image ${index + 1} for ${title}`}
              />
            ))}
            <span className="ml-1 text-[11px] font-bold text-white/65">
              {normalizedActiveIndex + 1}/{usableImages.length}
            </span>
          </div>
        </>
      )}

      <AnimatePresence mode="wait">
        {activeCaption && (
          <motion.div
            key={`${activeImage?.src || 'placeholder'}-${activeCaption}`}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/82 via-black/50 to-transparent px-4 pb-4 pt-12"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <p className="max-w-2xl text-xs font-semibold leading-5 text-white/85 sm:text-sm">
              {activeCaption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectImageSlider
