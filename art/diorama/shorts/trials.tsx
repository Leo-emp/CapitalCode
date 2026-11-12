// ============================================================
// SHORT — "Why Free Trials Ask for Your Card" (s1–s28, ≈ 2:13),
// five tall pieces. Sourced: Miller, Sahni & Strulov-Shlain field
// experiment with a European newspaper (2M+ readers; auto-renew
// +20% subscribers for 4 months; about half of auto-renew payers
// didn't want it; 72% monthly chance of not cancelling; rarely read;
// 10% fewer subscribers over two years); C+R Research survey 2022
// (42% forgot a subscription; $133 a month more than guessed);
// FTC 25 Sep 2025 (Amazon $2.5B settlement, no wrongdoing admitted);
// FTC 21 Jun 2023 (reporting: cancel flow nicknamed "Iliad").
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
import { Calendar, Coin, Doc, fly, Person, Stamp, Tick } from '../aimoney/common'
import { BankCard, Sofa, Ticket, Zzz } from '../gym/kit'
import { Prop, TallStage } from './tall'

const CX = 500
const LOOKS = ['buyer', 'investor', 'hero', 'worker', 'owner', 'investorF']
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
// # a big rounded button (PAY / CANCEL); press 0–1 pushes it down
const Button: React.FC<{ x: number; y: number; text: string; color: string; s?: number; o?: number; press?: number }> = ({ x, y, text, color, s = 1, o = 1, press = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-46} width={300} height={104} rx={30} fill="#000" opacity={0.2} />
    <rect x={-150} y={-56 + 10 * press} width={300} height={104} rx={30} fill={color} />
    <text x={0} y={18 + 10 * press} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 66px "Bebas Neue"', letterSpacing: 3 }}>{text}</text>
  </g>
)
// # the trial pass: a ticket that says FREE TRIAL; gone 0–1 greys it out
const Pass: React.FC<{ x: number; y: number; s?: number; o?: number; gone?: number; text?: string }> = ({ x, y, s = 1, o = 1, gone = 0, text = 'FREE TRIAL' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o * (1 - 0.55 * gone)}>
    <rect x={-170} y={-80} width={340} height={160} rx={18} fill="#000" opacity={0.15} transform="translate(6 8)" />
    <rect x={-170} y={-80} width={340} height={160} rx={18} fill={gone > 0.5 ? '#B9B2A4' : '#F08A3C'} />
    <circle cx={-170} cy={0} r={22} fill="var(--cc-bg1, #F3E9D8)" /><circle cx={170} cy={0} r={22} fill="var(--cc-bg1, #F3E9D8)" />
    <line x1={-110} y1={-58} x2={-110} y2={58} stroke="#FFFFFF" strokeWidth={4} strokeDasharray="10 8" opacity={0.7} />
    <text x={30} y={20} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 58px "Bebas Neue"', letterSpacing: 2 }}>{text}</text>
  </g>
)
// # a folded newspaper (for the reader piles)
const Paper: React.FC<{ x: number; y: number; s?: number; r?: number; o?: number; grey?: number }> = ({ x, y, s = 1, r = 0, o = 1, grey = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <rect x={-90} y={-26} width={180} height={52} rx={10} fill={grey > 0.5 ? '#CFC8BA' : '#F7F2E8'} stroke={P.edge} strokeWidth={3} />
    <rect x={-20} y={-26} width={14} height={52} fill={P.coral} opacity={0.8} />
    {[-60, 20, 50].map((lx, k) => <line key={k} x1={lx} y1={-10} x2={lx + 24} y2={-10} stroke={P.ink2} strokeWidth={4} opacity={0.5} />)}
  </g>
)

// ------------------------------------------------------------ 1) s1–s6: the newspaper test
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const s1 = c('s1'), paper = c('s1:newspaper'), free = c('s1:free'), cheap = c('s1:cheap'), two = c('s1:2'), readers = c('s1:readers')
  const some = c('s2:some'), ended = c('s2:ended'), others = c('s3:others'), paid3 = c('s3:paid'), unless = c('s3:unless'), cancelled = c('s3:cancelled')
  const first = c('s4:first'), months = c('s4:months'), won = c('s4:won'), d20 = c('s4:20')
  const but = c('s5:but'), half = c('s5:half'), kept = c('s5:kept'), want = c('s5:want')
  const reason = c('s6:reason'), free6 = c('s6:free'), card = c('s6:card')
  const A = win(f, s1, some), B = win(f, some, first), C = win(f, first, but), D = win(f, but, reason), E = on(f, reason, 6)
  return (
    <g>
      <TallStage id="tr-hook" f={f} />
      <Headline f={f} lines={[[paper, 'A EUROPEAN NEWSPAPER', P.ink, 84], [two, '2 MILLION+ READERS', P.ink], [ended, 'ENDS BY ITSELF', P.ink], [paid3, 'TURNS INTO PAID', P.goldInk], [won, '+20% SUBSCRIBERS', P.mintInk, 104], [half, 'HALF DIDN\'T WANT IT', P.coralInk], [card, 'WHY IT WANTS YOUR CARD', P.goldInk, 80]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, s1, 5)} transform={`translate(${CX} 640) scale(${pop(f, s1)})`}><Prop id="newspaper" x={0} y={0} size={300} f={f} /></g>
        <g opacity={on(f, free, 5)}><Pass x={290} y={880} s={0.7 * pop(f, free)} /></g>
        <g opacity={on(f, cheap, 5)}><Pass x={710} y={880} s={0.7 * pop(f, cheap)} text="€0.99 TRIAL" /></g>
        <g opacity={on(f, two, 5)}>{Array.from({ length: 6 }, (_, k) => <Mini key={k} look={LOOKS[k]} x={170 + k * 132} y={1230} scale={0.85} frame={f} seed={k + 2} mood="happy" />)}</g>
        <g opacity={on(f, readers, 5)}>{Array.from({ length: 5 }, (_, k) => <Paper key={k} x={235 + k * 132} y={1110} s={0.45} r={-8} />)}</g>
      </g>}
      {B > 0 && <g opacity={B}>
        <line x1={CX} y1={460} x2={CX} y2={1240} stroke={P.edge} strokeWidth={4} strokeDasharray="14 12" />
        <Pass x={290} y={600} s={0.75 * pop(f, some)} gone={on(f, ended, 10)} />
        <g opacity={on(f, ended, 5)}><Stamp x={290} y={760} text="ENDED" f={f} at={ended} color={P.ink2} /></g>
        <Mini look="hero" x={290} y={1230} scale={1.1} frame={f} seed={11} mood="neutral" />
        <g opacity={on(f, others, 5)}><Pass x={710} y={600} s={0.75 * pop(f, others)} /></g>
        <g opacity={on(f, paid3, 5)}><path d="M710 690 L710 790" stroke={P.goldInk} strokeWidth={8} markerEnd="" /><path d="M690 770 L710 800 L730 770" fill="none" stroke={P.goldInk} strokeWidth={8} /><BankCard x={710} y={890} s={0.6 * pop(f, paid3)} /></g>
        {Array.from({ length: 3 }, (_, k) => { const p = fly(f, paid3 + 8 + k * 6, [710, 900], [780, 1080], 18, 80); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.6} o={p.o} /> : null })}
        <g opacity={on(f, others, 5)}><Mini look="investorF" x={710} y={1230} scale={1.1} frame={f} seed={12} mood={f >= cancelled ? 'neutral' : 'happy'} /></g>
        <g opacity={on(f, unless, 5)}><Button x={840} y={1060} text="CANCEL" color={P.coral} s={0.4 * pop(f, unless)} press={on(f, cancelled, 4)} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <g opacity={on(f, months, 5)} transform="translate(500 520) scale(0.9)"><Calendar x={0} y={0} text="4 MONTHS" s={1} /></g>
        <line x1={160} y1={1180} x2={860} y2={1180} stroke={P.ink2} strokeWidth={5} />
        {[0, 1].map((k) => { const h = (k === 1 ? 520 * (1 + 0.2 * on(f, d20, 14)) : 520) * on(f, first + k * 4, 14) / 1.2; return <g key={k}><rect x={240 + k * 300} y={1180 - h} width={200} height={h} rx={14} fill={k === 1 ? '#F08A3C' : '#B9B2A4'} /><Label x={340 + k * 300} y={1236} text={k === 1 ? 'TURNS PAID' : 'ENDS'} size={44} font="Bebas Neue" color={P.ink} /></g> })}
        <g opacity={on(f, won, 5)}><Tick x={640} y={600} o={1} r={44} /></g>
      </g>}
      {D > 0 && <g opacity={D}>
        {Array.from({ length: 10 }, (_, k) => { const sad = k % 2 === 1 && f >= half + (k >> 1) * 2; return <g key={k} opacity={on(f, but + k * 1.2, 5)}><Mini look={LOOKS[k % 6]} x={140 + (k % 5) * 180} y={k < 5 ? 860 : 1230} scale={0.95} frame={f} seed={k + 30} mood={sad ? 'sad' : 'happy'} /><Paper x={170 + (k % 5) * 180} y={k < 5 ? 790 : 1160} s={0.4} r={-10} grey={sad && f >= want ? 1 : 0} /></g> })}
        <g opacity={on(f, want, 5)}>{[1, 3, 5, 7, 9].map((k) => <path key={k} d={`M${120 + (k % 5) * 180} ${k < 5 ? 770 : 1140} l40 40 m0 -40 l-40 40`} stroke={P.coral} strokeWidth={8} strokeLinecap="round" />)}</g>
        <g opacity={on(f, kept, 5)}>{Array.from({ length: 5 }, (_, k) => { const p = fly(f, kept + k * 3, [140 + k * 180, 1060], [140 + k * 180, 980], 14, 60); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.5} o={p.o} /> : null })}</g>
      </g>}
      {E > 0 && <g opacity={E}>
        <Doc x={CX} y={820} s={1.6 * pop(f, reason)} title="FREE TRIAL" lines={3} />
        <g opacity={on(f, free6, 5)}><Label x={CX} y={1010} text="$0 TODAY" size={60} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, card, 4)}><BankCard x={lerp(1100, CX, easeOut(span(f, card, card + 14)))} y={1140} s={0.7} r={lerp(14, -4, span(f, card, card + 14))} /></g>
      </g>}
      <Vignette id="tr-hook" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 2) s7–s11: the default flips
