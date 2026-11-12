// ---------------------------------------------------------------- s59–s73: cause two (rising costs) and cause three (expectations)
// A) An oil dock at dusk: a paper barrel tag $2.90 jumps to $11.65 — NEARLY 4x (s61); trucks, planes, plastics, fertiliser, heating hang off pipes from the barrel (s62);
//    back at the bread stall the flour sack doubles and the loaf tag rises with no extra money (s64); PRICES UP, ECONOMY WEAKER (s65).
// B) A hall of paper mirrors: a worker's thought bubble +5%? (s67), a shop owner's +5% tag (s68), the two arrows chase each other in a loop: WAGE-PRICE SPIRAL (s70);
//    a 1970s thermometer climbs to 12% in 1974, dips, then near 15% in 1980 (s71); THE HABIT (s72); the Fed watches WHAT YOU EXPECT (s73).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Arrow, Back, Barrel, C, Cut, Defs, Grain, Loaf, Tag, Thermo, big, box, fadeIn, scene } from './kit'

const G = 900
const Push: React.FC<PieceProps> = ({ f, c }) => {
  const side = c('s59:side'), expensive = c('s59:expensive'), cost = c('s60:cost'), oil = c('s61:oil'), quadrupled = c('s61:quadrupled'), ninety = c('s61:ninety'), eleven = c('s61:eleven')
  const trucks = c('s62:trucks'), planes = c('s62:planes'), plastics = c('s62:plastics'), fertiliser = c('s62:fertiliser'), heating = c('s62:heating'), jumps = c('s63:jumps')
  const flour = c('s64:flour'), twice = c('s64:twice'), raise = c('s64:raise'), nobody = c('s64:nobody'), painful = c('s65:painful'), weaker = c('s65:weaker')
  const heads = c('s66:heads'), expectations = c('s66:expectations'), believes = c('s67:believes'), workers = c('s67:workers'), raises = c('s67:raises'), businesses = c('s68:businesses'), own = c('s68:own')
  const belief = c('s69:belief'), spiral = c('s70:spiral'), stuck = c('s70:stuck'), y1974 = c('s71:1974'), twelve = c('s71:twelve'), dip = c('s71:dip'), fifteen = c('s71:fifteen')
  const learned = c('s72:learned'), habit = c('s72:habit'), care = c('s73:care'), expect = c('s73:expect')
  const AB = c('s66') - 6
  const A = scene(f, -20, AB), B = fadeIn(f, AB)
  const items = [[trucks, 'TRUCKS'], [planes, 'PLANES'], [plastics, 'PLASTICS'], [fertiliser, 'FERTILISER'], [heating, 'HEATING']] as [number, string][]
  const flourS = lerp(1, 1.6, on(f, twice - 2, 14))
  const th = f < dip ? 12.3 * on(f, twelve - 6, 24) : f < fifteen ? lerp(12.3, 6, on(f, dip, 14)) : lerp(6, 14.8, on(f, fifteen - 4, 20))
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.025] as [number, number, number, number]), 26)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <Back sky="dusk" f={f} sun={[1560, 520]} />
        <g opacity={1 - on(f, flour - 6, 8)}>
          <Tag x={960} y={300} text="IT COSTS MORE TO MAKE THINGS" size={48} color={C.mustard} o={on(f, expensive - 4, 8) * (1 - on(f, oil - 6, 8))} />
          <Tag x={960} y={300} text="COST PUSH INFLATION" size={56} color={C.coral} ink="#fff" o={win(f, cost - 2, oil - 2, 8)} />
          <Barrel x={520} y={G - 10} s={lerp(1.2, 1.8, on(f, quadrupled - 4, 16))} o={on(f, oil - 6, 8)} v={f >= eleven ? '$11.65' : '$2.90'} />
          <Tag x={520} y={300} text={f >= eleven ? 'JAN 1974: NEARLY 4x' : '1973: BEFORE THE EMBARGO'} size={44} color={f >= eleven ? C.coral : C.cream} ink={f >= eleven ? '#fff' : C.ink} o={on(f, c('s61:1973') - 2, 8)} />
          {items.map(([a, t], k) => <g key={k} opacity={pop(f, a - 2, 10)}><line x1={700} y1={G - 200} x2={1000 + (k % 2) * 380} y2={360 + k * 110} stroke={C.ink} strokeWidth={5} strokeDasharray="12 8" /><Tag x={1100 + (k % 2) * 380} y={360 + k * 110} text={t} size={40} color={[C.teal, C.sky, C.pink, C.green, C.mustard][k]} /></g>)}
          <Tag x={1300} y={G + 80} text="EVERYTHING COSTS MORE TO MAKE AND MOVE" size={38} color={C.coral} ink="#fff" o={on(f, jumps - 2, 8)} />
        </g>
        <g opacity={on(f, flour - 6, 8)}>
          <Back sky="warm" f={f} sun={[1660, 230]} />
          <g transform={`translate(560 ${G - 40}) scale(${flourS})`}><Cut d="M-90 0 Q-110 -170 -50 -210 H50 Q110 -170 90 0 Z" fill={C.cream} /><text y={-80} textAnchor="middle" fill={C.ink} style={big(50)}>FLOUR</text></g>
          <Tag x={560} y={300} text="FLOUR COSTS 2x" size={48} color={C.coral} ink="#fff" o={on(f, twice - 2, 8)} />
          <Loaf x={1260} y={G - 60} s={2.2} />
          <Tag x={1260} y={440} text={f >= raise ? '$1.40 A LOAF' : '$1.00 A LOAF'} size={52} color={f >= raise ? C.coral : C.mustard} ink={f >= raise ? '#fff' : C.ink} />
          <Tag x={1260} y={G + 80} text="NOBODY HAS MORE MONEY" size={40} o={on(f, nobody - 2, 8) * (1 - on(f, painful - 4, 8))} />
          <Tag x={960} y={G + 80} text="PRICES UP, ECONOMY WEAKER" size={48} color={C.ink} ink={C.cream} o={on(f, weaker - 4, 8)} />
        </g>
      </g>}
      {B > 0 && <g opacity={B}>
        <Back sky="night" f={f} sun={[1640, 220]} street={false} />
        <g opacity={1 - on(f, y1974 - 8, 8)}>
          {[0, 1, 2, 3].map((k) => <g key={k} opacity={0.6}><Cut d={box(180 + k * 420, 300, 300, 520, 150)} fill="#6C7AA0" shade={false} /><rect x={210 + k * 420} y={330} width={240} height={460} rx={120} fill="#8FA0C8" opacity={0.6} /></g>)}
          <Tag x={960} y={300} text="EXPECTATIONS" size={70} color={C.mustard} o={pop(f, expectations - 2, 12) * (1 - on(f, believes - 6, 8))} />
          <Person f={f} who="worker" beats={[[0, 'idle', 'thinking'], [workers, 'point', 'thinking'], [belief, 'shrug', 'neutral']]} x={560} y={G + 40} s={0.85} o={on(f, believes - 4, 8)} />
          <Tag x={560} y={330} text="PRICES +5%? I NEED +5% PAY" size={36} o={on(f, raises - 4, 8)} />
          <Person f={f} who="owner" beats={[[0, 'idle', 'neutral'], [businesses, 'present', 'neutral'], [belief, 'shrug', 'neutral']]} x={1360} y={G + 40} s={0.85} o={on(f, businesses - 4, 8)} />
          <Tag x={1360} y={330} text="WAGES +5%? PRICES +5%" size={36} color={C.coral} ink="#fff" o={on(f, own - 4, 8)} />
          <g opacity={on(f, spiral - 6, 8)} transform={`translate(960 560) rotate(${(f - spiral) * 3})`}>
            <path d="M-170 0 A170 170 0 0 1 170 0" fill="none" stroke={C.mustard} strokeWidth={22} /><path d="M150 -10 l40 30 l-60 10 Z" fill={C.mustard} />
            <path d="M170 0 A170 170 0 0 1 -170 0" fill="none" stroke={C.coral} strokeWidth={22} /><path d="M-150 10 l-40 -30 l60 -10 Z" fill={C.coral} />
          </g>
          <Tag x={960} y={830} text="THE WAGE-PRICE SPIRAL" size={52} color={C.mustard} o={on(f, spiral - 2, 8)} />
          <Tag x={960} y={960} text="THE BELIEF COMES TRUE" size={40} o={win(f, belief - 2, spiral - 4, 8)} />
        </g>
        <g opacity={on(f, y1974 - 8, 8)}>
          <Thermo x={760} y={800} v={th} max={16} ink={C.cream} label={f >= fifteen ? '1980: ~15%' : f >= dip ? 'A SHORT DIP' : '1974: ~12%'} />
          <Tag x={1360} y={420} text="THE 1970s" size={64} color={C.mustard} />
          <Tag x={1360} y={600} text="PEOPLE LEARNED TO EXPECT IT" size={40} o={on(f, learned - 2, 8)} />
          <Tag x={1360} y={720} text="HARDER TO BREAK THE HABIT" size={40} color={C.coral} ink="#fff" o={on(f, habit - 2, 8)} />
          <Tag x={1360} y={860} text="CENTRAL BANKS WATCH WHAT YOU EXPECT" size={36} color={C.teal} ink="#fff" o={on(f, expect - 4, 8)} />
        </g>
      </g>}
      <Headline f={f} lines={[[side, 'CAUSE TWO: RISING COSTS', C.ink, 100], [heads, 'CAUSE THREE: EXPECTATIONS', C.cream, 96], [y1974, 'STUCK IN THE 1970s', C.cream, 104]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s59:second","s59:money","s60:economists","s60:inflation","s61:classic","s61:oil#2","s61:barrel","s61:five","s62:into","s62:everything","s63:moving","s63:jumps#2","s64:our","s64:baker","s65:go","s65:time","s66:third","s67:percent","s68:wages","s68:too","s69:true","s70:loop","s70:part","s70:1970s","s71:us","s71:year","s71:higher","s71:1980","s72:each","s72:inflation","s72:took","s73:also","s73:not","s73:doing"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s61:1973', 's59:side', 's59:expensive', 's60:cost', 's61:oil', 's61:quadrupled', 's61:ninety', 's61:eleven', 's62:trucks', 's62:planes', 's62:plastics', 's62:fertiliser', 's62:heating', 's63:jumps', 's64:flour', 's64:twice', 's64:raise', 's64:nobody', 's65:painful', 's65:weaker', 's66:heads', 's66:expectations', 's67:believes', 's67:workers', 's67:raises', 's68:businesses', 's68:own', 's69:belief', 's70:spiral', 's70:stuck', 's71:1974', 's71:twelve', 's71:dip', 's71:fifteen', 's72:learned', 's72:habit', 's73:care', 's73:expect']
export const DD_PUSH = makePiece('dd-push', 'Causes two and three in paper-cut: an oil dock at dusk, a barrel tag $2.90 (1973: BEFORE THE EMBARGO) → $11.65 (JAN 1974: NEARLY 4x), dashed lines to TRUCKS, PLANES, PLASTICS, FERTILISER, HEATING (EVERYTHING COSTS MORE TO MAKE AND MOVE, COST PUSH INFLATION); a FLOUR sack doubles (FLOUR COSTS 2x), loaf $1.00 → $1.40, NOBODY HAS MORE MONEY, PRICES UP, ECONOMY WEAKER; a night hall of paper mirrors (EXPECTATIONS): a worker PRICES +5%? I NEED +5% PAY and an owner WAGES +5%? PRICES +5%, two arrows chasing in a circle (THE WAGE-PRICE SPIRAL, THE BELIEF COMES TRUE); a thermometer 1974: ~12%, A SHORT DIP, 1980: ~15% (THE 1970s, PEOPLE LEARNED TO EXPECT IT, HARDER TO BREAK THE HABIT, CENTRAL BANKS WATCH WHAT YOU EXPECT)', {
  mood: 'light', Component: Push, beats: [...BEATS, ...ACC],
  sfx: [['s61:oil', 'thud', 0.1], ['s61:eleven', 'impact', 0.12], ['s62:trucks', 'pop', 0.07], ['s62:planes', 'pop', 0.07], ['s62:plastics', 'pop', 0.07], ['s62:fertiliser', 'pop', 0.07], ['s62:heating', 'pop', 0.07], ['s64:twice', 'pop', 0.1], ['s64:raise', 'ding', 0.08], ['s66:expectations', 'chime', 0.1], ['s70:spiral', 'whoosh', 0.1], ['s71:twelve', 'riser', 0.08], ['s71:fifteen', 'impact', 0.1]] })
