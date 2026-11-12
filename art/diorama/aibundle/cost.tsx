// ---------------------------------------------------------------- s21–s36: why AI costs money every time (dark mood).
// A) Three numbered medallions; step one: two programmers build a big W tile, one big coin pile pays for it once;
//    the W flies into Nina's laptop, then into four more laptops — the copy costs ≈ $0.
// B) Step two: Nina's request (a glowing envelope) travels to a data center; its chips light and burn power; the
//    answer flies back; a longer answer / a set of slides keeps the chips busy longer and its coin pile grows;
//    every answer drops a coin, and more laptops keep asking.
// C) Step three: data centers multiply; two bars — ≈ $28B (FY2023) and ≈ $64.5B (FY2025), more than doubled.
// D) The cloud-sales coin: the cost of running it bites a slice; 69% is left; the AI chips beside the bite.
//    Then coins drip answer after answer — and who pays?
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { DataCenter, Gpu, Headline, Label, Person, fly, win, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Bubble, Coin, Spark, Spot, Tile, XMark } from './kit'
import { Bolt, CoinColumn, Desk, Packet, PieCoin } from './kit2'

const GROUND = 930

const Cost: React.FC<PieceProps> = ({ f, c }) => {
  const people21 = c('s21:people'), three21 = c('s21:three'), steps21 = c('s21:steps')
  const step22 = c('s22:step'), builds = c('s22:builds'), big = c('s22:big'), once = c('s22:once'), programmers = c('s22:programmers'), write22 = c('s22:write')
  const after23 = c('s23:after'), runs = c('s23:runs'), computer = c('s23:computer'), more23 = c('s23:more'), copy = c('s23:copy'), almost = c('s23:almost'), nothing = c('s23:nothing')
  const step24 = c('s24:step'), not24 = c('s24:not'), work24 = c('s24:work')
  const asks25 = c('s25:asks'), paragraph = c('s25:paragraph'), request = c('s25:request'), travels = c('s25:travels'), data25 = c('s25:data')
  const rows = c('s26:rows'), chips26 = c('s26:chips'), answer26 = c('s26:answer'), burn = c('s26:burn'), electricity = c('s26:electricity')
  const y2025 = c('s31:2025'), data31b = c('s31:data'), question36 = c('s36:question'), billion31 = c('s31:billion'), buildings31 = c('s31:buildings'), then27 = c('s27:then'), back27 = c('s27:back'), screen = c('s27:screen')
  const longer = c('s28:longer'), whole = c('s28:whole'), slides28 = c('s28:slides'), keeps = c('s28:keeps'), busy = c('s28:busy'), costs28 = c('s28:costs')
  const every29 = c('s29:every'), small29 = c('s29:small'), cost29 = c('s29:cost'), every29b = c('s29:every#2'), anyone = c('s29:anyone')
  const cost29b = c('s29:cost'), comes29 = c('s29:comes'), step30 = c('s30:step'), millions = c('s30:millions'), huge = c('s30:huge'), chips30 = c('s30:chips'), buildings30 = c('s30:buildings')
  const financial = c('s31:financial'), spent = c('s31:spent'), d64 = c('s31:64'), equipment = c('s31:equipment'), data31 = c('s31:data'), computers = c('s31:computers')
  const earlier = c('s32:earlier'), d28 = c('s32:28')
  const doubled = c('s33:doubled'), years33 = c('s33:years'), more33 = c('s33:more')
  const annual = c('s34:annual'), cloud = c('s34:cloud'), sales = c('s34:sales'), paying = c('s34:paying'), fell = c('s34:fell'), d69 = c('s34:69')
  const named = c('s35:named'), scaling = c('s35:scaling'), ai35 = c('s35:ai')
  const expensive = c('s36:expensive'), after36 = c('s36:after'), who = c('s36:who'), pays36 = c('s36:pays')

  const A1 = win(f, people21 - 20, step22), A = win(f, step22 - 2, step24), B = win(f, step24 - 2, step30), C = win(f, step30 - 2, annual), D = on(f, annual - 2, 8)
  const devs: Beat[] = [[0, 'type', 'thinking', 'idle', 18]]
  const NINA: [number, number] = [380, GROUND - 230], DC: [number, number] = [1480, GROUND]
  // # a packet's trip up and over to the data center (t 0–1), and the answer back
  const trip = (t: number, back = false) => { const a = back ? [DC[0] - 120, 520] : [NINA[0] + 60, 560], b = back ? [NINA[0] + 60, 560] : [DC[0] - 120, 520]
    return { x: lerp(a[0], b[0], t), y: lerp(a[1], b[1], t) - Math.sin(t * Math.PI) * 220 } }

  return (
    <g>
      <Stage id="ab-cost" frame={f} />
      <Spot dark f={f} at={once} x={1400} y={760} rx={200} ry={200} />
      <Spot dark f={f} at={nothing} x={1640} y={420} rx={120} ry={120} />
      <Spot dark f={f} at={chips26} x={1480} y={520} rx={260} ry={160} />
      <Spot dark f={f} at={d64} x={1200} y={700} rx={200} ry={260} />
      <Spot dark f={f} at={d69} x={960} y={600} rx={260} ry={260} />
      <Headline f={f} lines={[[three21, 'IN THREE STEPS', P.ink, 120],
        [step22, 'STEP 1: SOFTWARE IS BUILT ONCE', P.ink, 104], [runs, "WORD RUNS ON NINA'S COMPUTER", P.ink, 100], [almost, 'ONE MORE COPY: ≈ $0', P.mintInk, 110],
        [step24, 'STEP 2: AI WORKS DIFFERENTLY', P.ink, 104], [electricity, 'CHIPS + ELECTRICITY', P.goldInk, 110], [longer, 'LONGER ANSWER = MORE WORK', P.ink, 104], [every29, 'EVERY ANSWER COSTS SOMETHING', P.coralInk, 100],
        [step30, 'STEP 3: MILLIONS OF ANSWERS', P.ink, 104], [spent, 'MICROSOFT: BUILDINGS + EQUIPMENT', P.ink, 96], [doubled, 'MORE THAN DOUBLED IN 2 YEARS', P.goldInk, 100],
        [annual, "MICROSOFT'S ANNUAL REPORT", P.ink, 104], [d69, 'CLOUD: 69% LEFT AFTER RUNNING COSTS', P.goldInk, 88], [named, 'THE REASON: SCALING UP AI', P.coralInk, 100],
        [expensive, 'EXPENSIVE, ANSWER AFTER ANSWER', P.ink, 100], [who, 'SO WHO PAYS FOR IT?', P.goldInk, 120]]} />

      {/* # A1) the three steps */}
      {A1 > 0 && <g opacity={A1}>
        {[1, 2, 3].map((n, k) => <g key={k} opacity={on(f, people21 + k * 10, 8)} transform={`translate(${560 + k * 400} 560) scale(${pop(f, people21 + k * 10) * (1 + 0.08 * on(f, three21 + k * 4, 6) * (1 - on(f, three21 + k * 4 + 12, 8)))})`}>
          <circle r={130} fill={P.card} /><circle r={130} fill="none" stroke={P.gold} strokeWidth={8} />
          <Label x={0} y={52} text={String(n)} size={150} font="Bebas Neue" color={P.goldInk} /></g>)}
      </g>}

      {/* # A) step one: built once, copied for almost nothing */}
      {A > 0 && <g opacity={A}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, after23, 12)}>
          <g opacity={on(f, programmers - 8, 8)}>
            <Person f={f} who="worker" beats={devs} x={260} y={GROUND} s={0.9} />
            <Person f={f} who="hero" beats={devs} x={520} y={GROUND} s={0.9} />
          </g>
          {/* # the W tile assembles block by block while they build */}
          <g transform={`translate(960 600) scale(${lerp(0.4, 2.2, on(f, builds, 50))})`}><Tile x={0} y={0} letter="W" color="#3A7BD5" o={on(f, builds, 10)} /></g>
          <g opacity={on(f, big, 8)}><CoinColumn x={1400} y={GROUND - 20} n={Math.round(lerp(0, 16, on(f, big, 24)))} w={180} /></g>
          <g opacity={on(f, once, 8)}><Label x={1400} y={GROUND + 80} text="BIG COST, ONCE" size={56} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        <g opacity={on(f, after23, 10)}>
          <Desk x={560} y={GROUND - 214} s={1.0} screen={f >= computer ? 'w' : 'blank'} />
          <g opacity={on(f, runs, 8)}><Label x={560} y={GROUND + 80} text="NINA'S LAPTOP" size={48} font="Bebas Neue" color={P.ink2} /></g>
          {[0, 1, 2].map((k) => <g key={k} opacity={on(f, copy + k * 5, 8)}><Desk x={1000 + k * 300} y={GROUND - 120} s={0.5} screen="w" /></g>)}
          <g opacity={on(f, almost, 8)}><Coin x={1270} y={430} r={60} t="≈0" /></g>
          <g opacity={on(f, nothing, 8)}><Label x={1270} y={540} text="PER EXTRA COPY" size={44} font="Bebas Neue" color={P.ink2} /></g>
        </g>
      </g>}

      {/* # B) step two: the trip to the data center */}
      {B > 0 && <g opacity={B}>
        <Ground y={GROUND} dark />
        <Desk x={NINA[0]} y={GROUND - 214} s={0.95} screen={f >= slides28 ? 'slides' : f >= back27 ? 'letter' : 'blank'} fill={f >= slides28 ? on(f, slides28, 20) : on(f, back27 + 10, 30) * (f >= longer ? 1 : 0.6)} glow={on(f, asks25, 8) * (1 - on(f, request, 8))} />
        <g opacity={on(f, not24, 8) * (1 - on(f, asks25, 8))}><Tile x={NINA[0]} y={360} letter="W" color="#3A7BD5" /><XMark x={NINA[0]} y={360} o={on(f, work24, 8)} size={50} /></g>
        <g opacity={on(f, asks25, 8)}><Spark x={NINA[0] + 270} y={380} s={0.7} f={f} glow={1} /></g>
        <g opacity={on(f, data25, 8)}><DataCenter x={DC[0]} y={DC[1]} s={0.85} lit={on(f, rows, 10)} f={f} /></g>
        <g opacity={on(f, chips26, 8)}><Gpu x={DC[0]} y={420} s={0.6 * pop(f, chips26) * (1 + 0.08 * on(f, then27, 6) * (1 - on(f, then27 + 14, 8)))} glow={0.3 + 0.7 * on(f, chips26, 10) * (f >= keeps ? 0.8 + 0.2 * Math.sin(f / 4) : 0.6 + 0.4 * Math.sin(f / 8))} /></g>
        {/* # electricity: bolts flicker into the building */}
        {[0, 1].map((k) => <g key={k} opacity={on(f, burn + k * 4, 6) * (0.6 + 0.4 * Math.sin(f / 3 + k))}><Bolt x={DC[0] + (k ? 330 : -330)} y={620} s={0.9} /></g>)}
        {/* # the request goes out, the answer comes back */}
        {f >= request && f < request + 34 && (() => { const p = trip(on(f, request, 30)); return <Packet x={p.x} y={p.y} s={1.1} /> })()}
        {f >= back27 - 6 && f < back27 + 26 && (() => { const p = trip(on(f, back27 - 6, 26), true); return <Packet x={p.x} y={p.y} s={1.1} color={P.mint} /> })()}
        <g opacity={on(f, back27 + 18, 8) * (1 - on(f, every29, 8))}><Bubble x={NINA[0] - 30} y={290} s={lerp(0.7, 1.0, on(f, longer, 16))} lines={f >= longer ? 4 : 2} w={f >= longer ? 360 : 280} /></g>
        {/* # the cost of making answers: a coin pile by the data center that grows when the answer is longer */}
        <g opacity={on(f, answer26, 8)}><CoinColumn x={1110} y={GROUND - 20} n={Math.round(on(f, answer26, 20) * 2 + on(f, busy, 30) * 3 + on(f, every29, 60) * 3)} w={120} /></g>
        <g opacity={on(f, costs28, 8)}><Label x={1110} y={GROUND + 70} text="COST" size={48} font="Bebas Neue" color={P.goldInk} /></g>
        {/* # every answer drops a coin; more laptops keep asking */}
        {f >= small29 && [0, 1, 2].map((k) => { const t0 = small29 + k * 12 + Math.floor((f - small29) / 36) * 36, fl = fly(f, t0, [DC[0] - 120, 520], [1110, GROUND - 150], 18, 60)
          return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={28} o={fl.o} /> : null })}
        {f >= comes29 && f < comes29 + 34 && (() => { const p = trip(on(f, comes29, 30)); return <Packet x={p.x} y={p.y} s={0.9} /> })()}
        <g opacity={on(f, cost29b, 6) * (1 - on(f, cost29b + 16, 8))}><circle cx={1110} cy={GROUND - 120} r={110} fill={P.gold} opacity={0.25} /></g>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, anyone + k * 4, 8)}><Desk x={700 + k * 170} y={GROUND - 120} s={0.35} screen="letter" /></g>)}
      </g>}

      {/* # C) step three: data centers multiply; the spending bars */}
      {C > 0 && <g opacity={C}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, spent, 12)}>
          {Array.from({ length: 9 }, (_, k) => { const at = [millions, millions + 6, huge, huge + 6, chips30, chips30 + 6, buildings30, buildings30 + 5, buildings30 + 10][k]
            return <g key={k} opacity={on(f, at, 8)}><DataCenter x={360 + (k % 3) * 600} y={420 + Math.floor(k / 3) * 250} s={0.42 * pop(f, at)} f={f + k * 7} /></g> })}
        </g>
        <g opacity={on(f, y2025, 8) * (1 - on(f, spent, 8))}><circle cx={960} cy={560} r={150} fill={P.card} /><Label x={960} y={590} text="FY2025" size={90} font="Bebas Neue" color={P.goldInk} /></g>
        <g opacity={on(f, spent, 10)}>
          {([[700, earlier, d28, 28.1, '≈ $28B', 'FY2023'], [1200, financial, d64, 64.6, '≈ $64.5B', 'FY2025']] as [number, number, number, number, string, string][]).map(([x, show, at, v, val, yr], k) => {
            const h = v * 9 * on(f, at, 24) * (k ? 1 + 0.05 * on(f, more33, 6) * (1 - on(f, more33 + 14, 8)) : 1)
            return <g key={k} opacity={on(f, k ? spent : earlier, 8)}>
              <rect x={x - 110} y={GROUND - h} width={220} height={h} rx={14} fill={k ? P.gold : P.skyD} />
              <g opacity={on(f, k ? billion31 : at, 8)}><Label x={x} y={GROUND - h - 30} text={val} size={64} font="Bebas Neue" color={k ? P.goldInk : P.skyInk} /></g>
              <Label x={x} y={GROUND + 70} text={yr} size={48} font="Bebas Neue" color={P.ink2} />
            </g> })}
          <g opacity={on(f, buildings31, 8)}><DataCenter x={1600} y={GROUND} s={0.5 * (1 + 0.1 * on(f, data31b, 6) * (1 - on(f, data31b + 14, 8)))} f={f} /></g>
          <g opacity={on(f, computers, 8)}><Gpu x={1600} y={560} s={0.45} glow={0.8} /></g>
          <g opacity={on(f, years33, 8) * (1 - on(f, doubled, 6))}><path d={`M700 ${GROUND - 300} L1180 ${GROUND - 620}`} stroke={P.ink2} strokeWidth={4} strokeDasharray="10 10" /></g>
          <g opacity={on(f, doubled, 8)}><path d={`M700 ${GROUND - 300} Q950 ${GROUND - 720} 1180 ${GROUND - 620}`} fill="none" stroke={P.goldInk} strokeWidth={8} strokeDasharray="18 12" /><Label x={930} y={GROUND - 600} text="× 2.3" size={72} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}

      {/* # D) the cloud-sales coin, the bite, the reason; then: who pays? */}
      {D > 0 && <g opacity={D}>
        <Ground y={GROUND} dark />
        <g opacity={1 - on(f, expensive, 12)}>
          <g opacity={on(f, cloud, 8)}><PieCoin x={900} y={580} r={260 * pop(f, cloud, 16)} share={0.69} bite={on(f, paying, 24)} /></g>
          <g opacity={on(f, sales, 8)}><Label x={900} y={GROUND + 70} text="CLOUD SALES" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, run34(c), 8)}><Label x={680} y={330} text="RUNNING COSTS" size={52} font="Bebas Neue" color={P.coralInk} anchor="end" /></g>
          <g opacity={on(f, fell, 8)}><Label x={980} y={700} text="69% LEFT" size={84} font="Bebas Neue" color={P.navy0} /></g>
          <g opacity={on(f, scaling, 8)}><Gpu x={1500} y={700} s={0.55 * pop(f, scaling)} glow={1} /><Spark x={1500} y={520} s={0.7} f={f} glow={on(f, ai35, 8)} o={on(f, ai35, 8)} /></g>
        </g>
        <g opacity={on(f, expensive, 10)}>
          <Spark x={960} y={360} s={1.2} f={f} glow={1} />
          {f >= after36 && [0, 1, 2, 3].map((k) => { const t0 = after36 + k * 8 + Math.floor((f - after36) / 32) * 32, fl = fly(f, t0, [960, 420], [960 + (k - 1.5) * 90, GROUND - 40], 16, -20)
            return fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} r={34} o={fl.o} /> : null })}
          <g opacity={on(f, who, 8)}><Label x={1460} y={700} text="?" size={260} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, question36, 8)}><Label x={460} y={700} text="?" size={260} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
      </g>}
      <Vignette id="ab-cost" />
    </g>
  )
}
const run34 = (c: (k: string) => number) => c('s34:run')

