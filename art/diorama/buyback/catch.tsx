// ---------------------------------------------------------------- s68–s80: the catch.
// A warning sign swings in. A balance scale: one slice tagged $200 on one pan. The shop pays two $100 notes and the
// scale balances (a tick). Then three notes: the scale tips, the third note glows coral and flies from the till to the
// seller, while thin lines tie the till to the eight who stay; the money slides from stayers to the leaver. A loan
// paper with a chain drops onto the stayers. A $190 price tag on an Apple share; a fogged crystal ball with a question
// mark. A dollar coin at a fork: buyback or a new product, a factory, a paid-off loan. Last: the same pizza under a
// dashed ring, re-cut into fewer pieces.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Doc, Headline, Phone, Tick, fly, win } from '../aimoney/common'
import { Calendar, PriceTag } from '../charts'
import { Figure, Note, Till } from '../gift/kit'
import { LoneSlice, Pizza, Share } from './kit'
import { OWNER_COLORS } from './share'

const Catch: React.FC<PieceProps> = ({ f, c }) => {
  const catch68 = c('s68:catch')
  const good = c('s69:good'), fair = c('s69:fair')
  const shop70 = c('s70:shop'), n200 = c('s70:200')
  const pays71 = c('s71:pays'), nothing = c('s71:nothing'), buys71 = c('s71:buys'), stay71 = c('s71:stay')
  const n300 = c('s72:300'), n100 = c('s72:100'), sells72 = c('s72:sells'), extra73 = c('s73:extra')
  const till73 = c('s73:till'), everyone = c('s73:everyone'), stayed = c('s73:stayed')
  const overpays = c('s74:overpays'), moves = c('s74:moves'), leave = c('s74:leave')
  const borrows = c('s75:borrows'), loan = c('s75:loan'), shares75 = c('s75:shares'), stay75 = c('s75:stay')
  const n190 = c('s76:190'), calc76 = c('s76:calculation')
  const price77 = c('s77:price'), worth77 = c('s77:worth'), nobody = c('s77:nobody')
  const second = c('s78:second'), else78 = c('s78:else'), dollar78 = c('s78:dollar'), bb78 = c('s78:buyback')
  const product = c('s79:product'), factory = c('s79:factory'), loan79 = c('s79:loan')
  const never = c('s80:never'), pieces = c('s80:pieces')
  const A = win(f, 0, borrows), B = win(f, borrows - 4, n190), C = win(f, n190 - 4, second), D = win(f, second - 4, never), E = on(f, never - 4, 8)
  // # the scale tilts: 0 balanced, +1 tips toward the money side
  const tilt = lerp(0, 0, on(f, pays71, 10)) + 12 * easeInOut(span(f, n300, n300 + 14)) * (1 - on(f, till73, 10))
  const notes = f < n300 ? (f >= pays71 ? 2 : 0) : 3
  // # gap fillers (plan gate round 4): one relevant movement in each remaining pause
  const g1 = c('s69:buyback'), g2 = c('s69:owners'), g3 = c('s70:slice'), g4 = c('s74:stay'), g5 = c('s76:bought'), g6 = c('s80:bigger')
  return (
    <g>
      <Stage id="bb-catch" frame={f} />
      <Headline f={f} lines={[[catch68, 'THE CATCH', P.coralInk, 120], [fair, 'ONLY GOOD AT A FAIR PRICE', P.ink, 104], [n200, 'EXAMPLE: A SLICE WORTH $200', P.ink, 96], [nothing, 'PAY $200 · NOBODY LOSES', P.mintInk, 104],
        [n300, 'PAY $300 · $100 TOO MUCH', P.coralInk, 104], [till73, 'IT COMES OUT OF EVERYONE’S TILL', P.ink, 96], [overpays, 'FROM THOSE WHO STAY TO THOSE WHO LEAVE', P.ink, 88], [borrows, 'BORROWED? STAYERS KEEP THE LOAN', P.ink, 96],
        [n190, 'APPLE: ABOUT $190 A SHARE · OUR CALCULATION', P.goldInk, 88], [price77, 'A GOOD PRICE? NOBODY KNOWS FOR SURE', P.ink, 92], [second, 'CATCH 2: THE CASH CAN’T BE USED TWICE', P.ink, 92], [never, 'NEVER A BIGGER PIZZA', P.goldInk, 110]]} />
      {/* # A warning sign swings in, then the balance scale */}
      <g opacity={on(f, catch68, 6) * (1 - on(f, good, 8))} transform={`translate(960 560) rotate(${Math.sin((f - catch68) / 5) * 10 * (1 - span(f, catch68, catch68 + 30))}) scale(${pop(f, catch68) * 1.4})`}><path d="M0 -160 L170 130 L-170 130 Z" fill={P.coral} /><rect x={-14} y={-70} width={28} height={120} rx={10} fill="#FFFFFF" /><circle cx={0} cy={90} r={16} fill="#FFFFFF" /></g>
      {A > 0 && <g opacity={A * on(f, good, 8)}>
        {/* # the scale */}
        <rect x={950} y={360} width={20} height={520} fill={P.ink2} /><path d="M860 900 L1060 900 L960 860 Z" fill={P.ink2} />
        <g transform={`rotate(${-tilt} 960 380)`}>
          <rect x={560} y={370} width={800} height={20} rx={10} fill={P.navy3} />
          {/* # left pan: the slice + its tag */}
          <g transform={`translate(600 ${380 + 0})`}><path d="M-120 0 L120 0 M0 0 L-100 180 M0 0 L100 180" stroke={P.ink2} strokeWidth={4} /><path d="M-130 180 L130 180 L100 220 L-100 220 Z" fill={P.navy3} />
            <g opacity={on(f, shop70, 6)}><LoneSlice x={0} y={-10} r={240} w={36} tint={OWNER_COLORS[3]} /></g>
            <g opacity={on(f, n200, 6)} transform={`translate(110 80) scale(${pop(f, n200)})`}><PriceTag x={0} y={0} text="$200" s={0.9} /></g></g>
          {/* # right pan: the notes */}
          <g transform="translate(1320 380)"><path d="M-120 0 L120 0 M0 0 L-100 180 M0 0 L100 180" stroke={P.ink2} strokeWidth={4} /><path d="M-130 180 L130 180 L100 220 L-100 220 Z" fill={P.navy3} />
            {Array.from({ length: notes }, (_, k) => <g key={k} transform={`translate(0 ${160 - k * 40}) scale(${pop(f, (k < 2 ? pays71 : n300) + k * 3)})`}><Note x={0} y={0} s={0.7} text="100" /></g>)}
            <g opacity={on(f, n100, 6)}><rect x={-100} y={50} width={200} height={50} rx={10} fill="none" stroke={P.coralInk} strokeWidth={8} /></g></g>
        </g>
        <Tick x={960} y={260} o={on(f, nothing, 6) * (1 - on(f, n300, 6))} />
        <g opacity={on(f, buys71, 6) * (1 - on(f, n300, 6))} transform={`translate(600 ${lerp(160, 250, on(f, buys71, 10))})`}><rect x={-110} y={-44} width={220} height={80} rx={16} fill={P.coral} /><text x={0} y={18} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 54px "Bebas Neue"', letterSpacing: 4 }}>SHOP BUYS</text></g>
        {Array.from({ length: 8 }, (_, k) => <g key={k} opacity={on(f, stay71 + k, 5) * (1 - on(f, till73, 6))}><Figure x={560 + k * 110} y={1040} s={0.5} color={OWNER_COLORS[[0, 1, 2, 4, 5, 6, 8, 9][k]]} /></g>)}
        {/* # the seller steps up on the right; the extra note pulses */}
        <g opacity={on(f, sells72, 6) * (1 - on(f, till73, 6))} transform={`translate(${lerp(2000, 1700, on(f, sells72, 12))} 0)`}><Figure x={0} y={1000} s={0.9} color={OWNER_COLORS[3]} hi={1} /></g>
        <circle cx={1320} cy={420} r={110 + 14 * Math.sin((f - extra73) / 3)} fill="none" stroke={P.coralInk} strokeWidth={10} opacity={on(f, extra73, 6) * (1 - on(f, till73 + 30, 6))} transform={`rotate(${-tilt} 960 380)`} />
        {/* # the extra note leaves the till for the seller; the till is tied to the eight who stay */}
        <g opacity={on(f, till73, 6)}>
          <Till x={360} y={760} s={1} open={1} bills={0.6} />
          {Array.from({ length: 8 }, (_, k) => <g key={k} opacity={on(f, everyone + k, 4)}><path d={`M360 700 L${260 + k * 60} ${980}`} stroke={P.ink2} strokeWidth={3} opacity={0.6} /><Figure x={260 + k * 60} y={1040} s={0.42} color={OWNER_COLORS[[0, 1, 2, 4, 5, 6, 8, 9][k]]} hi={on(f, stayed, 6)} /></g>)}
          {(() => { const fl = fly(f, till73 + 8, [360, 700], [1700, 820], 20, 200); return <g opacity={on(f, till73 + 8, 4)}><Note x={fl.x} y={fl.y} s={0.6} text="100" /></g> })()}
          <Figure x={1760} y={1000} s={0.8} color={OWNER_COLORS[3]} hi={on(f, leave, 6)} />
        </g>
        {/* # money slides from stayers to the leaver */}
        {Array.from({ length: 4 }, (_, k) => { const fl = fly(f, moves + k * 4, [300 + k * 80, 960], [1740, 880], 18, 160); return <g key={k} opacity={on(f, moves + k * 4, 3) * (1 - fl.t)}><Coin x={fl.x} y={fl.y} s={0.6} /></g> })}
        <g opacity={on(f, overpays, 6) * 0.9}><path d="M700 1000 L1600 1000" stroke={P.coralInk} strokeWidth={10} strokeDasharray="24 16" /><path d="M1600 980 l40 20 l-40 20 Z" fill={P.coralInk} /></g>
      </g>}
      {/* # B: a loan paper with a chain drops onto the stayers */}
      {B > 0 && <g opacity={B}>
        {Array.from({ length: 8 }, (_, k) => <Figure key={k} x={560 + k * 110} y={1000} s={0.7} color={OWNER_COLORS[[0, 1, 2, 4, 5, 6, 8, 9][k]]} hi={on(f, stay75 + k, 5)} />)}
        {Array.from({ length: 4 }, (_, k) => <g key={k} opacity={on(f, shares75 + k * 2, 5)}><Share x={1450} y={560 - k * 50} s={0.5} r={-6 + k * 4} /></g>)}
        <g opacity={on(f, borrows, 6)} transform={`translate(960 ${lerp(380, 520, easeInOut(span(f, borrows, borrows + 16)))})`}><Doc x={0} y={0} s={0.9} title="LOAN" stamp="OWED" stampO={on(f, loan, 6)} /></g>
        <g opacity={on(f, loan, 6)}>{Array.from({ length: 6 }, (_, k) => <ellipse key={k} cx={960} cy={720 + k * 34} rx={14} ry={20} fill="none" stroke={P.ink2} strokeWidth={8} />)}</g>
      </g>}
      {/* # C: a $190 tag on an Apple share; a fogged ball */}
      {C > 0 && <g opacity={C}>
        <g transform={`translate(${lerp(960, 600, on(f, price77, 12))} 600) scale(${pop(f, n190) * 1.3})`}><Share x={0} y={0} name="APPLE" /><g transform={`translate(150 -110) scale(${pop(f, n190 + 6)})`}><PriceTag x={0} y={0} text="$190" s={1.1} /></g></g>
        <g opacity={on(f, calc76, 6) * (1 - on(f, price77, 6))}><text x={960} y={900} textAnchor="middle" fill={P.ink2} style={{ font: '400 56px "Bebas Neue"' }}>$95B ÷ 499M SHARES</text></g>
        <g opacity={on(f, worth77, 6)} transform={`translate(1360 620) scale(${pop(f, worth77)})`}>
          <circle r={190} fill="#9FB4D6" opacity={0.5} /><circle r={190} fill="none" stroke={P.ink2} strokeWidth={6} />
          {Array.from({ length: 5 }, (_, k) => <ellipse key={k} cx={Math.sin(f / 15 + k) * 60} cy={-60 + k * 30} rx={120} ry={30} fill="#FFFFFF" opacity={0.25} />)}
          <text x={0} y={60} textAnchor="middle" fill={P.ink} opacity={on(f, nobody, 6)} style={{ font: '400 200px "Bebas Neue"' }}>?</text>
          <path d="M-110 190 L110 190 L80 240 L-80 240 Z" fill={P.navy3} />
        </g>
      </g>}
      {/* # D: a dollar coin at a fork: buyback or a product, a factory, a paid-off loan */}
      {D > 0 && <g opacity={D}>
        <g transform={`translate(${lerp(960, 380, on(f, bb78, 12))} ${620 - Math.abs(Math.sin(span(f, dollar78, dollar78 + 20) * Math.PI * 2)) * 120}) scale(${pop(f, second) * 2})`}><Coin x={0} y={0} text="$1" /></g>
        <g opacity={on(f, bb78, 6)}><path d="M480 620 L760 820" stroke={P.ink2} strokeWidth={10} strokeDasharray="20 14" /><g transform="translate(860 860)"><Share x={0} y={0} s={0.55} /></g><text x={860} y={980} textAnchor="middle" fill={P.ink} style={{ font: '400 50px "Bebas Neue"' }}>BUYBACK</text></g>
        <g opacity={on(f, else78, 6)}><path d="M480 620 L760 420" stroke={P.ink2} strokeWidth={10} strokeDasharray="20 14" /><text x={860} y={420} fill={P.ink} style={{ font: '400 120px "Bebas Neue"' }}>?</text></g>
        {[[product, 'NEW PRODUCT', 0], [factory, 'NEW FACTORY', 1], [loan79, 'PAY OFF A LOAN', 2]].map(([at, lab, k]) => (
          <g key={k as number} opacity={on(f, at as number, 6)} transform={`translate(${940 + (k as number) * 320} 400) scale(${pop(f, at as number)})`}>
            <circle r={120} fill={P.card} />
            {k === 0 && <Phone x={0} y={0} s={0.45}><rect x={-60} y={-110} width={120} height={70} rx={10} fill={P.sky} /></Phone>}
            {k === 1 && <g><rect x={-70} y={-30} width={140} height={70} fill="#7A8AA6" /><rect x={30} y={-90} width={26} height={60} fill="#5C6F8E" /><path d="M-70 -30 L-40 -60 L-40 -30 L-10 -60 L-10 -30 Z" fill="#5C6F8E" /></g>}
            {k === 2 && <g><rect x={-60} y={-70} width={120} height={150} rx={10} fill={P.paper} stroke={P.edge} strokeWidth={3} /><Tick x={0} y={10} o={1} r={34} /></g>}
            <text x={0} y={180} textAnchor="middle" fill={P.ink} style={{ font: '400 46px "Bebas Neue"' }}>{lab as string}</text>
          </g>
        ))}
      </g>}
      {/* # E: same pizza under a dashed ring, re-cut into fewer pieces */}
      {E > 0 && <g opacity={E}>
        <Pizza x={960} y={600} r={290} n={on(f, pieces, 6) > 0.5 ? 6 : 10} fx={(k) => ({ tint: OWNER_COLORS[k], pull: 0.08 })} spin={(f - never) * 0.4} />
        <circle cx={960} cy={600} r={330} fill="none" stroke={P.goldInk} strokeWidth={10} strokeDasharray="30 22" opacity={on(f, never + 8, 8)} />
      </g>}
      {/* # gap fillers */}
      <g opacity={on(f, g1, 6) * (1 - on(f, good, 6))}><rect x={950} y={360} width={20} height={520} fill={P.ink2} /></g>
      {A > 0 && <g opacity={A}>
        {Array.from({ length: 8 }, (_, k) => <g key={k} opacity={on(f, g2 + k, 5) * (1 - on(f, stay71, 6))}><Figure x={560 + k * 110} y={1040} s={0.5} color={OWNER_COLORS[[0, 1, 2, 4, 5, 6, 8, 9][k]]} /></g>)}
        <g opacity={on(f, g3, 6) * (1 - on(f, shop70 + 30, 6))} transform={`translate(600 ${lerp(150, 330, easeInOut(span(f, g3, g3 + 12)))})`}><path d="M0 -40 L0 40" stroke={P.goldInk} strokeWidth={10} /><path d="M-20 20 L0 44 L20 20" stroke={P.goldInk} strokeWidth={10} fill="none" /></g>
        <g opacity={on(f, g4, 6) * (1 - on(f, borrows, 6))}><rect x={230} y={940} width={460} height={120} rx={20} fill="none" stroke={P.goldInk} strokeWidth={6} /></g>
      </g>}
      {C > 0 && <g opacity={C * on(f, g5, 6) * (1 - on(f, price77, 6))} transform={`translate(1500 640) scale(${pop(f, g5)})`}><Calendar x={0} y={0} text="FY 24" s={1} /></g>}
      {E > 0 && <g opacity={E}><circle cx={960} cy={600} r={340} fill="none" stroke={P.ink2} strokeWidth={6} opacity={on(f, g6, 6) * (1 - on(f, never + 8, 6))} /></g>}
      <Vignette id="bb-catch" />
    </g>
  )
}

