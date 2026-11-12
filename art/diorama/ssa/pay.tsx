// ---------------------------------------------------------------- s7–s15: step one, what Rosa pays (morning light).
// A) Rosa and her boss each feed a capsule tube (6.2% + 6.2%) that join into one big tube: 12.4%. Two stamp tallies:
//    $3,224 + $3,224 = $6,448 A YEAR. B) self-employed: Rosa alone feeds both tubes. C) a punch card of 40 credit holes
//    (10 rows of 4): one credit per $1,970, up to four a year → about TEN YEARS. D) the pay limit: a long pay bar with a
//    brass gate at $192,300; a $400,000 earner's bar is taxed only up to the gate: $11,922.60, nothing above.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PostWorld, Vig, Stamp, Tube, Capsule, Envelope, Life, FLOOR, TXT, CREAM, INK, RED, NAVY, BRASS, BRASS2, GREEN, GOLD, DEEPT, PLUM, WOOD2, MARBLE } from './kit'

const Pay: React.FC<PieceProps> = ({ f, c }) => {
  const every = c('s7:every'), d62 = c('s7:62')
  const employer = c('s8:employer'), d62b = c('s8:62'), together = c('s8:together'), d124 = c('s8:124')
  const d52 = c('s9:52000'), d3224 = c('s9:3224'), d3224b = c('s9:3224#2'), boss = c('s9:boss')
  const d6448 = c('s10:6448'), worker = c('s10:worker')
  const herself = c('s11:herself'), both = c('s11:both'), full = c('s11:full')
  const qualify = c('s12:qualify'), d40 = c('s12:40'), d1970 = c('s12:1970'), four = c('s12:four'), ten = c('s12:ten')
  const twist = c('s13:twist'), limit = c('s13:limit'), d1923 = c('s13:192300')
  const d400 = c('s14:400000'), first = c('s14:first'), d11922 = c('s14:11922'), rest = c('s14:rest')
  const job = c('s15:job'), question = c('s15:question'), go = c('s15:go')

  const A = 1 - on(f, herself - 10, 8), B = win(f, herself - 2, qualify - 2, 8), Cc = win(f, qualify - 2, twist - 2, 8), D = on(f, twist - 2, 8)
  const rosa: Beat[] = [[every, 'offer', 'smiling'], [d3224, 'present', 'smiling'], [herself, 'confident', 'smiling'], [both, 'offer', 'smiling'], [qualify, 'think', 'thinking'], [ten, 'thumbsUp', 'smiling']]
  const bossB: Beat[] = [[employer, 'offer', 'smiling'], [boss, 'present', 'smiling']]
  const holes = Math.round(40 * on(f, d1970, 60))
  const X = (v: number) => 300 + v / 400000 * 1320               // pay bar scale: 400,000 = 1,320 px

  return (
    <g>
      <PostWorld f={f} id="ss-pay" tone="warm" />
      {/* # A) two tubes join into one */}
      {A > 0.001 && <g opacity={A}>
        <Person f={f} who="investorF" beats={rosa} x={300} y={FLOOR + 60} s={0.74} />
        <Tube pts={[[420, 640], [820, 640], [960, 520]]} f={f} flow={on(f, every, 6)} n={3} />
        <g opacity={on(f, employer, 8)}>
          <Person f={f} who="investor" beats={bossB} x={1640} y={FLOOR + 60} s={0.74} flip />
          <Tube pts={[[1520, 640], [1100, 640], [960, 520]]} f={f} flow={on(f, employer + 4, 6)} n={3} />
        </g>
        <g opacity={on(f, together, 8)}><Tube pts={[[960, 520], [960, 90]]} f={f} flow={1} n={4} rate={2} w={56} /></g>
        <g opacity={on(f, d62, 8)}><Stamp x={560} y={560} t="ROSA 6.2%" size={44} col={CREAM} /></g>
        <g opacity={on(f, d62b, 8)}><Stamp x={1360} y={560} t="EMPLOYER 6.2%" size={44} col={CREAM} /></g>
        <g opacity={on(f, d124, 8)} transform={`translate(1240 330) scale(${pop(f, d124, 12)})`}><Stamp x={0} y={0} t="= 12.4% OF HER PAY" size={56} col={GREEN} tc={CREAM} /></g>
        {/* the yearly tallies */}
        <g opacity={on(f, d3224, 8)}><Stamp x={560} y={790} t="$3,224 A YEAR" size={44} col={GOLD} /></g>
        <g opacity={on(f, d3224b, 8)}><Stamp x={1360} y={790} t="$3,224 A YEAR" size={44} col={GOLD} /></g>
        <g opacity={on(f, d6448, 8)} transform={`translate(680 330) scale(${pop(f, d6448, 12)})`}><Stamp x={0} y={0} t="$6,448 A YEAR IN" size={56} col={RED} tc={CREAM} /></g>
        <g opacity={on(f, d52, 8) * (1 - on(f, d6448, 8))}><Stamp x={680} y={330} t="ON $52,000" size={50} col={CREAM} /></g>
      </g>}
      {/* # B) self-employed: both halves */}
      {B > 0.001 && <g opacity={B}>
        <Person f={f} who="investorF" beats={rosa} x={560} y={FLOOR + 60} s={0.78} />
        <Tube pts={[[700, 600], [960, 600], [960, 90]]} f={f} flow={1} n={4} rate={1.5} />
        <Tube pts={[[700, 720], [1080, 720], [1080, 90]]} f={f} flow={on(f, both, 8)} n={4} rate={1.5} />
        <g opacity={on(f, herself, 8)}><Stamp x={1460} y={420} t="WORKS FOR HERSELF" size={50} col={CREAM} /></g>
        <g opacity={on(f, full, 8)}><Stamp x={1460} y={560} t="PAYS THE FULL 12.4%" size={50} col={RED} tc={CREAM} /></g>
      </g>}
      {/* # C) the credit punch card */}
      {Cc > 0.001 && <g opacity={Cc}>
        <Person f={f} who="investorF" beats={rosa} x={360} y={FLOOR + 60} s={0.74} />
        <g transform="translate(1020 560)">
          <rect x={-330} y={-300} width={660} height={560} rx={16} fill="rgba(20,30,30,0.22)" transform="translate(10 12)" />
          <rect x={-330} y={-300} width={660} height={560} rx={16} fill={CREAM} stroke={INK} strokeWidth={4} />
          <rect x={-330} y={-300} width={660} height={70} rx={14} fill={NAVY} /><text y={-252} textAnchor="middle" fill={CREAM} style={TXT(42)}>{f >= d40 ? '40 WORK CREDITS' : 'WORK CREDITS'}</text>
          {Array.from({ length: 40 }, (_, k) => { const col = k % 4, row = Math.floor(k / 4); const x = -250 + col * 110 + (col > 1 ? 30 : 0), y = -190 + row * 42
            return <g key={k}><circle cx={x} cy={y} r={14} fill={k < holes ? GREEN : '#E3D9C4'} stroke={INK} strokeWidth={2} />{col === 0 && <text x={x - 50} y={y + 9} textAnchor="middle" fill={INK} style={TXT(22)} opacity={on(f, four, 8)}>{`Y${row + 1}`}</text>}</g> })}
        </g>
        <g opacity={on(f, d1970, 8)}><Stamp x={1560} y={330} t="1 CREDIT = $1,970" size={44} col={GOLD} /></g>
        <g opacity={on(f, four, 8)}><Stamp x={1560} y={440} t="UP TO 4 A YEAR" size={40} col={CREAM} /></g>
        <g opacity={on(f, ten, 8)}><Stamp x={1560} y={560} t="≈ 10 YEARS OF WORK" size={44} col={GREEN} tc={CREAM} /></g>
      </g>}
      {/* # D) the pay limit */}
      {D > 0.001 && <g opacity={D}>
        <g opacity={1 - on(f, job - 10, 8)}>
        <g opacity={on(f, limit, 8)}>
          {/* the gate at 192,300 */}
          <g transform={`translate(${X(192300)} 0)`}><rect x={-8} y={380} width={16} height={460} fill={BRASS2} /><rect x={-60} y={360} width={120} height={30} rx={6} fill={BRASS} /></g>
          <g opacity={on(f, d1923, 8)}><Stamp x={X(192300)} y={330} t="$192,300 LIMIT (2027)" size={44} col={GOLD} /></g>
        </g>
        {/* Rosa's bar */}
        <g opacity={on(f, twist, 8) * (1 - on(f, d400 - 6, 8))}>
          <rect x={300} y={520} width={X(52000) - 300} height={70} rx={10} fill={GREEN} /><text x={320} y={500} fill={INK} style={TXT(40)}>ROSA $52,000 · ALL TAXED</text>
        </g>
        {/* the $400,000 earner */}
        <g opacity={on(f, d400, 8)}>
          <rect x={300} y={520} width={(X(400000) - 300) * on(f, d400, 24)} height={70} rx={10} fill="#B9C0CA" />
          <rect x={300} y={520} width={(Math.min(X(192300), lerp(300, X(400000), on(f, d400, 24))) - 300)} height={70} rx={10} fill={GREEN} />
          <text x={320} y={500} fill={INK} style={TXT(40)}>$400,000 OF PAY</text>
          <g opacity={on(f, first, 8)}><text x={(300 + X(192300)) / 2} y={568} textAnchor="middle" fill={CREAM} style={TXT(40)}>TAXED</text></g>
          <g opacity={on(f, rest, 8)}><text x={(X(192300) + X(400000)) / 2} y={568} textAnchor="middle" fill={INK} style={TXT(40)}>NOT TAXED</text></g>
          <g opacity={on(f, d11922, 8)}><Stamp x={(300 + X(192300)) / 2} y={720} t="MAX $11,922.60" size={50} col={RED} tc={CREAM} /></g>
        </g>
        </g>
        {/* where does it go? a tube disappears into the wall */}
        <g opacity={on(f, job - 2, 8)}>
          <Tube pts={[[300, 800], [1500, 800], [1500, 420], [1920, 420]]} f={f} flow={1} n={6} rate={1.5} o={1} w={34} />
          <g opacity={on(f, question, 8)}><Stamp x={1500} y={330} t="WHERE DOES IT GO?" size={50} col={NAVY} tc={CREAM} /></g>
        </g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={worker} x={960} y={400} kind="glint" />
        <Life f={f} at={go} x={1700} y={420} kind="spark" />
        <Life f={f} at={c("s7:security")} x={960} y={500} kind="glint" />
        <Life f={f} at={c("s9:rosa")} x={960} y={500} kind="glint" />
        <Life f={f} at={c("s10:going")} x={960} y={500} kind="glint" />
        <Life f={f} at={c("s11:percent")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s12:in")} x={1020} y={560} kind="glint" />
        <Life f={f} at={c("s12:one")} x={1020} y={560} kind="glint" />
        <Life f={f} at={c("s13:stops")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s13:2027")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s13:taxed")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s14:192300")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s14:cents")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s15:single")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s15:pays")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s15:working")} x={960} y={560} kind="glint" />
        <Life f={f} at={c("s15:does")} x={960} y={560} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="ss-pay" />
      <Headline f={f} lines={[[every, 'WHAT ROSA PAYS', INK, 92], [herself, 'IF SHE WORKS FOR HERSELF', INK, 88], [qualify, 'TO QUALIFY', INK, 92], [twist, 'ONE TWIST: THE LIMIT', INK, 92]]} />
    </g>
  )
}

