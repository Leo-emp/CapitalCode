// ============================================================
// PACKAGE — everything the owner needs to upload: the video,
// 3 thumbnails, 3 titles, description (+ YouTube chapters), tags,
// captions from the script, sources, and a review note.
// Output: output/long/<Title>_YYYY-MM-DD_HH-MM/ (shorts: output/shorts/…)
// ============================================================
import { CAST } from '../art/rig/Actor'
import { EXPRESSIONS } from '../art/rig/faces'
import { POSE_IDS } from '../art/rig/pose'
import { PROPS } from '../art/props/registry'
import { SCENES } from '../art/scenes/registry'
import { normaliseWord } from '../art/timing'
import type { FactsDoc, MetaDoc, ScriptDoc, TimedWord } from './schema'

// ---------------------------------------------------------------- captions
const pad = (n: number, w = 2) => String(n).padStart(w, '0')
export const srtTime = (t: number) => {
  const ms = Math.max(0, Math.round(t * 1000))
  return `${pad(Math.floor(ms / 3600000))}:${pad(Math.floor(ms / 60000) % 60)}:${pad(Math.floor(ms / 1000) % 60)}:${pad(ms % 1000, 3)}`.replace(/:(\d{3})$/, ',$1')
}

// # Script tokens (with punctuation) timed by the voiced words of their sentence
export const timedTokens = (words: TimedWord[], script: ScriptDoc) =>
  script.chapters.flatMap((c) => c.sentences).map((s) => {
    const ev = words.filter((w) => w.sid === s.id)
    let k = 0
    const toks: { text: string; s?: number; e?: number }[] = s.text.split(/\s+/).filter(Boolean).map((text) => {
      const want = normaliseWord(text)
      for (let j = k; j < Math.min(ev.length, k + 3); j++)
        if (normaliseWord(ev[j].w) === want) { k = j + 1; return { text, s: ev[j].s, e: ev[j].e } }
      return { text }
    })
    // # tokens Azure did not time (e.g. a dash) borrow their neighbours' times
    toks.forEach((t, i) => {
      if (t.s === undefined) { t.s = toks[i - 1]?.e ?? ev[0]?.s ?? 0; t.e = toks.slice(i + 1).find((x) => x.s !== undefined)?.s ?? t.s }
    })
    return { sid: s.id, toks: toks as { text: string; s: number; e: number }[] }
  })

// # One line per cue, ≤ 42 chars and ≤ 4 s, breaking at sentence ends
export const captionsSrt = (words: TimedWord[], script: ScriptDoc, maxChars = 42, maxSecs = 4) => {
  const cues: { s: number; e: number; text: string }[] = []
  for (const { toks } of timedTokens(words, script)) {
    let cur: typeof toks = []
    const flush = () => { if (cur.length) cues.push({ s: cur[0].s, e: cur[cur.length - 1].e, text: cur.map((t) => t.text).join(' ') }); cur = [] }
    for (const t of toks) {
      const len = [...cur, t].map((x) => x.text).join(' ').length
      if (cur.length && (len > maxChars || t.e - cur[0].s > maxSecs)) flush()
      cur.push(t)
    }
    flush()
  }
  return cues.map((c, i) => `${i + 1}\n${srtTime(c.s)} --> ${srtTime(Math.max(c.e, c.s + 0.5))}\n${c.text}\n`).join('\n')
}

// ---------------------------------------------------------------- chapters, names, sources
const clock = (t: number) => {
  const s = Math.floor(t), h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60
  return h ? `${h}:${pad(m)}:${pad(s % 60)}` : `${m}:${pad(s % 60)}`
}
export const chapterLines = (words: TimedWord[], script: ScriptDoc) =>
  script.chapters.map((c, i) => `${i === 0 ? '0:00' : clock(words.find((w) => w.sid === c.sentences[0].id)?.s ?? 0)} ${c.title}`)

export const folderName = (title: string, now = new Date()) => {
  const safe = title.replace(/[<>:"/\\|?*“”‘’]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60).trim()
  return `${safe}_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}`
}

export const sourcesTxt = (facts: FactsDoc) => {
  const seen = new Set<string>()
  const lines = facts.facts.filter((f) => !seen.has(f.url) && seen.add(f.url)).map((f) => `- ${f.source} (${f.asOf}): ${f.url}${f.note ? ` — ${f.note}` : ''}`)
  return `Sources\n${lines.join('\n')}\n`
}

// ---------------------------------------------------------------- metadata check
const HYPE = ['guaranteed', 'get rich quick', 'overnight', 'secret they', 'you won\'t believe', 'free money', '100x', 'to the moon']
export const LAYOUTS = ['hero-left', 'object-center', 'split']
export const TONES = ['champagne', 'green', 'red', 'white']

// # Shorts have no thumbnails (the cover frame is picked in the YouTube app)
export const checkMeta = (m: MetaDoc, o: { short?: boolean } = {}): string[] => {
  const p: string[] = []
  if (m.titles?.length !== 3) p.push(`need 3 titles (got ${m.titles?.length ?? 0})`)
  ;(m.titles ?? []).forEach((t, i) => {
    if (t.length > 70) p.push(`title ${i + 1} is over 70 chars (${t.length})`)
    for (const h of HYPE) if (t.toLowerCase().includes(h)) p.push(`title ${i + 1}: hype word "${h}"`)
  })
  if (!m.description || m.description.length < 200) p.push('description needs ≥ 200 chars')
  if ((m.description ?? '').length > 4500) p.push('description over 4500 chars (chapters + sources are appended)')
  for (const h of HYPE) if ((m.description ?? '').toLowerCase().includes(h)) p.push(`description: hype word "${h}"`)
  if (!m.tags || m.tags.length < 3) p.push('need ≥ 3 tags')
  if ((m.tags ?? []).join(',').length > 480) p.push('tags over 480 chars')
  if (!o.short && m.thumbnails?.length !== 3) p.push(`need 3 thumbnails (got ${m.thumbnails?.length ?? 0})`)
  ;(m.thumbnails ?? []).forEach((raw, i) => {
    const t = raw as Record<string, any>
    const n = `thumbnail ${i + 1}`
    if (!LAYOUTS.includes(t.layout)) p.push(`${n}: layout must be ${LAYOUTS.join('/')}`)
    const ws = String(t.words ?? '').trim().split(/\s+/).filter(Boolean)
    if (!ws.length || ws.length > 5 || String(t.words).length > 28) p.push(`${n}: "${t.words}" — too many words (2–5 words, ≤ 28 chars)`)
    if ((t.accent ?? []).some((k: number) => k >= ws.length)) p.push(`${n}: accent index past the last word`)
    if (t.tone && !TONES.includes(t.tone)) p.push(`${n}: tone must be ${TONES.join('/')}`)
    if (t.prop && !PROPS.some((x) => x.id === t.prop)) p.push(`${n}: unknown prop "${t.prop}"`)
    if (t.scene && !SCENES.some((x) => x.id === t.scene)) p.push(`${n}: unknown scene "${t.scene}"`)
    if (t.character) {
      if (!(POSE_IDS as string[]).includes(t.character.pose)) p.push(`${n}: unknown pose "${t.character.pose}"`)
      if (!(EXPRESSIONS as string[]).includes(t.character.expression)) p.push(`${n}: unknown expression "${t.character.expression}"`)
      if (t.character.look && !CAST.includes(t.character.look)) p.push(`${n}: unknown look "${t.character.look}"`)
    }
  })
  return p
}
