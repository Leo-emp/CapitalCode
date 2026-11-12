// ---------------------------------------------------------------- s50–s60: step four, the price of time (two hill roads at dusk).
// A) Dusk hills; one home on the top. Two roads up to it: a short steep road 15 YEARS (left) and a long winding road
//    30 YEARS (right). Rate flags at each start: 6.6% and 7.2%. Monthly backpacks: $2,922 vs $2,263 (+$660 A MONTH);
//    the walker on the steep road strains ("harder on your budget"). Interest piles at each road's foot grow:
//    $192,000 vs $480,000; a gold badge SAVE ABOUT $289,000 and 15 YEARS SOONER.
// B) "Every extra year": a row of year stepping-stones; each new stone drops one more red interest coin into a pile.
// C) The rate dial: 7.2% turns to 6.2%; the payment tag drops $2,263 → $2,041 (−$221 A MONTH); the interest tower
//    shrinks $480,000 → $401,000 (ABOUT $80,000 LESS). Then three lender halls in a row, each with a ? rate card; you
//    walk past them with a magnifying glass ("compare offers before you sign").
import React from 'react'
import { lerp, on, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { along, BRICK, Coins, CREAM, GOLD, GOLDD, Ground, HillRoad, Hills, Home, INK, LenderHall, SAGE, SAGED, Sky, Tag } from './kit'

const K = {
  time50: 's50:time',
  what51: 's51:what', same51: 's51:same', k334: 's51:334000', fifteen: 's51:15', thirty51: 's51:30',
  shorter: 's52:shorter', lower52: 's52:lower', november: 's52:november', k6: 's52:6', percent52: 's52:percent',
  jumps: 's53:jumps', k2922: 's53:2922', k660: 's53:660', more53: 's53:more',
  catch: 's54:catch', harder: 's54:harder', budget: 's54:budget',
  look: 's55:look', total: 's55:total', k192: 's55:192000', k480: 's55:480000',
  save56: "s56:save", k289: 's56:289000', own: 's56:own', sooner: 's56:sooner',
  simple57: 's57:simple', extra57: 's57:extra', year57: 's57:year', more57: 's57:more', interest57: 's57:interest', owe57: 's57:owe',
  rate58: 's58:rate', say58: 's58:say', every53: 's53:every', loan59: 's59:loan', back58: 's58:back', lower58: 's58:lower', k62: 's58:2',
  drops: 's59:drops', k221: 's59:221', k80: 's59:80000', less59: 's59:less',
  comparing: 's60:comparing', offers: 's60:offers', few: 's60:few', sign60: 's60:sign', money60: 's60:money',
}
type Key = keyof typeof K

const STEEP: [number, number][] = [[560, 1000], [620, 820], [700, 640], [820, 470], [900, 420]]
const LONG: [number, number][] = [[1720, 1000], [1300, 960], [1640, 840], [1200, 790], [1560, 680], [1180, 610], [1460, 520], [1080, 450], [960, 420]]

// # a backpack with the monthly payment
const Pack: React.FC<{ x: number; y: number; t: string; o?: number; s?: number }> = ({ x, y, t, o = 1, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-80} y={-90} width={160} height={170} rx={30} fill="#C9673F" stroke={INK} strokeWidth={5} /><rect x={-60} y={-20} width={120} height={70} rx={14} fill="#E58A5C" stroke={INK} strokeWidth={4} />
    <path d="M-50 -90 C -50 -130 50 -130 50 -90" fill="none" stroke={INK} strokeWidth={8} />
    <rect x={-104} y={84} width={208} height={60} rx={14} fill={CREAM} stroke={INK} strokeWidth={4} /><Label x={0} y={128} text={t} size={44} font="Bebas Neue" color={INK} />
  </g>
)
// # a rate flag at a road start
const Flag: React.FC<{ x: number; y: number; t: string; col: string; o?: number }> = ({ x, y, t, col, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}><rect x={-5} y={-170} width={10} height={170} fill={INK} /><path d="M5 -170 L150 -140 L5 -110 Z" fill={col} stroke={INK} strokeWidth={4} strokeLinejoin="round" /><Label x={62} y={-128} text={t} size={34} font="Bebas Neue" color={INK} /></g>
)

const Time: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.simple57 - 8, BC = q.rate58 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const walk = (a: number, b: number): [number, number] => along(a ? STEEP : LONG, b)
  const t15 = span(f, q.jumps, q.sooner + 20), t30 = span(f, q.jumps, q.sooner + 20) * 0.5
  const [x15, y15] = walk(1, t15), [x30, y30] = walk(0, t30)
  const hiker: Beat[] = [[0, 'walkA', 'neutral', 'walkB', 14], [q.harder, 'carryHeavy', 'worried'], [q.own, 'celebrate', 'smiling']]
  const hiker2: Beat[] = [[0, 'walkA', 'neutral', 'walkB', 18]]
  const you: Beat[] = [[0, 'explain', 'neutral'], [q.lower58, 'point', 'smiling'], [q.k80, 'thumbsUp', 'smiling'], [q.comparing, 'walkA', 'thinking', 'walkB', 16], [q.money60, 'present', 'smiling']]
  const dial = lerp(0, 1, on(f, q.lower58, 20))
  const pile15 = on(f, q.k192, 20), pile30 = on(f, q.k480, 20)
  return (
    <g>
      <Stage id="mg-time" frame={f} />
      <Sky id="mgt-sky" top="#3E3A78" mid="#B87AA0" bottom="#F3A983" sun={[1720, 760]} sunR={70} f={f} />
      <Hills id="mgt-hills" y={760} cols={['#8E7AA6', '#7FA27C', '#6A9A62']} seed={17} />
      <Ground id="mgt-ground" y={900} top="#6E9E5E" bottom="#4E7E44" rim="#F3C08A" />
      {/* # A) two roads to the same home */}
      {A > 0 && <g opacity={A}>
        <path d="M380 1080 L760 420 L1100 420 L1920 1000 L1920 1080 Z" fill="#7FAE72" opacity={0.9} />
        <Home id="mgt-home" x={930} y={340} s={0.45} lit={0.8} />
        <HillRoad id="mgt-steep" pts={STEEP} o={on(f, q.fifteen, 12)} w={44} />
        <HillRoad id="mgt-long" pts={LONG} o={on(f, q.thirty51, 12)} w={44} />
        <g opacity={on(f, q.fifteen, 10)}><Label x={470} y={690} text="15 YEARS" size={64} font="Bebas Neue" color={CREAM} /></g>
        <g opacity={on(f, q.thirty51, 10)}><Label x={1520} y={430} text="30 YEARS" size={64} font="Bebas Neue" color={CREAM} /></g>
        <Flag x={470} y={1010} t="6.6%" col={SAGE} o={on(f, q.k6, 10)} />
        <Flag x={1800} y={1010} t="7.2%" col={BRICK} o={on(f, q.k6, 10)} />
        {/* # walkers carry their monthly packs */}
        <g opacity={on(f, q.jumps, 10)}>
          <Person f={f} who="investorF" beats={hiker} x={x15} y={y15} s={lerp(0.6, 0.3, t15)} />
          <Person f={f} who="investor" beats={hiker2} x={x30} y={y30} s={lerp(0.6, 0.35, t30 * 2)} flip />
        </g>
        <g opacity={win(f, q.k2922, q.look, 10)}><Pack x={210} y={300 - 10 * pop(f, q.every53, 12) + 10} t="$2,922" /><Pack x={1700} y={250} t="$2,263" s={0.85} /></g>
        <g opacity={win(f, q.k660, q.look, 10)}><rect x={80} y={500} width={260} height={70} rx={35} fill={BRICK} /><Label x={210} y={548} text="+$660 A MONTH" size={42} font="Bebas Neue" color={CREAM} /></g>
        {/* # interest piles at the foot of each road */}
        <g opacity={on(f, q.total, 10)}>
          <g transform="translate(250 1000)"><Coins x={0} y={0} n={lerp(0, 8, pile15)} col={BRICK} s={1.1} /><Label x={0} y={-8 * 18 * pile15 - 60} text={pile15 > 0.5 ? '$192,000' : ''} size={54} font="Bebas Neue" color={CREAM} /></g>
          <g transform="translate(1620 1000)"><Coins x={0} y={0} n={lerp(0, 20, pile30)} col={BRICK} s={1.1} /><Label x={0} y={-20 * 18 * pile30 - 60} text={pile30 > 0.5 ? '$480,000' : ''} size={54} font="Bebas Neue" color={CREAM} /></g>
          <Label x={930} y={1050} text="TOTAL INTEREST" size={46} font="Bebas Neue" color={CREAM} />
        </g>
        <g opacity={on(f, q.k289, 10)} transform={`translate(560 ${300 - 10 * pop(f, q.k289, 12)})`}><rect x={-230} y={-56} width={460} height={96} rx={48} fill={GOLD} stroke={INK} strokeWidth={5} /><Label x={0} y={16} text="SAVE ABOUT $289,000" size={54} font="Bebas Neue" color={INK} /></g>
        <g opacity={on(f, q.sooner, 10)}><Label x={560} y={410} text="AND OWN IT 15 YEARS SOONER" size={44} font="Bebas Neue" color={CREAM} /></g>
      </g>}
      {/* # B) every extra year adds a year of interest */}
      {B > 0 && <g opacity={B}>
        <path d="M-40 960 C 500 900, 1200 980, 1960 900" fill="none" stroke="#B49870" strokeWidth={96} strokeLinecap="round" />
        <path d="M-40 960 C 500 900, 1200 980, 1960 900" fill="none" stroke="#E9D3AE" strokeWidth={84} strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => { const at = q.extra57 + i * 7, x = 200 + i * 200; return <g key={i} opacity={on(f, at, 8)}>
          <ellipse cx={x} cy={940} rx={86} ry={30} fill="#CBB79A" stroke={INK} strokeWidth={4} /><Label x={x} y={952} text="+1 YEAR" size={34} font="Bebas Neue" color={INK} />
          <g transform={`translate(${lerp(x, 1720, on(f, at + 6, 16))} ${lerp(860, 900 - i * 18, on(f, at + 6, 16)) - 120 * Math.sin(Math.PI * on(f, at + 6, 16))})`}><Coins x={0} y={0} n={1} col={BRICK} s={0.8} /></g></g> })}
        <g opacity={on(f, q.interest57, 10)}><Label x={1720} y={700} text="MORE INTEREST" size={48} font="Bebas Neue" color={CREAM} /></g>
        <Person f={f} who="investorF" beats={[[0, 'walkA', 'neutral', 'walkB', 14], [q.owe57, 'shrug', 'worried']]} x={lerp(160, 1400, span(f, q.extra57, q.owe57))} y={930} s={0.8} />
        <g opacity={on(f, q.year57, 10)}><rect x={360} y={290} width={1200} height={100} rx={50} fill={CREAM} stroke={BRICK} strokeWidth={5} /><Label x={960} y={360} text="ONE MORE YEAR = ONE MORE YEAR OF INTEREST" size={56} font="Bebas Neue" color={BRICK} /></g>
      </g>}
      {/* # C) one point lower; compare offers */}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, q.comparing, 12)}>
          <g transform={`translate(760 ${560 - 10 * pop(f, q.say58, 12) + 10})`}>
            <circle r={170} fill={CREAM} stroke={GOLDD} strokeWidth={12} />
            {Array.from({ length: 12 }, (_, i) => { const g = (i / 12) * Math.PI * 2; return <path key={i} d={`M${Math.cos(g) * 130} ${Math.sin(g) * 130} L${Math.cos(g) * 150} ${Math.sin(g) * 150}`} stroke={INK} strokeWidth={5} /> })}
            <path d={`M0 0 L${Math.cos(-0.6 - dial * 1.4) * 115} ${Math.sin(-0.6 - dial * 1.4) * 115}`} stroke={BRICK} strokeWidth={12} strokeLinecap="round" /><circle r={18} fill={INK} />
            <rect x={-120} y={185} width={240} height={96} rx={48} fill={CREAM} stroke={INK} strokeWidth={4} /><Label x={0} y={260} text={dial > 0.5 ? '6.2%' : '7.2%'} size={86} font="Bebas Neue" color={dial > 0.5 ? SAGED : BRICK} />
          </g>
          <g opacity={on(f, q.drops, 10)}><Tag x={1300} y={360} t={on(f, q.drops + 10, 6) > 0.5 ? '$2,041 A MONTH' : '$2,263 A MONTH'} s={0.9} /></g>
          <g opacity={on(f, q.k221, 10)}><rect x={1060} y={436} width={480} height={66} rx={33} fill={CREAM} stroke={SAGED} strokeWidth={4} /><Label x={1300} y={484} text="$221 LESS EVERY MONTH" size={48} font="Bebas Neue" color={SAGED} /></g>
          <g opacity={on(f, q.k80, 10)} transform={`translate(1300 ${990 - 8 * pop(f, q.loan59, 12) + 8})`}>
            <rect x={-120} y={-lerp(432, 361, on(f, q.k80, 20))} width={240} height={lerp(432, 361, on(f, q.k80, 20))} rx={10} fill={BRICK} stroke={INK} strokeWidth={5} />
            <rect x={-120} y={-432} width={240} height={432 - lerp(432, 361, on(f, q.k80, 20))} rx={10} fill="none" stroke={BRICK} strokeWidth={4} strokeDasharray="14 10" />
            <Label x={0} y={-lerp(432, 361, on(f, q.k80, 20)) + 60} text="INTEREST" size={52} font="Bebas Neue" color={CREAM} />
            <rect x={160} y={-296} width={360} height={66} rx={33} fill={CREAM} stroke={SAGED} strokeWidth={4} /><Label x={340} y={-250} text="ABOUT $80,000 LESS" size={46} font="Bebas Neue" color={SAGED} />
          </g>
        </g>
        <g opacity={on(f, q.comparing, 12)}>
          {[620, 1060, 1500].map((hx, k) => <g key={k} transform={`translate(0 ${-10 * pop(f, q.few + k * 4, 12)})`}><LenderHall id={`mgt-h${k}`} x={hx} y={860} s={0.5} name={`LENDER ${'ABC'[k]}`} />
            <g transform={`translate(${hx} 420)`}><rect x={-90} y={-50} width={180} height={90} rx={14} fill={CREAM} stroke={INK} strokeWidth={4} /><Label x={0} y={16} text="?%" size={56} font="Bebas Neue" color={INK} /></g></g>)}
          <g opacity={on(f, q.sign60, 10)}><Label x={1060} y={1000} text="COMPARE OFFERS BEFORE YOU SIGN" size={54} font="Bebas Neue" color={CREAM} /></g>
          {/* # the magnifying glass you carry */}
          <g transform={`translate(${lerp(380, 1500, span(f, q.offers, q.money60))} 560)`}><circle r={70} fill="#DFF0F5" opacity={0.5} stroke={INK} strokeWidth={10} /><path d="M50 50 L120 120" stroke="#8E5A3A" strokeWidth={22} strokeLinecap="round" /></g>
        </g>
        <Person f={f} who="investorF" beats={you} x={on(f, q.comparing, 12) > 0.5 ? lerp(240, 300, 0) : 260} y={980} s={0.95} />
      </g>}
      <Headline f={f} lines={[[q.time50, 'THE PRICE OF TIME', CREAM, 104], [q.what51, '15 YEARS OR 30?', CREAM, 104], [q.catch, 'THE CATCH', CREAM, 104], [q.look, 'TOTAL INTEREST', CREAM, 104],
        [q.simple57, 'TIME COSTS INTEREST', CREAM, 100], [q.rate58, 'THE RATE MATTERS TOO', CREAM, 100], [q.comparing, 'COMPARE LENDERS', CREAM, 100]]} />
      <Vignette id="mg-time" />
    </g>
  )
}

export const MG_TIME = makePiece('mg-time', 'Mortgage step four (two hill roads at dusk): one home on a hilltop reached by a short steep road 15 YEARS (6.6% flag) and a long winding road 30 YEARS (7.2% flag); two walkers carry monthly backpacks $2,922 vs $2,263 (+$660 A MONTH), the steep-road walker strains; red interest piles at the foot of each road $192,000 vs $480,000; a gold badge SAVE ABOUT $289,000, own it 15 years sooner; a row of year stepping-stones each dropping one more red coin; a rate dial turns from 7.2% to 6.2%, a tag $2,263 → $2,041 A MONTH ($221 less), the interest tower shrinks to $401,000 (about $80,000 less); three lender halls with ?% cards and a magnifying glass, COMPARE OFFERS BEFORE YOU SIGN', {
  mood: 'light', Component: Time, beats: Object.values(K),
  sfx: [['s53:2922', 'thud', 0.2], ['s56:289000', 'ding', 0.2], ['s58:lower', 'click', 0.2], ['s59:80000', 'pop', 0.2], ['s60:comparing', 'whoosh', 0.2]] })
