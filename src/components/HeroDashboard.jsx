import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import {
  FiArrowUpRight,
  FiBriefcase,
  FiLayers,
  FiMail,
  FiTool,
} from 'react-icons/fi'
import MagneticButton from './ui/MagneticButton.jsx'
import { scrollToSection } from '../utils/scrollToSection.js'

const navItems = [
  {
    label: 'Work',
    sectionId: 'projects',
    icon: FiBriefcase,
    position: 'lg:left-[2%] xl:left-[5%] lg:top-[23%]',
    delay: 0.1,
  },
  {
    label: 'Services',
    sectionId: 'services',
    icon: FiLayers,
    position: 'lg:left-[5%] xl:left-[9%] lg:bottom-[16%]',
    delay: 0.18,
  },
  {
    label: 'Tools',
    sectionId: 'tools',
    icon: FiTool,
    position: 'lg:right-[2%] xl:right-[8%] lg:top-[38%]',
    delay: 0.26,
  },
  {
    label: 'Contact',
    sectionId: 'contact',
    icon: FiMail,
    position: 'lg:right-[2%] xl:right-[4%] lg:bottom-[15%]',
    delay: 0.34,
  },
]

const ease = [0.22, 1, 0.36, 1]

function DashboardNavCard({ item }) {
  const shouldReduceMotion = useReducedMotion()
  const Icon = item.icon

  return (
    <motion.button
      type="button"
      onClick={() => scrollToSection(item.sectionId)}
      className={`group relative z-30 flex min-h-20 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-line bg-canvas/30 p-3 text-center shadow-xl shadow-black/25 outline-none backdrop-blur-xl transition hover:border-highlight/30 hover:bg-white/10 hover:shadow-white/10 focus-visible:ring-2 focus-visible:ring-highlight/70 sm:min-h-24 sm:p-4 lg:absolute lg:w-[96px] xl:w-[104px] ${item.position}`}
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 1, y: [0, -4, 0], scale: 1 }
      }
      transition={{
        opacity: { delay: item.delay, duration: 0.5, ease },
        scale: { delay: item.delay, duration: 0.5, ease },
        y: {
          delay: item.delay,
          duration: 4.6 + item.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -7, scale: 1.05 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      aria-label={`Go to ${item.label} section`}
    >
      <span className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_50%_0%,rgba(var(--studio-rgb),0.121),transparent_55%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <span className="absolute inset-x-4 -bottom-5 h-8 rounded-full bg-silver/20 opacity-0 blur-xl transition duration-300 group-hover:opacity-100" />
      <span className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-white/[0.07] text-ink shadow-lg shadow-black/20 transition group-hover:bg-white/12 group-hover:text-ink group-hover:drop-shadow-[0_0_14px_rgba(var(--studio-rgb),0.22)]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="relative text-xs font-medium uppercase tracking-[0.1em] text-copy transition group-hover:text-ink">
        {item.label}
      </span>
    </motion.button>
  )
}

function HeroDashboard() {
  const shouldReduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springConfig = { stiffness: 80, damping: 20, mass: 0.35 }
  const portraitX = useSpring(useTransform(pointerX, [-1, 1], [-14, 14]), springConfig)
  const portraitRotate = useSpring(
    useTransform(pointerX, [-1, 1], [-1.8, 1.8]),
    springConfig,
  )
  const portraitGlowX = useSpring(
    useTransform(pointerX, [-1, 1], [-24, 24]),
    springConfig,
  )
  const portraitGlowY = useSpring(
    useTransform(pointerY, [-1, 1], [-18, 18]),
    springConfig,
  )

  const handlePointerMove = (event) => {
    if (shouldReduceMotion) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2

    pointerX.set(Math.max(-1, Math.min(1, x)))
    pointerY.set(Math.max(-1, Math.min(1, y)))
  }

  const resetPointer = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div
      className="relative mx-auto w-full"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="relative min-h-[760px] px-0 pb-6 pt-2 sm:min-h-[840px] lg:min-h-[760px] lg:pt-8">
        <div
          className="pointer-events-none absolute left-1/2 top-[45%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_42%_24%,rgba(255,255,255,0.13),rgba(var(--studio-rgb),0.176)_42%,rgba(0,0,0,0.6)_72%,transparent_76%)] shadow-2xl shadow-black/45 sm:h-[34rem] sm:w-[34rem] lg:top-[49%] lg:h-[38rem] lg:w-[38rem]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-[45%] h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-highlight/10 sm:h-[38rem] sm:w-[38rem] lg:top-[49%] lg:h-[42rem] lg:w-[42rem]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-[45%] h-80 w-[88vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--studio-rgb),0.083),rgba(var(--studio-rgb),0.039)_45%,transparent_72%)] blur-3xl lg:top-[46%] lg:h-[30rem]"
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[46%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-silver/16 blur-3xl sm:h-80 sm:w-80"
          style={{ x: portraitGlowX, y: portraitGlowY }}
          aria-hidden="true"
        />

        <div className="relative z-40 max-w-xl lg:absolute lg:right-0 lg:top-0 lg:max-w-[410px] lg:text-right xl:right-6 xl:max-w-[460px]">
          <motion.p
            className="inline-flex rounded-full border border-line bg-white/8 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-ink backdrop-blur"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.48, ease }}
          >
            Hey, I&apos;m Qrishun
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3 lg:justify-end"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.52, ease }}
          >
            <MagneticButton
              type="button"
              onClick={() => scrollToSection('projects')}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-canvas shadow-xl shadow-black/30 transition hover:-translate-y-0.5 hover:bg-copy hover:shadow-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-highlight"
            >
              View Projects
              <FiArrowUpRight
                className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </MagneticButton>
            <MagneticButton
              type="button"
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-5 py-3 text-sm font-medium text-ink shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-0.5 hover:border-highlight/30 hover:bg-white/12 hover:shadow-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-highlight"
            >
              Contact Me
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 mx-auto mt-8 flex min-h-[460px] max-w-[430px] items-end justify-center sm:min-h-[540px] lg:mt-20 lg:min-h-[610px] lg:max-w-[470px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="pointer-events-none absolute bottom-10 h-20 w-72 rounded-full bg-canvas/45 blur-2xl"
            aria-hidden="true"
          />
          <motion.img
            src="/images/qrishun-hero.png"
            alt="Qrishun Amik portrait for Q Designs"
            className="relative z-10 h-[460px] w-full object-contain object-bottom drop-shadow-[0_34px_42px_rgba(0,0,0,0.62)] sm:h-[540px] lg:h-[620px]"
            style={{ x: portraitX, rotate: portraitRotate }}
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.78, ease }}
          />
        </motion.div>

        <div
          className="hero-readability-gradient pointer-events-none relative left-1/2 z-20 -mt-40 h-40 w-screen -translate-x-1/2 sm:-mt-48 sm:h-48"
          aria-hidden="true"
        />

        <motion.h1
          className="hero-title relative z-40 mx-auto -mt-12 text-center text-[clamp(2.5rem,6.5vw,6rem)] font-semibold leading-[1.1] text-ink sm:-mt-16 lg:-mt-20"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.58, ease }}
        >
          Graphic <span className="editorial-accent">Designer</span>
        </motion.h1>

        <div className="relative z-30 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:absolute lg:inset-x-0 lg:inset-y-10 lg:mt-0 lg:block">
          {navItems.map((item) => (
            <DashboardNavCard key={item.sectionId} item={item} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default HeroDashboard