const BEATS = ['s69:buyback', 's69:owners', 's70:slice', 's74:stay', 's76:bought', 's80:bigger', 's68:catch', 's69:good', 's69:fair', 's70:shop', 's70:200', 's71:pays', 's71:buys', 's71:stay', 's71:nothing', 's72:300', 's72:100', 's72:sells', 's73:extra', 's73:till', 's73:everyone', 's73:stayed', 's74:overpays', 's74:moves', 's74:leave',
  's75:borrows', 's75:shares', 's75:stay', 's75:loan', 's76:190', 's76:calculation', 's77:price', 's77:worth', 's77:nobody', 's78:second', 's78:dollar', 's78:buyback', 's78:else', 's79:product', 's79:factory', 's79:loan', 's80:never', 's80:pieces']
export const BB_CATCH = makePiece('bb-catch', 'Buybacks long: a warning sign swings in; a balance scale with a $200 slice; two $100 notes balance it (tick); a third note tips it and flies from the till to the seller while the till is tied to the eight who stay; coins slide from stayers to the leaver; a LOAN paper drops onto the stayers with a chain; a $190 tag on an Apple share and a fogged crystal ball; a $1 coin at a fork: buyback or a new product, factory, or paid-off loan; the same pizza under a dashed ring re-cut into fewer pieces', {
  mood: 'dark', Component: Catch, beats: BEATS,
  sfx: [['s68:catch', 'thud', 0.35], ['s70:200', 'click', 0.3], ['s71:nothing', 'ding', 0.3], ['s72:300', 'thud', 0.3], ['s75:loan', 'crack', 0.3], ['s76:190', 'pop', 0.3], ['s79:product', 'pop', 0.3]] })
