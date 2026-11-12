// ---------------------------------------------------------------- s24–s31: step two, know your two paychecks (a side-by-side comparison, r58 exception).
// Left panel (night office): Leo trades hours for pay — a clock turns into coins, an envelope $75,000 A YEAR (s25–s26); a week of hour blocks hits a ceiling bar;
//   when Leo stops, the envelope greys (s27).
// Right panel (dawn): the brass machine pays while Leo rests (s28); the jar beside it grows and the envelope it drops grows with it, no hours needed (s29);
//   today: jar empty, gauge at zero, $0 (s30).
// Both (s31): a pipe from the left envelope pours coins into the right jar until a home lights up (his life paid for).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { C, City, Cross, Defs, Envelope, FONT, Grain, Jar, Machine, Tag } from './kit'

const G = 930
const Clock: React.FC<{ x: number; y: number; f: number; s?: number; o?: number; spin?: number }> = ({ x, y, f, s = 1, o = 1, spin = 0 }) => (
  <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={70} fill={C.cream} stroke={C.brassD} strokeWidth={10} />
    {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-3} y={-62} width={6} height={12} fill={C.inkSoft} transform={`rotate(${k * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-48} stroke={C.ink} strokeWidth={7} strokeLinecap="round" transform={`rotate(${f * 6 * spin})`} />
    <line x1={0} y1={0} x2={32} y2={0} stroke={C.ink} strokeWidth={7} strokeLinecap="round" transform={`rotate(${f * 0.5 * spin})`} />
  </g>
)
const Home: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 0 }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><rect x={-90} y={-120} width={180} height={120} fill={C.cream} /><path d="M-110 -110 L0 -200 L110 -110 Z" fill={C.brick} /><rect x={-22} y={-70} width={44} height={70} fill={C.bark} />{[40, -76].map((wx) => <rect key={wx} x={wx} y={-96} width={36} height={32} fill={lit > 0.5 ? C.sun : '#9CC0D8'} />)}</g>

const Two: React.FC<PieceProps> = ({ f, c }) => {
  const seeing = c('s24:seeing'), kinds = c('s24:kinds')
  const first25 = c('s25:first'), trade = c('s25:trade'), time25 = c('s25:time'), money25 = c('s25:money'), paid25 = c('s25:paid')
  const seventy = c('s26:seventy'), year26 = c('s26:year')
  const ceiling27 = c('s27:ceiling'), hours27 = c('s27:hours'), week = c('s27:week'), stops = c('s27:stops'), stops2 = c('s27:stops#2')
  const second28 = c('s28:second'), works28 = c('s28:works'), work28 = c('s28:work'), paid28 = c('s28:paid')
  const ceiling29 = c('s29:ceiling'), bigger = c('s29:bigger'), pile29 = c('s29:pile'), paycheck29 = c('s29:paycheck#2'), hours29 = c('s29:hours')
  const today = c('s30:today'), zero = c('s30:zero')
  const game = c('s31:game'), first31 = c('s31:first'), build = c('s31:build'), second31 = c('s31:second'), pay31 = c('s31:pay'), life31 = c('s31:life')

  const leftLit = 1 - 0.55 * on(f, second28 - 6, 10) * (1 - on(f, game - 6, 10))
  const rightLit = 0.45 + 0.55 * on(f, second28 - 6, 10)
  const jarLv = f < today ? span(f, bigger, paycheck29 + 20) * 0.9 : f < game ? 0.9 * (1 - on(f, today, 14)) : span(f, build, life31) * 0.95
  const grey = on(f, stops2 - 2, 10) * (1 - on(f, second28 - 6, 10))
  const week7 = Array.from({ length: 6 }, (_, k) => on(f, lerp(hours27, week + 10, k / 5), 6))

  return (
    <g>
      <Defs />
      <rect width={1920} height={1080} fill="#E9DCC6" />
      {/* # LEFT panel: the first paycheck */}
      <g opacity={on(f, seeing - 10, 10)}>
        <clipPath id="ff-twoL"><rect x={60} y={240} width={880} height={780} rx={30} /></clipPath>
        <g clipPath="url(#ff-twoL)">
          <rect x={60} y={240} width={880} height={780} fill="url(#ff-night)" />
          {Array.from({ length: 24 }, (_, k) => <rect key={k} x={90 + (k % 8) * 108} y={300 + Math.floor(k / 8) * 80} width={20} height={28} fill="#FFD983" opacity={0.35} />)}
          <rect x={60} y={G - 8} width={880} height={110} fill="#232A47" />
          <g opacity={leftLit}>
            {/* # desk */}
            <rect x={130} y={G - 230} width={420} height={26} rx={6} fill="#8A6748" /><rect x={150} y={G - 204} width={20} height={204} fill="#5E4530" /><rect x={510} y={G - 204} width={20} height={204} fill="#5E4530" />
            <rect x={240} y={G - 400} width={220} height={150} rx={10} fill="#1A1F33" /><rect x={252} y={G - 388} width={196} height={126} rx={6} fill={C.teal} opacity={0.8} />
            <Person f={f} who="investor" beats={[[0, 'typeSit', 'neutral'], [c('s25:works'), 'type', 'neutral'], [paid25, 'receive', 'smiling'], [seventy + 20, 'typeSit', 'neutral'], [stops, 'slump', 'worried'], [game, 'idle', 'neutral']]} x={680} y={G} s={0.82} flip />
            <Clock x={300} y={420} f={f} s={0.9} spin={on(f, time25 - 4, 8)} o={on(f, trade - 4, 8)} />
            {/* # time -> money: coins drop from the clock to the envelope */}
            {[0, 1, 2].map((k) => { const at = money25 + k * 8, t = span(f, at, at + 16); return f >= at && t < 1 ? <g key={k} transform={`translate(${lerp(300, 780, t)} ${lerp(470, 470, t) - 60 * Math.sin(Math.PI * t)})`}><ellipse rx={18} ry={8} fill={C.goldD} /><ellipse cy={-3} rx={18} ry={8} fill={C.gold} /></g> : null })}
            <g opacity={on(f, paid25 - 4, 8)} transform={`translate(800 ${470}) scale(${0.62 + 0.06 * pop(f, seventy, 12)})`}><Envelope x={0} y={0} text="$" color={grey > 0.5 ? '#CFCFD8' : '#F4E3C4'} /></g>
            <Tag x={760} y={380} text={f >= seventy ? '$75,000 A YEAR' : 'AFTER TAX'} size={36} o={on(f, c('s26:tax'), 8)} color={C.sun} />
            <Tag x={300} y={330} text="TIME FOR MONEY" size={32} o={win(f, trade, hours27 - 4, 8)} point="none" />
            {/* # the week of hour blocks under a ceiling */}
            <g opacity={win(f, hours27 - 6, second28 - 2, 8)}>
              <rect x={90} y={262} width={820} height={190} rx={16} fill="#1B2140" opacity={0.95} />
              {week7.map((p, k) => <rect key={k} x={140 + k * 120} y={440 - 70 * p} width={90} height={70 * p} rx={8} fill={C.amber} />)}
              <rect x={110} y={352} width={760} height={12} rx={7} fill={C.red} opacity={on(f, ceiling27, 8)} />
              <text x={500} y={300} textAnchor="middle" fill="#fff" style={{ font: `400 36px ${FONT.big}` }} opacity={on(f, hours27, 8)}>ONLY SO MANY HOURS IN A WEEK</text>
            </g>
            <Cross x={800} y={470} r={90} p={on(f, stops2, 12) * (1 - on(f, second28 - 6, 10))} />
          </g>
        </g>
        <Tag x={500} y={1000} text="1. YOU WORK, YOU GET PAID" size={36} o={on(f, first25, 8)} point="none" />
      </g>
      {/* # RIGHT panel: the second paycheck */}
      <g opacity={on(f, kinds - 6, 10)}>
        <clipPath id="ff-twoR"><rect x={980} y={240} width={880} height={780} rx={30} /></clipPath>
        <g clipPath="url(#ff-twoR)">
          <g transform="translate(980 240) scale(0.4583 0.7222)"><City sky="dawn" f={f} sun={[1500, 500]} ground={930} /></g>
          <g opacity={rightLit}>
            <Machine x={1260} y={G} f={f} s={0.62} run={on(f, works28, 20) * (f >= today && f < game ? 0 : 1)} plate="MONEY AT WORK" />
            <Jar x={1660} y={G} level={jarLv} s={0.62} />
            {/* # envelope it drops grows with the jar */}
            {f >= paid28 && f < today && <g transform={`translate(1460 ${560}) scale(${lerp(0.4, 0.85, span(f, bigger, paycheck29 + 10))})`}><Envelope x={0} y={0} text="$" /></g>}
            <Tag x={1660} y={G - 270} text="THE PILE" size={32} o={win(f, pile29, today, 8)} />
            <Tag x={1460} y={440} text="BIGGER PILE, BIGGER PAYCHECK" size={32} o={win(f, bigger, hours29, 8)} point="none" />
            <Tag x={1420} y={440} text="NO HOURS NEEDED" size={36} o={win(f, hours29, today, 8)} point="none" color={C.cash} ink="#fff" />
            <Tag x={1460} y={460} text="TODAY: $0" size={56} o={win(f, zero - 4, game - 2, 8)} color={C.red} ink="#fff" point="none" />
            <Home x={1700} y={G - 330} s={0.6} o={on(f, life31 - 6, 8)} lit={on(f, life31 + 6, 6)} />
          </g>
          <Person f={f} who="investor" beats={[[0, 'relax', 'smiling']]} x={1110} y={G} s={0.62} o={win(f, work28 - 4, today, 10)} />
        </g>
        <Tag x={1420} y={1000} text="2. YOUR MONEY WORKS, YOU GET PAID" size={36} o={on(f, second28, 8)} point="none" />
      </g>
      {/* # s31: the first paycheck feeds the second — a pipe over the gap */}
      <g opacity={on(f, build - 6, 10)}>
        <path d="M800 520 C 940 380 1100 360 1660 560" stroke={C.brassD} strokeWidth={30} fill="none" strokeLinecap="round" />
        <path d="M800 520 C 940 380 1100 360 1660 560" stroke={C.brassL} strokeWidth={14} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="0.04 0.04" strokeDashoffset={-f / 60} />
      </g>

      <Headline f={f} lines={[[seeing, 'STEP 2: KNOW YOUR TWO PAYCHECKS', C.ink, 92], [ceiling27, 'PAYCHECK 1 HAS A CEILING', C.ink, 100], [second28, 'MONEY THAT WORKS FOR YOU', C.ink, 100],
        [ceiling29, 'PAYCHECK 2 HAS NO CEILING', C.cashD, 100], [today, "LEO'S SECOND PAYCHECK: $0", C.ink, 100], [game, 'USE PAYCHECK 1 TO BUILD PAYCHECK 2', C.ink, 88]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s25:works", "s26:tax", 's24:seeing', 's24:kinds', 's25:first', 's25:trade', 's25:time', 's25:money', 's25:paid', 's26:seventy', 's26:year', 's27:ceiling', 's27:hours', 's27:week', 's27:stops', 's27:stops#2',
  's28:second', 's28:works', 's28:work', 's28:paid', 's29:ceiling', 's29:bigger', 's29:pile', 's29:paycheck#2', 's29:hours', 's30:today', 's30:zero', 's31:game', 's31:first', 's31:build', 's31:second', 's31:pay', 's31:life']
export const FF_TWO = makePiece('ff-two', 'Freedom step two, two panels: left night office, Leo at the desk, a clock turns to coins into an envelope ($75,000 A YEAR, TIME FOR MONEY), a week of hour blocks under a red ceiling (ONLY SO MANY HOURS IN A WEEK), the envelope crossed when he stops; right dawn street, the brass MONEY AT WORK machine runs while Leo relaxes, jar THE PILE grows and the dropped envelope grows (BIGGER PILE, BIGGER PAYCHECK, NO HOURS NEEDED), then TODAY: $0; a brass pipe carries coins from paycheck 1 into the jar until a home lights', {
  mood: 'light', Component: Two, beats: BEATS,
  sfx: [['s25:paid', 'coin', 0.15], ['s27:ceiling', 'pop', 0.15], ['s27:stops#2', 'swish', 0.12], ['s28:works', 'chime', 0.15], ['s30:zero', 'pop', 0.15], ['s31:build', 'coin', 0.15]] })
