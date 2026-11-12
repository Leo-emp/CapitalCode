// ---------------------------------------------------------------- s60–s74: step four, how the firm gets paid.
// A) Two and twenty: a made-up $1B fund vault with a tap that drips fee coins to the firm's tower: $20M a year, while
//    the deals above flip between win and lose; five years of drips pile up to $100M; a dial slides from 2% to 1.6%.
// B) Carried interest as a waterfall: profits pour into the investors' bucket first (money back, then +8% a year); only
//    the overflow is split, about 20% to the firm. The $1B → $3B fund: a column with $2B profit, 20% = $400M slides
//    to the firm.
// C) The companies the fund owns send fee envelopes up to the firm (advice, monitoring, arranging deals); the SEC's
//    building with a magnifying glass: not uncommon. Three pipes into the firm; only the profit-share pipe depends on
//    winning — the other two flow either way.
import React from 'react'
import { lerp, on, P, pop, span, Stage, Vignette } from '../kit'
import { Spot } from '../bank/kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Headline, Label, Person, fly, win, type Beat } from '../aimoney/common'
import { Ground, Factory, Office } from '../power/kit2'
import { ToyStore } from './kit'
import { EQ, EQ_D, Envelope, FirmHQ, FundVault, Glass, Lender, MiniShop, MoneyColumn, YearStrip } from './kit'

const GROUND = 930
const GREEN = '#3DBE84', GREEN_D = '#23935F', RED = '#E5634F'

// # a glass bucket that fills (0–1) with a coloured liquid, with marked levels
const Bucket: React.FC<{ x: number; y: number; w: number; h: number; fill: number; col: string; marks?: [number, string, number][]; label?: string }> = ({ x, y, w, h, fill, col, marks = [], label }) => (
  <g>
    <rect x={x - w / 2} y={y - h * Math.max(0, Math.min(1, fill))} width={w} height={h * Math.max(0, Math.min(1, fill))} rx={10} fill={col} opacity={0.9} />
    <path d={`M${x - w / 2 - 10} ${y - h - 10} L${x - w / 2} ${y} L${x + w / 2} ${y} L${x + w / 2 + 10} ${y - h - 10}`} fill="none" stroke="#CFEFFF" strokeOpacity={0.8} strokeWidth={8} strokeLinejoin="round" />
    {marks.map(([lv, t, o], k) => <g key={k} opacity={o}><line x1={x - w / 2} x2={x + w / 2} y1={y - h * lv} y2={y - h * lv} stroke="#FFFFFF" strokeWidth={4} strokeDasharray="12 8" /><text x={x + w / 2 + 24} y={y - h * lv + 16} fill="var(--cc-ink, #F0EAE1)" style={{ font: '400 44px "Bebas Neue"' }}>{t}</text></g>)}
    {label && <text x={x} y={y + 64} textAnchor="middle" fill="var(--cc-ink, #F0EAE1)" style={{ font: '400 48px "Bebas Neue"' }}>{label}</text>}
  </g>
)
// # a deal card that flips between a green up arrow and a red down arrow
const DealCard: React.FC<{ x: number; y: number; win: boolean; o?: number }> = ({ x, y, win: w, o = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-70} y={-70} width={140} height={140} rx={18} fill="var(--cc-paper, #F2E6CC)" />
    {w ? <path d="M0 40 L0 -40 M-30 -10 L0 -40 L30 -10" stroke={GREEN} strokeWidth={14} fill="none" strokeLinecap="round" />
      : <path d="M0 -40 L0 40 M-30 10 L0 40 L30 10" stroke={RED} strokeWidth={14} fill="none" strokeLinecap="round" />}
  </g>
)
// # a fee gauge (half dial) with a needle at value v (0–3 %)
const Gauge: React.FC<{ x: number; y: number; v: number; o?: number }> = ({ x, y, v, o = 1 }) => {
  const a = Math.PI * (1 - v / 3)
  return (
    <g transform={`translate(${x} ${y})`} opacity={o}>
      <path d="M-180 0 A180 180 0 0 1 180 0 Z" fill="var(--cc-card, #16294A)" />
      <path d="M-150 0 A150 150 0 0 1 150 0" fill="none" stroke={EQ} strokeWidth={22} />
      {[0, 1, 2, 3].map((k) => { const b = Math.PI * (1 - k / 3); return <text key={k} x={Math.cos(b) * 110} y={-Math.sin(b) * 110 + 14} textAnchor="middle" fill="var(--cc-ink, #F0EAE1)" style={{ font: '400 36px "Bebas Neue"' }}>{k}%</text> })}
      <line x1={0} y1={0} x2={Math.cos(a) * 150} y2={-Math.sin(a) * 150} stroke={RED} strokeWidth={10} strokeLinecap="round" /><circle r={16} fill={RED} />
    </g>
  )
}

