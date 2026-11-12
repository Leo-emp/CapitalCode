// ---------------------------------------------------------------- s89–s103: GROW (1) — inflation, stocks and index funds, the ride and the 7%
// A) s89–s94  a shop shelf: a basket of groceries with a $100 price tag that climbs to $103.70 (prices up about 3.7%);
//             Maya's $100 bill in savings at 0.38% becomes $100.38 and cannot reach the tag — it has to grow faster.
// B) s95–s98  three growth lines (stocks steep, bonds gentle, savings flat); a company building whose pie slice is
//             Maya's and grows with profits; one single pick cracks and tips; one big crate marked S&P 500 holding rows
//             of small buildings — one purchase, a slice of all of them.
// C) s99–s103 the ride 1928 → 2025: about 10% a year; then the 7%: a big 10% chip loses a 3% slice to a price tag
//             (inflation) and becomes 7% AFTER INFLATION; red dips on the 26 losing years of 98, 2008 −36%; six 20-year
//             brackets all ticked; past results are no promise — long goals invested, the cushion stays in cash.
import React from 'react'
import { lerp, on, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Sweep } from '../literacy/kit2'
import { EXTRA } from './extra'
import { Headline, Person, win } from '../aimoney/common'
import { Defs } from '../literacy/kit'
import { Basket, Building, Jar, Pie, PriceTag } from '../literacy/kit2'
import { Big, FLOOR, L, LDefs, LGrain, Paper, Street, Tag, Tick, cues, fadeIn, scene, FONT } from './kit'

const K = {
  why89: 's89:why', savings89: 's89:savings', inflation89: 's89:inflation',
  prices90: 's90:prices', rise90: 's90:rise', dollar90: 's90:dollar', less90: 's90:less',
  year91: 's91:year', prices91: 's91:prices', three91: 's91:three',
  basket92: 's92:basket', hundred92: 's92:hundred', today92: 's92:today', costs92: 's92:costs', three92: 's92:three',
  maya93: 's93:maya', savings93: 's93:savings', zero93: 's93:zero', now93: 's93:now', thirty93: 's93:thirty', buy93: 's93:buy',
  slower: 's94:slower', losing: 's94:losing', ahead94: 's94:ahead', faster: 's94:faster',
  long95: 's95:long', stocks95: 's95:stocks', faster95: 's95:faster', savings95: 's95:savings', bonds: 's95:bonds',
  stock96: 's96:stock', slice96: 's96:slice', company96: 's96:company', profits: 's96:profits', worth: 's96:worth',
  single: 's97:single', bad97: 's97:bad', hurt: 's97:hurt', popular: 's97:popular', index97: 's97:index',
  every98: 's98:every', list98: 's98:list', five98: 's98:five', biggest98: 's98:biggest', purchase: 's98:purchase', all98: 's98:all',
  from99: 's99:from', y1928: 's99:1928', reinvested: 's99:reinvested', ten99: 's99:ten', average99: 's99:average',
  prices100: 's100:prices', three100: 's100:three', after100: 's100:after', seven100: 's100:seven',
  smooth: 's101:smooth', lost101: 's101:lost', twenty101: 's101:twenty', y2008: 's101:2008', third: 's101:third',
  record102: 's102:record', twenty102: 's102:twenty', lower102: 's102:lower', started102: 's102:started',
  past103: 's103:past', promise: 's103:promise', long103: 's103:long', cushion103: 's103:cushion', cash103: 's103:cash',
}
// # yearly up/down pattern for the coaster (illustrative shape, labelled as such on screen)
const RIDE = Array.from({ length: 60 }, (_, k) => Math.sin(k * 1.7) * 0.6 + Math.sin(k * 0.45) * 0.4)

