// Site-wide HUD environment behind every section: deep black-navy base,
// slowly drifting blue light, a faint fixed holographic grid, and an edge
// vignette. Sections stay transparent over it, so the page reads as one
// continuous interface. Decorative and click-through.
function CreativeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#04060d]" aria-hidden="true">
      {/* Navy atmosphere */}
      <div
        className="absolute inset-0 animate-soft-background-pan"
        style={{
          background:
            'radial-gradient(ellipse at 80% 10%, rgba(30, 58, 138, 0.28) 0%, transparent 50%), radial-gradient(ellipse at 10% 70%, rgba(16, 32, 80, 0.4) 0%, transparent 55%), radial-gradient(ellipse at 90% 85%, rgba(20, 40, 100, 0.25) 0%, transparent 50%)',
          backgroundSize: '170% 170%',
        }}
      />

      {/* Drifting blue light */}
      <div className="animate-atmosphere-drift absolute left-[8%] top-[20%] h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="animate-atmosphere-drift absolute bottom-[10%] right-[6%] h-96 w-96 rounded-full bg-cyan/[0.06] blur-3xl [animation-delay:-10s]" />

      {/* Holographic grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(91, 140, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(91, 140, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 85%)',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  )
}

export default CreativeBackground
