// ---------------------------------------------------------------- s48–s68: step three — the split.
// A) Side by side, 2025: two sales columns (store $588B tall, AWS $129B short, "18%"); then two profit columns (store
//    $34B, AWS $45.6B taller); a 57% badge on AWS's profit; Amazon total $80B.
// B) Per $100: two $100 bills; 35 coins hop to an AWS pile, 6 to the store pile; "about 6×".
// C) Not a fluke: five year chips 2021–2025 with AWS's share of operating profit (74%, 2022 >100%, 67%, 58%, 57%), the
//    AWS profit climbing $18.5B → $45.6B. 2022: the store bar dips to −$10.6B, AWS +$22.8B, total $12.2B; AWS lifts the
//    whole company like a crane; "take AWS out": the AWS bar slides away, the rest is in the red.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, fly, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Coin2 } from '../uber/kit'
import { ASpot } from './kit'

const GROUND = 900
const STORE = '#E9A23B', AWS = '#1F2B4A'

const Split: React.FC<PieceProps> = ({ f, c }) => {
  const step48 = c('s48:step'), split48 = c('s48:split')
  const surprising = c('s49:surprising')
  const side50 = c('s50:side'), numbers = c('s50:numbers')
  const aws51 = c('s51:aws'), d129 = c('s51:129')
  const d18 = c('s52:18'), everything52 = c('s52:everything')
  const operating53 = c('s53:operating'), d456 = c('s53:6')
  const total54 = c('s54:total'), d80 = c('s54:80')
  const fifth55 = c('s55:fifth'), d57 = c('s55:57'), profit55 = c('s55:profit')
  const per56 = c('s56:per'), kept56 = c('s56:kept'), d35 = c('s56:35'), every56 = c('s56:every')
  const store57 = c('s57:store'), d6 = c('s57:6')
  const same58 = c('s58:same'), d100 = c('s58:100'), d35b = c('s58:35'), d6b = c('s58:6')
  const six = c('s59:six'), times = c('s59:times')
  const isnt = c("s60:isn't"), fluke = c('s60:fluke')
  const y2021 = c('s61:2021'), y2025 = c('s61:2025'), half61 = c('s61:half')
  const y2021b = c('s62:2021'), d74 = c('s62:74'), y2023 = c('s62:2023'), d67 = c('s62:67'), y2024 = c('s62:2024'), d58 = c('s62:58')
  const own63 = c('s63:own'), climbing = c('s63:climbing'), d185 = c('s63:5'), d456b = c('s63:6')
  const y2022 = c('s64:2022'), lost64 = c('s64:lost'), d106 = c('s64:6')
  const aws65 = c('s65:aws'), d228 = c('s65:8'), whole65 = c('s65:whole'), d122 = c('s65:2')
  const computer66 = c('s66:computer'), carried = c('s66:carried'), company66 = c('s66:company')
  const take67 = c('s67:take'), out67 = c('s67:out'), rest67 = c('s67:rest'), red67 = c('s67:red')
  const step68 = c('s68:step'), smaller = c('s68:smaller'), most68 = c('s68:most')

  const AB = per56 - 6, BC = isnt - 6
  const A = win(f, step48 - 40, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const C1 = 1 - on(f, y2022 - 6, 10), C2 = on(f, y2022 - 6, 10) * (1 - on(f, step68 - 4, 10)), C3 = on(f, step68 - 4, 10)
  const S = 0.75 // # px per billion for sales columns
  const PS = 9 // # px per billion for profit columns

  return (
    <g>
      <Stage id="az-split" frame={f} />
      <ASpot f={f} at={d57} x={1460} y={560} rx={180} ry={200} />
      <ASpot f={f} at={times} x={960} y={420} rx={220} ry={140} />
      <Headline f={f} lines={[[step48, 'STEP 3: THE SPLIT', P.ink, 110], [numbers, "AMAZON'S OWN NUMBERS, 2025", P.ink, 96], [d18, 'AWS: ≈ 18% OF SALES', P.ink, 104], [d57, 'BUT ≈ 57% OF THE PROFIT', P.ink, 104], [d35, 'AWS: ≈ 35¢ PER $1', P.ink, 110], [d6, 'STORE: ≈ 6¢ PER $1', P.ink, 110], [times, 'ABOUT 6× MORE PER DOLLAR', P.ink, 100], [fluke, 'NOT A ONE-YEAR FLUKE', P.ink, 104], [y2022, '2022', P.ink, 120], [carried, 'AWS CARRIED THE COMPANY', P.ink, 100], [red67, 'WITHOUT AWS: IN THE RED', P.coralInk, 100], [step68, 'SMALLER, BUT MOST OF THE PROFIT', P.ink, 92]]} />

      {/* # A) sales side by side, then profit */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [side50, 'present', 'smiling'], [d18, 'point', 'thinking'], [d57, 'shrug', 'shocked'], [profit55, 'thumbsUp', 'smiling']]} x={180} y={GROUND} s={0.75} />
        <g opacity={on(f, c('s50:2025'), 8)} transform={`translate(960 ${220 - 12 * pop(f, c('s51:2025'), 12)})`}><rect x={-80} y={-34} width={160} height={68} rx={12} fill={P.navy3} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 44px "Bebas Neue"' }}>2025</text></g>
        <g opacity={on(f, side50, 8)}><Label x={540} y={300} text="SALES" size={52} font="Bebas Neue" color={P.ink} /><Label x={1380} y={300} text="OPERATING PROFIT" size={52} font="Bebas Neue" color={P.ink} /><line x1={960} y1={280} x2={960} y2={GROUND} stroke={P.edge} strokeWidth={4} strokeDasharray="10 10" /></g>
        {/* # sales */}
        {([[side50, 588, 'STORE', '$588B', STORE, 440], [aws51, 128.7, 'AWS', '$129B', AWS, 680]] as [number, number, string, string, string, number][]).map(([at, v, t, lab, col, x], k) => { const h = lerp(0, v * S, on(f, k === 0 ? at + 6 : d129, 18))
          return <g key={k} opacity={on(f, at, 8)}><rect x={x - 90} y={GROUND - h} width={180} height={h} rx={12} fill={col} /><Label x={x} y={GROUND + 56} text={t} size={44} font="Bebas Neue" color={P.ink} /><Label x={x} y={GROUND - v * S - 26} text={lab} size={44} font="Bebas Neue" color={col === AWS ? P.navy0 : P.goldInk} /></g> })}
        <g opacity={on(f, c('s51:services'), 8) * (1 - on(f, d18, 8))}><Label x={680} y={GROUND - 128.7 * S - 90} text="OF SERVICES" size={36} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, d18, 8)} transform={`translate(680 ${GROUND - 128.7 * S - 110})`}><rect x={-60} y={-30} width={120} height={60} rx={10} fill={AWS} /><text y={12} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>18%</text></g>
        {/* # operating profit */}
        {([[operating53 - 20, 34.4, 'STORE', '$34B', STORE, 1240], [operating53, 45.6, 'AWS', '$45.6B', AWS, 1500]] as [number, number, string, string, string, number][]).map(([at, v, t, lab, col, x], k) => { const h = lerp(0, v * PS, on(f, k === 0 ? at + 6 : d456, 18))
          return <g key={k} opacity={on(f, at, 8)}><rect x={x - 90} y={GROUND - h} width={180} height={h} rx={12} fill={col} /><Label x={x} y={GROUND + 56} text={t} size={44} font="Bebas Neue" color={P.ink} /><g transform={`translate(0 ${k === 1 ? -12 * pop(f, c('s53:billion'), 12) : 0})`}><Label x={x} y={GROUND - v * PS - 26} text={lab} size={44} font="Bebas Neue" color={col === AWS ? P.navy0 : P.goldInk} /></g></g> })}
        <g opacity={on(f, c("s54:amazon's"), 8)}><path d={`M1150 ${GROUND - 45.6 * PS - 90} L1590 ${GROUND - 45.6 * PS - 90}`} stroke={P.ink2} strokeWidth={5} /><Label x={1370} y={GROUND - 45.6 * PS - 110} text={f >= d80 ? 'TOTAL ≈ $80B' : 'TOTAL'} size={42} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, d57, 8)} transform={`translate(1700 ${560 - 16 * pop(f, d57, 12)})`}><circle r={70} fill={AWS} /><text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>57%</text></g>
      </g>}

      {/* # B) per $100 of sales */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        {([[AWS, 'AWS', 560, d35, 35], [STORE, 'STORE', 1360, store57, 6]] as [string, string, number, number, number][]).map(([col, t, x, at, n], k) => (
          <g key={k} opacity={on(f, k === 0 ? per56 : store57 - 6, 8)}>
            <g transform={`translate(${x} 380)`}><rect x={-150} y={-60} width={300} height={120} rx={14} fill="#7FC98F" /><text y={24} textAnchor="middle" fill="#245C3A" style={{ font: '400 76px "Bebas Neue"' }}>$100</text></g>
            <Label x={x} y={GROUND + 56} text={`${t}: ${n === 35 ? '≈ $35' : '≈ $6'} PROFIT`} size={46} font="Bebas Neue" color={col === AWS ? P.navy0 : P.goldInk} />
            {Array.from({ length: n === 35 ? 14 : 3 }, (_, j) => { const fl = fly(f, at + j * 2, [x, 440], [x - 90 + (j % 4) * 60, GROUND - 40 - Math.floor(j / 4) * 40], 14, 60); return f >= at + j * 2 ? <ellipse key={j} cx={fl.x} cy={fl.y} rx={28} ry={10} fill={P.gold} stroke={P.goldD} strokeWidth={3} /> : null })}
          </g>))}
        <g opacity={on(f, same58, 8)} transform={`translate(0 ${-10 * pop(f, c('s58:aws'), 12)})`}><Label x={960} y={300} text="SAME $100 OF SALES" size={44} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, six, 8)} transform={`translate(960 ${560 - 16 * pop(f, times, 12) - 10 * pop(f, c('s59:dollar'), 12)})`}><rect x={-120} y={-56} width={240} height={112} rx={16} fill={P.gold} /><text y={24} textAnchor="middle" fill={P.navy0} style={{ font: '400 80px "Bebas Neue"' }}>≈ 6×</text></g>
        <Person f={f} who="worker" beats={[[0, 'idle', 'smiling'], [d35, 'point', 'smiling'], [d6, 'shrug', 'thinking'], [six, 'celebrate', 'shocked']]} x={1760} y={GROUND} s={0.7} flip />
      </g>}

      {/* # C) every year; 2022; take AWS out */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} />
        <g opacity={C1}>
          {([['2021', '74%', 18.5, y2021b, d74], ['2022', '>100%', 22.8, y2021 + 20, y2021 + 26], ['2023', '67%', 24.6, y2023, d67], ['2024', '58%', 39.8, y2024, d58], ['2025', '57%', 45.6, y2025, half61]] as [string, string, number, number, number][]).map(([yr, pc, v, at, pa], k) => {
            const appear = lerp(fluke, y2025, k / 4), x = 380 + k * 290, h = lerp(0, v * 9, on(f, appear, 18))
            return <g key={k} opacity={on(f, appear, 6)}>
              <rect x={x - 80} y={GROUND - h} width={160} height={h} rx={12} fill={AWS} />
              <Label x={x} y={GROUND + 56} text={yr} size={46} font="Bebas Neue" color={P.ink} />
              <g opacity={on(f, pa, 8)} transform={`translate(${x} ${GROUND - v * 9 - 60})`}><rect x={-70} y={-30} width={140} height={60} rx={10} fill={P.gold} /><text y={12} textAnchor="middle" fill={P.navy0} style={{ font: '400 40px "Bebas Neue"' }}>{pc}</text></g>
              <g opacity={on(f, k === 0 ? d185 : k === 4 ? d456b : 99999, 8)} transform={`translate(0 ${-12 * pop(f, k === 0 ? c('s63:2021') : k === 4 ? c('s63:2025') : 99999, 12)})`}><Label x={x} y={GROUND - v * 9 / 2} text={`$${v}B`} size={40} font="Bebas Neue" color="#FFFFFF" /></g>
            </g> })}
          <g opacity={on(f, fluke, 8)} transform={`translate(0 ${-10 * pop(f, c('s61:operating'), 12)})`}><Label x={960} y={300} text="AWS SHARE OF AMAZON'S OPERATING PROFIT" size={40} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, climbing, 8)} transform={`translate(0 ${-10 * pop(f, c('s63:45'), 12)})`}><path d="M300 560 Q900 470 1540 345" fill="none" stroke={P.mintInk} strokeWidth={8} strokeDasharray="16 10" /><path d="M1510 337 L1540 345 L1522 371" fill="none" stroke={P.mintInk} strokeWidth={8} strokeLinecap="round" /></g>
        </g>
        <g opacity={C2}>
          {/* # 2022: the store dips, AWS rises, the total stays above */}
          <line x1={360} y1={600} x2={1560} y2={600} stroke={P.ink} strokeWidth={5} /><Label x={340} y={612} text="$0" size={42} font="Bebas Neue" color={P.ink} anchor="end" />
          {([['STORE', -10.6, lost64, d106, STORE, 600], ['AWS', 22.8, aws65, d228, AWS, 960], ['ALL OF AMAZON', 12.2, whole65, d122, '#7FC98F', 1320]] as [string, number, number, number, string, number][]).map(([t, v, at, va, col, x], k) => {
            const slide = k === 1 ? on(f, out67, 20) : 0, h = Math.abs(v) * 12 * on(f, at, 18) * (k === 0 ? 1 + 0.04 * pop(f, c('s64:billion'), 12) : 1) * (k === 1 ? 1 + 0.04 * pop(f, c('s65:year'), 12) : 1)
            return <g key={k} opacity={on(f, at, 6) * (1 - slide) * (k === 2 ? 1 - on(f, rest67 - 4, 8) : 1)} transform={`translate(0 ${lerp(0, -260, slide)})`}>
              <rect x={x - 100} y={v < 0 ? 600 : 600 - h} width={200} height={h} rx={12} fill={col} />
              <Label x={x} y={v < 0 ? 560 : 640} text={t} size={42} font="Bebas Neue" color={P.ink} />
              <g opacity={on(f, va, 8)}><Label x={x} y={v < 0 ? 600 + Math.abs(v) * 12 + 50 : 600 - v * 12 - 26} text={`${v < 0 ? '−' : '+'}$${Math.abs(v)}B`} size={48} font="Bebas Neue" color={v < 0 ? P.coralInk : P.navy0} /></g>
            </g> })}
          {/* # AWS carries the company: a lift arrow under the total */}
          <g opacity={on(f, c('s65:operating'), 8) * (1 - on(f, take67, 8))}><path d="M1000 300 Q1120 280 1200 460" fill="none" stroke={P.gold} strokeWidth={10} /><path d="M1178 446 L1200 460 L1206 434" fill="none" stroke={P.gold} strokeWidth={10} strokeLinecap="round" /></g>
          <g opacity={on(f, rest67, 8)}><rect x={1220} y={600} width={200} height={10.6 * 12 * on(f, c('s67:10'), 18)} rx={12} fill={P.coral} /><Label x={1320} y={600 + 10.6 * 12 + 50} text="−$10.6B" size={48} font="Bebas Neue" color={P.coralInk} /><Label x={1320} y={560} text="THE REST" size={42} font="Bebas Neue" color={P.ink} /></g>
          <Person f={f} who="investor" beats={[[0, 'idle', 'thinking'], [lost64, 'facepalm', 'worried'], [d228, 'point', 'smiling'], [carried, 'celebrate', 'smiling'], [red67, 'shrug', 'worried']]} x={1760} y={GROUND} s={0.7} flip />
        </g>
        <g opacity={C3}>
          <rect x={560} y={GROUND - 588 * 0.6} width={240} height={588 * 0.6} rx={12} fill={STORE} /><Label x={680} y={GROUND + 56} text="STORE: MOST SALES" size={42} font="Bebas Neue" color={P.ink} />
          <rect x={1120} y={GROUND - 129 * 0.6} width={240} height={129 * 0.6} rx={12} fill={AWS} /><Label x={1240} y={GROUND + 56} text="AWS: SMALLER" size={42} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, most68, 8)}>{Array.from({ length: 6 }, (_, k) => <Coin2 key={k} x={1240 + (k % 3 - 1) * 70} y={GROUND - 129 * 0.6 - 50 - Math.floor(k / 3) * 70} r={30} t="$" />)}<Label x={1240} y={GROUND - 129 * 0.6 - 230} text="MOST OF THE PROFIT" size={44} font="Bebas Neue" color={P.navy0} /></g>
        </g>
      </g>}
      <Vignette id="az-split" />
    </g>
  )
}

