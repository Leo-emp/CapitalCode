// ============================================================
// ACT 1 — "What you really own" (s9–s30), diorama pieces.
// Every beat is a spoken word; objects act out the line.
// ============================================================
import React from 'react'
import { Emblem } from '../logo/Emblem'
import { getProp } from '../props/registry'
import { Mini } from '../rig/Mini'
import { Actor } from '../rig/Actor'
import { BigLine, CoinStack, countTo, DotGrid, Label, PriceTag, RankBars } from './charts'
import { arc, between, Bill, Building, clamp01, easeInOut, easeOut, lerp, on, P, Pedestal, Platform, pop, rnd, Sliver, span, Stage, Tower, Vignette } from './kit'
import { makePiece, type PieceProps } from './registry'

const Prop: React.FC<{ id: string; x: number; y: number; size: number; f: number; at?: number }> = ({ id, x, y, size, f, at }) => {
  const C = getProp(id).Component
  return <C size={size} x={x - size / 2} y={y - size / 2} frame={f} enter={at} />
}

// ---------------------------------------------------------------- s9–s10: the brand and the three questions
const Promise: React.FC<PieceProps> = ({ f, c }) => {
  const logo = pop(f, c('s9:capitalcode'), 16), q = [c('s10:bet'), c('s10:cost'), c('s10:decide')]
  const slide = easeInOut(span(f, c('s10:today'), c('s10:today') + 24))
  const items = [{ id: 'dice', label: 'The bet' }, { id: 'skyscraper', label: 'What it cost before' }, { id: 'scale-balance', label: 'Is it yours?' }]
  return (
    <g>
      <Stage id="pr" tint="teal" frame={f} />
      <g transform={`translate(0 ${-slide * 330})`} opacity={1 - slide * 0.25}>
        <g transform={`translate(960 470) scale(${logo}) translate(-960 -470)`}><svg x={860} y={370} width={200} height={200}><Emblem size={200} /></svg></g>
        <Label x={960} y={660} text="CAPITALCODE" size={64} font="Bebas Neue" color={P.champL} o={on(f, c('s9:capitalcode') + 6)} />
        <Label x={960} y={730} text="how the money actually works" size={38} weight={500} color={P.white} o={on(f, c('s9:how'))} />
      </g>
      {items.map((it, i) => {
        const p = pop(f, q[i], 14), x = 480 + i * 480, cy = 660
        return p > 0.001 && (
          <g key={it.id} transform={`translate(${x} ${cy}) scale(${p}) translate(${-x} ${-cy})`}>
            <circle cx={x} cy={cy} r={190} fill={P.navy1} opacity={0.55} /><circle cx={x} cy={cy} r={190} fill="none" stroke={P.champ} strokeWidth={4} />
            <Prop id={it.id} x={x} y={cy} size={240} f={f} />
            <Label x={x} y={cy + 260} text={it.label} size={44} />
          </g>
        )
      })}
      <Vignette id="pr" />
    </g>
  )
}

