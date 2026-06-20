import { useEffect, useState } from 'react'
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

  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId)
    scrollToSection(sectionId)
  }

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
          className={`rounded-full px-4 py-2 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-500/20 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
            activeSection === 'contact'
              ? 'bg-sky-100 text-slate-950 shadow-sky-500/20'
              : 'bg-white text-slate-950 shadow-blue-950/30 hover:bg-sky-100'
          }`}
        >
          Let&apos;s talk
        </button>
      </nav>
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 pb-3 md:hidden">
        {links.map((link) => (
          <button
            key={link.sectionId}
            type="button"
            onClick={() => handleNavigation(link.sectionId)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold shadow-sm transition hover:border-white/30 hover:text-white active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
              activeSection === link.sectionId
                ? 'border-sky-200/30 bg-sky-100/15 text-sky-100'
                : 'border-white/15 bg-white/10 text-white/75'
            }`}
            aria-current={activeSection === link.sectionId ? 'page' : undefined}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  )
}

export default Navbar
