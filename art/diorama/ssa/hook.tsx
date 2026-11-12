// ---------------------------------------------------------------- s1–s6: the hook in the old post office.
// A) a big paycheck stub on the counter; its SOCIAL SECURITY line lights (−6.2%) and a capsule shoots up a brass tube;
//    a newspaper on a stand asks GOING BROKE? and an empty mailbox gets a question mark. B) a deposit drawer labelled ROSA
//    slides out — empty — and gets a cross (no account with your name on it). C) Rosa at the counter: ROSA, 30 ·
//    $52,000 A YEAR; a capsule leaves her paycheck. D) a sheet of five postage stamps, one per step, lighting as named.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PostWorld, Vig, Stamp, Cross, Tube, Capsule, Mailbox, Life, FLOOR, TXT, CREAM, INK, RED, NAVY, BRASS, BRASS2, GREEN, GOLD, DEEPT, PLUM, WOOD2 } from './kit'

const Stub: React.FC<{ x: number; y: number; lit: number; s?: number }> = ({ x, y, lit, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-260} y={-330} width={520} height={330} rx={10} fill="rgba(20,30,30,0.22)" transform="translate(10 12)" />
    <rect x={-260} y={-330} width={520} height={330} rx={10} fill={CREAM} stroke={INK} strokeWidth={4} />
    <rect x={-260} y={-330} width={520} height={60} rx={8} fill={GREEN} /><text y={-288} textAnchor="middle" fill={CREAM} style={TXT(40)}>PAYCHECK</text>
    {['GROSS PAY', 'SOCIAL SECURITY', 'MEDICARE', 'INCOME TAX'].map((t, k) => <g key={k} transform={`translate(0 ${-220 + k * 56})`}>
      {k === 1 && <rect x={-240} y={-34} width={480} height={48} rx={6} fill={GOLD} opacity={0.3 + 0.7 * lit} />}
      <text x={-220} y={0} fill={INK} style={TXT(36)}>{t}</text><rect x={90} y={-14} width={120} height={10} rx={5} fill="#B9AE98" />
    </g>)}
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const line = c('s1:line'), ss = c('s1:security'), d62 = c('s1:62'), disappears = c('s1:disappears')
  const broke = c('s2:broke'), again = c('s2:again')
  const retirement = c('s3:retirement'), differently = c('s3:differently')
  const account = c('s4:account'), name = c('s4:name'), isnt = c("s4:isn't"), everything = c('s4:everything')
  const rosa = c('s5:rosa'), d30 = c('s5:30'), d52 = c('s5:52000'), paycheck = c('s5:paycheck')
  const five = c('s6:five'), pays = c('s6:pays'), goes = c('s6:goes'), check = c('s6:check'), claim = c('s6:claim'), y2034 = c('s6:2034')

  const A = 1 - on(f, retirement - 10, 8), B = win(f, retirement - 2, rosa - 2, 8), Cc = win(f, rosa - 2, five - 2, 8), D = on(f, five - 2, 8)
  const rosaB: Beat[] = [[rosa, 'waveA', 'smiling', 'waveB', 10], [d52, 'present', 'smiling'], [paycheck, 'offer', 'smiling']]
  const drawer = on(f, account, 20)
  const steps = [pays, goes, check, claim, y2034], names = ['WHAT SHE PAYS', 'WHERE IT GOES', 'HER CHECK', 'WHEN TO CLAIM', '2034']

  return (
    <g>
      <PostWorld f={f} id="ss-hook" tone="day" />
      {/* # A) the paycheck, the tube, the worry */}
      {A > 0.001 && <g opacity={A}>
        <Stub x={700} y={FLOOR} lit={on(f, ss, 8)} s={1.1} />
        <g opacity={on(f, d62, 8)}><Stamp x={700} y={330} t="−6.2% EVERY PAYDAY" size={50} col={RED} tc={CREAM} /></g>
        <Tube pts={[[1000, 560], [1180, 560], [1180, 90]]} f={f} flow={on(f, disappears, 8)} n={4} rate={2} o={on(f, ss, 10)} />
        <g opacity={on(f, broke, 8)} transform={`translate(1520 ${FLOOR})`}>
          <rect x={-10} y={-200} width={20} height={200} fill={WOOD2} />
          <rect x={-170} y={-470} width={340} height={280} fill={CREAM} stroke={INK} strokeWidth={4} transform="rotate(-3)" />
          <text x={0} y={-400} textAnchor="middle" fill={INK} style={TXT(70)} transform="rotate(-3)">GOING BROKE?</text>
          {[0, 1, 2, 3].map((k) => <rect key={k} x={-140} y={-360 + k * 34} width={k % 2 ? 200 : 280} height={14} rx={7} fill="#B9AE98" transform="rotate(-3)" />)}
        </g>
        <g opacity={on(f, again, 8)}><Mailbox x={1260} y={FLOOR} s={0.9} /><text x={1260} y={FLOOR - 300} textAnchor="middle" fill={RED} style={TXT(110)}>?</text></g>
      </g>}
      {/* # B) no account with your name on it */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={on(f, differently, 8) * (1 - on(f, account - 4, 8))}><Stamp x={960} y={500} t="IT WORKS DIFFERENTLY" size={56} col={CREAM} /></g>
        <g opacity={on(f, account, 8)} transform={`translate(960 ${FLOOR - 120})`}>
          <rect x={-380} y={-300} width={760} height={300} rx={10} fill="#8E96A3" stroke="#5A616C" strokeWidth={8} />
          {[0, 1, 2].map((r) => [0, 1, 2, 3].map((k) => <rect key={`${r}${k}`} x={-360 + k * 182} y={-284 + r * 96} width={168} height={80} rx={6} fill="#B9C0CA" stroke="#5A616C" strokeWidth={3} />))}
          <g transform={`translate(0 ${80 * drawer})`}><rect x={-190} y={-180} width={196} height={110} rx={8} fill="#D8DDE3" stroke={INK} strokeWidth={4} /><g opacity={on(f, name, 8)}><rect x={-150} y={-150} width={116} height={40} fill={CREAM} stroke={INK} strokeWidth={2} /><text x={-92} y={-120} textAnchor="middle" fill={INK} style={TXT(32)}>ROSA</text></g></g>
          <g opacity={on(f, isnt, 8)}><Cross x={-92} y={-45} s={0.9} /></g>
        </g>
        <g opacity={on(f, isnt, 8)}><Stamp x={960} y={330} t="NO ACCOUNT WITH YOUR NAME" size={50} col={RED} tc={CREAM} /></g>
        <g opacity={on(f, everything, 8)}><Life f={f} at={everything} x={1200} y={560} kind="spark" /></g>
      </g>}
      {/* # C) Rosa */}
      {Cc > 0.001 && <g opacity={Cc}>
        <Person f={f} who="investorF" beats={rosaB} x={620} y={FLOOR + 60} s={0.82} />
        <g opacity={on(f, d30, 8)}><Stamp x={1240} y={400} t="ROSA, 30" size={64} col={NAVY} tc={CREAM} /></g>
        <g opacity={on(f, d52, 8)}><Stamp x={1240} y={540} t="$52,000 A YEAR" size={54} col={GOLD} /></g>
        <Tube pts={[[860, 700], [1640, 700], [1640, 90]]} f={f} flow={on(f, paycheck, 8)} n={5} rate={1.5} o={on(f, paycheck - 6, 10)} />
      </g>}
      {/* # D) five steps as a sheet of stamps */}
      {D > 0.001 && <g opacity={D}>
        {steps.map((at, k) => { const lit = on(f, at, 8)
          return <g key={k} opacity={on(f, five + k * 3, 8)} transform={`translate(${300 + k * 330} 600) scale(${1 + 0.08 * lit * (1 - on(f, steps[k + 1] ?? at + 40, 8))})`}>
            <rect x={-140} y={-170} width={280} height={340} fill="rgba(20,30,30,0.22)" transform="translate(8 10)" />
            <rect x={-140} y={-170} width={280} height={340} fill={[RED, GREEN, NAVY, PLUM, BRASS2][k]} opacity={0.4 + 0.6 * lit} />
            {Array.from({ length: 12 }, (_, i) => <g key={i}><circle cx={-140 + i * 25.4} cy={-170} r={7} fill="#BFE0D0" /><circle cx={-140 + i * 25.4} cy={170} r={7} fill="#BFE0D0" /></g>)}
            <text y={20} textAnchor="middle" fill={CREAM} style={TXT(150)}>{k + 1}</text>
            <text y={120} textAnchor="middle" fill={CREAM} style={TXT(36)}>{names[k]}</text>
          </g> })}
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={line} x={700} y={600} kind="glint" />
        <Life f={f} at={c("s2:and")} x={700} y={600} kind="glint" />
        <Life f={f} at={c("s2:you")} x={700} y={600} kind="glint" />
        <Life f={f} at={c("s3:you")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s3:here's")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s3:and")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s4:thinking")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s3:think")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s4:money")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s6:today")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s5:security")} x={1240} y={600} kind="glint" />
        <Life f={f} at={c("s6:really")} x={960} y={600} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="ss-hook" />
      <Headline f={f} lines={[[retirement, 'IT’S NOT WHAT YOU THINK', INK, 88], [rosa, 'MEET ROSA', INK, 92], [five, 'FIVE STEPS', INK, 92]]} />
    </g>
  )
}

export const SS_HOOK = makePiece('ss-hook', 'Hook in a vintage post office with mint tiles and arched windows: a big green PAYCHECK stub on the marble counter lights its SOCIAL SECURITY line (−6.2% EVERY PAYDAY) and brass capsules shoot up a pneumatic tube; a newspaper on a stand reads GOING BROKE? beside an empty navy mailbox with a red question mark; then a wall of steel deposit drawers — the one labelled ROSA slides out empty and gets a red cross (NO ACCOUNT WITH YOUR NAME); Rosa waves at the counter (ROSA, 30 · $52,000 A YEAR) and capsules leave her paycheck through a tube; finally a sheet of five big postage stamps lights one by one: WHAT SHE PAYS, WHERE IT GOES, HER CHECK, WHEN TO CLAIM, 2034.', {
  mood: 'light', Component: Hook,
  beats: ["s1:line", "s1:security", "s1:62", "s1:disappears", "s2:broke", "s2:again", "s3:retirement", "s3:differently", "s4:account", "s4:name", "s4:isn't", "s4:everything", "s5:rosa", "s5:30", "s5:52000", "s5:paycheck", "s6:five", "s6:pays", "s6:goes", "s6:check", "s6:claim", "s6:2034", "s2:and", "s2:you", "s3:you", "s3:here's", "s3:and", "s4:thinking", "s3:think", "s4:money", "s6:today", "s5:security", "s6:really"],
  sfx: [['s1:62', 'pop', 0.08], ["s4:isn't", 'thud', 0.1], ['s6:five', 'pop', 0.08]] })
