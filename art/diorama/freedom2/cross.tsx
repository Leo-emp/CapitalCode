// ---------------------------------------------------------------- s75–s86: step seven, the crossover point.
// A) A chart on a cream board at golden hour: a flat gold line THE LIFE HE WANTS at $60,000; a green line HIS SECOND PAYCHECK (4% of the pile, from
//    calcs/check.cjs) that crawls ($7,500 at 10 years, $20,000 at 20), climbs, and crosses at year 37 (s76–s78); the crossing glows, WORK BECOMES A CHOICE (s79);
//    AGE 64 (s80).
// B) The speed lever: a shopping bag shrinking (spending less) is acted out and crossed; then a rising stair of pay envelopes — raises (s81).
// C) Each year take-home rises $1,500; every raise drops into investing: bars $15,000, $16,500, $18,000 (s82–s84).
// D) Back on the chart: a second, steeper line crosses at year 26 — AGE 53 — a bracket 11 YEARS SOONER (s85).
// E) Bigger raises, a side business stall, a promotion ladder, each feeding the brass machine faster (s86).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { Axes, C, City, Cross, Defs, Envelope, FONT, Grain, Machine, Tag, fadeIn, scene } from './kit'

const G = 930
// # the two paths, year by year (same model as calcs/check.cjs: 5% real, end-of-year deposits, 4% of the pile)
const sim = (raise: number) => { const out: number[] = [0]; let pile = 0, inv = 15000; for (let y = 1; y <= 40; y++) { pile = pile * 1.05 + inv; out.push(pile * 0.04); inv += raise } return out }
const PA = sim(0), PB = sim(1500)
const X0 = 300, Y0 = G - 60, W = 1280, H = 520, YMAX = 70000
const X = (yr: number) => X0 + (yr / 40) * W, Y = (v: number) => Y0 - (Math.min(v, YMAX) / YMAX) * H
const pathTo = (arr: number[], upto: number) => { const n = Math.max(0, Math.min(40, upto)), pts: string[] = []
  for (let y = 0; y <= Math.floor(n); y++) pts.push(`${X(y)} ${Y(arr[y])}`)
  if (n % 1 > 0 && n < 40) { const a = arr[Math.floor(n)], b = arr[Math.floor(n) + 1], v = lerp(a, b, n % 1); pts.push(`${X(n)} ${Y(v)}`) }
  return 'M' + pts.join(' L') }