// ---------------------------------------------------------------- s11–s14: weighted by size → market cap
const SIZES = [0.4, 0.6, 0.85, 1.2, 1.75] // # five companies, small → giant
const Weighting: React.FC<{ f: number; c: (k: string) => number }> = ({ f, c }) => {
  const xs = [300, 600, 930, 1280, 1650], base = 860
  const equal = between(f, c('s11:give'), c('s12:weigh'))
  const grow = easeInOut(span(f, c('s12:size') - 10, c('s12:size') + 20))
  const pourAt = c('s13:dollar'), recv = c('s13:receives')
  const eq = easeInOut(span(f, c('s14:called'), c('s14:called') + 24))
  return (
    <g>
      <g opacity={1 - eq}>
        {xs.map((x, i) => {
          const s = lerp(1, SIZES[i], grow), b = pop(f, c('s11') + i * 4)
          const share = SIZES[i] / SIZES.reduce((a, v) => a + v, 0)
          return (
            <g key={i} transform={`translate(${x} ${base}) scale(${b}) translate(${-x} ${-base})`}>
              <Pedestal x={x} y={base} r={130} />
              <Building x={x} y={base} s={4 * s} seed={i * 11 + 4} />
              {/* # equal shares first (crossed out on "weigh"), then coins by size on "dollar … receives" */}
              {equal > 0 && <CoinStack x={x + 100} y={base - 6} n={5} s={1.3} />}
              <CoinStack x={x + 100} y={base - 6} n={Math.round(share * 40)} p={span(f, pourAt + i * 4, recv + 10)} s={1.3} />
            </g>
          )
        })}
        {equal > 0 && <Label x={960} y={200} text="THE SAME SHARE EACH?" size={72} font="Bebas Neue" color={P.champL} o={equal} />}
        {f >= c('s12:weigh') && <path d="M720 176 L1200 176" stroke={P.coral} strokeWidth={8} strokeLinecap="round" opacity={on(f, c('s12:weigh')) * (1 - on(f, c('s12:size') + 20))} />}
        {/* # a dollar on top splits by size into the coin stacks */}
        {f >= pourAt - 6 && f < recv + 20 && Array.from({ length: 20 }, (_, i) => {
          const k = i % 5, t = span(f, pourAt + i * 1.5, pourAt + i * 1.5 + 18)
          if (t <= 0 || t >= 1) return null
          const p = arc({ x: 960, y: 200 }, { x: xs[k] + 100, y: base - 80 }, easeInOut(t), 60)
          return <Sliver key={i} x={p.x} y={p.y} r={t * 300} s={1.2} gold />
        })}
        {f >= pourAt - 10 && <Bill x={960} y={200} s={0.8} o={1 - on(f, pourAt + 10)} />}
      </g>
      {/* # market cap = share price × number of shares */}
      {eq > 0 && (
        <g opacity={eq}>
          <Label x={960} y={240} text="MARKET CAP" size={84} font="Bebas Neue" color={P.champL} o={on(f, c('s14:market'))} />
          <g transform={`translate(520 600) scale(${pop(f, c('s14:price'))})`}><PriceTag x={0} y={0} text="PRICE" s={2} /></g>
          <Label x={900} y={640} text="×" size={160} color={P.champ} o={on(f, c('s14:times'))} />
          {[0, 1, 2, 3, 4].map((k) => <g key={k} opacity={on(f, c('s14:number') + k * 3)}><Prop id="stock-certificate" x={1250 + k * 34} y={600 - k * 34} size={300} f={f} /></g>)}
          <Label x={1330} y={860} text="SHARES" size={72} font="Bebas Neue" color={P.white} o={on(f, c('s14:shares'))} />
        </g>
      )}
    </g>
  )
}
const WeightingPiece: React.FC<PieceProps> = ({ f, c }) => (
  <g><Stage id="wt" frame={f} /><Weighting f={f} c={c} /><Vignette id="wt" /></g>
)

