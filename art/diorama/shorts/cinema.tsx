// ============================================================
// SHORT — "Why Cinema Popcorn Costs So Much" (s1–s27, ≈ 2:11),
// five tall pieces. Sourced: AMC FY2025 earnings release + 10-K —
// admissions $2,652.8M, film exhibition costs $1,275.2M (≈48% of
// tickets), food & beverage $1,671.3M, F&B costs $327.0M (≈20%),
// average ticket $12.09, F&B per patron $7.62, 855 theatres,
// 219.4M visits, rent $887.3M, operating loss $17.4M.
// Our maths: keeps ≈ $6.28 per ticket and ≈ $6.13 per snack spend;
// snacks ≈ 34% of sales but ≈ 49% of money left after films + food.
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
import { Coin, fly, Person, Tick } from '../aimoney/common'
import { Prop, TallStage } from './tall'

const CX = 500
const RED = '#D8432F', YEL = '#F2B632', MINT = '#3DAA6E'
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
// # a cinema ticket; tear (0→1) pulls the right half away by dx
const Ticket: React.FC<{ x: number; y: number; s?: number; o?: number; price?: string; tear?: number; dx?: number; dy?: number }> = ({ x, y, s = 1, o = 1, price, tear = 0, dx = 0, dy = 0 }) => {
  const half = (side: -1 | 1) => (
    <g>
      <path d={side < 0 ? 'M-160 -80 L0 -80 L0 80 L-160 80 L-160 22 A22 22 0 0 0 -160 -22 Z' : 'M0 -80 L160 -80 L160 -22 A22 22 0 0 0 160 22 L160 80 L0 80 Z'} fill={YEL} stroke={P.edge} strokeWidth={4} />
      {side < 0 && <text x={-80} y={-20} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>ADMIT</text>}
      {side < 0 && <text x={-80} y={26} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>ONE</text>}
      {side > 0 && price && <text x={80} y={18} textAnchor="middle" fill={RED} style={{ font: '400 64px "Bebas Neue"' }}>{price}</text>}
    </g>
  )
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      {half(-1)}
      <g transform={`translate(${dx * tear} ${dy * tear}) rotate(${12 * tear})`}>{half(1)}</g>
      {tear < 0.05 && <line x1={0} y1={-74} x2={0} y2={74} stroke={P.edge} strokeWidth={4} strokeDasharray="10 10" />}
    </g>
  )
}
// # a red-and-white striped popcorn bucket, popcorn puffs on top
const Popcorn: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[[-60, -78], [-25, -100], [15, -92], [52, -78], [-42, -60], [0, -70], [38, -58], [-8, -112]].map(([px, py], k) => <g key={k}><circle cx={px} cy={py} r={28} fill="#FFF6DC" stroke="#E9C77A" strokeWidth={3} /><circle cx={px + 6} cy={py - 6} r={8} fill="#FFE7A0" /></g>)}
    <path d="M-80 -60 L80 -60 L60 110 L-60 110 Z" fill="#FFFFFF" stroke={P.edge} strokeWidth={4} />
    {[-52, -18, 18, 52].map((sx, k) => <path key={k} d={`M${sx - 12} -60 L${sx + 12} -60 L${sx * 0.75 + 9} 110 L${sx * 0.75 - 9} 110 Z`} fill={RED} />)}
  </g>
)
// # a soda cup with a lid and straw
const Soda: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={8} y={-150} width={14} height={90} rx={6} fill={RED} transform="rotate(12 15 -100)" />
    <path d="M-60 -60 L60 -60 L46 110 L-46 110 Z" fill="#4FA8E8" stroke={P.edge} strokeWidth={4} />
    <rect x={-68} y={-72} width={136} height={20} rx={8} fill="#FFFFFF" stroke={P.edge} strokeWidth={4} />
    <circle cx={0} cy={20} r={26} fill="#FFFFFF" opacity={0.85} />
  </g>
)
// # a film studio: a hangar with a clapperboard on the roof
const Studio: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M-130 70 L-130 -40 Q0 -120 130 -40 L130 70 Z" fill="#C9B79C" stroke={P.edge} strokeWidth={4} />
    <rect x={-34} y={10} width={68} height={60} rx={4} fill={P.navy3} />
    <g transform="translate(0 -118)"><rect x={-60} y={-10} width={120} height={60} rx={6} fill="#2B2B33" /><path d="M-60 -10 L60 -34 L60 -16 L-60 8 Z" fill="#FFFFFF" />{[-40, -10, 20, 50].map((sx, k) => <path key={k} d={`M${sx} ${-12 - (sx + 60) * 0.2} l14 -3 l-8 14 l-14 3 Z`} fill="#2B2B33" />)}</g>
    <text x={0} y={-8} textAnchor="middle" fill={P.ink} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 4 }}>STUDIO</text>
  </g>
)
// # a cinema front: marquee with bulbs (lit 0→1), doors
const Cinema: React.FC<{ x: number; y: number; s?: number; o?: number; lit?: number }> = ({ x, y, s = 1, o = 1, lit = 0.6 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-120} width={300} height={200} rx={8} fill="#7E3B4E" stroke={P.edge} strokeWidth={4} />
    <rect x={-170} y={-170} width={340} height={70} rx={10} fill="#2B2B33" />
    <text x={0} y={-122} textAnchor="middle" fill={YEL} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 8 }}>CINEMA</text>
    {Array.from({ length: 12 }, (_, k) => <circle key={k} cx={-158 + k * 28.7} cy={-178} r={8} fill={lit > (k % 3) / 3 ? '#FFE27A' : '#6B6B72'} />)}
    <rect x={-60} y={-10} width={56} height={90} rx={4} fill={P.navy3} /><rect x={4} y={-10} width={56} height={90} rx={4} fill={P.navy3} />
    <rect x={-130} y={-80} width={50} height={60} rx={4} fill="#F7F2E8" /><rect x={80} y={-80} width={50} height={60} rx={4} fill="#F7F2E8" />
  </g>
)
// # a film reel
const Reel: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number }> = ({ x, y, s = 1, o = 1, r = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${r})`} opacity={o}>
    <circle r={70} fill="#4A4A55" stroke={P.edge} strokeWidth={4} />
    {[0, 72, 144, 216, 288].map((a, k) => <circle key={k} cx={40 * Math.cos(a * Math.PI / 180)} cy={40 * Math.sin(a * Math.PI / 180)} r={14} fill="#1E1E24" />)}
    <circle r={10} fill="#C9C9D0" />
  </g>
)
// # a coin split into a ring: share (0→1) of it in colour, the rest coral
const Ring: React.FC<{ x: number; y: number; r?: number; share: number; grow: number; color: string; rest?: string; o?: number }> = ({ x, y, r = 200, share, grow, color, rest = P.edge, o = 1 }) => (
  <g opacity={o}>
    <circle cx={x} cy={y} r={r} fill="none" stroke={rest} strokeWidth={70} />
    <circle cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth={70} strokeDasharray={`${2 * Math.PI * r * share * grow} 9999`} transform={`rotate(-90 ${x} ${y})`} />
  </g>
)
// # a plain bar with a label under it and a value on top
const Bar: React.FC<{ x: number; base: number; h: number; w?: number; color: string; label: string; value?: string; o?: number; vo?: number; dark?: boolean }> = ({ x, base, h, w = 190, color, label, value, o = 1, vo = 1, dark }) => (
  <g opacity={o}>
    <rect x={x - w / 2} y={base - h} width={w} height={h} rx={12} fill={color} />
    <Label x={x} y={base + 52} text={label} size={44} font="Bebas Neue" color={dark ? '#C9D3E8' : P.ink} />
    {value && <Label x={x} y={base - h - 22} text={value} size={58} font="Bebas Neue" color={dark ? '#FFFFFF' : P.ink} o={vo} />}
  </g>
)

// ------------------------------------------------------------ 1) s1–s3: the ticket is split, the popcorn isn't
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const ticket = c('s1:ticket'), cinema1 = c('s1:cinema'), hands = c('s1:hands'), half = c('s1:half'), studio = c('s1:studio'), film = c('s1:film')
  const popcorn = c('s2:popcorn'), keeps = c('s2:keeps'), d80 = c('s2:80'), dollar = c('s2:dollar'), food = c('s2:food')
  const s3 = c('s3'), which = c('s3:which'), really = c('s3:really'), cinema3 = c('s3:cinema')
  const A = win(f, c('s1'), popcorn), B = win(f, popcorn, s3), C = on(f, s3, 6)
  return (
    <g>
      <TallStage id="cn-hook" f={f} />
      <Headline f={f} lines={[[half, 'ALMOST HALF → STUDIO', P.coralInk, 92], [d80, '80¢ OF EVERY $1 STAYS', P.mintInk, 92], [which, 'WHICH ONE PAYS?', P.ink, 104]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, cinema1, 5)}><Cinema x={250} y={1100} s={0.85 * pop(f, cinema1)} /></g>
        <g opacity={on(f, studio, 5)}><Studio x={760} y={1110} s={1.05 * pop(f, studio)} /></g>
        <Ticket x={lerp(CX, 420, on(f, hands, 12))} y={680} s={1.5 * pop(f, ticket)} o={on(f, ticket, 5)} tear={on(f, half, 16)} dx={240} dy={120} />
        <g opacity={on(f, film, 5)}><Reel x={570} y={1140} s={0.7 * pop(f, film)} r={(f - film) * 4} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Popcorn x={290} y={820} s={1.5 * pop(f, popcorn)} />
        <g opacity={on(f, keeps, 5)}>
          <Ring x={710} y={780} r={150} share={0.8} grow={on(f, d80, 18)} color={MINT} rest={RED} />
          <Label x={710} y={810} text="$1" size={96} font="Bebas Neue" color={P.ink} />
        </g>
        <g opacity={on(f, dollar, 5)}><Label x={710} y={1030} text="80¢ STAYS" size={60} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, food, 5)}><Label x={710} y={1110} text="20¢ THE FOOD" size={52} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <Cinema x={CX} y={760} s={1.3 * pop(f, s3)} lit={on(f, cinema3, 10)} />
        <g opacity={on(f, which, 5)}><Ticket x={280} y={1120} s={0.8 * pop(f, which)} price="$12" /></g>
        <g opacity={on(f, which + 4, 5)}><Popcorn x={740} y={1110} s={0.8 * pop(f, which + 4)} /></g>
        <g opacity={on(f, really, 5)} transform="translate(500 1110)"><Prop id="question" x={0} y={0} size={150} f={f} /></g>
      </g>}
      <Vignette id="cn-hook" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 2) s4–s8: AMC, 855 cinemas, $12 ticket, $7.60 snacks
const Amc: React.FC<PieceProps> = ({ f, c }) => {
  const s4 = c('s4'), money = c('s4:money'), biggest = c('s4:biggest'), world = c('s4:world')
  const d855 = c('s5:855'), cinemas5 = c('s5:cinemas'), d219 = c('s5:219')
  const s6 = c('s6'), ticket6 = c('s6:ticket'), d12 = c('s6:12')
  const visitor = c('s7:visitor'), d60 = c('s7:60'), d20 = c('s7a:20')
  const bigger = c('s8:bigger'), bill = c('s8:bill'), not = c('s8:not'), win8 = c('s8:win')
  const A = win(f, s4, d855), B = win(f, d855, s6), C = on(f, s6, 6)
  return (
    <g>
      <TallStage id="cn-amc" f={f} tint="navy" />
      <Headline f={f} lines={[[c('s4:amc'), 'AMC', P.gold, 120], [biggest, 'WORLD\'S BIGGEST CHAIN', '#FFFFFF', 88], [d855, '855 CINEMAS', P.gold, 104], [d219, '219 MILLION VISITS', '#FFFFFF', 92], [d12, 'TICKET: ABOUT $12', P.gold, 96], [d60, 'SNACKS: ABOUT $7.60', '#FFFFFF', 92], [d20, '≈ $20 A VISIT', P.gold, 104], [win8, 'BIGGER WIN?', '#FF9A85', 104]]} />
      {A > 0 && <g opacity={A}>
        <Cinema x={CX} y={820} s={1.6 * pop(f, s4)} lit={0.3 + 0.7 * on(f, c('s5'), 12)} />
        <g opacity={on(f, c('s5:ran'), 5)}>{[0, 1].map((k) => <Cinema key={k} x={200 + k * 600} y={1120} s={0.45 * pop(f, c('s5:ran') + k * 3)} />)}</g>
        <g opacity={on(f, money, 5)}>{Array.from({ length: 4 }, (_, k) => { const p = fly(f, money + k * 4, [CX, 900], [230 + k * 180, 1200], 18, 100); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.6} o={p.o} /> : null })}</g>
        <g opacity={on(f, biggest, 5)} transform={`translate(780 520) scale(${pop(f, biggest)})`}><Prop id="crown" x={0} y={0} size={160} f={f} /></g>
        <g opacity={on(f, world, 5)} transform={`translate(220 520) scale(${pop(f, world)})`}><Prop id="globe" x={0} y={0} size={170} f={f} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        {Array.from({ length: 9 }, (_, k) => <g key={k} opacity={on(f, d855 + k * 1.5, 4)}><Cinema x={200 + (k % 3) * 300} y={560 + Math.floor(k / 3) * 190} s={0.42} lit={on(f, cinemas5, 10)} /></g>)}
        <g opacity={on(f, d219, 5)}>{Array.from({ length: 6 }, (_, k) => <Mini key={k} look={['buyer', 'investor', 'hero', 'worker', 'owner', 'investorF'][k]} x={130 + k * 150} y={1250} scale={0.62} frame={f} seed={k + 3} mood="happy" />)}</g>
      </g>}
      {C > 0 && <g opacity={C}>
        <Ticket x={300} y={700} s={(f >= bigger ? 1.25 : 1) * pop(f, ticket6)} o={on(f, ticket6, 5)} price={f >= d12 ? '$12' : undefined} />
        <g opacity={on(f, visitor, 5)}><Popcorn x={650} y={720} s={0.9 * pop(f, visitor)} /><Soda x={820} y={740} s={0.75 * pop(f, visitor + 3)} /></g>
        <g opacity={on(f, d60, 5)}><Label x={735} y={930} text="$7.60" size={80} font="Bebas Neue" color={P.gold} /></g>
        <g opacity={on(f, d20, 5) * (1 - on(f, c('s8:ticket'), 6))} transform={`translate(${CX} 1110) scale(${pop(f, d20)})`}><rect x={-150} y={-110} width={300} height={220} rx={14} fill="#F7F2E8" stroke={P.edge} strokeWidth={4} /><path d="M-110 -60 L110 -60 M-110 -20 L110 -20" stroke={P.ink2} strokeWidth={6} /><Label x={0} y={70} text="≈ $20" size={80} font="Bebas Neue" color="#1E2433" /></g>
        <g opacity={on(f, c('s7a:visit'), 5) * (1 - on(f, c('s8:ticket'), 6))}><Mini look="buyer" x={860} y={1250} scale={0.55} frame={f} seed={9} mood="happy" /></g>
        <g opacity={on(f, c('s8:ticket'), 5) * (1 - on(f, not, 6))}><rect x={130} y={590} width={340} height={220} rx={18} fill="none" stroke={P.gold} strokeWidth={6} /></g>
        <g opacity={on(f, bill, 5)}><Label x={300} y={930} text="BIGGER BILL" size={64} font="Bebas Neue" color="#FFFFFF" /></g>
        <g opacity={on(f, not, 5)} transform={`translate(${CX} 1120) scale(${pop(f, not)})`}><Prop id="trophy" x={0} y={0} size={190} f={f} /></g>
      </g>}
      <Vignette id="cn-amc" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 3) s9–s14: films are rented — 48¢ of every ticket dollar
const Film: React.FC<PieceProps> = ({ f, c }) => {
  const s9 = c('s9'), cinema10 = c('s10:cinema'), own = c('s10:own'), films = c('s10:films'), rents = c('s10:rents'), studios = c('s10:studios')
  const screen = c('s10a:screen'), loan = c('s10a:loan')
  const rent = c('s11:rent'), share = c('s11:share'), sells = c('s11:sells')
  const s12 = c('s12'), d27 = c('s12:27'), paid = c('s12:paid'), d13 = c('s12:13'), studios12 = c('s12:studios')
  const d48 = c('s13:48'), dollar13 = c('s13:dollar')
  const d12 = c('s14:12'), keeps = c('s14:keeps'), d6 = c('s14:6')
  const A = win(f, s9, rent), B = win(f, rent, s12), D = win(f, s12, d48), E = on(f, d48, 6)
  const reelT = on(f, rents, 22)
  return (
    <g>
      <TallStage id="cn-film" f={f} />
      <Headline f={f} lines={[[s9, 'HERE\'S WHY', P.ink, 104], [rents, 'FILMS ARE RENTED', P.coralInk, 96], [share, 'A SHARE OF EVERY TICKET', P.ink, 84], [d27, 'TICKETS: $2.7B', P.ink, 96], [d13, '$1.3B TO STUDIOS', P.coralInk, 96], [d48, '48¢ OF EVERY $1', P.coralInk, 104], [d6, 'AMC KEEPS ≈ $6', P.mintInk, 104]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, s9, 5)} transform="translate(500 560)"><Prop id="question" x={0} y={0} size={130} f={f} /></g>
        <g opacity={on(f, cinema10, 5)}><Cinema x={740} y={950} s={1.05 * pop(f, cinema10)} /></g>
        <g opacity={on(f, own, 5)}><Studio x={250} y={960} s={1.05 * pop(f, own)} /></g>
        <g opacity={on(f, films, 5)}><Reel x={lerp(250, 740, reelT)} y={lerp(760, 720, reelT) - Math.sin(reelT * Math.PI) * 120} s={0.9 * pop(f, films)} r={(f - films) * 5} /></g>
        <g opacity={on(f, studios, 5)}>{Array.from({ length: 3 }, (_, k) => { const p = fly(f, studios + k * 4, [740, 1000], [250, 1000], 18, 120); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.55} o={p.o} /> : null })}</g>
        <g opacity={on(f, screen, 5)}><rect x={590} y={1110} width={300} height={130} rx={10} fill="#F7F2E8" stroke={P.edge} strokeWidth={4} /><path d="M700 1145 L760 1175 L700 1205 Z" fill={P.ink2} /></g>
        <g opacity={on(f, loan, 5)} transform={`translate(740 600) rotate(-6) scale(${pop(f, loan)})`}><rect x={-110} y={-36} width={220} height={72} rx={12} fill="#FFE9A8" stroke={P.edge} strokeWidth={4} /><text x={0} y={18} textAnchor="middle" fill={P.ink} style={{ font: '400 50px "Bebas Neue"', letterSpacing: 3 }}>ON LOAN</text></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Ticket x={CX} y={760} s={1.7 * pop(f, rent)} price="$12" tear={on(f, share, 16)} dx={100} dy={60} />
        <g opacity={on(f, share, 5)}><Studio x={800} y={1180} s={0.7} /></g>
        <g opacity={on(f, sells, 5)}>{Array.from({ length: 3 }, (_, k) => <g key={k} opacity={on(f, sells + k * 3, 4)}><Ticket x={170 + k * 90} y={1150 - k * 30} s={0.45} /></g>)}</g>
      </g>}
      {D > 0 && <g opacity={D}>
        <line x1={260} y1={1180} x2={740} y2={1180} stroke={P.ink2} strokeWidth={5} />
        <Bar x={CX} base={1180} h={620 * on(f, d27, 16)} w={260} color={YEL} label="TICKET SALES" value="$2.7B" o={on(f, s12, 5)} vo={on(f, d27, 5)} />
        <rect x={CX - 130} y={1180 - 620 * 0.481 * on(f, d13, 16)} width={260} height={620 * 0.481 * on(f, d13, 16)} rx={12} fill={RED} opacity={on(f, paid, 5)} />
        <g opacity={on(f, d13, 5)}><Label x={CX} y={1180 - 150} text="$1.3B" size={64} font="Bebas Neue" color="#FFFFFF" /></g>
        <g opacity={on(f, c('s12:sold'), 5)}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, c('s12:sold') + k * 3, 4)}><Ticket x={190} y={700 + k * 110} s={0.42} /></g>)}</g>
        <g opacity={on(f, studios12, 5)}><Studio x={800} y={1080} s={0.7 * pop(f, studios12)} /></g>
      </g>}
      {E > 0 && <g opacity={E}>
        <g opacity={1 - on(f, d12, 6)}>
          <Ring x={CX} y={800} r={210} share={0.481} grow={on(f, d48, 18)} color={RED} rest={MINT} />
          <Label x={CX} y={830} text="$1" size={120} font="Bebas Neue" color={P.ink} />
          <g opacity={on(f, dollar13, 5)}><Label x={CX} y={1130} text="48¢ STUDIO · 52¢ CINEMA" size={58} font="Bebas Neue" color={P.ink} /></g>
        </g>
        <g opacity={on(f, d12, 5)}>
          <Ticket x={420} y={780} s={1.4 * pop(f, d12)} price="$12" tear={on(f, keeps, 16)} dx={200} dy={0} />
          <g opacity={on(f, d6, 5)} transform={`translate(330 1100) scale(${pop(f, d6)})`}><Prop id="coin-stack" x={0} y={0} size={240} f={f} /></g>
          <g opacity={on(f, d6, 5)}><Label x={620} y={1120} text="$6 STAYS" size={80} font="Bebas Neue" color={P.mintInk} /></g>
        </g>
      </g>}
      <Vignette id="cn-film" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 4) s15–s19: snacks — 80¢ of every snack dollar
const Snack: React.FC<PieceProps> = ({ f, c }) => {
  const s15 = c('s15'), snacks = c('s15:snacks')
  const popcorn = c('s16:popcorn'), corn = c('s16:corn'), oil = c('s16:oil'), salt = c('s16:salt'), soda = c('s16:soda'), syrup = c('s16:syrup'), water = c('s16:water')
  const bucket = c('s16a:bucket'), little = c('s16a:little')
  const d17 = c('s17:17'), itself = c('s17:itself'), d330 = c('s17:330')
  const d80 = c('s18:80'), snack18 = c('s18:snack')
  const d7 = c('s19:7'), d6 = c('s19:6'), too = c('s19:too')
  const A = win(f, s15, d17), B = win(f, d17, d80), C = on(f, d80, 6)
  return (
    <g>
      <TallStage id="cn-snack" f={f} tint="navy" />
      <Headline f={f} lines={[[snacks, 'NOW THE SNACKS', '#FFFFFF', 104], [little, 'CHEAP TO MAKE', P.gold, 104], [d17, 'SNACKS: $1.7B', P.gold, 96], [d330, 'FOOD COST: $330M', '#FF9A85', 92], [d80, '80¢ OF EVERY $1', P.gold, 104], [d6, 'AMC KEEPS ≈ $6 TOO', P.gold, 96]]} />
      {A > 0 && <g opacity={A}>
        <Popcorn x={300} y={760} s={1.3 * pop(f, s15)} />
        <Soda x={720} y={780} s={1.2 * pop(f, s15 + 4)} />
        {[[corn, 'CORN', '#F2C94C'], [oil, 'OIL', '#E8B04B'], [salt, 'SALT', '#FFFFFF']].map(([at, t, col], k) => <g key={k} opacity={on(f, Math.max(popcorn, at as number), 5)} transform={`translate(${170 + k * 130} 1060) scale(${pop(f, at as number)})`}>
          <circle r={46} fill={col as string} stroke={P.edge} strokeWidth={4} /><Label x={0} y={92} text={t as string} size={40} font="Bebas Neue" color="#FFFFFF" />
        </g>)}
        {[[syrup, 'SYRUP', '#7A3E22'], [water, 'WATER', '#9FD4F0']].map(([at, t, col], k) => <g key={k} opacity={on(f, Math.max(soda, at as number), 5)} transform={`translate(${650 + k * 150} 1060) scale(${pop(f, at as number)})`}>
          <path d="M0 -50 Q36 0 30 20 A30 30 0 0 1 -30 20 Q-36 0 0 -50 Z" fill={col as string} stroke={P.edge} strokeWidth={4} /><Label x={0} y={92} text={t as string} size={40} font="Bebas Neue" color="#FFFFFF" />
        </g>)}
        <g opacity={on(f, bucket, 5) * (1 - on(f, d17, 5))}><g transform={`translate(300 520) scale(${pop(f, little)})`} opacity={on(f, little, 5)}><Coin x={0} y={0} s={0.6} text="¢" /></g></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <line x1={180} y1={1180} x2={820} y2={1180} stroke="#C9D3E8" strokeWidth={5} />
        <g opacity={on(f, c('s17:food'), 5)}><Popcorn x={290} y={460} s={0.4 * pop(f, c('s17:food'))} /></g>
        <g opacity={on(f, c('s17:drinks'), 5)}><Soda x={400} y={460} s={0.36 * pop(f, c('s17:drinks'))} /></g>
        <Bar x={340} base={1180} h={600 * on(f, d17, 16)} color={P.gold} label="SNACK SALES" value="$1.7B" dark />
        <Bar x={660} base={1180} h={118 * on(f, d330, 12)} color={RED} label="THE FOOD ITSELF" value="$330M" o={on(f, itself, 5)} vo={on(f, d330, 5)} dark />
      </g>}
      {C > 0 && <g opacity={C}>
        <g opacity={1 - on(f, d7, 6)}>
          <Ring x={CX} y={790} r={210} share={0.8} grow={on(f, d80, 18)} color={MINT} rest={RED} />
          <Label x={CX} y={820} text="$1" size={120} font="Bebas Neue" color="#FFFFFF" />
          <g opacity={on(f, snack18, 5)}><Label x={CX} y={1120} text="80¢ STAYS · 20¢ FOOD" size={58} font="Bebas Neue" color="#FFFFFF" /></g>
        </g>
        <g opacity={on(f, d7, 5)}>
          <Popcorn x={330} y={760} s={1.3 * pop(f, d7) * (1 + 0.08 * Math.sin(span(f, c('s19:snack'), c('s19:snack') + 12) * Math.PI))} /><Soda x={680} y={790} s={1.05 * pop(f, d7 + 3)} />
          <g opacity={on(f, c('s19:keeps'), 5)}>{Array.from({ length: 4 }, (_, k) => { const p = fly(f, c('s19:keeps') + k * 3, [330, 700], [380, 1120], 16, 80); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.5} o={p.o} /> : null })}</g>
          <Label x={CX} y={1000} text="$7.60" size={90} font="Bebas Neue" color={P.gold} />
          <g opacity={on(f, d6, 5)} transform={`translate(380 1150) scale(${pop(f, d6)})`}><Prop id="coin-stack" x={0} y={0} size={150} f={f} /></g>
          <g opacity={on(f, d6, 5)}><Label x={640} y={1170} text="$6 STAYS" size={76} font="Bebas Neue" color={MINT} /></g>
          <Tick x={860} y={1140} o={on(f, too, 5)} />
        </g>
      </g>}
      <Vignette id="cn-snack" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 5) s20–s27: same money, half the profit, costs, lights on
const End: React.FC<PieceProps> = ({ f, c }) => {
  const s20 = c('s20'), side = c('s20:side'), d12 = c('s21:12'), cheaper = c('s21:cheaper'), same = c('s21:same')
  const third = c('s22:third'), sales = c('s22:sales'), half = c('s22:half'), keeps22 = c('s22:keeps')
  const reason = c('s23:reason'), studio = c('s23:studio'), nobody = c('s23:nobody'), popcorn23 = c('s23:popcorn')
  const running = c('s24:running'), hard = c('s24:hard')
  const d890 = c('s25:890'), rent = c('s25:rent'), staff = c('s25:staff'), power = c('s25:power'), cleaning = c('s25:cleaning')
  const d17 = c('s26:17'), interest = c('s26:interest'), debt = c('s26:debt')
  const queue = c('s27:queue'), film = c('s27:film'), lights = c('s27:lights')
  const A = win(f, s20, third), B = win(f, third, reason), C = win(f, reason, running), D = win(f, running, queue), E = on(f, queue, 6)
  const tilt = 10 * (1 - on(f, same, 20))
  return (
    <g>
      <TallStage id="cn-end" f={f} />
      <Headline f={f} lines={[[side, 'SIDE BY SIDE', P.ink, 104], [same, 'ROUGHLY THE SAME', P.mintInk, 100], [third, '⅓ OF SALES', P.ink, 104], [half, '½ OF WHAT\'S KEPT', P.mintInk, 100], [nobody, 'NOBODY SHARES POPCORN', P.coralInk, 88], [hard, 'STILL HARD', P.coralInk, 110], [d17, 'LOST ≈ $17 MILLION', P.coralInk, 96], [lights, 'LIGHTS ON', P.goldInk, 110]]} />
      {A > 0 && <g opacity={A}>
        <g transform={`rotate(${-tilt} ${CX} 960)`} opacity={on(f, s20, 5)}>
          <rect x={150} y={950} width={700} height={22} rx={10} fill={P.ink2} />
          <Ticket x={300} y={860} s={0.8 * pop(f, d12)} price="$12" o={on(f, d12, 5)} />
          <g opacity={on(f, cheaper, 5)}><Popcorn x={700} y={830} s={0.8 * pop(f, cheaper)} /></g>
        </g>
        <path d={`M${CX} 970 L${CX - 70} 1180 L${CX + 70} 1180 Z`} fill={P.ink2} opacity={on(f, s20, 5)} />
        <g opacity={on(f, same, 5)}><Label x={300} y={1240} text="≈ $6" size={72} font="Bebas Neue" color={P.mintInk} /><Label x={700} y={1240} text="≈ $6" size={72} font="Bebas Neue" color={P.mintInk} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Ring x={290} y={800} r={150} share={0.345} grow={on(f, third, 18)} color={P.gold} />
        <g opacity={on(f, sales, 5)}><Label x={290} y={1040} text="OF SALES" size={56} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, half, 5)}><Ring x={710} y={800} r={150} share={0.494} grow={on(f, half, 18)} color={MINT} /></g>
        <g opacity={on(f, keeps22, 5)}><Label x={710} y={1040} text="OF WHAT'S KEPT" size={56} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, third, 5)}><Popcorn x={290} y={810} s={0.55} /></g>
        <g opacity={on(f, half, 5)}><Popcorn x={710} y={810} s={0.55} /></g>
        <g opacity={on(f, c('s22:films'), 5)}><Reel x={600} y={1170} s={0.45 * pop(f, c('s22:films'))} /></g>
        <g opacity={on(f, c('s22:food'), 5)}><Soda x={820} y={1170} s={0.45 * pop(f, c('s22:food'))} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <g opacity={on(f, studio, 5)}><Studio x={760} y={1120} s={0.85 * pop(f, studio)} /></g>
        <Ticket x={300} y={680} s={1.2 * pop(f, reason)} price="$12" tear={on(f, studio + 6, 16)} dx={380} dy={200} />
        <g opacity={on(f, c('s23:snacks'), 5) * (1 - on(f, nobody, 6))}><Popcorn x={300} y={1080} s={0.7 * pop(f, c('s23:snacks'))} /></g>
        <g opacity={on(f, c('s23:much'), 5) * (1 - on(f, nobody, 6))} transform={`translate(470 1000) scale(${pop(f, c('s23:much'))})`}><Prop id="price-tag" x={0} y={0} size={120} f={f} /></g>
        <g opacity={on(f, c('s24:popcorn'), 5)}>{Array.from({ length: 4 }, (_, k) => { const p = fly(f, c('s24:popcorn') + k * 3, [300, 980], [CX, 520], 16, 80); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.45} o={p.o} /> : null })}</g>
        <g opacity={on(f, nobody, 5)}><Person f={f} who="buyer" beats={[[0, 'holdChest', 'smiling'], [popcorn23, 'holdChest', 'smug']]} x={260} y={1250} s={0.62} /></g>
        <g opacity={on(f, nobody, 5)}><Popcorn x={300} y={1010} s={0.6 * pop(f, nobody)} /></g>
      </g>}
      {D > 0 && <g opacity={D}>
        <Cinema x={CX} y={860} s={1.4 * pop(f, running)} lit={0.6 - 0.6 * on(f, c('s26:amc'), 12)} />
        <g opacity={on(f, d890, 5)} transform={`translate(190 1080) scale(${pop(f, d890)})`}><Prop id="key" x={0} y={0} size={140} f={f} /></g>
        <g opacity={on(f, rent, 5)}><Label x={190} y={1200} text="RENT $890M" size={48} font="Bebas Neue" color={P.ink} /></g>
        <g opacity={on(f, staff, 5)}><Mini look="worker" x={410} y={1230} scale={0.6} frame={f} seed={61} /></g>
        <g opacity={on(f, power, 5)} transform={`translate(600 1110) scale(${pop(f, power)})`}><Prop id="lightning" x={0} y={0} size={130} f={f} /></g>
        <g opacity={on(f, cleaning, 5)} transform={`translate(800 1120) scale(${pop(f, cleaning)})`}><rect x={-6} y={-90} width={12} height={130} rx={5} fill="#8A5A34" /><path d="M-50 40 L50 40 L40 90 L-40 90 Z" fill={YEL} stroke={P.edge} strokeWidth={4} /></g>
        <g opacity={on(f, c('s26:after'), 5)}>{Array.from({ length: 5 }, (_, k) => { const p = fly(f, c('s26:after') + k * 3, [CX, 800], [190 + k * 155, 1040], 16, 90); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.45} o={p.o} /> : null })}</g>
        <g opacity={on(f, c('s26:lost'), 5)} transform={`translate(210 450) scale(${pop(f, c('s26:lost'))})`}><Prop id="arrow-down" x={0} y={0} size={130} f={f} /></g>
        <g opacity={on(f, c('s26:in'), 5)} transform={`translate(790 450) scale(${pop(f, c('s26:in'))})`}><Prop id="calendar" x={0} y={0} size={120} f={f} /></g>
        <g opacity={on(f, c('s26:business'), 5)}><Label x={CX} y={560} text="BEFORE INTEREST" size={52} font="Bebas Neue" color={P.coralInk} /></g>
        <g opacity={on(f, d17, 5)}><rect x={CX - 170} y={400} width={340} height={100} rx={18} fill={RED} /><Label x={CX} y={474} text="−$17M" size={88} font="Bebas Neue" color="#FFFFFF" /></g>
        <g opacity={on(f, c('s26:paying'), 5)}>{Array.from({ length: 3 }, (_, k) => { const p = fly(f, c('s26:paying') + k * 3, [CX, 960], [850, 560], 14, 80); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.4} o={p.o} /> : null })}</g>
        <g opacity={on(f, interest, 5) * (1 - on(f, debt + 10, 6))} transform={`translate(850 560) scale(${pop(f, interest)})`}><Prop id="interest-percent" x={0} y={0} size={130} f={f} /></g>
      </g>}
      {E > 0 && <g opacity={E}>
        <Cinema x={CX} y={860} s={1.4} lit={0.3 + 0.7 * on(f, lights, 14)} />
        {[0, 1, 2].map((k) => <Mini key={k} look={['buyer', 'hero', 'investorF'][k]} x={lerp(180 + k * 150, 260 + k * 150, on(f, queue + k * 3, 20))} y={1250} scale={0.6} frame={f} seed={70 + k} mood="happy" />)}
        <g opacity={on(f, c('s27:popcorn'), 5)}><Popcorn x={230} y={1120} s={0.4 * pop(f, c('s27:popcorn'))} /></g>
        <g opacity={on(f, c('s27:ticket'), 5)}><Ticket x={620} y={1080} s={0.45 * pop(f, c('s27:ticket'))} /></g>
        <g opacity={on(f, film, 5)}><Reel x={780} y={1080} s={0.7 * pop(f, film)} r={(f - film) * 4} /></g>
        <g opacity={on(f, c('s27:popcorn#2'), 5)}><Popcorn x={780} y={1180} s={0.5 * pop(f, c('s27:popcorn#2'))} /></g>
      </g>}
      <Vignette id="cn-end" w={1080} h={1920} />
    </g>
  )
}

export const CINEMA = [
  makePiece('cn-hook', 'Short: a ticket is split almost in half with the studio; popcorn keeps 80¢ of every $1 — which pays for the cinema?', { canvas: 'tall', mood: 'light', Component: Hook,
    beats: ["s1:ticket", "s1:cinema", "s1:hands", "s1:half", "s1:studio", "s1:film", "s2:popcorn", "s2:keeps", "s2:80", "s2:dollar", "s2:food", "s3", "s3:which", "s3:really", "s3:cinema", "s1"],
    sfx: [['s1:half', 'swish', 0.3], ['s2:80', 'ding', 0.3], ['s3:which', 'pop', 0.3]] }),
  makePiece('cn-amc', 'Short: AMC, world\'s biggest chain — 855 cinemas, 219M visits — $12 ticket, $7.60 snacks, ≈$20 a visit', { canvas: 'tall', mood: 'dark', Component: Amc,
    beats: ["s4", "s4:money", "s4:biggest", "s4:world", "s5:855", "s5:cinemas", "s5:219", "s6", "s6:ticket", "s6:12", "s7:visitor", "s7:60", "s7a:20", "s8:bigger", "s8:bill", "s8:not", "s5", "s5:ran", "s8:ticket", "s7a:visit"],
    sfx: [['s4:biggest', 'chime', 0.3], ['s5:855', 'tick', 0.3], ['s6:12', 'pop', 0.3], ['s7:60', 'pop', 0.3], ['s8:win', 'thud', 0.3]] }),
  makePiece('cn-film', 'Short: films are rented from studios as a share of every ticket — $2.7B tickets, $1.3B to studios — 48¢ of $1 — $6 stays from a $12 ticket', { canvas: 'tall', mood: 'light', Component: Film,
    beats: ["s9", "s10:cinema", "s10:own", "s10:films", "s10:rents", "s10:studios", "s10a:screen", "s10a:loan", "s11:rent", "s11:share", "s11:sells", "s12", "s12:27", "s12:paid", "s12:13", "s12:studios", "s13:48", "s13:dollar", "s14:12", "s14:keeps", "s14:6", "s12:sold"],
    sfx: [['s10:rents', 'swish', 0.3], ['s11:share', 'swish', 0.3], ['s12:13', 'thud', 0.3], ['s13:48', 'tick', 0.3], ['s14:6', 'coin', 0.35]] }),
  makePiece('cn-snack', 'Short: popcorn is corn, oil, salt; soda is syrup and water — $1.7B snacks, $330M food cost — 80¢ of $1 — $6 stays from $7.60', { canvas: 'tall', mood: 'dark', Component: Snack,
    beats: ["s15", "s15:snacks", "s16:popcorn", "s16:corn", "s16:oil", "s16:salt", "s16:soda", "s16:syrup", "s16:water", "s16a:bucket", "s16a:little", "s17:17", "s17:itself", "s17:330", "s18:80", "s18:snack", "s19:7", "s19:6", "s19:too", "s17:food", "s17:drinks", "s19:snack", "s19:keeps"],
    sfx: [['s16:corn', 'pop', 0.25], ['s16:soda', 'pop', 0.25], ['s17:330', 'thud', 0.3], ['s18:80', 'ding', 0.35], ['s19:too', 'coin', 0.35]] }),
  makePiece('cn-end', 'Short: ticket and snack leave the same money — ⅓ of sales, ½ of what\'s kept — studio shares the ticket, nobody shares popcorn — rent, staff, power — lost $17M — popcorn keeps the lights on', { canvas: 'tall', mood: 'light', Component: End,
    beats: ["s20", "s20:side", "s21:12", "s21:cheaper", "s21:same", "s22:third", "s22:sales", "s22:half", "s22:keeps", "s23:reason", "s23:studio", "s23:nobody", "s23:popcorn", "s24:running", "s24:hard", "s25:890", "s25:rent", "s25:staff", "s25:power", "s25:cleaning", "s26:17", "s26:interest", "s26:debt", "s27:queue", "s27:film", "s27:lights", "s22:films", "s22:food", "s23:snacks", "s23:much", "s24:popcorn", "s26:amc", "s26:after", "s26:lost", "s26:in", "s26:business", "s26:paying", "s27:popcorn", "s27:ticket", "s27:popcorn#2"],
    sfx: [['s21:same', 'chime', 0.3], ['s22:half', 'ding', 0.3], ['s23:nobody', 'pop', 0.3], ['s26:17', 'thud', 0.35], ['s27:lights', 'chime', 0.4]] }),
]
