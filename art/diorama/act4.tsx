// ============================================================
// ACT 4 — "Why index funds still work" (s64–s73), diorama pieces.
// Sourced: Bessembinder (JFE 2018): the best 4% of US listed
// companies explain the whole net gain 1926–2016; slightly more than
// 4 in 7 (≈ 57%) did worse than one-month T-bills over their life.
// ============================================================
import React from 'react'
import { getProp } from '../props/registry'
import { Mini } from '../rig/Mini'
import { CoinStack, DotGrid, Label, PriceTag } from './charts'
import { arc, between, easeInOut, easeOut, FundBox, lerp, on, P, Pedestal, Platform, pop, rnd, span, Stage, Tower, Vignette } from './kit'
import { makePiece, type PieceProps } from './registry'

const Prop: React.FC<{ id: string; x: number; y: number; size: number; f: number }> = ({ id, x, y, size, f }) => {
  const C = getProp(id).Component
  return <C size={size} x={x - size / 2} y={y - size / 2} frame={f} />
}

// ---------------------------------------------------------------- s64–s68: broken? the evidence (4% / 57%)
const COLS = 25, ROWS = 12
const LIT4 = new Set(Array.from({ length: Math.round(COLS * ROWS * 0.04) }, (_, i) => Math.floor(rnd(i * 13 + 5) * COLS * ROWS)))
const Evidence: React.FC<PieceProps> = ({ f, c }) => {
  const broken = c('s64:broken'), ev = c('s65:evidence'), prof = c('s66:professor'), every = c('s66:every'), y1926 = c('s66:1926'), best = c('s67:best'), half = c('s68:half'), bills = c('s68:bills')
  const A = 1 - on(f, prof - 8), B = on(f, prof - 8)
  const crack = on(f, broken, 10) * (1 - on(f, ev, 16))
  return (
    <g>
      <Stage id="ev" frame={f} />
      {/* # is the fund broken? it cracks… then the evidence mends it */}
      <g opacity={A}>
        <FundBox id="ev" x={960} y={560} s={1.3} />
        {[[880, 450, 940, 560, 900, 680], [1040, 470, 1000, 580, 1050, 690]].map((l, k) => <path key={k} d={`M${l[0]} ${l[1]} L${l[2]} ${l[3]} L${l[4]} ${l[5]}`} stroke={P.white} strokeWidth={6} fill="none" strokeDasharray="400" strokeDashoffset={400 * (1 - crack)} opacity={crack} />)}
        <Label x={960} y={190} text="BROKEN?" size={110} font="Bebas Neue" color={P.coralInk} o={between(f, c('s64:mean'), ev)} />
        <Label x={960} y={190} text="THE EVIDENCE" size={96} font="Bebas Neue" color={P.ink} o={on(f, ev)} />
        <g opacity={on(f, ev)} transform={`translate(${lerp(-200, 0, on(f, ev, 20))} 0)`}><Prop id="magnifier" x={1300} y={560} size={260} f={f} /></g>
      </g>
      {/* # the professor and every US stock since 1926: one dot per company */}
      <g opacity={B}>
        <g opacity={on(f, prof)}><Pedestal x={220} y={900} r={110} /><Mini look="investor" x={200} y={900} scale={1.4} frame={f} seed={14} /><Prop id="graduation-cap" x={200} y={600} size={90} f={f} /><Label x={220} y={1000} text="Hendrik Bessembinder" size={30} o={on(f, c('s66:hendrik'))} /></g>
        <Label x={1060} y={150} text={f < best ? 'EVERY US STOCK SINCE 1926' : f < half ? 'THE BEST 4% MADE ALL THE NET GAIN' : '≈ 57% DID WORSE THAN T-BILLS'} size={60} font="Bebas Neue" color={f < half ? P.ink : P.coralInk} o={on(f, every)} />
        <Label x={1600} y={240} text="1926 → 2016" size={40} font="Bebas Neue" color={P.ink} o={on(f, y1926)} />
        <DotGrid f={f} x={600} y={300} cols={COLS} rows={ROWS} gap={38} lit={LIT4} at={every} litAt={best} />
        {/* # more than half: dots turn coral, left of a T-bill line */}
        {f >= half && Array.from({ length: COLS * ROWS }, (_, i) => {
          if (LIT4.has(i) || rnd(i * 7 + 2) > 0.6) return null
          const k = on(f, half + (i % COLS) * 0.5, 10)
          return <circle key={i} cx={600 + (i % COLS) * 38} cy={300 + Math.floor(i / COLS) * 38} r={11} fill={P.coral} opacity={k} />
        })}
        <g opacity={on(f, bills)} transform="translate(1720 820)"><Prop id="stock-certificate" x={0} y={0} size={170} f={f} /><Label x={0} y={110} text="T-bills" size={38} /></g>
        {/* # gold streams from the 4% to the gain */}
        {f >= c('s67:gain') && f < half + 10 && [...LIT4].slice(0, 8).map((i, k) => {
          const t = ((f - c('s67:gain')) / 24 + k / 8) % 1, p = arc({ x: 600 + (i % COLS) * 38, y: 300 + Math.floor(i / COLS) * 38 }, { x: 1720, y: 860 }, easeInOut(t), 140)
          return <ellipse key={k} cx={p.x} cy={p.y} rx={14} ry={6} fill={P.gold} />
        })}
        <g opacity={between(f, c('s67:gain'), half)} transform="translate(1720 900)"><CoinStack x={0} y={0} n={14} s={1.2} /><Label x={0} y={70} text="the whole gain" size={34} /></g>
      </g>
      <Vignette id="ev" />
    </g>
  )
}

