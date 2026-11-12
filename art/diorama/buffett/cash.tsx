// ---------------------------------------------------------------- s86–s96: the secret is the cash (casino-style rebuild).
// 1) Buffett's office: a big vault door swings open on stacks of cash; a FORMULA paper is crossed out; the 2008 letter
// on the desk lights its promise; a lender's hand reaching in is waved off; through the window a crowd hurries away
// carrying share papers to sell. 2) A bank lobby in panic: a sweating banker at his desk, a falling board on the wall,
// people walking past without lending; Buffett walks in with a briefcase and they shake on HIS TERMS. 3) The deals:
// J&J and P&G crates slide out of Buffett's vault and turn into cash, which flows into Wrigley, Goldman Sachs and
// General Electric; CHEAP tags drift down onto them.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, Doc, Headline, Person, fly, win } from '../aimoney/common'
import { PriceTag } from '../charts'
import { Mini } from '../../rig/Mini'
import { Note } from '../gift/kit'
import { Share } from '../buyback/kit'
import { Bank, BigArrow, Briefcase, Letter } from './kit'
import { Buffett, Street, gestB } from './hook'

// # a big round vault door with stacks of cash behind it; open 0–1, fill 0–1
export const VaultRoom: React.FC<{ x: number; y: number; s?: number; open: number; fill: number }> = ({ x, y, s = 1, open, fill }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-300} y={-300} width={600} height={600} rx={30} fill="#3A4660" />
    <rect x={-260} y={-260} width={520} height={520} rx={20} fill="#1B2233" />
    {Array.from({ length: Math.round(20 * fill) }, (_, k) => <rect key={k} x={-230 + (k % 5) * 92} y={190 - Math.floor(k / 5) * 100} width={84} height={70} rx={8} fill="#5FBF7F" stroke="#2E8B57" strokeWidth={4} />)}
    <g transform={`translate(-260 0) scale(${1 - 0.9 * open} 1) translate(260 0)`}><circle r={260} fill="#8C96A3" /><circle r={200} fill="#A9B2BE" /><circle r={40} fill="#5A6680" />{[0, 60, 120].map((a) => <rect key={a} x={-8} y={-150} width={16} height={300} rx={8} fill="#5A6680" transform={`rotate(${a})`} />)}</g>
  </g>
)

