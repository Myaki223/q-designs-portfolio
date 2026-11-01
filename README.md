# Q Designs Portfolio

A creative graphic design portfolio website for Qrishun Amik, built with React, Vite, Tailwind CSS, Motion for React, and interactive UI components.

## Overview

Q Designs Portfolio is a cinematic, monochrome portfolio focused on graphic design work, selected project showcases, and creative tools. It highlights real design categories such as bid layouts, social media posting, mockups, banners, and branding.

## Features

- Monochrome Q Designs interface with full-color project artwork
- Creative hero section with portrait and floating navigation cards
- Selected Works sliding carousel
- Multiple images per project
- Project detail modal with larger previews and captions
- Hover image preview marquee
- Logo-only tool marquee
- Interactive Creative Toolbox
- Lenis smooth scrolling
- Active navbar highlight while scrolling
- Copy Email interaction
- Responsive design

## Tech Stack

- React
- Vite
- Tailwind CSS
- Motion for React
- Lenis
- React Icons
- React Bits-inspired SpotlightCard component

## Project Structure

```text
q-designs-portfolio/
├── public/
│   ├── icons/
│   └── images/
├── src/
│   ├── components/
│   ├── data/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
└── vite.config.js
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

## Website intro

The interface palette lives in the Tailwind v4 `@theme` block in `src/styles.css`.
Use `canvas`, `panel`, `surface`, `ink`, `copy`, `muted`, `line`, and `highlight`
color utilities for new UI. The `surface-glass` utilities and RGB lighting tokens
keep translucent surfaces and moving studio lights neutral. Grayscale filters
apply only to software logos; the portrait and project imagery retain their original colors.

The full-screen intro uses ReactDrops' Liquid Glass Logo from
https://reactdrops.dev/r/liquid-glass-logo.json and the existing
`public/images/qf-design-logo.png` asset in its original colors. It runs on every
page load with `ending="logo"`, then holds for 500 ms and fades for 600 ms.
Its configurable tile is neutral charcoal. The original shader's chromatic
refraction is intentionally retained rather than desaturating the WebGL canvas.

`src/components/WebsiteLoader.jsx` handles page readiness, scroll locking,
interaction blocking, and a failure-only timeout. The renderer's shaders,
physics, timing, and fitting are unchanged. The only integration additions to
the installed component are an optional `onComplete` callback after the final
composite frame and fallback-image load/error callbacks. Keep these hooks when
updating the registry files. The upstream license is retained in
`src/components/ReactDrops-LICENSE.txt`.

Run `pnpm test` with Node.js 24+ for completion, pause/replay, reduced-motion,
failed-image, unavailable-WebGL, and disposal checks. Use `pnpm build` for the
production bundle. Check the real WebGL visuals in the browser on refresh.

## Vercel Deployment Settings

- Framework Preset: Vite
- Install Command: npm install
- Build Command: npm run build
- Output Directory: dist

## Author

Qrishun Amik
