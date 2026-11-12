// ---------------------------------------------------------------- s91–s102: the whole story.
// A recap built as one row of five medallions that light up in turn: the till buying slices, the sellers' cash, the
// per-share bar rising, a worker's new slice, a balanced scale. Then Apple's ring with a $95B pile; the big pizza
// re-cut from ten slices into eight wider ones under its dashed ring. Two question cards flip up (shares really
// falling? a fair price?). The pizza spins slowly to the end.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Pile, Tick, fly, win } from '../aimoney/common'
import { PriceTag } from '../charts'
import { Figure, Note, Till } from '../gift/kit'
import { LoneSlice, Pizza, Ring, Share } from './kit'
import { OWNER_COLORS } from './share'

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const story = c('s91:story'), s91 = c('s91'), extra94 = c('s94:extra'), s95 = c('s95')
  const cash92 = c('s92:cash'), sell92 = c('s92:sell')
  const owners93 = c('s93:owners'), bigger93 = c('s93:bigger')
  const profit94 = c('s94:profit'), up94 = c('s94:up')
  const cancel = c('s95:cancel'), workers = c('s95:workers')
  const good96 = c('s96:good'), fair96 = c('s96:fair')
  const apple97 = c('s97:apple'), n95 = c('s97:95'), exactly = c('s97:exactly'), s98 = c('s98'), announces = c('s99:announces')
  const bigger98 = c('s98:bigger'), fewer98 = c('s98:fewer')
  const next = c('s99:next'), two99 = c('s99:two')
  const cutting = c('s100:cutting'), staff100 = c('s100:staff')
  const fair101 = c('s101:fair'), much = c('s101:much')
  const works = c('s102:works')
  const A = win(f, 0, apple97), B = win(f, apple97 - 4, s98), C = win(f, s98 - 4, announces), D = on(f, next - 4, 8)
  const xs = [260, 610, 960, 1310, 1660]
  const lit = [cash92, owners93, profit94, s95, good96]
  const recut = easeInOut(span(f, fewer98, fewer98 + 16))
  // # gap fillers (plan gate round 4): one relevant movement in each remaining pause
  const h1 = c('s93:cash')
  const g1 = c('s92:buys'), g2 = c('s93:stay'), g3 = c('s96:price'), g4 = c('s97'), g5 = c('s100:just')
  return (
    <g>
      <Stage id="bb-pay" frame={f} />
      <Headline f={f} lines={[[story, 'THE WHOLE STORY', P.ink, 110], [apple97, 'APPLE 2024: $95 BILLION', P.goldInk, 110], [bigger98, 'NOT A BIGGER PIZZA · FEWER SLICES', P.ink, 96], [two99, 'TWO QUESTIONS', P.goldInk, 116], [works, 'THAT’S HOW THE MONEY ACTUALLY WORKS', P.ink, 88]]} />
      {/* # A: five medallions light up in turn */}
      {A > 0 && <g opacity={A}>
        {xs.map((x, k) => {
          const t = on(f, lit[k], 8), cur = t * (k === 4 ? 1 : 1 - 0.4 * on(f, lit[k + 1], 8))
          return <g key={k} opacity={(0.35 + 0.65 * cur) * on(f, s91 + k * 2, 5)} transform={`translate(${x} 600) scale(${(0.8 + 0.25 * t) * pop(f, s91 + k * 2)})`}>
            <circle r={150} fill={P.card} stroke={t > 0.5 ? P.goldInk : 'none'} strokeWidth={8} />
            {k === 0 && <g><Till x={-30} y={80} s={0.45} open={1} bills={1} /><g transform={`translate(${lerp(90, 0, on(f, sell92, 12))} -60)`}><LoneSlice x={0} y={-40} r={110} tint={OWNER_COLORS[3]} /></g></g>}
            {k === 1 && <g><Figure x={-40} y={100} s={0.6} color={OWNER_COLORS[3]} /><Note x={40} y={-40} s={0.5} text="$" /><g opacity={on(f, bigger93, 6)}><LoneSlice x={60} y={-40} r={90} w={45} tint={P.gold} /></g></g>}
            {k === 2 && <g><Tick x={100} y={-110} o={on(f, extra94, 6)} r={34} /><rect x={-70} y={100 - lerp(80, 200, on(f, up94, 12))} width={140} height={lerp(80, 200, on(f, up94, 12))} rx={14} fill={P.gold} /><path d={`M0 ${-120 - 20 * on(f, up94, 8)} l-40 40 h80 Z`} fill={P.goldInk} /></g>}
            {k === 3 && <g><Figure x={-40} y={100} s={0.6} color="#2FA36B" /><g opacity={on(f, workers, 6)}><Share x={50} y={-30} s={0.35} /></g></g>}
            {k === 4 && <g><rect x={-6} y={-70} width={12} height={150} fill={P.ink2} /><rect x={-110} y={-80} width={220} height={12} rx={6} fill={P.navy3} /><Coin x={-80} y={-110} s={0.6} /><g opacity={on(f, fair96, 6)}><LoneSlice x={80} y={-150} r={70} /></g></g>}
          </g>
        })}
      </g>}
      {/* # B: Apple's ring and a $95B pile */}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(${lerp(-600, 0, easeInOut(span(f, apple97, apple97 + 14)))} 0)`}><Ring x={600} y={800} s={1} /></g>
        <Pile x={1400} y={940} n={Math.round(30 * easeInOut(span(f, n95, n95 + 20)))} s={1.4} />
        {Array.from({ length: 5 }, (_, k) => { const t = easeInOut(span(f, exactly + k * 3, exactly + k * 3 + 14)); return <g key={k} opacity={on(f, exactly + k * 3, 3) * (1 - span(f, exactly + k * 3 + 12, exactly + k * 3 + 15))}><Share x={lerp(1700, 640, t)} y={lerp(300, 640, t) - Math.sin(t * Math.PI) * 120} s={0.5} name="APPLE" /></g> })}
      </g>}
      {/* # C: the big pizza: ten slices close up into eight wider ones under a dashed ring */}
      {C > 0 && <g opacity={C}>
        <Pizza x={960} y={600} r={300} n={10} fx={(k) => {
          const gone = k === 3 || k === 7, idx = k - (k > 3 ? 1 : 0) - (k > 7 ? 1 : 0)
          return gone ? { o: 1 - recut, pull: 1.5 * recut } : { tint: OWNER_COLORS[k], a0: lerp(k * 36, idx * 45, recut), w: lerp(36, 45, recut) }
        }} />
        <circle cx={960} cy={600} r={335} fill="none" stroke={P.goldInk} strokeWidth={10} strokeDasharray="30 22" opacity={on(f, bigger98 + 6, 8)} />
      </g>}
      {/* # D: two question cards, then the pizza spins to the end */}
      {D > 0 && <g opacity={D}>
        <g opacity={on(f, announces, 6) * (1 - on(f, two99, 8))} transform={`translate(960 600) scale(${pop(f, announces) * 1.3})`}><rect x={-320} y={-130} width={640} height={260} rx={24} fill={P.navy2} /><text x={0} y={-40} textAnchor="middle" fill={P.gold} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 4 }}>NEWS</text><text x={0} y={70} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 110px "Bebas Neue"' }}>GIANT BUYBACK!</text></g>
        <g opacity={1 - on(f, works - 4, 10)}>
          {[[cutting, 'SHARES REALLY FALLING?', 560], [fair101, 'A FAIR PRICE?', 1360]].map(([at, q, x], k) => (
            <g key={k} opacity={on(f, two99 + k * 6, 6)} transform={`translate(${x} 600) scale(${pop(f, two99 + k * 6)}) rotate(${(1 - on(f, at as number, 12)) * (k ? 8 : -8)})`}>
              <rect x={-330} y={-280} width={660} height={560} rx={30} fill={P.card} stroke={on(f, at as number, 6) > 0.5 ? P.goldInk : P.ink2} strokeWidth={6} />
              <text x={0} y={-180} textAnchor="middle" fill={P.ink} style={{ font: '400 72px "Bebas Neue"' }}>{q as string}</text>
              {k === 0 && <g opacity={on(f, at as number, 6)}><Share x={-120} y={40} s={0.6} /><path d="M-20 40 L60 40" stroke={P.ink} strokeWidth={10} /><g opacity={on(f, staff100, 6)}><Figure x={150} y={140} s={0.6} color="#2FA36B" /><Share x={200} y={-20} s={0.3} /></g></g>}
              {k === 1 && <g opacity={on(f, at as number, 6)}><g transform="translate(-100 40)"><PriceTag x={0} y={0} text="$200?" s={1} /></g><g opacity={on(f, much, 6)} transform="translate(140 60)"><PriceTag x={0} y={0} text="$300?" s={1} color={P.coral} /></g></g>}
            </g>
          ))}
        </g>
        <g opacity={on(f, works - 4, 10)} transform={`translate(960 620) rotate(${(f - works) * 0.6})`}><Pizza x={0} y={0} r={300} n={8} fx={(k) => ({ tint: OWNER_COLORS[[0, 1, 2, 4, 5, 6, 8, 9][k]] })} /></g>
        <Tick x={1700} y={300} o={0} />
      </g>}
      {/* # gap fillers */}
      {A > 0 && <g opacity={A}>
        {(() => { const p = fly(f, g1, [230, 680], [180, 480], 14, 60); return <g opacity={p.o}><Note x={p.x} y={p.y} s={0.35} text="$" /></g> })()}
        <g opacity={on(f, g2, 6)}><Figure x={680} y={700} s={0.5} color={OWNER_COLORS[1]} /></g>
        <g opacity={on(f, g3, 6)}><circle cx={1660} cy={600} r={170} fill="none" stroke={P.goldInk} strokeWidth={8} /></g>
      </g>}
      <g opacity={on(f, g4, 6) * (1 - on(f, apple97, 6))}><rect x={300} y={960} width={1320} height={14} rx={7} fill={P.ink2} /></g>
      {D > 0 && <g opacity={D * on(f, g5, 6) * (1 - on(f, works - 4, 6))}><g transform={`translate(${560 + 60} ${640 - 40 * on(f, g5, 10)})`}><text x={0} y={0} textAnchor="middle" fill={P.goldInk} style={{ font: '400 100px "Bebas Neue"' }}>+</text></g></g>}
      {A > 0 && <g opacity={A * on(f, h1, 6)}><circle cx={650} cy={560} r={70 + 8 * Math.sin((f - h1) / 3)} fill="none" stroke={P.goldInk} strokeWidth={6} /></g>}
      <Vignette id="bb-pay" />
    </g>
  )
}

const BEATS = ['s93:cash', 's92:buys', 's93:stay', 's96:price', 's97', 's100:just', 's91', 's91:story', 's94:extra', 's95', 's92:cash', 's92:sell', 's93:owners', 's93:bigger', 's94:profit', 's94:up', 's95:cancel', 's95:workers', 's96:good', 's96:fair', 's97:apple', 's97:95', 's97:exactly', 's98', 's98:bigger', 's99:announces', 's98:fewer', 's99:two', 's100:cutting', 's100:staff', 's101:fair', 's101:much', 's102:works']
export const BB_PAYOFF = makePiece('bb-payoff', 'Buybacks long: a row of five medallions lights up in turn (the till buys a slice, a seller with cash and a bigger slice, the per-share bar rising, a worker with a new share, a balance with a coin and a slice); Apple ring with a $95B pile; the big pizza closing from ten slices into eight wider ones under a dashed ring; two question cards (shares really falling? a fair price?); the pizza spins to the end', {
  mood: 'light', Component: Payoff, beats: BEATS,
  sfx: [['s92:cash', 'pop', 0.3], ['s94:up', 'chime', 0.3], ['s97:95', 'coin', 0.3], ['s98:fewer', 'swish', 0.3], ['s99:two', 'pop', 0.3]] })
