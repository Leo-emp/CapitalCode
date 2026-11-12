// ---------------------------------------------------------------- s1–s8: the hook
// A) Paper grocery street: your basket lands with a $120 tag (s1); next year the tag flips to $123.60 while the same eggs, bread and coffee pop (s2);
//    a shopper shrugs THAT'S JUST LIFE (s3); your paper dollar shrinks beside the basket: the basket didn't change, the dollar got weaker (s4);
//    three little dollars: EARN, SAVE, OWE (s5).
// B) Your $10,000 of cash in paper bundles; a calendar counts 10 YEARS; the pile shrinks to what $7,400 buys today (s6);
//    seven paper icons light for the promise (s7); the inflation thermometer rises: LET'S GO (s8).
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { camera } from '../aimoney/common'
import { Back, Basket, C, Calendar, Cash, Defs, Dollar, Grain, Shop, Tag, Thermo, big, fadeIn, scene } from './kit'

const G = 900
const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const shop = c('s1:shop'), hundred = c('s1:hundred'), next = c('s2:next'), cost = c('s2:cost'), eggs = c('s2:eggs'), bread = c('s2:bread'), coffee = c('s2:coffee')
  const thinking = c('s3:thinking'), life = c('s3:life'), groceries = c('s4:groceries'), valuable = c('s4:valuable'), weaker = c('s4:weaker')
  const earn = c('s5:earn'), save = c('s5:save'), owe = c('s5:owe')
  const ten = c('s6:ten'), cash = c('s6:cash'), years = c('s6:years'), seven = c('s6:seven')
  const P = [c('s7:really'), c('s7:measured'), c('s7:three'), c('s7:purpose'), c('s7:spirals'), c('s7:fight'), c('s7:wins')], econ = c('s8:economists'), go = c('s8:go')
  const AB = c('s6') - 6
  const A = scene(f, -20, AB), B = fadeIn(f, AB)
  const pw = lerp(1, 0.55, on(f, weaker - 4, 20))
  return (
    <g transform={camera(f, ACC.map((k, i) => [c(k), 960, 540, i % 2 ? 1 : 1.025] as [number, number, number, number]), 26)}>
      <Defs />
      {A > 0 && <g opacity={A}>
        <Back sky="day" f={f} />
        <Shop x={1500} y={G} s={0.9} o={on(f, shop - 10, 10)} />
        <g transform={`translate(0 ${lerp(-500, 0, on(f, shop, 16))})`}><Basket x={720} y={G - 20} s={1.4} tag={f >= cost ? '$123.60' : '$120'} tagCol={f >= cost ? C.coral : C.cream} o={on(f, hundred - 30, 8)} /></g>
        {([[eggs, 'EGGS'], [bread, 'BREAD'], [coffee, 'COFFEE']] as [number, string][]).map(([a, t], k) => <Tag key={k} x={420 + k * 300} y={330} text={t} size={36} o={win(f, a - 2, thinking, 8)} rot={[-4, 2, -3][k]} />)}
        <Tag x={720} y={260} text="SAME BASKET, NEXT YEAR" size={40} color={C.mustard} o={win(f, next - 2, eggs - 2, 8)} />
        <Person f={f} who="buyer" beats={[[0, 'idle', 'neutral'], [thinking, 'shrug', 'neutral'], [weaker, 'oops', 'shocked']]} x={240} y={G + 20} s={0.85} o={on(f, thinking - 6, 8)} />
        <Tag x={300} y={330} text="THAT'S JUST LIFE" size={40} o={win(f, life - 2, groceries, 8)} />
        <g opacity={on(f, groceries - 4, 8)}>
          <Tag x={720} y={300} text="BASKET: SAME" size={40} color={C.teal} ink="#fff" o={win(f, valuable - 2, earn, 8)} />
          <Dollar x={1160} y={560} s={1.2} power={pw} />
          <Tag x={1160} y={380} text="YOUR DOLLAR: WEAKER" size={40} color={C.coral} ink="#fff" o={on(f, weaker, 8) * (1 - on(f, earn - 4, 6))} />
        </g>
        {([[earn, 'EARN'], [save, 'SAVE'], [owe, 'OWE']] as [number, string][]).map(([a, t], k) => <g key={k} opacity={pop(f, a - 2, 10)}><Dollar x={900 + k * 260} y={330} s={0.6} power={0.8} /><Tag x={900 + k * 260} y={430} text={t} size={36} /></g>)}
      </g>}
      {B > 0 && <g opacity={B}>
        <Back sky="warm" f={f} sun={[1620, 240]} />
        <g opacity={1 - on(f, P[0] - 6, 8)}>
          <Cash x={620} y={G - 30} n={lerp(14, 10.4, on(f, seven - 4, 24))} s={1.3} o={on(f, ten - 4, 8)} />
          <Tag x={620} y={300} text={f >= seven ? 'BUYS WHAT $7,400 BUYS TODAY' : '$10,000 IN CASH'} size={44} color={f >= seven ? C.coral : C.cream} ink={f >= seven ? '#fff' : C.ink} o={on(f, cash - 2, 8)} />
          <Calendar x={1260} y={560} s={1.4} text={`YEAR ${Math.max(1, Math.round(lerp(1, 10, span(f, years - 20, years + 10))))}`} o={on(f, years - 20, 8)} />
          <Tag x={1260} y={760} text="3% INFLATION" size={40} color={C.mustard} o={on(f, years - 10, 8)} />
        </g>
        {['WHAT IT IS', 'HOW IT\'S MEASURED', '3 CAUSES', 'ON PURPOSE', 'SPIRALS', 'THE FIGHT', 'WINNERS + LOSERS'].map((t, i) => { const o = pop(f, P[i] - 2, 10); return o > 0.01 && <g key={i} opacity={o * (1 - on(f, econ - 6, 8))} transform={`translate(${260 + i * 235} ${450 + (i % 2) * 150})`}>
          <circle r={104} fill={[C.coral, C.teal, C.mustard, C.pink, C.plum, C.sky, C.green][i]} filter="url(#dd-shadow)" /><circle r={104} fill="url(#dd-dots)" />
          <text y={14} textAnchor="middle" fill={C.ink} style={big(i === 1 || i === 6 ? 32 : 42)}>{t}</text></g> })}
        <g opacity={on(f, econ - 6, 8)}>
          <Thermo x={960} y={760} v={lerp(0, 9, on(f, econ, 30))} s={1} label="" />
          <Tag x={1300} y={500} text="LET'S GO" size={60} color={C.mustard} o={on(f, go - 2, 8)} />
        </g>
      </g>}
      <Headline f={f} lines={[[next, 'SAME BAGS, MORE DOLLARS', C.ink, 100], [weaker, 'YOUR DOLLARS GOT WEAKER', C.ink, 100], [ten, 'YOUR CASH IS MELTING', C.ink, 100], [P[0], 'THE DEEP DIVE', C.ink, 108]]} />
      <Grain />
    </g>
  )
}
const ACC = ["s1:say","s2:exact","s2:dollars","s2:cents","s3:prices","s4:going","s5:happening","s6:percent","s6:only","s6:buys#2","s7:together","s7:going","s7:cause","s7:control","s7:loses","s8:end"]  // # accent words: a gentle camera push on each (fills >2 s gaps)
const BEATS = ['s1:shop', 's1:hundred', 's2:next', 's2:cost', 's2:eggs', 's2:bread', 's2:coffee', 's3:thinking', 's3:life', 's4:groceries', 's4:valuable', 's4:weaker', 's5:earn', 's5:save', 's5:owe', 's6:ten', 's6:cash', 's6:years', 's6:seven', 's7:really', 's7:measured', 's7:three', 's7:purpose', 's7:spirals', 's7:fight', 's7:wins', 's8:economists', 's8:go']
export const DD_HOOK = makePiece('dd-hook', 'Inflation deep-dive hook in a paper-cut risograph street: a wicker basket drops with a $120 price tag that flips to $123.60 (SAME BASKET, NEXT YEAR; EGGS, BREAD, COFFEE tags), a shopper shrugs THAT\'S JUST LIFE, a paper banknote shrinks (YOUR DOLLAR: WEAKER) next to BASKET: SAME, three small dollars EARN / SAVE / OWE; $10,000 IN CASH bundles shrink as a calendar counts YEAR 1→10 at 3% INFLATION (BUYS WHAT $7,400 BUYS TODAY); seven paper discs WHAT IT IS, HOW IT\'S MEASURED, 3 CAUSES, ON PURPOSE, SPIRALS, THE FIGHT, WINNERS + LOSERS; a paper thermometer rises, LET\'S GO', {
  mood: 'light', Component: Hook, beats: [...BEATS, ...ACC],
  sfx: [['s1:hundred', 'pop', 0.1], ['s2:cost', 'ding', 0.1], ['s4:weaker', 'swish', 0.12], ['s5:earn', 'pop', 0.08], ['s5:save', 'pop', 0.08], ['s5:owe', 'pop', 0.08], ['s6:ten', 'cash', 0.1], ['s6:seven', 'thud', 0.1], ['s7:really', 'pop', 0.07], ['s7:measured', 'pop', 0.07], ['s7:three', 'pop', 0.07], ['s7:purpose', 'pop', 0.07], ['s7:spirals', 'pop', 0.07], ['s7:fight', 'pop', 0.07], ['s7:wins', 'pop', 0.07], ['s8:go', 'riser', 0.1]] })
