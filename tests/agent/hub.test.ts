// # Content Hub: packaged videos go to the hub as pieces; the owner's fix notes come back on resume
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import { expect, test, vi } from 'vitest'
import { pieceFor, pullFeedback, pushJob } from '../../agent/hub'

const KEY = 'cc-hub-key-0123456789-abcdefghij-secret'
const ENV = { HUB_URL: 'https://hub.example', HUB_TOKEN: KEY }

// # a packaged job: job.json + metadata + critic, and its output folder with the files the owner uploads
const packaged = (kind: 'long' | 'short', at = '2026-10-28T01:00:00.000Z') => {
  const root = mkdtempSync(join(tmpdir(), 'cc-hub-'))
  const dir = join(root, 'jobs', `20261028-0100_the-minimum-payment-trap`)
  const out = join(root, 'out', 'The Minimum Payment Trap_2026-10-28_01-00')
  mkdirSync(dir, { recursive: true })
  mkdirSync(out, { recursive: true })
  writeFileSync(join(dir, 'job.json'), JSON.stringify({ topic: 'the minimum payment trap', kind, created: at, steps: { package: { folder: out, thumbs: kind === 'long' ? 3 : 0, at } } }))
  writeFileSync(join(dir, 'metadata.json'), JSON.stringify({ titles: ['The Minimum Payment Trap', 'Why Minimums Cost You', 'Pay More, Pay Less'], description: 'd', tags: ['credit cards', 'debt'], thumbnails: [] }))
  writeFileSync(join(dir, 'critic.json'), JSON.stringify({ verdict: 'pass', score: 8, checks: { hook: 8 }, fixes: [], notes: 'Clear and correct.' }))
  writeFileSync(join(out, `The Minimum Payment Trap_2026-10-28_01-00_${kind}.mp4`), 'video')
  writeFileSync(join(out, 'description.txt'), 'A plain guide.\n\nChapters\n0:00 Start\n')
  writeFileSync(join(out, 'titles.txt'), '1. The Minimum Payment Trap\n2. Why Minimums Cost You\n3. Pay More, Pay Less\n')
  writeFileSync(join(out, 'tags.txt'), 'credit cards, debt\n')
  if (kind === 'long') for (const n of [1, 2, 3]) writeFileSync(join(out, `thumb_${n}.jpg`), `t${n}`)
  else writeFileSync(join(out, 'captions_for_posting.txt'), 'The Minimum Payment Trap\n\nd\n\n#creditcards #debt\n')
  return { root, dir, out }
}

// # a fake hub: records calls, hands out signed R2 uploads, serves queued events; the fake R2 records each PUT
const fakeHub = (events: unknown[] = [], fail?: string, putStatus = 200) => {
  const calls: { method: string; url: string; body: any; auth: string | null }[] = []
  const uploads: { url: string; method: string; headers: Headers; bytes: number }[] = []
  const fetch = vi.fn(async (input: string | URL | Request, init: RequestInit = {}) => {
    const url = String(input)
    if (url.startsWith('https://r2.example/')) {
      uploads.push({ url, method: init.method ?? 'GET', headers: new Headers(init.headers), bytes: (await new Response(init.body).arrayBuffer()).byteLength })
      return new Response(putStatus === 200 ? '' : '<Error/>', { status: putStatus })
    }
    const body = init.body ? JSON.parse(String(init.body)) : null
    calls.push({ method: init.method ?? 'GET', url, body, auth: new Headers(init.headers).get('authorization') })
    if (fail && url.endsWith(fail)) return new Response('down', { status: 503 })
    // # the hub's own rule: plain path segments only (letters, digits, dot, dash, underscore)
    if (url.endsWith('/upload-token') && !String(body.pathname).split('/').every((seg: string) => /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(seg))) return Response.json({ error: 'bad pathname' }, { status: 400 })
    if (url.endsWith('/upload-token')) {
      const key = String(body.pathname).replace(/(\.[a-z0-9]+)$/, '-k3x9q2mz$1')
      return Response.json({
        upload: { method: 'PUT', url: `https://r2.example/content-hub/${key}?X-Amz-Signature=abc`, headers: { 'content-type': 'video/mp4', 'content-length': String(body.size) } },
        file: { url: `https://acct.r2.cloudflarestorage.com/content-hub/${key}`, pathname: key },
      })
    }
    if (url.endsWith('/events')) return Response.json({ events })
    return Response.json({ ok: true })
  })
  return { calls, fetch, uploads }
}

