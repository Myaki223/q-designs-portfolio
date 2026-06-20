import About from './About.jsx'
import Contact from './Contact.jsx'
import CreativeBackground from './components/CreativeBackground.jsx'
import LenisSmoothScroll from './components/LenisSmoothScroll.jsx'
import RevealOnScroll from './components/ui/RevealOnScroll.jsx'
import Footer from './Footer.jsx'
import Hero from './Hero.jsx'
import Navbar from './Navbar.jsx'
import ProjectsCarousel from './ProjectsCarousel.jsx'
import Services from './Services.jsx'
import Tools from './Tools.jsx'

function App() {
  return (
    <div
      className="relative isolate min-h-screen overflow-x-hidden bg-[#030712] text-slate-950"
      style={{ colorScheme: 'light' }}
    >
      <LenisSmoothScroll />
      <CreativeBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="pt-32 md:pt-24">
          <Hero />
          <RevealOnScroll>
            <ProjectsCarousel />
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
  )
}

export default App
