// Make a permanent watch link for every video in the R2 archive and save it inside that video's folder as
//   watch-link.txt  (the link itself)   and   watch.html  (a page that plays the video when opened).
// Also writes output/watch-links.html on the laptop listing every video. Re-run any time; links never change.
// The link code is HMAC-SHA256(WATCH_LINK_SECRET, key) — the Worker checks the same thing. Secrets are never printed.
const fs = require('fs'), path = require('path'), crypto = require('crypto')
const ROOT = path.join(__dirname, '..', '..'), env = {}
for (const l of fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').split(/\r?\n/)) { const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/); if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '') }
const S3 = require(path.join(ROOT, 'node_modules/@aws-sdk/client-s3'))
const c = new S3.S3Client({ region: 'auto', endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, credentials: { accessKeyId: env.R2_ARCHIVE_ACCESS_KEY_ID, secretAccessKey: env.R2_ARCHIVE_SECRET_ACCESS_KEY }, requestChecksumCalculation: 'WHEN_REQUIRED' })
const B = env.R2_ARCHIVE_BUCKET, BASE = 'https://capitalcode-watch.pmzo-mm08.workers.dev'
const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]))
// page link for a whole video folder (player + newest thumbnail + titles + description + tags)
const pageFor = (folder) => `${BASE}/p/${folder.split('/').map(encodeURIComponent).join('/')}?k=${crypto.createHmac('sha256', env.WATCH_LINK_SECRET).update(folder).digest('hex').slice(0, 32)}`
const linkFor = (key) =>`${BASE}/v/${key.split('/').map(encodeURIComponent).join('/')}?k=${crypto.createHmac('sha256', env.WATCH_LINK_SECRET).update(key).digest('hex').slice(0, 32)}`
const put = async (key, text, type) => { const buf = Buffer.from(text, 'utf8'); await c.send(new S3.PutObjectCommand({ Bucket: B, Key: key, Body: buf, ContentLength: buf.length, ContentType: type, ContentMD5: crypto.createHash('md5').update(buf).digest('base64') })) }
module.exports = { linkFor, pageFor }
if (require.main === module) (async () => {
  const keys = []; let tok
  do { const r = await c.send(new S3.ListObjectsV2Command({ Bucket: B, ContinuationToken: tok })); for (const o of r.Contents || []) keys.push(o.Key); tok = r.NextContinuationToken } while (tok)
  const vids = keys.filter((k) => k.endsWith('.mp4') && !k.startsWith('shorts/_preview/'))
  // # test one link (right code plays, wrong code is refused) before writing anything
  const t = vids[0], tf = t.split('/').slice(0, 2).join('/')
  const ok = await fetch(pageFor(tf)), bad = await fetch(pageFor(tf).replace(/k=.{4}/, 'k=0000')), html = await ok.text()
  console.log(`test: right code → ${ok.status} (video ${html.includes('<video') ? 'yes' : 'no'}, thumbnail ${html.includes('Download thumbnail') ? 'yes' : 'no'}), wrong code → ${bad.status}`)
  if (ok.status !== 200 || bad.status !== 403) { console.log('test failed, nothing written'); return }
  const list = []
  for (const k of vids) {
    const folder = k.split('/').slice(0, 2).join('/'), name = folder.split('/')[1].replace(/_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}$/, ''), url = pageFor(folder)
    await put(`${folder}/watch-link.txt`, url + '\n', 'text/plain; charset=utf-8')
    await put(`${folder}/watch.html`, `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(name)}</title><meta http-equiv="refresh" content="0; url=${esc(url)}"></head><body style="font-family:system-ui;background:#0E1B33;color:#F0EAE1;padding:24px"><p>Opening <b>${esc(name)}</b>… If nothing happens, <a style="color:#5BCBFF" href="${esc(url)}">click here to watch</a>.</p></body></html>\n`, 'text/html; charset=utf-8')
    list.push([folder.split('/')[0], name, url])
  }
  const rows = list.sort().map(([g, n, u]) => `<li><span>${g}</span> <a href="${esc(u)}" target="_blank">${esc(n)}</a></li>`).join('\n')
  fs.writeFileSync(path.join(ROOT, 'output/watch-links.html'), `<!doctype html><html><head><meta charset="utf-8"><title>CapitalCode videos</title><style>body{font-family:system-ui,sans-serif;background:#F8EFDF;color:#16294A;max-width:900px;margin:0 auto;padding:16px}li{margin:8px 0}span{display:inline-block;width:110px;opacity:.6}</style></head><body><h1>CapitalCode videos — permanent watch links</h1><ul>\n${rows}\n</ul></body></html>\n`)
  console.log(`saved watch-link.txt + watch.html in ${list.length} video folders; full list in output/watch-links.html`)
})().catch((e) => console.log('ERR', e.name, e.message))
