import { useEffect, useRef, useState } from 'react'
import HudCorners from './components/ui/HudCorners.jsx'
import { getImage } from './utils/images.js'

const links = [
  { label: 'Work', id: 'work' },
  { label: 'Services', id: 'services' },
  { label: 'Tools', id: 'tools' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

const logo = getImage('site/logo')

// Marks the section that crosses the upper third of the viewport.
function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -65% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return active
}

function Navbar() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const menuButton = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Mono HUD links; the active one gets a cyan marker underneath.
  const linkClass = (id) =>
    `relative flex items-center gap-2 rounded-sm px-3 py-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors ${
      active === id ? 'text-ink' : 'text-muted hover:text-ink'
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[#050912]/80 backdrop-blur-md">
      <span className="hud-hairline absolute inset-x-0 bottom-0" aria-hidden="true" />
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10"
        aria-label="Main"
      >
        <a
          href="#top"
          className="-ml-1 flex items-center rounded-md p-1"
          onClick={() => setOpen(false)}
          aria-label="Q Designs — back to top"
        >
          <img
            src={logo.src}
            srcSet={logo.srcSet}
            sizes="56px"
            width="56"
            height="56"
            alt=""
            className="h-12 w-12 sm:h-14 sm:w-14"
          />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link, index) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={linkClass(link.id)}
                aria-current={active === link.id ? 'true' : undefined}
              >
                <span className={active === link.id ? 'text-cyan' : 'text-accent-soft/50'}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-px h-px bg-cyan shadow-[0_0_8px_var(--color-cyan)] transition-opacity ${
                    active === link.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <button
          ref={menuButton}
          type="button"
          className="hud-icon-btn md:!hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-transform ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-transform ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="fade-in px-4 pb-4 pt-2 sm:px-6 md:hidden">
          <div className="hud-panel hud-panel-grid mx-auto max-w-7xl overflow-hidden">
            <HudCorners />
            <p className="eyebrow border-b border-[var(--hud-line)] px-4 py-3 text-muted">Navigation</p>
            <ul className="px-2 py-1">
              {links.map((link, index) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={`flex min-h-12 items-center gap-4 rounded-sm border-b border-[var(--hud-line)] px-2 font-mono text-sm uppercase tracking-[0.14em] transition-colors last:border-0 hover:text-cyan ${
                      active === link.id ? 'text-ink' : 'text-copy'
                    }`}
                  >
                    <span className={active === link.id ? 'text-cyan' : 'text-accent-soft/60'}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                    {active === link.id && (
                      <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
