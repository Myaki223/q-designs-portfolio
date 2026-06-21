import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { scrollToSection } from './utils/scrollToSection.js'

const links = [
  { label: 'Home', sectionId: 'home' },
  { label: 'Work', sectionId: 'projects' },
  { label: 'Services', sectionId: 'services' },
  { label: 'Tools', sectionId: 'tools' },
  { label: 'About', sectionId: 'about' },
  { label: 'Contact', sectionId: 'contact' },
]

function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    let frameId = null

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 150
      const documentHeight = document.documentElement.scrollHeight
      const viewportBottom = window.scrollY + window.innerHeight

      if (viewportBottom >= documentHeight - 8) {
        setActiveSection('contact')
        return
      }

      const currentSection =
        links.reduce((current, link) => {
          const section = document.getElementById(link.sectionId)

          if (section && section.offsetTop <= scrollPosition) {
            return link.sectionId
          }

          return current
        }, 'home') || 'home'

      setActiveSection(currentSection)
    }

    const requestUpdate = () => {
      if (frameId) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null
        updateActiveSection()
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return [activeSection, setActiveSection]
}

function Navbar() {
  const [activeSection, setActiveSection] = useActiveSection()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId)
    setIsMenuOpen(false)
    scrollToSection(sectionId)
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen])

  return (
    <header className="fixed left-0 right-0 top-0 z-[9999] border-b border-white/10 bg-[#030712]/70 shadow-lg shadow-blue-950/20 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4">
        <button
          type="button"
          onClick={() => handleNavigation('home')}
          className="flex items-center gap-3 rounded-lg transition hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          aria-label="Q Designs home"
        >
          <img
            src="/images/qf-design-logo.png"
            alt="Q Designs logo"
            className="h-12 w-auto object-contain sm:h-14"
          />
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <button
              key={link.sectionId}
              type="button"
              onClick={() => handleNavigation(link.sectionId)}
              className={`rounded-full px-3 py-2 text-sm font-bold transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
                activeSection === link.sectionId
                  ? 'bg-white/12 text-sky-100 shadow-lg shadow-sky-950/20'
                  : 'text-white/70 hover:text-white'
              }`}
              aria-current={
                activeSection === link.sectionId ? 'page' : undefined
              }
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => handleNavigation('contact')}
          className={`hidden rounded-full px-4 py-2 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-500/20 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:inline-flex ${
            activeSection === 'contact'
              ? 'bg-sky-100 text-slate-950 shadow-sky-500/20'
              : 'bg-white text-slate-950 shadow-blue-950/30 hover:bg-sky-100'
          }`}
        >
          Let&apos;s talk
        </button>

        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white shadow-lg shadow-black/20 backdrop-blur transition hover:border-sky-200/30 hover:bg-white/12 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 md:hidden"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation-menu"
        >
          <span className="sr-only">
            {isMenuOpen ? 'Close menu' : 'Open menu'}
          </span>
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-current transition duration-300 ${
              isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5'
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-current transition duration-300 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-current transition duration-300 ${
              isMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            className="absolute left-4 right-4 top-full mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#030712]/90 p-3 shadow-2xl shadow-blue-950/40 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="pointer-events-none absolute inset-x-8 -top-10 h-20 rounded-full bg-sky-300/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-2">
              {links.map((link) => (
                <button
                  key={link.sectionId}
                  type="button"
                  onClick={() => handleNavigation(link.sectionId)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-black transition hover:-translate-y-0.5 hover:border-sky-200/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
                    activeSection === link.sectionId
                      ? 'border-sky-200/30 bg-sky-100/15 text-sky-100'
                      : 'border-white/10 bg-white/[0.06] text-white/75'
                  }`}
                  aria-current={
                    activeSection === link.sectionId ? 'page' : undefined
                  }
                >
                  {link.label}
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                </button>
              ))}

              <button
                type="button"
                onClick={() => handleNavigation('contact')}
                className="mt-1 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-lg shadow-sky-950/20 transition hover:-translate-y-0.5 hover:bg-sky-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                Let&apos;s talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
