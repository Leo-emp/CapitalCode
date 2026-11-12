// ============================================================
// CLOUD RENDER — one whole video renders on AWS Lambda or on
// GitHub Actions instead of this laptop, so three videos (any
// brand) can render at once: `render <job> --on=aws|github`, or
// CC_RENDER_ON=aws|github for `run`. Both read the same art bundle
// (a Remotion site on S3, one per art version) and give back a
// muted video.mp4; the voice + SFX mix and mux stay local.
// Keys live in .env.local (REMOTION_AWS_*) and are never printed.
// ============================================================
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { readEnv } from './azure'
import { PUBLIC_DIR, ROOT } from './paths'
import { artHash, concatVideos, countFrames } from './render'
import type { Timeline } from './timeline'

export type Target = 'laptop' | 'aws' | 'github'
export const TARGETS: Target[] = ['laptop', 'aws', 'github']

// # Sydney: the only region this AWS account's plan allows (all others are blocked by an account-wide rule)
export const DEFAULT_REGION = 'ap-southeast-2'
export const GH_REPO = 'Leo-emp/CapitalCode'
export const GH_WORKFLOW = 'render.yml'
export const LAMBDA = { memorySizeInMb: 2048, diskSizeInMb: 2048, timeoutInSeconds: 900 }
// # GitHub runs at most this many parts of one video side by side (free runners, 4 cores each)
export const GH_MAX_PARTS = 10
export const GH_MIN_PART = 1200 // # frames: smaller parts waste each runner's ~2 min start-up

export const pickTarget = (args: string[], env: Record<string, string | undefined> = process.env): Target => {
  const v = args.find((x) => x.startsWith('--on='))?.slice(5) ?? env.CC_RENDER_ON ?? 'laptop'
  if (!TARGETS.includes(v as Target)) throw new Error(`--on must be one of ${TARGETS.join(', ')} (got "${v}")`)
  return v as Target
}

// # AWS keys from .env.local into this process only (Remotion and the S3 client read them from env)
export const loadAws = () => {
  const e = readEnv()
  for (const k of ['REMOTION_AWS_ACCESS_KEY_ID', 'REMOTION_AWS_SECRET_ACCESS_KEY'])
    if (!e[k]) throw new Error(`${k} missing in .env.local — see docs/cloud-render.md`)
  process.env.REMOTION_AWS_ACCESS_KEY_ID = e.REMOTION_AWS_ACCESS_KEY_ID
  process.env.REMOTION_AWS_SECRET_ACCESS_KEY = e.REMOTION_AWS_SECRET_ACCESS_KEY
  // # the Lambda cap lives in .env.local too (until the AWS concurrency quota is raised); a shell value wins
  if (e.CC_LAMBDA_MAX && !process.env.CC_LAMBDA_MAX) process.env.CC_LAMBDA_MAX = e.CC_LAMBDA_MAX
  const region = (e.REMOTION_AWS_REGION || DEFAULT_REGION) as 'ap-southeast-2'
  return { region, keyId: e.REMOTION_AWS_ACCESS_KEY_ID, secret: e.REMOTION_AWS_SECRET_ACCESS_KEY }
}

// # Loaded only when a cloud render runs, so laptop renders never need the package
const lambda = () => import('@remotion/lambda')

const s3 = async () => {
  const { S3Client } = await import('@aws-sdk/client-s3')
  const a = loadAws()
  return new S3Client({ region: a.region, credentials: { accessKeyId: a.keyId, secretAccessKey: a.secret } })
}

// ---------------------------------------------------------------- shared: bucket, function, site
export const ensureBucket = async () => {
  const { getOrCreateBucket } = await lambda()
  const { region } = loadAws()
  return { region, bucketName: (await getOrCreateBucket({ region })).bucketName }
}

export const ensureFunction = async () => {
  const { deployFunction } = await lambda()
  const { region } = loadAws()
  // # idempotent: an existing function with the same settings is reused
  const f = await deployFunction({ region, ...LAMBDA, createCloudWatchLogGroup: true, cloudWatchLogRetentionPeriodInDays: 3 })
  return f.functionName
}

