// ---------------------------------------------------------------- s22–s40: step two, what 98 years show (navy).
// A) A professor's ledger book of yearly returns since 1928; Maya's $100 starts at the chart's origin.
// B) The race chart (real yearly values, log scale): Treasury bills (gold), bonds (blue), stocks (green) draw in on
//    their lines, each ending with its value tag; the stock line is traced through 1949 ($272), 1975, 2000, 2025.
// C) Prices (red dashed line) climb to ≈ $1,900; bills barely beat it; real growth bars: bills 0.3%/yr vs stocks 6.8%/yr.
// D) Honest notes: an index, before fees and taxes; the past is a record, not a forecast (a rear-view mirror).
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { DollarBill } from '../bank/kit'
import { RaceChart, cx, cy, valAt } from './kit'
import { HIST } from './data'

const GROUND = 930

const Race: React.FC<PieceProps> = ({ f, c }) => {
  const years28 = c('s28:years'), dollars33 = c('s33:dollars'), both38 = c('s38:both'), steadier31 = c('s31:steadier'), grew36 = c('s36:grew'), thousand29 = c('s29:thousand'), another37 = c('s37:another'), long40 = c('s40:long'), y2025_29 = c('s29:2025'), year36 = c('s36:year'), diff37 = c('s37:difference'), next39 = c('s39:next'), y1928_33 = c('s33:1928'), tr35 = c('s35:treasury'), z35 = c('s35:0'), yr35 = c('s35:year'), safest25 = c('s25:safest'), d100_25 = c('s25:100'), d100_37 = c('s37:100'), turns37 = c('s37:turns'), companies27 = c('s27:companies'), reinv27 = c('s27:reinvested'), became27 = c('s27:became'), y2025_33 = c('s33:2025'), b2600_34 = c('s34:2600'), bills34 = c('s34:bills'), k4100 = c('s29:4100'), step22 = c('s22:step'), happened = c('s22:happened'), choice = c('s22:choice')
  const professor = c('s23:professor'), york = c('s23:york'), damodaran = c('s23:damodaran'), record = c('s23:record'), y1928 = c('s23:1928')
  const follow = c('s24:follow'), mayas = c("s24:maya's"), reinvesting = c('s24:reinvesting'), dividends24 = c('s24:dividends')
  const treasury25 = c('s25:treasury'), d2600 = c('s25:2600'), p4 = c('s25:4')
  const y10b = c('s26:10year'), d7700 = c('s26:7700'), p5 = c('s26:5')
  const sp27 = c('s27:sp'), index27 = c('s27:index'), million27 = c('s27:million'), p10 = c('s27:10')
  const smoothly = c('s28:smoothly'), depression = c('s28:depression'), war = c('s28:war'), d272 = c('s28:272'), y1949 = c('s28:1949')
  const y1975 = c('s29:1975'), y2000 = c('s29:2000'), k142 = c('s29:142'), million29 = c('s29:million')
  const treasury30 = c('s30:treasury'), crept = c('s30:crept'), d120 = c('s30:120'), d310 = c('s30:310'), d1700 = c('s30:1700'), d2600b = c('s30:2600')
  const bonds31 = c('s31:bonds'), middle = c('s31:middle'), slower = c('s31:slower')
  const forget = c('s32:forget'), prices32 = c('s32:prices')
  const cost33 = c('s33:cost'), d1900 = c('s33:1900')
  const beat34 = c('s34:beat'), rising34 = c('s34:rising')
  const after35 = c('s35:after'), p3 = c('s35:3'), barely = c('s35:barely')
  const stocks36 = c('s36:stocks'), p8 = c('s36:8')
  const compounded = c('s37:compounded'), fortune = c('s37:fortune'), moves = c('s37:moves')
  const honest = c('s38:honest'), index38 = c('s38:index'), fees = c('s38:fees'), taxes = c('s38:taxes'), real38 = c('s38:real')
  const past = c('s39:past'), future = c('s39:future'), record39 = c('s39:record'), different = c('s39:different')
  const step40 = c('s40:step'), owning40 = c('s40:owning'), faster40 = c('s40:faster'), safely = c('s40:safely')

  const AB = treasury25 - 8, CD = honest - 8, DE = step40 - 8
  const A = win(f, 0, AB), Bc = win(f, AB, CD), D = win(f, CD, DE), E = on(f, DE, 10)
  // # each line draws to 2025 over ~1.6 s from its cue; the stock line is first drawn whole, then re-traced 1928→2025 on s28–s29
  const yrBills = lerp(1927, 2025, span(f, d2600 - 20, d2600 + 30))
  const yrBonds = lerp(1927, 2025, span(f, d7700 - 20, d7700 + 30))
  const yrStock = f < smoothly ? lerp(1927, 2025, span(f, sp27, million27 + 20)) : lerp(1928, 2025, span(f, d272 - 50, y1949 + 6) * 0.22 + span(f, y1975 - 10, y1975 + 10) * 0.26 + span(f, y2000 - 10, k142) * 0.25 + span(f, million29 - 10, million29 + 10) * 0.27)
  const showPrices = on(f, prices32, 8)
  const upto = Math.max(yrBills, yrBonds, yrStock)

  return (
    <g>
      <Stage id="iv-race" frame={f} />
      {/* # A) the record book */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} dark />
        <g opacity={on(f, record, 10)} transform={`translate(1260 ${560 - 10 * pop(f, record, 12)})`}>
          <rect x={-330} y={-230} width={660} height={460} rx={18} fill="#F2E6CC" /><line x1={0} y1={-220} x2={0} y2={220} stroke="#CDB58C" strokeWidth={6} />
          {Array.from({ length: 9 }, (_, k) => <g key={k} opacity={on(f, record + k * 3, 6)}><text x={-300} y={-170 + k * 46} fill="#16294A" style={{ font: '400 34px "Bebas Neue"' }}>{1928 + k}</text><rect x={-200} y={-192 + k * 46} width={Math.min(150, Math.abs(HIST[k][1]) * 4)} height={16} rx={6} fill={HIST[k][1] < 0 ? '#F06B5B' : '#7FC495'} /></g>)}
          {Array.from({ length: 9 }, (_, k) => <g key={k} opacity={on(f, y1928 + k * 3, 6)}><text x={30} y={-170 + k * 46} fill="#16294A" style={{ font: '400 34px "Bebas Neue"' }}>{2017 + k}</text><rect x={130} y={-192 + k * 46} width={Math.min(150, Math.abs(HIST[89 + k][1]) * 4)} height={16} rx={6} fill={HIST[89 + k][1] < 0 ? '#F06B5B' : '#7FC495'} /></g>)}
        </g>
        <Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [professor, 'read', 'thinking'], [damodaran, 'present', 'smiling']]} x={420} y={GROUND} s={1.05} />
        <g opacity={on(f, york, 8)}><Label x={420} y={GROUND + 60} text="PROF. ASWATH DAMODARAN, NYU" size={42} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, mayas, 8)} transform={`translate(700 ${420 - 10 * pop(f, reinvesting, 12)})`}><DollarBill x={0} y={0} s={0.9} t="$100" /><g opacity={on(f, dividends24, 8)}><Label x={0} y={110} text="ALL INCOME REINVESTED" size={38} font="Bebas Neue" color={P.goldInk} /></g></g>
      </g>}

      {/* # B/C) the race chart */}
      {Bc > 0 && <g opacity={Bc}>
        <RaceChart upto={upto} show={[f >= sp27, f >= y10b, f >= treasury25, showPrices > 0]} />
        <g opacity={on(f, d100_25, 8)} transform={`translate(0 ${-8 * pop(f, d100_37, 12) - 8 * pop(f, turns37, 12)})`}><circle cx={cx(1927)} cy={cy(100)} r={14} fill="#FFFFFF" /><Label x={cx(1927) + 24} y={cy(100) - 20} text="$100" size={40} font="Bebas Neue" color={P.ink} anchor="start" /></g>
        <g opacity={win(f, safest25, d2600 - 4, 6)}><Label x={720} y={360} text="TREASURY BILLS: THE SAFEST CHOICE" size={40} font="Bebas Neue" color={P.goldInk} /></g>
        {/* value tags at the line ends */}
        <g opacity={on(f, d2600, 8)} transform={`translate(0 ${-10 * pop(f, b2600_34, 12) - 10 * pop(f, bills34, 12)})`}><Label x={cx(2025) + 20} y={cy(2578) + 14} text={f >= p4 ? 'BILLS ≈ $2,600 (3.4%/YR)' : 'BILLS ≈ $2,600'} size={36} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
        <g opacity={on(f, d7700, 8)}><Label x={cx(2025) + 20} y={cy(7718) - 4} text={f >= p5 ? 'BONDS ≈ $7,700 (4.5%)' : 'BONDS ≈ $7,700'} size={36} font="Bebas Neue" color={P.skyInk} anchor="start" /></g>
        <g opacity={on(f, million27, 8)} transform={`translate(0 ${-10 * pop(f, y2025_29, 12)})`}><Label x={cx(2025) - 10} y={cy(1157009) - 26} text={f >= p10 ? '≈ $1.16M (≈ 10%/YR)' : '≈ $1.16M'} size={44} font="Bebas Neue" color={P.mintInk} anchor="end" /></g>
        <g opacity={on(f, index27, 8) * (1 - on(f, smoothly, 8))}><Label x={720} y={360} text={f >= companies27 ? 'S&P 500: 500 LARGE US COMPANIES' : 'S&P 500'} size={40} font="Bebas Neue" color={P.ink} /><Label x={720} y={410} text="+ DIVIDENDS REINVESTED" size={36} font="Bebas Neue" color={P.goldInk} o={on(f, reinv27, 8)} /></g>
        <g opacity={win(f, became27, million27 + 10, 6)}><circle cx={cx(Math.min(2025, yrStock))} cy={cy(valAt(2, Math.min(2025, yrStock)))} r={16} fill="#2FAE6B" /></g>
        {/* the slow start, then milestones */}
        <g opacity={on(f, years28, 8) * (1 - on(f, forget, 8))}><rect x={cx(1928)} y={300} width={cx(1949) - cx(1928)} height={580} fill="#F06B5B" opacity={0.12} /><Label x={(cx(1928) + cx(1949)) / 2} y={340} text={f >= war ? 'DEPRESSION + WAR' : f >= depression ? 'DEPRESSION' : 'FIRST 22 YEARS'} size={36} font="Bebas Neue" color={P.coralInk} /></g>
        {([[d272, 1949, '$272'], [y1975, 1975, '$4,100'], [thousand29, 2000, '$142,000']] as [number, number, string][]).map(([at, yr, t], k) =>
          <g key={k} opacity={on(f, at, 8) * (1 - on(f, forget, 8))} transform={k === 1 ? `translate(0 ${-10 * pop(f, k4100, 12)})` : undefined}><circle cx={cx(yr)} cy={cy(valAt(2, yr))} r={12} fill="#2FAE6B" /><Label x={cx(yr)} y={cy(valAt(2, yr)) - 26} text={t} size={38} font="Bebas Neue" color={P.mintInk} /></g>)}
        {([[d120, 1949], [d310, 1975], [d1700, 2000]] as [number, number][]).map(([at, yr], k) =>
          <g key={k} opacity={on(f, at, 8) * (1 - on(f, forget, 8))}><circle cx={cx(yr)} cy={cy(valAt(3, yr))} r={10} fill={P.gold} /><Label x={cx(yr)} y={cy(valAt(3, yr)) + 46} text={['$120', '$310', '$1,700'][k]} size={34} font="Bebas Neue" color={P.goldInk} /></g>)}
        <g opacity={on(f, steadier31, 8) * (1 - on(f, forget, 8))}><Label x={cx(1960)} y={cy(30000)} text="BONDS: STEADIER, SLOWER" size={36} font="Bebas Neue" color={P.skyInk} /></g>
        {/* prices */}
        <g opacity={win(f, y1928_33, after35, 6)}><circle cx={cx(1927)} cy={cy(100)} r={18} fill="none" stroke="#F06B5B" strokeWidth={5} /></g>
        <g opacity={on(f, d1900, 8)} transform={`translate(0 ${-10 * pop(f, y2025_33, 12) - 10 * pop(f, dollars33, 12)})`}><Label x={cx(2025) + 20} y={cy(1874) + 40} text="PRICES ≈ $1,900" size={36} font="Bebas Neue" color={P.coralInk} anchor="start" /></g>
        <g opacity={on(f, beat34, 8) * (1 - on(f, after35, 8))}><path d={`M${cx(2025) - 6} ${cy(2578)} L${cx(2025) - 6} ${cy(1874)}`} stroke="#FFFFFF" strokeWidth={6} /><Label x={cx(2010)} y={cy(1874) + 70} text="BILLS ONLY JUST BEAT PRICES" size={40} font="Bebas Neue" color={P.ink} /></g>
        {/* real growth bars */}
        <rect x={-100} y={0} width={2120} height={1200} fill="#0E1B33" opacity={0.6 * on(f, after35, 10)} />
        <g opacity={on(f, after35, 10)}>
          <rect x={480} y={330} width={760} height={260} rx={20} fill="#0E1B33" opacity={0.85} />
          <Label x={860} y={380} text="GROWTH AFTER INFLATION, PER YEAR" size={40} font="Bebas Neue" color={P.ink} />
          <rect x={540} y={430} width={8 + 60 * 0.33 * on(f, z35, 12)} height={50} rx={8} fill={P.gold} opacity={on(f, tr35, 6)} /><g transform={`translate(0 ${-8 * pop(f, yr35, 12)})`}><Label x={600 + 20} y={470} text={f >= p3 ? 'BILLS ≈ 0.3%' : f >= tr35 ? 'BILLS…' : ''} size={40} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
          <g opacity={on(f, stocks36, 8)} transform={`translate(0 ${-6 * pop(f, year36, 12) - 6 * pop(f, diff37, 12) - 6 * pop(f, grew36, 12)})`}><rect x={540} y={510} width={60 * 6.8 * on(f, p8, 16)} height={50} rx={8} fill="#2FAE6B" /><Label x={540 + 60 * 6.8 + 20} y={550} text={f >= p8 ? 'STOCKS ≈ 6.8%' : 'STOCKS…'} size={40} font="Bebas Neue" color={P.mintInk} anchor="start" /></g>
          <g opacity={on(f, barely, 8)}><Label x={860} y={640} text="SAFE, BUT BARELY MOVING" size={44} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        <g opacity={on(f, fortune, 8)}><circle cx={cx(2025)} cy={cy(1157009)} r={24} fill="none" stroke={P.gold} strokeWidth={6} /></g>
        <g opacity={on(f, moves, 8)}><circle cx={cx(2025)} cy={cy(2578)} r={20 + 8 * win(f, another37, another37 + 16, 4)} fill="none" stroke="#FFFFFF" strokeWidth={5} /></g>
        <g opacity={on(f, compounded, 8) * (1 - on(f, fortune, 8))}><Label x={860} y={740} text="COMPOUNDED OVER DECADES" size={44} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # D) honest notes */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, past, 10)}>
          <g opacity={on(f, index38, 8)} transform="translate(560 560)"><rect x={-200} y={-120} width={400} height={240} rx={20} fill="#F2E6CC" /><text y={-50} textAnchor="middle" fill="#16294A" style={{ font: '400 52px "Bebas Neue"' }}>AN INDEX</text>
            <text y={20} textAnchor="middle" fill="#C94A3E" opacity={on(f, fees, 8)} style={{ font: '400 44px "Bebas Neue"' }}>BEFORE FEES</text><text y={80} textAnchor="middle" fill="#C94A3E" opacity={on(f, taxes, 8)} style={{ font: '400 44px "Bebas Neue"' }}>AND TAXES</text></g>
          <g opacity={on(f, real38, 8)}><Person f={f} who="buyer" beats={[[real38, 'emptyPockets', 'neutral'], [both38, 'shrug', 'neutral']]} x={1300} y={GROUND} s={1.0} /><Label x={1300} y={GROUND + 60} text="REAL PEOPLE PAY SOME" size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, past, 10)}>
          {/* a rear-view mirror: the past behind, a foggy road ahead */}
          <g transform="translate(560 560)"><rect x={-240} y={-130} width={480} height={260} rx={130} fill="#16294A" stroke="#C2B9B1" strokeWidth={14} />
            <path d="M-180 60 L-60 -20 L40 30 L180 -80" stroke="#2FAE6B" strokeWidth={10} fill="none" /><Label x={0} y={200} text="A RECORD OF WHAT HAPPENED" size={42} font="Bebas Neue" color={P.ink} o={on(f, record39, 8)} /></g>
          <g opacity={on(f, Math.min(future, next39), 8)} transform="translate(1360 560)"><path d="M-200 300 L-40 -100 L40 -100 L200 300 Z" fill="#2B4A78" /><ellipse cx={0} cy={-40} rx={260} ry={120} fill="#C2B9B1" opacity={0.55} />
            <text y={-20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 90px "Bebas Neue"' }}>?</text><Label x={0} y={360} text={f >= different ? 'THE FUTURE CAN BE DIFFERENT' : 'THE FUTURE'} size={42} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # E) recap */}
      {E > 0 && <g opacity={E}>
        <RaceChart upto={2025} show={[true, true, true, false]} />
        <g opacity={on(f, owning40, 8)}><Label x={cx(2025) - 10} y={cy(1157009) - 26} text="OWNING" size={52} font="Bebas Neue" color={P.mintInk} anchor="end" /></g>
        <g opacity={on(f, safely, 8)}><Label x={cx(2025) + 20} y={cy(2578) + 14} text="LENDING SAFELY" size={44} font="Bebas Neue" color={P.goldInk} anchor="start" /></g>
        <g opacity={on(f, long40, 8)}><Label x={720} y={360} text={f >= faster40 ? 'FAR FASTER OVER LONG PERIODS' : 'OVER LONG PERIODS…'} size={52} font="Bebas Neue" color={P.ink} /></g>
      </g>}
      <Headline f={f} lines={[[step22, 'STEP 2: 98 YEARS OF DATA', P.ink, 106], [treasury25, '$100 IN 1928 → END OF 2025', P.ink, 100], [smoothly, 'NOT A SMOOTH RIDE', P.ink, 106], [forget, 'PRICES ROSE TOO', P.coralInk, 106], [after35, 'AFTER INFLATION', P.ink, 106], [honest, 'HONEST NOTES', P.ink, 110], [step40, 'OWNING GREW FASTER', P.ink, 110]]} />
      <Vignette id="iv-race" />
    </g>
  )
}

