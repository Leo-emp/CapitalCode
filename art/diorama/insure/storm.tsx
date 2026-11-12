// ---------------------------------------------------------------- s57–s66: when it goes wrong
// A) Night storm over your town: hail pours (s58), cars dent, the claims pipe gushes; CLAIMS $10.5M → $12.5M (s58);
//    the dial shoots to 110% and LOSS $1.5 MILLION (s59); the wheel still drops +$600K, but DOWN $900,000 (s60).
// B) A $1 coin with a storm bite of almost 9¢ (s61), 2ND WORST CATASTROPHE YEAR SINCE 1950 (s62).
// C) A giant REINSURER umbrella opens above your small umbrella (s63); you hand it a slice of premiums; a LIMIT line on your reservoir,
//    the disaster spills past it and the reinsurer pours back a big part of the bill (s64).
// D) A smart office that looks profitable while cracks spread behind it for years, then it crumbles: going broke (s65);
//    a quote card NOT A BUSINESS FOR OPTIMISTS (s66).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { C, Car, Cloud, Coin, Defs, Flag, Gauge, Grain, Hail, House, Land, Lightning, Office, Pipe, Reservoir, SkyBg, Umbrella, Wheel, big, fadeIn, scene } from './kit'

const G = 920
const Storm: React.FC<PieceProps> = ({ f, c }) => {
  const bad = c('s57:bad'), hail = c('s58:hailstorm'), suddenly = c('s58:suddenly'), jump = c('s58:jump'), twelve = c('s58:twelve')
  const shoots = c('s59:shoots'), ten = c('s59:ten'), loses = c('s59:loses'), still = c('s60:still'), six = c('s60:six'), down = c('s60:down'), nine = c('s60:nine')
  const notMade = c('s61:not'), disasters = c('s61:disasters'), nineC = c('s61:nine'), industry = c('s61:industry'), verisk = c('s62:verisk'), second = c('s62:second'), losses = c('s62:losses')
  const protect = c('s63:protect'), buy = c('s63:buy'), reins = c('s63:reinsurers'), hand = c('s64:hand'), slice = c('s64:slice'), blows = c('s64:blows'), limit = c('s64:limit'), pays = c('s64:pays')
  const quieter = c('s65:quieter'), years = c('s65:years'), look = c('s65:profitable'), really = c('s65:really'), broke = c('s65:broke'), buffett = c('s66:buffett'), definitely = c('s66:definitely'), optimists = c('s66:optimists')
  const AB = c('s61') - 6, BC = c('s63') - 6, CD = c('s65') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = fadeIn(f, CD)
  const gaugeOn = on(f, shoots - 6, 8)
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.035] as [number, number, number, number]), 18)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <SkyBg sky="storm" f={f} sun={null} />
        <Land f={f} G={G} night />
        <Lightning x={1300} y={200} o={on(f, hail, 3) * Math.max(0, Math.sin((f - hail) / 3)) * (f < hail + 30 ? 1 : 0)} />
        {[0, 1, 2, 3].map((k) => <House key={k} x={120 + k * 190} y={G - 70} s={0.6} lit={1} />)}
        {[0, 1, 2].map((k) => <Car key={k} x={220 + k * 230} y={G + 80} s={0.8} hue={[C.sea, C.roof, C.plum][k]} bent={on(f, suddenly + k * 8, 6)} />)}
        <Hail f={f} o={on(f, hail - 2, 8)} x0={0} x1={900} />
        <g opacity={1 - gaugeOn}>
          <Reservoir x={1300} y={G + 10} w={500} h={320} level={lerp(0.7, 0.35, span(f, jump, twelve + 30))} f={f} dark />
          <Pipe d={`M1560 ${G - 60} H1760 V${G + 60}`} f={f} flow={lerp(0.4, 1, on(f, jump, 10))} w={lerp(30, 46, on(f, jump, 10))} />
          <Flag x={1300} y={G - 420} text={f >= twelve ? 'CLAIMS: $12.5 MILLION' : 'CLAIMS: $10.5 MILLION'} size={44} color={f >= twelve ? C.red : C.cream} ink={f >= twelve ? '#fff' : C.ink} o={on(f, jump - 4, 8)} />
        </g>
        <g opacity={gaugeOn * (1 - on(f, still - 6, 8))}>
          <Gauge x={1340} y={720} v={lerp(96.7, 110, on(f, shoots, 20))} s={0.9} />
          <Flag x={1340} y={920} text="LOSS: $1.5 MILLION" size={44} color={C.red} ink="#fff" o={on(f, loses - 2, 8)} />
        </g>
        <g opacity={on(f, still - 6, 8)}>
          <Wheel x={1180} y={G - 280} r={120} spin={f * 2} />
          {[...Array(4)].map((_, k) => { const a = six + k * 6, t = span(f, a, a + 22); return f >= a && t < 1 ? <Coin key={k} x={lerp(1300, 1500, t)} y={lerp(G - 280, G - 120, t)} r={22} /> : null })}
          <Flag x={1520} y={G - 480} text="+$600K INVESTING" size={40} color={C.green} ink="#fff" o={on(f, six - 2, 8)} />
          <Flag x={1420} y={G - 40} text="STILL DOWN $900,000" size={50} color={C.red} ink="#fff" o={on(f, down - 2, 8)} />
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <SkyBg sky="storm" f={f} sun={null} />
        <Land f={f} G={G} night sea={false} />
        <Hail f={f} o={0.5} />
        <g transform="translate(760 560)" opacity={on(f, notMade - 4, 8)}>
          <circle cx={8} cy={14} r={280} fill="#000" opacity={0.25} /><circle r={280} fill="url(#in-goldG)" stroke={C.goldD} strokeWidth={8} />
          <text y={40} textAnchor="middle" fill={C.goldD} style={big(190)}>$1</text>
          {(() => { const t = on(f, disasters, 16), a = 0.087 * t; const p = (x: number) => [280 * Math.sin(x * 2 * Math.PI), -280 * Math.cos(x * 2 * Math.PI)]
            const [x1, y1] = p(a); return t > 0.01 && <g><path d={`M0 0 L0 -290 A 290 290 0 0 1 ${x1 * 290 / 280} ${y1 * 290 / 280} Z`} fill="#2A3444" /><Cloud x={60} y={-330} s={0.55} dark o={t} /></g> })()}
        </g>
        <Flag x={1400} y={300} text="REAL US DATA" size={40} color={C.lamp} o={on(f, c('s61:made') - 2, 8)} />
        <Flag x={1400} y={430} text="ALMOST 9¢ OF EVERY $1" size={50} color={C.red} ink="#fff" o={on(f, nineC - 2, 8)} />
        <Flag x={1400} y={540} text="DISASTERS ALONE, US, 2024" size={36} o={on(f, industry - 4, 8)} />
        <g opacity={on(f, second - 4, 8)} transform={`translate(1400 720) scale(${0.9 + 0.1 * pop(f, second - 4, 10)})`}>
          <rect x={-300} y={-80} width={600} height={160} rx={18} fill={C.cream} stroke={C.red} strokeWidth={6} />
          <text y={-10} textAnchor="middle" fill={C.red} style={big(64)}>2ND WORST YEAR</text>
          <text y={50} textAnchor="middle" fill={C.ink} opacity={0.35 + 0.65 * on(f, c('s62:since') - 2, 8)} style={big(40)}>FOR CATASTROPHES SINCE 1950</text>
        </g>
        <text x={1400} y={870} textAnchor="middle" fill={C.stoneL} opacity={on(f, losses, 8)} style={big(30)}>SOURCE: VERISK / APCIA</text>
      </g>}
      {Cc > 0 && <g opacity={Cc}>
        <SkyBg sky="storm" f={f} sun={null} />
        <Land f={f} G={G} night sea={false} />
        <Hail f={f} o={0.6 * (1 - on(f, pays + 20, 20))} />
        {[0, 1, 2].map((k) => <House key={k} x={260 + k * 170} y={G - 30} s={0.55} lit={1} />)}
        <Umbrella x={430} y={G - 330} s={1.4} o={on(f, c('s63:insurers') - 2, 8)} />
        <Umbrella x={700} y={G - 470} s={lerp(0.6, 2.2, pop(f, reins - 4, 14))} col={C.navy} col2={C.seaL} o={on(f, reins - 6, 6)} />
        <Flag x={1060} y={330} text="REINSURER" size={50} color={C.seaL} o={on(f, reins, 8)} />
        <Reservoir x={1420} y={G + 10} w={460} h={360} level={lerp(0.45, 0.95, on(f, blows - 4, 20))} f={f} dark o={on(f, hand - 6, 8)} />
        <line x1={1170} y1={G + 10 - 0.75 * 360} x2={1670} y2={G + 10 - 0.75 * 360} stroke={C.red} strokeWidth={8} strokeDasharray="22 12" opacity={on(f, limit - 4, 8)} />
        <Flag x={1780} y={G + 10 - 0.75 * 360} text="LIMIT" size={36} color={C.red} ink="#fff" o={on(f, limit - 4, 8)} />
        {(() => { const t = span(f, slice, slice + 30); return f >= slice && t < 1 ? <Coin x={lerp(1420, 900, t)} y={lerp(G - 380, 300, t) - 80 * Math.sin(Math.PI * t)} r={34} /> : null })()}
        <Flag x={1420} y={G + 80} text="A SLICE OF YOUR PREMIUMS" size={34} o={win(f, slice - 2, blows, 8)} />
        {[...Array(8)].map((_, k) => { const a = pays + k * 5, t = span(f, a, a + 26); return f >= a && t < 1 ? <Coin key={k} x={lerp(900, 1360 + (k % 4) * 40, t)} y={lerp(320, G - 260, t)} r={26} /> : null })}
        <Flag x={1420} y={G + 80} text="IT PAYS A BIG PART" size={40} color={C.green} ink="#fff" o={on(f, pays, 8)} />
      </g>}
      {D > 0 && <g opacity={D}>
        <SkyBg sky="storm" f={f} sun={null} />
        <Land f={f} G={G} night sea={false} />
        <g opacity={1 - on(f, buffett - 6, 8)}>
          <g transform={`translate(760 ${G}) rotate(${on(f, broke, 14) * 4}) translate(0 ${on(f, broke + 6, 14) * 60})`}>
            <Office x={0} y={0} s={1.2} sign="LOOKS GREAT" />
            {[...Array(7)].map((_, k) => { const t = on(f, years + k * 10, 14); return t > 0.01 && <path key={k} d={`M${-180 + k * 60} ${-40 - (k % 3) * 60} l${16 * t} ${-30 * t} l${-12 * t} ${-24 * t} l${20 * t} ${-34 * t}`} fill="none" stroke={C.ink} strokeWidth={5} /> })}
          </g>
          <Flag x={760} y={300} text="PROFIT!" size={56} color={C.green} ink="#fff" o={on(f, look - 4, 8) * (1 - on(f, really, 8))} />
          <Flag x={760} y={300} text="REALLY: GOING BROKE" size={56} color={C.red} ink="#fff" o={on(f, really, 8)} />
          <g opacity={on(f, years - 4, 8)} transform="translate(1440 560)">
            {['YEAR 1', 'YEAR 5', 'YEAR 10'].map((t, k) => <g key={k} opacity={on(f, years + k * 12, 8)} transform={`translate(0 ${k * 110 - 110})`}><rect x={-160} y={-40} width={320} height={80} rx={12} fill={C.cream} /><text x={-130} y={16} fill={C.ink} style={big(40)}>{t}</text><text x={130} y={16} textAnchor="end" fill={k === 2 && f > really ? C.red : C.greenD} style={big(40)}>{k === 2 && f > really ? 'CLAIMS!' : 'OK'}</text></g>)}
            <Flag x={0} y={-230} text="CLAIMS SHOW UP LATE" size={36} />
          </g>
        </g>
        <g opacity={on(f, buffett - 6, 8)} transform="translate(960 600)">
          <rect x={-620} y={-180} width={1240} height={360} rx={24} fill="#000" opacity={0.25} transform="translate(10 12)" />
          <rect x={-620} y={-180} width={1240} height={360} rx={24} fill="url(#in-paperG)" stroke={C.navy} strokeWidth={6} />
          <text x={-560} y={-70} fill={C.gold} style={big(160)}>“</text>
          <text y={-30} textAnchor="middle" fill={C.ink} opacity={on(f, definitely - 4, 8)} style={big(76)}>DEFINITELY NOT A BUSINESS</text>
          <text y={60} textAnchor="middle" fill={C.red} opacity={on(f, optimists - 4, 8)} style={big(90)}>FOR OPTIMISTS</text>
          <text y={140} textAnchor="middle" fill={C.inkSoft} style={big(34)}>WARREN BUFFETT, 2024 LETTER</text>
        </g>
      </g>}
      <Headline f={f} lines={[[bad, 'A BAD YEAR', C.cream, 108], [notMade, 'REAL DISASTERS', C.cream, 104], [protect, 'INSURANCE FOR INSURERS', C.cream, 100], [quieter, 'THE QUIET DANGER', C.cream, 104]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s57:now","s59:combined","s59:million","s60:overall","s61:premium","s63:bigger","s64:bill","s65:some","s65:up","s65:time","s66:insurance"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s57:bad', 's58:hailstorm', 's58:suddenly', 's58:jump', 's58:twelve', 's59:shoots', 's59:ten', 's59:loses', 's60:still', 's60:six', 's60:down', 's60:nine', 's61:not', 's61:made', 's61:disasters', 's61:nine', 's61:industry', 's62:verisk', 's62:second', 's62:losses', 's62:since', 's63:insurers', 's63:protect', 's63:buy', 's63:reinsurers', 's64:hand', 's64:slice', 's64:blows', 's64:limit', 's64:pays', 's65:quieter', 's65:years', 's65:profitable', 's65:really', 's65:broke', 's66:buffett', 's66:definitely', 's66:optimists']
export const IN_STORM = makePiece('ins-storm', 'When it goes wrong: a night hailstorm over your town, cars dent, the claims pipe gushes CLAIMS: $10.5 MILLION → $12.5 MILLION; a combined-ratio dial shoots to 110% (LOSS: $1.5 MILLION); the water wheel still drops +$600K INVESTING but STILL DOWN $900,000; a $1 coin with a dark storm bite ALMOST 9¢ OF EVERY $1 (DISASTERS ALONE, US, 2024) and a card 2ND WORST YEAR FOR CATASTROPHES SINCE 1950; a giant navy REINSURER umbrella above your umbrella, a coin slice flies up (A SLICE OF YOUR PREMIUMS), the reservoir overflows a red LIMIT line and the reinsurer pours coins back (IT PAYS A BIG PART); an office LOOKS GREAT with PROFIT! while cracks spread over YEAR 1 / 5 / 10 until REALLY: GOING BROKE; a quote card DEFINITELY NOT A BUSINESS FOR OPTIMISTS', {
  mood: 'dark', Component: Storm, beats: [...BEATS, ...ACC],
  sfx: [['s58:hailstorm', 'impact', 0.14], ['s58:suddenly', 'crack', 0.1], ['s59:shoots', 'riser', 0.1], ['s59:loses', 'thud', 0.12], ['s60:six', 'coin', 0.08], ['s60:down', 'thump', 0.1], ['s61:nine', 'pop', 0.1], ['s62:second', 'impact', 0.1], ['s63:reinsurers', 'whoosh', 0.12], ['s64:slice', 'swish', 0.1], ['s64:pays', 'cash', 0.12], ['s65:broke', 'crack', 0.14], ['s66:optimists', 'ding', 0.1]] })
