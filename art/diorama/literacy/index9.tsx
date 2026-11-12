// ---------------------------------------------------------------- s105–s117: lesson nine, index funds and fees
// A) s105–s108 the study: a dart picks one stock card — crossed ("you don't have to pick winners"); a skyline = the
//            market; one building with a slice lit (a share) dropping coins (profits); an INDEX FUND basket gathers a
//            grid of tiny companies (≈ 500); one purchase lights them all.
// B) s109–s112 inside card 9: a stylised S&P 500 path 1928 → 2025, ≈ 10% a year on average, never smooth: red
//            down-year dots (26 of 98) and a deep 2008 dip (fell more than a third); a 20-year bracket slides along the
//            line and always ends higher; "PAST ≠ PROMISE".
// C) s113    the study: 100 fund icons, 79 turn red (did worse than the S&P 500 in 2025).
// D) s114–s117 inside card 9: fee tags 0.09% vs 0.57%; $10,000 at an example 7% for 30 years → ≈ $74,000 vs ≈ $65,000;
//            the gap, $9,000+, falls away as "a rounding error".
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { EXTRA } from './extra'
import { Headline, win } from '../aimoney/common'
import { C, Coin, Cross, DESK, Defs, FONT, Grain, Lamp, Study, Tag, fadeIn, scene } from './kit'
import { Arrow, Building, Column, Hourglass, Num, PriceTag, Sheet, cues, Sweep } from './kit2'

const K = {
  pick: 's105:pick', winning: 's105:winning', stocks: 's105:stocks', market: 's105:market',
  share: 's106:share', company: 's106:company', slice: 's106:slice', profits: 's106:profits',
  index107: 's107:index', every: 's107:every', list: 's107:list', five107: 's107:five', biggest: 's107:biggest',
  purchase: 's108:purchase', piece: 's108:piece', all108: 's108:all',
  y1928: 's109:1928', sp109: 's109:sp', dividends: 's109:dividends', ten109: 's109:ten', average: 's109:average',
  smooth: 's110:smooth', lost: 's110:lost', twenty110: 's110:twenty', alone: 's110:alone', third: 's110:third',
  record: 's111:record', twenty111: 's111:twenty', stretch: 's111:stretch', lower: 's111:lower', started: 's111:started',
  past: 's112:past', promise: 's112:promise', time112: 's112:time', scary: 's112:scary', good: 's112:good',
  professionals: 's113:professionals', beat: 's113:beat', seventy: 's113:seventy', worse: 's113:worse',
  cheap: 's114:cheap', zero114: 's114:zero', nine114: 's114:nine', active: 's114:actively', five114: 's114:five',
  tiny: 's115:tiny', ten115: 's115:ten', seven115: 's115:seven', thirty115: 's115:thirty',
  seventy116: 's116:seventy', sixty116: 's116:sixty',
  nine117: 's117:nine', gone: 's117:gone', rounding: 's117:rounding',
}
const PATH = Array.from({ length: 98 }, (_, i) => {
  // # stylised growth with real-looking dips (illustration, not data): log-ish rise with drawdowns at 1929–32, 1973, 2000–02, 2008
  const y = i / 97, dip = (a: number, w: number, d: number) => d * Math.exp(-(((i - a) / w) ** 2))
  return 1 - (y ** 1.15) * 0.92 + dip(3, 2.5, 0.08) + dip(46, 1.5, 0.05) + dip(74, 1.6, 0.07) + dip(80, 1.0, 0.12) + 0.012 * Math.sin(i * 1.7)
})
const DOWN = [1, 2, 3, 4, 6, 11, 12, 13, 18, 25, 29, 34, 38, 41, 45, 46, 49, 53, 62, 72, 73, 74, 80, 87, 90, 94] // # 26 down-year marks
const CX = 220, CW = 1480, CT = 330, CH = 560

