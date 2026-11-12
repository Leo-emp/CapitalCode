// ---------------------------------------------------------------- s8–s25: idea one, inflation (cream).
// A) A price arrow climbs; a giant shopping basket fills on the words (food, rent, cars, haircuts); an inspector with a
//    clipboard checks it every month (calendar pages); some items jump, others barely move.
// B) The basket's tag goes $100 → $103.70 between SEPT 2025 and SEPT 2026; then tags climb a staircase, year after year.
// C) The Federal Reserve aims for about 2% a year: a target dial; at 2%, a $100 tag doubles to $200 over ~35 years along
//    a timeline where a young worker grows old; in 2026 the dial's needle sits near twice the target (3.7%).
// D) 2000 → 2026: a $100 tag becomes $199; the drawer bill buys about half; the bill didn't change, the prices did.
// E) Some years are worse: June-to-June bars 2018–2026 (sourced points), the 2022 bar spikes to 9% (fastest in ~40 years).
// F) Recap: the same $1 bill buys a shrinking basket.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { CalPage, DollarBill, NoMark } from '../bank/kit'
import { Mini } from '../../rig/Mini'
import { Basket, Item, Tag } from './kit'

const GROUND = 930
const BARS: [string, number][] = [['2018', 2.8], ['2019', 1.7], ['2020', 0.7], ['2021', 5.3], ['2022', 9.0], ['2023', 3.1], ['2024', 3.0], ['2025', 2.7], ['2026', 3.5]]

