import { useEffect, useRef } from 'react'
import { getImage } from '../utils/images.js'

// Display is set per use (inline-flex, or hidden sm:inline-flex) so the
// responsive visibility classes are not overridden by a base display value.
const controlClass =
  'hud-icon-btn px-4'

function Lightbox({ items, index, onIndexChange, onClose }) {
  const ref = useRef(null)
  const closeRef = useRef(null)
  const item = items[index]
  const data = getImage(item.image)
  const hasMany = items.length > 1

  const go = (step) => onIndexChange((index + step + items.length) % items.length)

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })
  }, [])

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
    } else if (event.key === 'ArrowRight' && hasMany) {
      go(1)
    } else if (event.key === 'ArrowLeft' && hasMany) {
      go(-1)
    } else if (event.key === 'Tab') {
      const focusable = [...ref.current.querySelectorAll('a[href], button:not([disabled])')].filter(
        (element) => element.offsetParent !== null,
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${items.length}`}
      className="fade-in hud-panel-grid fixed inset-0 z-[60] flex flex-col bg-[#03050b]"
      onKeyDown={onKeyDown}
      data-lenis-prevent
    >
      <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <p className="eyebrow tabular-nums text-muted" aria-live="polite">
          {index + 1} / {items.length}
        </p>
        <div className="flex items-center gap-2">
          <a
            href={data.largest}
            target="_blank"
            rel="noopener"
            className={`${controlClass} !hidden sm:!inline-flex`}
          >
            Open full size
          </a>
          <button ref={closeRef} type="button" onClick={onClose} className={`${controlClass}`}>
            Close
          </button>
        </div>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
      >
        <img
          key={item.image}
          src={data.largest}
          srcSet={data.srcSet}
          sizes="100vw"
          width={data.width}
          height={data.height}
          alt={item.alt}
          decoding="async"
          className="max-h-full w-auto max-w-full object-contain"
          style={{ height: 'auto' }}
        />
        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className={`${controlClass} absolute left-2 top-1/2 !hidden -translate-y-1/2 sm:!inline-flex`}
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className={`${controlClass} absolute right-2 top-1/2 !hidden -translate-y-1/2 sm:!inline-flex`}
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}
      </div>

      <div className="shrink-0 px-4 pb-5 pt-3 sm:px-6">
        {item.caption && <p className="text-center text-sm text-copy">{item.caption}</p>}
        {hasMany && (
          <div className="mt-3 flex justify-center gap-3 sm:hidden">
            <button type="button" onClick={() => go(-1)} className={`${controlClass}`} aria-label="Previous image">
              ←
            </button>
            <button type="button" onClick={() => go(1)} className={`${controlClass}`} aria-label="Next image">
              →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lightbox
