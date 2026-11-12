// ---------------------------------------------------------------- s39–s46: how it reaches Sam — his credit card
// A) s39     Sam in his kitchen, holding his card: $4,200 owed.
// B) s40–42  a stack of three blocks builds up beside him: FED TOP 4% → + 3 → PRIME 7% → + MARGIN → SAM'S CARD;
//            when the Fed block rises, every block above rises with it.
// C) s43–44  a jar of interest coins: about $924 a year; one small coin drops in: + $10.50 (the September quarter point).
// D) s45–46  a timeline March 2022 → July 2023 with a climbing rate line (+5.25 points); the jar grows: + $220 a year.
import React from 'react'
import { lerp, on, span, easeInOut } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, Person } from '../aimoney/common'
import { Coin, CoinPile, CreditCard, F, FDefs, FGrain, FLOOR, Kitchen, Mark, Tag, cues, fadeIn, scene, FONT } from './kit'

const K = {
  sam39: 's39:sam', made39: 's39:made', four39: 's39:four', card39: 's39:card',
  price40: 's40:price', prime40: 's40:prime', seven40: 's40:seven', three40: 's40:three', top40: 's40:top',
  cards41: 's41:credit', margin41: 's41:margin',
  raises42: 's42:raises', goes42: 's42:goes', same42: 's42:same',
  twenty43: 's43:twenty', typical43: 's43:typical', interest43: 's43:interest', nine43: 's43:nine',
  quarter44: 's44:quarter', ten44: 's44:ten', small44: 's44:small',
  add45: 's45:add', march45: 's45:march', july45: 's45:july', five45: 's45:five',
  balance46: 's46:balance', two46: 's46:two', more46: 's46:more', year46: 's46:year',
}
const Block: React.FC<{ x: number; y: number; w: number; h: number; color: string; text: string; sub?: string; o?: number }> = ({ x, y, w, h, color, text, sub, o = 1 }) => o <= 0.01 ? null : (
  <g opacity={o}>
    <rect x={x - w / 2 + 6} y={y - h + 8} width={w} height={h} rx={14} fill="#000" opacity={0.12} />
    <rect x={x - w / 2} y={y - h} width={w} height={h} rx={14} fill={color} />
    <text x={x} y={y - h / 2 + (sub ? 0 : 16)} textAnchor="middle" fill="#fff" style={{ font: `400 46px ${FONT.big}`, letterSpacing: 2 }}>{text}</text>
    {sub && <text x={x} y={y - h / 2 + 46} textAnchor="middle" fill="#fff" opacity={0.9} style={{ font: `400 34px ${FONT.big}` }}>{sub}</text>}
  </g>
)

