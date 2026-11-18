const links = [
  { label: 'Work', id: 'work' },
  { label: 'Services', id: 'services' },
  { label: 'Tools', id: 'tools' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

function Footer() {
  return (
    <footer className="relative">
      <span className="hud-hairline absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex flex-col gap-2">
          <p className="eyebrow flex items-center gap-2 text-copy">
            <span className="hud-pulse h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" aria-hidden="true" />
            Q Designs / Online
          </p>
          <p className="text-sm text-muted">© 2026 Qrishun Amik. All rights reserved.</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((link, index) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-cyan"
                >
                  <span className="text-accent-soft/50">{String(index + 1).padStart(2, '0')}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#top" className="hud-icon-btn self-start px-4 lg:self-auto">
          Back to top
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
