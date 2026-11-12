// ============================================================
// SHORT — "McDonald's Makes More From Rent Than From Burgers"
// (s1–s26, ≈ 2:07), five tall pieces. Sourced: McDonald's Form
// 10-K FY2025 — rents $10,442M, royalties $6,018M, initial fees
// $88M (franchised revenues $16,548M); company-operated sales
// $9,690M with restaurant margins $1,422M; franchised occupancy
// costs $2,618M (our maths: 16,548 − 2,618 ≈ 13.9B kept); ~95% of
// restaurants franchised; owns ~56% of land and ~80% of buildings
// in its consolidated markets; franchised margins ≈ 90% of
// restaurant margin dollars.
// House rules: every picture lands on its spoken word, never before;
// one main group at a time, the last leaves before the next arrives;
// no zooms or camera moves (owner r56) — the drawing itself changes;
// all inside x 60–940, y 380–1270 (captions sit at y 1290–1490).
// ============================================================
import React from 'react'
import { Mini } from '../../rig/Mini'
import { Label } from '../charts'
import { easeOut, lerp, on, P, pop, span, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Calendar, Coin, Doc, fly, Person, Tick } from '../aimoney/common'
import { Prop, TallStage } from './tall'

const CX = 500
const LOOKS = ['buyer', 'investor', 'hero', 'worker', 'owner', 'investorF']
const RED = '#D8432F', YEL = '#F2B632'
// # visible from a to b with clean fades (gone by b)
const win = (f: number, a: number, b: number, d = 5) => on(f, a, d) * (1 - easeOut(span(f, b - d, b)))
// # one headline slot at y 330: each line from its cue until the next line's cue
type Head = [at: number, text: string, color?: string, size?: number]
const Headline: React.FC<{ f: number; lines: Head[]; until?: number; y?: number }> = ({ f, lines, until = 9e9, y = 330 }) => (
  <g>{lines.map(([a, text, color, size], k) => {
    const b = k + 1 < lines.length ? lines[k + 1][0] : until
    const o = on(f, a, 5) * (1 - easeOut(span(f, b - 5, b)))
    return o > 0.001 ? <g key={k} transform={`translate(${CX} ${y}) scale(${0.94 + 0.06 * on(f, a, 8)})`}><Label x={0} y={0} text={text} size={size ?? 96} font="Bebas Neue" color={color ?? P.ink} o={o} /></g> : null
  })}</g>
)
// # a burger: bun, lettuce, patty, cheese, bun
const Burger: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-80 10 Q-80 -60 0 -62 Q80 -60 80 10 Z" fill="#E8A54B" /><path d="M-86 14 Q-60 28 -40 14 Q-20 28 0 14 Q20 28 40 14 Q60 28 86 14 L86 22 L-86 22 Z" fill="#5BBF5A" />
    <rect x={-84} y={20} width={168} height={26} rx={12} fill="#7A3E22" /><path d="M-80 20 L80 20 L60 34 L40 22 L-70 30 Z" fill="#F7C531" />
    <path d="M-80 48 L80 48 Q80 74 0 76 Q-80 74 -80 48 Z" fill="#E8A54B" />
    {[-40, -10, 25, 50].map((sx, k) => <ellipse key={k} cx={sx} cy={-38 + (k % 2) * 10} rx={5} ry={3} fill="#FFF3D6" />)}
  </g>
)
// # a small burger restaurant: red roof band, windows, door; franchised=1 paints the roof gold
const Shop: React.FC<{ x: number; y: number; s?: number; o?: number; gold?: number; sign?: boolean }> = ({ x, y, s = 1, o = 1, gold = 0, sign = true }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-110} y={-90} width={220} height={150} rx={8} fill="#F7F2E8" stroke={P.edge} strokeWidth={4} />
    <rect x={-120} y={-118} width={240} height={40} rx={8} fill={gold > 0.5 ? YEL : RED} />
    <rect x={-90} y={-60} width={70} height={56} rx={6} fill="#9FD4F0" /><rect x={20} y={-60} width={70} height={56} rx={6} fill="#9FD4F0" />
    <rect x={-22} y={0} width={44} height={60} rx={4} fill={P.navy3} />
    {sign && <path d="M-26 -84 Q-19 -112 -12 -84 Q-6 -112 0 -84" transform="translate(6 0)" fill="none" stroke={gold > 0.5 ? RED : YEL} strokeWidth={6} />}
  </g>
)
// # a plain bar with a label under it and a value on top
const Bar: React.FC<{ x: number; base: number; h: number; w?: number; color: string; label: string; value?: string; o?: number; vo?: number; dark?: boolean }> = ({ x, base, h, w = 170, color, label, value, o = 1, vo = 1, dark }) => (
  <g opacity={o}>
    <rect x={x - w / 2} y={base - h} width={w} height={h} rx={12} fill={color} />
    <Label x={x} y={base + 52} text={label} size={44} font="Bebas Neue" color={dark ? '#C9D3E8' : P.ink} />
    {value && <Label x={x} y={base - h - 22} text={value} size={58} font="Bebas Neue" color={dark ? '#FFFFFF' : P.ink} o={vo} />}
  </g>
)
// # an envelope with a word on it (a payment)
const Envelope: React.FC<{ x: number; y: number; text: string; s?: number; o?: number; color?: string }> = ({ x, y, text, s = 1, o = 1, color = '#F7F2E8' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-130} y={-80} width={260} height={160} rx={14} fill={color} stroke={P.edge} strokeWidth={4} />
    <path d="M-130 -80 L0 10 L130 -80" fill="none" stroke={P.edge} strokeWidth={4} />
    <text x={0} y={60} textAnchor="middle" fill={P.ink} style={{ font: '400 48px "Bebas Neue"', letterSpacing: 3 }}>{text}</text>
  </g>
)

