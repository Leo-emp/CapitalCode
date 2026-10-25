// # CLI: render — pre-flight stills, chunked resumable video, SFX mix, mux → final.mp4
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { register } from '../cli'
import { isDone, loadJob, markStep, readJson, unmarkFrom } from '../jobs'
import { artFingerprint, autoSfx, MIX, chunkKeys, concatVideos, countFrames, mixAudio, mux, pruneChunks, remotionRange, renderChunks, renderStills, splitChunks } from '../render'
import { refuse, result } from '../result'
import { renderKeyFor } from '../run'
import type { Timeline } from '../timeline'
import { fileHash } from './script'

const log = (s: string) => console.log(`  ${new Date().toISOString().slice(11, 19)} ${s}`)

// # Each stage writes a stamp; a stage re-runs only when what it was built from changed
const stamped = (file: string, key: string) => existsSync(file) && existsSync(`${file}.key`) && readFileSync(`${file}.key`, 'utf8') === key
const stamp = (file: string, key: string) => writeFileSync(`${file}.key`, key)

export const renderVideo = async (dir: string, tl: Timeline, voiceWav: string, out = join(dir, 'final.mp4')) => {
  const art = artFingerprint()
  const props = { timeline: tl }
  const t0 = Date.now()

  // # 1. pre-flight: one still per shot catches a broken drawing in seconds, not after an hour
  const pre = join(dir, 'qa', 'preflight')
  const preKey = `${JSON.stringify(art)}:${JSON.stringify(tl.shots.map((s) => s.from))}:${fileHash(join(dir, 'timeline.json'))}`
  if (!stamped(join(pre, 'done'), preKey)) {
    log(`pre-flight: ${tl.shots.length} stills`)
    await renderStills('Episode', props, tl.shots.map((s) => Math.round(s.from + (s.to - s.from) * 0.6)), pre, 'shot')
    writeFileSync(join(pre, 'done'), 'ok')
    stamp(join(pre, 'done'), preKey)
  }

  // # 2. chunks (resumable), 3. concat
  const chunks = chunkKeys(tl, splitChunks(tl.shots, tl.durationInFrames), art)
  log(`render: ${chunks.length} chunk(s), ${tl.durationInFrames} frames`)
  const files = await renderChunks(chunks, join(dir, 'render'), await remotionRange(props), { log })
  const video = join(dir, 'render', 'video.mp4')
  const vKey = chunks.map((c) => c.key).join(',')
  if (!stamped(video, vKey)) { concatVideos(files, video); stamp(video, vKey) }
  if (countFrames(video) !== tl.durationInFrames) throw new Error(`video has ${countFrames(video)} frames, expected ${tl.durationInFrames}`)
  // # the joined video is verified, so chunks from older plan/art versions can go
  const pruned = pruneChunks(join(dir, 'render'), files)
  if (pruned.length) log(`pruned ${pruned.length} old chunk(s)`)

  // # 4. audio: voice + planned SFX + soft whooshes on cuts, −14 LUFS, 5. mux
  const audio = join(dir, 'render', 'audio.wav')
  const sfx = autoSfx(tl)
  const aKey = `${fileHash(voiceWav)}:${JSON.stringify(sfx)}:${tl.durationInFrames}:${tl.canvas ?? 'wide'}:v2`
  if (!stamped(audio, aKey)) { log(`mix: voice + ${sfx.length} sfx`); mixAudio(voiceWav, sfx, tl.durationInFrames / tl.fps, audio, undefined, tl.canvas === 'tall' ? MIX.short : MIX.long); stamp(audio, aKey) }
  mux(video, audio, out)
  const secs = (Date.now() - t0) / 1000
  return { file: out, frames: tl.durationInFrames, seconds: Math.round(secs), chunks: chunks.length }
}

register('render', 'render <job>  — pre-flight stills, chunked render (resumable), SFX mix, final.mp4', async (a) => {
  const dir = a[0] ?? refuse('give the job folder')
  if (!isDone(dir, 'gate_plan')) refuse('run gate-plan first')
  if (loadJob(dir).steps.gate_plan?.hash !== fileHash(join(dir, 'plan.json'))) refuse('plan.json changed since gate-plan — run gate-plan again')
  const r = await renderVideo(dir, readJson<Timeline>(join(dir, 'timeline.json')), join(dir, 'voice.wav'))
  unmarkFrom(dir, 'render')
  markStep(dir, 'render', { ...r, key: renderKeyFor(dir) })
  result({ ok: true, ...r, next: 'gate-video' })
})
