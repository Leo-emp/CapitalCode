// ---------------------------------------------------------------- s42–s49: where the float goes
// A) Dusk on the harbour: the reservoir pipes into a vault; two bond piles land, GOVERNMENT and COMPANY (s43); a claim car arrives and is paid from the vault (s43 arrive);
//    a short 1-YEAR bond for a car insurer whose claims come fast (s44).
// B) A ring of 12 month tiles = one-year policies; half of them fade on "six month" (s45); the reservoir shrinks (shrank) and a price tag flips twice (fix prices more often).
// C) An interest-rate knob drives the water wheel (s46): EARLY 2021 knob at 0.08%, the wheel barely turns, a trickle of $12,000 A YEAR (s47–s48);
//    TODAY 4%, the wheel spins and pours $600,000 (s48); a see-saw: big investing side lets the insurance side be thinner (s49).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Bill, Bond, C, Car, Coin, Defs, Flag, Grain, Land, Lighthouse, Pipe, Reservoir, SkyBg, Stack, Wheel, big, fadeIn, scene } from './kit'

const G = 920
const Vault: React.FC<{ x: number; y: number; s?: number; open?: number }> = ({ x, y, s = 1, open = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={230} ry={16} fill="#000" opacity={0.2} />
    <rect x={-210} y={-300} width={420} height={300} rx={16} fill="url(#in-stoneG)" stroke={C.stoneD} strokeWidth={5} />
    <circle cx={0} cy={-150} r={110} fill="#5E6A75" stroke={C.ink} strokeWidth={6} />
    <g transform={`translate(0 -150) rotate(${open * 120})`}>{[0, 1, 2, 3].map((k) => <line key={k} x1={0} y1={0} x2={Math.cos(k * Math.PI / 2) * 70} y2={Math.sin(k * Math.PI / 2) * 70} stroke={C.gold} strokeWidth={10} strokeLinecap="round" />)}<circle r={22} fill={C.gold} /></g>
  </g>
)
const Knob: React.FC<{ x: number; y: number; t: number; label: string; o?: number }> = ({ x, y, t, label, o = 1 }) => o <= 0.01 ? null : (
  <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={130} fill="url(#in-paperG)" stroke={C.ink} strokeWidth={6} />
    {[...Array(9)].map((_, k) => { const a = Math.PI * (0.75 + k * 0.1875); return <line key={k} x1={Math.cos(a) * 100} y1={Math.sin(a) * 100} x2={Math.cos(a) * 118} y2={Math.sin(a) * 118} stroke={C.ink} strokeWidth={4} /> })}
    <g transform={`rotate(${-135 + 270 * t})`}><circle r={70} fill={C.navy} /><rect x={-8} y={-92} width={16} height={50} rx={6} fill={C.lamp} /></g>
    <text y={190} textAnchor="middle" fill={C.ink} style={big(44)}>{label}</text>
  </g>
)
const Bonds: React.FC<PieceProps> = ({ f, c }) => {
  const buy = c('s42:buy'), floatW = c('s42:float'), safe = c('s43:safe'), interest = c('s43:interest'), gov = c('s43:government'), comp = c('s43:company'), arrive = c('s43:arrive')
  const fast = c('s44:fast'), short = c('s44:short'), switched = c('s45:switched'), oneYear = c('s45:one'), six = c('s45:six'), shrank = c('s45:shrank'), fix = c('s45:fix'), often = c('s45:often')
  const rates = c('s46:rates'), second = c('s46:second'), speeds = c('s46:speeds'), slows = c('s46:slows'), y2021 = c('s47:2021'), tenth = c('s47:tenth')
  const back = c('s48:back'), twelve = c('s48:twelve'), today = c('s48:today'), four = c('s48:four'), six2 = c('s48:six'), high = c('s49:high'), afford = c('s49:afford'), less = c('s49:less')
  const AB = c('s45') - 6, BC = c('s46') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = fadeIn(f, BC)
  const rate = f < today ? lerp(0.5, 0.02, on(f, y2021 - 4, 16)) : lerp(0.02, 0.75, on(f, today, 16))
  const spin = f < today ? 0.15 : lerp(0.15, 4, on(f, today, 20))
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.035] as [number, number, number, number]), 18)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <SkyBg sky="dusk" f={f} sun={[1600, 620]} />
        <Land f={f} G={G} night />
        <Lighthouse x={1820} y={G - 80} s={0.8} f={f} beam={1} />
        <Reservoir x={420} y={G + 10} w={420} h={300} level={0.7} f={f} label="THE FLOAT" />
        <Pipe d={`M640 ${G - 150} H820`} f={f} flow={on(f, buy, 10)} />
        <Vault x={1040} y={G + 10} s={0.9} open={on(f, safe - 4, 16)} />
        {[0, 1, 2].map((k) => <Bond key={'g' + k} x={1440} y={G - 40 - k * 40} s={0.7} rot={-4 + k * 4} text="GOVERNMENT" o={pop(f, gov - 2 + k * 4, 10)} />)}
        {[0, 1, 2].map((k) => <Bond key={'c' + k} x={1440} y={G - 230 - k * 40} s={0.7} rot={4 - k * 4} text="COMPANY" o={pop(f, comp - 2 + k * 4, 10) * (1 - on(f, fast - 6, 8))} />)}
        <Flag x={1040} y={G - 380} text="SAFE, STEADY INTEREST" size={40} color={C.greenL} o={on(f, interest - 4, 8) * (1 - on(f, arrive - 6, 6))} />
        <g opacity={win(f, arrive - 6, fast, 8)}>
          <Car x={lerp(1900, 1250, on(f, arrive - 6, 16))} y={G + 90} s={0.8} hue={C.roof} bent={1} />
          <Coin x={1150} y={lerp(G - 150, G + 30, on(f, arrive + 6, 12))} r={30} />
          <Flag x={1040} y={G - 380} text="READY WHEN CLAIMS ARRIVE" size={40} color={C.lamp} />
        </g>
        <g opacity={on(f, fast - 4, 8)}>
          <Car x={lerp(1900, 1520, on(f, fast - 4, 14))} y={G + 90} s={0.8} hue={C.sea} />
          <Flag x={1440} y={G - 300} text="CAR CLAIMS COME FAST" size={36} />
          <Bond x={1440} y={G - 420} s={0.7} text="1 YEAR" o={pop(f, short - 2, 10)} />
          <Flag x={1040} y={G - 380} text="SHORT AND SAFE" size={40} color={C.greenL} o={on(f, short, 8)} />
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <SkyBg sky="dusk" f={f} sun={[1600, 620]} />
        <Land f={f} G={G} night sea={false} />
        {[...Array(12)].map((_, k) => { const a = (k / 12) * Math.PI * 2 - Math.PI / 2, x = 620 + Math.cos(a) * 250, y = 560 + Math.sin(a) * 250, gone = k >= 6 ? on(f, six + (k - 6) * 2, 8) : 0
          return <g key={k} opacity={on(f, oneYear - 4 + k, 6) * (1 - 0.8 * gone)} transform={`translate(${x} ${y})`}><rect x={-44} y={-40} width={88} height={80} rx={10} fill={gone > 0.5 ? C.stoneD : C.cream} stroke={C.ink} strokeWidth={3} /><rect x={-44} y={-40} width={88} height={20} rx={6} fill={C.red} /><text y={30} textAnchor="middle" fill={C.ink} style={big(36)}>{k + 1}</text></g> })}
        <text x={620} y={590} textAnchor="middle" fill={C.cream} style={big(80)}>{f >= six ? '6 MONTHS' : '1 YEAR'}</text>
        <Reservoir x={1420} y={G - 40} w={lerp(460, 300, on(f, shrank, 20))} h={lerp(320, 220, on(f, shrank, 20))} level={0.7} f={f} o={on(f, switched - 4, 8)} />
        <Flag x={1420} y={G + 50} text="LESS FLOAT" size={40} color={C.red} ink="#fff" o={on(f, shrank, 8)} />
        <g opacity={on(f, fix - 4, 8)} transform={`translate(1420 260) scale(${1 + 0.1 * Math.sin(span(f, fix, often + 20) * Math.PI * 4)})`}><Bill x={0} y={0} s={0.8} text={f >= often ? 'NEW PRICE' : 'PRICE'} /></g>
        <Flag x={1420} y={420} text="RE-PRICE MORE OFTEN" size={36} color={C.lamp} o={on(f, often - 2, 8)} />
      </g>}
      {Cc > 0 && <g opacity={Cc}>
        <SkyBg sky="dusk" f={f} sun={[1600, 620]} />
        <Land f={f} G={G} night sea={false} />
        <g opacity={1 - on(f, high - 6, 8)}>
          <Knob x={460} y={540} t={rate} label="INTEREST RATES" o={on(f, BC, 8)} />
          <Wheel x={1200} y={G - 260} r={180} spin={f * spin} o={on(f, BC, 8)} glow={0.6 * on(f, today + 6, 10)} />
          <Pipe d={`M600 540 H980`} f={f} flow={on(f, rates, 10)} w={20} />
          <Flag x={1200} y={230} text="SPEEDS UP" size={40} color={C.green} ink="#fff" o={win(f, speeds - 2, slows, 6)} />
          <Flag x={1200} y={230} text="SLOWS DOWN" size={40} color={C.red} ink="#fff" o={win(f, slows - 2, y2021 - 2, 6)} />
          <Flag x={460} y={300} text="EARLY 2021: 0.08%" size={44} color={C.cream} o={win(f, y2021 - 2, today, 8)} />
          <Flag x={460} y={300} text="TODAY: 4%" size={50} color={C.lamp} o={on(f, today, 8)} />
          {f >= tenth && f < today && [...Array(3)].map((_, k) => { const t = ((f - tenth + k * 30) % 90) / 90; return <circle key={k} cx={1420} cy={lerp(G - 140, G + 40, t)} r={6} fill={C.water} /> })}
          <Flag x={1600} y={G + 60} text="$12,000 A YEAR" size={44} o={win(f, twelve - 2, today, 8)} />
          {[...Array(6)].map((_, k) => { const a = six2 + k * 6, t = span(f, a, a + 24); return f >= a && t < 1 ? <Coin key={k} x={lerp(1380, 1640, t)} y={lerp(G - 220, G - 20, t)} r={24} /> : null })}
          <Flag x={1600} y={G + 60} text="$600,000 A YEAR" size={48} color={C.green} ink="#fff" o={on(f, six2 - 2, 8)} />
        </g>
        <g opacity={on(f, high - 6, 8)}>
          {(() => { const tilt = -8 * on(f, afford, 16); return <g transform={`translate(960 ${G - 40})`}>
            <path d="M-60 60 L0 -20 L60 60 Z" fill={C.stoneD} />
            <g transform={`rotate(${tilt} 0 -20)`}><rect x={-560} y={-36} width={1120} height={24} rx={10} fill={C.roofD} />
              <g transform="translate(-420 -36)"><Wheel x={0} y={-150} r={110} spin={f * 3} /></g>
              <g transform="translate(420 -36)"><Stack x={0} y={0} n={lerp(10, 3, on(f, less, 16))} /></g></g>
          </g> })()}
          <Flag x={540} y={300} text="RATES HIGH: INVESTING EARNS MORE" size={40} color={C.lamp} o={on(f, high, 8)} />
          <Flag x={1380} y={420} text="INSURANCE CAN EARN LESS" size={40} o={on(f, less - 4, 8)} />
        </g>
      </g>}
      <Headline f={f} lines={[[buy, 'WHERE THE FLOAT GOES', C.cream, 104], [switched, 'ONE YEAR → SIX MONTHS', C.cream, 100], [rates, 'RATES DRIVE ENGINE TWO', C.cream, 100]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s42:what","s43:money","s44:insurer's","s45:buffett","s47:year","s48:million","s48:year","s49:itself"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s42:buy', 's42:float', 's43:safe', 's43:interest', 's43:government', 's43:company', 's43:arrive', 's44:fast', 's44:short', 's45:switched', 's45:one', 's45:six', 's45:shrank', 's45:fix', 's45:often', 's46:rates', 's46:second', 's46:speeds', 's46:slows', 's47:2021', 's47:tenth', 's48:back', 's48:twelve', 's48:today', 's48:four', 's48:six', 's49:high', 's49:afford', 's49:less']
export const IN_BONDS = makePiece('ins-bonds', 'Where the float goes, harbour at dusk: the reservoir THE FLOAT pipes into a stone vault, bond certificates GOVERNMENT and COMPANY (SAFE, STEADY INTEREST), a crashed car is paid from the vault (READY WHEN CLAIMS ARRIVE), CAR CLAIMS COME FAST, a 1 YEAR bond (SHORT AND SAFE); a ring of 12 month tiles where half fade (1 YEAR → 6 MONTHS), the reservoir shrinks (LESS FLOAT), a price tag flips (RE-PRICE MORE OFTEN); an INTEREST RATES knob drives the water wheel: EARLY 2021: 0.08%, a trickle $12,000 A YEAR; TODAY: 4%, the wheel spins and pours $600,000 A YEAR; a see-saw: wheel heavy, insurance stack shrinks (RATES HIGH: INVESTING EARNS MORE / INSURANCE CAN EARN LESS)', {
  mood: 'dark', Component: Bonds, beats: [...BEATS, ...ACC],
  sfx: [['s43:safe', 'click', 0.1], ['s43:government', 'pop', 0.08], ['s43:company', 'pop', 0.08], ['s43:arrive', 'coin', 0.1], ['s45:six', 'swish', 0.1], ['s45:shrank', 'softpop', 0.1], ['s46:rates', 'click', 0.1], ['s47:2021', 'tick', 0.08], ['s48:today', 'riser', 0.1], ['s48:six', 'coin', 0.1], ['s49:afford', 'thump', 0.08]] })
