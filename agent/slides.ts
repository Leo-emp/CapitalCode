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

// ------------------------------------------------------------ layout budgets
// # Limits that keep every slide inside the 1920×1080 frame at a readable size
// # (found the hard way: 10 bars and a 26-letter slam overflowed in the first long video).
const LIMITS = { heading: 48, kicker: 48, slam: 32 }
type Rule = [list: string, max: number, fields: [string, number][]]
const ITEMS: Record<string, Rule> = {
  equation: ['parts', 7, [['text', 12]]],
  bars: ['bars', 12, [['label', 22]]], // # "Share of index value" (20) fits the 300 px label column
  stacked: ['segments', 5, [['label', 22]]],
  flow: ['nodes', 4, [['title', 30], ['sub', 30]]],
  timeline: ['points', 6, [['when', 10], ['what', 26]]],
  compare: ['cards', 3, [['title', 28], ['value', 9]]],
  map: ['pins', 6, [['label', 20]]],
  slam: ['words', 4, [['text', 20]]],
}
const chars = (ws: { text: string }[]) => ws.reduce((n, w) => n + w.text.length, 0)

export const layoutProblems = (s: { kind: string; slide?: string; heading?: string; kicker?: string; data?: any; slam?: { words: { text: string }[] } }): string[] => {
  const p: string[] = []
  const len = (label: string, v: unknown, max: number) => { if (typeof v === 'string' && v.length > max) p.push(`${label} is ${v.length} chars (max ${max}): "${v}"`) }
  len('heading', s.heading, LIMITS.heading)
  len('kicker', s.kicker, LIMITS.kicker)
  if (s.slam?.words && chars(s.slam.words) > LIMITS.slam) p.push(`slam is ${chars(s.slam.words)} chars (max ${LIMITS.slam}) — fewer, shorter words`)
  if (s.kind !== 'slide' || !s.slide) return p
  const d = s.data ?? {}
  if (s.slide === 'number') len('number label', d.label, 48)
  if (s.slide === 'quote') len('quote', d.quote, 160)
  if (s.slide === 'slam' && Array.isArray(d.words) && chars(d.words) > LIMITS.slam) p.push(`slam is ${chars(d.words)} chars (max ${LIMITS.slam})`)
  const rule = ITEMS[s.slide]
  if (rule && Array.isArray(d[rule[0]])) {
    const [list, max, fields] = rule
    const xs = d[list] as Record<string, unknown>[]
    if (xs.length > max) p.push(`${s.slide} has ${xs.length} ${list} (max ${max})`)
    xs.forEach((x, i) => fields.forEach(([f, m]) => len(`${list}[${i}].${f}`, x[f], m)))
    if (s.slide === 'compare') xs.forEach((x, i) => {
      const lines = (x.lines ?? []) as string[]
      if (lines.length > 3) p.push(`cards[${i}] has ${lines.length} lines (max 3)`)
      lines.forEach((l, k) => len(`cards[${i}].lines[${k}]`, l, 34))
    })
  }
  return p
}

// ------------------------------------------------------------ scenes with made-up figures
// # Their decoration shows readable prices, percentages or tickers (checked against the style
// # bible, 2026-10-24). Next to a data claim they could pass as real numbers, so a shot must opt
// # in with decorOk: true (e.g. a coffee-shop menu in a story about coffee prices).
export const DECOR_FIGURES = ['portfolio-dashboard', 'bond-desk', 'coffee-shop', 'checkout', 'apartment-rent', 'pitch-meeting', 'crypto-exchange', 'supermarket', 'news-desk']