test('builds a long piece: video, thumb_1 as thumbnail, title, description, tags, title options as caption', () => {
  const { dir } = packaged('long')
  const p = pieceFor(dir, 1)
  expect(p.id).toBe(`long/${basename(dir)}`)
  expect(p.format).toBe('long')
  const yt = p.platforms[0]
  expect(yt.platform).toBe('youtube')
  // # file names with spaces (the package folder's video) become plain names the hub accepts
  expect(yt.files.map((f) => [f.path, f.kind])).toEqual([['The-Minimum-Payment-Trap_2026-10-28_01-00_long.mp4', 'video'], ['thumb_2.jpg', 'image'], ['thumb_3.jpg', 'image']])
  expect(yt.thumbnail?.path).toBe('thumb_1.jpg')
  expect([yt.title, yt.description, yt.tags]).toEqual(['The Minimum Payment Trap', 'A plain guide.\n\nChapters\n0:00 Start', ['credit cards', 'debt']])
  expect(yt.caption).toBe('Title options:\n1. The Minimum Payment Trap\n2. Why Minimums Cost You\n3. Pay More, Pay Less')
  expect(p.critic).toEqual({ round: 1, verdict: 'pass', scores: { hook: 8 }, reason: 'Clear and correct.' })
})

test('builds a short piece with captions_for_posting as caption and no thumbnail', () => {
  const { dir } = packaged('short')
  const yt = pieceFor(dir, 1).platforms[0]
  expect(pieceFor(dir, 1).id).toBe(`short/${basename(dir)}`)
  expect(yt.files.map((f) => f.kind)).toEqual(['video'])
  expect(yt.thumbnail).toBeUndefined()
  expect(yt.caption).toBe('The Minimum Payment Trap\n\nd\n\n#creditcards #debt')
})

test('uploads each file straight to R2 with the signed headers, inside capitalcode/, then pushes the manifest last', async () => {
  const { dir } = packaged('long')
  const hub = fakeHub()
  const r = await pushJob(dir, { fetch: hub.fetch, env: ENV })
  expect(r).toEqual({ pushed: true, round: 1 })
  const tokenCalls = hub.calls.filter((c) => c.url === 'https://hub.example/api/capitalcode/engine/upload-token')
  expect(tokenCalls.length).toBe(4)
  for (const c of tokenCalls) expect(c.body.pathname.startsWith(`capitalcode/long/${basename(dir)}/r1/`)).toBe(true)
  expect(hub.uploads.length).toBe(4)
  for (const [i, u] of hub.uploads.entries()) {
    expect(u.method).toBe('PUT')
    // # exactly the size the hub signed, and the hub key never goes to R2
    expect(u.headers.get('content-length')).toBe(String(tokenCalls[i].body.size))
    expect(u.bytes).toBe(tokenCalls[i].body.size)
    expect(u.headers.get('authorization')).toBeNull()
  }
  const last = hub.calls.at(-1)!
  expect(last.url).toBe('https://hub.example/api/capitalcode/engine/pieces')
  expect(last.body.platforms[0].files[0].url).toMatch(/^https:\/\/acct\.r2\.cloudflarestorage\.com\/content-hub\/capitalcode\/long\/.+-k3x9q2mz\.mp4$/)
  expect(last.body.platforms[0].files[0].pathname).toMatch(/-k3x9q2mz\.mp4$/)
  expect(hub.calls.every((c) => c.auth === `Bearer ${KEY}`)).toBe(true)
})

