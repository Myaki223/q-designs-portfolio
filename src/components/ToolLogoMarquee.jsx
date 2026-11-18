import { toolCategories } from '../data/tools.js'

const tools = toolCategories.flatMap((category) => category.tools)

function ToolIcon({ tool, duplicate = false }) {
  const Icon = tool.icon

  if (!tool.logo && !Icon) {
    return null
  }

  return (
    <span
      role={duplicate ? undefined : 'img'}
      aria-label={duplicate ? undefined : tool.name}
      title={tool.name}
      className="group/logo flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-[var(--hud-line)] bg-[#0b1530]/70 text-accent-soft/80 transition duration-300 hover:-translate-y-1 hover:border-cyan hover:text-cyan hover:shadow-[0_0_18px_rgba(125,227,255,0.25)] sm:h-14 sm:w-14"
    >
      {tool.logo ? (
        <img
          src={tool.logo}
          alt=""
          className="h-7 w-7 grayscale transition duration-300 group-hover/logo:drop-shadow-[0_0_12px_rgba(var(--studio-rgb),0.231)] sm:h-8 sm:w-8"
          aria-hidden="true"
        />
      ) : (
        <Icon
          className={`h-5 w-5 transition duration-300 group-hover/logo:drop-shadow-[0_0_12px_rgba(var(--studio-rgb),0.231)] sm:h-6 sm:w-6 ${
            tool.iconGlow || ''
          }`}
          aria-hidden="true"
        />
      )}
    </span>
  )
}

function ToolLogoSet({ duplicate = false }) {
  return (
    <div
      className="flex shrink-0 items-center gap-4 px-2"
      aria-hidden={duplicate ? 'true' : undefined}
    >
      {tools.map((tool) => (
        <ToolIcon
          key={`${duplicate ? 'duplicate-' : ''}${tool.name}`}
          tool={tool}
          duplicate={duplicate}
        />
      ))}
    </div>
  )
}

function ToolLogoMarquee() {
  return (
    <div
      className="tool-logo-marquee hud-panel mt-12 overflow-hidden py-4"
      style={{
        maskImage:
          'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}
      aria-label="Tools used by Q Designs"
    >
      <div className="animate-tool-logo-marquee flex w-max items-center">
        <ToolLogoSet />
        <ToolLogoSet duplicate />
      </div>
    </div>
  )
}

export default ToolLogoMarquee
