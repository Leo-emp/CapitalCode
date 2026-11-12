// ---------------------------------------------------------------- s37–s48: choice three, all at once or bit by bit (cream).
// A) A crowd with money bags and question marks; Leo at the foot of THE MARKET escalator with one big bag, nervous;
//    a storm cloud over the top (what if it drops?); the bag splits in three and the thirds step on one month apart.
// B) Vanguard's test: a globe spins, a year counter runs 1976 → 2022, two lanes (all at once / bit by bit) over many
//    one-year stretches; a scoreboard fills: ALL AT ONCE, ALL AT ONCE, BIT BY BIT (about 2 times out of 3).
// C) Why: the escalator climbs more often than it drops — a grid of 98 year squares fills (72 up, 26 down); a bag
//    waiting on the side stays at the bottom while a riding bag climbs.
// D) The worst stretch: the escalator dips first, the all-at-once bag rides into the dip while the later thirds miss
//    it; a balance: USUALLY A BIT MORE vs LESS REGRET; all the bags drop into the money machine; how much can he take?
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { CalPage } from '../bank/kit'
import { Mini } from '../../rig/Mini'
import { Escalator, escAt, Machine, MoneyBag, Paycheck, Score, Weather, YearGrid } from './kit'
import { UPS } from './data'

const GROUND = 930
const EX = 420, EY = GROUND - 40

