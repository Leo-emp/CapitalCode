// ---------------------------------------------------------------- s71–s78: the payoff, the whole town under a warm lamp.
// The five numbered blocks from the hook return; each lights as its step is recapped. Then two cards for today:
// OCT 2026 UNEMPLOYMENT 4.1% and Q3 2026 GROWTH +3.4%; a painted sun on a stick (doesn't look like a recession) and a
// crystal ball with a question mark (nobody knows when the next starts). The toy radio returns; Nina and Tom stand in
// front of the café under one question: SPENDING LESS, OR MORE?
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { TableWorld, Vig, Sign, Shop, FactCard, StickSun, Token, Life, TOP, TXT, CREAM, INK, RED, BLUE, TEAL, MUSTARD, GREEN, WOOD, WOOD2, WOOD3, SLATE } from './kit'

const Payoff: React.FC<PieceProps> = ({ f, c }) => {
  const five = c('s71:five'), together = c('s71:together')
  const broad = c('s72:broad'), number = c('s72:number'), spreads = c('s72:spreads'), paycheck = c('s72:paycheck')
  const shock = c('s73:shock'), jobs = c('s73:jobs'), ends = c('s73:ends'), restart = c('s73:restart')
  const october = c('s74:october'), d41 = c('s74:41'), d34 = c('s74:34')
  const look = c('s75:look'), nobody = c('s75:nobody'), start = c('s75:start')
  const matters = c('s76:matters'), headline = c('s76:headline'), places = c('s76:places')
  const next = c('s77:next'), question = c('s77:question')
  const people = c('s78:people'), less = c('s78:less'), more = c('s78:more')

  const A = 1 - on(f, october - 10, 8), B = win(f, october - 2, matters - 2, 8), Cc = win(f, matters - 2, next - 2, 8), D = on(f, next - 2, 8)
  const lit = [broad, spreads, shock, jobs, ends], names = ['WHAT IT IS', 'HOW IT SPREADS', 'WHAT SETS IT OFF', 'HOW BAD', 'HOW IT ENDS']
  const caps = ['BROAD, NOT ONE NUMBER', 'SPENDING = PAYCHECKS', 'A SHOCK', 'MILLIONS OF JOBS', 'SPENDING · LOANS · HELP']
  const nina: Beat[] = [[next, 'idle', 'smiling'], [question, 'think', 'thinking'], [people, 'present', 'smiling'], [more, 'pointUp', 'smiling']]
  const tom: Beat[] = [[next, 'idle', 'smiling'], [people, 'waveA', 'smiling', 'waveB', 10], [more, 'thumbsUp', 'smiling']]

  return (
    <g>
      <TableWorld f={f} id="rc-payoff" mood="warm" />
      {/* # A) the five steps light up again */}
      {A > 0.001 && <g opacity={A}>
        {lit.map((at, k) => { const x = 330 + k * 315, l = on(f, at, 10)
          return <g key={k} opacity={on(f, five + k * 3, 8)} transform={`translate(${x} ${TOP + 10}) scale(${1 + 0.06 * l})`}>
            <ellipse cx={8} cy={6} rx={140} ry={16} fill="rgba(40,24,12,0.25)" />
            <rect x={-120} y={-240} width={240} height={240} rx={16} fill={[RED, MUSTARD, TEAL, BLUE, GREEN][k]} opacity={0.45 + 0.55 * l} />
            <rect x={-120} y={-240} width={60} height={240} fill="#FFFFFF" opacity={0.16} />
            <text y={-90} textAnchor="middle" fill={CREAM} style={TXT(120)}>{k + 1}</text>
            <Sign x={0} y={-290} t={names[k]} size={34} col={CREAM} o={0.5 + 0.5 * l} />
            <g opacity={l}><Sign x={0} y={-390 - (k % 2) * 80} t={caps[k]} size={30} col={MUSTARD} /></g>
          </g> })}
        <g opacity={on(f, restart, 8)}>{[0, 1, 2, 3, 4].map((k) => { const p = ((f - restart + k * 6) % 30) / 30; return <Token key={k} x={330 + k * 315 + 150 * p} y={TOP - 260 - 40 * Math.sin(Math.PI * p)} s={0.6} o={k < 4 ? 1 : 0} /> })}</g>
      </g>}
      {/* # B) today's numbers; no forecast */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, october, 8)}><FactCard x={560} y={TOP - 40} head="OCT 2026" big={f >= d41 ? '4.1%' : '?'} small="UNEMPLOYMENT" col={BLUE} s={pop(f, october, 12)} /></g>
        <g opacity={on(f, d34, 8)}><FactCard x={960} y={TOP - 40} head="Q3 2026" big="+3.4%" small="GROWTH, ANNUAL PACE" col={GREEN} s={pop(f, d34, 12)} /></g>
        <g opacity={on(f, look, 8)}><StickSun x={1420} y={420} f={f} s={0.7} /><Sign x={960} y={330} t="NOT WHAT A RECESSION LOOKS LIKE" size={46} col={CREAM} /></g>
        <g opacity={on(f, nobody, 8)} transform={`translate(1700 ${TOP})`}>
          <path d="M-90 0 L-66 -50 L66 -50 L90 0 Z" fill={WOOD2} />
          <circle cy={-170} r={120} fill="#BFD7E8" opacity={0.8} /><circle cy={-170} r={120} fill="none" stroke="#FFFFFF" strokeWidth={8} />
          <text y={-130} textAnchor="middle" fill={SLATE} style={TXT(130)}>?</text>
        </g>
        <g opacity={on(f, start, 8)}><Sign x={1640} y={440} t="NO ONE KNOWS WHEN" size={40} col={CREAM} /></g>
      </g>}
      {/* # C) what matters for you: many places at once */}
      {Cc > 0.001 && <g opacity={Cc}>
        {Array.from({ length: 5 }, (_, k) => <Shop key={k} x={260 + k * 350} y={TOP + 10} s={0.62} name={['JOBS', 'PAY', 'CAFÉ', 'GROCER', 'BARBER'][k]} kind={(['works', 'cafe', 'cafe', 'grocer', 'barber'] as const)[k]} roof={[SLATE, TEAL, RED, GREEN, BLUE][k]} lit={1 - 0.6 * on(f, places + k * 3, 10) * (k % 2 ? 1 : 0.6)} dark={0.4 * on(f, places + k * 3, 10)} />)}
        <g opacity={on(f, headline, 8)}><Sign x={960} y={330} t="NOT THE HEADLINE" size={52} col={CREAM} /></g>
        <g opacity={on(f, places, 8)}><Sign x={960} y={440} t="FALLING IN MANY PLACES AT ONCE?" size={44} col={MUSTARD} /></g>
      </g>}
      {/* # D) the one question */}
      {D > 0.001 && <g opacity={D}>
        <Shop x={1300} y={TOP + 10} s={1.2} name="NINA'S CAFÉ" kind="cafe" roof={RED} />
        <Person f={f} who="owner" beats={nina} x={560} y={TOP + 60} s={0.8} />
        <Person f={f} who="buyer" beats={tom} x={820} y={TOP + 60} s={0.8} flip />
        <g opacity={on(f, question, 8)} transform={`translate(960 330) scale(${pop(f, question, 12)})`}><Sign x={0} y={0} t={f >= less ? 'SPENDING LESS, OR MORE?' : 'ONE QUESTION'} size={64} col={MUSTARD} /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={together} x={960} y={500} kind="glint" />
        <Life f={f} at={number} x={330} y={600} kind="glint" />
        <Life f={f} at={paycheck} x={645} y={600} kind="glint" />
        <Life f={f} at={matters} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s72:not")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s72:spending")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s73:and#2")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s74:unemployment")} x={760} y={600} kind="glint" />
        <Life f={f} at={c("s75:those")} x={760} y={600} kind="glint" />
        <Life f={f} at={c("s76:and")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s76:jobs")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s76:falling")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s77:past")} x={1300} y={600} kind="glint" />
        <Life f={f} at={c("s77:news")} x={1300} y={600} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rc-payoff" />
      <Headline f={f} lines={[[five, 'THE FIVE STEPS', INK, 92], [october, 'AND TODAY?', INK, 92], [matters, 'WHAT MATTERS FOR YOU', INK, 88], [next, 'NEXT TIME YOU HEAR IT', INK, 88]]} />
    </g>
  )
}