// ---------------------------------------------------------------- s15–s18: thirty years of concentration (big line)
const History: React.FC<PieceProps> = ({ f, c }) => {
  // # sourced points only: 1995 ≈ 19%, 2000 ≈ 27%, Dec 2025 40.7% (record), Jun 2026 37.9%
  const X = 300, Y = 260, W = 1320, H = 560, yr = (y: number) => X + ((y - 1995) / 31.5) * W, v = (p: number) => Y + H - (p / 45) * H
  const pts = [[1995, 19], [2000, 27], [2025.95, 40.7], [2026.45, 37.9]] as const
  const at = [c('s16:1990s'), c('s16:fifth') - 30, c('s17:doubled'), c('s18:june')]
  const seg = (i: number) => span(f, at[i], at[i] + (i === 2 ? 34 : 18))
  const head = (() => { let q = { x: yr(pts[0][0]), y: v(pts[0][1]) }; for (let i = 1; i < pts.length; i++) { const t = easeInOut(seg(i)); if (t <= 0) break; q = { x: lerp(yr(pts[i - 1][0]), yr(pts[i][0]), t), y: lerp(v(pts[i - 1][1]), v(pts[i][1]), t) } } return q })()
  const drawn = [0, 1, 2, 3].filter((i) => i === 0 ? f >= at[0] : seg(i) >= 1)
  const d = [...drawn.map((i) => `${yr(pts[i][0])} ${v(pts[i][1])}`), `${head.x} ${head.y}`].map((p, i) => `${i ? 'L' : 'M'}${p}`).join(' ')
  const axis = on(f, c('s15'), 20)
  const flat = between(f, c('s15:biggest'), c('s16'))
  return (
    <g>
      <Stage id="hi" tint="teal" frame={f} />
      <g opacity={axis}>
        {[10, 20, 30, 40].map((p) => <g key={p}><rect x={X} y={v(p)} width={W} height={2} fill={P.white} opacity={0.08} /><Label x={X - 20} y={v(p) + 12} text={`${p}%`} size={30} anchor="end" color={P.white} o={0.55} /></g>)}
        {[1995, 2000, 2005, 2010, 2015, 2020, 2025].map((y) => <Label key={y} x={yr(y)} y={Y + H + 52} text={`${y}`} size={30} color={P.white} o={0.6} />)}
        <rect x={X} y={Y + H} width={W} height={4} rx={2} fill={P.champ} opacity={0.5} />
        <Label x={X} y={Y - 50} text="Share of the index in the 10 biggest companies" size={36} anchor="start" color={P.champL} />
      </g>
      {/* # "big, but not that big": ten modest towers before the line */}
      {flat > 0 && Array.from({ length: 10 }, (_, k) => <g key={k} opacity={flat}><Tower id="hi" i={k} x={760 + k * 44} y={Y + H - 10} h={70 + rnd(k) * 40} w={34} /></g>)}
      {f >= at[0] && <>
        <path d={`${d} L${head.x} ${Y + H} L${yr(1995)} ${Y + H} Z`} fill={P.gold} opacity={0.14} />
        <path d={d} stroke={P.gold} strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={head.x} cy={head.y} r={26 + 30 * Math.max(0, 1 - Math.abs(f - c('s17:highest') - 8) / 12)} fill={P.gold} opacity={0.25} /><circle cx={head.x} cy={head.y} r={12} fill={P.white} />
      </>}
      {/* # "it is still close to 38": the last point pulses */}
      {f >= c('s18:still') && <circle cx={yr(pts[3][0])} cy={v(pts[3][1])} r={20 + 40 * span(f, c('s18:still'), c('s18:still') + 20)} fill={P.gold} opacity={0.4 * (1 - span(f, c('s18:still'), c('s18:still') + 20))} />}
      {[[0, '≈ 19%', at[0] + 20], [1, '27%', at[1] + 18], [2, '40.7%', at[2] + 34], [3, '37.9%', at[3] + 18]].map(([i, t, a]) => {
        const k = i as number
        return f >= (a as number) && <g key={k} transform={`translate(${yr(pts[k][0])} ${v(pts[k][1])})`}><circle r={12} fill={P.gold} /><Label x={k === 3 ? 60 : 0} y={k === 3 ? 50 : -30} text={t as string} size={k >= 2 ? 64 : 48} font="Bebas Neue" color={P.champL} o={on(f, a as number)} /></g>
      })}
      {f >= c('s17:doubled') && <Label x={1100} y={520} text="DOUBLED" size={96} font="Bebas Neue" color={P.gold} o={between(f, c('s17:doubled') + 10, c('s18'))} />}
      {f >= c('s17:record') && <g transform={`translate(${yr(2025.95)} ${v(40.7) - 110}) scale(${pop(f, c('s17:record'))})`}><Prop id="crown" x={0} y={0} size={110} f={f} /></g>}
      <Vignette id="hi" />
    </g>
  )
}

