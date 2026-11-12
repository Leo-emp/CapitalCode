// ---------------------------------------------------------------- s68–s74: who owns the street.
// Afternoon: three houses on the left, two apartment blocks on the right. One paper bar splits OWN 65.5% | RENT 34.5%.
// A young couple holds a key (31% first-time buyers); an investor holds two keys (20% investors and second homes);
// under 35 only 36.6% own — a young renter at the apartment door; 3 of the 40 apartment windows show FOR RENT (≈7.6% of
// rentals empty, up from 7.1%); a mortgage-rate dial sits between the house and the apartment: it decides who buys.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, hand, type Beat } from '../aimoney/common'
import { DayWorld, Street, House, Apartment, Tag, Paper, Vig, TXT, INK, CORAL, MINT, MUSTARD, PAPER, SLATE, TEAL, ROOFS, WALLS, Life } from './kit'

const GY = 880

const Key: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}><circle r={22} fill="none" stroke={MUSTARD} strokeWidth={10} /><rect x={18} y={-5} width={60} height={10} fill={MUSTARD} /><rect x={60} y={5} width={8} height={16} fill={MUSTARD} /><rect x={72} y={5} width={8} height={12} fill={MUSTARD} /></g>
)

const Owners: React.FC<PieceProps> = ({ f, c }) => {
  const owning = c('s68:owning'), homes = c('s68:homes')
  const d655 = c('s69:655'), own = c('s69:own'), rest = c('s69:rest'), rent = c('s69:rent')
  const d31 = c('s70:31'), first = c('s70:firsttime')
  const d20 = c('s71:20'), investors = c('s71:investors'), second = c('s71:second')
  const under = c('s72:under'), d366 = c('s72:366'), young = c('s72:young')
  const renters = c('s73:renters'), d76 = c('s73:76'), empty = c('s73:empty'), d71 = c('s73:71'), choice = c('s73:choice')
  const rate = c('s74:rate'), buy = c('s74:buy'), renting = c('s74:renting')

  const couple: Beat[] = [[d31, 'holdUp', 'smiling'], [d20, 'idle', 'smiling']]
  const inv: Beat[] = [[d20, 'holdUp', 'smug'], [under, 'idle', 'neutral']]
  const renter: Beat[] = [[under, 'idle', 'neutral'], [young, 'shrug', 'neutral'], [choice, 'thumbsUp', 'smiling']]
  const ch = hand(f, couple, 520, GY + 20, 0.66, false), ih = hand(f, inv, 820, GY + 20, 0.66, false)
  const bar = win(f, d655 - 6, d31 - 6, 10)

  return (
    <g>
      <DayWorld f={f} id="re-owners" />
      <Street y={GY} />
      {[0, 1, 2].map((k) => <g key={k} opacity={on(f, owning + k * 3, 8)}><House x={180 + k * 300} y={GY - 6} s={0.68} roof={ROOFS[k]} wall={WALLS[k]} v={k % 2} /></g>)}
      {[0, 1].map((k) => <g key={k} opacity={on(f, homes + k * 4, 8)}><Apartment x={1250 + k * 470} y={GY - 6} s={0.8} empty={on(f, empty, 6) > 0.5 ? (k === 0 ? [3, 11] : [7]) : []} /></g>)}
      {/* own vs rent as one bar */}
      <g opacity={bar} transform="translate(960 330)">
        <rect x={-600} y={-50} width={1200} height={100} rx={20} fill={SLATE} opacity={0.12} transform="translate(8 10)" />
        <rect x={-600} y={-50} width={1200 * 0.655 * on(f, d655, 24)} height={100} rx={20} fill={TEAL} />
        <rect x={-600 + 1200 * 0.655} y={-50} width={1200 * 0.345 * on(f, rest, 20)} height={100} rx={20} fill={CORAL} />
        <g opacity={on(f, own, 8)}><text x={-600 + 600 * 0.655} y={18} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>OWN 65.5%</text></g>
        <g opacity={on(f, rent, 8)}><text x={-600 + 1200 * 0.655 + 600 * 0.345} y={18} textAnchor="middle" fill="#FFFFFF" style={TXT(56)}>RENT</text></g>
      </g>
      {/* first-time buyers and investors */}
      <g opacity={win(f, d31 - 4, under - 4, 10)}>
        <Person f={f} who="investorF" beats={couple} x={520} y={GY + 20} s={0.66} />
        <Person f={f} who="buyer" beats={couple} x={400} y={GY + 20} s={0.66} />
        {f >= d31 && <Key x={ch.x} y={ch.y - 20} s={pop(f, d31, 12)} />}
        <g opacity={on(f, first, 8)}><Tag x={460} y={330} t="31% FIRST-TIME BUYERS" size={46} col={MINT} tc="#FFFFFF" /></g>
        <g opacity={on(f, d20 - 4, 8)}><Person f={f} who="investor" beats={inv} x={820} y={GY + 20} s={0.66} flip /></g>
        {f >= d20 && <g><Key x={ih.x - 10} y={ih.y - 30} s={pop(f, d20, 12)} /><Key x={ih.x + 10} y={ih.y} s={pop(f, d20 + 4, 12)} /></g>}
        <g opacity={on(f, investors, 8)}><Tag x={1100} y={330} t={f >= second ? '20% INVESTORS & SECOND HOMES' : '20% INVESTORS'} size={42} /></g>
      </g>
      {/* the young renter */}
      <g opacity={on(f, under - 4, 10)}>
        <Person f={f} who="hero" beats={renter} x={1080} y={GY + 20} s={0.66} flip />
        <g opacity={win(f, d366 - 6, renters, 8)}><Tag x={960} y={330} t="UNDER 35: ONLY 36.6% OWN" size={50} /></g>
        <g opacity={win(f, d76, rate, 8)}><Tag x={960} y={330} t={f >= d71 ? '7.6% OF RENTALS EMPTY (7.1% A YEAR AGO)' : '7.6% OF RENTALS EMPTY'} size={40} /></g>
        <g opacity={win(f, choice, rate, 8)}><Tag x={1490} y={440} t="MORE CHOICE FOR RENTERS" size={38} col={MINT} tc="#FFFFFF" /></g>
      </g>
      {/* the rate dial decides who buys */}
      <g opacity={on(f, rate, 10)} transform={`translate(760 430) scale(${pop(f, rate, 12)})`}>
        <circle r={110} fill={PAPER} stroke={SLATE} strokeWidth={8} />
        {Array.from({ length: 9 }, (_, k) => { const a = (-120 + k * 30) * Math.PI / 180; return <line key={k} x1={80 * Math.sin(a)} y1={-80 * Math.cos(a)} x2={98 * Math.sin(a)} y2={-98 * Math.cos(a)} stroke={SLATE} strokeWidth={5} /> })}
        <line x1={0} y1={0} x2={80 * Math.sin(lerp(-1.2, 0.9, on(f, rate, 30)))} y2={-80 * Math.cos(lerp(-1.2, 0.9, on(f, rate, 30)))} stroke={CORAL} strokeWidth={10} strokeLinecap="round" />
        <circle r={14} fill={SLATE} /><text y={70} textAnchor="middle" fill={INK} style={TXT(34)}>RATE</text>
      </g>
      <g opacity={on(f, buy, 8)}><Tag x={460} y={330} t="WHO CAN BUY…" size={46} col={TEAL} tc="#FFFFFF" /></g>
      <g opacity={on(f, renting, 8)}><Tag x={1490} y={330} t="…WHO KEEPS RENTING" size={46} col={CORAL} tc="#FFFFFF" /></g>
      {/* # life:begin */}
      <g>
        <Life f={f} at={c("s70:2026")} x={520} y={600} kind="glint" />
        <Life f={f} at={c("s72:ownership")} x={1250} y={560} kind="glint" />
        <Life f={f} at={c("s73:third")} x={1250} y={560} kind="glint" />
        <Life f={f} at={c("s73:gives")} x={1250} y={560} kind="glint" />
        <Life f={f} at={c("s74:news")} x={960} y={430} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="re-owners" />
      <Headline f={f} lines={[[owning, 'WHO OWNS THE STREET?', INK, 92]]} />
    </g>
  )
}

