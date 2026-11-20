// Runs inside a page on the Vite dev server origin. Encodes WebP derivatives
// with the browser's canvas encoder and posts them to the local receiver.
window.__enc = { done: 0, total: 0, errors: [], manifest: {}, finished: false }
;(async () => {
  const P = '/images/projects/'
  const big = [800, 1600, 2400]
  const jobs = [
    // key, source, crop [x,y,w,h] or null, widths, quality
    ['boelou/static-ad', P + 'boelou/boelou-static-ad.png', null, [640, 1080, 1600], 0.88],
    ['revere-estates/social-post', P + 'revere-estates/revere-estates-social-media.png', null, [640, 1080, 1600], 0.88],
    ['aersoak/range', P + 'branding/aersoak-presentation.png', [0, 830, 3146, 817], big, 0.84],
    ['aersoak/label', P + 'branding/aersoak-presentation.png', [0, 0, 3146, 818], big, 0.88],
    ['astova/dark-range', P + 'branding/astova-dark-presentation.png', [0, 815, 2291, 815], [800, 1600, 2291], 0.84],
    ['astova/light-range', P + 'branding/astova-light-presentation.png', [0, 815, 2291, 815], [800, 1600, 2291], 0.84],
    ['astova/dark-front', P + 'branding/astova-dark-presentation.png', [800, 0, 700, 800], [480, 700], 0.9],
    ['astova/light-front', P + 'branding/astova-light-presentation.png', [800, 0, 700, 800], [480, 700], 0.9],
    ['astova/dark-facts', P + 'branding/astova-dark-presentation.png', [0, 0, 800, 665], [480, 800], 0.9],
    ['bellows/range', P + 'branding/branding-1.jpg', [0, 1385, 3508, 1096], big, 0.84],
    ['bellows/label', P + 'branding/branding-1.jpg', [0, 0, 3508, 1352], big, 0.88],
    ['streamingmeme/slide-1', P + 'streamingmeme/streamingmeme-slide-1.png', [0, 0, 4500, 4500], [640, 1080, 1600], 0.84],
    ['streamingmeme/slide-2', P + 'streamingmeme/streamingmeme-slide-2.png', [0, 0, 4500, 4500], [640, 1080, 1600], 0.84],
    ['streamingmeme/slide-3', P + 'streamingmeme/streamingmeme-slide-3.png', [0, 0, 4500, 4500], [640, 1080, 1600], 0.84],
    ...Array.from({ length: 11 }, (_, i) => [`pilar/banner-${i + 1}`, `${P}banner/banner-${i + 1}.png`, null, [640, 1200, 1920], 0.82]),
    ...Array.from({ length: 7 }, (_, i) => [`pilar/social-${i + 1}`, `${P}social-media-posting/social-${i + 1}.jpg`, null, [640, 1080, 1600], 0.84]),
    ['pilar/polo', P + 'mockup/mockup-8.png', null, big, 0.84],
    ['pilar/jersey-navy', P + 'mockup/mockup-9.png', null, big, 0.84],
    ['pilar/jersey-white', P + 'mockup/mockup-10.png', null, big, 0.84],
    ['driven/classics', P + 'mockup/mockup-4.png', null, big, 0.84],
    ['driven/touge', P + 'mockup/mockup-5.png', null, big, 0.84],
    ['driven/offroad', P + 'mockup/mockup-7.png', null, big, 0.84],
    ['driven/nail', P + 'mockup/mockup-3.png', null, big, 0.84],
    ...[2, 3, 4, 5, 7].map((n) => [`jci/board-${n}`, `${P}bid/bid-${n}.png`, null, [640, 1200, 2048], 0.86]),
    ['site/portrait', '/images/qrishun-hero.png', null, [480, 800, 1200], 0.86],
    ['site/logo', '/images/qf-design-logo.png', null, [160, 320], 0.9],
  ]
  window.__enc.total = jobs.length
  const post = (path, body) =>
    fetch('http://127.0.0.1:4310/save?path=' + encodeURIComponent(path), { method: 'POST', body })
      .then((r) => { if (!r.ok) throw new Error('save failed ' + path) })

  for (const [key, src, crop, widths, quality] of jobs) {
    try {
      const blob = await (await fetch(src)).blob()
      const full = await createImageBitmap(blob)
      const [sx, sy, sw, sh] = crop || [0, 0, full.width, full.height]
      full.close()
      const files = []
      for (const target of widths) {
        const w = Math.min(target, sw)
        if (files.some((f) => f.w === w)) continue
        const h = Math.round((sh * w) / sw)
        const bmp = await createImageBitmap(blob, sx, sy, sw, sh, {
          resizeWidth: w, resizeHeight: h, resizeQuality: 'high',
        })
        const canvas = new OffscreenCanvas(w, h)
        canvas.getContext('2d').drawImage(bmp, 0, 0)
        bmp.close()
        const out = await canvas.convertToBlob({ type: 'image/webp', quality })
        const path = `${key}-${w}.webp`
        await post(path, out)
        files.push({ w, path: '/images/optimized/' + path, bytes: out.size })
      }
      window.__enc.manifest[key] = { width: sw, height: sh, source: src, files }
    } catch (error) {
      window.__enc.errors.push(key + ': ' + error.message)
    }
    window.__enc.done++
  }
  await post('manifest.json', JSON.stringify(window.__enc.manifest, null, 2))
  window.__enc.finished = true
})()
'started'
