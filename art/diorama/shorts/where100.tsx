// ============================================================
// SHORT — "Where your 100 dollars in an index fund really goes"
// (s1–s33, ≈ 2:07), seven tall 1080×1920 diorama pieces drawn for
// a phone. Sourced (June 2026 fund filing): top 10 = 37.9% of the
// S&P 500, NVIDIA 7.52, Apple 6.59, Alphabet 5.84, Microsoft 4.30,
// Amazon 3.62 … the other 490 ≈ 0.127% each (our calc), NVIDIA ≈ 59×
// the average (our calc); top 10 ≈ 19% in the mid-1990s (Apollo).
// Safe areas: nothing important above y 220, below y 1500 or right
// of x 940; captions sit at y 1290–1490.
// ============================================================
import React from 'react'
import { Emblem } from '../../logo/Emblem'
import { getProp } from '../../props/registry'
import { Mini } from '../../rig/Mini'
import { countTo, Label } from '../charts'
import { arc, between, Bill, Building, easeInOut, easeOut, FundBox, Hand, lerp, on, P, Pedestal, Platform, pop, rnd, settle, Sliver, span, Stage, Tower, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'

const W = 1080, H = 1920
const Prop: React.FC<{ id: string; x: number; y: number; size: number; f: number }> = ({ id, x, y, size, f }) => {
  const C = getProp(id).Component
  return <C size={size} x={x - size / 2} y={y - size / 2} frame={f} />
}
// # the stage of every piece in this Short (tall)
const TallStage: React.FC<{ id: string; f: number; tint?: 'navy' | 'teal' }> = ({ id, f, tint }) => <Stage id={id} frame={f} w={W} h={H} tint={tint} />
// # a slow camera: eased moves between [frame, centre x, centre y, zoom] keys plus a gentle drift
const camAt = (f: number, keys: [number, number, number, number][]) => {
  let x = keys[0][1], y = keys[0][2], z = keys[0][3]
  for (const k of keys.slice(1)) {
    if (f < k[0]) break
    const t = easeInOut(span(f, k[0], k[0] + 26))
    x = lerp(x, k[1], t); y = lerp(y, k[2], t); z = lerp(z, k[3], t)
  }
  return `translate(${W / 2} ${H / 2}) scale(${z * (1 + 0.004 * Math.sin(f / 110))}) translate(${-(x + Math.sin(f / 70) * 4)} ${-(y + Math.sin(f / 90) * 3)})`
}
// # a big key number in the headline spot (y ≈ 330), counted up as it is spoken
const Big: React.FC<{ text: string; o: number; y?: number; size?: number; color?: string }> = ({ text, o, y = 330, size = 120, color = P.ink }) => (
  <Label x={W / 2} y={y} text={text} size={size} font="Bebas Neue" color={color} o={o} />
)

// ------------------------------------------------------------ the little city (the fund's 500 companies) on a tall island
const CX = 540, CY = 1050, RX = 440, RY = 150
const TOWERS = Array.from({ length: 10 }, (_, k) => ({ x: CX + (k - 4.5) * 58, y: 990 + Math.abs(k - 4.5) * 5, h: 170 + rnd(k * 3 + 1) * 130 }))
const SMALL = (() => {
  const out: { x: number; y: number; s: number; seed: number }[] = []
  for (let i = 0; out.length < 490 && i < 30000; i++) {
    const x = CX + (rnd(i * 2 + 1) * 2 - 1) * RX * 0.95, y = CY + (rnd(i * 2 + 2) * 2 - 1) * RY * 0.9
    if (((x - CX) / RX) ** 2 + ((y - CY) / RY) ** 2 > 0.82) continue
    if (Math.abs(x - CX) < 320 && y < 1010) continue
    if (out.some((b) => Math.abs(b.x - x) < 17 && Math.abs(b.y - y) < 10)) continue
    out.push({ x, y, s: 0.32 + 0.3 * ((y - (CY - RY)) / (2 * RY)), seed: i })
  }
  return out.sort((a, b) => a.y - b.y)
})()
const City: React.FC<{ f: number; id: string; up: number; towersAt: number; glow: number; dim: number; grow?: number }> = ({ f, id, up, towersAt, glow, dim, grow = 0 }) => (
  <g>
    <Platform id={id} cx={CX} cy={CY} rx={RX} ry={RY} />
    {SMALL.map((b, j) => {
      const k = settle(span(f, up + (j / SMALL.length) * 20, up + (j / SMALL.length) * 20 + 10))
      if (k <= 0.001) return null
      return <g key={j} transform={`translate(${b.x} ${b.y}) scale(${k}) translate(${-b.x} ${-b.y})`}><Building x={b.x} y={b.y} s={b.s} seed={b.seed} dim={dim} /></g>
    })}
    {TOWERS.map((t, k) => {
      const h = t.h * settle(span(f, towersAt + k * 2, towersAt + k * 2 + 16)) * (1 + grow * 0.35)
      return h > 2 ? <Tower key={k} id={id} i={k} x={t.x} y={t.y} h={h} w={50} glow={glow} /> : null
    })}
  </g>
)
// # a stream of slivers from a point to targets (money flowing), frames [from, to]
const pour = (f: number, from: number, to: number, n: number, src: { x: number; y: number }, target: (i: number) => { x: number; y: number }, key: string, gold = false, lift = 90) => {
  const out: React.ReactNode[] = []
  if (f < from || f > to + 24) return out
  for (let i = 0; i < n; i++) {
    const ph = ((f - from) / 24 + i / n) % 1, born = from + (i / n) * 24
    if (f < born || f > to + ph * 24) continue
    const p = arc(src, target(i), easeInOut(ph), lift)
    out.push(<Sliver key={`${key}${i}`} x={p.x} y={p.y} r={ph * 300 + i * 41} s={0.8} gold={gold} />)
  }
  return out
}

// ---------------------------------------------------------------- s1–s3: the $100 goes in; 38 of it lands in 10 companies
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const put = c('s1:put'), fund = c('s1:fund'), d38 = c('s1:38'), ten = c('s1:10'), not = c('s2:not'), tenW = c('s2:ten'), follow = c('s3:follow'), goes = c('s3:goes')
  const handIn = easeOut(span(f, put - 8, put + 14)), drop = easeInOut(span(f, c('s1:into'), c('s1:into') + 16)), handOut = easeInOut(span(f, c('s1:sp') + 6, c('s1:sp') + 24))
  const hx = lerp(-500, 470, handIn) - handOut * 1100, hy = 300
  const bill = drop < 1 ? { x: hx + 60, y: hy + 40 + drop * 170, o: 1 - drop * 0.9 } : null
  const box = { x: 540, y: 560 }
  const mouth = { x: box.x, y: box.y - 100 }
  const bounce = Math.sin(span(f, fund, fund + 12) * Math.PI) * 10
  const glow = Math.max(on(f, ten) * (1 - on(f, not)), on(f, tenW))
  // # the trail: "follow your money" — one bright bill flies from the box down into the giants
  const fol = easeInOut(span(f, follow, goes))
  const fp = arc(mouth, { x: TOWERS[4].x, y: TOWERS[4].y - TOWERS[4].h }, fol, 260)
  const cam = camAt(f, [[0, 540, 760, 1.05], [d38, 540, 860, 1.0], [follow, 540, 860, 1.0], [goes - 14, TOWERS[4].x, 840, 1.9]])
  return (
    <g>
      <TallStage id="h1" f={f} />
      <g transform={cam}>
        {f >= fund - 4 && <City f={f} id="h1" up={fund - 4} towersAt={d38} glow={glow} dim={on(f, not) * 0.8 * (1 - on(f, follow))} />}
        {pour(f, d38, c('s1:companies') + 8, 70, mouth, (i) => ({ x: TOWERS[i % 10].x, y: TOWERS[i % 10].y - TOWERS[i % 10].h }), 'a')}
        {pour(f, d38, c('s1:companies') + 8, 8, mouth, (i) => { const b = SMALL[(i * 61) % SMALL.length]; return { x: b.x, y: b.y - 20 } }, 'b')}
        <g transform={`translate(0 ${-bounce})`}><FundBox id="h1" x={box.x} y={box.y} s={0.9} open={on(f, c('s1:into') - 6)} /></g>
        {bill && <Bill x={bill.x} y={bill.y} s={0.9} r={-8 + drop * 30} o={bill.o} />}
        {handIn > 0 && handOut < 1 && <Hand x={hx} y={hy} r={8} open={drop} />}
        {fol > 0 && fol < 1 && <g><circle cx={fp.x} cy={fp.y} r={40} fill={P.gold} opacity={0.25} /><Bill x={fp.x} y={fp.y} s={0.45} r={fol * 200} /></g>}
      </g>
      <Vignette id="h1" w={W} h={H} />
      {/* # the number as it is said, then "not 500 — ten" */}
      <Big text={`$${countTo(38, on(f, d38, 20))} OF $100`} o={on(f, d38) * (1 - on(f, not - 4))} />
      <Label x={W / 2} y={420} text="→ JUST 10 COMPANIES" size={60} font="Bebas Neue" color={P.goldInk} o={on(f, ten) * (1 - on(f, not - 4))} />
      <Big text="NOT 500." o={between(f, not, tenW - 2)} color={P.coralInk} />
      <Big text="TEN." size={170} o={between(f, tenW - 2, follow)} color={P.goldInk} />
    </g>
  )
}