// ------------------------------------------------------------ 1) s1–s3: rent beats its own food sales
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), collected = c('s1:collected'), d104 = c('s1:104'), rent1 = c('s1:rent')
  const more = c('s2:more'), food = c('s2:food'), runs = c('s2:runs'), d97 = c('s2:97')
  const burger3 = c('s3:burger'), landlord = c('s3:landlord'), cook = c('s3:cook')
  const A = win(f, s1, more), B = win(f, more, burger3), C = on(f, burger3, 6)
  return (
    <g>
      <TallStage id="mc-hook" f={f} />
      <Headline f={f} lines={[[d104, '$10.4 BILLION IN RENT', P.ink, 88], [more, 'MORE THAN ITS OWN', P.ink, 88], [d97, 'FOOD SALES: $9.7B', P.coralInk, 88], [landlord, 'LANDLORD…', P.goldInk, 104], [cook, '…OR COOK?', P.coralInk, 104]]} />
      {A > 0 && <g opacity={A}>
        <Shop x={CX} y={700} s={1.5 * pop(f, s1)} />
        <g opacity={on(f, collected, 5)}>{Array.from({ length: 5 }, (_, k) => { const p = fly(f, collected + k * 4, [CX, 760], [260 + k * 120, 1150], 18, 120); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.7} o={p.o} /> : null })}</g>
        <g opacity={on(f, d104, 5)}>{Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, d104 + k * 2, 4)} transform={`translate(${260 + k * 120} ${1150 - (k % 2) * 24})`}><Prop id="cash-stack" x={0} y={0} size={130} f={f} /></g>)}</g>
        <g opacity={on(f, rent1, 5)}><Envelope x={790} y={520} text="RENT" s={0.7 * pop(f, rent1)} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <line x1={180} y1={1180} x2={820} y2={1180} stroke={P.ink2} strokeWidth={5} />
        <Bar x={340} base={1180} h={560} color="#3DAA6E" label="RENT" value="$10.4B" />
        <Bar x={660} base={1180} h={520 * on(f, food, 16)} color={RED} label="ITS OWN FOOD SALES" value="$9.7B" o={on(f, food, 5)} vo={on(f, d97, 5)} />
        <g opacity={on(f, runs, 5)}><Burger x={660} y={920} s={0.9 * pop(f, runs)} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <g opacity={on(f, burger3, 5)} transform="translate(500 620)"><Burger x={0} y={0} s={1.2 * pop(f, burger3)} /></g>
        <Person f={f} who="owner" beats={[[0, 'think', 'thinking'], [landlord, 'holdUp', 'smug'], [cook, 'shrug', 'thinking']]} x={CX} y={1240} s={0.7} />
        <g opacity={on(f, landlord, 5)} transform={`translate(260 900) scale(${pop(f, landlord)})`}><Prop id="key" x={0} y={0} size={180} f={f} /></g>
        <g opacity={on(f, cook, 5)}><g transform={`translate(760 900) scale(${pop(f, cook)})`}><path d="M-70 40 L70 40 L60 -10 Q90 -40 60 -70 Q40 -110 0 -90 Q-40 -110 -60 -70 Q-90 -40 -60 -10 Z" fill="#FFFFFF" stroke={P.edge} strokeWidth={5} /></g></g>
      </g>}
      <Vignette id="mc-hook" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 2) s4–s6a: 19 in 20 are franchised
