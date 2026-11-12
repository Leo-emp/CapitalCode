// ---------------------------------------------------------------- s11–s24: how a gift card works (an example).
// Inside a coffee shop: your aunt walks in, hands 50 dollars over the counter, the till drawer slides out and the
// barista hands her a card. A dashed cup sits on the counter (nothing made). Then the shop's book opens: WE OWE 50,
// SALES 0. A week later you walk in with the card; a real cup is handed over and the book moves 6 from OWE to SALES;
// every drink moves a little more, until the card is empty (OWE 0, SALES 50). Last, the order: money in first
// (bill into the till), coffee out later (cup to you).
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Counter, Headline, Person, Stamp, Tick, hand, win } from '../aimoney/common'
import { Calendar } from '../charts'
import { Cup, GiftCard, Ledger, ShopBack, Till, Note } from './kit'

const Works: React.FC<PieceProps> = ({ f, c }) => {
  const follow = c('s11:follow'), finish = c('s11:finish')
  const aunt = c('s12:aunt'), walks = c('s12:walks'), shop12 = c('s12:shop'), buys = c('s12:buys'), card12 = c('s12:card')
  const hands = c('s13:hands'), b50 = c('s13:50'), shop13 = c('s13:shop'), money13 = c('s13:money'), till = c('s13:till'), gives = c('s13:gives'), plastic = c('s13:plastic')
  const moment = c('s14:moment'), money14 = c('s14:money'), sold = c('s14:sold'), yet = c('s14:yet')
  const coffee15 = c('s15:coffee'), cup15 = c('s15:cup'), counter15 = c('s15:counter')
  const cannot = c('s16:cannot'), sale16 = c('s16:sale')
  const writes = c('s17:writes'), owes17 = c('s17:owes'), drinks17 = c('s17:drinks'), promised = c('s17:promised'), holds = c('s17:holds')
  const week = c('s18:week'), walk18 = c('s18:walk'), drink18 = c('s18:drink')
  const handed19 = c('s19:handed'), six19 = c('s19:6'), sale19 = c('s19:sale')
  const n44 = c('s20:44'), card20 = c('s20:card'), still20 = c('s20:still'), owes20 = c('s20:owes'), drinks20 = c('s20:drinks')
  const every = c('s21:every'), more21 = c('s21:more'), turns = c('s21:turns')
  const all22 = c('s22:all'), whole = c('s22:whole'), sales22 = c('s22:sales'), nothing22 = c('s22:nothing')
  const normal = c('s23:normal'), money23 = c('s23:money'), first23 = c('s23:first'), coffee23 = c('s23:coffee'), later = c('s23:later')
  const order = c('s24:order'), reason = c('s24:reason'), love = c('s24:love')
  const A = win(f, 0, writes - 2), B = win(f, writes - 2, normal - 2), C = on(f, normal - 2, 10)
  const auntBeats: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 10], [shop12 + 6, 'idle', 'smiling'], [hands, 'offer', 'smiling'], [gives + 4, 'receive', 'smiling'], [plastic + 6, 'holdUp', 'smiling'], [sold, 'think', 'thinking']]
  const ax = lerp(-120, 560, easeInOut(span(f, walks - 4, shop12 + 6)))
  const ahp = hand(f, auntBeats, ax, 1000, 0.95)
  // # the book's numbers (an example): 50 owed; 6 moves to sales on the first drink; then 38, 32; then all 50
  const owes = f < six19 ? 50 : f < every ? 44 : f < more21 ? 38 : f < whole ? 32 : 0
  const sales = 50 - owes
  const youBeats: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 10], [drink18 + 2, 'idle', 'smiling'], [handed19, 'receive', 'smiling'], [still20, 'hold', 'smiling'], [whole, 'celebrate', 'smiling']]
  const yx = lerp(-160, 360, easeInOut(span(f, walk18 - 6, drink18 + 4)))
  const yhp = hand(f, youBeats, yx, 1000, 0.95)
  return (
    <g>
      <Stage id="gc-works" frame={f} />
      <Headline f={f} lines={[[follow, 'ONE CARD, START TO FINISH', P.ink, 96], [buys, 'A $50 GIFT CARD', P.goldInk, 104], [moment, 'MONEY IN. NOTHING SOLD YET', P.ink, 96], [cannot, 'NOT A SALE YET', P.coralInk, 104],
        [writes, 'MONEY IT OWES', P.ink, 104], [week, 'A WEEK LATER', P.ink, 100], [six19, '$6 BECOMES A SALE', P.goldInk, 104], [every, 'EACH DRINK MOVES A LITTLE', P.ink, 96], [whole, 'CARD SPENT: ALL $50 ARE SALES', P.goldInk, 96],
        [normal, 'MONEY FIRST, COFFEE LATER', P.ink, 100], [reason, 'REASON 1: PAID FIRST', P.goldInk, 104]]} />
      <g opacity={on(f, follow, 8) * (1 - on(f, normal, 10))}><rect x={60} y={40} width={210} height={64} rx={14} fill={P.card} /><text x={165} y={86} textAnchor="middle" fill={P.ink2} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>EXAMPLE</text></g>
      {/* # A: the aunt buys the card at the counter */}
      {A > 0 && <g opacity={A}>
        <ShopBack f={f} />
        <Person f={f} who="owner" beats={[[0, 'idle', 'smiling'], [hands, 'receive', 'smiling'], [gives, 'offer', 'smiling'], [sold, 'shrug', 'neutral'], [cannot, 'crossNoA', 'neutral']] as Beat[]} x={1560} y={1000} s={0.9} />
        <Counter x={1300} y={720} w={1200} />
        <Till x={1080} y={720} s={1} open={on(f, shop13, 12) * (1 - on(f, gives + 10, 12))} bills={on(f, money13 + 4, 8)} />
        <g opacity={on(f, money14, 8)}><ellipse cx={1080} cy={640} rx={210} ry={150} fill={P.gold} opacity={0.12 + 0.06 * Math.sin(f / 6)} /></g>
        <Person f={f} who="investorF" beats={auntBeats} x={ax} y={1000} s={0.95} />
        {/* # the 50 dollar bill goes from her hand into the till */}
        {(() => { const t = easeInOut(span(f, b50, money13 + 4)); return <g opacity={on(f, hands, 6) * (1 - on(f, money13 + 6, 6))}><Note x={lerp(ahp.x, 1080, t)} y={lerp(ahp.y, 700, t) - Math.sin(t * Math.PI) * 100} s={0.9} text="50" /></g> })()}
        {/* # the card goes from the barista to her hand */}
        {(() => { const t = easeInOut(span(f, gives, gives + 18)); return <g opacity={on(f, gives, 6)}><GiftCard x={lerp(1380, ahp.x + 30, t)} y={lerp(560, ahp.y - 20, t)} s={lerp(0.4, 0.34, t)} r={-6} amount={on(f, plastic, 6) > 0.5 ? '$50' : undefined} /></g> })()}
        <g opacity={on(f, card12, 8) * (1 - on(f, hands, 8))}><GiftCard x={960} y={400} s={0.7} r={-4} amount="$50" /></g>
        <g opacity={on(f, coffee15, 8)}><Cup x={1350} y={720} s={0.9} ghost /><Tick x={1350} y={510} o={on(f, cup15, 8)} r={36} ok={false} /></g>
        <g opacity={on(f, counter15, 8) * (1 - on(f, cannot, 8))}><text x={1350} y={800} textAnchor="middle" fill={P.ink2} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>NOT MADE YET</text></g>
        <Stamp x={1080} y={380} text="SALE?" f={f} at={sale16} />
      </g>}
      {/* # B: the book (WE OWE / SALES) and the card balance; you come in a week later and drink by drink it moves */}
      {B > 0 && <g opacity={B}>
        <Ledger x={1300} y={470} s={1.05} owes={`$${owes}`} sales={`$${sales}`} hiOwes={on(f, owes17, 8) * (1 - on(f, six19, 8)) + on(f, owes20, 8) * (1 - on(f, every, 8))} hiSales={on(f, six19, 8) * (1 - on(f, every, 8)) + on(f, all22, 8)} />
        <g opacity={on(f, promised, 8) * (1 - on(f, week, 8))}>{[0, 1, 2, 3, 4].map((k) => <g key={k} transform={`translate(${1060 + k * 120} 860) scale(${pop(f, promised + k * 3)})`}><Cup x={0} y={0} s={0.6} ghost /></g>)}</g>
        <g opacity={on(f, holds, 8) * (1 - on(f, week, 8))}><GiftCard x={420} y={480} s={0.9} r={-4} amount="$50" /><text x={420} y={660} textAnchor="middle" fill={P.ink2} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>WHOEVER HOLDS THE CARD</text></g>
        <g opacity={on(f, week, 8) * (1 - on(f, walk18 + 6, 8))}><Calendar x={420} y={480} text="+7" s={1.3} /></g>
        <g opacity={on(f, walk18, 8)}>
          <Person f={f} who="hero" beats={youBeats} x={yx} y={1000} s={0.95} />
          <GiftCard x={yhp.x + 50} y={yhp.y - 40} s={0.34 * (1 + 0.15 * Math.sin(Math.PI * span(f, card20, card20 + 12)))} r={-8} amount={`$${owes}`} />
          {/* # a real cup is handed over on each sale */}
          <g opacity={on(f, drink18, 8)} transform={`translate(${lerp(760, yhp.x + 120, easeInOut(span(f, handed19, handed19 + 16)))} ${lerp(860, yhp.y + 40, easeInOut(span(f, handed19, handed19 + 16)))})`}><Cup x={0} y={0} s={0.55} steam={1} f={f} /></g>
          {[every, more21].map((at, k) => <g key={k} opacity={on(f, at, 6) * (1 - on(f, at + 20, 8))} transform={`translate(${lerp(760, yhp.x + 120, easeInOut(span(f, at, at + 14)))} ${lerp(860, yhp.y + 40, easeInOut(span(f, at, at + 14)))})`}><Cup x={0} y={0} s={0.55} steam={1} f={f} /></g>)}
        </g>
        {/* # the 6 dollars slides from OWE to SALES */}
        {[six19, every, more21].map((at, k) => { const t = easeInOut(span(f, at, at + 18)); return <g key={k} opacity={on(f, at, 4) * (1 - on(f, at + 18, 4))}><text x={lerp(1170, 1430, t)} y={lerp(420, 420, t) - Math.sin(t * Math.PI) * 90} textAnchor="middle" fill={P.goldInk} style={{ font: '400 70px "Bebas Neue"' }}>$6</text></g> })}
        <g opacity={on(f, nothing22, 8)}><Tick x={1040} y={700} o={on(f, nothing22, 8)} r={42} /></g>
        <g opacity={on(f, drinks20, 8) * (1 - on(f, every, 8))}>{[0, 1, 2, 3].map((k) => <g key={k} transform={`translate(${1080 + k * 140} 860)`}><Cup x={0} y={0} s={0.5} ghost /></g>)}</g>
        <g opacity={on(f, n44, 8) * (1 - on(f, every, 8))}><text x={660} y={300} textAnchor="middle" fill={P.ink2} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 2 }}>CARD: $44 · OWED: $44</text></g>
        <g opacity={on(f, turns, 8) * (1 - on(f, whole, 8))}><text x={1300} y={760} textAnchor="middle" fill={P.ink2} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 2 }}>OWED TURNS INTO SALES</text></g>
      </g>}
      {/* # C: the order — the bill goes in first, the cup comes out later; reason 1 */}
      {C > 0 && <g opacity={C}>
        <Counter x={960} y={760} w={1500} />
        <Till x={960} y={760} s={1.1} open={on(f, money23, 10)} bills={on(f, first23, 10)} />
        {(() => { const t = easeInOut(span(f, money23, first23 + 6)); return <g opacity={on(f, money23, 6) * (1 - on(f, first23 + 8, 6))}><Note x={lerp(300, 960, t)} y={lerp(560, 700, t) - Math.sin(t * Math.PI) * 120} s={1.1} text="50" /></g> })()}
        <g opacity={on(f, first23, 8)}><Label3 x={600} y={420} t="1. MONEY IN FIRST" /></g>
        {(() => { const t = easeInOut(span(f, coffee23, later + 10)); return <g opacity={on(f, coffee23, 8)}><Cup x={lerp(1150, 1600, t)} y={760} s={1} steam={1} f={f} /></g> })()}
        <g opacity={on(f, later, 8)}><Label3 x={1500} y={420} t="2. COFFEE OUT LATER" /></g>
        <g opacity={on(f, order, 8)}><path d="M720 470 Q960 330 1260 470" fill="none" stroke={P.goldInk} strokeWidth={8} strokeLinecap="round" strokeDasharray="14 14" /></g>
        <g opacity={on(f, love, 8)} transform={`translate(960 560) scale(${pop(f, love)})`}><circle r={70} fill={P.gold} /><text x={0} y={30} textAnchor="middle" fill={P.navy0} style={{ font: '400 90px "Bebas Neue"' }}>1</text></g>
      </g>}
      <Vignette id="gc-works" />
    </g>
  )
}
const Label3: React.FC<{ x: number; y: number; t: string }> = ({ x, y, t }) => <text x={x} y={y} textAnchor="middle" fill={P.ink} style={{ font: '400 60px "Bebas Neue"', letterSpacing: 2 }}>{t}</text>

