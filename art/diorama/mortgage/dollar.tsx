// ---------------------------------------------------------------- s35–s49: step three, where every dollar goes (the park).
// A) A park at sunset. A big canvas sack STILL OWED: $334,000 sits on the grass; a month clock ticks. Your $2,263
//    payment (a split bar) lands: $1,998 brick-red goes to the lender's coin box, only $264 sage chips the sack.
//    Month two: the sack is a hair smaller, $1,997 vs $266 ("just 2 dollars better"). Why: the bar stays the same
//    width while the red part shrinks with the sack — "whatever is left over" glows sage.
// B) The seesaw: red INTEREST coins on the left, sage HOME bricks on the right; interest sits heavy and low, then
//    payment by payment it tips. A year sign counts. After 5 years: PAID OFF $19,000 vs INTEREST $117,000. After 10
//    years: STILL OWED $288,000. Year 21: the seesaw tips past level.
// C) Two towers on the lawn: BORROWED $334,000 (gold) next to INTEREST $480,000 (brick, taller), total $815,000 on top.
//    The caveat: a ribbon "IF YOU KEEP IT ALL 30 YEARS"; little SOLD and REFINANCE signs pop in ("many people").
//    Last: an hourglass, THE REAL COST OF BORROWING FOR A LONG TIME.
import React from 'react'
import { clamp01, lerp, on, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Brick, BRICK, BRICKD, Bush, Coins, CREAM, Fence, GOLD, GOLDD, Ground, Hills, INK, SAGE, SAGED, Seesaw, Sky, Tree, YardSign } from './kit'

const K = {
  goes35: 's35:goes',
  remember: 's36:remember', why36: "s36:why", interest36: 's36:interest',
  month37: 's37:month', charges: 's37:charges', owe37: 's37:owe', start37: 's37:start', full: 's37:full', k334: 's37:334000',
  one38: 's38:one', k1998: 's38:1998', k264: 's38:264', pays38: 's38:pays',
  next39: 's39:next', less39: 's39:less', smaller: 's39:smaller', more39: 's39:more',
  two40: 's40:two', loan40: 's40:loan', k1997: 's40:1997', k266: 's40:266', better: 's40:better',
  why41: 's41:why', because41: 's41:because', owe41: 's41:owe', seesaw43: 's43:seesaw', stays: 's41:stays', shrinks: 's41:shrinks', left41: 's41:left', loan41: 's41:loan',
  seesaw42: 's42:seesaw', interest42: 's42:interest', other42: 's42:other', home42: 's42:home',
  start43: 's43:start', heavy: 's43:heavy', payment43: 's43:payment', tips43: 's43:tips',
  slow: 's44:slow', paid44: 's44:paid', five: 's44:5', k19: 's44:19000', k117: 's44:117000',
  ten: 's45:10', k288: 's45:288000',
  only46: 's46:only', middle: 's46:middle', k21: 's46:21', finally: 's46:finally',
  add: 's47:add', thirty47: 's47:30', k815: 's47:815000', k480: 's47:480000', more47: 's47:more', borrowed47: 's47:borrowed', k334b: 's47:334000',
  only48: 's48:only', all48: 's48:all', never: 's48:never', many: 's48:many', sell: 's48:sell', refinance: 's48:refinance',
  shows: 's49:shows', cost: 's49:cost', long: 's49:long',
}
type Key = keyof typeof K

// # the loan math for the seesaw: interest share of the payment in month k
const P = 334000, R = 0.0718 / 12, M = P * R / (1 - Math.pow(1 + R, -360))
const owed = (k: number) => P * Math.pow(1 + R, k) - M * (Math.pow(1 + R, k) - 1) / R
const share = (k: number) => (owed(k) * R) / M

