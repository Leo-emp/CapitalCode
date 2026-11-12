// ---------------------------------------------------------------- s1–s7: same loan, different price — because of one number.
// A) Two identical homes, a borrower beside each: $250,000 · 30 years. FICO's Aug-2025 averages: a green $1,654 bill over one,
//    a red $1,823 over the other; between the houses two interest columns grow, $345K and $406K, the gap glows: +$61K.
//    Above the two people their score bands appear: 760–850 and 620–639.
// B) The score meter: 300 to 850, needle hidden behind "???". It slides aside; the formula machine opens up, a credit report
//    slides in, a cross marks what does NOT go in; the needle swings up, then down.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, House, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Backdrop, Note } from '../econ/kit'
import { Machine, Meter, NoCross, Report, GREEN, RED, TXT, INK } from './kit'

const GROUND = 930
const Bill: React.FC<{ x: number; y: number; t: string; col: string; o: number; s?: number }> = ({ x, y, t, col, o, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-60} width={300} height={120} rx={16} fill={col} />
    <text y={10} textAnchor="middle" fill="#FFFFFF" style={TXT(70)}>{t}</text>
    <text y={46} textAnchor="middle" fill="#FFFFFF" opacity={0.85} style={TXT(30)}>A MONTH</text>
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const two = c('s1:two'), d250 = c('s1:250000'), years = c('s1:30'), home = c('s1:home')
  const averages = c('s2:averages'), p1654 = c('s2:1654'), other = c('s2:other'), p1823 = c('s2:1823')
  const whole = c('s3:whole'), second = c('s3:second'), p61 = c('s3:61000'), interest = c('s3:interest')
  const difference = c('s4:difference'), three = c('s4:threedigit')
  const called = c('s5:called'), score = c('s5:score'), most = c('s5:most'), worked = c('s5:worked')
  const open = c('s6:open'), who = c('s6:who'), goes = c('s6:goes'), doesnt = c("s6:doesn't")
  const step = c('s7:step'), up = c('s7:up'), down = c('s7:down')

  const A = win(f, 0, called - 4), B = on(f, called - 4, 10)
  const colH = (v: number, at: number) => v * 0.8 * on(f, at, 30)
  const needle = f >= down ? lerp(780, 520, on(f, down, 18)) : f >= up ? lerp(575, 780, on(f, up, 18)) : 575
  const aside = on(f, open, 20)
  const p1: Beat[] = [[two, 'idle', 'smiling'], [p1654, 'present', 'smiling'], [difference, 'idle', 'smiling']]
  const p2: Beat[] = [[two, 'idle', 'neutral'], [p1823, 'shock', 'shocked'], [p61, 'facepalm', 'worried'], [difference, 'idle', 'thinking']]
  return (
    <g>
      <Stage id="cs-hook" frame={f} />
      <Backdrop f={f} o={A} />
      <Headline f={f} lines={[[d250, '$250,000 · 30 YEARS · SAME HOME', P.ink, 80], [averages, "FICO'S NATIONAL AVERAGES, AUG 2025", P.ink, 64], [called, 'YOUR CREDIT SCORE', P.ink, 100]]} />
      <Ground y={GROUND} />

      {/* # A) the same loan, two prices */}
      {A > 0 && <g opacity={A}>
        {[480, 1440].map((x, k) => <g key={k} opacity={on(f, home - 8 + k * 6, 10)} transform={`translate(0 ${30 * (1 - pop(f, home - 8 + k * 6, 14))})`}><House x={x} y={GROUND} s={0.9} big={0.6} color={k ? '#7FA8D8' : '#E9C25A'} /></g>)}
        <Person f={f} who="buyer" beats={p1} x={190} y={GROUND} s={0.9} />
        <Person f={f} who="investorF" beats={p2} x={1730} y={GROUND} s={0.9} flip />
        <Bill x={480} y={350} t="$1,654" col={GREEN} o={on(f, p1654, 8)} s={pop(f, p1654, 12)} />
        <Bill x={1440} y={350} t="$1,823" col={RED} o={on(f, p1823, 8)} s={pop(f, p1823, 12)} />
        {/* interest over the whole loan, $ thousands */}
        <g opacity={on(f, whole, 10)}>
          <rect x={820} y={GROUND - colH(345, whole)} width={120} height={colH(345, whole)} rx={10} fill={GREEN} />
          <rect x={980} y={GROUND - colH(406, second)} width={120} height={colH(406, second)} rx={10} fill={RED} />
          <rect x={980} y={GROUND - colH(406, second)} width={120} height={0.8 * 61 * on(f, p61, 14)} rx={10} fill="#FFE48A" opacity={0.8} />
          <text x={880} y={GROUND - colH(345, whole) - 20} textAnchor="middle" fill={INK} style={TXT(44)}>$345K</text>
          <g opacity={on(f, second, 8)}><text x={1040} y={GROUND - colH(406, second) - 20} textAnchor="middle" fill={INK} style={TXT(44)}>$406K</text></g>
          <g opacity={on(f, p61, 8)} transform={`translate(960 ${GROUND - 470}) scale(${pop(f, p61, 12)})`}><rect x={-120} y={-44} width={240} height={80} rx={14} fill={RED} /><text y={18} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>+$61,000</text></g>
          <g opacity={on(f, interest, 8)}><Label x={960} y={GROUND + 55} text="TOTAL INTEREST" size={40} font="Bebas Neue" color={P.ink2} /></g>
        </g>
        {/* the three-digit difference */}
        <g opacity={on(f, three, 8)}>
          <g transform={`translate(190 ${300 - 10 * pop(f, three, 12)})`}><rect x={-110} y={-44} width={220} height={84} rx={14} fill="#FFFFFF" stroke={GREEN} strokeWidth={6} /><text y={18} textAnchor="middle" fill={GREEN} style={TXT(56)}>760–850</text></g>
          <g transform={`translate(1730 ${300 - 10 * pop(f, three + 4, 12)})`}><rect x={-110} y={-44} width={220} height={84} rx={14} fill="#FFFFFF" stroke={RED} strokeWidth={6} /><text y={18} textAnchor="middle" fill={RED} style={TXT(56)}>620–639</text></g>
        </g>
        <g opacity={on(f, years, 8) * (1 - on(f, averages, 8))}><Label x={960} y={600} text="SAME LOAN" size={80} font="Bebas Neue" color={P.ink} /></g>
      </g>}

      {/* # B) the meter, and what's inside */}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(${-380 * aside} 0)`}>
          <Meter x={960} y={GROUND - 120} s={1.05 * (0.9 + 0.1 * pop(f, score, 14))} v={needle} bands={on(f, most, 16)} />
          <g opacity={1 - on(f, open, 8)}><Label x={960} y={GROUND - 520} text="???" size={120} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, worked, 8) * (1 - aside)}><Label x={960} y={GROUND - 20} text="HOW IS IT WORKED OUT?" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={aside}>
          <Machine x={1420} y={GROUND} s={0.95} f={f} run={on(f, who, 10)} screen={f >= goes ? '...' : ''} />
          <g opacity={on(f, goes, 8)}><Report x={lerp(900, 1100, on(f, goes, 20))} y={560} s={0.5} r={-8} marks={[1, 1, 1, 0, 1, 1]} o={1 - on(f, goes + 30, 10)} /></g>
          <g opacity={on(f, doesnt, 8)}><Note x={1780} y={440} t="PAY" s={0.8} /><NoCross x={1780} y={440} s={0.8} /></g>
        </g>
        <g opacity={on(f, step, 8)}><Label x={580} y={330} text={f >= down ? 'DOWN' : 'UP'} size={70} font="Bebas Neue" color={f >= down ? RED : GREEN} /></g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s1:250000")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s2:fico's")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s2:2025")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s2:dollars")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s3:over")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s5:very")} x={960} y={700} rx={230} ry={200} />
        <Spot f={f} at={c("s7:actually")} x={960} y={700} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="cs-hook" />
    </g>
  )
}

export const CS_HOOK = makePiece('cs-hook', 'Hook: two identical homes with a borrower beside each — $250,000 over 30 years; FICO\'s August-2025 averages put a green $1,654 monthly bill over one and a red $1,823 bill over the other; between the houses two interest columns grow to $345K and $406K and the gap glows +$61,000; score bands 760–850 and 620–639 appear over the two people; then a big credit-score meter from 300 to 850 hiding its needle behind ???, it slides aside as a formula machine opens and a credit report slides in, a cross marks what does not go in, and the needle swings up and down.', {
  mood: 'light', Component: Hook,
  beats: ["s1:two", "s1:30", "s1:home", "s2:averages", "s2:1654", "s2:other", "s2:1823", "s3:whole", "s3:second", "s3:61000", "s3:interest", "s4:difference", "s4:threedigit", "s5:called", "s5:score", "s5:most", "s5:worked", "s6:open", "s6:who", "s6:goes", "s6:doesn't", "s7:step", "s7:up", "s7:down", "s1:250000", "s2:fico's", "s2:2025", "s2:dollars", "s3:over", "s5:very", "s7:actually"],
  sfx: [['s2:1654', 'pop', 0.12], ['s2:1823', 'pop', 0.12], ['s3:61000', 'thud', 0.15], ['s5:score', 'chime', 0.15]] })
