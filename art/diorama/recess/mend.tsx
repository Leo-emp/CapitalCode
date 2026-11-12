// ---------------------------------------------------------------- s57–s70: step five, how it ends (the lamp warms again).
// A) three numbered wooden levers. 1: the grocer stays lit for food, rent and repairs, and a piggy bank empties into the
//    shops; a card APRIL 2020 SAVED 32% · HIGHEST SINCE 1959. B) 2: THE FED's dial swings down to ≈0% (DEC 2008 · MAR 2020);
//    Nina's $20,000 loan: two interest stacks to scale — 8% = $1,600 a year, 4% = $800 — the $800 difference walks over to
//    pay staff. C) 3: a GOVERNMENT hall sends a benefit token to Tom, who carries part of it to the grocer.
//    D) the spiral in reverse: every shop lights up again and Tom's hours bar climbs back to 30. E) jobs come back late:
//    two wooden rulers 2008 → MAY 2014 and 2020 → JUNE 2022. F) two bars to scale: AVERAGE RECESSION ≈10 MONTHS vs
//    AVERAGE GROWTH ≈64 MONTHS (1945–2020).
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, hand, type Beat } from '../aimoney/common'
import { TableWorld, Vig, Sign, Shop, Hall, FactCard, Stack, Token, Dial, StickSun, Life, TOP, TXT, CREAM, INK, RED, BLUE, TEAL, MUSTARD, GREEN, WOOD, WOOD2, WOOD3, SLATE, PINK, BRASS } from './kit'

const Lever: React.FC<{ x: number; n: number; lit: number; t: string }> = ({ x, n, lit, t }) => (
  <g transform={`translate(${x} ${TOP + 10})`}>
    <ellipse cx={6} cy={6} rx={110} ry={14} fill="rgba(40,24,12,0.25)" />
    <rect x={-90} y={-60} width={180} height={60} rx={10} fill={WOOD2} />
    <g transform={`translate(0 -60) rotate(${lerp(-30, 30, lit)})`}><rect x={-8} y={-200} width={16} height={200} fill={SLATE} /><circle cy={-210} r={30} fill={[RED, BLUE, GREEN][n - 1]} /><text y={-198} textAnchor="middle" fill={CREAM} style={TXT(36)}>{n}</text></g>
    <text y={60} textAnchor="middle" fill={CREAM} style={TXT(36)}>{t}</text>
  </g>
)

