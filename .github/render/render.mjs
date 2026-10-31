// ============================================================
// GITHUB RUNNER — renders one frame range of a CapitalCode video
// from the art site on S3 (deployed by `cloud setup` / a cloud
// render) and uploads the muted part back to S3. The laptop joins
// the parts, checks every frame count and adds the audio.
// Env: SERVE_URL, BUCKET, REGION, JOB, FROM, TO + AWS keys.
// ============================================================
import { cpus } from 'node:os'
import { readFileSync } from 'node:fs'
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { renderMedia, selectComposition } from '@remotion/renderer'

const { SERVE_URL, BUCKET, REGION, JOB, FROM, TO } = process.env
const from = Number(FROM), to = Number(TO)
const s3 = new S3Client({ region: REGION })

// # the inputs (the timeline) are uploaded by the laptop next to the parts
const props = JSON.parse(await (await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: `gh/${JOB}/props.json` }))).Body.transformToString())
const timeout = 120_000
const composition = await selectComposition({ serveUrl: SERVE_URL, id: 'Episode', inputProps: props, timeoutInMilliseconds: timeout })
const out = `part_${from}_${to}.mp4`
let last = -1
// # same settings as the laptop render (agent/render.ts remotionRange), so parts and chunks look identical
await renderMedia({
  serveUrl: SERVE_URL, composition, inputProps: props, codec: 'h264', crf: 18, pixelFormat: 'yuv420p', imageFormat: 'jpeg', jpegQuality: 92,
  frameRange: [from, to - 1], outputLocation: out, muted: true, timeoutInMilliseconds: timeout, concurrency: cpus().length,
  onProgress: ({ progress }) => { const p = Math.floor(progress * 10); if (p > last) { last = p; console.log(`${p * 10}%`) } },
})
await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: `gh/${JOB}/${out}`, Body: readFileSync(out), ContentType: 'video/mp4' }))
console.log(`uploaded ${out}`)
