# Image derivatives

Originals live in `public/images/projects/` and are never modified. The site
loads WebP derivatives from `public/images/optimized/`, described by
`src/data/image-manifest.json` (source crop size + available widths).

No native encoder is required: the derivatives are encoded with the browser's
own canvas WebP encoder.

1. Start the dev server: `npm run dev` (serves `public/` on its origin).
2. Start the receiver, which writes files into `public/images/optimized/`:
   `node scripts/optimize-images/receiver.mjs public/images/optimized`
3. Open any page on the dev server in Chrome/Edge, then paste the contents of
   `encode-jobs.js` into the DevTools console. Watch `window.__enc` until
   `finished` is `true` and `errors` is empty.
4. Build the site manifest: `node scripts/optimize-images/build-manifest.mjs`

To add or change an image, edit the `jobs` list in `encode-jobs.js`:
`[key, sourcePath, crop [x, y, w, h] or null, widths, quality]`. Crops are in
source pixels and are used for packaging detail views (for example, the label
flat versus the container row of one presentation board).
