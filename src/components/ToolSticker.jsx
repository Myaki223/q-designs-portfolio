import { motion, useReducedMotion } from 'motion/react'

function ToolSticker({ tool, compact = false, variants }) {
  const shouldReduceMotion = useReducedMotion()
  const Icon = tool.icon
  const hasLogo = Boolean(tool.logo)

  return (
    <motion.li
      variants={variants}
      className={`group flex items-center justify-center rounded-lg border border-line bg-white/[0.07] shadow-lg shadow-black/20 backdrop-blur transition hover:border-highlight/25 hover:bg-white/10 hover:shadow-xl hover:shadow-white/10 ${
        compact ? 'p-3' : 'p-4'
      }`}
      title={tool.name}
      aria-label={tool.name}
      role="img"
      whileHover={
        shouldReduceMotion
          ? undefined
          : { y: -5, scale: 1.04, rotate: compact ? 0 : -1 }
      }
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-lg ${
          hasLogo
            ? 'bg-canvas/45'
            : tool.iconBackground || `bg-gradient-to-br ${tool.tone} text-ink`
        } shadow-lg shadow-black/20 transition duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:drop-shadow-[0_0_16px_rgba(var(--studio-rgb),0.154)] ${
          compact ? 'h-11 w-11' : 'h-14 w-14'
        }`}
      >
        {hasLogo ? (
          <img
            src={tool.logo}
            alt=""
            className={`grayscale ${compact ? 'h-8 w-8' : 'h-10 w-10'}`}
            aria-hidden="true"
          />
        ) : (
          <Icon
            className={`${compact ? 'h-6 w-6' : 'h-7 w-7'} ${
              tool.iconGlow || ''
            }`}
            style={tool.color ? { color: tool.color } : undefined}
            aria-hidden="true"
          />
        )}
      </span>
    </motion.li>
  )
}

export default ToolSticker
