import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import About from './About.jsx'
import Contact from './Contact.jsx'
import CreativeBackground from './components/CreativeBackground.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import LenisSmoothScroll from './components/LenisSmoothScroll.jsx'
import RevealOnScroll from './components/ui/RevealOnScroll.jsx'
import HudIntro, { shouldPlayIntro } from './components/HudIntro.jsx'

const ProjectDialog = lazy(() => import('./components/ProjectDialog.jsx'))
import { getProject, projects } from './data/projects.js'
import Footer from './Footer.jsx'
import Hero from './Hero.jsx'
import Navbar from './Navbar.jsx'
import Services from './Services.jsx'
import Tools from './Tools.jsx'
import Work from './Work.jsx'

// Case studies are addressed as #work/<slug>, so each one has a shareable URL
// and the browser Back button closes it.
const slugFromHash = () => {
  const match = window.location.hash.match(/^#work\/([\w-]+)$/)
  return match && getProject(match[1]) ? match[1] : null
}

function App() {
  // The Liquid Glass logo intro plays on every load; the page stays inert
  // (and smooth scrolling paused) until it fades out.
  // Entrance intro: decided before the first paint (once per tab session,
  // never under reduced motion). `introActive` keeps the page inert; the
  // overlay itself stays mounted a little longer while it dissolves.
  const [introActive, setIntroActive] = useState(shouldPlayIntro)
  const [introMounted, setIntroMounted] = useState(introActive)
  const revealSite = useCallback(() => setIntroActive(false), [])
  const removeIntro = useCallback(() => setIntroMounted(false), [])
  const [slug, setSlug] = useState(slugFromHash)
  // True when the open case study was reached from the page (so Back closes it).
  const openedInPage = useRef(false)
  const lastSlug = useRef(slug)

  useEffect(() => {
    const onHashChange = () => {
      const next = slugFromHash()
      setSlug((current) => {
        if (!current && next) openedInPage.current = true
        return next
      })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Return focus to the project's card after the dialog closes.
  useEffect(() => {
    if (slug) {
      lastSlug.current = slug
      return
    }
    const previous = lastSlug.current
    if (previous) {
      lastSlug.current = null
      document
        .querySelector(`#work a[href="#work/${previous}"]`)
        ?.focus({ preventScroll: false })
    }
  }, [slug])

  const close = useCallback(() => {
    if (openedInPage.current) {
      openedInPage.current = false
      window.history.back()
    } else {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#work`)
      setSlug(null)
    }
  }, [])

  const navigate = useCallback((next) => {
    window.history.replaceState(null, '', `#work/${next}`)
    lastSlug.current = next
    setSlug(next)
  }, [])

  // A deep-linked case study opens once the intro has finished.
  const project = slug && !introActive ? getProject(slug) : null
  const index = project ? projects.indexOf(project) : -1
  const nextProject = project ? projects[(index + 1) % projects.length] : null

  return (
    <>
      <div
        id="portfolio-content"
        inert={introActive}
        aria-hidden={introActive || undefined}
      >
      <a
        href="#work"
        className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to work
      </a>
      <LenisSmoothScroll stopped={introActive || Boolean(project)} />
      <CreativeBackground />
      <div id="page" className="relative z-10">
        <Navbar />
        <main>
          <Hero ready={!introActive} />
          <RevealOnScroll>
            <Work paused={introActive || Boolean(project)} />
          </RevealOnScroll>
          <RevealOnScroll delay={0.04}>
            <Services />
          </RevealOnScroll>
          <RevealOnScroll delay={0.04}>
            <Tools />
          </RevealOnScroll>
          <RevealOnScroll delay={0.04}>
            <About />
          </RevealOnScroll>
          <RevealOnScroll>
            <Contact />
          </RevealOnScroll>
        </main>
        <Footer />
      </div>
      </div>
      {introMounted && <HudIntro onReveal={revealSite} onFinished={removeIntro} />}
      <CustomCursor />
      {/* The case study (and its lightbox) loads only when a project opens. */}
      {project && (
        <Suspense fallback={null}>
          <ProjectDialog
            project={project}
            nextProject={nextProject}
            onClose={close}
            onNavigate={navigate}
          />
        </Suspense>
      )}
    </>
  )
}

export default App
