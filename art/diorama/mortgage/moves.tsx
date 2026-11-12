// ---------------------------------------------------------------- s61–s72: step five, the moves that save you years (a morning garden).
// A) A fresh morning garden behind your home. The loan is a tall garden wall of bricks (WHAT YOU OWE). Your payment
//    walks a path to a toll booth (INTEREST) first; an extra gold coin takes a side path past the booth straight to
//    the wall and knocks a brick out ("skips the interest"). "$200 extra": a coin labelled +$200 joins the $2,263.
//    A timeline bar shrinks from 30 YEARS to ABOUT 23 YEARS (ALMOST 7 YEARS EARLY), then a badge $126,000 LESS
//    INTEREST. The cushion: a plump cushion of savings (EMERGENCY CUSHION FIRST), and a one-way arrow into the wall.
// B) Mortgage insurance: the umbrella over the lender's hall again; the owed gauge falls from 91% to 80% over ABOUT 9
//    YEARS (with 9% down), the hall's sign says ASK TO CANCEL; a fast-forward arrow: extra payments get you there sooner.
// C) A big magnifying glass over the four-block bill (LOAN, INTEREST, TAXES, INSURANCE + MORTGAGE INSURANCE): look at
//    the whole bill. Then an adjustable-rate rail climbing toward a dashed ceiling HOW HIGH CAN IT GO?
import React from 'react'
import { lerp, on, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { BRICK, BRICKD, Bush, Coins, CREAM, Fence, GOLD, GOLDD, Ground, Hills, INK, LenderHall, OweGauge, PLUM, SAGE, SAGED, Sky, Tree, Umbrella } from './kit'

const K = {
  years61: 's61:years',
  simplest: 's62:simplest', extra62: 's62:extra', tell: 's62:tell', toward: 's62:toward', itself: 's62:itself',
  skips: 's63:skips', straight: 's63:straight', next63: 's63:next', less63: "s63:less",
  add64: 's64:add', month64: 's64:month', loan65: 's65:30year', interest66: 's66:interest', payments69: 's69:payments', k200: 's64:200', k2263: 's64:2263',
  gone: 's65:gone', k23: 's65:23', seven: 's65:7', early: 's65:early',
  k126: 's66:126000', less66: 's66:less',
  cover: 's67:cover', cushion: 's67:cushion', emergencies: 's67:emergencies', hard: 's67:hard', back67: 's67:back',
  second: 's68:second', less68: 's68:less', eye: 's68:eye', insurance68: 's68:insurance',
  nine69: 's69:9', typical: 's69:typical', eighty: 's69:80', nine69b: 's69:9#2', years69: 's69:years',
  ask70: 's70:ask', cancel: 's70:cancel', extra70: 's70:extra', sooner: 's70:sooner',
  third: 's71:third', sign71: 's71:sign', whole: 's71:whole', loan71: 's71:loan', taxes71: 's71:taxes', insurance71: 's71:insurance', mortgage71: 's71:mortgage', count: 's71:count',
  adjustable: 's72:adjustable', high: 's72:high', starts: 's72:starts',
}
type Key = keyof typeof K

// # a toll booth on the path (interest takes its share first)
const Booth: React.FC<{ x: number; y: number; o?: number }> = ({ x, y, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-90} y={-220} width={180} height={220} rx={10} fill={BRICK} stroke={INK} strokeWidth={5} /><path d="M-110 -220 L0 -290 L110 -220 Z" fill={BRICKD} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-60} y={-180} width={120} height={80} rx={8} fill="#FFE3B0" stroke={INK} strokeWidth={4} /><Label x={0} y={-40} text="INTEREST" size={40} font="Bebas Neue" color={CREAM} />
    <rect x={90} y={-90} width={200} height={16} rx={8} fill="#F4E3C4" stroke={INK} strokeWidth={3} />
  </g>
)
// # the loan as a garden wall of bricks; gone = how many bricks are knocked out
const Wall: React.FC<{ x: number; y: number; gone: number; o?: number }> = ({ x, y, gone, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: 24 }, (_, i) => { const r = Math.floor(i / 4), cc = i % 4; const idx = 23 - i
      return idx < gone ? null : <rect key={i} x={-160 + cc * 80 + (r % 2) * 20 - 10} y={-60 - r * 56} width={76} height={52} rx={6} fill={i % 3 ? '#C46B4F' : '#B55E44'} stroke={INK} strokeWidth={3} /> })}
    <rect x={-190} y={-6} width={380} height={18} rx={6} fill="#8E6A4E" />
    <Label x={0} y={70} text="WHAT YOU OWE" size={46} font="Bebas Neue" color={CREAM} />
  </g>
)
// # a plump cushion of savings
const Cushion: React.FC<{ x: number; y: number; o?: number }> = ({ x, y, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d="M-170 -10 C -180 -120 180 -120 170 -10 C 180 60 -180 60 -170 -10 Z" fill="#9CC3E8" stroke={INK} strokeWidth={5} />
    <path d="M-120 -40 C -60 -80 60 -80 120 -40" fill="none" stroke="#D6E8F7" strokeWidth={10} strokeLinecap="round" />
    <circle cx={0} cy={-16} r={10} fill={INK} /><Coins x={0} y={-90} n={3} s={0.6} />
    <Label x={0} y={110} text="EMERGENCY CUSHION FIRST" size={42} font="Bebas Neue" color={INK} />
  </g>
)

const Moves: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.second - 8, BC = q.third - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const you: Beat[] = [[0, 'explain', 'smiling'], [q.extra62, 'offer', 'smiling'], [q.tell, 'talk', 'neutral'], [q.add64, 'offer', 'smiling'], [q.early, 'celebrate', 'smiling'], [q.cover, 'stop', 'neutral'], [q.hard, 'explain', 'worried']]
  const youB: Beat[] = [[0, 'explain', 'neutral'], [q.ask70, 'talk', 'smiling'], [q.sooner, 'thumbsUp', 'smiling']]
  const youC: Beat[] = [[0, 'read', 'thinking'], [q.sign71, 'explain', 'neutral'], [q.count, 'point', 'neutral'], [q.adjustable, 'think', 'thinking'], [q.high, 'pointUp', 'worried']]
  // # the extra coin's path: bypass the booth, hit the wall
  const xt = span(f, q.skips, q.straight + 20)
  const knocked = Math.round(1 * on(f, q.straight + 16, 4) + 3 * on(f, q.k2263 + 10, 20))
  const bar = lerp(1, 280 / 360, on(f, q.k23, 24))
  const gauge = lerp(0.91, 0.8, span(f, q.eighty - 10, q.years69 + 10))
  return (
    <g>
      <Stage id="mg-moves" frame={f} />
      <Sky id="mgm-sky" top="#7FB2E0" mid="#CFE3F2" bottom="#FFE9C4" sun={[1480, 330]} sunR={70} f={f} />
      <Hills id="mgm-hills" y={760} cols={['#A9C7D8', '#A7CC93', '#86BA72']} seed={23} />
      <Ground id="mgm-ground" y={860} top="#92C477" bottom="#66A052" rim="#FFF2C9" />
      {/* # A) the wall, the toll booth, the bypass for extra money */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, q.cover, 12)}>
          <path d="M520 940 L1180 940" stroke="#E9D3AE" strokeWidth={60} strokeLinecap="round" />
          <path d="M760 940 C 820 1040, 1100 1040, 1180 960" fill="none" stroke="#F6E7C6" strokeWidth={34} strokeLinecap="round" opacity={on(f, q.skips, 10)} />
          <Booth x={900} y={930} o={on(f, q.simplest, 10)} />
          <Wall x={1420} y={930} gone={knocked} />
          {/* # the regular payment goes into the booth; the extra coin bypasses it */}
          {Array.from({ length: 3 }, (_, i) => { const t = ((f - q.simplest) / 36 + i / 3) % 1; return <g key={i} opacity={on(f, q.simplest, 10) * (1 - on(f, q.skips, 8))} transform={`translate(${lerp(560, 860, t)} ${900})`}><Coins x={0} y={0} n={1} s={0.55} col={BRICK} /></g> })}
          <g opacity={on(f, q.extra62, 8) * (1 - on(f, q.next63, 8))} transform={`translate(${xt > 0 ? (xt < 0.5 ? lerp(620, 980, xt * 2) : lerp(980, 1260, (xt - 0.5) * 2)) : 620} ${xt > 0 ? (xt < 0.5 ? lerp(900, 1010, xt * 2) : lerp(1010, 900, (xt - 0.5) * 2)) : 840})`}>
            <Coins x={0} y={0} n={1} s={0.8} /><Label x={0} y={-50} text="EXTRA" size={36} font="Bebas Neue" color={GOLDD} /></g>
          <g opacity={win(f, q.skips, q.add64, 10)}><rect x={760} y={260} width={720} height={90} rx={45} fill={CREAM} stroke={SAGED} strokeWidth={5} /><Label x={1120} y={322} text="EXTRA SKIPS THE INTEREST BOOTH" size={52} font="Bebas Neue" color={SAGED} /></g>
          {/* # +$200 joins the payment */}
          <g opacity={win(f, q.k200, q.loan65, 8)} transform={`translate(900 ${450 - 10 * pop(f, q.month64, 12) + 10})`}><rect x={-280} y={-60} width={560} height={110} rx={24} fill={CREAM} stroke={INK} strokeWidth={5} />
            <Label x={-80} y={18} text="$2,263" size={70} font="Bebas Neue" color={INK} /><Label x={130} y={18} text="+ $200" size={70} font="Bebas Neue" color={GOLDD} /></g>
          {/* # the timeline shrinks */}
          <g opacity={on(f, q.loan65, 10)} transform="translate(1080 440) scale(0.9)">
            <rect x={-600} y={-40} width={1200} height={80} rx={20} fill="#EFE3CC" stroke={INK} strokeWidth={4} strokeDasharray="16 10" />
            <rect x={-600} y={-40} width={1200 * bar} height={80} rx={20} fill={PLUM} stroke={INK} strokeWidth={4} />
            <Label x={-600 + 600 * bar} y={18} text={on(f, q.k23, 8) > 0.5 ? 'ABOUT 23 YEARS' : '30 YEARS'} size={54} font="Bebas Neue" color={CREAM} />
            <g opacity={on(f, q.seven, 10)}><Label x={-600 + 1200 * bar + (1200 * (1 - bar)) / 2} y={16} text="7 YEARS" size={44} font="Bebas Neue" color={SAGED} /></g>
          </g>
          <g opacity={on(f, q.k126, 10)} transform={`translate(1080 ${300 - 10 * pop(f, q.k126, 12) - 8 * pop(f, q.interest66, 12) + 8}) `}><rect x={-330} y={-56} width={660} height={96} rx={48} fill={GOLD} stroke={INK} strokeWidth={5} /><Label x={0} y={16} text="ABOUT $126,000 LESS INTEREST" size={54} font="Bebas Neue" color={INK} /></g>
        </g>
        {/* # cushion first; payments are one-way */}
        <g opacity={on(f, q.cover, 12)}>
          <g transform="translate(900 760) scale(1.3) translate(-900 -760)"><Cushion x={900} y={760} o={on(f, q.cushion, 10)} /></g>
          <Wall x={1520} y={930} gone={4} o={on(f, q.hard, 10)} />
          <g opacity={on(f, q.hard, 10)}><path d="M1140 600 L1320 600" stroke={INK} strokeWidth={14} strokeLinecap="round" /><path d="M1310 570 L1360 600 L1310 630 Z" fill={INK} />
            <Label x={1250} y={540} text="HARD TO GET BACK" size={46} font="Bebas Neue" color={INK} /></g>
        </g>
        <Person f={f} who="investorF" beats={you} x={260} y={980} s={0.95} />
      </g>}
      {/* # B) mortgage insurance ends sooner */}
      {B > 0 && <g opacity={B}>
        <Umbrella x={760} y={470} s={1.3} open={1 - on(f, q.sooner, 16) * 0.0} />
        <LenderHall id="mgm-hall" x={760} y={860} s={0.6} />
        <g opacity={on(f, q.insurance68, 10)}><Label x={760} y={960} text="MORTGAGE INSURANCE" size={54} font="Bebas Neue" color={CREAM} /></g>
        <OweGauge x={1430} y={700 - 10 * pop(f, q.payments69, 12) + 10} v={gauge} s={0.9} marks={[0.8]} o={on(f, q.typical, 10)} />
        <g opacity={on(f, q.nine69, 10)}><rect x={1250} y={300} width={360} height={70} rx={35} fill={CREAM} stroke={GOLDD} strokeWidth={4} /><Label x={1430} y={348} text="9% DOWN" size={46} font="Bebas Neue" color={INK} /></g>
        <g opacity={on(f, q.nine69b, 10)}><Label x={1430} y={870} text="ABOUT 9 YEARS" size={54} font="Bebas Neue" color={INK} /></g>
        <g opacity={on(f, q.ask70, 10)} transform={`translate(760 ${330 - 8 * pop(f, q.cancel, 12)})`}><rect x={-200} y={-50} width={400} height={86} rx={43} fill={GOLD} stroke={INK} strokeWidth={5} /><Label x={0} y={12} text="ASK TO CANCEL" size={54} font="Bebas Neue" color={INK} /></g>
        <g opacity={on(f, q.extra70, 10)} transform="translate(1250 1000)">{[0, 60].map((dx) => <path key={dx} d={`M${-70 + dx} -30 L${-10 + dx} 0 L${-70 + dx} 30 Z`} fill={SAGED} />)}<Label x={130} y={16} text="SOONER" size={50} font="Bebas Neue" color={SAGED} /></g>
        <Person f={f} who="investorF" beats={youB} x={230} y={980} s={0.95} />
      </g>}
      {/* # C) the whole bill under a magnifying glass; the adjustable ceiling */}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, q.adjustable, 12)}>
          <g transform="translate(1000 900)">
            {([[GOLD, 'PAYING BACK THE LOAN', INK, q.loan71], [BRICK, 'INTEREST', CREAM, q.loan71], [PLUM, 'PROPERTY TAX', CREAM, q.taxes71], ['#5A8FD0', 'HOME INSURANCE', CREAM, q.insurance71], [SAGE, 'MORTGAGE INSURANCE', INK, q.mortgage71]] as [string, string, string, number][]).map(([col, t, ink, at], k) =>
              <g key={k} opacity={on(f, at, 10)}><rect x={-260} y={-110 * (k + 1)} width={520} height={104} rx={12} fill={col} stroke={INK} strokeWidth={5} /><Label x={0} y={-110 * (k + 1) + 66} text={t} size={46} font="Bebas Neue" color={ink} /></g>)}
          </g>
          <g transform={`translate(${lerp(1500, 1230, on(f, q.whole, 20))} ${lerp(700, 560, on(f, q.whole, 20))})`} opacity={on(f, q.whole, 10)}>
            <circle r={150} fill="#E6F3F7" opacity={0.35} stroke={INK} strokeWidth={14} /><path d="M106 106 L230 230" stroke="#8E5A3A" strokeWidth={34} strokeLinecap="round" />
          </g>
          <g opacity={on(f, q.count, 10)}><Label x={1000} y={1010} text="IT ALL COUNTS" size={60} font="Bebas Neue" color={INK} /></g>
        </g>
        <g opacity={on(f, q.adjustable, 12)}>
          <path d="M520 860 L800 860 C 900 860 960 640 1080 620 C 1200 600 1260 480 1400 420" fill="none" stroke="#7A5236" strokeWidth={16} strokeLinecap="round" />
          <path d="M480 360 L1720 360" stroke={BRICK} strokeWidth={8} strokeDasharray="26 18" />
          <g opacity={on(f, q.high, 10)}><rect x={1180} y={240} width={520} height={84} rx={42} fill={CREAM} stroke={BRICK} strokeWidth={5} /><Label x={1440} y={298} text="HOW HIGH CAN IT GO?" size={54} font="Bebas Neue" color={BRICK} /></g>
          <g opacity={on(f, q.starts, 10)}><Label x={640} y={950} text="WHERE IT STARTS" size={50} font="Bebas Neue" color={CREAM} /></g>
          {(() => { const t = span(f, q.adjustable, q.starts + 20), xx = lerp(600, 1380, t), yy = xx < 800 ? 860 : xx < 1080 ? lerp(860, 620, (xx - 800) / 280) : lerp(620, 430, (xx - 1080) / 320)
            return <g transform={`translate(${xx} ${yy - 40})`}><rect x={-56} y={-40} width={112} height={50} rx={10} fill={BRICK} stroke={INK} strokeWidth={4} /><circle cx={-30} cy={20} r={14} fill={INK} /><circle cx={30} cy={20} r={14} fill={INK} /></g> })()}
        </g>
        <Person f={f} who="investorF" beats={youC} x={230} y={980} s={0.95} />
      </g>}
      <Tree x={1830} y={880} s={0.9} col="#6FAE5E" /><Bush x={1650} y={920} s={0.7} />
      <Headline f={f} lines={[[q.years61, 'MOVES THAT SAVE YOU YEARS', INK, 92], [q.simplest, 'MOVE 1: PAY A LITTLE EXTRA', INK, 92], [q.add64, 'ADD $200 A MONTH', INK, 100],
        [q.cover, 'BUT CUSHION FIRST', INK, 100], [q.second, 'MOVE 2: WATCH THE INSURANCE', INK, 92], [q.third, 'MOVE 3: SEE THE WHOLE BILL', INK, 92], [q.adjustable, 'ADJUSTABLE? ASK THIS', BRICK, 96]]} />
      <Vignette id="mg-moves" />
    </g>
  )
}

