// ============================================================
// CapitalCode video pages — a tiny Cloudflare Worker ("the doorman").
// One permanent private page per video folder:
//   https://capitalcode-watch.<sub>.workers.dev/p/<kind>/<folder>?k=<code>
// The page shows the video (with switchable captions), its thumbnails (each with a
// Download button), titles, description and tags. Files inside the page are served at
//   /f/<kind>/<folder>/<file>?k=<code>[&dl=1]   (dl=1 = download instead of open)
// The code is HMAC-SHA256(LINK_SECRET, "<kind>/<folder>"), first 32 hex characters.
// Old single-video links /v/<key>?k=HMAC(key) keep working. The bucket stays private.
// ============================================================
const enc = new TextEncoder()
const TYPES = { mp4: 'video/mp4', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', txt: 'text/plain; charset=utf-8', srt: 'text/plain; charset=utf-8', md: 'text/plain; charset=utf-8', vtt: 'text/vtt; charset=utf-8' }

async function codeFor(secret, s) {
  const k = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', k, enc.encode(s)))
  return [...sig].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32)
}
function same(a, b) { if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0 }
const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]))
const enc1 = (p) => p.split('/').map(encodeURIComponent).join('/')

function parseRange(h, size) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(h || '')
  if (!m) return null
  let start = m[1] === '' ? null : Number(m[1]), end = m[2] === '' ? null : Number(m[2])
  if (start === null && end === null) return null
  if (start === null) { start = Math.max(0, size - end); end = size - 1 } else if (end === null || end >= size) end = size - 1
  if (start > end || start >= size) return 'bad'
  return { offset: start, length: end - start + 1 }
}

// # stream one object (with Range support for video seeking); dl = force download
async function serve(env, request, key, dl) {
  const head = await env.VIDEOS.head(key)
  if (!head) return new Response('Not found', { status: 404 })
  const ext = key.split('.').pop().toLowerCase(), size = head.size, file = key.split('/').pop()
  const headers = new Headers({ 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Accept-Ranges': 'bytes', 'Cache-Control': 'private, max-age=3600',
    'Content-Disposition': `${dl ? 'attachment' : 'inline'}; filename*=UTF-8''${encodeURIComponent(file)}` })
  if (request.method === 'HEAD') { headers.set('Content-Length', String(size)); return new Response(null, { status: 200, headers }) }
  const range = parseRange(request.headers.get('range'), size)
  if (range === 'bad') return new Response('Range not satisfiable', { status: 416, headers: { 'Content-Range': `bytes */${size}` } })
  if (range) {
    const obj = await env.VIDEOS.get(key, { range })
    headers.set('Content-Range', `bytes ${range.offset}-${range.offset + range.length - 1}/${size}`); headers.set('Content-Length', String(range.length))
    return new Response(obj.body, { status: 206, headers })
  }
  const obj = await env.VIDEOS.get(key); headers.set('Content-Length', String(size))
  return new Response(obj.body, { status: 200, headers })
}
const text = async (env, key) => { const o = await env.VIDEOS.get(key); return o ? await o.text() : '' }

