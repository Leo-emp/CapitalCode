// ---------------------------------------------------------------- s33–s43: step three, what sets it off (stormy light).
// A wooden mallet strikes the table: a shock ring. A) 2008: a row of toy houses with price tags climbing while the BANK hands
//    out loans; then the tags fall, the houses turn red (can't pay), the bank cracks; the bank's gate drops in front of
//    Nina's café; a card DEC 2007 · 18 MONTHS. B) 2020: shutters slam down on every shop (CLOSED); a card FEB–APR 2020 ·
//    2 MONTHS, the shortest on record. C) rates: THE FED's dial swings to 19% in 1981; a card 16 MONTHS · JOBLESS 10.8%.
//    D) three shocks feed one chain: SPEND LESS → EARN LESS → JOBS CUT.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { TableWorld, Vig, Sign, Shop, Hall, FactCard, Token, Dial, Life, TOP, TXT, CREAM, INK, RED, BLUE, TEAL, MUSTARD, GREEN, WOOD, WOOD2, WOOD3, SLATE, PINK } from './kit'

const House: React.FC<{ x: number; y: number; s?: number; red?: number }> = ({ x, y, s = 1, red = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={6} cy={4} rx={90} ry={12} fill="rgba(40,24,12,0.25)" />
    <rect x={-70} y={-110} width={140} height={110} fill={red > 0.5 ? '#E8B4AE' : CREAM} stroke={INK} strokeWidth={3} />
    <path d="M-90 -110 L0 -180 L90 -110 Z" fill={red > 0.5 ? RED : WOOD} stroke={INK} strokeWidth={3} />
    <rect x={-18} y={-60} width={36} height={60} fill={BLUE} />
  </g>
)

const Shock: React.FC<PieceProps> = ({ f, c }) => {
  const shock = c('s33:shock'), once = c('s33:once')
  const housing = c('s34:housing'), banks = c('s34:banks'), loans = c('s34:loans'), afford = c('s34:afford'), rising = c('s34:rising')
  const fell = c('s35:fell'), pay = c('s35:pay'), banks35 = c('s35:banks'), lost = c('s35:lost')
  const scared = c('s36:scared'), everyone = c('s36:everyone'), caf = c('s36:caf'), spread = c('s36:spread')
  const dec07 = c('s37:december'), d18 = c('s37:18')
  const y2020 = c('s38:2020'), pandemic = c('s38:pandemic'), closed = c('s38:closed'), overnight = c('s38:overnight')
  const two = c('s39:two'), feb = c('s39:february'), shortest = c('s39:shortest')
  const rates = c('s40:rates'), expensive = c('s40:expensive'), less40 = c('s40:less#2')
  const y1981 = c('s41:1981'), inflation = c('s41:inflation'), d19 = c('s41:19'), d16 = c('s41:16'), d108 = c('s41:108')
  const different = c('s42:different'), chain = c('s42:chain'), spend = c('s42:spend'), earn = c('s42:earn'), cut = c('s42:cut')
  const bad = c('s43:bad')

  const A = 1 - on(f, y2020 - 10, 8), B = win(f, y2020 - 2, rates - 2, 8), Cc = win(f, rates - 2, different - 2, 8), D = on(f, different - 2, 8)
  const A1 = 1 - on(f, scared - 10, 8), A2 = on(f, scared - 2, 8)
  const ring = (f - shock) / 24
  const price = (k: number) => Math.round(200 + 40 * k + 140 * on(f, rising, 40) - 220 * on(f, fell, 24))
  const gate = on(f, everyone, 18)

  return (
    <g>
      <TableWorld f={f} id="rc-shock" mood={f < rates ? 'storm' : 'dim'} />
      {/* # the mallet and the shock ring */}
      <g opacity={win(f, shock - 10, housing, 8)}>
        <g transform={`translate(960 ${TOP - 10}) rotate(${lerp(-50, 0, on(f, shock - 6, 6))} 120 -260)`}><rect x={-20} y={-300} width={40} height={260} rx={10} fill={WOOD2} /><rect x={-90} y={-60} width={180} height={80} rx={14} fill={WOOD} stroke={WOOD3} strokeWidth={5} /></g>
        {ring > 0 && ring < 1 && [0, 1].map((k) => <ellipse key={k} cx={960} cy={TOP + 30} rx={200 + 700 * Math.max(0, ring - k * 0.2)} ry={40 + 120 * Math.max(0, ring - k * 0.2)} fill="none" stroke={MUSTARD} strokeWidth={8} opacity={1 - ring} />)}
        <g opacity={on(f, once, 8)}><Sign x={960} y={330} t="A SHOCK THAT HITS MANY AT ONCE" size={46} col={CREAM} /></g>
      </g>
      {/* # A) 2008: housing */}
      {A > 0.001 && <g opacity={A * on(f, housing - 4, 8)}>
        <g opacity={A1}>
          {[0, 1, 2, 3].map((k) => <g key={k} opacity={on(f, housing + k * 3, 8)}><House x={760 + k * 270} y={TOP + 10} s={1} red={on(f, pay, 10)} /><Sign x={760 + k * 270} y={TOP - 220} t={`$${price(k)}K`} size={34} col={on(f, fell, 8) > 0.5 ? RED : GREEN} tc={CREAM} /></g>)}
          <Hall x={330} y={TOP + 10} s={0.8} name="BANK" />
          {/* loans fly from the bank to each house */}
          {f >= loans && [0, 1, 2, 3].map((k) => { const p = on(f, loans + k * 5, 18); return <Token key={k} x={lerp(420, 760 + k * 270, p)} y={TOP - 300 - 120 * Math.sin(Math.PI * p) + 300 * p - 20} s={0.8} o={1 - on(f, fell, 8)} /> })}
          <g opacity={win(f, housing, afford, 8)}><Sign x={1160} y={330} t="2008: HOUSING" size={56} col={CREAM} /></g>
          <g opacity={win(f, afford, fell, 8)}><Sign x={1160} y={330} t="BIG LOANS, WHILE PRICES ROSE" size={48} col={GREEN} tc={CREAM} /></g>
          <g opacity={win(f, fell, banks35, 8)}><Sign x={1160} y={330} t={f >= pay ? 'PRICES FELL · CAN’T PAY' : 'PRICES FELL'} size={50} col={RED} tc={CREAM} /></g>
          {/* the bank cracks */}
          <g opacity={on(f, banks35, 8)}><path d="M300 600 l30 60 l-24 40 l36 60 l-20 50" stroke={INK} strokeWidth={8} fill="none" /><Sign x={330} y={430} t={f >= lost ? 'HUGE LOSSES' : 'BANKS IN TROUBLE'} size={44} col={RED} tc={CREAM} /></g>
        </g>
        <g opacity={A2}>
          <Hall x={420} y={TOP + 10} s={0.9} name="BANK" />
          {/* the bank's gate drops in front of Nina's café */}
          <Shop x={1220} y={TOP + 10} s={1} name="NINA'S CAFÉ" kind="cafe" roof={RED} lit={0.6} />
          <g transform={`translate(830 ${TOP + 10 - 320 * (1 - gate)})`}><rect x={-14} y={-300} width={28} height={300} fill={SLATE} />{[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-120} y={-280 + k * 56} width={240} height={14} fill={SLATE} />)}</g>
          <g opacity={on(f, everyone, 8)}><Sign x={830} y={330} t="BANKS LEND LESS TO EVERYONE" size={46} col={RED} tc={CREAM} /></g>
          <Person f={f} who="owner" beats={[[scared, 'idle', 'neutral'], [caf, 'despair', 'worried']]} x={1740} y={TOP + 60} s={0.7} flip />
          <g opacity={on(f, dec07, 8)} transform={`translate(1520 ${TOP - 30})`}><FactCard x={0} y={-330} head="2008 RECESSION" big={f >= d18 ? '18 MO' : 'DEC 07'} small={f >= d18 ? 'DEC 2007 – JUNE 2009' : 'IT BEGINS'} col={RED} s={0.85 * pop(f, dec07, 12)} /></g>
        </g>
      </g>}
      {/* # B) 2020: shutters down */}
      {B > 0.001 && <g opacity={B}>
        {['CAFÉ', 'BARBER', 'GROCER', 'OFFICE'].map((n, k) => { const down = on(f, closed + k * 4, 10)
          return <g key={k}><Shop x={330 + k * 420} y={TOP + 10} s={0.8} name={n} kind={(['cafe', 'barber', 'grocer', 'works'] as const)[k]} roof={[RED, BLUE, GREEN, SLATE][k]} lit={1 - down} />
            <g transform={`translate(${330 + k * 420} ${TOP + 10})`}><rect x={-104} y={-192} width={208} height={192 * down} fill="#8E949C" />{down > 0.9 && <g transform="translate(0 -100) rotate(-6)"><rect x={-80} y={-26} width={160} height={46} rx={6} fill={CREAM} /><text y={10} textAnchor="middle" fill={RED} style={TXT(36)}>CLOSED</text></g>}</g></g> })}
        <g opacity={on(f, pandemic, 8) * (1 - on(f, two - 4, 8))}><Sign x={960} y={330} t="2020: A PANDEMIC" size={56} col={CREAM} /></g>
        <g opacity={on(f, two, 8)}><FactCard x={960} y={500} head="2020 RECESSION" big="2 MO" small={f >= shortest ? 'THE SHORTEST ON RECORD' : 'FEB – APR 2020'} col={BLUE} s={pop(f, two, 12)} /></g>
      </g>}
      {/* # C) interest rates: 1981 */}
      {Cc > 0.001 && <g opacity={Cc}>
        <Hall x={420} y={TOP + 10} s={0.95} name="THE FED" />
        <g opacity={on(f, expensive, 8)}><Dial x={960} y={TOP + 10} v={lerp(-0.9, 0.2, on(f, expensive, 24)) + 0.75 * on(f, d19, 20)} label="" s={1.2} /><Sign x={960} y={420} t={f >= d19 ? 'MAIN RATE ≈ 19% · 1981' : 'BORROWING GETS EXPENSIVE'} size={44} col={RED} tc={CREAM} /></g>
        <g opacity={on(f, less40, 8) * (1 - on(f, y1981, 8))}><Sign x={1480} y={560} t="BORROW LESS, SPEND LESS" size={44} col={CREAM} /></g>
        <g opacity={on(f, inflation, 8) * (1 - on(f, d16, 8))}><Sign x={1480} y={560} t="TO STOP HIGH INFLATION" size={44} col={CREAM} /></g>
        <g opacity={on(f, d16, 8)}><FactCard x={1480} y={TOP - 30} head="1981–82" big="16 MO" small={f >= d108 ? 'JOBLESS HIT 10.8%' : 'RECESSION'} col={SLATE} s={pop(f, d16, 12)} /></g>
      </g>}
      {/* # D) different shocks, same chain */}
      {D > 0.001 && <g opacity={D}>
        {[['HOUSING', RED], ['PANDEMIC', BLUE], ['RATES', SLATE]].map(([t, col], k) => <g key={k} opacity={on(f, different + k * 4, 8)}><Sign x={300} y={460 + k * 130} t={t} size={44} col={col} tc={CREAM} /><path d={`M440 ${440 + k * 130} Q560 ${440 + k * 130} 620 ${570}`} stroke={INK} strokeWidth={6} fill="none" /></g>)}
        {[[spend, 'SPEND LESS', MUSTARD], [earn, 'EARN LESS', PINK], [cut, 'JOBS CUT', RED]].map(([at, t, col], k) => <g key={k} opacity={on(f, at as number, 8)}><FactCard x={820 + k * 380} y={TOP - 40} head={`${k + 1}`} big="" col={col as string} s={0.85 * pop(f, at as number, 12)} /><text x={820 + k * 380} y={TOP - 140} textAnchor="middle" fill={INK} style={TXT(54)}>{t as string}</text>{k < 2 && <path d={`M${960 + k * 380} ${TOP - 150} l60 0 l-14 -14 m14 14 l-14 14`} stroke={INK} strokeWidth={6} fill="none" />}</g>)}
        <g opacity={on(f, chain, 8)}><Sign x={1200} y={330} t="ONE CHAIN" size={56} col={CREAM} /></g>
        <g opacity={on(f, bad, 8)}><Life f={f} at={bad} x={1580} y={600} kind="spark" /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={banks} x={330} y={600} kind="glint" />
        <Life f={f} at={spread} x={830} y={600} kind="glint" />
        <Life f={f} at={overnight} x={960} y={600} kind="glint" />
        <Life f={f} at={feb} x={960} y={500} kind="glint" />
        <Life f={f} at={c("s33:a#2")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s34:recession")} x={1000} y={700} kind="glint" />
        <Life f={f} at={c("s35:money")} x={1000} y={700} kind="glint" />
        <Life f={f} at={c("s36:businesses")} x={830} y={600} kind="glint" />
        <Life f={f} at={c("s36:economy")} x={830} y={600} kind="glint" />
        <Life f={f} at={c("s37:and")} x={830} y={600} kind="glint" />
        <Life f={f} at={c("s38:offices")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s40:other")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s39:recorded")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s40:borrow")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s41:its")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s41:that")} x={960} y={700} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rc-shock" />
      <Headline f={f} lines={[[shock, 'WHAT SETS IT OFF', INK, 92], [y2020, '2020: THE PANDEMIC', INK, 92], [rates, 'WHEN RATES GO UP', INK, 92], [different, 'DIFFERENT SHOCKS, SAME CHAIN', INK, 84]]} />
    </g>
  )
}

export const RC_SHOCK = makePiece('rc-shock', 'Step three in stormy light: a wooden mallet strikes the table and a golden ring spreads (A SHOCK THAT HITS MANY AT ONCE); 2008: HOUSING — four toy houses whose price tags climb while a BANK hall throws brass loan tokens to them (BIG LOANS, WHILE PRICES ROSE), then the tags drop red and the houses turn red (PRICES FELL · CAN\'T PAY) and the bank cracks (BANKS IN TROUBLE, HUGE LOSSES); a steel gate drops in front of Nina\'s café (BANKS LEND LESS TO EVERYONE) and a card reads 2008 RECESSION 18 MO · DEC 2007 – JUNE 2009; 2020: A PANDEMIC — grey shutters slam down on a café, barber, grocer and office with CLOSED signs, card 2020 RECESSION 2 MO · THE SHORTEST ON RECORD; then THE FED hall and a rate dial swinging into the red (MAIN RATE ≈ 19% · 1981, TO STOP HIGH INFLATION) and a card 1981–82 16 MO · JOBLESS HIT 10.8%; finally three shock signs HOUSING, PANDEMIC, RATES feed one chain of cards SPEND LESS → EARN LESS → JOBS CUT.', {
  mood: 'light', Component: Shock,
  beats: ["s33:shock", "s33:once", "s34:housing", "s34:banks", "s34:loans", "s34:afford", "s34:rising", "s35:fell", "s35:pay", "s35:banks", "s35:lost", "s36:scared", "s36:everyone", "s36:caf", "s36:spread", "s37:december", "s37:18", "s38:2020", "s38:pandemic", "s38:closed", "s38:overnight", "s39:two", "s39:february", "s39:shortest", "s40:rates", "s40:expensive", "s40:less#2", "s41:1981", "s41:inflation", "s41:19", "s41:16", "s41:108", "s42:different", "s42:chain", "s42:spend", "s42:earn", "s42:cut", "s43:bad", "s33:a#2", "s34:recession", "s35:money", "s36:businesses", "s36:economy", "s37:and", "s38:offices", "s40:other", "s39:recorded", "s40:borrow", "s41:its", "s41:that"],
  sfx: [['s33:shock', 'impact', 0.12], ['s35:fell', 'thud', 0.1], ['s38:closed', 'thump', 0.1], ['s41:19', 'pop', 0.08]] })
