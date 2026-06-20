export const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId)

  if (!section) {
    return
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  const offset = -104

  if (window.__qDesignsLenis && !prefersReducedMotion) {
    window.__qDesignsLenis.scrollTo(section, {
      offset,
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    })
    return
  }

  const top = section.getBoundingClientRect().top + window.scrollY + offset

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  })
}