const You1: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s43') - 4, BC = c('s45') - 4
  const A = scene(f, -20, AB), Bs = scene(f, AB, BC), Cs = fadeIn(f, BC)
  const bump = 26 * on(f, t.raises42 - 2, 12)          // # the Fed block rises and lifts the rest
  const tl = easeInOut(span(f, t.march45 - 2, t.july45 + 14))
  return (
    <g>
      <FDefs />
      <Kitchen />
      <Person f={f} who="investor" beats={[[0, 'hold', 'neutral'], [t.prime40, 'present', 'thinking'], [t.goes42, 'shock', 'worried'], [t.twenty43, 'hold', 'worried'], [t.small44, 'shrug', 'neutral'], [t.add45, 'think', 'worried'], [t.more46, 'facepalm', 'worried']]} x={280} y={1060} s={0.82} />
      <Tag x={280} y={FLOOR + 120} text="SAM" size={40} bg={F.slate} o={on(f, t.sam39, 8)} />
      {/* ---------------- A–B) card and the block stack ---------------- */}
      {A > 0 && <g opacity={A}>
        <CreditCard x={720} y={lerp(520, 460, on(f, t.card39, 10))} s={0.85} r={-6} text="$4,200 OWED" o={on(f, t.four39 - 2, 8) * (1 - on(f, t.price40 - 2, 8))} />
        <g transform={`translate(0 ${-bump})`}>
          <Block x={1240} y={FLOOR + bump} w={420} h={130} color={F.slate} text="FED: TOP OF RANGE 4%" o={on(f, t.three40 - 4, 8)} />
          <Block x={1240} y={FLOOR - 150} w={420} h={130} color={F.copperD} text="PRIME 7%" sub="FED + 3" o={on(f, t.prime40 - 2, 8)} />
          <Block x={1240} y={FLOOR - 300} w={420} h={130} color={F.coral} text="SAM'S CARD" sub="PRIME + A MARGIN" o={on(f, t.margin41 - 2, 8)} />
        </g>
        <Tag x={1600} y={300} text="ALL MOVE TOGETHER" size={38} bg={F.coralD} o={on(f, t.same42, 8)} />
      </g>}

      {/* ---------------- C) the interest jar ---------------- */}
      {Bs > 0 && <g opacity={Bs}>
        <CreditCard x={720} y={460} s={0.7} r={-6} text="≈ 22%" />
        <Tag x={720} y={620} text="TYPICAL CARD RATE" size={34} bg={F.inkSoft} o={on(f, t.typical43, 8)} />
        <g transform="translate(1320 0)">
          <rect x={-200} y={FLOOR - 420} width={400} height={420} rx={40} fill="#fff" opacity={0.5} stroke={F.inkL} strokeWidth={6} />
          <CoinPile x={0} y={FLOOR - 30} n={lerp(0, 22, on(f, t.interest43, 24))} />
          <Tag x={0} y={FLOOR + 70} text="≈ $924 INTEREST A YEAR" size={40} bg={F.coralD} o={on(f, t.nine43, 8)} />
        </g>
        <Coin x={1320} y={lerp(300, FLOOR - 260, on(f, t.ten44 - 2, 14))} r={40} label="+$10.50" o={on(f, t.quarter44, 8)} />
        <Tag x={1320} y={300} text="SEPTEMBER: +0.25" size={36} bg={F.coral} o={on(f, t.quarter44, 8) * (1 - on(f, t.ten44, 8))} />
        <Tag x={1660} y={560} text="+$10.50 A YEAR" size={38} bg={F.coral} o={on(f, t.ten44 + 6, 8)} />
      </g>}

      {/* ---------------- D) moves add up ---------------- */}
      {Cs > 0 && <g opacity={Cs}>
        <g transform="translate(0 0)">
          <line x1={640} x2={1700} y1={760} y2={760} stroke={F.inkSoft} strokeWidth={4} />
          <Tag x={640} y={820} text="MARCH 2022" size={34} bg={F.slate} o={on(f, t.march45, 8)} />
          <Tag x={1700} y={820} text="JULY 2023" size={34} bg={F.slate} o={on(f, t.july45, 8)} />
          <path d={`M640 740 ${Array.from({ length: 16 }, (_, k) => { const u = (k + 1) / 16; return `L${lerp(640, 1700, u * tl)} ${740 - 330 * Math.min(1, u * tl * 1.2)}` }).join(' ')}`} stroke={F.coral} strokeWidth={12} fill="none" strokeLinejoin="round" />
          <Tag x={1350} y={330} text="FED +5.25 POINTS" size={44} bg={F.coral} o={on(f, t.five45, 8)} />
        </g>
        <Coin x={1000} y={560} r={80} label="+$220" o={on(f, t.two46 - 2, 8)} />
        <Tag x={1000} y={680} text="MORE EVERY YEAR" size={36} bg={F.coralD} o={on(f, t.year46 - 2, 8)} />
      </g>}

      <Headline f={f} lines={[[t.sam39, 'MEET SAM', F.ink, 116], [t.price40, 'THE PRIME RATE', F.ink, 116], [t.twenty43, 'WHAT IT COSTS SAM', F.ink, 112], [t.add45, 'MOVES ADD UP', F.coral, 116]]} />
      <Mark f={f} at={(EXTRA['fed-you1'] ?? []).map(c)} />
      <FGrain />
    </g>
  )
}

export const FD_YOU1 = makePiece('fed-you1', "How it reaches Sam: Sam in his kitchen holding a card, $4,200 owed; a stack of blocks — the Fed's top of range 4%, prime 7% (Fed + 3), Sam's card (prime + a margin) — that all rise together when the Fed block rises; a card at about 22%, a jar filling with about $924 of interest a year, a +$10.50 coin drops in for September's quarter point; a rate line climbing from March 2022 to July 2023, Fed +5.25 points, and a +$220 coin, more every year", {
  mood: 'light', Component: You1, beats: [...Object.values(K), ...(EXTRA['fed-you1'] ?? [])],
  sfx: [['s42:goes', 'riser', 0.08], ['s44:ten', 'coin', 0.1], ['s46:two', 'thud', 0.1]] })
