// ---------------------------------------------------------------- s68–s76: where the money goes (casino-style rebuild).
// One setting: Alphabet's money tank in a big plant room. On the left, money pipes pour in — SEARCH ADS, YOUTUBE ADS
// ≈ $40B, WEBSITE ADS (together ≈ $295B) and OTHER — and the tank fills to ≈ $403B. On the right, an accountant
// stands by a ledger board; as each line lights (PARTNERS ≈ $60B, PEOPLE & OFFICES, COMPUTERS, TAXES) coins stream out
// of the tank and the level drops, until only PROFIT ≈ $132B is left — about a third. A $100 bill on the tank shows
// $33 kept. Finally a free search box lands on top of the tank, which glows: the money machine behind the free box.
import React from 'react'
import { easeInOut, lerp, on, P, pop, span, Stage as StageBg, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Coin, fly, Headline, Person, win } from '../aimoney/common'
import { gestB } from '../buffett/hook'
import { SearchBar } from './kit'

const Money: React.FC<PieceProps> = ({ f, c }) => {
  const s68 = c('s68:money'), n403 = c('s69:403'), total = c('s69:total'), n295 = c('s70:295'), youtube70 = c('s70:youtube'), websites = c('s70:websites'), n40 = c('s71:40')
  const partners = c('s72:partners'), n60 = c('s72:60'), people = c('s73:people'), offices = c('s73:offices'), computer = c('s73:computer')
  const taxes = c('s74:taxes'), n132 = c('s74:132'), calc = c('s75:calculation'), n33 = c('s75:33'), machine = c('s76:machine'), box = c('s76:box')
  // # extra gesture words
  const G = [c('s69'), c('s69:parent'), c('s70:from'), c('s71:alone'), c('s72:out'), c('s74:everything'), c('s74:a'), c('s75:by'), c('s75:alphabet'), c('s75:profit')]
  const TX = 960, TW = 480, TT = 330, TB = 950
  // # the tank level: fills to 1 on $403B, then drains in steps to ≈ 0.33 (profit)
  const OUT: [number, number, string][] = [[partners, 0.15, 'PARTNERS ≈ $60B'], [people, 0.2, 'PEOPLE & OFFICES'], [computer, 0.22, 'COMPUTERS & MORE'], [taxes, 0.1, 'TAXES']]
  const level = Math.min(1, 0.05 + 0.95 * easeInOut(span(f, s68 + 4, n403 + 10))) - OUT.reduce((a, [at, d]) => a + d * easeInOut(span(f, at, at + 24)), 0)
  const IN: [number, string, string][] = [[s68 + 2, 'SEARCH ADS', P.gold], [youtube70, 'YOUTUBE ADS ≈ $40B', '#E05A4C'], [websites, 'WEBSITE ADS', '#3A6EA8'], [total, 'OTHER', '#8A94A8']]
  return (
    <g>
      <StageBg id="gg-money" frame={f} />
      {/* # the plant room */}
      <rect x={0} y={0} width={1920} height={1000} fill="#DCE6EE" />
      {Array.from({ length: 10 }, (_, k) => <rect key={k} x={k * 200} y={230} width={10} height={770} fill="#C9D6E2" />)}
      <rect x={0} y={0} width={1920} height={215} fill="#EFE6D6" /><rect x={0} y={205} width={1920} height={22} fill="#8E6A45" />
      <rect x={0} y={1000} width={1920} height={80} fill="#8A94A8" /><rect x={0} y={990} width={1920} height={14} fill="#6B7590" />
      {/* # everything inside the room a little smaller (owner: objects and people were too large) */}
      <g transform="translate(960 1000) scale(0.9) translate(-960 -1000)">
      {/* # everything inside the room at 80% (owner: objects and people were too large) */}
      <g transform="translate(960 1000) scale(0.8) translate(-960 -1000)">
      {/* # pipes in: labels on the left, money pours into the tank top */}
      {IN.map(([at, lab, col], k) => <g key={k} opacity={win(f, at, partners, 8)}>
        <path d={`M120 ${290 + k * 64} L${TX - 120 + k * 60} ${290 + k * 64} L${TX - 120 + k * 60} ${TT}`} fill="none" stroke="#8A94A8" strokeWidth={20} />
        <g transform={`translate(270 ${290 + k * 64})`}><rect x={-200} y={-30} width={400} height={60} rx={12} fill={col} /><text y={14} textAnchor="middle" fill="#FFFFFF" style={{ font: '400 40px "Bebas Neue"' }}>{lab}</text></g>
        {Array.from({ length: 2 }, (_, j) => { const t = ((f + j * 13 + k * 7) % 26) / 26; return <g key={j} opacity={(1 - on(f, partners, 10)) * on(f, at + 6, 6)}><Coin x={TX - 120 + k * 60} y={lerp(300, TT + 60, t)} s={0.35} /></g> })}
      </g>)}
      <g opacity={win(f, n295, partners, 6)} transform={`translate(270 ${290 + 3 * 64 + 74})`}><text textAnchor="middle" fill={P.goldInk} style={{ font: '400 46px "Bebas Neue"' }}>ADS TOGETHER ≈ $295B</text></g>
      {/* # the tank */}
      {on(f, machine, 6) > 0 && <rect x={TX - TW / 2 - 30} y={TT - 30} width={TW + 60} height={TB - TT + 60} rx={40} fill={P.gold} opacity={0.35 * on(f, machine, 6)} />}
      <rect x={TX - TW / 2} y={TT} width={TW} height={TB - TT} rx={30} fill="#FFFFFF" opacity={0.7} stroke="#5B6680" strokeWidth={10} />
      <rect x={TX - TW / 2 + 12} y={TB - 12 - (TB - TT - 24) * level} width={TW - 24} height={(TB - TT - 24) * level} rx={20} fill={P.gold} />
      {Array.from({ length: 5 }, (_, k) => <ellipse key={k} cx={TX - 160 + k * 80} cy={TB - 12 - (TB - TT - 24) * level + 10 + 4 * Math.sin(f / 6 + k)} rx={36} ry={8} fill="#F6D98A" />)}
      <g opacity={on(f, n403, 6) * (1 - on(f, partners, 8))}><text x={TX} y={TT + 120} textAnchor="middle" fill="#3A2A12" style={{ font: '400 90px "Bebas Neue"' }}>≈ $403B IN</text></g>
      <g opacity={on(f, n132, 8)}><text x={TX} y={TB - 90} textAnchor="middle" fill="#3A2A12" style={{ font: '400 74px "Bebas Neue"' }}>PROFIT ≈ $132B</text></g>
      {/* # the $100 bill: $33 kept */}
      <g opacity={win(f, n33, machine, 6)} transform={`translate(${TX} ${TT + 150}) scale(${pop(f, n33)})`}>
        <rect x={-200} y={-60} width={400} height={120} rx={12} fill="#BFE3C9" stroke="#2FA36B" strokeWidth={6} />
        <rect x={-200} y={-60} width={132} height={120} rx={12} fill={P.gold} />
        <text x={-134} y={18} textAnchor="middle" fill="#3A2A12" style={{ font: '400 60px "Bebas Neue"' }}>$33</text>
        <text x={66} y={18} textAnchor="middle" fill="#1B5E3A" style={{ font: '400 56px "Bebas Neue"' }}>OF EVERY $100</text>
      </g>
      {/* # the ledger and the coins flowing out */}
      <g transform="translate(1590 460)">
        <rect x={-290} y={-200} width={580} height={380} rx={18} fill="#0D1424" />
        <text y={-145} textAnchor="middle" fill={P.gold} style={{ font: '400 46px "Bebas Neue"', letterSpacing: 3 }}>MONEY OUT · 2025</text>
        {OUT.map(([at, , lab], k) => <text key={k} x={-250} y={-82 + k * 60} fill={k === 0 ? P.coral : '#FFFFFF'} opacity={win(f, at, k < 3 ? OUT[k + 1][0] : n132, 6)} style={{ font: '400 46px "Bebas Neue"' }}>− {lab}</text>)}
        <text x={-250} y={-82 + 4 * 60} fill={P.mint} opacity={on(f, n132, 6)} style={{ font: '400 50px "Bebas Neue"' }}>= PROFIT ≈ $132B</text>
      </g>
      {OUT.map(([at], k) => Array.from({ length: 4 }, (_, j) => { const p = fly(f, at + 4 + j * 4, [TX + TW / 2, 820], [1330, 380 + k * 60], 16, 80); return <g key={`${k}-${j}`} opacity={p.o}><Coin x={p.x} y={p.y} s={0.45} /></g> }))}
      {/* # the free search box lands on top */}
      <g opacity={on(f, box, 6)} transform={`translate(${TX} ${lerp(200, TT - 50, easeInOut(span(f, box, box + 14)))}) scale(0.62)`}><SearchBar x={0} y={0} w={700} text="free search" /></g>
      <Person f={f} who="investor" beats={gestB([[0, 'idle', 'neutral'], [partners, 'point', 'neutral'], [people, 'countA', 'neutral'], [computer, 'countB', 'neutral'], [taxes, 'explain', 'neutral'], [n132, 'present', 'smiling'], [machine, 'confident', 'smug']], G)} x={1590} y={1000} s={0.68} flip />
      </g>
      </g>
      <Headline f={f} lines={[[s68, 'WHERE DOES IT GO?', P.ink, 110], [n403, 'ALPHABET 2025: ABOUT $403B IN', P.ink, 100], [n295, 'ADS: ABOUT $295B', P.goldInk, 104], [partners, 'OUT: PARTNERS, PEOPLE, COMPUTERS, TAX', P.ink, 90],
        [n132, 'PROFIT: ABOUT $132B', P.goldInk, 110], [calc, '≈ $33 OF EVERY $100 · OUR CALCULATION', P.goldInk, 90], [machine, 'THE MONEY MACHINE', P.ink, 110]]} />
      <Vignette id="gg-money" />
    </g>
  )
}

