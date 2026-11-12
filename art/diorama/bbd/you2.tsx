// ---------------------------------------------------------------- s71–s78 (redrawn 2026-10-31): an ordinary street of three homes.
// The presenter asks what this means for the rest of us. A family inherits shares and a house — both price tags reset
// (the step-up applies to everyone); next door a 401k piggy bank is the exception — coins coming out pass a tax slot.
// A seedling in a front garden grows untouched ("any size"). Then the street splits: the rich investor on a bridge of cheap
// loans over a growing vault vs a worker whose paycheck is sliced first — same rulebook, different lives; it is all legal.
// "They don't hide money" (a buried chest, crossed out) — "they just never sell" (her vault locks). The presenter closes.
import React from 'react'
import { easeInOut, lerp, on, P, span, Stage, Vignette } from '../kit'
import { Label } from '../charts'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, Headline, Person, win } from '../aimoney/common'
import { Cert, FlipTag, Paycheck } from './kit'
import { BankHall, LightBridge, MoneyTree, Vault } from './world'
import { House, Street } from './sell'

const You: React.FC<PieceProps> = ({ f, c }) => {
  // # word reaction: the named object swells briefly (0→1→0 over 14 frames) on its word
  const sw = (ks: string[], x: number, y: number, amt = 0.12) => { const v = Math.max(...ks.map((k) => { const t = f - c(k); return t >= 0 && t < 14 ? Math.sin(Math.PI * t / 14) : 0 })); return `translate(${x} ${y}) scale(${1 + amt * v}) translate(${-x} ${-y})` }
  const rest = c('s71:rest'), part = c('s72:part'), everyone = c('s72:everyone'), stepup = c('s72:stepup'), inherits = c('s72:inherits'), shares = c('s72:shares'), house = c('s72:house')
  const retire = c('s73:retirement'), k401 = c('s73:401k'), taxed73 = c('s73:taxed'), out = c('s73:out')
  const idea = c('s74:idea'), size = c('s74:size'), dont = c("s74:don't"), taxed74 = c('s74:taxed'), growing = c('s74:growing')
  const starting = c('s75:starting'), rich = c('s75:rich'), loans = c('s75:loans'), most = c('s75:most'), paycheck = c('s75:paycheck'), taxed75 = c('s75:taxed'), legal = c('s75a:legal')
  const same = c('s76:same'), rules = c('s76:rules'), different = c('s76:different'), lives = c('s76:lives'), hiding = c('s77:hiding'), never = c('s77:never'), sell = c('s77:sell')
  const system = c('s78:system'), advice = c('s78:advice'), subscribe = c('s78:subscribe'), money = c('s78:money')
  const STREET = win(f, rest, starting, 12), SPLIT = win(f, starting, hiding, 12), END = on(f, hiding, 12)
  const H1 = 520, H2 = 1000, H3 = 1540
  const host: Beat[] = [[0, 'present', 'smiling'], [rest, 'explain', 'thinking'], [part, 'present', 'smiling']]
  const hostEnd: Beat[] = [[0, 'present', 'smiling'], [never, 'pointUp', 'smug'], [advice, 'stop', 'neutral'], [subscribe, 'thumbsUp', 'smiling']]
  return (
    <g>
      <Stage id="by2" frame={f} />
      <g>
        <Street f={f} />
        {/* # STREET: three homes; the family inherits shares + a house (tags reset); the 401k piggy bank next door; a seedling grows */}
        <g opacity={STREET}>
          <House x={H1} y={880} /><House x={H2} y={880} /><House x={H3} y={880} />
          <g opacity={on(f, part, 8)}><Person f={f} who="buyer" beats={[[0, 'idle', 'smiling'], [inherits, 'receive', 'smiling'], [house, 'present', 'smiling']]} x={H2 + 230} y={1000} s={0.8} /></g>
          <g opacity={on(f, inherits, 8)}><Cert x={H2 + 300} y={800} s={0.42} /></g>
          <g opacity={on(f, shares, 8)}><FlipTag x={H2 + 300} y={705} s={0.42} a="OLD PRICE" b="NEW START" t={span(f, shares + 4, shares + 16)} /></g>
          <g opacity={on(f, house, 8)}><FlipTag x={H2} y={430} s={0.5} a="OLD PRICE" b="NEW START" t={span(f, house + 4, house + 16)} /></g>
                    {/* # the 401k piggy bank on the third porch; coins come out through a tax slot */}
          <g opacity={on(f, retire, 8)} transform={`translate(${H3 + 200} 920)`}>
            <ellipse cx={0} cy={-60} rx={90} ry={66} fill="#F2A3B5" /><circle cx={70} cy={-80} r={32} fill="#F2A3B5" /><rect x={-60} y={-20} width={24} height={34} fill="#E58FA4" /><rect x={30} y={-20} width={24} height={34} fill="#E58FA4" /><rect x={-20} y={-128} width={40} height={10} rx={4} fill="#C9708A" />
            <g opacity={on(f, k401, 8)}><Label x={0} y={-50} text="401K" size={44} font="Bebas Neue" color="#7A2E45" /></g>
          </g>
          <g opacity={on(f, taxed73, 8)} transform={`translate(${H3 + 200} 700)`}><rect x={-70} y={-30} width={140} height={60} rx={10} fill="#3A4A66" /><Label x={0} y={14} text="TAX" size={40} font="Bebas Neue" color="#FFF" /></g>
          {[0, 1, 2].map((k) => { const u = span(f, out + k * 7, out + 30 + k * 7); return u > 0 && u < 1 ? <circle key={k} cx={H3 + 200} cy={lerp(780, 600, u)} r={12} fill={u < 0.5 ? P.gold : P.coral} /> : null })}
          {/* # a seedling in the first front garden grows into a money tree — untouched, untaxed */}
          <g opacity={on(f, idea, 8)}><MoneyTree x={H1 - 250} y={900} size={lerp(0.2, 0.7, easeInOut(span(f, growing, growing + 40)))} s={1.3} /></g>
          <g opacity={on(f, dont, 8)} transform={`translate(${H1 - 260} 940)`}><rect x={-60} y={-10} width={120} height={20} rx={6} fill="#7A4E2D" /><g transform="translate(70 -30)"><rect x={-20} y={-4} width={40} height={34} rx={6} fill={P.gold} /><path d="M-12 -4 L-12 -18 A12 12 0 0 1 12 -18 L12 -4" stroke={P.gold} strokeWidth={7} fill="none" /></g></g>
          <g opacity={on(f, taxed74, 8)}><Label x={H1 - 260} y={420} text="NO TAX YET" size={46} font="Bebas Neue" color={P.mintInk} /></g>
          <g opacity={on(f, rest, 8) * (1 - on(f, inherits, 12))}><Person f={f} who="hero" beats={host} x={190} y={1190} s={1.0} life={2} /></g>
        </g>
        {/* # SPLIT: the rich on a bridge of cheap loans over a growing vault (left); a worker's paycheck sliced first (right); one rulebook in the middle */}
        <g opacity={SPLIT}>
          <rect x={957} y={250} width={6} height={650} fill={P.ink2} opacity={0.4} />
          <g transform={sw(['s77:rich', 's77:pay'], 520, 880, 0.1)}><Vault x={520} y={880} s={0.7} n={lerp(9, 12, on(f, rich, 30))} lock={1} /></g>
          <BankHall x={180} y={880} s={0.55} lit={on(f, loans, 8)} />
          <LightBridge a={[260, 660]} b={[830, 740]} t={easeInOut(span(f, loans, loans + 16))} o={on(f, loans, 6)} lift={60} />
          <Person f={f} who="investorF" beats={[[0, 'idle', 'smiling'], [loans, 'receive', 'smiling'], [different, 'confident', 'smug']]} x={800} y={1000} s={0.85} o={on(f, rich, 8)} />
          <g opacity={on(f, most, 8)}>
            <Person f={f} who="worker" beats={[[0, 'idle', 'neutral'], [paycheck, 'receive', 'neutral'], [taxed75, 'shock', 'worried'], [lives, 'slump', 'neutral']]} x={1450} y={1000} s={0.9} />
            <g transform="translate(1190 600) scale(0.55)"><Paycheck x={0} y={0} cut={span(f, taxed75, taxed75 + 18)} /></g>
          </g>
          <g opacity={on(f, legal, 8)} transform="translate(960 470)"><rect x={-90} y={-60} width={180} height={120} rx={10} fill="#3A4A66" /><rect x={-80} y={-50} width={160} height={100} rx={6} fill="#F7F1E1" /><Label x={0} y={-6} text="TAX LAW" size={36} font="Bebas Neue" color={P.navy0} /><Label x={0} y={36} text="LEGAL" size={34} font="Bebas Neue" color={P.mintInk} /></g>
          
          <g opacity={on(f, different, 8)}><ellipse cx={520} cy={700} rx={330} ry={260} fill={P.gold} opacity={0.1} /><ellipse cx={1400} cy={760} rx={300} ry={240} fill={P.coral} opacity={0.08} /></g>
        </g>
        {/* # END: not a buried chest (crossed out) — her vault locks, glowing; the presenter closes */}
        <g opacity={END}>
          <g opacity={on(f, hiding, 8)} transform="translate(820 900)"><rect x={-90} y={-60} width={180} height={90} rx={12} fill="#8A5A34" /><rect x={-90} y={-60} width={180} height={28} rx={12} fill="#A86F42" /><rect x={-16} y={-40} width={32} height={34} rx={4} fill={P.gold} />
            <path d="M-120 -90 L120 50" stroke={P.coral} strokeWidth={14} strokeLinecap="round" opacity={on(f, hiding + 10, 8)} /><Label x={0} y={-100} text="HIDING MONEY" size={40} font="Bebas Neue" color={P.ink2} /></g>
          <circle cx={1300} cy={720} r={260} fill={P.gold} opacity={(0.1 + 0.05 * Math.sin(f / 8)) * on(f, never, 10)} />
          <Vault x={1300} y={880} s={0.85} n={12} lock={on(f, sell, 14)} />
          <g opacity={on(f, sell, 8)}><Label x={1300} y={560} text="NEVER SOLD" size={56} font="Bebas Neue" color={P.goldInk} /></g>
          <g opacity={on(f, system, 8)}><Label x={960} y={1020} text={f >= advice ? 'HOW THE SYSTEM WORKS · NOT TAX ADVICE' : 'HOW THE SYSTEM WORKS'} size={36} font="Bebas Neue" color={P.ink2} /></g>
          <g opacity={on(f, money, 8)}><Label x={1300} y={410} text="HOW THE MONEY REALLY WORKS" size={36} font="Bebas Neue" color={P.ink2} /></g>
          <Person f={f} who="hero" beats={hostEnd} x={360} y={1190} s={1.1} life={2} />
        </g>
      </g>
      <Headline f={f} lines={[[rest, 'THE REST OF US', P.ink, 124], [stepup, 'THE STEP-UP: EVERYONE', P.goldInk, 110], [k401, 'NOT A 401K', P.coralInk, 124], [size, 'ANY SIZE', P.mintInk, 130],
        [starting, 'DIFFERENT STARTING POINTS', P.ink, 104], [legal, 'ALL LEGAL', P.ink, 130], [same, 'SAME RULES', P.ink, 130], [different, 'DIFFERENT LIVES', P.goldInk, 130], [never, 'THEY JUST NEVER SELL', P.goldInk, 116]]} />
      <Vignette id="by2" />
    </g>
  )
}

const BEATS: string[] = ['s77:rich', 's77:pay', 's72:everyone', 's71:rest', 's72:part', 's72:stepup', 's72:inherits', 's72:shares', 's72:house', 's73:retirement', 's73:401k', 's73:taxed', 's73:out',
  's74:idea', 's74:size', "s74:don't", 's74:taxed', 's74:growing', 's75:starting', 's75:rich', 's75:loans', 's75:most', 's75:paycheck', 's75:taxed', 's75a:legal',
  's76:same', 's76:rules', 's76:different', 's76:lives', 's77:hiding', 's77:never', 's77:sell', 's78:system', 's78:advice', 's78:subscribe', 's78:money']
export const BB2_YOU = makePiece('bb2-you', 'Long (redrawn): an ordinary street — inherited shares + house reset (step-up for everyone), 401k taxed on the way out, a seedling grows untaxed; loans vs a sliced paycheck; legal; never selling', {
  mood: 'light', Component: You, beats: BEATS,
  sfx: [['s72:stepup', 'chime', 0.4], ['s73:401k', 'thud', 0.4], ['s74:growing', 'flutter', 0.4], ['s75a:legal', 'click', 0.4], ['s77:never', 'impact', 0.5]] })