const Index9: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s109') - 6, BC = c('s113') - 6, CD = c('s114') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)
  const pt = (i: number): [number, number] => [CX + (i / 97) * CW, CT + PATH[i] * CH]
  const draw = span(f, AB, t.ten109 + 10)
  const n = Math.max(2, Math.floor(98 * draw))
  const win20 = span(f, t.twenty111, t.started + 30) * 77

  return (
    <g>
      <Defs />
      {/* ---------------- A) own the market ---------------- */}
      {A > 0 && <g opacity={A}>
        <Study f={f} />
        <Lamp x={1790} s={0.7} />
        <g opacity={1 - on(f, t.market - 4, 10)}>
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(${640 + k * 320} ${DESK - 120})`} opacity={on(f, t.pick - 6 + k * 3, 6)}>
            <rect x={-120} y={-150} width={240} height={300} rx={14} fill={C.paper} />
            <path d={k === 1 ? 'M-80 60 L-20 0 L20 30 L80 -60' : 'M-80 -40 L-20 10 L20 -20 L80 60'} stroke={k === 1 ? C.cashD : C.red} strokeWidth={10} fill="none" strokeLinecap="round" />
            <text y={-90} textAnchor="middle" fill={C.ink} style={{ font: `400 48px ${FONT.big}` }}>{['STOCK A', 'STOCK B', 'STOCK C'][k]}</text>
          </g>)}
          <Arrow x1={1400} y1={DESK - 420} x2={980} y2={DESK - 160} p={span(f, t.pick, t.pick + 10)} color={C.ink} w={10} />
          <Cross x={960} y={DESK - 120} r={220} p={on(f, t.winning + 4, 12)} />
        </g>
        <g opacity={on(f, t.market - 4, 10) * (1 - on(f, t.index107 - 6, 10))}>
          {Array.from({ length: 9 }, (_, k) => <Building key={k} x={360 + k * 150} y={DESK + 100} s={0.8} h={200 + ((k * 7) % 4) * 70} color={[C.skyD, C.plum, C.tealD, C.inkSoft][k % 4]} o={k === 4 ? 1 : 1 - 0.6 * on(f, t.share, 8)} />)}
          <rect x={960 - 56} y={DESK + 100 - 200 * 0.8 - ((4 * 7) % 4) * 70 * 0.8} width={40} height={(200 + ((4 * 7) % 4) * 70) * 0.8} fill={C.brassL} opacity={0.75 * on(f, t.slice, 8)} />
          <Tag x={960} y={DESK + 170} text="ONE SHARE = A TINY SLICE" size={38} point="none" o={on(f, t.slice, 8)} />
          {[0, 1, 2].map((k) => { const p = ((f - t.profits) / 24 + k / 3) % 1; return f > t.profits ? <Coin key={k} x={1050 + k * 40} y={DESK - 140 + p * 200} r={24} o={1 - p} /> : null })}
        </g>
        <g opacity={on(f, t.index107 - 6, 10)}>
          {Array.from({ length: 100 }, (_, k) => <rect key={k} x={560 + (k % 20) * 40} y={DESK - 340 + Math.floor(k / 20) * 56} width={28} height={44} rx={3} fill={[C.skyD, C.plum, C.tealD, C.inkSoft, C.tomato][k % 5]} opacity={on(f, lerp(t.every, t.five107, k / 99), 4) * (f >= t.all108 ? 1 : 0.75)} />)}
          <rect x={540} y={DESK - 360} width={820} height={300} rx={14} fill="none" stroke={C.brassL} strokeWidth={6} opacity={on(f, t.all108, 8)} />
          <Tag x={960} y={DESK + 40} text="INDEX FUND: ≈ 500 COMPANIES" size={42} point="none" color={C.brassL} o={on(f, t.list, 8)} />
          <Tag x={960} y={DESK + 150} text="ONE PURCHASE" size={40} point="none" o={on(f, t.purchase, 8)} />
        </g>
      </g>}

      {/* ---------------- B) the long record ---------------- */}
      {B > 0 && <g opacity={B}>
        <Sheet n={9} />
        <path d={Array.from({ length: n }, (_, i) => `${i ? 'L' : 'M'}${pt(i)[0].toFixed(1)} ${pt(i)[1].toFixed(1)}`).join(' ')} stroke={C.cashD} strokeWidth={9} fill="none" strokeLinejoin="round" />
        <text x={CX} y={CT + CH + 90} fill={C.inkSoft} style={{ font: `400 44px ${FONT.big}` }}>1928</text>
        <text x={CX + CW} y={CT + CH + 90} textAnchor="end" fill={C.inkSoft} style={{ font: `400 44px ${FONT.big}` }}>2025</text>
        <text x={CX + CW / 2} y={CT + CH + 90} textAnchor="middle" fill={C.inkSoft} opacity={0.7} style={{ font: `400 32px ${FONT.big}`, letterSpacing: 2 }}>S&P 500 WITH DIVIDENDS · SHAPE ILLUSTRATIVE</text>
        <Tag x={CX + CW - 180} y={CT - 30} text="≈ 10% A YEAR ON AVERAGE" size={40} point="none" color={C.cashL} o={win(f, t.ten109, t.smooth, 8)} />
        {DOWN.map((i, k) => <circle key={k} cx={pt(i)[0]} cy={pt(i)[1]} r={13} fill={C.red} opacity={on(f, lerp(t.lost, t.twenty110 + 10, k / 25), 4)} />)}
        <Tag x={CX + 300} y={CT - 30} text="26 DOWN YEARS OF 98" size={40} point="none" color={C.tomato} ink="#fff" o={win(f, t.twenty110, t.record, 8)} />
        <g opacity={win(f, t.alone, t.record, 8)}><Arrow x1={pt(80)[0]} y1={pt(80)[1] - 260} x2={pt(80)[0]} y2={pt(80)[1] - 30} color={C.red} w={14} /><Tag x={pt(80)[0]} y={pt(80)[1] - 300} text="2008: FELL MORE THAN ⅓" size={36} point="none" color={C.paper} /></g>
        {f >= t.twenty111 && (() => { const a = Math.floor(win20), b = Math.min(97, a + 20), [x1] = pt(a), [x2] = pt(b), y = CT + CH + 20
          return <g opacity={on(f, t.twenty111, 8) * (1 - on(f, t.past, 8))}>
            <rect x={x1} y={CT - 10} width={x2 - x1} height={CH + 20} fill={C.cash} opacity={0.12} />
            <path d={`M${x1} ${y} L${x1} ${y - 20} M${x1} ${y} L${x2} ${y} L${x2} ${y - 20}`} stroke={C.cashD} strokeWidth={6} fill="none" />
            <circle cx={x2} cy={pt(b)[1]} r={16} fill={C.cashD} />
            <Tag x={(x1 + x2) / 2} y={y + 0} text="ANY 20 YEARS: ENDED HIGHER" size={32} point="none" color={C.cashL} />
          </g> })()}
        <Tag x={1300} y={500} text="PAST ≠ PROMISE" size={50} point="none" color={C.paper} o={on(f, t.past, 8)} />
        <Hourglass x={1300} y={880} s={0.8} t={span(f, t.time112, t.good + 20)} o={on(f, t.time112, 8)} />
      </g>}

      {/* ---------------- C) most pros don't beat it ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Study f={f} />
        {Array.from({ length: 100 }, (_, k) => {
          const red = k < 79 && f >= lerp(t.seventy, t.worse + 6, k / 78)
          return <g key={k} transform={`translate(${520 + (k % 20) * 44} ${330 + Math.floor(k / 20) * 70})`} opacity={on(f, BC + k * 0.2, 4)}>
            <rect x={-16} y={-24} width={32} height={48} rx={6} fill={red ? C.red : C.paper} />
            <rect x={-10} y={-16} width={20} height={6} rx={3} fill={red ? '#fff' : C.inkSoft} opacity={0.6} />
          </g>
        })}
        <Tag x={960} y={DESK + 60} text="79 OF 100 ACTIVE FUNDS DID WORSE (2025)" size={42} point="none" color={C.tomato} ink="#fff" o={on(f, t.worse, 8)} />
      </g>}

      {/* ---------------- D) the fee gap ---------------- */}
      {D > 0 && <g opacity={D}>
        <Sheet n={9} />
        <PriceTag x={420} y={470} text="0.09%" s={1.1} color={C.cashL} o={on(f, t.zero114, 8)} />
        <Tag x={490} y={600} text="INDEX FUND FEE" size={34} point="none" o={on(f, t.zero114, 8)} />
        <PriceTag x={420} y={790} text="0.57%" s={1.1} color={C.tomato} ink="#fff" o={on(f, t.five114, 8)} />
        <Tag x={490} y={920} text="ACTIVE FUND FEE" size={34} point="none" o={on(f, t.active, 8)} />
        <Tag x={1250} y={300} text="$10,000 · EXAMPLE 7% · 30 YEARS" size={38} point="none" color={C.paperD} o={on(f, t.ten115, 8)} />
        <Column x={1050} base={930} h={500 * on(f, t.seventy116 - 6, 18)} w={220} color={C.cash} top={f >= t.seventy116 ? '≈ $74,000' : undefined} under="INDEX" o={on(f, t.seventy116 - 6, 8)} />
        <Column x={1450} base={930} h={500 * (64852 / 74225) * on(f, t.sixty116 - 6, 18)} w={220} color={C.inkSoft} top={f >= t.sixty116 ? '≈ $65,000' : undefined} under="ACTIVE" o={on(f, t.sixty116 - 6, 8)} />
        <g opacity={on(f, t.nine117, 8)}>
          <rect x={1590} y={930 - 500} width={200} height={500 - 500 * (64852 / 74225)} rx={8} fill={C.red} opacity={0.85} transform={`translate(0 ${80 * span(f, t.rounding, t.rounding + 20)})`} />
          <Tag x={1690} y={580} text="$9,000+ TO FEES" size={36} point="none" color={C.tomato} ink="#fff" />
        </g>
      </g>}

      <Headline f={f} lines={[[t.pick, 'NO NEED TO PICK WINNERS', C.paper, 100], [t.index107, 'BUY THE WHOLE LIST', C.paper, 104], [AB + 4, '1928 → 2025', C.ink, 110], [t.smooth, 'NEVER SMOOTH', C.tomatoD, 110],
        [t.record, 'BUT TIME WON', C.cashD, 110], [t.professionals, 'MOST PROS LOSE TO IT', C.paper, 104], [t.cheap, 'AND IT\'S CHEAP', C.ink, 110], [t.tiny, 'A TINY GAP, 30 YEARS', C.ink, 104]]} />
      <Sweep f={f} at={EXTRA['fl-index'].map(c)} />
      <Grain />
    </g>
  )
}

export const FL_INDEX = makePiece('fl-index', 'Lesson 9, index funds and fees: a dart picks one of three stock cards, crossed; a skyline is the market, one building with a lit slice (a share) dropping profit coins; an index fund frame gathers a grid of tiny companies (≈500), one purchase; inside card 9 a stylised S&P 500 path 1928–2025, about 10% a year on average, 26 red down-year dots of 98, a 2008 dip of more than a third, a 20-year bracket that always ends higher, PAST ≠ PROMISE with an hourglass; 100 fund icons, 79 turn red (did worse in 2025); fee tags 0.09% vs 0.57%, $10,000 at an example 7% for 30 years → about $74,000 vs $65,000, the $9,000+ gap falls away', {
  mood: 'light', Component: Index9, beats: [...Object.values(K), ...EXTRA['fl-index']],
  sfx: [['s105:winning', 'swish', 0.14], ['s108:all', 'chime', 0.14], ['s110:third', 'thud', 0.16], ['s113:worse', 'thud', 0.14], ['s117:rounding', 'swish', 0.14]] })
void pop
