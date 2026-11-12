// ---------------------------------------------------------------- s41–s62: step three, the catch (navy).
// A) A bumpy road instead of a straight line; 98 yearly bars (real data, green up / red down) — 26 red; the worst years
//    1931, 2008, 2022 pulse with their drops; Maya opens her phone after 2008 and a third of her pile vanishes.
// B) After 2008: $100 → $63 → back above $100 only by the end of 2012 (real values); a panic seller locks in the loss
//    (crossed), a holder climbs back and keeps growing; the market recovered from every fall in the record.
// C) Zoom out: three windows — 1 year (about 3 in 4 up), 10 years (5 of 89 ended lower), 20 years (0 of 79, even after
//    inflation); 1929 + 20 years just ahead. A rent envelope stays in a safe jar (near-term money).
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { BankPhone, CalPage, NoMark } from '../bank/kit'
import { Bill } from '../aimoney/common'
import { HIST } from './data'
import { Mountain } from './kit'

const GROUND = 930
const GREEN = '#2FAE6B', RED = '#F06B5B'
const PATH08 = [100, 63.4, 79.9, 91.7, 93.7, 108.6]

const Catch: React.FC<PieceProps> = ({ f, c }) => {
  const look54 = c('s54:look'), stocks42 = c('s42:stocks'), nobody55 = c('s55:nobody'), y1928_57 = c('s57:1928'), divs51 = c('s51:dividends'), back52 = c('s52:back'), started52 = c('s52:started'), diff59 = c('s59:different'), invested60 = c('s60:invested'), bad60 = c('s60:bad'), those53 = c('s53:those'), news53 = c('s53:news'), stocks57 = c('s57:stocks'), explains61 = c('s61:explains'), money61 = c('s61:money'), time62 = c('s62:time'), owning49 = c('s49:owning'), temp52 = c('s52:temporary'), y2008_48 = c('s48:2008'), seeing48 = c('s48:seeing'), someone58 = c('s58:someone'), started58 = c('s58:started'), d100_50 = c('s50:100'), y2008b = c('s50:2008#2'), worth50 = c('s50:worth'), reinv51 = c('s51:reinvested'), record53 = c('s53:record'), y1928_53 = c('s53:1928'), market53 = c('s53:market'), step41 = c('s41:step'), catch41 = c('s41:catch'), big41 = c('s41:big')
  const straight = c('s42:straight'), line42 = c('s42:line')
  const y98 = c('s43:98'), lost43 = c('s43:lost'), d26 = c('s43:26'), one43 = c('s43:one'), four43 = c('s43:four')
  const brutal = c('s44:brutal')
  const y1931 = c('s45:1931'), p44 = c('s45:44')
  const y2008 = c('s46:2008'), crisis = c('s46:crisis'), p37 = c('s46:37')
  const y2022 = c('s47:2022'), p18 = c('s47:18')
  const checking = c('s48:checking'), account48 = c('s48:account'), third48 = c('s48:third'), gone = c('s48:gone')
  const price49 = c('s49:price'), riding = c('s49:riding'), ups = c('s49:ups'), downs = c('s49:downs')
  const after50 = c('s50:after'), d63 = c('s50:63'), later = c('s50:later')
  const y2012 = c('s51:2012'), five = c('s51:five'), back51 = c('s51:back')
  const sold = c('s52:sold'), panic = c('s52:panic'), permanent = c('s52:permanent'), held = c('s52:held'), growing52 = c('s52:growing')
  const terrible = c('s53:terrible'), sensible = c('s53:sensible'), recovered = c('s53:recovered'), falls = c('s53:falls')
  const zoom = c('s54:zoom')
  const single55 = c('s55:single'), three55 = c('s55:three'), advance = c('s55:advance'), bad55 = c('s55:bad')
  const y10 = c('s56:10'), lower56 = c('s56:lower'), d89 = c('s56:89')
  const y20 = c('s57:20'), remarkable = c('s57:remarkable'), every57 = c('s57:every'), higher57 = c('s57:higher'), inflation57 = c('s57:inflation')
  const crash = c('s58:crash'), y1929 = c('s58:1929'), ahead = c('s58:ahead'), just58 = c('s58:just#2')
  const history59 = c('s59:history'), time59 = c('s59:time')
  const longer60 = c('s60:longer'), balanced = c('s60:balanced'), good60 = c('s60:good')
  const soon = c('s61:soon'), rent61 = c('s61:rent'), safe61 = c('s61:safe')
  const step62 = c('s62:step'), hard = c('s62:hard'), risk62 = c('s62:risk'), reward = c('s62:reward')

  const AB = after50 - 8, BC = zoom - 8, CD = soon - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = win(f, BC, CD), D = on(f, CD, 10)
  const barW = 15, bx = (i: number) => 200 + i * 15.7
  const hl = (yr: number, at: number) => win(f, at, at + 60, 8)

  return (
    <g>
      <Stage id="iv-catch" frame={f} />
      {/* # A) 98 yearly bars */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, checking, 10)}>
          <g opacity={win(f, stocks42, y98, 8)}><path d="M200 800 L1700 380" stroke="#C2B9B1" strokeWidth={10} strokeDasharray="20 16" /><NoMark x={950} y={590} o={on(f, line42, 8)} r={90} /></g>
          <line x1={190} y1={640} x2={1750} y2={640} stroke="#C2B9B1" strokeWidth={3} opacity={on(f, y98, 8)} />
          {HIST.map(([yr, r], i) => { const at = lerp(y98, lost43, i / 97), h = Math.min(260, Math.abs(r) * 6) * on(f, at, 8)
            const big = (yr === 1931 && f >= y1931) || (yr === 2008 && f >= y2008) || (yr === 2022 && f >= y2022)
            return <rect key={yr} x={bx(i)} y={r >= 0 ? 640 - h : 640} width={barW - 3} height={h} rx={3} fill={r >= 0 ? GREEN : RED} opacity={f >= d26 && r >= 0 ? 0.35 : 1} stroke={big ? '#FFFFFF' : 'none'} strokeWidth={big ? 3 : 0} /> })}
          <g opacity={on(f, d26, 8)}><Label x={960} y={980} text={f >= four43 ? '26 DOWN YEARS OF 98 ≈ 1 IN 4' : '26 DOWN YEARS'} size={52} font="Bebas Neue" color={P.coralInk} /></g>
          {([[1931, y1931, p44, '1931: −44%'], [2008, y2008, p37, '2008: −37%'], [2022, y2022, p18, '2022: −18%']] as [number, number, number, string][]).map(([yr, at, pat, t]) => { const i = yr - 1928
            return <g key={yr} opacity={hl(yr, at)}><circle cx={bx(i) + 6} cy={640 + Math.min(260, Math.abs(HIST[i][1]) * 6) + 30} r={10} fill="#FFFFFF" /><Label x={bx(i) + 6} y={640 + Math.min(260, Math.abs(HIST[i][1]) * 6) + 80} text={f >= pat ? t : String(yr)} size={44} font="Bebas Neue" color={P.coralInk} /></g> })}
          <g opacity={on(f, crisis, 8) * (1 - on(f, y2022, 8))}><Label x={1300} y={400} text="FINANCIAL CRISIS" size={44} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, checking, 10)}>
          <Person f={f} who="investorF" beats={[[checking, 'phone', 'neutral'], [third48, 'shock', 'shocked'], [riding, 'despair', 'worried']]} x={420} y={GROUND} s={1.1} />
          <BankPhone x={760} y={540 - 10 * pop(f, y2008_48, 12)} s={0.9} amount={f >= third48 ? '−37%' : '$$$'} sub={f >= account48 ? 'AFTER 2008' : 'MY ACCOUNT'} pulse={win(f, third48, third48 + 20, 6) + win(f, seeing48, seeing48 + 16, 4)} />
          <g transform={`translate(${8 * Math.sin(f / 2) * win(f, owning49, owning49 + 16, 4)} 0)`}><Mountain x={1360} base={GROUND} h={lerp(420, 265, on(f, gone, 20))} w={600} /></g>
          <g opacity={on(f, gone, 8)}><path d={`M1180 ${GROUND - 300} L1540 ${GROUND - 300}`} stroke={RED} strokeWidth={6} strokeDasharray="14 10" /><Label x={1360} y={GROUND - 330} text="A THIRD GONE" size={48} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, price49, 8)}><Label x={1360} y={300} text={f >= downs ? 'UPS AND DOWNS: THE PRICE' : 'THE PRICE OF HIGHER RETURNS'} size={50} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # B) 2008 → 2012 */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} dark />
        <line x1={300} y1={GROUND - 60} x2={1500} y2={GROUND - 60} stroke="#C2B9B1" strokeWidth={3} />
        <line x1={300} y1={GROUND - 60 - 100 * 4} x2={1500} y2={GROUND - 60 - 100 * 4} stroke="#C2B9B1" strokeWidth={3} strokeDasharray="12 10" opacity={on(f, after50, 8)} />
        <Label x={1520} y={GROUND - 60 - 400 + 12} text="$100" size={40} font="Bebas Neue" color={P.ink2} anchor="start" />
        {PATH08.map((v, k) => { const at = k === 0 ? d100_50 : k === 1 ? d63 : lerp(later + 6, y2012, (k - 2) / 3), x = 340 + k * 220, h = v * 4 * on(f, at, 12)
          return <g key={k} opacity={on(f, at, 6)}><rect x={x - 60} y={GROUND - 60 - h} width={120} height={h} rx={10} fill={v < 100 ? RED : GREEN} />
            <Label x={x} y={GROUND - 20} text={['START 2008', 'END 2008', '2009', '2010', '2011', '2012'][k]} size={34} font="Bebas Neue" color={P.ink2} />
            {(k === 1 || k === 5) && <Label x={x} y={GROUND - 80 - h} text={k === 1 ? '≈ $63' : 'BACK ABOVE $100'} size={40} font="Bebas Neue" color={k === 1 ? P.coralInk : P.mintInk} />}</g> })}
        <g opacity={win(f, y2008b, d63 + 10, 6)}><Label x={340} y={GROUND - 520} text="START OF 2008" size={40} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={win(f, worth50, worth50 + 30, 6)}><rect x={270} y={GROUND - 470} width={140} height={420} rx={14} fill="none" stroke="#FFFFFF" strokeWidth={5} /></g>
        <g opacity={on(f, divs51, 8)}><Label x={900} y={GROUND - 520} text="(DIVIDENDS REINVESTED)" size={36} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, five, 8)}><Label x={1450} y={300} text="≈ 5 YEARS TO RECOVER" size={50} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={win(f, sold, held, 8)}><Person f={f} who="buyer" beats={[[sold, 'despair', 'worried'], [permanent, 'facepalm', 'worried']]} x={1700} y={GROUND} s={0.9} flip /><g opacity={win(f, temp52, permanent, 4)}><path d="M1580 520 L1580 620 M1550 590 L1580 620 L1610 590" stroke="#F06B5B" strokeWidth={10} fill="none" strokeLinecap="round" /></g><NoMark x={1700} y={640} o={on(f, permanent, 8)} r={90} /><Label x={1700} y={GROUND + 60} text="SOLD IN PANIC" size={40} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, held, 8) * (1 - on(f, terrible, 8))}><Person f={f} who="investorF" beats={[[held, 'idle', 'smiling'], [back52, 'point', 'smiling'], [started52, 'present', 'smiling'], [growing52, 'thumbsUp', 'smiling']]} x={1700} y={GROUND} s={0.9} flip /><Label x={1700} y={GROUND + 60} text="HELD ON" size={40} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, those53, 8) * (1 - 0.5 * on(f, look54, 10))}><g transform={`translate(1660 ${560 - 10 * pop(f, news53, 12)})`}><rect x={-150} y={-100} width={300} height={200} rx={10} fill="#F2E6CC" /><text y={-40} textAnchor="middle" fill="#C94A3E" style={{ font: '400 46px "Bebas Neue"' }}>MARKETS CRASH!</text>{[0, 1, 2].map((k) => <rect key={k} x={-110} y={0 + k * 26} width={220} height={10} rx={5} fill="#D6CBB3" />)}</g>
          <g opacity={on(f, record53, 8)} transform={`translate(1660 ${740 - 10 * pop(f, y1928_53, 12) - 10 * pop(f, market53, 12)})`}><rect x={-120} y={-40} width={240} height={80} rx={14} fill="#2E5C9A" /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>SINCE 1928</text></g>
          <g opacity={on(f, recovered, 8)}><Label x={1660} y={GROUND + 60} text={f >= falls ? 'EVERY FALL RECOVERED (SO FAR)' : 'RECOVERED…'} size={40} font="Bebas Neue" color={P.mintInk} /></g></g>
      </g>}

      {/* # C) zoom out: 1, 10, 20 years */}
      {Cw > 0 && <g opacity={Cw}>
        <Ground y={GROUND} dark />
        {([[single55, '1 YEAR', '≈ 3 IN 4 UP', P.ink], [y10, '10 YEARS', '5 OF 89 ENDED LOWER', P.ink], [y20, '20 YEARS', '0 OF 79 ENDED LOWER', P.mintInk]] as [number, string, string, string][]).map(([at, t, sub, col], k) =>
          <g key={k} opacity={on(f, at, 8)} transform={`translate(${420 + k * 540} ${560 - 12 * pop(f, at, 14)})`}>
            <rect x={-220} y={-200} width={440} height={400} rx={30} fill="#16294A" stroke={k === 2 && f >= remarkable ? P.gold : '#3A5F93'} strokeWidth={k === 2 && f >= remarkable ? 8 : 4} />
            <text y={-120} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 60px "Bebas Neue"' }}>{t}</text>
            {k === 2 && <g opacity={on(f, y1928_57, 8)}><text y={-70} textAnchor="middle" fill={P.gold} style={{ font: '400 36px "Bebas Neue"' }}>SINCE 1928</text></g>}
            {/* a mini picture: wiggly line, flatter with time */}
            <path strokeWidth={k === 2 ? 8 + 6 * win(f, stocks57, stocks57 + 20, 6) : 8} d={k === 0 ? 'M-170 40 L-110 -40 L-50 80 L10 -20 L70 60 L130 -60 L170 20' : k === 1 ? 'M-170 60 L-110 20 L-50 50 L10 0 L70 10 L130 -30 L170 -40' : 'M-170 80 L-110 50 L-50 30 L10 0 L70 -30 L130 -60 L170 -90'} stroke={k === 0 ? RED : GREEN} fill="none" />
            <text y={150} textAnchor="middle" fill={col === P.mintInk ? '#3DDC97' : '#F0EAE1'} style={{ font: '400 44px "Bebas Neue"' }}>{k === 1 ? (f >= d89 ? sub : '5 ENDED LOWER…') : sub}</text>
            {k === 2 && <g opacity={on(f, inflation57, 8)}><text y={188} textAnchor="middle" fill="#3DDC97" style={{ font: '400 34px "Bebas Neue"' }}>EVEN AFTER INFLATION</text></g>}
          </g>)}
        <g opacity={on(f, nobody55, 8) * (1 - on(f, y10, 8))}><Label x={420} y={850} text="BUT WHICH YEAR? NOBODY KNOWS" size={42} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={win(f, someone58, ahead + 30, 6)} transform="translate(1830 0)"><Person f={f} who="buyer" beats={[[someone58, 'idle', 'neutral'], [started58, 'walkA', 'neutral', 'walkB', 14], [ahead, 'thumbsUp', 'smiling']]} x={-10} y={GROUND} s={0.55} /></g>
        <g opacity={on(f, crash, 8)}><Label x={960} y={880} text={f >= ahead ? (f >= just58 ? 'STARTED 1929 → AHEAD AFTER 20 YEARS (JUST)' : 'STARTED 1929 → AHEAD AFTER 20 YEARS') : 'EVEN FROM 1929…'} size={44} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, history59, 8)}><Label x={960} y={300} text={f >= diff59 ? 'HISTORY — THE FUTURE CAN DIFFER' : 'HISTORY, NOT A PROMISE'} size={50} font="Bebas Neue" color={P.ink2} o={1 - on(f, time59, 8)} /></g>
        <g opacity={on(f, longer60, 8)}><Label x={960} y={300} text={f >= good60 ? 'BAD YEARS BALANCED BY GOOD ONES' : f >= bad60 ? 'BAD YEARS…' : f >= invested60 ? 'THE LONGER IT STAYS INVESTED…' : 'THE LONGER IT STAYS…'} size={50} font="Bebas Neue" color={P.goldInk} /></g>
      </g>}

      {/* # D) near-term money stays safe; recap */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, step62, 10)}>
          <g opacity={on(f, explains61, 8)}><Person f={f} who="investorF" beats={[[CD, 'idle', 'thinking'], [money61, 'think', 'thinking'], [rent61, 'holdUp', 'smiling'], [safe61, 'thumbsUp', 'smiling']]} x={380} y={GROUND} s={1.1} /></g>
          <g opacity={on(f, rent61, 8)}><Bill x={760} y={520} s={0.8} r={-6} text="NEXT YEAR'S RENT" /></g>
          <g opacity={on(f, safe61, 8)} transform="translate(1300 0)"><rect x={-130} y={560} width={260} height={360} rx={40} fill="#DDEBF7" opacity={0.3} stroke="#A9C4DE" strokeWidth={6} /><rect x={-110} y={520} width={220} height={50} rx={14} fill="#2E5C9A" /><text y={556} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>SAFE SAVINGS</text><Bill x={0} y={760} s={0.6} text="RENT" /></g>
          <g opacity={on(f, soon, 8)}><Label x={960} y={300} text="MONEY NEEDED SOON" size={56} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, step62, 10)}>
          <Mountain x={960} base={GROUND} h={lerp(200, 360, on(f, time62, 20)) + 160 * on(f, reward, 20)} w={720} />
          <g opacity={on(f, hard, 8)}><Label x={500} y={480} text="HARD FALLS IN ONE YEAR" size={48} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, risk62, 8)}><Label x={1440} y={480} text={f >= reward ? 'TIME → REWARD' : 'TIME…'} size={56} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}
      <Headline f={f} lines={[[step41, 'STEP 3: THE CATCH', P.coralInk, 110], [straight, 'NOT A STRAIGHT LINE', P.ink, 106], [brutal, 'SOME YEARS WERE BRUTAL', P.coralInk, 106], [after50, 'AFTER 2008', P.ink, 110], [zoom, 'ZOOM OUT', P.ink, 110], [remarkable, 'EVERY 20 YEARS: AHEAD (SO FAR)', P.mintInk, 98], [soon, 'NEED IT SOON? KEEP IT SAFE', P.ink, 100], [step62, 'TIME TURNED RISK INTO REWARD', P.ink, 100]]} />
      <Vignette id="iv-catch" />
    </g>
  )
}