// ---------------------------------------------------------------- s19–s22: who the ten are
const TOP10: [string, number, string][] = [['NVIDIA', 7.52, 's20:nvidia'], ['Apple', 6.59, 's21:apple'], ['Alphabet', 5.84, 's21:alphabet'], ['Microsoft', 4.3, 's21:microsoft'], ['Amazon', 3.62, 's22:amazon'],
  ['Broadcom', 2.77, 's22:broadcom'], ['Micron', 2.02, 's22:micron'], ['Meta', 1.92, 's22:meta'], ['Tesla', 1.84, 's22:tesla'], ['Eli Lilly', 1.47, 's22:eli']]
const TopTen: React.FC<PieceProps> = ({ f, c }) => (
  <g>
    <Stage id="tt" frame={f} />
    <Label x={960} y={140} text="THE TOP 10" size={84} font="Bebas Neue" color={P.champL} o={on(f, c('s19:10'))} />
    {/* # ten towers line up on "who those 10 companies are", then each becomes its bar */}
    {Array.from({ length: 10 }, (_, k) => <g key={k} opacity={between(f, c('s19:companies') + k * 2, c('s20'))}><Tower id="tt" i={k} x={510 + k * 100} y={760} h={200 + (9 - k) * 30} w={60} /></g>)}
    {/* # a soft highlight sweeps the row being talked about; a bracket marks "between 1.5 and 3.6" */}
    {([['s20:whole', 0], ['s21:43', 3]] as const).map(([k, row]) => f >= c(k) && <rect key={k} x={590} y={210 + row * 74 + 2} width={1060} height={68} rx={34} fill={P.gold} opacity={0.22 * (1 - span(f, c(k) + 10, c(k) + 40))} />)}
    {f >= c('s22:between') && <g opacity={on(f, c('s22:between'))}><path d={`M1680 ${210 + 4 * 74 + 10} h24 v${6 * 74 - 20} h-24`} stroke={P.champL} strokeWidth={5} fill="none" /><Label x={1730} y={210 + 7 * 74 + 10} text="1.5–3.6%" size={44} font="Bebas Neue" anchor="start" color={P.champL} o={on(f, c('s22:15'))} /><Label x={1730} y={210 + 7 * 74 + 56} text="each" size={32} anchor="start" o={on(f, c('s22:36'))} /></g>}
    <g opacity={on(f, c('s20'))}><RankBars f={f} x={620} y={210} w={1000} rowH={74} max={8} rows={TOP10.map(([label, value, k], i) => ({ label, value, at: c(k), color: i === 0 ? P.gold : P.sky }))} /></g>
    <Vignette id="tt" />
  </g>
)

