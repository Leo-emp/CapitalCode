// ---------------------------------------------------------------- s59–s70: why not everyone — (1) the loan is backed by the shares: a price fall brings a
// maintenance call (add cash/shares or pay down within two or three days, or the lender sells, often without warning); year ten, shares halve:
// ≈ $19.7M → ≈ $9.8M, loan still ≈ $5.6M = more than half → forced selling at the bottom; (2) the rate follows SOFR and can rise;
// (3) it needs size: most people pay 0% or 15% on gains, little to save, interest still charged; Oracle's proxy: Ellison pledged shares for personal loans
import React from 'react'
import { lerp, on, P, span, Stage, Vignette, Pedestal } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, camera, Doc, fly, Headline, Person, Pile, Prop as Prop0, win } from '../aimoney/common'
// # catalog props draw small at their nominal size; this story shows them big (owner r37: few objects, big)
const Prop: typeof Prop0 = (p) => <Prop0 {...p} size={p.size * 1.6} />
import { At, Bar, Chain, Stack, Tag , Accents, xcam, punch, type Acc } from './kit'

const PX = 26
// # every cue that drives a drawing (the plan gate counts them; each one also punches the frame in)
const BEATS: string[] = ['s60:first', 's67:save', 's68:very', 's69:example', 's70:pledged', 's63:ten', 's67:savings', 's67:gains', 's59:shares', 's60:backed', 's60:falls', 's60:lender', 's60:call', 's61:add', 's61:pay', 's61:two', "s62:can't", 's62:sell', 's62:warning', 's63:picture', 's63:halve', 's64:197', 's64:98', 's64:56',
    's65:half', 's65:selling', 's65:shares', 's65:lender', 's65:bottom', 's66:rise', 's66:sofr', 's66:expensive', 's67:size', 's67:0', 's67:15', 's67:little', 's67:interest', 's68:very', 's68:plan', "s69:oracle's", 's69:filing', 's69:ellison',
    's69:pledged', 's69:loans', "s70:oracle's", 's70:repay', 's70:without', 's66:second', 's67:third']
