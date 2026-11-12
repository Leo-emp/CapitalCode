// ---------------------------------------------------------------- s40–s58: step three, one company moves the whole market.
// A) A night financial district. Market value = one share's price × the number of shares: a single glowing share coin,
//    then a vast field of identical coins. The price tag slides from ~$200 to ~$182; that tiny change × billions of
//    shares = -$440 BILLION. No cash changes hands (two hands, crossed money); WEDNESDAY vs THURSDAY price boards.
// B) The S&P 500 as a skyline: towers sized by weight — NVIDIA ≈8.6%, APPLE ≈7.3%, MICROSOFT ≈5.8% tower over a long
//    row of small towers (the rest). A bracket "3 STOCKS ≈ 22% — MOST EVER". Nvidia's tower shrinks ~9% and an S&P
//    meter drops ≈0.8 points; then the other chip/AI towers shrink and the meter reaches -4.4%.
// C) Your $10,000 index-fund jar: an ≈$860 green NVIDIA band; it loses ≈$80; the whole jar falls 4.4% ≈ $440. Beside
//    it a jar of only Nvidia loses ≈$926. Spread out = a smaller hit.
// D) Recap: three giant towers lit over the skyline.
import React from 'react'
import { lerp, on, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, type Beat } from '../aimoney/common'
import { AMBER, Floor, MoneyJar, NEON, RED, Skyline, Sky, WeightTower } from './kit'

const K = {
  how40: 's40:how', company40: 's40:company', drag: 's40:drag', whole40: 's40:whole',
  first: 's41:first', understand41: 's41:understand', losing: 's41:losing', k440a: 's41:440', means41: 's41:means',
  market42: 's42:market', value42: 's42:value', take: 's42:take', price42: 's42:price', share42: 's42:share', multiply: 's42:multiply', number42: 's42:number', shares42: 's42:shares', exist: 's42:exist',
  nvidias43: "s43:nvidia's", fell43: 's43:fell', k200: 's43:200', k182: 's43:182', tiny: 's43:tiny', times: 's43:times', billions: 's43:billions', added: 's43:added', k440b: 's43:440',
  nobody: 's44:nobody', handed: 's44:handed', money44: 's44:money', worth44: 's44:worth', wednesday: 's44:wednesday', compared: 's44:compared', shares44: 's44:shares', thursday44: 's44:thursday',
  now45: 's45:now', sp45: 's45:sp', list45: 's45:list', american: 's45:american', count45: 's45:count', same45: 's45:same',
  bigger: 's46:bigger', count46: 's46:count', nvidia46: 's46:nvidia', biggest46: 's46:biggest',
  october: 's47:october', nvidia47: 's47:nvidia', eight47: 's47:8', percent47: 's47:percent', whole47: 's47:whole',
  together: 's48:together', apple48: 's48:apple', microsoft: 's48:microsoft', three48: 's48:three', k22: 's48:22', most48: 's48:most', ever: 's48:ever',
  nvidia49: 's49:nvidia', fell49: 's49:fell', alone49: 's49:alone', pulled: 's49:pulled', stock49: 's49:stock', down49: 's49:down', roughly49: 's49:roughly', eight49: 's49:8',
  add50: 's50:add', chip50: 's50:chip', falling50: 's50:falling', whole50: 's50:whole', dropped50: 's50:dropped', four50: 's50:4',
  heres51: "s51:here's", regular: 's51:regular', own51: 's51:own', index51: 's51:index', slice51: 's51:slice', nvidia51: 's51:nvidia',
  real52: 's52:real', imagine52: 's52:imagine', k10000a: 's52:10000', fund52: 's52:fund', index52: 's52:index', eight53: 's53:8', index53: 's53:index',
  nvidia53: 's53:nvidia', k860: 's53:860', money53: 's53:money', sitting: 's53:sitting', choosing: 's53:choosing',
  fell54: 's54:fell', slice54: 's54:slice', k80: 's54:80',
  other55: 's55:other', fund55: 's55:fund', thursday55: 's55:thursday', k10000b: 's55:10000', down55: 's55:down', roughly55: 's55:roughly', k440c: 's55:440', four55b: 's55:4#2', percent55: 's55:percent', afternoon: 's55:afternoon',
  compare: 's56:compare', someone: 's56:someone', only56: 's56:only', k10000c: 's56:10000', lost56: 's56:lost', k926: 's56:926', day56: 's56:day',
  never57: 's57:never', big57: 's57:big', ride: 's57:ride', spreading: 's57:spreading', many57: 's57:many', hit: 's57:hit', smaller57: 's57:smaller',
  step58: 's58:step', giant58: 's58:giant', move58: 's58:move', market58: 's58:market', much58: 's58:much',
}
type Key = keyof typeof K