export const SS_PAY = makePiece('ss-pay', 'Step one in warm post-office light: Rosa and her boss each push brass capsules into pneumatic tubes (ROSA 6.2%, EMPLOYER 6.2%) that join into one wide tube going up (= 12.4% OF HER PAY), with tallies $3,224 A YEAR each and $6,448 A YEAR IN (ON $52,000); then Rosa alone feeds two tubes (WORKS FOR HERSELF · PAYS THE FULL 12.4%); a big cream punch card of 40 credit holes in rows of four fills up green (1 CREDIT = $1,970 · UP TO 4 A YEAR · ≈ 10 YEARS OF WORK); then a brass gate stands at $192,300 LIMIT (2027) on a long pay bar: Rosa\'s $52,000 bar is all taxed, while a $400,000 bar is green only up to the gate (TAXED) and grey after it (NOT TAXED) — MAX $11,922.60; finally a tube runs along the counter and vanishes into the wall: WHERE DOES IT GO?', {
  mood: 'light', Component: Pay,
  beats: ["s7:every", "s7:62", "s8:employer", "s8:62", "s8:together", "s8:124", "s9:52000", "s9:3224", "s9:3224#2", "s9:boss", "s10:6448", "s10:worker", "s11:herself", "s11:both", "s11:full", "s12:qualify", "s12:40", "s12:1970", "s12:four", "s12:ten", "s13:twist", "s13:limit", "s13:192300", "s14:400000", "s14:first", "s14:11922", "s14:rest", "s15:job", "s15:question", "s15:go", "s7:security", "s9:rosa", "s10:going", "s11:percent", "s12:in", "s12:one", "s13:stops", "s13:2027", "s13:taxed", "s14:192300", "s14:cents", "s15:single", "s15:pays", "s15:working", "s15:does"],
  sfx: [['s8:124', 'pop', 0.08], ['s10:6448', 'coin', 0.1], ['s13:limit', 'thud', 0.08]] })
