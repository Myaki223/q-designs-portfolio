import { useEffect, useRef, useState } from 'react'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { FiArrowUpRight, FiCheck, FiCopy, FiMail } from 'react-icons/fi'
import SectionHeading from './components/ui/SectionHeading.jsx'
import { contact } from './data/site.js'
import { useOffscreenPause } from './utils/useOffscreenPause.js'

const actions = [
  { label: 'Email Me', href: `mailto:${contact.email}`, icon: FiMail },
  { label: 'LinkedIn', href: contact.linkedin, icon: FaLinkedinIn, external: true },
  { label: 'Facebook', href: contact.facebook, icon: FaFacebookF, external: true },
]

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    const ok = document.execCommand('copy')
    field.remove()
    return ok
  }
}

// Transmission interface: an open closing section with signal rings and
// light trails behind a large headline and email, and four text-and-icon
// actions in the shared `.hud-action` style.
function Contact() {
  // null = idle, true = copied, false = the browser refused clipboard access
  const [copied, setCopied] = useState(null)
  const timer = useRef(null)
  const sectionRef = useRef(null)
  useOffscreenPause(sectionRef)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copyEmail = async () => {
    const ok = await copyText(contact.email)
    setCopied(ok)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(null), ok ? 2400 : 6000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative scroll-mt-28 overflow-hidden px-4 py-28 sm:px-6 lg:py-40"
      aria-labelledby="contact-title"
    >
      {/* Signal rings + light trails (decorative) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.08] blur-3xl" />
        {[0, 1.9, 3.8, 5.7].map((delay) => (
          <span key={delay} className="tx-ring h-[44rem] w-[44rem]" style={{ '--d': `${delay}s` }} />
        ))}
        <span className="tx-ring h-[24rem] w-[24rem] !animate-none !opacity-40 ![transform:translate(-50%,-50%)]" />
        {[18, 34, 66, 82].map((top, i) => (
          <span key={top} className="tx-trail absolute inset-x-0 hidden sm:block" style={{ top: `${top}%`, '--d': `${i * -1.5}s` }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <SectionHeading id="contact-title" index="05" label="Let’s create" align="center">
          <span className="block text-[clamp(2.4rem,6vw,4.75rem)] leading-[1.05]">
            Got a design idea? Let&apos;s make it{' '}
            <span className="editorial-accent font-normal">visually unforgettable.</span>
          </span>
        </SectionHeading>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-copy sm:text-lg">
          Send your poster, brand, packaging, social media, or digital content
          idea to Q Designs and let&apos;s shape it into something bold, clean,
          memorable, and ready to share.
        </p>

        {/* Prominent email */}
        <div className="mt-12">
          <p className="eyebrow flex items-center justify-center gap-2 text-muted">
            <span className="hud-pulse h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" aria-hidden="true" />
            Open channel
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="hud-action mt-3 !min-h-0 break-all pb-3 font-mono text-[clamp(1.1rem,3.6vw,2.4rem)] font-medium tracking-[0.02em] text-ink [&::after]:!bottom-0"
          >
            {contact.email}
          </a>
        </div>

        {/* Actions */}
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {actions.map(({ label, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="hud-action"
              >
                <Icon className="hud-action__icon h-4 w-4" aria-hidden="true" />
                {label}
                <FiArrowUpRight className="hud-action__arrow h-4 w-4" aria-hidden="true" />
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          ))}
          <li>
            <button type="button" onClick={copyEmail} className="hud-action cursor-pointer">
              {copied === true ? (
                <FiCheck className="hud-action__icon h-4 w-4 !text-cyan" aria-hidden="true" />
              ) : (
                <FiCopy className="hud-action__icon h-4 w-4" aria-hidden="true" />
              )}
              {copied === true ? 'Email copied' : 'Copy Email'}
            </button>
          </li>
        </ul>

        {/* Accessible confirmation */}
        <p role="status" aria-live="polite" className={`eyebrow mt-4 min-h-5 text-cyan transition-opacity ${copied === null ? 'opacity-0' : 'opacity-100'}`}>
          {copied === true && 'Email copied to clipboard'}
          {copied === false && `Couldn’t copy. The address is ${contact.email}`}
        </p>
      </div>
    </section>
  )
}

export default Contact