test('a refused upload stops the push and leaves job.hub unchanged', async () => {
  const { dir } = packaged('long')
  const hub = fakeHub([], undefined, 403)
  await expect(pushJob(dir, { fetch: hub.fetch, env: ENV })).rejects.toThrow(/upload .*403/)
  expect(hub.calls.some((c) => c.url.endsWith('/pieces'))).toBe(false)
  expect(JSON.parse(readFileSync(join(dir, 'job.json'), 'utf8')).hub).toBeUndefined()
})

test('pushes round 1, then nothing for the same package, then round 2 after a re-package', async () => {
  const { dir } = packaged('long')
  const hub = fakeHub()
  const deps = { fetch: hub.fetch, env: ENV }
  expect(await pushJob(dir, deps)).toEqual({ pushed: true, round: 1 })
  expect(await pushJob(dir, deps)).toEqual({ pushed: false, round: 1 })
  const job = JSON.parse(readFileSync(join(dir, 'job.json'), 'utf8'))
  job.steps.package.at = '2026-10-29T09:00:00.000Z'
  writeFileSync(join(dir, 'job.json'), JSON.stringify(job))
  expect(await pushJob(dir, deps)).toEqual({ pushed: true, round: 2 })
  expect(hub.calls.at(-1)!.body.round).toBe(2)
})

test('a failed upload or push leaves job.hub unchanged', async () => {
  const { dir } = packaged('long')
  const hub = fakeHub([], '/pieces')
  await expect(pushJob(dir, { fetch: hub.fetch, env: ENV })).rejects.toThrow()
  expect(JSON.parse(readFileSync(join(dir, 'job.json'), 'utf8')).hub).toBeUndefined()
})

test('without HUB_URL nothing is sent', async () => {
  const { dir } = packaged('long')
  const hub = fakeHub()
  expect(await pushJob(dir, { fetch: hub.fetch, env: {} })).toEqual({ pushed: false, round: 0 })
  expect(hub.calls).toEqual([])
})

test('pull applies a fix note for the current round and refuses an older round; unknown pieces stay queued', async () => {
  const { root, dir } = packaged('long')
  const id = `long/${basename(dir)}`
  const hub = fakeHub([
    { id: 1, type: 'verdict', piece_id: id, payload: { round: 1, verdict: 'fix', note: 'Slower intro', component: null } },
    { id: 2, type: 'verdict', piece_id: id, payload: { round: 0, verdict: 'fix', note: 'old', component: null } },
    { id: 3, type: 'verdict', piece_id: 'long/20990101-0000_not-here', payload: { round: 1, verdict: 'approve' } },
    { id: 4, type: 'posted', piece_id: id, payload: {} },
  ])
  const deps = { fetch: hub.fetch, env: ENV }
  await pushJob(dir, deps)
  const r = await pullFeedback({ ...deps, jobsDir: join(root, 'jobs') })
  expect(r).toEqual({ applied: 2, stale: 1 })
  const fb = JSON.parse(readFileSync(join(dir, 'hub_feedback.json'), 'utf8'))
  expect(fb.map((f: any) => [f.type, f.round, f.verdict, f.note])).toEqual([['verdict', 1, 'fix', 'Slower intro'], ['posted', 1, undefined, undefined]])
  const ack = hub.calls.find((c) => c.url.endsWith('/events/ack'))!
  expect(ack.body).toEqual({ ids: [1, 2, 4], refused: [2] })
})

test('never prints the key', async () => {
  const { dir } = packaged('long')
  const hub = fakeHub([], '/pieces')
  const spies = [vi.spyOn(console, 'log'), vi.spyOn(console, 'warn'), vi.spyOn(console, 'error')]
  await pushJob(dir, { fetch: hub.fetch, env: ENV }).catch((e: Error) => console.error(e.message))
  for (const s of spies) for (const call of s.mock.calls) expect(JSON.stringify(call)).not.toContain(KEY)
  for (const s of spies) s.mockRestore()
})
