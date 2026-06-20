import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

function normalizeImage(image) {
  if (typeof image === 'string') {
    return { src: image }
  }

  if (!image?.src) {
    return null
  }

  return image
}

function buildPreviewImages(images) {
  const cleanImages = images.map(normalizeImage).filter(Boolean)

  if (cleanImages.length === 0) {
    return []
  }

  return Array.from({ length: Math.max(6, cleanImages.length) }, (_, index) => {
    return cleanImages[index % cleanImages.length]
  })
}

function ProjectHoverPreview({ images = [], isVisible }) {
  const shouldReduceMotion = useReducedMotion()
  const [failedImages, setFailedImages] = useState([])

  const previewImages = useMemo(() => {
    return buildPreviewImages(
      images.filter((image) => {
        const normalizedImage = normalizeImage(image)
        return normalizedImage && !failedImages.includes(normalizedImage.src)
      }),
    )
  }, [failedImages, images])

  const marqueeImages = useMemo(
    () => [...previewImages, ...previewImages],
    [previewImages],
  )

  if (previewImages.length === 0) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none absolute bottom-full left-0 z-50 mb-4 hidden w-[min(20rem,calc(100vw-3rem))] overflow-hidden rounded-lg border border-white/10 bg-black/70 p-2 shadow-2xl shadow-black/45 backdrop-blur-xl sm:block"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 10, scale: 0.96 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 8, scale: 0.96 }
          }
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(96,165,250,0.14),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_50%)]"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black/80 to-transparent" />

            <div
              className={`flex w-max gap-2 ${
                shouldReduceMotion ? '' : 'animate-project-hover-marquee'
              }`}
            >
              {marqueeImages.map((image, index) => (
                <img
                  key={`${image.src}-${index}`}
                  src={image.src}
                  alt=""
                  className="h-20 w-28 rounded-lg border border-white/10 object-cover shadow-lg shadow-black/25"
                  onError={() => {
                    setFailedImages((current) =>
                      current.includes(image.src)
                        ? current
                        : [...current, image.src],
                    )
                  }}
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
