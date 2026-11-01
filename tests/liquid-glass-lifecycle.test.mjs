import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'
import { test } from 'node:test'

// Exercise the real renderer lifecycle with a no-op graphics device. Browser
// visual checks cover the shaders; these checks cover when the page may unlock.
const sourceRoot = new URL('../src/components/', import.meta.url)
const asModule = (source) => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`
const shaders = asModule(await readFile(new URL('liquid-glass-logo-shaders.ts', sourceRoot), 'utf8'))
const source = await readFile(new URL('liquid-glass-logo-renderer.ts', sourceRoot), 'utf8')
const { createLiquidGlassLogoRenderer, liquidGlassLogoDefaults } = await import(asModule(
  stripTypeScriptTypes(source).replace("'./liquid-glass-logo-shaders'", JSON.stringify(shaders)),
))

function fixture(t, { reduced = false, webgl = true, brokenImage = false, ...tuning } = {}) {
  const frames = new Map()
  const events = []
  let nextFrame = 0
  let completions = 0
  let now = 100
  let disconnected = 0
  const gl = new Proxy({}, {
    get: (_, key) => {
      if (key === 'drawArrays') return () => events.push('draw')
      if (String(key).startsWith('get') || String(key).startsWith('create')) return () => ({})
      return /^[A-Z_0-9]+$/.test(key) ? 1 : () => {}
    },
  })
  const context = new Proxy({}, {
    get: (target, key) => target[key] ?? (key === 'measureText'
      ? () => ({ width: 100, actualBoundingBoxAscent: 50, actualBoundingBoxDescent: 10 })
      : () => {}),
  })
  const fakeCanvas = () => ({ width: 720, height: 480, getContext: () => context })
  const originals = new Map()
  const install = (key, value) => {
    originals.set(key, Object.getOwnPropertyDescriptor(globalThis, key))
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value })
  }
  install('window', { devicePixelRatio: 1, matchMedia: () => ({ matches: reduced, addEventListener() {}, removeEventListener() {} }) })
  install('document', { createElement: fakeCanvas, fonts: { load: async () => [] } })
  install('Image', class {
    naturalWidth = 100
    naturalHeight = 100
    set src(value) { queueMicrotask(() => brokenImage ? this.onerror() : this.onload()) }
  })
  install('getComputedStyle', () => ({ width: '720', height: '480' }))
  install('requestAnimationFrame', (callback) => { frames.set(++nextFrame, callback); return nextFrame })
  install('cancelAnimationFrame', (id) => frames.delete(id))
  class Observer { observe() {} disconnect() { disconnected++ } }
  install('ResizeObserver', Observer)
  install('IntersectionObserver', Observer)
  const renderer = createLiquidGlassLogoRenderer(
    { ...fakeCanvas(), getContext: () => webgl ? gl : null },
    { ...liquidGlassLogoDefaults, logoColor: 'original', ...tuning },
    undefined,
    () => { assert.equal(events.at(-1), 'draw'); completions++ },
  )
  t.after(() => {
    renderer?.dispose()
    for (const [key, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor)
      else delete globalThis[key]
    }
  })
  return {
    renderer,
    loaded: () => new Promise((resolve) => setImmediate(resolve)),
    step(count = 1) {
      for (let i = 0; i < count; i++) {
        now += 50
        const pending = [...frames.values()]
        frames.clear()
        pending.forEach((callback) => callback(now))
      }
    },
    get completions() { return completions },
    get pendingFrames() { return frames.size },
    get disconnected() { return disconnected },
  }
}

test('completes after the final logo frame, once, and can replay', async (t) => {
  const f = fixture(t)
  await f.loaded()
  f.step(35)
  assert.equal(f.completions, 0)
  f.step(5)
  assert.equal(f.completions, 1)
  assert.equal(f.pendingFrames, 0)
  f.renderer.seek(3)
  assert.equal(f.completions, 1)
  f.renderer.replay()
  f.step(40)
  assert.equal(f.completions, 2)
})

test('reduced motion completes on its static final frame', async (t) => {
  const f = fixture(t, { reduced: true })
  await f.loaded()
  assert.equal(f.completions, 1)
  f.step(3)
  assert.equal(f.completions, 1)
  assert.equal(f.pendingFrames, 0)
})

test('pausing does not complete the intro early', async (t) => {
  const f = fixture(t)
  await f.loaded()
  f.step(10)
  f.renderer.pause()
  f.step(100)
  assert.equal(f.completions, 0)
  f.renderer.play()
  f.step(40)
  assert.equal(f.completions, 1)
})

test('failed image loading still allows the renderer to finish', async (t) => {
  const f = fixture(t, { brokenImage: true })
  await f.loaded()
  f.step(40)
  assert.equal(f.completions, 1)
})

test('unavailable WebGL selects the original component image fallback', (t) => {
  assert.equal(fixture(t, { webgl: false }).renderer, null)
})

test('disposing during asset loading cancels frames and observers', async (t) => {
  const f = fixture(t)
  f.renderer.dispose()
  await f.loaded()
  f.step(100)
  assert.equal(f.completions, 0)
  assert.equal(f.pendingFrames, 0)
  assert.equal(f.disconnected, 2)
})