const Mend: React.FC<PieceProps> = ({ f, c }) => {
  const three = c('s57:three'), push = c('s57:push')
  const first = c('s58:first'), food = c('s58:food'), saved = c('s58:saved'), again = c('s58:again')
  const april = c('s59:april'), d32 = c('s59:32'), highest = c('s59:highest')
  const second = c('s60:second'), fed = c('s60:federal'), cheaper = c('s60:cheaper'), dec = c('s60:december'), march = c('s60:march'), zero = c('s60:zero')
  const matters = c('s61:matters'), d20000 = c('s61:20000'), d8 = c('s61:8'), d1600 = c('s61:1600'), d4 = c('s61:4'), d800 = c('s61:800')
  const d800b = c('s62:800'), staff = c('s62:staff'), car = c('s62:car'), machine = c('s62:machine')
  const third = c('s63:third'), government = c('s63:government'), benefits = c('s63:benefits'), groceries = c('s63:groceries')
  const replace = c('s64:replace'), grocer = c('s64:grocer'), slows = c('s64:slows')
  const none = c('s65:none'), together = c('s65:together'), spend65 = c('s65:spend')
  const reverse = c('s66:reverse'), hours = c('s66:hours'), barber = c('s66:barber'), more = c('s66:more')
  const years = c('s67:years'), y2008 = c('s67:2008'), may = c('s67:may')
  const y2020 = c('s68:2020'), june = c('s68:june')
  const bigger = c('s69:bigger'), y1945 = c('s69:1945'), d10 = c('s69:10'), d64 = c('s69:64')
  const growing = c('s70:growing'), remembers = c('s70:remembers')

  const A = 1 - on(f, second - 10, 8), B = win(f, second - 2, third - 2, 8), Cc = win(f, third - 2, reverse - 2, 8), D = win(f, reverse - 2, years - 2, 8), E = win(f, years - 2, bigger - 2, 8), F = on(f, bigger - 2, 8)
  const A1 = 1 - on(f, april - 10, 8)
  const rate = lerp(0.9, -0.95, on(f, zero, 30))
  const nina: Beat[] = [[matters, 'think', 'thinking'], [d4, 'relief', 'smiling'], [staff, 'present', 'smiling']]
  const tom: Beat[] = [[benefits, 'receive', 'smiling'], [replace, 'carry', 'smiling'], [grocer, 'offer', 'smiling']]
  const tomBack: Beat[] = [[reverse, 'idle', 'smiling'], [hours, 'celebrate', 'smiling'], [more, 'thumbsUp', 'smiling']]

  return (
    <g>
      <TableWorld f={f} id="rc-mend" mood={f < reverse ? 'dawn' : 'warm'} lamp={lerp(0.25, 0.55, on(f, reverse, 60))} />
      {/* # A) three levers; 1: people keep buying the basics, savers spend again */}
      {A > 0.001 && <g opacity={A}>
        <g opacity={A1}>
          {['PEOPLE', 'THE FED', 'GOVERNMENT'].map((t, k) => <g key={k} opacity={on(f, three + k * 4, 8) * (k === 0 ? 1 : 1 - on(f, first - 6, 8))}><Lever x={k === 0 ? lerp(620 + k * 340, 300, on(f, first, 16)) : 620 + k * 340} n={k + 1} lit={k === 0 ? on(f, first, 12) : 0} t={t} /></g>)}
          <g opacity={on(f, push, 8) * (1 - on(f, first - 6, 8))}><Sign x={960} y={330} t="THREE THINGS PUSH BACK" size={52} col={CREAM} /></g>
          <g opacity={on(f, food, 8)}><Shop x={860} y={TOP + 10} s={0.85} name="GROCER" kind="grocer" roof={GREEN} /><Sign x={860} y={330} t="FOOD · RENT · REPAIRS" size={44} col={CREAM} /></g>
          <g opacity={on(f, saved, 8)}>
            <g transform={`translate(1420 ${TOP + 10})`}><ellipse cx={0} cy={-60} rx={80} ry={58} fill={PINK} /><circle cx={70} cy={-70} r={24} fill={PINK} /><rect x={-20} y={-122} width={40} height={8} rx={4} fill={INK} /></g>
            {[0, 1, 2].map((k) => { const p = ((f - again + k * 10) % 30) / 30; return f >= again ? <Token key={k} x={lerp(1400, 960, p)} y={TOP - 140 - 120 * Math.sin(Math.PI * p) + 100 * p} s={0.8} /> : null })}
            <Sign x={1420} y={460} t="SAVERS SPEND AGAIN" size={42} col={GREEN} tc={CREAM} o={on(f, again, 8)} />
          </g>
        </g>
        <g opacity={on(f, april - 2, 8)}>
          <FactCard x={960} y={TOP - 40} head="APRIL 2020" big="32%" small="OF INCOME SAVED" col={GREEN} s={1.15 * pop(f, april, 12)} />
          <g opacity={on(f, highest, 8)}><Sign x={960} y={330} t="HIGHEST SINCE 1959" size={50} col={GREEN} tc={CREAM} /></g>
        </g>
      </g>}
      {/* # B) 2: the Fed cuts rates; Nina's loan */}
      {B > 0.001 && <g opacity={B}>
        <g opacity={1 - on(f, matters - 10, 8)}>
          <Hall x={500} y={TOP + 10} s={0.95} name="THE FED" />
          <g opacity={on(f, cheaper, 8)}><Dial x={1180} y={TOP + 10} v={rate} label="" s={1.2} /></g>
          <g opacity={on(f, cheaper, 8) * (1 - on(f, dec - 4, 8))}><Sign x={1180} y={420} t="CHEAPER BORROWING" size={46} col={GREEN} tc={CREAM} /></g>
          <g opacity={on(f, dec, 8)}><Sign x={1180} y={420} t={f >= zero ? 'DEC 2008 · MAR 2020 → ≈ 0%' : f >= march ? 'DEC 2008 · MAR 2020' : 'DEC 2008'} size={46} col={MUSTARD} /></g>
        </g>
        <g opacity={on(f, matters - 2, 8)}>
          <Person f={f} who="owner" beats={nina} x={340} y={TOP + 60} s={0.74} />
          <g opacity={on(f, d20000, 8)}><Sign x={340} y={330} t="NINA BORROWS $20,000" size={46} col={CREAM} /></g>
          {/* interest stacks to scale: 1 token = $100 */}
          <g opacity={on(f, d8, 8)}><Stack x={800} y={TOP + 10} n={on(f, d1600, 20) * 16} s={1.2} /><Sign x={800} y={TOP - 280} t={f >= d1600 ? '8%: $1,600 A YEAR' : '8%'} size={40} col={RED} tc={CREAM} /></g>
          <g opacity={on(f, d4, 8)}><Stack x={1260} y={TOP + 10} n={on(f, d800, 20) * 8} s={1.2} /><Sign x={1260} y={TOP - 280} t={f >= d800 ? '4%: $800 A YEAR' : '4%'} size={40} col={GREEN} tc={CREAM} /></g>
          {/* the 800 difference walks over to pay staff */}
          <g opacity={on(f, d800b, 8)}>
            <rect x={762} y={TOP + 10 - 16 * 14.4} width={76} height={8 * 14.4} rx={8} fill="none" stroke={MUSTARD} strokeWidth={6} opacity={0.6 + 0.4 * Math.sin(f / 5)} />
            <Sign x={1560} y={460} t={f >= staff ? '$800 A YEAR FOR STAFF' : '$800 SAVED'} size={44} col={MUSTARD} />
          </g>
          <g opacity={on(f, car, 8)} transform={`translate(1560 ${TOP})`}><path d="M-110 -20 L-90 -60 L-30 -80 L50 -80 L90 -50 L120 -44 L120 -20 Z" fill={BLUE} /><circle cx={-60} cy={-14} r={22} fill={INK} /><circle cx={70} cy={-14} r={22} fill={INK} /></g>
          <g opacity={on(f, machine, 8)}><Sign x={1560} y={700} t="CARS · MACHINES · CAFÉS" size={38} col={CREAM} /></g>
        </g>
      </g>}
      {/* # C) 3: the government's benefits */}
      {Cc > 0.001 && <g opacity={Cc}>
        <g opacity={on(f, government, 8)}><Hall x={420} y={TOP + 10} s={0.9} name="GOVERNMENT" /></g>
        <Person f={f} who="buyer" beats={tom} x={960} y={TOP + 60} s={0.74} />
        <Shop x={1500} y={TOP + 10} s={0.85} name="GROCER" kind="grocer" roof={GREEN} lit={0.6 + 0.4 * on(f, grocer, 12)} />
        {f >= benefits && <Token x={lerp(560, 900, on(f, benefits, 24))} y={TOP - 300 - 100 * Math.sin(Math.PI * on(f, benefits, 24)) + 60 * on(f, benefits, 24)} s={1.2} o={1 - on(f, grocer, 8)} />}
        {f >= grocer && <Token x={lerp(1000, 1440, on(f, grocer, 24))} y={TOP - 240 - 80 * Math.sin(Math.PI * on(f, grocer, 24))} s={0.9} o={1 - on(f, slows, 10)} />}
        <g opacity={on(f, benefits, 8)}><Sign x={600} y={330} t="UNEMPLOYMENT BENEFITS" size={46} col={BLUE} tc={CREAM} /></g>
        <g opacity={on(f, replace, 8)}><Sign x={1260} y={330} t={f >= slows ? 'THE SPIRAL SLOWS' : 'PART OF LOST PAY'} size={46} col={CREAM} /></g>
        <g opacity={on(f, together, 8)}><Sign x={960} y={240} t="TOGETHER: THE CUTTING STOPS" size={40} col={MUSTARD} /></g>
      </g>}
      {/* # D) the spiral runs in reverse */}
      {D > 0.001 && <g opacity={D}>
        <StickSun x={1810} y={420} f={f} s={0.7} o={on(f, reverse, 10)} />
        {['CAFÉ', 'BARBER', 'GROCER'].map((n, k) => <Shop key={k} x={420 + k * 380} y={TOP + 10} s={0.72} name={n} kind={(['cafe', 'barber', 'grocer'] as const)[k]} roof={[RED, BLUE, GREEN][k]} lit={on(f, [hours, barber, barber + 8][k], 12)} dark={1 - on(f, [hours, barber, barber + 8][k], 12)} />)}
        <Person f={f} who="buyer" beats={tomBack} x={1440} y={TOP + 60} s={0.7} flip />
        <g transform="translate(1640 0)" opacity={on(f, hours, 8)}><rect x={-50} y={TOP - 300 - lerp(90, 180, on(f, hours, 24))} width={100} height={lerp(90, 180, on(f, hours, 24))} rx={8} fill={BLUE} /><text y={TOP - 320} textAnchor="middle" fill={CREAM} style={TXT(40)}>{`${Math.round(lerp(15, 30, on(f, hours, 24)))} HRS`}</text></g>
        <g opacity={on(f, reverse, 8)}><Sign x={800} y={330} t="THE SPIRAL IN REVERSE" size={52} col={GREEN} tc={CREAM} /></g>
      </g>}
      {/* # E) jobs come back late */}
      {E > 0.001 && <g opacity={E}>
        {[[y2008, may, '2008', 'MAY 2014', 640, 2008, 2014.4], [y2020, june, '2020', 'JUNE 2022', 820, 2020, 2022.45]].map(([a, b, t0, t1, y, s0, s1], k) => {
          const X = (yr: number) => 240 + (yr - 2008) * 90
          return <g key={k} opacity={on(f, a as number, 8)}>
            <rect x={X(s0 as number)} y={(y as number) - 18} width={(X(s1 as number) - X(s0 as number)) * on(f, b as number, 30)} height={36} rx={18} fill={k ? BLUE : RED} />
            <Sign x={X(s0 as number) - 10} y={(y as number) - 40} t={t0 as string} size={40} col={CREAM} />
            <g opacity={on(f, b as number, 8)}><Sign x={X(s1 as number) + 30} y={(y as number) - 40} t={`JOBS BACK: ${t1}`} size={40} col={k ? BLUE : RED} tc={CREAM} /></g>
          </g> })}
        <g opacity={on(f, years, 8)}><Sign x={960} y={330} t="JOBS CAN TAKE YEARS" size={52} col={CREAM} /></g>
      </g>}
      {/* # F) recessions are short, growth is long */}
      {F > 0.001 && <g opacity={F}>
        <g opacity={on(f, y1945, 8)}><Sign x={960} y={330} t="AVERAGES SINCE 1945" size={50} col={CREAM} /></g>
        <g opacity={on(f, d10, 8)}><rect x={300} y={560} width={1200 * 10.3 / 64.2 * on(f, d10, 20)} height={70} rx={14} fill={RED} /><text x={320} y={540} fill={INK} style={TXT(46)}>RECESSION ≈ 10 MONTHS</text></g>
        <g opacity={on(f, d64, 8)}><rect x={300} y={720} width={1200 * on(f, d64, 40)} height={70} rx={14} fill={GREEN} /><text x={320} y={700} fill={INK} style={TXT(46)}>GROWTH ≈ 64 MONTHS</text></g>
        <g opacity={on(f, growing, 8)}><StickSun x={1700} y={460} f={f} s={0.6} /></g>
        <g opacity={on(f, remembers, 8)}><Sign x={960} y={900} t="BUT THE SHRINKING IS WHAT WE REMEMBER" size={40} col={CREAM} /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={fed} x={500} y={600} kind="glint" />
        <Life f={f} at={groceries} x={1500} y={600} kind="glint" />
        <Life f={f} at={none} x={960} y={500} kind="glint" />
        <Life f={f} at={spend65} x={1500} y={600} kind="spark" />
        <Life f={f} at={c("s58:forever")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s58:repairs")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s59:americans")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s59:1959")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s60:rates")} x={1180} y={700} kind="glint" />
        <Life f={f} at={c("s60:cut")} x={1180} y={700} kind="glint" />
        <Life f={f} at={c("s61:going")} x={1000} y={700} kind="glint" />
        <Life f={f} at={c("s62:work")} x={1000} y={700} kind="glint" />
        <Life f={f} at={c("s63:with")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s63:tom")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s64:pay")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s64:spending")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s65:give")} x={960} y={600} kind="glint" />
        <Life f={f} at={c("s66:the")} x={800} y={600} kind="glint" />
        <Life f={f} at={c("s66:spends")} x={800} y={600} kind="glint" />
        <Life f={f} at={c("s67:jobs#2")} x={960} y={640} kind="glint" />
        <Life f={f} at={c("s68:after")} x={960} y={640} kind="glint" />
        <Life f={f} at={c("s69:and")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s69:stretch")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s70:spends")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s70:the#2")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s59:percent")} x={960} y={700} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rc-mend" />
      <Headline f={f} lines={[[three, 'HOW IT ENDS', INK, 92], [second, 'THE FED CUTS RATES', INK, 92], [third, 'THE GOVERNMENT STEPS IN', INK, 88], [reverse, 'THE SPIRAL REVERSES', INK, 92], [years, 'JOBS COME BACK LATE', INK, 92], [bigger, 'THE BIGGER PICTURE', INK, 92]]} />
    </g>
  )
}

