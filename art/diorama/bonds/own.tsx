// ---------------------------------------------------------------- s86–s93: how people own bonds, and the yield
// A) s86–89  three arched doors open one by one on their words: (1) straight from the government — one Treasury note,
//            FROM $100; (2) a bond fund — coins from many people pour into one big pot of many bonds; (3) a
//            retirement fund jar of blue stocks and green bonds whose green part grows as an age dial turns older.
// B) s90–92  two dials: the COUPON stays locked at 4%; the YIELD dial — what a new buyer gets for the price they pay,
//            counting the payments and the gap to $1,000 — swings to 5% for the buyer who paid $930.
// C) s93     the flip side of 2022: a seesaw PRICES down / YIELDS up; LOCKED IN HIGHER YIELDS.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { B, BDefs, BGrain, Capitol, Certificate, Coin, Dial, FLOOR, Flourish, Parchment, PriceTag, Seesaw, Tag, cues, fadeIn, scene, FONT } from './kit'

const K = {
  three86: 's86:three', ways86: 's86:ways',
  first87: 's87:first', directly87: 's87:directly', gov87: 's87:government', treasury87: 's87:treasury', hundred87: 's87:hundred',
  second88: 's88:second', fund88: 's88:fund', pools88: 's88:pools', people88: 's88:people', different88: 's88:different',
  third89: 's89:third', noticing89: 's89:noticing', retirement89: 's89:retirement', mixes89: 's89:mixes', shifting89: 's89:shifting', older89: 's89:older',
  number90: 's90:number', yield90: 's90:yield',
  coupon91: 's91:coupon', fixed91: 's91:fixed', yield91: 's91:yield', buyer91: 's91:buyer', price91: 's91:price', payments91: 's91:payments', gap91: 's91:gap', end91: 's91:end',
  ninas92: "s92:nina's", nine92: 's92:nine', yield92: 's92:yield', five92: 's92:five', coupon92: 's92:coupon', four92: 's92:four',
  flip93: 's93:flip', prices93: 's93:prices', fell93: 's93:fell', buying93: 's93:buying', locked93: 's93:locked', higher93: 's93:higher',
}
const DX = [420, 960, 1500]

// # an arched doorway that opens (o = shown, p = open); children are drawn inside the frame
const Door: React.FC<{ x: number; o: number; p: number; n: string; children?: React.ReactNode }> = ({ x, o, p, n, children }) => o <= 0.01 ? null : (
  <g opacity={o} transform={`translate(${x} ${FLOOR})`}>
    <path d="M-220 0 L-220 -500 Q-220 -660 0 -660 Q220 -660 220 -500 L220 0 Z" fill={B.stone} stroke={B.stoneD} strokeWidth={8} />
    <path d="M-185 0 L-185 -490 Q-185 -625 0 -625 Q185 -625 185 -490 L185 0 Z" fill="#FFF6DC" />
    <g opacity={p}>{children}</g>
    <g transform={`translate(-185 0) scale(${1 - 0.92 * p} 1)`}><path d="M0 0 L0 -490 Q0 -625 185 -625 Q370 -625 370 -490 L370 0 Z" fill={B.green} stroke={B.greenD} strokeWidth={6} /><circle cx={320} cy={-260} r={14} fill={B.brass} /></g>
  </g>
)

