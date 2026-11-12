// ---------------------------------------------------------------- s58–s69: step five, what really happens in 2034 (dusk).
// A) the vault drains, envelope by envelope, beside a wall timeline: LATE 2032 · RETIREES & SURVIVORS FUND, then 2034 ·
//    COMBINED. B) the tubes from the workers keep flowing even with the vault empty: a mailbox still gets a check — 83%;
//    $2,000 → ≈ $1,660 drawn to scale; a $0 stamp gets a cross (not zero). C) four brass valve wheels: MORE TAXES · HIGHER
//    PAY LIMIT · LATER RETIREMENT · PAY OUT LESS; the payroll-tax bar 12.4% grows by 4.25 points. D) 1983: a dial turns the
//    full retirement age from 65 to 67; Rosa's timeline 2026 → 2063; a two-way arrow: what she pays in / gets back.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PostWorld, Vig, Stamp, Cross, Envelope, Tube, Mailbox, Vault, Life, FLOOR, TXT, CREAM, INK, RED, NAVY, BRASS, BRASS2, GREEN, GOLD, DEEPT, PLUM, WOOD2 } from './kit'

const Wheel: React.FC<{ x: number; y: number; f: number; spin: number; t: string; o?: number }> = ({ x, y, f, spin, t, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-10} y={0} width={20} height={200} fill={BRASS2} />
    <g transform={`rotate(${spin * 180})`}><circle r={80} fill="none" stroke={BRASS} strokeWidth={14} />{[0, 60, 120].map((a) => <line key={a} x1={-80} y1={0} x2={80} y2={0} stroke={BRASS} strokeWidth={10} transform={`rotate(${a})`} />)}<circle r={18} fill={BRASS2} /></g>
    <text y={250} textAnchor="middle" fill={CREAM} style={TXT(34)}>{t}</text>
  </g>
)

