// ---------------------------------------------------------------- s1–s6: the hook on the tabletop.
// A) a wooden toy radio crackles RECESSION; a storm cloud on a stick rises over the table; three question tags pop
//    (MY JOB? MY RENT? MY MONEY?). B) a magic top hat gets a cross (not magic); a toy stock board's arrow dives, gets a
//    cross (not quite), and the toy town slides in (closer to home). C) Nina's café and Tom: $18 AN HOUR.
// D) five numbered wooden blocks line up on the table, one per step, lighting as each is named.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { TableWorld, Vig, Sign, Cross, Shop, StickCloud, Token, Life, TOP, TXT, CREAM, INK, RED, BLUE, TEAL, MUSTARD, GREEN, WOOD, WOOD2, WOOD3, PINK, SLATE } from './kit'

const Radio: React.FC<{ x: number; y: number; f: number; on1: number }> = ({ x, y, f, on1 }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={10} cy={6} rx={200} ry={16} fill="rgba(40,24,12,0.25)" />
    <rect x={-180} y={-220} width={360} height={220} rx={30} fill={WOOD} stroke={WOOD3} strokeWidth={5} />
    <rect x={-150} y={-190} width={170} height={160} rx={20} fill={WOOD3} />
    {Array.from({ length: 6 }, (_, k) => <line key={k} x1={-140} y1={-170 + k * 24} x2={10} y2={-170 + k * 24} stroke={WOOD2} strokeWidth={6} />)}
    <circle cx={100} cy={-140} r={34} fill={CREAM} stroke={INK} strokeWidth={4} /><circle cx={100} cy={-60} r={22} fill={CREAM} stroke={INK} strokeWidth={4} />
    <line x1={120} y1={-220} x2={170} y2={-330} stroke={INK} strokeWidth={5} />
    {on1 > 0 && [1, 2, 3].map((k) => <path key={k} d={`M${200 + k * 26} ${-160 - k * 10} q20 50 0 100`} stroke={INK} strokeWidth={5} fill="none" opacity={on1 * (0.4 + 0.6 * Math.abs(Math.sin(f / 6 - k)))} />)}
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const news = c('s1:news'), recession = c('s1:recession'), knot = c('s1:knot')
  const job = c('s2:job'), rent = c('s2:rent'), money = c('s2:money')
  const magic = c('s3:magic'), degree = c('s3:degree')
  const stock = c('s4:stock'), crashes = c('s4:crashes'), quite = c('s4:quite'), home = c('s4:home')
  const town = c('s5:town'), caf = c('s5:caf'), nina = c('s5:nina'), tom = c('s5:tom'), d18 = c('s5:18')
  const five = c('s6:five'), what = c('s6:what'), spreads = c('s6:spreads'), sets = c('s6:sets'), bad = c('s6:bad'), ends = c('s6:ends')

  const A = 1 - on(f, magic - 10, 8), B = win(f, magic - 2, town - 2, 8), Cc = win(f, town - 2, five - 2, 8), D = on(f, five - 2, 8)
  const nina1: Beat[] = [[news, 'idle', 'neutral'], [recession, 'shock', 'worried'], [knot, 'holdChest', 'worried'], [money, 'nervous', 'worried']]
  const tom1: Beat[] = [[news, 'idle', 'neutral'], [recession, 'shock', 'shocked'], [job, 'scratchHead', 'worried'], [money, 'nervous', 'worried']]
  const ninaC: Beat[] = [[nina, 'waveA', 'smiling', 'waveB', 10], [tom, 'present', 'smiling']]
  const tomC: Beat[] = [[tom, 'waveA', 'smiling', 'waveB', 10], [d18, 'thumbsUp', 'smiling']]
  const steps = [what, spreads, sets, bad, ends], names = ['WHAT IT IS', 'HOW IT SPREADS', 'WHAT SETS IT OFF', 'HOW BAD', 'HOW IT ENDS']
  const crash = on(f, crashes, 20)

  return (
    <g>
      <TableWorld f={f} id="rc-hook" mood={f < town ? 'dim' : 'warm'} />
      {/* # A) the radio, the cloud, the worries */}
      {A > 0.001 && <g opacity={A}>
        <Radio x={960} y={TOP + 20} f={f} on1={on(f, news, 8)} />
        <g opacity={on(f, recession, 8)} transform={`translate(960 ${lerp(560, 420, on(f, recession, 16))}) scale(${pop(f, recession, 12)})`}><text textAnchor="middle" fill={RED} style={TXT(110)}>RECESSION</text></g>
        <g opacity={on(f, knot, 10)}><StickCloud x={1480} y={lerp(900, 420, on(f, knot, 24))} f={f} storm={on(f, knot + 10, 10)} s={0.9} /></g>
        <Person f={f} who="owner" beats={nina1} x={420} y={TOP + 60} s={0.72} />
        <Person f={f} who="buyer" beats={tom1} x={600} y={TOP + 60} s={0.72} flip />
        {[[job, 'MY JOB?', 300], [rent, 'MY RENT?', 960], [money, 'MY MONEY?', 1620]].map(([at, t, x], k) => <g key={k} opacity={on(f, at as number, 8)}><Sign x={x as number} y={320} t={t as string} size={50} col={CREAM} /></g>)}
      </g>}
      {/* # B) not magic; not just the stock market; closer to home */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={win(f, magic - 2, stock - 2, 8)} transform={`translate(760 ${TOP})`}>
          <ellipse cx={0} cy={0} rx={170} ry={26} fill={INK} /><rect x={-110} y={-230} width={220} height={230} rx={10} fill={INK} /><rect x={-110} y={-70} width={220} height={30} fill={RED} />
          <g opacity={on(f, magic + 8, 8)}><Cross x={0} y={-120} s={1.1} /></g>
        </g>
        <g opacity={win(f, magic + 6, stock - 2, 8)}><Sign x={1260} y={560} t="NOT MAGIC" size={60} col={CREAM} /></g>
        <g opacity={on(f, degree, 8) * (1 - on(f, stock - 10, 8))}><Sign x={1260} y={680} t="NO DEGREE NEEDED" size={44} col={CREAM} /></g>
        {/* the stock board */}
        <g opacity={on(f, stock, 8) * (1 - on(f, home - 6, 8))} transform={`translate(760 ${TOP})`}>
          <rect x={-16} y={-200} width={32} height={200} fill={WOOD2} />
          <rect x={-260} y={-560} width={520} height={360} rx={16} fill={INK} stroke={WOOD3} strokeWidth={8} />
          <path d={`M-220 -470 L-120 -440 L-40 -480 L40 -${lerp(430, 260, crash)} L${lerp(140, 200, crash)} -${lerp(470, 240, crash)}`} stroke={crash > 0.3 ? RED : GREEN} strokeWidth={12} fill="none" strokeLinejoin="round" />
          <text y={-230} textAnchor="middle" fill={CREAM} style={TXT(40)}>STOCK MARKET</text>
          <g opacity={on(f, quite, 8)}><Cross x={0} y={-380} s={1.1} /></g>
        </g>
        <g opacity={on(f, home, 10)}>
          {[['CAFÉ', 'cafe', RED, 700], ['BARBER', 'barber', BLUE, 1060], ['GROCER', 'grocer', GREEN, 1420]].map(([n, k, r, x], i) => <g key={i} transform={`translate(${lerp(400, 0, on(f, home + i * 4, 16))} 0)`} opacity={on(f, home + i * 4, 10)}><Shop x={x as number} y={TOP + 10} s={0.8} name={n as string} kind={k as 'cafe'} roof={r as string} /></g>)}
        </g>
      </g>}
      {/* # C) Nina's café and Tom */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g opacity={on(f, caf, 10)}><Shop x={1220} y={TOP + 10} s={1.25} name="NINA'S CAFÉ" kind="cafe" roof={RED} /></g>
        <g opacity={on(f, nina, 8)}><Person f={f} who="owner" beats={ninaC} x={520} y={TOP + 60} s={0.8} /></g>
        <g opacity={on(f, tom, 8)}><Person f={f} who="buyer" beats={tomC} x={760} y={TOP + 60} s={0.8} flip /></g>
        <g opacity={on(f, nina, 8)}><Sign x={520} y={330} t="NINA · OWNER" size={44} col={CREAM} /></g>
        <g opacity={on(f, d18, 8)}><Sign x={860} y={420} t="TOM · $18 AN HOUR" size={44} col={MUSTARD} /></g>
        <g opacity={on(f, town, 8)}><Sign x={1220} y={330} t="ONE SMALL TOWN" size={44} col={CREAM} /></g>
      </g>}
      {/* # D) five steps as five wooden blocks */}
      {D > 0.001 && <g opacity={D}>
        {steps.map((at, k) => { const x = 330 + k * 315, lit = on(f, at, 8)
          return <g key={k} opacity={on(f, five + k * 3, 8)} transform={`translate(${x} ${TOP + 10}) scale(${1 + 0.08 * lit * (1 - on(f, (steps[k + 1] ?? at + 40), 8))})`}>
            <ellipse cx={8} cy={6} rx={140} ry={16} fill="rgba(40,24,12,0.25)" />
            <rect x={-120} y={-240} width={240} height={240} rx={16} fill={[RED, MUSTARD, TEAL, BLUE, GREEN][k]} />
            <rect x={-120} y={-240} width={60} height={240} fill="#FFFFFF" opacity={0.16} />
            <text y={-90} textAnchor="middle" fill={CREAM} style={TXT(120)}>{k + 1}</text>
            <g opacity={0.35 + 0.65 * lit}><Sign x={0} y={-290} t={names[k]} size={32} col={CREAM} /></g>
          </g> })}
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={c('s2:safe')} x={1620} y={250} kind="glint" />
        <Life f={f} at={c("s1:you")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s2:will")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s3:thing")} x={760} y={600} kind="glint" />
        <Life f={f} at={c("s4:thinking")} x={760} y={600} kind="glint" />
        <Life f={f} at={c("s6:their")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s6:today")} x={960} y={700} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rc-hook" />
      <Headline f={f} lines={[[magic, 'A RECESSION ISN’T MAGIC', INK, 88], [town, 'MEET NINA AND TOM', INK, 88], [five, 'FIVE STEPS', INK, 92]]} />
    </g>
  )
}

export const RC_HOOK = makePiece('rc-hook', 'Hook on a tabletop toy town under a hanging lamp: a wooden toy radio crackles RECESSION in big red letters while a cotton storm cloud on a stick rises and starts to rain; Nina (café owner in a green apron) and Tom (her barista) clutch their chests; three signs pop up — MY JOB? MY RENT? MY MONEY?; a black magic top hat gets a red cross (NOT MAGIC, NO DEGREE NEEDED); a toy STOCK MARKET board\'s line dives red and gets a cross, and a café, a barber and a grocer slide onto the table; then NINA\'S CAFÉ, NINA · OWNER and TOM · $18 AN HOUR wave (ONE SMALL TOWN); finally five big numbered wooden blocks line up — WHAT IT IS, HOW IT SPREADS, WHAT SETS IT OFF, HOW BAD, HOW IT ENDS — each lighting as it is named.', {
  mood: 'light', Component: Hook,
  beats: ["s1:news", "s1:recession", "s1:knot", "s2:job", "s2:rent", "s2:money", "s3:magic", "s3:degree", "s4:stock", "s4:crashes", "s4:quite", "s4:home", "s5:town", "s5:caf", "s5:nina", "s5:tom", "s5:18", "s6:five", "s6:what", "s6:spreads", "s6:sets", "s6:bad", "s6:ends", "s2:safe", "s1:you", "s2:will", "s3:thing", "s4:thinking", "s6:their", "s6:today"],
  sfx: [['s1:recession', 'thud', 0.1], ['s4:crashes', 'crack', 0.1], ['s6:five', 'pop', 0.08]] })
