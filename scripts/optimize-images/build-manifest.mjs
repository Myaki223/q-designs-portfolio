// Converts the manifest posted by encode-jobs.js into the compact form the
// site imports (src/data/image-manifest.json), then removes the raw file.
import { readFile, rm, writeFile } from 'node:fs/promises'

const raw = new URL('../../public/images/optimized/manifest.json', import.meta.url)
const out = new URL('../../src/data/image-manifest.json', import.meta.url)
const manifest = JSON.parse(await readFile(raw, 'utf8'))
const compact = {}

for (const [key, entry] of Object.entries(manifest)) {
  compact[key] = {
    width: entry.width,
    height: entry.height,
    files: entry.files.map((file) => [file.w, file.path]),
  }
}

await writeFile(out, JSON.stringify(compact, null, 1) + '\n')
await rm(raw)
console.log(`Wrote ${Object.keys(compact).length} entries to src/data/image-manifest.json`)
