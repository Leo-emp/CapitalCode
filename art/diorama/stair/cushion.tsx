// ---------------------------------------------------------------- s10–s21: step one, a cushion (morning garden → storm road → garden).
// A) Maya (made-up) by her garden cottage; her money appears one thing at a time: a $50,000 paycheck, a $3,000-a-month
//    bills stack, her $12,000 savings tank, a red card with -$2,000. Then a plump cushion slides under the tank (step one),
//    and a small stock sapling waits on the far side, tagged LATER.
// B) A storm road: the stock board's line plunges, Maya's car breaks down and smokes, lightning on "crash"; to pay she
//    pours coins into the falling board (selling at the bottom). A survey clipboard; a crowd of 100 people, 63 light up
//    (could pay a $400 bill), the other 37 pulse: about 1 in 3 could not.
// C) The garden again: three $3,000 month envelopes drop into the cushion tank = $9,000; a crossed stock board, then the
//    tank sits on its cushion with a 1–2 DAYS phone; two tanks side by side: 0.38% drips $34 a year, 4% pours $360,
//    an FDIC shield; Maya moves 9,000 into the 4% tank, 3,000 stays behind; a sapling appears and is crossed (not yet),
//    a leaking bucket rolls in from the right (the cheaper win).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { Bucket, C, Car, Coin, Dot, Drop, Ground, NoMark, Paycheck, Sky, Storm, Tank, Tree, TXT, INTER } from './kit'

const GROUND = 940

// # Maya's garden cottage (this video's setting for her home)
const Cottage: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={6} rx={260} ry={20} fill="#000" opacity={0.12} />
    <rect x={-200} y={-260} width={400} height={260} fill="#F4E3C6" /><rect x={-200} y={-260} width={400} height={26} fill="#E6D0AA" />
    <path d="M-240 -250 L0 -420 L240 -250 Z" fill={C.terra} /><path d="M-240 -250 L0 -420 L0 -390 L-200 -250 Z" fill={C.terraD} opacity={0.5} />
    <rect x={-40} y={-140} width={90} height={140} rx={8} fill={C.wood} /><circle cx={34} cy={-70} r={6} fill={C.goldD} />
    {[-140, 110].map((wx) => <g key={wx}><rect x={wx} y={-200} width={80} height={70} rx={6} fill={C.waterL} /><rect x={wx + 37} y={-200} width={6} height={70} fill="#FFFFFF" /><rect x={wx - 6} y={-132} width={92} height={10} rx={4} fill={C.wood} /></g>)}
    <rect x={90} y={-380} width={44} height={90} fill={C.stoneD} />
  </g>
)
// # a plump cushion (the emergency fund) that slides under the savings tank
const Pillow: React.FC<{ x: number; y: number; w?: number; o?: number }> = ({ x, y, w = 360, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d={`M${-w / 2} -10 Q${-w / 2 - 20} -70 ${-w / 2 + 30} -84 Q0 -110 ${w / 2 - 30} -84 Q${w / 2 + 20} -70 ${w / 2} -10 Q0 18 ${-w / 2} -10 Z`} fill="#E58C6B" />
    <path d={`M${-w / 2 + 30} -84 Q0 -100 ${w / 2 - 30} -84`} fill="none" stroke="#F6B79C" strokeWidth={10} strokeLinecap="round" />
    <circle cx={0} cy={-48} r={10} fill="#C96A4C" />
  </g>
)
// # a bill envelope / stack of bills
const Bills: React.FC<{ x: number; y: number; s?: number; o?: number; text: string; sub?: string }> = ({ x, y, s = 1, o = 1, text, sub }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[2, 1, 0].map((k) => <rect key={k} x={-150 + k * 10} y={-100 - k * 14} width={300} height={170} rx={14} fill={k ? '#EADBC0' : C.paper} stroke="#D9C29A" strokeWidth={4} />)}
    <rect x={-120} y={-70} width={120} height={14} rx={7} fill={C.stoneD} /><rect x={-120} y={-44} width={80} height={14} rx={7} fill={C.stoneD} />
    <text y={30} textAnchor="middle" fill={C.red} style={TXT(64)}>{text}</text>
    {sub && <text y={110} textAnchor="middle" fill={C.ink} style={TXT(44)}>{sub}</text>}
  </g>
)
const CreditCard: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; text?: string }> = ({ x, y, s = 1, o = 1, r = 0, text }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-95} width={300} height={190} rx={20} fill={C.red} /><rect x={-150} y={-55} width={300} height={34} fill={C.redD} />
    <rect x={-120} y={0} width={56} height={40} rx={8} fill={C.gold} />
    {text && <text x={40} y={64} textAnchor="middle" fill="#FFFFFF" style={TXT(58)}>{text}</text>}
  </g>
)
const Board: React.FC<{ x: number; y: number; s?: number; o?: number; drop: number; title?: string }> = ({ x, y, s = 1, o = 1, drop, title = 'STOCKS' }) => {
  const d = drop
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <rect x={-14} y={150} width={28} height={190} fill={C.woodD} />
      <rect x={-250} y={-180} width={500} height={340} rx={26} fill={C.ink} /><rect x={-230} y={-160} width={460} height={300} rx={18} fill="#24365A" />
      <text y={-110} textAnchor="middle" fill="#FFFFFF" style={TXT(50)}>{title}</text>
      <path d={`M-200 20 L-120 -30 L-50 0 L0 -60 L${lerp(70, 60, d)} ${lerp(-20, 40, d)} L${lerp(140, 120, d)} ${lerp(-70, 90, d)} L${lerp(200, 200, d)} ${lerp(-50, 120, d)}`} fill="none" stroke={d > 0.3 ? C.red : C.green} strokeWidth={10} strokeLinejoin="round" />
    </g>
  )
}