const BEATS = ["s21:people", "s21:three", "s22:step", "s22:builds", "s22:big", "s22:once", "s22:programmers", "s23:after", "s23:runs", "s23:computer", "s23:copy", "s23:almost", "s23:nothing", "s24:step", "s24:not", "s24:work", "s25:asks", "s25:paragraph", "s25:request", "s25:travels", "s25:data", "s26:rows", "s26:chips", "s26:answer", "s26:burn", "s26:electricity", "s31:2025", "s31:data", "s36:question", "s31:billion", "s31:buildings", "s27:then", "s27:back", "s27:screen", "s28:longer", "s28:whole", "s28:slides", "s28:keeps", "s28:busy", "s28:costs", "s29:every", "s29:small", "s29:anyone", "s29:cost", "s29:comes", "s30:step", "s30:millions", "s30:huge", "s30:chips", "s30:buildings", "s31:financial", "s31:spent", "s31:64", "s31:equipment", "s31:computers", "s32:earlier", "s32:28", "s33:doubled", "s33:years", "s33:more", "s34:annual", "s34:cloud", "s34:sales", "s34:paying", "s34:fell", "s34:69", "s35:named", "s35:scaling", "s35:ai", "s36:expensive", "s36:after", "s36:who", "s34:run"]
export const AB_COST = makePiece('ab-cost', 'AI bundle ch2: three medallions; programmers build a big W once (big coin pile, once), W runs on Nina\'s laptop, copies ≈ $0; Nina\'s request flies to a data center, chips light, bolts of electricity, answer flies back, longer answer/slides grow the cost pile, every answer drops a coin, more laptops ask; data centers multiply; bars ≈ $28B FY2023 vs ≈ $64.5B FY2025 (×2.3); cloud-sales coin bitten by running costs, 69% left, GPU + spark = scaling AI; coins drip, who pays?', {
  mood: 'dark', Component: Cost, beats: BEATS,
  sfx: [['s22:once', 'thud', 0.25], ['s25:request', 'whoosh', 0.2], ['s26:electricity', 'glitch', 0.15], ['s27:back', 'whoosh', 0.2], ['s31:64', 'thud', 0.25], ['s34:paying', 'crack', 0.2], ['s36:who', 'pop', 0.2]] })
