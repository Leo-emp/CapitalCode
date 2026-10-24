// # CLI: shorts — 3–5 vertical Shorts cut from a finished long job: pick clips, slice, caption, render, QA, package
import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ff } from '../audio'
import { register } from '../cli'
import { gateVideo, plannedMotion } from '../gates/video'
import { isDone, loadJob, markStep, readJson, writeJson } from '../jobs'
import { folderName, timedTokens } from '../package'
import { OUT_SHORTS } from '../paths'
import { artFingerprint, autoSfx, chunkKeys, concatVideos, countFrames, mixAudio, mux, pruneChunks, remotionRange, renderChunks, splitChunks } from '../render'
import { refuse, result } from '../result'
import type { MetaDoc, ScriptDoc, TimedWord } from '../schema'
import { captionChunks, type Clip, hookFor, pickClips, sentenceInfo, sliceTimeline } from '../shorts'
import type { Timeline } from '../timeline'

const log = (s: string) => console.log(`  ${new Date().toISOString().slice(11, 19)} ${s}`)
type Planned = Clip & { hook: string }

register('shorts', 'shorts <job> [--n=3]  — vertical Shorts cut from a finished long video (clips, captions, render, QA, package)', async (a) => {
  const dir = a[0] ?? refuse('give the job folder')
  if (!isDone(dir, 'render')) refuse('render the long video first')
  const n = Number(a.find((x) => x.startsWith('--n='))?.slice(4) ?? 3)
  const script = readJson<ScriptDoc>(join(dir, 'script.json'))
  const words = readJson<TimedWord[]>(join(dir, 'words.json'))
  const tl = readJson<Timeline>(join(dir, 'timeline.json'))
  const meta = existsSync(join(dir, 'metadata.json')) ? readJson<MetaDoc>(join(dir, 'metadata.json')) : null
  const sdir = join(dir, 'shorts')
  mkdirSync(sdir, { recursive: true })

  // # 1. clips: the director may edit shorts/clips.json (hooks, ranges); otherwise pick automatically
  const plannedFile = join(sdir, 'clips.json')
  const sents = sentenceInfo(script, words, tl)
  const clips: Planned[] = existsSync(plannedFile) ? readJson<Planned[]>(plannedFile)
    : pickClips(sents, { n, avoid: tl.shots.filter((x) => x.shot.kind === 'brand').map((x) => [x.from / tl.fps, x.to / tl.fps] as [number, number]) }).map((c) => ({ ...c, hook: hookFor(sents.find((s) => s.id === c.first)!.text) }))
  if (!clips.length) refuse('no 30–58 s clip opens on a hook sentence — write shorts/clips.json by hand')
  writeJson(plannedFile, clips)

  const toks = timedTokens(words, script).flatMap((x) => x.toks)
  const fp = artFingerprint()
  const outName = folderName(meta?.titles[0] ?? script.title)
  const out = join(OUT_SHORTS, outName)
  mkdirSync(out, { recursive: true })
  const made: { file: string; hook: string; seconds: number; lufs: number }[] = []

  for (const [k, c] of clips.entries()) {
    const cdir = join(sdir, `short_${k + 1}`)
    mkdirSync(cdir, { recursive: true })
    log(`short ${k + 1}: ${c.first}–${c.last} (${(c.t1 - c.t0).toFixed(1)} s) "${c.hook}"`)
    // # 2. timeline + captions for this clip
    const ct = sliceTimeline(tl, c.t0, c.t1)
    const captions = captionChunks(toks.filter((t) => t.s >= c.t0 - 0.01 && t.s < c.t1), c.t0)
    const props = { timeline: ct, captions, hook: c.hook }
    writeJson(join(cdir, 'short.json'), props)
    // # 3. render (chunked + cached; captions/hook are part of the key so an edited hook never reuses stale frames)
    const extra = createHash('sha256').update(JSON.stringify([captions, c.hook])).digest('hex').slice(0, 8)
    const chunks = chunkKeys(ct, splitChunks(ct.shots, ct.durationInFrames), { ...fp, base: `${fp.base}:${extra}` })
    const files = await renderChunks(chunks, join(cdir, 'render'), await remotionRange(props, 'Short'), { log })
    const video = join(cdir, 'render', 'video.mp4')
    concatVideos(files, video)
    if (countFrames(video) !== ct.durationInFrames) refuse(`short ${k + 1}: ${countFrames(video)} frames, expected ${ct.durationInFrames}`)
    pruneChunks(join(cdir, 'render'), files)
    // # 4. audio: the clip's voice + its sound effects (+ soft whooshes on cuts), −14 LUFS
    const seg = join(cdir, 'voice.wav')
    ff(['-ss', c.t0.toFixed(3), '-t', (c.t1 - c.t0).toFixed(3), '-i', join(dir, 'voice.wav'), seg], 'cut voice')
    const audio = join(cdir, 'audio.wav')
    mixAudio(seg, autoSfx(ct), ct.durationInFrames / ct.fps, audio)
    const final = join(cdir, 'final.mp4')
    mux(video, audio, final)
    // # 5. QA: length, loudness, flicker
    const r = gateVideo(final, { expectSeconds: ct.durationInFrames / ct.fps, cuts: plannedMotion(ct) })
    if (!r.ok) { for (const p of r.problems) console.log(`  - ${p}`); refuse(`short ${k + 1} failed QA`) }
    const file = join(out, `short_${k + 1}.mp4`)
    copyFileSync(final, file)
    made.push({ file, hook: c.hook, seconds: r.stats.seconds, lufs: r.stats.lufs })
  }

  // # 6. posting text: hook as the title, pointer to the full video, hashtags from the long video's tags
  const tags = (meta?.tags ?? []).slice(0, 6).map((t) => `#${t.replace(/[^\w]/g, '')}`).join(' ')
  writeFileSync(join(out, 'captions_for_posting.txt'), made.map((m, i) =>
    `SHORT ${i + 1} (${m.seconds.toFixed(0)} s)\nTitle: ${m.hook}\nCaption: ${m.hook} Full video: "${meta?.titles[0] ?? script.title}" on the channel. Educational content, not financial advice.\n${tags} #shorts\n`).join('\n'))
  markStep(dir, 'shorts', { count: made.length, folder: out })
  result({ ok: true, shorts: made.length, folder: out, items: made.map((m) => ({ hook: m.hook, seconds: m.seconds, lufs: m.lufs })) })
})
