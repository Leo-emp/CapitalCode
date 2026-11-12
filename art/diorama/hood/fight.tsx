// ---------------------------------------------------------------- s75–s82: the fight over free trading.
// A) A balance: GOOD and BAD pans swing ("regulators don't agree").
// B) The SEC: a 2022 proposal with auction paddles; "June 2025 … withdrew": the proposal slides back into the building
//    and is crossed.
// C) Europe: a ring of twelve gold stars on blue; the coin stream from a tower to an app is cut by a barrier ("banned
//    payment for order flow"); a calendar: end of June 2026.
// D) Supporters vs critics: on the left, a supporter with a $0 tag and a better-price tick; on the right, a critic
//    points at one tower that both pays the app and fills Leo's order (two arrows from the same building) —
//    a conflict of interest — and a magnifier over the price ladder: it still has to find you the best price.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { HSpot as Spot } from './kit'
import { Headline, Label, Person, Tick, fly, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Ground, Magnifier } from '../power/kit2'
import { GovBuilding } from '../fee/kit'
import { AppPhone, Cent, Ladder, Paddle, Slip, Tower, XMark } from './kit'

const GROUND = 920
const EUFlag: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-6} y={0} width={12} height={300} fill="#8A97AA" />
    <rect x={6} y={0} width={300} height={200} rx={6} fill="#1F3FA0" />
    {Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return <circle key={k} cx={156 + Math.cos(a) * 64} cy={100 + Math.sin(a) * 64} r={9} fill="#FFD84A" /> })}
  </g>
)