const BEATS = ['s13:50', 's13:shop', 's13:money', 's11:follow', 's11:finish', 's12:aunt', 's12:walks', 's12:shop', 's12:buys', 's12:card', 's13:hands', 's13:till', 's13:gives', 's13:plastic', 's14:moment', 's14:money', 's14:sold', 's14:yet',
  's15:coffee', 's15:cup', 's15:counter', 's16:cannot', 's16:sale', 's17:writes', 's17:owes', 's17:drinks', 's17:promised', 's17:holds', 's18:week', 's18:walk', 's18:drink', 's19:handed', 's19:6', 's19:sale',
  's20:44', 's20:card', 's20:still', 's20:owes', 's20:drinks', 's21:every', 's21:more', 's21:turns', 's22:all', 's22:whole', 's22:sales', 's22:nothing', 's23:normal', 's23:money', 's23:first', 's23:coffee', 's23:later', 's24:order', 's24:reason', 's24:love']
export const GC_WORKS = makePiece('gc-works', 'Gift cards long: an aunt buys a 50 dollar card in a coffee shop (bill into the till, card to her hand, a dashed cup not made yet); the shop book shows WE OWE 50 / SALES 0; a week later you buy drinks and 6 at a time moves from OWE to SALES until all 50 are sales; money in first, coffee out later', {
  mood: 'light', Component: Works, beats: BEATS,
  sfx: [['s13:till', 'coin', 0.35], ['s13:gives', 'swish', 0.3], ['s16:sale', 'thump', 0.3], ['s17:writes', 'click', 0.3], ['s19:6', 'ding', 0.35], ['s22:whole', 'chime', 0.35], ['s24:love', 'pop', 0.3]] })
