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
  if (!opts.compact) return `${sign}${cur}${Math.round(a).toLocaleString('en-US')}`
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