const Flip: React.FC<PieceProps> = ({ f, c }) => {
  const s7 = c('s7'), last = c('s7:last')
  const without = c('s8:without'), nothing8 = c('s8:nothing'), ends = c('s8:ends'), keep = c('s8:keep'), choose8 = c('s8:choose'), pay8 = c('s8:pay')
  const with9 = c('s9:with'), flips = c('s9:flips'), payment = c('s9:payment'), itself = c('s9:itself'), stop = c('s9:stop'), choose9 = c('s9:choose'), cancel = c('s9:cancel')
  const same = c('s10:same'), price = c('s10:price'), only = c('s10:only'), changed = c('s10:changed'), happens10 = c('s10:happens'), nothing10 = c('s10:nothing')
  const doing = c('s11:doing'), easiest = c('s11:easiest'), world = c('s11:world')
  const A = win(f, s7, with9), B = win(f, with9, same), C = win(f, same, doing), D = on(f, doing, 6)
  const flipT = span(f, flips, flips + 10), sx = Math.abs(Math.cos(Math.PI * flipT))
  return (
    <g>
      <TallStage id="tr-flip" f={f} tint="navy" />
      <Headline f={f} lines={[[last, 'THE LAST DAY', '#FFFFFF'], [without, 'NO CARD', '#FFFFFF'], [nothing8, 'NOTHING HAPPENS', '#FFFFFF'], [choose8, 'YOU CHOOSE TO PAY', P.gold, 90], [with9, 'CARD ON FILE', '#FFFFFF'], [payment, 'IT PAYS BY ITSELF', P.gold, 90], [choose9, 'YOU CHOOSE TO CANCEL', '#FF9A85', 84], [same, 'SAME TRIAL, SAME PRICE', '#FFFFFF', 84], [only, 'ONLY THE DEFAULT CHANGED', P.gold, 80], [doing, 'DOING NOTHING IS EASY', '#FFFFFF', 86]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, s7, 5) * (1 - on(f, without, 6))} transform={`translate(${CX} 760) scale(${1.6 * pop(f, last)})`}><Calendar x={0} y={0} text="DAY 30" s={1} /></g>
        <g opacity={on(f, without, 5)}>
          <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [nothing8, 'shrug', 'thinking'], [choose8, 'point', 'neutral']]} x={260} y={1240} s={0.7} />
          <g opacity={1 - on(f, ends, 8)}><BankCard x={700} y={560} s={0.5} /><path d="M600 480 L800 640 M800 480 L600 640" stroke={P.coral} strokeWidth={14} strokeLinecap="round" /></g>
          <Pass x={660} y={820} s={0.8} gone={on(f, ends, 10)} />
          <g opacity={on(f, ends, 5)}><Label x={660} y={960} text="TRIAL ENDS" size={52} font="Bebas Neue" color="#C9D3E8" /></g>
          <g opacity={on(f, keep, 5)}><Button x={660} y={1120} text="PAY" color="#3DAA6E" s={pop(f, keep)} press={on(f, pay8, 4)} /></g>
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [payment, 'shock', 'worried'], [choose9, 'point', 'worried']]} x={260} y={1240} s={0.7} />
        <g transform={`translate(660 600) scale(${sx} 1)`}><BankCard x={0} y={0} s={0.8 * pop(f, with9)} /></g>
        <g opacity={on(f, payment, 5)} transform="translate(660 860)"><Prop id="newspaper" x={0} y={0} size={200} f={f} /></g>
        {Array.from({ length: 6 }, (_, k) => { const p = fly(f, payment + k * 5, [660, 660], [660, 860], 16, 60); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.7} o={p.o} /> : null })}
        <g opacity={on(f, itself, 5)}><Label x={660} y={990} text="EVERY MONTH" size={48} font="Bebas Neue" color="#C9D3E8" /></g>
        <g opacity={on(f, stop, 5)}><Button x={660} y={1130} text="CANCEL" color={P.coral} s={0.9 * pop(f, stop)} press={on(f, cancel, 4)} /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        {[0, 1].map((k) => <g key={k}>
          <g opacity={on(f, k === 0 ? same : price, 5)}><Pass x={290 + k * 420} y={560} s={0.6 * pop(f, k === 0 ? same : price)} /></g>
          <g opacity={on(f, only, 5)}><Label x={290 + k * 420} y={720} text={k === 0 ? 'NO CARD' : 'CARD'} size={56} font="Bebas Neue" color="#FFFFFF" />
            <Sofa x={290 + k * 420} y={1000} s={0.42} /><Mini look={k === 0 ? 'buyer' : 'hero'} x={290 + k * 420} y={980} scale={0.85} frame={f} seed={60 + k} /></g>
          <g opacity={on(f, nothing10, 5)}>{k === 0
            ? <Label x={290} y={1180} text="ENDS · $0" size={60} font="Bebas Neue" color="#C9D3E8" />
            : <g>{Array.from({ length: 3 }, (_, j) => <Coin key={j} x={640 + j * 60} y={1170 - 8 * Math.sin((f - nothing10) / 4 + j)} s={0.6} />)}<Label x={710} y={1250} text="CHARGED" size={52} font="Bebas Neue" color="#FF9A85" /></g>}</g>
        </g>)}
        <line x1={CX} y1={480} x2={CX} y2={1240} stroke="#FFFFFF" strokeWidth={3} strokeDasharray="12 12" opacity={0.3} />
        <g opacity={on(f, changed, 5) * (1 - on(f, nothing10, 6))} transform={`translate(${CX} 820) rotate(${180 * easeOut(span(f, changed, changed + 12))})`}><path d="M-60 -20 A60 60 0 0 1 60 -20 M60 20 A60 60 0 0 1 -60 20" fill="none" stroke={P.gold} strokeWidth={10} /><path d="M50 -40 L62 -18 L38 -12 M-50 40 L-62 18 L-38 12" fill="none" stroke={P.gold} strokeWidth={8} /></g>
        <g opacity={on(f, happens10, 5)}>{[0, 1].map((k) => <rect key={k} x={170 + k * 420} y={880} width={240} height={160} rx={20} fill="none" stroke={P.gold} strokeWidth={5} strokeDasharray="14 10" />)}</g>
      </g>}
      {D > 0 && <g opacity={D}>
        <Sofa x={CX} y={1120} s={0.9} />
        <Person f={f} who="hero" beats={[[0, 'relax', 'smiling'], [easiest, 'leanBack', 'smiling']]} x={CX} y={1160} s={0.75} />
        <Zzz x={600} y={760} f={f} o={on(f, easiest, 5)} />
        <g opacity={on(f, world, 5)}><BankCard x={780} y={600} s={0.45} r={8} />{Array.from({ length: 3 }, (_, k) => { const p = fly(f, world + k * 6, [780, 600], [940, 520], 16, 60); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.5} o={p.o} /> : null })}</g>
      </g>}
      <Vignette id="tr-flip" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 3) s12–s17: people don't cancel
