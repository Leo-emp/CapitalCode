// ---------------------------------------------------------------- s25–s37: paid first.
// A week strip: the aunt pays on day 1, you drink on day 7; in between the till holds her 50 and the cup is still
// dashed. The till's cash goes out to work (staff, a sack of beans, the bank) while a 0% INTEREST tag hangs on it.
// A note passes from the aunt to the shop: like a loan, 0% interest, no date. Then one card multiplies into
// millions; a phone app card is topped up; cards pour into a big pile: 1.7 billion owed in drinks, with rows of
// dashed cups behind it. Last, a tank: new card money flows in, old money is spent out, the level stays high.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Coin, Doc, Headline, Person, Phone, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Cup, Figure, GiftCard, GovBuilding, Present, Tank, Till, Note } from './kit'

const COLORS = ['#2FA36B', '#3A6EA8', '#C94A3E', '#E9A23B']
const Sack: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={110} ry={16} fill="#000" opacity={0.2} />
    <path d="M-90 0 Q-110 -120 -60 -170 L60 -170 Q110 -120 90 0 Z" fill="#C9A26B" /><path d="M-60 -170 L60 -170 L40 -200 L-40 -200 Z" fill="#A9824B" />
    {[-30, 0, 30].map((dx, k) => <ellipse key={k} cx={dx} cy={-206 - (k % 2) * 10} rx={16} ry={10} fill="#5A3A22" />)}
    <text x={0} y={-70} textAnchor="middle" fill="#5A3A22" style={{ font: '400 44px "Bebas Neue"' }}>BEANS</text>
  </g>
)

