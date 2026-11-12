// ---------------------------------------------------------------- s87–s97: the whole story.
// The three presents return and open in turn: 1, a bill slides into a till before anything is handed over;
// 2, a jacket with an extra coin; 3, a grey card whose money stacks up as sales (208 million for Starbucks). A card
// drawn as a blueprint: how gift cards are built. A dollar spent from a card turns into a cup; a dollar left on a
// card in a drawer turns into nothing (a dashed cup, crossed). Last, you open your own drawer and lift out the card:
// 244 dollars on average, still yours.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Coin, Headline, Person, Tick, hand, win } from '../aimoney/common'
import { Cup, Drawers, GiftCard, Jacket, Present, Till, Note } from './kit'

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const story = c('s87:story')
  const first = c('s88:first'), gets = c('s88:gets'), anything = c('s88:anything'), interest = c('s88:interest'), waits = c('s88:waits')
  const second = c('s89:second'), spend89 = c('s89:spend'), more89 = c('s89:more'), brings = c('s89:brings')
  const third = c('s90:third'), never90 = c('s90:never'), count90 = c('s90:count'), sales90 = c('s90:sales')
  const sbux91 = c('s91:starbucks'), part91 = c('s91:part'), alone = c('s91:alone'), m208 = c('s91:208')
  const none92 = c('s92:none'), trick = c('s92:trick'), built = c('s92:built')
  const dollar93 = c('s93:dollar'), costs93 = c('s93:costs'), drink93 = c('s93:drink')
  const dollar94 = c('s94:dollar'), forgotten = c('s94:forgotten'), costs94 = c('s94:costs'), all94 = c('s94:all')
  const four = c('s95:4'), unused = c('s95:unused'), average = c('s95:average'), d244 = c('s95:244')
  const money96 = c('s96:money'), yours = c('s96:yours'), expects = c('s96:expects'), back = c('s96:back')
  const works = c('s97:works')
  const A = win(f, 0, none92 - 2), B = win(f, none92 - 2, four - 2), C = on(f, four - 2, 10)
  const you: Beat[] = [[0, 'idle', 'neutral'], [unused, 'reachDown', 'thinking'], [d244, 'holdUp', 'smiling'], [yours, 'confident', 'smiling'], [expects, 'think', 'thinking'], [works, 'thumbsUp', 'smiling']]
  const hp = hand(f, you, 520, 1000, 1)
  const lifted = easeInOut(span(f, d244 - 10, d244 + 8))
  return (
    <g>
      <Stage id="gc-pay" frame={f} />
      <Headline f={f} lines={[[story, 'THE WHOLE STORY', P.ink, 110], [first, '1. PAID FIRST, NO INTEREST', P.goldInk, 100], [second, '2. PEOPLE SPEND MORE', P.goldInk, 104], [third, '3. SOME IS NEVER SPENT', P.goldInk, 104],
        [m208, 'STARBUCKS 2024: $208 MILLION', P.goldInk, 100], [trick, 'NOT A TRICK. HOW IT IS BUILT', P.ink, 100], [dollar93, 'SPENT: COSTS A DRINK', P.ink, 104], [dollar94, 'FORGOTTEN: NO DRINK AT ALL', P.coralInk, 100],
        [four, '4 IN 10 HAVE AN UNUSED CARD', P.ink, 100], [yours, 'STILL YOURS', P.goldInk, 116]]} />
      {/* # A: the three presents open in turn */}
      {A > 0 && <g opacity={A}>
        {[0, 1, 2].map((k) => {
          const at = [first, second, third][k]
          return <g key={k} opacity={on(f, story + k * 4, 8)} transform={`translate(${420 + k * 540} 960) scale(${pop(f, story + k * 4)})`}><Present x={0} y={0} s={1.1} open={on(f, at, 12)} color={['#C94A3E', '#3A6EA8', '#2FA36B'][k]} n={String(k + 1)} /></g>
        })}
        {/* # 1: a bill into the till before anything is handed over; 0% */}
        <g opacity={on(f, gets, 8)}><Till x={420} y={560} s={0.8} open={on(f, gets + 10, 10)} bills={on(f, gets + 14, 8)} /></g>
        {(() => { const t = easeInOut(span(f, gets, gets + 16)); return <g opacity={on(f, gets, 4) * (1 - on(f, gets + 16, 4))}><Note x={lerp(420, 420, t)} y={lerp(700, 520, t)} s={0.8} text="50" /></g> })()}
        <g opacity={on(f, anything, 8)}><Cup x={590} y={640} s={0.45} ghost /></g>
        <g opacity={on(f, interest, 8)} transform={`translate(420 330) rotate(-6) scale(${pop(f, interest)})`}><rect x={-80} y={-34} width={160} height={68} rx={12} fill={P.mint} /><text x={0} y={20} textAnchor="middle" fill="#0E1B33" style={{ font: '400 52px "Bebas Neue"' }}>0%</text></g>
        <g opacity={on(f, waits, 8)}><text x={420} y={1040} textAnchor="middle" fill={P.ink2} style={{ font: '400 40px "Bebas Neue"' }}>WHILE IT WAITS</text></g>
        {/* # 2: a jacket and an extra coin */}
        <g opacity={on(f, spend89, 8)}><Jacket x={900} y={420} s={0.5} /></g>
        <g opacity={on(f, more89, 8)}><Coin x={1090} y={520} s={1.1} /></g>
        <g opacity={on(f, brings, 8)}><text x={960} y={1040} textAnchor="middle" fill={P.ink2} style={{ font: '400 40px "Bebas Neue"' }}>NEW MONEY IN</text></g>
        {/* # 3: a grey card; its money stacks up as sales */}
        <g opacity={on(f, never90, 8)}><GiftCard x={1400} y={500} s={0.5} r={-6} crack={on(f, never90, 12)} /></g>
        {Array.from({ length: Math.round(10 * span(f, count90, m208)) }, (_, k) => <Coin key={k} x={1580 + (k % 2) * 70} y={660 - Math.floor(k / 2) * 50} s={0.9} />)}
        <g opacity={on(f, sales90, 8)}><text x={1500} y={1040} textAnchor="middle" fill={P.ink2} style={{ font: '400 40px "Bebas Neue"' }}>COUNTED AS SALES</text></g>
        <g opacity={on(f, sbux91, 8)}><text x={1615} y={380} textAnchor="middle" fill={P.ink} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>STARBUCKS</text></g>
        <g opacity={on(f, part91, 8)}><path d="M1400 860 L1400 800" stroke={P.goldInk} strokeWidth={8} strokeLinecap="round" /></g>
        <g opacity={on(f, alone, 8)}><ellipse cx={1615} cy={560} rx={150} ry={170} fill={P.gold} opacity={0.18} /></g>
      </g>}
      {/* # B: how it is built — a dollar spent becomes a drink; a dollar forgotten becomes nothing */}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, none92, 8) * (1 - on(f, dollar93 - 4, 8))} transform={`translate(960 600) scale(${2.1 + 0.1 * on(f, built, 10)})`}>
          <rect x={-170} y={-104} width={340} height={208} rx={22} fill="none" stroke={P.skyInk} strokeWidth={3} strokeDasharray="10 8" />
          <rect x={-140} y={-62} width={60} height={46} rx={8} fill="none" stroke={P.skyInk} strokeWidth={3} strokeDasharray="6 6" />
          <path d="M-170 0 L170 0 M0 -104 L0 104" stroke={P.skyInk} strokeWidth={1.5} strokeDasharray="4 8" />
          <text x={0} y={80} textAnchor="middle" fill={P.skyInk} style={{ font: '400 22px "Bebas Neue"', letterSpacing: 3 }}>GIFT CARD · BLUEPRINT</text>
        </g>
        {/* # top lane: a dollar from a card becomes a cup */}
        <g opacity={on(f, dollar93 - 4, 8)}>
          <GiftCard x={420} y={420} s={0.6} r={-4} />
          {(() => { const t = easeInOut(span(f, dollar93, costs93 + 6)); return <Coin x={lerp(560, 1100, t)} y={420 - Math.sin(t * Math.PI) * 60} s={1} text="$1" o={1 - on(f, costs93 + 4, 6)} /> })()}
          <g opacity={on(f, costs93, 8)} transform={`translate(1200 500) scale(${pop(f, drink93)})`}><Cup x={0} y={0} s={0.8} steam={1} f={f} /></g>
          <g opacity={on(f, drink93, 8)}><text x={1500} y={440} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>1 DRINK HANDED OVER</text></g>
        </g>
        {/* # bottom lane: a dollar left on a card in a drawer becomes nothing */}
        <g opacity={on(f, dollar94 - 4, 8)}>
          <Drawers x={420} y={1040} s={0.6} open={0.6}><GiftCard x={0} y={0} s={0.5} r={-4} amount="$1" /></Drawers>
          <g opacity={on(f, forgotten, 8)}><text x={420} y={740} textAnchor="middle" fill={P.ink2} style={{ font: '400 44px "Bebas Neue"' }}>FORGOTTEN</text></g>
          <g opacity={on(f, costs94, 8)}><Cup x={1200} y={940} s={0.8} ghost /><Tick x={1200} y={760} o={on(f, all94, 8)} r={40} ok={false} /></g>
          <g opacity={on(f, all94, 8)}><text x={1500} y={880} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>NO DRINK AT ALL</text></g>
        </g>
      </g>}
      {/* # C: you open your drawer and lift out the card — 244 on average, still yours */}
      {C > 0 && <g opacity={C}>
        <Drawers x={1180} y={1000} s={1.1} open={on(f, unused, 14)} />
        <Person f={f} who="hero" beats={you} x={520} y={1000} s={1} />
        <GiftCard x={lerp(1180, hp.x + 60, lifted)} y={lerp(600, hp.y - 50, lifted)} s={lerp(0.45, 0.5, lifted)} r={-8} amount="$244" o={on(f, unused + 6, 8)} color="#3A6EA8" />
        <g opacity={on(f, money96, 8)}><ellipse cx={hp.x + 60} cy={hp.y - 50} rx={150} ry={110} fill={P.gold} opacity={0.18} /></g>
        <g opacity={on(f, average, 8)}><text x={1180} y={300} textAnchor="middle" fill={P.ink2} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 2 }}>THE AVERAGE UNUSED AMOUNT</text></g>
        <g opacity={on(f, expects, 8) * (1 - on(f, works, 8))}><text x={1300} y={420} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>THE COMPANY EXPECTS SOME</text><text x={1300} y={490} textAnchor="middle" fill={P.ink} style={{ font: '400 56px "Bebas Neue"' }}>NEVER COMES BACK</text></g>
        <g opacity={on(f, back, 8) * (1 - on(f, works, 8))}><Cup x={1640} y={720} s={0.6} ghost /></g>
        <g opacity={on(f, works, 8)}><Cup x={1300} y={760} s={1} steam={1} f={f} /></g>
      </g>}
      <Vignette id="gc-pay" />
    </g>
  )
}