const Who: React.FC<PieceProps> = ({ f, c }) => {
  const s4 = c('s4'), runs4 = c('s4:runs'), local4 = c('s4:local')
  const d95 = c('s5:95'), franchisees = c('s5:franchisees'), owners = c('s5:owners'), pay5 = c('s5:pay'), name = c('s5:name')
  const itself = c('s6:itself'), one = c('s6:1'), d20 = c('s6:20')
  const other = c('s6a:other'), d19 = c('s6a:19'), somebody = c('s6a:somebody')
  const A = win(f, s4, d95), B = on(f, d95, 6)
  const gold = (k: number) => k !== 7 && f >= d95 + k * 1.2
  return (
    <g>
      <TallStage id="mc-who" f={f} tint="navy" />
      <Headline f={f} lines={[[s4, 'WHO RUNS IT?', '#FFFFFF', 104], [d95, '95% FRANCHISED', P.gold, 104], [owners, 'LOCAL OWNERS', '#FFFFFF'], [one, 'McDONALD\'S RUNS 1 IN 20', '#FF9A85', 80], [d19, '19 IN 20: SOMEONE ELSE', P.gold, 80]]} />
      {A > 0 && <g opacity={A}>
        <Shop x={CX} y={800} s={1.6 * pop(f, s4)} />
        <g opacity={on(f, runs4, 5)} transform="translate(500 620)"><Prop id="question" x={0} y={-180} size={150} f={f} /></g>
        <g opacity={on(f, local4, 5)} transform="translate(780 1100)"><Prop id="map-pin" x={0} y={0} size={160} f={f} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        {Array.from({ length: 20 }, (_, k) => { const x = 170 + (k % 4) * 220, y = 520 + Math.floor(k / 4) * 150, g = gold(k), hot = k === 7 && f >= one; return <g key={k} opacity={on(f, d95 + k * 0.6, 4) * (f >= somebody && k === 7 ? 0.55 : 1)}>
          <Shop x={x} y={y} s={0.42} gold={g ? 1 : 0} />
          {hot && <rect x={x - 62} y={y - 70} width={124} height={110} rx={12} fill="none" stroke="#FF9A85" strokeWidth={6} />}
        </g> })}
        <g opacity={on(f, franchisees, 5)}>{Array.from({ length: 4 }, (_, k) => <Mini key={k} look={LOOKS[k]} x={170 + k * 220} y={1250} scale={0.8} frame={f} seed={k + 5} mood="happy" />)}</g>
        <g opacity={on(f, pay5, 5) * (1 - on(f, itself, 6))}>{Array.from({ length: 4 }, (_, k) => { const p = fly(f, pay5 + k * 3, [170 + k * 220, 1150], [CX, 440], 18, 80); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.5} o={p.o} /> : null })}</g>
        <g opacity={on(f, name, 5) * (1 - on(f, itself, 6))}><Prop id="price-tag" x={860} y={1140} size={110} f={f} /></g>
        <g opacity={on(f, d20, 5)}><Label x={170 + 3 * 220} y={1060} text="1 OF 20" size={46} font="Bebas Neue" color="#FF9A85" /></g>
      </g>}
      <Vignette id="mc-who" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 3) s7–s13a: the landlord deal
