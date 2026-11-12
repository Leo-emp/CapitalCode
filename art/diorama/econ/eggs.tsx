// ---------------------------------------------------------------- s40–s51: the egg price, step by step (a real supply shock).
// A) A farm at dusk: a barn, eight hens pecking. Bird-flu germs drift in, a 2022 calendar, hens fade to grey ghosts — 173 MILLION BIRDS.
// B) Fewer hens → the stack of egg cartons shrinks from six to two: SUPPLY ↓.
// C) Three shoppers with baskets keep coming: DEMAND → (barely moved).
// D) The lemonade balance again: many buyers vs two cartons, the price tag climbs.
// E) The real BLS line, June 2024 → March 2025 → March 2026, drawn as the voice reads the prices (an egg rides the line).
// F) The price does two jobs: a shopper's carton goes from 12 eggs to 6 (USE LESS); a farmer's chicks grow into hens (MAKE MORE).
// G) A big price tag is a message: SCARCE · USE LESS · MAKE MORE; then tags with red arrows pop onto everything: INFLATION.
import React from 'react'
import { lerp, on, P, pop, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, win, House, Car, type Beat } from '../aimoney/common'
import { Ground } from '../power/kit2'
import { Calendar } from '../charts'
import { Basket } from '../money4/kit'
import { Arrow, Balance, Barn, Bread, Carton, Dude, Egg, Germ, Hen, Pump, Tag, TXT, GREEN, RED } from './kit'

const GROUND = 930
// # BLS average price, eggs grade A large, per dozen (sources/1.txt via FRED APU0000708111); null = not published (Oct 2025)
const EGGS: (number | null)[] = [2.715, 3.080, 3.204, 3.821, 3.370, 3.649, 4.146, 4.953, 5.897, 6.227, 5.122, 4.548, 3.775, 3.599, 3.587, 3.488, null, 2.860, 2.712, 2.577, 2.500, 2.348]
const MON = ['JUN 2024', '', '', '', '', '', '', '', '', 'MAR 2025', '', '', '', '', '', '', '', '', '', '', '', 'MAR 2026']
const cx = (i: number) => 360 + (i / (EGGS.length - 1)) * 1200
const cy = (v: number) => 860 - (v / 7) * 470