const Grow1: React.FC<PieceProps> = ({ f, c }) => {
  const t = cues(c, K)
  const AB = c('s95') - 6, BC = t.from99 - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const tagY = lerp(470, 400, on(f, t.today92, 14))
  // # B: three lines
  const lineP = span(f, t.long95, t.bonds + 14)
  const ln = (slope: number, wob: number) => 'M' + Array.from({ length: 31 }, (_, k) => { const u = k / 30; return `${300 + u * 1300} ${880 - u * slope + Math.sin(u * 18) * wob}` }).filter((_, k) => k / 30 <= lineP).join(' L')
  // # C: the coaster (2008 = a deep dip)
  const rideP = span(f, t.from99, t.average99 + 20)
  const rx = (k: number) => 220 + k * 25, ry = (k: number) => 760 - k * 7 - RIDE[k] * 70 + (k === 47 ? 170 : 0)
  const ridePath = 'M' + RIDE.map((_, k) => `${rx(k)} ${ry(k)}`).filter((_, k) => k / 59 <= rideP).join(' L')
  const reds = RIDE.map((v, k) => k > 0 && ry(k) > ry(k - 1) + 20)
  const chip = on(f, t.prices100 - 2, 8) * (1 - on(f, t.smooth - 4, 8))   // # the 10% → 7% chip

  return (
    <g>
      <Defs /><LDefs />
      {/* ---------------- A) inflation ---------------- */}
      {A > 0 && <g opacity={A}>
        <Street />
        <g opacity={on(f, t.basket92 - 30, 8)}>
          <rect x={980} y={FLOOR - 40} width={700} height={40} rx={8} fill={L.floorD} />
          <Basket x={1330} y={FLOOR - 40} s={1.2} o={on(f, t.basket92 - 4, 8)} />
          <PriceTag x={1540} y={tagY} text={f < t.today92 ? '$100' : '$103.70'} s={1.15} r={-8} color={L.terraL} o={on(f, t.hundred92 - 2, 8)} />
          <Tag x={1330} y={290} text="PRICES +3.7% IN A YEAR" size={42} bg={L.terraD} o={on(f, t.three91, 8)} />
        </g>
        <Person f={f} who="investorF" beats={[[0, 'think', 'thinking'], [t.prices90, 'point', 'neutral'], [t.maya93, 'hold', 'neutral'], [t.buy93, 'shrug', 'worried'], [t.faster, 'pointUp', 'smiling']]} x={280} y={1060} s={0.8} />
        <g opacity={on(f, t.maya93 - 2, 8)}>
          <rect x={520} y={460} width={330} height={150} rx={14} fill={L.cash} stroke={L.cashD} strokeWidth={6} /><circle cx={685} cy={535} r={44} fill={L.cashD} opacity={0.5} />
          <Big x={685} y={560} text={f < t.now93 ? '$100' : '$100.38'} size={70} color="#fff" />
          <Tag x={685} y={680} text="SAVINGS AT 0.38%" size={36} bg={L.duskD} o={on(f, t.zero93, 8)} />
          <g opacity={on(f, t.buy93 - 2, 8)}><line x1={870} y1={535} x2={1440} y2={tagY + 4} stroke={L.red} strokeWidth={8} strokeDasharray="20 14" /><Tag x={1150} y={520} text="CAN'T BUY THE BASKET" size={36} bg={L.red} /></g>
          <Tag x={685} y={780} text="GROW FASTER THAN PRICES" size={38} bg={L.sageD} o={on(f, t.faster, 8)} />
        </g>
        <Tag x={960} y={360} text="THE SAME DOLLAR BUYS LESS" size={44} bg={L.ink} o={win(f, t.dollar90, t.year91 + 10, 8)} />
      </g>}

      {/* ---------------- B) stocks, a slice, one basket of 500 ---------------- */}
      {B > 0 && <g opacity={B}>
        <Paper />
        <g opacity={1 - on(f, t.stock96 - 4, 8)}>
          <path d={ln(560, 18)} stroke={L.sageD} strokeWidth={16} fill="none" strokeLinecap="round" />
          <path d={ln(200, 6)} stroke={L.duskD} strokeWidth={14} fill="none" strokeLinecap="round" opacity={on(f, t.bonds - 6, 8)} />
          <path d={ln(60, 0)} stroke={L.inkSoft} strokeWidth={12} fill="none" strokeLinecap="round" opacity={on(f, t.savings95 - 2, 8)} />
          <Tag x={1700} y={340} text="STOCKS" size={44} bg={L.sageD} o={on(f, t.stocks95, 8)} />
          <Tag x={1700} y={690} text="BONDS" size={40} bg={L.duskD} o={on(f, t.bonds, 8)} />
          <Tag x={1700} y={830} text="SAVINGS" size={40} bg={L.inkSoft} o={on(f, t.savings95, 8)} />
          <Tag x={760} y={330} text="OVER LONG PERIODS" size={40} bg={L.ink} o={on(f, t.long95, 8)} />
        </g>
        <g opacity={on(f, t.stock96 - 2, 8) * (1 - on(f, t.popular - 4, 8))}>
          <Building x={700} y={FLOOR} s={1.9} h={240} color={L.duskD} o={on(f, t.company96 - 6, 8)} />
          <Pie x={1240} y={600} r={180} parts={[{ v: 90, color: L.dusk, p: on(f, t.slice96 - 4, 10) }, { v: 10, color: L.mustard, p: on(f, t.slice96, 10), lift: 30 * on(f, t.worth, 10) }]} />
          <Tag x={1240} y={850} text="A SLICE OF THE COMPANY" size={40} bg={L.mustardD} o={on(f, t.slice96, 8)} />
          <Tag x={1240} y={360} text="PROFITS GROW → SLICE WORTH MORE" size={38} bg={L.sageD} o={on(f, t.profits, 8)} />
          <g opacity={on(f, t.single - 2, 8)}>
            <rect x={0} y={0} width={1920} height={1080} fill="url(#ll-paper)" />
            <g transform={`translate(${960} ${lerp(0, 60, on(f, t.hurt, 14))}) rotate(${lerp(0, 8, on(f, t.hurt, 14))} 0 ${FLOOR})`}><Building x={0} y={FLOOR} s={1.6} h={240} color={L.terra} /></g>
            <path d="M940 520 L990 600 L950 660 L1000 740" stroke={L.redD} strokeWidth={12} fill="none" opacity={on(f, t.bad97, 8)} />
            <Tag x={960} y={330} text="ONE SINGLE PICK" size={44} bg={L.terraD} />
          </g>
        </g>
        <g opacity={on(f, t.popular - 2, 8)}>
          <rect x={460} y={420} width={1000} height={480} rx={24} fill={L.floor} stroke={L.floorD} strokeWidth={10} />
          {Array.from({ length: 30 }, (_, k) => <Building key={k} x={530 + (k % 10) * 96} y={560 + Math.floor(k / 10) * 150} s={0.42} h={220 + (k % 3) * 40} color={[L.duskD, L.sageD, L.mustardD, L.terraD][k % 4]} o={on(f, t.every98 + (k % 10) * 1.5, 6)} />)}
          <Tag x={960} y={420} text="INDEX FUND: S&P 500" size={50} bg={L.ink} o={on(f, t.index97, 8)} />
          <Tag x={960} y={960} text="≈ 500 OF THE BIGGEST US COMPANIES" size={40} bg={L.duskD} o={on(f, t.five98, 8)} />
          <Tick x={1520} y={480} r={46} p={on(f, t.purchase, 8)} />
          <Tag x={1660} y={600} text="ONE PURCHASE" size={36} bg={L.sageD} o={on(f, t.purchase, 8)} />
        </g>
      </g>}

      {/* ---------------- C) the ride, and where the 7% comes from ---------------- */}
      {Cc > 0 && <g opacity={Cc}>
        <Paper />
        <g opacity={1 - on(f, t.past103 - 4, 8)}>
          <path d={ridePath} stroke={L.ink} strokeWidth={12} fill="none" strokeLinejoin="round" strokeLinecap="round" />
          {RIDE.map((_, k) => reds[k] && k / 59 <= rideP ? <circle key={k} cx={rx(k)} cy={ry(k)} r={13} fill={L.red} opacity={on(f, t.lost101, 8)} /> : null)}
          <Big x={220} y={880} text="1928" size={50} color={L.inkSoft} o={on(f, t.y1928, 8)} />
          <Tag x={960} y={260} text="DIVIDENDS REINVESTED" size={30} bg={L.inkSoft} o={on(f, t.reinvested, 8) * (1 - on(f, t.ten99 - 2, 6))} />
          <Big x={1695} y={880} text="2025" size={50} color={L.inkSoft} o={on(f, t.average99, 8)} />
          <Tag x={960} y={340} text="≈ 10% A YEAR ON AVERAGE" size={46} bg={L.sageD} o={on(f, t.ten99, 8) * (1 - chip)} />
          <Tag x={960} y={420} text="SHAPE ILLUSTRATIVE" size={28} bg={L.inkSoft} o={on(f, t.ten99, 8) * (1 - chip)} />
          {/* 10% − 3% inflation ≈ 7% after inflation */}
          <g opacity={chip}>
            <rect x={560} y={280} width={800} height={110} rx={24} fill={L.creamL} stroke={L.ink} strokeWidth={6} />
            <text x={960} y={358} textAnchor="middle" style={{ font: `400 64px ${FONT.big}` }}>
              <tspan fill={L.sageD}>10%</tspan><tspan fill={L.terraD} opacity={on(f, t.three100, 8)}> − 3% PRICES</tspan><tspan fill={L.ink} opacity={on(f, t.seven100, 8)}> ≈ 7% A YEAR</tspan>
            </text>
            <Tag x={960} y={440} text="AFTER INFLATION" size={36} bg={L.ink} o={on(f, t.after100, 8)} />
          </g>
          <Tag x={600} y={500} text="26 LOSING YEARS OUT OF 98" size={40} bg={L.red} o={on(f, t.twenty101, 8)} />
          <g opacity={on(f, t.y2008 - 2, 8)}><Tag x={rx(47)} y={ry(47) + 80} text="2008: −36%" size={40} bg={L.redD} /></g>
          <g opacity={on(f, t.twenty102 - 2, 8)}>{Array.from({ length: 6 }, (_, k) => <g key={k}><path d={`M${260 + k * 230} 960 L${260 + k * 230} 945 L${460 + k * 230} 945 L${460 + k * 230} 960`} stroke={L.sageD} strokeWidth={6} fill="none" /><Tick x={360 + k * 230} y={1010} r={22} p={on(f, t.lower102 + k * 3, 6)} /></g>)}</g>
          <Tag x={1400} y={970} text="NO 20-YEAR STRETCH ENDED LOWER" size={36} bg={L.sageD} o={on(f, t.started102, 8)} />
        </g>
        <g opacity={on(f, t.past103 - 2, 8)}>
          <Tag x={960} y={340} text="PAST RESULTS: NO PROMISE" size={48} bg={L.ink} />
          <Jar x={560} y={FLOOR} s={1} fill={0.9} color={L.sage} label="CUSHION" o={on(f, t.cushion103 - 2, 8)} />
          <Tag x={560} y={460} text="STAYS IN CASH" size={40} bg={L.sageD} o={on(f, t.cash103, 8)} />
          <g opacity={on(f, t.long103 - 2, 8)}><path d="M1100 820 L1250 700 L1330 760 L1480 560 L1560 640 L1720 420" stroke={L.duskD} strokeWidth={16} fill="none" strokeLinejoin="round" /><Tag x={1410} y={900} text="LONG GOALS: INVESTED" size={40} bg={L.duskD} /></g>
        </g>
      </g>}

      <Headline f={f} lines={[[t.why89, 'WHY NOT JUST SAVE?', L.ink, 110], [t.inflation89, 'INFLATION', L.terraD, 130], [t.slower, 'GROW FASTER, OR LOSE', L.ink, 104],
        [t.long95, 'WHERE MONEY GROWS', L.ink, 110], [t.stock96, 'A SLICE OF A COMPANY', L.ink, 104], [t.single, 'ONE BAD PICK', L.terraD, 110], [t.popular, 'ONE BASKET OF 500', L.ink, 110],
        [t.from99, 'THE S&P 500 SINCE 1928', L.ink, 104], [t.prices100, 'WHERE 7% COMES FROM', L.sageD, 104], [t.smooth, 'THE RIDE', L.ink, 120], [t.past103, 'MONEY FOR YEARS', L.ink, 110]]} />
      <Sweep f={f} at={(EXTRA['ll-grow1'] ?? []).map(c)} />
      <LGrain />
    </g>
  )
}

export const LL_GROW1 = makePiece('ll-grow1', "Grow, part one: a basket of groceries with a $100 price tag that climbs to $103.70 (prices +3.7% in a year); Maya's $100 bill in savings at 0.38% becomes $100.38 and can't reach it — grow faster than prices; three lines over long periods — stocks steep, bonds gentle, savings flat; a company building and a pie slice worth more as profits grow; one single pick cracks and tips; a crate of small buildings marked INDEX FUND: S&P 500 (about 500 of the biggest US companies, one purchase); the S&P 500 since 1928, about 10% a year with dividends reinvested (shape illustrative); a chip reading 10% − 3% prices ≈ 7% a year after inflation; red dots on the 26 losing years of 98, 2008 −36%, six 20-year brackets each ticked; past results no promise — the cushion stays in cash, long goals invested", {
  mood: 'light', Component: Grow1, beats: [...Object.values(K), ...(EXTRA['ll-grow1'] ?? [])],
  sfx: [['s92:today', 'pop', 0.1], ['s93:buy', 'thud', 0.1], ['s97:hurt', 'thud', 0.12], ['s98:purchase', 'pop', 0.1], ['s100:seven', 'ding', 0.12], ['s101:2008', 'thud', 0.12]] })
