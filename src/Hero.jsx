import { motion } from 'motion/react'
import HeroDashboard from './components/HeroDashboard.jsx'
import SpotlightBackground from './components/SpotlightBackground.jsx'

function Hero() {
  return (
    <motion.section
      id="home"
      className="relative w-full scroll-mt-28 overflow-hidden text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <SpotlightBackground intensity="strong" className="opacity-75" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-36 bg-gradient-to-b from-transparent via-[#030712]/70 to-[#030712]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[90rem] px-6 pb-14 pt-10 sm:pb-16 sm:pt-14 lg:min-h-[calc(100vh-5rem)] lg:px-10 lg:py-10">
        <HeroDashboard />
      </div>
    </motion.section>
  )
}

export default Hero