const BEATS = ['s28:years', 's33:dollars', 's38:both', 's31:steadier', 's36:grew', 's37:another', 's40:long', 's29:2025', 's36:year', 's37:difference', 's39:next', 's33:1928', 's35:treasury', 's35:0', 's35:year', 's25:safest', 's25:100', 's37:100', 's37:turns', 's29:and', 's29:then', 's27:companies', 's27:reinvested', 's27:became', 's33:2025', 's34:2600', 's34:bills', 's29:4100', 's22:step', 's22:happened', 's22:choice', 's23:professor', 's23:york', 's23:damodaran', 's23:record', 's23:1928', 's24:follow', "s24:maya's", 's24:reinvesting', 's24:dividends', 's25:treasury', 's25:2600', 's25:4', 's26:10year', 's26:7700', 's26:5', 's27:sp', 's27:index', 's27:million', 's27:10', 's28:smoothly', 's28:depression', 's28:war', 's28:272', 's28:1949', 's29:1975', 's29:2000', 's29:142', 's29:thousand', 's29:million', 's30:treasury', 's30:crept', 's30:120', 's30:310', 's30:1700', 's30:2600', 's31:bonds', 's31:middle', 's31:slower', 's32:forget', 's32:prices', 's33:cost', 's33:1900', 's34:beat', 's34:rising', 's35:after', 's35:3', 's35:barely', 's36:stocks', 's36:8', 's37:compounded', 's37:fortune', 's37:moves', 's38:honest', 's38:index', 's38:fees', 's38:taxes', 's38:real', 's39:past', 's39:future', 's39:record', 's39:different', 's40:step', 's40:owning', 's40:faster', 's40:safely']
export const IV_RACE = makePiece('iv-race', 'Investing step two (navy): Professor Damodaran’s record book of yearly returns since 1928 and Maya’s $100 with all income reinvested; a log-scale race chart of the real yearly values — Treasury bills to about $2,600 (3.4% a year), bonds to about $7,700 (4.5%), the S&P 500 to about $1.16 million (about 10%); the depression-and-war years shaded, stock milestones $272 (1949), $4,100 (1975), $142,000 (2000) and bill milestones $120, $310, $1,700; a red dashed prices line to about $1,900, bills only just beat it; growth after inflation bars: bills 0.3% vs stocks 6.8% a year; honest notes — an index before fees and taxes, a rear-view mirror vs a foggy road (the future can be different); recap owning grew far faster', {
  mood: 'dark', Component: Race, beats: BEATS,
  sfx: [['s25:2600', 'pop', 0.15], ['s27:million', 'pop', 0.25], ['s33:1900', 'thud', 0.15], ['s36:8', 'pop', 0.2]] })
