// ---------------------------------------------------------------- s14–s21: way 2, take the free match (dawn, the workplace).
// A poster office building on the trail. A glass RETIREMENT jar stands between Leo and his boss. Leo's paycheck is a long
// ribbon: the first 6% of it is cut off and drops into the jar as 3,240; the boss adds a stack half as tall, 1,620;
// the jar glows +50% INSTANTLY. Handshake (hire and keep), three year-dots light up (keep it all after a few years).
// Then the paycheck ribbon stretches and strains: 54,000 only goes so far.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PosterWorld, Vig, Ticket, WayBadge, Building, Coin, Tower, Life, TXT, CREAM, ORANGE, RED, GOLD, MINT, INK, DEEP, TEAL, SAND, SKYB } from './kit'

const GY = 940

const Jar: React.FC<{ x: number; y: number; a: number; b: number; glow: number }> = ({ x, y, a, b, glow }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={14} cy={6} rx={170} ry={20} fill="rgba(30,20,30,0.22)" />
    {glow > 0 && <circle cx={0} cy={-200} r={260} fill={GOLD} opacity={0.22 * glow} />}
    <rect x={-150} y={-420} width={300} height={420} rx={40} fill={SKYB} opacity={0.35} />
    {/* Leo's coins (teal) and the employer's coins (gold) inside */}
    <Tower x={-60} y={-14} n={a} col="#5FB7A6" edge="#2F7F72" s={1.1} />
    <Tower x={64} y={-14} n={b} s={1.1} />
    <rect x={-150} y={-420} width={300} height={420} rx={40} fill="none" stroke="#FFFFFF" strokeWidth={10} opacity={0.9} />
    <rect x={-120} y={-400} width={30} height={330} rx={15} fill="#FFFFFF" opacity={0.35} />
    <rect x={-170} y={-460} width={340} height={50} rx={14} fill={DEEP} />
    <text y={-424} textAnchor="middle" fill={CREAM} style={TXT(38)}>RETIREMENT</text>
  </g>
)