const Land: React.FC<PieceProps> = ({ f, c }) => {
  const s7 = c('s7'), miss = c('s7:miss')
  const owns8 = c('s8:owns'), land8 = c('s8:land'), building8 = c('s8:building'), lease = c('s8:lease')
  const franchisee9 = c('s9:franchisee'), equipment = c('s9:equipment'), seats = c('s9:seats'), signs = c('s9:signs'), moves = c('s9:moves')
  const countries = c('s10:countries'), us = c('s10:us'), d56 = c('s10:56'), land10 = c('s10:land'), d80 = c('s10:80'), buildings10 = c('s10:buildings')
  const franchisee11 = c('s11:franchisee'), buy = c('s11:buy'), right = c('s11:right'), macs = c('s11:macs'), rent11 = c('s11:rent'), too = c('s11:too')
  const two = c('s12:two'), royalties = c('s12:royalties'), brand = c('s12:brand'), rent12 = c('s12:rent'), building12 = c('s12:building')
  const share = c('s13:share'), sells13 = c('s13:sells'), minimum = c('s13:minimum'), keeps = c('s13:keeps'), slow = c('s13:slow')
  const burgers = c('s13a:burgers'), sells13a = c('s13a:sells'), rent13a = c('s13a:rent'), collects = c('s13a:collects')
  const A = win(f, s7, countries), B = win(f, countries, franchisee11), C = win(f, franchisee11, two), D = win(f, two, share), E = on(f, share, 6)
  // # s13–s13a: a sales bar with the rent slice; sales grow on "burgers … sells", a floor line marks the minimum rent
  const sales = f >= burgers ? lerp(380, 640, on(f, sells13a, 16)) : f >= slow ? lerp(380, 200, on(f, slow, 10)) : 380
  const rentH = Math.max(90, sales * 0.25)
  return (
    <g>
      <TallStage id="mc-land" f={f} />
      <Headline f={f} lines={[[miss, 'THE PART MOST PEOPLE MISS', P.ink, 76], [owns8, 'McDONALD\'S OWNS THE SPOT', P.ink, 80], [lease, 'OR HOLDS A LONG LEASE', P.ink, 80], [franchisee9, 'THE FRANCHISEE MOVES IN', P.goldInk, 80], [us, 'IN THE US AND OTHERS', P.ink, 84], [right, 'NOT JUST THE BRAND…', P.ink], [rent11, '…THEY RENT THE BUILDING', P.goldInk, 84], [two, 'TWO PAYMENTS', P.ink, 104], [share, 'A SHARE OF SALES', P.ink], [minimum, 'WITH A MINIMUM RENT', P.coralInk, 88], [burgers, 'MORE SALES, MORE RENT', P.mintInk, 88]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, s7, 5) * (1 - on(f, owns8, 6))} transform="translate(500 760)"><Prop id="magnifier" x={0} y={0} size={260} f={f} /></g>
        <g opacity={on(f, owns8, 5)}>
          <rect x={120} y={1000} width={760} height={140} rx={16} fill="#7FC98A" opacity={on(f, land8, 8)} />
          <g opacity={on(f, land8, 5)}><Label x={CX} y={1100} text="LAND" size={56} font="Bebas Neue" color="#1F5A2E" /></g>
          <g opacity={on(f, building8, 5)}><Shop x={CX} y={900} s={1.5 * pop(f, building8)} /></g>
          <g opacity={on(f, lease, 5) * (1 - on(f, franchisee9, 6))}><Doc x={810} y={640} s={0.6 * pop(f, lease)} title="LEASE" lines={2} /></g>
          <g opacity={on(f, franchisee9, 5)}>
            <Mini look="worker" x={lerp(140, 380, on(f, moves, 18))} y={1240} scale={1} frame={f} seed={21} mood="happy" />
            <g opacity={on(f, equipment, 5)} transform="translate(160 620)"><rect x={-60} y={-50} width={120} height={100} rx={10} fill="#9AA6BC" /><rect x={-40} y={-30} width={80} height={30} rx={4} fill="#5A6680" /></g>
            <g opacity={on(f, seats, 5)}>{[0, 1].map((k) => <rect key={k} x={300 + k * 80} y={560} width={56} height={70} rx={12} fill={RED} />)}</g>
            <g opacity={on(f, signs, 5)} transform="translate(800 600)"><rect x={-14} y={0} width={28} height={140} fill={P.navy3} /><rect x={-80} y={-70} width={160} height={80} rx={12} fill={RED} /><path d="M-30 -10 Q-22 -60 -10 -10 Q0 -60 10 -10" transform="translate(10 0)" fill="none" stroke={YEL} strokeWidth={8} /></g>
          </g>
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, countries, 5)} transform="translate(500 560)"><Prop id="globe" x={0} y={0} size={200} f={f} /></g>
        {[0, 1].map((k) => { const at = k === 0 ? d56 : d80, pct = k === 0 ? 0.56 : 0.8, cx = 300 + k * 400, t = pct * on(f, at, 18); return <g key={k} opacity={on(f, at, 5)}>
          <circle cx={cx} cy={920} r={140} fill="none" stroke={P.edge} strokeWidth={50} />
          <circle cx={cx} cy={920} r={140} fill="none" stroke={k === 0 ? '#3DAA6E' : '#F08A3C'} strokeWidth={50} strokeDasharray={`${2 * Math.PI * 140 * t} 9999`} transform={`rotate(-90 ${cx} 920)`} />
          <Label x={cx} y={950} text={k === 0 ? '56%' : '80%'} size={80} font="Bebas Neue" color={P.ink} />
          <Label x={cx} y={1150} text={k === 0 ? 'OF THE LAND' : 'OF THE BUILDINGS'} size={48} font="Bebas Neue" color={P.ink} o={on(f, k === 0 ? land10 : buildings10, 5)} />
        </g> })}
      </g>}
      {C > 0 && <g opacity={C}>
        <g opacity={on(f, macs, 5)} transform="translate(300 700)"><Burger x={0} y={0} s={1.1 * pop(f, macs)} /></g>
        <g opacity={on(f, rent11, 5)}><Shop x={700} y={720} s={1.1 * pop(f, rent11)} /><g transform="translate(700 560)"><Prop id="key" x={0} y={0} size={110} f={f} /></g></g>
        <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [rent11, 'offer', 'smiling']]} x={760} y={1240} s={0.6} flip />
        <Person f={f} who="hero" beats={[[0, 'idle', 'smiling'], [too, 'receive', 'smiling']]} x={250} y={1240} s={0.6} />
        <g opacity={on(f, buy, 5) * (1 - on(f, macs, 6))} transform={`translate(300 700) scale(${pop(f, buy)})`}><Prop id="price-tag" x={0} y={0} size={180} f={f} /></g>
      </g>}
      {D > 0 && <g opacity={D}>
        <Mini look="worker" x={CX} y={1240} scale={1.1} frame={f} seed={21} />
        <g opacity={on(f, royalties, 5)}><Envelope x={290} y={680} text="ROYALTIES" s={0.95 * pop(f, royalties)} /></g>
        <g opacity={on(f, brand, 5)}><Label x={290} y={830} text="FOR THE BRAND" size={46} font="Bebas Neue" color={P.ink2} /></g>
        <g opacity={on(f, rent12, 5)}><Envelope x={710} y={680} text="RENT" s={0.95 * pop(f, rent12)} color="#FFE9A8" /></g>
        <g opacity={on(f, building12, 5)}><Label x={710} y={830} text="FOR THE BUILDING" size={46} font="Bebas Neue" color={P.ink2} /></g>
        {[0, 1].map((k) => { const p = fly(f, (k === 0 ? royalties : rent12) + 6, [CX, 1050], [290 + k * 420, 760], 16, 100); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.6} o={p.o} /> : null })}
      </g>}
      {E > 0 && <g opacity={E}>
        <line x1={180} y1={1180} x2={820} y2={1180} stroke={P.ink2} strokeWidth={5} />
        <g opacity={on(f, sells13, 5)}><rect x={280} y={1180 - sales} width={200} height={sales} rx={12} fill="#9FD4F0" /><Label x={380} y={1236} text="SALES" size={44} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, share, 5)}><rect x={560} y={1180 - rentH} width={200} height={rentH} rx={12} fill="#3DAA6E" /><Label x={660} y={1236} text="RENT" size={44} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, minimum, 5)}><line x1={540} y1={1090} x2={800} y2={1090} stroke={P.coralInk} strokeWidth={6} strokeDasharray="14 10" /><Label x={860} y={1100} text="MIN" size={40} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, keeps, 5) * (1 - on(f, burgers, 6))}>{Array.from({ length: 3 }, (_, k) => { const p = fly(f, keeps + k * 5, [660, 1100], [660, 620], 14, 60); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.5} o={p.o} /> : null })}</g>
        <g opacity={on(f, slow, 5) * (1 - on(f, burgers, 6))} transform="translate(380 620)"><Calendar x={0} y={0} text="SLOW" s={1} /></g>
        <g opacity={on(f, burgers, 5)}>{[0, 1, 2].map((k) => <Burger key={k} x={260 + k * 80} y={560 - (k % 2) * 30} s={0.5 * pop(f, burgers + k * 3)} />)}</g>
        <g opacity={on(f, rent13a, 5)}><path d="M660 640 L660 560 M640 580 L660 556 L680 580" fill="none" stroke="#3DAA6E" strokeWidth={8} /></g>
        <g opacity={on(f, collects, 5)}>{Array.from({ length: 4 }, (_, k) => { const p = fly(f, collects + k * 4, [660, 1000], [860, 600], 16, 80); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.55} o={p.o} /> : null })}</g>
      </g>}
      <Vignette id="mc-land" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 4) s14–s17: the 2025 totals