export const RE_OWNERS = makePiece('re-owners', "Who owns the street: three paper houses on the left and two apartment blocks on the right; one bar splits OWN 65.5% | RENT; a young couple holds up a key — 31% FIRST-TIME BUYERS; an investor holds two keys — 20% INVESTORS & SECOND HOMES; a young renter by the apartments — UNDER 35: ONLY 36.6% OWN; three of the forty apartment windows show FOR RENT — 7.6% OF RENTALS EMPTY (7.1% A YEAR AGO), MORE CHOICE FOR RENTERS; a mortgage-rate dial swings between them: WHO CAN BUY… WHO KEEPS RENTING.", {
  mood: 'light', Component: Owners,
  beats: ["s68:owning", "s68:homes", "s69:655", "s69:own", "s69:rest", "s69:rent", "s70:31", "s70:firsttime", "s71:20", "s71:investors", "s71:second", "s72:under", "s72:366", "s72:young", "s73:renters", "s73:76", "s73:empty", "s73:71", "s73:choice", "s74:rate", "s74:buy", "s74:renting", "s70:2026", "s72:ownership", "s73:third", "s73:gives", "s74:news"],
  sfx: [['s69:655', 'pop', 0.08], ['s70:31', 'pop', 0.08], ['s74:rate', 'swish', 0.1]] })