const Match: React.FC<PieceProps> = ({ f, c }) => {
  const free = c('s14:free'), work = c('s14:work')
  const employers = c('s15:employers'), yours = c('s15:yours'), match = c('s15:match')
  const vanguard = c("s16:vanguard's"), d50 = c('s16:50'), dollar = c('s16:dollar'), first = c('s16:first'), d6 = c('s16:6'), pay = c('s16:pay')
  const puts = c('s17:puts'), d54 = c('s17:54000'), d3240 = c('s17:3240')
  const adds = c('s18:adds'), half = c('s18:half'), d1620 = c('s18:1620')
  const instant = c('s19:instant'), invested = c('s19:invested')
  const why = c('s20:why'), hire = c('s20:hire'), keepw = c('s20:keep'), staying = c('s20:staying'), years = c('s20:years')
  const keeps = c('s21:keeps'), d54b = c('s21:54000'), stretch = c('s21:stretch'), earn = c('s21:earn')

  const leo: Beat[] = [[free, 'idle', 'smiling'], [yours, 'offer', 'smiling'], [puts, 'offer', 'smiling'], [instant, 'celebrate', 'smiling'], [hire, 'handshake', 'smiling'], [staying, 'idle', 'thinking'], [stretch, 'pull', 'worried'], [earn, 'pointUp', 'thinking']]
  const boss: Beat[] = [[employers, 'idle', 'smiling'], [match, 'offer', 'smiling'], [adds, 'offer', 'smiling'], [hire, 'handshake', 'smiling'], [staying, 'explain', 'neutral'], [stretch, 'idle', 'neutral']]
  const slice = on(f, d3240, 18)                      // the 6% slice falls into the jar
  const ribbon = win(f, first - 4, d3240 + 22, 8)     // the paycheck ribbon (6% part marked)
  const stretchT = on(f, stretch, 30)
  const A = 1 - on(f, keeps - 10, 8)

  return (
    <g>
      <PosterWorld f={f} id="rh-match" tone="dawn" sunX={360} sunY={420} />
      <g opacity={on(f, c('s14:number') - 4, 10)}><WayBadge x={200} y={320} n={2} s={pop(f, c('s14:number'), 12)} col={MINT} /></g>
      <g opacity={on(f, work, 10)}><Building x={1620} y={GY} w={360} h={500} col={SAND} sign="WORK" /></g>
      <g opacity={A}>
        <Person f={f} who="worker" beats={leo} x={560} y={GY + 40} s={0.78} />
        <Person f={f} who="owner" beats={boss} x={1360} y={GY + 40} s={0.78} flip />
        <g opacity={on(f, employers, 10)}><Jar x={960} y={GY} a={on(f, puts, 4) * Math.round(lerp(0, 16, slice))} b={Math.round(lerp(0, 8, on(f, d1620, 16)))} glow={win(f, instant, why, 10)} /></g>
        <g opacity={win(f, match, d50, 8)}><Ticket x={960} y={330} t="THAT'S A MATCH" size={56} col={MINT} tc={CREAM} /></g>
        <g opacity={win(f, vanguard, puts, 8)}><Ticket x={960} y={330} t={f >= d6 ? '50¢ PER $1 ON THE FIRST 6% OF PAY' : f >= d50 ? '50¢ FOR EVERY $1' : 'MOST COMMON MATCH (VANGUARD)'} size={48} col={CREAM} /></g>
        {/* Leo's paycheck ribbon above the jar; the first 6% is cut off and falls in */}
        {ribbon > 0.001 && <g opacity={ribbon} transform="translate(960 390)">
          <rect x={-560} y={-36} width={1120} height={72} rx={10} fill={CREAM} stroke={INK} strokeWidth={4} />
          <text x={60} y={16} textAnchor="middle" fill={INK} style={TXT(44)}>{f >= d54 ? 'LEO’S PAY · $54,000' : 'LEO’S PAY'}</text>
          <g opacity={on(f, d6, 8)} transform={`translate(${-560 + 34 + lerp(0, 526, slice)} ${lerp(0, 390, slice * slice)}) scale(${1 - 0.6 * slice})`}>
            <rect x={-34} y={-36} width={67} height={72} fill={GOLD} stroke={INK} strokeWidth={4} /><text y={14} textAnchor="middle" fill={INK} style={TXT(34)}>6%</text>
          </g>
        </g>}
        <g opacity={win(f, d3240 + 20, adds, 8)}><Ticket x={560} y={400} t="LEO: $3,240 A YEAR" size={50} col="#5FB7A6" tc={CREAM} /></g>
        <g opacity={win(f, half, instant, 8)}><Ticket x={1360} y={400} t="+ $1,620 FROM WORK" size={50} col={GOLD} /></g>
        <g opacity={win(f, instant, why, 8)} transform={`translate(960 310) scale(${pop(f, instant, 12)})`}><Ticket x={0} y={0} t="+50% INSTANTLY" size={66} col={ORANGE} tc={CREAM} /></g>
        <g opacity={win(f, invested, why, 8)}><Ticket x={960} y={420} t="BEFORE IT’S INVESTED" size={36} col={CREAM} /></g>
        {/* hire and keep good workers; the match vests after a few years */}
        <g opacity={win(f, keepw, keeps, 8)}><Ticket x={960} y={330} t="HELPS HIRE AND KEEP WORKERS" size={48} col={CREAM} /></g>
        <g opacity={win(f, staying, keeps, 8)} transform="translate(960 460)">
          {[0, 1, 2].map((k) => <g key={k} transform={`translate(${(k - 1) * 150} 0)`} opacity={0.4 + 0.6 * on(f, years - 10 + k * 8, 8)}><circle r={46} fill={on(f, years - 10 + k * 8, 8) > 0.5 ? MINT : CREAM} stroke={INK} strokeWidth={5} /><text y={14} textAnchor="middle" fill={INK} style={TXT(40)}>{`Y${k + 1}`}</text></g>)}
          <text y={110} textAnchor="middle" fill={INK} style={TXT(40)}>OFTEN YOURS IN FULL AFTER A FEW YEARS</text>
        </g>
      </g>
      {/* # the paycheck can only stretch so far */}
      <g opacity={on(f, keeps - 2, 8)}>
        <Person f={f} who="worker" beats={leo} x={460} y={GY + 40} s={0.78} />
        <g transform={`translate(1060 430)`}>
          <rect x={-380 - 140 * stretchT} y={-60 + 16 * stretchT} width={760 + 280 * stretchT} height={120 - 32 * stretchT} rx={14} fill={CREAM} stroke={INK} strokeWidth={5} />
          <text y={20} textAnchor="middle" fill={INK} style={TXT(70 - 14 * stretchT)}>{f >= d54b ? '$54,000 A YEAR' : 'LEO KEEPS MORE'}</text>
          {stretchT > 0.6 && [-350, -300, 300, 350].map((x, k) => <path key={k} d={`M${x} ${-44 + 16 * stretchT} l10 20 l-14 12 l12 18`} stroke={RED} strokeWidth={5} fill="none" opacity={(stretchT - 0.6) * 2.5} />)}
        </g>
        <g opacity={on(f, earn, 8)} transform={`translate(1000 820) scale(${pop(f, earn, 12)})`}><path d="M-40 60 L-40 -10 L-90 -10 L0 -100 L90 -10 L40 -10 L40 60 Z" fill={ORANGE} /><text x={190} y={-10} textAnchor="middle" fill={INK} style={TXT(60)}>EARN MORE</text></g>
      </g>
      {/* # life:begin */}
      <g>
        <Life f={f} at={dollar} x={1060} y={600} kind="glint" />
        <Life f={f} at={pay} x={960} y={420} kind="glint" />
        <Life f={f} at={c("s15:retirement")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s19:money")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s20:because")} x={960} y={420} kind="glint" />
        <Life f={f} at={c("s20:you")} x={960} y={420} kind="glint" />
        <Life f={f} at={c("s20:and#2")} x={960} y={420} kind="glint" />
        <Life f={f} at={c("s20:of")} x={960} y={420} kind="glint" />
        <Life f={f} at={c("s21:next")} x={1000} y={560} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rh-match" />
      <Headline f={f} lines={[[free, 'TAKE THE FREE MONEY AT WORK', INK, 88], [keeps, 'NEXT: EARN MORE', INK, 88]]} />
    </g>
  )
}

