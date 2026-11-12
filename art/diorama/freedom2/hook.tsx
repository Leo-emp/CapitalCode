// ---------------------------------------------------------------- s1–s8: the hook ("you"-first, r81).
// A) Night office: you at the desk; a paycheck envelope drops in only when you're there (s1). Sick / trip / stop: the envelope fades (s2).
// B) Dawn street: a brass machine outside a home pays a second paycheck while its owner relaxes; the boss is crossed (s3).
//    Four sources pop around it on their words: a company, a government dome, apartments, a growing tree (s4).
// C) Sunrise: the second paycheck grows until it covers a whole life (home, food, travel) (s5); rich-parents mansion crossed, a normal office ticked (s6);
//    a road from a first paycheck to the sunrise (s7) with eight posts (s8).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { Apartments, C, Capitol, Check, City, Cross, Defs, Desk, Envelope, FONT, Factory, Grain, Machine, MoneyTree, Office, Tag, fadeIn, scene } from './kit'

const G = 930

// # small icons for s2 (thermometer, suitcase, stop hand) drawn as objects, not words
const Thermo: React.FC<{ x: number; y: number; o: number }> = ({ x, y, o }) => <g opacity={o} transform={`translate(${x} ${y})`}><rect x={-14} y={-110} width={28} height={110} rx={14} fill="#F4F4F8" stroke="#9AA0B4" strokeWidth={4} /><rect x={-6} y={-70} width={12} height={70} fill={C.red} /><circle cy={10} r={26} fill={C.red} /></g>
const Suitcase: React.FC<{ x: number; y: number; o: number }> = ({ x, y, o }) => <g opacity={o} transform={`translate(${x} ${y})`}><rect x={-80} y={-110} width={160} height={110} rx={14} fill={C.amber} /><rect x={-80} y={-110} width={160} height={20} rx={10} fill="#fff" opacity={0.2} /><path d="M-30 -110 V-140 H30 V-110" stroke={C.brassD} strokeWidth={10} fill="none" /><rect x={-50} y={-110} width={10} height={110} fill={C.brassD} opacity={0.5} /><rect x={40} y={-110} width={10} height={110} fill={C.brassD} opacity={0.5} /></g>
const StopHand: React.FC<{ x: number; y: number; o: number }> = ({ x, y, o }) => <g opacity={o} transform={`translate(${x} ${y})`}><path d="M-40 0 L-40 -80 Q-40 -96 -28 -96 Q-18 -96 -18 -80 L-18 -120 Q-18 -134 -6 -134 Q6 -134 6 -120 L6 -116 Q6 -130 18 -130 Q30 -130 30 -116 L30 -100 Q30 -112 42 -112 Q54 -112 54 -98 L54 -20 Q54 20 10 20 L-10 20 Q-40 20 -40 0 Z" fill="#F2C7A5" stroke="#B9876A" strokeWidth={4} /></g>
// # the "whole life" things a second paycheck covers
const Home: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><rect x={-90} y={-120} width={180} height={120} fill={C.cream} /><path d="M-110 -110 L0 -200 L110 -110 Z" fill={C.brick} /><rect x={-22} y={-70} width={44} height={70} fill={C.bark} /><rect x={40} y={-96} width={36} height={32} fill={C.sunL} /><rect x={-76} y={-96} width={36} height={32} fill={C.sunL} /></g>
const Food: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}><path d="M-70 -90 L70 -90 L56 0 L-56 0 Z" fill="#E0B070" /><circle cx={-30} cy={-104} r={28} fill={C.red} /><rect x={6} y={-150} width={24} height={70} rx={8} fill={C.leaf} /><circle cx={44} cy={-100} r={20} fill={C.amber} /></g>
const Plane: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${s}) rotate(-12)`}><path d="M-110 0 Q-110 -18 -80 -18 L90 -18 Q120 -18 130 0 Q120 18 90 18 L-80 18 Q-110 18 -110 0 Z" fill="#F4F6FA" /><path d="M-10 -14 L-60 -90 L-30 -90 L40 -14 Z M-10 14 L-60 90 L-30 90 L40 14 Z" fill="#C7D3E6" /><path d="M-100 -10 L-130 -60 L-110 -60 L-80 -12 Z" fill={C.teal} />{[0, 1, 2, 3].map((k) => <circle key={k} cx={20 + k * 22} cy={-4} r={6} fill={C.tealD} />)}</g>
const Mansion: React.FC<{ x: number; y: number; o: number }> = ({ x, y, o }) => <g opacity={o} transform={`translate(${x} ${y})`}><ellipse cx={0} cy={6} rx={260} ry={14} fill="#000" opacity={0.15} /><rect x={-230} y={-200} width={460} height={200} fill="#F1E6D2" /><path d="M-250 -190 L0 -300 L250 -190 Z" fill={C.stoneD} />{[-170, -90, 90, 170].map((cx) => <rect key={cx} x={cx - 14} y={-190} width={28} height={190} fill="#fff" />)}<rect x={-40} y={-110} width={80} height={110} fill={C.bark} /><rect x={-230} y={-210} width={460} height={14} fill={C.gold} /></g>
const Tower9: React.FC<{ x: number; y: number; o: number }> = ({ x, y, o }) => <g opacity={o} transform={`translate(${x} ${y})`}><ellipse cx={0} cy={6} rx={160} ry={12} fill="#000" opacity={0.15} /><rect x={-130} y={-360} width={260} height={360} fill="#7D93B8" />{Array.from({ length: 15 }, (_, k) => <rect key={k} x={-100 + (k % 3) * 74} y={-330 + Math.floor(k / 3) * 66} width={50} height={40} rx={3} fill={C.sunL} opacity={0.9} />)}<rect x={-30} y={-70} width={60} height={70} fill="#4E5F80" /></g>
// # a small wooden post with a number (the eight steps)
const Post: React.FC<{ x: number; y: number; n: number; o: number; lit: number }> = ({ x, y, n, o, lit }) => <g opacity={o} transform={`translate(${x} ${y}) scale(${0.9 + 0.1 * lit})`}><ellipse cx={0} cy={4} rx={30} ry={7} fill="#000" opacity={0.2} /><rect x={-7} y={-120} width={14} height={122} rx={4} fill={C.bark} /><circle cx={0} cy={-140} r={38} fill={lit > 0.5 ? C.sun : C.paper} stroke={C.brassD} strokeWidth={5} /><text y={-126} textAnchor="middle" fill={C.ink} style={{ font: `400 44px ${FONT.big}` }}>{n}</text></g>

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const paycheck = c('s1:paycheck'), show = c('s1:show')
  const sick = c('s2:sick'), trip = c('s2:trip'), stop2 = c('s2:stop'), stops = c('s2:stops')
  const some = c('s3:some'), second = c('s3:second'), keeps = c('s3:keeps'), work3 = c('s3:work'), money3 = c('s3:money'), boss = c('s3:boss')
  const dividends = c('s4:dividends'), interest = c('s4:interest'), rent = c('s4:rent'), gains = c('s4:gains')
  const freedom = c('s5:freedom'), big5 = c('s5:big'), whole = c('s5:whole'), life5 = c('s5:life')
  const rich = c('s6:rich'), parents = c('s6:parents'), normal = c('s6:normal'), nine = c('s6:nine')
  const first7 = c('s7:first'), choice = c('s7:choice'), real = c('s7:real'), eight = c('s8:eight'), go = c('s8:go')

  const AB = c('s3') - 6, BC = c('s5') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const gone = on(f, stops - 4, 14)
  // # in B the machine drops an envelope every ~50 frames into the owner's hands
  const drop = (k: number) => { const at = second + k * 46, t = span(f, at, at + 24); return { at, t } }
  // # C) the second paycheck grows from small to covering the life
  const grow = lerp(0.6, 1.5, span(f, big5, whole + 10))

  return (
    <g>
      <Defs />
      {/* # A) the night office */}
      {A > 0 && <g opacity={A}>
        <Office f={f} sky="night" />
        <Desk x={760} y={G} f={f} s={1.05} />
        <Person f={f} who="buyer" beats={[[0, 'typeSit', 'neutral'], [paycheck, 'receive', 'smiling'], [show + 10, 'typeSit', 'neutral'], [sick, 'nervous', 'worried'], [stop2, 'shrug', 'worried']]} x={1240} y={G} s={0.95} flip />
        <Tag x={1240} y={G - 560} text="YOU" size={46} o={on(f, 0, 8)} />
        {/* # the paycheck drops into the hand on "paycheck" and fades when it stops */}
        <g opacity={on(f, paycheck - 4, 8) * (1 - gone * 0.75)} transform={`translate(${1500} ${lerp(320, G - 300, on(f, paycheck, 14))}) scale(${0.9 + 0.1 * pop(f, paycheck + 10, 12)})`}>
          <Envelope x={0} y={0} s={1} text="PAYCHECK" color={gone > 0.5 ? '#CFCFD8' : '#F4E3C4'} />
        </g>
        <Tag x={1500} y={G - 160} text="ONLY WHEN YOU SHOW UP" size={36} o={win(f, show, sick - 2, 8)} point="none" color={C.amber} />
        <Thermo x={420} y={G - 40} o={on(f, sick - 2, 8)} />
        <Suitcase x={600} y={G - 30} o={on(f, trip - 2, 8)} />
        <StopHand x={330} y={G - 330} o={on(f, stop2 - 2, 8)} />
        <Cross x={1500} y={G - 300} r={120} p={on(f, stops, 12)} />
      </g>}

      {/* # B) the second paycheck: a machine that pays while its owner rests */}
      {B > 0 && <g opacity={B}>
        <City sky="dawn" f={f} sun={[1580, 360]} ground={G} />
        <Home x={300} y={G} s={1.2} />
        <Machine x={760} y={G} f={f} s={0.95} run={on(f, second, 20)} plate="MONEY AT WORK" />
        {[0, 1, 2, 3].map((k) => { const { at, t } = drop(k); return f >= at - 2 && f < at + 26 ? <g key={k} opacity={on(f, at - 2, 4)} transform={`translate(${lerp(760, 1060, t)} ${lerp(G - 110, G - 230, t) - 80 * Math.sin(Math.PI * t)}) scale(0.5)`}><Envelope x={0} y={0} text="$" /></g> : null })}
        <Person f={f} who="owner" beats={[[0, 'relax', 'smiling'], [keeps, 'leanBack', 'smiling'], [work3, 'relax', 'smiling']]} x={1140} y={G} s={0.9} flip />
        <Tag x={1140} y={G - 540} text="SECOND PAYCHECK" size={40} o={on(f, second, 8) * (1 - on(f, dividends - 6, 8))} color={C.cash} ink="#fff" />
        {/* # "not their boss": a boss figure acted out, then crossed */}
        <g opacity={win(f, boss - 6, dividends - 4, 8)}>
          <Person f={f} who="investorF" beats={[[0, 'point', 'neutral']]} x={1560} y={G} s={0.75} />
          <Cross x={1560} y={G - 220} r={110} p={on(f, boss + 2, 12)} />
        </g>
        {/* # s4: the four sources, small, along the street to the right */}
        <g opacity={on(f, dividends - 4, 10)}><Factory x={1480} y={G - 470} f={f} s={0.42} /><Tag x={1480} y={G - 400 + 30} text="DIVIDENDS" size={32} o={on(f, dividends, 6)} point="none" /></g>
        <g opacity={on(f, interest - 4, 10)}><Capitol x={1780} y={G - 470} s={0.42} /><Tag x={1780} y={G - 400 + 30} text="INTEREST" size={32} o={on(f, interest, 6)} point="none" /></g>
        <g opacity={on(f, rent - 4, 10)}><Apartments x={1480} y={G - 60} s={0.42} /><Tag x={1480} y={G + 40} text="RENT" size={32} o={on(f, rent, 6)} point="none" /></g>
        <g opacity={on(f, gains - 4, 10)}><MoneyTree x={1780} y={G - 60} g={(0.15 + 0.3 * span(f, c('s4:grow'), c('s4:grow') + 30))} f={f} s={0.5} /><Tag x={1780} y={G + 40} text="GAINS" size={32} o={on(f, gains, 6)} point="none" /></g>
      </g>}

      {/* # C) sunrise: the second paycheck covers the whole life; no rich parents; a normal 9-to-5; the road and its eight posts */}
      {Cc > 0 && <g opacity={Cc}>
        <City sky="gold" f={f} sun={[960, 640]} ground={G} />
        <g opacity={win(f, BC, rich - 4, 10)}>
          <Home x={560} y={G} s={1} o={on(f, life5 - 10, 8)} /><Food x={960} y={G} s={1} o={on(f, life5 - 4, 8)} /><Plane x={1360} y={G - 120} s={1} o={on(f, life5 + 2, 8)} />
          <g transform={`translate(960 ${G - 420}) scale(${grow * (1 + 0.08 * pop(f, c('s5:second'), 12))})`}><Envelope x={0} y={0} text="$" color={C.cashL} /></g>
          <Tag x={960} y={G - 420 - 110 * grow} text="SECOND PAYCHECK" size={40} o={on(f, freedom, 8)} color={C.cash} ink="#fff" />
          <Tag x={960} y={G + 60} text="COVERS YOUR WHOLE LIFE" size={44} o={on(f, whole, 8)} point="none" color={C.sun} />
        </g>
        <g opacity={win(f, rich - 4, first7 - 4, 10)}>
          <Mansion x={560} y={G} o={on(f, rich - 4, 8)} /><Cross x={560} y={G - 160} r={120} p={on(f, parents + 2, 12)} />
          <Tower9 x={1360} y={G} o={on(f, normal - 4, 8)} /><Tag x={1360} y={G - 410} text="NORMAL 9 TO 5" size={40} o={on(f, nine, 8)} point="down" /><Check x={1520} y={G - 300} r={44} p={on(f, c('s6:five'), 8)} />
        </g>
        <g opacity={on(f, c('s7:together') - 4, 10)}>
          <path d={`M100 ${G + 70} C 700 ${G + 40} 1200 ${G + 10} 1820 ${G - 40}`} fill="none" stroke={C.paper} strokeWidth={40} strokeLinecap="round" pathLength={1} strokeDasharray={`${span(f, c('s7:together'), choice + 10)} 1`} />
          <Envelope x={200} y={G - 90} s={0.75} text="$" o={on(f, first7, 8)} /><Tag x={200} y={G - 210} text="FIRST PAYCHECK" size={34} o={on(f, first7, 8)} />
          <circle cx={1800} cy={G - 60} r={220} fill="url(#ff-glow)" opacity={on(f, c('s7:day'), 12)} />
          <Tag x={1680} y={G - 170} text="WORK IS A CHOICE" size={40} o={on(f, choice, 8)} color={C.sun} />
          {Array.from({ length: 8 }, (_, k) => { const t = (k + 1) / 9, x = lerp(320, 1640, t), y = G + 20 - 30 * Math.sin(Math.PI * t)
            return <Post key={k} x={x} y={y} n={k + 1} o={on(f, lerp(eight - 6, go, k / 8), 6)} lit={on(f, go + k * 3, 6)} /> })}
          <Tag x={960} y={G - 360} text="WITH REAL NUMBERS" size={44} o={win(f, real, eight, 8)} point="none" />
        </g>
      </g>}

      <Headline f={f} lines={[[0, 'ONE PAYCHECK', C.cream, 104], [sick, 'IT STOPS WHEN YOU STOP', C.cream, 100], [some, 'A SECOND PAYCHECK', C.cream, 104], [dividends, 'PAID BY THEIR MONEY', C.cream, 100],
        [freedom, 'FINANCIAL FREEDOM', C.ink, 108], [rich, 'NO RICH PARENTS NEEDED', C.ink, 100], [first7, 'STEP BY STEP', C.ink, 104], [eight, 'EIGHT SIMPLE STEPS', C.ink, 104]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s7:day", "s5:second", "s4:grow", "s6:five", "s7:together", 's1:paycheck', 's1:show', 's2:sick', 's2:trip', 's2:stop', 's2:stops', 's3:some', 's3:second', 's3:keeps', 's3:work', 's3:money', 's3:boss', 's4:dividends', 's4:interest', 's4:rent', 's4:gains',
  's5:freedom', 's5:big', 's5:whole', 's5:life', 's6:rich', 's6:parents', 's6:normal', 's6:nine', 's7:first', 's7:choice', 's7:real', 's8:eight', 's8:go']
export const FF_HOOK = makePiece('ff-hook', '9-to-5 freedom hook: night office, you at the desk and a PAYCHECK envelope only when you show up; thermometer, suitcase, stop hand, the paycheck greys and is crossed; dawn street, a brass MONEY AT WORK machine drops envelopes to a relaxing owner (SECOND PAYCHECK), a boss crossed; small factory DIVIDENDS, dome INTEREST, apartments RENT, tree GAINS; sunrise: the second paycheck grows over a home, food and a plane (FINANCIAL FREEDOM); mansion crossed, NORMAL 9 TO 5 office ticked; a road from FIRST PAYCHECK to WORK IS A CHOICE with eight numbered posts', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:paycheck', 'coin', 0.18], ['s2:stops', 'swish', 0.15], ['s3:second', 'chime', 0.18], ['s4:dividends', 'pop', 0.12], ['s4:interest', 'pop', 0.12], ['s4:rent', 'pop', 0.12], ['s4:gains', 'pop', 0.12], ['s5:whole', 'ding', 0.18], ['s8:go', 'chime', 0.15]] })
