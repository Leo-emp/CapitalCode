// ---------------------------------------------------------------- s9–s23: step one, find your number.
// A) Dusk rooftop: a finish ribbon with a "$ ?" pennant (s9); Leo (made-up, 27, a 9-to-5) (s10); home, food and a plane fly into a price tag $60,000 A YEAR (s11);
//    an empty jar with a "?" for the pile he needs (s12).
// B) 1994: Bengen's desk with tall ledgers and a stock/bond chart (s13); a jar, 4% scooped into YEAR 1, later envelopes a bit bigger (s14); calendar pages flip to 33 + tick (s15).
// C) Trinity University: 100 runs, 95 light green (s16).
// D) Flip it: one year envelope x 25 stacks into the jar = $1,500,000 (s17–s19); 4% back out = $60,000, the home, food and plane under it (s20).
// E) Leo's thumb up (rule of thumb), a promise scroll crossed, a misty road ahead, a clear flag (s21); a ball-and-chain crossed, a price tag on the home (s22);
//    the viewer's own sum: your life x 25 = your jar (s23).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { C, Check, City, Cross, Defs, Envelope, FONT, Grain, Jar, Tag, fadeIn, scene } from './kit'

const G = 930
const Home: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><rect x={-90} y={-120} width={180} height={120} fill={C.cream} /><path d="M-110 -110 L0 -200 L110 -110 Z" fill={C.brick} /><rect x={-22} y={-70} width={44} height={70} fill={C.bark} /><rect x={40} y={-96} width={36} height={32} fill={C.sunL} /><rect x={-76} y={-96} width={36} height={32} fill={C.sunL} /></g>
const Food: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><path d="M-70 -90 L70 -90 L56 0 L-56 0 Z" fill="#E0B070" /><circle cx={-30} cy={-104} r={28} fill={C.red} /><rect x={6} y={-150} width={24} height={70} rx={8} fill={C.leaf} /><circle cx={44} cy={-100} r={20} fill={C.amber} /></g>
const Plane: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${s}) rotate(-12)`}><path d="M-110 0 Q-110 -18 -80 -18 L90 -18 Q120 -18 130 0 Q120 18 90 18 L-80 18 Q-110 18 -110 0 Z" fill="#F4F6FA" /><path d="M-10 -14 L-60 -90 L-30 -90 L40 -14 Z M-10 14 L-60 90 L-30 90 L40 14 Z" fill="#C7D3E6" /><path d="M-100 -10 L-130 -60 L-110 -60 L-80 -12 Z" fill={C.teal} /></g>
// # a hanging price tag with a string
const PriceTag: React.FC<{ x: number; y: number; text: string; s?: number; o?: number; r?: number }> = ({ x, y, text, s = 1, o = 1, r = -6 }) => (
  <g opacity={o} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M-170 -60 L130 -60 L190 0 L130 60 L-170 60 Z" fill={C.paper} stroke={C.brassD} strokeWidth={5} /><circle cx={140} cy={0} r={12} fill={C.brassD} />
    <path d="M140 0 Q200 -80 160 -140" stroke={C.brassD} strokeWidth={4} fill="none" />
    <text x={-20} y={20} textAnchor="middle" fill={C.ink} style={{ font: `400 58px ${FONT.big}` }}>{text}</text>
  </g>
)
// # the 1994 study: warm wall, a board with two rising lines (stocks, bonds), tall ledgers, a desk
const Study: React.FC<{ f: number; books: number; lines: number }> = ({ f, books, lines }) => (
  <g>
    <rect width={1920} height={1080} fill="url(#ff-room)" />
    <rect x={0} y={G - 8} width={1920} height={160} fill="#9C7556" /><rect x={0} y={G - 8} width={1920} height={160} fill="url(#ff-tiles)" />
    <g transform="translate(180 280)">
      <rect x={0} y={0} width={640} height={380} rx={14} fill="#2F3A5A" /><rect x={14} y={14} width={612} height={352} rx={8} fill="#3A4868" />
      <path d="M50 320 L150 280 L230 300 L330 210 L420 230 L520 120 L600 80" fill="none" stroke={C.gold} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={`${lines} 1`} />
      <path d="M50 320 L160 300 L260 290 L360 260 L460 250 L600 220" fill="none" stroke={C.tealL} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={`${lines} 1`} />
      <text x={40} y={60} fill={C.gold} style={{ font: `400 40px ${FONT.big}` }} opacity={lines}>STOCKS</text>
      <text x={40} y={104} fill={C.tealL} style={{ font: `400 40px ${FONT.big}` }} opacity={lines}>BONDS</text>
    </g>
    {Array.from({ length: 9 }, (_, k) => <g key={k} opacity={on(f, books + k * 3, 6)}><rect x={1480 + (k % 3) * 70} y={G - 40 - Math.floor(k / 3) * 120 - 100} width={60} height={110} rx={4} fill={[C.brick, C.teal, C.violet][k % 3]} /><rect x={1480 + (k % 3) * 70} y={G - 40 - Math.floor(k / 3) * 120 - 80} width={60} height={10} fill="#fff" opacity={0.3} /></g>)}
    <g transform={`translate(1060 ${G})`}><rect x={-260} y={-250} width={520} height={30} rx={8} fill="#7A5235" /><rect x={-240} y={-220} width={24} height={220} fill="#5E4026" /><rect x={216} y={-220} width={24} height={220} fill="#5E4026" />
      <rect x={-200} y={-290} width={160} height={40} rx={4} fill={C.paper} /><rect x={-190} y={-310} width={140} height={22} rx={4} fill="#E4D3B2" /></g>
  </g>
)

const Num: React.FC<PieceProps> = ({ f, c }) => {
  const knowing = c('s9:knowing'), finish = c('s9:finish')
  const meet = c('s10:meet'), twenty10 = c('s10:twenty'), nine10 = c('s10:nine'), example = c('s10:example')
  const home = c('s11:home'), food = c('s11:food'), trips = c('s11:trips'), sixty11 = c('s11:sixty'), year11 = c('s11:year')
  const pile12 = c('s12:pile'), rest = c('s12:rest')
  const y1994 = c('s13:in') + 6, back13 = c('s13:back'), life12 = c('s12:life'), pay12 = c('s12:pay'), bengen = c('s13:bengen'), tested = c('s13:tested'), stock = c('s13:stock'), decades = c('s13:decades')
  const first14 = c('s14:first'), four14 = c('s14:four'), every14 = c('s14:every'), inflation = c('s14:inflation')
  const stretch = c('s15:stretch'), lasted15 = c('s15:lasted'), thirty15 = c('s15:thirty'), years15 = c('s15:years')
  const trinity = c('s16:trinity'), lasted16 = c('s16:lasted'), ninety = c('s16:ninety'), time16 = c('s16:time')
  const flip = c('s17:flip'), four17 = c('s17:four'), pays = c('s17:pays'), pile17 = c('s17:pile#2'), twenty17 = c('s17:twenty'), times17 = c('s17:times')
  const number18 = c('s18:number'), times18 = c('s18:times')
  const sixty19 = c('s19:sixty'), times19 = c('s19:times'), million19 = c('s19:million')
  const four20 = c('s20:four'), sixty20 = c('s20:sixty'), whole20 = c('s20:whole'), paid20 = c('s20:paid')
  const rule = c('s21:rule'), thumb = c('s21:thumb'), promise = c('s21:promise'), future = c('s21:future'), worse = c('s21:worse'), clear = c('s21:clear')
  const notice = c('s22:notice'), punishment = c('s22:punishment'), price = c('s22:price'), tag22 = c('s22:tag')
  const tryy = c('s23:try'), life23 = c('s23:life'), times23 = c('s23:times'), twenty23 = c('s23:twenty')

  const AB = c('s13') - 6, BC = c('s16') - 6, CD = c('s17') - 6, DE = c('s21') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = fadeIn(f, DE)
  const order = Array.from({ length: 100 }, (_, k) => k).sort((a, b) => ((a * 61) % 101) - ((b * 61) % 101)), red = new Set(order.slice(95))
  // # D) 25 year-envelopes fly into the jar between "twenty" (s17) and "million" (s19)
  const flyAt = (k: number) => lerp(twenty17, sixty19, k / 24)

  return (
    <g>
      <Defs />
      {/* # A) the rooftop at dusk */}
      {A > 0 && <g opacity={A}>
        <City sky="dusk" f={f} sun={[1640, 320]} ground={G} />
        <g opacity={on(f, finish - 6, 10)}>
          <rect x={1340} y={G - 330} width={12} height={330} fill={C.bark} /><rect x={1760} y={G - 330} width={12} height={330} fill={C.bark} />
          <path d={`M1352 ${G - 300} Q1556 ${G - 270 + 8 * Math.sin(f / 9)} 1760 ${G - 300}`} stroke={C.sun} strokeWidth={16} fill="none" />
          <g transform={`translate(1556 ${G - 290})`}><path d="M-60 0 L60 0 L0 90 Z" fill={C.red} /><text y={46} textAnchor="middle" fill="#fff" style={{ font: `400 44px ${FONT.big}` }}>$ ?</text></g>
        </g>
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [meet, 'waveA', 'smiling', 'waveB', 10], [example, 'present', 'smiling'], [c('s11:life'), 'holdChest', 'smiling'], [sixty11, 'point', 'neutral'], [pile12, 'think', 'thinking']]} x={380} y={G} s={0.95} />
        <Tag x={380} y={G - 570} text="LEO, 27 · MADE-UP EXAMPLE" size={36} o={on(f, meet, 8)} />
        <Tag x={380} y={G + 70} text="A REGULAR 9 TO 5" size={34} o={win(f, nine10, home - 4, 8)} point="none" />
        {[[home, 'home'], [food, 'food'], [trips, 'plane']].map(([at, kind], k) => {
          const t = span(f, at as number, (at as number) + 18), x = lerp(700 + k * 260, 960, t), y = lerp(G - 120, G - 330, t)
          return f >= (at as number) - 4 && f < sixty11 + 6 ? <g key={k} opacity={on(f, (at as number) - 4, 6) * (1 - on(f, sixty11, 6))} transform={`translate(${x} ${y}) scale(${1 - 0.5 * t})`}>
            {kind === 'home' ? <Home x={0} y={60} /> : kind === 'food' ? <Food x={0} y={60} /> : <Plane x={0} y={0} />}</g> : null })}
        <g opacity={win(f, sixty11 - 4, pile12 - 2, 8)} transform={`translate(960 ${G - 330}) scale(${0.9 + 0.1 * pop(f, sixty11, 14)})`}><PriceTag x={0} y={0} text="$60,000 A YEAR" /></g>
        <Tag x={960} y={G - 180} text="THE LIFE HE WANTS" size={36} o={win(f, sixty11, pile12 - 2, 8)} point="none" />
        <g opacity={on(f, pile12 - 4, 10)}><Jar x={960} y={G} level={0} s={0.95} /><text x={960} y={G - 110} textAnchor="middle" fill={C.cream} style={{ font: `400 150px ${FONT.big}` }}>?</text></g>
        {f >= pay12 && f < pay12 + 24 && <g transform={`translate(${lerp(960, 420, span(f, pay12, pay12 + 22))} ${G - 330 - 120 * Math.sin(Math.PI * span(f, pay12, pay12 + 22))}) scale(0.5)`}><Envelope x={0} y={0} text="$" /></g>}
        <Tag x={960} y={G - 380} text="EVERY YEAR, FOR LIFE" size={36} o={on(f, rest, 8)} point="none" />
        <Check x={1120} y={G - 300} r={0.01 + 36 * on(f, life12, 8)} p={on(f, life12, 8)} />
      </g>}

      {/* # B) 1994: Bengen's test */}
      {B > 0 && <g opacity={B}>
        <Study f={f} books={decades - 20} lines={span(f, stock, decades + 20)} />
        <g opacity={1 - on(f, c('s14:test') - 4, 10)}>
          <Person f={f} who="buyer" o={on(f, back13, 10)} beats={[[0, 'read', 'thinking'], [tested, 'think', 'thinking'], [decades, 'explain', 'neutral']]} x={1060} y={G} s={0.92} />
          <Tag x={1060} y={G - 560} text={f >= c('s13:william') ? '1994 · WILLIAM BENGEN' : '1994'} size={36} o={on(f, y1994, 8)} />
          <Tag x={1060} y={G + 60} text="A FINANCIAL PLANNER" size={34} o={win(f, c('s13:planner'), decades, 8)} point="none" />
        </g>
        <g opacity={on(f, c('s14:test') - 4, 10) * (1 - on(f, stretch - 6, 10))}>
          <rect x={0} y={0} width={1920} height={1080} fill="url(#ff-room)" />
          <Jar x={420} y={G} level={0.85} s={1} label="THE PILE" />
          {[0, 1, 2, 3, 4].map((k) => { const at = k === 0 ? four14 : lerp(every14, inflation, k / 4), t = span(f, at, at + 16), tx = 820 + k * 230
            return f >= at - 2 ? <g key={k} opacity={on(f, at - 2, 6)}><g transform={`translate(${lerp(420, tx, t)} ${lerp(G - 360, G - 110, t) - 140 * Math.sin(Math.PI * t)}) scale(${0.62 + 0.06 * k})`}><Envelope x={0} y={0} text="$" /></g>
              <Tag x={tx} y={G + 40} text={k === 0 ? 'YEAR 1: 4%' : `YEAR ${k + 1}`} size={32} o={on(f, at + 14, 6)} point="none" /></g> : null })}
          <Tag x={1280} y={G - 330} text={f >= inflation ? 'SAME AMOUNT + INFLATION' : 'SAME AMOUNT'} size={38} o={on(f, c('s14:same'), 8)} point="none" />
        </g>
        <g opacity={on(f, stretch - 6, 10)}>
          <rect x={0} y={0} width={1920} height={1080} fill="url(#ff-room)" />
          <g transform={`translate(960 ${G - 60})`}>
            <rect x={-200} y={-420} width={400} height={420} rx={20} fill="#FFFFFF" /><rect x={-200} y={-420} width={400} height={90} rx={20} fill={C.red} />
            {[-120, 120].map((rx) => <rect key={rx} x={rx - 10} y={-450} width={20} height={60} rx={8} fill={C.ink} />)}
            <text y={-110} textAnchor="middle" fill={C.ink} style={{ font: `400 220px ${FONT.big}` }}>{Math.min(33, Math.max(1, Math.round(lerp(1, 33, span(f, lasted15, thirty15 + 6)))))}</text>
            <text y={-30} textAnchor="middle" fill={C.inkSoft} style={{ font: `400 48px ${FONT.big}` }}>YEARS</text>
          </g>
          <Check x={1220} y={G - 420} r={48} p={on(f, years15, 8)} />
          <Tag x={960} y={G + 60} text="LASTED AT LEAST 33 YEARS" size={44} o={on(f, thirty15, 8)} point="none" color={C.cashD} ink="#fff" />
        </g>
      </g>}

      {/* # C) Trinity: 95 of 100 thirty-year runs lasted */}
      {Cc > 0 && <g opacity={Cc}>
        <City sky="dawn" f={f} ground={G} />
        {Array.from({ length: 100 }, (_, k) => { const col = k % 20, row = Math.floor(k / 20), lit = on(f, lerp(ninety, time16, order.indexOf(k) / 99), 6)
          return <g key={k} opacity={on(f, lerp(trinity, lasted16, (col + row * 4) / 35), 6)} transform={`translate(${420 + col * 57} ${380 + row * 84})`}>
            <circle r={22} fill={red.has(k) ? (f >= time16 ? C.red : '#D9D2E2') : (lit > 0.5 ? C.cash : '#D9D2E2')} stroke="#fff" strokeWidth={4} /></g> })}
        <Tag x={960} y={G - 30} text="ABOUT 95 IN 100 LASTED 30 YEARS" size={44} o={on(f, ninety, 8)} point="none" color={C.cashD} ink="#fff" />
        <Tag x={960} y={300} text="TRINITY UNIVERSITY STUDY" size={36} o={on(f, trinity, 8)} point="none" />
      </g>}

      {/* # D) flip it: x25 */}
      {D > 0 && <g opacity={D}>
        <City sky="day" f={f} sun={[1700, 260]} ground={G} />
        <g opacity={1 - on(f, four20 - 6, 8)}>
          <g opacity={on(f, flip - 4, 8)} transform={`translate(520 ${G - 340}) scale(${0.95 + 0.05 * pop(f, pays, 12) + 0.1 * pop(f, c('s18:yearly'), 14)})`}><Envelope x={0} y={0} text="1 YEAR" /></g>
          <Tag x={520} y={G - 480} text="4% = ONE YEAR" size={38} o={win(f, four17, twenty17, 8)} />
          {Array.from({ length: 25 }, (_, k) => { const at = flyAt(k), t = span(f, at, at + 14)
            return f >= at - 1 && t < 1 ? <g key={k} transform={`translate(${lerp(520, 1240, t)} ${lerp(G - 340, G - 200, t) - 160 * Math.sin(Math.PI * t)}) scale(${0.5 - 0.2 * t})`}><Envelope x={0} y={0} text="$" /></g> : null })}
          <Jar x={1240} y={G} level={span(f, twenty17, sixty19 + 14)} s={1.05} />
          <Tag x={1240} y={G - 410} text={f >= million19 ? '$1,500,000' : `x ${Math.max(1, Math.min(25, Math.ceil(span(f, twenty17, sixty19 + 8) * 25)))}`} size={f >= million19 ? 60 : 50} o={on(f, twenty17, 8)} color={f >= million19 ? C.sun : C.cream} />
          <Tag x={520} y={G + 60} text="YOUR NUMBER = LIFE x 25" size={40} o={on(f, number18, 8)} point="none" />
          <Tag x={520} y={G - 200} text="$60,000 x 25" size={44} o={on(f, sixty19, 8)} point="none" />
        </g>
        <g opacity={on(f, four20 - 6, 8)}>
          <Jar x={420} y={G} level={1} s={1} label="$1.5M" />
          <g opacity={on(f, four20, 8)} transform={`translate(${lerp(420, 900, span(f, four20, sixty20))} ${G - 380 - 100 * Math.sin(Math.PI * span(f, four20, sixty20))})`}><Envelope x={0} y={0} text="$60,000" /></g>
          <Tag x={900} y={G - 520} text="4% = $60,000" size={46} o={on(f, sixty20, 8)} color={C.sun} />
          <Home x={1260} y={G} s={0.9} o={on(f, whole20 - 2, 8)} /><Food x={1500} y={G} s={0.9} o={on(f, whole20 + 4, 8)} /><Plane x={1720} y={G - 120} s={0.8} o={on(f, whole20 + 10, 8)} />
          <Tag x={1490} y={G - 330} text="HIS WHOLE LIFE, PAID FOR" size={40} o={on(f, paid20, 8)} color={C.cash} ink="#fff" />
        </g>
      </g>}

      {/* # E) rule of thumb, a price tag, and your own number */}
      {E > 0 && <g opacity={E}>
        <City sky="day" f={f} sun={[1700, 260]} ground={G} />
        <g opacity={1 - on(f, notice - 6, 10)}>
          <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [thumb - 6, 'thumbsUp', 'smiling'], [future, 'lookFar', 'thinking'], [clear, 'pointUp', 'smiling']]} x={380} y={G} s={0.95} />
          <Tag x={380} y={G - 570} text="A RULE OF THUMB" size={38} o={on(f, rule, 8)} />
          <g opacity={win(f, promise - 4, future - 2, 8)} transform={`translate(960 ${G - 300})`}>
            <rect x={-150} y={-180} width={300} height={360} rx={12} fill={C.paper} />{[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-110} y={-130 + k * 56} width={220 - (k % 2) * 60} height={14} rx={7} fill={C.stoneD} />)}
            <Cross x={0} y={0} r={130} p={on(f, promise + 2, 12)} />
          </g>
          <g opacity={on(f, future - 4, 10)}>
            <path d={`M700 ${G + 60} Q1200 ${G - 80} 1560 ${G - 200}`} stroke={C.paper} strokeWidth={60} fill="none" strokeLinecap="round" />
            <ellipse cx={1240} cy={G - 160} rx={360} ry={130} fill="#fff" opacity={0.6 * on(f, worse - 4, 10)} />
            <g opacity={on(f, clear - 4, 8)} transform={`translate(1560 ${G - 200})`}><rect x={-5} y={-200} width={10} height={200} fill={C.bark} /><path d="M5 -200 L130 -170 L5 -140 Z" fill={C.red} /></g>
            <Tag x={1240} y={G + 60} text="THE FUTURE CAN BE WORSE THAN THE PAST" size={34} o={win(f, c('s21:past'), clear, 8)} point="none" />
            <Tag x={1560} y={G - 450} text="A CLEAR FINISH LINE" size={38} o={on(f, clear, 8)} color={C.sun} />
          </g>
        </g>
        <g opacity={win(f, notice - 6, tryy - 4, 10)}>
          <g opacity={win(f, punishment - 8, price - 4, 8)} transform={`translate(560 ${G - 120})`}>
            <circle cx={0} cy={0} r={80} fill="#3A3F55" /><circle cx={-24} cy={-24} r={20} fill="#fff" opacity={0.15} />
            {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={-110 - k * 50} cy={-40 - k * 26} rx={26} ry={16} fill="none" stroke="#3A3F55" strokeWidth={10} />)}
            <Cross x={0} y={-30} r={130} p={on(f, punishment + 2, 12)} />
          </g>
          <Jar x={1240} y={G} level={0.9} s={0.9} label="$1.5M" o={win(f, c('s22:number'), price - 6, 8)} />
          <Home x={1240} y={G} s={1.5} o={on(f, price - 6, 8)} />
          <g opacity={on(f, price, 8)}><PriceTag x={1500} y={G - 420} text="$60,000 A YEAR" s={0.85} r={8} /></g>
          <Tag x={1240} y={G + 60} text="THE PRICE TAG OF THE LIFE HE WANTS" size={36} o={on(f, tag22, 8)} point="none" />
        </g>
        <g opacity={on(f, tryy - 6, 10)}>
          <Home x={330} y={G - 40} s={0.8} o={on(f, c('s23:yearly') - 2, 6)} /><Food x={540} y={G - 40} s={0.8} o={on(f, life23, 6)} /><Plane x={720} y={G - 160} s={0.6} o={on(f, life23 + 4, 6)} />
          <text x={960} y={G - 150} textAnchor="middle" fill={C.ink} style={{ font: `400 130px ${FONT.big}` }} opacity={on(f, times23, 8)}>x 25</text>
          <Jar x={1440} y={G} level={span(f, twenty23, twenty23 + 30)} s={1} />
          <Tag x={1440} y={G - 410} text="YOUR NUMBER" size={46} o={on(f, twenty23 + 6, 8)} color={C.sun} />
          <Tag x={530} y={G + 60} text="THE LIFE YOU WANT, A YEAR" size={36} o={on(f, life23, 8)} point="none" />
        </g>
      </g>}

      <Headline f={f} lines={[[knowing, 'STEP 1: FIND YOUR NUMBER', C.cream, 100], [meet, 'MEET LEO', C.cream, 104], [pile12, 'HOW BIG A PILE?', C.cream, 104], [y1994, 'A SIMPLE TEST', C.ink, 104],
        [first14, 'TAKE OUT 4% A YEAR', C.ink, 104], [stretch, 'IT LASTED 33+ YEARS', C.cashD, 104], [trinity, 'A LATER STUDY AGREED', C.ink, 100], [flip, 'NOW FLIP IT AROUND', C.ink, 104],
        [number18, 'YOUR NUMBER', C.ink, 108], [four20, '4% PAYS HIS YEAR', C.ink, 104], [rule, 'A RULE OF THUMB, NOT A PROMISE', C.ink, 92], [notice, 'NOT A PUNISHMENT', C.ink, 104], [tryy, 'TRY IT YOURSELF', C.ink, 104]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s11:life", "s14:test", "s23:yearly", "s14:same", "s18:yearly", "s21:past", "s22:number", "s13:william", "s13:planner", "s12:pay", "s12:life", "s13:back", 's9:knowing', 's9:finish', 's10:meet', 's10:twenty', 's10:nine', 's10:example', 's11:home', 's11:food', 's11:trips', 's11:sixty', 's11:year', 's12:pile', 's12:rest',
  's13:bengen', 's13:tested', 's13:stock', 's13:decades', 's14:first', 's14:four', 's14:every', 's14:inflation', 's15:stretch', 's15:lasted', 's15:thirty', 's15:years',
  's16:trinity', 's16:lasted', 's16:ninety', 's16:time', 's17:flip', 's17:four', 's17:pays', 's17:pile#2', 's17:twenty', 's17:times', 's18:number', 's18:times', 's19:sixty', 's19:times', 's19:million',
  's20:four', 's20:sixty', 's20:whole', 's20:paid', 's21:rule', 's21:thumb', 's21:promise', 's21:future', 's21:worse', 's21:clear', 's22:notice', 's22:punishment', 's22:price', 's22:tag',
  's23:try', 's23:life', 's23:times', 's23:twenty']
export const FF_NUMBER = makePiece('ff-number', 'Freedom step one: a dusk rooftop finish ribbon with a $ ? pennant; Leo (LEO, 27 · MADE-UP EXAMPLE, A REGULAR 9 TO 5); home, food and a plane fly into a $60,000 A YEAR price tag (THE LIFE HE WANTS); an empty jar with a ?; 1994 Bengen at a desk with a stocks/bonds board and ledgers; a jar, 4% into YEAR 1 then slightly bigger envelopes (SAME AMOUNT + INFLATION); a calendar counts to 33 (LASTED AT LEAST 33 YEARS); Trinity: 100 dots, 95 green; one year envelope x 25 fills a jar to $1,500,000; 4% = $60,000 over home, food, plane (HIS WHOLE LIFE, PAID FOR); thumb up, promise scroll crossed, misty road, clear flag; ball and chain crossed, price tag on the home; your life x 25 = YOUR NUMBER', {
  mood: 'light', Component: Num, beats: BEATS,
  sfx: [['s9:finish', 'chime', 0.15], ['s11:sixty', 'pop', 0.15], ['s14:four', 'coin', 0.18], ['s15:thirty', 'ding', 0.18], ['s16:ninety', 'pop', 0.12], ['s19:million', 'chime', 0.2], ['s20:sixty', 'coin', 0.18], ['s21:promise', 'swish', 0.12], ['s23:twenty', 'ding', 0.15]] })