const Break: React.FC<PieceProps> = ({ f, c }) => {
  const everyone = c('s59:shares'), backed = c('s60:backed'), falls = c('s60:falls'), lender = c('s60:lender'), call = c('s60:call')
  const add = c('s61:add'), pay = c('s61:pay'), two = c('s61:two'), cant = c("s62:can't"), sell62 = c('s62:sell'), warning = c('s62:warning')
  const picture = c('s63:picture'), halve = c('s63:halve'), d197 = c('s64:197'), d98 = c('s64:98'), d56 = c('s64:56'), half = c('s65:half'), selling = c('s65:selling'), bottom = c('s65:bottom')
  const shares65 = c('s65:shares'), lender65 = c('s65:lender'), second = c('s66:second'), rise = c('s66:rise'), sofr = c('s66:sofr'), expensive = c('s66:expensive')
  const third = c('s67:third'), size = c('s67:size'), d0 = c('s67:0'), d15 = c('s67:15'), little = c('s67:little'), interest = c('s67:interest'), very = c('s68:very')
  const plan68 = c('s68:plan'), oracle = c("s69:oracle's"), filing = c('s69:filing'), ellison = c('s69:ellison'), pledged = c('s69:pledged'), loans = c('s69:loans'), board = c("s70:oracle's"), repay = c('s70:repay'), without = c('s70:without')
  const A = win(f, c('s59'), picture), B = win(f, picture, rise), Cc = win(f, rise, size), D = win(f, size, filing), E = on(f, filing, 8)
  const hero: Beat[] = [[0, 'present', 'thinking'], [backed, 'explain', 'neutral'], [falls, 'pointDown', 'worried'], [call, 'phone', 'worried'], [two, 'countOne', 'neutral'], [warning, 'nervous', 'worried'],
    [picture, 'explain', 'neutral'], [halve, 'shock', 'shocked'], [half, 'facepalm', 'worried'], [second, 'countOne', 'neutral'], [rise, 'pointUp', 'worried'], [third, 'countOne', 'neutral'],
    [size, 'measure', 'neutral'], [little, 'shrug', 'neutral'], [very, 'present', 'neutral'], [oracle, 'explain', 'neutral'], [repay, 'present', 'neutral']]
  const inv: Beat[] = [[0, 'idle', 'neutral'], [falls, 'nervous', 'worried'], [call, 'phone', 'worried'], [add, 'offer', 'worried'], [sell62, 'despair', 'worried']]
  const drop = span(f, falls, falls + 24), crash = on(f, halve, 20)
  const shake = f >= call && f < call + 40 ? Math.sin(f * 2.2) * 8 : 0
  const XC = xcam(c, [["s60:first",960,540,1],["s67:save",1100,820,1.05],["s68:very",960,540,1],["s69:example",1060,640,1.06],["s70:pledged",1440,700,1.05]])
  const XA: Acc[] = [["s63:ten","calendar",1500,420,100,"s64:56"],["s67:savings","piggy-bank",1060,560,90,"s68:very"],["s67:gains","arrow-up",1280,760,90,"s68:very"]]
  return (
    <g>
      <Stage id="bk" frame={f} />
      <Headline f={f} lines={[[everyone, 'WHY NOT EVERYONE?', P.ink, 130], [call, 'A MAINTENANCE CALL', P.coralInk, 116], [c('s61:three'), '2–3 DAYS', P.coralInk, 136], [sell62, 'FORCED SALE', P.coralInk, 136],
        [picture, 'YEAR 10', P.ink, 136], [halve, 'YEAR 10: SHARES HALVE', P.coralInk, 116], [half, 'LOAN > HALF', P.coralInk, 136], [rise, 'THE RATE CAN RISE', P.ink, 124], [size, 'IT NEEDS SIZE', P.ink, 130], [oracle, 'A REAL EXAMPLE', P.goldInk, 124]]} />
      <g transform={punch(f, BEATS.map(c))}><g transform={camera(f, [...XC, [everyone, 1240, 600, 1.03], [picture, 960, 540, 1], [second, 1240, 600, 1.05], [third, 960, 540, 1], [oracle, 1240, 620, 1.04]])}>
        {/* # A: a crowd wonders; the shares are chained to the lender; the price falls (the stack sinks); a phone rings; she adds cash or pays down; a calendar of 3 days;
            # if she can't, the lender takes certificates away */}
        <g opacity={A}>
          <g opacity={on(f, everyone, 6) * (1 - on(f, backed, 8))}>{['buyer', 'worker', 'owner'].map((w, k) => <g key={w}><Pedestal x={1000 + k * 280} y={1000} r={100} /><Person f={f} who={w} beats={[[0, 'scratchHead', 'thinking']]} x={1000 + k * 280} y={1000} s={0.75} /></g>)}
            <At f={f} at={everyone} x={1280} y={460}><Prop id="question" x={0} y={0} size={140} f={f} /></At></g>
          <g opacity={on(f, backed, 6)}>
            <ellipse cx={960} cy={820} rx={150} ry={260} fill="#F7FAFF" opacity={0.10} /><Person f={f} who="investor" beats={inv} x={960} y={1040} s={1.0} />
            <Stack x={1320} y={1000} n={lerp(12, 6, drop) - (f >= sell62 ? on(f, sell62, 20) * 3 : 0)} basis={1} />
            <At f={f} at={falls} x={1320} y={520}><Prop id="arrow-down" x={0} y={0} size={140} f={f} /></At>
            <g opacity={on(f, lender, 6)}><Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [call, 'phone', 'angry'], [sell62, 'carry', 'neutral']]} x={1720} y={1040} s={0.95} /><Chain a={[1450, 900]} b={[1640, 880]} t={1} /></g>
            <At f={f} at={call} x={1120 + shake} y={560}><Prop id="phone" x={0} y={0} size={130} f={f} /></At>
            <g opacity={on(f, add, 6) * (1 - on(f, cant, 8))}>{(() => { const k = fly(f, add + 2, [1060, 800], [1320, 760], 18, 90); return k.o > 0 ? <g opacity={k.o} transform={`translate(${k.x} ${k.y})`}><Prop id="cash-stack" x={0} y={0} size={110} f={f} /></g> : null })()}
              <Tag f={f} at={pay} x={1540} y={700} text="PAY DOWN" size={48} color={P.ink2} /></g>
            <g opacity={on(f, two, 6) * (1 - on(f, cant, 8))}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, two + k * 5, 4)}><Prop id="calendar" x={1460 + k * 110} y={330} size={80} f={f} /></g>)}</g>
            {[0, 1, 2].map((k) => { const p = fly(f, sell62 + k * 5, [1320, 860 - k * 26], [1840, 900], 18, 120); return p.o > 0 ? <g key={k} opacity={p.o} transform={`translate(${p.x} ${p.y})`}><rect x={-110} y={-22} width={220} height={44} rx={8} fill="#F7F1E1" stroke="#C9B27A" strokeWidth={3} /></g> : null })}
            <At f={f} at={warning} x={1580} y={520}><Prop id="warning" x={0} y={0} size={120} f={f} /></At>
          </g>
        </g>
        {/* # B: year ten — the $19.7M bar cracks and halves to $9.8M; the $5.6M loan stays; a half line shows the loan above it; certificates sold at the bottom */}
        <g opacity={B}>
          <Bar x={1160} y={1000} h={lerp(19.7, 9.84, crash) * PX} color={P.gold} value={f >= d98 ? '$9.8M' : f >= d197 ? '$19.7M' : ''} label="HER SHARES" o={on(f, picture, 6)} />
          <At f={f} at={halve} x={1160} y={1000 - lerp(19.7, 9.84, crash) * PX + 120}><Prop id="cracks" x={0} y={0} size={120} f={f} /></At>
          <g opacity={on(f, d56, 6)}><Bar x={1500} y={1000} h={on(f, d56, 14) * 5.59 * PX} color={P.coral} value="$5.6M" label="LOAN" /></g>
          <g opacity={on(f, half, 6)}><path d={`M1040 ${1000 - 4.92 * PX} L1610 ${1000 - 4.92 * PX}`} stroke={P.ink} strokeWidth={5} strokeDasharray="12 10" /><Tag f={f} at={half} x={990} y={1000 - 4.92 * PX + 14} text="HALF" size={48} /></g>
          {[0, 1, 2].map((k) => { const p = fly(f, selling + k * 6, [1160, 1000 - 9.8 * PX], [1720, 500], 20, 100); return p.o > 0 ? <g key={k} opacity={p.o} transform={`translate(${p.x} ${p.y})`}><rect x={-80} y={-18} width={160} height={36} rx={8} fill={P.gold} /></g> : null })}
          <g opacity={on(f, shares65, 6) * (1 - on(f, selling, 8))}><rect x={1050} y={1000 - 9.84 * PX - 20} width={220} height={9.84 * PX + 20} rx={16} fill="none" stroke={P.goldInk} strokeWidth={6} /></g>
          <At f={f} at={lender65} x={1720} y={440}><Prop id="bank" x={0} y={0} size={130} f={f} /></At>
          <g opacity={on(f, picture, 8)}><ellipse cx={1730} cy={820} rx={140} ry={240} fill="#F7FAFF" opacity={0.10} /><Person f={f} who="investor" beats={[[0, 'idle', 'neutral'], [halve, 'shock', 'shocked'], [d98, 'despair', 'worried'], [half, 'facepalm', 'worried'], [selling, 'runA', 'worried', 'runB', 10], [bottom, 'slump', 'worried']]} x={1730} y={1040} s={0.8} /></g>
          <At f={f} at={bottom} x={1640} y={640}><Prop id="arrow-down" x={0} y={0} size={130} f={f} /></At>
        </g>
        {/* # C: the rate — a percent sign on a rising thermometer, tied to SOFR; the loan bill grows */}
        <g opacity={Cc}>
          <At f={f} at={rise} x={1160} y={640}><Prop id="thermometer" x={0} y={0} size={280} f={f} /></At>
          <At f={f} at={sofr} x={1480} y={560}><Prop id="interest-percent" x={0} y={0} size={170} f={f} /></At><Tag f={f} at={sofr} x={1480} y={700} text="SOFR" size={56} />
          <At f={f} at={expensive} x={1720} y={820}><Prop id="bills-stack" x={0} y={0} size={170} f={f} /></At>
        </g>
        {/* # D: a small stack (0% / 15% tags, a tiny coin saved, interest coins leaking) next to a giant stack wearing a crown */}
        <g opacity={D}>
          <At f={f} at={size} x={1060} y={1000}><Stack x={0} y={0} n={3} s={0.8} basis={1} /></At>
          <Person f={f} who="worker" beats={[[0, 'idle', 'neutral'], [d0, 'countOne', 'neutral'], [little, 'emptyPockets', 'worried'], [interest, 'shrug', 'neutral']]} x={830} y={1040} s={0.8} o={on(f, size, 8)} />
          <Tag f={f} at={d0} x={960} y={760} text="0%" size={60} color={P.mintInk} /><Tag f={f} at={d15} x={1160} y={760} text="15%" size={60} color={P.skyInk} />
          <At f={f} at={plan68} x={1320} y={560}><Prop id="contract" x={0} y={0} size={110} f={f} /></At>
          <At f={f} at={little} x={1060} y={620}><Prop id="coin" x={0} y={0} size={70} f={f} /></At>
          <g opacity={on(f, interest, 6)}>{[0, 1, 2].map((k) => { const p = fly(f, interest + k * 8, [1060, 900], [1300, 1000], 18, 60); return p.o > 0 ? <g key={k} opacity={p.o} transform={`translate(${p.x} ${p.y})`}><Pile x={0} y={0} n={1} s={0.6} /></g> : null })}</g>
          <g opacity={on(f, very, 6)}><Stack x={1580} y={1000} n={on(f, very, 20) * 20} s={0.9} gap={24} /><At f={f} at={very} x={1580} y={420}><Prop id="crown" x={0} y={0} size={140} f={f} /></At></g>
        </g>
        {/* # E: Oracle's proxy filing; Ellison's Oracle shares with a padlock (pledged) secure personal loans; the board: he can repay without selling (tick) */}
        <g opacity={E}>
          <At f={f} at={filing} x={1060} y={640}><Doc x={0} y={0} s={0.9} title="PROXY" lines={4} /></At>
          <Tag f={f} at={oracle} x={1060} y={860} text="ORACLE" size={56} />
          <g opacity={on(f, ellison, 6)}><Stack x={1440} y={1000} n={12} s={0.9} /><Tag f={f} at={ellison} x={1440} y={640} text="ELLISON'S SHARES" size={46} /></g>
          <At f={f} at={pledged} x={1440} y={480}><Prop id="padlock" x={0} y={0} size={90} f={f} /></At>
          <At f={f} at={loans} x={1700} y={720}><Prop id="contract" x={0} y={0} size={130} f={f} /></At><Tag f={f} at={loans} x={1700} y={850} text="PERSONAL LOANS" size={44} />
          <At f={f} at={board} x={1060} y={400} s={0.8}><Prop id="handshake" x={0} y={0} size={120} f={f} /></At>
          <At f={f} at={without} x={1700} y={480}><Prop id="tick" x={0} y={0} size={100} f={f} /></At>
        </g>
        <Accents f={f} c={c} list={XA} Prop={Prop} />
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g></g>
      <Vignette id="bk" />
    </g>
  )
}

export const BB_BREAK = makePiece('bb-break', 'Long: risks — maintenance call (2–3 days, forced sale); year-10 halving ≈ $19.7M → $9.8M vs $5.6M loan; SOFR-linked rate; needs size (0%/15% gains); Oracle proxy: Ellison pledged shares', { mood: 'dark', Component: Break,
  beats: BEATS,
  sfx: [['s60:call', 'tick', 0.5], ['s62:sell', 'swish', 0.4], ['s63:halve', 'crack', 0.5], ['s65:bottom', 'thud', 0.4], ['s66:rise', 'riser', 0.3], ['s69:pledged', 'click', 0.4]] })