const Time: React.FC<PieceProps> = ({ f, c }) => {
  const question = c('s37:question'), everyone = c('s37:everyone'), sum37 = c('s37:sum')
  const putting = c('s38:putting'), day38 = c('s38:day'), scary = c('s38:scary'), drops38 = c('s38:drops'), month38 = c('s38:month')
  const spread = c('s39:spread'), third1 = c('s39:third'), third2 = c('s39:third#2'), third3 = c('s39:third#3')
  const vanguard = c('s40:vanguard'), tested = c('s40:tested')
  const stock41 = c('s41:stock'), world41 = c('s41:world'), y1976 = c('s41:1976'), y2022 = c('s41:2022'), compared = c('s41:compared'), stretch = c('s41:stretch')
  const putting42 = c('s42:putting'), ahead = c('s42:ahead'), two42 = c('s42:two'), three42 = c('s42:three')
  const reason = c('s43:reason'), up43 = c('s43:up'), down43 = c('s43:down')
  const us44 = c('s44:us'), gained = c('s44:gained'), n72 = c('s44:72'), n98 = c('s44:98'), years44 = c('s44:years')
  const money45 = c('s45:money'), waiting = c('s45:waiting'), missed = c('s45:missed'), climb = c('s45:climb')
  const spreading46 = c('s46:spreading'), worst = c('s46:worst'), fell46 = c('s46:fell'), start46 = c('s46:start')
  const another = c('s47:another'), once47 = c('s47:once'), more47 = c('s47:more'), spreading47 = c('s47:spreading'), regret = c('s47:regret'), crash47 = c('s47:crash')
  const either = c('s48:either'), invested48 = c('s48:invested'), biggest = c('s48:biggest'), take48 = c('s48:take'), running48 = c('s48:running')

  const AB = vanguard - 8, BC = up43 - 10, CD = spreading46 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cc = win(f, BC, CD), D = on(f, CD, 10)

  // # A) Leo + bags on the escalator (each third rides from its cue)
  const aBeats: Beat[] = [[0, 'idle', 'thinking'], [putting, 'carryHeavy', 'neutral'], [scary, 'nervous', 'worried'], [drops38, 'shock', 'worried'], [spread, 'explain', 'thinking'], [third1, 'offer', 'smiling'], [third2, 'offer', 'smiling'], [third3, 'offer', 'smiling']]
  const ride = (at: number, speed = 0.004) => Math.min(0.95, Math.max(0, (f - at) * speed))
  // # C) waiting bag vs riding bag
  // # D) dip
  const dip = on(f, worst, 20) * (1 - on(f, another, 12))
  const allT = Math.min(0.42, Math.max(0, (f - worst) * 0.006))
  const dBeats: Beat[] = [[CD, 'idle', 'neutral'], [worst, 'shock', 'worried'], [start46, 'relief', 'smiling'], [another, 'weighA', 'thinking', 'weighB', 18], [invested48, 'present', 'smiling'], [biggest, 'think', 'thinking']]
  const intoMachine = span(f, invested48, invested48 + 24)

  return (
    <g>
      <Stage id="m-time" frame={f} />
      <Ground y={GROUND} />

      {/* # A) the question, the escalator, three thirds */}
      {A > 0 && <g opacity={A}>
        <g opacity={1 - on(f, putting, 10)}>
          {[0, 1, 2, 3, 4, 5].map((k) => <g key={k} opacity={on(f, everyone + k * 4, 8)}>
            <Mini look={['investor', 'investorF', 'worker', 'owner', 'buyer', 'investorF'][k]} x={460 + k * 200} y={GROUND} scale={1.2} frame={f} seed={k + 2} mood="neutral" />
            <MoneyBag x={460 + k * 200 + 70} y={GROUND} s={0.55} o={on(f, sum37, 8)} />
            <g transform={`translate(${460 + k * 200} ${GROUND - 330 - 8 * Math.sin(f / 12 + k)})`}><circle r={36} fill="#FFFFFF" stroke="#CDB58C" strokeWidth={3} /><text y={16} textAnchor="middle" fill="#16294A" style={{ font: '400 50px "Bebas Neue"' }}>?</text></g></g>)}
          <g opacity={on(f, question, 8)} transform={`translate(960 ${330}) scale(${pop(f, question, 14)})`}><text textAnchor="middle" y={60} fill={P.goldInk} style={{ font: '400 200px "Bebas Neue"' }}>?</text></g>
        </g>
        <g opacity={on(f, putting, 10)}>
          <Escalator x={EX} y={EY} f={f} />
          <g opacity={win(f, drops38, spread, 8)}><Weather x={1720} y={300} kind="storm" s={1.2} f={f} /><Label x={1720} y={470} text={f >= month38 ? 'NEXT MONTH?' : 'A DROP?'} size={52} font="Bebas Neue" color={P.coralInk} /></g>
          {/* one big bag until "spread", then three thirds stepping on */}
          {f < spread && <MoneyBag x={EX - 20} y={EY + 40} s={1.3} t="$1M" o={on(f, day38, 8)} />}
          {f >= spread && [third1, third2, third3].map((at, k) => { const t = f >= at ? ride(at) : 0, [bx, by] = f >= at ? escAt(EX, EY, t) : [EX - 160 + k * 90, EY + 40]; return <MoneyBag key={k} x={bx} y={by} s={0.8} t="⅓" o={on(f, spread, 8)} /> })}
          {[third1, third2, third3].map((at, k) => <g key={k} opacity={on(f, at, 8) * (1 - on(f, vanguard - 10, 8))} transform={`translate(${560 + k * 230} 330)`}><CalPage x={0} y={0} s={0.85} m={`MONTH ${k + 1}`} d={k === 0 ? '⅓' : k === 1 ? '⅔' : 'ALL'} col="#2E5C9A" /></g>)}
          <Person f={f} who="investor" beats={aBeats} x={200} y={GROUND} s={1.05} />
        </g>
      </g>}

      {/* # B) Vanguard's test */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, putting42, 10)}>
          {/* globe */}
          <g opacity={Math.max(on(f, AB + 10, 10), on(f, stock41, 8))} transform={`translate(560 560) scale(${0.85 + 0.15 * pop(f, world41, 14)})`}>
            <clipPath id="m-globe"><circle r={206} /></clipPath><circle r={210} fill="#6FA8DC" /><g clipPath="url(#m-globe)"><g transform={`translate(${((f * 2) % 420) - 210} 0)`}>{[-420, 0, 420].map((o) => <g key={o} transform={`translate(${o} 0)`}><path d="M-120 -80 Q-60 -150 20 -100 Q60 -40 0 20 Q-80 40 -120 -80 Z" fill="#7FB77E" /><path d="M40 40 Q120 10 150 80 Q120 150 60 130 Z" fill="#7FB77E" /></g>)}</g></g>
            <circle r={210} fill="none" stroke="#2E5C9A" strokeWidth={10} /></g>
          <g opacity={on(f, AB, 8)} transform={`translate(1300 ${330 - 10 * pop(f, tested, 12) - 10 * pop(f, c('s40:biggest'), 12)})`}><rect x={-300} y={-60} width={600} height={110} rx={20} fill="#16294A" /><text y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"' }}>{f >= tested ? 'VANGUARD TESTED IT' : 'VANGUARD'}</text></g>
          <g opacity={on(f, y1976, 8)} transform="translate(1300 520)"><Label x={0} y={0} text={`${Math.round(lerp(1976, 2022, span(f, y1976, y2022 + 6)))}`} size={110} font="Bebas Neue" color={P.ink} /></g>
          {/* two lanes over many one-year stretches */}
          <g opacity={on(f, compared, 8)} transform="translate(1300 700)">
            {[0, 1].map((k) => <g key={k} transform={`translate(0 ${k * 110})`}><rect x={-380} y={-40} width={760} height={80} rx={40} fill={k ? '#C9DDF0' : '#F4E3B5'} />
              <MoneyBag x={-330 + 660 * ((f - compared) * 0.004 % 1)} y={30} s={k ? 0.6 : 0.8} t={k ? '⅓' : 'ALL'} />
              <text x={-400} y={16} textAnchor="end" fill="#16294A" style={{ font: '400 40px "Bebas Neue"' }}>{k ? 'BIT BY BIT' : 'ALL AT ONCE'}</text></g>)}
            <g opacity={on(f, stretch, 8)}>{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-370 + k * 95} y={-80} width={6} height={250} fill="#CDB58C" />)}<Label x={0} y={230} text="EVERY 1-YEAR STRETCH" size={46} font="Bebas Neue" color={P.ink2} /></g>
          </g>
        </g>
        <g opacity={on(f, putting42 + 10, 8)}>
          <Score x={960} y={560} wins={[on(f, ahead, 10), on(f, two42, 10), on(f, three42, 10)]} />
          <g opacity={on(f, three42, 8)}><Label x={960} y={860} text="≈ 2 TIMES OUT OF 3: ALL AT ONCE" size={64} font="Bebas Neue" color={P.ink} /></g>
        </g>
      </g>}

      {/* # C) why: up more often than down */}
      {Cc > 0 && <g opacity={Cc}>
        <g opacity={1 - on(f, us44, 10) + on(f, money45, 10)}>
          <Escalator x={EX} y={EY} f={f} />
          <g opacity={on(f, up43, 8) * (1 - on(f, us44, 8))}><Label x={1500} y={GROUND - 160} text="UP: MORE OFTEN" size={60} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, down43, 8) * (1 - on(f, us44, 8))}><Label x={1500} y={GROUND - 90} text="DOWN: LESS OFTEN" size={52} font="Bebas Neue" color={P.coralInk} /></g>
          {/* riding bag vs waiting bag */}
          <g opacity={on(f, money45, 8)}>{(() => { const [bx, by] = escAt(EX, EY, Math.min(0.8, Math.max(0, (f - money45) * 0.009))); return <MoneyBag x={bx} y={by} s={0.9} t="IN" /> })()}
            <g opacity={on(f, waiting, 8)}><MoneyBag x={250} y={GROUND} s={0.9} t="WAIT" /><Label x={250} y={GROUND + 64} text="WAITING ON THE SIDE" size={46} font="Bebas Neue" color={P.ink} /></g>
            <g opacity={on(f, missed, 8)}><path d={`M300 ${GROUND - 160} L${escAt(EX, EY, 0.7)[0] - 80} ${escAt(EX, EY, 0.7)[1] + 20}`} stroke={P.coral} strokeWidth={6} strokeDasharray="14 10" /><Label x={640} y={420} text={f >= climb ? 'MISSED THE CLIMB' : 'MISSED'} size={56} font="Bebas Neue" color={P.coralInk} /></g></g>
        </g>
        <g opacity={on(f, us44, 10) * (1 - on(f, money45, 10))}>
          <YearGrid x={960} y={420} ups={UPS} shown={Math.round(98 * span(f, gained, years44))} />
          <g opacity={on(f, n98, 8)}><Label x={960} y={GROUND + 20} text="1928–2025: 72 YEARS UP, 26 DOWN" size={64} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, n72, 8) * (1 - on(f, n98, 8))}><Label x={960} y={350} text="72 YEARS UP" size={64} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}

      {/* # D) worst stretch; trade-off; into the machine */}
      {D > 0 && <g opacity={D}>
        <g opacity={1 - on(f, another, 10)}>
          <Escalator x={EX} y={EY} f={f} dip={dip} />
          {(() => { const [bx, by] = escAt(EX, EY, allT, dip); return <g><MoneyBag x={bx} y={by} s={0.9} t="ALL" /><g opacity={on(f, fell46, 8)}><Label x={640} y={430} text="RIGHT INTO THE DROP" size={50} font="Bebas Neue" color={P.coralInk} /></g></g> })()}
          {[0, 1, 2].map((k) => <MoneyBag key={k} x={270 + k * 70} y={GROUND} s={0.6} t="⅓" o={on(f, spreading46, 8)} />)}
          <g opacity={on(f, start46, 8)}><Label x={340} y={GROUND + 64} text="THIRDS: BOUGHT LOWER" size={46} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
        <g opacity={on(f, another, 10) * (1 - on(f, either, 10))}>
          {/* a balance */}
          <g transform="translate(960 760)"><rect x={-14} y={-360} width={28} height={360} fill="#8E5B3A" /><rect x={-120} y={-10} width={240} height={30} rx={10} fill="#8E5B3A" />
            <g transform="rotate(0)"><rect x={-460} y={-370} width={920} height={20} rx={10} fill="#A9744E" />
              {[-1, 1].map((sd) => <g key={sd} transform={`translate(${sd * 400} -360)`}><line x1={-90} y1={0} x2={0} y2={-0} stroke="#8E5B3A" strokeWidth={4} />
                <path d="M-150 120 L150 120 Q120 180 0 180 Q-120 180 -150 120 Z" fill="#C99366" /><line x1={-140} y1={120} x2={0} y2={10} stroke="#8E5B3A" strokeWidth={4} /><line x1={140} y1={120} x2={0} y2={10} stroke="#8E5B3A" strokeWidth={4} /></g>)}</g>
            <g opacity={on(f, once47, 8)} transform="translate(-400 -260)">{[0, 1, 2].map((k) => <ellipse key={k} cx={-40 + k * 40} cy={0} rx={30} ry={10} fill={P.gold} stroke={P.goldD} strokeWidth={3} />)}<Label x={0} y={150} text={f >= more47 ? 'USUALLY A BIT MORE' : 'ALL AT ONCE'} size={52} font="Bebas Neue" color={P.goldInk} /></g>
            <g opacity={on(f, spreading47, 8)} transform="translate(400 -260)"><path d="M0 10 C-40 -30 -60 -50 -30 -70 C-10 -80 0 -60 0 -50 C0 -60 10 -80 30 -70 C60 -50 40 -30 0 10 Z" fill={P.coral} /><Label x={0} y={150} text={f >= regret ? 'LESS REGRET' : 'BIT BY BIT'} size={52} font="Bebas Neue" color={P.coralInk} /></g>
          </g>
          <g opacity={on(f, crash47, 8)}><Weather x={1600} y={420} kind="storm" s={0.8} f={f} /></g>
        </g>
        <g opacity={on(f, either, 10)}>
          <Machine x={1180} y={GROUND} s={0.95} f={f} run={on(f, invested48, 20)} fill={intoMachine} />
          {[0, 1, 2].map((k) => { const t = intoMachine; return t < 1 ? <MoneyBag key={k} x={lerp(500 + k * 120, 1150 + (k - 1) * 90, t)} y={lerp(GROUND, GROUND - 560, Math.sin(t * Math.PI / 2))} s={0.7} t="⅓" o={on(f, either, 8) * (1 - on(f, invested48 + 20, 4))} /> : null })}
          <g opacity={on(f, take48, 10)}><Paycheck x={1640} y={560 - 14 * pop(f, c('s48:each'), 12)} s={0.9} amt="$ ? ? ?" sub="EACH YEAR" /></g>
        </g>
        <Person f={f} who="investor" beats={dBeats} x={110} y={GROUND} s={1.0} o={1 - on(f, another, 8) + on(f, either, 8)} />
      </g>}

      <Headline f={f} lines={[[question, 'ALL AT ONCE, OR BIT BY BIT?', P.ink, 96], [spread, 'A THIRD A MONTH', P.ink, 100], [vanguard, 'THE TEST: 1976–2022', P.ink, 100], [reason, 'MARKETS ROSE MORE OFTEN', P.ink, 100], [worst, 'BUT IN THE WORST STRETCHES…', P.coralInk, 96], [another, 'ANOTHER TRADE-OFF', P.ink, 100], [biggest, 'HOW MUCH CAN LEO TAKE OUT?', P.ink, 96]]} />
      <Vignette id="m-time" />
    </g>
  )
}