// # How long an unused art bundle (site) stays in the bucket before cleanup; renders take < 1 hour
export const SITE_KEEP_HOURS = 12

// # One site per art version (the same hash the laptop bundle cache uses); stale sites are deleted
export const ensureSite = async (log: (s: string) => void) => {
  const { deploySite, getSites, deleteSite } = await lambda()
  const { region, bucketName } = await ensureBucket()
  const siteName = `cc-${artHash()}`
  const { sites } = await getSites({ region })
  const have = sites.find((s) => s.id === siteName)
  // # Several sessions render in parallel (owner 2026-11-03), each with its own art version, so only sites that have
  // # not been touched for SITE_KEEP_HOURS are deleted — deleting all others broke a render mid-flight (S3 AccessDenied).
  const cutoff = Date.now() - SITE_KEEP_HOURS * 3600 * 1000
  for (const old of sites.filter((s) => s.id !== siteName && s.id.startsWith('cc-') && (s.lastModified ?? 0) < cutoff)) await deleteSite({ region, bucketName, siteName: old.id })
  if (have) return { region, bucketName, serveUrl: have.serveUrl }
  log(`cloud: uploading art bundle ${siteName}`)
  const { serveUrl } = await deploySite({ region, bucketName, siteName, entryPoint: join(ROOT, 'art', 'index.tsx'), options: { publicDir: PUBLIC_DIR } })
  return { region, bucketName, serveUrl }
}

// ---------------------------------------------------------------- AWS Lambda
// # A run id is saved so a crash mid-render resumes polling instead of paying for a second render
type Pending = { target: Target; key: string; id: string }
const pendingFile = (dir: string) => join(dir, 'render', 'cloud.json')
const readPending = (dir: string, target: Target, key: string): string | null => {
  if (!existsSync(pendingFile(dir))) return null
  const p = JSON.parse(readFileSync(pendingFile(dir), 'utf8')) as Pending
  return p.target === target && p.key === key ? p.id : null
}
const savePending = (dir: string, p: Pending) => { mkdirSync(join(dir, 'render'), { recursive: true }); writeFileSync(pendingFile(dir), JSON.stringify(p)) }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// # Run `fn` over `items`, at most `n` at once
export const pool = async <T>(items: T[], n: number, fn: (x: T) => Promise<void>) => {
  let i = 0
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => { while (i < items.length) await fn(items[i++]) }))
}

// # Lambdas per video: CC_LAMBDA_MAX caps it (new AWS accounts may run only 10 at once until the quota is raised)
export const framesPerLambda = (frames: number, max = Number(process.env.CC_LAMBDA_MAX) || 150) => Math.max(20, Math.ceil(frames / Math.min(200, max)))

// # Pre-flight on Lambda: one still per shot, in parallel, before the paid video render
export const stillsOnAws = async (props: { timeline: Timeline }, frames: number[], outDir: string) => {
  const { renderStillOnLambda, deleteRender } = await lambda()
  const { region, bucketName, serveUrl } = await ensureSite(() => {})
  const functionName = await ensureFunction()
  mkdirSync(outDir, { recursive: true })
  // # 8 at a time: stays inside a new account's low Lambda concurrency quota
  await pool(frames, 8, async (frame) => {
    // # a short-lived public link, fetched once and then deleted
    const r = await renderStillOnLambda({ region, functionName, serveUrl, composition: 'Episode', inputProps: props, frame, imageFormat: 'png', privacy: 'public', timeoutInMilliseconds: 120_000 })
    const res = await fetch(r.url)
    if (!res.ok) throw new Error(`aws still ${frame}: HTTP ${res.status}`)
    writeFileSync(join(outDir, `shot_${String(frame).padStart(6, '0')}.png`), Buffer.from(await res.arrayBuffer()))
    await deleteRender({ region, bucketName, renderId: r.renderId })
  })
}