const Y2034: React.FC<PieceProps> = ({ f, c }) => {
  const remember = c('s58:remember'), gap = c('s58:gap'), run = c('s58:run')
  const survivors = c('s59:survivors'), y2032 = c('s59:2032'), combined = c('s59:combined'), y2034 = c('s59:2034')
  const headlines = c('s60:headlines'), savings = c('s60:savings'), stops = c('s60:stops')
  const workers = c('s61:workers'), paying = c('s61:paying'), d83 = c('s61:83')
  const d2000 = c('s62:2000'), d1660 = c('s62:1660'), congress = c('s62:congress')
  const realcut = c('s63:real'), hurt = c('s63:hurt'), zero = c('s63:zero'), end = c('s63:end')
  const few = c('s64:few'), taxes = c('s64:taxes'), limit = c('s64:limit'), age = c('s64:age'), less = c('s64:less')
  const d75 = c('s65:75'), d425 = c('s65:425')
  const before = c('s66:before'), y1983 = c('s66:1983'), raising = c('s66:raising'), d67 = c('s66:67')
  const why = c('s67:why'), today = c('s67:today')
  const d30 = c('s68:30'), y2063 = c('s68:2063'), decades = c('s68:decades'), rules = c('s68:rules')
  const way = c('s69:way'), pay = c('s69:pay'), back = c('s69:back')

  const A = 1 - on(f, headlines - 10, 8), B = win(f, headlines - 2, few - 2, 8), Cc = win(f, few - 2, before - 2, 8), D = on(f, before - 2, 8)
  const drain = on(f, run, 60)
  const ratio = on(f, d83, 24)
  const tl = (yr: number) => 300 + (yr - 2026) * 150

  return (
    <g>
      <PostWorld f={f} id="ss-2034" tone="dusk" dim={0.12} />
      {/* # A) the vault drains; the timeline */}
      {A > 0.001 && <g opacity={A}>
        <Vault x={1680} y={400} s={0.7} fill={lerp(0.9, 0.05, drain)} open={1} />
        {f >= run && [0, 1, 2].map((k) => { const p = ((f - run + k * 12) % 36) / 36; return <Envelope key={k} x={lerp(1640, 1300, p)} y={lerp(460, 560, p)} s={0.55} o={(1 - p) * (1 - on(f, headlines - 10, 8))} /> })}
        <g opacity={on(f, remember, 8)}><Stamp x={1100} y={330} t="THE TRUST FUNDS" size={46} col={NAVY} tc={CREAM} /></g>
        <rect x={260} y={820} width={tl(2035) - 260} height={14} rx={7} fill={CREAM} opacity={on(f, survivors - 4, 8)} />
        {[2026, 2028, 2030, 2032, 2034].map((yr) => <text key={yr} x={tl(yr)} y={800} textAnchor="middle" fill={CREAM} style={TXT(32)} opacity={on(f, survivors - 4, 8)}>{yr}</text>)}
        <g opacity={on(f, y2032, 8)}><rect x={tl(2032.8) - 5} y={700} width={10} height={130} fill={RED} /><Stamp x={tl(2032.8) - 200} y={680} t="LATE 2032 · RETIREES FUND" size={34} col={RED} tc={CREAM} /></g>
        <g opacity={on(f, y2034, 8)}><rect x={tl(2034.6) - 5} y={620} width={10} height={210} fill={RED} /><Stamp x={tl(2034.6) - 160} y={600} t="2034 · COMBINED" size={40} col={RED} tc={CREAM} /></g>
      </g>}
      {/* # B) still paying in: 83% */}
      {B > 0.001 && <g opacity={B}>
        <Vault x={300} y={400} s={0.5} fill={0.02} open={1} />
        {[0, 1, 2].map((k) => <Person key={k} f={f} who={['worker', 'investorF', 'investor'][k]} beats={[[workers, 'offer', 'smiling']]} x={240 + k * 150} y={FLOOR + 60} s={0.5} o={on(f, workers + k * 3, 8)} />)}
        <Tube pts={[[620, 680], [1200, 680], [1200, 600], [1400, 600]]} f={f} flow={on(f, paying, 8) * 0.83 + 0.01} n={6} rate={1.5} />
        <Mailbox x={1500} y={FLOOR} s={1.1} flag={on(f, paying, 10)} />
        <g opacity={on(f, savings, 8) * (1 - on(f, workers - 4, 8))}><Stamp x={960} y={330} t="SAVINGS RUN OUT ≠ PROGRAM STOPS" size={46} col={CREAM} /></g>
        <g opacity={on(f, d83, 8)} transform={`translate(960 330) scale(${pop(f, d83, 12)})`}><Stamp x={0} y={0} t="TAXES STILL PAY ≈ 83%" size={56} col={GREEN} tc={CREAM} /></g>
        {/* the two checks to scale */}
        <g opacity={on(f, d2000, 8) * (1 - on(f, zero - 4, 8))}><Envelope x={1720} y={460} s={1.3} t="$2,000" /></g>
        <g opacity={on(f, d1660, 8) * (1 - on(f, zero - 4, 8))}><Envelope x={1720} y={620} s={1.3 * 0.83} t="≈ $1,660" col="#F3E3C0" /></g>
        <g opacity={on(f, congress, 8) * (1 - on(f, zero - 4, 8))}><Stamp x={1720} y={780} t="UNLESS CONGRESS ACTS" size={34} col={CREAM} /></g>
        <g opacity={on(f, hurt, 8) * (1 - on(f, zero - 4, 8))}><Stamp x={960} y={460} t="A REAL CUT" size={44} col={RED} tc={CREAM} /></g>
        <g opacity={on(f, zero - 2, 8)}><Envelope x={1720} y={520} s={1.4} t="$0" /><Cross x={1720} y={520} s={0.8} /></g>
        <g opacity={on(f, end, 8)}><Stamp x={1720} y={760} t="NOT THE END" size={44} col={GREEN} tc={CREAM} /></g>
      </g>}
      {/* # C) the ways to fix it */}
      {Cc > 0.001 && <g opacity={Cc}>
        {[[taxes, 'MORE TAXES'], [limit, 'HIGHER PAY LIMIT'], [age, 'LATER RETIREMENT'], [less, 'PAY OUT LESS']].map(([at, t], k) => <Wheel key={k} x={360 + k * 400} y={420} f={f} spin={on(f, at as number, 20)} t={t as string} o={on(f, at as number, 8) * (1 - on(f, d75 - 6, 8))} />)}
        <g opacity={on(f, few, 8) * (1 - on(f, d75 - 6, 8))}><Stamp x={960} y={300} t="ONLY A FEW WAYS TO FIX IT" size={50} col={CREAM} /></g>
        <g opacity={on(f, d75 - 2, 8)}>
          <rect x={300} y={560} width={1200 * 12.4 / 20} height={90} rx={12} fill={GREEN} /><text x={320} y={540} fill={CREAM} style={TXT(44)}>PAYROLL TAX TODAY: 12.4%</text>
          <g opacity={on(f, d425, 8)}><rect x={300 + 1200 * 12.4 / 20} y={560} width={1200 * 4.25 / 20 * on(f, d425, 24)} height={90} rx={12} fill={RED} /><Stamp x={300 + 1200 * 14.5 / 20} y={760} t="+4.25 POINTS TO FIX 75 YEARS" size={40} col={RED} tc={CREAM} /></g>
        </g>
      </g>}
      {/* # D) it happened in 1983; Rosa's decades */}
      {D > 0.001 && <g opacity={D}>
        <g opacity={1 - on(f, d30 - 10, 8)}>
          <g opacity={on(f, y1983, 8)}><Stamp x={560} y={330} t="1983: CONGRESS FIXED A SHORTFALL" size={44} col={GOLD} /></g>
          <g transform="translate(960 620)" opacity={on(f, raising, 8)}>
            <path d="M-260 0 A260 260 0 0 1 260 0" fill="none" stroke={CREAM} strokeWidth={14} />
            {[65, 66, 67].map((a, k) => <text key={a} x={-220 + k * 220} y={60} textAnchor="middle" fill={CREAM} style={TXT(60)}>{a}</text>)}
            <line x1={0} y1={0} x2={240 * Math.cos(Math.PI * lerp(1, 0, on(f, d67, 40)))} y2={-240 * Math.sin(Math.PI * lerp(1, 0, on(f, d67, 40)))} stroke={RED} strokeWidth={12} strokeLinecap="round" /><circle r={20} fill={RED} />
            <text y={140} textAnchor="middle" fill={CREAM} style={TXT(44)}>FULL RETIREMENT AGE</text>
          </g>
          <g opacity={on(f, today, 8)}><Stamp x={1500} y={330} t="ROSA’S IS 67 TODAY" size={44} col={NAVY} tc={CREAM} /></g>
        </g>
        <g opacity={on(f, d30 - 2, 8)}>
          <Person f={f} who="investorF" beats={[[d30, 'idle', 'smiling'], [y2063, 'lookFar', 'thinking'], [way, 'explain', 'thinking']]} x={260} y={FLOOR + 60} s={0.66} />
          <rect x={460} y={600} width={1300} height={16} rx={8} fill={CREAM} />
          <g><circle cx={480} cy={608} r={22} fill={GREEN} /><text x={480} y={570} textAnchor="middle" fill={CREAM} style={TXT(40)}>2026 · 30</text></g>
          <g opacity={on(f, y2063, 8)}><circle cx={1740} cy={608} r={22} fill={GOLD} /><text x={1740} y={570} textAnchor="middle" fill={CREAM} style={TXT(40)}>2063 · 67</text></g>
          <g opacity={on(f, decades, 8)}><Stamp x={1110} y={760} t={f >= rules ? 'DECADES TO CHANGE THE RULES' : 'DECADES AWAY'} size={44} col={CREAM} /></g>
          <g opacity={on(f, pay, 8)}><path d="M800 420 L1400 420" stroke={CREAM} strokeWidth={10} /><path d="M1380 400 L1410 420 L1380 440 M820 400 L790 420 L820 440" stroke={CREAM} strokeWidth={10} fill="none" /><text x={800} y={390} fill={CREAM} style={TXT(40)}>PAY IN</text><text x={1400} y={390} textAnchor="end" fill={CREAM} style={TXT(40)} opacity={on(f, back, 8)}>GET BACK</text></g>
        </g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={gap} x={1680} y={400} kind="glint" />
        <Life f={f} at={combined} x={tl(2034)} y={760} kind="glint" />
        <Life f={f} at={stops} x={1500} y={600} kind="glint" />
        <Life f={f} at={realcut} x={1720} y={540} kind="glint" />
        <Life f={f} at={why} x={1500} y={500} kind="glint" />
        <Life f={f} at={c("s59:for")} x={1680} y={400} kind="glint" />
        <Life f={f} at={c("s59:the#3")} x={1680} y={400} kind="glint" />
        <Life f={f} at={c("s60:here's")} x={1500} y={600} kind="glint" />
        <Life f={f} at={c("s61:that")} x={1500} y={600} kind="glint" />
        <Life f={f} at={c("s61:2034")} x={1500} y={600} kind="glint" />
        <Life f={f} at={c("s62:so")} x={1500} y={600} kind="glint" />
        <Life f={f} at={c("s65:payroll")} x={960} y={520} kind="glint" />
        <Life f={f} at={c("s65:alone")} x={960} y={520} kind="glint" />
        <Life f={f} at={c("s66:this")} x={960} y={620} kind="glint" />
        <Life f={f} at={c("s66:partly")} x={960} y={620} kind="glint" />
        <Life f={f} at={c("s66:from")} x={960} y={620} kind="glint" />
        <Life f={f} at={c("s67:age")} x={960} y={620} kind="glint" />
        <Life f={f} at={c("s68:or")} x={1110} y={608} kind="glint" />
        <Life f={f} at={c("s69:much")} x={1110} y={608} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="ss-2034" />
      <Headline f={f} lines={[[remember, 'WHAT HAPPENS IN 2034', CREAM, 92], [headlines, 'WHAT HEADLINES GET WRONG', CREAM, 88], [few, 'HOW TO FIX IT', CREAM, 92], [before, 'IT HAS HAPPENED BEFORE', CREAM, 92]]} />
    </g>
  )
}

export const SS_2034 = makePiece('ss-2034', 'Step five at dusk in the post office: the round vault drains envelope by envelope (THE TRUST FUNDS) beside a cream timeline 2026–2034 with red markers LATE 2032 · RETIREES FUND and 2034 · COMBINED; then three workers still push capsules through a tube into a mailbox even though a small vault is empty (SAVINGS RUN OUT ≠ PROGRAM STOPS · TAXES STILL PAY ≈ 83%), a $2,000 envelope beside a smaller ≈ $1,660 one to scale (UNLESS CONGRESS ACTS · A REAL CUT), and a $0 envelope gets a red cross (NOT THE END); four brass valve wheels turn one by one — MORE TAXES, HIGHER PAY LIMIT, LATER RETIREMENT, PAY OUT LESS (ONLY A FEW WAYS TO FIX IT) — and a green PAYROLL TAX TODAY: 12.4% bar grows a red +4.25 POINTS TO FIX 75 YEARS; then 1983: CONGRESS FIXED A SHORTFALL as a dial swings the FULL RETIREMENT AGE from 65 to 67 (ROSA\'S IS 67 TODAY); finally Rosa beside her own timeline 2026 · 30 → 2063 · 67 (DECADES TO CHANGE THE RULES) under a two-way arrow PAY IN ↔ GET BACK.', {
  mood: 'dark', Component: Y2034,
  beats: ["s58:remember", "s58:gap", "s58:run", "s59:survivors", "s59:2032", "s59:combined", "s59:2034", "s60:headlines", "s60:savings", "s60:stops", "s61:workers", "s61:paying", "s61:83", "s62:2000", "s62:1660", "s62:congress", "s63:real", "s63:hurt", "s63:zero", "s63:end", "s64:few", "s64:taxes", "s64:limit", "s64:age", "s64:less", "s65:75", "s65:425", "s66:before", "s66:1983", "s66:raising", "s66:67", "s67:why", "s67:today", "s68:30", "s68:2063", "s68:decades", "s68:rules", "s69:way", "s69:pay", "s69:back", "s59:for", "s59:the#3", "s60:here's", "s61:that", "s61:2034", "s62:so", "s65:payroll", "s65:alone", "s66:this", "s66:partly", "s66:from", "s67:age", "s68:or", "s69:much"],
  sfx: [['s59:2034', 'thud', 0.1], ['s61:83', 'chime', 0.08], ['s63:zero', 'pop', 0.08], ['s65:425', 'pop', 0.08]] })
