// ============================================================
// sf-cost (s71–s80, cream): what it costs you — a labelled EXAMPLE. A family at a
// breakfast table with one $4.99 box a week; the box shrinks 18 → 16 oz at the same
// price (+12.5% per ounce). A year: 52 boxes × 18 oz = 936 oz in a row of box
// icons; with 16 oz boxes the row needs 58½ boxes; the extra 6½ boxes light up
// and turn into ≈ $32 a year. Then the trolley: coffee, paper towels, snacks; the
// GAO range +11.6% … +32.4% beside our 12.5%.
// ============================================================
import React from 'react'
import { Label } from '../charts'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { makePiece } from '../registry'
import { Mini } from '../../rig/Mini'
import { Headline, win } from '../aimoney/common'
import { bump, Cereal, Coffee, Dollar, Rolls, S, Snack, Sticker, Store, Table, Trolley , pulse } from './kit'

const GROUND = 880
// # a tiny box icon for the year row
const BoxIcon: React.FC<{ x: number; y: number; o: number; hot?: boolean; half?: boolean }> = ({ x, y, o, hot, half }) => (
  <g opacity={o}><rect x={x - 11} y={y - 30} width={half ? 11 : 22} height={30} rx={3} fill={hot ? S.red : S.sun} stroke={hot ? S.redD : S.sunD} strokeWidth={2} /></g>
)

const Cost: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const number71 = c('s71:number'), example71 = c('s71:example')
  const family = c('s72:family'), box72 = c('s72:box'), week = c('s72:week'), costs72 = c('s72:costs')
  const shrinks73 = c('s73:shrinks'), d16 = c('s73:16'), same73 = c('s73:same')
  const d125 = c('s74:125'), ounce74 = c('s74:ounce')
  const year75 = c('s75:year'), d52 = c('s75:52'), d936 = c('s75:936')
  const amount76 = c('s76:amount'), need76 = c('s76:need'), d58 = c('s76:58'), half76 = c('s76:half')
  const extra77 = c('s77:extra'), d32 = c('s77:32'), breakfast = c('s77:breakfast')
  const budget = c('s78:budget'), coffee78 = c('s78:coffee'), towels78 = c('s78:towels'), snacks78 = c('s78:snacks'), trolley78 = c('s78:trolley')
  const remember = c('s79:remember'), gao79 = c('s79:gao'), d116 = c('s79:116'), d324 = c('s79:324')
  const bigger80 = c('s80:bigger'), d125b = c('s80:125'), example80 = c('s80:example')
  const A = win(f, c('s71') - 20, year75), B = win(f, year75, budget), D = on(f, budget, 8)
  // # the year row: 52 boxes (18 oz) — then the row of 16 oz boxes needs 58.5; the extra 6.5 are red
  const rowN = f >= amount76 ? 59 : 52
  return (
    <g>
      <Stage id="sf-cost" frame={f} />
      <Store f={f} o={0.0001} />
      <rect x={-40} y={200} width={2000} height={GROUND - 200} fill="#F7EBD7" /><rect x={-40} y={GROUND} width={2000} height={240} fill="#E5CFA9" />
      {/* # the kitchen window belongs to the breakfast scene only (the year row of boxes needs the space) */}
      <g opacity={1 - on(f, year75 - 8, 8)}><rect x={1380} y={300} width={360} height={260} rx={10} fill="#DCEFFA" stroke={S.woodD} strokeWidth={8} /><path d="M1560 300 L1560 560 M1380 430 L1740 430" stroke={S.woodD} strokeWidth={6} /></g>
      <Headline f={f} lines={[[number71, 'AN EXAMPLE', S.ink2, 120], [family, 'ONE BOX A WEEK · $4.99', P.ink, 110], [d16, '18 OZ → 16 OZ, SAME PRICE', P.ink, 104], [d125, '+12.5% PER OUNCE', S.redD, 120],
        [year75, 'ONE YEAR: 936 OUNCES', P.ink, 110], [d58, 'NOW: 58½ BOXES', P.ink, 120], [d32, '≈ $32 A YEAR, SAME BREAKFAST', S.redD, 100], [budget, 'IT ADDS UP IN THE TROLLEY', P.ink, 104], [d116, 'REAL CASES: +11.6% TO +32.4%', S.redD, 96]]} />

      {/* # A) the family breakfast and the box that shrinks */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, example71, 8)}><Sticker x={180} y={330} s={0.85 * pop(f, example71)} text="EXAMPLE" color={S.ink2} /></g>
        <Table x={700} y={GROUND} s={1.1} />
        <g opacity={on(f, family, 8)}>{[0, 1, 2].map((k) => <Mini key={k} look={['investor', 'buyer', 'worker'][k]} x={450 + k * 250} y={GROUND} scale={[1.1, 1.0, 0.8][k]} frame={f} seed={k + 30} mood={f >= d125 ? 'sad' : 'happy'} />)}</g>
        <g opacity={on(f, box72, 8)}><Cereal x={1180} y={GROUND} s={1.2 * pop(f, box72) * bump(f, week, 0.04)} h={lerp(1, 0.89, on(f, shrinks73, 16))} oz={f >= d16 ? '16 OZ' : '18 OZ'} /></g>
        <g opacity={on(f, costs72, 8)}><Sticker x={1400} y={GROUND - 380} s={pop(f, costs72) * bump(f, same73, 0.06) * pulse(f, [c('s72:99'), c('s73:day')])} text="$4.99" color={S.mintD} /></g>
        <g opacity={on(f, d125, 8)}><Sticker x={1560} y={GROUND - 200} s={1.1 * pop(f, d125) * bump(f, ounce74, 0.05)} text="+12.5%/OZ" /></g>
      </g>}

      {/* # B) the year row of boxes */}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, d52, 8)}><Label x={960} y={340} text={f >= amount76 ? '16 OZ BOXES' : '18 OZ BOXES'} size={52} font="Bebas Neue" color={S.ink} /></g>
        <g transform={`translate(960 600) scale(${1 * pulse(f, [c('s75:18'), c('s75:cereal'), c('s76:eat'), c('s76:ounce'), c('s76:half'), c('s77:6')])}) translate(-960 -600)`}>
        {Array.from({ length: rowN }, (_, k) => { const x = 230 + (k % 20) * 74, y = 470 + Math.floor(k / 20) * 110
          const extra = k >= 52, half = k === 58
          return <BoxIcon key={k} x={x} y={y} o={extra ? on(f, d58 + (k - 52) * 3, 6) : on(f, d52 + Math.floor(k / 4), 6)} hot={extra && f >= extra77} half={half} /> })}
        </g>
        <g opacity={on(f, d936, 8)}><Label x={960} y={GROUND - 30} text="52 × 18 OZ = 936 OZ" size={52} font="Bebas Neue" color={S.ink2} o={1 - on(f, need76, 8)} /></g>
        <g opacity={on(f, need76, 8)}><Label x={960} y={GROUND - 30} text="936 ÷ 16 = 58½ BOXES" size={52} font="Bebas Neue" color={S.ink2} o={1 - on(f, extra77, 8)} /></g>
        <g opacity={on(f, extra77, 8)}><Label x={960} y={GROUND - 30} text="+6½ BOXES" size={56} font="Bebas Neue" color={S.redD} /></g>
        <g opacity={on(f, d32, 8)}><Dollar x={1600} y={GROUND - 30} s={1.2 * pop(f, d32) * bump(f, breakfast, 0.05)} v="≈$32" /></g>
      </g>}

      {/* # D) the trolley adds up; the real cases */}
      {D > 0 && <g opacity={D}>
        <Trolley x={480} y={GROUND} s={1.4 * bump(f, trolley78, 0.05) * pulse(f, [c('s78:product'), c('s79:products'), c('s79:shrink')])} f={f} load={on(f, coffee78, 30)} />
        <g opacity={on(f, coffee78, 8) * (1 - on(f, remember, 8))}><Coffee x={900} y={GROUND} s={0.9 * pop(f, coffee78)} /></g>
        <g opacity={on(f, towels78, 8) * (1 - on(f, remember, 8))}><Rolls x={1200} y={GROUND} s={0.6 * pop(f, towels78)} n={3} label="TOWELS" /></g>
        <g opacity={on(f, snacks78, 8) * (1 - on(f, remember, 8))}><Snack x={1500} y={GROUND} s={0.9 * pop(f, snacks78)} /></g>
        <g opacity={on(f, gao79, 8)}>
          <rect x={860} y={560} width={900} height={22} rx={11} fill="#E7DFD0" />
          <g opacity={on(f, d116, 8)}><circle cx={860 + 900 * 11.6 / 40} cy={571} r={24} fill={S.sun} /><Label x={860 + 900 * 11.6 / 40} y={530} text="+11.6%" size={40} font="Bebas Neue" color={S.ink} /></g>
          <g opacity={on(f, d324, 8)}><circle cx={860 + 900 * 32.4 / 40} cy={571} r={24} fill={S.red} /><Label x={860 + 900 * 32.4 / 40} y={530} text="+32.4%" size={40} font="Bebas Neue" color={S.redD} /></g>
          <g opacity={on(f, d125b, 8)}><circle cx={860 + 900 * 12.5 / 40} cy={571} r={16} fill={S.mintD} /><Label x={860 + 900 * 12.5 / 40} y={640} text="OUR EXAMPLE 12.5%" size={36} font="Bebas Neue" color={S.mintD} o={bump(f, example80, 0) * on(f, bigger80, 8)} /></g>
          <g opacity={on(f, gao79, 8)}><Label x={1310} y={720} text="GAO: SHRUNKEN PRODUCTS, AVERAGE RISE PER UNIT" size={34} font="Bebas Neue" color={S.ink2} /></g>
        </g>
      </g>}
      <Vignette id="sf-cost" />
    </g>
  )
}

