// # CLI: package — metadata check, 3 thumbnails, captions, chapters, sources, review note → output/<kind>/<Title>_date_time/
import { copyFileSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ff } from '../audio'
import { register } from '../cli'
import { isDone, loadJob, markStep, readJson, writeJson } from '../jobs'
import { captionsSrt, chapterLines, checkMeta, folderName, sourcesTxt } from '../package'
import { HISTORY_FILE, OUT_LONG, OUT_SHORTS } from '../paths'
import { renderStills } from '../render'
import { refuse, result } from '../result'
import type { FactsDoc, MetaDoc, PlanDoc, ScriptDoc, TimedWord } from '../schema'
import { readHistory } from './plan'
import type { CriticDoc } from './qa'

// # PNG → JPEG under YouTube's 2 MB thumbnail limit
const toJpeg = (png: string, jpg: string) => {
  for (const q of [2, 4, 6, 9]) {
    ff(['-i', png, '-q:v', String(q), jpg], 'thumbnail jpeg')
    if (statSync(jpg).size < 1_900_000) return
  }
  throw new Error(`${jpg} is over 2 MB even at low quality`)
}

export const packageJob = async (dir: string, now = new Date()) => {
  const job = loadJob(dir)
  const short = job.kind === 'short'
  const meta = readJson<MetaDoc>(join(dir, 'metadata.json'))
  const script = readJson<ScriptDoc>(join(dir, 'script.json'))
  const facts = readJson<FactsDoc>(join(dir, 'facts.json'))
  const words = readJson<TimedWord[]>(join(dir, 'words.json'))
  const critic = existsSync(join(dir, 'critic.json')) ? readJson<CriticDoc>(join(dir, 'critic.json')) : null
  const qa = existsSync(join(dir, 'qa', 'report.json')) ? readJson<{ stats: object; flags: number[] }>(join(dir, 'qa', 'report.json')) : null

  const name = folderName(meta.titles[0], now)
  const out = join(short ? OUT_SHORTS : OUT_LONG, name)
  mkdirSync(out, { recursive: true })
  copyFileSync(join(dir, 'final.mp4'), join(out, `${name}_${short ? 'short' : 'long'}.mp4`))

  // # thumbnails (long videos; Shorts use a frame chosen in the app)
  const thumbs: string[] = []
  if (!short)
    for (const [i, spec] of meta.thumbnails.entries()) {
      const [png] = await renderStills('Thumb', spec as Record<string, unknown>, [0], join(dir, 'thumbs'), `thumb_${i + 1}`)
      const jpg = join(out, `thumb_${i + 1}.jpg`)
      toJpeg(png, jpg)
      thumbs.push(jpg)
    }

  const chapters = short ? [] : chapterLines(words, script)
  const sources = sourcesTxt(facts)
  const description = [meta.description.trim(), chapters.length >= 3 ? `Chapters\n${chapters.join('\n')}` : '', sources.trim(),
    'Educational content only — not financial advice.'].filter(Boolean).join('\n\n')
  writeFileSync(join(out, 'titles.txt'), meta.titles.map((t, i) => `${i + 1}. ${t}`).join('\n') + '\n')
  writeFileSync(join(out, 'description.txt'), description + '\n')
  writeFileSync(join(out, 'tags.txt'), meta.tags.join(', ') + '\n')
  writeFileSync(join(out, 'captions.srt'), captionsSrt(words, script))
  writeFileSync(join(out, 'sources.txt'), sources)
  if (short) writeFileSync(join(out, 'captions_for_posting.txt'), `${meta.titles[0]}\n\n${meta.description.trim()}\n\n${meta.tags.map((t) => `#${t.replace(/\s+/g, '')}`).join(' ')}\n`)
  writeFileSync(join(out, 'review_note.md'), [
    `# ${meta.titles[0]}`, '',
    `Thesis: ${script.thesis}`, `Area: ${script.area} · Format: ${script.format}`, '',
    '## Critic', critic ? `Score ${critic.score}/10 — ${critic.notes ?? ''}` : 'not run', '',
    ...(() => {
      const st = job.steps.critic as { round?: number; flagged?: string[]; note?: string } | undefined
      return st?.flagged?.length ? [`Accepted after round ${st.round} without a further Critic pass. Director's note: ${st.note}`, 'Fixes from that round (check them while watching):', ...st.flagged.map((f) => `- [ ] ${f}`), ''] : []
    })(),
    '## QA', qa ? `${JSON.stringify(qa.stats)} · flicker flags: ${qa.flags.length}` : 'not run', '',
    '## Upload checklist',
    `- [ ] Pick a title (titles.txt) and ${short ? 'post as a Short (vertical, under 3:00)' : 'a thumbnail (thumb_1..3.jpg) — A/B test with "Test & compare"'}`,
    '- [ ] Paste description.txt (chapters + sources included) and tags.txt',
    `- [ ] ${short ? 'Burned-in captions are in the video' : 'Upload captions.srt as English subtitles'}`,
    '- [ ] Altered/synthetic content: "No" (illustrated animation, no realistic people) — the voice is AI; mention it in the description if you prefer',
    '- [ ] Watch once end to end before publishing', '',
  ].join('\n'))

  // # history feeds the variety gate and the topic quota for later videos
  const plan = readJson<PlanDoc>(join(dir, 'plan.json'))
  const hist = readHistory()
  hist.push({ job: dir, scenes: [...new Set(plan.shots.flatMap((s) => (s.kind === 'scene' ? [s.scene] : [])))],
    slides: [...new Set(plan.shots.flatMap((s) => (s.kind === 'slide' ? [s.slide] : [])))], area: script.area, format: script.format, kind: job.kind, title: meta.titles[0], date: now.toISOString() })
  writeJson(HISTORY_FILE, hist.filter((h, i, all) => all.findIndex((x) => x.job === h.job) === i))
  return { folder: out, thumbs: thumbs.length }
}

register('package', 'package <job>  — metadata.json → thumbnails, captions, description, review note in output/', async (a) => {
  const dir = a[0] ?? refuse('give the job folder')
  if (!isDone(dir, 'critic')) refuse('run critic first (the Critic must pass the video)')
  if (!existsSync(join(dir, 'metadata.json'))) refuse('metadata.json missing')
  const bad = checkMeta(readJson<MetaDoc>(join(dir, 'metadata.json')), { short: loadJob(dir).kind === 'short' })
  if (bad.length) { for (const p of bad) console.log(`  - ${p}`); refuse(`metadata has ${bad.length} problem(s)`) }
  const r = await packageJob(dir)
  markStep(dir, 'package', r)
  result({ ok: true, ...r })
})