const Eggs: React.FC<PieceProps> = ({ f, c }) => {
  const back = c('s40:back'), eggs40 = c('s40:eggs'), step40 = c('s40:step')
  const one = c('s41:one'), flu = c('s41:flu'), y2022 = c('s41:2022'), hit = c('s41:hit'), m173 = c('s41:173'), birds = c('s41:birds'), hens41 = c('s41:hens'), hardest = c('s41:hardest')
  const two = c('s42:two'), fewer = c('s42:fewer'), eggs42 = c('s42:eggs'), supply = c('s42:supply'), dropped = c('s42:dropped')
  const three = c('s43:three'), wanted = c('s43:wanted'), breakfast = c('s43:breakfast'), demand = c('s43:demand'), moved = c('s43:moved')
  const lemonade = c('s44:lemonade'), many = c('s44:many'), few = c('s44:few'), climbed = c('s44:climbed')
  const p270 = c('s45:70'), mid2024 = c('s45:2024'), p623 = c('s45:23'), mar2025 = c('s45:2025')
  const four = c('s46:four'), jobs = c('s46:jobs')
  const shoppers = c('s47:shoppers'), fewer47 = c('s47:fewer'), further = c('s47:further')
  const farmers = c('s48:farmers'), rebuild = c('s48:rebuild'), sell = c('s48:sell')
  const hens49 = c('s49:hens'), supply49 = c('s49:supply'), mar2026 = c('s49:2026'), p235 = c('s49:35')
  const price50 = c('s50:price'), high50 = c('s50:high'), says50 = c('s50:says')
  const message = c('s50:message'), scarce = c('s50:scarce'), less = c('s50:less'), more50 = c('s50:more')
  const everything = c('s51:everything'), expensive = c('s51:expensive'), shortage = c('s51:shortage'), inflation = c('s51:inflation')

  const A = win(f, 0, two - 4), B = win(f, two - 4, three - 4), Cw = win(f, three - 4, lemonade - 6), D = win(f, lemonade - 6, p270 - 14)
  const E = win(f, p270 - 14, four - 4) + win(f, hens49 - 8, price50 - 4), F = win(f, four - 4, hens49 - 8), G = on(f, price50 - 4, 10)

  // # A: hens go grey one by one from "173" on
  const ghostK = (k: number) => on(f, m173 + k * 4, 10)
  // # B: cartons stack 6 → 2
  const stack = Math.round(lerp(6, 2, on(f, fewer + 6, 30)))
  // # E: how far the line is drawn: to MAR 2025 on "23", to MAR 2026 on "35"
  const upTo = f >= p235 - 2 ? lerp(9, 21, on(f, hens49, 50)) : lerp(0, 9, on(f, mid2024, 40))
  const pts = EGGS.map((v, i) => (v === null || i > upTo ? null : [cx(i), cy(v)] as [number, number]))
  const seg = (a: number, b: number) => pts.slice(a, b + 1).filter(Boolean).map((p, i) => `${i ? 'L' : 'M'}${p![0]} ${p![1]}`).join(' ')
  const ride = Math.min(upTo, EGGS.length - 1), ri = Math.floor(ride), rv = EGGS[ri] ?? EGGS[ri - 1]!
  // # F: carton empties, chicks grow
  const halve = on(f, fewer47, 16)

  const shopper: Beat[] = [[three, 'walkA', 'smiling', 'walkB', 10]]
  return (
    <g>
      <Stage id="ec-eggs" frame={f} tint="navy" />
      <Headline f={f} lines={[[step40, 'THE EGGS, STEP BY STEP', '#FFFFFF', 90], [one, 'STEP 1: BIRD FLU', '#FFFFFF', 96], [two, 'STEP 2: SUPPLY DROPS', '#FFFFFF', 96], [three, 'STEP 3: DEMAND STAYS', '#FFFFFF', 96], [lemonade, 'TOO MANY BUYERS, TOO FEW EGGS', '#FFFFFF', 86], [p270, 'US AVERAGE PRICE, DOZEN EGGS', '#FFFFFF', 72], [four, 'STEP 4: THE PRICE DOES TWO JOBS', '#FFFFFF', 86], [hens49, 'US AVERAGE PRICE, DOZEN EGGS', '#FFFFFF', 72], [message, 'A PRICE IS A MESSAGE', P.gold, 100], [everything, 'WHEN EVERYTHING GOES UP…', '#FFFFFF', 90]]} />
      <Ground y={GROUND} dark />

      {/* # A) the farm and the flu */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, back, 10)} transform={`translate(0 ${30 * (1 - pop(f, back, 14))})`}><Barn x={1500} y={GROUND} s={1.05} dim={on(f, m173, 40) * 0.6} /></g>
        <g opacity={on(f, step40, 10)}>{Array.from({ length: 9 }, (_, k) => <rect key={k} x={1100 + k * 90} y={GROUND - 110} width={16} height={110} fill="#B9814E" />)}<rect x={1100} y={GROUND - 90} width={736} height={12} fill="#B9814E" /><rect x={1100} y={GROUND - 50} width={736} height={12} fill="#B9814E" /></g>
        {Array.from({ length: 8 }, (_, k) => <Hen key={k} x={240 + (k % 4) * 230 + (k > 3 ? 110 : 0)} y={GROUND - (k > 3 ? 0 : 110)} s={k > 3 ? 1 : 0.85} peck={Math.max(0, Math.sin((f + k * 13) / 6))} flip={k % 2 === 1} ghost={ghostK(k)} o={on(f, eggs40 - 10 + k * 2, 8)} />)}
        <g opacity={win(f, hens41, hardest + 20, 6)}><ellipse cx={600} cy={GROUND - 60} rx={520} ry={110} fill={RED} opacity={0.18} /></g>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, flu + k * 5, 10)}><Germ x={lerp(-100, [520, 860, 1160][k], on(f, flu + k * 5, 40))} y={[560, 470, 610][k]} s={0.9} f={f + k * 30} /></g>)}
        <g opacity={on(f, y2022 - 4, 10)} transform="translate(250 300)"><Calendar x={0} y={0} text="2022" s={1.2} /></g>
        <g opacity={on(f, m173, 10)} transform={`translate(960 310) scale(${pop(f, m173, 14)})`}>
          <rect x={-250} y={-60} width={500} height={110} rx={16} fill="#FFFFFF" /><text y={20} textAnchor="middle" fill={RED} style={TXT(74)}>173 MILLION BIRDS</text>
        </g>
        <g opacity={on(f, hardest, 10)}><Label x={960} y={420} text="EGG-LAYING HENS HIT HARDEST" size={46} font="Bebas Neue" color="#FFFFFF" /></g>
      </g>}

      {/* # B) fewer hens, fewer eggs */}
      {B > 0 && <g opacity={B}>
        <Hen x={420} y={GROUND} s={1.2} peck={Math.max(0, Math.sin(f / 6))} />
        <Hen x={680} y={GROUND} s={1.1} peck={Math.max(0, Math.sin((f + 9) / 6))} flip />
        {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={k < stack ? 1 : 0}><Carton x={1350} y={GROUND - k * 96} s={0.95} /></g>)}
        <g opacity={on(f, supply, 8)}><Label x={1350} y={GROUND - stack * 96 - 160} text="SUPPLY" size={80} font="Bebas Neue" color="#FFFFFF" /><Arrow x={1640} y={GROUND - stack * 96 - 160} dir="down" col={RED} s={1.1 * pop(f, dropped, 12)} o={on(f, dropped, 6)} /></g>
      </g>}

      {/* # C) people still want eggs */}
      {Cw > 0 && <g opacity={Cw}>
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, three + k * 6, 8)}>
          <Person f={f} who={['buyer', 'investorF', 'investor'][k]} beats={shopper} x={lerp(-200, 520 + k * 420, on(f, three + k * 6, 40))} y={GROUND} s={0.95} />
        </g>)}
        <g opacity={on(f, breakfast, 8)}><rect x={1480} y={760} width={260} height={170} rx={10} fill="#3E4E69" /><Egg x={1560} y={710} s={1.3} /><Bread x={1670} y={760} s={0.9} /></g>
        <g opacity={on(f, demand, 8)}><Label x={960} y={330} text="DEMAND" size={90} font="Bebas Neue" color="#FFFFFF" /><Arrow x={1180} y={302} dir="right" col="#7FA8D8" s={0.8} o={on(f, moved, 8)} /></g>
      </g>}

      {/* # D) just like the lemonade at $1 */}
      {D > 0 && <g opacity={D}>
        <Balance x={960} y={GROUND} s={1.1} tilt={-on(f, few, 20)}
          left={<g>{Array.from({ length: 8 }, (_, k) => <Dude key={k} x={-80 + (k % 5) * 40} y={-Math.floor(k / 5) * 74} s={0.55} col="#7FA8D8" />)}</g>}
          right={<g transform="translate(0 -2) scale(0.42)"><Carton x={-110} y={0} /><Carton x={110} y={0} /></g>} />
        <g opacity={on(f, many, 8)}><Label x={500} y={440} text="MANY BUYERS" size={50} font="Bebas Neue" color="#7FA8D8" /></g>
        <g opacity={on(f, few, 8)}><Label x={1420} y={440} text="FEW EGGS" size={50} font="Bebas Neue" color="#FFFFFF" /></g>
        <g opacity={on(f, climbed, 8)}><Tag x={960} y={lerp(380, 300, on(f, climbed, 20))} t="PRICE UP" s={1} col={RED} ink="#FFFFFF" r={0} /></g>
      </g>}

      {/* # E) the real price line (BLS) */}
      {E > 0 && <g opacity={Math.min(1, E)}>
        {[0, 2, 4, 6].map((v) => <g key={v}><line x1={330} y1={cy(v)} x2={1600} y2={cy(v)} stroke="#FFFFFF" strokeWidth={2} opacity={0.15} /><text x={300} y={cy(v) + 14} textAnchor="end" fill="#FFFFFF" opacity={0.7} style={TXT(40)}>{`$${v}`}</text></g>)}
        {MON.map((m, i) => m ? <text key={i} x={cx(i)} y={910} textAnchor="middle" fill="#FFFFFF" opacity={0.8} style={TXT(38)}>{m}</text> : null)}
        <path d={seg(0, 15)} fill="none" stroke={P.gold} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
        <path d={seg(17, 21)} fill="none" stroke={GREEN} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
        <g transform={`translate(${cx(ride)} ${cy(rv) - 30})`}><Egg x={0} y={0} s={0.8} /></g>
        <g opacity={on(f, p270, 8)}><circle cx={cx(0)} cy={cy(2.715)} r={14} fill={P.gold} /><Label x={cx(0) + 20} y={cy(2.715) + 80} text="$2.72" size={58} font="Bebas Neue" color="#FFFFFF" /></g>
        <g opacity={on(f, p623, 8)}><circle cx={cx(9)} cy={cy(6.227)} r={16 + 14 * win(f, mar2025, four, 6) * (0.5 + 0.5 * Math.sin((f - mar2025) / 4))} fill={RED} opacity={0.9} /><Label x={cx(9)} y={cy(6.227) - 70} text="$6.23 RECORD" size={66} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, p235, 8)}><circle cx={cx(21)} cy={cy(2.348)} r={14} fill={GREEN} /><Label x={cx(21)} y={cy(2.348) + 80} text="$2.35" size={58} font="Bebas Neue" color={GREEN} /></g>
        <g opacity={on(f, supply49, 8) * (1 - on(f, mar2026, 8))}><Label x={1250} y={330} text="HENS BACK, SUPPLY BACK" size={44} font="Bebas Neue" color={GREEN} /></g>
        <Label x={960} y={1010} text="SOURCE: U.S. BUREAU OF LABOR STATISTICS (OCT 2025 NOT PUBLISHED)" size={26} font="Inter" color="#FFFFFF" o={0.6} />
      </g>}

      {/* # F) the two jobs */}
      {F > 0 && <g opacity={F}>
        <rect x={956} y={330} width={8} height={GROUND - 330} rx={4} fill="#FFFFFF" opacity={0.25} />
        <g opacity={on(f, shoppers - 4, 10)}>
          <Person f={f} who="investorF" beats={[[shoppers, 'hold', 'thinking'], [fewer47, 'think', 'worried']]} x={280} y={GROUND} s={1} />
          <Carton x={650} y={GROUND - 200} s={1} n={Math.round(lerp(12, 6, halve))} />
          <rect x={540} y={GROUND - 200} width={220} height={200} rx={10} fill="#3E4E69" />
          <g opacity={on(f, fewer47, 8)}><Label x={650} y={540} text="12 → 6" size={64} font="Bebas Neue" color="#FFFFFF" /></g>
          <g opacity={on(f, further, 8)}><Label x={480} y={420} text="USE LESS" size={80} font="Bebas Neue" color={P.gold} /></g>
        </g>
        <g opacity={on(f, farmers - 4, 10)}>
          <Person f={f} who="worker" beats={[[farmers, 'present', 'smiling'], [sell, 'thumbsUp', 'smiling']]} x={1180} y={GROUND} s={1} />
          {[0, 1, 2].map((k) => <Hen key={k} x={1440 + k * 150} y={GROUND} s={lerp(0.35, 0.8, on(f, rebuild + k * 8, 40))} peck={Math.max(0, Math.sin((f + k * 11) / 6))} o={on(f, rebuild + k * 6, 8)} />)}
          <g opacity={on(f, sell, 8)}><Label x={1590} y={420} text="MAKE MORE" size={80} font="Bebas Neue" color={GREEN} /></g>
        </g>
        <g opacity={on(f, jobs, 8) * (1 - on(f, shoppers, 8))}><Label x={960} y={600} text="TWO JOBS" size={90} font="Bebas Neue" color="#FFFFFF" /></g>
      </g>}

      {/* # G) a price is a message — and then everything rises */}
      {G > 0 && <g opacity={G}>
        <g opacity={1 - on(f, everything - 6, 12)}>
          <g transform={`translate(960 ${470 - 20 * (1 - pop(f, price50, 14))}) scale(${1 + 0.08 * win(f, message, scarce, 6)})`}><Tag x={0} y={0} t="HIGH PRICE" s={1.6} col={P.gold} r={-4 + 8 * win(f, high50, says50, 5) - 8 * win(f, says50, scarce, 5)} /></g>
          {([[scarce, 480, 'SCARCE', <Carton key="c" x={0} y={0} s={0.9} n={2} />], [less, 960, 'USE LESS', <g key="b" transform="scale(0.8)"><Basket x={0} y={0} shown={3} /></g>], [more50, 1440, 'MAKE MORE', <Hen key="h" x={0} y={0} s={1.2} />]] as [number, number, string, React.ReactNode][]).map(([at, x, t, pic], k) => <g key={k} opacity={on(f, at, 8)} transform={`translate(${x} ${GROUND - 40}) scale(${pop(f, at, 12)})`}>
            <g transform="translate(0 -60)">{pic}</g><text y={-240} textAnchor="middle" fill="#FFFFFF" style={TXT(64)}>{t}</text>
          </g>)}
        </g>
        <g opacity={on(f, everything - 6, 12)}>
          {([[300, <g key="h" transform="scale(0.6)"><House x={0} y={0} /></g>], [700, <g key="car" transform="scale(0.8)"><Car x={0} y={0} /></g>], [1100, <Bread key="b" x={0} y={-10} s={1.4} />], [1500, <Pump key="p" x={0} y={0} s={0.9} t="GAS" />]] as [number, React.ReactNode][]).map(([x, pic], k) => <g key={k}>
            <g transform={`translate(${x} ${GROUND})`}>{pic}</g>
            <g opacity={on(f, expensive + k * 5, 6)} transform={`translate(${x} ${560 - 30 * on(f, expensive + k * 5, 14)})`}><Tag x={0} y={0} t="UP" s={0.8} col={RED} ink="#FFFFFF" /><Arrow x={130} y={-10} dir="up" s={0.6} /></g>
          </g>)}
          <g opacity={on(f, shortage, 8) * (1 - on(f, inflation, 8))}><Label x={960} y={340} text="NOT ONE SHORTAGE" size={60} font="Bebas Neue" color="#FFFFFF" /></g>
          <g opacity={on(f, inflation, 8)} transform={`translate(960 330) rotate(-4) scale(${pop(f, inflation, 14)})`}><rect x={-230} y={-60} width={460} height={110} rx={12} fill="none" stroke={RED} strokeWidth={10} /><text y={26} textAnchor="middle" fill={RED} style={TXT(90)}>INFLATION</text></g>
        </g>
      </g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s40:here's")} x={600} y={820} rx={230} ry={120} />
        <Spot f={f} at={c("s41:and")} x={600} y={820} rx={230} ry={120} />
        <Spot f={f} at={c("s42:eggs")} x={1350} y={760} rx={180} ry={200} />
        <Spot f={f} at={c("s44:so")} x={960} y={600} rx={230} ry={200} />
        <Spot f={f} at={c("s45:went")} x={930} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s46:high")} x={960} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s47:so")} x={960} y={720} rx={230} ry={200} />
        <Spot f={f} at={c("s49:dozen")} x={930} y={560} rx={230} ry={200} />
        <Spot f={f} at={c("s51:once")} x={960} y={600} rx={230} ry={200} />
      </g>
      {/* # spots:end */}
      <Vignette id="ec-eggs" />
    </g>
  )
}