const Paid: React.FC<PieceProps> = ({ f, c }) => {
  const how60 = c('s60:how'), paid60 = c('s60:paid')
  const classic = c('s61:classic'), two61 = c('s61:two'), twenty61 = c('s61:twenty')
  const management = c('s62:management'), fee62 = c('s62:fee'), p2 = c('s62:2'), year62 = c('s62:year'), promised = c('s62:promised')
  const billion63 = c('s63:billion'), p2b = c('s63:2'), d20 = c('s63:20'), year63 = c('s63:year')
  const whether = c('s64:whether'), win64 = c('s64:win'), lose = c('s64:lose')
  const lower = c('s65:lower'), five65 = c('s65:five'), full = c('s65:full'), adds = c('s65:adds'), d100 = c('s65:100')
  const falling = c('s66:falling'), buyout66 = c('s66:buyout'), y2025 = c('s66:2025'), p16 = c('s66:16'), average = c('s66:average')
  const carried = c('s67:carried'), share67 = c('s67:share'), profits67 = c('s67:profits')
  const first68 = c('s68:first'), back68 = c('s68:back'), plus = c('s68:plus'), minimum = c('s68:minimum'), p8 = c('s68:8'), year68 = c('s68:year')
  const only69 = c('s69:only'), after69 = c('s69:after'), firm69 = c('s69:firm'), p20 = c('s69:20'), profits69 = c('s69:profits')
  const grows = c('s70:grows'), b1 = c('s70:1'), b3 = c('s70:3'), profit70 = c('s70:profit'), b2 = c('s70:2'), p20b = c('s70:20'), d400 = c('s70:400'), firm70 = c('s70:firm')
  const stream = c('s71:stream'), companies71 = c('s71:companies'), fees71 = c('s71:fees'), advice = c('s71:advice'), monitoring = c('s71:monitoring'), arranging = c('s71:arranging')
  const sec = c('s72:sec'), regulator = c('s72:regulator'), uncommon = c('s72:uncommon')
  const three73 = c('s73:three'), fee73 = c('s73:fee'), share73 = c('s73:share'), fees73 = c('s73:fees'), owns = c('s73:owns')
  const only74 = c('s74:only'), depends = c('s74:depends'), profit74 = c('s74:profit'), toys74 = c('s74:toys')

  const AB = carried - 8, BC = stream - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), Cw = on(f, BC, 10)

  // # A) the fee drip: one coin every ~25 frames from "fee" on
  const drip = (k: number) => fee62 + 10 + k * 22
  const nDrips = 24
  const pile = lerp(0, 1, on(f, d20, 14)) + lerp(0, 4, span(f, five65, adds + 20))
  // # B) the waterfall levels
  const invFill = 0.55 * on(f, back68, 30) + 0.25 * on(f, p8, 30) + 0.2 * on(f, only69, 30)
  const firmFill = on(f, p20, 30)
  const overflow = on(f, only69, 10)
  return (
    <g>
      <Stage id="pe-paid" frame={f} tint="teal" />
      <Headline f={f} lines={[[how60, 'HOW THE FIRM GETS PAID', P.ink, 104], [classic, '"TWO AND TWENTY"', P.ink, 110], [management, '2% FEE A YEAR', P.ink, 106], [whether, 'WIN OR LOSE', P.ink, 110], [falling, 'FEES ARE FALLING', P.ink, 106], [carried, '20% = CARRIED INTEREST', P.ink, 104], [first68, 'INVESTORS FIRST', P.ink, 106], [only69, 'THEN THE FIRM: ≈ 20%', P.ink, 104], [grows, 'A MADE-UP $1B FUND', P.ink, 104], [stream, 'A THIRD STREAM: COMPANY FEES', P.ink, 96], [three73, 'THREE WAYS TO EARN', P.ink, 106], [only74, 'ONLY ONE NEEDS A WIN', P.ink, 106]]} />
      <Ground y={GROUND} dark />

      {/* # A) the 2% fee tap */}
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, how60, 10)}><FundVault x={560} y={GROUND} s={0.95} fill={0.75} label={f >= billion63 ? '$1B FUND' : 'THE FUND'} /></g>
        <g opacity={on(f, paid60, 10)}><FirmHQ x={1520} y={GROUND} s={0.85} lit={0.7} /></g>
        {/* the "2" and the "20": a fee coin and a slice of profit */}
        <g opacity={win(f, two61, management, 8)} transform={`translate(840 ${520 - 14 * pop(f, two61, 12)})`}><circle r={80} fill={EQ} stroke={EQ_D} strokeWidth={8} /><Label x={0} y={30} text="2%" size={80} font="Bebas Neue" color="#16294A" /></g>
        <g opacity={win(f, twenty61, management, 8)} transform={`translate(1100 ${520 - 14 * pop(f, twenty61, 12)})`}><path d="M0 0 L0 -80 A80 80 0 0 1 76 -25 Z" fill={GREEN} /><circle r={80} fill="none" stroke={GREEN} strokeWidth={8} /><Label x={0} y={130} text="20%" size={70} font="Bebas Neue" color={P.mintInk} /></g>
        {/* the pipe from the vault to the firm, with a tap */}
        <g opacity={on(f, management, 10)}>
          <rect x={780} y={640} width={560} height={40} rx={20} fill="#8A97AA" /><rect x={780} y={640} width={560} height={12} rx={6} fill="#C9D3E0" />
          <rect x={980} y={600} width={60} height={50} rx={10} fill={EQ} /><rect x={960} y={590} width={100} height={18} rx={9} fill={EQ_D} />
          <g opacity={on(f, p2, 8)}><Label x={1010} y={760} text={f >= year62 ? '2% A YEAR' : '2%'} size={54} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, promised, 8) * (1 - on(f, billion63, 8))}><Label x={560} y={480} text="ON MONEY PROMISED" size={46} font="Bebas Neue" color={P.ink} /></g>
        </g>
        {Array.from({ length: nDrips }, (_, k) => { const fl = fly(f, drip(k), [800, 620], [1330, 620], 18, 40); return fl.t > 0 && fl.t < 1 ? <Coin key={k} x={fl.x} y={fl.y} s={0.5} /> : null })}
        {/* the firm's pile: $20M a year, then five years → $100M */}
        <g opacity={on(f, d20, 8)}>
          {Array.from({ length: Math.ceil(pile) }, (_, k) => <g key={k} opacity={Math.min(1, pile - k)}><ellipse cx={1250 + (k % 5) * 0} cy={GROUND - 20 - k * 30} rx={70} ry={18} fill={EQ_D} /><ellipse cx={1250} cy={GROUND - 26 - k * 30} rx={70} ry={18} fill={EQ} /></g>)}
          <Label x={1250} y={GROUND - 60 - Math.ceil(pile) * 30} text={f >= d100 ? '$100M' : f >= year63 ? '$20M / YEAR' : '$20M'} size={50} font="Bebas Neue" color={P.goldInk} />
        </g>
        <g opacity={win(f, five65, falling, 8)}><YearStrip x={560} y={330} n={5} shown={lerp(0, 5, span(f, five65, full + 10))} gap={96} label={(i) => `Y${i + 1}`} /></g>
        {/* the deals above the vault flip between win and lose; the drip never stops */}
        <g opacity={win(f, whether, lower, 8)}>{[0, 1, 2].map((k) => <DealCard key={k} x={400 + k * 160} y={360} win={Math.floor((f - whether) / 20 + k) % 2 === 0} />)}</g>
        {/* fees falling: the dial */}
        <g opacity={on(f, falling, 10)}><g transform={`translate(960 480) scale(${1 + 0.1 * win(f, buyout66, buyout66 + 24, 6)}) translate(-960 -480)`}><Gauge x={960} y={480} v={lerp(2, 1.6, on(f, p16, 24))} /></g>
          <g opacity={on(f, y2025, 8)} transform={`translate(1260 ${400 - 14 * pop(f, y2025, 12)})`}><rect x={-60} y={-56} width={120} height={112} rx={12} fill="#FFFFFF" /><rect x={-60} y={-56} width={120} height={30} rx={12} fill="#C94A3E" /><Label x={0} y={38} text="2025" size={44} font="Bebas Neue" color="#16294A" /></g><g opacity={on(f, p16, 8)}><Label x={960} y={540} text={f >= average ? '≈ 1.6% (2025 FUNDS)' : '≈ 1.6%'} size={50} font="Bebas Neue" color={P.goldInk} /></g></g>
      </g>}

      {/* # B) the waterfall, then the $1B → $3B column */}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, grows, 12)}>
          {/* the profit tank on top pours down */}
          <g opacity={on(f, carried, 10)}><rect x={760} y={240} width={400} height={110} rx={18} fill={GREEN} /><Label x={960} y={312} text="FUND PROFITS" size={56} font="Bebas Neue" color="#FFFFFF" /></g>
          <g opacity={on(f, first68, 8)}><rect x={940} y={350} width={40} height={120} fill={GREEN} opacity={0.85} /><path d={`M960 470 Q${lerp(960, 640, 1)} 520 640 560`} fill="none" stroke={GREEN} strokeWidth={30} strokeLinecap="round" opacity={0.85} /></g>
          <Bucket x={560} y={GROUND - 40} w={300} h={360} fill={invFill} col={GREEN}
            marks={[[0.55, 'MONEY BACK', on(f, back68, 8)], [0.8, '+ 8% A YEAR', on(f, p8, 8)]]} label="INVESTORS" />
          {/* overflow → split 80/20 */}
          <g opacity={overflow}>
            <path d="M960 470 Q1100 520 1240 560" fill="none" stroke={GREEN} strokeWidth={30} strokeLinecap="round" opacity={0.85} />
            <Bucket x={1360} y={GROUND - 40} w={220} h={360} fill={firmFill * 0.6} col={EQ} label={f >= firm69 ? 'FIRM ≈ 20%' : ''} />
            <Person f={f} who="investor" beats={[[only69, 'idle', 'neutral'], [p20, 'celebrate', 'smiling'], [profits69, 'idle', 'smiling']]} x={1680} y={GROUND} s={0.85} flip />
          </g>
          <g opacity={on(f, share67, 8) * (1 - on(f, first68, 8))}><Person f={f} who="investor" beats={[[0, 'pointUp', 'smiling']]} x={1500} y={GROUND} s={0.85} flip /></g>
        </g>
        {/* the made-up fund: $1B grows into $3B */}
        <g opacity={on(f, grows, 12)}>
          <MoneyColumn x={760} y={GROUND - 10} w={260} unit={0.19} grow={on(f, b1, 14)} labelSide="in" size={52}
            segs={[{ v: 1000, col: '#E8DCC2', colD: '#CDB58C', label: '$1B IN' }, { v: 2000, col: GREEN, colD: GREEN_D, label: f >= b2 ? '$2B PROFIT' : '', lo: on(f, b2, 8), o: on(f, b3, 8) },
              ]} />
          <g opacity={on(f, b3, 8)}><Label x={760} y={GROUND - 3000 * 0.19 - 40} text="$3B" size={60} font="Bebas Neue" color={P.ink} /></g>
          {/* 20% of the profit slides to the firm */}
          <g opacity={on(f, p20b, 8)} transform={`translate(${lerp(0, 820, on(f, d400, 20))} ${lerp(0, 70, on(f, d400, 20))})`}>
            <rect x={630} y={GROUND - 10 - 3000 * 0.19} width={260} height={400 * 0.19} rx={12} fill={EQ} />
            <Label x={760} y={GROUND - 3000 * 0.19 + 58} text="$400M" size={48} font="Bebas Neue" color="#16294A" />
          </g>
          <g opacity={on(f, d400, 8)}><FirmHQ x={1580} y={GROUND} s={0.7} lit={0.5 + 0.5 * win(f, firm70, firm70 + 30, 6)} /><g opacity={win(f, firm70, firm70 + 40, 6)}><ellipse cx={1580} cy={GROUND - 200} rx={200} ry={240} fill={P.gold} opacity={0.15} /></g></g>
        </g>
      </g>}

      {/* # C) company fees, the SEC, three streams */}
      {Cw > 0 && <g opacity={Cw}>
        <FirmHQ x={lerp(1560, 960, on(f, three73, 16))} y={lerp(GROUND, 620, on(f, three73, 16))} s={lerp(0.8, 0.6, on(f, three73, 16))} lit={0.8} />
        <g opacity={1 - on(f, three73, 12)}>
          {[0, 1, 2].map((k) => { const x = 260 + k * 380
            return <g key={k} opacity={on(f, companies71 + k * 4, 8) * (1 - on(f, sec, 10))}>{k === 0 ? <MiniShop x={x} y={GROUND} s={1.2} /> : k === 1 ? <Factory x={x} y={GROUND} s={0.75} /> : <Office x={x} y={GROUND} s={0.6} />}</g> })}
          {([[advice, 'ADVICE', 260], [monitoring, 'MONITORING', 640], [arranging, 'DEALS', 1020]] as [number, string, number][]).map(([at, t, x], k) => {
            const fl = fly(f, at, [x, 640], [1560, 820], 26, 160)
            return <g key={k}>{fl.t > 0 && fl.t < 1 && <Envelope x={fl.x} y={fl.y} s={0.8} t={t} />}
              <g opacity={on(f, at + 26, 6) * (1 - on(f, sec, 8))}><Envelope x={1340} y={GROUND - 60 - k * 90} s={0.8} r={k % 2 ? 4 : -4} t={t} /></g></g>
          })}
          <g opacity={on(f, fees71, 8) * (1 - on(f, sec, 8))}><Label x={640} y={GROUND + 70} text="COMPANIES THE FUND OWNS" size={46} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, sec, 10)}><Lender x={520} y={GROUND} s={0.8} name="SEC" /><Glass x={900} y={560} s={0.7} /></g>
          <g opacity={on(f, uncommon, 8)}><rect x={280} y={330} width={480} height={86} rx={16} fill={P.card} /><Label x={520} y={390} text={'"NOT UNCOMMON"'} size={54} font="Bebas Neue" color={P.goldInk} /></g>
        </g>
        {/* three pipes into the firm */}
        <g opacity={on(f, three73, 10)}>
          {([[fee73, 'FEE ON THE FUND', 300, false], [share73, 'SHARE OF PROFITS', 960, true], [fees73, 'COMPANY FEES', 1620, false]] as [number, string, number, boolean][]).map(([at, t, x, needsWin], k) => {
            const lit = needsWin ? on(f, depends, 10) : 0, dim = needsWin ? 0 : 0
            return <g key={k} opacity={on(f, at, 8)}>
              <path d={`M${x} 800 Q${x} 640 960 ${640}`} fill="none" stroke={needsWin ? GREEN : EQ} strokeWidth={needsWin ? 26 + 10 * lit : 26} strokeLinecap="round" opacity={0.9 - dim} />
              <rect x={x - 190} y={800} width={380} height={96} rx={18} fill={P.card} stroke={needsWin && lit > 0 ? GREEN : 'none'} strokeWidth={6} />
              <Label x={x} y={864} text={t} size={46} font="Bebas Neue" color={needsWin ? P.mintInk : P.goldInk} />
              {Array.from({ length: 3 }, (_, j) => { const u = ((f - at) / 40 + j / 3) % 1; return f > at ? <Coin key={j} x={lerp(x, 960, u)} y={lerp(800, 640, u) - Math.sin(u * Math.PI) * (x === 960 ? 0 : 60)} s={0.45} /> : null })}
              <g opacity={on(f, needsWin ? depends : profit74, 8)}><Label x={x} y={980} text={needsWin ? 'ONLY IF IT WINS' : 'PAID EITHER WAY'} size={44} font="Bebas Neue" color={needsWin ? P.mintInk : P.ink2} /></g>
            </g>
          })}
        </g>
      </g>}
      {/* "that brings us to Toys R Us": the toy store slides in, top right */}
      {Cw > 0 && <g opacity={on(f, c('s74:brings'), 10)} transform={`translate(${lerp(2100, 1700, on(f, c('s74:brings'), 20))} 0)`}><ToyStore x={0} y={460} s={0.36} dark={1 - on(f, toys74, 12)} f={f} /></g>}
      {/* # spots:begin */}
      <g>
        <Spot f={f} at={c("s63:madeup")} x={560} y={760} rx={210} ry={200} />
        <Spot f={f} at={c("s63:fund")} x={560} y={760} rx={210} ry={200} />
        <Spot f={f} at={c("s63:dollars")} x={560} y={760} rx={210} ry={200} />
        <Spot f={f} at={c("s65:later")} x={1250} y={820} rx={120} ry={120} />
        <Spot f={f} at={c("s65:just")} x={1250} y={820} rx={120} ry={120} />
        <Spot f={f} at={c("s65:dollars")} x={1250} y={780} rx={120} ry={160} />
        <Spot f={f} at={c("s66:have")} x={960} y={460} rx={200} ry={120} />
        <Spot f={f} at={c("s67:the")} x={960} y={300} rx={210} ry={80} />
        <Spot f={f} at={c("s67:firm's")} x={1500} y={760} rx={140} ry={220} />
        <Spot f={f} at={c("s70:dollars")} x={760} y={820} rx={140} ry={120} />
        <Spot f={f} at={c("s70:into")} x={760} y={600} rx={140} ry={200} />
        <Spot f={f} at={c("s73:firm")} x={960} y={500} rx={150} ry={180} />
        <Spot f={f} at={c("s73:can")} x={960} y={500} rx={150} ry={180} />
        <Spot f={f} at={c("s74:those")} x={960} y={850} rx={230} ry={70} />
      </g>
      {/* # spots:end */}
      <Vignette id="pe-paid" />
    </g>
  )
}

