// # Fixture episode: 9 representative shots on synthetic word timings → stills for review by eye
// # Usage: npx tsx scripts/episode-fixture.mts   Output: output/episode-fixture/*.png
import { gatePlan } from '../agent/gates/plan'
import { renderStills } from '../agent/render'
import type { PlanDoc, TimedWord } from '../agent/schema'
import { buildTimeline } from '../agent/timeline'

const W = ['the', 'money', 'goes', 'to', 'the', 'buyers', 'who', 'price', 'the', 'future']
const words: TimedWord[] = []
for (let i = 1; i <= 18; i++) W.forEach((w, j) => { const t = (i - 1) * 4 + j * 0.4; words.push({ w, s: +t.toFixed(2), e: +(t + 0.35).toFixed(2), sid: `s${i}` }) })
const c = (i: number, word?: string) => ({ sentence: `s${i}`, ...(word ? { word } : {}) })

const plan: PlanDoc = {
  shots: [
    { id: 'logo', kind: 'brand', start: c(1) },
    { id: 'street', kind: 'scene', start: c(2), scene: 'shop-street', time: 'dusk',
      actors: [{ who: 'hero', anchor: 'stand', track: [{ at: c(2), pose: 'idle' }, { at: c(2, 'money'), pose: 'think', expression: 'thinking' }, { at: c(3, 'buyers'), pose: 'point', expression: 'shocked' }] },
        { who: 'owner', anchor: 'door', track: [{ at: c(2), pose: 'armsCrossed', expression: 'smug' }] }],
      props: [{ id: 'cash-stack', anchor: 'prop1', at: c(2, 'goes') }, { id: 'coin-stack', anchor: 'prop1', at: c(2, 'buyers') }],
      slam: { words: [{ text: 'BUYERS' }, { text: 'PAY FOR THE FUTURE', tone: 'champagne' }], at: [c(3, 'price'), c(3, 'future')] } },
    { id: 'ch1', kind: 'chapter', start: c(4), n: 1, title: 'How a shop is priced' },
    { id: 'eq', kind: 'slide', start: c(5), slide: 'equation', heading: 'What a small business is worth', source: 'Illustrative',
      data: { icon: 'shop-mini', parts: [{ text: '$350k', label: 'profit per year' }, { op: '× 3' }, { op: '→' }, { text: '$1.05m', label: 'sale price', tone: 'green' }] },
      at: [c(5, 'money'), c(5, 'buyers'), c(5, 'price'), c(5, 'future')] },
    { id: 'bank', kind: 'scene', start: c(7), scene: 'bank-interior', framing: 'medium', tone: 'blue',
      actors: [{ who: 'investor', anchor: 'stand', track: [{ at: c(7), pose: 'present', expression: 'smiling' }, { at: c(8, 'buyers'), pose: 'holdChest' }] }],
      props: [{ id: 'contract', anchor: 'prop1', at: c(7, 'goes') }] },
    { id: 'bars', kind: 'slide', start: c(9), slide: 'bars', heading: 'Sale multiples by business type', kicker: 'TYPICAL RANGE', source: 'BizBuySell 2025',
      data: { format: 'x', bars: [{ label: 'Cafe', value: 2.1 }, { label: 'Agency', value: 3.4 }, { label: 'SaaS', value: 6.5, tone: 'green' }] }, at: [c(9, 'money')] },
    { id: 'vault', kind: 'scene', start: c(11), scene: 'vault-room', time: 'fog', framing: 'medium',
      actors: [{ who: 'buyer', anchor: 'stand', track: [{ at: c(11, 'goes'), pose: 'celebrate', expression: 'smiling' }] }],
      props: [{ id: 'gold-bar', anchor: 'prop1', at: c(11, 'buyers') }] },
    { id: 'line', kind: 'slide', start: c(13), slide: 'line', heading: 'Profit the buyer is paying for',
      data: { format: 'money', area: true, tone: 'green', values: [120e3, 180e3, 260e3, 350e3, 420e3], annotate: { index: 3, text: 'Today' } }, at: [c(13, 'money'), c(14, 'future'), c(14, 'buyers')] },
    { id: 'compare', kind: 'slide', start: c(15), slide: 'compare', heading: 'Same profit, different price',
      data: { cards: [{ title: 'Owner-run', value: '2×', lines: ['Owner is the business', 'Leaves → profit leaves'], tone: 'red' }, { title: 'Systemised', value: '4×', lines: ['Runs without owner', 'Profit stays'], tone: 'green', winner: true }] },
      at: [c(15, 'money'), c(16, 'buyers')] },
  ],
}
const r = gatePlan(plan, words, { duration: 72, history: [], slideShare: [0, 1], median: [0, 99] })
if (!r.ok) { console.log(r.problems.join('\n')); process.exit(1) }
const tl = buildTimeline(plan, words, 72)
const mid = tl.shots.map((s) => Math.round(s.from + (s.to - s.from) * 0.7))
const files = await renderStills('Episode', { timeline: tl }, [...mid, tl.shots[4].from + 4, 360], 'output/episode-fixture', 'shot')
console.log(`RESULT_JSON: ${JSON.stringify({ ok: true, stills: files.length })}`)

// # --video: the first 20 s as a real chunked render with a test voice (integration check)
if (process.argv.includes('--video')) {
  const { mkdirSync, writeFileSync } = await import('node:fs')
  const { tone } = await import('../agent/audio')
  const { renderVideo } = await import('../agent/commands/render')
  const dir = 'temp/fixture-video'
  mkdirSync(dir, { recursive: true })
  const short = buildTimeline({ ...plan, shots: plan.shots.slice(0, 4) }, words, 20)
  writeFileSync(`${dir}/timeline.json`, JSON.stringify(short))
  await tone(`${dir}/voice.wav`, 20, -22)
  const v = await renderVideo(dir, short, `${dir}/voice.wav`)
  console.log(`RESULT_JSON: ${JSON.stringify(v)}`)
}