// # the video page
async function page(env, folder, k) {
  const listed = await env.VIDEOS.list({ prefix: folder + '/' })
  const objs = listed.objects.filter((o) => !o.key.slice(folder.length + 1).startsWith('_job/'))
  const files = objs.map((o) => o.key.slice(folder.length + 1))
  // # only the NEWEST thumbnail is shown: the image file uploaded most recently in this folder.
  //   Uploading a redrawn cover makes it appear here automatically — no rebuild needed.
  const imgs = objs.filter((o) => /\.(jpg|jpeg|png)$/i.test(o.key)).sort((a, b) => new Date(b.uploaded) - new Date(a.uploaded))
  const thumbs = imgs.length ? [imgs[0].key.slice(folder.length + 1)] : []
  const video = files.find((f) => f.endsWith('.mp4')), caps = files.includes('captions.srt')
  const titles = (await text(env, `${folder}/titles.txt`)).trim(), desc = (await text(env, `${folder}/description.txt`)).trim(), tags = (await text(env, `${folder}/tags.txt`)).trim()
  const url = (f, dl) => `/f/${enc1(folder)}/${enc1(f)}?k=${k}${dl ? '&dl=1' : ''}`
  const name = folder.split('/')[1].replace(/_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}$/, '')
  const block = (h, body) => body ? `<section><h2>${h}</h2>${body}</section>` : ''
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(name)}</title>
<style>:root{--bg:#F8EFDF;--card:#FFFDF8;--ink:#16294A;--muted:#5C6F8E;--accent:#2E5C9A}@media (prefers-color-scheme:dark){:root{--bg:#0E1B33;--card:#16294A;--ink:#F0EAE1;--muted:#C2B9B1;--accent:#5BCBFF}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 system-ui,-apple-system,Segoe UI,sans-serif}main{max-width:1100px;margin:0 auto;padding:16px}
h1{font-size:26px;margin:8px 0 14px}h2{font-size:15px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin:0 0 10px}section{background:var(--card);border-radius:14px;padding:16px;margin:14px 0}
video{width:100%;border-radius:12px;background:#000}.thumbs{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}.thumbs figure{margin:0}.thumbs img{width:100%;border-radius:10px;display:block}
a.btn{display:inline-block;margin-top:8px;padding:8px 14px;border-radius:999px;background:var(--accent);color:#fff;text-decoration:none;font-weight:600;font-size:14px}pre{white-space:pre-wrap;margin:0;font:inherit}.tag{display:inline-block;margin:3px;padding:4px 10px;border-radius:999px;border:1px solid var(--muted);font-size:14px}.row{display:flex;gap:10px;flex-wrap:wrap}</style></head>
<body><main><h1>${esc(name)}</h1>
${video ? `<section><video controls playsinline preload="metadata" ${thumbs[0] ? `poster="${url(thumbs[0])}"` : ''} src="${url(video)}">${caps ? `<track kind="captions" srclang="en" label="English" src="/c/${enc1(folder)}?k=${k}">` : ''}</video>
<div class="row"><a class="btn" href="${url(video, true)}">Download video</a>${caps ? `<a class="btn" href="${url('captions.srt', true)}">Download captions</a>` : ''}</div></section>` : ''}
${block('Thumbnail', thumbs.length ? `<figure style="margin:0;max-width:720px"><img style="width:100%;border-radius:10px;display:block" src="${url(thumbs[0])}" alt="thumbnail"><a class="btn" href="${url(thumbs[0], true)}">Download thumbnail</a></figure>` : '<p>No thumbnail yet.</p>')}
${block('Titles', titles ? `<pre>${esc(titles)}</pre>` : '')}
${block('Description', desc ? `<pre>${esc(desc)}</pre>` : '')}
${block('Tags', tags ? tags.split(/,|\n/).map((t) => t.trim()).filter(Boolean).map((t) => `<span class="tag">${esc(t)}</span>`).join('') : '')}
</main></body></html>`
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url), k = url.searchParams.get('k') || ''
    const path = decodeURIComponent(url.pathname)
    const deny = () => new Response('Not allowed', { status: 403 })
    // # /p/<kind>/<folder>  → the page
    if (path.startsWith('/p/')) {
      const folder = path.slice(3).replace(/\/$/, '')
      if (folder.split('/').length !== 2 || !same(k, await codeFor(env.LINK_SECRET, folder))) return deny()
      return new Response(await page(env, folder, k), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store' } })
    }
    // # /f/<kind>/<folder>/<file>  → a file from that folder
    if (path.startsWith('/f/')) {
      const parts = path.slice(3).split('/'), folder = parts.slice(0, 2).join('/'), file = parts.slice(2).join('/')
      if (parts.length < 3 || file.startsWith('_job/') || !same(k, await codeFor(env.LINK_SECRET, folder))) return deny()
      return serve(env, request, `${folder}/${file}`, url.searchParams.get('dl') === '1')
    }
    // # /c/<kind>/<folder>  → captions.srt converted to WebVTT for the player
    if (path.startsWith('/c/')) {
      const folder = path.slice(3).replace(/\/$/, '')
      if (!same(k, await codeFor(env.LINK_SECRET, folder))) return deny()
      const srt = await text(env, `${folder}/captions.srt`)
      const vtt = 'WEBVTT\n\n' + srt.replace(/\r/g, '').replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, '$1.$2')
      return new Response(vtt, { headers: { 'Content-Type': 'text/vtt; charset=utf-8', 'Cache-Control': 'private, max-age=3600' } })
    }
    // # /v/<key>  → old single-video links
    if (path.startsWith('/v/')) {
      const key = path.slice(3)
      if (!key.endsWith('.mp4') || !same(k, await codeFor(env.LINK_SECRET, key))) return deny()
      return serve(env, request, key, false)
    }
    return new Response('Not found', { status: 404 })
  },
}