const Fight: React.FC<PieceProps> = ({ f, c }) => {
  const payment75 = c('s75:payment'), good = c('s75:good'), bad = c('s75:bad'), regulators = c('s75:regulators'), agree = c('s75:agree')
  const sec76 = c('s76:sec'), proposed = c('s76:proposed'), compete76 = c('s76:compete'), auctions = c('s76:auctions')
  const june77 = c('s77:june'), withdrew = c('s77:withdrew'), plan = c('s77:plan')
  const europe = c('s78:europe'), way78 = c('s78:way')
  const union = c('s79:union'), banned = c('s79:banned'), flow79 = c('s79:flow'), last79 = c('s79:last'), stop79 = c('s79:stop'), june79 = c('s79:june')
  const supporters = c('s80:supporters'), free80 = c('s80:free'), possible = c('s80:possible'), better80 = c('s80:better'), screen80 = c('s80:screen')
  const without = c('s81:without'), fees = c('s81:fees'), more81 = c('s81:more')
  const critics = c('s82:critics'), conflict = c('s82:conflict'), paying = c('s82:paying'), filling = c('s82:filling'), find = c('s82:find'), best82 = c('s82:best')
  const AB = sec76 - 4, BC = europe - 4, CD = supporters - 4
  const A = win(f, payment75 - 30, AB), B = win(f, AB, BC), C = win(f, BC, CD), D = on(f, CD, 10)
  const sw = Math.sin((f - good) / 9) * 10 * on(f, good, 10) * (1 - on(f, agree + 20, 20) * 0.6)
  return (
    <g>
      <Stage id="hd-fight" frame={f} />
      <Spot f={f} at={c("s75:agree")} x={960} y={520} rx={520} ry={260} />
      <Spot f={f} at={c("s76:market")} x={1000} y={480} rx={240} ry={260} />
      <Spot f={f} at={c("s79:countries")} x={410} y={720} rx={220} ry={200} />
      <Spot f={f} at={c("s79:still")} x={540} y={360} rx={200} ry={160} />
      <Spot f={f} at={c("s80:possible")} x={560} y={520} rx={160} ry={220} />
      <Spot f={f} at={c("s80:customers")} x={900} y={370} rx={300} ry={90} />
      <Spot f={f} at={c("s81:apps")} x={560} y={520} rx={160} ry={220} />
      <Spot f={f} at={c("s81:investors")} x={300} y={700} rx={180} ry={260} />
      <Spot f={f} at={c("s82:order")} x={900} y={640} rx={160} ry={120} />
      <Spot f={f} at={c("s82:still")} x={650} y={300} rx={200} ry={160} />
      <Headline f={f} lines={[[good, 'GOOD OR BAD?', P.ink, 112], [regulators, "REGULATORS DON'T AGREE", P.ink, 100], [proposed, 'SEC, 2022: AUCTIONS FOR SMALL ORDERS', P.ink, 84], [withdrew, 'JUNE 2025: WITHDRAWN', P.coralInk, 100], [europe, 'EUROPE WENT THE OTHER WAY', P.ink, 96], [banned, 'EU: BANNED', P.coralInk, 112], [supporters, 'SUPPORTERS SAY…', P.ink, 104], [critics, 'CRITICS SAY…', P.ink, 104], [conflict, 'A CONFLICT OF INTEREST', P.coralInk, 100]]} />

      {/* # A) the balance */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g transform="translate(960 0)">
          <rect x={-12} y={360} width={24} height={GROUND - 360} fill="#8A97AA" /><path d={`M-120 ${GROUND} L120 ${GROUND} L0 ${GROUND - 60} Z`} fill="#8A97AA" />
          <g transform={`translate(0 360) rotate(${sw})`}>
            <rect x={-420} y={-8} width={840} height={16} rx={8} fill="#5A6680" />
            <g transform={`translate(-380 0) rotate(${-sw})`}><line x1={0} y1={0} x2={0} y2={120} stroke="#8A97AA" strokeWidth={4} /><path d="M-120 120 L120 120 L90 170 L-90 170 Z" fill={P.mint} /><text x={0} y={160} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>GOOD</text></g>
            <g transform={`translate(380 0) rotate(${-sw})`} opacity={on(f, bad, 8)}><line x1={0} y1={0} x2={0} y2={120} stroke="#8A97AA" strokeWidth={4} /><path d="M-120 120 L120 120 L90 170 L-90 170 Z" fill={P.coral} /><text x={0} y={160} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>BAD</text></g>
          </g>
          <g opacity={on(f, payment75, 8)}><Cent x={0} y={300} r={40} t="$" /></g>
        </g>
      </g>}

      {/* # B) the SEC's proposal, withdrawn */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <GovBuilding x={420} y={GROUND} s={0.9} /><Label x={420} y={GROUND + 70} text="SEC" size={56} font="Bebas Neue" color={P.ink} />
        {(() => { const back = on(f, withdrew, 24)
          return <g transform={`translate(${lerp(1000, 520, back)} ${lerp(480, 640, back)}) scale(${lerp(1, 0.4, back)})`} opacity={on(f, proposed, 10) * (1 - on(f, plan + 20, 12) * 0.5)}>
            <rect x={-170} y={-200} width={340} height={400} rx={16} fill={P.paper} stroke={P.edge} strokeWidth={4} />
            <text x={0} y={-140} textAnchor="middle" fill={P.navy2} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>PROPOSAL</text>
            <text x={0} y={-96} textAnchor="middle" fill="#5C6F8E" style={{ font: '400 34px "Bebas Neue"' }}>2022</text>
            {[0, 1, 2].map((k) => <g key={k} opacity={on(f, auctions + k * 4, 8)}><Paddle x={-100 + k * 100} y={60} s={0.6} n={String(k + 1)} /></g>)}
          </g> })()}
        <g opacity={on(f, june77, 8)}><Calendar x={1400} y={420} text="JUNE" s={1.0} /><Label x={1400} y={560} text="2025" size={56} font="Bebas Neue" color={P.ink} /></g>
        <XMark x={600} y={600} o={on(f, plan, 8)} size={60} />
      </g>}

      {/* # C) Europe bans it */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <EUFlag x={260} y={GROUND - 300} s={1.0} o={on(f, europe, 10)} />
        <Tower x={1560} y={GROUND} s={0.7} f={f} sign="MARKET MAKER" />
        <AppPhone x={900} y={560} s={0.8} />
        {[0, 1, 2, 3].map((k) => { const t = ((f - union + k * 8) % 32) / 32, stop = on(f, banned + 4, 8)
          return f >= union ? <Cent key={k} x={lerp(1500, lerp(1000, 1240, stop), t)} y={480 - Math.sin(t * Math.PI) * 60} r={22} t="$" o={(1 - Math.max(0, t - 0.85) * 6)} /> : null })}
        <g opacity={on(f, banned, 8)}><rect x={1210} y={300} width={30} height={320} rx={10} fill={P.coral} /><XMark x={1225} y={460} o={1} size={56} /></g>
        <g opacity={on(f, last79, 8)}><Calendar x={540} y={300} text="JUNE" s={0.9} /><Label x={540} y={430} text={f >= june79 ? 'END OF JUNE 2026' : ''} size={46} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # D) supporters vs critics */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, critics, 12)}>
          <Person f={f} who="hero" beats={[[0, 'present', 'smiling'], [better80, 'thumbsUp', 'smiling'], [fees, 'shrug', 'worried']]} x={300} y={GROUND} s={0.8} />
          <g opacity={on(f, free80, 8)}><AppPhone x={560} y={520} s={0.6} zero={1} /></g>
          <g opacity={on(f, better80, 8)}><Tick x={720} y={360} o={1} r={36} /><Label x={770} y={374} text="BETTER THAN THE SCREEN" size={40} font="Bebas Neue" color={P.ink} anchor="start" /></g>
          <g opacity={on(f, fees, 8)}><g transform="translate(720 470) rotate(-6)"><rect x={-10} y={-26} width={200} height={52} rx={10} fill={P.coral} /><text x={90} y={12} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 36px "Bebas Neue"' }}>FEES BACK?</text></g></g>
        </g>
        <g opacity={on(f, critics, 10)}>
          <Tower x={1360} y={GROUND} s={0.75} f={f} sign="SAME FIRM" />
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [conflict, 'point', 'worried']]} x={1760} y={GROUND} s={0.75} />
          {/* # one arrow: pays the app; the other: fills the order */}
          <AppPhone x={860} y={540} s={0.7} />
          <g opacity={on(f, paying, 8)}><path d="M1250 420 Q1080 340 940 420" fill="none" stroke={P.goldD} strokeWidth={8} strokeDasharray="14 10" /><Cent x={940} y={420} r={28} t="$" /><Label x={1080} y={330} text="PAYS THE APP" size={40} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, filling, 8)}><path d="M940 660 Q1080 740 1250 640" fill="none" stroke={P.skyD} strokeWidth={8} strokeDasharray="14 10" /><Slip x={1250} y={640} s={0.5} /><Label x={1080} y={740} text="FILLS YOUR ORDER" size={40} font="Bebas Neue" color={P.skyInk} /></g>
          <g opacity={on(f, find, 8)}><Magnifier x={860} y={470} s={0.9}><circle r={10} fill={P.mint} /></Magnifier><Label x={860} y={GROUND + 70} text="STILL HAS TO FIND THE BEST PRICE" size={40} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}
      <Vignette id="hd-fight" />
    </g>
  )
}

