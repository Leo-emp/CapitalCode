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

// # A Short's 3 covers (art/thumbnails/ThumbShort.tsx): a sticker title, a stake object cut from one frame, a cast close-up.
// # `crop.at` is a cue word ("s30:five"), so a re-timed voice still lands on the same moment.
export const SHORT_BGS = ['navy', 'black', 'gold', 'cream']
export const checkShortCover = (t: Record<string, any>, n: string, cues: Record<string, number> = {}): string[] => {
  const p: string[] = []
  const lines = Array.isArray(t.title) ? t.title as { t: string; size: string; accent?: boolean }[] : []
  const words = lines.flatMap((l) => String(l.t ?? '').split(/\s+/).filter(Boolean))
  if (lines.length < 1 || lines.length > 4) p.push(`${n}: title needs 1–4 lines`)
  if (words.length < 2 || words.length > 6) p.push(`${n}: title needs 2–6 words (got ${words.length})`)
  for (const l of lines) {
    if (!['s', 'm', 'l'].includes(l.size)) p.push(`${n}: line "${l.t}" size must be s/m/l`)
    // # widest line ≈ 0.42 em per character must fit 1020 px
    if (String(l.t).length * 0.42 * ({ s: 92, m: 150, l: 230 } as Record<string, number>)[l.size] > 1020) p.push(`${n}: line "${l.t}" is too wide for its size`)
  }
  if (!lines.some((l) => l.size === 'l')) p.push(`${n}: one line must be large (the key word)`)
  if (t.bg && !SHORT_BGS.includes(t.bg)) p.push(`${n}: bg must be ${SHORT_BGS.join('/')}`)
  if (!t.crop && !t.character) p.push(`${n}: needs a stake object (crop) or a character`)
  if (t.crop) {
    const c = t.crop
    if (typeof c.at !== 'string' || (Object.keys(cues).length && cues[c.at] === undefined)) p.push(`${n}: crop.at "${c.at}" is not a cue word`)
    if (![c.x, c.y, c.w, c.h].every((v) => typeof v === 'number') || c.w < 100 || c.h < 100 || c.x < 0 || c.y < 0 || c.x + c.w > 1080 || c.y + c.h > 1920) p.push(`${n}: crop must be a region inside 1080×1920`)
  }
  if (t.character) {
    if (!(POSE_IDS as string[]).includes(t.character.pose)) p.push(`${n}: unknown pose "${t.character.pose}"`)
    if (!(EXPRESSIONS as string[]).includes(t.character.expression)) p.push(`${n}: unknown expression "${t.character.expression}"`)
    if (t.character.look && !CAST.includes(t.character.look)) p.push(`${n}: unknown look "${t.character.look}"`)
  }
  return p
}

// # A long video's 3 thumbnails (art/thumbnails/ThumbLong.tsx): words that state the point + a picture cut from the
// # video's own art (crop.at = a cue word, region of the 1920×1080 frame); style panel / banner / stack; owner rule r73.
export const LONG_STYLES = ['panel', 'banner', 'stack']
export const LONG_PANELS = ['cream', 'yellow', 'sky', 'coral']
export const checkLongThumb = (t: Record<string, any>, n: string, cues: Record<string, number> = {}): string[] => {
  const p: string[] = []
  if (!LONG_STYLES.includes(t.style)) p.push(`${n}: style must be ${LONG_STYLES.join('/')}`)
  const ws = String(t.words ?? '').trim().split(/\s+/).filter(Boolean)
  if (ws.length < 2 || ws.length > 6 || String(t.words).length > 34) p.push(`${n}: "${t.words}" — needs 2–6 words that state the point (≤ 34 chars)`)
  if ((t.accent ?? []).some((k: number) => k >= ws.length)) p.push(`${n}: accent index past the last word`)
  if (t.panel && !LONG_PANELS.includes(t.panel)) p.push(`${n}: panel must be ${LONG_PANELS.join('/')}`)
  const c = t.crop
  if (!c) p.push(`${n}: needs a picture (crop) cut from the video's own art`)
  else {
    if (typeof c.at !== 'string' || (Object.keys(cues).length && cues[c.at] === undefined)) p.push(`${n}: crop.at "${c.at}" is not a cue word`)
    if (![c.x, c.y, c.w, c.h].every((v) => typeof v === 'number') || c.w < 200 || c.h < 200 || c.x < 0 || c.y < 0 || c.x + c.w > 1920 || c.y + c.h > 1080) p.push(`${n}: crop must be a region inside 1920×1080`)
  }
  if (t.character) {
    if (!(POSE_IDS as string[]).includes(t.character.pose)) p.push(`${n}: unknown pose "${t.character.pose}"`)
    if (!(EXPRESSIONS as string[]).includes(t.character.expression)) p.push(`${n}: unknown expression "${t.character.expression}"`)
    if (t.character.look && !CAST.includes(t.character.look)) p.push(`${n}: unknown look "${t.character.look}"`)
  }
  return p
}

export const checkMeta = (m: MetaDoc, o: { short?: boolean; cues?: Record<string, number> } = {}): string[] => {
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
  // # drawn covers (owner 2026-11-09): 1–3 are fine; template thumbnails still need 3
  const drawn = (m.thumbnails ?? []).length > 0 && (m.thumbnails ?? []).every((t) => (t as Record<string, any>).cover)
  if (drawn ? m.thumbnails.length > 3 : m.thumbnails?.length !== 3) p.push(`need 3 thumbnails (got ${m.thumbnails?.length ?? 0})`)
  if (o.short) {
    ;(m.thumbnails ?? []).forEach((raw, i) => (raw as Record<string, any>).cover ? null : p.push(...checkShortCover(raw as Record<string, any>, `thumbnail ${i + 1}`, o.cues)))
    return p
  }
  ;(m.thumbnails ?? []).forEach((raw, i) => {
    const t = raw as Record<string, any>
    const n = `thumbnail ${i + 1}`
    if (t.cover) return
    if (t.style) { p.push(...checkLongThumb(t, n, o.cues)); return }
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