// # one share coin
const ShareCoin: React.FC<{ x: number; y: number; r?: number; o?: number; lit?: number }> = ({ x, y, r = 40, o = 1, lit = 0 }) => (
  <g opacity={o}>{lit > 0 && <circle cx={x} cy={y} r={r * 1.8} fill={NEON} opacity={0.25 * lit} />}<circle cx={x} cy={y} r={r} fill="#1C2740" stroke={NEON} strokeWidth={r / 8} /><circle cx={x} cy={y} r={r * 0.6} fill="none" stroke={NEON} strokeWidth={r / 14} opacity={0.6} /></g>
)

const Weight: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.now45 - 8, BC = q.heres51 - 8, CD = q.step58 - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cc = win(f, BC, CD), D = on(f, CD, 10)
  const price = lerp(200, 182, on(f, q.k182, 16))
  const field = span(f, q.multiply, q.exist + 10)
  const nvFall = on(f, q.fell49, 18), othersFall = on(f, q.falling50, 20)
  const meter = -0.8 * nvFall - 3.6 * on(f, q.dropped50, 20)
  const youSafe: Beat[] = [[BC, 'idle', 'neutral'], [q.imagine52, 'holdUp', 'smiling'], [q.k80, 'nervous', 'worried'], [q.k440c, 'shock', 'shocked'], [q.k926, 'point', 'shocked'], [q.spreading, 'relief', 'smiling']]
  const others = Array.from({ length: 16 }, (_, k) => 1.2 + ((k * 37) % 10) / 10 * 1.6)
  return (
    <g>
      <Stage id="nv-weight" frame={f} />
      {/* # A) market value */}
      {A > 0 && <g opacity={A}>
        <Sky id="nvg-sky" top="#08071E" bottom="#1B2050" glow="#2F5FD0" gx={960} gy={820} f={f} />
        <Skyline y={900} col="#100E30" seed={17} h={240} />
        <Floor id="nvg-floor" y={900} top="#141238" bottom="#05040F" rim="#6F8CFF" />
        <g opacity={1 - on(f, q.nobody, 12)}>
          <g opacity={on(f, q.share42, 8)}><ShareCoin x={420} y={520} r={80} lit={win(f, q.share42, q.multiply, 6)} />
            <g transform={`translate(420 ${380 - 8 * pop(f, q.k182, 12)})`}><rect x={-120} y={-50} width={240} height={90} rx={16} fill={price < 190 ? '#2A0A16' : '#0E2A20'} stroke={price < 190 ? RED : NEON} strokeWidth={4} />
              <Label x={0} y={14} text={`$${Math.round(price)}`} size={60} font="Bebas Neue" color={price < 190 ? RED : NEON} /></g>
            <Label x={420} y={680} text="1 SHARE" size={48} font="Bebas Neue" color="#E8E6FF" /></g>
          <g opacity={on(f, q.multiply, 8)}><Label x={700} y={540} text="×" size={140} font="Bebas Neue" color={AMBER} /></g>
          <g opacity={on(f, q.multiply, 8)}>{Array.from({ length: 96 }, (_, k) => k < 96 * field ? <ShareCoin key={k} x={900 + (k % 16) * 56} y={330 + Math.floor(k / 16) * 56} r={20} /> : null)}
            <Label x={1320} y={720} text="BILLIONS OF SHARES" size={52} font="Bebas Neue" color="#E8E6FF" o={on(f, q.number42, 8)} /></g>
          <g opacity={on(f, q.value42, 8) * (1 - on(f, q.multiply, 8))}><Label x={1300} y={540} text="MARKET VALUE = ?" size={70} font="Bebas Neue" color={AMBER} /></g>
          <g opacity={on(f, q.added, 10)} transform={`translate(1320 ${820 - 10 * pop(f, q.k440b, 12)})`}><rect x={-330} y={-60} width={660} height={110} rx={20} fill="#1A0A1E" stroke={RED} strokeWidth={5} />
            <Label x={0} y={20} text={f >= q.k440b ? '= -$440 BILLION' : 'ADDS UP TO…'} size={72} font="Bebas Neue" color={RED} /></g>
        </g>
        <g opacity={on(f, q.nobody, 12)}>
          <g transform="translate(560 560)"><path d="M-200 40 Q-120 -20 -40 20 L-40 60 L-200 80 Z" fill="#F2C7A5" /><path d="M200 40 Q120 -20 40 20 L40 60 L200 80 Z" fill="#F2C7A5" />
            <rect x={-70} y={-60} width={140} height={70} rx={10} fill="#3DAA6E" opacity={0.5} /><path d="M-110 -90 L110 60 M110 -90 L-110 60" stroke={RED} strokeWidth={14} strokeLinecap="round" opacity={on(f, q.handed, 10)} />
            <Label x={0} y={170} text="NO CASH CHANGED HANDS" size={50} font="Bebas Neue" color="#E8E6FF" /></g>
          <g opacity={on(f, q.shares44, 8)}><Label x={1410} y={820} text="WHAT ALL NVIDIA'S SHARES WERE WORTH" size={44} font="Bebas Neue" color={AMBER} /></g>
          {([[1200, q.wednesday, 'WEDNESDAY', '$200', NEON], [1620, q.thursday44, 'THURSDAY', '$182', RED]] as [number, number, string, string, string][]).map(([x, at, d, p, col], k) =>
            <g key={k} opacity={on(f, at, 8)} transform={`translate(${x} ${560 - 10 * pop(f, at, 12)})`}><rect x={-170} y={-140} width={340} height={260} rx={20} fill="#141230" stroke={col} strokeWidth={5} />
              <Label x={0} y={-80} text={d} size={46} font="Bebas Neue" color="#E8E6FF" /><Label x={0} y={30} text={p} size={110} font="Bebas Neue" color={col} /><Label x={0} y={96} text="PER SHARE" size={32} font="Bebas Neue" color="#C9C6F0" /></g>)}
        </g>
      </g>}
      {/* # B) the S&P 500 skyline by weight */}
      {B > 0 && <g opacity={B}>
        <Sky id="nvg-sky2" top="#07061A" bottom="#1E1A48" glow={NEON} gx={500} gy={900} f={f} />
        <Floor id="nvg-floor2" y={900} top="#141238" bottom="#05040F" rim={NEON} />
        <g opacity={on(f, q.list45, 10)}>{others.map((w, k) => <WeightTower key={k} id={`o${k}`} x={940 + k * 58} y={900} w={46} h={w * 70 * (1 - 0.12 * othersFall * (k % 3 === 0 ? 1 : 0.3))} name="" col="#5B6AB0" />)}
          <Label x={1380} y={960} text="…AND ~500 OTHERS, MOSTLY SMALL" size={40} font="Bebas Neue" color="#C9C6F0" o={on(f, q.bigger, 8)} /></g>
        {([[260, 'NVIDIA', 8.63, '#12B872', q.nvidia46], [520, 'APPLE', 7.25, '#8C93C0', q.apple48], [760, 'MICROSOFT', 5.82, '#2F8FE0', q.microsoft]] as [number, string, number, string, number][]).map(([x, n, w, col, at], k) =>
          <g key={k} opacity={on(f, at, 10)}><WeightTower id={`t${k}`} x={x} y={900} w={170} h={w * 62 * on(f, at, 20)} name={n} col={col} fall={k === 0 ? nvFall : 0} lit={k === 0 ? Math.max(win(f, q.october, q.together, 8), win(f, q.stock49, q.stock49 + 30, 6)) : 0} />
            <Label x={x} y={900 - w * 62 * (k === 0 ? 1 - 0.093 * nvFall : 1) - 30} text={`≈${w.toFixed(1)}%`} size={48} font="Bebas Neue" color="#E8E6FF" o={on(f, k === 0 ? q.eight47 : at + 10, 8)} /></g>)}
        <g opacity={on(f, q.three48, 10) * (1 - on(f, q.nvidia49, 10))}><path d="M150 310 L150 270 L870 270 L870 310" fill="none" stroke={AMBER} strokeWidth={6} /><Label x={510} y={245} text={f >= q.most48 ? '3 STOCKS ≈ 22% — THE MOST EVER' : '3 STOCKS ≈ 22%'} size={52} font="Bebas Neue" color={AMBER} /></g>
        <g opacity={on(f, q.pulled, 10)} transform="translate(1380 420)"><rect x={-260} y={-110} width={520} height={200} rx={20} fill="#141230" stroke={RED} strokeWidth={5} />
          <Label x={0} y={-50} text="S&P 500" size={46} font="Bebas Neue" color="#E8E6FF" /><Label x={0} y={50} text={`${meter.toFixed(1)}%`} size={100} font="Bebas Neue" color={RED} /></g>
        <g opacity={win(f, q.roughly49, q.add50, 8)}><Label x={1380} y={600} text="FROM NVIDIA ALONE" size={44} font="Bebas Neue" color="#FFB3BA" /></g>
        <g opacity={on(f, q.add50, 8)}><Label x={1380} y={600} text="+ OTHER CHIP AND AI STOCKS" size={44} font="Bebas Neue" color="#FFB3BA" /></g>
      </g>}
      {/* # C) your $10,000 */}
      {Cc > 0 && <g opacity={Cc}>
        <Sky id="nvg-sky3" top="#0E0A2A" bottom="#2A1F55" glow={AMBER} gx={700} gy={880} f={f} />
        <Floor id="nvg-floor3" y={900} top="#1E1846" bottom="#07061A" rim={AMBER} />
        <g opacity={win(f, q.heres51, q.real52, 8)}><Label x={960} y={420} text="AN S&P 500 INDEX FUND OWNS NVIDIA TOO" size={60} font="Bebas Neue" color={AMBER} /></g>
        <Person f={f} who="investorF" beats={youSafe} x={260} y={900} s={0.95} o={on(f, q.real52, 10)} />
        <g opacity={on(f, q.k10000a, 10)}>
          <MoneyJar x={720} y={880} s={1.15} fill={1 - 0.044 * on(f, q.down55, 20)} slice={on(f, q.k860, 14) * 0.086 * (1 - 0.093 * on(f, q.slice54, 16))} label="YOUR INDEX FUND" />
          <Label x={720} y={360} text={f >= q.k440c ? '$10,000 → -$440' : '$10,000'} size={70} font="Bebas Neue" color={f >= q.k440c ? RED : '#E8E6FF'} />
          <g opacity={win(f, q.index52, q.k860, 8)}><Label x={1100} y={560} text="S&P 500 INDEX FUND" size={50} font="Bebas Neue" color="#E8E6FF" /></g>
          <g opacity={win(f, q.eight53, q.k860, 8)}><Label x={1100} y={640} text="NVIDIA ≈ 8.6% OF IT" size={50} font="Bebas Neue" color={NEON} /></g>
          <g opacity={win(f, q.k860, q.other55, 8)} transform="translate(1000 830)"><path d="M-130 -10 L-40 -10" stroke={NEON} strokeWidth={5} /><Label x={20} y={6} text={f >= q.k80 ? '≈$860 IN NVIDIA → -$80' : '≈$860 IN NVIDIA'} size={46} anchor="start" font="Bebas Neue" color={f >= q.k80 ? RED : NEON} /></g>
          <g opacity={win(f, q.four55b, q.compare, 8)} transform={`translate(0 ${-8 * pop(f, q.percent55, 12)})`}><Label x={720} y={1000} text="WHOLE FUND -4.4%" size={46} font="Bebas Neue" color={RED} /></g>
        </g>
        <g opacity={on(f, q.compare, 10)}>
          <MoneyJar x={1400} y={880} s={1.15} fill={1 - 0.0926 * on(f, q.lost56, 20)} slice={1} label="ONLY NVIDIA" />
          <Label x={1400} y={360} text={f >= q.k926 ? '$10,000 → -$926' : '$10,000'} size={70} font="Bebas Neue" color={f >= q.k926 ? RED : '#E8E6FF'} />
          <g opacity={on(f, q.spreading, 10)}><Label x={1060} y={1000} text="SPREAD OUT = A SMALLER HIT" size={50} font="Bebas Neue" color={NEON} /></g>
        </g>
      </g>}
      {/* # D) recap */}
      {D > 0 && <g opacity={D}>
        <Sky id="nvg-sky4" top="#07061A" bottom="#1E1A48" glow={NEON} gx={960} gy={900} f={f} />
        <Floor id="nvg-floor4" y={900} top="#141238" bottom="#05040F" rim={NEON} />
        {others.map((w, k) => <WeightTower key={k} id={`r${k}`} x={1000 + k * 54} y={900} w={42} h={w * 60} name="" col="#4A5490" />)}
        {[[330, 8.63, '#12B872', 'NVIDIA'], [560, 7.25, '#8C93C0', 'APPLE'], [790, 5.82, '#2F8FE0', 'MICROSOFT']].map(([x, w, col, n], k) => <WeightTower key={k} id={`rr${k}`} x={x as number} y={900} w={180} h={(w as number) * 62} name={n as string} col={col as string} lit={on(f, q.giant58, 10)} />)}
        <g opacity={on(f, q.move58, 10)}><Label x={1400} y={420} text="A FEW GIANTS MOVE THE WHOLE MARKET" size={56} font="Bebas Neue" color={AMBER} /></g>
      </g>}
      <Headline f={f} lines={[[q.how40, 'HOW CAN ONE COMPANY DO THAT?', '#E8E6FF', 96], [q.market42, 'WHAT “MARKET VALUE” MEANS', '#E8E6FF', 100], [q.nvidias43, 'A SMALL MOVE × BILLIONS', RED, 100],
        [q.nobody, 'NOBODY HANDED OVER MONEY', '#E8E6FF', 100], [q.now45, 'THE S&P 500: BIGGER COUNTS MORE', '#E8E6FF', 92], [q.nvidia49, 'NVIDIA ALONE: ≈ -0.8%', RED, 100],
        [q.heres51, 'WHY IT MATTERS TO YOU', '#E8E6FF', 104], [q.real52, 'YOUR $10,000', AMBER, 110], [q.compare, 'ONLY NVIDIA vs SPREAD OUT', '#E8E6FF', 100], [q.step58, 'A FEW GIANTS', '#E8E6FF', 110]]} />
      <Vignette id="nv-weight" />
    </g>
  )
}