export const EC_EGGS = makePiece('ec-eggs', 'The egg price step by step: a farm at dusk, eight hens pecking by a barn, bird-flu germs drift in, a 2022 calendar, hens fade to grey — 173 MILLION BIRDS; the stack of egg cartons shrinks from six to two (SUPPLY down); three shoppers keep walking in (DEMAND barely moved); a balance of many buyers against two cartons and the price tag climbs; the real BLS price line rises from $2.72 to a record $6.23 and falls to $2.35 with an egg riding it; a shopper\'s carton goes from 12 eggs to 6 (USE LESS) and a farmer\'s chicks grow into hens (MAKE MORE); a big HIGH PRICE tag with SCARCE, USE LESS, MAKE MORE; then red tags pop onto a house, a car, bread and a gas pump — INFLATION.', {
  mood: 'dark', Component: Eggs,
  beats: ["s40:back", "s40:eggs", "s40:step", "s41:one", "s41:flu", "s41:2022", "s41:hit", "s41:173", "s41:birds", "s41:hens", "s41:hardest", "s42:two", "s42:fewer", "s42:supply", "s42:dropped", "s43:three", "s43:wanted", "s43:breakfast", "s43:demand", "s43:moved", "s44:lemonade", "s44:many", "s44:few", "s44:climbed", "s45:70", "s45:2024", "s45:23", "s45:2025", "s46:four", "s46:jobs", "s47:shoppers", "s47:fewer", "s47:further", "s48:farmers", "s48:rebuild", "s48:sell", "s49:hens", "s49:supply", "s49:2026", "s49:35", "s50:price", "s50:high", "s50:says", "s50:message", "s50:scarce", "s50:less", "s50:more", "s51:everything", "s51:expensive", "s51:shortage", "s51:inflation", "s40:here's", "s41:and", "s42:eggs", "s44:so", "s45:went", "s46:high", "s47:so", "s49:dozen", "s51:once"],
  sfx: [['s41:173', 'thud', 0.15], ['s42:dropped', 'swish', 0.12], ['s45:23', 'ding', 0.15], ['s49:35', 'chime', 0.15], ['s51:inflation', 'impact', 0.15]] })