export const renderOnAws = async (dir: string, props: { timeline: Timeline }, key: string, out: string, log: (s: string) => void) => {
  const { renderMediaOnLambda, getRenderProgress, downloadMedia, deleteRender } = await lambda()
  const { region, bucketName, serveUrl } = await ensureSite(log)
  const functionName = await ensureFunction()
  const frames = props.timeline.durationInFrames
  let renderId = readPending(dir, 'aws', key)
  if (renderId) log(`aws: resuming render ${renderId}`)
  else {
    const r = await renderMediaOnLambda({
      region, functionName, serveUrl, composition: 'Episode', inputProps: props, codec: 'h264', crf: 18, pixelFormat: 'yuv420p',
      imageFormat: 'jpeg', jpegQuality: 92, muted: true, framesPerLambda: framesPerLambda(frames), privacy: 'private', maxRetries: 2, timeoutInMilliseconds: 120_000,
    })
    renderId = r.renderId
    savePending(dir, { target: 'aws', key, id: renderId })
    log(`aws: render ${renderId} started (${Math.ceil(frames / framesPerLambda(frames))} lambdas)`)
  }
  for (let last = -1; ;) {
    const p = await getRenderProgress({ renderId, bucketName, functionName, region })
    if (p.fatalErrorEncountered) { rmSync(pendingFile(dir), { force: true }); throw new Error(`aws render failed: ${p.errors[0]?.message ?? 'unknown error'}`) }
    if (p.done) break
    const pct = Math.floor(p.overallProgress * 100)
    if (pct >= last + 10) { log(`aws: ${pct}%`); last = pct }
    await sleep(4000)
  }
  await downloadMedia({ region, bucketName, renderId, outPath: out })
  await deleteRender({ region, bucketName, renderId })
  rmSync(pendingFile(dir), { force: true })
}

// ---------------------------------------------------------------- GitHub Actions
// # Frame ranges for the runners: as few parts as keep each one ≥ GH_MIN_PART frames, at most GH_MAX_PARTS
export const ghParts = (frames: number): [number, number][] => {
  const n = Math.max(1, Math.min(GH_MAX_PARTS, Math.floor(frames / GH_MIN_PART)))
  const size = Math.ceil(frames / n)
  return Array.from({ length: n }, (_, i) => [i * size, Math.min(frames, (i + 1) * size)] as [number, number]).filter(([a, b]) => b > a)
}

const gh = (args: string[]) => {
  const p = spawnSync('gh', args, { encoding: 'utf8' })
  if (p.status !== 0) throw new Error(`gh ${args.slice(0, 2).join(' ')} failed: ${(p.stderr || p.stdout).trim().split('\n')[0]}`)
  return p.stdout
}

