// ============================================================
// HUB — sends a packaged video to the owner's Content Hub
// (CapitalCode tab) and brings the owner's fix notes back.
//   push: upload-token per file → straight to Blob → manifest
//   pull: owner events → <job>/hub_feedback.json → ack
// Nothing is sent unless HUB_URL and HUB_TOKEN are set.
// The key is never printed or written to job files.
// ============================================================
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { basename, join } from 'node:path'
import { put as blobPut } from '@vercel/blob/client'
import { readEnv } from './azure'
import { loadJob, readJson, writeJson } from './jobs'
import { JOBS_DIR } from './paths'
import type { MetaDoc } from './schema'
import type { CriticDoc } from './commands/qa'

const BRAND = 'capitalcode'
// # big videos go up in parts (each part retried on its own)
const MULTIPART_BYTES = 50 * 1024 * 1024

type HubFile = { path: string; kind: 'video' | 'image'; order: number; url: string; pathname: string; size: number }
type HubPlatform = { platform: 'youtube'; files: HubFile[]; caption: string; caption_edited: boolean; title?: string; description?: string; tags?: string[]; thumbnail?: HubFile }
export type HubPiece = {
  id: string; slug: string; format: 'long' | 'short'; title: string; round: number; engine_status: string
  platforms: HubPlatform[]; critic: { round: number; verdict: string; scores: Record<string, number>; reason: string } | null
  history: never[]; owner_note: null; components: never[]
}
type HubRecord = { round: number; package_at: string }
type Deps = { fetch?: typeof fetch; put?: typeof blobPut; env?: Record<string, string | undefined> }

// # HUB_URL / HUB_TOKEN from the process, then .env.local; null when the hub is not set up
export const hubConfig = (env?: Record<string, string | undefined>): { url: string; token: string } | null => {
  const e = env ?? { ...readEnv(), ...process.env }
  return e.HUB_URL && e.HUB_TOKEN ? { url: e.HUB_URL.replace(/\/+$/, ''), token: e.HUB_TOKEN } : null
}

const read = (file: string) => readFileSync(file, 'utf8').trim()
const hubOf = (dir: string): HubRecord | undefined => (readJson<{ hub?: HubRecord }>(join(dir, 'job.json'))).hub

// # job.hub records what was pushed; it is not a pipeline step, so STEPS / nextStep never see it
export const markHub = (dir: string, data: HubRecord) => writeJson(join(dir, 'job.json'), { ...readJson<object>(join(dir, 'job.json')), hub: data })

// # The piece the hub shows: the video (+ spare thumbnails), thumbnail 1, title 1, description, tags,
// # every title option in the caption box (the owner picks one), the Critic's verdict
export const pieceFor = (dir: string, round: number): HubPiece => {
  const job = loadJob(dir)
  const out = String((job.steps.package as { folder?: string } | undefined)?.folder ?? '')
  if (!out || !existsSync(out)) throw new Error(`package folder missing for ${basename(dir)}`)
  const meta = readJson<MetaDoc>(join(dir, 'metadata.json'))
  const video = readdirSync(out).find((f) => f.endsWith('.mp4')) ?? (() => { throw new Error(`no video in ${out}`) })()
  const file = (name: string, kind: HubFile['kind'], order: number): HubFile => ({ path: name, kind, order, url: '', pathname: '', size: statSync(join(out, name)).size })
  const long = job.kind === 'long'
  const spare = long ? ['thumb_2.jpg', 'thumb_3.jpg'].filter((t) => existsSync(join(out, t))) : []
  const critic = existsSync(join(dir, 'critic.json')) ? readJson<CriticDoc>(join(dir, 'critic.json')) : null
  return {
    id: `${job.kind}/${basename(dir)}`, slug: basename(dir), format: job.kind, title: meta.titles[0], round, engine_status: 'owner',
    platforms: [{
      platform: 'youtube',
      files: [file(video, 'video', 0), ...spare.map((t, i) => file(t, 'image', i + 1))],
      caption: long ? `Title options:\n${read(join(out, 'titles.txt'))}` : read(join(out, 'captions_for_posting.txt')),
      caption_edited: false,
      title: meta.titles[0],
      description: read(join(out, 'description.txt')),
      tags: meta.tags,
      ...(long && existsSync(join(out, 'thumb_1.jpg')) ? { thumbnail: file('thumb_1.jpg', 'image', 0) } : {}),
    }],
    critic: critic ? { round: 1, verdict: critic.verdict, scores: critic.checks, reason: critic.notes ?? '' } : null,
    history: [], owner_note: null, components: [],
  }
}