export const RC_MEND = makePiece('rc-mend', 'Step five as the lamp warms: three numbered wooden levers PEOPLE · THE FED · GOVERNMENT (THREE THINGS PUSH BACK); lever 1 flips — a lit GROCER (FOOD · RENT · REPAIRS) and a piggy bank whose tokens hop into the shops (SAVERS SPEND AGAIN); a card APRIL 2020 32% OF INCOME SAVED · HIGHEST SINCE 1959; THE FED hall and a rate dial swinging down (CHEAPER BORROWING, DEC 2008 · MAR 2020 → ≈ 0%); Nina borrows $20,000 and two token stacks to scale show the interest — 8%: $1,600 A YEAR vs 4%: $800 A YEAR — the difference glows ($800 A YEAR FOR STAFF) beside a blue car (CARS · MACHINES · CAFÉS); a GOVERNMENT hall throws a benefit token to Tom, who carries part of it to the grocer (UNEMPLOYMENT BENEFITS, PART OF LOST PAY, THE SPIRAL SLOWS, TOGETHER: THE CUTTING STOPS); a painted sun rises on a stick as the café, barber and grocer light up again and Tom\'s hours bar climbs from 15 to 30 HRS (THE SPIRAL IN REVERSE); two timeline bars 2008 → JOBS BACK: MAY 2014 and 2020 → JOBS BACK: JUNE 2022 (JOBS CAN TAKE YEARS); finally two bars to scale since 1945 — RECESSION ≈ 10 MONTHS (short red) vs GROWTH ≈ 64 MONTHS (long green).', {
  mood: 'light', Component: Mend,
  beats: ["s57:three", "s57:push", "s58:first", "s58:food", "s58:saved", "s58:again", "s59:april", "s59:highest", "s60:second", "s60:federal", "s60:cheaper", "s60:december", "s60:march", "s60:zero", "s61:matters", "s61:20000", "s61:8", "s61:1600", "s61:4", "s61:800", "s62:800", "s62:staff", "s62:car", "s62:machine", "s63:third", "s63:government", "s63:benefits", "s63:groceries", "s64:replace", "s64:grocer", "s64:slows", "s65:none", "s65:together", "s65:spend", "s66:reverse", "s66:hours", "s66:barber", "s66:more", "s67:years", "s67:2008", "s67:may", "s68:2020", "s68:june", "s69:bigger", "s69:1945", "s69:10", "s69:64", "s70:growing", "s70:remembers", "s58:forever", "s58:repairs", "s59:americans", "s59:1959", "s60:rates", "s60:cut", "s61:going", "s62:work", "s63:with", "s63:tom", "s64:pay", "s64:spending", "s65:give", "s66:the", "s66:spends", "s67:jobs#2", "s68:after", "s69:and", "s69:stretch", "s70:spends", "s70:the#2", "s59:percent"],
  sfx: [['s59:32', 'pop', 0.08], ['s60:zero', 'swish', 0.1], ['s66:reverse', 'chime', 0.1]] })