// ---------------------------------------------------------------- s4–s5: not split equally — split by size
const SIZES = [{ h: 520, c: P.sky }, { h: 330, c: P.coral }, { h: 230, c: P.mint }, { h: 150, c: P.gold }, { h: 90, c: '#E8B4C8' }]
const Split: React.FC<PieceProps> = ({ f, c }) => {
  const split = c('s4:split'), equally = c('s4:equally'), size = c('s5:size'), bigger = c('s5:bigger'), market = c('s5:market'), slice = c('s5:slice'), you = c('s5:you')
  const cut = on(f, split, 16), part = easeInOut(span(f, size, size + 30)), tot = SIZES.reduce((a, b) => a + b.h, 0)
  // # the bill: one $100 note at first, then five slices — equal, then sized to each company
  const widths = SIZES.map((s) => lerp(1 / 5, s.h / tot, part))
  let acc = 0
  const xs = widths.map((w) => { const x = acc; acc += w; return x })
  const grow = on(f, c('s5:bigger#2'), 18)
  return (
    <g>
      <TallStage id="sp" f={f} />
      <Label x={W / 2} y={320} text={f < size ? 'SPLIT EQUALLY?' : 'SPLIT BY SIZE'} size={96} font="Bebas Neue" color={P.ink} o={on(f, c('s4:index'))} />
      {/* # the $100 bill, cut into slices that fly to the companies */}
      {widths.map((w, i) => {
        const fly = easeInOut(span(f, slice - 10 + i * 3, slice + 18 + i * 3)), bx = 140 + xs[i] * 800 + i * 14 * cut, by = 520
        const tx = 160 + i * 190, ty = 1180 - SIZES[i].h * (1 + (i === 0 ? grow * 0.25 : 0)) - 60
        return (
          <g key={i} opacity={on(f, c('s4:index'))} transform={`translate(${lerp(bx, tx - w * 400, fly)} ${lerp(by, ty, fly)}) scale(${lerp(1, 0.5, fly)})`}>
            <rect x={0} y={-80} width={w * 800} height={160} rx={i === 0 || cut < 1 ? 10 : 4} fill="#5FBF7F" />
            <rect x={6} y={-70} width={Math.max(0, w * 800 - 12)} height={140} rx={6} fill="none" stroke="#2E8B57" strokeWidth={3} />
            {cut < 0.5 && i === 2 && <text x={w * 400} y={18} textAnchor="middle" fill="#1F5A3E" style={{ font: '800 64px Inter' }}>100</text>}
          </g>
        )
      })}
      {/* # "equally" — the equal cut gets crossed out */}
      <g opacity={between(f, equally, size)}><path d="M220 400 L860 640 M860 400 L220 640" stroke={P.coral} strokeWidth={22} strokeLinecap="round" /></g>
      {/* # five companies of very different sizes */}
      {SIZES.map((s, i) => {
        const x = 160 + i * 190, hh = s.h * pop(f, size + i * 4, 16) * (1 + (i === 0 ? grow * 0.25 : 0))
        return (
          <g key={i}>
            <Pedestal x={x} y={1180} r={78} />
            <rect x={x - 55} y={1180 - hh} width={110} height={hh} rx={8} fill={s.c} />
            <rect x={x + 8} y={1180 - hh} width={30} height={hh} fill={P.navy0} opacity={0.18} />
            {i === 0 && <rect x={x - 55} y={1180 - hh} width={110} height={hh} rx={8} fill={P.gold} opacity={0.4 * Math.max(0, 1 - Math.abs(f - bigger - 8) / 14)} />}
          </g>
        )
      })}
      <Label x={W / 2} y={1260} text="bigger on the stock market → bigger slice" size={40} color={P.ink} o={on(f, market)} />
      {/* # "…of you": the hero whose money it is */}
      <g opacity={on(f, you)}><Mini look="hero" x={860} y={760} scale={1.2} frame={f} seed={5} mood="neutral" /></g>
      <Vignette id="sp" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s6–s11: the five biggest slices, then all ten = $38
const ROWS: [string, number, string, string, string][] = [
  ['NVIDIA', 7.52, '$7.50', 's6:nvidia', 's6:7'], ['Apple', 6.59, '$6.60', 's7:apple', 's7:6'], ['Alphabet', 5.84, '$5.84', 's8:alphabet', 's8:6'],
  ['Microsoft', 4.3, '$4.30', 's9:microsoft', 's9:4'], ['Amazon', 3.62, '$3.60', 's10:amazon', 's10:3'],
]
const NEXT: [string, number][] = [['Broadcom', 2.77], ['Micron', 2.02], ['Meta', 1.92], ['Tesla', 1.84], ['Eli Lilly', 1.47]]
const Top5: React.FC<PieceProps> = ({ f, c }) => {
  const next = c('s11:next'), together = c('s11:together'), d38 = c('s11:38')
  const merge = easeInOut(span(f, together, together + 30))
  const bar = (v: number) => (v / 7.52) * 600
  return (
    <g>
      <TallStage id="t5" f={f} />
      <Label x={W / 2} y={300} text="OUT OF YOUR $100" size={64} font="Bebas Neue" color={P.ink2} o={on(f, c('s6:biggest')) * (1 - merge)} />
      {ROWS.map(([name, v, txt, k, at], i) => {
        const y = 470 + i * 150, g = on(f, c(at), 24), tx = lerp(110, 540, merge), ty = lerp(y, 860, merge)
        return (
          <g key={name} opacity={on(f, c(k)) * (1 - merge * 0.2)}>
            <Label x={110} y={y - 22} text={name} size={54} anchor="start" color={P.ink} o={1 - merge} />
            {/* # the bar is a stack of bills that grows as the amount is said */}
            <g transform={`translate(${tx} ${ty})`}>
              <rect x={0} y={0} width={Math.max(10, bar(v) * g * (1 - merge * 0.8))} height={84} rx={16} fill={i === 0 ? P.gold : '#5FBF7F'} />
              {Array.from({ length: Math.floor(bar(v) * g / 40) }, (_, b) => <rect key={b} x={b * 40 + 6} y={10} width={4} height={64} fill="#2E8B57" opacity={0.35 * (1 - merge)} />)}
            </g>
            <Label x={110 + bar(v) + 20} y={y + 64} text={txt} size={72} anchor="start" font="Bebas Neue" color={i === 0 ? P.goldInk : P.mintInk} o={on(f, c(at)) * (1 - merge)} />
          </g>
        )
      })}
      {/* # the next five slip in underneath, smaller */}
      {NEXT.map(([name, v], i) => {
        const y = 1196, x = 110 + i * 170
        return (
          <g key={name} opacity={on(f, next + i * 4) * (1 - merge)}>
            <rect x={x} y={y} width={bar(v) * 0.4} height={36} rx={8} fill="#5FBF7F" />
            <Label x={x} y={y + 66} text={name} size={30} anchor="start" color={P.ink2} />
          </g>
        )
      })}
      {/* # all ten together: one pile of $38 */}
      <g opacity={merge}>
        {Array.from({ length: 38 }, (_, k) => <rect key={k} x={390 + (k % 2) * 8} y={1060 - k * 12 * merge} width={300} height={10} rx={4} fill={k % 2 ? '#5FBF7F' : '#4FAF6F'} />)}
        <Label x={W / 2} y={1150} text="THE TOP 10, TOGETHER" size={48} font="Bebas Neue" color={P.ink} />
      </g>
      <Big text={`$${countTo(38, on(f, d38, 20))}`} y={420} size={200} o={on(f, d38)} color={P.goldInk} />
      <Vignette id="t5" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s12–s15: $62 for 490 companies, 13 cents each, 59× — not equal parts
const COLS = 22
const Rest: React.FC<PieceProps> = ({ f, c }) => {
  const leaves = c('s12:leaves'), d62 = c('s12:62'), n490 = c('s12:490'), spread = c('s13:spread'), avg = c('s13:average'), c13 = c('s13:13')
  const nv = c('s14:nvidia'), x59 = c('s14:59'), same = c('s14:same'), notP = c('s15:not'), equal = c('s15:equal'), parts = c('s15:parts')
  const A = 1 - on(f, nv - 6), B = between(f, nv - 6, notP - 4), C = on(f, notP - 4)
  const dot = (j: number) => ({ x: 120 + (j % COLS) * 38, y: 540 + Math.floor(j / COLS) * 32 })
  const zoom = easeInOut(span(f, avg, avg + 24)) * (1 - easeInOut(span(f, nv - 10, nv + 6)))
  const pick = dot(250)
  const stack = Math.round(59 * easeOut(span(f, x59, x59 + 34)))
  return (
    <g>
      <TallStage id="rs" f={f} />
      <g opacity={A}>
        <g transform={`translate(${pick.x} ${pick.y}) scale(${1 + zoom * 4}) translate(${-pick.x} ${-pick.y})`}>
          {/* # the green pile of $62 above, pouring down into the 490 */}
          <g opacity={on(f, leaves) * (1 - on(f, spread + 10))} transform={`translate(${W / 2} 470) scale(${pop(f, d62)})`}>
            {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-150} y={-k * 10} width={300} height={9} rx={4} fill="#5FBF7F" />)}
          </g>
          {Array.from({ length: 490 }, (_, j) => {
            const d = dot(j), k = settle(span(f, n490 + (j / 490) * 18, n490 + (j / 490) * 18 + 10))
            const lit = j === 250 && zoom > 0.01
            return k > 0.001 ? <g key={j} transform={`translate(${d.x} ${d.y}) scale(${k})`}><rect x={-10} y={-12} width={20} height={22} rx={4} fill={lit ? P.sky : P.navy3} opacity={lit ? 1 : 0.75 - zoom * 0.5} /></g> : null
          })}
          {pour(f, spread, spread + 30, 40, { x: W / 2, y: 470 }, (i) => dot((i * 37) % 490), 'r', false, 40)}
          {/* # one company's crumb: 13 cents */}
          <g opacity={on(f, c13)}><ellipse cx={pick.x} cy={pick.y - 18} rx={6} ry={3} fill={P.gold} /></g>
        </g>
        <Big text={`$${countTo(62, on(f, d62, 20))} FOR 490 COMPANIES`} size={84} o={on(f, d62) * (1 - on(f, avg - 4))} />
        <Big text={`≈ ${countTo(13, on(f, c13, 16))}¢ EACH`} size={130} o={on(f, c13)} color={P.goldInk} />
      </g>
      {/* # NVIDIA's stack vs the average company's crumb: 59 crumbs tall */}
      <g opacity={B}>
        <Pedestal x={330} y={1180} r={120} /><Tower id="rs" i={0} x={330} y={1180} h={560 * pop(f, nv, 18)} w={130} glow={on(f, x59)} />
        <Label x={330} y={1270} text="NVIDIA · $7.50" size={44} font="Bebas Neue" color={P.ink} />
        <Pedestal x={770} y={1180} r={80} /><Building x={770} y={1180} s={1.6} seed={11} />
        {Array.from({ length: Math.max(1, stack) }, (_, k) => <ellipse key={k} cx={770} cy={1050 - k * 8.6} rx={34} ry={9} fill={k % 2 ? P.gold : P.goldD} />)}
        <Label x={770} y={1270} text="AVERAGE · 13¢" size={44} font="Bebas Neue" color={P.ink} />
        <Big text={`${countTo(59, easeOut(span(f, x59, x59 + 34)))}× MORE`} size={150} o={on(f, x59)} color={P.goldInk} />
        <Label x={W / 2} y={440} text="same fund" size={44} color={P.ink2} o={on(f, same)} />
      </g>
      {/* # 500 equal parts? no — ten huge blocks and 490 crumbs */}
      <g opacity={C}>
        {Array.from({ length: 100 }, (_, j) => {
          const eq = { x: 140 + (j % 10) * 80, y: 470 + Math.floor(j / 10) * 72, w: 68, h: 62 }
          const big = j < 10, un = big ? { x: 140 + (j % 5) * 160, y: 470 + Math.floor(j / 5) * 260, w: 150, h: 250 } : { x: 140 + ((j - 10) % 30) * 27, y: 1000 + Math.floor((j - 10) / 30) * 30, w: 22, h: 22 }
          const t = easeInOut(span(f, parts - 4, parts + 26))
          return <rect key={j} x={lerp(eq.x, un.x, t)} y={lerp(eq.y, un.y, t)} width={lerp(eq.w, un.w, t)} height={lerp(eq.h, un.h, t)} rx={8} fill={big ? P.gold : P.sky} opacity={0.9} />
        })}
        <Big text="500 EQUAL PARTS?" size={100} o={on(f, notP) * (1 - on(f, parts))} />
        <Big text="NOT EQUAL" size={130} o={on(f, parts)} color={P.coralInk} />
        <g opacity={on(f, equal)}><path d="M260 290 L820 290" stroke={P.coral} strokeWidth={12} strokeLinecap="round" opacity={1 - on(f, parts)} /></g>
      </g>
      <Vignette id="rs" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s16–s21: it wasn't always like this — and it feeds itself
const History: React.FC<PieceProps> = ({ f, c }) => {
  const lop = c('s16:lopsided'), y90 = c('s17:1990s'), n19 = c('s17:19'), today = c('s18:today'), dbl = c('s18:double'), nobody = c('s19:nobody'), own = c('s19:own')
  const price = c('s20:price'), rises = c('s20:rises'), bigger = c('s20:bigger'), dollar = c('s20:dollar'), buys = c('s20:buys'), winners = c('s21:winners'), leans = c('s21:leans'), year = c('s21:year')
  const A = 1 - on(f, nobody - 6), B = on(f, nobody - 6)
  // # the chart: two sourced points, mid-1990s ≈ 19% and today 37.9%
  const X0 = 170, X1 = 880, Y0 = 1160, sc = (v: number) => Y0 - v * 16
  const draw = easeInOut(span(f, today - 4, today + 30))
  const grow = on(f, rises, 30) + on(f, buys, 30) * 0.6 + on(f, winners, 30) * 0.6
  const tilt = -8 * on(f, leans, 30)
  return (
    <g>
      <TallStage id="hs" f={f} />
      <g opacity={A}>
        {/* # a see-saw: ten giants on one end outweigh 490 small companies */}
        <g opacity={between(f, lop - 10, y90)} transform={`rotate(${-10 * on(f, lop, 24)} 540 760)`}>
          <rect x={120} y={740} width={840} height={20} rx={10} fill={P.champ} />
          {Array.from({ length: 10 }, (_, k) => <rect key={k} x={140 + k * 26} y={600} width={22} height={140} rx={5} fill={P.sky} />)}
          {Array.from({ length: 60 }, (_, k) => <rect key={k} x={640 + (k % 15) * 20} y={716 - Math.floor(k / 15) * 12} width={14} height={10} rx={2} fill={P.navy4} />)}
        </g>
        <path d="M500 860 L540 760 L580 860 Z" fill={P.champ} opacity={between(f, lop - 10, y90)} />
        <Label x={W / 2} y={330} text="NOT ALWAYS THIS LOPSIDED" size={70} font="Bebas Neue" color={P.ink} o={between(f, c('s16:always'), y90)} />
        {/* # the chart */}
        <g opacity={on(f, y90)}>
          <Label x={W / 2} y={330} text="TOP 10'S SHARE OF THE INDEX" size={60} font="Bebas Neue" color={P.ink} />
          <rect x={X0} y={Y0} width={X1 - X0} height={4} fill={P.ink2} opacity={0.6} />
          {[10, 20, 30, 40].map((v) => <g key={v}><rect x={X0} y={sc(v)} width={X1 - X0} height={2} fill={P.ink} opacity={0.1} /><Label x={X0 - 16} y={sc(v) + 10} text={`${v}%`} size={28} anchor="end" color={P.ink2} /></g>)}
          <Label x={X0} y={Y0 + 50} text="mid-1990s" size={32} color={P.ink2} /><Label x={X1} y={Y0 + 50} text="today" size={32} color={P.ink2} o={on(f, today)} />
          <rect x={X0 - 40} y={sc(19)} width={80} height={Y0 - sc(19)} rx={10} fill={P.sky} opacity={on(f, n19)} />
          <Label x={X0} y={sc(19) - 22} text="19%" size={60} font="Bebas Neue" color={P.skyInk} o={on(f, n19)} />
          <path d={`M${X0} ${sc(19)} L${lerp(X0, X1, draw)} ${lerp(sc(19), sc(37.9), draw)}`} stroke={P.gold} strokeWidth={8} strokeDasharray="14 12" fill="none" />
          <rect x={X1 - 40} y={lerp(Y0, sc(37.9), easeOut(span(f, today + 10, today + 34)))} width={80} height={(Y0 - sc(37.9)) * easeOut(span(f, today + 10, today + 34))} rx={10} fill={P.gold} />
          <Label x={X1} y={sc(37.9) - 22} text="37.9%" size={60} font="Bebas Neue" color={P.goldInk} o={on(f, today + 20)} />
          <Big text="≈ 2×" y={460} size={160} o={on(f, dbl)} color={P.goldInk} />
        </g>
      </g>
      {/* # it happens on its own: a giant's price rises → bigger share → new dollars buy more of it → it rises again */}
      <g opacity={B} transform={`rotate(${tilt} 540 1100)`}>
        <Label x={W / 2} y={330} text="IT FEEDS ITSELF" size={90} font="Bebas Neue" color={P.ink} o={on(f, c('s19:happens'))} />
        <circle cx={540} cy={800} r={330} fill="none" stroke={P.ink2} strokeWidth={5} strokeDasharray="30 22" opacity={0.6 * on(f, own)} transform={`rotate(${(f - nobody) * 0.8} 540 800)`} />
        <Pedestal x={540} y={1060} r={150} /><Tower id="hs" i={0} x={540} y={1060} h={(240 + 170 * Math.min(grow, 1.8)) * pop(f, nobody, 16)} w={110} glow={on(f, rises)} />
        <g opacity={on(f, price)} transform={`translate(760 ${640 - 120 * on(f, rises, 30)})`}><Prop id="arrow-up" x={0} y={0} size={110} f={f} /></g>
        <Label x={300} y={560} text="BIGGER SHARE" size={44} font="Bebas Neue" color={P.goldInk} o={on(f, bigger)} />
        {pour(f, dollar, own + 400, 26, { x: 120, y: 520 }, () => ({ x: 540, y: 1060 - (240 + 170 * Math.min(grow, 1.8)) }), 'h', true, 140).slice(0, f < year + 60 ? 26 : 0)}
        <Label x={160} y={470} text="new dollars" size={36} anchor="start" color={P.ink} o={on(f, dollar)} />
        {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, year + k * 5)} transform={`translate(${770 + (k % 2) * 30} ${1130 - k * 40})`}>
          <rect x={-60} y={-34} width={120} height={68} rx={10} fill={P.paper} stroke={P.edge} strokeWidth={3} /><rect x={-60} y={-34} width={120} height={20} rx={8} fill={P.coral} />
          <Label x={0} y={26} text={`${2026 + k}`} size={34} font="Bebas Neue" color={P.navy0} /></g>)}
      </g>
      <Vignette id="hs" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s22–s31: not broken — but a bet on a handful of names
const Bet: React.FC<PieceProps> = ({ f, c }) => {
  const broken = c('s22:broken'), real = c('s23:real'), profits = c('s23:profits'), big = c('s23:big'), whole = c('s24:whole'), bet = c('s24:bet'), handful = c('s24:handful'), names = c('s24:names')
  const well = c('s25:well'), well2 = c('s25:well#2'), stumble = c('s26:stumble'), d38 = c('s26:38'), stumbles = c('s26:stumbles'), never = c('s27:never'), check = c('s27:check')
  const own = c('s28:owning'), spreading = c('s28:spreading'), thin = c('s28:thin'), carry = c('s29:carry'), weight = c('s29:weight'), diff = c('s29:different'), wrong = c('s30:wrong'), sens = c('s30:sensible'), know = c('s31:know'), making = c('s31:making')
  const A = 1 - on(f, whole - 6), B = between(f, whole - 6, never - 6), C = between(f, never - 6, own - 6), D = between(f, own - 6, wrong - 6), E = on(f, wrong - 6)
  const up = on(f, well, 20) * (1 - on(f, stumble, 10)), down = on(f, stumble, 20)
  return (
    <g>
      <TallStage id="bt" f={f} />
      {/* # A: the fund is not broken; these are real, profitable businesses */}
      <g opacity={A}>
        <FundBox id="bt" x={540} y={560} s={0.9} />
        <g opacity={on(f, broken)} transform={`translate(760 420) scale(${pop(f, broken)})`}><circle r={60} fill={P.mint} /><path d="M-26 0 l18 18 l36 -40" stroke={P.white} strokeWidth={14} fill="none" strokeLinecap="round" /></g>
        <Label x={W / 2} y={330} text="NOT BROKEN" size={100} font="Bebas Neue" color={P.mintInk} o={on(f, broken)} />
        {Array.from({ length: 5 }, (_, k) => {
          const x = 220 + k * 160, h = (200 + k * 30) * pop(f, real + k * 3, 16) * (1 + 0.3 * on(f, big, 20))
          return <g key={k}><Tower id="bt" i={k} x={x} y={1180} h={h} w={90} glow={on(f, profits)} />
            {Array.from({ length: Math.round(8 * on(f, profits + k * 3, 20)) }, (_, j) => <ellipse key={j} cx={x} cy={1180 - h - 50 - j * 9} rx={26} ry={7} fill={j % 2 ? P.gold : P.goldD} />)}</g>
        })}
        <Label x={W / 2} y={1260} text="real businesses, real profits" size={40} color={P.ink} o={on(f, real)} />
      </g>
      {/* # B: buy the whole market → really a bet on a handful of names; if they do well you do well, if they stumble… */}
      <g opacity={B}>
        <Label x={W / 2} y={330} text={f < stumble ? 'A BET ON A HANDFUL OF NAMES' : 'IF THEY STUMBLE…'} size={70} font="Bebas Neue" color={f < stumble ? P.ink : P.coralInk} o={on(f, bet)} />
        {Array.from({ length: 10 }, (_, k) => {
          // # ten cards fan out of the fund like a hand of bets
          const fan = on(f, handful + k * 2, 16), a = (k - 4.5) * 9 * fan, wob = down * Math.sin(f / 4 + k) * 6
          return <g key={k} transform={`translate(540 ${880 + down * 120}) rotate(${a + wob}) translate(0 ${-260 * fan})`} opacity={on(f, handful + k * 2)}>
            <rect x={-48} y={-70} width={96} height={140} rx={12} fill={P.paper} stroke={P.edge} strokeWidth={3} />
            <rect x={-30} y={-40} width={60} height={70} rx={8} fill={k < 3 ? P.gold : P.sky} opacity={0.85} />
          </g>
        })}
        <FundBox id="bt2" x={540} y={1000 + down * 60} s={0.7} open={on(f, whole)} label="MARKET" />
        <Label x={W / 2} y={1260} text="10 names" size={44} font="Bebas Neue" color={P.goldInk} o={on(f, names)} />
        {/* # you, with the fund: happy when they rise, worried when they fall */}
        <g transform={`translate(0 ${-up * 30})`}><Pedestal x={860} y={1180} r={70} /><Mini look="hero" x={845} y={1180} scale={1.1} frame={f} seed={9} mood={up > 0.5 ? 'happy' : down > 0.5 ? 'sad' : 'neutral'} /></g>
        <g opacity={on(f, well2) * (1 - down)} transform="translate(860 860)"><Prop id="arrow-up" x={0} y={0} size={90} f={f} /></g>
        {/* # 38 cents of every dollar falls with them */}
        <g opacity={on(f, d38)} transform={`translate(260 ${lerp(760, 1120, easeInOut(span(f, stumbles, stumbles + 24)))}) rotate(${on(f, stumbles, 24) * 40})`}>
          <circle r={70} fill={P.gold} /><circle r={56} fill="none" stroke={P.goldD} strokeWidth={6} /><Label x={0} y={18} text="38¢" size={52} font="Bebas Neue" color={P.navy0} />
        </g>
      </g>
      {/* # C: the part most people never check */}
      <g opacity={C}>
        <g transform={`translate(540 760) scale(${pop(f, never - 6)})`}>
          <rect x={-300} y={-300} width={600} height={600} rx={30} fill={P.paper} stroke={P.edge} strokeWidth={3} />
          {['Fees', 'Returns', 'What it is a bet on'].map((t, k) => <g key={k} transform={`translate(-240 ${-170 + k * 150})`}>
            <rect x={0} y={-40} width={70} height={70} rx={12} fill="none" stroke={k === 2 ? P.coral : P.navy3} strokeWidth={6} />
            {k < 2 && <path d="M14 -4 l16 18 l30 -40" stroke={P.mint} strokeWidth={10} fill="none" strokeLinecap="round" />}
            <Label x={100} y={12} text={t} size={44} anchor="start" color={k === 2 ? P.coralInk : P.navy0} /></g>)}
        </g>
        <g transform={`translate(${lerp(1000, 640, on(f, check, 18))} ${lerp(500, 1000, on(f, check, 18))})`}><Prop id="magnifier" x={0} y={0} size={200} f={f} /></g>
        <Label x={W / 2} y={330} text="MOST PEOPLE NEVER CHECK" size={76} font="Bebas Neue" color={P.coralInk} o={on(f, never)} />
      </g>
      {/* # D: spread thin over 500? — 10 carry most of the weight (a balance) */}
      <g opacity={D}>
        <Label x={W / 2} y={330} text={f < carry ? 'SPREAD THIN?' : '10 CARRY THE WEIGHT'} size={90} font="Bebas Neue" color={P.ink} o={on(f, own)} />
        {Array.from({ length: 120 }, (_, j) => {
          const sp = on(f, spreading, 24), x = lerp(540, 120 + (j % 12) * 76, sp), y = lerp(760, 520 + Math.floor(j / 12) * 50, sp)
          return <rect key={j} x={x - 14} y={y - 10} width={28} height={20} rx={4} fill={j < 10 ? P.gold : P.sky} opacity={on(f, own) * (1 - on(f, carry - 4))} />
        })}
        <Label x={W / 2} y={1100} text="500 companies" size={44} color={P.ink2} o={on(f, thin) * (1 - on(f, carry - 4))} />
        {/* # the balance: ten heavy gold blocks vs 490 light blue ones */}
        <g opacity={on(f, carry - 4)}>
          <g transform={`rotate(${-14 * on(f, weight, 26)} 540 820)`}>
            <rect x={120} y={810} width={840} height={20} rx={10} fill={P.navy3} />
            {Array.from({ length: 10 }, (_, k) => <rect key={k} x={140 + (k % 5) * 56} y={730 - Math.floor(k / 5) * 74} width={50} height={70} rx={8} fill={P.gold} />)}
            {Array.from({ length: 49 }, (_, k) => <rect key={k} x={640 + (k % 10) * 30} y={790 - Math.floor(k / 10) * 18} width={24} height={14} rx={3} fill={P.sky} />)}
          </g>
          <path d="M490 960 L540 830 L590 960 Z" fill={P.navy3} />
          <Label x={300} y={1080} text="10" size={90} font="Bebas Neue" color={P.goldInk} /><Label x={790} y={1080} text="490" size={90} font="Bebas Neue" color={P.skyInk} />
          <Label x={W / 2} y={1200} text="something different" size={44} color={P.ink} o={on(f, diff)} />
        </g>
      </g>
      {/* # E: not wrong — just know which bet you are making */}
      <g opacity={E}>
        <g opacity={on(f, wrong)} transform={`translate(540 600) scale(${pop(f, wrong)})`}><circle r={110} fill={P.mint} /><path d="M-48 0 l32 32 l66 -72" stroke={P.white} strokeWidth={24} fill="none" strokeLinecap="round" /></g>
        <Label x={W / 2} y={330} text={f < know ? 'NOT WRONG' : 'KNOW YOUR BET'} size={110} font="Bebas Neue" color={f < know ? P.mintInk : P.ink} o={on(f, wrong)} />
        <Label x={W / 2} y={810} text="a sensible choice for many" size={44} color={P.ink} o={on(f, sens) * (1 - on(f, know))} />
        <g opacity={on(f, know)}>
          <Pedestal x={400} y={1200} r={110} /><Mini look="hero" x={380} y={1200} scale={1.6} frame={f} seed={14} mood="happy" />
          <g transform={`translate(${lerp(780, 660, on(f, making, 16))} ${lerp(1100, 900, on(f, making, 16))}) rotate(${lerp(20, -6, on(f, making, 16))})`}>
            <rect x={-130} y={-170} width={260} height={340} rx={22} fill={P.paper} stroke={P.edge} strokeWidth={3} />
            <rect x={-130} y={-170} width={260} height={80} rx={22} fill={P.gold} />
            <Label x={0} y={-114} text="MY BET" size={46} font="Bebas Neue" color={P.navy0} />
            {Array.from({ length: 10 }, (_, k) => <rect key={k} x={-100 + (k % 5) * 42} y={-40 + Math.floor(k / 5) * 90} width={30} height={70} rx={6} fill={P.sky} />)}
          </g>
        </g>
      </g>
      <Vignette id="bt" w={W} h={H} />
    </g>
  )
}

// ---------------------------------------------------------------- s32–s33: the loop back — $100 in, $38 to 10 companies
const Loop: React.FC<PieceProps> = ({ f, c, to }) => {
  const put = c('s32:put'), market = c('s32:market'), picture = c('s32:picture'), goes = c('s32:goes'), d38 = c('s33:38'), straight = c('s33:straight'), ten = c('s33:10')
  const handIn = easeOut(span(f, put - 10, put + 12)), drop = easeInOut(span(f, c('s32:100'), c('s32:100') + 16)), handOut = easeInOut(span(f, market, market + 18))
  const hx = lerp(-500, 470, handIn) - handOut * 1100, hy = 300
  const bill = drop < 1 ? { x: hx + 60, y: hy + 40 + drop * 170, o: 1 - drop * 0.9 } : null
  const mouth = { x: 540, y: 540 }
  const end = on(f, to - 40, 20)
  return (
    <g>
      <TallStage id="lp" f={f} />
      <City f={f} id="lp" up={c('s32')} towersAt={picture} glow={on(f, ten)} dim={on(f, straight) * 0.7} grow={on(f, ten, 20)} />
      {pour(f, d38, ten + 20, 70, mouth, (i) => ({ x: TOWERS[i % 10].x, y: TOWERS[i % 10].y - TOWERS[i % 10].h * 1.35 }), 'l', true)}
      <g opacity={1 - end}><FundBox id="lp" x={540} y={620} s={0.75} open={on(f, c('s32:100') - 6)} /></g>
      {bill && <Bill x={bill.x} y={bill.y} s={0.9} r={-8 + drop * 30} o={bill.o} />}
      {handIn > 0 && handOut < 1 && <Hand x={hx} y={hy} r={8} open={drop} />}
      <Label x={W / 2} y={330} text="WHERE IT REALLY GOES" size={80} font="Bebas Neue" color={P.ink} o={between(f, goes - 6, d38)} />
      <Big text="$38" size={170} o={on(f, d38) * (1 - end)} color={P.goldInk} />
      <Label x={W / 2} y={440} text="→ JUST 10 COMPANIES" size={64} font="Bebas Neue" color={P.ink} o={on(f, ten) * (1 - end)} />
      {/* # the brand takes the headline spot in the last second */}
      <g opacity={end}><svg x={W / 2 - 70} y={230} width={140} height={140}><Emblem size={140} /></svg>
        <Label x={W / 2} y={440} text="CAPITALCODE" size={70} font="Bebas Neue" color={P.ink} /></g>
      <Vignette id="lp" w={W} h={H} />
    </g>
  )
}

const beat = (sid: string, ws: string[]) => ws.map((w) => (w ? `${sid}:${w}` : sid))
export const WHERE100 = [
  makePiece('w100-hook', 'Short: $100 in → $38 lands in 10 companies — not 500, ten', { canvas: 'tall', mood: 'dark', Component: Hook,
    beats: [...beat('s1', ['put', '100', 'into', 'sp', 'fund', '38', 'dollars', 'land', '10', 'companies']), ...beat('s2', ['not', 'ten']), ...beat('s3', ['', 'follow', 'money', 'exactly', 'goes'])],
    sfx: [['s1:put', 'swish', 0.5], ['s1:into', 'flutter', 0.6], ['s1:fund', 'softpop', 0.7], ['s1:38', 'whoosh', 0.5], ['s1:10', 'chime', 0.5], ['s2:not', 'thud', 0.5], ['s2:ten', 'impact', 0.5], ['s3:follow', 'swish', 0.5]] }),
  makePiece('w100-split', 'Short: not split equally — split by size', { canvas: 'tall', mood: 'light', Component: Split,
    beats: [...beat('s4', ['', 'index', 'split', 'money', 'equally']), ...beat('s5', ['splits', 'size', 'bigger', 'company', 'stock', 'market', 'bigger#2', 'slice', 'you'])],
    sfx: [['s4:split', 'swish', 0.6], ['s4:equally', 'glitch', 0.4], ['s5:size', 'pop', 0.5], ['s5:bigger#2', 'riser', 0.4], ['s5:slice', 'whoosh', 0.5]] }),
  makePiece('w100-top5', 'Short: NVIDIA $7.50, Apple $6.60 … the top 10 hold $38', { canvas: 'tall', mood: 'light', Component: Top5,
    beats: [...beat('s6', ['', 'biggest', 'slice', 'nvidia', 'takes', '7', '50', '100']), ...beat('s7', ['apple', 'takes', '6', '60']), ...beat('s8', ['alphabet', 'almost', '6']),
      ...beat('s9', ['microsoft', 'over', '4']), ...beat('s10', ['amazon', '3', '60']), ...beat('s11', ['add', 'next', 'five', 'top', 'together', 'hold', '38'])],
    sfx: [['s6:nvidia', 'pop', 0.5], ['s6:7', 'cash', 0.5], ['s7:apple', 'pop', 0.4], ['s8:alphabet', 'pop', 0.4], ['s9:microsoft', 'pop', 0.4], ['s10:amazon', 'pop', 0.4], ['s11:next', 'tick', 0.5], ['s11:together', 'whoosh', 0.5], ['s11:38', 'cash', 0.6]] }),
  makePiece('w100-rest', 'Short: $62 for 490 companies — 13¢ each — NVIDIA 59× — not equal parts', { canvas: 'tall', mood: 'light', Component: Rest,
    beats: [...beat('s12', ['', 'leaves', '62', 'other', '490', 'companies']), ...beat('s13', ['spread', 'across', 'all', 'average', 'gets', '13']),
      ...beat('s14', ['', 'nvidia', 'alone', 'roughly', '59', 'times', 'more', 'average', 'same', 'fund']), ...beat('s15', ['', 'not', 'fund', '500', 'equal', 'parts'])],
    sfx: [['s12:62', 'cash', 0.5], ['s12:490', 'pop', 0.4], ['s13:spread', 'flutter', 0.5], ['s13:13', 'tick', 0.6], ['s14:nvidia', 'riser', 0.4], ['s14:59', 'coin', 0.7], ['s15:parts', 'whoosh', 0.5]] }),
  makePiece('w100-history', 'Short: 19% in the 1990s → 37.9% today; it feeds itself', { canvas: 'tall', mood: 'dark', Component: History,
    beats: [...beat('s16', ['', 'always', 'lopsided']), ...beat('s17', ['', '1990s', 'top', '10', '19', 'index']), ...beat('s18', ['today', 'close', 'double']), ...beat('s19', ['nobody', 'planned', 'happens', 'own']),
      ...beat('s20', ['', 'giant\'s', 'price', 'rises', 'becomes', 'bigger', 'index', 'every', 'new', 'dollar', 'flows', 'buys', 'more']), ...beat('s21', ['', 'winners', 'grow', 'fund', 'leans', 'further', 'year', 'year#2'])],
    sfx: [['s16:lopsided', 'thud', 0.5], ['s17:19', 'pop', 0.5], ['s18:today', 'riser', 0.4], ['s18:double', 'impact', 0.5], ['s20:rises', 'riser', 0.4], ['s20:dollar', 'coin', 0.5], ['s20:buys', 'cash', 0.4], ['s21:leans', 'whoosh', 0.4], ['s21:year', 'tick', 0.5]] }),
  makePiece('w100-bet', 'Short: not broken — but a bet on a handful of names; know which bet you make', { canvas: 'tall', mood: 'light', Component: Bet,
    beats: [...beat('s22', ['', 'means', 'fund', 'broken']), ...beat('s23', ['', 'real', 'businesses', 'earn', 'enormous', 'profits', 'exactly', 'big']),
      ...beat('s24', ['', 'mean', 'buy', 'whole', 'market', 'big', 'part', 'really', 'buying', 'bet', 'handful', 'names']), ...beat('s25', ['', 'ten', 'well', 'you', 'well#2']),
      ...beat('s26', ['', 'stumble', '38', 'every', 'dollar', 'stumbles', 'them']), ...beat('s27', ['', 'part', 'people', 'never', 'check']),
      ...beat('s28', ['', '500', 'companies', 'sounds', 'spreading', 'risk', 'thin']), ...beat('s29', ['', '500', 'companies', 'where', '10', 'carry', 'most', 'weight', 'something', 'different']),
      ...beat('s30', ['', 'not', 'wrong', 'lot', 'people', 'still', 'sensible', 'choice']), ...beat('s31', ['', 'just', 'know', 'which', 'bet', 'actually', 'making'])],
    sfx: [['s22:broken', 'ding', 0.5], ['s23:profits', 'coin', 0.5], ['s24:handful', 'flutter', 0.5], ['s25:well', 'chime', 0.4], ['s26:stumble', 'thud', 0.5], ['s26:stumbles', 'crack', 0.5],
      ['s27:never', 'glitch', 0.4], ['s28:spreading', 'swish', 0.4], ['s29:weight', 'thud', 0.6], ['s30:wrong', 'ding', 0.5], ['s31:making', 'softpop', 0.5]] }),
  makePiece('w100-loop', 'Short: loop back — $100 in, $38 to 10 companies', { canvas: 'tall', mood: 'dark', Component: Loop,
    beats: [...beat('s32', ['', 'next', 'put', '100', 'whole', 'market', 'picture', 'really', 'goes']), ...beat('s33', ['', '38', 'straight', 'just', '10', 'companies'])],
    sfx: [['s32:put', 'swish', 0.5], ['s32:100', 'flutter', 0.5], ['s33:38', 'whoosh', 0.5], ['s33:10', 'chime', 0.6]] }),
]