const Money: React.FC<PieceProps> = ({ f, c }) => {
  const s14 = c('s14'), year = c('s14:year')
  const franchisees15 = c('s15:franchisees'), paid = c('s15:paid'), d165 = c('s15:165'), total = c('s15:total')
  const d104 = c('s16:104'), rent16 = c('s16:rent'), d6 = c('s16:6'), royalties = c('s16:royalties')
  const makes = c('s17:makes'), biggest = c('s17:biggest'), revenue = c('s17:revenue'), bigger = c('s17:bigger'), food = c('s17:food')
  const A = win(f, s14, d104), B = win(f, d104, makes), C = on(f, makes, 6)
  const W = 760, rentW = W * 10.442 / 16.548, royW = W * 6.018 / 16.548
  return (
    <g>
      <TallStage id="mc-money" f={f} tint="navy" />
      <Headline f={f} lines={[[s14, 'ONE YEAR: 2025', '#FFFFFF'], [d165, '$16.5 BILLION', P.gold, 116], [d104, 'RENT: $10.4B', P.gold, 104], [d6, 'ROYALTIES: $6B', '#FFFFFF', 104], [biggest, 'RENT IS THE BIGGEST LINE', P.gold, 80]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, s14, 5) * (1 - on(f, franchisees15, 6))} transform={`translate(${CX} 760) scale(${2.2 * pop(f, s14)})`}><Calendar x={0} y={0} text="2025" s={1} /></g>
        <g opacity={on(f, franchisees15, 5)}>
          {Array.from({ length: 5 }, (_, k) => <Shop key={k} x={140 + k * 180} y={1180} s={0.36} gold={1} />)}
          {Array.from({ length: 10 }, (_, k) => { const p = fly(f, paid + k * 3, [140 + (k % 5) * 180, 1120], [CX, 760], 18, 120); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.6} o={p.o} /> : null })}
          <g opacity={on(f, d165, 5)}><Prop id="money-bag" x={CX} y={760} size={460 * (0.8 + 0.2 * on(f, total, 10))} f={f} /></g>
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <rect x={CX - W / 2} y={700} width={W} height={160} rx={18} fill="#2A3550" />
        <rect x={CX - W / 2} y={700} width={rentW * on(f, rent16, 14)} height={160} rx={18} fill="#3DAA6E" />
        <g opacity={on(f, rent16, 5)}><Label x={CX - W / 2 + rentW / 2} y={800} text="RENT $10.4B" size={58} font="Bebas Neue" color="#FFFFFF" /></g>
        <rect x={CX - W / 2 + rentW + 8} y={700} width={Math.max(0, royW - 8) * on(f, royalties, 14)} height={160} rx={18} fill="#F08A3C" opacity={on(f, d6, 5)} />
        <g opacity={on(f, royalties, 5)}><Label x={CX - W / 2 + rentW + royW / 2} y={800} text="ROYALTIES $6B" size={44} font="Bebas Neue" color="#FFFFFF" /></g>
        <Label x={CX} y={640} text="$16.5B FROM FRANCHISEES" size={52} font="Bebas Neue" color="#C9D3E8" />
        <g opacity={on(f, d104, 5)} transform="translate(300 1080)"><Prop id="key" x={0} y={0} size={160} f={f} /></g>
        <g opacity={on(f, royalties, 5)} transform="translate(700 1080)"><Prop id="price-tag" x={0} y={0} size={160} f={f} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <line x1={110} y1={1150} x2={890} y2={1150} stroke="#C9D3E8" strokeWidth={4} />
        {[['RENT', 10.442, '#3DAA6E', makes], ['OWN FOOD SALES', 9.69, RED, bigger], ['ROYALTIES', 6.018, '#F08A3C', revenue], ['OTHER', 0.647, '#7A8FB8', revenue]].map(([l, v, col, at], k) => <Bar key={k} x={200 + k * 200} base={1150} w={150} h={600 * (v as number) / 10.442 * on(f, at as number, 14)} color={col as string} label={l as string} value={`$${(v as number).toFixed(1)}B`} o={on(f, at as number, 5)} dark />)}
        <g opacity={on(f, biggest, 5)} transform={`translate(200 ${440 + 6 * Math.sin((f - biggest) / 5)})`}><Prop id="crown" x={0} y={0} size={110} f={f} /></g>
        <g opacity={on(f, bigger, 5)}><path d="M200 520 Q300 470 400 560" fill="none" stroke={P.gold} strokeWidth={6} strokeDasharray="10 8" /></g>
      </g>}
      <Vignette id="mc-money" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 5) s18–s26: rent is the easy money