const Own: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s90') - 4, BC = c('s93') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = fadeIn(f, BC)
  const d1 = on(f, t.directly87 - 2, 14), d2 = on(f, t.fund88 - 2, 14), d3 = on(f, t.retirement89 - 2, 14)
  const age = easeInOut(span(f, t.shifting89, t.older89 + 18))
  const yieldV = lerp(4, 5, easeInOut(span(f, t.five92 - 6, t.five92 + 10)))
  return (
    <g>
      <BDefs />
      <Parchment />
      {/* ---------------- A) three ways ---------------- */}
      {A > 0 && <g opacity={A}>
        <Door x={DX[0]} o={on(f, t.three86 - 2, 8)} p={d1} n="1">
          <Capitol x={0} y={-70} s={0.36} />
          <Certificate x={0} y={-370} s={0.48} n={0} o={on(f, t.treasury87 - 2, 8)} amount="$100" seal={false} />
        </Door>
        <Tag x={DX[0]} y={FLOOR + 70} text="1 · FROM THE GOVERNMENT" size={32} bg={B.greenD} o={on(f, t.directly87, 8)} />
        <Door x={DX[1]} o={on(f, t.three86 + 4, 8)} p={d2} n="2">
          <path d="M-150 -40 L150 -40 L120 -260 L-120 -260 Z" fill="#B08A57" stroke="#6E5230" strokeWidth={5} />
          {Array.from({ length: 6 }, (_, k) => <rect key={k} x={-110 + (k % 3) * 74} y={-320 - Math.floor(k / 3) * 46} width={70} height={40} rx={4} fill="url(#bd-cert)" stroke={B.green} strokeWidth={3} opacity={on(f, t.different88 - 2 + k * 2, 6)} />)}
          {f > t.pools88 && [0, 1, 2, 3].map((k) => { const q = ((f - t.pools88) / 26 + k / 4) % 1; return <Coin key={k} x={lerp(-140 + k * 90, 0, q)} y={lerp(-560, -280, q)} r={22} o={1 - q * 0.6} /> })}
        </Door>
        <Tag x={DX[1]} y={FLOOR + 70} text="2 · A BOND FUND" size={36} bg={B.green} o={on(f, t.fund88, 8)} />
        <Door x={DX[2]} o={on(f, t.three86 + 8, 8)} p={d3} n="3">
          <g transform="translate(-30 -60)">
            <rect x={-110} y={-380} width={220} height={380} rx={30} fill="#fff" opacity={0.5} stroke={B.inkL} strokeWidth={5} />
            <rect x={-100} y={-370 + 360 * lerp(0.7, 0.3, age)} width={200} height={360 * (1 - lerp(0.7, 0.3, age))} rx={20} fill={B.green} />
            <rect x={-100} y={-370} width={200} height={360 * lerp(0.7, 0.3, age)} rx={20} fill={B.blue} opacity={on(f, t.mixes89 - 2, 8)} />
            <text x={0} y={-370 + 180 * lerp(0.7, 0.3, age) + 16} textAnchor="middle" fill="#fff" style={{ font: `400 34px ${FONT.big}` }}>STOCKS</text>
            <text x={0} y={-10 - 180 * (1 - lerp(0.7, 0.3, age))} textAnchor="middle" fill="#fff" style={{ font: `400 34px ${FONT.big}` }}>BONDS</text>
          </g>
          <g transform="translate(140 -260)" opacity={on(f, t.shifting89 - 2, 8)}>
            <rect x={-12} y={-150} width={24} height={300} rx={12} fill={B.parchDD} />
            <circle cx={0} cy={lerp(-140, 140, age)} r={24} fill={B.brass} stroke={B.brassD} strokeWidth={4} />
            <text x={0} y={-170} textAnchor="middle" fill={B.inkSoft} style={{ font: `400 26px ${FONT.big}` }}>YOUNG</text>
            <text x={0} y={190} textAnchor="middle" fill={B.inkSoft} style={{ font: `400 26px ${FONT.big}` }}>OLDER</text>
          </g>
        </Door>
        <Tag x={DX[2]} y={FLOOR + 70} text="3 · A RETIREMENT FUND" size={34} bg={B.brassD} o={on(f, t.retirement89, 8)} />
      </g>}

      {/* ---------------- B) coupon vs yield ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <Dial x={560} y={700} v={4} max={6} r={230} text="COUPON" o={on(f, AB, 8)} />
        <g opacity={on(f, t.fixed91, 8)} transform="translate(560 380)">
          <path d="M-36 -10 L-36 -50 Q-36 -90 0 -90 Q36 -90 36 -50 L36 -10" stroke={B.ink} strokeWidth={13} fill="none" />
          <rect x={-56} y={-16} width={112} height={84} rx={12} fill={B.brass} stroke={B.brassD} strokeWidth={5} /><circle cx={0} cy={24} r={11} fill={B.ink} />
        </g>
        <Tag x={560} y={850} text="FIXED" size={44} bg={B.ink} o={on(f, t.fixed91, 8)} />
        <Dial x={1360} y={700} v={yieldV} max={6} r={230} text="YIELD" o={on(f, t.yield90 - 2, 8)} />
        <Tag x={1360} y={850} text="PAYMENTS + THE GAP TO $1,000" size={34} bg={B.green} o={on(f, t.payments91, 8)} />
        <PriceTag x={1360} y={270} text="PAID $930" color={B.oxL} s={0.8} o={on(f, t.nine92, 8)} />
        <Tag x={1360} y={960} text="YIELD 5% · COUPON 4%" size={44} bg={B.greenD} o={on(f, t.four92, 8)} />
      </g>}

      {/* ---------------- C) the flip side of 2022 ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <Seesaw x={960} y={FLOOR} w={1300} tilt={-14 * on(f, t.fell93 - 2, 14)}
          left={<g><rect x={-140} y={-130} width={280} height={130} rx={16} fill={B.ox} /><text y={-48} textAnchor="middle" fill="#fff" style={{ font: `400 64px ${FONT.big}` }}>PRICES</text></g>}
          right={<g opacity={on(f, t.buying93 - 4, 8)}><rect x={-140} y={-130} width={280} height={130} rx={16} fill={B.green} /><text y={-48} textAnchor="middle" fill="#fff" style={{ font: `400 64px ${FONT.big}` }}>YIELDS</text></g>} />
        <Tag x={1450} y={300} text="LOCKED IN HIGHER YIELDS" size={44} bg={B.green} o={on(f, t.locked93, 8)} />
        <Tag x={470} y={300} text="2022" size={56} bg={B.ox} o={on(f, t.flip93, 8)} />
      </g>}

      <Headline f={f} lines={[[t.three86, 'THREE WAYS TO OWN BONDS', B.ink, 104], [t.number90, 'ONE MORE NUMBER: THE YIELD', B.ink, 100], [t.flip93, 'THE FLIP SIDE', B.green, 116]]} />
      <Flourish f={f} at={(EXTRA['bd-own'] ?? []).map(c)} />
      <BGrain />
    </g>
  )
}

export const BD_OWN = makePiece('bd-own', "How people own bonds: three arched doors open on their words — one Treasury note straight from the government from $100, a bond fund where coins from many people pour into one pot of many bonds, a retirement fund jar of stocks and bonds whose bond part grows as an age slider moves from young to older; the coupon dial locked at 4% vs the yield dial, what a new buyer gets counting the payments and the gap to $1,000, swinging to 5% for the buyer who paid $930; the flip side of 2022, a seesaw PRICES down and YIELDS up, locked in higher yields", {
  mood: 'light', Component: Own, beats: [...Object.values(K), ...(EXTRA['bd-own'] ?? [])],
  sfx: [['s87:directly', 'click', 0.1], ['s88:fund', 'click', 0.1], ['s89:retirement', 'click', 0.1], ['s92:five', 'ding', 0.1], ['s93:locked', 'click', 0.1]] })
