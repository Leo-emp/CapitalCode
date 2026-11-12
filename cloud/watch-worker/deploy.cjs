// Deploy the watch-link Worker to Cloudflare and switch on its workers.dev address.
// Reads CLOUDFLARE_API_TOKEN, R2_ACCOUNT_ID and R2_ARCHIVE_BUCKET from .env.local; creates WATCH_LINK_SECRET there
// once if it is missing (a random 32-byte hex string). Nothing secret is ever printed.
// Usage: node cloud/watch-worker/deploy.cjs
const fs = require('fs'), path = require('path'), crypto = require('crypto')
const ROOT = path.join(__dirname, '..', '..'), ENV = path.join(ROOT, '.env.local')
const readEnv = () => { const e = {}; for (const l of fs.readFileSync(ENV, 'utf8').split(/\r?\n/)) { const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/); if (m) e[m[1]] = m[2].replace(/^["']|["']$/g, '') } return e }
let env = readEnv()
if (!env.WATCH_LINK_SECRET) {
  const t = fs.readFileSync(ENV, 'utf8'), nl = t.includes('\r\n') ? '\r\n' : '\n'
  fs.writeFileSync(ENV, t + (t.endsWith(nl) ? '' : nl) + `# secret that signs the permanent watch links (never share)${nl}WATCH_LINK_SECRET=${crypto.randomBytes(32).toString('hex')}${nl}`)
  env = readEnv(); console.log('created WATCH_LINK_SECRET in .env.local')
}
const ACC = env.R2_ACCOUNT_ID, NAME = 'capitalcode-watch', API = `https://api.cloudflare.com/client/v4/accounts/${ACC}/workers/scripts/${NAME}`
const auth = { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}` }
;(async () => {
  const form = new FormData()
  form.append('metadata', new Blob([JSON.stringify({ main_module: 'worker.js', compatibility_date: '2025-06-01', bindings: [{ type: 'r2_bucket', name: 'VIDEOS', bucket_name: env.R2_ARCHIVE_BUCKET }, { type: 'secret_text', name: 'LINK_SECRET', text: env.WATCH_LINK_SECRET }] })], { type: 'application/json' }))
  form.append('worker.js', new Blob([fs.readFileSync(path.join(__dirname, 'worker.js'), 'utf8')], { type: 'application/javascript+module' }), 'worker.js')
  let r = await fetch(API, { method: 'PUT', headers: auth, body: form }), j = await r.json()
  console.log('upload worker:', j.success ? 'ok' : JSON.stringify(j.errors))
  if (!j.success) return
  r = await fetch(`${API}/subdomain`, { method: 'POST', headers: { ...auth, 'Content-Type': 'application/json' }, body: JSON.stringify({ enabled: true }) }); j = await r.json()
  console.log('workers.dev address:', j.success ? 'on' : JSON.stringify(j.errors))
})().catch((e) => console.log('ERR', e.message))
