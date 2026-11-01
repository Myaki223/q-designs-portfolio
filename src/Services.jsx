import { motion } from 'motion/react'
import { FiBox, FiImage, FiLayers, FiPenTool } from 'react-icons/fi'
import ToolLogoMarquee from './components/ToolLogoMarquee.jsx'
import SpotlightCard from './components/ui/SpotlightCard.jsx'
import { creativeServices } from './data/services.js'

function ServiceIcon({ type }) {
  const icons = {
    design: FiPenTool,
    brand: FiLayers,
    mockup: FiImage,
    social: FiImage,
    print: FiBox,
  }
  const Icon = icons[type] || FiPenTool

  return <Icon className="h-5 w-5" aria-hidden="true" />
}

function Services() {
  return (
    <section id="services" className="scroll-mt-28 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <h2 className="text-4xl font-semibold leading-[1.3] tracking-normal text-ink sm:text-5xl lg:text-6xl">
            Design Focus
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {creativeServices.map((service, index) => (
            <SpotlightCard
              key={service.title}
              spotlightColor={service.spotlightColor}
              className={`min-h-full rounded-lg border p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl ${
                service.featured
                  ? 'border-highlight/25 surface-glass-raised shadow-black/50 ring-1 ring-white/10'
                  : 'border-line surface-glass shadow-black/35'
              }`}
            >
              <motion.div
                className="flex h-full flex-col"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.42,
                  delay: index * 0.06,
                  ease: 'easeOut',
                }}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg text-sm font-medium shadow-sm ${
                    service.featured
                      ? 'bg-gradient-to-br from-neutral-600/80 to-neutral-600/70 text-ink shadow-black/40'
                      : 'bg-white/10 text-copy shadow-black/20 ring-1 ring-white/10'
                  }`}
                >
                  <ServiceIcon type={service.icon} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-copy">
                  {service.description}
                </p>

                {service.featured && (
                  <p className="mt-6 inline-flex w-fit rotate-[-1deg] rounded-full border border-highlight/25 bg-white/10 px-3 py-1 text-xs font-medium text-ink shadow-sm shadow-black/20">
                    Main Focus
                  </p>
                )}
              </motion.div>
            </SpotlightCard>
          ))}
        </div>

        <ToolLogoMarquee />
      </div>
    </section>
  )
}

export default Services
