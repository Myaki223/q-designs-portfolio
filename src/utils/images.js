import manifest from '../data/image-manifest.json'

// Resolves an optimized image key (see src/data/image-manifest.json) into the
// attributes a responsive <img> needs. Width/height describe the source crop,
// so the browser can reserve the right space before the file arrives.
export function getImage(key) {
  const entry = manifest[key]

  if (!entry) {
    throw new Error(`Unknown image key: ${key}`)
  }

  const files = [...entry.files].sort((a, b) => a[0] - b[0])

  return {
    width: entry.width,
    height: entry.height,
    src: files[Math.min(1, files.length - 1)][1],
    srcSet: files.map(([w, path]) => `${path} ${w}w`).join(', '),
    largest: files[files.length - 1][1],
    smallest: files[0][1],
  }
}