const Inflation: React.FC<PieceProps> = ({ f, c }) => {
  const inflation8 = c('s8:inflation')
  const prices9 = c('s9:prices'), up9 = c('s9:up'), time9 = c('s9:time')
  const government10 = c('s10:government'), measures = c('s10:measures'), consumer = c('s10:consumer'), index10 = c('s10:index')
  const picture = c('s11:picture'), basket11 = c('s11:basket'), food = c('s11:food'), rent = c('s11:rent'), cars = c('s11:cars'), haircuts = c('s11:haircuts'), everything = c('s11:everything')
  const month12 = c('s12:month'), checks = c('s12:checks'), costs12 = c('s12:costs')
  const evenly = c('s13:evenly'), jump = c('s13:jump'), barely = c('s13:barely'), average13 = c('s13:average')
  const sept25 = c('s14:september'), sept26 = c('s14:september#2'), p3 = c('s14:3'), expensive = c('s14:expensive')
  const cost15 = c('s15:cost'), d100 = c('s15:100'), now15 = c('s15:now'), d103 = c('s15:103'), cents15 = c('s15:cents')
  const much16 = c('s16:much'), keeps16 = c('s16:keeps'), year16b = c('s16:year#2'), year16c = c('s16:year#3')
  const little17 = c('s17:little'), federal = c('s17:federal'), central17 = c('s17:central'), aims = c('s17:aims'), p2 = c('s17:2'), run17 = c('s17:run')
  const normal18 = c('s18:normal'), double18 = c('s18:double'), d35 = c('s18:35'), working = c('s18:working'), life = c('s18:life')
  const year19 = c('s19:year'), index19 = c('s19:index'), twice = c('s19:twice'), fast19 = c('s19:fast')
  const since20 = c('s20:since'), y2000 = c('s20:2000'), price20 = c('s20:price'), doubled = c('s20:doubled')
  const things11 = c('s11:things'), buy11 = c('s11:buy'), jan21 = c('s21:january'), took21b = c('s21:took#2'), thats22 = c("s22:that's"), b100_22 = c('s22:100'), doesnt25 = c("s25:doesn't"), out25 = c('s25:out'), took21 = c('s21:took'), d199 = c('s21:199'), sept21 = c('s21:september')
  const drawer22 = c('s22:drawer'), half22 = c('s22:half'), bill22 = c('s22:bill'), change22 = c('s22:change'), prices22 = c('s22:prices')
  const some23 = c('s23:some'), worse = c('s23:worse')
  const june24 = c('s24:june'), y2022 = c('s24:2022'), jumped = c('s24:jumped'), p9 = c('s24:9'), fastest = c('s24:fastest'), d40 = c('s24:40')
  const step25 = c('s25:step'), wallet = c('s25:wallet'), each25 = c('s25:each'), less25 = c('s25:less')

  const AB = sept25 - 8, BC = little17 - 8, CD = since20 - 8, DE = some23 - 8, EF = step25 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = win(f, CD, DE), E = win(f, DE, EF), F = on(f, EF, 10)
  // # A) items arrive in the basket on their words
  const itemAt = [food, food + 4, food + 8, rent, cars, haircuts, everything, everything + 4, everything + 8, everything + 12]
  const shownA = itemAt.filter((a) => f >= a).length
  // # some items jump on "jump"
  const jumpPop = Array.from({ length: 10 }, (_, i) => (i % 3 === 0 ? 2.2 * win(f, jump + i, jump + i + 30, 6) : 0.2 * win(f, barely, barely + 20, 6)))

  return (
    <g>
      <Stage id="m4-infl" frame={f} />
      <Headline f={f} lines={[[inflation8, 'IDEA 1: INFLATION', P.ink, 110], [prices9, 'PRICES RISE OVER TIME', P.ink, 106], [consumer, 'THE CONSUMER PRICE INDEX', P.ink, 100], [evenly, 'NOT ALL PRICES RISE EVENLY', P.ink, 100], [sept25, 'ONE YEAR: ≈ +3.7%', P.coralInk, 104], [keeps16, 'YEAR AFTER YEAR', P.ink, 108], [federal, 'THE FED AIMS FOR ≈ 2%', P.ink, 104], [year19, '2026: NEARLY TWICE THAT', P.coralInk, 100], [since20, 'SINCE 2000: PRICES ≈ DOUBLED', P.ink, 100], [some23, 'SOME YEARS ARE WORSE', P.coralInk, 104], [step25, 'EACH DOLLAR BUYS LESS', P.ink, 108]]} />

      {/* # A) the basket and its inspector */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} />
        <g opacity={win(f, prices9, picture, 8)}>{/* the price arrow */}
          <path d={`M300 860 L${lerp(300, 1500, on(f, up9, 30))} ${lerp(860, 380, on(f, up9, 30))}`} stroke={P.coral} strokeWidth={22} strokeLinecap="round" fill="none" />
          <path d="M0 -40 L60 0 L0 40 Z" fill={P.coral} transform={`translate(${lerp(300, 1500, on(f, up9, 30))} ${lerp(860, 380, on(f, up9, 30))}) rotate(-22)`} />
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, time9 + k * 6, 6)}><Tag x={500 + k * 360} y={720 - k * 140} t={['$', '$$', '$$$'][k]} s={0.9} /></g>)}
        </g>
        <g opacity={on(f, government10, 10) * (1 - on(f, picture, 10))}>
          <rect x={760} y={460} width={400} height={300} rx={18} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={4} /><rect x={760} y={460} width={400} height={70} rx={18} fill="#2E5C9A" />
          <text x={960} y={510} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>CPI</text>
          {[0, 1, 2, 3].map((k) => <rect key={k} x={800} y={560 + k * 44} width={320 * (0.4 + 0.15 * k) * on(f, measures + k * 4, 10)} height={22} rx={8} fill={P.gold} />)}
          <Label x={960} y={820} text={f >= index10 ? 'CONSUMER PRICE INDEX' : f >= consumer ? 'CONSUMER…' : ''} size={48} font="Bebas Neue" color={P.ink} />
        </g>
        <g opacity={on(f, picture, 10)}>
          <Basket x={860} y={830 - 14 * pop(f, things11, 12) - 14 * pop(f, buy11, 12)} s={2.0} shown={on(f, basket11, 8) > 0.5 ? Math.max(shownA, 0) : 0} pop={jumpPop} />
          {([[food, 'FOOD', 520], [rent, 'RENT', 760], [cars, 'CARS', 980], [haircuts, 'HAIRCUTS', 1200]] as [number, string, number][]).map(([at, t, x], k) =>
            <g key={k} opacity={win(f, at, everything + 6, 6)}><Label x={x} y={340} text={t} size={52} font="Bebas Neue" color={P.ink} /></g>)}
          <g opacity={on(f, month12, 8)}>
            <Person f={f} who="worker" beats={[[month12, 'idle', 'neutral'], [checks, 'read', 'thinking'], [costs12, 'point', 'neutral'], [average13, 'present', 'smiling']]} x={1560} y={GROUND} s={1.0} flip />
            <g transform={`translate(1760 ${470 - 10 * pop(f, checks, 12)})`}><CalPage x={0} y={0} s={0.75} m="EVERY MONTH" col="#2E5C9A" /></g>
          </g>
          <g opacity={on(f, jump, 8) * (1 - on(f, sept25 - 10, 8))}><Label x={260} y={560} text="SOME JUMP" size={50} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, barely, 8) * (1 - on(f, sept25 - 10, 8))}><Label x={260} y={630} text="OTHERS BARELY MOVE" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # B) $100 → $103.70, then year after year */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, keeps16, 10)}>
          <Basket x={760} y={830} s={1.8} shown={10} />
          <g transform="translate(1100 0)"><CalPage x={560} y={420} s={0.9} m="SEPTEMBER" d={f >= c('s14:2026') ? '2026' : f >= c('s14:2025') ? '2025' : ''} col={f >= sept26 ? '#2E5C9A' : '#C94A3E'} /></g>
          <g opacity={on(f, cost15, 8)} transform={`translate(1150 ${560 - 14 * pop(f, d103, 12)})`}><Tag x={0} y={0} s={1.5} t={f >= d103 ? (f >= cents15 ? '$103.70' : '$103…') : f >= d100 ? '$100' : '$…'} col={f >= now15 ? '#F06B5B' : '#F4C95D'} ink={f >= now15 ? '#FFFFFF' : '#16294A'} /></g>
          <g opacity={on(f, p3, 8) * (1 - on(f, cost15, 8))}><Label x={1300} y={640} text="+3.7%" size={90} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        {/* the staircase of tags, year after year */}
        <g opacity={on(f, keeps16, 10)}>{Array.from({ length: 7 }, (_, k) => { const at = lerp(keeps16, year16c + 20, k / 6); return <g key={k} opacity={on(f, at, 6)}>
          <rect x={220 + k * 230} y={GROUND - 60 - k * 70} width={230} height={60 + k * 70} fill="#E2D3B4" stroke="#CDB58C" strokeWidth={3} />
          <Tag x={290 + k * 230} y={GROUND - 120 - k * 70} s={0.8} t={['$100', '$104', '$108', '$112', '$116', '$120', '$124'][k]} /></g> })}
          
          <g opacity={on(f, year16b, 8)}><Label x={420} y={330} text="BUT IT ADDS UP" size={60} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, year16b, 8)}><Label x={420} y={390} text="(ILLUSTRATION AT 3.7% A YEAR)" size={36} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # C) the Fed's 2% target and a working life */}
      {Cw > 0 && <g opacity={Cw}>
        <Ground y={GROUND} />
        <g opacity={1 - on(f, normal18, 10) + on(f, year19, 10)}>
          {/* the target dial */}
          <g transform="translate(960 600)">
            <path d="M-260 0 A260 260 0 0 1 260 0" fill="none" stroke="#E2D3B4" strokeWidth={46} />
            <path d="M-260 0 A260 260 0 0 1 -80 -247" fill="none" stroke={P.mint} strokeWidth={46} />
            <path d="M-80 -247 A260 260 0 0 1 80 -247" fill="none" stroke={P.gold} strokeWidth={46} />
            <path d="M80 -247 A260 260 0 0 1 260 0" fill="none" stroke={P.coral} strokeWidth={46} />
            {/* needle: 2% points to -60deg... 3.7% further right */}
            <g transform={`rotate(${-90 + 30 * on(f, p2, 20) + 60 * on(f, twice, 20)})`}><rect x={-8} y={-230} width={16} height={230} rx={8} fill="#16294A" /></g><circle r={30} fill="#16294A" />
            <g opacity={on(f, p2, 8)}><Label x={-60} y={-300} text="2% TARGET" size={50} font="Bebas Neue" color={P.goldInk} /></g>
            <g opacity={on(f, twice, 8)}><Label x={0} y={100} text="≈ TWICE THE TARGET" size={50} font="Bebas Neue" color={P.coralInk} /></g>
          </g>
          <g opacity={on(f, federal, 10)}><g transform="translate(330 0)">
            <path d="M-170 680 L0 590 L170 680 Z" fill="#E2D8C2" /><rect x={-150} y={680} width={300} height={250} fill="#EFE6D2" />{[-110, -55, 0, 55, 110].map((x) => <rect key={x} x={x - 10} y={696} width={20} height={220} fill="#FFFFFF" />)}
            <Label x={0} y={990} text="FEDERAL RESERVE" size={44} font="Bebas Neue" color={P.ink} /></g></g>
        </g>
        {/* 2% for 35 years: a working life */}
        <g opacity={on(f, normal18, 10) * (1 - on(f, year19, 10))}>
          <line x1={300} y1={760} x2={1620} y2={760} stroke={P.ink} strokeWidth={6} />
          <Tag x={260} y={600} t="$100" s={1.1} />
          <g opacity={on(f, double18, 8)}><Tag x={lerp(260, 1500, on(f, double18, 30))} y={lerp(600, 420, on(f, double18, 30))} t="$200" s={lerp(1.1, 1.5, on(f, double18, 30))} col="#F06B5B" ink="#FFFFFF" /></g>
          <g opacity={on(f, d35, 8)}><Label x={960} y={700} text="≈ 35 YEARS AT 2%" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, working, 8)}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, working + k * 6, 6)}><Mini look="worker" x={420 + k * 560} y={GROUND} scale={0.8 + 0.05 * k} frame={f} seed={k + 3} mood={k === 2 ? 'neutral' : 'happy'} /></g>)}
            <Label x={960} y={1010} text="MOST OF A WORKING LIFE" size={44} font="Bebas Neue" color={P.ink2} o={on(f, life, 8)} /></g>
        </g>
      </g>}

      {/* # D) 2000 → 2026 */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} />
        <g transform={`translate(330 ${-12 * pop(f, jan21, 12)})`}><CalPage x={0} y={430} s={0.9} m="JANUARY" d={f >= y2000 ? '2000' : ''} /><g opacity={on(f, c('s21:100'), 8)}><Tag x={-40} y={640} t="$100" s={1.3} /></g></g>
        <g opacity={on(f, price20, 10)}><path d={`M480 640 Q960 ${640 - 260 * on(f, doubled, 20) - 60 * win(f, took21b, took21b + 24, 6)} 1360 640`} fill="none" stroke={P.coral} strokeWidth={10} strokeDasharray="20 14" /></g>
        <g opacity={on(f, took21, 8)} transform={`translate(1500 0)`}><CalPage x={0} y={430} s={0.9} m="SEPTEMBER" d={f >= sept21 ? '2026' : ''} col="#2E5C9A" /><g transform={`translate(0 ${-14 * pop(f, d199, 12) - 14 * pop(f, thats22, 12)})`}><Tag x={-60} y={640} t={f >= d199 ? '$199' : '$…'} s={1.5} col="#F06B5B" ink="#FFFFFF" /></g></g>
        <g opacity={on(f, b100_22, 10)}>
          <DollarBill x={960} y={860} s={1.2} t="$100" />
          <g opacity={on(f, half22, 8)}><Label x={960} y={960} text="BUYS ≈ HALF AS MUCH" size={48} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
        <g opacity={on(f, bill22, 8) * (1 - on(f, prices22, 8))}><Label x={960} y={760} text="SAME BILL" size={52} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, prices22, 8)}><Label x={960} y={760} text="NEW PRICES" size={52} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}

      {/* # E) June-to-June bars, 2018–2026 */}
      {E > 0 && <g opacity={E}>
        <Ground y={GROUND} />
        <line x1={240} y1={860} x2={1700} y2={860} stroke={P.ink} strokeWidth={5} />
        {BARS.map(([yr, v], k) => { const x = 330 + k * 160, at = yr === '2022' ? y2022 : lerp(worse - 20, june24, k / 8), h = v * 48 * on(f, at, 14)
          return <g key={k} opacity={on(f, at, 6)}>
            <rect x={x - 55} y={860 - h} width={110} height={h} rx={10} fill={yr === '2022' ? P.coral : '#7E8FA8'} />
            <Label x={x} y={905} text={yr} size={40} font="Bebas Neue" color={P.ink} />
            <Label x={x} y={845 - h} text={`${v}%`} size={yr === '2022' ? 56 : 38} font="Bebas Neue" color={yr === '2022' ? P.coralInk : P.ink2} o={yr === '2022' ? on(f, p9, 8) : 1} /></g> })}
        <g opacity={on(f, fastest, 8)}><Label x={1010} y={300} text={f >= d40 ? 'FASTEST IN ≈ 40 YEARS' : 'FASTEST…'} size={58} font="Bebas Neue" color={P.coralInk} /></g>
        <Label x={960} y={980} text="PRICE RISE, JUNE TO JUNE (CPI)" size={38} font="Bebas Neue" color={P.ink2} o={on(f, june24, 8)} />
      </g>}

      {/* # F) recap: a dollar buys a shrinking basket */}
      {F > 0 && <g opacity={F}>
        <Ground y={GROUND} />
        <Person f={f} who="investorF" beats={[[EF, 'idle', 'thinking'], [wallet, 'emptyPockets', 'worried'], [less25, 'shrug', 'thinking']]} x={330} y={GROUND} s={1.05} />
        <g opacity={on(f, doesnt25, 8)}><g opacity={win(f, doesnt25, wallet + 10, 6)} transform={`translate(0 ${-60 * on(f, doesnt25, 14)})`}><DollarBill x={690} y={520} s={0.8} t="$1" /></g><NoMark x={690} y={470} o={win(f, out25, wallet + 16, 6)} r={70} /></g>
        <g opacity={on(f, wallet, 8)}><rect x={560} y={560} width={260} height={170} rx={22} fill="#6E4F33" /><rect x={560} y={560} width={260} height={50} rx={22} fill="#8E5B3A" /><DollarBill x={690} y={560} s={0.9} t="$1" /></g>
        <g opacity={on(f, each25, 8)}>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, each25 + k * 10, 8)} transform={`translate(${1020 + k * 300} 0)`}>
            <Item kind="apple" x={0} y={760} s={2.2 - k * 0.55} /><Label x={0} y={880} text={['THEN', 'LATER', 'LATER STILL'][k]} size={40} font="Bebas Neue" color={P.ink2} /></g>)}
          <Label x={1320} y={500} text="WHAT $1 BUYS" size={52} font="Bebas Neue" color={P.ink} />
        </g>
      </g>}
      <Vignette id="m4-infl" />
    </g>
  )
}