// ---------------------------------------------------------------- s22a–s22e: it feeds itself
const Loop: React.FC<PieceProps> = ({ f, c }) => {
  const ring = on(f, c('s22a:feeds'), 24), spin = f * 0.6
  const rise = easeInOut(span(f, c('s22b:rises'), c('s22b:rises') + 30))
  const weight = easeInOut(span(f, c('s22b:weight'), c('s22b:rises#2') + 20))
  const pour = c('s22c:dollar'), nobody = c('s22d:nobody'), formula = c('s22e:formula')
  const pie = 7.5 * weight + 2
  return (
    <g>
      <Stage id="lp" tint="teal" frame={f} />
      {/* # the loop ring with arrow heads chasing round */}
      <g opacity={ring} transform={`rotate(${spin} 960 560)`}>
        <circle cx={960} cy={560} r={380} fill="none" stroke={P.champ} strokeWidth={6} strokeDasharray="40 30" opacity={0.6} />
        {[0, 120, 240].map((a) => <path key={a} d="M960 172 l26 16 l-26 16 Z" fill={P.gold} transform={`rotate(${a} 960 560)`} />)}
      </g>
      <Label x={960} y={120} text="IT FEEDS ITSELF" size={72} font="Bebas Neue" color={P.champL} o={on(f, c('s22a:feeds'))} />
      {/* # the giant: rises, its slice grows, new dollars pour in */}
      <Tower id="lp" i={1} x={820} y={820} h={180 + 260 * rise} w={110} glow={on(f, pour)} />
      <g opacity={on(f, c('s22b:weight'))}>
        <circle cx={1200} cy={560} r={140} fill={P.navy2} />
        <path d={(() => { const a = (pie / 100) * Math.PI * 2 * 4; return `M1200 560 L1200 420 A140 140 0 ${a > Math.PI ? 1 : 0} 1 ${1200 + 140 * Math.sin(a)} ${560 - 140 * Math.cos(a)} Z` })()} fill={P.gold} />
        <Label x={1200} y={760} text="its weight" size={36} />
      </g>
      {f >= pour && f < c('s22d') + 10 && Array.from({ length: 30 }, (_, i) => {
        const t = ((f - pour) / 26 + i / 30) % 1
        const p = arc({ x: 1500, y: 160 }, { x: 820, y: 820 - 180 - 260 * rise }, easeInOut(t), 120)
        return <Sliver key={i} x={p.x} y={p.y} r={t * 400 + i * 30} s={1.3} />
      })}
      {f >= pour && <Label x={1500} y={130} text="new dollars" size={36} o={between(f, pour, c('s22d'))} />}
      {/* # nobody decided: the hero (small) shrugs beside his piggy bank */}
      <g opacity={on(f, nobody)}>
        <Pedestal x={1450} y={880} r={110} />
        <Mini look="hero" x={1430} y={880} scale={1.2} frame={f} seed={2} mood={f > c('s22d:biggest') ? 'sad' : 'neutral'} />
        <Prop id="piggy-bank" x={1530} y={840} size={110} f={f} />
      </g>
      {/* # the formula: gears turning + months flipping */}
      <g opacity={on(f, formula)}>
        {[[420, 760, 90, 1], [540, 690, 60, -1.5]].map(([x, y, r, d], i) => (
          <g key={i} transform={`rotate(${f * (d as number) * 2} ${x} ${y})`}>
            <circle cx={x as number} cy={y as number} r={r as number} fill={P.champ} />
            {Array.from({ length: 10 }, (_, k) => <rect key={k} x={(x as number) - 10} y={(y as number) - (r as number) - 16} width={20} height={26} rx={4} fill={P.champ} transform={`rotate(${k * 36} ${x} ${y})`} />)}
            <circle cx={x as number} cy={y as number} r={(r as number) * 0.4} fill={P.navy1} />
          </g>
        ))}
        <Label x={480} y={900} text="every month" size={38} o={on(f, c('s22e:every'))} />
      </g>
      <Vignette id="lp" />
    </g>
  )
}