const Paid: React.FC<PieceProps> = ({ f, c }) => {
  const week = c('s25:week'), aunt25 = c('s25:aunt'), paying = c('s25:paying'), walking = c('s25:walking')
  const already = c('s26:already'), b50 = c('s26:50'), cent = c('s26:cent'), drink26 = c('s26:drink')
  const cash = c('s27:cash'), staff = c('s27:staff'), beans = c('s27:beans'), bank = c('s27:bank')
  const interest = c('s28:interest'), nobody = c('s28:nobody'), waiting = c('s28:waiting')
  const loan = c('s29:loan'), aunt29 = c('s29:aunt'), shop29 = c('s29:shop'), interest29 = c('s29:interest'), date = c('s29:date'), back = c('s29:back')
  const small = c('s30:small'), millions = c('s30:millions')
  const sells = c('s31:sells'), app = c('s31:app'), top = c('s31:top'), order = c('s31:order')
  const customers = c('s32:customers'), loading = c('s32:loading'), anything = c('s32:anything')
  const sep33 = c('s33:september'), card33 = c('s33:card'), balances = c('s33:balances'), rewards = c('s33:rewards'), bn = c('s33:17')
  const owed = c('s34:owed'), drinks34 = c('s34:drinks'), made = c('s34:made')
  const most = c('s35:most'), year = c('s35:year')
  const old = c('s36:old'), spent36 = c('s36:spent'), arriving = c('s36:arriving'), stays = c('s36:stays')
  const present = c('s37:present'), paid = c('s37:paid'), work = c('s37:work')
  const A1 = win(f, 0, cash - 2), A2 = win(f, cash - 2, loan - 2), A3 = win(f, loan - 2, small - 2), B = win(f, small - 2, most - 2), C = on(f, most - 2, 10)
  return (
    <g>
      <Stage id="gc-paid" frame={f} />
      <Headline f={f} lines={[[week, 'THE WEEK IN BETWEEN', P.ink, 100], [cash, 'THE SHOP CAN USE THE CASH', P.ink, 96], [interest, 'NO INTEREST PAID', P.goldInk, 104], [loan, 'A BIT LIKE A LOAN', P.ink, 104],
        [millions, 'NOW MILLIONS OF CARDS', P.ink, 104], [bn, '$1.7 BILLION', P.goldInk, 124], [owed, 'OWED IN DRINKS NOT MADE YET', P.ink, 96], [most, 'MOST CARDS USED WITHIN A YEAR', P.ink, 96], [stays, 'THE PILE STAYS BIG', P.goldInk, 104], [present, 'PRESENT 1: PAID FIRST', P.goldInk, 104]]} />
      {/* # A1: a week strip, the aunt's bill on day 1, your cup on day 7; the till holds 50 and the cup is still dashed */}
      {A1 > 0 && <g opacity={A1}>
        {Array.from({ length: 7 }, (_, k) => <g key={k} opacity={on(f, week + k * 2, 6)}><Calendar x={360 + k * 200} y={370} text={String(k + 1)} s={0.85} /></g>)}
        <g opacity={on(f, aunt25, 8)}><text x={360} y={600} textAnchor="middle" fill={P.ink2} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>AUNT PAYS</text></g><g opacity={on(f, paying, 8)} transform={`translate(360 500) scale(${pop(f, paying)})`}><Note x={0} y={0} s={0.8} text="50" /></g>
        <g opacity={on(f, walking, 8)}><Cup x={1560} y={560} s={0.55} ghost /><text x={1560} y={640} textAnchor="middle" fill={P.ink2} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>YOU DRINK</text></g>
        <g opacity={on(f, already, 8)}><Till x={960} y={860} s={1} open={on(f, b50, 10)} bills={on(f, b50, 10)} /></g>
        <g opacity={on(f, cent, 8)}><Coin x={960} y={560} s={1.1} text="0¢" /><text x={960} y={650} textAnchor="middle" fill={P.ink2} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>SPENT ON YOUR DRINK</text></g>
        <g opacity={on(f, drink26, 8)}><path d="M460 500 L1460 500" stroke={P.goldInk} strokeWidth={6} strokeDasharray="10 14" /></g>
      </g>}
      {/* # A2: the cash goes to work — staff, beans, bank; a 0% interest tag; a clock for the wait */}
      {A2 > 0 && <g opacity={A2}>
        <Till x={960} y={900} s={1} open={1} bills={1 - 0.75 * on(f, bank + 10, 12)} />
        {[[staff, 400], [beans, 960], [bank, 1520]].map(([at, x], k) => {
          const t = easeInOut(span(f, at, at + 16))
          return <g key={k}>
            <g opacity={on(f, at, 4) * (1 - on(f, at + 16, 4))}><Note x={lerp(960, x, t)} y={lerp(820, 620, t) - Math.sin(t * Math.PI) * 140} s={0.6} /></g>
            <g opacity={on(f, at + 6, 8)} transform={`translate(${x} 560) scale(${pop(f, at + 6)})`}>
              {k === 0 && <Figure x={0} y={0} s={1.3} color="#48B87A" />}
              {k === 1 && <Sack x={0} y={0} s={0.9} />}
              {k === 2 && <g><GovBuilding x={0} y={0} s={0.55} /><text x={0} y={60} textAnchor="middle" fill={P.ink} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>BANK</text></g>}
            </g>
            {k === 0 && <g opacity={on(f, at + 6, 8)}><text x={x} y={620} textAnchor="middle" fill={P.ink} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>STAFF</text></g>}
          </g>
        })}
        <g opacity={on(f, interest, 8)} transform={`translate(1260 760) rotate(8) scale(${pop(f, interest)})`}><rect x={-120} y={-44} width={240} height={88} rx={14} fill={P.coral} /><text x={0} y={24} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"' }}>0% INTEREST</text></g>
        <g opacity={on(f, waiting, 8)}><Clock x={660} y={780} f={f} /></g>
        <g opacity={on(f, nobody, 8) * (1 - on(f, waiting, 8))}><text x={660} y={790} textAnchor="middle" fill={P.ink2} style={{ font: '400 48px "Bebas Neue"' }}>NOTHING EXTRA</text></g>
      </g>}
      {/* # A3: like a loan — a note passes from the aunt to the shop: 0% interest, no date */}
      {A3 > 0 && <g opacity={A3}>
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [aunt29, 'offer', 'smiling'], [back, 'shrug', 'neutral']] as Beat[]} x={420} y={1000} s={0.95} />
        <Person f={f} who="owner" beats={[[0, 'idle', 'smiling'], [shop29, 'receive', 'smiling'], [date, 'confident', 'smug']] as Beat[]} x={1500} y={1000} s={0.95} />
        {(() => { const t = easeInOut(span(f, aunt29, shop29 + 10)); return <g transform={`translate(${lerp(620, 960, t)} ${lerp(640, 560, t)})`}><Doc x={0} y={0} s={0.9} title="LOAN" lines={3} /></g> })()}
        <g opacity={on(f, interest29, 8)} transform={`translate(1040 480) rotate(-8) scale(${pop(f, interest29)})`}><rect x={-90} y={-36} width={180} height={72} rx={12} fill={P.mint} /><text x={0} y={20} textAnchor="middle" fill="#0E1B33" style={{ font: '400 56px "Bebas Neue"' }}>0%</text></g>
        <g opacity={on(f, date, 8)} transform={`translate(960 760) rotate(6) scale(${pop(f, date)})`}><rect x={-140} y={-36} width={280} height={72} rx={12} fill={P.gold} /><text x={0} y={20} textAnchor="middle" fill="#0E1B33" style={{ font: '400 52px "Bebas Neue"' }}>NO DATE</text></g>
      </g>}
      {/* # B: one card becomes millions; the app card is topped up; the pile = 1.7 billion owed, dashed cups behind */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, sells - 4, 8)}><g transform={`scale(${1})`}><GiftCard x={960} y={560} s={lerp(1, 0.5, on(f, millions, 12))} r={-4} /></g>
          {Array.from({ length: 40 }, (_, k) => { const a = k * 2.4, r = 140 + (k % 8) * 60; return <g key={k} opacity={on(f, millions + k * 0.5, 6)}><GiftCard x={960 + Math.cos(a) * r * 1.6} y={600 + Math.sin(a) * r * 0.75} s={0.28} r={(k % 5 - 2) * 9} color={COLORS[k % 4]} /></g> })}</g>
        <g opacity={on(f, sells - 4, 8) * (1 - on(f, customers - 4, 8))}>
          <Phone x={760} y={620} s={1.4} r={-4}><GiftCard x={0} y={-50} s={0.4} amount={on(f, top, 6) > 0.5 ? '$25' : '$0'} /><rect x={-60} y={40} width={120} height={50} rx={12} fill={P.mint} opacity={0.6 + 0.4 * on(f, top, 8)} /><text x={0} y={76} textAnchor="middle" fill="#0E1B33" style={{ font: '400 34px "Bebas Neue"' }}>TOP UP</text></Phone>
          <g opacity={on(f, app, 8)}><text x={760} y={900} textAnchor="middle" fill={P.ink} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>THE APP CARD</text></g>
          <g opacity={on(f, order, 8)}><Cup x={1200} y={760} s={1} ghost /><text x={1200} y={840} textAnchor="middle" fill={P.ink2} style={{ font: '400 44px "Bebas Neue"' }}>NOT ORDERED YET</text></g>
        </g>
        <g opacity={on(f, customers - 4, 8)}>
          {Array.from({ length: 12 }, (_, k) => { const t = ((f - loading) / 40 + k / 12) % 1; return f > loading && f < bn + 40 ? <g key={k} opacity={0.9}><GiftCard x={lerp(-100, 900, t)} y={lerp(300, 640, t) - Math.sin(t * Math.PI) * 120} s={0.24} r={k * 20} color={COLORS[k % 4]} /></g> : null })}
          {/* # the pile */}
          {Array.from({ length: Math.round(30 * span(f, loading, bn)) }, (_, k) => { const row = Math.floor(k / 6), col = k % 6; return <GiftCard key={k} x={800 + col * 64 - row * 6} y={780 - row * 34} s={0.3} r={(k % 3 - 1) * 6} color={COLORS[k % 4]} /> })}
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={on(f, rewards + k * 2, 8)} transform={`translate(${780 + k * 70} ${600 - (k % 2) * 30})`}><path d="M0 -22 L7 -7 L22 -7 L9 4 L14 20 L0 10 L-14 20 L-9 4 L-22 -7 L-7 -7 Z" fill={P.gold} /></g>)}
          <g opacity={on(f, sep33, 8)}><Calendar x={1360} y={700} text="SEP 24" s={0.9} /></g>
          <g opacity={on(f, card33, 8)}><ellipse cx={960} cy={720} rx={300} ry={150} fill={P.gold} opacity={0.12 + 0.05 * Math.sin(f / 6)} /></g>
          <g opacity={on(f, balances, 8)}><text x={960} y={890} textAnchor="middle" fill={P.ink2} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>CARD BALANCES + UNUSED REWARDS</text></g>
          {[200, 310, 420, 1500, 1610, 1720].map((x, k) => <g key={k} opacity={on(f, drinks34 + k * 2, 6) * 0.9}><Cup x={x} y={600} s={0.55} ghost /></g>)}
          <g opacity={on(f, made, 8)}>{[[255, 820], [1665, 820]].map(([x, y], k) => <Cup key={k} x={x} y={y} s={0.55} ghost />)}</g>
        </g>
      </g>}
      {/* # C: within a year; the tank: new money in, old money out, the level stays high; present 1 */}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, old - 4, 8)}><Calendar x={960} y={560} text="1 YR" s={1.8} /><g opacity={on(f, year, 8)}><text x={960} y={780} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"', letterSpacing: 2 }}>MOST CARDS USED UP</text></g></g>
        <g opacity={on(f, old - 4, 8) * (1 - on(f, present - 4, 8))}>
          <Tank x={960} y={880} level={0.7 + 0.03 * Math.sin(f / 30)} f={f} inflow={on(f, arriving, 8)} outflow={on(f, spent36, 8)} />
          <g opacity={on(f, spent36, 8)}><text x={1600} y={760} textAnchor="middle" fill={P.ink} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 2 }}>OLD MONEY SPENT</text></g>
          <g opacity={on(f, arriving, 8)}><text x={320} y={480} textAnchor="middle" fill={P.ink} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 2 }}>NEW MONEY IN</text></g>
        </g>
        <g opacity={on(f, present - 4, 8)}>
          <g transform={`translate(960 900) scale(${pop(f, present)})`}><Present x={0} y={0} s={1.3} open={on(f, paid, 12)} color="#C94A3E" n="1" /></g>
          {(() => { const t = easeInOut(span(f, paid + 4, work)); return <g opacity={on(f, paid + 4, 6)}><Note x={960} y={lerp(560, 360, t)} s={1.2} text="50" /><Coin x={1100} y={lerp(600, 420, t)} s={1} /></g> })()}
          <g opacity={on(f, work, 8)}><text x={960} y={1040} textAnchor="middle" fill={P.ink2} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>BEFORE DOING THE WORK</text></g>
        </g>
      </g>}
      <Vignette id="gc-paid" />
    </g>
  )
}
const Clock: React.FC<{ x: number; y: number; f: number }> = ({ x, y, f }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={80} fill={P.paper} stroke={P.edge} strokeWidth={4} />
    <line x1={0} y1={0} x2={Math.sin(f / 10) * 58} y2={-Math.cos(f / 10) * 58} stroke="#1E3A63" strokeWidth={8} strokeLinecap="round" />
    <line x1={0} y1={0} x2={Math.sin(f / 120) * 38} y2={-Math.cos(f / 120) * 38} stroke={P.coral} strokeWidth={10} strokeLinecap="round" />
  </g>
)