const Cushion: React.FC<PieceProps> = ({ f, c }) => {
  const maya10 = c('s10:maya'), saver10 = c('s10:saver')
  const earns = c('s11:earns'), k50 = c('s11:50000'), spends = c('s11:spends'), k3 = c('s11:3000'), k12 = c('s11:12000'), owes = c('s11:owes'), k2 = c('s11:2000')
  const cushion12 = c('s12:cushion'), invests12 = c('s12:invests'), dollar12 = c('s12:dollar')
  const why13 = c('s13:why'), fall13 = c('s13:fall'), car13 = c('s13:car'), breaks13 = c('s13:breaks'), crash13 = c('s13:crash'), sell13 = c('s13:sell'), worst13 = c('s13:worst')
  const surprises14 = c('s14:surprises'), survey14 = c('s14:survey'), p63 = c('s14:63'), d400 = c('s14:400'), cash14 = c('s14:cash')
  const one15 = c('s15:one'), three15 = c('s15:three'), not15 = c('s15:not')
  const guideline16 = c('s16:guideline'), six16 = c('s16:six'), months16 = c('s16:months'), maya16 = c('s16:maya'), times16 = c('s16:times'), k9a = c('s16:9000')
  const stocks17 = c('s17:stocks'), sits17 = c('s17:sits'), reach17 = c('s17:reach'), day17 = c('s17:day')
  const trick18 = c('s18:trick'), average18 = c('s18:average'), eight18 = c('s18:8'), online18 = c('s18:online'), four18 = c('s18:4')
  const k9b = c('s19:9000'), d34 = c('s19:34'), d360 = c('s19:360'), fdic = c('s19:fdic')
  const account20 = c('s20:account'), moves20 = c('s20:moves'), done20 = c('s20:done'), k3b = c('s20:3000'), left20 = c('s20:left')
  const invest21 = c('s21:invest'), not21 = c('s21:not'), yet21 = c('s21:yet'), cheaper21 = c('s21:cheaper'), win21 = c('s21:win')

  const savings11 = c('s11:savings'), card11 = c('s11:card'), one12 = c('s12:one'), year13 = c('s13:year'), money13 = c('s13:money'), stocks13b = c('s13:stocks#2'), common14 = c('s14:common'), adults14 = c('s14:adults'), means15 = c('s15:means'), same19 = c('s19:same')
  const AB = why13 - 6, BC = guideline16 - 8
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = on(f, BC - 8, 10)

  // # A) Maya's money, one thing at a time; cleared on "cushion"
  const aBeats: Beat[] = ([...[[0, 'idle', 'neutral'], [maya10, 'waveA', 'smiling', 'waveB', 14], [earns, 'present', 'smiling'], [spends, 'countA', 'neutral', 'countB', 14], [owes, 'nervous', 'worried'], [cushion12, 'explain', 'smiling'], [invests12, 'pointUp', 'thinking'], [dollar12, 'stop', 'neutral']], [savings11, 'point', 'smiling'], [card11, 'pointDown', 'worried'], [one12, 'countOne', 'smiling']] as Beat[]).sort((p, q) => p[0] - q[0])
  const clearA = on(f, cushion12, 12)
  // # B) storm road
  const bBeats: Beat[] = ([...[[AB, 'idle', 'neutral'], [fall13, 'shock', 'shocked'], [breaks13, 'facepalm', 'worried'], [sell13, 'offer', 'worried'], [worst13, 'despair', 'worried'], [surprises14, 'idle', 'neutral']], [year13, 'nervous', 'worried'], [money13, 'emptyPockets', 'worried'], [stocks13b, 'point', 'worried'], [common14, 'nodA', 'neutral', 'nodB', 14]] as Beat[]).sort((p, q) => p[0] - q[0])
  const drop = span(f, fall13, crash13 + 10)
  const crowdOn = on(f, survey14, 12)
  // # C) the cushion fills, the two tanks, the move
  const cBeats: Beat[] = ([...[[BC, 'explain', 'smiling'], [months16, 'countA', 'neutral', 'countB', 14], [stocks17, 'crossNoA', 'neutral', 'crossNoB', 12], [sits17, 'present', 'smiling'], [trick18, 'pointUp', 'smiling'], [d360, 'celebrate', 'smiling'], [moves20, 'push', 'smiling'], [done20, 'thumbsUp', 'smiling'], [invest21, 'think', 'thinking'], [not21, 'stop', 'neutral'], [cheaper21, 'point', 'smiling']], [eight18, 'point', 'neutral'], [same19, 'weighA', 'smiling', 'weighB', 18]] as Beat[]).sort((p, q) => p[0] - q[0])
  const envelopes = [months16, maya16, times16]
  const cushionFill = 0.12 + 0.6 * span(f, months16, k9a + 10)
  const twoTanks = on(f, trick18, 12) * (1 - on(f, moves20 - 4, 1))
  const move = span(f, moves20, done20)

  return (
    <g>
      <Sky id="sv-c-base" f={f} mood="noon" />
      {/* # A) Maya by her cottage */}
      {A > 0 && <g opacity={A}>
        <Sky id="sv-c-a" f={f} mood="noon" /><Ground y={GROUND - 20} seed={7} />
        <Cottage x={330} y={GROUND - 10} s={0.95} />
        <Person f={f} who="investorF" beats={aBeats} x={720} y={GROUND} s={0.9} />
        <g opacity={on(f, saver10, 10) * (1 - clearA)}><rect x={590} y={GROUND + 20} width={260} height={62} rx={14} fill={C.paper} /><text x={720} y={GROUND + 66} textAnchor="middle" fill={C.ink} style={TXT(44)}>MAYA (MADE-UP)</text></g>
        <g opacity={1 - clearA}>
          <Paycheck x={1180} y={lerp(420, 380, pop(f, earns, 12))} s={0.8} o={on(f, earns, 10)} amt={f >= k50 ? '$50,000' : ''} sub="EARNS A YEAR" />
          <Bills x={1580} y={430 - 12 * (1 - pop(f, spends, 12))} s={0.78} o={on(f, spends, 10)} text={f >= k3 ? '$3,000' : ''} sub="SPENDS A MONTH" />
          <g opacity={on(f, k12 - 8, 10)}><Tank x={1180} y={GROUND - 20} w={230} h={260} f={f} fill={0.62} label="$12,000" sub="SAVINGS" /></g>
          <g opacity={on(f, owes, 10)}><CreditCard x={1580} y={GROUND - 150} s={0.85} r={-6 + 6 * pop(f, owes, 12)} text={f >= k2 ? '-$2,000' : ''} /></g>
        </g>
        {/* step one: the cushion slides under the tank; a sapling waits, LATER */}
        <g opacity={clearA}>
          <Pillow x={lerp(1900, 1300, on(f, cushion12, 18))} y={GROUND - 10} w={380} />
          <Tank x={1300} y={GROUND - 96} w={230} h={260} f={f} fill={0.62} label="$12,000" />
          <g opacity={on(f, invests12, 10)}><Tree x={1690} y={GROUND - 20} s={0.8} grow={0.5} />
            <g transform={`translate(1690 ${GROUND + 30})`}><rect x={-90} y={-30} width={180} height={60} rx={14} fill={C.ink} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={TXT(44)}>LATER</text></g></g>
          <g opacity={on(f, cushion12 + 6, 8)} transform={`translate(1300 ${GROUND + 40})`}><rect x={-60} y={-30} width={120} height={60} rx={30} fill={C.gold} /><text y={18} textAnchor="middle" fill={C.ink} style={TXT(48)}>1</text></g>
        </g>
      </g>}

      {/* # B) storm road: stocks fall, the car breaks, she sells at the bottom; the survey crowd */}
      {B > 0 && <g opacity={B}>
        <Sky id="sv-c-b" f={f} mood="storm" /><Ground y={GROUND - 20} color="#5F7468" flowers={false} seed={9} />
        <rect x={-100} y={GROUND - 4} width={2200} height={70} fill="#6D6F78" /><rect x={-100} y={GROUND + 26} width={2200} height={8} fill="#E7E1D3" opacity={0.7} strokeDasharray="40 30" />
        <g opacity={1 - crowdOn}>
          <Storm x={1320} y={260} s={1.1} f={f} rain={on(f, fall13, 20)} bolt={win(f, crash13, crash13 + 18, 4)} />
          <Board x={1380} y={520} s={0.85} drop={drop} o={on(f, why13 - 4, 10)} />
          <Car x={450} y={GROUND + 10} s={0.95} f={f} smoke={on(f, breaks13, 14)} o={on(f, car13, 10)} />
          <Person f={f} who="investorF" beats={bBeats} x={820} y={GROUND} s={0.88} />
          {/* coins poured into the falling board */}
          {f >= sell13 && [0, 1, 2, 3].map((k) => { const t = span(f, sell13 + k * 6, sell13 + k * 6 + 22); return t < 1 ? <Coin key={k} x={lerp(920, 1300, t)} y={lerp(640, 700, t) - 140 * Math.sin(t * Math.PI)} s={0.55} o={1 - t * 0.4} /> : null })}
          <g opacity={on(f, worst13, 8)}><circle cx={1550} cy={647} r={26 + 6 * Math.sin(f / 5)} fill={C.red} opacity={0.35} /></g>
        </g>
        {/* the survey: 100 people, 63 could cover $400 with cash */}
        <g opacity={crowdOn}>
          <rect x={-100} y={-100} width={2200} height={1300} fill="#EDE6DA" opacity={0.92} />
          <g transform={`translate(260 ${300 - 18 * Math.sin(Math.PI * span(f, adults14, adults14 + 14))})`}>{Array.from({ length: 100 }, (_, k) => { const col = k % 20, row = Math.floor(k / 20), lit = k < 63
            return <Dot key={k} x={col * 64} y={row * 110} s={1.3} lit={lit ? on(f, p63 + (k / 63) * 14, 4) : 0} o={on(f, survey14 + k * 0.3, 8)} /> })}</g>
          {/* the 37 who could not pulse */}
          <g opacity={on(f, means15, 10) * (0.5 + 0.5 * Math.sin(f / 5))}><rect x={1080} y={540} width={490} height={250} rx={24} fill="none" stroke={C.red} strokeWidth={8} /></g>
          <g opacity={on(f, d400, 10)} transform={`translate(1700 ${520 - 10 * pop(f, d400, 12)})`}><Bills x={0} y={0} s={0.7} text="$400" sub="SURPRISE" /></g>
          <g opacity={on(f, cash14, 10)}><rect x={300} y={830} width={560} height={66} rx={16} fill={C.greenD} /><text x={580} y={878} textAnchor="middle" fill="#FFFFFF" style={TXT(50)}>63 COULD PAY WITH CASH</text></g>
          <g opacity={on(f, not15, 10)}><rect x={1000} y={830} width={640} height={66} rx={16} fill={C.red} /><text x={1320} y={878} textAnchor="middle" fill="#FFFFFF" style={TXT(50)}>≈ 1 IN 3 COULD NOT</text></g>
        </g>
      </g>}

      {/* # C) the garden: the cushion fills, two tanks, the move */}
      {Cc > 0 && <g opacity={Cc}>
        <Sky id="sv-c-c" f={f} mood="noon" /><Ground y={GROUND - 20} seed={11} />
        <Person f={f} who="investorF" beats={cBeats} x={330} y={GROUND} s={0.88} />
        {/* the cushion tank fills with three month envelopes */}
        <g opacity={1 - on(f, trick18, 12)}>
          <Pillow x={960} y={GROUND - 10} w={380} />
          <Tank x={960} y={GROUND - 96} w={250} h={300} f={f} fill={cushionFill} label={f >= k9a ? '$9,000' : 'CUSHION'} />
          {envelopes.map((a, k) => { const t = span(f, a, a + 18); return t > 0 && t < 1 ? <g key={k} transform={`translate(${lerp(1500, 960, t)} ${lerp(420, 560, t) - 120 * Math.sin(t * Math.PI)})`}><Bills x={0} y={0} s={0.45} text="$3,000" /></g> : null })}
          <g opacity={win(f, six16 - 4, stocks17, 10)} transform="translate(1500 470)">{[0, 1, 2].map((k) => <g key={k} opacity={f >= [months16, maya16, times16][k] ? 0.3 : 1}><Bills x={k * 30} y={-k * 30} s={0.5} text="$3,000" /></g>)}
            <text x={30} y={140} textAnchor="middle" fill={C.ink} style={TXT(48)}>{f >= times16 ? '3 × $3,000' : '3–6 MONTHS'}</text></g>
          {/* not in stocks; within a day or two */}
          <g opacity={win(f, stocks17, sits17 + 6, 8)}><Board x={1500} y={480} s={0.6} drop={0} /><NoMark x={1500} y={470} r={150} o={on(f, stocks17 + 4, 8)} /></g>
          <g opacity={win(f, reach17, trick18, 8)} transform="translate(1500 560)">
            <rect x={-90} y={-170} width={180} height={320} rx={30} fill={C.ink} /><rect x={-74} y={-146} width={148} height={260} rx={18} fill="#FFFFFF" />
            <path d="M-40 -20 L30 -20 M10 -40 L30 -20 L10 0" fill="none" stroke={C.waterD} strokeWidth={10} strokeLinecap="round" />
            <text y={70} textAnchor="middle" fill={C.ink} style={TXT(f >= day17 ? 40 : 36)}>1–2 DAYS</text></g>
        </g>
        {/* two tanks: the average account vs an online high-yield account */}
        <g opacity={twoTanks}>
          <Tank x={900} y={GROUND - 30} w={250} h={300} f={f} fill={0.62} label={f >= eight18 ? '0.38%' : 'AVERAGE'} o={on(f, average18, 10)} />
          <Tank x={1440} y={GROUND - 30} w={250} h={300} f={f} fill={0.62} label={f >= four18 ? '≈ 4%' : 'ONLINE'} o={on(f, online18, 10)} color="#59C9B8" />
          {/* yearly interest: a drop vs a stream */}
          {f >= k9b && <g><Drop x={900} y={360 + ((f * 2) % 120)} s={0.6} o={0.9} />
            {f >= d360 && [0, 1, 2, 3].map((k) => <Drop key={k} x={1420 + k * 14} y={330 + ((f * 6 + k * 30) % 140)} s={0.9} />)}</g>}
          <g opacity={on(f, d34, 8)}><rect x={790} y={GROUND + 10} width={220} height={66} rx={14} fill={C.paper} /><text x={900} y={GROUND + 58} textAnchor="middle" fill={C.ink} style={TXT(50)}>$34 A YEAR</text></g>
          <g opacity={on(f, d360, 8)}><rect x={1320} y={GROUND + 10} width={240} height={66} rx={14} fill={C.greenD} /><text x={1440} y={GROUND + 58} textAnchor="middle" fill="#FFFFFF" style={TXT(50)}>$360 A YEAR</text></g>
          <g opacity={on(f, same19, 8)} transform={`translate(1170 ${760 - 10 * pop(f, same19, 12)})`}><text textAnchor="middle" fill={C.ink} style={TXT(110)}>=</text></g>
          <g opacity={on(f, k9b, 8)}><text x={1170} y={440} textAnchor="middle" fill={C.ink} style={TXT(56)}>ON $9,000</text></g>
          <g opacity={on(f, fdic, 10)} transform={`translate(1660 ${520 - 10 * pop(f, fdic, 12)})`}>
            <path d="M0 -70 L60 -46 L60 10 Q60 60 0 84 Q-60 60 -60 10 L-60 -46 Z" fill={C.waterD} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={INTER(30, 800)}>FDIC</text></g>
        </g>
        {/* the move: 9,000 pours into the high-yield tank, 3,000 stays */}
        <g opacity={on(f, moves20 - 4, 10)}>
          <Tank x={900} y={GROUND - 30} w={230} h={280} f={f} fill={lerp(0.75, 0.2, move)} label={f >= k3b ? '$3,000' : '$12,000'} />
          <Pillow x={1440} y={GROUND - 10} w={360} />
          <Tank x={1440} y={GROUND - 96} w={250} h={300} f={f} fill={lerp(0.05, 0.62, move)} label={move > 0.5 ? '$9,000' : '≈ 4%'} color="#59C9B8" />
          <g opacity={win(f, account20, done20 + 10, 6) * (0.5 + 0.5 * Math.sin(f / 5))}><rect x={1300} y={GROUND - 410} width={280} height={330} rx={36} fill="none" stroke={C.goldL} strokeWidth={10} /></g>
          {move > 0 && move < 1 && <path d={`M 1000 ${GROUND - 300} Q 1170 ${GROUND - 470} 1330 ${GROUND - 380}`} fill="none" stroke={C.water} strokeWidth={22} strokeLinecap="round" opacity={0.85} />}
          <g opacity={on(f, left20, 8) * (1 - on(f, invest21, 8))}><text x={900} y={GROUND + 60} textAnchor="middle" fill={C.ink} style={TXT(48)}>LEFT OVER</text></g>
          <g opacity={win(f, invest21, cheaper21, 8)}><Tree x={680} y={GROUND - 20} s={0.7} grow={0.5} /><NoMark x={680} y={GROUND - 120} r={100} o={on(f, not21, 8)} /></g>
          <g opacity={on(f, cheaper21, 10)}><Bucket x={lerp(2100, 1760, on(f, cheaper21, 20))} y={GROUND - 10} s={0.62} f={f} fill={0.5} leak={1} tag="22%" /></g>
          <g opacity={on(f, done20, 8) * (1 - on(f, invest21, 8))} transform={`translate(1440 ${GROUND + 40})`}><rect x={-60} y={-30} width={120} height={60} rx={30} fill={C.gold} /><text y={18} textAnchor="middle" fill={C.ink} style={TXT(48)}>1 ✓</text></g>
        </g>
      </g>}

      <Headline f={f} lines={[[maya10, 'MAYA', C.ink, 100], [cushion12, 'STEP 1: A CUSHION FIRST', C.ink, 96], [crash13, 'A CRASH + A SURPRISE BILL', C.red, 92], [survey14, 'CAN YOU PAY $400 IN CASH?', C.ink, 92], [guideline16, '3–6 MONTHS OF EXPENSES', C.ink, 96], [trick18, 'SAME SAFETY, MORE INTEREST', C.ink, 92], [moves20, '$9,000 CUSHION DONE', C.greenD, 96], [cheaper21, 'A CHEAPER WIN FIRST', C.ink, 96]]} />
    </g>
  )
}

