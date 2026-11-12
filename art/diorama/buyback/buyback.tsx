// ---------------------------------------------------------------- s18–s33: the buyback.
// The pizza and its ten owners. Two owners light up and a cash bubble pops over them; notes fly from the till to them
// while their two slices fly to the till; the two slices tear in half and drop away. The eight slices left WIDEN to
// close the gap (same pizza, fewer pieces). $100 lands again and now $12.50 coins sit on the slices against a crossed
// $10. A dashed ring shows the pizza is the same size. Then the real world: Apple's ring, a crowd of tiny holders, the
// stock-market board where a few holders sell, a shredder eating the bought shares, and a profit-per-share bar that
// climbs while total profit stays flat, watched by a row of investors.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Tick, fly, win } from '../aimoney/common'
import { Figure, Note, Till } from '../gift/kit'
import { Board, LoneSlice, Pizza, Ring, Share, Shredder } from './kit'
import { OWNER_COLORS, ownerAt } from './share'

const Buyback: React.FC<PieceProps> = ({ f, c }) => {
  const works = c('s18:works')
  const two19 = c('s19:two'), sell19 = c('s19:sell'), cash19 = c('s19:cash')
  const till20 = c('s20:till'), pays = c('s20:pays'), slices20 = c('s20:slices')
  const tears = c('s21:tears'), gone = c('s21:gone')
  const same22 = c('s22:same'), n8 = c('s22:8')
  const n100 = c('s23:100'), nothing23 = c('s23:nothing')
  const slice24 = c('s24:slice'), n1250 = c('s24:12'), instead = c('s24:instead')
  const bigger25 = c('s25:bigger'), fewer25 = c('s25:fewer')
  const buyback26 = c('s26:buyback'), cash26 = c('s26:cash'), fewer26 = c('s26:fewer')
  const apple27 = c('s27:apple'), millions = c('s27:millions'), funds = c('s27:funds')
  const doors = c('s28:doors'), market = c('s28:market'), whoever = c('s28:whoever')
  const forced = c('s29:forced'), want29 = c('s29:want'), rest = c('s29:rest'), keep29 = c('s29:keep'), s30 = c('s30')
  const cancelled = c('s30:cancelled'), count30 = c('s30:count'), torn = c('s30:just')
  const profit31 = c('s31:profit'), up31 = c('s31:up'), same31 = c('s31:same')
  const watched = c('s32:watched'), investing = c('s32:investing')
  const push = c('s33:push'), extra = c('s33:extra')
  const A = win(f, 0, buyback26 + 4), B = win(f, buyback26, s30), C = win(f, s30 - 4, profit31), D = on(f, profit31 - 4, 8)
  const px = 960, py = 540
  const sellers = [3, 7]
  const toTill = easeInOut(span(f, slices20, slices20 + 16))
  const torn21 = easeInOut(span(f, tears, tears + 18))
  const widen = easeInOut(span(f, n8 - 4, n8 + 14))
  const coins = on(f, n1250, 8)
  // # gap fillers (plan gate round 4): one relevant movement in each remaining pause
  const h1 = c('s27:who'), h2 = c('s32:per'), h3 = c('s27:shares')
  const g1 = c('s19:slice'), g2 = c('s20:shop'), g3 = c('s22:same'), g4 = c('s23:changed'), g5 = c('s25:pizza'), g6 = c('s26:left'), g7 = c('s27:hold'), g8 = c('s28:buys'), g9 = c('s29:owners'), g10 = c('s31:itself'), g11 = c('s32:number')
  return (
    <g>
      <Stage id="bb-buy" frame={f} />
      <Headline f={f} lines={[[two19, 'TWO OWNERS WANT CASH', P.ink, 100], [till20, 'THE SHOP PAYS THEM', P.ink, 100], [tears, 'TWO SLICES TORN UP', P.coralInk, 104], [n8, '8 SLICES NOW', P.ink, 110], [n100, 'STILL $100 PROFIT', P.ink, 104],
        [n1250, '$12.50 PER SLICE', P.goldInk, 116], [bigger25, 'SAME PIZZA · FEWER PIECES', P.ink, 100], [buyback26, 'THAT IS A BUYBACK', P.goldInk, 116], [apple27, 'MILLIONS OF HOLDERS', P.ink, 100], [market, 'BOUGHT ON THE STOCK MARKET', P.ink, 96],
        [forced, 'NOBODY IS FORCED TO SELL', P.ink, 100], [cancelled, 'CANCELLED · NO LONGER COUNTED', P.ink, 96], [profit31, 'PROFIT PER SHARE ↑', P.goldInk, 112], [watched, 'ONE OF THE MOST WATCHED NUMBERS', P.ink, 96], [push, 'UP · WITHOUT SELLING MORE', P.goldInk, 104]]} />
      {/* # A: the shop's buyback */}
      {A > 0 && <g opacity={A}>
        {Array.from({ length: 10 }, (_, k) => {
          const p = ownerAt(k), sel = sellers.includes(k), leave = sel ? easeInOut(span(f, gone, gone + 20)) : 0
          return <g key={k} opacity={on(f, works + k, 5) * (1 - leave)}><Figure x={p.x + (sel ? (k === 3 ? -300 : 300) * leave : 0)} y={p.y} s={0.85} color={OWNER_COLORS[k]} hi={sel ? on(f, two19, 6) : 0} /></g>
        })}
        {/* # cash bubbles over the two sellers */}
        {sellers.map((k) => { const p = ownerAt(k); return <g key={k} opacity={on(f, cash19, 6) * (1 - on(f, pays + 10, 6))} transform={`translate(${p.x} ${p.y - 230}) scale(${pop(f, cash19)})`}><circle r={60} fill={P.card} /><Note x={0} y={0} s={0.42} text="$" /></g> })}
        <Till x={1640} y={520} s={0.9} open={on(f, till20, 8)} bills={1 - on(f, pays, 10) * 0.5} />
        {/* # notes fly from the till to each seller */}
        {sellers.map((k, i) => { const p = ownerAt(k), fl = fly(f, pays + i * 5, [1640, 520], [p.x + 40, p.y - 120], 18, 200); return <g key={k} opacity={fl.t > 0 ? 1 : 0}><Note x={fl.x} y={fl.y} s={0.5} text="$" /></g> })}
        {/* # the pizza: 10 slices; the two sellers' slices leave; the 8 left widen */}
        {/* # the 8 that stay slide round and widen from 36° to 45° each, closing the two gaps */}
        <Pizza x={px} y={py} r={250} n={10} fx={(k) => {
          if (sellers.includes(k)) return { o: 0 }
          const idx = k - sellers.filter((s) => s < k).length
          return { tint: OWNER_COLORS[k], a0: lerp(k * 36, idx * 45, widen), w: lerp(36, 45, widen), hi: on(f, slice24, 6) * (1 - on(f, bigger25, 6)) * 0.8 }
        }} />
        {/* # the two leaving slices: fly to the till, then tear */}
        {sellers.map((k, i) => {
          const a = (k * 36 + 18 - 90) * Math.PI / 180, sx = px + Math.cos(a) * 140, sy = py + Math.sin(a) * 140
          const x = lerp(sx, 1500 + i * 180, toTill), y = lerp(sy, 300, toTill) - Math.sin(toTill * Math.PI) * 120
          return <g key={k} opacity={1 - on(f, gone, 10)}><LoneSlice x={x} y={y} r={250} w={36} tear={torn21} rot={lerp(k * 36 + 18, 0, toTill)} tint={OWNER_COLORS[k]} /></g>
        })}
        {/* # nothing changed: the shop sign with a tick */}
        <g opacity={on(f, nothing23, 6) * (1 - on(f, n1250, 6))} transform={`translate(1600 200) scale(${pop(f, nothing23)})`}><rect x={-170} y={-60} width={340} height={110} rx={18} fill={P.coral} /><text x={0} y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 70px "Bebas Neue"', letterSpacing: 6 }}>PIZZA</text><Tick x={190} y={-50} o={1} r={40} /></g>
        {/* # 100 a year, then 12.50 per slice against a crossed 10 */}
        <g opacity={on(f, n100, 6) * (1 - on(f, n1250, 6))} transform={`translate(1640 720) scale(${pop(f, n100)})`}><Coin x={0} y={0} s={2.2} text="$100" /></g>
        {Array.from({ length: 8 }, (_, i) => { const a = (i * 45 + 22.5 - 90) * Math.PI / 180; return <g key={i} opacity={coins * (1 - on(f, bigger25, 8))}><Coin x={px + Math.cos(a) * 165} y={py + Math.sin(a) * 165} s={0.95 * pop(f, n1250 + i)} text="12.5" /></g> })}
        <g opacity={on(f, instead, 6) * (1 - on(f, bigger25, 8))} transform="translate(1640 720)"><Coin x={0} y={0} s={1.6} text="$10" /><path d="M-70 -70 L70 70" stroke={P.coral} strokeWidth={16} strokeLinecap="round" /></g>
        {/* # same size: a dashed ring the size of the old pizza */}
        <circle cx={px} cy={py} r={278} fill="none" stroke={P.goldInk} strokeWidth={10} strokeDasharray="30 22" opacity={on(f, bigger25, 8)} transform={`rotate(${f * 0.5} ${px} ${py})`} />
        <g opacity={on(f, fewer25, 6)}><text x={px + 470} y={py + 20} fill={P.ink} style={{ font: '400 90px "Bebas Neue"' }}>10 → 8</text></g>
      </g>}
      {/* # B: the real world: Apple, a crowd of holders, the market board */}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, apple27 - 6, 6)} transform={`translate(0 ${lerp(300, 0, easeInOut(span(f, apple27 - 6, apple27 + 10)))})`}><Ring x={460} y={760} s={0.85} /></g>
        <g opacity={on(f, buyback26, 6) * (1 - on(f, apple27, 6))}><Till x={1400} y={760} s={1.2} open={on(f, cash26, 10)} bills={1} /></g>
        {Array.from({ length: 5 }, (_, k) => { const p = fly(f, fewer26 + k * 3, [1400, 640], [960, 420], 14, 120); return <g key={k} opacity={p.o * (1 - on(f, apple27, 6))}><Share x={p.x} y={p.y} s={0.6} /></g> })}
        {Array.from({ length: 48 }, (_, k) => { const t0 = millions + k * 0.3, x = 1000 + (k % 12) * 70, y = 700 + Math.floor(k / 12) * 90, sell = k % 7 === 2; const walk = sell ? easeInOut(span(f, want29, want29 + 18)) : 0
          return <g key={k} opacity={on(f, t0, 4) * (1 - on(f, market, 8) * 0)}><Figure x={lerp(x, 1180, walk * 0)} y={y - walk * 90} s={0.32} color={sell && f > whoever ? P.gold : k % 3 ? P.navy4 : '#5C6F8E'} /></g> })}
        <g opacity={on(f, funds, 6)} transform={`translate(1700 560) scale(${pop(f, funds)})`}><rect x={-90} y={-60} width={180} height={120} rx={14} fill={P.navy2} /><text x={0} y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>FUNDS</text></g>
        {/* # the closed door with a cross, then the market board over the crowd */}
        <g opacity={on(f, doors, 6) * (1 - on(f, market, 6))} transform={`translate(1400 420) scale(${pop(f, doors)})`}><rect x={-80} y={-130} width={160} height={260} rx={12} fill="#8E5E36" /><circle cx={50} cy={10} r={10} fill={P.gold} /><path d="M-90 -90 L90 90 M90 -90 L-90 90" stroke={P.coral} strokeWidth={18} strokeLinecap="round" /></g>
        <g opacity={on(f, market, 6)} transform={`translate(1360 380) scale(${pop(f, market) * 0.62})`}><Board x={0} y={0} f={f} hi={on(f, whoever, 6)} /></g>
        {/* # the holders who keep: share papers held up over the crowd */}
        {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, keep29 + k, 5)}><Share x={1040 + k * 150} y={lerp(700, 620, on(f, keep29 + k, 10))} s={0.32} /></g>)}
        {/* # sellers' shares fly from the crowd to the ring */}
        {Array.from({ length: 6 }, (_, k) => { const p = fly(f, rest + k * 3, [1100 + k * 100, 650], [460, 600], 18, 200); return <g key={k} opacity={p.o}><Share x={p.x} y={p.y} s={0.5} name="APPLE" /></g> })}
      </g>}
      {/* # C: the bought shares go through a shredder; a torn slice echoes the shop */}
      {C > 0 && <g opacity={C}>
        <Shredder x={960} y={700} s={1.4} strips={on(f, count30, 16)} />
        {Array.from({ length: 4 }, (_, k) => { const t = easeInOut(span(f, cancelled + k * 6, cancelled + k * 6 + 14)); return <g key={k} opacity={1 - span(f, cancelled + k * 6 + 12, cancelled + k * 6 + 15)}><Share x={lerp(400 + k * 80, 960, t)} y={lerp(380, 600, t)} s={lerp(0.8, 0.5, t)} name="APPLE" r={lerp(-20 + k * 10, 0, t)} /></g> })}
        <g opacity={on(f, torn, 6)}><LoneSlice x={1560} y={460} r={200} tear={easeInOut(span(f, torn + 4, torn + 20))} tint={OWNER_COLORS[3]} /></g>
      </g>}
      {/* # D: profit per share climbs while total profit stays flat; investors watch */}
      {D > 0 && <g opacity={D}>
        {[[profit31, 'TOTAL PROFIT', P.mint, 620, 0], [up31, 'PROFIT PER SHARE', P.gold, 1300, 1]].map(([at, lab, col, x, grows], k) => {
          const base = 300, h = base * on(f, at as number, 12) + (grows ? 170 * easeInOut(span(f, up31 + 6, up31 + 24)) + 90 * easeInOut(span(f, push, push + 16)) : 0)
          return <g key={k}>
            <rect x={(x as number) - 140} y={880 - h} width={280} height={h} rx={18} fill={col as string} />
            <text x={x as number} y={950} textAnchor="middle" fill={P.ink} style={{ font: '400 58px "Bebas Neue"', letterSpacing: 2 }}>{lab as string}</text>
            {!grows && <text x={x as number} y={850 - h} textAnchor="middle" fill={P.ink} opacity={on(f, same31, 6)} style={{ font: '400 70px "Bebas Neue"' }}>SAME</text>}
            {grows ? <path d={`M${x} ${820 - h} l-50 50 h100 Z`} fill={P.goldInk} opacity={on(f, up31, 6)} /> : null}
          </g>
        })}
        {/* # investors watching (eyes on the bar) */}
        {Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, watched + k * 2, 6) * (1 - on(f, push, 8))}><Figure x={1560 + (k % 3) * 110} y={500 + Math.floor(k / 3) * 150} s={0.6} color={P.navy4} /></g>)}
        <g opacity={on(f, investing, 6) * (1 - on(f, push, 8))}><circle cx={1300} cy={330} r={70} fill="none" stroke={P.ink} strokeWidth={14} /><path d="M1350 380 L1420 450" stroke={P.ink} strokeWidth={18} strokeLinecap="round" /></g>
        {/* # a hand pushes the bar up; a shopping bag with a cross: nothing extra sold */}
        <g opacity={on(f, push, 6) * (1 - on(f, extra + 30, 8))}><path d={`M1300 ${980 - 0} L1300 ${960}`} />{[0, 1, 2].map((k) => <path key={k} d={`M1520 ${lerp(860, 640, on(f, push + k * 4, 12)) - k * 70} l40 -40 l40 40`} stroke={P.goldInk} strokeWidth={14} fill="none" strokeLinecap="round" opacity={on(f, push + k * 4, 6)} />)}</g>
        <g opacity={on(f, extra, 6)} transform={`translate(1640 360) scale(${pop(f, extra)})`}><rect x={-80} y={-60} width={160} height={150} rx={16} fill={P.coral} /><path d="M-40 -60 Q0 -130 40 -60" stroke={P.coralD} strokeWidth={12} fill="none" /><path d="M-100 -90 L100 110 M100 -90 L-100 110" stroke={P.ink} strokeWidth={14} strokeLinecap="round" /></g>
      </g>}
      {/* # gap fillers */}
      {A > 0 && <g opacity={A}>
        {[3, 7].map((k) => { const a = (k * 36 + 18 - 90) * Math.PI / 180, t = on(f, g1, 8) * (1 - on(f, slices20, 4)); return <circle key={k} cx={px + Math.cos(a) * 200} cy={py + Math.sin(a) * 200} r={70 * t} fill="none" stroke={P.goldInk} strokeWidth={8} opacity={t} /> })}
        <g opacity={on(f, g2, 6) * (1 - on(f, pays, 6))}><path d={`M1640 380 L1640 ${lerp(380, 300, on(f, g2, 10))}`} stroke={P.goldInk} strokeWidth={10} /><circle cx={1640} cy={lerp(380, 290, on(f, g2, 10))} r={26} fill={P.goldInk} /></g>
        <circle cx={px} cy={py} r={262} fill="none" stroke="#FFFFFF" strokeWidth={10} opacity={on(f, g3, 6) * (1 - on(f, n100, 8))} />
        <g opacity={on(f, g4, 6) * (1 - on(f, n1250, 6))}><Tick x={1790} y={150} o={1} r={44} /></g>
        {Array.from({ length: 8 }, (_, i) => { const a = (i * 45 + 22.5 - 90) * Math.PI / 180, t = easeInOut(span(f, g5 + i, g5 + i + 14)); return <g key={i} opacity={on(f, g5, 4) * (1 - t)}><Coin x={px + Math.cos(a) * 165} y={py + Math.sin(a) * 165 - t * 200} s={0.95} text="12.5" /></g> })}
      </g>}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, g6, 6) * (1 - on(f, g7 - 30, 6))}>{[0, 1, 2].map((k) => <Share key={k} x={960 + (k - 1) * 40} y={460 - k * 24} s={0.55} r={-6 + k * 6} />)}</g>
        {Array.from({ length: 12 }, (_, k) => <g key={k} opacity={on(f, g7 + k * 0.6, 5) * (1 - on(f, market, 6))}><Share x={1000 + (k % 12) * 70} y={640} s={0.16} /></g>)}
        {Array.from({ length: 4 }, (_, k) => { const p = fly(f, g8 + k * 4, [460, 600], [1360, 380], 16, 140); return <g key={k} opacity={p.o}><Note x={p.x} y={p.y} s={0.45} text="$" /></g> })}
        <g opacity={on(f, g9, 6) * (1 - on(f, rest, 6))}>{[2, 9, 16, 23, 30, 37, 44].map((k) => <circle key={k} cx={1000 + (k % 12) * 70} cy={700 + Math.floor(k / 12) * 90 - 60} r={22} fill="none" stroke={P.goldInk} strokeWidth={6} />)}</g>
      </g>}
      {D > 0 && <g opacity={D}>
        <rect x={470} y={560} width={300} height={330} rx={20} fill="none" stroke={P.mintInk} strokeWidth={8} opacity={on(f, g10, 6) * (1 - on(f, watched, 6))} />
        <rect x={1150} y={300} width={300} height={590} rx={20} fill="none" stroke={P.goldInk} strokeWidth={8} opacity={on(f, g11, 6) * (1 - on(f, push, 6))} />
      </g>}
      {B > 0 && <g opacity={B * on(f, h1, 6) * (1 - on(f, doors, 6))}><rect x={960} y={640} width={880} height={400} rx={30} fill="none" stroke={P.goldInk} strokeWidth={8} /></g>}
      {B > 0 && <g opacity={B * on(f, h3, 6) * (1 - on(f, doors, 6))}>{[0, 1, 2].map((k) => <Share key={k} x={1250 + k * 200} y={lerp(560, 520, on(f, h3 + k * 2, 10))} s={0.3} />)}</g>}
      {D > 0 && <g opacity={D * on(f, h2, 6) * (1 - on(f, push, 6))}><path d={`M${lerp(1700, 1500, on(f, h2, 10))} 500 L1470 560`} stroke={P.goldInk} strokeWidth={14} strokeLinecap="round" /><circle cx={1470} cy={560} r={16} fill={P.goldInk} /></g>}
      <Vignette id="bb-buy" />
    </g>
  )
}

