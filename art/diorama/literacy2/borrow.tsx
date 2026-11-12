// ---------------------------------------------------------------- s59–s70: BORROW — what 22% does to $800
// A) s59–s65 Jordan beside a glass DEBT TANK holding his $800. The card's rate (22% a year) on its side.
//            Step one: a red +$15 interest coin drops in. Step two: his $25 payment leaves the tank — $15 of it
//            cancels the red coin, only $10 lowers the level. Step three: the months tick (1 → 49, just over four
//            years) while the level crawls down. Then the bill: TOOTH $800 → TOTAL PAID $1,230, the extra $430 in red.
// B) s66     not all debt is the same: a house on a low-rate loan (it lasts) vs a shopping bag at 22% (gone next month).
// C) s67–s70 two ways out: three debts stacked twice. AVALANCHE — the arrow goes to the highest rate first;
//            SNOWBALL — to the smallest balance first, a check for the quick win. Then three empty digit boxes (a
//            three-digit number that follows him).
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Sweep } from '../literacy/kit2'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Defs } from '../literacy/kit'
import { Arrow, Calendar } from '../literacy/kit2'
import { Big, Card, Coin, FLOOR, House, L, LDefs, LGrain, Paper, Room, Tag, Tick, Tooth, cues, fadeIn, scene, FONT } from './kit'

const K = {
  average59: 's57:average', credit59: 's57:credit', twenty59: 's57:twenty', year59: 's57:year',
  jordan60: 's58:jordan', pays60: 's58:pays', twenty60: 's58:twenty', month60: 's58:month',
  step61: 's59:step', adds61: 's59:adds', interest61: 's59:interest', fifteen61: 's59:fifteen',
  step62: 's60:step', twenty62: 's60:twenty', pays62: 's60:pays', first62: 's60:first', ten62: 's60:ten', shrinks: 's60:shrinks',
  step63: 's61:step', repeat: 's61:repeat', pace: 's61:pace', four63: 's61:four', off63: 's61:off',
  eight64: 's62:eight', tooth64: 's62:tooth', costing: 's62:costing', one64: 's62:one',
  extra65: 's63:extra', four65: 's63:four', against65: 's63:against',
  debt66: 's64:debt', low66: 's64:low', home66: 's64:home', twenty66: 's64:twenty', gone66: 's64:gone',
  high67: 's65:high', two67: 's65:two', clear67: 's65:clear',
  both68: 's66:both', minimum68: 's66:minimum', avalanche: 's66:avalanche', extra68: 's66:extra', highest68: 's66:highest', saves68: 's66:saves',
  snowball: 's67:snowball', smallest69: 's67:smallest', quick69: 's67:quick', costs69: 's67:costs',
  jordan70: "s68:jordan's", interest70: 's68:interest', three70: 's68:three', number70: 's68:number', everywhere: 's68:everywhere',
}
// # example debts for the two methods (illustrative)
const DEBTS = [{ n: 'CARD A', rate: '22%', bal: '$800', w: 0.35 }, { n: 'CARD B', rate: '18%', bal: '$2,400', w: 1 }, { n: 'LOAN', rate: '7%', bal: '$300', w: 0.18 }]

const Tank: React.FC<{ x: number; y: number; level: number; o?: number; label: string }> = ({ x, y, level, o = 1, label }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <ellipse cx={0} cy={10} rx={220} ry={20} fill="#000" opacity={0.15} />
    <rect x={-190} y={-520} width={380} height={520} rx={40} fill="#E6F0F4" opacity={0.8} />
    <rect x={-170} y={-500 * level} width={340} height={500 * level - 10} rx={30} fill={L.terra} opacity={0.9} />
    <rect x={-170} y={-500 * level} width={340} height={22} rx={10} fill="#fff" opacity={0.35} />
    <rect x={-190} y={-520} width={380} height={520} rx={40} fill="none" stroke="#fff" strokeWidth={8} />
    <rect x={-120} y={-470} width={30} height={420} rx={15} fill="#fff" opacity={0.35} />
    <text x={0} y={-250} textAnchor="middle" fill={level > 0.45 ? "#fff" : L.terraD} style={{ font: `400 110px ${FONT.big}` }}>{label}</text>
    <text x={0} y={-570} textAnchor="middle" fill={L.terraD} style={{ font: `400 52px ${FONT.big}`, letterSpacing: 4 }}>DEBT</text>
  </g>
)
const Bag: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={150} ry={14} fill="#000" opacity={0.15} />
    <path d="M-60 -250 Q-60 -330 0 -330 Q60 -330 60 -250" stroke={L.terraD} strokeWidth={16} fill="none" />
    <path d="M-140 -260 L140 -260 L120 0 L-120 0 Z" fill={L.terra} /><rect x={-140} y={-260} width={280} height={30} fill={L.terraD} />
  </g>
)

