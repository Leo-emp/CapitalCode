// ============================================================
// INFOGRAPHIC MATHS — money/percent formatting, round chart
// ticks, linear scales. Pure, tested, shared by every chart.
// ============================================================

const trim = (n: number, dp: number) => Number(n.toFixed(dp)).toString()

// # $350k, $1.05m, $8B, $4.2T (reference style) — or $8,000,000,000
export const formatMoney = (v: number, opts: { compact?: boolean; currency?: string } = {}): string => {
  const cur = opts.currency ?? '$'
  const sign = v < 0 ? '-' : ''
  const a = Math.abs(v)
  // # under $1,000 with cents → show the cents ($37.90), otherwise whole dollars
  if (!opts.compact) return a < 1000 && !Number.isInteger(a) ? `${sign}${cur}${a.toFixed(2)}` : `${sign}${cur}${Math.round(a).toLocaleString('en-US')}`
  const units: [number, string][] = [[1e12, 'T'], [1e9, 'B'], [1e6, 'm'], [1e3, 'k']]
  for (const [size, u] of units) if (a >= size) return `${sign}${cur}${trim(a / size, 2)}${u}`
  return `${sign}${cur}${trim(a, 2)}`
}

export const formatPct = (v: number, opts: { sign?: boolean; dp?: number } = {}): string =>
  `${opts.sign && v > 0 ? '+' : ''}${trim(v, opts.dp ?? 1)}%`

// # Round "1, 2, 5 × 10ⁿ" steps that cover [min, max]
export const niceTicks = (min: number, max: number, count = 5): number[] => {
  const range = max - min || Math.abs(max) || 1
  const rough = range / Math.max(1, count - 1)
  const mag = 10 ** Math.floor(Math.log10(rough))
  const norm = rough / mag
  const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag
  const lo = Math.floor(min / step) * step
  const hi = Math.max(Math.ceil(max / step) * step, lo + step)
  const out: number[] = []
  for (let v = lo; v <= hi + step / 2; v += step) out.push(Number(v.toFixed(10)))
  return out
}

// # Map a value from a data range to a pixel range
export const scaleLinear = (domain: [number, number], range: [number, number]) => (v: number): number => {
  const [d0, d1] = domain, [r0, r1] = range
  if (d1 === d0) return (r0 + r1) / 2
  return r0 + ((v - d0) / (d1 - d0)) * (r1 - r0)
}

// # Bar rows that always fit the slide body (~600 px between the heading and the source line):
// # up to 6 bars keep the roomy default, more bars shrink row, gap and type together.
export const barRows = (n: number) => {
  const per = Math.min(100, 600 / Math.max(1, n))
  if (per >= 100) return { height: 54, gap: 46, font: 30, value: 38 }
  // # text never drops below 30 px (phone-readable); rows give up gap before height
  return { height: Math.max(32, Math.floor(per * 0.54)), gap: Math.max(8, Math.floor(per * 0.46)), font: 30, value: Math.max(30, Math.round(38 * per / 100)) }
}

// # Keyword slam font size that fits ~1,700 px (Bebas Neue ≈ 0.4 em per character + 40 px between words)
export const slamSize = (words: string[], size: number, maxW = 1700) => {
  const w = words.reduce((a, t) => a + t.length * 0.4 * size, 0) + 40 * (words.length - 1)
  return w <= maxW ? size : Math.floor(size * maxW / w)
}

// # Slam word entry: rises 60 px into place with ≤ 6% overshoot (never grows over its neighbour)
export const slamEntry = (g: number) => {
  const t = Math.max(0, Math.min(1, g))
  return t >= 1 ? { scale: 1, y: 0, opacity: 1 } : { scale: 1 + 0.06 * Math.sin(Math.PI * t), y: 60 * (1 - t), opacity: Math.min(1, t * 2) }
}

// # Stacked-bar label rows: a label starting within 16% of the previous one flips to the other row
export const labelRows = (values: number[], minGap = 16): number[] => {
  const total = values.reduce((a, v) => a + v, 0) || 1
  const rows: number[] = []
  let left = 0, prevLeft = -Infinity
  for (const [i, v] of values.entries()) {
    rows.push(i && left - prevLeft < minGap ? 1 - rows[i - 1] : 0)
    prevLeft = left
    left += (v / total) * 100
  }
  return rows
}

// # Percent formatter shared by every value of one chart: 1 decimal if any value needs it
export const pctFormat = (values: number[]) => {
  const dp = values.some((v) => Math.round(v * 10) % 10 !== 0) ? 1 : 0
  return (v: number) => `${v.toFixed(dp)}%`
}