export const RH_MATCH = makePiece('rh-match', 'Way 2 at dawn by a WORK office building: a glass RETIREMENT jar stands between Leo and his boss — THAT\'S A MATCH; MOST COMMON MATCH (VANGUARD), 50¢ FOR EVERY $1, ON THE FIRST 6% OF PAY; Leo\'s long paycheck ribbon (LEO\'S PAY · $54,000) has its first 6% cut off and dropped into the jar as a teal coin tower (LEO: $3,240 A YEAR); the boss adds a gold tower half as tall (+ $1,620 FROM WORK); the jar glows (+50% INSTANTLY, BEFORE IT\'S INVESTED); the two shake hands (HELPS HIRE AND KEEP WORKERS) and three year-dots light up (OFTEN YOURS IN FULL AFTER A FEW YEARS); then the paycheck ribbon ($54,000 A YEAR) stretches and cracks as Leo pulls it, and an orange arrow says EARN MORE.', {
  mood: 'light', Component: Match,
  beats: ["s14:free", "s14:work", "s15:employers", "s15:yours", "s15:match", "s16:vanguard's", "s16:50", "s16:dollar", "s16:first", "s16:6", "s16:pay", "s17:puts", "s17:54000", "s17:3240", "s18:adds", "s18:half", "s18:1620", "s19:instant", "s19:invested", "s20:why", "s20:hire", "s20:keep", "s20:staying", "s20:years", "s21:keeps", "s21:54000", "s21:stretch", "s21:earn", "s14:number", "s15:retirement", "s19:money", "s20:because", "s20:you", "s20:and#2", "s20:of", "s21:next"],
  sfx: [['s17:3240', 'coin', 0.1], ['s18:1620', 'coin', 0.1], ['s19:instant', 'chime', 0.08]] })
