// ---------------------------------------------------------------- s9–s23: step one, the week day by day (night → dawn).
// A) TUESDAY, election night: a lamp-lit street, a capitol dome against a navy sky, a ballot drops into a box; the two
//    halves of the dome (HOUSE · SENATE) light up blue.
// B) THURSDAY: a storm rolls over chip city. Three glowing chip towers (NVDA, AMD, MU) sink, each dropping a red tag
//    (-9%, ~$182 a share · -17% · -17%); a DOW -1,800 POINTS ticker; a Nasdaq "height from its peak" gauge slides past the
//    -10% line.
// C) FRIDAY a small bounce; MONDAY the sun rises: S&P 500 +2.4% green arrow ("best day since April"), chip towers pop
//    back up, an oil barrel's price tag slides down.
// D) Nvidia's tower stays dark: a boardroom with a long table and a folder INDEPENDENT INVESTIGATION under a magnifier;
//    a shield NO SIGN SECRETS LEAKED; two investors still nervous; a big neon WHY?
import React from 'react'
import { lerp, on, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { AMBER, Ballot, DayCard, Floor, INK, NEON, RED, Skyline, Sky, StormCloud, Sunrise } from './kit'

const K = {
  happened9: 's9:happened', day9: 's9:day', day9b: 's9:day#2',
  tuesday: 's10:tuesday', third: 's10:3rd', americans: 's10:americans', voted: 's10:voted', midterm: 's10:midterm', elections: 's10:elections',
  democrats: 's11:democrats', control: 's11:control', both: 's11:both', house: 's11:house', senate: 's11:senate',
  thursday: 's12:thursday', investors12: 's12:investors', selling: 's12:selling', stocks12: 's12:stocks', hardest: 's12:hardest', tied: 's12:tied', intelligence12: 's12:intelligence',
  nvidia13: 's13:nvidia', fell13: 's13:fell', nine: 's13:9', closing: 's13:closing', k182: 's13:182', share13: 's13:share',
  other14: 's14:other', more14: 's14:more', amd: 's14:amd', dropped: 's14:dropped', k17: 's14:17', micron: 's14:micron',
  dow: 's15:dow', fell15: 's15:fell', k1800: 's15:1800', points: 's15:points',
  nasdaq16: 's16:nasdaq', packed: 's16:packed', tech16: 's16:tech', finished: 's16:finished', ten16: 's16:10', down16: 's16:down', peak16: 's16:peak', weeks: 's16:weeks',
  friday: 's17:friday', sp17: 's17:sp', nasdaq17: 's17:nasdaq', won17: 's17:won', small17: 's17:small', losses: 's17:losses',
  then18: 's18:then', monday18: 's18:monday', mood: 's18:mood', flipped: 's18:flipped', sp18: 's18:sp', rose: 's18:rose', two18: 's18:2', best: 's18:best', april: 's18:april',
  chip19: 's19:chip', bounced: 's19:bounced', falling: 's19:falling', oil: 's19:oil', helped: 's19:helped',
  nvidia20: 's20:nvidia', join: 's20:join', party: 's20:party', fell20: 's20:fell', another: 's20:another', four20: 's20:4', monday20: 's20:monday',
  because21: 's21:because', board21: 's21:board', opened: 's21:opened', independent: 's21:independent', investigation: 's21:investigation', reports: 's21:reports', boss: 's21:boss', target: 's21:target', foreign: 's21:foreign', effort: 's21:effort',
  board22: 's22:board', said22: 's22:said', sign22: 's22:sign', secrets: 's22:secrets', leaked: 's22:leaked', uncertainty: 's22:uncertainty', person22: 's22:person', running: 's22:running', nervous: 's22:nervous',
  so23: 's23:so', happened23: 's23:happened', real: 's23:real', question: 's23:question', why23: 's23:why',
}
type Key = keyof typeof K

// # capitol dome; lit 0..1 for each half (left = House, right = Senate)
const Capitol: React.FC<{ x: number; y: number; s?: number; house?: number; senate?: number }> = ({ x, y, s = 1, house = 0, senate = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-420} y={-40} width={840} height={40} fill="#CFD3EA" />
    <rect x={-400} y={-220} width={360} height={180} fill={house > 0.5 ? '#3B6DE0' : '#9AA0C8'} /><rect x={40} y={-220} width={360} height={180} fill={senate > 0.5 ? '#3B6DE0' : '#9AA0C8'} />
    {Array.from({ length: 8 }, (_, k) => <rect key={k} x={-380 + k * 45 + (k > 3 ? 80 : 0)} y={-210} width={18} height={168} fill="#E8EAF8" opacity={0.7} />)}
    <rect x={-80} y={-300} width={160} height={260} fill="#DADDF0" /><path d="M-130 -300 Q0 -470 130 -300 Z" fill="#E8EAF8" /><rect x={-12} y={-500} width={24} height={60} fill="#E8EAF8" />
    <g opacity={house}><Label x={-220} y={-250} text="HOUSE" size={48} font="Bebas Neue" color="#9FC0FF" /></g>
    <g opacity={senate}><Label x={220} y={-250} text="SENATE" size={48} font="Bebas Neue" color="#9FC0FF" /></g>
  </g>
)
// # a glowing chip tower that sinks by `sink` (0..1) and lights red
const ChipTower: React.FC<{ x: number; y: number; name: string; h: number; sink: number; up?: number; dark?: number }> = ({ x, y, name, h, sink, up = 0, dark = 0 }) => {
  const hh = h * (1 - 0.35 * sink + 0.2 * up), lit = sink > 0.5 && up < 0.5 ? RED : NEON
  return (
    <g opacity={1 - 0.55 * dark}>
      <rect x={x - 70} y={y - hh} width={140} height={hh} rx={8} fill="#1C2740" stroke={lit} strokeWidth={5} />
      {Array.from({ length: Math.floor(hh / 40) }, (_, r) => <rect key={r} x={x - 46} y={y - hh + 16 + r * 40} width={92} height={14} rx={4} fill={lit} opacity={0.5 * (1 - dark)} />)}
      <Label x={x} y={y + 50} text={name} size={44} font="Bebas Neue" color="#E8E6FF" />
    </g>
  )
}

const Week: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.thursday - 8, BC = q.friday - 8, CD = q.nvidia20 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cc = win(f, BC, CD), D = on(f, CD, 10)
  const gauge = lerp(0, 10.6, span(f, q.finished, q.weeks + 10))
  const sink = (at: number) => on(f, at, 20)
  const invs: Beat[] = [[CD, 'idle', 'neutral'], [q.uncertainty, 'nervous', 'worried'], [q.nervous, 'scratchHead', 'worried']]
  return (
    <g>
      <Stage id="nv-week" frame={f} />
      {/* # A) Tuesday: election night */}
      {A > 0 && <g opacity={A}>
        <Sky id="nvw-sky" top="#0A1036" bottom="#2A2A6E" glow="#3B6DE0" gx={960} gy={700} f={f} />
        <Skyline y={860} col="#0E0E36" seed={7} h={180} />
        <Capitol x={1150} y={860} s={1.0} house={on(f, q.house, 12)} senate={on(f, q.senate, 12)} />
        <Floor id="nvw-floor" y={860} top="#161444" bottom="#06051A" rim="#6F8CFF" />
        <DayCard x={300} y={360} day="TUESDAY" date="NOV 3" o={on(f, q.tuesday, 8)} lit={win(f, q.tuesday, q.voted, 6)} />
        <Ballot x={360} y={860} s={0.9} o={on(f, q.voted, 8)} drop={span(f, q.voted, q.elections + 10)} />
        <g opacity={on(f, q.midterm, 8)}><Label x={360} y={960} text="MIDTERM ELECTIONS" size={46} font="Bebas Neue" color="#C9D2FF" /></g>
        <g opacity={on(f, q.democrats, 8)} transform={`translate(1150 ${300 - 10 * pop(f, q.control, 12)})`}><rect x={-360} y={-56} width={720} height={100} rx={20} fill="#16205A" stroke="#6F8CFF" strokeWidth={4} />
          <Label x={0} y={16} text="DEMOCRATS WIN BOTH CHAMBERS" size={52} font="Bebas Neue" color="#C9D2FF" /></g>
      </g>}
      {/* # B) Thursday: the storm */}
      {B > 0 && <g opacity={B}>
        <Sky id="nvw-sky2" top="#07061A" bottom="#2A1238" glow={RED} gx={900} gy={800} f={f} />
        <Skyline y={880} col="#12102E" seed={9} h={200} />
        <StormCloud x={760} y={250} s={1.1} f={f} strike={Math.max(win(f, q.selling, q.selling + 16, 3), win(f, q.k17, q.k17 + 16, 3))} rain={on(f, q.selling, 12)} />
        <Floor id="nvw-floor2" y={880} top="#1A1030" bottom="#07061A" rim={RED} />
        <DayCard x={1720} y={300} day="THURSDAY" date="NOV 5" col="#B8243A" o={on(f, q.thursday, 8)} lit={win(f, q.thursday, q.selling, 6)} s={0.85} />
        <ChipTower x={460} y={880} name="NVIDIA" h={420} sink={sink(q.fell13)} />
        <ChipTower x={760} y={880} name="AMD" h={340} sink={sink(q.dropped)} />
        <ChipTower x={1060} y={880} name="MICRON" h={300} sink={sink(q.micron)} />
        <g opacity={on(f, q.nine, 8)} transform={`translate(460 ${560 - 10 * pop(f, q.nine, 12)})`}><rect x={-130} y={-50} width={260} height={90} rx={14} fill="#2A0A16" stroke={RED} strokeWidth={4} /><Label x={0} y={12} text={f >= q.k182 ? '-9% · ~$182' : '-9%'} size={50} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, q.k17, 8)} transform={`translate(760 ${660 - 10 * pop(f, q.k17, 12)})`}><rect x={-100} y={-50} width={200} height={90} rx={14} fill="#2A0A16" stroke={RED} strokeWidth={4} /><Label x={0} y={12} text="-17%" size={56} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, q.micron, 8)} transform={`translate(1060 ${700 - 10 * pop(f, q.micron, 12)})`}><rect x={-100} y={-50} width={200} height={90} rx={14} fill="#2A0A16" stroke={RED} strokeWidth={4} /><Label x={0} y={12} text="-17%" size={56} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, q.dow, 8) * (1 - on(f, q.nasdaq16, 8))} transform={`translate(1500 ${560 - 10 * pop(f, q.k1800, 12)})`}><rect x={-230} y={-70} width={460} height={130} rx={18} fill="#1A0A1E" stroke={RED} strokeWidth={5} />
          <Label x={0} y={-10} text="DOW" size={44} font="Bebas Neue" color="#E8E6FF" /><Label x={0} y={44} text={f >= q.k1800 ? '-1,800+ POINTS' : '…'} size={56} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, q.nasdaq16, 8)} transform="translate(1330 380)">
          <rect x={-40} y={0} width={80} height={460} rx={40} fill="#1C1A44" stroke="#6F6BB0" strokeWidth={4} />
          <rect x={-40} y={0} width={80} height={460 * gauge / 20} rx={40} fill={gauge >= 10 ? RED : AMBER} />
          <line x1={-80} y1={230} x2={80} y2={230} stroke={RED} strokeWidth={6} strokeDasharray="10 8" /><Label x={110} y={244} text="-10% FROM PEAK" size={40} anchor="start" font="Bebas Neue" color={RED} />
          <Label x={0} y={-30} text="NASDAQ" size={46} font="Bebas Neue" color="#E8E6FF" /><Label x={110} y={20} text="PEAK" size={36} anchor="start" font="Bebas Neue" color="#C9C6F0" />
        </g>
      </g>}
      {/* # C) Friday and Monday: sunrise */}
      {Cc > 0 && <g opacity={Cc}>
        <Sky id="nvw-sky3" top={on(f, q.monday18, 20) > 0.5 ? '#2A3A7A' : '#0B0A2A'} bottom={on(f, q.monday18, 20) > 0.5 ? '#FF9E6B' : '#2A1238'} f={f} stars={on(f, q.monday18, 20) > 0.5 ? 6 : 30} />
        <Sunrise x={1500} y={900} t={span(f, q.monday18, q.april + 20)} />
        <Skyline y={900} col="#16143A" seed={3} h={200} />
        <Floor id="nvw-floor3" y={900} top="#1E1A48" bottom="#07061A" rim={NEON} />
        <DayCard x={300} y={330} day="FRIDAY" date="NOV 6" o={on(f, q.friday, 8) * (1 - on(f, q.monday18, 10))} lit={win(f, q.friday, q.losses, 6)} s={0.85} />
        <DayCard x={300} y={330} day="MONDAY" date="NOV 9" col="#12B872" o={on(f, q.monday18, 8)} lit={win(f, q.monday18, q.rose, 6)} s={0.85} />
        <g opacity={on(f, q.won17, 8) * (1 - on(f, q.monday18, 10))}><Label x={960} y={560} text="WON BACK ONLY A LITTLE" size={60} font="Bebas Neue" color={AMBER} /></g>
        <g opacity={on(f, q.sp18, 8)} transform={`translate(960 ${640 - 140 * on(f, q.rose, 24)})`}><path d="M0 -90 L80 10 L30 10 L30 150 L-30 150 L-30 10 L-80 10 Z" fill={NEON} />
          <Label x={0} y={-130} text={f >= q.two18 ? 'S&P 500 +2.4%' : 'S&P 500…'} size={64} font="Bebas Neue" color={NEON} /><Label x={0} y={220} text="BEST DAY SINCE APRIL" size={44} font="Bebas Neue" color="#E8E6FF" o={on(f, q.best, 8)} /></g>
        <g opacity={on(f, q.chip19, 8)}>{['NVIDIA', 'AMD', 'MICRON'].map((n, k) => <ChipTower key={k} x={1320 + k * 170} y={900} name={n} h={[220, 190, 170][k]} sink={1} up={on(f, q.bounced + k * 4, 14)} />)}</g>
        <g opacity={on(f, q.oil, 8)} transform={`translate(560 ${720 + 40 * on(f, q.falling, 20)})`}><rect x={-70} y={-110} width={140} height={200} rx={20} fill="#3A3A3A" /><rect x={-70} y={-70} width={140} height={14} fill="#5A5A5A" /><rect x={-70} y={30} width={140} height={14} fill="#5A5A5A" />
          <Label x={0} y={-130} text="OIL ↓" size={48} font="Bebas Neue" color={AMBER} /></g>
      </g>}
      {/* # D) Nvidia's own worry: the boardroom */}
      {D > 0 && <g opacity={D}>
        <Sky id="nvw-sky4" top="#0E0B26" bottom="#1E1846" f={f} stars={0} />
        <rect x={0} y={0} width={1920} height={1080} fill="#16123A" />
        <rect x={160} y={160} width={1600} height={520} rx={10} fill="#1F1A4C" /><Skyline y={680} col="#100C2C" seed={11} h={200} />
        {[0, 1, 2, 3].map((k) => <rect key={k} x={160 + k * 400} y={160} width={16} height={520} fill="#2A2460" />)}
        <path d="M200 860 L1720 860 L1620 760 L300 760 Z" fill="#3A2A1E" /><rect x={200} y={860} width={1520} height={30} fill="#2A1E14" />
        <g opacity={on(f, q.nvidia20, 8) * (1 - on(f, q.because21, 8))}><ChipTower x={960} y={760} name="NVIDIA" h={300} sink={1} dark={1} />
          <Label x={960} y={380} text={f >= q.four20 ? 'NVIDIA -4% MONDAY' : 'NOT JOINING THE PARTY'} size={60} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, q.board21, 10)} transform={`translate(${lerp(1000, 1060, on(f, q.investigation, 14))} ${760 - 10 * pop(f, q.opened, 12)})`}>
          <rect x={-200} y={-40} width={400} height={60} rx={8} fill="#E8C98A" /><rect x={-200} y={-60} width={180} height={30} rx={8} fill="#E8C98A" />
          <Label x={0} y={2} text="INDEPENDENT INVESTIGATION" size={34} font="Bebas Neue" color="#3A2A1E" o={on(f, q.independent, 8)} />
          <g transform={`translate(${200 - 80 * on(f, q.reports, 20)} -120)`} opacity={on(f, q.reports, 8)}><circle r={80} fill="#BFE6FF" opacity={0.3} stroke="#C9D2FF" strokeWidth={10} /><rect x={50} y={50} width={22} height={110} rx={10} fill="#C9D2FF" transform="rotate(-40 60 60)" /></g>
        </g>
        <g opacity={on(f, q.target, 8) * (1 - on(f, q.board22, 8))}><Label x={960} y={330} text="REPORTS: CEO TARGETED BY A FOREIGN SPY EFFORT" size={48} font="Bebas Neue" color={AMBER} /></g>
        <g opacity={on(f, q.sign22, 10) * (1 - on(f, q.so23, 10))} transform={`translate(1560 ${520 - 10 * pop(f, q.leaked, 12)})`}>
          <path d="M0 -120 L100 -84 Q100 36 0 100 Q-100 36 -100 -84 Z" fill="#2F5FD0" stroke="#C9D2FF" strokeWidth={6} /><path d="M-36 0 L-8 28 L44 -36" fill="none" stroke="#FFFFFF" strokeWidth={12} strokeLinecap="round" />
          <Label x={0} y={170} text="BOARD: NO SIGN SECRETS LEAKED" size={40} font="Bebas Neue" color="#C9D2FF" /></g>
        <g opacity={on(f, q.uncertainty, 10) * (1 - on(f, q.so23, 10))}><Person f={f} who="investor" beats={invs} x={300} y={880} s={0.85} /><Person f={f} who="investorF" beats={invs} x={500} y={880} s={0.85} flip />
          <Label x={400} y={970} text="INVESTORS STILL NERVOUS" size={40} font="Bebas Neue" color="#E8E6FF" o={on(f, q.nervous, 8)} /></g>
        <g opacity={on(f, q.real, 10)} transform={`translate(960 ${520 - 14 * pop(f, q.why23, 14)})`}><rect x={-260} y={-120} width={520} height={200} rx={30} fill={INK} stroke={NEON} strokeWidth={6} />
          <Label x={0} y={46} text={f >= q.why23 ? 'WHY?' : 'THE REAL QUESTION'} size={f >= q.why23 ? 150 : 70} font="Bebas Neue" color={NEON} /></g>
      </g>}
      <Headline f={f} lines={[[q.happened9, 'THE WEEK, DAY BY DAY', '#E8E6FF', 104], [q.democrats, 'THE ELECTION RESULT', '#E8E6FF', 104], [q.thursday, 'THURSDAY: AI STOCKS SOLD HARDEST', RED, 92],
        [q.dow, 'THE WHOLE MARKET FELL', RED, 100], [q.nasdaq16, 'THE NASDAQ HIT A CORRECTION', RED, 96], [q.friday, 'FRIDAY: A SMALL BOUNCE', '#E8E6FF', 100], [q.then18, 'MONDAY: THE MOOD FLIPPED', NEON, 100],
        [q.nvidia20, 'EXCEPT NVIDIA', RED, 108], [q.board22, 'WHAT THE BOARD SAID', '#E8E6FF', 104], [q.so23, 'SO… WHY?', '#E8E6FF', 108]]} />
      <Vignette id="nv-week" />
    </g>
  )
}

export const NV_WEEK = makePiece('nv-week', 'The week day by day: Tuesday election night — a capitol dome whose House and Senate halves light blue as a ballot drops (Democrats win both chambers); Thursday a storm with lightning over three glowing chip towers (Nvidia, AMD, Micron) that sink and turn red with -9% ~$182, -17%, -17% tags, a DOW -1,800 POINTS sign and a Nasdaq gauge sliding past -10% from peak; Friday a small bounce, Monday a sunrise with S&P 500 +2.4% best day since April, chip towers popping back and an oil barrel sinking; a boardroom where Nvidia stays dark, an INDEPENDENT INVESTIGATION folder under a magnifier, a shield BOARD: NO SIGN SECRETS LEAKED, two nervous investors, and a neon WHY?', {
  mood: 'dark', Component: Week, beats: Object.values(K),
  sfx: [['s10:voted', 'click', 0.2], ['s11:senate', 'chime', 0.2], ['s12:selling', 'thud', 0.25], ['s14:17', 'crack', 0.2], ['s16:10', 'impact', 0.2], ['s18:rose', 'riser', 0.2], ['s21:investigation', 'thud', 0.2], ['s23:why', 'pop', 0.25]] })