const Cash: React.FC<PieceProps> = ({ f, c }) => {
  const secret = c('s86:secret'), formula = c('s87:formula'), cash87 = c('s87:cash')
  const letter = c('s88:letter'), promise = c('s88:promise'), cash89 = c('s89:cash'), strangers = c('s89:strangers'), bills = c('s89:bills')
  const act = c('s90:act'), selling = c('s90:selling')
  const bank91 = c('s91:bank'), lend = c('s91:lend'), falling = c('s91:falling')
  const buyer = c('s92:buyer'), billions = c('s92:billions'), price93 = c('s93:price'), bike93 = c('s93:bike'), terms = c('s93:terms')
  const n145 = c('s94:145'), wrigley = c('s94:wrigley'), goldman = c('s94:goldman'), general = c('s94:general')
  const sold = c('s95:sold'), johnson = c('s95:johnson'), procter = c('s95:procter'), good = c('s96:good'), cheap = c('s96:cheap')
  const A = win(f, 0, bank91 - 4, 10), B = win(f, bank91 - 4, n145 - 4, 10), Cw = on(f, n145 - 4, 10)
  // # extra gesture words (each pause gets Buffett acting on a word)
  const G = [c('s87:it'), c('s87:not#2'), c('s89:always'), c('s89:depend'), c('s91:nobody'), c('s93:not'), c('s94:alone'), c('s95:wanted')]
  return (
    <g>
      <StageBg id="wb-cash" frame={f} />
      <Headline f={f} lines={[[secret, 'THE REAL SECRET?', P.ink, 110], [cash87, 'CASH READY', P.goldInk, 120], [letter, 'HIS 2008 LETTER', P.ink, 104], [cash89, '“MORE THAN AMPLE CASH”', P.goldInk, 104], [selling, 'OTHERS WERE SELLING', P.coralInk, 104],
        [bank91, 'NOBODY LENDS TO YOU', P.coralInk, 104], [buyer, 'ONE BUYER WITH BILLIONS', P.goldInk, 104], [terms, 'THE ONE WITH CASH NAMES THE TERMS', P.ink, 96], [n145, '2008: $14.5 BILLION IN DEALS', P.goldInk, 100], [sold, 'SOLD GOOD THINGS TO PAY', P.ink, 100]]} />
      {/* # A: the office: vault, letter, a refused lender, the window with sellers */}
      {A > 0 && <g opacity={A}>
        <rect x={0} y={900} width={1920} height={180} fill="#5A3A22" />
        <rect x={1240} y={180} width={560} height={420} rx={20} fill="#1E3A63" /><rect x={1260} y={200} width={520} height={380} rx={14} fill="#2B4A78" />
        {Array.from({ length: 6 }, (_, k) => { const t = ((f - selling) / 90 + k / 6) % 1; return <g key={k} opacity={on(f, act, 8)}><Mini look={['buyer', 'owner', 'worker'][k % 3]} x={lerp(1280, 1780, t)} y={570} scale={0.45} frame={f} seed={k + 140} mood="sad" /><g transform={`translate(${lerp(1280, 1780, t) + 20} 470)`}><Share x={0} y={0} s={0.16} /></g></g> })}
        <VaultRoom x={620} y={560} s={0.95} open={on(f, cash87, 18)} fill={on(f, cash89, 30)} />
        <g opacity={on(f, formula, 6) * (1 - on(f, cash87, 8))} transform="translate(1500 760) rotate(-5) scale(0.6)"><Doc x={0} y={0} title="FORMULA" /><path d="M-160 -200 L160 200 M160 -200 L-160 200" stroke={P.coral} strokeWidth={26} strokeLinecap="round" opacity={on(f, formula + 6, 6)} /></g>
        <g opacity={on(f, letter, 6) * (1 - on(f, act, 8))} transform={`translate(${lerp(1900, 1480, on(f, letter, 14))} 760) rotate(4) scale(0.75)`}><Letter x={0} y={0} year="2008" hi={on(f, promise, 8)} /></g>
        <g opacity={on(f, strangers, 6) * (1 - on(f, act, 8))} transform={`translate(${lerp(1900, 1250, on(f, strangers, 14))} 520) rotate(-20)`}><rect x={0} y={-30} width={260} height={60} rx={30} fill="#2B8FE0" /><path d="M-60 -40 Q-90 0 -60 40 L10 40 L10 -40 Z" fill="#F2C9A0" /><path d="M-90 -80 L100 80 M100 -80 L-90 80" stroke={P.coral} strokeWidth={18} strokeLinecap="round" opacity={on(f, strangers + 8, 6)} /></g>
        <g opacity={on(f, bills, 6) * (1 - on(f, act, 8))} transform="translate(1000 820) rotate(-6) scale(0.45)"><Doc x={0} y={0} title="BILLS" stamp="PAID" stampO={on(f, bills + 8, 6)} /></g>
        <Buffett f={f} beats={gestB([[0, 'idle', 'neutral'], [secret, 'think', 'thinking'], [cash87, 'present', 'smiling'], [strangers, 'stop', 'smug'], [act, 'confident', 'smiling']], G)} x={1120} y={1060} s={1.05} plate={0} />
      </g>}
      {/* # B: a bank lobby in panic; nobody lends; Buffett walks in with billions; HIS TERMS */}
      {B > 0 && <g opacity={B}>
        <rect x={0} y={900} width={1920} height={180} fill="#8C96A3" />
        <rect x={1220} y={220} width={520} height={340} rx={20} fill="#0D1424" /><text x={1480} y={290} textAnchor="middle" fill="#9FB4D6" style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>YOUR SHARES</text>
        <g opacity={on(f, falling, 6)} transform={`translate(1480 ${lerp(360, 470, easeInOut(span(f, falling, falling + 20)))}) scale(0.55)`}><BigArrow x={0} y={0} s={1} dir={-1} color={P.coral} /></g>
        <rect x={1000} y={760} width={560} height={140} rx={14} fill="#5A3A22" />
        <Person f={f} who="owner" beats={[[0, 'nervous', 'worried'], [lend, 'despair', 'worried'], [terms, 'handshake', 'neutral']]} x={1280} y={1000} s={1.05} flip />
        {Array.from({ length: 5 }, (_, k) => { const t = ((f - lend) / 100 + k / 5) % 1; return <g key={k} opacity={on(f, lend, 8) * (1 - on(f, buyer, 8))}><Mini look={['buyer', 'investor', 'hero'][k % 3]} x={lerp(-100, 2020, t)} y={1060} scale={0.8} frame={f} seed={k + 150} /><g transform={`translate(${lerp(-100, 2020, t)} 860)`}><circle r={22} fill={P.card} /><path d="M-10 -10 L10 10 M10 -10 L-10 10" stroke={P.coralInk} strokeWidth={5} /></g></g> })}
        <g opacity={on(f, buyer - 4, 8)}><Buffett f={f} beats={gestB([[0, 'walkA', 'neutral', 'walkB', 10], [buyer + 30, 'holdUp', 'smiling'], [terms, 'handshake', 'smug']], G)} x={lerp(-200, 900, easeInOut(span(f, buyer - 4, buyer + 30)))} y={1060} s={1.1} plate={0} /></g>
        <g opacity={on(f, billions, 6) * (1 - on(f, terms, 8))} transform={`translate(${lerp(-200, 900, easeInOut(span(f, buyer - 4, buyer + 30))) + 190} ${lerp(860, 760, on(f, billions, 12))})`}><Briefcase x={0} y={0} s={0.7} open={on(f, billions + 4, 10)} /></g>
        <g opacity={on(f, bike93, 6) * (1 - on(f, terms, 8))} transform="translate(520 380)"><ellipse rx={240} ry={150} fill="#FFFFFF" /><text y={20} textAnchor="middle" fill={P.navy1} style={{ font: '400 70px "Bebas Neue"' }}>LIKE THE BIKE</text></g>
        <g opacity={on(f, terms, 6)} transform={`translate(1060 ${lerp(300, 400, on(f, terms, 12))}) scale(${pop(f, terms)})`}><PriceTag x={0} y={0} text="HIS TERMS" r={-6} color={P.gold} /></g>
        <g opacity={on(f, price93, 6) * (1 - on(f, bike93, 6))} transform="translate(520 380)"><PriceTag x={0} y={0} text="NOT THE USUAL PRICE" s={0.8} r={0} /></g>
      </g>}
      {/* # C: crates of J&J and P&G leave the vault as cash; cash flows into three deals; CHEAP tags */}
      {Cw > 0 && <g opacity={Cw}>
        <Street f={f} lamps={[]} />
        {[[wrigley, 'WRIGLEY', '#E9D8C2'], [goldman, 'GOLDMAN SACHS', '#DDE6F2'], [general, 'GENERAL ELECTRIC', '#DDEFE3']].map(([at, nm, col], k) => <g key={k} opacity={on(f, at as number, 6)}><Bank x={860 + k * 400} y={1000} s={0.58} name={nm as string} f={f} color={col as string} /></g>)}
        <VaultRoom x={300} y={620} s={0.6} open={1} fill={1} />
        {Array.from({ length: 9 }, (_, k) => { const p = fly(f, n145 + 8 + k * 3, [420, 560], [860 + (k % 3) * 400, 700], 18, 160); return <g key={k} opacity={p.t > 0 && p.t < 1 ? 1 : 0}><Note x={p.x} y={p.y} s={0.55} text="$" /></g> })}
        {[[johnson, 'J&J', '#D9483A'], [procter, 'P&G', '#3A6EA8']].map(([at, nm, col], k) => { const t = easeInOut(span(f, (at as number) + 2, (at as number) + 26)); return <g key={k} opacity={on(f, at as number, 6) * (1 - span(f, (at as number) + 22, (at as number) + 30))} transform={`translate(${lerp(300, 300, t)} ${lerp(620, 1000, t) - k * 10}) scale(${lerp(1, 0.3, t)})`}><rect x={-120} y={-90} width={240} height={180} rx={12} fill={col as string} /><text y={22} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 70px "Bebas Neue"' }}>{nm as string}</text></g> })}
        {[johnson, procter].map((at, k) => { const p = fly(f, at + 26, [300, 980], [420, 560], 14, 120); return <g key={k} opacity={on(f, at + 24, 4) * (1 - p.t)}><Coin x={p.x} y={p.y} s={1.2} text="$" /></g> })}
        {Array.from({ length: 3 }, (_, k) => <g key={k} opacity={on(f, cheap + k * 3, 5)} transform={`translate(${860 + k * 400} ${lerp(200, 480, easeInOut(span(f, cheap + k * 3, cheap + k * 3 + 16)))})`}><PriceTag x={0} y={0} text="CHEAP" s={0.8} r={-8 + k * 6} color={P.mint} /></g>)}
        <g opacity={on(f, good, 6) * (1 - on(f, cheap, 6))} transform="translate(1260 300)"><text textAnchor="middle" fill={P.ink} style={{ font: '400 70px "Bebas Neue"' }}>GOOD → CHEAP</text></g>
      </g>}
      <Vignette id="wb-cash" />
    </g>
  )
}

const BEATS = ['s87:it', 's87:not#2', 's89:always', 's89:depend', 's91:nobody', 's93:not', 's94:alone', 's95:wanted', 's86:secret', 's87:formula', 's87:cash', 's88:letter', 's88:promise', 's89:cash', 's89:strangers', 's89:bills', 's90:act', 's90:selling', 's91:bank', 's91:lend', 's91:falling', 's92:buyer', 's92:billions', 's93:price', 's93:bike', 's93:terms',
  's94:145', 's94:wrigley', 's94:goldman', 's94:general', 's95:sold', 's95:johnson', 's95:procter', 's96:good', 's96:cheap']
export const WB_CASH = makePiece('wb-cash', 'Buffett long (casino-style): Buffett\'s office where a big vault door swings open on stacks of cash, a FORMULA paper is crossed out, the 2008 letter lights its promise, a lender\'s hand is waved off and BILLS are stamped PAID, while through the window people hurry away carrying shares; a bank lobby in panic with a sweating banker, a falling YOUR SHARES board and people walking past without lending, until Buffett walks in with a briefcase and they shake on HIS TERMS; J&J and P&G crates leave the vault and turn into coins, cash flows into Wrigley, Goldman Sachs and General Electric, and CHEAP tags drift down onto them', {
  mood: 'dark', Component: Cash, beats: BEATS,
  sfx: [['s87:cash', 'pop', 0.3], ['s89:strangers', 'thud', 0.3], ['s91:falling', 'swish', 0.3], ['s92:billions', 'coin', 0.3], ['s93:terms', 'click', 0.3], ['s94:145', 'coin', 0.3], ['s96:cheap', 'pop', 0.3]] })