export const M_TIME = makePiece('m-time', 'Choice three: a crowd with bags and question marks; Leo with a big bag at the foot of THE MARKET escalator, nervous, a storm cloud (what if it drops next month); the bag splits into thirds that step on one month apart; Vanguard tested it: a spinning globe, years 1976-2022, two lanes over every one-year stretch; a scoreboard: all at once, all at once, bit by bit (2 of 3); markets rose more often: a grid of 98 year squares (72 up, 26 down); a bag waiting on the side misses the climb; the escalator dips first and the all-at-once bag rides into the drop while the thirds buy lower; a balance: usually a bit more vs less regret; the bags drop into the money machine, a paycheck with question marks', {
  mood: 'light', Component: Time,
  beats: ["s37:question", "s37:everyone", "s37:sum", "s38:putting", "s38:day", "s38:scary", "s38:drops", "s38:month", "s39:spread", "s39:third", "s39:third#2", "s39:third#3", "s40:vanguard", "s40:tested", "s41:stock", "s41:world", "s41:1976", "s41:2022", "s41:compared", "s41:stretch", "s42:putting", "s42:ahead", "s42:two", "s42:three", "s43:reason", "s43:up", "s43:down", "s44:us", "s44:gained", "s44:72", "s44:98", "s44:years", "s45:money", "s45:waiting", "s45:missed", "s45:climb", "s46:spreading", "s46:worst", "s46:fell", "s46:start", "s47:another", "s47:once", "s47:more", "s47:spreading", "s47:regret", "s47:crash", "s48:either", "s48:invested", "s48:biggest", "s48:take", "s40:biggest", "s48:each"],
  sfx: [['s38:drops', 'thud', 0.12], ['s39:third', 'softpop', 0.12], ['s42:ahead', 'ding', 0.12], ['s42:two', 'ding', 0.12], ['s42:three', 'ding', 0.1], ['s48:invested', 'whoosh', 0.12]] })