// ---------------------------------------------------------------- s23–s26: the maths nobody does
const Maths: React.FC<PieceProps> = ({ f, c }) => {
  const X = 260, W = 1400, Y = 420
  const a = c('s24:379'), b = c('s24:621'), shatter = easeOut(span(f, c('s25:works'), c('s25:013')))
  const n = c('s26:nvidia'), sixty = c('s26:60')
  return (
    <g>
      <Stage id="ma" frame={f} />
      <Label x={960} y={170} text="THE MATHS" size={80} font="Bebas Neue" color={P.champL} o={on(f, c('s23:maths')) * (1 - on(f, n))} />
      {/* # one bar = your $100 split 37.9 / 62.1 */}
      <g opacity={1 - on(f, n)}>
        <rect x={X} y={Y} width={W * 0.379 * on(f, a, 24)} height={140} rx={20} fill={P.gold} />
        <Label x={X + W * 0.19} y={Y + 95} text={countTo(37.9, on(f, a, 24), 1, '', '%')} size={76} font="Bebas Neue" color={P.navy0} o={on(f, a)} />
        <Label x={X + W * 0.19} y={Y + 210} text="10 companies" size={40} o={on(f, c('s24:10'))} />
        {/* # the other 62.1% breaks into 490 slivers of 0.13% each */}
        {Array.from({ length: 49 }, (_, i) => {
          const k = on(f, b, 24), cols = 7, cx = X + W * 0.385 + (i % cols) * ((W * 0.615) / cols), cy = Y + Math.floor(i / cols) * 20
          const sx = lerp(X + W * 0.385, cx + (rnd(i) - 0.5) * 40, shatter), sy = lerp(Y, cy + Math.floor(i / cols) * 34 + rnd(i + 3) * 30, shatter)
          return k > 0 && <rect key={i} x={sx} y={sy} width={lerp((W * 0.615) * k, (W * 0.615) / cols - 18, shatter)} height={lerp(140, 18, shatter)} rx={lerp(20, 6, shatter)} fill={P.sky} opacity={i === 0 || shatter > 0 ? 1 : 0} />
        })}
        <Label x={X + W * 0.69} y={Y + 95} text={countTo(62.1, on(f, b, 24), 1, '', '%')} size={76} font="Bebas Neue" color={P.navy0} o={on(f, b) * (1 - shatter)} />
        <Label x={X + W * 0.69} y={Y + 210} text="490 companies" size={40} o={on(f, c('s24:490')) * (1 - shatter)} />
        {/* # a shimmer runs along the 490 on "companies" */}
        <rect x={X + W * 0.385 + W * 0.6 * span(f, c('s24:companies#2'), c('s24:companies#2') + 20)} y={Y} width={60} height={140} fill={P.white} opacity={0.25 * (1 - shatter) * (f >= c('s24:companies#2') && f < c('s24:companies#2') + 20 ? 1 : 0)} />
        <Label x={X + W * 0.69} y={Y + 420} text="0.13% EACH" size={90} font="Bebas Neue" color={P.champL} o={on(f, c('s25:013'))} />
      </g>
      {/* # NVIDIA's tower vs the average company's: ~60 times */}
      <g opacity={on(f, n)}>
        <Tower id="ma" i={0} x={760} y={900} h={560 * on(f, n, 30)} w={150} glow={1} />
        <Label x={760} y={970} text="NVIDIA" size={44} />
        <Building x={1200} y={900} s={0.9} seed={7} />
        <Label x={1200} y={970} text="the average other company" size={34} />
        <Label x={1500} y={480} text={countTo(60, on(f, sixty, 30), 0, '≈ ', '×')} size={150} font="Bebas Neue" color={P.gold} o={on(f, sixty)} />
      </g>
      <Vignette id="ma" />
    </g>
  )
}

