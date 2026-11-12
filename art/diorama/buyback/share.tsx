// ---------------------------------------------------------------- s8–s17: what a share is.
// A share paper shrinks into a pizza. A pizza shop's awning drops in and ten little owners pop up in an arc. The pizza
// is cut into ten, and each slice flies out to its owner and back, each tinted in its owner's colour. One slice lifts
// out (one tenth). A pile of ten coins lands (100 profit), then one coin flies onto every slice. A till slides in with
// spare cash; an oven and a new sign offer themselves; then an arrow from the till curls toward a slice.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, fly, win } from '../aimoney/common'
import { Figure, Till } from '../gift/kit'
import { Pizza, Share } from './kit'
import { Building } from '../kit'

export const OWNER_COLORS = ['#E05A4C', '#3A6EA8', '#2FA36B', '#E9A23B', '#8A5CC2', '#1F9DB0', '#D4609A', '#6B8E23', '#B5651D', '#4F6D8F']
// # the ten owners stand in an arc around a pizza at (cx, cy)
export const ownerAt = (k: number, n = 10, cx = 960, cy = 640, rx = 620, ry = 330) => { const a = Math.PI * (0.06 + 0.88 * (k + 0.5) / n); return { x: cx - rx * Math.cos(a), y: cy + 120 - ry * Math.sin(a) * 0.2 + (k % 2) * 30 + 260 } }
export const Oven: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-160 0 L-160 -150 Q0 -300 160 -150 L160 0 Z" fill="#B5651D" /><path d="M-90 0 L-90 -90 Q0 -170 90 -90 L90 0 Z" fill="#2A1A10" />
    <path d="M-60 0 Q-40 -60 0 -40 Q30 -80 60 0 Z" fill="#F0A23B" />
  </g>
)
export const Sign: React.FC<{ x: number; y: number; s?: number; o?: number; text?: string }> = ({ x, y, s = 1, o = 1, text = 'PIZZA' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-8} y={0} width={16} height={180} fill="#5C4A3A" />
    <rect x={-170} y={-80} width={340} height={110} rx={18} fill={P.coral} /><text x={0} y={-2} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 74px "Bebas Neue"', letterSpacing: 6 }}>{text}</text>
  </g>
)
export const Awning: React.FC<{ y: number; o?: number }> = ({ y, o = 1 }) => (
  <g opacity={o}>{Array.from({ length: 12 }, (_, k) => <path key={k} d={`M${k * 160} ${y - 80} L${k * 160 + 160} ${y - 80} L${k * 160 + 160} ${y} Q${k * 160 + 80} ${y + 24} ${k * 160} ${y} Z`} fill={k % 2 ? '#FFFFFF' : P.coral} />)}</g>
)

