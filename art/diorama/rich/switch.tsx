// ---------------------------------------------------------------- s22–s28: way 3, be willing to switch jobs (bright noon).
// Leo rides his bicycle to a fork in a poster road: STAY goes straight on, SWITCH climbs to the right. Each road ends at
// a coin tower — the stayer's raise (+3.4% → $1,836) and the switcher's (+4.7% → $2,538) — and the difference, about
// $700, glows gold; next year's raise is built on top of the bigger tower. Then two buildings: the old job and a new
// employer whose offer card beats Leo's current pay. Finally Leo's toolbox lights up: way four changes the skill itself.
import React from 'react'
import { lerp, on, pop } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { PosterWorld, Vig, Ticket, WayBadge, Bike, Building, Tower, Coin, Life, TXT, CREAM, ORANGE, RED, GOLD, GOLD2, MINT, INK, DEEP, TEAL, SAND } from './kit'

const GY = 960

const Switch: React.FC<PieceProps> = ({ f, c }) => {
  const sw = c('s22:switch')
  const atlanta = c('s23:atlanta'), stay = c('s23:stay'), sw23 = c('s23:switch')
  const sept = c('s24:september'), d34 = c('s24:34'), d47 = c('s24:47')
  const d1836 = c('s25:1836'), stays = c('s25:stays'), d2538 = c('s25:2538'), switches = c('s25:switches')
  const d700 = c('s26:700'), base = c('s26:base'), after = c('s26:after')
  const why = c('s27:why'), win27 = c('s27:win'), job = c('s27:job'), beat = c('s27:beat'), now = c('s27:now')
  const better = c('s28:better'), same = c('s28:same'), itself = c('s28:itself')

  const ride = on(f, sw - 6, 40)
  const leo: Beat[] = [[sw, 'push', 'smiling'], [d47, 'pointUp', 'smiling'], [d700, 'celebrate', 'smiling'], [why, 'think', 'thinking'], [beat, 'receive', 'smiling'], [same, 'present', 'smiling'], [itself, 'pointUp', 'thinking']]
  const A = 1 - on(f, why - 10, 8), B = win(f, why - 2, same - 2, 8), Cc = on(f, same - 2, 8)
  const hStay = on(f, d1836, 16) * 13, hSw = on(f, d2538, 16) * 18   // 1,836 : 2,538 ≈ 13 : 18 coins
  const next = on(f, base, 20)

  return (
    <g>
      <PosterWorld f={f} id="rh-switch" tone="noon" sunX={1640} sunY={300} ground="#D9C79A" />
      <g opacity={on(f, sw - 4, 10)}><WayBadge x={200} y={320} n={3} s={pop(f, sw, 12)} col={GOLD} /></g>
      {/* # A) the fork in the road and the two raises */}
      {A > 0.001 && <g opacity={A}>
        <path d="M-40 1000 L700 1000 L1900 1000" stroke="#7D7A80" strokeWidth={70} fill="none" />
        <path d="M700 1000 Q1000 990 1200 760 L1900 760" stroke="#7D7A80" strokeWidth={70} fill="none" opacity={on(f, stay, 12)} />
        <path d="M-40 1000 L1900 1000" stroke={CREAM} strokeWidth={6} strokeDasharray="40 30" />
        <g opacity={on(f, stay, 10)}><path d="M700 1000 Q1000 990 1200 760 L1900 760" stroke={CREAM} strokeWidth={6} strokeDasharray="40 30" fill="none" /></g>
        {/* the signs */}
        <g opacity={on(f, stay, 8)} transform="translate(1000 900)"><rect x={-4} y={-120} width={8} height={120} fill={INK} /><rect x={-110} y={-170} width={220} height={60} rx={10} fill={TEAL} /><text y={-126} textAnchor="middle" fill={CREAM} style={TXT(44)}>{f >= d34 ? 'STAY +3.4%' : 'STAY'}</text></g>
        <g opacity={on(f, sw23, 8)} transform="translate(1180 700)"><rect x={-4} y={-120} width={8} height={120} fill={INK} /><rect x={-130} y={-170} width={260} height={60} rx={10} fill={ORANGE} /><text y={-126} textAnchor="middle" fill={CREAM} style={TXT(44)}>{f >= d47 ? 'SWITCH +4.7%' : 'SWITCH'}</text></g>
        <g opacity={win(f, atlanta, d1836, 8)}><Ticket x={1100} y={330} t={f >= sept ? 'MEDIAN PAY GROWTH · SEPT 2026' : 'ATLANTA FED TRACKS PAY GROWTH'} size={46} col={CREAM} /></g>
        {/* Leo on his bike rides up to the fork */}
        <g transform={`translate(${lerp(-200, 420, ride)} 0)`}>
          <Bike x={0} y={1000} s={0.75} spin={f * 5 * (1 - on(f, sw + 40, 8))} />
          <Person f={f} who="worker" beats={leo} x={-190} y={1010} s={0.62} />
        </g>
        {/* the two raises as coin towers at the road ends */}
        <g opacity={on(f, d1836, 8)}><Tower x={1640} y={990} n={hStay} col="#7FC6BC" edge={TEAL} /><Ticket x={1640} y={660} t="$1,836" size={50} col={TEAL} tc={CREAM} o={1 - on(f, base, 10)} /></g>
        <g opacity={on(f, d2538, 8)}><Tower x={1780} y={750} n={hSw} /><Ticket x={1640} y={360} t="$2,538" size={50} col={ORANGE} tc={CREAM} o={1 - on(f, base, 10)} /></g>
        {/* the difference: about 700, glowing on top of the switcher's tower */}
        <g opacity={win(f, d700, why, 8)}>
          <rect x={1734} y={750 - hSw * 14 - 4} width={92} height={5 * 14 + 4} rx={8} fill="none" stroke={GOLD} strokeWidth={6} opacity={0.6 + 0.4 * Math.sin(f / 5)} />
          <Ticket x={1500} y={480} t="≈ $700 MORE" size={56} col={GOLD} />
        </g>
        {/* next year's raise built on the bigger base */}
        <g opacity={next * (1 - on(f, why - 6, 10))}><Tower x={1780} y={750 - hSw * 14} n={next * 3} col="#FFE08A" edge={GOLD2} /><g opacity={on(f, after, 8)}><Ticket x={1500} y={360} t="NEXT RAISE STARTS HIGHER" size={42} col={CREAM} /></g></g>
      </g>}
      {/* # B) the old job and the new employer's offer */}
      {B > 0.001 && <g opacity={B}>
        <Building x={460} y={GY} w={340} h={440} col="#C9D3D6" sign="OLD JOB" />
        <Building x={1460} y={GY} w={380} h={500} col={SAND} sign="NEW JOB" />
        <Person f={f} who="worker" beats={leo} x={900} y={GY + 40} s={0.72} />
        <g opacity={on(f, job, 8)}><Ticket x={460} y={330} t="NOW: $54,000" size={50} col={CREAM} /></g>
        <g opacity={on(f, beat, 10)} transform={`translate(1460 ${lerp(560, 440, on(f, beat, 16))}) rotate(-4) scale(${pop(f, beat, 12)})`}>
          <rect x={-200} y={-70} width={400} height={140} rx={16} fill={CREAM} stroke={ORANGE} strokeWidth={8} />
          <text y={-8} textAnchor="middle" fill={INK} style={TXT(44)}>OUR OFFER</text>
          <text y={46} textAnchor="middle" fill={ORANGE} style={TXT(50)}>MORE THAN NOW</text>
        </g>
        <g opacity={on(f, win27, 8)}><Life f={f} at={win27} x={1460} y={420} kind="spark" /></g>
      </g>}
      {/* # C) same skill, better price — then the skill itself */}
      {Cc > 0.001 && <g opacity={Cc}>
        <Person f={f} who="worker" beats={leo} x={700} y={GY + 40} s={0.8} />
        <g transform={`translate(1240 ${GY}) scale(${1 + 0.1 * on(f, itself, 12)})`}>
          <ellipse cx={20} cy={6} rx={200} ry={20} fill="rgba(30,20,30,0.22)" />
          <rect x={-180} y={-200} width={360} height={200} rx={20} fill={RED} /><rect x={-180} y={-200} width={360} height={50} rx={16} fill="#B23A2F" />
          <path d="M-70 -200 L-70 -250 L70 -250 L70 -200" stroke={INK} strokeWidth={16} fill="none" />
          <rect x={-30} y={-130} width={60} height={30} rx={6} fill={GOLD} />
          {on(f, itself, 8) > 0 && <circle cx={0} cy={-120} r={240} fill={GOLD} opacity={0.2 * on(f, itself, 8)} />}
        </g>
        <g opacity={on(f, better, 8)}><Ticket x={1240} y={500} t={f >= same ? 'SAME SKILL · BETTER PRICE' : 'BETTER PRICE'} size={50} col={CREAM} /></g>
      </g>}
      {/* # life:begin */}
      <g>
        <Life f={f} at={stays} x={1640} y={780} kind="glint" />
        <Life f={f} at={switches} x={1780} y={500} kind="glint" />
        <Life f={f} at={now} x={460} y={400} kind="glint" />
        <Life f={f} at={c("s23:pay")} x={1100} y={700} kind="glint" />
        <Life f={f} at={c("s24:typical")} x={1100} y={700} kind="glint" />
        <Life f={f} at={c("s24:the#2")} x={1100} y={700} kind="glint" />
        <Life f={f} at={c("s25:dollars")} x={1640} y={700} kind="glint" />
        <Life f={f} at={c("s25:54000")} x={1640} y={700} kind="glint" />
        <Life f={f} at={c("s26:the")} x={1640} y={700} kind="glint" />
        <Life f={f} at={c("s27:more")} x={1460} y={420} kind="glint" />
      </g>
      {/* # life:end */}
      <Vig id="rh-switch" />
      <Headline f={f} lines={[[sw, 'BE WILLING TO SWITCH JOBS', INK, 88], [why, 'WHY NEW EMPLOYERS PAY MORE', INK, 84]]} />
    </g>
  )
}