const BEATS = ['s33:september', 's33:card', 's25:week', 's25:aunt', 's25:paying', 's25:walking', 's26:already', 's26:50', 's26:cent', 's26:drink', 's27:cash', 's27:staff', 's27:beans', 's27:bank', 's28:interest', 's28:nobody', 's28:waiting',
  's29:loan', 's29:aunt', 's29:shop', 's29:interest', 's29:date', 's29:back', 's30:small', 's30:millions', 's31:sells', 's31:app', 's31:top', 's31:order', 's32:customers', 's32:loading', 's32:anything',
  's33:balances', 's33:rewards', 's33:17', 's34:owed', 's34:drinks', 's34:made', 's35:most', 's35:year', 's36:old', 's36:spent', 's36:arriving', 's36:stays', 's37:present', 's37:paid', 's37:work']
export const GC_PAID = makePiece('gc-paid', 'Gift cards long: the week between paying and drinking (till holds 50, cup dashed); the cash goes to staff, beans and the bank with a 0% interest tag; a loan note 0% no date; one card becomes millions, an app card topped up, cards pour into a pile of 1.7 billion owed in drinks; a tank with money in and out stays full; present 1 opens', {
  mood: 'dark', Component: Paid, beats: BEATS,
  sfx: [['s25:paying', 'swish', 0.3], ['s27:staff', 'coin', 0.3], ['s28:interest', 'thump', 0.3], ['s29:date', 'pop', 0.3], ['s30:millions', 'swish', 0.35], ['s33:17', 'chime', 0.35], ['s37:present', 'pop', 0.35]] })
