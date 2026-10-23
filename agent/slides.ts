// ============================================================
// SLIDE SPECS — for each infographic kind: how many cue-able items
// its data has (so missing cues can be padded) and a data check
// (so a malformed slide is refused at the gate, never mid-render).
// ============================================================
type Spec = { items: (d: any) => number; check: (d: any) => string | null }

const arr = (d: any, key: string, need: string[]): string | null => {
  const list = d?.[key]
  if (!Array.isArray(list) || !list.length) return `needs a non-empty "${key}" list`
  for (const [i, x] of list.entries()) for (const k of need) if (x?.[k] === undefined || x?.[k] === '') return `${key}[${i}] needs "${k}"`
  return null
}
const num = (v: unknown) => typeof v === 'number' && Number.isFinite(v)

export const SLIDE_SPECS: Record<string, Spec> = {
  number: { items: () => 2, check: (d) => (num(d?.value) ? null : 'needs a numeric "value"') },
  equation: { items: (d) => d.parts.length, check: (d) => arr(d, 'parts', []) ?? (d.parts.every((p: any) => p.text || p.op) ? null : 'each part needs "text" or "op"') },
  bars: { items: (d) => d.bars.length, check: (d) => arr(d, 'bars', ['label', 'value']) ?? (d.bars.every((b: any) => num(b.value)) ? null : 'bar values must be numbers') },
  line: { items: (d) => (d.annotate ? 3 : 2), check: (d) => (Array.isArray(d?.values) && d.values.length >= 2 && d.values.every(num) ? null : 'needs "values": at least 2 numbers') },
  stacked: { items: (d) => d.segments.length, check: (d) => arr(d, 'segments', ['label', 'value']) },
  flow: { items: (d) => d.nodes.length, check: (d) => arr(d, 'nodes', ['title']) },
  timeline: { items: (d) => d.points.length, check: (d) => arr(d, 'points', ['when', 'what']) },
  compare: { items: (d) => d.cards.length, check: (d) => arr(d, 'cards', ['title', 'value', 'lines']) },
  map: { items: (d) => d.pins.length, check: (d) => arr(d, 'pins', ['x', 'y', 'label']) },
  quote: { items: () => 1, check: (d) => (d?.quote && d?.who ? null : 'needs "quote" and "who"') },
  slam: { items: (d) => d.words.length, check: (d) => arr(d, 'words', ['text']) },
}
export const SLIDE_KINDS = Object.keys(SLIDE_SPECS)