export const MG_MOVES = makePiece('mg-moves', 'Mortgage step five (a morning garden): the loan as a brick garden wall WHAT YOU OWE; regular payments go through an INTEREST toll booth while an EXTRA gold coin takes a side path straight to the wall and knocks out a brick (EXTRA SKIPS THE INTEREST BOOTH); $2,263 + $200; a timeline bar shrinks from 30 YEARS to ABOUT 23 YEARS (7 years early); a gold badge ABOUT $126,000 LESS INTEREST; an EMERGENCY CUSHION FIRST pillow and a one-way arrow HARD TO GET BACK; the mortgage insurance umbrella over the lender hall with a gauge falling to 80% after about 9 years with 9% down (ASK TO CANCEL, SOONER with extra); a magnifying glass over the five-block bill (loan, interest, property tax, home insurance, mortgage insurance — IT ALL COUNTS); an adjustable-rate rail climbing toward a dashed ceiling HOW HIGH CAN IT GO?', {
  mood: 'light', Component: Moves, beats: Object.values(K),
  sfx: [['s63:straight', 'pop', 0.2], ['s65:23', 'whoosh', 0.2], ['s66:126000', 'ding', 0.2], ['s70:cancel', 'pop', 0.2], ['s72:high', 'tick', 0.2]] })