const BEATS = ['s69', 's69:parent', 's70:from', 's71:alone', 's72:out', 's74:everything', 's74:a', 's75:by', 's75:alphabet', 's75:profit', 's68:money', 's69:403', 's69:total', 's70:295', 's70:youtube', 's70:websites', 's71:40', 's72:partners', 's72:60', 's73:people', 's73:offices', 's73:computer', 's74:taxes', 's74:132', 's75:calculation', 's75:33', 's76:machine', 's76:box']
export const GG_MONEY = makePiece('gg-money', 'Google long (casino-style): Alphabet’s money tank in a plant room — pipes pour in SEARCH ADS, YOUTUBE ADS ≈ $40B, WEBSITE ADS (ads together ≈ $295B) and OTHER and the tank fills to ≈ $403B; an accountant by a ledger board lights each outflow (PARTNERS ≈ $60B, PEOPLE & OFFICES, COMPUTERS & MORE, TAXES) as coins stream out and the level drops to PROFIT ≈ $132B; a $100 bill shows $33 kept; a free search box lands on top of the glowing tank', {
  mood: 'light', Component: Money, beats: BEATS,
  sfx: [['s69:403', 'coin', 0.35], ['s72:60', 'swish', 0.3], ['s74:132', 'chime', 0.3], ['s75:33', 'ding', 0.3], ['s76:box', 'pop', 0.3]] })