export const renderOnGithub = async (dir: string, props: { timeline: Timeline }, key: string, out: string, log: (s: string) => void) => {
  const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = await import('@aws-sdk/client-s3')
  const { region, bucketName, serveUrl } = await ensureSite(log)
  const client = await s3()
  const parts = ghParts(props.timeline.durationInFrames)

  // # one run = the props on S3 + a workflow dispatch for some frame ranges
  const dispatch = async (runKey: string, ranges: [number, number][]) => {
    await client.send(new PutObjectCommand({ Bucket: bucketName, Key: `gh/${runKey}/props.json`, Body: JSON.stringify(props), ContentType: 'application/json' }))
    gh(['workflow', 'run', GH_WORKFLOW, '-R', GH_REPO, '-f', `job=${runKey}`, '-f', `serve_url=${serveUrl}`, '-f', `bucket=${bucketName}`, '-f', `region=${region}`, '-f', `parts=${JSON.stringify(ranges)}`])
    log(`github: ${runKey} dispatched (${ranges.length} runner(s))`)
  }
  // # the run is named after its key (run-name in render.yml), so it is found without guessing; then wait for it
  const wait = async (runKey: string, total: number) => {
    let runId = ''
    for (let k = 0; !runId; k++) {
      if (k > 30) throw new Error(`github: run ${runKey} never appeared`)
      const runs = JSON.parse(gh(['run', 'list', '-R', GH_REPO, '-w', GH_WORKFLOW, '-L', '20', '--json', 'databaseId,displayTitle'])) as { databaseId: number; displayTitle: string }[]
      runId = String(runs.find((r) => r.displayTitle === `render ${runKey}`)?.databaseId ?? '')
      if (!runId) await sleep(5000)
    }
    for (let last = ''; ;) {
      const r = JSON.parse(gh(['run', 'view', runId, '-R', GH_REPO, '--json', 'status,conclusion,jobs'])) as { status: string; conclusion: string; jobs: { status: string }[] }
      const line = `${r.jobs.filter((j) => j.status === 'completed').length}/${total} parts done`
      if (line !== last) { log(`github: ${line}`); last = line }
      if (r.status === 'completed') {
        if (r.conclusion !== 'success') { rmSync(pendingFile(dir), { force: true }); throw new Error(`github run ${runId} ${r.conclusion} — gh run view ${runId} -R ${GH_REPO} --log-failed`) }
        return
      }
      await sleep(20_000)
    }
  }
  // # fetch one part and check its frame count (a runner very rarely writes one extra frame; that part is re-rendered)
  const tmp = join(dir, 'render', 'gh')
  mkdirSync(tmp, { recursive: true })
  // # resume-safe (2026-11-11): a part already downloaded with the right frame count is kept (the bucket copy was deleted
  // # after download), and a part missing from `runKey` is looked for under its retry runs (-r1, -r2) — a killed process
  // # used to fail here with NoSuchKey even though every part had rendered
  const fetchPart = async (runKey: string, [a, b]: [number, number]) => {
    const file = join(tmp, `part_${a}_${b}.mp4`)
    if (existsSync(file) && countFrames(file) === b - a) return true
    let o
    for (const k of [runKey, `${runKey}-r1`, `${runKey}-r2`]) {
      try { o = await client.send(new GetObjectCommand({ Bucket: bucketName, Key: `gh/${k}/part_${a}_${b}.mp4` })); runKey = k; break }
      catch (e) { if ((e as { name?: string }).name !== 'NoSuchKey' || k.endsWith('-r2')) throw e }
    }
    if (!o) throw new Error(`github: part ${a}-${b} not found`)
    writeFileSync(file, Buffer.from(await o.Body!.transformToByteArray()))
    await client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: `gh/${runKey}/part_${a}_${b}.mp4` }))
    const n = countFrames(file)
    if (n !== b - a) { log(`github: part ${a}-${b} has ${n} frames, expected ${b - a} — will re-render it`); rmSync(file, { force: true }); return false }
    return true
  }

  let id = readPending(dir, 'github', key)
  if (id) log(`github: resuming ${id}`)
  else {
    id = `cc-${Date.now().toString(36)}`
    await dispatch(id, parts)
    savePending(dir, { target: 'github', key, id })
  }
  await wait(id, parts.length)
  let bad: [number, number][] = []
  for (const p of parts) if (!(await fetchPart(id, p))) bad.push(p)
  await client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: `gh/${id}/props.json` }))
  // # up to 2 retry runs, only for the parts that came back wrong
  for (let k = 1; bad.length; k++) {
    if (k > 2) throw new Error(`github: parts ${bad.map(([a, b]) => `${a}-${b}`).join(', ')} still have the wrong frame count after 2 retries`)
    const retryKey = `${id}-r${k}`
    await dispatch(retryKey, bad)
    await wait(retryKey, bad.length)
    const still: [number, number][] = []
    for (const p of bad) if (!(await fetchPart(retryKey, p))) still.push(p)
    await client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: `gh/${retryKey}/props.json` }))
    bad = still
  }
  concatVideos(parts.map(([a, b]) => join(tmp, `part_${a}_${b}.mp4`)), out)
  rmSync(tmp, { recursive: true, force: true })
  rmSync(pendingFile(dir), { force: true })
}
