// ---------------------------------------------------------------- s73–s81: putting it together (the porch at dusk).
// A) Your front porch at dusk, string lights glowing. One recap picture at a time, in a round lit frame by the door:
//    the deal (hall, gold ribbon, home) → the full bill (four stacked blocks) → the seesaw tipping slowly → the
//    hourglass (THE LONGER YOU BORROW, THE MORE YOU PAY) → an early coin wipes out the red interest dots of all the
//    years after it (EARLY DOLLARS SAVE THE MOST).
// B) A wooden board on the porch: ASK YOURSELF — 1 HOW MUCH IN TOTAL? 2 SHORTER LOAN OR A LITTLE EXTRA? 3 MY FULL BILL?
//    each lights with a tick as it is asked.
// C) You walk up to the lender's office door holding the contract; on "signing" a gold tick stamps it: YOU KNOW WHAT
//    YOU'RE SIGNING.
import React from 'react'
import { lerp, on, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { BRICK, Brick, Coins, CREAM, GOLD, GOLDD, INK, LenderHall, PLUM, SAGE, SAGED, ClaimRibbon, Seesaw } from './kit'

const K = {
  mortgage74: 's74:mortgage', deal: 's74:deal', lender: 's74:lender', interest74: 's74:interest', promise: 's74:promise',
  monthly: 's75:monthly', loan75: 's75:loan', taxes: 's75:taxes', insurance75: 's75:insurance',
  early: 's76:early', dollar76: 's76:dollar', interest76: 's76:interest', seesaw76: 's76:seesaw', slowly: 's76:slowly',
  time77: 's77:time', biggest: 's77:biggest', longer: 's77:longer', more77: 's77:more',
  small: 's78:small', dollar78: 's78:dollar', early78: 's78:early', count78: 's78:count', stops: 's78:stops', years78: 's78:years', left: 's78:left',
  before: 's79:before', three: 's79:three', questions: 's79:questions',
  total: 's80:total', each80: 's80:each', shorter: 's80:shorter', little: 's80:little', full: 's80:full', insurance80: 's80:insurance',
  know: 's81:know', walk: "s81:walk", office: 's81:office', exactly: 's81:exactly', signing: 's81:signing',
}
type Key = keyof typeof K

// # the porch: siding wall, door with a wreath of light, railing, string lights
const Porch: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <defs><linearGradient id="mgo-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5C4E7E" /><stop offset="100%" stopColor="#3E3460" /></linearGradient>
      <radialGradient id="mgo-lamp" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor="#FFE3A0" stopOpacity={0.55} /><stop offset="100%" stopColor="#FFE3A0" stopOpacity={0} /></radialGradient></defs>
    <rect x={0} y={0} width={1920} height={1080} fill="url(#mgo-wall)" />
    {Array.from({ length: 16 }, (_, i) => <rect key={i} x={0} y={i * 56} width={1920} height={4} fill="#4A3F6C" />)}
    <rect x={0} y={840} width={1920} height={240} fill="#8A6A52" /><rect x={0} y={840} width={1920} height={12} fill="#B08A6A" />
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x={i * 170} y={852} width={6} height={228} fill="#6E5240" opacity={0.6} />)}
    <path d="M160 40 Q 560 80 1040 44 T 1920 48" fill="none" stroke="#2A2240" strokeWidth={4} />
    {Array.from({ length: 16 }, (_, i) => { const x = i * 112 + 200, y = 52 + 12 * Math.sin((i / 15) * Math.PI * 2); return <g key={i}><circle cx={x} cy={y} r={30} fill="#FFE3A0" opacity={0.25 + 0.1 * Math.sin(f / 12 + i)} /><circle cx={x} cy={y} r={10} fill="#FFF1C9" /></g> })}
  </g>
)
// # the round lit frame that holds one recap picture
const Frame: React.FC<{ o: number; children: React.ReactNode }> = ({ o, children }) => (
  <g opacity={o}>
    <circle cx={1120} cy={560} r={330} fill="url(#mgo-lamp)" />
    <circle cx={1120} cy={560} r={270} fill="#FFF4E2" stroke={GOLDD} strokeWidth={12} />
    <g>{children}</g>
  </g>
)

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.before - 8, BC = q.know - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const p1 = win(f, 0, q.monthly), p2 = win(f, q.monthly, q.early), p3 = win(f, q.early, q.time77), p4 = win(f, q.time77, q.small), p5 = on(f, q.small, 10)
  const you: Beat[] = [[0, 'explain', 'smiling'], [q.monthly, 'present', 'neutral'], [q.early, 'point', 'neutral'], [q.time77, 'think', 'thinking'], [q.small, 'pointUp', 'smiling']]
  const youB: Beat[] = [[0, 'explain', 'neutral'], [q.total, 'countOne', 'thinking'], [q.shorter, 'countA', 'thinking'], [q.full, 'countB', 'thinking']]
  const youC: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 16], [q.office, 'hold', 'smiling'], [q.signing, 'confident', 'smiling']]
  const tilt = lerp(-0.9, -0.3, span(f, q.seesaw76, q.slowly + 30))
  const sand = span(f, q.time77, q.more77 + 20)
  return (
    <g>
      <Stage id="mg-payoff" frame={f} />
      <Porch f={f} />
      {/* # A) one recap picture at a time */}
      {A > 0 && <g opacity={A}>
        <Frame o={p1 * on(f, q.mortgage74, 10)}><LenderHall id="mgo-hall" x={960} y={680} s={0.36} /><g transform="translate(1240 650) scale(0.42)"><rect x={-200} y={-150} width={400} height={300} fill="#F6E3C4" stroke={INK} strokeWidth={8} /><path d="M-240 -140 L0 -300 L240 -140 Z" fill={BRICK} stroke={INK} strokeWidth={8} /><rect x={-40} y={40} width={80} height={110} fill="#6C4A3A" /></g>
          <ClaimRibbon a={[960, 520]} b={[1240, 540]} p={span(f, q.deal, q.promise + 10)} /><Label x={1120} y={750} text="THE HOUSE IS THE PROMISE" size={36} font="Bebas Neue" color={INK} /></Frame>
        <Frame o={p2}><g transform="translate(1120 760)">{([[GOLD, 'LOAN', INK], [BRICK, 'INTEREST', CREAM], [PLUM, 'TAXES', CREAM], ['#5A8FD0', 'INSURANCE', CREAM]] as [string, string, string][]).map(([col, t, ink], k) =>
          <g key={k} opacity={on(f, [q.loan75, q.loan75, q.taxes, q.insurance75][k], 8)}><rect x={-170} y={-86 * (k + 1)} width={340} height={80} rx={10} fill={col} stroke={INK} strokeWidth={4} /><Label x={0} y={-86 * (k + 1) + 52} text={t} size={42} font="Bebas Neue" color={ink} /></g>)}</g></Frame>
        <Frame o={p3}><g transform="translate(1120 590) scale(0.42)"><Seesaw x={0} y={0} tilt={tilt} L={<Coins x={0} y={0} n={8} col={BRICK} s={1.2} />} R={<g>{[0, 1].map((i) => <Brick key={i} x={0} y={-30 - i * 62} s={1} />)}</g>} /></g>
          <Label x={1120} y={740} text="IT TIPS SLOWLY" size={44} font="Bebas Neue" color={INK} /></Frame>
        <Frame o={p4}><g transform="translate(1120 540) scale(0.55)">
          <path d="M-130 -250 L130 -250 L20 0 L130 250 L-130 250 L-20 0 Z" fill="#EAF4F6" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
          <path d={`M${-100 * (1 - sand)} ${-250 + 230 * sand} L${100 * (1 - sand)} ${-250 + 230 * sand} L20 -10 L-20 -10 Z`} fill={GOLD} /><path d={`M-110 240 L110 240 L${30 + 70 * sand} ${240 - 120 * sand} L${-30 - 70 * sand} ${240 - 120 * sand} Z`} fill={BRICK} /></g>
          <Label x={1120} y={760} text="LONGER = MORE INTEREST" size={36} font="Bebas Neue" color={INK} /></Frame>
        <Frame o={p5 * (1 - on(f, q.before - 10, 8))}>
          {Array.from({ length: 30 }, (_, i) => { const x = 930 + (i % 10) * 42, y = 460 + Math.floor(i / 10) * 70, wiped = on(f, q.stops + i * 0.8, 6)
            return <g key={i}><circle cx={x} cy={y} r={i === 0 ? 14 + 6 * pop(f, q.dollar78, 12) - 6 * on(f, q.dollar78, 12) + 6 * on(f, q.dollar78, 12) * 0 : 14} fill={i === 0 ? GOLD : BRICK} opacity={i === 0 ? on(f, q.early78, 8) : 1 - wiped} />{i > 0 && wiped > 0.5 && <circle cx={x} cy={y} r={14} fill="none" stroke={SAGE} strokeWidth={4} />}</g> })}
          <Label x={1120} y={700} text="30 YEARS OF INTEREST" size={36} font="Bebas Neue" color={INK} o={1 - on(f, q.stops, 10)} />
          <g transform={`translate(0 ${-6 * pop(f, q.years78, 12) + 6})`}><Label x={1120} y={720} text="EARLY DOLLARS SAVE THE MOST" size={36} font="Bebas Neue" color={SAGED} o={on(f, q.stops, 10)} /></g></Frame>
        <Person f={f} who="investorF" beats={you} x={380} y={960} s={1.0} />
      </g>}
      {/* # B) the three questions */}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(1120 ${560 - 10 * pop(f, q.three, 14)})`}>
          <rect x={-560} y={290} width={20} height={150} fill="#7A5236" /><rect x={540} y={290} width={20} height={150} fill="#7A5236" />
          <rect x={-600} y={-300} width={1200} height={600} rx={22} fill="#B98454" stroke={INK} strokeWidth={6} /><rect x={-576} y={-276} width={1152} height={552} rx={14} fill={CREAM} />
          <Label x={0} y={-200} text="BEFORE YOU SIGN, ASK" size={62} font="Bebas Neue" color={SAGED} />
          {([[q.total, 'HOW MUCH WILL I PAY IN TOTAL?'], [q.shorter, 'SHORTER LOAN, OR A LITTLE EXTRA?'], [q.full, 'WHAT IS MY FULL BILL?']] as [number, string][]).map(([at, t], k) =>
            <g key={k} opacity={on(f, at, 8)} transform={`translate(0 ${-80 + k * 130 - (k === 0 ? 8 * pop(f, q.each80, 12) - 8 : 0)})`}>
              <Label x={-480} y={20} text={`${k + 1}.`} size={70} font="Bebas Neue" color={GOLDD} anchor="start" />
              <Label x={-400} y={20} text={t} size={60} font="Bebas Neue" color={INK} anchor="start" />
              <g opacity={on(f, at + 20, 8)} transform={`translate(480 0) scale(${pop(f, at + 20, 12)})`}><circle r={36} fill={SAGE} /><path d="M-16 0 L-4 14 L18 -12" fill="none" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" /></g>
            </g>)}
        </g>
        <Person f={f} who="investorF" beats={youB} x={260} y={980} s={0.95} />
      </g>}
      {/* # C) walking in, knowing what you're signing */}
      {C > 0 && <g opacity={C}>
        <g transform="translate(1340 860)">
          <rect x={-200} y={-560} width={400} height={560} rx={10} fill="#E9DFCC" stroke={INK} strokeWidth={6} />
          <rect x={-140} y={-480} width={280} height={480} rx={8} fill="#6C4A3A" stroke={INK} strokeWidth={5} /><circle cx={100} cy={-240} r={12} fill={GOLD} />
          <rect x={-170} y={-620} width={340} height={70} rx={10} fill={PLUM} /><Label x={0} y={-570} text="LENDER'S OFFICE" size={46} font="Bebas Neue" color={CREAM} />
        </g>
        <g opacity={on(f, q.exactly, 10)} transform={`translate(960 ${520 - 10 * pop(f, q.signing, 12)})`}>
          <rect x={-150} y={-190} width={300} height={380} rx={10} fill="#FFFBF2" stroke={INK} strokeWidth={5} />
          {[-120, -80, -40, 0].map((yy) => <rect key={yy} x={-110} y={yy} width={220} height={12} rx={6} fill="#E6D8C0" />)}
          <path d="M-100 120 q 12 -22 24 0 q 12 22 24 0 q 12 -22 24 0 q 12 22 24 0" fill="none" stroke={PLUM} strokeWidth={5} />
          <g opacity={on(f, q.signing, 8)} transform={`translate(90 -140) scale(${pop(f, q.signing, 12)})`}><circle r={56} fill={GOLD} stroke={INK} strokeWidth={5} /><path d="M-24 0 L-6 20 L26 -18" fill="none" stroke={INK} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" /></g>
        </g>
        <Person f={f} who="investorF" beats={youC} x={lerp(200, 560, span(f, q.know, q.office + 10))} y={980} s={0.95} />
      </g>}
      <Headline f={f} lines={[[q.deal, 'A DEAL, AND A PROMISE', CREAM, 100], [q.monthly, 'YOUR FULL BILL', CREAM, 104], [q.early, 'EARLY: MOSTLY INTEREST', CREAM, 100], [q.time77, 'TIME IS THE BIGGEST COST', CREAM, 96],
        [q.small, 'SMALL MOVES, EARLY', CREAM, 104], [q.before, 'THREE QUESTIONS', CREAM, 104], [q.know, "KNOW WHAT YOU'RE SIGNING", GOLD, 100]]} />
      <Vignette id="mg-payoff" />
    </g>
  )
}

export const MG_PAYOFF = makePiece('mg-payoff', 'Mortgage payoff (your porch at dusk with string lights): one recap picture at a time in a round lit frame — the lender hall tied to the home by a gold ribbon (the house is the promise), the four bill blocks (loan, interest, taxes, insurance), the seesaw tipping slowly, the hourglass (longer = more interest), an early gold coin wiping out 30 years of red interest dots (early dollars save the most); a wooden board BEFORE YOU SIGN, ASK with three questions ticked one by one; you walk up to the LENDER\'S OFFICE door with the contract and a gold tick stamps it', {
  mood: 'dark', Component: Payoff, beats: Object.values(K),
  sfx: [['s74:promise', 'ding', 0.15], ['s79:three', 'pop', 0.2], ['s80:total', 'tick', 0.2], ['s80:shorter', 'tick', 0.2], ['s80:full', 'tick', 0.2], ['s81:signing', 'ding', 0.2]] })
