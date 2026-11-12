// ---------------------------------------------------------------- s8–s14: step one, find your number (part 1).
// A) A mountain trail; the finish flag rises at the summit and shows "$ ?"; a "$1,000,000?" sign is tossed and crossed; SPEND sack ticks, EARN envelope crossed.
// B) Maya at the trailhead (made-up example) with her $40,000-a-year spending sack; a home, groceries and a box drop into it.
// C) 1994: a planner in a study full of record books (decades of stock and bond returns).
// D) A pile of investments: 4% scooped into a sack in year one; each later year's sack a little bigger (inflation); an hourglass runs 33+ years.
// E) Trinity University: 100 small hourglasses, 95 turn green; a coin split half STOCKS / half BONDS.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { Backdrop, C, Check, CoinG, Cross, Defs, Envelope, FONT, Grain, Hall, Hourglass, Mountain, Sack, Tag, fadeIn, scene } from './kit'

const G = 930

// # the study: warm wall, a tall bookshelf of record books, a desk with a lamp
const Study: React.FC<{ f: number; books: number }> = ({ f, books }) => (
  <g>
    <rect width={1920} height={1080} fill="url(#fr-shop)" />
    <rect x={0} y={G - 10} width={1920} height={160} fill="#6B4A36" /><rect x={0} y={G - 10} width={1920} height={160} fill="url(#fr-plank)" />
    <g transform="translate(240 260)">
      <rect x={0} y={0} width={620} height={660} rx={10} fill="url(#fr-woodg)" />
      {[0, 1, 2, 3].map((r) => <g key={r}><rect x={20} y={30 + r * 160} width={580} height={130} fill="#3E2A20" />
        {Array.from({ length: 13 }, (_, k) => { const i = r * 13 + k, h = 100 + ((i * 37) % 25), show = on(f, lerp(books, books + 40, i / 52), 6)
          return <g key={k} opacity={show}><rect x={30 + k * 44} y={160 + r * 160 - h} width={36} height={h} rx={4} fill={[C.terra, C.sage, C.skyD, C.gold, C.plum][i % 5]} /><rect x={30 + k * 44} y={160 + r * 160 - h + 16} width={36} height={8} fill="#fff" opacity={0.35} /></g> })}
        <rect x={0} y={160 + r * 160} width={620} height={14} fill={C.woodD} /></g>)}
    </g>
    <g transform={`translate(1240 ${G})`}><rect x={-300} y={-260} width={600} height={34} rx={8} fill="url(#fr-woodg)" /><rect x={-270} y={-226} width={28} height={226} fill={C.woodD} /><rect x={242} y={-226} width={28} height={226} fill={C.woodD} />
      <path d="M180 -260 L200 -380 L150 -400" stroke="#3A3046" strokeWidth={10} fill="none" /><path d="M110 -390 L190 -430 L210 -380 Z" fill={C.gold} /><ellipse cx={150} cy={-260} rx={140} ry={30} fill="#FFE7A6" opacity={0.35 + 0.05 * Math.sin(f / 9)} /></g>
  </g>
)