const BEATS = ['s92:none', 's96:money', 's91:starbucks', 's91:part', 's87:story', 's88:first', 's88:gets', 's88:anything', 's88:interest', 's88:waits', 's89:second', 's89:spend', 's89:more', 's89:brings', 's90:third', 's90:never', 's90:count', 's90:sales', 's91:alone', 's91:208',
  's92:trick', 's92:built', 's93:dollar', 's93:costs', 's93:drink', 's94:dollar', 's94:forgotten', 's94:costs', 's94:all', 's95:4', 's95:unused', 's95:average', 's95:244', 's96:yours', 's96:expects', 's96:back', 's97:works']
export const GC_PAYOFF = makePiece('gc-payoff', 'Gift cards long: three presents open in turn (a bill into a till with 0%, a jacket and coin, a grey card whose money stacks up as sales); a card blueprint; a dollar spent becomes a drink, a dollar forgotten becomes nothing; you open your drawer and lift out a 244 card, still yours', {
  mood: 'light', Component: Payoff, beats: BEATS,
  sfx: [['s88:gets', 'coin', 0.3], ['s89:more', 'coin', 0.3], ['s91:208', 'chime', 0.35], ['s93:drink', 'pop', 0.3], ['s94:all', 'crack', 0.3], ['s95:244', 'ding', 0.35]] })