const Inertia: React.FC<PieceProps> = ({ f, c }) => {
  const s12 = c('s12'), study = c('s12:study'), renewed = c('s12:renewed'), d72 = c('s12:72'), cancelling = c('s12:cancelling'), month12 = c('s12:month')
  const so = c('s13:so'), month13 = c('s13:month'), after = c('s13:after'), month13b = c('s13:month#2'), card13 = c('s13:card'), kept13 = c('s13:kept'), charged = c('s13:charged')
  const browsing = c('s14:browsing'), rarely = c('s14:rarely'), read = c('s14:read')
  const outside = c('s15:outside'), same15 = c('s15:same'), survey = c('s16:survey'), d42 = c('s16:42'), forgotten = c('s16:forgotten'), paying16 = c('s16:paying'), subscription16 = c('s16:subscription')
  const average = c('s17:average'), d133 = c('s17:133'), month17 = c('s17:month'), guessed = c('s17:guessed')
  const A = win(f, s12, so), B = win(f, so, outside), C = win(f, outside, average), D = on(f, average, 6)
  const ring = 0.72 * on(f, d72, 18)
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN']
  // # one more month page lands on each spoken beat of "so, month after month, the card kept getting charged"
  const monthAt = [so, month13, after, month13b, card13, kept13]
  const shown = monthAt.filter((a) => f >= a).length
  const pile = f >= browsing ? Math.min(9, 1 + Math.floor((f - browsing) / 4)) : 0
  return (
    <g>
      <TallStage id="tr-inertia" f={f} />
      <Headline f={f} lines={[[study, 'THE NEWSPAPER STUDY', P.ink, 86], [d72, '72% DON\'T CANCEL', P.coralInk, 100], [charged, 'CHARGED EVERY MONTH', P.ink, 88], [rarely, 'RARELY READ', P.coralInk, 104], [outside, 'OUTSIDE THE STUDY', P.ink, 90], [survey, 'A 2022 SURVEY', P.ink], [d42, '42% FORGOT ONE', P.coralInk, 104], [d133, '+$133 A MONTH', P.coralInk, 110]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, s12, 5) * (1 - on(f, renewed, 6))} transform="translate(500 760)"><Prop id="newspaper" x={0} y={0} size={280} f={f} /><g transform="translate(110 90)"><Prop id="magnifier" x={0} y={0} size={160} f={f} /></g></g>
        <g opacity={on(f, renewed, 5)}>
          <circle cx={CX} cy={800} r={250} fill="none" stroke={P.edge} strokeWidth={44} />
          <circle cx={CX} cy={800} r={250} fill="none" stroke="#F08A3C" strokeWidth={44} strokeDasharray={`${2 * Math.PI * 250 * ring} 9999`} transform={`rotate(-90 ${CX} 800)`} strokeLinecap="round" />
          <g transform={`translate(${CX} 800) rotate(${(f - renewed) * 2})`}><path d="M-60 -20 A64 64 0 1 1 -20 60" fill="none" stroke={P.ink2} strokeWidth={10} opacity={1 - on(f, d72, 6)} /></g>
          <g opacity={on(f, d72, 5)}><Label x={CX} y={830} text="72%" size={130} font="Bebas Neue" color={P.coralInk} /></g>
          <g opacity={on(f, month12, 5)}><Label x={CX} y={1160} text="EACH MONTH" size={56} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, cancelling, 5) * (1 - on(f, month12, 6))}><Button x={CX} y={1160} text="CANCEL" color="#B9B2A4" s={0.55} /><path d="M410 1110 L590 1210" stroke={P.coral} strokeWidth={10} strokeLinecap="round" /></g>
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g opacity={1 - on(f, browsing, 8)}>
          <BankCard x={CX} y={1040} s={0.7} />
          {months.slice(0, shown).map((m, k) => <g key={k} transform={`translate(${170 + k * 132} 640) scale(${0.75 * pop(f, monthAt[k])})`}><Calendar x={0} y={0} text={m} s={1} /></g>)}
          {months.slice(0, shown).map((_, k) => { const p = fly(f, monthAt[k] + 2, [CX, 1000], [170 + k * 132, 760], 14, 90); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.55} o={p.o} /> : <g key={k} opacity={on(f, charged, 4)}><Coin x={170 + k * 132} y={790} s={0.45} /></g> })}
        </g>
        <g opacity={on(f, browsing, 5)}>
          <rect x={170} y={1180} width={660} height={24} rx={8} fill={P.edge} />
          <path d="M240 1180 L240 760 L500 600 L760 760 L760 1180 Z" fill="#E9C25A" opacity={0.35} />
          <rect x={440} y={960} width={120} height={220} rx={10} fill={P.navy3} opacity={0.8} />
          {Array.from({ length: pile }, (_, k) => <Paper key={k} x={330 + (k % 2) * 16} y={1150 - k * 22} s={0.6} r={(k % 3) * 4 - 4} grey={on(f, rarely, 6) > 0.5 ? 1 : 0} />)}
          {Array.from({ length: Math.max(0, pile - 5) }, (_, k) => <Paper key={k} x={680 - (k % 2) * 16} y={1150 - k * 22} s={0.6} r={(k % 3) * -4 + 4} grey={on(f, rarely, 6) > 0.5 ? 1 : 0} />)}
          <g opacity={on(f, read, 5)}><Stamp x={CX} y={760} text="UNREAD" f={f} at={read} /></g>
        </g>
      </g>}
      {C > 0 && <g opacity={C}>
        <g opacity={on(f, outside, 5) * (1 - on(f, survey, 6))} transform="translate(500 780)"><Prop id="globe" x={0} y={0} size={300} f={f} /></g>
        <g opacity={on(f, same15, 5) * (1 - on(f, survey, 6))}>{Array.from({ length: 4 }, (_, k) => <Paper key={k} x={800} y={1100 - k * 22} s={0.55} r={(k % 2) * 6 - 3} grey={1} />)}<BankCard x={220} y={1080} s={0.45} r={-8} /></g>
        <g opacity={on(f, survey, 5)} transform="translate(500 560)"><Doc x={0} y={0} s={0.9 * pop(f, survey)} title="SURVEY" lines={2} /></g>
        {Array.from({ length: 10 }, (_, k) => { const hit = k < 4 && f >= d42 + k * 2; return <g key={k} opacity={on(f, survey + k, 5)}>
          <Mini look={LOOKS[k % 6]} x={150 + (k % 5) * 175} y={k < 5 ? 940 : 1240} scale={0.8} frame={f} seed={k + 70} mood={hit ? 'sad' : 'neutral'} />
          {hit && <g opacity={on(f, forgotten, 5)}><circle cx={150 + (k % 5) * 175} cy={(k < 5 ? 940 : 1240) - 210} r={34} fill={P.paper} stroke={P.coral} strokeWidth={4} /><text x={150 + (k % 5) * 175} y={(k < 5 ? 940 : 1240) - 196} textAnchor="middle" fill={P.coralInk} style={{ font: '400 44px "Bebas Neue"' }}>?</text></g>}
          {hit && <g opacity={on(f, paying16, 5)}><Coin x={190 + (k % 5) * 175} y={(k < 5 ? 940 : 1240) - 60} s={0.4} /></g>}
          {hit && <g opacity={on(f, subscription16, 5)}><rect x={110 + (k % 5) * 175} y={(k < 5 ? 940 : 1240) - 290} width={80} height={36} rx={8} fill={P.navy3} /><text x={150 + (k % 5) * 175} y={(k < 5 ? 940 : 1240) - 264} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 26px "Bebas Neue"' }}>SUB</text></g>}
        </g> })}
      </g>}
      {D > 0 && <g opacity={D}>
        <line x1={180} y1={1180} x2={820} y2={1180} stroke={P.ink2} strokeWidth={5} />
        {[0, 1].map((k) => { const h = (k === 0 ? 260 : 660) * on(f, average + k * 8, 14); return <g key={k}><rect x={240 + k * 320} y={1180 - h} width={200} height={h} rx={14} fill={k === 0 ? '#B9B2A4' : '#F08A3C'} /><Label x={340 + k * 320} y={1236} text={k === 0 ? 'GUESSED' : 'REALLY PAID'} size={46} font="Bebas Neue" color={P.ink} /></g> })}
        <g opacity={on(f, d133, 5)}>
          <path d="M470 920 L470 520" stroke={P.coralInk} strokeWidth={6} strokeDasharray="12 10" />
          <path d="M450 540 L470 515 L490 540" fill="none" stroke={P.coralInk} strokeWidth={6} />
          <g transform="translate(330 700)"><rect x={-110} y={-50} width={220} height={100} rx={20} fill={P.coral} /><text x={0} y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 64px "Bebas Neue"' }}>+$133</text></g>
        </g>
        <g opacity={on(f, guessed, 5)}><Person f={f} who="investorF" beats={[[0, 'scratchHead', 'thinking']]} x={880} y={1250} s={0.45} /></g>
        <g opacity={on(f, month17, 5)} transform="translate(860 470) scale(0.85)"><Calendar x={0} y={0} text="MONTH" s={1} /></g>
      </g>}
      <Vignette id="tr-inertia" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 4) s18–s20: the hard-to-reach cancel button