const Num1: React.FC<PieceProps> = ({ f, c }) => {
  const knowing = c('s8:knowing'), finish = c('s8:finish'), line8 = c('s8:line')
  const number9 = c('s9:number'), random = c('s9:random'), million9 = c('s9:million'), spend9 = c('s9:spend'), earn9 = c('s9:earn')
  const meet = c('s10:meet'), example = c('s10:example'), forty = c('s10:forty'), rent = c('s10:rent'), food = c('s10:food'), everything = c('s10:everything')
  const y1994 = c('s11:1994'), planner = c('s11:planner'), bengen = c('s11:bengen'), tested = c('s11:tested'), decades = c('s11:decades'), returns = c('s11:returns')
  const pile = c('s12:pile'), first12 = c('s12:first'), four12 = c('s12:four'), live = c('s12:live'), every12 = c('s12:every'), same = c('s12:same'), inflation = c('s12:inflation')
  const stretch = c('s13:stretch'), lasted = c('s13:lasted'), thirty13 = c('s13:thirty'), years13 = c('s13:years')
  const the14 = c('s14:the'), percent14 = c('s14:percent'), trinity = c('s14:trinity'), four14 = c('s14:four'), ninety = c('s14:ninety'), time14 = c('s14:time'), half14 = c('s14:half'), stocks = c('s14:stocks'), bonds = c('s14:bonds')

  const AB = c('s10') - 6, BC = c('s11') - 6, CD = c('s12') - 6, DE = c('s14') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = fadeIn(f, DE)

  // # D) yearly withdrawal sacks: year one at "four", the later ones (bigger) from "every" to "inflation"
  const sackAt = [four12, ...[1, 2, 3, 4].map((k) => lerp(every12, inflation, k / 4))]
  const ninetyFive = Array.from({ length: 100 }, (_, k) => k)
  const order = ninetyFive.slice().sort((a, b) => ((a * 61) % 101) - ((b * 61) % 101))
  const red = new Set(order.slice(95))

  return (
    <g>
      <Defs />
      {/* # A) the mountain and its finish line */}
      {A > 0 && <g opacity={A}>
        <Backdrop sky="day" f={f} sun={[300, 260]} ground={G} />
        <Mountain f={f} trailP={on(f, knowing - 10, 30)} flagT={1} flagO={on(f, finish, 10)} flagText={f >= number9 ? '$ ?' : undefined} />
        <circle cx={1540} cy={210} r={120} fill="url(#fr-sunglow)" opacity={win(f, c('s9:freedom'), c('s9:freedom') + 30, 8)} />
        <Tag x={1610} y={170} text="FINISH LINE" size={38} o={win(f, line8, number9, 8)} point="none" color={C.terra} ink="#fff" />
        <g opacity={win(f, random - 6, spend9 - 2, 8)} transform={`translate(${420 + 30 * span(f, random, million9 + 20)} ${520 - 40 * Math.sin(Math.PI * span(f, random, million9 + 20))}) rotate(${-10 + 20 * span(f, random, million9 + 20)})`}>
          <rect x={-190} y={-70} width={380} height={140} rx={16} fill={C.cream} stroke={C.goldD} strokeWidth={5} />
          <text y={26} textAnchor="middle" fill={C.ink} style={{ font: `400 80px ${FONT.big}` }}>$1,000,000?</text>
          <Cross x={0} y={0} r={120} p={on(f, million9 + 4, 12)} />
        </g>
        <g opacity={win(f, spend9 - 6, AB + 6, 8)}>
          <Sack x={360} y={G - 10} s={1.2} label="SPEND" /><Check x={440} y={G - 190} r={36} p={on(f, spend9 + 4, 8)} />
          <g opacity={on(f, earn9 - 4, 8)}><Envelope x={640} y={G - 110} s={0.9} text="EARN" /><Cross x={640} y={G - 110} r={110} p={on(f, earn9 + 4, 12)} /></g>
        </g>
      </g>}

      {/* # B) Maya and one year of spending */}
      {B > 0 && <g opacity={B}>
        <Backdrop sky="day" f={f} sun={[300, 260]} ground={G} />
        <Mountain f={f} flagT={1} flagText="$ ?" />
        <Person f={f} who="investorF" beats={[[0, 'waveA', 'smiling', 'waveB', 10], [example, 'present', 'smiling'], [forty, 'point', 'neutral'], [everything + 6, 'holdChest', 'smiling']]} x={250} y={G} s={0.95} />
        <Tag x={250} y={G - 560} text="MAYA · MADE-UP EXAMPLE" size={36} o={on(f, meet, 8)} />
        <g opacity={on(f, forty - 6, 10)} transform={`translate(560 ${G - 10}) scale(${0.9 + 0.1 * pop(f, forty, 14)})`}>
          <Sack x={0} y={0} s={1.5} />
          <Tag x={0} y={-270} text="$40,000 A YEAR" size={42} o={on(f, forty, 8)} />
        </g>
        {[[rent, 'home'], [food, 'food'], [everything, 'box']].map(([at, kind], k) => {
          const t = span(f, at as number, (at as number) + 16), x = lerp(820 + k * 90, 560, t), y = lerp(560, G - 120, t) - 120 * Math.sin(Math.PI * t)
          return f >= (at as number) - 4 && t < 1 ? <g key={k} opacity={on(f, (at as number) - 4, 6)} transform={`translate(${x} ${y}) scale(${1 - 0.4 * t})`}>
            {kind === 'home' && <g><rect x={-46} y={-36} width={92} height={70} fill={C.cream} /><path d="M-60 -30 L0 -80 L60 -30 Z" fill={C.terra} /><rect x={-12} y={0} width={24} height={34} fill={C.wood} /></g>}
            {kind === 'food' && <g><path d="M-50 -40 L50 -40 L40 40 L-40 40 Z" fill="#E0B070" /><circle cx={-18} cy={-50} r={20} fill={C.red} /><rect x={6} y={-80} width={18} height={50} rx={6} fill={C.sage} /></g>}
            {kind === 'box' && <g><rect x={-46} y={-40} width={92} height={80} rx={6} fill="#C9935E" /><rect x={-46} y={-40} width={92} height={18} fill="#B07A48" /><rect x={-8} y={-40} width={16} height={80} fill="#E8D0A8" /></g>}
          </g> : null })}
      </g>}

      {/* # C) 1994: a planner tests the idea against decades of real returns */}
      {Cc > 0 && <g opacity={Cc}>
        <Study f={f} books={decades - 30} />
        <Person f={f} who="investor" beats={[[0, 'read', 'thinking'], [tested, 'think', 'thinking'], [returns, 'explain', 'neutral']]} x={1180} y={G} s={0.95} />
        <Tag x={1180} y={G - 580} text="1994" size={56} o={on(f, y1994, 8)} color={C.gold} />
        <Tag x={1180} y={G - 500} text="WILLIAM BENGEN, FINANCIAL PLANNER" size={34} o={on(f, bengen, 8)} point="none" />
        <Tag x={550} y={G + 70} text="DECADES OF REAL STOCK & BOND RETURNS" size={36} o={on(f, decades, 8)} point="none" />
      </g>}

      {/* # D) the 4% idea: scoop a little each year, a bit more as prices rise; it lasted 33+ years */}
      {D > 0 && <g opacity={D}>
        <Backdrop sky="day" f={f} sun={[1700, 240]} ground={G} />
        <g opacity={on(f, CD, 10)} transform={`translate(400 ${G})`}>
          <path d="M-260 0 Q-200 -280 0 -300 Q200 -280 260 0 Z" fill="url(#fr-goldg)" />
          {Array.from({ length: 18 }, (_, k) => <CoinG key={k} x={-190 + (k % 6) * 76} y={-40 - Math.floor(k / 6) * 70 - (k % 2) * 14} s={0.8} />)}
          <path d={`M-60 ${-300} q 60 ${-40 * on(f, four12, 10)} 120 0`} fill="none" />
          <Tag x={0} y={-370} text="INVESTMENTS" size={40} o={on(f, c('s12:investments'), 8)} />
        </g>
        {sackAt.map((at, k) => { const t = span(f, at, at + 16), x = lerp(520, 760 + k * 220, t), y = lerp(G - 280, G - 10, t) - 160 * Math.sin(Math.PI * t), sz = 0.7 + 0.08 * k
          return f >= (k === 0 ? c('s12:first') : at) - 2 ? <g key={k} opacity={on(f, (k === 0 ? c('s12:first') : at) - 2, 6) * (1 - on(f, stretch - 4, 10))}><Sack x={x} y={y} s={sz} /><Tag x={760 + k * 220} y={G - 150 - 16 * k} text={k === 0 ? (f >= four12 ? 'YEAR 1: 4%' : 'YEAR 1') : `YEAR ${k + 1}`} size={30} o={k === 0 ? on(f, c('s12:first'), 6) : on(f, at + 16, 6)} point="none" /></g> : null })}
        <Tag x={1210} y={G + 70} text="SAME AMOUNT, RAISED FOR INFLATION" size={34} o={win(f, inflation - 4, stretch, 8)} point="none" />
        <g opacity={on(f, stretch - 4, 10)}>
          <g transform={`translate(1240 ${G - 160}) rotate(${180 * (1 - on(f, c('s13:tested'), 14))}) translate(-1240 ${-(G - 160)})`}><Hourglass x={1240} y={G - 20} sand={span(f, lasted, years13 + 20)} s={1.4} /></g>
          <Check x={1500} y={G - 520} r={34} p={on(f, c('s13:years'), 8)} />
          <Tag x={1240} y={G - 520} text="LASTED AT LEAST 33 YEARS" size={44} o={on(f, thirty13, 8)} color={C.cashD} ink="#fff" />
        </g>
      </g>}

      {/* # E) Trinity: 95 of 100 thirty-year runs lasted; half stocks, half bonds */}
      {E > 0 && <g opacity={E}>
        <Backdrop sky="day" f={f} sun={null} ground={G} />
        <Hall x={330} y={G} s={0.9} text="TRINITY UNIVERSITY" o={on(f, trinity - 4, 10)} />
        {ninetyFive.map((k) => { const col = k % 20, row = Math.floor(k / 20), appear = lerp(four14 - 6, ninety, (col + row * 4) / 35), lit = on(f, lerp(ninety, time14, order.indexOf(k) / 99), 6)
          return <g key={k} opacity={on(f, appear, 6)} transform={`translate(${720 + col * 54} ${330 + row * 82})`}>
            <path d="M-16 -30 L16 -30 L2 -2 L16 26 L-16 26 L-2 -2 Z" fill={red.has(k) ? (on(f, c('s14:of'), 6) > 0.5 ? C.red : '#C9CED8') : (lit > 0.5 ? C.cash : '#C9CED8')} />
          </g> })}
        <Tag x={1233} y={790} text="ABOUT 95 IN 100 LASTED 30 YEARS" size={42} o={on(f, c('s14:percent#2'), 8)} point="none" color={C.cashD} ink="#fff" />
        <g opacity={on(f, half14 - 4, 10)} transform={`translate(1233 ${G + 10})`}>
          <path d="M0 -60 A60 60 0 0 0 0 60 Z" fill={C.gold} /><path d="M0 -60 A60 60 0 0 1 0 60 Z" fill={C.skyD} opacity={on(f, bonds - 4, 8)} />
          <text x={-80} y={14} textAnchor="end" fill={C.ink} style={{ font: `400 40px ${FONT.big}` }} opacity={on(f, stocks, 8)}>STOCKS</text>
          <text x={80} y={14} fill={C.ink} style={{ font: `400 40px ${FONT.big}` }} opacity={on(f, bonds, 8)}>BONDS</text>
        </g>
      </g>}

      <Headline f={f} lines={[[knowing, 'STEP 1: FIND YOUR NUMBER', C.ink, 100], [spend9, 'IT COMES FROM WHAT YOU SPEND', C.terraD, 92], [meet, 'MEET MAYA', C.ink, 104], [y1994, 'A SIMPLE TEST', C.ink, 104],
        [pile, 'TAKE OUT 4% A YEAR', C.ink, 104], [stretch, 'IT LASTED 33+ YEARS', C.cashD, 104], [trinity, 'A LATER STUDY AGREED', C.ink, 100]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s9:freedom", "s8:line", "s12:investments", "s12:first", "s13:tested", "s13:years", "s14:lasted", "s14:thirty", "s14:percent#2", "s14:of", 's8:finish', 's9:number', 's9:random', 's9:million', 's9:spend', 's9:earn', 's10:meet', 's10:example', 's10:forty', 's10:rent', 's10:food', 's10:everything',
  's11:1994', 's11:planner', 's11:bengen', 's11:tested', 's11:decades', 's11:returns', 's12:pile', 's12:four', 's12:every', 's12:same', 's12:inflation',
  's13:stretch', 's13:lasted', 's13:thirty', 's14:trinity', 's14:four', 's14:ninety', 's14:percent', 's14:the', 's14:time', 's14:half', 's14:stocks', 's14:bonds']
export const FR_NUM1 = makePiece('fr-num1', 'Freedom step one (1): a mountain trail with the finish flag ($ ?); a tossed $1,000,000? sign crossed; SPEND sack ticked, EARN envelope crossed; Maya (made-up) with a $40,000-a-year sack that a home, groceries and a box drop into; 1994: Bengen in a study of record books; a pile of investments, 4% scooped into year-one sack, later sacks a bit bigger (inflation), hourglass LASTED AT LEAST 33 YEARS; Trinity University and 100 hourglasses, 95 turn green; half STOCKS, half BONDS coin', {
  mood: 'light', Component: Num1, beats: BEATS,
  sfx: [['s8:finish', 'chime', 0.18], ['s9:million', 'swish', 0.15], ['s10:forty', 'pop', 0.15], ['s12:four', 'coin', 0.18], ['s13:thirty', 'ding', 0.18], ['s14:ninety', 'pop', 0.15]] })