// ---------------------------------------------------------------- s68a–s70: not a fair race — a lottery; own all the tickets
const TICKETS = 36, WIN = [7, 19, 30]
const Lottery: React.FC<PieceProps> = ({ f, c }) => {
  const race = c('s68a:race'), lot = c('s68a:lottery'), prizes = c('s68a:prizes'), lose = c('s68b:lose'), win = c('s68b:win'), pay = c('s68b:pay'), nobody = c('s68b:nobody'), hidden = c('s69:hidden'), own = c('s70:own'), losers = c('s70:losers')
  const A = between(f, c('s68a') - 4, lot - 2), shuffle = easeInOut(span(f, nobody, nobody + 30)), gulp = easeInOut(span(f, hidden, c('s69:work') + 10))
  const pos = (i: number) => {
    const grid = { x: 380 + (i % 9) * 145, y: 330 + Math.floor(i / 9) * 150 }
    const mixed = { x: 380 + (((i * 7) % TICKETS) % 9) * 145, y: 330 + Math.floor(((i * 7) % TICKETS) / 9) * 150 }
    const inBox = { x: 960 + (rnd(i) - 0.5) * 200, y: 820 + (rnd(i + 5) - 0.5) * 60 }
    const g = { x: lerp(grid.x, mixed.x, Math.sin(shuffle * Math.PI) * 0.6 + shuffle * 0.4), y: lerp(grid.y, mixed.y, Math.sin(shuffle * Math.PI) * 0.6 + shuffle * 0.4) }
    return { x: lerp(g.x, inBox.x, gulp), y: lerp(g.y, inBox.y, gulp), s: lerp(1, 0.3, gulp) }
  }
  return (
    <g>
      <Stage id="lt" tint="teal" frame={f} />
      {/* # a fair race? equal runners on a track — crossed out */}
      <g opacity={A}>
        {[0, 1, 2, 3].map((k) => <g key={k}><rect x={200} y={400 + k * 150} width={1520} height={140} fill={k % 2 ? P.teal1 : P.teal2} /><rect x={1600} y={400 + k * 150} width={14} height={140} fill={P.white} opacity={0.6} />
          <Mini look={['hero', 'buyer', 'owner', 'worker'][k]} x={320 + Math.min(1180, (f - c('s68a')) * 5.5 + k * 30)} y={530 + k * 150} scale={0.85} frame={f} seed={k + 40} /></g>)}
        <Label x={960} y={300} text="A FAIR RACE?" size={90} font="Bebas Neue" color={P.ink} o={on(f, c('s68a:fair'))} />
        <path d="M600 260 L1320 320" stroke={P.coral} strokeWidth={14} strokeLinecap="round" opacity={on(f, c('s68a:more'))} />
      </g>
      {/* # a lottery: tickets, a few enormous prizes */}
      <g opacity={on(f, lot - 2)}>
        <Label x={960} y={170} text={f < nobody ? 'A LOTTERY WITH A FEW ENORMOUS PRIZES' : f < hidden ? 'NOBODY KNOWS WHICH IN ADVANCE' : 'SO AN INDEX FUND OWNS THEM ALL'} size={64} font="Bebas Neue" color={P.ink} o={on(f, lot)} />
        {Array.from({ length: TICKETS }, (_, i) => {
          const w = WIN.includes(i), p = pos(i), appear = pop(f, lot + i * 0.6, 10)
          const lost = !w && f >= lose ? on(f, lose + (i % 9) * 1.2, 10) : 0, glow = w ? on(f, prizes) * (1 - shuffle * (f < hidden ? 1 : 0)) : 0
          const faceDown = shuffle > 0.05 && shuffle < 1 ? 1 : f >= nobody + 30 ? 1 : 0
          return appear > 0.01 && (
            <g key={i} transform={`translate(${p.x} ${p.y}) scale(${appear * p.s * (1 + glow * 0.25)})`} opacity={1 - lost * 0.55 * (1 - faceDown)}>
              <rect x={-58} y={-38} width={116} height={76} rx={10} fill={faceDown ? P.navy4 : w && glow > 0.3 ? P.gold : P.paper} stroke={faceDown ? 'none' : P.edge} strokeWidth={3} />
              {!faceDown && <><circle cx={-58} cy={0} r={12} fill={P.teal1} /><circle cx={58} cy={0} r={12} fill={P.teal1} /><rect x={-30} y={-6} width={60} height={12} rx={6} fill={w && glow > 0.3 ? P.goldD : '#C9B48A'} /></>}
              {faceDown > 0 && <text x={0} y={14} textAnchor="middle" fill={P.champL} style={{ font: '400 40px "Bebas Neue"' }}>?</text>}
            </g>
          )
        })}
        {/* # the winners pay for everything else: gold flows from the prizes to every ticket */}
        {f >= pay && f < nobody && WIN.flatMap((wi) => Array.from({ length: 6 }, (_, k) => {
          const t = ((f - pay) / 22 + k / 6) % 1, from = pos(wi), to = pos((wi * 5 + k * 7) % TICKETS), p = arc(from, to, easeInOut(t), 90)
          return <ellipse key={`${wi}-${k}`} cx={p.x} cy={p.y} rx={12} ry={5} fill={P.gold} />
        }))}
        {/* # the fund swallows every ticket */}
        <g opacity={on(f, hidden - 6)}><FundBox id="lt" x={960} y={820} s={lerp(0.6, 0.9, gulp)} open={on(f, hidden)} /></g>
        {f >= own && Array.from({ length: 10 }, (_, k) => { const t = ((f - own) / 20 + k / 10) % 1; return <ellipse key={k} cx={lerp(780, 1140, (k % 5) / 4)} cy={760 - Math.sin(t * Math.PI) * 120} rx={14} ry={6} fill={P.gold} opacity={on(f, losers - 10)} /> })}
        <Label x={960} y={1020} text="the winners pay for the losers" size={44} color={P.ink} o={on(f, c('s70:winners'))} />
      </g>
      <Vignette id="lt" />
    </g>
  )
}