export const PE_PAID = makePiece('pe-paid', 'Step four, how the firm gets paid: a 2% coin and a 20% slice ("two and twenty"); a made-up $1B fund vault with a tap dripping fee coins along a pipe to the firm tower, $20M a year, piling to $100M over five calendar years while deal cards above flip win/lose; a dial slides from 2% to about 1.6% (2025 buyout funds). Carried interest as a waterfall: FUND PROFITS pour into the investors\' bucket first (MONEY BACK, then +8% A YEAR), only the overflow goes to the firm\'s bucket (≈20%), the partner celebrates. The $1B fund grows to $3B (a $2B green profit block), 20% = $400M slides to the firm. Company fees: a shop, factory and office send ADVICE, MONITORING and DEALS envelopes up to the firm; the SEC building with a magnifier, "NOT UNCOMMON". Three pipes into the firm: fee on the fund and company fees (paid either way), share of profits (only if it wins)', {
  mood: 'dark', Component: Paid,
  beats: ["s60:how", "s60:paid", "s61:classic", "s61:two", "s61:twenty", "s62:management", "s62:fee", "s62:2", "s62:year", "s62:promised", "s63:billion", "s63:20", "s63:year", "s64:whether", "s64:lose", "s65:lower", "s65:five", "s65:full", "s65:adds", "s65:100", "s66:falling", "s66:buyout", "s66:2025", "s66:16", "s66:average", "s67:carried", "s67:share", "s68:first", "s68:back", "s68:plus", "s68:minimum", "s68:8", "s69:only", "s69:firm", "s69:20", "s69:profits", "s70:grows", "s70:1", "s70:3", "s70:2", "s70:20", "s70:400", "s70:firm", "s71:stream", "s71:companies", "s71:fees", "s71:advice", "s71:monitoring", "s71:arranging", "s72:sec", "s72:regulator", "s72:uncommon", "s73:three", "s73:fee", "s73:share", "s73:fees", "s73:owns", "s74:depends", "s74:profit", "s74:toys", "s74:brings", "s63:madeup", "s63:fund", "s63:dollars", "s65:later", "s65:just", "s65:dollars", "s66:have", "s67:the", "s67:firm's", "s70:dollars", "s70:into", "s73:firm", "s73:can", "s74:those"],
  sfx: [['s61:two', 'pop', 0.2], ['s63:20', 'coin', 0.2], ['s65:100', 'cash', 0.2], ['s66:16', 'tick', 0.2], ['s68:8', 'pop', 0.15], ['s69:20', 'coin', 0.2], ['s70:400', 'cash', 0.2], ['s71:advice', 'flutter', 0.15], ['s72:uncommon', 'thump', 0.15], ['s74:depends', 'chime', 0.2]] })
