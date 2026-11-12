// ---------------------------------------------------------------- s7–s18: step one, what a recession is (warm lamp).
// A) the rule of thumb: two quarter cards with falling arrows, then a cross (not the official test).
// B) the NBER hall: four cards — JOBS · INCOMES · SPENDING · PRODUCTION; every shop on the table dims (across the whole
//    economy); a month ruler (more than a few months). A table-top timeline: STARTED DEC 2007 … ANNOUNCED DEC 2008, A FULL
//    YEAR; Nina and Tom already stand under the cloud.
// C) 2022: the stock board falls −18% but the jobs gauge stays at 3.5–4%: NO RECESSION; a crystal ball (THE FUTURE) beside
//    the shops (NOW). D) a brass token goes from Tom's hand to Nina's till: spending = someone's income; a wooden pie 68%;
//    a gear machine slows.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, hand, type Beat } from '../aimoney/common'
import { TableWorld, Vig, Sign, Cross, Shop, Hall, FactCard, StickCloud, Token, Dial, Life, TOP, TXT, CREAM, INK, RED, BLUE, TEAL, MUSTARD, GREEN, WOOD, WOOD2, WOOD3, SLATE, BRASS } from './kit'

const Define: React.FC<PieceProps> = ({ f, c }) => {
  const rule = c('s7:rule'), two = c('s7:two'), shrinking = c('s7:shrinking')
  const official = c('s8:official'), america = c('s8:america')
  const group = c('s9:group'), national = c('s9:national'), fall = c('s9:fall'), whole = c('s9:whole'), months = c('s9:months')
  const jobs = c('s10:jobs'), incomes = c('s10:incomes'), spending = c('s10:spending'), production = c('s10:production'), one = c('s10:one')
  const time = c('s11:time'), announced = c('s11:announced'), dec08 = c('s11:2008#2'), year = c('s11:year')
  const official12 = c('s12:official'), living = c('s12:living')
  const crash = c('s13:crash'), y2022 = c('s13:2022'), d18 = c('s13:18')
  const unemp = c('s14:unemployment'), d35 = c('s14:35'), norec = c('s14:no')
  const guesses = c('s15:guesses'), future = c('s15:future'), now = c('s15:now')
  const heart = c('s16:heart'), dollar = c('s16:dollar'), income = c('s16:income')
  const y2026 = c('s17:2026'), households = c('s17:households'), d68 = c('s17:68'), economy = c('s17:economy')
  const less = c('s18:less'), slows = c('s18:slows'), step = c('s18:step')

  const A = 1 - on(f, group - 10, 8), B = win(f, group - 2, crash - 2, 8), Cc = win(f, crash - 2, heart - 2, 8), D = on(f, heart - 2, 8)
  const B1 = 1 - on(f, time - 10, 8), B2 = on(f, time - 2, 8)
  const tom: Beat[] = [[heart, 'idle', 'smiling'], [dollar, 'offer', 'smiling'], [d68, 'present', 'smiling'], [slows, 'shrug', 'thinking']]
  const nina: Beat[] = [[heart, 'idle', 'smiling'], [income, 'receive', 'smiling'], [slows, 'think', 'thinking']]
  const th = hand(f, tom, 520, TOP + 60, 0.72, false)
  const pay = on(f, dollar, 24)

  return (
    <g>
      <TableWorld f={f} id="rc-define" mood="warm" />
      {/* # A) the rule of thumb */}
      {A > 0.001 && <g opacity={A}>
        {[two, two + 10].map((at, k) => <g key={k} opacity={on(f, at, 8)}><FactCard x={760 + k * 400} y={TOP - 40} head={`QUARTER ${k + 1}`} big="↓" small="ECONOMY SHRINKS" col={RED} s={pop(f, at, 12)} /></g>)}
        <g opacity={on(f, rule, 8)}><Sign x={960} y={330} t="A RULE OF THUMB" size={54} col={CREAM} /></g>
        <g opacity={on(f, official, 8)}><Cross x={960} y={TOP - 180} s={1.4} /></g>
        <g opacity={on(f, america, 8)}><Sign x={960} y={440} t="NOT THE OFFICIAL TEST" size={50} col={RED} tc={CREAM} /></g>
      </g>}
      {/* # B) how the official judges decide */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={B1}>
          <Hall x={360} y={TOP + 10} s={0.9} name="NBER" />
          <g opacity={on(f, national, 8)}><Sign x={360} y={430} t="THE RECESSION JUDGES" size={36} col={CREAM} /></g>
          {/* across the whole economy: four shops dim one after another */}
          {['CAFÉ', 'BARBER', 'GROCER', 'WORKS'].map((n, k) => <Shop key={k} x={820 + k * 300} y={TOP + 10} s={0.62} name={n} kind={(['cafe', 'barber', 'grocer', 'works'] as const)[k]} roof={[RED, BLUE, GREEN, SLATE][k]} lit={1 - on(f, whole + k * 3, 10)} dark={on(f, whole + k * 3, 10)} o={on(f, fall, 8) * (1 - on(f, jobs - 6, 8))} />)}
          <g opacity={win(f, fall, jobs - 2, 8)}><Sign x={1270} y={380} t={f >= months ? 'BIG · EVERYWHERE · MONTHS' : f >= whole ? 'BIG · EVERYWHERE' : 'A BIG FALL'} size={50} col={CREAM} /></g>
          {/* the four things they check */}
          {[[jobs, 'JOBS', BLUE], [incomes, 'INCOMES', TEAL], [spending, 'SPENDING', MUSTARD], [production, 'PRODUCTION', RED]].map(([at, t, col], k) => <g key={k} opacity={on(f, at as number, 8)}><FactCard x={820 + k * 300} y={TOP - 30} head="CHECK" big="" small="" col={col as string} s={0.8 * pop(f, at as number, 12)} /><text x={820 + k * 300} y={TOP - 120} textAnchor="middle" fill={INK} style={TXT(70)} opacity={on(f, at as number, 8)}>{['JOBS', 'PAY', 'SPEND', 'MAKE'][k]}</text></g>)}
          <g opacity={on(f, one, 8)}><Sign x={1270} y={380} t="NOT JUST ONE NUMBER" size={50} col={CREAM} /></g>
        </g>
        <g opacity={B2 * (1 - on(f, official12 - 10, 8))}>
          <rect x={260} y={TOP - 20} width={1400} height={24} rx={12} fill={WOOD2} />
          <g transform={`translate(${lerp(360, 360, 0)} ${TOP - 20})`}><rect x={-4} y={-200} width={8} height={200} fill={INK} /><path d="M4 -200 L110 -176 L4 -152 Z" fill={RED} /></g>
          <Sign x={420} y={TOP - 250} t="STARTED DEC 2007" size={44} col={RED} tc={CREAM} />
          <g opacity={on(f, announced, 8)} transform={`translate(1560 ${TOP - 20})`}><rect x={-4} y={-200} width={8} height={200} fill={INK} /><path d="M4 -200 L110 -176 L4 -152 Z" fill={BLUE} /></g>
          <g opacity={on(f, dec08, 8)}><Sign x={1500} y={TOP - 250} t="ANNOUNCED DEC 2008" size={44} col={BLUE} tc={CREAM} /></g>
          <g opacity={on(f, year, 8)}><path d={`M380 ${TOP - 60} Q960 ${TOP - 160} ${lerp(380, 1540, on(f, year, 30))} ${TOP - 60}`} stroke={MUSTARD} strokeWidth={10} fill="none" strokeDasharray="22 14" /><Sign x={960} y={TOP - 150} t="A FULL YEAR LATER" size={48} col={MUSTARD} /></g>
          </g>
        <g opacity={on(f, official12 - 2, 8)}>
          <g>
            <StickCloud x={960} y={360} f={f} storm={1} s={0.7} />
            <Person f={f} who="owner" beats={[[official12, 'nervous', 'worried']]} x={820} y={TOP + 60} s={0.62} />
            <Person f={f} who="buyer" beats={[[official12, 'scratchHead', 'worried']]} x={1100} y={TOP + 60} s={0.62} flip />
          </g>
          <g opacity={on(f, living, 8)}><Sign x={1500} y={430} t="ALREADY INSIDE IT" size={44} col={CREAM} /></g>
        </g>
      </g>}
      {/* # C) 2022: stocks fell, jobs held — no recession */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g opacity={1 - on(f, guesses - 10, 8)}>
          <g opacity={on(f, y2022, 8)}><FactCard x={600} y={TOP - 40} head="S&P 500 · 2022" big="−18%" small="WITH DIVIDENDS" col={RED} s={pop(f, y2022, 12)} /></g>
          <g opacity={on(f, unemp, 8)}><Dial x={1300} y={TOP + 10} v={-0.55 + 0.04 * Math.sin(f / 10)} label="" s={1.1} /><Sign x={1300} y={460} t={f >= d35 ? 'JOBLESS 3.5–4% ALL YEAR' : 'UNEMPLOYMENT'} size={44} col={CREAM} /></g>
          <g opacity={on(f, norec, 8)}><Sign x={960} y={330} t="NO RECESSION" size={64} col={GREEN} tc={CREAM} /></g>
        </g>
        <g opacity={on(f, guesses - 2, 8)}>
          <g transform={`translate(600 ${TOP})`}>
            <ellipse cx={8} cy={6} rx={160} ry={18} fill="rgba(40,24,12,0.25)" />
            <path d="M-110 0 L-80 -60 L80 -60 L110 0 Z" fill={WOOD2} />
            <circle cy={-200} r={150} fill="#BFD7E8" opacity={0.8} /><circle cy={-200} r={150} fill="none" stroke="#FFFFFF" strokeWidth={8} />
            <text y={-185} textAnchor="middle" fill={SLATE} style={TXT(54)}>THE FUTURE</text>
          </g>
          <g opacity={on(f, guesses, 8)}><Sign x={600} y={420} t="STOCKS = GUESSES" size={46} col={CREAM} /></g>
          <g opacity={on(f, now, 8)}>{['JOBS', 'PAY', 'SPENDING'].map((n, k) => <Shop key={k} x={1120 + k * 270} y={TOP + 10} s={0.55} name={n} kind={(['works', 'cafe', 'grocer'] as const)[k]} roof={[SLATE, RED, GREEN][k]} />)}<Sign x={1390} y={420} t="A RECESSION = NOW" size={46} col={CREAM} /></g>
        </g>
      </g>}
      {/* # D) spending is someone's income */}
      {D > 0.001 && <g opacity={D}>
        <g opacity={1 - on(f, y2026 - 10, 8)}>
          <Shop x={1300} y={TOP + 10} s={1.05} name="NINA'S CAFÉ" kind="cafe" roof={RED} />
          <Person f={f} who="buyer" beats={tom} x={520} y={TOP + 60} s={0.72} />
          <Person f={f} who="owner" beats={nina} x={980} y={TOP + 60} s={0.72} flip />
          {f >= dollar && <Token x={lerp(th.x, 920, pay)} y={lerp(th.y, th.y, pay) - 120 * Math.sin(Math.PI * pay)} s={1.2} o={1 - on(f, income + 20, 8)} />}
          <g opacity={on(f, dollar, 8)}><Sign x={520} y={330} t="TOM SPENDS $1" size={46} col={CREAM} /></g>
          <g opacity={on(f, income, 8)}><Sign x={1100} y={330} t="= NINA EARNS $1" size={46} col={MUSTARD} /></g>
        </g>
        <g opacity={on(f, y2026 - 2, 8)}>
          {/* a wooden pie board: households' spending share */}
          <g transform={`translate(760 600)`}>
            <circle r={230} fill={WOOD3} transform="translate(8 12)" opacity={0.5} />
            <circle r={230} fill={CREAM} stroke={INK} strokeWidth={5} />
            {(() => { const a = 2 * Math.PI * 0.676 * on(f, d68, 30); return <path d={`M0 0 L0 -230 A230 230 0 ${a > Math.PI ? 1 : 0} 1 ${230 * Math.sin(a)} ${-230 * Math.cos(a)} Z`} fill={MUSTARD} stroke={INK} strokeWidth={5} /> })()}
            <g opacity={on(f, d68 + 10, 8)}><text x={-10} y={40} textAnchor="middle" fill={INK} style={TXT(120)}>68%</text></g>
          </g>
          <g opacity={on(f, households, 8)}><Sign x={1360} y={420} t="HOUSEHOLD SPENDING" size={50} col={MUSTARD} /></g>
          <g opacity={on(f, economy, 8)}><Sign x={1360} y={540} t="OF THE WHOLE US ECONOMY · 2026" size={36} col={CREAM} /></g>
          {/* the machine slows */}
          <g opacity={on(f, less, 8)} transform="translate(1360 790)">{[0, 1, 2].map((k) => <g key={k} transform={`translate(${(k - 1) * 150} ${k === 1 ? -20 : 0}) rotate(${(k % 2 ? -1 : 1) * (f * 3 * (1 - 0.85 * on(f, slows, 40)))})`}>{Array.from({ length: 10 }, (_, i) => <rect key={i} x={-12} y={-80} width={24} height={26} fill={k === 1 ? BRASS : WOOD2} transform={`rotate(${i * 36})`} />)}<circle r={60} fill={k === 1 ? BRASS : WOOD2} /><circle r={16} fill={INK} /></g>)}</g>
        </g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={shrinking} x={960} y={600} kind="glint" />
        <Life f={f} at={d18} x={600} y={700} kind="glint" />
        <Life f={f} at={step} x={1360} y={700} kind="spark" />
        <Life f={f} at={c("s8:but")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s9:says")} x={360} y={600} kind="glint" />
        <Life f={f} at={c("s9:research")} x={360} y={600} kind="glint" />
        <Life f={f} at={c("s9:shows")} x={360} y={600} kind="glint" />
        <Life f={f} at={c("s9:on")} x={360} y={600} kind="glint" />
        <Life f={f} at={c("s10:things")} x={360} y={600} kind="glint" />
        <Life f={f} at={c("s11:had")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s12:so")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s13:recession")} x={600} y={600} kind="glint" />
        <Life f={f} at={c("s13:dividends")} x={600} y={600} kind="glint" />
        <Life f={f} at={c("s14:all")} x={600} y={600} kind="glint" />
        <Life f={f} at={c("s15:stock")} x={600} y={600} kind="glint" />
        <Life f={f} at={c("s15:is")} x={600} y={600} kind="glint" />
        <Life f={f} at={c("s15:and")} x={600} y={600} kind="glint" />
        <Life f={f} at={c("s16:spending")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s18:how")} x={760} y={600} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rc-define" />
      <Headline f={f} lines={[[rule, 'WHAT A RECESSION IS', INK, 92], [group, 'HOW THE JUDGES DECIDE', INK, 88], [crash, 'NOT A STOCK CRASH', INK, 92], [heart, 'SPENDING IS INCOME', INK, 92]]} />
    </g>
  )
}

export const RC_DEFINE = makePiece('rc-define', 'Step one on the tabletop: two red QUARTER 1 / QUARTER 2 game cards with falling arrows (A RULE OF THUMB) get a big red cross — NOT THE OFFICIAL TEST; a columned NBER hall (THE RECESSION JUDGES) beside four toy shops that go dark one by one (A BIG FALL · EVERYWHERE · MONTHS), then four cards JOBS · PAY · SPEND · MAKE (NOT JUST ONE NUMBER); a wooden timeline with a red flag STARTED DEC 2007 and a blue flag ANNOUNCED DEC 2008 joined by a dashed arc, A FULL YEAR LATER, while Nina and Tom already stand under a storm cloud on a stick (ALREADY INSIDE IT); a card S&P 500 · 2022 −18% WITH DIVIDENDS beside a jobs dial that stays put (JOBLESS 3.5–4% ALL YEAR) — NO RECESSION; a crystal ball THE FUTURE (STOCKS = GUESSES) next to three shops JOBS, PAY, SPENDING (A RECESSION = NOW); Tom hands a brass token to Nina (TOM SPENDS $1 = NINA EARNS $1); a wooden pie board fills to 68% (HOUSEHOLD SPENDING OF THE WHOLE US ECONOMY · 2026) and three gears slow down.', {
  mood: 'light', Component: Define,
  beats: ["s7:rule", "s7:two", "s7:shrinking", "s8:official", "s8:america", "s9:group", "s9:national", "s9:fall", "s9:whole", "s9:months", "s10:jobs", "s10:incomes", "s10:spending", "s10:production", "s10:one", "s11:time", "s11:announced", "s11:2008#2", "s11:year", "s12:official", "s12:living", "s13:crash", "s13:2022", "s13:18", "s14:unemployment", "s14:35", "s14:no", "s15:guesses", "s15:future", "s15:now", "s16:heart", "s16:dollar", "s16:income", "s17:2026", "s17:households", "s17:68", "s17:economy", "s18:less", "s18:slows", "s18:step", "s8:but", "s9:says", "s9:research", "s9:shows", "s9:on", "s10:things", "s11:had", "s12:so", "s13:recession", "s13:dividends", "s14:all", "s15:stock", "s15:is", "s15:and", "s16:spending", "s18:how"],
  sfx: [['s8:official', 'pop', 0.08], ['s14:no', 'chime', 0.08], ['s17:68', 'pop', 0.08]] })