// ---------------------------------------------------------------- s71–s73: winners already won; the risk is the price
const PricedIn: React.FC<PieceProps> = ({ f, c }) => {
  const conc = c('s71:concentration'), won = c('s71:won'), risk = c('s72:risk'), paying = c('s73:paying'), fut = c('s73:future'), priced = c('s73:priced'), knowing = c('s73:knowing')
  const morph = easeInOut(span(f, conc, won + 10))
  const xs = [700, 960, 1220]
  return (
    <g>
      <Stage id="pi" frame={f} />
      <Platform id="pi" cx={960} cy={860} rx={620} ry={100} />
      {/* # the three winning tickets turn into today's giants */}
      {xs.map((x, k) => (
        <g key={k}>
          <g opacity={1 - morph} transform={`translate(${x} ${lerp(500, 820, morph)}) scale(${1 - morph * 0.6})`}><rect x={-80} y={-52} width={160} height={104} rx={12} fill={P.gold} /><rect x={-40} y={-8} width={80} height={16} rx={8} fill={P.goldD} /></g>
          <Tower id="pi" i={k} x={x} y={850} h={(300 + k * 80) * morph} w={140} glow={on(f, won)} />
        </g>
      ))}
      <Label x={960} y={150} text="AFTER THE WINNERS HAVE ALREADY WON" size={60} font="Bebas Neue" color={P.ink} o={on(f, conc) * (1 - on(f, risk))} />
      <Label x={960} y={150} text="THE RISK IS NOT OWNING WINNERS…" size={64} font="Bebas Neue" color={P.ink} o={between(f, risk, paying)} />
      <Label x={960} y={150} text="…IT IS WHAT YOU PAY FOR THEM" size={72} font="Bebas Neue" color={P.coralInk} o={on(f, paying)} />
      {/* # years of future winning, stacked on top as price */}
      {f >= fut - 6 && Array.from({ length: 8 }, (_, k) => <g key={k} opacity={on(f, fut + k * 3)} transform={`translate(${960 + (k % 2 ? 40 : -40)} ${440 - k * 34})`}><rect x={-70} y={-16} width={140} height={30} rx={6} fill={P.paper} stroke={P.edge} strokeWidth={3} /><rect x={-70} y={-16} width={140} height={10} rx={4} fill={P.coral} /><text x={0} y={10} textAnchor="middle" fill={P.navy0} style={{ font: '400 22px "Bebas Neue"' }}>{2027 + k}</text></g>)}
      {f >= priced - 4 && <g transform={`translate(1340 340) scale(${pop(f, priced)})`}><PriceTag x={0} y={0} text="PRICED IN" s={1.1} /></g>}
      {/* # the investor pays, without knowing */}
      <g opacity={on(f, paying)}>
        <Pedestal x={260} y={900} r={110} /><Mini look="buyer" x={240} y={900} scale={1.3} frame={f} seed={17} mood={f > knowing ? 'sad' : 'neutral'} />
        <CoinStack x={340} y={890} n={Math.round(12 - 10 * span(f, paying, priced))} s={0.8} />
        {f >= knowing && <g opacity={on(f, knowing)}><Prop id="question" x={250} y={560} size={110} f={f} /></g>}
      </g>
      <Vignette id="pi" />
    </g>
  )
}

