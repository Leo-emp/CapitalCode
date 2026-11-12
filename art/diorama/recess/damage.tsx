// ---------------------------------------------------------------- s44–s56: step four, how bad it gets (dim lamp).
// A) 100 wooden pawns in a 20×5 tray = people who want a job: in DEC 2007 5 turn red, by OCT 2009 10; a factory gate:
//    −8.7 MILLION JOBS · 2008–2010. B) 2020: the tray goes from 3.5 red to 14.8 red (the last pawn part-filled), and
//    −21.9 MILLION JOBS IN 2 MONTHS. C) the economy as one wooden block: the −28% "annual pace" is a ghost slice, the real
//    quarter's slice is ≈8%: BIGGEST DROP ON RECORD. D) two Toms side by side, both −$270 a week: one with an empty piggy
//    bank and bills piling up, one with a jar of a few months of bills, calmly waiting.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { TableWorld, Vig, Sign, Shop, FactCard, Stack, Token, Life, TOP, TXT, CREAM, INK, RED, BLUE, TEAL, MUSTARD, GREEN, WOOD, WOOD2, WOOD3, SLATE, PINK, BRASS } from './kit'

const Pawn: React.FC<{ x: number; y: number; red: number; s?: number }> = ({ x, y, red, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={`pw${Math.round(x)}-${Math.round(y)}`}><rect x={-20} y={-60 + 64 * (1 - red)} width={40} height={64 * red} /></clipPath></defs>
    <path d="M-16 0 L-10 -26 Q-18 -34 -10 -40 A12 12 0 1 1 10 -40 Q18 -34 10 -26 L16 0 Z" fill={WOOD} stroke={WOOD3} strokeWidth={2} />
    {red > 0 && <path d="M-16 0 L-10 -26 Q-18 -34 -10 -40 A12 12 0 1 1 10 -40 Q18 -34 10 -26 L16 0 Z" fill={RED} clipPath={`url(#pw${Math.round(x)}-${Math.round(y)})`} />}
  </g>
)
// # the tray: 100 pawns; `n` (0..100, may be fractional) of them red, filling in reading order
const Tray: React.FC<{ n: number; o?: number }> = ({ n, o = 1 }) => (
  <g opacity={o}>
    <rect x={420} y={500} width={1080} height={340} rx={20} fill={WOOD2} /><rect x={430} y={510} width={1060} height={320} rx={16} fill={WOOD} />
    {Array.from({ length: 100 }, (_, k) => <Pawn key={k} x={470 + (k % 20) * 51} y={570 + Math.floor(k / 20) * 62} red={Math.max(0, Math.min(1, n - k))} s={0.9} />)}
  </g>
)

const Damage: React.FC<PieceProps> = ({ f, c }) => {
  const clearest = c('s44:clearest'), jobs = c('s44:jobs'), rate = c('s44:rate'), looking = c('s44:looking')
  const dec = c('s45:december'), d5 = c('s45:5'), d100 = c('s45:100')
  const oct = c('s46:october'), d10 = c('s46:10')
  const early = c('s47:early'), d87 = c('s47:87'), jobs47 = c('s47:jobs')
  const faster = c('s48:faster'), d35 = c('s48:35'), d148 = c('s48:148'), april = c('s48:april')
  const d219 = c('s49:219'), two = c('s49:two')
  const shrank = c('s50:shrank'), d28 = c('s50:28'), quarter = c('s50:quarter')
  const annual = c('s51:annual'), year51 = c('s51:year'), fallen = c('s51:fallen')
  const drop = c('s52:drop'), d8 = c('s52:8'), biggest = c('s52:biggest')
  const hardest = c('s53:hardest'), families = c('s53:families'), nothing = c('s53:nothing')
  const two54 = c('s54:two'), saved54 = c('s54:saved'), bills = c('s54:bills')
  const other = c('s55:other'), months = c('s55:months'), wait = c('s55:wait')
  const same = c('s56:same'), different = c('s56:different'), end = c('s56:end')

  const A = 1 - on(f, shrank - 10, 8), B = win(f, shrank - 2, hardest - 2, 8), D = on(f, hardest - 2, 8)
  const red = f < faster ? lerp(0, 5, on(f, d5, 16)) + 5 * on(f, d10, 16) : lerp(3.5, 14.8, on(f, d148, 24)) * on(f, d35 - 4, 8)
  const gate = win(f, early - 2, faster - 2, 8)
  const ghost = on(f, annual, 24), real = on(f, d8, 20)
  const poor: Beat[] = [[two54, 'idle', 'neutral'], [bills, 'despair', 'worried']]
  const ok: Beat[] = [[other, 'idle', 'neutral'], [wait, 'relax', 'smiling']]

  return (
    <g>
      <TableWorld f={f} id="rc-damage" mood="dim" lamp={0.22} />
      {/* # A) the tray of 100 and the jobs lost */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={on(f, rate - 4, 10) * (1 - gate) * (f < faster ? 1 : 0) + (f >= faster ? on(f, faster - 2, 8) * (1 - on(f, d219 - 6, 8)) : 0)}>
          <Tray n={red} />
          <g opacity={on(f, looking, 8)}><Sign x={960} y={440} t="100 PEOPLE WHO WANT A JOB" size={44} col={CREAM} /></g>
          <g opacity={on(f, dec, 8) * (f < faster ? 1 : 0)}><Sign x={960} y={330} t={f >= oct ? (f >= d10 ? 'OCT 2009: 10 IN 100 JOBLESS' : 'OCT 2009') : f >= d5 ? 'DEC 2007: 5 IN 100 JOBLESS' : 'DEC 2007'} size={50} col={f >= oct ? RED : MUSTARD} tc={f >= oct ? CREAM : INK} /></g>
          <g opacity={f >= faster ? 1 : 0}><Sign x={960} y={330} t={f >= d148 ? 'APRIL 2020: 14.8 IN 100' : 'FEB 2020: 3.5 IN 100'} size={50} col={f >= d148 ? RED : MUSTARD} tc={f >= d148 ? CREAM : INK} /></g>
        </g>
        <g opacity={win(f, clearest, rate - 2, 8)}><Shop x={960} y={TOP + 10} s={1} name="JOBS" kind="works" roof={SLATE} /><Sign x={960} y={330} t="THE CLEAREST SIGN: JOBS" size={50} col={CREAM} /></g>
        {/* the factory gate: workers walk out */}
        <g opacity={gate}>
          <Shop x={560} y={TOP + 10} s={1.1} name="FACTORY" kind="works" roof={SLATE} lit={0.3} dark={0.4} />
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, early + k * 6, 8)}><Person f={f} who={['worker', 'investor', 'worker'][k]} beats={[[early, 'walkA', 'worried', 'walkB', 10]]} x={lerp(760, 980 + k * 130, on(f, early + k * 6, 60))} y={TOP + 60} s={0.55} flip /></g>)}
          <g opacity={on(f, d87, 8)}><FactCard x={1520} y={TOP - 30} head="2008–2010" big="−8.7M" small="JOBS LOST" col={RED} s={pop(f, d87, 12)} /></g>
        </g>
        <g opacity={on(f, d219, 8)} transform={`translate(960 ${TOP - 30})`}><FactCard x={0} y={0} head="FEB–APRIL 2020" big="−21.9M" small={f >= two ? 'JOBS IN TWO MONTHS' : 'JOBS'} col={RED} s={1.1 * pop(f, d219, 12)} /></g>
      </g>}
      {/* # B) the economy block: −28% at an annual pace, ≈8% in the quarter */}
      {B > 0.001 && <g opacity={B}>
        <g transform={`translate(960 ${TOP})`}>
          <ellipse cx={10} cy={8} rx={520} ry={30} fill="rgba(40,24,12,0.25)" />
          <rect x={-480} y={-300} width={960} height={300} rx={16} fill={MUSTARD} stroke={WOOD3} strokeWidth={5} />
          <rect x={-480} y={-300} width={200} height={300} fill="#FFFFFF" opacity={0.15} />
          <text x={-60} y={-130} textAnchor="middle" fill={INK} style={TXT(80)}>THE ECONOMY</text>
          {/* the ghost slice: 28% of the width, dashed (if it lasted a year) */}
          <g opacity={ghost * (1 - 0.6 * real)}><rect x={480 - 960 * 0.28} y={-300} width={960 * 0.28} height={300} fill={RED} opacity={0.25} /><rect x={480 - 960 * 0.28} y={-300} width={960 * 0.28} height={300} fill="none" stroke={RED} strokeWidth={6} strokeDasharray="20 12" /></g>
          {/* the real slice: 7.9% of the width, actually cut away */}
          <g opacity={real}><g transform={`translate(${60 * real} ${-40 * real})`}><rect x={480 - 960 * 0.079} y={-300} width={960 * 0.079} height={300} fill={RED} stroke={WOOD3} strokeWidth={4} /></g></g>
        </g>
        <g opacity={on(f, d28, 8) * (1 - on(f, d8 - 6, 8))}><Sign x={960} y={330} t={f >= annual ? '−28% = AN ANNUAL PACE' : 'Q2 2020: −28%?'} size={50} col={RED} tc={CREAM} /></g>
        <g opacity={on(f, year51, 8) * (1 - on(f, d8 - 6, 8))}><Sign x={1560} y={460} t="IF IT LASTED A YEAR" size={40} col={CREAM} /></g>
        <g opacity={on(f, d8, 8)}><Sign x={960} y={330} t={f >= biggest ? 'THE QUARTER: ≈ −8% · BIGGEST ON RECORD' : 'THE QUARTER ITSELF: ≈ −8%'} size={46} col={RED} tc={CREAM} /></g>
      </g>}
      {/* # D) two versions of Tom */}
      {D > 0.001 && <g opacity={D}>
        <g opacity={on(f, families, 8) * (1 - on(f, two54 - 10, 8))}><Person f={f} who="buyer" beats={[[families, 'slump', 'worried']]} x={960} y={TOP + 60} s={0.8} /><Sign x={960} y={330} t="NOTHING SAVED TO FALL BACK ON" size={46} col={CREAM} o={on(f, nothing, 8)} /></g>
        <g opacity={on(f, two54 - 2, 8)}>
          <line x1={960} y1={300} x2={960} y2={TOP + 40} stroke={WOOD3} strokeWidth={6} strokeDasharray="20 14" />
          {/* Tom with nothing saved: empty piggy, bills piling up */}
          <Person f={f} who="buyer" beats={poor} x={520} y={TOP + 60} s={0.74} />
          <g opacity={on(f, saved54, 8)} transform={`translate(260 ${TOP + 10})`}><ellipse cx={0} cy={-60} rx={80} ry={58} fill={PINK} /><circle cx={70} cy={-70} r={24} fill={PINK} /><rect x={-20} y={-122} width={40} height={8} rx={4} fill={INK} /><text y={-50} textAnchor="middle" fill={INK} style={TXT(40)}>$0</text></g>
          {f >= bills && Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, bills + k * 4, 6)} transform={`translate(${760 + (k % 2) * 14} ${TOP - 20 - k * 26}) rotate(${(k % 2 ? 6 : -5)})`}><rect x={-80} y={-20} width={160} height={36} rx={4} fill={CREAM} stroke={RED} strokeWidth={3} /><text y={8} textAnchor="middle" fill={RED} style={TXT(26)}>BILL DUE</text></g>)}
          <g opacity={on(f, two54, 8)}><Sign x={520} y={330} t="TOM A: −$270 · NOTHING SAVED" size={40} col={RED} tc={CREAM} /></g>
          {/* Tom with savings: a jar of a few months of bills */}
          <g opacity={on(f, other, 8)}>
            <Person f={f} who="buyer" beats={ok} x={1400} y={TOP + 60} s={0.74} flip />
            <g transform={`translate(1660 ${TOP + 10})`}><rect x={-90} y={-220} width={180} height={220} rx={26} fill="#BFD7E8" opacity={0.5} />{Array.from({ length: 3 }, (_, k) => <Stack key={k} x={-50 + k * 50} y={-10} n={on(f, months, 20) * (8 - k)} s={0.6} />)}<rect x={-90} y={-220} width={180} height={220} rx={26} fill="none" stroke="#FFFFFF" strokeWidth={8} /></g>
            <Sign x={1400} y={330} t="TOM B: −$270 · MONTHS SAVED" size={40} col={GREEN} tc={CREAM} />
          </g>
          <g opacity={on(f, wait, 8)}><Sign x={1500} y={430} t="HE CAN WAIT" size={40} col={CREAM} /></g>
          <g opacity={on(f, different, 8) * (1 - on(f, end, 8))}><Sign x={960} y={1062} t="SAME RECESSION, DIFFERENT YEAR" size={40} col={MUSTARD} /></g>
        </g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={jobs} x={960} y={600} kind="glint" />
        <Life f={f} at={d100} x={960} y={500} kind="glint" />
        <Life f={f} at={jobs47} x={1520} y={600} kind="glint" />
        <Life f={f} at={april} x={1200} y={600} kind="glint" />
        <Life f={f} at={quarter} x={1300} y={700} kind="glint" />
        <Life f={f} at={fallen} x={1300} y={700} kind="glint" />
        <Life f={f} at={same} x={960} y={500} kind="glint" />
        <Life f={f} at={c("s44:a")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s44:find")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s45:didn't")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s47:2010")} x={1520} y={600} kind="glint" />
        <Life f={f} at={c("s48:2020")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s48:unemployment")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s49:disappeared")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s50:also")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s51:shrinking")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s51:percent")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s52:itself")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s53:average")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s53:who")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s53:on")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s54:one")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s54:loses")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s55:the#2")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s57:stop")} x={960} y={600} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rc-damage" />
      <Headline f={f} lines={[[clearest, 'HOW BAD IT GETS', INK, 92], [shrank, 'WHAT “−28%” MEANS', INK, 92], [hardest, 'THE HARDEST PART', INK, 92]]} />
    </g>
  )
}

