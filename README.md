# Q Designs Portfolio

Portfolio website for Qrishun Amik, a graphic designer in Zamboanga City, built
with React, Vite, and Tailwind CSS.

## Overview

A single-page portfolio organized by brand and organization. Each project opens
as a full-screen case study at a shareable URL (`#work/<slug>`), with the
artwork first, followed by an overview, design notes, deliverables, and
curated gallery sections.

Projects, in order: Aersoak, StreamingMeme, Astova, Pilar College of Zamboanga
City, Bellows Labs, Driven Motorworks, JCI Zamboanga.

## Features

- Selected Works coverflow carousel: 3D side cards, autoplay (paused on hover,
  focus, open case study, and reduced motion), swipe, arrow keys, and dots;
  projects grouped by type (packaging, digital, institutional, apparel, boards)
- Case-study dialog: artwork-first layout, focus trap, Escape to close, focus
  return, background scroll lock, Back button support, next-project link
- Lightbox for uncropped, full-size viewing with arrow-key navigation
- Responsive WebP derivatives with `srcset`, explicit dimensions, and lazy loading
- No blocking intro: the hero renders as soon as the page loads
- HUD hero (`src/Hero.jsx`, `src/components/HeroHud.jsx`,
  `src/components/HeroBackdrop.jsx`): holographic perspective floor, circuit
  pathways with travelling light, full-width and in-frame scans, segmented and
  counter-rotating rings, illuminated nodes, interface labels (wide screens
  only), chamfered HUD buttons, a short "Initializing → Online" sequence after
  the logo intro, and four-layer mouse parallax. Simplified on phones; all
  ambient motion switches off under reduced motion.
- Studio effects from the original design: animated gradient background,
  cursor-following spotlight, portrait that leans toward the pointer, magnetic
  buttons, spotlight service cards, lifting project cards with an image-strip
  hover preview, reveal-on-scroll, and Lenis smooth scrolling (paused while a
  case study is open)
- Copy Email with a fallback and a live status message
- Respects `prefers-reduced-motion`

## Editing content

- Projects and their copy: `src/data/projects.js`. Copy describes only what the
  artwork shows; optional `role`, `brief`, `audience`, `year`, and
  `organization` fields render when filled in.
- Services, tools, and contact details: `src/data/site.js`
- Images: see `scripts/optimize-images/README.md`. Originals stay untouched in
  `public/images/projects/`; the site loads `public/images/optimized/`.

## Project Structure

```text
q-designs-portfolio/
├── public/
│   └── images/
│       ├── projects/      originals (not loaded by the site)
│       └── optimized/     WebP derivatives
├── scripts/optimize-images/
├── src/
│   ├── components/        ProjectDialog, Lightbox, ResponsiveImage
│   ├── data/              projects, site copy, image manifest
│   ├── utils/
│   ├── App.jsx            hash routing for case studies
│   └── styles.css         theme tokens
└── index.html
```

## How to Run Locally

```bash
npm install
npm run dev
```

## How to Build

```bash
npm run build
```

## HUD design system

Every section uses the same futuristic interface language. Reuse these
instead of writing one-off styles:

- **Tokens** (`src/styles.css`): `--color-accent` (#5B8CFF), `--color-accent-soft`,
  `--color-cyan`, `--color-navy`, `--font-mono` (IBM Plex Mono), plus
  `--hud-line`, `--hud-line-strong`, `--hud-glow`, `--hud-panel-bg`, `--hud-ease`.
- **CSS components** (in `@layer components`, so Tailwind utilities still win):
  `.hud-panel` (+ `--interactive`, `--active`), `.hud-panel-grid`, `.art-frame`,
  `.hud-tag` (+ `--accent`), `.hud-icon-btn` (+ `--primary`), `.hud-btn`
  (chamfered buttons), `.hud-hairline`, `.hud-link`, and the `eyebrow` utility.
  Hover, focus-visible, active, and disabled (`disabled` / `aria-disabled`)
  states are built in.
- **React helpers** (`src/components/ui`): `HudCorners` (corner brackets; use
  `inset` inside `overflow-hidden`), `HudButton` (link or button), and
  `SectionHeading` (mono "01 / Label" line + title).
- **Background**: `CreativeBackground` is the fixed site-wide environment
  (navy atmosphere, drifting light, holographic grid, vignette); sections stay
  transparent over it.

## Theme

The palette lives in the Tailwind v4 `@theme` block in `src/styles.css`
(`canvas`, `panel`, `surface`, `raised`, `ink`, `copy`, `muted`, `line`,
`line-strong`). Type is Geist with Newsreader italic accents.

## Entrance intro

`src/components/HudIntro.jsx` (styles: "Entrance intro" in `src/styles.css`)
plays a ~4.9s HUD power-on: rings assemble, a scan and light pulse pass
through, "QRISHUN AMIK" decodes, "CREATIVE SYSTEM ONLINE" appears, and the HUD
expands into the site while the hero's own entrance plays.

- Plays once per browser-tab session (`sessionStorage` key `qd-intro-played`);
  refreshes and in-page navigation in the same tab skip it.
- Never plays under `prefers-reduced-motion`.
- "Skip intro" button and Escape reveal the site immediately; a 6.5s failsafe
  always dismisses the overlay.
- The page underneath is `inert` while the intro runs, and loads normally.

The earlier Liquid Glass loader (`src/components/WebsiteLoader.jsx` and the
ReactDrops files) is kept but no longer mounted; its tests still run with
`npm test` (Node.js 24+).

## Vercel Deployment Settings

- Framework Preset: Vite
- Install Command: npm install
- Build Command: npm run build
- Output Directory: dist

## Author

Qrishun Amik