export const ACT4 = [
  makePiece('evidence', 'Broken? The evidence: 4% made the whole gain', {
    beats: ['s64', 's64:mean', 's64:index', 's64:broken', 's65', 's65:not', 's65:evidence', 's65:says', 's66', 's66:professor', 's66:hendrik', 's66:bessembinder', 's66:studied', 's66:every', 's66:stock', 's66:1926',
      's67', 's67:found', 's67:best', 's67:4', 's67:companies', 's67:explain', 's67:gain', 's67:american', 's67:time', 's68', 's68:half', 's68:stocks', 's68:worse', 's68:lifetime', 's68:holding', 's68:government', 's68:bills'],
    sfx: [['s64:broken', 'crack', 0.6], ['s65:evidence', 'chime', 0.5], ['s66:professor', 'softpop', 0.5], ['s66:every', 'pop', 0.3], ['s66:1926', 'tick', 0.5], ['s67:best', 'ding', 0.6], ['s67:gain', 'coin', 0.5], ['s68:half', 'swish', 0.5], ['s68:bills', 'softpop', 0.5]],
    Component: Evidence,
  }),
  makePiece('lottery', 'Not a fair race — a lottery; the fund owns every ticket', {
    beats: ['s68a', 's68a:words', 's68a:market', 's68a:fair', 's68a:race', 's68a:more', 's68a:lottery', 's68a:few', 's68a:enormous', 's68a:prizes', 's68b', 's68b:tickets', 's68b:lose', 's68b:handful', 's68b:win', 's68b:pay', 's68b:everything',
      's68b:nobody', 's68b:tell', 's68b:advance', 's68b:tickets#2', 's69', 's69:hidden', 's69:reason', 's69:index', 's69:work', 's70', 's70:nobody', 's70:advance', 's70:giants', 's70:own', 's70:all', 's70:winners', 's70:pay', 's70:losers'],
    sfx: [['s68a:fair', 'whoosh', 0.4], ['s68a:more', 'swish', 0.5], ['s68a:lottery', 'pop', 0.5], ['s68a:prizes', 'chime', 0.6], ['s68b:lose', 'thud', 0.4], ['s68b:win', 'ding', 0.6], ['s68b:pay', 'coin', 0.6], ['s68b:nobody', 'flutter', 0.6],
      ['s69:hidden', 'whoosh', 0.5], ['s69:work', 'softpop', 0.6], ['s70:own', 'coin', 0.5], ['s70:losers', 'coin', 0.4]],
    Component: Lottery,
  }),
  makePiece('priced-in', 'The winners already won; the risk is the price', {
    beats: ['s71', 's71:concentration', 's71:looks', 's71:after', 's71:winners', 's71:won', 's72', 's72:risk', 's72:not', 's72:owning', 's72:winners', 's73', 's73:risk', 's73:paying', 's73:years', 's73:future', 's73:winning', 's73:market', 's73:priced', 's73:without', 's73:knowing'],
    sfx: [['s71:concentration', 'riser', 0.5], ['s71:won', 'chime', 0.5], ['s72:risk', 'click', 0.5], ['s73:paying', 'coin', 0.5], ['s73:future', 'tick', 0.4], ['s73:priced', 'softpop', 0.6], ['s73:knowing', 'pop', 0.4]],
    Component: PricedIn,
  }),
]

void easeOut