// # the canvas sack of what you still owe (s = size)
const Sack: React.FC<{ x: number; y: number; s: number; t: string; o?: number }> = ({ x, y, s, t, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={10} cy={8} rx={230} ry={30} fill={INK} opacity={0.2} />
    <path d="M-200 0 C -240 -160 -150 -300 -60 -330 L60 -330 C 150 -300 240 -160 200 0 Z" fill="#D8BE8C" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
    <path d="M-70 -330 C -40 -370 40 -370 70 -330" fill="none" stroke={INK} strokeWidth={6} /><path d="M-80 -320 L80 -320" stroke="#8E6A4E" strokeWidth={14} strokeLinecap="round" />
    <path d="M-120 -60 C -150 -150 -110 -230 -60 -270" fill="none" stroke="#EAD5AA" strokeWidth={16} strokeLinecap="round" opacity={0.7} />
    <Label x={0} y={-130} text="$" size={120} font="Bebas Neue" color="#8E6A4E" />
    <rect x={-160} y={-70} width={320} height={64} rx={12} fill={CREAM} stroke={INK} strokeWidth={4} /><Label x={0} y={-26} text={t} size={44} font="Bebas Neue" color={INK} />
  </g>
)
// # the lender's coin box
const CoinBox: React.FC<{ x: number; y: number; o?: number }> = ({ x, y, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-130} y={-150} width={260} height={150} rx={14} fill={BRICKD} stroke={INK} strokeWidth={5} /><rect x={-60} y={-150} width={120} height={14} rx={6} fill={INK} />
    <rect x={-130} y={-150} width={260} height={30} rx={14} fill={BRICK} /><Label x={0} y={-48} text="LENDER" size={46} font="Bebas Neue" color={CREAM} />
  </g>
)
// # the payment as a bar: red (interest) then sage (your loan)
const PayBar: React.FC<{ x: number; y: number; w: number; red: number; o?: number; a?: string; b?: string; glow?: number }> = ({ x, y, w, red, o = 1, a, b, glow = 0 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2} y={-40} width={w} height={80} rx={18} fill={SAGE} stroke={INK} strokeWidth={5} />
    {glow > 0 && <rect x={-w / 2 + w * red} y={-48} width={w * (1 - red)} height={96} rx={18} fill="#CFF2C6" opacity={0.6 * glow} />}
    <rect x={-w / 2} y={-40} width={w * red} height={80} rx={18} fill={BRICK} />
    <rect x={-w / 2} y={-40} width={w} height={80} rx={18} fill="none" stroke={INK} strokeWidth={5} />
    {a && <Label x={-w / 2 + (w * red) / 2} y={16} text={a} size={46} font="Bebas Neue" color={CREAM} />}
    {b && <Label x={w / 2 + 110} y={16} text={b} size={46} font="Bebas Neue" color={SAGED} />}
  </g>
)

const Dollar: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.seesaw42 - 8, BC = q.add - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const you: Beat[] = [[0, 'explain', 'neutral'], [q.k1998, 'shock', 'worried'], [q.k264, 'read', 'worried'], [q.next39, 'explain', 'neutral'], [q.better, 'shrug', 'neutral'], [q.why41, 'think', 'thinking'], [q.because41, 'explain', 'neutral'], [q.owe41, 'point', 'neutral'], [q.left41, 'pointUp', 'smiling']]
  const youB: Beat[] = [[0, 'present', 'neutral'], [q.heavy, 'point', 'worried'], [q.seesaw43, 'explain', 'neutral'], [q.slow, 'scratchHead', 'thinking'], [q.k21, 'celebrate', 'smiling']]
  const youC: Beat[] = [[0, 'shock', 'shocked'], [q.only48, 'explain', 'neutral'], [q.many, 'present', 'smiling'], [q.shows, 'think', 'thinking']]
  // # A: month 1 → month 2
  const m2 = on(f, q.next39, 20)
  const sackS = lerp(1, 0.985, m2)
  const red = lerp(0.883, 0.8825, m2), redWhy = lerp(0.883, 0.55, span(f, q.stays, q.shrinks + 30))
  // # B: years on the seesaw: month count mapped to the narration
  const months = span(f, q.payment43, q.five) * 60 + span(f, q.k117 + 20, q.ten) * 60 + span(f, q.k288 + 20, q.k21) * 132
  const year = Math.min(21, Math.max(1, Math.ceil(months / 12 - 0.001)))
  const sh = share(Math.min(359, months))
  const tilt = clamp01((sh - 0.5) / 0.4) * -1 + clamp01((0.5 - sh) / 0.4)
  const redN = Math.round(lerp(2, 9, sh)), brickN = Math.round(lerp(1, 6, 1 - sh))
  const total = on(f, q.k815, 10), tall = on(f, q.k480, 22)
  return (
    <g>
      <Stage id="mg-dollar" frame={f} />
      <Sky id="mgd-sky" top="#6E5E9E" mid="#F29A84" bottom="#FFCB8E" sun={[300, 690]} sunR={80} f={f} />
      <Hills id="mgd-hills" y={750} cols={['#BE98B4', '#93B886', '#76A86A']} seed={11} />
      <Ground id="mgd-ground" y={840} top="#86B76C" bottom="#57894A" />
      <Tree x={1820} y={860} s={1.05} col="#679C5C" /><Bush x={120} y={900} s={0.8} />
      {/* # A) the sack, the month clock, the payment split */}
      {A > 0 && <g opacity={A}>
        <Sack x={1120} y={860} s={sackS * 0.85} t={m2 > 0.5 ? 'OWED: $333,736' : 'OWED: $334,000'} o={on(f, q.owe37, 12)} />
        <CoinBox x={1600} y={860} o={on(f, q.charges, 10)} />
        <g opacity={on(f, q.month37, 10) * (1 - on(f, q.why41, 10))} transform="translate(540 330)">
          <circle r={70} fill={CREAM} stroke={INK} strokeWidth={6} /><path d={`M0 0 L${50 * Math.sin((f / 10) % 6.28)} ${-50 * Math.cos((f / 10) % 6.28)}`} stroke={BRICK} strokeWidth={7} strokeLinecap="round" /><circle r={8} fill={INK} />
          <Label x={0} y={120} text={m2 > 0.5 ? 'MONTH 2' : 'MONTH 1'} size={48} font="Bebas Neue" color={INK} />
        </g>
        {/* # month 1: the bar and where its parts go */}
        <PayBar x={1080} y={380 - 8 * pop(f, q.loan40, 12) + 8} w={720} red={on(f, q.why41, 10) > 0.5 ? redWhy : red} o={on(f, q.one38, 10)} glow={on(f, q.left41, 10)}
          a={on(f, q.why41, 10) > 0.5 ? 'INTEREST SHRINKS' : on(f, q.k1997, 6) > 0.5 ? '$1,997 INTEREST' : on(f, q.k1998, 6) > 0.5 ? '$1,998 INTEREST' : ''}
          b={on(f, q.why41, 10) > 0.5 ? '' : on(f, q.k266, 6) > 0.5 ? '$266' : on(f, q.k264, 6) > 0.5 ? '$264' : ''} />
        <g opacity={win(f, q.stays, q.seesaw42, 10)}><Label x={1080} y={290} text="SAME $2,263 EVERY MONTH" size={50} font="Bebas Neue" color={INK} /></g>
        <g opacity={win(f, q.left41, q.seesaw42, 10)} transform={`translate(0 ${-6 * pop(f, q.loan41, 12) + 6})`}><Label x={1080} y={485} text="WHAT'S LEFT GOES TO YOUR LOAN" size={46} font="Bebas Neue" color={SAGED} /></g>
        {/* # coins: red ones fly to the lender, a sage chip off the sack */}
        {Array.from({ length: 5 }, (_, i) => { const t = span(f, q.k1998 + 4 + i * 3, q.k1998 + 26 + i * 3); return t > 0 && t < 1 ? <g key={i} transform={`translate(${lerp(1000, 1600, t)} ${lerp(470, 700, t) - 120 * Math.sin(Math.PI * t)})`}><Coins x={0} y={0} n={1} s={0.55} col={BRICK} /></g> : null })}
        {(() => { const t = span(f, q.pays38, q.pays38 + 24); return t > 0 && t < 1 ? <g transform={`translate(${lerp(1420, 1180, t)} ${lerp(470, 640, t) - 80 * Math.sin(Math.PI * t)})`}><Brick x={0} y={0} s={0.5} /></g> : null })()}
        <g opacity={on(f, q.better, 8) * (1 - on(f, q.why41, 8))}><rect x={420} y={820} width={440} height={80} rx={40} fill={CREAM} stroke={SAGED} strokeWidth={4} /><Label x={640} y={876} text="JUST $2 BETTER" size={52} font="Bebas Neue" color={SAGED} /></g>
        <Person f={f} who="investorF" beats={you} x={260} y={960} s={0.95} />
      </g>}
      {/* # B) the seesaw over the years */}
      {B > 0 && <g opacity={B}>
        <Seesaw x={1000} y={760} tilt={on(f, q.start43, 10) > 0 ? tilt : -1}
          L={<g><Coins x={0} y={0} n={redN} col={BRICK} s={1.1} /><Label x={0} y={-redN * 18 - 60} text="INTEREST" size={46} font="Bebas Neue" color={BRICKD} /></g>}
          R={<g opacity={on(f, q.other42, 10)}>{Array.from({ length: brickN }, (_, i) => <Brick key={i} x={(i % 2) * 20 - 10} y={-30 - i * 62} s={0.9} />)}<Label x={0} y={-brickN * 62 - 50} text="YOUR HOME" size={46} font="Bebas Neue" color={SAGED} /></g>} />
        <g opacity={on(f, q.payment43, 10)} transform={`translate(1000 ${340 - 10 * pop(f, q.paid44, 12) + 10})`}><rect x={-130} y={-56} width={260} height={96} rx={18} fill={CREAM} stroke={INK} strokeWidth={5} /><Label x={0} y={16} text={`YEAR ${year}`} size={64} font="Bebas Neue" color={INK} /></g>
        <g opacity={win(f, q.k19, q.ten, 10)}><Label x={1560} y={300} text="PAID OFF: $19,000" size={50} font="Bebas Neue" color={SAGED} /><Label x={440} y={300} text={on(f, q.k117, 6) > 0.5 ? 'INTEREST: $117,000' : ''} size={50} font="Bebas Neue" color={BRICK} /></g>
        <g opacity={win(f, q.k288, q.only46, 10)}><Label x={1560} y={300} text="STILL OWED: $288,000" size={50} font="Bebas Neue" color={INK} /></g>
        <g opacity={on(f, q.k21, 10)}><Label x={1560} y={300} text="NOW MOST GOES TO YOUR HOME" size={46} font="Bebas Neue" color={SAGED} /></g>
        <Person f={f} who="investorF" beats={youB} x={1780} y={960} s={0.85} flip />
      </g>}
      {/* # C) two towers: borrowed vs interest; the caveat; the hourglass */}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, q.shows, 12)}>
          <g transform={`translate(860 ${860 - 10 * pop(f, q.k334b, 12) + 10})`}><rect x={-130} y={-334 * 0.9} width={260} height={334 * 0.9} rx={10} fill={GOLD} stroke={INK} strokeWidth={5} /><Label x={0} y={-334 * 0.9 + 60} text="$334,000" size={56} font="Bebas Neue" color={INK} /><Label x={0} y={60} text="BORROWED" size={46} font="Bebas Neue" color={CREAM} /></g>
          <g transform="translate(1200 860)" opacity={on(f, q.k480, 10)}><rect x={-130} y={-480 * 0.9 * tall} width={260} height={480 * 0.9 * tall} rx={10} fill={BRICK} stroke={INK} strokeWidth={5} /><Label x={0} y={-480 * 0.9 * tall + 60} text="$480,000" size={56} font="Bebas Neue" color={CREAM} /><Label x={0} y={60} text="INTEREST" size={46} font="Bebas Neue" color={CREAM} /></g>
          <g opacity={total} transform={`translate(1030 ${310 - 10 * pop(f, q.k815, 12)})`}><rect x={-250} y={-56} width={500} height={96} rx={48} fill={CREAM} stroke={INK} strokeWidth={5} /><Label x={0} y={16} text="TOTAL PAID: $815,000" size={56} font="Bebas Neue" color={INK} /></g>
          <g opacity={on(f, q.only48, 10)} transform="translate(1030 990)"><rect x={-330} y={-40} width={660} height={70} rx={35} fill={INK} /><Label x={0} y={10} text="IF YOU KEEP THE SAME LOAN ALL 30 YEARS" size={40} font="Bebas Neue" color={GOLD} /></g>
          <YardSign x={1490} y={900} t="SOLD" o={on(f, q.sell, 10)} r={-3} />
          <YardSign x={1745} y={900} t="REFINANCED" col={SAGED} o={on(f, q.refinance, 10)} r={3} />
        </g>
        {/* # the hourglass */}
        <g opacity={on(f, q.shows, 12)} transform={`translate(1060 ${620 - 10 * pop(f, q.cost, 12)})`}>
          <rect x={-170} y={-280} width={340} height={30} rx={10} fill="#8E5A3A" stroke={INK} strokeWidth={4} /><rect x={-170} y={250} width={340} height={30} rx={10} fill="#8E5A3A" stroke={INK} strokeWidth={4} />
          <path d="M-130 -250 L130 -250 L20 0 L130 250 L-130 250 L-20 0 Z" fill="#EAF4F6" opacity={0.8} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <path d={`M${-100 * (1 - span(f, q.shows, q.long + 20))} ${-250 + 230 * span(f, q.shows, q.long + 20)} L${100 * (1 - span(f, q.shows, q.long + 20))} ${-250 + 230 * span(f, q.shows, q.long + 20)} L20 -10 L-20 -10 Z`} fill={GOLD} />
          <path d={`M-110 240 L110 240 L${30 + 70 * span(f, q.shows, q.long + 20)} ${240 - 120 * span(f, q.shows, q.long + 20)} L${-30 - 70 * span(f, q.shows, q.long + 20)} ${240 - 120 * span(f, q.shows, q.long + 20)} Z`} fill={BRICK} />
          <Label x={0} y={360} text="TIME IS WHAT YOU PAY FOR" size={52} font="Bebas Neue" color={CREAM} />
        </g>
        <Person f={f} who="investorF" beats={youC} x={300} y={960} s={0.95} />
        <Fence x0={1640} x1={1960} y={1080} />
      </g>}
      <Headline f={f} lines={[[q.goes35, 'WHERE EVERY DOLLAR GOES', INK, 96], [q.month37, 'INTEREST ON WHAT YOU OWE', INK, 92], [q.next39, 'MONTH TWO', INK, 104], [q.why41, 'WHY IT WORKS THIS WAY', INK, 96],
        [q.seesaw42, 'THE SEESAW', INK, 108], [q.slow, 'IT IS SLOW', INK, 104], [q.only46, 'YEAR 21: IT TIPS', SAGED, 100],
        [q.add, 'ADD IT ALL UP', INK, 104], [q.only48, 'ONLY IF YOU KEEP IT', INK, 100], [q.shows, 'THE COST OF TIME', INK, 104]]} />
      <Vignette id="mg-dollar" />
    </g>
  )
}

export const MG_DOLLAR = makePiece('mg-dollar', 'Mortgage step three (a park at sunset): a canvas sack OWED: $334,000 and the lender\'s coin box; a month clock; the $2,263 payment as a bar, $1,998 brick-red interest flies to the lender and only $264 chips the sack; month two $1,997 vs $266 (JUST $2 BETTER); the bar stays the same while the red part shrinks; a big seesaw with red interest coins vs sage home bricks tipping year by year (YEAR counter; after 5 years paid off $19,000 vs interest $117,000; after 10 years still owed $288,000; year 21 it tips); two towers BORROWED $334,000 vs INTEREST $480,000 (TOTAL PAID $815,000) with the caveat IF YOU KEEP THE SAME LOAN ALL 30 YEARS and SOLD / REFINANCED signs; an hourglass, TIME IS WHAT YOU PAY FOR', {
  mood: 'light', Component: Dollar, beats: Object.values(K),
  sfx: [['s38:1998', 'thud', 0.2], ['s40:better', 'tick', 0.2], ['s42:seesaw', 'whoosh', 0.2], ['s46:21', 'ding', 0.2], ['s47:480000', 'thud', 0.25]] })