const BEATS = ['s11:things', 's11:buy', 's21:january', 's21:took#2', "s22:that's", 's22:100', "s25:doesn't", 's25:out', 's8:inflation', 's9:prices', 's9:up', 's9:time', 's10:government', 's10:measures', 's10:consumer', 's10:index', 's11:picture', 's11:basket', 's11:food', 's11:rent', 's11:cars', 's11:haircuts', 's11:everything', 's12:month', 's12:checks', 's12:costs', 's13:evenly', 's13:jump', 's13:barely', 's13:average', 's14:september', 's14:2025', 's14:september#2', 's14:2026', 's14:3', 's14:expensive', 's15:cost', 's15:100', 's15:now', 's15:103', 's15:cents', 's16:much', 's16:keeps', 's16:year#2', 's16:year#3', 's17:little', 's17:federal', 's17:central', 's17:aims', 's17:2', 's17:run', 's18:normal', 's18:double', 's18:35', 's18:working', 's18:life', 's19:year', 's19:index', 's19:twice', 's19:fast', 's20:since', 's20:2000', 's20:price', 's20:doubled', 's21:took', 's21:100', 's21:199', 's21:september', 's22:drawer', 's22:half', 's22:bill', 's22:change', 's22:prices', 's23:some', 's23:worse', 's24:june', 's24:2022', 's24:jumped', 's24:9', 's24:fastest', 's24:40', 's25:step', 's25:wallet', 's25:each', 's25:less']
export const M4_INFL = makePiece('m4-infl', 'Idea one, inflation: a price arrow climbs past $1, $1.03, $1.06 tags; the CPI clipboard; a giant basket fills with food, rent, a car, haircuts and more while an inspector checks it every month; some items jump, others barely move; Sept 2025 → Sept 2026 the basket tag goes $100 → $103.70; a staircase of tags rises year after year (illustration at 3.7%); the Fed and a 2% target dial; at 2% a $100 tag becomes $200 over about 35 years, a working life; the dial needle near 3.7%; January 2000 $100 → September 2026 $199, the same bill buys about half; June-to-June CPI bars 2018–2026 with the 9% spike in 2022, fastest in about 40 years; a $1 bill buys a shrinking apple', {
  mood: 'light', Component: Inflation, beats: BEATS,
  sfx: [['s14:3', 'pop', 0.2], ['s15:103', 'pop', 0.2], ['s17:2', 'pop', 0.15], ['s21:199', 'thud', 0.2], ['s24:9', 'thud', 0.25]] })