const BEATS = ["s71:example", "s72:family", "s72:box", "s72:week", "s72:costs", "s73:shrinks", "s73:16", "s73:same", "s74:125", "s74:ounce", "s75:year", "s75:52", "s75:936", "s76:amount", "s76:need", "s76:58", "s77:extra", "s77:32", "s77:breakfast", "s78:budget", "s78:coffee", "s78:towels", "s78:snacks", "s78:trolley", "s79:remember", "s79:gao", "s79:116", "s79:324", "s80:bigger", "s80:125", "s80:example", "s71", "s72:99", "s73:day", "s75:18", "s75:cereal", "s76:eat", "s76:ounce", "s76:half", "s77:6", "s78:product", "s79:products", "s79:shrink"]
export const SF_COST = makePiece('sf-cost', 'Shrinkflation ch5 (EXAMPLE): family of three at a breakfast table, one $4.99 box a week shrinks 18 → 16 oz (+12.5%/oz); a year row of 52 box icons = 936 oz; with 16 oz boxes 58½ are needed, the extra 6½ turn red, ≈ $32 note; trolley fills with coffee, paper towels, snacks; GAO per-unit range +11.6% to +32.4% with our 12.5% marked', {
  mood: 'light', Component: Cost, beats: BEATS,
  sfx: [['s74:125', 'pop', 0.2], ['s76:58', 'click', 0.2], ['s77:32', 'coin', 0.25]],
})
