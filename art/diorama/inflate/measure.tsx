// ---------------------------------------------------------------- s17–s24: step two, how it's measured (a town of shopfronts, then the basket).
// A) A row of three places — a grocery store, an apartment block, a doctor's office — and a BLS price checker (worker) with a
//    clipboard walking past them; a tally on the clipboard counts to ≈ 80,000 items. Bread, a gas pump, scissors (haircut)
//    and a little car (insurance) pop above the places as they are named.
// B) Everything drops into one big wicker BASKET. Inside, things are sized by how much people spend: a big house (rent)
//    next to a tiny ketchup bottle.
// C) Two baskets side by side: LAST YEAR $250, TODAY $260; a +$10 coin moves across; = 4 %.
// D) A TV on a stand shows the news: CPI 4 %; then a big question mark: WHY?
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Car, House, K, Label, Tag } from './kit'

const G = 920

const Town: React.FC<{ id: string; f: number }> = ({ id, f }) => (
  <g>
    <defs><linearGradient id={`${id}-s`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#CDEAF6" /><stop offset="1" stopColor="#F4FAF2" /></linearGradient></defs>
    <rect x={-200} y={-200} width={2400} height={1500} fill={`url(#${id}-s)`} />
    {[0, 1].map((k) => { const x = ((300 + k * 1000 + f * 0.3) % 2300) - 200; return <g key={k} transform={`translate(${x} ${170 + 50 * k})`} opacity={0.85}><ellipse rx={110} ry={26} fill="#FFFFFF" /><ellipse cx={-34} cy={-18} rx={50} ry={30} fill="#FFFFFF" /></g> })}
    <g opacity={0.45}>{Array.from({ length: 12 }, (_, k) => <rect key={k} x={-60 + k * 180} y={G - 320 - (k % 3) * 60} width={160} height={400} fill={k % 2 ? '#B8C9D9' : '#A9BCCF'} />)}</g>
    <rect x={-200} y={G} width={2400} height={400} fill="#CFC6B8" />
    <rect x={-200} y={G} width={2400} height={30} fill="#E4DCCD" />
    {Array.from({ length: 20 }, (_, k) => <rect key={k} x={-200 + k * 130} y={G + 80} width={80} height={10} rx={5} fill="#FFFFFF" opacity={0.6} />)}
  </g>
)
const Place: React.FC<{ x: number; kind: 'store' | 'flat' | 'doctor'; o: number; lit: number }> = ({ x, kind, o, lit }) => {
  const c = { store: K.coral, flat: K.plum, doctor: K.mintD }[kind], name = { store: 'STORE', flat: 'RENTALS', doctor: 'DOCTOR' }[kind]
  return (
    <g transform={`translate(${x} ${G})`} opacity={o}>
      <ellipse cy={6} rx={210} ry={14} fill="#000" opacity={0.12} />
      <rect x={-180} y={kind === 'flat' ? -470 : -340} width={360} height={kind === 'flat' ? 470 : 340} fill={K.cream} />
      <rect x={-196} y={kind === 'flat' ? -500 : -370} width={392} height={40} rx={8} fill={c} />
      {kind === 'flat' ? Array.from({ length: 6 }, (_, k) => <rect key={k} x={-140 + (k % 3) * 100} y={-430 + Math.floor(k / 3) * 120} width={70} height={80} rx={6} fill={lit > 0.5 ? K.sun : K.ice} />)
        : <rect x={-150} y={-280} width={180} height={140} rx={8} fill={lit > 0.5 ? '#FFF1C9' : K.ice} />}
      {kind === 'doctor' && <g transform="translate(110 -250)"><rect x={-14} y={-44} width={28} height={88} fill={K.red} /><rect x={-44} y={-14} width={88} height={28} fill={K.red} /></g>}
      <rect x={60} y={-190} width={90} height={190} rx={8} fill={K.wood} />
      <rect x={-120} y={kind === 'flat' ? -530 : -400} width={240} height={0} />
      <g transform={`translate(0 ${kind === 'flat' ? -540 : -410})`}><rect x={-100} y={-34} width={200} height={56} rx={12} fill={K.paper} /><text y={12} textAnchor="middle" fill={K.ink} style={BB(40)}>{name}</text></g>
    </g>
  )
}

const Measure: React.FC<PieceProps> = ({ f, c }) => {
  const bureau17 = c('s17:bureau'), statistics17 = c('s17:statistics'), agency17 = c('s17:agency'), records17 = c('s17:records'), n80k = c('s17:80000'), items17 = c('s17:items')
  const staff18 = c('s18:staff'), thousands18 = c('s18:thousands'), stores18 = c('s18:stores'), rentals18 = c('s18:rentals'), doctors18 = c('s18:doctors'), bread18 = c('s18:bread'), gas18 = c('s18:gas'), haircuts18 = c('s18:haircuts'), insurance18 = c('s18:insurance')
  const prices19 = c('s19:prices'), cart19 = c('s19:cart'), basket19 = c('s19:basket'), typical19 = c('s19:typical'), city19 = c('s19:city')
  const ago21b = c('s21:ago'), basket22b = c('s22:basket'), one23 = c('s23:one'), inflation23 = c('s23:inflation'), hear23 = c('s23:hear'), basket24 = c('s24:basket'), spend20 = c('s20:spend'), count20 = c('s20:count'), rent20 = c('s20:rent'), ketchup20 = c('s20:ketchup'), bigger20 = c('s20:bigger'), budgets20 = c('s20:budgets')
  const compare21 = c('s21:compare'), now21 = c('s21:now'), month21 = c('s21:month'), ago21 = c('s21:ago')
  const basket22 = c('s22:basket'), n250 = c('s22:250'), last22 = c('s22:last'), n260 = c('s22:260'), rose22 = c('s22:rose'), n10 = c('s22:10'), n250b = c('s22:250#2'), n4 = c('s22:4'), inflation22 = c('s22:inflation')
  const consumer23 = c('s23:consumer'), cpi23 = c('s23:cpi'), news23 = c('s23:news')
  const number24 = c('s24:number'), expensive24 = c('s24:expensive'), tell24 = c('s24:tell'), why24 = c('s24:why')

  const AB = prices19 - 4, BC = compare21 - 4, CD = consumer23 - 4
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = on(f, CD - 8, 10)

  // # A) the checker walks along the places
  const walkX = lerp(260, 1500, span(f, staff18, insurance18 + 10))
  const tally = Math.round(80000 * span(f, records17, items17 + 8))
  const wBeats: Beat[] = [[0, 'read', 'neutral'], [records17, 'countA', 'neutral', 'countB', 14], [items17, 'holdUp', 'smiling'], [staff18, 'walkA', 'neutral', 'walkB', 14], [insurance18, 'read', 'smiling']]
  // # B) the basket fills
  const drop = (a: number) => span(f, a, a + 14)
  // # C) two baskets
  const coin = span(f, rose22, n10 + 10)

  return (
    <g>
      <Town id="in-m" f={f} />
      {/* # A) the places and the price checker */}
      {A > 0 && <g opacity={A}>
        <Place x={420} kind="store" o={on(f, stores18 - 6, 10) + on(f, bureau17, 10) * 0.35 * (1 - on(f, stores18 - 6, 10))} lit={on(f, stores18, 8)} />
        <Place x={960} kind="flat" o={on(f, rentals18 - 6, 10) + on(f, bureau17, 10) * 0.35 * (1 - on(f, rentals18 - 6, 10))} lit={on(f, rentals18, 8)} />
        <Place x={1500} kind="doctor" o={on(f, doctors18 - 6, 10) + on(f, bureau17, 10) * 0.35 * (1 - on(f, doctors18 - 6, 10))} lit={on(f, doctors18, 8)} />
        {/* the things being priced, popping above the places */}
        <g opacity={on(f, bread18, 8)} transform={`translate(420 ${380 - 10 * pop(f, bread18, 12)})`}><ellipse rx={60} ry={36} fill="#E7A55C" stroke="#B9783A" strokeWidth={5} /><path d="M-30 -10 L-10 10 M0 -14 L20 6 M30 -10 L46 4" stroke="#B9783A" strokeWidth={5} /></g>
        <g opacity={on(f, gas18, 8)} transform={`translate(600 ${380 - 10 * pop(f, gas18, 12)})`}><rect x={-40} y={-60} width={80} height={120} rx={10} fill={K.red} /><rect x={-26} y={-44} width={52} height={36} rx={4} fill={K.paper} /><path d="M40 -30 Q70 -30 70 0 L70 40" fill="none" stroke={K.ink} strokeWidth={8} /></g>
        <g opacity={on(f, haircuts18, 8)} transform={`translate(1130 ${330 - 10 * pop(f, haircuts18, 12)})`}><circle cx={-24} cy={30} r={20} fill="none" stroke={K.ink} strokeWidth={7} /><circle cx={24} cy={30} r={20} fill="none" stroke={K.ink} strokeWidth={7} /><path d="M-12 16 L34 -56 M12 16 L-34 -56" stroke="#9AA5B4" strokeWidth={9} strokeLinecap="round" /></g>
        <g opacity={on(f, insurance18, 8)}><Car x={1500} y={390 - 10 * pop(f, insurance18, 12)} s={0.6} c={K.sea} /></g>
        {/* the checker with a clipboard */}
        <g opacity={on(f, staff18 - 30, 10)}>
          <Person f={f} who="worker" beats={wBeats} x={f >= staff18 ? walkX : 260} y={G + 30} s={0.85} />
        </g>
        <g opacity={on(f, records17, 8)} transform={`translate(${(f >= staff18 ? walkX : 260) + 170} 520)`}>
          <rect x={-110} y={-80} width={220} height={130} rx={14} fill={K.ink} /><text y={-28} textAnchor="middle" fill={K.lilac} style={BB(30)}>PRICES CHECKED</text>
          <text y={30} textAnchor="middle" fill={K.sun} style={BB(56)}>{f >= items17 ? '≈ 80,000' : tally.toLocaleString('en-US')}</text>
        </g>
        <g opacity={on(f, statistics17, 8) * (1 - on(f, staff18, 8))}><Label x={960} y={G + 70} text="BUREAU OF LABOR STATISTICS" size={40} /></g>
        <g opacity={on(f, thousands18, 8) * (1 - on(f, prices19 - 8, 8))}><Label x={960} y={G + 70} text="THOUSANDS OF PLACES" size={40} /></g>
      </g>}
      {/* # B) the basket */}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(960 ${G})`}>
          <ellipse cy={10} rx={520} ry={26} fill="#000" opacity={0.12} />
          {/* contents, sized by spending */}
          <g opacity={on(f, rent20 - 4, 10)} transform={`translate(-160 ${-250 + lerp(-300, 0, drop(rent20 - 4))}) scale(${1 + 0.15 * on(f, bigger20, 12)})`}><House x={0} y={0} s={1.2} c={K.coral} /></g>
          <g opacity={on(f, ketchup20, 8)} transform={`translate(230 ${-250 + lerp(-300, 0, drop(ketchup20))})`}><rect x={-16} y={-70} width={32} height={70} rx={8} fill={K.red} /><rect x={-10} y={-90} width={20} height={22} rx={4} fill={K.paper} /></g>
          <g opacity={on(f, cart19, 8) * (1 - on(f, rent20 - 4, 8))}>{[[-200, -300, K.sun], [-60, -320, K.mint], [80, -300, K.coral], [200, -310, K.sea]].map(([x, y, col], k) => <circle key={k} cx={x as number} cy={lerp(-600, y as number, drop(cart19 + k * 3))} r={46 * (1 + [0.5, -0.3, 0.2, -0.4][k] * on(f, count20, 12))} fill={col as string} />)}</g>
          <path d="M-460 -260 L460 -260 L400 0 L-400 0 Z" fill="#C99A5B" />
          {Array.from({ length: 9 }, (_, k) => <path key={k} d={`M${-440 + k * 110} -250 L${-390 + k * 100} -10`} stroke="#A97B42" strokeWidth={10} />)}
          {Array.from({ length: 4 }, (_, k) => <rect key={k} x={-450 + k * 14} y={-220 + k * 56} width={900 - k * 28} height={10} rx={5} fill="#A97B42" />)}
          <path d="M-300 -260 Q0 -560 300 -260" fill="none" stroke="#A97B42" strokeWidth={22} />
          <g opacity={on(f, basket19, 8)}><Label x={0} y={70} text={f >= city19 ? 'A TYPICAL US CITY HOUSEHOLD' : 'THE BASKET'} size={42} fill={K.ink} ink={K.paper} /></g>
        </g>
        <g opacity={on(f, rent20, 8)}><Label x={800} y={300} text={f >= budgets20 ? 'RENT: A BIG PART OF BUDGETS' : 'RENT: BIG'} size={44} fill={K.coral} ink={K.paper} /></g>
        {/* a typical household beside the basket */}
        <g opacity={on(f, typical19, 8) * (1 - on(f, spend20, 8))}>{[0, 1, 2].map((k) => <g key={k} transform={`translate(${1560 + k * 90} ${G - 10})`}><circle cy={k === 2 ? -80 : -120} r={k === 2 ? 20 : 26} fill="#E8B48E" /><path d={k === 2 ? 'M-22 0 L-22 -46 Q-22 -62 0 -62 Q22 -62 22 -46 L22 0 Z' : 'M-30 0 L-30 -70 Q-30 -94 0 -94 Q30 -94 30 -70 L30 0 Z'} fill={[K.plum, K.coral, K.sea][k]} /></g>)}</g>
        <g opacity={on(f, ketchup20, 8)}><Label x={1190} y={500} text="KETCHUP: TINY" size={38} /></g>
        <g opacity={on(f, spend20, 8) * (1 - on(f, rent20, 8))}><Label x={960} y={300} text="BIGGER SPENDING COUNTS MORE" size={44} /></g>
      </g>}
      {/* # C) last year vs today */}
      {Cc > 0 && <g opacity={Cc}>
        {[0, 1].map((k) => { const x = k ? 1360 : 560, o = k ? on(f, n260 - 4, 10) : on(f, compare21, 10)
          return <g key={k} opacity={o} transform={`translate(${x} ${G})`}>
            <ellipse cy={8} rx={300} ry={18} fill="#000" opacity={0.12} />
            {[[-130, -230, K.sun], [-20, -250, K.mint], [100, -235, K.coral]].map(([bx, by, col], j) => <circle key={j} cx={bx as number} cy={by as number} r={52} fill={col as string} />)}
            <path d="M-270 -180 L270 -180 L230 0 L-230 0 Z" fill="#C99A5B" />
            {Array.from({ length: 6 }, (_, j) => <path key={j} d={`M${-250 + j * 100} -172 L${-210 + j * 84} -8`} stroke="#A97B42" strokeWidth={8} />)}
            <Label x={0} y={70} text={k ? (f >= now21 ? 'TODAY' : 'NOW') : (f >= month21 ? 'SAME MONTH, LAST YEAR' : 'LAST YEAR')} size={40} />
            {!k && <g opacity={on(f, ago21b, 8)} transform="translate(0 -520)"><rect x={-90} y={-50} width={180} height={100} rx={14} fill={K.paper} stroke={K.ink} strokeOpacity={0.2} strokeWidth={3} /><rect x={-90} y={-50} width={180} height={30} rx={10} fill={K.coral} /><text y={34} textAnchor="middle" fill={K.ink} style={BB(40)}>−12 MO</text></g>}
            <Tag x={0} y={-370 - 8 * pop(f, k ? n260 : n250, 12) - 8 * (k ? 0 : pop(f, basket22b, 12))} s={1.2} text={k ? '$260' : (f >= n250 ? '$250' : '$?')} color={k ? K.coral : K.sun} />
          </g> })}
        {f >= rose22 && <g transform={`translate(${lerp(640, 1290, coin)} ${420 - 120 * Math.sin(Math.PI * coin)})`}><circle r={46} fill={K.sun} stroke={K.sunD} strokeWidth={6} /><text y={14} textAnchor="middle" fill={K.ink} style={BB(40)}>+$10</text></g>}
        <g opacity={on(f, n250b, 8)}><Label x={960} y={240} text="$10 ÷ $250" size={56} /></g>
        <g opacity={on(f, n4, 8)} transform={`translate(960 330) scale(${1 + 0.12 * pop(f, inflation22, 14) + 0.08 * pop(f, one23, 14)})`}><Label x={0} y={0} text="= 4% INFLATION" size={60} fill={K.coral} ink={K.paper} /></g>
      </g>}
      {/* # D) the TV news, then why? */}
      {D > 0 && <g opacity={D}>
        <g transform={`translate(${lerp(960, 700, on(f, number24, 14))} ${G})`}>
          <rect x={-12} y={-200} width={24} height={200} fill={K.woodD} /><rect x={-120} y={-14} width={240} height={14} rx={7} fill={K.woodD} />
          <rect x={-330} y={-620} width={660} height={430} rx={26} fill={K.ink} /><rect x={-306} y={-596} width={612} height={382} rx={16} fill="#2F4C6E" />
          <rect x={-306} y={-290} width={612} height={76} fill={K.coral} /><text y={-238} textAnchor="middle" fill={K.paper} style={BB(46)}>{f >= news23 ? 'TONIGHT: INFLATION NEWS' : 'CONSUMER PRICE INDEX'}</text>
          <text y={-400} textAnchor="middle" fill={K.sun} style={BB(150)}>{f >= cpi23 ? 'CPI 4%' : '4%'}</text>
        </g>
        {/* sound waves from the TV as you hear it */}
        <g opacity={win(f, hear23, number24 + 10, 6)} transform="translate(1320 560)">{[0, 1, 2].map((k) => <path key={k} d={`M${k * 40} -60 Q${k * 40 + 40} 0 ${k * 40} 60`} fill="none" stroke={K.coral} strokeWidth={10} strokeLinecap="round" opacity={0.4 + 0.6 * on(f, hear23 + k * 4, 6)} />)}</g>
        <g opacity={win(f, inflation23, hear23, 4)}><rect x={630} y={340} width={660} height={20} rx={10} fill={K.sun} opacity={0.8} /></g>
        <g opacity={on(f, basket24, 8)} transform="translate(1400 600)"><path d="M-130 -80 L130 -80 L110 0 L-110 0 Z" fill="#C99A5B" /><path d="M-90 -80 Q0 -180 90 -80" fill="none" stroke="#A97B42" strokeWidth={12} /></g>
        <g opacity={on(f, expensive24, 8)}><Tag x={1400} y={420} s={1.4} text="BASKET ↑" color={K.coral} /></g>
        <g opacity={on(f, tell24, 8)} transform={`translate(1400 ${700 - 10 * pop(f, why24, 14)})`}><circle r={110} fill={K.sun} /><text y={50} textAnchor="middle" fill={K.ink} style={BB(170)}>?</text></g>
      </g>}
      <Headline f={f} lines={[[bureau17, 'STEP 2: HOW IT IS MEASURED', K.ink, 90], [prices19, 'ONE IMAGINARY BASKET', K.ink, 96], [compare21, 'SAME BASKET, A YEAR LATER', K.ink, 92], [consumer23, 'THE CPI', K.ink, 110], [why24, 'BUT WHY?', K.coralD, 110]]} />
    </g>
  )
}

export const IN_MEASURE = makePiece('in-measure', "Step two, how inflation is measured: a street of three places (a store, a rentals block, a doctor's office) light up as a Bureau of Labor Statistics price checker with a clipboard walks past, a counter ticks to about 80,000 prices, and bread, a gas pump, scissors and a car (insurance) pop above them; everything drops into one big wicker basket where a big house (rent) sits next to a tiny ketchup bottle; two baskets, last year 250 dollars and today 260, a +10 dollar coin hops across, 10 out of 250 = 4 percent inflation; a TV news screen shows CPI 4 percent, then a big question mark: why?", {
  mood: 'light', Component: Measure,
  beats: ["s17:bureau", "s17:statistics", "s17:records", "s17:items", "s18:staff", "s18:thousands", "s18:stores", "s18:rentals", "s18:doctors", "s18:bread", "s18:gas", "s18:haircuts", "s18:insurance", "s19:prices", "s19:cart", "s19:basket", "s19:typical", "s19:city", "s21:ago", "s22:basket", "s23:one", "s23:inflation", "s23:hear", "s24:basket", "s20:spend", "s20:count", "s20:rent", "s20:ketchup", "s20:bigger", "s20:budgets", "s21:compare", "s21:now", "s21:month", "s22:250", "s22:260", "s22:rose", "s22:10", "s22:250#2", "s22:4", "s22:inflation", "s23:consumer", "s23:cpi", "s23:news", "s24:number", "s24:expensive", "s24:tell", "s24:why"],
  sfx: [['s17:80000', 'tick', 0.1], ['s20:rent', 'thud', 0.1], ['s22:10', 'coin', 0.1], ['s23:cpi', 'ding', 0.1]] })