const BEATS = ['s54:look', 's42:stocks', 's55:nobody', 's57:1928', 's51:dividends', 's52:back', 's52:started', 's59:different', 's60:invested', 's60:bad', 's53:those', 's53:news', 's57:stocks', 's61:explains', 's61:money', 's62:time', 's49:owning', 's52:temporary', 's48:2008', 's48:seeing', 's58:someone', 's58:started', 's50:100', 's50:2008#2', 's50:worth', 's51:reinvested', 's53:record', 's53:1928', 's53:market', 's41:step', 's41:catch', 's41:big', 's42:straight', 's42:line', 's43:98', 's43:lost', 's43:26', 's43:one', 's43:four', 's44:brutal', 's45:1931', 's45:44', 's46:2008', 's46:crisis', 's46:37', 's47:2022', 's47:18', 's48:checking', 's48:account', 's48:third', 's48:gone', 's49:price', 's49:riding', 's49:ups', 's49:downs', 's50:after', 's50:63', 's50:later', 's51:2012', 's51:five', 's51:back', 's52:sold', 's52:panic', 's52:permanent', 's52:held', 's52:growing', 's53:terrible', 's53:sensible', 's53:recovered', 's53:falls', 's54:zoom', 's55:single', 's55:three', 's55:advance', 's55:bad', 's56:10', 's56:lower', 's56:89', 's57:20', 's57:remarkable', 's57:every', 's57:higher', 's57:inflation', 's58:crash', 's58:1929', 's58:ahead', 's58:just#2', 's59:history', 's59:time', 's60:longer', 's60:balanced', 's60:good', 's61:soon', 's61:rent', 's61:safe', 's62:step', 's62:hard', 's62:risk', 's62:reward']
export const IV_CATCH = makePiece('iv-catch', 'Investing step three (navy): a straight dashed line crossed out, then 98 real yearly S&P 500 bars, 26 red down years (about 1 in 4) with 1931 −44%, 2008 −37%, 2022 −18% highlighted; Maya sees −37% on her phone and a third of her gold mountain vanishes; $100 at the start of 2008 → about $63 → back above $100 only in 2012 (real values); a panic seller crossed out vs a holder; a MARKETS CRASH newspaper, every fall recovered so far; three windows — 1 year about 3 in 4 up, 10 years 5 of 89 lower, 20 years 0 of 79 lower even after inflation, from 1929 just ahead; next year’s rent kept in a safe savings jar; time turned risk into reward', {
  mood: 'dark', Component: Catch, beats: BEATS,
  sfx: [['s43:26', 'thud', 0.15], ['s45:44', 'thud', 0.2], ['s46:37', 'thud', 0.2], ['s51:back', 'pop', 0.2], ['s57:remarkable', 'pop', 0.25]] })
