// Four HUD corner brackets for any `relative` container. They brighten to
// cyan when the container (or a `.group` ancestor) is hovered or focused, or
// when it has `.hud-panel--active`. Use `inset` inside `overflow-hidden`
// containers so the brackets sit just inside the edge instead of being clipped.
// Decorative: hidden from assistive technology and ignores the pointer.
function HudCorners({ corners = ['tl', 'tr', 'bl', 'br'], inset = false }) {
  return corners.map((corner) => (
    <span
      key={corner}
      className={`hud-corner hud-corner--${corner} ${inset ? 'hud-corner--inset' : ''}`}
      aria-hidden="true"
    />
  ))
}

export default HudCorners
