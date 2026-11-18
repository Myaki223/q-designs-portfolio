// Local-only receiver: writes encoded images posted from the browser into
// public/images/optimized. Paths are confined to that directory.
import { createServer } from 'node:http'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve, sep } from 'node:path'

const root = resolve(process.argv[2])
const send = (res, code, body) => {
  res.writeHead(code, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'text/plain',
  })
  res.end(body)
}

createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, '')
  const url = new URL(req.url, 'http://x')
  const rel = url.searchParams.get('path') || ''
  const target = resolve(join(root, rel))
  if (req.method !== 'POST' || !target.startsWith(root + sep) || !/\.(webp|json)$/.test(target)) {
    return send(res, 400, 'bad request')
  }
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, Buffer.concat(chunks))
  send(res, 200, 'ok')
}).listen(4310, '127.0.0.1', () => console.log('receiver ready', root))
