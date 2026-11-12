// ---------------------------------------------------------------- s22–s34: step two, inside your monthly payment (the study).
// A) A study at dusk, a lamp on a desk. The lender's PAYMENT MACHINE (brass, three dials). On "360 months" a wall
//    calendar of 360 squares fills and stamps PAID OFF. "Three things": dial 1 lights ($ BORROWED), dial 2 (RATE),
//    dial 3 (YEARS). Dial 2 turns to 7.2% (avg 30-yr fixed, early Nov 2026). Dial 1 shows $334,000, dial 3 shows 30;
//    the machine prints an envelope $2,263 / MONTH.
// B) The envelope opens into two coin piles: gold PAYING BACK THE LOAN and brick-red INTEREST. Then two tracks: FIXED,
//    a flat rail where a little cart stays level; ADJUSTABLE, a rail that starts lower then rolls up and down.
// C) The kitchen shelf: the $2,263 block is "only the loan part"; two more blocks arrive, PROPERTY TAX and HOME
//    INSURANCE. An ESCROW jar on the shelf: a coin drops in each month; the two big yearly bills arrive and the jar
//    pays them ("when they're due"). "Go up": both blocks grow taller and the stack rises (arrow up). Finally the four
//    blocks stacked: LOAN, INTEREST, PROPERTY TAX, HOME INSURANCE.
import React from 'react'
import { lerp, on, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { BRICK, BRICKD, Coins, CREAM, Envelope, EscrowJar, GOLD, GOLDD, INK, MonthGrid, PLUM, Room, SAGE, SAGED, Table } from './kit'

const K = {
  whats22: "s22:what's", inside: 's22:inside',
  works: 's23:works', fixed23: 's23:fixed', exactly: 's23:exactly', k360: 's23:360', months: 's23:months', gone: 's23:gone',
  three: 's24:three', borrow: 's24:borrow', rate24: 's24:rate', years24: 's24:years',
  november: 's25:november', fixed25: 's25:fixed', average: 's25:average', k7: 's25:7', percent25: 's25:percent',
  k334: 's26:334000', k2263: 's26:2263', month26: 's26:month', thirty26: 's26:30',
  two27: 's27:two', back27: 's27:back', interest27: 's27:interest',
  fixed28: 's28:fixed', never: 's28:never', adjustable: 's28:adjustable', lower: 's28:lower', up28: 's28:up', down28: 's28:down',
  surprises: 's29:surprises', k2263b: 's29:2263', loan29: 's29:loan', bill29: 's29:bill',
  two30: 's30:two', lenders30: 's30:lenders', property: 's30:property', insurance30: 's30:insurance',
  pot: 's31:pot', escrow: 's31:escrow', bills31: 's31:bills', due: "s31:they're",
  savings32: 's32:savings', jar: 's32:jar', paying34: 's34:paying', drop: 's32:drop', yearly: 's32:yearly', surprise: 's32:surprise',
  taxes33: 's33:taxes', up33: 's33:up', goes: 's33:goes', fixed33: 's33:fixed',
  picture: 's34:picture', four: 's34:four', loan34: 's34:loan', interest34: 's34:interest', tax34: 's34:tax', home34: 's34:home',
}
type Key = keyof typeof K

// # a brass dial on the machine: value text, lit when its word is spoken
const Dial: React.FC<{ x: number; y: number; t: string; v: string; lit: number; a: number }> = ({ x, y, t, v, lit, a }) => (
  <g transform={`translate(${x} ${y})`}>
    {lit > 0 && <circle r={120} fill="#FFE3A0" opacity={0.35 * lit} />}
    <circle r={92} fill="#F7E7C6" stroke={GOLDD} strokeWidth={10} />
    {Array.from({ length: 12 }, (_, i) => { const g = (i / 12) * Math.PI * 2; return <path key={i} d={`M${Math.cos(g) * 70} ${Math.sin(g) * 70} L${Math.cos(g) * 82} ${Math.sin(g) * 82}`} stroke={INK} strokeWidth={4} /> })}
    <path d={`M0 0 L${Math.cos(a) * 62} ${Math.sin(a) * 62}`} stroke={BRICK} strokeWidth={9} strokeLinecap="round" /><circle r={12} fill={INK} />
    <Label x={0} y={150} text={t} size={50} font="Bebas Neue" color={INK} />
    <rect x={-100} y={-170} width={200} height={62} rx={14} fill={INK} opacity={v ? 1 : 0} /><Label x={0} y={-124} text={v} size={46} font="Bebas Neue" color={GOLD} />
  </g>
)
// # a stacked bill block
const Block: React.FC<{ x: number; y: number; w: number; h: number; col: string; t: string; ink?: string; o?: number }> = ({ x, y, w, h, col, t, ink = INK, o = 1 }) => (
  <g opacity={o}><rect x={x - w / 2} y={y - h} width={w} height={h} rx={12} fill={col} stroke={INK} strokeWidth={5} /><rect x={x - w / 2 + 10} y={y - h + 8} width={w - 20} height={10} rx={5} fill="#FFFFFF" opacity={0.3} />
    <Label x={x} y={y - h / 2 + 16} text={t} size={44} font="Bebas Neue" color={ink} /></g>
)
// # a yearly bill (paper with a big seal)
const YearBill: React.FC<{ x: number; y: number; t: string; o?: number; paid?: number }> = ({ x, y, t, o = 1, paid = 0 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-110} y={-140} width={220} height={280} rx={10} fill="#FFFBF2" stroke={INK} strokeWidth={5} />
    <Label x={0} y={-80} text={t} size={42} font="Bebas Neue" color={INK} />
    {[-30, 0, 30].map((yy) => <rect key={yy} x={-80} y={yy} width={160} height={10} rx={5} fill="#E6D8C0" />)}
    <g opacity={paid} transform={`translate(0 90) rotate(-12) scale(${0.8 + 0.2 * paid})`}><rect x={-80} y={-30} width={160} height={60} rx={8} fill="none" stroke={SAGED} strokeWidth={6} /><Label x={0} y={14} text="PAID" size={44} font="Bebas Neue" color={SAGED} /></g>
  </g>
)

const Pay: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.two27 - 8, BC = q.surprises - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const you: Beat[] = [[0, 'idle', 'neutral'], [q.whats22, 'explain', 'neutral'], [q.three, 'countOne', 'neutral'], [q.rate24, 'countA', 'neutral'], [q.years24, 'countB', 'neutral'], [q.k2263, 'read', 'thinking']]
  const youB: Beat[] = [[0, 'explain', 'neutral'], [q.fixed28, 'point', 'smiling'], [q.adjustable, 'nervous', 'thinking']]
  const youC: Beat[] = [[0, 'shock', 'shocked'], [q.property, 'explain', 'neutral'], [q.savings32, 'think', 'smiling'], [q.jar, 'offer', 'smiling'], [q.surprise, 'thumbsUp', 'smiling'], [q.up33, 'shock', 'worried'], [q.picture, 'present', 'neutral'], [q.paying34, 'countOne', 'neutral']]
  const rateA = lerp(-Math.PI / 2, 0.2, on(f, q.k7, 20))
  // # C stack heights
  const grow = on(f, q.up33, 20) * (1 - on(f, q.picture, 14))
  const taxH = 90 + 40 * grow, insH = 80 + 34 * grow
  const four = on(f, q.picture, 14)
  return (
    <g>
      <Stage id="mg-pay" frame={f} />
      {/* # A) the study: payment machine with three dials, 360-month calendar, the printed bill */}
      {A > 0 && <g opacity={A}>
        <Room id="mgp-room" wall="#E9CFAE" floor="#8E6A50" win={[330, 170, 220, 170]} glow={0.5} />
        <MonthGrid x={1060} y={420} paid={Math.round(360 * span(f, q.exactly, q.gone + 6))} s={1.2} o={win(f, q.works, q.three, 10)} />
        <g opacity={win(f, q.gone, q.three, 8)} transform={`translate(1060 ${560}) rotate(-8) scale(${pop(f, q.gone, 12)})`}><rect x={-170} y={-50} width={340} height={96} rx={12} fill="none" stroke={SAGED} strokeWidth={8} /><Label x={0} y={18} text="360 MONTHS: GONE" size={50} font="Bebas Neue" color={SAGED} /></g>
        <Table x={1000} y={800} w={1300} />
        {/* # the machine (arrives on "three") */}
        <g opacity={on(f, q.three, 12)}>
        <g transform="translate(1000 790)">
          <rect x={-470} y={-420} width={940} height={420} rx={30} fill="#C88E46" stroke={INK} strokeWidth={6} />
          <rect x={-450} y={-400} width={900} height={40} rx={14} fill="#E2B064" />
          {[-380, 380].map((rx) => <circle key={rx} cx={rx} cy={-40} r={14} fill={GOLDD} stroke={INK} strokeWidth={3} />)}
          <rect x={-130} y={-30} width={260} height={40} rx={8} fill={INK} />
        </g></g>
        <g opacity={on(f, q.three, 12)}><Dial x={700} y={570} t="BORROWED" v={on(f, q.k334, 6) > 0.5 ? '$334,000' : ''} lit={win(f, q.borrow, q.rate24, 6) + on(f, q.k334, 6) * (1 - on(f, q.k2263, 8))} a={lerp(-Math.PI / 2, 1.2, on(f, q.borrow, 20))} />
        <Dial x={1000} y={570} t="RATE" v={on(f, q.k7, 6) > 0.5 ? '7.2%' : ''} lit={win(f, q.rate24, q.years24, 6) + win(f, q.k7, q.k334, 6)} a={rateA} />
        </g><g opacity={on(f, q.three, 12)}><Dial x={1300} y={570} t="YEARS" v={on(f, q.thirty26, 6) > 0.5 ? '30' : ''} lit={win(f, q.years24, q.november, 6) + on(f, q.thirty26, 6)} a={lerp(-Math.PI / 2, 2.4, on(f, q.years24, 20))} /></g>
        <g opacity={win(f, q.average, q.k334, 10)} transform={`translate(0 ${-8 * pop(f, q.fixed25, 12) + 8})`}><rect x={760} y={850} width={480} height={70} rx={35} fill={CREAM} stroke={GOLDD} strokeWidth={4} /><Label x={1000} y={898} text="AVG 30-YEAR FIXED, EARLY NOV 2026" size={36} font="Bebas Neue" color={INK} /></g>
        {/* # printed bill slides out of the slot */}
        <g opacity={on(f, q.k2263, 8)}><Envelope x={1000} y={lerp(800, 960, on(f, q.k2263, 18))} s={1.0} t="$2,263 A MONTH" /></g>
        <Person f={f} who="investorF" beats={you} x={220} y={960} s={0.95} />
      </g>}
      {/* # B) two pieces; fixed vs adjustable */}
      {B > 0 && <g opacity={B}>
        <Room id="mgp-room2" wall="#E9CFAE" floor="#8E6A50" win={[330, 170, 220, 170]} glow={0.4} />
        <g opacity={1 - on(f, q.fixed28, 12)}>
          <Envelope x={1000} y={520} s={0.75} t="$2,263" open={on(f, q.two27, 14)} />
          <g opacity={on(f, q.back27, 10)} transform={`translate(0 ${-10 * pop(f, q.back27, 12)})`}><Coins x={720} y={840} n={4} s={1.4} /><Label x={720} y={930} text="PAYING BACK THE LOAN" size={50} font="Bebas Neue" color={CREAM} /></g>
          <g opacity={on(f, q.interest27, 10)} transform={`translate(0 ${-10 * pop(f, q.interest27, 12)})`}><Coins x={1280} y={840} n={8} col={BRICK} s={1.4} /><Label x={1280} y={930} text="INTEREST" size={50} font="Bebas Neue" color={CREAM} /></g>
        </g>
        <g opacity={on(f, q.fixed28, 12)}>
          {/* # FIXED: a flat rail */}
          <path d="M520 420 L1780 420" stroke="#7A5236" strokeWidth={14} /><path d="M520 432 L1780 432" stroke="#B98454" strokeWidth={6} />
          {Array.from({ length: 14 }, (_, i) => <rect key={i} x={540 + i * 90} y={420} width={10} height={40} fill="#7A5236" />)}
          <g transform={`translate(${lerp(600, 1650, span(f, q.fixed28, q.adjustable + 30))} 380)`}><rect x={-56} y={-40} width={112} height={50} rx={10} fill={SAGE} stroke={INK} strokeWidth={4} /><circle cx={-30} cy={20} r={14} fill={INK} /><circle cx={30} cy={20} r={14} fill={INK} /></g>
          <Label x={1150} y={360} text="FIXED: NEVER CHANGES" size={50} font="Bebas Neue" color={SAGED} />
          {/* # ADJUSTABLE: starts lower, then up and down */}
          <g opacity={on(f, q.adjustable, 12)}>
            <path d="M520 780 L900 780 C 1000 780 1040 600 1140 600 C 1240 600 1260 820 1360 820 C 1460 820 1500 560 1600 560 L1780 560" fill="none" stroke="#7A5236" strokeWidth={14} />
            {(() => { const t = span(f, q.lower, q.down28 + 30), xx = lerp(600, 1700, t)
              const yy = xx < 900 ? 780 : xx < 1140 ? lerp(780, 600, (xx - 900) / 240) : xx < 1360 ? lerp(600, 820, (xx - 1140) / 220) : xx < 1600 ? lerp(820, 560, (xx - 1360) / 240) : 560
              return <g transform={`translate(${xx} ${yy - 40})`}><rect x={-56} y={-40} width={112} height={50} rx={10} fill={BRICK} stroke={INK} strokeWidth={4} /><circle cx={-30} cy={20} r={14} fill={INK} /><circle cx={30} cy={20} r={14} fill={INK} /></g> })()}
            <Label x={700} y={880} text="ADJUSTABLE: STARTS LOWER" size={50} font="Bebas Neue" color={BRICKD} />
            <g opacity={on(f, q.up28, 8)}><Label x={1480} y={960} text="…THEN CAN MOVE UP OR DOWN" size={46} font="Bebas Neue" color={CREAM} /></g>
          </g>
        </g>
        <Person f={f} who="investorF" beats={youB} x={230} y={960} s={0.95} />
      </g>}
      {/* # C) the kitchen shelf: blocks, escrow jar, the full bill */}
      {C > 0 && <g opacity={C}>
        <Room id="mgp-room3" wall="#F1D6B2" win={[330, 170, 220, 170]} glow={0.6} />
        {/* # a shelf on the wall */}
        <rect x={1180} y={520} width={520} height={22} rx={6} fill="#A8704A" stroke={INK} strokeWidth={4} />
        <g opacity={on(f, q.escrow, 10)}><EscrowJar id="mgp-jar" x={1440} y={460} fill={0.2 + 0.6 * span(f, q.drop, q.yearly) - 0.7 * on(f, q.yearly + 20, 20)} s={0.95} /></g>
        <g opacity={win(f, q.drop, q.yearly, 6)}><Coins x={1440} y={lerp(200, 330, ((f - q.drop) % 24) / 24)} n={1} s={0.5} /></g>
        <g opacity={win(f, q.yearly, q.taxes33, 10)}><YearBill x={1320} y={830} t="TAX BILL" paid={on(f, q.yearly + 24, 10)} /><YearBill x={1570} y={830} t="INSURANCE" paid={on(f, q.yearly + 30, 10)} /></g>
        <Table x={700} y={840} w={760} />
        {/* # the stack on the table */}
        <g transform="translate(700 840)">
          <Block x={0} y={-6 * pop(f, q.lenders30, 12) + 6} w={460} h={140} col={four > 0.5 ? GOLD : GOLD} t={four > 0.5 ? 'PAYING BACK THE LOAN' : '$2,263 LOAN PART'} o={1} />
          {four > 0 && <Block x={0} y={-140} w={460} h={110} col={BRICK} t="INTEREST" ink={CREAM} o={four} />}
          <g transform={`translate(0 ${-140 - 110 * four})`}>
            <Block x={0} y={0} w={460} h={taxH} col={PLUM} t="PROPERTY TAX" ink={CREAM} o={on(f, q.property, 10)} />
            <Block x={0} y={-taxH} w={460} h={insH} col="#5A8FD0" t="HOME INSURANCE" ink={CREAM} o={on(f, q.insurance30, 10)} />
          </g>
        </g>
        <g opacity={win(f, q.up33, q.picture, 10)}><path d="M1040 760 L1040 440" stroke={BRICK} strokeWidth={20} strokeLinecap="round" /><path d="M1000 470 L1040 410 L1080 470 Z" fill={BRICK} /><Label x={1040} y={380} text="BILL GOES UP" size={50} font="Bebas Neue" color={BRICK} /></g>
        <Person f={f} who="investorF" beats={youC} x={200} y={960} s={0.95} />
      </g>}
      <Headline f={f} lines={[[q.inside, "WHAT'S INSIDE YOUR PAYMENT", INK, 92], [q.three, 'THREE THINGS SET IT', INK, 100], [q.k2263, '$2,263 A MONTH, 30 YEARS', INK, 96],
        [q.two27, 'TWO PIECES', INK, 104], [q.fixed28, 'FIXED OR ADJUSTABLE', INK, 100], [q.surprises, 'ONLY THE LOAN PART', BRICK, 100], [q.pot, 'THE ESCROW JAR', INK, 104],
        [q.taxes33, 'IT CAN GO UP', BRICK, 104], [q.picture, 'YOUR FULL BILL', INK, 104]]} />
      <Vignette id="mg-pay" />
    </g>
  )
}

export const MG_PAY = makePiece('mg-pay', 'Mortgage step two (the study then the kitchen): a brass payment machine on a desk with three dials (how much you borrow, interest rate, years) beside a 360-month wall calendar that fills (360 MONTHS: GONE); the rate dial turns to 7.2% (avg 30-year fixed, early Nov 2026), $334,000 and 30, the machine prints a $2,263 / MONTH envelope; the envelope opens into gold coins (paying back the loan) and brick-red coins (interest); a flat FIXED rail with a level cart vs an ADJUSTABLE rail that starts lower then moves up and down; on the kitchen table a stack of bill blocks (loan part, property tax, home insurance) beside an ESCROW jar on a shelf filling coin by coin and paying the yearly tax and insurance bills (PAID); the blocks grow and the bill goes up; the full bill as four blocks: paying back the loan, interest, property tax, home insurance', {
  mood: 'light', Component: Pay, beats: Object.values(K),
  sfx: [['s23:gone', 'ding', 0.15], ['s25:7', 'click', 0.2], ['s26:2263', 'pop', 0.2], ['s28:adjustable', 'whoosh', 0.2], ['s31:escrow', 'pop', 0.2], ['s33:up', 'thud', 0.2]] })
