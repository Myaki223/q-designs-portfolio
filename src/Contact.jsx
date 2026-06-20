import { useState } from 'react'
import { motion } from 'motion/react'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { FiCheck, FiCopy, FiMail } from 'react-icons/fi'
import MagneticButton from './components/ui/MagneticButton.jsx'

const emailAddress = 'qrishunamik55@gmail.com'

const contactLinks = [
  {
    label: 'Email Me',
    href: `mailto:${emailAddress}`,
    icon: FiMail,
    tone: 'from-blue-600 to-sky-500',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/qrishun-amik-68880933a/',
    icon: FaLinkedinIn,
    tone: 'from-blue-600 to-sky-500',
    external: true,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/qrishun.amik.9/',
    icon: FaFacebookF,
    tone: 'from-blue-500 to-indigo-500',
    external: true,
  },
]

function ContactLink({ item }) {
  const Icon = item.icon

  return (
    <MagneticButton
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.07] p-4 text-[#CBD5E1] shadow-lg shadow-black/25 backdrop-blur transition hover:-translate-y-1 hover:border-sky-200/25 hover:bg-white/10 hover:text-white hover:shadow-xl hover:shadow-blue-950/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.tone} text-white shadow-md shadow-black/20`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="font-semibold">{item.label}</span>
    </MagneticButton>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = emailAddress
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact" className="scroll-mt-28 px-6 py-24">
      <motion.div
        className="mx-auto max-w-6xl overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(14,26,43,0.9),rgba(17,34,58,0.72),rgba(7,17,31,0.86))] p-6 shadow-2xl shadow-black/45 backdrop-blur-xl sm:p-8 lg:p-10"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-sky-300/25 bg-white/10 px-4 py-2 text-sm font-black uppercase text-sky-100 shadow-sm shadow-black/20">
              Let&apos;s create
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
              Got a design idea? Let&apos;s make it visually unforgettable.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#CBD5E1]">
              Send your poster, brand, packaging, social media, or digital
              content idea to Q Designs and let&apos;s shape it into something
              bold, clean, memorable, and ready to share.
            </p>
            <p className="mt-5 break-all text-sm font-semibold text-white/60">
              Email: {emailAddress}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {contactLinks.map((item) => (
              <ContactLink key={item.label} item={item} />
            ))}

            <MagneticButton
              type="button"
              onClick={copyEmail}
              aria-label="Copy Qrishun Amik email address"
              className="group relative flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.07] p-4 text-[#CBD5E1] shadow-lg shadow-black/25 backdrop-blur transition hover:-translate-y-1 hover:border-sky-200/25 hover:bg-white/10 hover:text-white hover:shadow-xl hover:shadow-blue-950/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-950 to-blue-800 text-white shadow-md shadow-black/20">
                {copied ? (
                  <FiCheck className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <FiCopy className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
              <span className="font-semibold">
                {copied ? 'Email copied!' : 'Copy Email'}
              </span>
              {copied && (
                <span
                  className="absolute -top-3 right-3 rounded-full border border-white/10 bg-white px-3 py-1 text-xs font-black text-slate-950 shadow-lg shadow-black/20"
                  role="status"
                  aria-live="polite"
                >
                  Email copied!
                </span>
              )}
            </MagneticButton>

          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