export const SV_CUSHION = makePiece('sv-cushion', 'Step one, a cushion: Maya by her garden cottage with a $50,000 paycheck, $3,000-a-month bills, a $12,000 savings tank and a -$2,000 red card; a cushion slides under the tank, a sapling waits tagged LATER; a storm road where the stock board plunges, her car breaks down and smokes, lightning, she pours coins into the falling board; a survey crowd of 100 where 63 light up and the other 37 pulse (1 in 3 could not pay $400); three $3,000 envelopes fill the cushion tank to $9,000; stock board crossed, a 1-2 days phone; two tanks 0.38% ($34 a year drop) vs 4% ($360 stream) with an FDIC shield; 9,000 poured into the 4% tank, 3,000 left; sapling crossed (not yet); a leaking 22% bucket rolls in', {
  mood: 'light', Component: Cushion,
  beats: ["s10:maya", "s10:saver", "s11:earns", "s11:50000", "s11:spends", "s11:3000", "s11:12000", "s11:owes", "s11:2000", "s12:cushion", "s12:invests", "s12:dollar", "s13:why", "s13:fall", "s13:car", "s13:breaks", "s13:crash", "s13:sell", "s13:worst", "s14:surprises", "s14:survey", "s14:63", "s14:400", "s14:cash", "s15:not", "s16:guideline", "s16:six", "s16:months", "s16:maya", "s16:times", "s16:9000", "s17:stocks", "s17:sits", "s17:reach", "s17:day", "s18:trick", "s18:average", "s18:8", "s18:online", "s18:4", "s19:9000", "s19:34", "s19:360", "s19:fdic", "s20:account", "s20:moves", "s20:done", "s20:3000", "s20:left", "s21:invest", "s21:not", "s21:cheaper", "s11:savings", "s11:card", "s12:one", "s13:year", "s13:money", "s13:stocks#2", "s14:common", "s14:adults", "s15:means", "s19:same"],
  sfx: [['s11:owes', 'thud', 0.12], ['s12:cushion', 'softpop', 0.15], ['s13:crash', 'crack', 0.18], ['s14:63', 'pop', 0.12], ['s16:9000', 'chime', 0.12], ['s19:360', 'coin', 0.15], ['s20:moves', 'whoosh', 0.12], ['s21:not', 'thud', 0.14]] })
