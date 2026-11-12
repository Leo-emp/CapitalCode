// ---------------------------------------------------------------- s19–s32: step two, how one worry spreads (the lamp dims).
// A) Nina's café with a till stack of ten brass tokens ($10,000 A WEEK · MADE-UP); bad news on a toy newspaper, a coffee
//    cup and a lunch box get crossed out. B) the stack loses one token (−10% → $9,000); Tom's hours board drops from 30 to 15
//    and his pay stack loses 270. C) the chain: Tom cuts 200 at the barber, the grocer and the phone shop; Nina puts the
//    $5,000 espresso machine back (an hourglass: NOW SHE WAITS); the WORKS loses the order and a worker walks away; the barber
//    and the grocer cut hours too. D) follow the money along a wooden track; the multiplier: one token → more lost income;
//    a spiral of shops going down; piggy banks fill while the shops dim (the paradox); the cloud spreads.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { TableWorld, Vig, Sign, Cross, Shop, Stack, Token, StickCloud, FactCard, Life, TOP, TXT, CREAM, INK, RED, BLUE, TEAL, MUSTARD, GREEN, WOOD, WOOD2, WOOD3, SLATE, PINK, BRASS } from './kit'

const Bars: React.FC<{ x: number; y: number; h: number; label: string; col: string; o?: number }> = ({ x, y, h, label, col, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-50} y={-h} width={100} height={h} rx={8} fill={col} /><rect x={-50} y={-h} width={26} height={h} fill="#FFFFFF" opacity={0.18} />
    <text y={46} textAnchor="middle" fill={INK} style={TXT(40)}>{label}</text>
  </g>
)
const Pig: React.FC<{ x: number; y: number; fill: number; s?: number }> = ({ x, y, fill, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={6} cy={4} rx={80} ry={12} fill="rgba(40,24,12,0.25)" />
    <ellipse cx={0} cy={-60} rx={80} ry={58} fill={PINK} /><circle cx={70} cy={-70} r={24} fill={PINK} /><circle cx={80} cy={-72} r={5} fill={INK} />
    <rect x={-50} y={-14} width={16} height={18} fill={PINK} /><rect x={30} y={-14} width={16} height={18} fill={PINK} />
    <rect x={-20} y={-122} width={40} height={8} rx={4} fill={INK} />
    {fill > 0 && <Token x={0} y={-130 + 60 * fill} s={0.7} o={1 - fill} />}
  </g>
)

const Spread: React.FC<PieceProps> = ({ f, c }) => {
  const back = c('s19:back'), d10000 = c('s19:10000'), madeup = c('s19:madeup')
  const news = c('s20:news'), careful = c('s20:careful'), coffee = c('s20:coffee'), lunch = c('s20:lunch')
  const drop = c('s21:drop'), d10 = c('s21:10'), d9000 = c('s21:9000')
  const d1000 = c('s22:1000'), bills = c('s22:bills'), cuts = c('s22:cuts'), d30 = c('s22:30'), d15 = c('s22:15')
  const d18 = c('s23:18'), d270 = c('s23:270'), week = c('s23:week')
  const spends = c('s24:spends'), d200 = c('s24:200'), haircuts = c('s24:haircuts'), grocery = c('s24:grocery'), phone = c('s24:phone')
  const espresso = c('s25:espresso'), d5000 = c('s25:5000'), waits = c('s25:waits')
  const company = c('s26:company'), order = c('s26:order'), fewer = c('s26:fewer')
  const barber = c('s27:barber'), grocer = c('s27:grocer'), cut27 = c('s27:cut')
  const follow = c('s28:follow'), lost28 = c('s28:lost'), pay28 = c('s28:pay'), sales28 = c('s28:sales#2'), order28 = c('s28:order')
  const multiplier = c('s29:multiplier'), one29 = c('s29:one#2'), more = c('s29:more')
  const worry = c('s30:worry'), many = c('s30:many'), spiral = c('s30:spiral')
  const strange = c('s31:strange'), saving = c('s31:saving'), smart = c('s31:smart'), everyone = c('s31:everyone'), earns = c('s31:earns')
  const country = c('s32:country'), moment = c('s32:moment')

  const A = 1 - on(f, spends - 10, 8), Cc = win(f, spends - 2, follow - 2, 8), D = on(f, follow - 2, 8)
  const nina: Beat[] = [[back, 'present', 'smiling'], [careful, 'think', 'thinking'], [drop, 'shock', 'worried'], [cuts, 'explain', 'worried'], [espresso, 'stop', 'worried']]
  const tom: Beat[] = [[back, 'idle', 'smiling'], [cuts, 'shock', 'shocked'], [d270, 'despair', 'worried'], [spends, 'emptyPockets', 'worried']]
  const tokens = Math.round(10 - on(f, d9000, 10))
  const hours = lerp(30, 15, on(f, d15, 20))

  return (
    <g>
      <TableWorld f={f} id="rc-spread" mood="dim" lamp={lerp(0.45, 0.2, on(f, spiral, 60))} />
      {/* # A/B) the café, the till, Tom's hours and pay */}
      {A > 0.001 && <g opacity={A}>
        <Shop x={1000} y={TOP + 10} s={1.05} name="NINA'S CAFÉ" kind="cafe" roof={RED} lit={1 - 0.5 * on(f, drop, 20)} />
        <Person f={f} who="owner" beats={nina} x={640} y={TOP + 60} s={0.74} />
        <Person f={f} who="buyer" beats={tom} x={340} y={TOP + 60} s={0.74} />
        {/* the till: ten tokens = $10,000 a week */}
        <g opacity={on(f, d10000, 8)}>
          <Stack x={1440} y={TOP + 10} n={on(f, d10000, 12) * tokens} s={1.2} />
          {f >= d9000 && <Token x={1580 + 60 * on(f, d9000, 20)} y={TOP - 120 + 130 * on(f, d9000, 20)} s={1.2} o={1 - on(f, d1000 + 20, 10)} />}
          <Sign x={1440} y={TOP - 200} t={f >= d9000 ? '$9,000 A WEEK (−10%)' : '$10,000 A WEEK'} size={44} col={f >= d9000 ? RED : MUSTARD} tc={f >= d9000 ? CREAM : INK} />
        </g>
        <g opacity={win(f, madeup, news, 8)}><Sign x={1000} y={330} t="A MADE-UP EXAMPLE" size={46} col={CREAM} /></g>
        {/* bad news, and the cuts */}
        <g opacity={win(f, news, drop, 8)}><StickCloud x={1600} y={380} f={f} storm={on(f, careful, 10)} s={0.7} /></g>
        <g opacity={win(f, coffee, drop, 8)} transform="translate(780 400)"><path d="M-40 -60 L40 -60 L30 20 L-30 20 Z" fill={CREAM} stroke={INK} strokeWidth={4} /><path d="M40 -40 q30 10 0 40" stroke={INK} strokeWidth={4} fill="none" /><Cross x={0} y={-20} s={0.6} /></g>
        <g opacity={win(f, lunch, drop, 8)} transform="translate(1040 400)"><rect x={-60} y={-50} width={120} height={70} rx={10} fill={BLUE} /><rect x={-20} y={-66} width={40} height={18} rx={6} fill="none" stroke={INK} strokeWidth={5} /><Cross x={0} y={-20} s={0.6} /></g>
        <g opacity={on(f, d1000, 8) * (1 - on(f, d18 - 6, 8))}><Sign x={1440} y={330} t="$1,000 LESS FOR BILLS" size={44} col={RED} tc={CREAM} /></g>
        {/* Tom's hours board, then his pay */}
        <g opacity={win(f, cuts, spends - 2, 8)} transform="translate(160 0)">
          <Bars x={0} y={TOP + 10} h={hours * 8} label={`${Math.round(hours)} HRS`} col={BLUE} />
        </g>
        <g opacity={on(f, d270, 8)}><Sign x={340} y={330} t="TOM: −$270 A WEEK" size={50} col={RED} tc={CREAM} /></g>
        <g opacity={on(f, d18, 8) * (1 - on(f, d270, 8))}><Sign x={340} y={330} t="15 HRS × $18" size={50} col={CREAM} /></g>
      </g>}
      {/* # C) the chain across the town */}
      {Cc > 0.001 && <g opacity={Cc}>
        {[[haircuts, 'BARBER', 'barber', BLUE, 420], [grocery, 'GROCER', 'grocer', GREEN, 760], [phone, 'PHONES', 'works', TEAL, 1100]].map(([at, n, k, r, x], i) => (
          <g key={i} opacity={on(f, spends, 8) * (1 - on(f, espresso - 10, 8)) + on(f, barber - 2, 8) * (i < 2 ? 1 : 0)}><Shop x={x as number} y={TOP + 10} s={0.72} name={n as string} kind={k as 'cafe'} roof={r as string} lit={1 - on(f, at as number, 10)} dark={on(f, (i < 2 ? cut27 : (at as number)), 10)} /></g>))}
        <g opacity={win(f, spends, espresso - 2, 8)}>
          <Person f={f} who="buyer" beats={[[spends, 'emptyPockets', 'worried']]} x={1480} y={TOP + 60} s={0.7} flip />
          <Sign x={1480} y={330} t={f >= d200 ? 'TOM SPENDS $200 LESS' : 'TOM SPENDS LESS'} size={46} col={RED} tc={CREAM} />
        </g>
        {/* Nina waits on the espresso machine; the works loses the order */}
        <g opacity={win(f, espresso - 2, barber - 2, 8)}>
          <Person f={f} who="owner" beats={[[espresso, 'stop', 'worried'], [waits, 'armsCrossed', 'neutral']]} x={420} y={TOP + 60} s={0.72} />
          <g transform={`translate(800 ${TOP})`}>
            <ellipse cx={6} cy={6} rx={140} ry={16} fill="rgba(40,24,12,0.25)" />
            <rect x={-110} y={-220} width={220} height={220} rx={14} fill={SLATE} /><rect x={-80} y={-190} width={160} height={70} rx={8} fill="#C9CED6" />
            <rect x={-30} y={-110} width={60} height={50} fill={INK} /><circle cx={60} cy={-150} r={14} fill={RED} />
          </g>
          <g opacity={on(f, d5000, 8)}><Sign x={800} y={TOP - 280} t="$5,000 MACHINE" size={44} col={MUSTARD} /></g>
          <g opacity={on(f, waits, 8)} transform={`translate(1060 ${TOP - 60}) rotate(${180 * on(f, waits, 30)})`}><path d="M-40 -60 L40 -60 L0 0 L40 60 L-40 60 L0 0 Z" fill="#F1E6C8" stroke={WOOD3} strokeWidth={6} /></g>
          <g opacity={on(f, waits, 8)}><Sign x={1060} y={TOP - 200} t="NOW SHE WAITS" size={40} col={CREAM} /></g>
          <g opacity={on(f, company, 8)}><Shop x={1480} y={TOP + 10} s={0.8} name="MACHINE WORKS" kind="works" roof={SLATE} lit={1 - on(f, order, 10)} dark={on(f, order, 10)} /></g>
          <g opacity={on(f, order, 8)}><Sign x={1480} y={330} t="ORDER LOST" size={46} col={RED} tc={CREAM} /></g>
          <g opacity={on(f, fewer, 8)}><Person f={f} who="worker" beats={[[fewer, 'walkA', 'worried', 'walkB', 10]]} x={lerp(1700, 1880, on(f, fewer, 60))} y={TOP + 60} s={0.55} /></g>
        </g>
        <g opacity={on(f, barber, 8)}><Sign x={600} y={330} t="THEY CUT HOURS TOO" size={46} col={RED} tc={CREAM} /></g>
      </g>}
      {/* # D) follow the money; the multiplier; the spiral; the paradox */}
      {D > 0.001 && <g opacity={D}>
        <g opacity={1 - on(f, worry - 10, 8)}>
          <rect x={200} y={TOP - 26} width={1520} height={26} rx={12} fill={WOOD2} />
          {[[follow, '$1,000 SALES', 300, RED], [pay28, '$270 PAY', 680, BLUE], [sales28, 'SHOP SALES', 1060, GREEN], [order28, '$5,000 ORDER', 1460, SLATE]].map(([at, t, x, col], k) => <g key={k} opacity={on(f, at as number, 8)}>
            <FactCard x={x as number} y={TOP - 40} head="LOST" big="" small="" col={col as string} s={0.75 * pop(f, at as number, 12)} />
            <text x={x as number} y={TOP - 120} textAnchor="middle" fill={INK} style={TXT(48)}>{t as string}</text>
            {k > 0 && <path d={`M${(x as number) - 250} ${TOP - 140} l60 0 l-14 -14 m14 14 l-14 14`} stroke={INK} strokeWidth={6} fill="none" />}
          </g>)}
          <g opacity={on(f, multiplier, 8)}><Sign x={960} y={330} t={f >= more ? '$1 LESS SPENT → MORE THAN $1 LESS INCOME' : 'THE MULTIPLIER'} size={44} col={MUSTARD} /></g>
          <g opacity={win(f, follow, multiplier, 8)}><Sign x={960} y={330} t="FOLLOW THE MONEY" size={50} col={CREAM} /></g>
          {f >= one29 && Array.from({ length: 6 }, (_, i) => <Token key={i} x={760 + i * 80} y={460 - 40 * on(f, one29 + i * 3, 12)} s={0.9} o={on(f, one29 + i * 3, 8)} />)}
        </g>
        <g opacity={on(f, worry - 2, 8) * (1 - on(f, strange - 10, 8))}>
          {/* the downward spiral: shops placed on a spiral that sinks toward the table */}
          {Array.from({ length: 7 }, (_, k) => { const x = 260 + k * 200, y = 600 + k * 50 + 6 * Math.sin(f / 12 + k)
            return <g key={k} opacity={on(f, many + k * 3, 8)}><Shop x={x} y={y} s={0.6 - k * 0.04} name="" kind={(['cafe', 'barber', 'grocer', 'works'] as const)[k % 4]} roof={[RED, BLUE, GREEN, SLATE][k % 4]} lit={1 - k / 8} dark={k / 9} /></g> })}
          <g opacity={on(f, spiral, 8)}><Sign x={960} y={330} t="THE DOWNWARD SPIRAL" size={56} col={RED} tc={CREAM} /></g>
          <g opacity={on(f, worry, 8)}><StickCloud x={1640} y={360} f={f} storm={1} s={0.6} /></g>
        </g>
        <g opacity={on(f, strange - 2, 8)}>
          {[0, 1, 2, 3].map((k) => <g key={k}><Pig x={340 + k * 420} y={TOP + 10} fill={((f - saving - k * 7) % 30) / 30 * on(f, saving, 4)} s={0.9} /><Shop x={340 + k * 420 + 150} y={TOP + 10} s={0.45} name="" kind={(['cafe', 'barber', 'grocer', 'works'] as const)[k]} roof={[RED, BLUE, GREEN, SLATE][k]} lit={1 - on(f, everyone + k * 3, 12)} dark={on(f, everyone + k * 3, 12)} /></g>)}
          <g opacity={on(f, smart, 8) * (1 - on(f, everyone, 8))}><Sign x={960} y={330} t="SAVING = SMART, FOR ONE" size={50} col={GREEN} tc={CREAM} /></g>
          <g opacity={on(f, everyone, 8)}><Sign x={960} y={330} t={f >= earns ? 'EVERYONE AT ONCE → TOWN EARNS LESS' : 'EVERYONE AT ONCE…'} size={46} col={RED} tc={CREAM} /></g>
          <g opacity={on(f, country, 8)}><StickCloud x={1060} y={lerp(900, 560, on(f, country, 30))} f={f} storm={1} s={0.8} /></g>
        </g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={bills} x={1440} y={680} kind="glint" />
        <Life f={f} at={week} x={340} y={400} kind="glint" />
        <Life f={f} at={lost28} x={300} y={700} kind="glint" />
        <Life f={f} at={moment} x={960} y={400} kind="spark" />
        <Life f={f} at={c("s20:day")} x={1440} y={700} kind="glint" />
        <Life f={f} at={c("s22:from")} x={1440} y={700} kind="glint" />
        <Life f={f} at={c("s24:dollars")} x={1480} y={600} kind="glint" />
        <Life f={f} at={c("s24:of")} x={1480} y={600} kind="glint" />
        <Life f={f} at={c("s24:town")} x={1480} y={600} kind="glint" />
        <Life f={f} at={c("s25:thing")} x={800} y={700} kind="glint" />
        <Life f={f} at={c("s26:machines")} x={800} y={700} kind="glint" />
        <Life f={f} at={c("s26:too")} x={800} y={700} kind="glint" />
        <Life f={f} at={c("s28:1000")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s28:270")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s28:and")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s28:5000")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s29:call")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s29:less")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s29:the#2")} x={960} y={700} kind="glint" />
        <Life f={f} at={c("s31:each")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s32:so")} x={960} y={760} kind="glint" />
        <Life f={f} at={c("s32:three")} x={960} y={760} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rc-spread" />
      <Headline f={f} lines={[[back, 'ONE WORRY IN ONE TOWN', INK, 88], [spends, 'THE CHAIN SPREADS', INK, 92], [follow, 'FOLLOW THE MONEY', INK, 92], [worry, 'THE DOWNWARD SPIRAL', INK, 92], [strange, 'THE STRANGE PART', INK, 92]]} />
    </g>
  )
}