export const RC_DAMAGE = makePiece('rc-damage', 'Step four under a dim lamp: a JOBS works building (THE CLEAREST SIGN: JOBS), then a wooden tray of 100 pawns (100 PEOPLE WHO WANT A JOB) where 5 turn red (DEC 2007: 5 IN 100 JOBLESS) and then 10 (OCT 2009: 10 IN 100); workers walk out of a FACTORY past a card 2008–2010 −8.7M JOBS LOST; the tray again from 3.5 red (FEB 2020) to 14.8 red, the last pawn part-filled (APRIL 2020: 14.8 IN 100), and a big card FEB–APRIL 2020 −21.9M JOBS IN TWO MONTHS; a long mustard block THE ECONOMY with a dashed red ghost slice of 28% (−28% = AN ANNUAL PACE, IF IT LASTED A YEAR) and a real 8% slice that breaks away (THE QUARTER: ≈ −8% · BIGGEST ON RECORD); then two Toms either side of a dashed line — TOM A: −$270 · NOTHING SAVED with an empty $0 piggy bank and BILL DUE slips piling up, and TOM B: −$270 · MONTHS SAVED with a jar of token stacks, relaxed (HE CAN WAIT) — SAME RECESSION, DIFFERENT YEAR.', {
  mood: 'light', Component: Damage,
  beats: ["s44:clearest", "s44:jobs", "s44:rate", "s44:looking", "s45:december", "s45:5", "s45:100", "s46:october", "s46:10", "s47:early", "s47:87", "s47:jobs", "s48:faster", "s48:35", "s48:148", "s48:april", "s49:219", "s49:two", "s50:shrank", "s50:28", "s50:quarter", "s51:annual", "s51:year", "s51:fallen", "s52:drop", "s52:8", "s52:biggest", "s53:hardest", "s53:families", "s53:nothing", "s54:two", "s54:saved", "s54:bills", "s55:other", "s55:months", "s55:wait", "s56:same", "s56:different", "s56:end", "s44:a", "s44:find", "s45:didn't", "s47:2010", "s48:2020", "s48:unemployment", "s49:disappeared", "s50:also", "s51:shrinking", "s51:percent", "s52:itself", "s53:average", "s53:who", "s53:on", "s54:one", "s54:loses", "s55:the#2", "s57:stop"],
  sfx: [['s46:10', 'thud', 0.08], ['s49:219', 'thud', 0.1], ['s52:8', 'crack', 0.1], ['s54:bills', 'pop', 0.08]] })
