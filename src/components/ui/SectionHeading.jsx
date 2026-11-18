// Shared section heading: a mono index line ("02 / Design Focus") above the
// title, with a fading hairline. `align` is "left" or "center".
function SectionHeading({ id, index, label, children, align = 'left', size = 'lg', className = '' }) {
  const centered = align === 'center'
  const titleSize = size === 'sm' ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl lg:text-5xl'

  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <p className={`eyebrow flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        {centered && <span aria-hidden="true" className="hud-hairline hidden w-16 sm:block" />}
        <span className="text-cyan">{index}</span>
        <span aria-hidden="true" className="text-muted">/</span>
        {label}
        <span aria-hidden="true" className="hud-hairline hidden w-16 sm:block" />
      </p>
      <h2 id={id} className={`mt-4 font-semibold leading-[1.15] tracking-[-0.02em] text-ink ${titleSize}`}>
        {children}
      </h2>
    </div>
  )
}

export default SectionHeading