const BEATS = ['s58:aws', 's59:dollar', 's61:operating', 's50:2025', 's51:2025', 's53:billion', "s54:amazon's", 's64:billion', 's65:year', 's51:services', 's63:2021', 's63:45', 's63:2025', 's65:operating', 's67:10', 's48:step', 's48:split', 's49:surprising', 's50:side', 's50:numbers', 's51:aws', 's51:129', 's52:18', 's52:everything', 's53:operating', 's53:6', 's54:total', 's54:80', 's55:fifth', 's55:57', 's55:profit', 's56:per', 's56:kept', 's56:35', 's56:every', 's57:store', 's57:6', 's58:same', 's58:100', 's58:35', 's58:6', 's59:six', 's59:times', "s60:isn't", 's60:fluke', 's61:2021', 's61:2025', 's61:half', 's62:2021', 's62:74', 's62:2023', 's62:67', 's62:2024', 's62:58', 's63:own', 's63:climbing', 's63:5', 's63:6', 's64:2022', 's64:lost', 's64:6', 's65:aws', 's65:8', 's65:whole', 's65:2', 's66:computer', 's66:carried', 's66:company', 's67:take', 's67:out', 's67:rest', 's67:red', 's68:step', 's68:smaller', 's68:most']
export const AZ_SPLIT = makePiece('az-split', 'Amazon long step 3: 2025 side by side — sales: store $588B vs AWS $129B (18%); operating profit: store $34B vs AWS $45.6B, total about $80B, AWS 57%; per $100 of sales AWS keeps about $35, the store about $6, about 6 times; every year 2021–2025 AWS made more than half of operating profit (74%, over 100% in 2022, 67%, 58%, 57%), its profit climbing $18.5B to $45.6B; 2022: store −$10.6B, AWS +$22.8B, all of Amazon +$12.2B, AWS carried the company and without it the rest was in the red; smaller, but most of the profit', {
  mood: 'light', Component: Split, beats: BEATS,
  sfx: [['s51:129', 'pop', 0.2], ['s52:18', 'pop', 0.2], ['s53:6', 'pop', 0.2], ['s55:57', 'thud', 0.25], ['s56:35', 'coin', 0.2], ['s57:6', 'coin', 0.15], ['s59:times', 'pop', 0.25], ['s64:lost', 'thud', 0.2], ['s65:8', 'pop', 0.2], ['s67:out', 'swish', 0.2]] })