const BEATS = ["s75:agree", "s76:market", "s79:countries", "s79:still", "s80:possible", "s80:customers", "s81:apps", "s81:investors", "s82:order", "s82:still", 's75:payment', 's75:good', 's75:bad', 's75:regulators', 's76:sec', 's76:proposed', 's76:auctions', 's77:june', 's77:withdrew', 's77:plan', 's78:europe', 's79:union', 's79:banned', 's79:last', 's79:june', 's80:supporters', 's80:free', 's80:better', 's81:without', 's81:fees', 's82:critics', 's82:conflict', 's82:paying', 's82:filling', 's82:find']
export const HD_FIGHT = makePiece('hd-fight', 'PFOF long ch6: a GOOD/BAD balance swings (regulators don\'t agree); the SEC\'s 2022 auction proposal (paddles) slides back and is crossed (withdrawn June 2025); the EU flag — the coin stream from a market maker to an app is cut by a barrier (banned, end of June 2026); supporters (free trading, better than the screen, fees would return) vs critics (the same firm pays the app and fills your order — a conflict of interest — and a magnifier on the price: it still has to find the best price)', {
  mood: 'light', Component: Fight, beats: BEATS,
  sfx: [['s75:good', 'swish', 0.2], ['s76:proposed', 'pop', 0.2], ['s77:withdrew', 'whoosh', 0.2], ['s79:banned', 'thud', 0.3], ['s80:supporters', 'pop', 0.2], ['s82:conflict', 'thud', 0.25]] })