export const NV_WEIGHT = makePiece('nv-weight', 'One company moves the market: a night financial district — one glowing share coin with a price tag sliding $200 → $182, × a field of share coins (billions of shares) = -$440 BILLION; two hands with crossed-out cash (no cash changed hands), WEDNESDAY $200 vs THURSDAY $182 boards; the S&P 500 as a skyline of towers sized by weight — Nvidia ≈8.6%, Apple ≈7.3%, Microsoft ≈5.8% over a row of small towers (~500 others), a bracket 3 STOCKS ≈ 22% THE MOST EVER, Nvidia’s tower shrinks and an S&P meter drops to -0.8% then -4.4%; Mia with a $10,000 index-fund jar — an ≈$860 Nvidia band loses ≈$80, the jar falls 4.4% ≈ $440, beside a jar of only Nvidia losing ≈$926; three giant towers lit over the skyline', {
  mood: 'dark', Component: Weight, beats: Object.values(K),
  sfx: [['s42:multiply', 'pop', 0.2], ['s43:440', 'thud', 0.25], ['s44:handed', 'swish', 0.2], ['s48:22', 'pop', 0.2], ['s49:pulled', 'thud', 0.2], ['s50:4', 'thud', 0.2], ['s55:440', 'thud', 0.2], ['s56:926', 'impact', 0.2]] })
