import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ResponsiveImage from './ResponsiveImage.jsx'
import Lightbox from './Lightbox.jsx'
import HudCorners from './ui/HudCorners.jsx'

// `sizes` hints per layout so the browser picks a sensible derivative.
const layoutSizes = {
  hero: '(min-width: 1280px) 1200px, 100vw',
  stack: '(min-width: 1280px) 1200px, 100vw',
  feature: '(min-width: 1024px) 600px, 100vw',
  pair: '(min-width: 768px) 600px, 100vw',
  sequence: '(min-width: 768px) 400px, 100vw',
  trio: '(min-width: 640px) 400px, 100vw',
  masonry: '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw',
  grid: '(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw',
}

const layoutClasses = {
  hero: 'grid gap-6',
  stack: 'grid gap-10',
  feature: 'grid gap-6 lg:grid-cols-2',
  pair: 'grid gap-6 md:grid-cols-2',
  sequence: 'grid gap-6 md:grid-cols-3',
  trio: 'grid gap-6 sm:grid-cols-3',
  masonry: 'columns-1 gap-6 sm:columns-2 lg:columns-3 [&>figure]:mb-6 [&>figure]:break-inside-avoid',
  grid: 'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4',
}

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function trapFocus(event, container) {
  if (event.key !== 'Tab' || !container) return
  const focusable = [...container.querySelectorAll(focusableSelector)].filter(
    (element) => element.offsetParent !== null || element === document.activeElement,
  )
  if (focusable.length === 0) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

function Figure({ item, layout, index, onOpen }) {
  const compact = layout === 'grid'

  return (
    <figure>
      <button
        type="button"
        onClick={(event) => onOpen(item, event.currentTarget)}
        className="art-frame group block w-full cursor-zoom-in overflow-hidden rounded-md"
        data-cursor="Zoom"
        aria-label={`View larger: ${item.caption || item.alt}`}
      >
        <ResponsiveImage
          image={item.image}
          alt={item.alt}
          sizes={layoutSizes[layout]}
          className="h-auto w-full"
        />
        <HudCorners inset />
      </button>
      {item.caption && (
        <figcaption
          className={`mt-3 flex gap-3 text-muted ${compact ? 'text-xs leading-snug' : 'text-sm'}`}
        >
          {layout === 'sequence' && (
            <span className="font-mono tabular-nums text-cyan">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          <span>{item.caption}</span>
        </figcaption>
      )}
    </figure>
  )
}

function Section({ section, onOpen, headingLevel = 'h3' }) {
  const Heading = headingLevel

  return (
    <section className="mt-16 first:mt-0 sm:mt-20">
      <div className="mb-6 max-w-2xl">
        <Heading className="flex items-center gap-3 text-lg font-medium text-ink sm:text-xl">
          <span aria-hidden="true" className="h-2 w-2 bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
          {section.title}
        </Heading>
        {section.intro && <p className="mt-2 text-copy">{section.intro}</p>}
      </div>
      <div className={layoutClasses[section.layout]}>
        {section.items.map((item, index) => (
          <Figure
            key={`${item.image}-${index}`}
            item={item}
            index={index}
            layout={section.layout}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  )
}

function Details({ project }) {
  const facts = [
    project.organization && ['Organization', project.organization],
    ['Project type', project.type],
    project.year && ['Year', project.year],
    project.role && ['Role', project.role],
  ].filter(Boolean)

  return (
    <div className="hud-panel hud-panel-grid relative mt-16 grid gap-10 p-6 sm:mt-20 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <HudCorners />
      <div>
        <h3 className="eyebrow">Overview</h3>
        <p className="mt-4 text-lg leading-relaxed text-copy">{project.overview}</p>
        {project.brief && (
          <>
            <h3 className="eyebrow mt-10">Brief</h3>
            <p className="mt-4 leading-relaxed text-copy">{project.brief}</p>
          </>
        )}
        {project.audience && (
          <>
            <h3 className="eyebrow mt-10">Audience</h3>
            <p className="mt-4 leading-relaxed text-copy">{project.audience}</p>
          </>
        )}
        <h3 className="eyebrow mt-10">Design notes</h3>
        <ul className="mt-4 grid gap-4">
          {project.designNotes.map((note) => (
            <li key={note} className="flex gap-3 leading-relaxed text-copy">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-cyan" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
      <dl className="grid content-start gap-6 border-[var(--hud-line)] lg:border-l lg:pl-10">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="eyebrow">{label}</dt>
            <dd className="mt-2 text-ink">{value}</dd>
          </div>
        ))}
        <div>
          <dt className="eyebrow">Deliverables shown</dt>
          <dd className="mt-2">
            <ul className="grid gap-1.5 text-ink">
              {project.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  )
}

function ProjectDialog({ project, nextProject, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const scrollRef = useRef(null)
  const headingRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)
  const lightboxTrigger = useRef(null)

  const items = useMemo(
    () => (project ? project.sections.flatMap((section) => section.items) : []),
    [project],
  )

  // Lock the page behind the dialog and hide it from assistive technology.
  useEffect(() => {
    if (!project) return undefined
    const page = document.getElementById('page')
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    page?.setAttribute('inert', '')
    return () => {
      root.style.overflow = previousOverflow
      page?.removeAttribute('inert')
    }
  }, [project])

  // New project: start at the top and move focus to its title.
  useEffect(() => {
    if (!project) return
    setLightbox(null)
    scrollRef.current?.scrollTo({ top: 0 })
    headingRef.current?.focus({ preventScroll: true })
  }, [project])

  const openLightbox = useCallback(
    (item, trigger) => {
      lightboxTrigger.current = trigger
      setLightbox(items.indexOf(item))
    },
    [items],
  )

  const closeLightbox = useCallback(() => {
    setLightbox(null)
    lightboxTrigger.current?.focus({ preventScroll: true })
  }, [])

  const onKeyDown = (event) => {
    if (lightbox !== null) return
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
      return
    }
    trapFocus(event, dialogRef.current)
  }

  if (!project) return null

  const [firstSection, ...otherSections] = project.sections

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      className="fade-in hud-panel-grid fixed inset-0 z-50 flex flex-col bg-[#04060d]"
      onKeyDown={onKeyDown}
      data-lenis-prevent
    >
      <div className="relative flex h-16 shrink-0 items-center justify-between gap-4 bg-[#050912]/85 px-4 backdrop-blur-md sm:px-6 lg:px-10">
        <span className="hud-hairline absolute inset-x-0 bottom-0" aria-hidden="true" />
        <p className="eyebrow min-w-0 truncate text-muted">
          <span className="text-cyan">Case study</span>
          <span className="text-muted"> / </span>
          <span className="text-ink">{project.shortTitle || project.title}</span>
          <span className="hidden sm:inline"> / {project.type}</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          className="hud-icon-btn shrink-0 px-4"
        >
          Close
          <span aria-hidden="true" className="text-base leading-none">×</span>
        </button>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>
        <article className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-10">
          <header className="max-w-3xl">
            <p className="eyebrow">{project.type}</p>
            <h2
              id="project-title"
              ref={headingRef}
              tabIndex={-1}
              className="mt-3 text-[clamp(2.1rem,5vw,3.75rem)] font-semibold leading-[1.05] text-ink focus:outline-none"
            >
              {project.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-copy">{project.summary}</p>
          </header>

          <div className="mt-10">
            <Section section={firstSection} onOpen={openLightbox} />
          </div>

          <Details project={project} />

          {otherSections.map((section) => (
            <Section key={section.title} section={section} onOpen={openLightbox} />
          ))}

          {nextProject && (
            <nav className="relative mt-20 pt-8" aria-label="Next project">
              <span className="hud-hairline absolute inset-x-0 top-0" aria-hidden="true" />
              <p className="eyebrow">Next project</p>
              <a
                href={`#work/${nextProject.slug}`}
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate(nextProject.slug)
                }}
                className="hud-link mt-3 inline-block text-2xl font-medium text-ink sm:text-3xl"
              >
                {nextProject.title}
              </a>
              <p className="mt-2 text-sm text-muted">{nextProject.type}</p>
            </nav>
          )}
        </article>
      </div>

      {lightbox !== null && (
        <Lightbox
          items={items}
          index={lightbox}
          onIndexChange={setLightbox}
          onClose={closeLightbox}
        />
      )}
    </div>,
    document.body,
  )
}

export default ProjectDialog
