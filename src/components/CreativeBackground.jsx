function CreativeBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-canvas"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 animate-soft-background-pan opacity-95"
        style={{
          background:
            'radial-gradient(ellipse at 78% 8%, rgba(var(--studio-rgb),0.121) 0%, rgba(var(--studio-rgb),0.066) 24%, transparent 48%), radial-gradient(ellipse at 8% 68%, rgba(var(--studio-rgb),0.055) 0%, rgba(0, 0, 0, 0.62) 34%, transparent 58%), radial-gradient(ellipse at 92% 78%, rgba(var(--studio-rgb),0.055) 0%, transparent 48%), linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.012) 36%, rgba(255, 255, 255, 0.02) 68%, rgba(255, 255, 255, 0.03) 100%)',
          backgroundSize: '170% 170%',
        }}
      />

      <div
        className="animate-atmosphere-drift absolute left-[10%] top-[18%] h-72 w-72 rounded-full bg-silver/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-atmosphere-drift absolute bottom-[8%] right-[8%] h-96 w-96 rounded-full bg-silver/10 blur-3xl [animation-delay:-10s]"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-[0.13] mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
          backgroundSize: '3px 3px',
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_52%,rgba(0,0,0,0.84)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
    </div>
  )
}

export default CreativeBackground
