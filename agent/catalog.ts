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
import { VIGNETTES } from '../art/vignettes/registry'
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
  vignettes: VIGNETTES.map((v) => ({ id: v.id, title: v.title, tags: v.tags, data: v.hint })),
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
  '## Living film — scene shot fields (every one is cued to the word it shows)',
  '- `camera`: `[{ at: cue, to: spot | { x, y }, zoom? }]` — glide to what is being named (people framed at the chest; first move defaults to a 1.35× push). Counts as a shown event.',
  '- `path` (on an actor): `[{ at: cue, to: spot }]` — walk there; legs run one after another; the camera follows a walker when no `camera` is planned.',
  '- `give` (on a held prop): `{ at: cue, to: actor index }` — hand it over; both reach out, it arcs across.',
  '- track key `expression` changes blend over 8 frames (worried → relieved) — a change of feeling counts as an event; talk poses (idle/talk/present) do not.',
  '- `enter.zoomInto` (any shot): `spot of the previous scene | { x, y }` — this shot grows out of that point (18-frame fly-in). Use it between related shots instead of a cut.',
  '- `world`: `night` (default, ~70%) | `teal` (~30%: chapter changes, flashbacks, inside places).',
  '- `text`: `[{ words, at: cue, style: pop | type | stamp | count, anchor? }]` — a key word or number now and then; max 2 per shot; counts 1.5 s toward the 25% text share.',
  '- Automatic (never plan these): blinking, breathing, glances, sway, talk gestures while the voice speaks, camera drift.',
  '',
  '## Vignettes — animated mini-scenes that SHOW what the voice says (shot kind "vignette")',
  ...c.vignettes.map((v) => `- \`${v.id}\` — ${v.title}. ${v.data}`),
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
