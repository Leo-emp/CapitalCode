// ---------------------------------------------------------------- s29–s41: engine two, the float
// A) Golden evening. A road of time: your premium coin lands NOW at the left (s30 up front), claims come LATER at the right.
//    A fender bender is paid after WEEKS (near marker), an injury claim walks into a courthouse and waits YEARS (far marker) (s31).
// B) The pile between: the stone reservoir fills with premiums faster than the claims pipe drains it (s32); THE FLOAT flag (s33);
//    NOT YOURS TO KEEP, then it turns the water wheel: invest (s33). $15 MILLION FLOAT; it flows into bond certificates (s34);
//    1-YR TREASURY 4.4% → you earn 4% (s35); the wheel spits $600,000 a year (s36).
// C) Two stacks: insurance $500K + investing $600K = $1.1 MILLION (s37); the investing stack lights MORE THAN HALF (s38).
//    A quote card: MONEY UP FRONT, LOSS PAYMENTS LATER (s39); two Berkshire reservoirs $46B → $171B (s40); a $32B profit stream flows in (s41).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Bond, C, Car, Coin, Defs, Flag, Grain, Land, Pipe, Reservoir, SkyBg, Stack, Wheel, big, fadeIn, scene } from './kit'

const G = 920
const Court: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={4} rx={150} ry={12} fill="#000" opacity={0.18} />
    <rect x={-130} y={-150} width={260} height={150} fill={C.stoneL} /><path d="M-150 -150 L0 -220 L150 -150 Z" fill={C.stone} stroke={C.stoneD} strokeWidth={4} />
    {[-90, -30, 30, 90].map((cx) => <rect key={cx} x={cx - 12} y={-140} width={24} height={130} fill={C.wall} />)}
    <g transform="translate(0 -184)"><line x1={-36} y1={0} x2={36} y2={0} stroke={C.ink} strokeWidth={4} /><line x1={0} y1={-14} x2={0} y2={4} stroke={C.ink} strokeWidth={4} /><path d="M-46 14 a12 6 0 0 0 24 0 M22 14 a12 6 0 0 0 24 0" fill={C.ink} /></g>
  </g>
)
const Float: React.FC<PieceProps> = ({ f, c }) => {
  const part = c('s29:part'), see = c('s29:see'), premium = c('s30:premium'), front = c('s30:front'), later = c('s30:later')
  const fender = c('s31:fender'), weeks = c('s31:weeks'), injury = c('s31:injury'), court = c('s31:court'), years = c('s31:years')
  const moment = c('s32:moment'), pile = c('s32:pile'), hasnt = c('s32:hasn\'t'), floatW = c('s33:float'), isnt = c('s33:isn\'t'), invest = c('s33:invest'), due = c('s33:due'), insB = c('s41:insurance'), profitB = c('s41:profit'), effect = c('s41:effect')
  const fifteen = c('s34:fifteen'), bonds = c('s34:bonds'), treasury = c('s35:treasury'), earn = c('s35:earn'), six = c('s36:six'), future = c('s36:future')
  const add = c('s37:add'), half = c('s37:half'), six2 = c('s37:six'), total = c('s37:total'), more = c('s38:more'), holding = c('s38:holding')
  const buffett = c('s39:buffett'), money = c('s39:money'), later2 = c('s39:later'), forty = c('s40:forty'), hundred = c('s40:hundred'), thirty = c('s41:thirty'), paid = c('s41:paid')
  const AB = c('s32') - 6, BC = c('s37') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const res = on(f, AB, 10)
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.035] as [number, number, number, number]), 18)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <SkyBg sky="evening" f={f} sun={[1700, 300]} />
        <Land f={f} G={G} />
        <rect x={0} y={G + 20} width={1920} height={70} fill="#5C6670" />
        <path d={`M200 ${G - 380} H1760`} stroke={C.cream} strokeWidth={10} strokeLinecap="round" opacity={on(f, part, 10)} />
        {[[200, 'NOW', premium], [760, 'WEEKS', weeks], [1640, 'YEARS', years]].map(([x, t, a], k) => <g key={k} opacity={on(f, (a as number) - 4, 8)}><circle cx={x as number} cy={G - 380} r={18} fill={C.navy} /><Flag x={x as number} y={G - 460} text={t as string} size={40} color={k ? C.cream : C.gold} /></g>)}
        <Coin x={200} y={lerp(G - 900, G - 300, on(f, front - 6, 14))} r={56} o={on(f, premium - 2, 6)} />
        <Flag x={200} y={G - 200} text="YOU PAY UP FRONT" size={36} o={on(f, front, 8)} />
        <Flag x={1640} y={G - 280} text="CLAIMS PAID LATER" size={36} color={C.red} ink="#fff" o={on(f, later, 8) * (1 - on(f, injury - 6, 6))} />
        <g opacity={on(f, fender - 4, 8)}><Car x={760} y={G + 60} s={0.9} hue={C.sea} bent={0.5} /><Coin x={760} y={G - 200} r={30} o={on(f, weeks, 8)} /></g>
        <Car x={lerp(1100, 1380, on(f, injury, 20))} y={G + 60} s={0.9} hue={C.plum} bent={1} o={on(f, injury - 4, 8)} />
        <Court x={1640} y={G} s={0.9} o={on(f, court - 6, 8)} />
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, years + k * 6, 6)} transform={`translate(${1520 + k * 70} ${G - 260 - k * 20}) rotate(${-10 + k * 10})`}><rect x={-28} y={-34} width={56} height={64} rx={6} fill={C.cream} stroke={C.ink} strokeWidth={3} /><rect x={-28} y={-34} width={56} height={16} fill={C.red} /></g>)}
      </g>}
      {B > 0 && <g opacity={B}>
        <SkyBg sky="evening" f={f} sun={[1700, 300]} />
        <Land f={f} G={G} sea={false} />
        <g opacity={res}>
          <Reservoir x={720} y={G + 10} w={680} h={380} level={lerp(0.2, 0.75, span(f, moment, hasnt + 20))} f={f} label={f >= floatW ? 'THE FLOAT' : undefined} />
          {[...Array(10)].map((_, k) => { const a = moment + k * 7, t = span(f, a, a + 24); return f >= a && t < 1 && f < floatW ? <Coin key={k} x={lerp(380 + (k % 5) * 140, 520 + (k % 5) * 100, t)} y={lerp(260, G - 300, t)} r={24} o={1 - t * 0.6} /> : null })}
          <Pipe d={`M1060 ${G - 60} H1240 V${G + 60}`} f={f} flow={0.35 * on(f, pile, 10) * (1 - on(f, invest, 10))} />
          <Flag x={1250} y={G - 120} text="CLAIMS, LATER" size={32} color={C.red} ink="#fff" o={win(f, pile, floatW, 8) + win(f, due, invest, 6)} />
          <Flag x={720} y={G + 100} text="NOT YOURS TO KEEP" size={40} o={win(f, isnt - 2, invest, 8)} />
          <g opacity={on(f, invest - 4, 10)}>
            <Pipe d={`M1060 ${G - 220} H1300`} f={f} flow={on(f, invest, 10)} />
            <Wheel x={1440} y={G - 230} r={150} spin={f * 2.5 * on(f, invest, 30)} />
          </g>
          <Flag x={720} y={G - 520} text="$15 MILLION FLOAT" size={44} color={C.gold} o={on(f, fifteen - 2, 8)} />
          {[0, 1, 2].map((k) => <Bond key={k} x={1440 + (k - 1) * 120} y={G + 70 - k * 14} s={0.6} rot={-6 + k * 6} text="BOND" o={pop(f, bonds - 2 + k * 5, 10)} />)}
          <g opacity={on(f, treasury - 4, 8)}>
            <rect x={1240} y={170} width={420} height={170} rx={16} fill={C.cream} stroke={C.greenD} strokeWidth={6} />
            <text x={1450} y={225} textAnchor="middle" fill={C.inkSoft} style={big(36)}>1-YEAR US TREASURY</text>
            <text x={1450} y={305} textAnchor="middle" fill={C.greenD} opacity={1 - on(f, earn - 2, 8)} style={big(80)}>4.4%</text>
            <text x={1450} y={305} textAnchor="middle" fill={C.greenD} opacity={on(f, earn - 2, 8)} style={big(80)}>YOU EARN 4%</text>
          </g>
          {[...Array(6)].map((_, k) => { const a = six + k * 8, t = span(f, a, a + 28); return f >= a && t < 1 ? <Coin key={k} x={lerp(1560, 1780, t)} y={lerp(G - 230, G - 40, t) - 60 * Math.sin(Math.PI * t)} r={24} /> : null })}
          <Flag x={1600} y={G - 460} text="$600,000 A YEAR" size={44} color={C.green} ink="#fff" o={on(f, six - 2, 8)} />
          <Flag x={1600} y={G - 540} text="FROM FUTURE CLAIMS' MONEY" size={30} o={on(f, future - 2, 8)} />
        </g>
      </g>}
      {Cc > 0 && <g opacity={Cc}>
        <SkyBg sky="evening" f={f} sun={[1700, 300]} />
        <Land f={f} G={G} sea={false} />
        <g opacity={1 - on(f, buffett - 6, 8)}>
          <g opacity={on(f, half - 4, 8)}><Stack x={460} y={G} n={on(f, half - 4, 14) * 10} /><Flag x={460} y={G - 220} text="INSURANCE $500K" size={40} /></g>
          <g opacity={on(f, six2 - 4, 8)}><Stack x={900} y={G} n={on(f, six2 - 4, 14) * 12} /><Flag x={900} y={G - 250} text="INVESTING $600K" size={40} color={on(f, more, 8) > 0.5 ? C.lamp : C.cream} /></g>
          <g opacity={on(f, total - 4, 8)}><text x={1170} y={G - 60} fill={C.ink} style={big(110)}>=</text><Stack x={1460} y={G} n={on(f, total - 4, 14) * 22} /><Flag x={1460} y={G - 390} text="$1.1 MILLION" size={52} color={C.green} ink="#fff" /></g>
          <circle cx={900} cy={G - 90} r={170} fill="url(#in-glow)" opacity={0.8 * on(f, more, 10)} />
          <Flag x={960} y={G + 110} text="MORE THAN HALF: OTHER PEOPLE'S MONEY" size={40} color={C.lamp} o={on(f, holding - 4, 8)} />
        </g>
        <g opacity={on(f, buffett - 6, 8)}>
          <g opacity={1 - on(f, forty - 8, 8)} transform="translate(960 560)">
            <rect x={-560} y={-170} width={1120} height={340} rx={24} fill="#000" opacity={0.15} transform="translate(10 12)" />
            <rect x={-560} y={-170} width={1120} height={340} rx={24} fill="url(#in-paperG)" stroke={C.navy} strokeWidth={6} />
            <text x={-500} y={-60} fill={C.gold} style={big(160)}>“</text>
            <text y={-20} textAnchor="middle" fill={C.ink} opacity={on(f, money - 2, 8)} style={big(80)}>MONEY UP FRONT,</text>
            <text y={70} textAnchor="middle" fill={C.red} opacity={on(f, later2 - 4, 8)} style={big(80)}>LOSS PAYMENTS LATER</text>
            <text y={140} textAnchor="middle" fill={C.inkSoft} style={big(34)}>WARREN BUFFETT, BERKSHIRE HATHAWAY</text>
          </g>
          <g opacity={on(f, forty - 6, 8)}>
            <Reservoir x={520} y={G} w={260} h={140} level={0.8} f={f} />
            <Flag x={520} y={G - 220} text="$46 BILLION" size={44} />
            <path d="M720 760 H880" stroke={C.ink} strokeWidth={10} markerEnd="" opacity={on(f, hundred - 4, 8)} /><path d="M880 740 l30 20 l-30 20 Z" fill={C.ink} opacity={on(f, hundred - 4, 8)} />
            <Reservoir x={1340} y={G} w={lerp(260, 640, on(f, hundred - 4, 30))} h={lerp(140, 400, on(f, hundred - 4, 30))} level={0.82} f={f} o={on(f, hundred - 6, 8)} />
            <Flag x={1340} y={G - 470} text="$171 BILLION FLOAT" size={48} color={C.gold} o={on(f, hundred + 10, 8)} />
            <Flag x={940} y={G + 100} text="ABOUT 20 YEARS" size={36} o={on(f, c('s40:twenty') - 2, 8)} />
          </g>
          <g opacity={on(f, insB - 4, 8)} transform="translate(1800 340)"><path d="M-60 0 L0 -50 L60 0 Z" fill={C.stoneL} stroke={C.stoneD} strokeWidth={3} /><rect x={-50} y={0} width={100} height={70} fill="url(#in-stoneG)" /><rect x={-14} y={30} width={28} height={40} fill={C.navy} /></g>
          <circle cx={1340} cy={G - 200} r={380} fill="url(#in-glow)" opacity={0.6 * win(f, effect, paid + 30, 10)} />
          <g opacity={on(f, thirty - 4, 8)}>
            {[...Array(5)].map((_, k) => { const a = thirty + k * 9, t = span(f, a, a + 30); return f >= a && t < 1 ? <Coin key={k} x={lerp(1800, 1500, t)} y={lerp(300, G - 360, t)} r={26} /> : null })}
            <Flag x={1600} y={240} text="+$32B INSURANCE PROFIT" size={40} color={C.green} ink="#fff" o={on(f, profitB - 2, 8)} />
            <Flag x={960} y={1010} text="PAID TO HOLD THE MONEY" size={44} color={C.lamp} o={on(f, paid - 4, 8)} />
          </g>
        </g>
      </g>}
      <Headline f={f} lines={[[part, 'THE PART NOBODY SEES', C.navy, 104], [floatW, 'THE FLOAT', C.navy, 112], [add, 'ADD IT UP', C.navy, 108], [buffett, "BUFFETT'S FAVOURITE TRICK", C.navy, 100]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s30:insurer","s32:company","s32:day","s33:pile","s33:until","s34:say","s34:dollars","s34:put","s35:percent","s36:year","s37:thousand","s37:one","s38:money","s39:hathaway","s40:berkshire's","s41:over","s41:tax","s41:money"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s29:part', 's29:see', 's30:premium', 's30:front', 's30:later', 's31:fender', 's31:weeks', 's31:injury', 's31:court', 's31:years', 's32:moment', 's32:pile', "s32:hasn't", 's33:float', "s33:isn't", 's33:invest', 's34:fifteen', 's34:bonds', 's35:treasury', 's35:earn', 's36:six', 's36:future', 's37:add', 's37:half', 's37:six', 's37:total', 's38:more', 's38:holding', 's39:buffett', 's39:money', 's39:later', 's40:forty', 's40:hundred', 's40:twenty', 's33:due', 's41:insurance', 's41:thirty', 's41:profit', 's41:effect', 's41:paid']
export const IN_FLOAT = makePiece('ins-float', 'The float in golden evening light: a time road NOW / WEEKS / YEARS; your premium coin drops at NOW (YOU PAY UP FRONT), CLAIMS PAID LATER; a fender bender paid in weeks, an injured driver drives to a courthouse with calendar pages (YEARS); the stone reservoir fills faster than the claims pipe drains (THE FLOAT, NOT YOURS TO KEEP), a pipe turns the water wheel, $15 MILLION FLOAT, bond certificates, a 1-YEAR US TREASURY card 4.4% → YOU EARN 4%, coins out of the wheel $600,000 A YEAR; stacks INSURANCE $500K + INVESTING $600K = $1.1 MILLION (MORE THAN HALF: OTHER PEOPLE\'S MONEY); a Buffett quote card MONEY UP FRONT, LOSS PAYMENTS LATER; a small $46 BILLION reservoir grows into $171 BILLION FLOAT (ABOUT 20 YEARS), +$32B INSURANCE PROFIT, PAID TO HOLD THE MONEY', {
  mood: 'light', Component: Float, beats: [...BEATS, ...ACC],
  sfx: [['s30:premium', 'coin', 0.12], ['s31:court', 'thud', 0.1], ['s33:float', 'chime', 0.14], ['s33:invest', 'whoosh', 0.1], ['s34:bonds', 'pop', 0.08], ['s35:earn', 'tick', 0.08], ['s36:six', 'coin', 0.1], ['s37:total', 'ding', 0.12], ['s39:money', 'swish', 0.1], ['s40:hundred', 'riser', 0.1], ['s41:paid', 'cash', 0.12]] })
