function CreativeBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030712]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 animate-soft-background-pan opacity-95"
        style={{
          background:
            'radial-gradient(ellipse at 78% 8%, rgba(96, 165, 250, 0.34) 0%, rgba(30, 64, 175, 0.18) 24%, transparent 48%), radial-gradient(ellipse at 8% 68%, rgba(34, 211, 238, 0.16) 0%, rgba(7, 17, 31, 0.62) 34%, transparent 58%), radial-gradient(ellipse at 92% 78%, rgba(147, 197, 253, 0.16) 0%, transparent 48%), linear-gradient(135deg, #030712 0%, #07111F 36%, #0B1628 68%, #111827 100%)',
          backgroundSize: '170% 170%',
        }}
      />

      <div
        className="animate-atmosphere-drift absolute left-[10%] top-[18%] h-72 w-72 rounded-full bg-sky-300/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-atmosphere-drift absolute bottom-[8%] right-[8%] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl [animation-delay:-10s]"
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

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.2)_52%,rgba(0,0,0,0.84)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#030712]/80 to-transparent" />
    </div>
  )
}

export default CreativeBackground