export const RC_PAYOFF = makePiece('rc-payoff', 'Payoff under a warm lamp: the five numbered wooden blocks return and light one by one with captions BROAD, NOT ONE NUMBER · SPENDING = PAYCHECKS · A SHOCK · MILLIONS OF JOBS · SPENDING · LOANS · HELP while tokens hop from block to block; then two cards OCT 2026 4.1% UNEMPLOYMENT and Q3 2026 +3.4% GROWTH, ANNUAL PACE, a smiling painted sun on a stick (NOT WHAT A RECESSION LOOKS LIKE) and a crystal ball with a big question mark (NO ONE KNOWS WHEN); five toy shops JOBS, PAY, CAFÉ, GROCER, BARBER (NOT THE HEADLINE · FALLING IN MANY PLACES AT ONCE?); finally Nina and Tom in front of Nina\'s café under one sign: SPENDING LESS, OR MORE?', {
  mood: 'light', Component: Payoff,
  beats: ["s71:five", "s71:together", "s72:broad", "s72:number", "s72:spreads", "s72:paycheck", "s73:shock", "s73:jobs", "s73:ends", "s73:restart", "s74:october", "s74:41", "s74:34", "s75:look", "s75:nobody", "s75:start", "s76:matters", "s76:headline", "s76:places", "s77:next", "s77:question", "s78:people", "s78:less", "s78:more", "s72:not", "s72:spending", "s73:and#2", "s74:unemployment", "s75:those", "s76:and", "s76:jobs", "s76:falling", "s77:past", "s77:news"],
  sfx: [['s74:41', 'pop', 0.08], ['s77:question', 'chime', 0.08]] })