const Bag: React.FC<{ x: number; y: number; s: number; o?: number }> = ({ x, y, s, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><path d="M-90 0 L-70 -180 L70 -180 L90 0 Z" fill={C.amber} /><path d="M-40 -180 Q-40 -240 0 -240 Q40 -240 40 -180" stroke={C.brassD} strokeWidth={10} fill="none" /><rect x={-90} y={-30} width={180} height={30} fill="#000" opacity={0.08} /></g>

const Crossover: React.FC<PieceProps> = ({ f, c }) => {
  const moment = c('s75:moment'), crossover75 = c('s75:crossover')
  const picture = c('s76:picture'), life76 = c('s76:life'), flat = c('s76:flat'), sixty76 = c('s76:sixty'), other = c('s76:other'), paycheck76 = c('s76:paycheck')
  const crawls = c('s77:crawls'), seven77 = c('s77:seven'), ten77 = c('s77:ten'), twenty77 = c('s77:twenty'), twenty77b = c('s77:twenty#2')
  const climbs = c('s78:climbs'), thirty78 = c('s78:thirty'), crosses = c('s78:crosses')
  const crossover79 = c('s79:crossover'), money79 = c('s79:money'), choice = c('s79:choice')
  const started = c('s80:started'), sixty80 = c('s80:sixty'), bad = c('s80:bad'), sooner80 = c('s80:sooner')
  const speed = c('s81:speed'), spending = c('s81:spending'), less = c('s81:less'), raises81 = c('s81:raises')
  const better = c('s82:better'), fifteen82 = c('s82:fifteen'), every82 = c('s82:every')
  const already = c('s83:already'), raise83 = c('s83:raise'), investing83 = c('s83:investing')
  const fifteen84 = c('s84:fifteen'), sixteen = c('s84:sixteen'), eighteen = c('s84:eighteen')
  const lines85 = c('s85:lines'), cross85 = c('s85:cross'), fifty = c('s85:fifty'), eleven = c('s85:eleven')
  const bigger = c('s86:bigger'), side = c('s86:side'), promotion = c('s86:promotion'), feed = c('s86:feed'), faster = c('s86:faster')

  const AB = c('s81') - 6, BC = c('s83') - 6, CD = c('s85') - 6, DE = c('s86') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = fadeIn(f, DE)
  // # line A drawn: 0 -> 10 yrs by "ten", 20 by "twenty#2", then to 37 by "crosses", to 40 after
  const upA = f < crawls ? 0 : f < ten77 + 6 ? lerp(0, 10, span(f, crawls, ten77 + 6)) : f < twenty77b + 6 ? lerp(10, 20, span(f, ten77 + 6, twenty77b + 6)) : f < crosses + 6 ? lerp(20, 37, span(f, twenty77b + 6, crosses + 6)) : lerp(37, 40, span(f, crosses + 6, crosses + 30))
  const upB = lerp(0, 40, span(f, lines85 - 10, cross85 + 16))

  const Chart: React.FC<{ second: boolean }> = ({ second }) => (
    <g>
      <Axes x={X0} y={Y0} w={W} h={H} xl="YEARS" />
      {[10, 20, 30].map((y) => <text key={y} x={X(y)} y={Y0 + 44} textAnchor="middle" fill={C.inkSoft} style={{ font: `400 32px ${FONT.big}` }}>{y}</text>)}
      <line x1={X0} y1={Y(60000)} x2={X0 + W * span(f, flat - 6, sixty76 + 10)} y2={Y(60000)} stroke={C.goldD} strokeWidth={10 + (second ? 0 : 8 * pop(f, c('s78:sixty'), 14))} strokeLinecap="round" />
      <Tag x={X0 + 260} y={Y(60000) - 50} text="THE LIFE HE WANTS: $60,000" size={34} o={on(f, life76, 8)} point="none" color={C.sun} />
      <path d={pathTo(PA, second ? 40 : upA)} fill="none" stroke={second ? '#9FBFA8' : C.cashD} strokeWidth={second ? 7 : 11} strokeLinecap="round" strokeLinejoin="round" />
      {!second && <>
        <circle cx={X0} cy={Y0} r={16} fill={C.cashD} opacity={on(f, c('s77:first'), 6)} />
        <Tag x={X(10)} y={Y(PA[10]) - 50} text="$7,500" size={32} o={win(f, seven77, climbs + 20, 8)} />
        <Tag x={X(20)} y={Y(PA[20]) - 50} text="$20,000" size={32} o={win(f, twenty77, climbs + 20, 8)} />
        <Tag x={X0 + 980} y={Y0 - 60} text="HIS SECOND PAYCHECK" size={32} o={win(f, paycheck76, climbs, 8)} point="none" color={C.cash} ink="#fff" />
      </>}
      {/* # the crossover at year 37 */}
      <circle cx={X(37)} cy={Y(60000)} r={150 * (1 + 0.3 * pop(f, c('s79:life'), 16))} fill="url(#ff-glow)" opacity={second ? 0.25 : on(f, crosses, 10)} />
      <circle cx={X(37)} cy={Y(60000)} r={18} fill={C.red} opacity={second ? 0.4 : on(f, crosses, 8)} />
      {!second && <Tag x={X(37) - 40} y={Y(60000) - 120} text={f >= sixty80 ? 'YEAR 37 · AGE 64' : 'YEAR 37'} size={36} o={on(f, thirty78, 8)} color={C.cream} />}
      {second && <>
        <path d={pathTo(PB, upB)} fill="none" stroke={C.cashD} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={X(26)} cy={Y(60000)} r={150} fill="url(#ff-glow)" opacity={on(f, cross85, 10)} /><circle cx={X(26)} cy={Y(60000)} r={18} fill={C.red} opacity={on(f, cross85, 8)} />
        <Tag x={X(26)} y={Y(60000) - 120} text={f >= fifty ? 'YEAR 26 · AGE 53' : 'YEAR 26'} size={36} o={on(f, c('s85:twenty'), 8)} color={C.sun} />
        <g opacity={on(f, eleven - 4, 8)}><path d={`M${X(26)} ${Y0 - 40} L${X(37)} ${Y0 - 40}`} stroke={C.red} strokeWidth={8} /><path d={`M${X(26)} ${Y0 - 60} V${Y0 - 20} M${X(37)} ${Y0 - 60} V${Y0 - 20}`} stroke={C.red} strokeWidth={8} />
          <Tag x={(X(26) + X(37)) / 2} y={Y0 - 100} text="11 YEARS SOONER" size={38} o={1} color={C.red} ink="#fff" /></g>
        <Tag x={X0 + 240} y={Y0 - 200} text="INVESTING EVERY RAISE" size={32} o={on(f, lines85, 8)} point="none" color={C.cash} ink="#fff" />
      </>}
    </g>
  )

  return (
    <g>
      <Defs />
      {/* # A) the two lines and the crossover */}
      {A > 0 && <g opacity={A}>
        <City sky="gold" f={f} sun={[1760, 300]} ground={G} />
        <g opacity={on(f, picture - 6, 10)}><Chart second={false} /></g>
        <Tag x={X(37)} y={Y(60000) + 120} text="FROM THAT DAY" size={40} o={win(f, c('s79:day'), choice, 8)} point="none" />
        <Tag x={X(37)} y={Y(60000) + 120} text="WORK BECOMES A CHOICE" size={40} o={win(f, choice, started, 8)} point="none" color={C.cash} ink="#fff" />
        <Tag x={X(37)} y={Y(60000) + 120} text="NOT BAD. BUT SOONER?" size={40} o={on(f, bad, 8)} point="none" />
        <Tag x={X0 + 420} y={Y0 - 300} text="FASTER AND FASTER" size={40} o={win(f, c('s78:faster'), thirty78, 8)} point="none" />
        <Tag x={X0 + 400} y={Y0 - 300} text="THE CROSSOVER POINT" size={40} o={win(f, crossover79, choice, 8)} point="none" color={C.sun} />
      </g>}

      {/* # B) the lever: not spending less — raises */}
      {B > 0 && <g opacity={B}>
        <City sky="day" f={f} sun={[1760, 260]} ground={G} />
        <g opacity={win(f, spending - 6, raises81 - 2, 8)}>
          <Bag x={560} y={G} s={lerp(1.2, 0.6, span(f, spending, less + 10))} />
          <Cross x={560} y={G - 140} r={140} p={on(f, less + 2, 12)} />
        </g>
        <g opacity={on(f, speed - 6, 8)} transform={`translate(1000 ${G})`}><rect x={-14} y={-260} width={28} height={260} rx={10} fill="#4B5578" transform={`rotate(${-30 + 60 * on(f, raises81, 16)} 0 0)`} /><circle cy={-260} r={0} /><rect x={-80} y={-30} width={160} height={30} rx={10} fill="#2E3552" /></g>
        <Tag x={1000} y={G + 60} text="THE SPEED LEVER" size={38} o={on(f, speed, 8)} point="none" />
        {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, raises81 + k * 5, 6)} transform={`translate(${1260 + k * 150} ${G - 60 - k * 110})`}><rect x={-75} y={0} width={150} height={60 + k * 110} fill="#E5D6BC" /><Envelope x={0} y={-60} s={0.55} text="$" /></g>)}
        <Tag x={1500} y={G - 600} text="RAISES" size={50} o={on(f, raises81, 8) * (1 - on(f, fifteen82 - 4, 8))} color={C.cash} ink="#fff" />
        <Tag x={1500} y={G - 600} text="+$1,500 EVERY YEAR" size={46} o={on(f, fifteen82, 8)} color={C.sun} />
        <Tag x={1500} y={G + 60} text="IN TODAY'S MONEY" size={34} o={on(f, c("s82:today's"), 8)} point="none" />
        <Tag x={560} y={G + 60} text="BETTER AT HIS JOB" size={34} o={on(f, c('s82:job'), 8)} point="none" />
        <Person f={f} who="investor" beats={[[0, 'confident', 'smiling'], [better, 'thumbsUp', 'smiling']]} x={560} y={G} s={0.9} o={on(f, better - 6, 8)} />
      </g>}

      {/* # C) every raise goes into investing */}
      {Cc > 0 && <g opacity={Cc}>
        <City sky="day" f={f} sun={[1760, 260]} ground={G} />
        <Person f={f} who="investor" beats={[[0, 'confident', 'smiling'], [fifteen82, 'pointUp', 'smiling'], [raise83, 'push', 'smiling'], [fifteen84, 'present', 'smiling']]} x={300} y={G} s={0.92} />
        <Tag x={300} y={G - 570} text="+$1,500 EVERY YEAR" size={36} o={on(f, fifteen82, 8)} color={C.sun} />
        <Tag x={300} y={G + 60} text="IN TODAY'S MONEY" size={32} o={on(f, every82 + 10, 8)} point="none" />
        <Tag x={720} y={G - 480} text="LIFE: ALREADY THE ONE HE WANTS" size={34} o={win(f, already - 4, fifteen84 - 4, 8)} point="none" />
        {[[fifteen84, 15, '$15,000', 'YEAR 1'], [c('s84:two') + 4, 16.5, '$16,500', 'YEAR 2'], [c('s84:three') + 4, 18, '$18,000', 'YEAR 3']].map(([at, v, t, yl], k) => {
          const h = (v as number) * 22 * on(f, (at as number) - 2, 14), x = 900 + k * 300
          return <g key={k} opacity={on(f, (at as number) - 6, 6)}>
            <rect x={x - 100} y={G - h} width={200} height={h} rx={10} fill={C.cash} /><rect x={x - 100} y={G - h} width={200} height={(v as number - 15) * 22 * on(f, (at as number) - 2, 14)} rx={10} fill={C.sun} />
            <Tag x={x} y={G - h - 50} text={t as string} size={40} /><text x={x} y={G + 54} textAnchor="middle" fill={C.ink} style={{ font: `400 38px ${FONT.big}` }}>{yl}</text></g> })}
        <Tag x={1200} y={G - 560} text="EVERY RAISE GOES INTO INVESTING" size={38} o={on(f, investing83, 8)} color={C.cash} ink="#fff" point="none" />
      </g>}

      {/* # D) the new crossover */}
      {D > 0 && <g opacity={D}>
        <City sky="gold" f={f} sun={[1760, 300]} ground={G} />
        <Chart second />
      </g>}

      {/* # E) anything that grows paycheck 1 */}
      {E > 0 && <g opacity={E}>
        <City sky="dawn" f={f} sun={[960, 560]} ground={G} />
        <g opacity={on(f, bigger - 4, 8)} transform={`translate(300 ${G - 300}) scale(${1 + 0.06 * pop(f, bigger, 12) + 0.12 * pop(f, c('s86:grows'), 14)})`}><Envelope x={0} y={0} text="RAISE" /><path d="M140 40 V-60 M110 -30 L140 -64 L170 -30" stroke={C.cashD} strokeWidth={14} fill="none" strokeLinecap="round" /></g>
        <g opacity={on(f, side - 4, 8)} transform={`translate(620 ${G})`}><rect x={-120} y={-200} width={240} height={200} fill={C.paper} /><path d="M-140 -200 L140 -200 L120 -270 L-120 -270 Z" fill={C.red} />{[-90, -30, 30, 90].map((sx) => <path key={sx} d={`M${sx - 30} -200 Q${sx} -170 ${sx + 30} -200`} fill="#fff" />)}<rect x={-90} y={-140} width={180} height={20} rx={6} fill={C.bark} /></g>
        <Tag x={620} y={G + 60} text="SIDE BUSINESS" size={34} o={on(f, side, 8)} point="none" />
        <g opacity={on(f, promotion - 4, 8)} transform={`translate(900 ${G})`}><rect x={-60} y={-420} width={14} height={420} fill={C.bark} /><rect x={46} y={-420} width={14} height={420} fill={C.bark} />{Array.from({ length: 6 }, (_, k) => <rect key={k} x={-50} y={-60 - k * 66} width={100} height={12} fill={C.bark} />)}<path d="M0 -470 l14 28 30 4 -22 20 6 30 -28 -14 -28 14 6 -30 -22 -20 30 -4 Z" fill={C.gold} /></g>
        <Tag x={900} y={G + 60} text="PROMOTION" size={34} o={on(f, promotion, 8)} point="none" />
        <g opacity={on(f, feed - 6, 8)}>
          <path d={`M1000 ${G - 200} C 1150 ${G - 200} 1200 ${G - 140} 1340 ${G - 140}`} stroke={C.brassD} strokeWidth={30} fill="none" strokeLinecap="round" />
          <path d={`M1000 ${G - 200} C 1150 ${G - 200} 1200 ${G - 140} 1340 ${G - 140}`} stroke={C.sun} strokeWidth={12} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="0.05 0.05" strokeDashoffset={-f / (f >= faster ? 15 : 40)} />
        </g>
        <Machine x={1560} y={G} f={f} s={0.9} run={on(f, feed, 10) * (f >= faster ? 1 : 0.5)} plate="SECOND PAYCHECK" glow={0.5 * on(f, faster, 12)} />
        <Tag x={1560} y={G + 60} text="FASTER" size={40} o={on(f, faster, 8)} point="none" color={C.cash} ink="#fff" />
      </g>}

      <Headline f={f} lines={[[moment, 'STEP 7: THE CROSSOVER POINT', C.ink, 100], [picture, 'PICTURE TWO LINES', C.ink, 104], [crawls, 'AT FIRST IT CRAWLS', C.ink, 104], [climbs, 'THEN IT CLIMBS', C.ink, 104],
        [crossover79, 'HIS MONEY PAYS FOR HIS LIFE', C.ink, 100], [speed, "THE LEVER ISN'T SPENDING LESS", C.ink, 96], [better, 'INVEST EVERY RAISE', C.ink, 104], [lines85, '11 YEARS SOONER', C.cashD, 108],
        [bigger, 'GROW PAYCHECK 1, FEED PAYCHECK 2', C.ink, 92]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s78:sixty", "s85:twenty", "s84:two", "s77:first", "s84:three", "s79:day", "s78:faster", "s82:job", "s82:today's", "s79:life", "s86:grows", 's75:moment', 's75:crossover', 's76:picture', 's76:life', 's76:flat', 's76:sixty', 's76:other', 's76:paycheck', 's77:crawls', 's77:seven', 's77:ten', 's77:twenty', 's77:twenty#2', 's78:climbs', 's78:thirty', 's78:crosses',
  's79:crossover', 's79:money', 's79:choice', 's80:started', 's80:sixty', 's80:bad', 's80:sooner', 's81:speed', 's81:spending', 's81:less', 's81:raises', 's82:better', 's82:fifteen', 's82:every', 's83:already', 's83:raise', 's83:investing',
  's84:fifteen', 's84:sixteen', 's84:eighteen', 's85:lines', 's85:cross', 's85:fifty', 's85:eleven', 's86:bigger', 's86:side', 's86:promotion', 's86:feed', 's86:faster']
export const FF_CROSS = makePiece('ff-cross', 'Freedom step seven: a cream chart at golden hour, a flat gold line THE LIFE HE WANTS: $60,000 and a green line HIS SECOND PAYCHECK (4% of the pile) crawling past $7,500 at 10 years and $20,000 at 20, climbing and crossing at YEAR 37 · AGE 64 with a glow (THE CROSSOVER POINT, WORK BECOMES A CHOICE, NOT BAD. BUT SOONER?); a shrinking shopping bag crossed, a speed lever, a stair of pay envelopes (RAISES); Leo +$1,500 EVERY YEAR, bars $15,000, $16,500, $18,000 (EVERY RAISE GOES INTO INVESTING); the chart again with a steeper line crossing at YEAR 26 · AGE 53 and a red bracket 11 YEARS SOONER; a RAISE envelope, a SIDE BUSINESS stall and a PROMOTION ladder feed the SECOND PAYCHECK machine FASTER', {
  mood: 'light', Component: Crossover, beats: BEATS,
  sfx: [['s76:flat', 'swish', 0.1], ['s77:seven', 'pop', 0.1], ['s77:twenty#2', 'pop', 0.1], ['s78:crosses', 'chime', 0.2], ['s81:less', 'swish', 0.12], ['s81:raises', 'ding', 0.15], ['s84:fifteen', 'pop', 0.1], ['s84:sixteen', 'pop', 0.1], ['s84:eighteen', 'pop', 0.1], ['s85:cross', 'chime', 0.2], ['s86:faster', 'whoosh', 0.15]] })