// ---------------------------------------------------------------- s27–s30: 500 names, 3 or 4 real bets
const Bets: React.FC<PieceProps> = ({ f, c }) => {
  const names = c('s27:hundred'), practice = c('s28:practice'), three = c('s28:three')
  const boats = c('s29:diversification'), ropes = c('s30:separate'), move = c('s30:move')
  const sway = Math.sin((f - move) / 12) * 26 * on(f, move)
  const ships = [[560, 520], [960, 470], [1360, 520]]
  return (
    <g>
      <Stage id="bt" tint="teal" frame={f} />
      {/* # on paper: a certificate listing 500 businesses (dots) */}
      <g opacity={1 - on(f, boats)}>
        <rect x={560} y={150} width={800} height={720} rx={16} fill={P.cream} opacity={on(f, c('s27:paper'))} />
        <Label x={960} y={230} text="YOUR FUND: 500 BUSINESSES" size={46} font="Bebas Neue" color={P.navy0} o={on(f, c('s27:paper'))} />
        <DotGrid f={f} x={620} y={290} cols={25} rows={20} gap={28} at={names - 20} litAt={practice} lit={new Set([0, 1, 2, 3, 26, 27, 52, 53, 78, 104])} />
        {f >= three && <Label x={960} y={940} text="really: 10 — and mostly 3 or 4" size={46} color={P.champL} o={on(f, three)} />}
      </g>
      {/* # 500 little boats; ropes tie them to 3 big ships: when the ships move, everything moves */}
      <g opacity={on(f, boats)}>
        {ships.map(([x, y], i) => (
          <g key={i} transform={`translate(${sway * (i === 1 ? 1 : 0.7)} ${Math.sin(f / 15 + i) * 6})`}>
            <path d={`M${x - 120} ${y} L${x + 120} ${y} L${x + 90} ${y + 60} L${x - 90} ${y + 60} Z`} fill={P.coral} />
            <rect x={x - 6} y={y - 170} width={12} height={170} fill={P.cream} /><path d={`M${x + 6} ${y - 160} L${x + 110} ${y - 30} L${x + 6} ${y - 30} Z`} fill={P.cream} />
          </g>
        ))}
        {Array.from({ length: 60 }, (_, i) => {
          const sx = 260 + (i % 15) * 100 + (rnd(i) - 0.5) * 40, sy = 720 + Math.floor(i / 15) * 70, s = ships[i % 3]
          const k = on(f, ropes + (i % 15) * 1.5, 12), dx = sway * (i % 3 === 1 ? 1 : 0.7) * on(f, move) * 0.9
          return (
            <g key={i}>
              {k > 0 && <path d={`M${sx + dx} ${sy - 10} L${s[0] + dx} ${s[1] + 50}`} stroke={P.champL} strokeWidth={2} opacity={0.35 * k} />}
              <g transform={`translate(${dx} ${Math.sin(f / 12 + i) * 3})`}><path d={`M${sx - 22} ${sy} L${sx + 22} ${sy} L${sx + 14} ${sy + 14} L${sx - 14} ${sy + 14} Z`} fill={[P.sky, P.cream, P.mint][i % 3]} /></g>
            </g>
          )
        })}
        <Label x={960} y={150} text="500 NAMES" size={70} font="Bebas Neue" color={P.white} o={on(f, boats) * (1 - on(f, ropes))} />
        {/* # "not really about how many names": the count gets crossed out */}
        <rect x={840} y={124} width={240 * on(f, c('s29:not'), 10)} height={8} rx={4} fill={P.coral} opacity={1 - on(f, ropes)} />
        <Label x={960} y={150} text="3 OR 4 BETS" size={80} font="Bebas Neue" color={P.champL} o={on(f, ropes)} />
      </g>
      <Vignette id="bt" />
    </g>
  )
}