export const RC_SPREAD = makePiece('rc-spread', 'Step two as the lamp dims: Nina\'s café with a till stack of ten brass tokens ($10,000 A WEEK, A MADE-UP EXAMPLE); a storm cloud on a stick rises and a coffee cup and a lunch box get crossed out; one token falls off the stack ($9,000 A WEEK (−10%), $1,000 LESS FOR BILLS) while Nina\'s windows dim; Tom\'s blue hours bar shrinks from 30 HRS to 15 HRS (15 HRS × $18 → TOM: −$270 A WEEK); then the barber, grocer and phone shop go dark one by one (TOM SPENDS $200 LESS); Nina stops in front of a $5,000 espresso machine as an hourglass turns (NOW SHE WAITS), the MACHINE WORKS goes dark (ORDER LOST) and a worker walks away; the barber and grocer cut hours too; four LOST cards along a wooden track — $1,000 SALES → $270 PAY → SHOP SALES → $5,000 ORDER (FOLLOW THE MONEY, THE MULTIPLIER: $1 LESS SPENT → MORE THAN $1 LESS INCOME, tokens multiplying); eight little shops sink down a spiral, darker and smaller (THE DOWNWARD SPIRAL); finally piggy banks fill beside shops that go dark (SAVING = SMART, FOR ONE · EVERYONE AT ONCE → TOWN EARNS LESS) as a big storm cloud rises over the whole table.', {
  mood: 'light', Component: Spread,
  beats: ["s19:back", "s19:10000", "s19:madeup", "s20:news", "s20:careful", "s20:coffee", "s20:lunch", "s21:drop", "s21:9000", "s22:1000", "s22:bills", "s22:cuts", "s22:15", "s23:18", "s23:270", "s23:week", "s24:spends", "s24:200", "s24:haircuts", "s24:grocery", "s24:phone", "s25:espresso", "s25:5000", "s25:waits", "s26:company", "s26:order", "s26:fewer", "s27:barber", "s27:grocer", "s27:cut", "s28:follow", "s28:lost", "s28:pay", "s28:sales#2", "s28:order", "s29:multiplier", "s29:one#2", "s29:more", "s30:worry", "s30:many", "s30:spiral", "s31:strange", "s31:saving", "s31:smart", "s31:everyone", "s31:earns", "s32:country", "s32:moment", "s20:day", "s22:from", "s24:dollars", "s24:of", "s24:town", "s25:thing", "s26:machines", "s26:too", "s28:1000", "s28:270", "s28:and", "s28:5000", "s29:call", "s29:less", "s29:the#2", "s31:each", "s32:so", "s32:three"],
  sfx: [['s21:9000', 'coin', 0.1], ['s23:270', 'thud', 0.1], ['s26:order', 'thud', 0.08], ['s30:spiral', 'whoosh', 0.1]] })