const Profit: React.FC<PieceProps> = ({ f, c }) => {
  const s18 = c('s18'), easy = c('s18:easy')
  const runs19 = c('s19:runs'), beef = c('s19:beef'), fries = c('s19:fries'), staff = c('s19:staff'), building19 = c('s19:building')
  const d97 = c('s20:97'), food20 = c('s20:food'), kept20 = c('s20:kept'), d14 = c('s20:14')
  const franchisees21 = c('s21:franchisees'), d165 = c('s21:165'), paying = c('s21:paying'), buildings21 = c('s21:buildings'), kept21 = c('s21:kept'), d139 = c('s21:139')
  const cooks = c('s22:cooks'), beef22 = c('s22:beef'), fryers = c('s22:fryers')
  const why = c('s23:why'), d90 = c('s23:90'), profit = c('s23:profit'), restaurants23 = c('s23:restaurants')
  const walk = c('s24:walk'), arches = c('s24:arches'), two = c('s24:two'), sign = c('s24:sign')
  const inside = c('s25:inside'), sells25 = c('s25:sells'), burger25 = c('s25:burger')
  const underneath = c('s26:underneath'), collects = c('s26:collects'), rent26 = c('s26:rent')
  const A = win(f, s18, d97), B = win(f, d97, cooks), C = win(f, cooks, walk), D = on(f, walk, 6)
  const H = 620 // # bar height for 16.5B
  const cost = [beef, fries, staff, building19]
  return (
    <g>
      <TallStage id="mc-profit" f={f} />
      <Headline f={f} lines={[[easy, 'RENT IS THE EASY MONEY', P.mintInk, 84], [runs19, 'RUNNING IT ITSELF', P.ink, 92], [d14, 'KEPT: $1.4B', P.coralInk, 104], [d139, 'KEPT: $13.9B', P.mintInk, 104], [cooks, 'NO COOKS, NO BEEF', P.ink, 96], [d90, '≈ 90% OF THE PROFIT', P.goldInk, 96], [two, 'TWO BUSINESSES', P.ink, 104], [inside, 'INSIDE: BURGERS', P.coralInk, 100], [underneath, 'UNDERNEATH: RENT', P.mintInk, 100]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, s18, 5) * (1 - on(f, runs19, 6))}><Envelope x={CX} y={760} text="RENT" s={1.4 * pop(f, s18)} color="#FFE9A8" /></g>
        <g opacity={on(f, runs19, 5)}>
          <Shop x={CX} y={1100} s={1.1} />
          {[['BEEF', '#7A3E22'], ['FRIES', YEL], ['STAFF', '#5BCBFF'], ['BUILDING', '#9AA6BC']].map(([t, col], k) => <g key={k} opacity={on(f, cost[k], 5)} transform={`translate(${200 + k * 200} 640) scale(${pop(f, cost[k])})`}>
            <circle cx={0} cy={0} r={70} fill={col} opacity={0.9} />
            {k === 2 ? <Mini look="worker" x={0} y={50} scale={0.55} frame={f} seed={40} /> : k === 0 ? <Burger x={0} y={0} s={0.55} /> : k === 1 ? <g>{[-20, 0, 20].map((dx, j) => <rect key={j} x={dx - 6} y={-40} width={12} height={60} rx={4} fill="#FFE08A" />)}<rect x={-40} y={0} width={80} height={44} rx={8} fill={RED} /></g> : <Shop x={0} y={10} s={0.3} sign={false} />}
            <Label x={0} y={120} text={t} size={44} font="Bebas Neue" color={P.ink} />
            {Array.from({ length: 2 }, (_, j) => { const p = fly(f, cost[k] + 4 + j * 4, [CX, 1060], [200 + k * 200, 620], 14, 80); return p.o > 0 ? <Coin key={j} x={p.x - (200 + k * 200)} y={p.y - 640} s={0.4} o={p.o} /> : null })}
          </g>)}
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <line x1={160} y1={1180} x2={840} y2={1180} stroke={P.ink2} strokeWidth={5} />
        {/* # own restaurants: 9.7B in, 1.4B kept */}
        <rect x={210} y={1180 - H * 9.69 / 16.548} width={200} height={H * 9.69 / 16.548} rx={12} fill={RED} opacity={0.3 + 0.7 * (1 - on(f, kept20, 10))} />
        <rect x={210} y={1180 - H * 1.422 / 16.548} width={200} height={H * 1.422 / 16.548} rx={12} fill={RED} opacity={on(f, kept20, 6)} />
        <Label x={310} y={1236} text="OWN RESTAURANTS" size={42} font="Bebas Neue" color={P.ink} />
        <g opacity={on(f, food20, 5)}><Label x={310} y={1180 - H * 9.69 / 16.548 - 20} text="$9.7B IN" size={50} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, d14, 5)}><Label x={310} y={1180 - H * 1.422 / 16.548 - 20} text="$1.4B KEPT" size={50} font="Bebas Neue" color={P.coralInk} /></g>
        {/* # franchisees: 16.5B in, 13.9B kept after building costs */}
        <g opacity={on(f, franchisees21, 5)}>
          <rect x={590} y={1180 - H * on(f, d165, 14)} width={200} height={H * on(f, d165, 14)} rx={12} fill="#3DAA6E" opacity={0.3 + 0.7 * (1 - on(f, kept21, 10))} />
          <rect x={590} y={1180 - H * 13.93 / 16.548} width={200} height={H * 13.93 / 16.548} rx={12} fill="#3DAA6E" opacity={on(f, kept21, 6)} />
          <Label x={690} y={1236} text="FRANCHISEES" size={42} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, d165, 5) * (1 - on(f, kept21, 6))}><Label x={690} y={1180 - H - 20} text="$16.5B IN" size={50} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, paying, 5)}><rect x={590} y={1180 - H} width={200} height={H * 2.618 / 16.548} rx={12} fill="#9AA6BC" opacity={1 - on(f, kept21, 8)} /></g>
          <g opacity={on(f, buildings21, 5) * (1 - on(f, kept21, 6))}><Label x={870} y={1180 - H + 40} text="BUILDINGS" size={36} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, d139, 5)}><Label x={690} y={1180 - H * 13.93 / 16.548 - 20} text="$13.9B KEPT" size={50} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
      </g>}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, why, 8)}>
          {[[cooks, 'worker'], [beef22, 'beef'], [fryers, 'fries']].map(([at, kind], k) => <g key={k} opacity={on(f, at as number, 5)} transform={`translate(${220 + k * 280} 800)`}>
            {kind === 'worker' ? <Mini look="worker" x={0} y={90} scale={1} frame={f} seed={44} /> : kind === 'beef' ? <Burger x={0} y={0} s={1} /> : <g>{[-30, 0, 30].map((dx, j) => <rect key={j} x={dx - 9} y={-70} width={18} height={90} rx={5} fill="#FFE08A" />)}<rect x={-60} y={0} width={120} height={70} rx={10} fill={RED} /></g>}
            <path d="M-80 -80 L80 80 M80 -80 L-80 80" stroke={P.coral} strokeWidth={14} strokeLinecap="round" opacity={on(f, (at as number) + 4, 4)} />
          </g>)}
        </g>
        <g opacity={on(f, why, 5)}>
          <circle cx={CX} cy={820} r={230} fill="none" stroke={P.edge} strokeWidth={80} />
          <circle cx={CX} cy={820} r={230} fill="none" stroke="#3DAA6E" strokeWidth={80} strokeDasharray={`${2 * Math.PI * 230 * 0.907 * on(f, d90, 18)} 9999`} transform={`rotate(-90 ${CX} 820)`} />
          <g opacity={on(f, d90, 5)}><Label x={CX} y={850} text="90%" size={120} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, profit, 5)}><Label x={CX} y={1150} text="FROM FRANCHISEES" size={56} font="Bebas Neue" color={P.ink} /></g>
          <g opacity={on(f, restaurants23, 5)}>{[0, 1, 2].map((k) => <Shop key={k} x={300 + k * 200} y={1235} s={0.3 * pop(f, restaurants23 + k * 3)} gold={1} />)}</g>
        </g>
      </g>}
      {D > 0 && <g opacity={D}>
        <rect x={100} y={1000} width={800} height={230} rx={18} fill="#B48A5A" opacity={0.55} />
        <g opacity={on(f, walk, 5)}><Mini look="buyer" x={lerp(120, 250, on(f, walk, 20))} y={990} scale={0.9} frame={f} seed={50} /></g>
        <g opacity={on(f, arches, 5)}><Shop x={CX} y={880} s={1.3 * pop(f, arches)} /></g>
        <g opacity={on(f, sign, 5)}><line x1={100} y1={1000} x2={900} y2={1000} stroke={P.ink} strokeWidth={6} /></g>
        <g opacity={on(f, inside, 5)}>
          <rect x={CX - 70} y={850} width={140} height={20} rx={6} fill={P.navy3} />
          <g opacity={on(f, sells25, 5)}><Mini look="worker" x={CX + 40} y={940} scale={0.6} frame={f} seed={51} /></g>
          <g opacity={on(f, burger25, 5)}><Burger x={lerp(CX, 300, on(f, burger25 + 4, 14))} y={lerp(840, 880, on(f, burger25 + 4, 14))} s={0.45} /></g>
        </g>
        <g opacity={on(f, underneath, 5)}>
          <g transform="translate(780 1120)"><Prop id="vault-door" x={0} y={0} size={170} f={f} /></g>
          <g transform="translate(240 1120)"><Prop id="key" x={0} y={0} size={140} f={f} /></g>
          {Array.from({ length: 6 }, (_, k) => { const p = fly(f, collects + k * 4, [CX, 960], [780, 1110], 16, -40); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.55} o={p.o} /> : null })}
          <g opacity={on(f, rent26, 5)}><Envelope x={CX} y={1130} text="RENT" s={0.6 * pop(f, rent26)} color="#FFE9A8" /></g>
        </g>
      </g>}
      <Vignette id="mc-profit" w={1080} h={1920} />
    </g>
  )
}