const BEATS = ['s27:shares', 's27:who', 's32:per', 's19:slice', 's20:shop', 's22:same', 's23:changed', 's25:pizza', 's26:left', 's27:hold', 's28:buys', 's29:owners', 's31:itself', 's32:number', 's18:works', 's19:two', 's19:cash', 's20:till', 's20:pays', 's20:slices', 's21:tears', 's21:gone', 's22:8', 's23:100', 's23:nothing', 's24:slice', 's24:12', 's24:instead', 's25:bigger', 's25:fewer',
  's26:buyback', 's26:cash', 's26:fewer', 's27:apple', 's27:millions', 's27:funds', 's28:doors', 's28:market', 's28:whoever', 's29:forced', 's29:rest', 's29:keep', 's30', 's30:cancelled', 's30:count', 's30:just',
  's31:profit', 's31:up', 's31:same', 's32:watched', 's32:investing', 's33:push', 's33:extra']
export const BB_BUYBACK = makePiece('bb-buyback', 'Buybacks long: two of ten owners light up; notes fly from the till to them while their slices fly off and tear in two; the eight slices left widen to close the gap; 100 profit becomes 12.50 coins on each slice against a crossed 10; a dashed ring shows the same size; then Apple ring, a crowd of holders and funds, a crossed door, the stock-market board, shares flying to the ring, a shredder, and a profit-per-share bar climbing beside a flat total-profit bar while investors watch', {
  mood: 'light', Component: Buyback, beats: BEATS,
  sfx: [['s20:pays', 'coin', 0.35], ['s21:tears', 'crack', 0.35], ['s22:8', 'swish', 0.3], ['s24:12', 'ding', 0.3], ['s28:market', 'pop', 0.3], ['s30:cancelled', 'click', 0.3], ['s31:up', 'chime', 0.3]] })