const ShareScene: React.FC<PieceProps> = ({ f, c }) => {
  const share8 = c('s8:share'), piece = c('s8:piece'), company8 = c('s8:company')
  const pizza9 = c('s9:pizza')
  const shop10 = c('s10:shop'), owners10 = c('s10:owners')
  const cut = c('s11:cut'), slices11 = c('s11:slices'), each11 = c('s11:each'), holds = c('s11:holds')
  const one12 = c('s12:one'), tenth = c('s12:tenth'), everything = c('s12:everything'), earns = c('s12:earns')
  const year13 = c('s13:year'), profit13 = c('s13:profit'), n100 = c('s13:100')
  const slices14 = c('s14:slices'), each14 = c('s14:each'), n10 = c('s14:10'), profit14 = c('s14:profit'), now15 = c('s15')
  const spare = c('s15:spare'), till = c('s15:till')
  const oven = c('s16:oven'), sign = c('s16:sign')
  const stranger = c('s17:stranger'), buy17 = c('s17:buy'), slices17 = c('s17:slices')
  const A = win(f, 0, pizza9 + 4)
  const pizzaIn = easeInOut(span(f, piece, pizza9 + 8))
  // # the pizza slides left once the till comes in
  const px = lerp(960, 760, easeInOut(span(f, now15, now15 + 14))), py = 560
  const cutT = on(f, cut, 10)
  const out = easeInOut(span(f, holds - 4, holds + 10)) * (1 - easeInOut(span(f, holds + 26, holds + 40)))
  const lift = on(f, one12, 8) * (1 - on(f, year13, 8))
  // # gap fillers (plan gate round 4): one relevant movement in each remaining pause
  const g1 = c('s8:company'), g2 = c('s12:shop')
  return (
    <g>
      <Stage id="bb-share" frame={f} />
      <Headline f={f} lines={[[share8, 'A SHARE = A PIECE OF A COMPANY', P.ink, 96], [shop10, 'A PIZZA SHOP · 10 OWNERS', P.ink, 100], [one12, '1 SLICE = 1/10 OF THE SHOP', P.goldInk, 100],
        [profit13, '$100 PROFIT A YEAR', P.goldInk, 110], [n10, '$10 PER SLICE', P.goldInk, 110], [spare, 'SPARE CASH IN THE TILL', P.ink, 100], [stranger, 'OR… BUY BACK SLICES?', P.goldInk, 104]]} />
      <Awning y={on(f, shop10, 8) * 70 - 10} o={on(f, shop10, 6)} />
      {/* # A: a share paper that becomes the pizza */}
      {A > 0 && <g opacity={A * (1 - pizzaIn)}><g transform={`translate(960 600) scale(${pop(f, share8) * 1.6 * (1 - 0.6 * pizzaIn)})`}><Share x={0} y={0} name="SHARE" /></g></g>}
      {/* # the ten owners in an arc */}
      {Array.from({ length: 10 }, (_, k) => { const p = ownerAt(k); const t0 = owners10 + k * 1.2; return <g key={k} opacity={on(f, t0, 5) * (1 - on(f, spare - 4, 10) * 0.65)}><g transform={`translate(${p.x} ${p.y}) scale(${pop(f, t0)})`}><Figure x={0} y={0} s={0.85} color={OWNER_COLORS[k]} hi={k === 0 ? on(f, one12, 6) * (1 - on(f, year13, 6)) : 0} /></g></g> })}
      {/* # the pizza: whole, then cut into ten; slices fly out to their owners and back */}
      <g opacity={on(f, piece, 8)}>
        <g transform={`translate(${px} ${py}) scale(${lerp(0.4, 1, pizzaIn) * (1 + 0.04 * Math.sin(f / 20))}) translate(${-px} ${-py})`}>
          <Pizza x={px} y={py} r={230} n={cutT > 0.5 ? 10 : 1} width={cutT > 0.5 ? 36 : 360} fx={(k) => {
            const o = ownerAt(k), dx = (o.x - px) * 0.55 * out, dy = (o.y - 300 - py) * 0.55 * out
            return { dx: dx + (k === 0 ? 0 : 0), dy: dy - (k === 0 ? 120 * lift : 0), pull: k === 0 ? lift : 0.12 * cutT * on(f, slices11, 8) * (1 - on(f, each11, 10)), tint: on(f, each11, 8) > 0.5 ? OWNER_COLORS[k] : undefined, hi: k === 0 ? lift : 0 }
          }} />
        </g>
      </g>
      {/* # one tenth: a coin on the lifted slice, everything it earns */}
      <g opacity={on(f, earns, 6) * (1 - on(f, year13, 6))}><Coin x={px + 40} y={py - 330} s={1.1} text="1/10" /></g>
      <g opacity={on(f, tenth, 6) * (1 - on(f, everything, 6))}><text x={px + 330} y={py - 180} fill={P.goldInk} style={{ font: '400 110px "Bebas Neue"' }}>1/10</text></g>
      {/* # 100 profit: ten coins drop in a pile, then fly one onto each slice */}
      {Array.from({ length: 10 }, (_, k) => {
        const drop = easeInOut(span(f, n100 + k * 1.5, n100 + k * 1.5 + 10)), pile = { x: 1500 + (k % 3) * 70 - 70, y: 860 - Math.floor(k / 3) * 30 }
        const mid = (k * 36 + 18 - 90) * Math.PI / 180, dest: [number, number] = [px + Math.cos(mid) * 150, py + Math.sin(mid) * 150]
        const fl = fly(f, each14 + k * 2, [pile.x, pile.y], dest, 16, 160)
        const atDest = span(f, each14 + k * 2 + 16, each14 + k * 2 + 17)
        const o = on(f, n100 + k * 1.5, 4) * (1 - on(f, spare, 8))
        const x = fl.t > 0 ? fl.x : pile.x, y = fl.t > 0 ? fl.y : lerp(-80, pile.y, drop)
        return o > 0 ? <g key={k} opacity={o}><Coin x={x} y={y} s={atDest > 0 ? 0.8 : 1} text={atDest > 0 ? '$10' : '$'} /></g> : null
      })}
      <g opacity={on(f, year13, 6) * (1 - on(f, slices14, 8))}><text x={1500} y={700} textAnchor="middle" fill={P.goldInk} style={{ font: '400 100px "Bebas Neue"' }}>$100</text></g>
      {/* # every slice earns: a gold ring pulses round the pizza */}
      <circle cx={px} cy={py} r={300 + 20 * Math.sin((f - profit14) / 4)} fill="none" stroke={P.goldInk} strokeWidth={12} opacity={on(f, profit14, 6) * (1 - on(f, now15, 8))} />
      {/* # the till slides in with spare cash */}
      <g opacity={on(f, now15, 8)} transform={`translate(${lerp(500, 0, easeInOut(span(f, now15, now15 + 14)))} 0)`}><Till x={1450} y={860} s={1.3} open={on(f, till, 10)} bills={on(f, till, 10)} /></g>
      {/* # an oven and a sign offer themselves, then fade for the stranger idea */}
      <g opacity={on(f, oven, 6) * (1 - on(f, stranger, 8))} transform={`translate(1220 520) scale(${pop(f, oven)})`}><Oven x={0} y={0} s={0.9} /></g>
      <g opacity={on(f, sign, 6) * (1 - on(f, stranger, 8))} transform={`translate(1700 420) scale(${pop(f, sign)})`}><Sign x={0} y={0} s={0.8} /></g>
      {/* # an arrow curls from the till to a slice */}
      <g opacity={on(f, buy17, 8)}>
        <path d={`M1400 640 Q1150 ${lerp(640, 300, on(f, buy17, 12))} ${px + 180} ${py - 120}`} fill="none" stroke={P.goldInk} strokeWidth={16} strokeLinecap="round" strokeDasharray="1400" strokeDashoffset={1400 * (1 - on(f, buy17, 14))} />
        <circle cx={px + 180} cy={py - 120} r={30 * on(f, slices17, 8)} fill={P.goldInk} />
      </g>
      {/* # gap fillers */}
      <g opacity={A * on(f, g1, 6) * (1 - pizzaIn)} transform={`translate(1450 ${lerp(900, 760, on(f, g1, 12))})`}><Building x={0} y={0} s={1.4} seed={4} /></g>
      <g opacity={on(f, g2, 6) * (1 - on(f, year13, 8))} transform={`translate(1580 330) scale(${pop(f, g2) * 0.7})`}><Sign x={0} y={0} /></g>
      <Vignette id="bb-share" />
    </g>
  )
}

const BEATS = ['s8:company', 's12:shop', 's8:share', 's8:piece', 's9:pizza', 's10:shop', 's10:owners', 's11:cut', 's11:slices', 's11:each', 's11:holds', 's12:one', 's12:tenth', 's12:earns', 's13:year', 's13:100', 's14:slices', 's14:each', 's14:10', 's14:profit', 's15',
  's15:spare', 's15:till', 's16:oven', 's16:sign', 's17:stranger', 's17:buy', 's17:slices']
export const BB_SHARE = makePiece('bb-share', 'Buybacks long: a share paper turns into a pizza; a pizza shop with ten owners in an arc; the pizza is cut into ten and each slice flies to its owner; one slice lifts out as one tenth; ten coins (100 profit) drop, then one flies onto each slice; a till with spare cash slides in; an oven and a sign offer themselves; an arrow curls from the till to a slice', {
  mood: 'light', Component: ShareScene, beats: BEATS,
  sfx: [['s9:pizza', 'pop', 0.3], ['s11:cut', 'swish', 0.3], ['s13:100', 'coin', 0.35], ['s15:till', 'ding', 0.3], ['s17:buy', 'swish', 0.3]] })