export const MCDRENT = [
  makePiece('mc-hook', 'Short: McDonald\'s collected $10.4B in rent — more than its own restaurants\' $9.7B food sales — landlord or cook?', { canvas: 'tall', mood: 'light', Component: Hook,
    beats: ["s1", "s1:collected", "s1:104", "s1:rent", "s2:more", "s2:food", "s2:runs", "s2:97", "s3:burger", "s3:landlord", "s3:cook"],
    sfx: [['s1:collected', 'coin', 0.35], ['s1:104', 'tick', 0.3], ['s2:97', 'thud', 0.3], ['s3:landlord', 'ding', 0.3], ['s3:cook', 'pop', 0.3]] }),
  makePiece('mc-who', 'Short: who runs your local McDonald\'s — 95% franchised to local owners — McDonald\'s runs 1 in 20', { canvas: 'tall', mood: 'dark', Component: Who,
    beats: ["s4", "s4:runs", "s4:local", "s5:95", "s5:franchisees", "s5:owners", "s5:pay", "s5:name", "s6:itself", "s6:1", "s6:20", "s6a:other", "s6a:somebody"],
    sfx: [['s5:95', 'riser', 0.3], ['s5:pay', 'coin', 0.3], ['s6:1', 'tick', 0.3], ['s6a:19', 'pop', 0.3]] }),
  makePiece('mc-land', 'Short: McDonald\'s owns or leases the land and building — the franchisee brings equipment, seats, signs — 56% of land, 80% of buildings — royalties for the brand, rent for the building — a share of sales with a minimum', { canvas: 'tall', mood: 'light', Component: Land,
    beats: ["s7", "s7:miss", "s8:owns", "s8:land", "s8:building", "s8:lease", "s9:franchisee", "s9:equipment", "s9:seats", "s9:signs", "s9:moves", "s10:countries", "s10:us", "s10:56", "s10:land", "s10:80", "s10:buildings", "s11:franchisee", "s11:buy", "s11:right", "s11:macs", "s11:rent", "s11:too", "s12:two", "s12:royalties", "s12:brand", "s12:rent", "s12:building", "s13:share", "s13:sells", "s13:minimum", "s13:keeps", "s13:slow", "s13a:burgers", "s13a:sells", "s13a:rent", "s13a:collects"],
    sfx: [['s8:land', 'pop', 0.3], ['s8:lease', 'flutter', 0.3], ['s9:moves', 'swish', 0.3], ['s10:56', 'tick', 0.3], ['s10:80', 'tick', 0.3], ['s11:rent', 'ding', 0.3], ['s12:royalties', 'coin', 0.3], ['s12:rent', 'coin', 0.3], ['s13:minimum', 'thud', 0.3], ['s13a:collects', 'coin', 0.35]] }),
  makePiece('mc-money', 'Short: 2025 — franchisees paid $16.5B — $10.4B rent, $6B royalties — rent is the biggest revenue line', { canvas: 'tall', mood: 'dark', Component: Money,
    beats: ["s14", "s14:year", "s15:franchisees", "s15:paid", "s15:165", "s15:total", "s16:104", "s16:rent", "s16:6", "s16:royalties", "s17:makes", "s17:biggest", "s17:revenue", "s17:bigger", "s17:food"],
    sfx: [['s15:paid', 'coin', 0.35], ['s15:165', 'riser', 0.3], ['s16:rent', 'swish', 0.3], ['s17:biggest', 'chime', 0.35]] }),
  makePiece('mc-profit', 'Short: own restaurants: $9.7B in, $1.4B kept — franchisees: $16.5B in, $13.9B kept — no cooks, no beef — ≈90% of restaurant profit — two businesses under one sign', { canvas: 'tall', mood: 'light', Component: Profit,
    beats: ["s18", "s18:easy", "s19:runs", "s19:beef", "s19:fries", "s19:staff", "s19:building", "s20:97", "s20:food", "s20:kept", "s20:14", "s21:franchisees", "s21:165", "s21:paying", "s21:buildings", "s21:kept", "s21:139", "s22:cooks", "s22:beef", "s22:fryers", "s23:why", "s23:90", "s23:profit", "s23:restaurants", "s24:walk", "s24:arches", "s24:two", "s24:sign", "s25:inside", "s25:sells", "s25:burger", "s26:underneath", "s26:collects", "s26:rent"],
    sfx: [['s19:beef', 'pop', 0.3], ['s19:building', 'pop', 0.3], ['s20:14', 'thud', 0.35], ['s21:139', 'riser', 0.3], ['s22:fryers', 'thud', 0.3], ['s23:90', 'chime', 0.35], ['s26:collects', 'coin', 0.4]] }),
]
