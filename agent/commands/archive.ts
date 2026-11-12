// ============================================================
// CLI: archive — keep finished videos safe on Cloudflare R2 so
// the laptop disk does not fill up (owner, 2026-11-09).
//
//   archive <job>             upload the job's finished package
//                             folder (video, thumbnails, titles,
//                             description, tags, captions, sources)
//                             and check every file arrived intact
//   archive-free <job>        DRY RUN: show what could be removed
//                             from the laptop after a good archive
//   archive-free <job> --yes  actually remove those files
//   archive-list              list everything in the archive
//   archive-get "<name>"      download a package folder back
//
// Safety rules:
//   • Bucket + keys come from .env.local (R2_ARCHIVE_*), never printed.
//   • The key only reaches the archive bucket (Content Hub's bucket
//     auto-deletes posted files, so the archive must never live there).
//   • Every upload sends a Content-MD5 checksum: Cloudflare rejects the
//     file if even one byte differs. Then sizes are checked again.
//   • Nothing is deleted locally unless archive.json exists, every file
//     is re-checked on Cloudflare, AND --yes is passed.
//   • Script, facts, voice and words are always kept (small, and they
//     are the "source" of the video).
// ============================================================
import { createHash } from 'node:crypto'
import { createReadStream, createWriteStream, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { basename, join } from 'node:path'
import { pipeline } from 'node:stream/promises'
import type { Readable } from 'node:stream'
import { readEnv } from '../azure'
import { register } from '../cli'
import { loadJob, readJson, writeJson } from '../jobs'
import { OUT_LONG, OUT_SHORTS } from '../paths'
import { refuse, result } from '../result'

// # One file inside the archive manifest
type ArchivedFile = { name: string; key: string; bytes: number; md5: string }
type ArchiveDoc = { bucket: string; prefix: string; folder: string; files: ArchivedFile[]; at: string }

// # Build an S3 client for the archive bucket (R2 speaks the S3 protocol)
const archiveClient = async () => {
  const env = readEnv()
  const account = env.R2_ACCOUNT_ID
  const id = env.R2_ARCHIVE_ACCESS_KEY_ID
  const secret = env.R2_ARCHIVE_SECRET_ACCESS_KEY
  const bucket = env.R2_ARCHIVE_BUCKET
  if (!account || !id || !secret || !bucket) refuse('R2_ACCOUNT_ID / R2_ARCHIVE_ACCESS_KEY_ID / R2_ARCHIVE_SECRET_ACCESS_KEY / R2_ARCHIVE_BUCKET missing from .env.local')
  const S3 = await import('@aws-sdk/client-s3')
  const client = new S3.S3Client({
    region: 'auto',
    endpoint: `https://${account}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: id, secretAccessKey: secret },
  })
  return { S3, client, bucket }
}

// # MD5 of a file, streamed (videos are hundreds of MB — never load whole)
const md5File = async (file: string) => {
  const h = createHash('md5')
  await pipeline(createReadStream(file), h)
  return h.digest()
}

// # Folder size in bytes (recursive), 0 if missing
const sizeOf = (p: string): number => {
  if (!existsSync(p)) return 0
  const st = statSync(p)
  if (!st.isDirectory()) return st.size
  return readdirSync(p).reduce((s, f) => s + sizeOf(join(p, f)), 0)
}
const gb = (b: number) => `${(b / 1e9).toFixed(2)} GB`

// # Which package folder belongs to this job (recorded by `package`)
const packageFolderOf = (dir: string): string => {
  const job = loadJob(dir)
  const step = (job.steps as Record<string, any>).package
  const folder: string | undefined = step?.folder
  if (!folder) refuse('this job is not packaged yet — package it first (only packaged videos are archived)')
  if (!existsSync(folder!)) refuse(`package folder not found: ${folder}`)
  return folder!
}

// # Re-check that every manifest file is on Cloudflare with the right size
const verifyRemote = async (doc: ArchiveDoc) => {
  const { S3, client, bucket } = await archiveClient()
  const missing: string[] = []
  for (const f of doc.files) {
    try {
      const h = await client.send(new S3.HeadObjectCommand({ Bucket: bucket, Key: f.key }))
      if (h.ContentLength !== f.bytes) missing.push(`${f.name} (size ${h.ContentLength} ≠ ${f.bytes})`)
    } catch {
      missing.push(`${f.name} (not on Cloudflare)`)
    }
  }
  return missing
}

// ------------------------------------------------------------
// archive <job>
// ------------------------------------------------------------
register('archive', 'archive <job>  — upload the finished package to Cloudflare R2 and verify every file', async (a) => {
  const dir = a.find((x) => !x.startsWith('--')) ?? refuse('give a job folder: archive <job>')
  const folder = packageFolderOf(dir)
  const kind = loadJob(dir).kind === 'short' ? 'shorts' : 'long'
  const prefix = `${kind}/${basename(folder)}/`
  const { S3, client, bucket } = await archiveClient()

  const files: ArchivedFile[] = []
  const names = readdirSync(folder).filter((n) => statSync(join(folder, n)).isFile())
  for (const name of names) {
    const file = join(folder, name)
    const bytes = statSync(file).size
    const md5 = await md5File(file)
    const key = prefix + name
    console.log(`  uploading ${name} (${(bytes / 1e6).toFixed(1)} MB)`)
    // Content-MD5: Cloudflare refuses the upload if the bytes it got differ
    await client.send(new S3.PutObjectCommand({
      Bucket: bucket, Key: key, Body: createReadStream(file), ContentLength: bytes, ContentMD5: md5.toString('base64'),
    }))
    files.push({ name, key, bytes, md5: md5.toString('hex') })
  }

  // also keep the job's small "source" files (script, facts, metadata) with it
  for (const name of ['script.json', 'facts.json', 'metadata.json', 'audit.json']) {
    const file = join(dir, name)
    if (!existsSync(file)) continue
    const bytes = statSync(file).size
    const md5 = await md5File(file)
    const key = `${prefix}_job/${name}`
    await client.send(new S3.PutObjectCommand({ Bucket: bucket, Key: key, Body: createReadStream(file), ContentLength: bytes, ContentMD5: md5.toString('base64') }))
    files.push({ name: `_job/${name}`, key, bytes, md5: md5.toString('hex') })
  }

  const doc: ArchiveDoc = { bucket, prefix, folder, files, at: new Date().toISOString() }
  const missing = await verifyRemote(doc)
  if (missing.length) refuse(`upload check failed: ${missing.join('; ')}`)
  writeJson(join(dir, 'archive.json'), doc)
  result({ ok: true, bucket, prefix, files: files.length, total: gb(files.reduce((s, f) => s + f.bytes, 0)), verified: true })
})

// ------------------------------------------------------------
// archive-free <job> [--yes]
// ------------------------------------------------------------
register('archive-free', 'archive-free <job> [--yes]  — after a verified archive, list (or with --yes remove) the big local files', async (a) => {
  const dir = a.find((x) => !x.startsWith('--')) ?? refuse('give a job folder: archive-free <job>')
  const yes = a.includes('--yes')
  const manifest = join(dir, 'archive.json')
  if (!existsSync(manifest)) refuse('no archive.json — run `archive <job>` first')
  const doc = readJson<ArchiveDoc>(manifest)

  // 1) the archive must still be complete on Cloudflare right now
  const missing = await verifyRemote(doc)
  if (missing.length) refuse(`archive incomplete, nothing removed: ${missing.join('; ')}`)

  // 2) what can go: the big video files and working folders only
  const videoInPackage = doc.files.filter((f) => f.name.endsWith('.mp4')).map((f) => join(doc.folder, f.name))
  const jobBits = ['render', 'final.mp4', 'final.with-disclaimer.mp4', 'backup_v1', 'backup_v2', 'backup']
    .map((n) => join(dir, n))
  const targets = [...videoInPackage, ...jobBits].filter((p) => existsSync(p))
  const freed = targets.reduce((s, p) => s + sizeOf(p), 0)

  for (const t of targets) console.log(`  ${yes ? 'removing' : 'would remove'}: ${t} (${gb(sizeOf(t))})`)
  if (!yes) {
    result({ ok: true, dryRun: true, wouldFree: gb(freed), files: targets.length, keep: 'script, facts, voice, words, thumbnails, titles, description' })
    return
  }
  for (const t of targets) rmSync(t, { recursive: true, force: true })
  writeJson(manifest, { ...doc, freedAt: new Date().toISOString(), freed: gb(freed) })
  result({ ok: true, freed: gb(freed), removed: targets.length })
})

// ------------------------------------------------------------
// archive-list
// ------------------------------------------------------------
register('archive-list', 'archive-list  — list archived package folders and their sizes', async () => {
  const { S3, client, bucket } = await archiveClient()
  const sizes = new Map<string, number>()
  let token: string | undefined
  do {
    const r = await client.send(new S3.ListObjectsV2Command({ Bucket: bucket, ContinuationToken: token }))
    for (const o of r.Contents ?? []) {
      const folder = (o.Key ?? '').split('/').slice(0, 2).join('/')
      sizes.set(folder, (sizes.get(folder) ?? 0) + (o.Size ?? 0))
    }
    token = r.NextContinuationToken
  } while (token)
  for (const [f, s] of [...sizes].sort()) console.log(`  ${gb(s)}  ${f}`)
  const total = [...sizes.values()].reduce((x, y) => x + y, 0)
  result({ ok: true, bucket, folders: sizes.size, total: gb(total) })
})

// ------------------------------------------------------------
// archive-get "<part of the folder name>"
// ------------------------------------------------------------
register('archive-get', 'archive-get "<name>"  — download an archived package folder back to output/', async (a) => {
  const want = a.filter((x) => !x.startsWith('--')).join(' ').trim().toLowerCase() || refuse('give part of the video title')
  const { S3, client, bucket } = await archiveClient()
  const keys: string[] = []
  let token: string | undefined
  do {
    const r = await client.send(new S3.ListObjectsV2Command({ Bucket: bucket, ContinuationToken: token }))
    for (const o of r.Contents ?? []) if (o.Key && o.Key.split('/')[1]?.toLowerCase().includes(want)) keys.push(o.Key)
    token = r.NextContinuationToken
  } while (token)
  const folders = [...new Set(keys.map((k) => k.split('/').slice(0, 2).join('/')))]
  if (!folders.length) refuse(`nothing in the archive matches "${want}"`)
  if (folders.length > 1) refuse(`"${want}" matches ${folders.length} folders — be more specific: ${folders.join(' | ')}`)
  const [kind, name] = folders[0].split('/')
  const outDir = join(kind === 'shorts' ? OUT_SHORTS : OUT_LONG, name)
  for (const key of keys) {
    const rel = key.split('/').slice(2).join('/')
    if (rel.startsWith('_job/')) continue // job source files stay in the archive only
    const out = join(outDir, rel)
    mkdirSync(join(out, '..'), { recursive: true })
    const r = await client.send(new S3.GetObjectCommand({ Bucket: bucket, Key: key }))
    await pipeline(r.Body as Readable, createWriteStream(out))
    console.log(`  downloaded ${rel}`)
  }
  result({ ok: true, folder: outDir })
})
