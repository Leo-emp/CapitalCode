// ============================================================
// CATALOG — every id the Visual Director and Publisher may use,
// read straight from the art registries (never a hand-kept list
// that drifts). `cli catalog` writes it to temp/catalog.md.
// ============================================================
import { CAST } from '../art/rig/Actor'
import { EXPRESSIONS } from '../art/rig/faces'
import { POSE_IDS } from '../art/rig/pose'
import { PROPS } from '../art/props/registry'
import { SCENES } from '../art/scenes/registry'
import { LAYOUTS, TONES } from './package'
import { DECOR_FIGURES, SLIDE_KINDS } from './slides'
export { DECOR_FIGURES }


// # The data shape each slide kind expects (what SLIDE_SPECS checks) + how many cues it takes
const SLIDE_HINTS: Record<string, string> = {
  number: '{ value: number, prefix?, suffix?, label? } — cues: count-up, label (≤ 2)',
  equation: '{ parts: [{ text } | { op: "×" | "→" | "=" | "+" | "−" }] } — one cue per part',
  bars: '{ bars: [{ label, value: number }] } — one cue per bar',
  line: '{ values: number[] (≥ 2), labels?, annotate? } — cues: draw, end (+ annotate)',
  stacked: '{ segments: [{ label, value }] } — one cue per segment',
  flow: '{ nodes: [{ title, sub? }] } — one cue per node',
  timeline: '{ points: [{ when, what }] } — one cue per point',
  compare: '{ cards: [{ title, value, lines: string[] }] } — one cue per card',
  map: '{ pins: [{ x, y, label }] } — one cue per pin',
  quote: '{ quote, who } — 1 cue',
  slam: '{ words: [{ text, tone? }] } — one cue per word',
}

export const catalog = (sfx: string[]) => ({
  scenes: SCENES.map((s) => ({ id: s.id, title: s.title, tags: [...(s.tags ?? [])], anchors: Object.keys(s.anchors) })),
  props: PROPS.map((p) => ({ id: p.id, tags: [...(p.tags ?? [])] })),
  poses: [...POSE_IDS] as string[],
  expressions: [...EXPRESSIONS] as string[],
  cast: [...CAST],
  slides: SLIDE_KINDS.map((k) => ({ kind: k, data: SLIDE_HINTS[k] ?? '(see agent/slides.ts)' })),
  sfx,
  thumbnail: { layouts: [...LAYOUTS], tones: [...TONES] },
})
export type Catalog = ReturnType<typeof catalog>

export const catalogMarkdown = (c: Catalog) => [
  '# CapitalCode catalog (generated — do not edit)',
  '',
  `**Cast (actor \`who\` / thumbnail \`look\`):** ${c.cast.map((x) => `\`${x}\``).join(', ')}`,
  `**Poses:** ${c.poses.map((x) => `\`${x}\``).join(', ')}`,
  `**Expressions:** ${c.expressions.map((x) => `\`${x}\``).join(', ')}`,
  `**SFX:** ${c.sfx.map((x) => `\`${x}\``).join(', ') || '(none found)'}`,
  `**Thumbnail layouts:** ${c.thumbnail.layouts.join(', ')} · **tones:** ${c.thumbnail.tones.join(', ')}`,
  '',
  '## Slides',
  ...c.slides.map((s) => `- \`${s.kind}\` — ${s.data}`),
  '',
  `## Scenes (${c.scenes.length})`,
  '| id | title | tags | anchors |',
  '|---|---|---|---|',
  ...c.scenes.map((s) => `| \`${s.id}\` | ${s.title}${DECOR_FIGURES.includes(s.id) ? ' ⚠ shows made-up figures (needs decorOk)' : ''} | ${s.tags.join(', ')} | ${s.anchors.join(', ')} |`),
  '',
  `## Props (${c.props.length})`,
  ...c.props.map((p) => `- \`${p.id}\` (${p.tags.join(', ')})`),
  '',
].join('\n')
