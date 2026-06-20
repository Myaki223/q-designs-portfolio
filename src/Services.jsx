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
          <p className="text-sm font-black uppercase text-sky-300">
            Design Focus
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
            Creative Things I Design
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/70">
            A graphic-focused set of creative services for brands, schools,
            campaigns, products, and digital spaces that need stronger visuals.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {creativeServices.map((service, index) => (
            <SpotlightCard
              key={service.title}
              spotlightColor={service.spotlightColor}
              className={`min-h-full rounded-lg border p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl ${
                service.featured
                  ? 'border-sky-300/25 bg-[linear-gradient(135deg,rgba(14,26,43,0.9),rgba(30,58,138,0.72),rgba(14,26,43,0.86))] shadow-blue-950/50 ring-1 ring-white/10'
                  : 'border-white/10 bg-[linear-gradient(135deg,rgba(14,26,43,0.82),rgba(11,22,40,0.66),rgba(7,17,31,0.78))] shadow-black/35'
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
                  className={`flex h-12 w-12 items-center justify-center rounded-lg text-sm font-bold shadow-sm ${
                    service.featured
                      ? 'bg-gradient-to-br from-blue-500/80 to-sky-500/70 text-white shadow-blue-950/40'
                      : 'bg-white/10 text-[#CBD5E1] shadow-black/20 ring-1 ring-white/10'
                  }`}
                >
                  <ServiceIcon type={service.icon} />
                </div>

                <h3 className="mt-6 text-xl font-black text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#CBD5E1]">
                  {service.description}
                </p>

                {service.featured && (
                  <p className="mt-6 inline-flex w-fit rotate-[-1deg] rounded-full border border-sky-300/25 bg-white/10 px-3 py-1 text-xs font-black text-sky-100 shadow-sm shadow-black/20">
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