const Maze: React.FC<PieceProps> = ({ f, c }) => {
  const s18 = c('s18'), step = c('s18:step'), cancel = c('s18:cancel'), hard = c('s18:hard'), reach = c('s18:reach')
  const amazon = c('s19:amazon'), d25 = c('s19:25'), settle = c('s19:settle'), signed = c('s19:signed'), consent = c('s19:consent'), cancelling = c('s19:cancelling')
  const s19 = c('s19'), cancel20 = c('s20:cancel')
  const admit = c('s20:admit'), reporting = c('s20:reporting'), nickname = c('s20:nickname'), iliad = c('s20:iliad'), poem = c('s20:poem'), war = c('s20:war')
  const A = win(f, s18, amazon), B = win(f, amazon, admit), C = on(f, admit, 6)
  // # a zig-zag path from the person (bottom left) to the CANCEL button (top right), drawn as it is spoken
  const path = 'M180 1160 L180 1020 L820 1020 L820 880 L180 880 L180 740 L820 740 L820 600'
  const drawn = span(f, step, hard + 10)
  const pages = f >= nickname ? Math.min(12, 1 + Math.floor((f - nickname) / 3)) : 0
  return (
    <g>
      <TallStage id="tr-maze" f={f} tint="navy" />
      <Headline f={f} lines={[[s18, 'SOME GO FURTHER', '#FFFFFF'], [cancel, 'THE CANCEL BUTTON', '#FFFFFF', 90], [hard, 'HARD TO REACH', '#FF9A85', 104], [amazon, 'AMAZON · 2025', '#FFFFFF'], [d25, '$2.5 BILLION', P.gold, 116], [settle, 'FTC SETTLEMENT', '#FFFFFF'], [admit, 'NO WRONGDOING ADMITTED', '#FFFFFF', 78], [nickname, 'ITS NICKNAME:', '#FFFFFF'], [iliad, '"THE ILIAD"', P.gold, 120]]} />
      {A > 0 && <g opacity={A}>
        <path d={path} fill="none" stroke="#C9D3E8" strokeWidth={70} strokeLinejoin="round" opacity={0.12} />
        <path d={path} fill="none" stroke={P.gold} strokeWidth={12} strokeLinejoin="round" strokeDasharray={`${3600 * drawn} 9999`} strokeLinecap="round" />
        <g opacity={on(f, cancel, 5)}><Button x={820} y={520} text="CANCEL" color={P.coral} s={lerp(0.8, 0.45, on(f, hard, 10)) * pop(f, cancel)} /></g>
        <Person f={f} who="hero" beats={[[0, 'idle', 'neutral'], [step, 'scratchHead', 'thinking'], [reach, 'despair', 'worried']]} x={180} y={1250} s={0.5} />
        <g opacity={on(f, s19, 5)} transform={`translate(${CX} 1120) scale(${1.2 * pop(f, s19)})`}><Calendar x={0} y={0} text="2025" s={1} /></g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(${CX} 680) scale(${1.0 * pop(f, amazon)})`}><Prop id="shopping-bag" x={0} y={0} size={260} f={f} /></g>
        <g opacity={on(f, d25, 5)}>{Array.from({ length: 5 }, (_, k) => <g key={k} opacity={on(f, d25 + k * 2, 4)} transform={`translate(${260 + k * 120} ${1180 - (k % 2) * 30})`}><Prop id="cash-stack" x={0} y={0} size={130} f={f} /></g>)}</g>
        <g opacity={on(f, settle, 5)} transform={`translate(780 900) rotate(${-30 * (1 - on(f, settle + 4, 6)) + 0})`}><Prop id="gavel" x={0} y={0} size={220} f={f} /></g>
        <g opacity={on(f, signed, 5) * (1 - on(f, cancelling, 6))}><Doc x={240} y={900} s={0.8} title="PRIME" lines={2} stamp={f >= consent ? '?' : undefined} stampO={on(f, consent, 5)} /></g>
        <g opacity={on(f, cancelling, 5)} transform="translate(240 900) scale(0.35)"><path d={path} fill="none" stroke={P.gold} strokeWidth={22} transform="translate(-500 -880)" /></g>
      </g>}
      {C > 0 && <g opacity={C}>
        <g opacity={on(f, admit, 5) * (1 - on(f, reporting, 6))} transform="translate(500 780)"><Prop id="scale-balance" x={0} y={0} size={300} f={f} /></g>
        <g opacity={on(f, reporting, 5) * (1 - on(f, nickname, 6))} transform="translate(500 700)"><Prop id="newspaper" x={0} y={0} size={280} f={f} /></g>
        <g opacity={on(f, cancel20, 5) * (1 - on(f, nickname, 6))}><Button x={CX} y={1080} text="CANCEL" color={P.coral} s={0.8 * pop(f, cancel20)} /></g>
        <g opacity={on(f, nickname, 5)}>
          {Array.from({ length: pages }, (_, k) => <g key={k} transform={`translate(${CX + (k % 2) * 8 - 4} ${520 + k * 58}) rotate(${(k % 3) - 1})`}><rect x={-200} y={-24} width={400} height={50} rx={6} fill="#F7F2E8" stroke={P.edge} strokeWidth={2} /><text x={0} y={10} textAnchor="middle" fill={P.ink2} style={{ font: '400 30px "Bebas Neue"', letterSpacing: 2 }}>{`STEP ${k + 1}`}</text></g>)}
          <g opacity={on(f, poem, 5)} transform={`translate(820 700) scale(${pop(f, poem)})`}><Prop id="contract" x={0} y={0} size={200} f={f} /></g>
          <g opacity={on(f, war, 5)} transform="translate(820 1150)"><Prop id="hourglass" x={0} y={0} size={170} f={f} /></g>
          <g opacity={on(f, war, 5)}><Label x={820} y={1000} text="10 YEARS" size={50} font="Bebas Neue" color={P.gold} /></g>
        </g>
      </g>}
      <Vignette id="tr-maze" w={1080} h={1920} />
    </g>
  )
}

// ------------------------------------------------------------ 5) s21–s28: the twist and the self-check
const Twist: React.FC<PieceProps> = ({ f, c }) => {
  const twist = c('s21:twist'), years = c('s22:years'), autorenew = c('s22:autorenew'), d10 = c('s22:10'), more = c('s22:more')
  const many = c('s23:many'), catchW = c('s23:catch'), never = c('s23:never')
  const wins = c('s24:wins'), scares = c('s24:scares'), away = c('s24:away')
  const want = c('s25:want'), open = c('s26:open'), count = c('s26:count'), things = c('s26:things'), last = c('s26:last')
  const started = c('s27:started'), free27 = c('s27:free'), card27 = c('s27:card')
  const s28 = c('s28'), free28 = c('s28:free'), doing = c('s28:doing'), pay = c('s28:pay')
  const A = win(f, twist, many), B = win(f, many, want), C = win(f, want, s28), D = on(f, s28, 6)
  // # two lines over two years: auto-renew starts higher, ends lower (shape illustrative; −10% is the study's result)
  const t = span(f, years, d10 + 6)
  const X = (u: number) => 160 + 700 * u
  const renew = (u: number) => 900 - 300 * Math.min(1, u * 4) + 360 * Math.max(0, u - 0.25)
  const cancelL = (u: number) => 900 - 240 * Math.min(1, u * 3) + 60 * Math.max(0, u - 0.33)
  const line = (fn: (u: number) => number) => Array.from({ length: 41 }, (_, k) => k / 40).filter((u) => u <= t).map((u, k) => `${k ? 'L' : 'M'}${X(u)} ${fn(u)}`).join(' ')
  const rows = ['MUSIC', 'NEWS', 'FITNESS APP', 'VIDEO', 'CLOUD']
  return (
    <g>
      <TallStage id="tr-twist" f={f} />
      <Headline f={f} lines={[[twist, 'THE TWIST', P.ink, 110], [d10, '10% FEWER SUBSCRIBERS', P.coralInk, 84], [catchW, 'THEY SAW THE CATCH', P.ink, 92], [wins, 'WINS EARLY…', P.mintInk], [scares, '…LOSES LATER', P.coralInk], [want, 'TRY THIS', P.ink], [count, 'COUNT THE UNUSED', P.ink, 92], [free27, 'FREE, WITH YOUR CARD', P.goldInk, 84], [free28, 'THE TRIAL WAS FREE', P.ink, 90], [doing, 'DOING NOTHING COSTS', P.coralInk, 90]]} />
      {A > 0 && <g opacity={A}>
        <g opacity={on(f, twist, 5) * (1 - on(f, years, 6))} transform="translate(500 780)"><Prop id="exclamation" x={0} y={0} size={260} f={f} /></g>
        <g opacity={on(f, years, 5)}>
          <line x1={150} y1={1000} x2={870} y2={1000} stroke={P.ink2} strokeWidth={5} /><line x1={150} y1={1000} x2={150} y2={500} stroke={P.ink2} strokeWidth={5} />
          <Label x={300} y={1060} text="START" size={44} font="Bebas Neue" color={P.ink2} /><Label x={800} y={1060} text="2 YEARS" size={44} font="Bebas Neue" color={P.ink2} />
          <path d={line(cancelL)} fill="none" stroke="#7A8FB8" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
          <g opacity={on(f, autorenew, 5)}><path d={line(renew)} fill="none" stroke="#F08A3C" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" /></g>
          <g opacity={on(f, d10, 5)}><Label x={720} y={570} text="ENDS BY ITSELF" size={42} font="Bebas Neue" color="#5A6F98" /><Label x={720} y={800} text="TURNS PAID" size={42} font="Bebas Neue" color="#C96A22" /></g>
          <g opacity={on(f, more, 5)}><Label x={CX} y={1180} text="AUTO-RENEW LOST" size={60} font="Bebas Neue" color={P.coralInk} /></g>
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <g transform={`translate(${CX} 620)`} opacity={1 - on(f, wins, 8)}>
          <BankCard x={0} y={0} s={0.9 * pop(f, many)} />
          <g opacity={on(f, catchW, 5)} transform={`translate(150 -150) rotate(${10 * Math.sin((f - catchW) / 6)})`}><line x1={0} y1={-200} x2={0} y2={60} stroke={P.ink2} strokeWidth={4} /><path d="M0 60 L0 110 Q0 150 -36 150 Q-66 150 -66 116" fill="none" stroke={P.ink2} strokeWidth={10} strokeLinecap="round" /></g>
        </g>
        {Array.from({ length: 4 }, (_, k) => { const go = span(f, never + k * 3, never + k * 3 + 26); return <g key={k} opacity={on(f, many, 5) * (1 - on(f, wins, 8))}><Mini look={LOOKS[k + 1]} x={300 + k * 140 - 700 * easeOut(go)} y={1200} scale={1} frame={f} seed={k + 80} mood={f >= catchW ? 'neutral' : 'happy'} /></g> })}
        <g opacity={on(f, wins, 5)}>
          <g transform="translate(300 760)"><Calendar x={0} y={0} text="EARLY" s={1.5} /></g><Tick x={300} y={960} o={on(f, wins, 5)} r={46} />
          <g opacity={on(f, scares, 5)} transform="translate(700 760)"><Calendar x={0} y={0} text="LATER" s={1.5} /></g><g opacity={on(f, scares, 5)}><Tick x={700} y={960} o={1} r={46} ok={false} /></g>
          {Array.from({ length: 3 }, (_, k) => <g key={k} opacity={on(f, away, 5)}><Mini look={LOOKS[k]} x={lerp(700, 1000, span(f, away + k * 3, away + k * 3 + 24))} y={1220} scale={0.8} frame={f} seed={k + 90} /></g>)}
        </g>
      </g>}
      {C > 0 && <g opacity={C}>
        <g opacity={on(f, want, 5) * (1 - on(f, open, 6))} transform={`translate(${CX} 800) scale(${pop(f, want)})`}><Prop id="phone" x={0} y={0} size={320} f={f} /><g transform="translate(150 -170)"><Prop id="question" x={0} y={0} size={140} f={f} /></g></g>
        <Phone2 f={f} at={open} />
        {rows.map((r, k) => { const unused = k === 1 || k === 2 || k === 4; return <g key={k} opacity={on(f, open + 4 + k * 2, 5)} transform={`translate(${CX} ${600 + k * 120})`}>
          <rect x={-250} y={-44} width={500} height={92} rx={14} fill="#FFFFFF" stroke={P.edge} strokeWidth={3} />
          <text x={-220} y={14} fill={P.ink} style={{ font: '400 44px "Bebas Neue"', letterSpacing: 2 }}>{r}</text>
          <text x={220} y={14} textAnchor="end" fill={P.ink2} style={{ font: '500 34px "JetBrains Mono"' }}>-$</text>
          {unused && <g opacity={on(f, (k === 1 ? count : k === 2 ? things : last) + 2, 5)}><rect x={-250} y={-44} width={500} height={92} rx={14} fill="none" stroke={P.coral} strokeWidth={8} /><circle cx={290} cy={2} r={30} fill={P.coral} /><text x={290} y={16} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{k === 1 ? 1 : k === 2 ? 2 : 3}</text></g>}
          {unused && <g opacity={on(f, started + k, 5)} transform="translate(80 0) scale(0.32)"><Pass x={0} y={0} s={1} text={f >= free27 ? 'FREE' : 'TRIAL'} /></g>}
          {unused && <g opacity={on(f, card27, 5)} transform="translate(170 -6)"><BankCard x={0} y={0} s={0.17} /></g>}
        </g> })}
      </g>}
      {D > 0 && <g opacity={D}>
        <Pass x={300} y={640} s={0.85 * pop(f, s28)} />
        <g opacity={on(f, free28, 5)}><Label x={300} y={780} text="$0" size={80} font="Bebas Neue" color={P.mintInk} /></g>
        <g opacity={on(f, doing, 5)}>
          <Sofa x={680} y={1140} s={0.6} /><Mini look="hero" x={680} y={1120} scale={1} frame={f} seed={99} /><Zzz x={730} y={980} f={f} o={1} />
          <BankCard x={680} y={800} s={0.5} r={-6} />
          {Array.from({ length: 6 }, (_, k) => { const p = fly(f, doing + 6 + k * 5, [680, 800], [900, 520], 18, 80); return p.o > 0 ? <Coin key={k} x={p.x} y={p.y} s={0.55} o={p.o} /> : null })}
        </g>
        <g opacity={on(f, pay, 5)}><Label x={CX} y={1250} text="EVERY MONTH" size={52} font="Bebas Neue" color={P.coralInk} /></g>
      </g>}
      <Vignette id="tr-twist" w={1080} h={1920} />
    </g>
  )
}
// # the bank-app frame behind the payment rows (a tall phone outline)
const Phone2: React.FC<{ f: number; at: number }> = ({ f, at }) => (
  <g opacity={on(f, at, 5)}>
    <rect x={200} y={440} width={600} height={840} rx={50} fill="#0D1424" />
    <rect x={220} y={470} width={560} height={780} rx={34} fill="#F7FAFF" />
    <text x={CX} y={530} textAnchor="middle" fill={P.ink2} style={{ font: '400 40px "Bebas Neue"', letterSpacing: 3 }}>PAYMENTS · LAST MONTH</text>
  </g>
)

export const TRIALS = [
  makePiece('tr-hook', 'Short: a newspaper tested free and cheap trials on 2M+ readers — some ended, others turned paid — paid won by 20% for 4 months — half didn\'t want it — why a trial asks for your card', { canvas: 'tall', mood: 'light', Component: Hook,
    beats: ["s1", "s1:free", "s1:cheap", "s1:2", "s1:readers", "s2:some", "s2:ended", "s3:others", "s3:paid", "s3:unless", "s3:cancelled", "s4:first", "s4:months", "s4:won", "s4:20", "s5:but", "s5:half", "s5:kept", "s5:want", "s6:reason", "s6:free", "s6:card"],
    sfx: [['s1:newspaper', 'flutter', 0.3], ['s1:2', 'tick', 0.3], ['s2:ended', 'thud', 0.3], ['s3:paid', 'coin', 0.35], ['s4:20', 'riser', 0.3], ['s5:half', 'thud', 0.3], ['s6:card', 'swish', 0.3]] }),
  makePiece('tr-flip', 'Short: the last day — no card: nothing happens, you choose to pay — card: it pays by itself, you choose to cancel — same trial, only the default changed — doing nothing is easy', { canvas: 'tall', mood: 'dark', Component: Flip,
    beats: ["s7", "s7:last", "s8:without", "s8:nothing", "s8:ends", "s8:keep", "s8:choose", "s8:pay", "s9:with", "s9:flips", "s9:payment", "s9:itself", "s9:stop", "s9:choose", "s9:cancel", "s10:same", "s10:price", "s10:only", "s10:changed", "s10:happens", "s10:nothing", "s11:doing", "s11:easiest", "s11:world"],
    sfx: [['s7:last', 'tick', 0.3], ['s8:ends', 'thud', 0.3], ['s8:pay', 'click', 0.3], ['s9:flips', 'swish', 0.3], ['s9:payment', 'coin', 0.35], ['s9:cancel', 'click', 0.3], ['s10:nothing', 'ding', 0.3]] }),
  makePiece('tr-inertia', 'Short: 72% don\'t cancel each month — charged month after month — papers pile up unread — 42% forgot a subscription — $133 a month more than guessed', { canvas: 'tall', mood: 'light', Component: Inertia,
    beats: ["s12", "s12:study", "s12:renewed", "s12:72", "s12:cancelling", "s12:month", "s13:so", "s13:month", "s13:after", "s13:month#2", "s13:card", "s13:kept", "s13:charged", "s14:browsing", "s14:rarely", "s14:read", "s15:outside", "s15:same", "s16:survey", "s16:42", "s16:forgotten", "s16:paying", "s16:subscription", "s17:average", "s17:133", "s17:month", "s17:guessed"],
    sfx: [['s12:72', 'riser', 0.3], ['s13:charged', 'coin', 0.35], ['s14:read', 'thud', 0.3], ['s16:42', 'tick', 0.3], ['s17:133', 'thud', 0.35]] }),
  makePiece('tr-maze', 'Short: the cancel button at the end of a maze — Amazon 2025, $2.5B FTC settlement — no wrongdoing admitted — its cancel flow nicknamed the Iliad', { canvas: 'tall', mood: 'dark', Component: Maze,
    beats: ["s18", "s18:step", "s18:cancel", "s18:hard", "s18:reach", "s19:amazon", "s19:25", "s19:settle", "s19:signed", "s19:consent", "s19:cancelling", "s19", "s20:cancel", "s20:admit", "s20:reporting", "s20:nickname", "s20:iliad", "s20:poem", "s20:war"],
    sfx: [['s18:hard', 'thud', 0.3], ['s19:25', 'coin', 0.35], ['s19:settle', 'thud', 0.4], ['s20:iliad', 'chime', 0.3]] }),
  makePiece('tr-twist', 'Short: over two years auto-renew got 10% fewer subscribers — readers saw the catch — wins early, loses later — count unused payments — free, with your card — doing nothing costs', { canvas: 'tall', mood: 'light', Component: Twist,
    beats: ["s21:twist", "s22:years", "s22:autorenew", "s22:10", "s22:more", "s23:many", "s23:catch", "s23:never", "s24:wins", "s24:scares", "s24:away", "s25:want", "s26:open", "s26:count", "s26:things", "s26:last", "s27:started", "s27:free", "s27:card", "s28", "s28:free", "s28:doing", "s28:pay"],
    sfx: [['s21:twist', 'whoosh', 0.3], ['s22:10', 'thud', 0.35], ['s23:never', 'swish', 0.3], ['s26:count', 'pop', 0.3], ['s27:card', 'ding', 0.3], ['s28:pay', 'coin', 0.35]] }),
]