const Borrow: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s64') - 6, BC = c('s65') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  // # tank level: 800 → (step 2) 790 → (step 3) crawls to 0 over "four years"
  const bal = 800 - 10 * on(f, t.ten62, 10) - 790 * span(f, t.repeat, t.off63 + 10)
  const lvl = bal / 900
  const months = Math.max(1, Math.min(49, Math.round(lerp(1, 49, span(f, t.repeat, t.off63 + 10)))))
  const showSteps = 1 - on(f, t.eight64 - 4, 8)
  // # step 1: the red coin drops in; step 2: the green coin leaves, red vanishes
  const redY = lerp(240, 360, on(f, t.adds61, 12)), redO = on(f, t.adds61 - 2, 6) * (1 - on(f, t.first62 + 4, 8))
  const greenX = lerp(1100, 1400, on(f, t.pays62, 12))

  return (
    <g>
      <Defs /><LDefs />
      {/* ---------------- A) the debt tank ---------------- */}
      {A > 0 && <g opacity={A}>
        <Paper />
        <Person f={f} who="investor" beats={[[0, 'idle', 'worried'], [t.pays60, 'offer', 'neutral'], [t.step61, 'nervous', 'worried'], [t.shrinks, 'scratchHead', 'thinking'], [t.four63, 'slump', 'worried'], [t.costing, 'shock', 'shocked'], [t.against65, 'facepalm', 'worried']]} x={300} y={1060} s={0.8} />
        <g opacity={showSteps}>
          <Tank x={960} y={FLOOR + 40} level={Math.max(0.02, lvl)} label={'$' + Math.round(bal)} o={on(f, t.average59 - 4, 8)} />
          <Card x={1500} y={420} s={0.6} r={6} text="22%" o={on(f, t.twenty59 - 2, 8) * (1 - on(f, t.step63 - 4, 8))} />
          <Tag x={1500} y={560} text="A YEAR" size={36} bg={L.terraD} o={on(f, t.year59, 8) * (1 - on(f, t.step61 - 4, 8))} />
          {/* step 1 */}
          <Coin x={960} y={redY} r={52} label="+$15" o={redO} />
          <Tag x={1500} y={600} text="STEP 1: +$15 INTEREST" size={40} bg={L.terraD} o={win(f, t.step61, t.step62, 8)} />
          {/* step 2: the payment */}
          <g opacity={win(f, t.twenty62 - 2, t.step63, 8)}>
            <Coin x={greenX} y={720} r={60} label="$25" />
            <Arrow x1={1150} y1={720} x2={1400} y2={720} p={span(f, t.pays62, t.pays62 + 10)} color={L.cashD} w={10} />
            <Tag x={1500} y={600} text="$15 PAYS THE INTEREST" size={36} bg={L.terraD} o={on(f, t.first62, 8)} />
            <Tag x={1500} y={850} text="ONLY $10 OFF THE DEBT" size={36} bg={L.cashD} o={on(f, t.ten62, 8)} />
          </g>
          {/* step 3: the months */}
          <g opacity={on(f, t.step63 - 2, 8)}>
            <Calendar x={1500} y={620} s={0.9} top="MONTH" big={String(months)} color={L.terraD} />
            <Tag x={1500} y={820} text="JUST OVER 4 YEARS" size={40} bg={L.ink} o={on(f, t.four63, 8)} />
          </g>
        </g>
        {/* the real price of the tooth */}
        <g opacity={on(f, t.eight64 - 2, 8)}>
          <Tooth x={820} y={600} s={0.9} crack={1} />
          <Tag x={820} y={820} text="TOOTH: $800" size={48} bg={L.inkSoft} />
          <Arrow x1={1010} y1={600} x2={1230} y2={600} p={span(f, t.costing, t.costing + 12)} color={L.ink} w={14} />
          <g opacity={on(f, t.one64 - 2, 8)}>
            <rect x={1260} y={430} width={480} height={360} rx={24} fill={L.creamL} stroke={L.terraD} strokeWidth={8} />
            <Big x={1500} y={520} text="TOTAL PAID" size={50} color={L.inkSoft} />
            <Big x={1500} y={660} text="$1,230" size={150} color={L.terraD} />
            <Tag x={1500} y={750} text="$430 IS INTEREST" size={40} bg={L.red} o={on(f, t.extra65, 8)} />
          </g>
        </g>
      </g>}

      {/* ---------------- B) not all debt is the same ---------------- */}
      {B > 0 && <g opacity={B}>
        <Room plant={false} />
        <House x={560} y={FLOOR} s={1.2} color={L.sageD} o={on(f, t.low66 - 4, 8)} />
        <Tag x={560} y={430} text="LOW RATE · LASTS YEARS" size={40} bg={L.sageD} o={on(f, t.home66, 8)} />
        <Bag x={1360} y={FLOOR} s={1.1} o={on(f, t.twenty66 - 4, 8)} />
        <Tag x={1360} y={430} text="22% · GONE NEXT MONTH" size={40} bg={L.terraD} o={on(f, t.gone66, 8)} />
        <text x={960} y={720} textAnchor="middle" fill={L.ink} style={{ font: `400 150px ${FONT.big}` }} opacity={on(f, t.twenty66, 8)}>≠</text>
      </g>}

      {/* ---------------- C) avalanche vs snowball ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Paper />
        <g opacity={1 - on(f, t.three70 - 4, 8)}>
          {[{ x: 560, name: 'AVALANCHE', at: t.avalanche, target: 0, why: 'HIGHEST RATE FIRST', whyAt: t.highest68, col: L.duskD },
            { x: 1360, name: 'SNOWBALL', at: t.snowball, target: 2, why: 'SMALLEST DEBT FIRST', whyAt: t.smallest69, col: L.sageD }].map((m) => (
            <g key={m.name} opacity={on(f, m.at - 4, 8)}>
              <Tag x={m.x} y={330} text={m.name} size={54} bg={m.col} />
              {DEBTS.map((d, k) => { const hit = k === m.target, y = 470 + k * 150
                return <g key={d.n}>
                  <rect x={m.x - 300} y={y - 55} width={600} height={110} rx={18} fill={hit && f > m.whyAt ? L.mustardL : L.creamL} stroke={hit && f > m.whyAt ? L.mustardD : L.creamD} strokeWidth={6} />
                  <text x={m.x - 270} y={y + 18} fill={L.ink} style={{ font: `400 52px ${FONT.big}` }}>{d.n}</text>
                  <text x={m.x + 30} y={y + 18} fill={L.terraD} style={{ font: `400 52px ${FONT.big}` }}>{d.rate}</text>
                  <text x={m.x + 270} y={y + 18} textAnchor="end" fill={L.inkSoft} style={{ font: `400 52px ${FONT.big}` }}>{d.bal}</text>
                </g> })}
              <Arrow x1={m.x - 420} y1={470 + m.target * 150} x2={m.x - 320} y2={470 + m.target * 150} p={span(f, m.whyAt, m.whyAt + 10)} color={L.ink} w={14} />
              <Tag x={m.x} y={960} text={m.why} size={42} bg={m.col} o={on(f, m.whyAt, 8)} />
            </g>))}
          <Tag x={960} y={250} text="EXAMPLE DEBTS" size={30} bg={L.inkSoft} o={on(f, t.avalanche - 4, 8)} />
          <Tag x={960} y={900} text="MINIMUM ON EVERY DEBT" size={38} bg={L.inkSoft} o={win(f, t.minimum68, t.avalanche + 10, 8)} />
          <Tag x={560} y={890} text="SAVES THE MOST" size={36} bg={L.cashD} o={on(f, t.saves68, 8)} />
          <Tick x={1700} y={770} r={44} p={on(f, t.quick69, 8)} />
          <Tag x={1360} y={890} text="QUICK WINS" size={36} bg={L.cashD} o={on(f, t.quick69, 8)} />
        </g>
        <g opacity={on(f, t.three70 - 2, 8)}>
          {[0, 1, 2].map((k) => <g key={k}><rect x={660 + k * 220} y={420} width={180} height={240} rx={20} fill={L.creamL} stroke={L.ink} strokeWidth={8} />
            <text x={750 + k * 220} y={600} textAnchor="middle" fill={L.inkSoft} style={{ font: `400 160px ${FONT.big}` }} opacity={on(f, t.number70 + k * 3, 6)}>?</text></g>)}
          <Tag x={960} y={780} text="FOLLOWS HIM EVERYWHERE" size={44} bg={L.terraD} o={on(f, t.everywhere, 8)} />
        </g>
      </g>}

      <Headline f={f} lines={[[t.average59, 'JORDAN’S $800 AT 22%', L.terraD, 104], [t.eight64, 'THE REAL PRICE', L.terraD, 110], [t.debt66, 'NOT ALL DEBT IS THE SAME', L.ink, 100], [t.high67, 'TWO WAYS TO CLEAR IT', L.ink, 104],
        [t.jordan70, 'A THREE-DIGIT NUMBER', L.ink, 104]]} />
      <Sweep f={f} at={(EXTRA['ll-borrow'] ?? []).map(c)} />
      <LGrain />
    </g>
  )
}

export const LL_BORROW = makePiece('ll-borrow', "Borrow: Jordan beside a glass DEBT tank holding $800, his card at 22% a year; step one a red +$15 interest coin drops in; step two his $25 payment leaves — $15 pays the interest, only $10 comes off; step three the month counter runs 1 to 49 (just over four years) as the level crawls down; the tooth $800 → total paid $1,230, $430 of it interest; a house on a low-rate loan (lasts years) ≠ a shopping bag at 22% (gone next month); two ways out with three example debts — avalanche points at the highest rate first (saves the most), snowball at the smallest debt first (quick wins), minimums on every debt; three blank digit boxes with question marks — a number that follows him everywhere", {
  mood: 'light', Component: Borrow, beats: [...Object.values(K), ...(EXTRA['ll-borrow'] ?? [])],
  sfx: [['s59:adds', 'pop', 0.12], ['s60:pays', 'swish', 0.1], ['s62:one', 'thud', 0.14], ['s66:avalanche', 'pop', 0.1], ['s67:snowball', 'pop', 0.1], ['s68:number', 'ding', 0.12]] })