// # One JSON call to the hub's engine API for this brand
const call = async (cfg: { url: string; token: string }, f: typeof fetch, path: string, body?: unknown) => {
  const r = await f(`${cfg.url}/api/${BRAND}/engine/${path}`, {
    method: body === undefined ? 'GET' : 'POST',
    headers: { authorization: `Bearer ${cfg.token}`, 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  if (!r.ok) throw new Error(`hub ${path}: HTTP ${r.status}`)   // # never echo the key
  return r.json() as Promise<any>
}

// # Push a packaged job as the next round; nothing when this package was already pushed.
// # job.hub is written only after the hub accepted the piece, so a failure is retried next time.
export const pushJob = async (dir: string, deps: Deps = {}): Promise<{ pushed: boolean; round: number }> => {
  const cfg = hubConfig(deps.env)
  const prev = hubOf(dir)
  if (!cfg) return { pushed: false, round: prev?.round ?? 0 }
  const packageAt = String(loadJob(dir).steps.package?.at ?? '')
  if (!packageAt) throw new Error(`${basename(dir)} is not packaged yet`)
  if (prev?.package_at === packageAt) return { pushed: false, round: prev.round }
  const f = deps.fetch ?? fetch
  const put = deps.put ?? blobPut
  const round = (prev?.round ?? 0) + 1
  const piece = pieceFor(dir, round)
  const out = String((loadJob(dir).steps.package as { folder?: string } | undefined)?.folder ?? "")
  const upload = async (h: HubFile) => {
    const pathname = `${BRAND}/${piece.id}/r${round}/${h.path}`
    const { token } = await call(cfg, f, 'upload-token', { pathname, size: h.size })
    const res = await put(pathname, readFileSync(join(out, h.path)), { access: 'private', token, multipart: h.size > MULTIPART_BYTES })
    Object.assign(h, { url: res.url, pathname: res.pathname })
  }
  for (const p of piece.platforms) for (const h of [...p.files, ...(p.thumbnail ? [p.thumbnail] : [])]) await upload(h)
  await call(cfg, f, 'pieces', piece)
  markHub(dir, { round, package_at: packageAt })
  return { pushed: true, round }
}

type HubEvent = { id: number; type: string; piece_id: string; payload: Record<string, unknown> }

// # The owner's actions → each job's hub_feedback.json. A verdict on an older round is refused (the hub puts the
// # piece back in review); events for pieces this machine does not have stay queued.
export const pullFeedback = async (deps: Deps & { jobsDir?: string } = {}): Promise<{ applied: number; stale: number }> => {
  const cfg = hubConfig(deps.env)
  if (!cfg) return { applied: 0, stale: 0 }
  const f = deps.fetch ?? fetch
  const jobsDir = deps.jobsDir ?? JOBS_DIR
  const { events } = (await call(cfg, f, 'events')) as { events: HubEvent[] }
  const acked: number[] = []
  const refused: number[] = []
  for (const ev of events) {
    const folder = String(ev.piece_id).split('/')[1] ?? ''
    const dir = join(jobsDir, folder)
    // # strict: a plain folder name that exists as a job, never a path
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(folder) || !existsSync(join(dir, 'job.json'))) continue
    const round = hubOf(dir)?.round ?? 0
    if (ev.type === 'verdict' && ev.payload.round !== round) { acked.push(ev.id); refused.push(ev.id); continue }
    const file = join(dir, 'hub_feedback.json')
    const list = existsSync(file) ? readJson<object[]>(file) : []
    list.push({ type: ev.type, round, ...(ev.type === 'verdict' ? { verdict: ev.payload.verdict, note: ev.payload.note, component: ev.payload.component } : {}), event: ev.id, at: new Date().toISOString() })
    writeJson(file, list)
    acked.push(ev.id)
  }
  if (acked.length) await call(cfg, f, 'events/ack', { ids: acked, refused })
  return { applied: acked.length - refused.length, stale: refused.length }
}
