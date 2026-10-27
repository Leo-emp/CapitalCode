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

// # a fake hub: records calls, hands out upload tokens, serves queued events
const fakeHub = (events: unknown[] = [], fail?: string) => {
  const calls: { method: string; url: string; body: any; auth: string | null }[] = []
  const fetch = vi.fn(async (input: string | URL | Request, init: RequestInit = {}) => {
    const url = String(input)
    const body = init.body ? JSON.parse(String(init.body)) : null
    calls.push({ method: init.method ?? 'GET', url, body, auth: new Headers(init.headers).get('authorization') })
    if (fail && url.endsWith(fail)) return new Response('down', { status: 503 })
    if (url.endsWith('/upload-token')) return Response.json({ token: `client-token-for-${body.pathname}`, pathname: body.pathname })
    if (url.endsWith('/events')) return Response.json({ events })
    return Response.json({ ok: true })
  })
  const uploads: { pathname: string; token: string; multipart: boolean }[] = []
  const put = vi.fn(async (pathname: string, _body: unknown, o: { token: string; multipart?: boolean }) => {
    uploads.push({ pathname, token: o.token, multipart: !!o.multipart })
    return { pathname, url: `https://store.private.blob.vercel-storage.com/${pathname}` } as Awaited<ReturnType<typeof import('@vercel/blob/client').put>>
  })
  return { calls, fetch, put, uploads }
}

test('builds a long piece: video, thumb_1 as thumbnail, title, description, tags, title options as caption', () => {
  const { dir } = packaged('long')
  const p = pieceFor(dir, 1)
  expect(p.id).toBe(`long/${basename(dir)}`)
  expect(p.format).toBe('long')
  const yt = p.platforms[0]
  expect(yt.platform).toBe('youtube')
  expect(yt.files.map((f) => [f.path, f.kind])).toEqual([['The Minimum Payment Trap_2026-10-28_01-00_long.mp4', 'video'], ['thumb_2.jpg', 'image'], ['thumb_3.jpg', 'image']])
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

test('asks for an upload token per file, inside capitalcode/, then pushes the manifest last', async () => {
  const { dir } = packaged('long')
  const hub = fakeHub()
  const r = await pushJob(dir, { fetch: hub.fetch, put: hub.put, env: ENV })
  expect(r).toEqual({ pushed: true, round: 1 })
  const tokenCalls = hub.calls.filter((c) => c.url === 'https://hub.example/api/capitalcode/engine/upload-token')
  expect(tokenCalls.length).toBe(4)
  for (const u of hub.uploads) {
    expect(u.pathname.startsWith(`capitalcode/long/${basename(dir)}/r1/`)).toBe(true)
    expect(u.token).toBe(`client-token-for-${u.pathname}`)
  }
  const last = hub.calls.at(-1)!
  expect(last.url).toBe('https://hub.example/api/capitalcode/engine/pieces')
  expect(last.body.platforms[0].files[0].url).toContain('/capitalcode/long/')
  expect(hub.calls.every((c) => c.auth === `Bearer ${KEY}`)).toBe(true)
})

test('pushes round 1, then nothing for the same package, then round 2 after a re-package', async () => {
  const { dir } = packaged('long')
  const hub = fakeHub()
  const deps = { fetch: hub.fetch, put: hub.put, env: ENV }
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
  await expect(pushJob(dir, { fetch: hub.fetch, put: hub.put, env: ENV })).rejects.toThrow()
  expect(JSON.parse(readFileSync(join(dir, 'job.json'), 'utf8')).hub).toBeUndefined()
})

test('without HUB_URL nothing is sent', async () => {
  const { dir } = packaged('long')
  const hub = fakeHub()
  expect(await pushJob(dir, { fetch: hub.fetch, put: hub.put, env: {} })).toEqual({ pushed: false, round: 0 })
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
  const deps = { fetch: hub.fetch, put: hub.put, env: ENV }
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
  await pushJob(dir, { fetch: hub.fetch, put: hub.put, env: ENV }).catch((e: Error) => console.error(e.message))
  for (const s of spies) for (const call of s.mock.calls) expect(JSON.stringify(call)).not.toContain(KEY)
  for (const s of spies) s.mockRestore()
})