export const RH_SWITCH = makePiece('rh-switch', 'Way 3 at bright noon: Leo rides his orange bicycle to a fork in a grey poster road; signs STAY +3.4% (straight on) and SWITCH +4.7% (climbing right) — ATLANTA FED TRACKS PAY GROWTH, MEDIAN PAY GROWTH · SEPT 2026; a teal coin tower $1,836 ends the stay road and a taller gold tower $2,538 ends the switch road; the top of the gold tower glows ≈ $700 MORE and next year\'s raise stacks on top (NEXT RAISE STARTS HIGHER); then an OLD JOB building (NOW: $54,000) and a NEW JOB building whose offer card says OUR OFFER · MORE THAN NOW; finally Leo\'s red toolbox lights up: SAME SKILL · BETTER PRICE.', {
  mood: 'light', Component: Switch,
  beats: ["s22:switch", "s23:atlanta", "s23:stay", "s23:switch", "s24:september", "s24:34", "s24:47", "s25:1836", "s25:stays", "s25:2538", "s25:switches", "s26:700", "s26:base", "s26:after", "s27:why", "s27:win", "s27:job", "s27:beat", "s27:now", "s28:better", "s28:same", "s28:itself", "s23:pay", "s24:typical", "s24:the#2", "s25:dollars", "s25:54000", "s26:the", "s27:more"],
  sfx: [['s24:47', 'pop', 0.08], ['s26:700', 'coin', 0.1], ['s27:beat', 'chime', 0.08]] })
