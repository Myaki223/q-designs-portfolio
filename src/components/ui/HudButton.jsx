// Chamfered HUD button (styles: .hud-btn in src/styles.css). Renders a link
// when `href` is set, otherwise a button. The outer element stays unclipped
// so the keyboard focus outline is visible.
function HudButton({ href, variant = 'secondary', disabled = false, className = '', children, ...props }) {
  const classes = `hud-btn ${variant === 'primary' ? 'hud-btn--primary' : ''} ${className}`
  const inner = (
    <span className="hud-btn__edge">
      <span className="hud-btn__fill">{children}</span>
    </span>
  )

  if (href) {
    return (
      <a href={href} className={classes} aria-disabled={disabled || undefined} {...props}>
        {inner}
      </a>
    )
  }

  return (
    <button type="button" className={classes} disabled={disabled} aria-disabled={disabled || undefined} {...props}>
      {inner}
    </button>
  )
}

export default HudButton