void Actor; void clamp01
export const ACT1 = [
  makePiece('promise', 'CapitalCode + the three questions', {
    beats: ['s9', 's9:capitalcode', 's9:how', 's9:works', 's10:today', 's10:work', 's10:bet', 's10:cost', 's10:people', 's10:decide', 's10:want'],
    sfx: [['s9:capitalcode', 'chime', 0.6], ['s10:bet', 'pop', 0.5], ['s10:cost', 'pop', 0.5], ['s10:decide', 'pop', 0.5]], Component: Promise,
  }),
  makePiece('weighting', 'Weighted by size → market cap', {
    beats: ['s11', 's11:give', 's11:same', 's11:money', 's12:weigh', 's12:size', 's13:bigger', 's13:value', 's13:dollar', 's13:receives', 's14:called', 's14:market', 's14:price', 's14:times', 's14:number', 's14:shares'],
    sfx: [['s11', 'pop', 0.4], ['s12:weigh', 'swish', 0.5], ['s12:size', 'riser', 0.4], ['s13:dollar', 'flutter', 0.5], ['s13:receives', 'coin', 0.6], ['s14:market', 'whoosh', 0.4], ['s14:price', 'softpop', 0.6], ['s14:times', 'click', 0.6], ['s14:shares', 'softpop', 0.6]],
    Component: WeightingPiece,
  }),
  makePiece('history', '30 years of concentration', {
    beats: ['s15', 's15:barely', 's15:biggest', 's15:not', 's16', 's16:1990s', 's16:largest', 's16:fifth', 's17', 's17:2025', 's17:doubled', 's17:40', 's17:highest', 's17:record', 's18', 's18:june', 's18:still', 's18:38'],
    sfx: [['s15', 'whoosh', 0.4], ['s16:1990s', 'tick', 0.6], ['s16:fifth', 'ding', 0.4], ['s17:doubled', 'riser', 0.6], ['s17:record', 'chime', 0.6], ['s18:june', 'tick', 0.6]], Component: History,
  }),
  makePiece('top10', 'Who the ten are', {
    beats: ['s19', 's19:10', 's19:companies', 's20:nvidia', 's20:75', 's20:whole', 's21:apple', 's21:alphabet', 's21:microsoft', 's21:43', 's22:amazon', 's22:broadcom', 's22:micron', 's22:meta', 's22:tesla', 's22:eli', 's22:each', 's22:between', 's22:15', 's22:36'],
    sfx: [['s19:10', 'whoosh', 0.4], ['s20:nvidia', 'pop', 0.6], ['s21:apple', 'pop', 0.5], ['s21:alphabet', 'pop', 0.5], ['s21:microsoft', 'pop', 0.5], ['s22:amazon', 'pop', 0.4], ['s22:broadcom', 'pop', 0.4], ['s22:micron', 'pop', 0.4], ['s22:meta', 'pop', 0.4], ['s22:tesla', 'pop', 0.4], ['s22:eli', 'pop', 0.4]],
    Component: TopTen,
  }),
  makePiece('loop', 'Concentration feeds itself', {
    beats: ['s22a', 's22a:part', 's22a:never', 's22a:concentration', 's22a:feeds', 's22b:giant', 's22b:rises', 's22b:weight', 's22b:rises#2', 's22b:automatically', 's22c', 's22c:dollar', 's22c:flows', 's22c:buys', 's22c:already', 's22d:nobody', 's22d:nvidia', 's22d:biggest', 's22d:savings', 's22e:formula', 's22e:quietly', 's22e:every', 's22e:month'],
    sfx: [['s22a:feeds', 'whoosh', 0.5], ['s22b:rises', 'riser', 0.5], ['s22b:weight', 'softpop', 0.5], ['s22c:dollar', 'flutter', 0.6], ['s22c:buys', 'coin', 0.5], ['s22d:nobody', 'pop', 0.4], ['s22e:formula', 'click', 0.6], ['s22e:month', 'tick', 0.5]],
    Component: Loop,
  }),
  makePiece('maths', 'The maths: 37.9 / 62.1, 0.13% each, 60×', {
    beats: ['s23', 's23:maths', 's23:nobody', 's24:379', 's24:10', 's24:remaining', 's24:621', 's24:shared', 's24:490', 's24:companies#2', 's25:works', 's25:013', 's25:each', 's25:average', 's26:nvidia', 's26:alone', 's26:60', 's26:money', 's26:average', 's26:490'],
    sfx: [['s23:maths', 'click', 0.6], ['s24:379', 'tick', 0.6], ['s24:621', 'tick', 0.6], ['s25:works', 'crack', 0.4], ['s25:013', 'ding', 0.4], ['s26:nvidia', 'riser', 0.5], ['s26:60', 'impact', 0.5]],
    Component: Maths,
  }),
  makePiece('bets', '500 names, 3 or 4 bets', {
    beats: ['s27', 's27:paper', 's27:own', 's27:hundred', 's27:businesses', 's28:practice', 's28:depends', 's28:ten', 's28:three', 's28:four', 's29:diversification', 's29:not', 's29:names', 's29:hold', 's30:separate', 's30:bets', 's30:move', 's30:money'],
    sfx: [['s27:paper', 'flutter', 0.5], ['s27:hundred', 'pop', 0.4], ['s28:practice', 'ding', 0.4], ['s29:diversification', 'whoosh', 0.4], ['s30:separate', 'swish', 0.5], ['s30:move', 'riser', 0.4]],
    Component: Bets,
  }),
]
