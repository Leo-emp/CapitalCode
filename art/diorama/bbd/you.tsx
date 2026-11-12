// ---------------------------------------------------------------- s71–s78: what it means for the rest of us — the step-up applies to anyone who inherits
// shares or a house, but not to traditional retirement accounts like a 401k (taxed on the way out); an unsold gain is untaxed and keeps growing at any size;
// the difference is the starting point — cheap loans against growing shares vs a paycheck taxed first; all legal; same rules, different lives; never selling
import React from 'react'
import { lerp, on, P, span, Stage, Vignette, Pedestal } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { type Beat, camera, fly, Headline, Person, Prop as Prop0, Stamp, win } from '../aimoney/common'
// # catalog props draw small at their nominal size; this story shows them big (owner r37: few objects, big)
const Prop: typeof Prop0 = (p) => <Prop0 {...p} size={p.size * 1.6} />
import { At, Cert, FlipTag, Paycheck, Stack, Tag , Accents, xcam, punch, type Acc } from './kit'

// # every cue that drives a drawing (the plan gate counts them; each one also punches the frame in)
const BEATS: string[] = ['s78:money', 's75a:all', 's77:rich', 's71:rest', 's72:part', 's72:everyone', 's78:system', 's72:stepup', 's72:shares', 's72:house', 's73:retirement', 's73:401k', 's73:taxed', 's73:out', 's74:size', "s74:don't", 's74:taxed', 's74:growing',
    's75:starting', 's75:rich', 's75:loans', 's75:most', 's75:paycheck', 's75:taxed', 's75a:legal', 's76:same', 's76:different', 's77:hiding', 's77:never', 's77:sell', 's78:advice', 's78:subscribe']
const You: React.FC<PieceProps> = ({ f, c }) => {
  const part = c('s72:part'), system = c('s78:system'), rest = c('s71:rest'), everyone = c('s72:everyone'), stepup = c('s72:stepup'), shares = c('s72:shares'), house = c('s72:house')
  const retire = c('s73:retirement'), k401 = c('s73:401k'), taxed73 = c('s73:taxed'), out = c('s73:out')
  const size = c('s74:size'), dont = c("s74:don't"), taxed74 = c('s74:taxed'), growing = c('s74:growing')
  const starting = c('s75:starting'), rich = c('s75:rich'), loans = c('s75:loans'), most = c('s75:most'), paycheck = c('s75:paycheck'), taxed75 = c('s75:taxed'), legal = c('s75a:legal')
  const same = c('s76:same'), different = c('s76:different'), hiding = c('s77:hiding'), never = c('s77:never'), sell = c('s77:sell'), advice = c('s78:advice'), subscribe = c('s78:subscribe')
  const A = win(f, c('s71'), size), B = win(f, size, starting), Cc = win(f, starting, hiding), D = on(f, hiding, 8)
  const hero: Beat[] = [[0, 'present', 'smiling'], [everyone, 'explain', 'neutral'], [stepup, 'pointUp', 'smiling'], [retire, 'stop', 'neutral'], [out, 'explain', 'neutral'],
    [size, 'present', 'neutral'], [growing, 'celebrate', 'smiling'], [starting, 'explain', 'neutral'], [rich, 'point', 'neutral'], [most, 'point', 'neutral'], [legal, 'confident', 'neutral'],
    [same, 'weighA', 'thinking', 'weighB', 30], [hiding, 'shrug', 'neutral'], [never, 'pointUp', 'smug'], [advice, 'stop', 'neutral'], [subscribe, 'thumbsUp', 'smiling']]
  const outT = span(f, out, out + 18)
  const XC = xcam(c, [["s78:money",1520,760,1.06],["s75a:all",1330,620,1.05]])
  const XA: Acc[] = [["s77:rich","crown",1300,420,100,"s78:advice"]]
  return (
    <g>
      <Stage id="by" frame={f} />
      <Headline f={f} lines={[[rest, 'THE REST OF US', P.ink, 130], [stepup, 'THE STEP-UP: EVERYONE', P.goldInk, 112], [k401, 'NOT A 401K', P.coralInk, 130], [size, 'ANY SIZE', P.mintInk, 136],
        [starting, 'DIFFERENT STARTING POINTS', P.ink, 104], [legal, 'ALL LEGAL', P.ink, 136], [same, 'SAME RULES', P.ink, 136], [different, 'DIFFERENT LIVES', P.goldInk, 136], [never, 'THEY NEVER SELL', P.goldInk, 136]]} />
      <g transform={punch(f, BEATS.map(c))}><g transform={camera(f, [...XC, [rest, 1240, 600, 1.03], [size, 960, 540, 1], [starting, 960, 540, 1], [hiding, 1240, 620, 1.04]])}>
        {/* # A: a family; inherited shares and a house both get a new starting price; a 401k piggy bank does not — money coming out is taxed */}
        <g opacity={A}>
          <g opacity={1 - on(f, retire, 8)}>
            <At f={f} at={rest} x={1000} y={900}><Prop id="family" x={0} y={0} size={240} f={f} /></At>
            <At f={f} at={shares} x={1380} y={760}><Cert x={0} y={0} /></At>
            <At f={f} at={house} x={1700} y={780}><Prop id="house" x={0} y={0} size={220} f={f} /></At>
            <g opacity={on(f, stepup, 6)}><FlipTag x={1540} y={480} a="OLD PRICE" b="NEW START" t={span(f, shares, shares + 14)} s={0.8} /></g>
            <At f={f} at={part} x={1380} y={480} o={1 - on(f, shares, 6)}><Prop id="key" x={0} y={0} size={130} f={f} /></At>
            <At f={f} at={everyone} x={1000} y={640}><Prop id="tick" x={0} y={0} size={90} f={f} /></At>
          </g>
          <g opacity={on(f, retire, 6)}>
            <At f={f} at={retire} x={1180} y={720}><Prop id="piggy-bank" x={0} y={0} size={260} f={f} /></At>
            <Person f={f} who="worker" beats={[[0, 'idle', 'smiling'], [k401, 'holdChest', 'smiling'], [out, 'receive', 'neutral'], [taxed73, 'facepalm', 'worried']]} x={1770} y={1040} s={0.7} o={on(f, retire, 8)} />
            <Tag f={f} at={k401} x={1180} y={990} text="401K" size={64} />
            <At f={f} at={k401} x={1180} y={460}><Prop id="cross" x={0} y={0} size={100} f={f} /></At>
            {[0, 1, 2].map((k) => { const p = fly(f, out + k * 6, [1260, 700], [1640, 780], 18, 90); return p.o > 0 ? <g key={k} opacity={p.o} transform={`translate(${p.x} ${p.y})`}><Prop id="coin" x={0} y={0} size={60} f={f} /></g> : null })}
            <g opacity={on(f, taxed73, 6)}><At f={f} at={taxed73} x={1560} y={640}><Prop id="tax-form" x={0} y={0} size={160} f={f} /></At></g>
            <g opacity={outT} transform="translate(1660 900)"><Tag f={f} at={out} x={0} y={0} text="TAXED ON THE WAY OUT" size={44} color={P.coralInk} /></g>
          </g>
        </g>
        {/* # B: any size — a small seedling in a pot grows into a money tree while a padlock keeps it unsold; no tax yet */}
        <g opacity={B}>
          <g transform={`translate(1280 980) scale(${lerp(0.45, 1.2, span(f, growing, growing + 40))})`}><Prop id="money-tree" x={0} y={-160} size={320} f={f} /></g>
          <At f={f} at={dont} x={1640} y={720}><Prop id="padlock" x={0} y={0} size={120} f={f} /></At>
          <Stamp x={1640} y={900} text="NO TAX YET" f={f} at={taxed74} size={52} color={P.mintInk} />
        </g>
        {/* # C: split — the rich investor on a tall stack, a bank handing cash; a worker with a paycheck whose tax slice is cut first; a gavel and tick (legal);
            # same rules (one scale in the middle), different lives */}
        <g opacity={Cc}>
          <g opacity={on(f, rich, 6)}>
            <Pedestal x={1060} y={1000} r={150} /><Stack x={1060} y={990} n={on(f, rich, 20) * 12} s={0.8} />
            <Person f={f} who="investor" beats={[[0, 'idle', 'smiling'], [loans, 'receive', 'smiling'], [different, 'confident', 'smug']]} x={1060} y={1000 - 12 * 26 * 0.8 - 30} s={0.75} />
            <At f={f} at={loans} x={880} y={560}><Prop id="bank" x={0} y={0} size={130} f={f} /></At>
          </g>
          <g opacity={on(f, most, 6)}>
            <Pedestal x={1600} y={1000} r={150} />
            <Person f={f} who="worker" beats={[[0, 'idle', 'neutral'], [taxed75, 'shock', 'worried'], [different, 'slump', 'neutral']]} x={1600} y={1000} s={0.9} />
            <At f={f} at={paycheck} x={1560} y={400} s={0.6}><Paycheck x={0} y={0} cut={span(f, taxed75, taxed75 + 16)} /></At>
          </g>
          <At f={f} at={legal} x={1330} y={520}><Prop id="gavel" x={0} y={0} size={130} f={f} /></At>
          <At f={f} at={same} x={1330} y={760}><Prop id="scale-balance" x={0} y={0} size={160} f={f} /></At>
        </g>
        {/* # D: not a hidden treasure chest (crossed) — a locked stack that is never sold, glowing; a small "not tax advice" note; thumbs up */}
        <g opacity={D}>
          <At f={f} at={hiding} x={1060} y={720}><Prop id="treasure-chest" x={0} y={0} size={200} f={f} /><path d="M-110 -110 L110 110" stroke={P.coral} strokeWidth={16} strokeLinecap="round" opacity={on(f, hiding + 10, 6)} /></At>
          <g opacity={on(f, never, 6)}><circle cx={1520} cy={760} r={230} fill={P.gold} opacity={0.12 + 0.05 * Math.sin(f / 8)} /><Stack x={1520} y={980} n={12} basis={1} /></g>
          <At f={f} at={sell} x={1520} y={520}><Prop id="padlock" x={0} y={0} size={130} f={f} /></At>
          <At f={f} at={system} x={1060} y={420}><Prop id="bank" x={0} y={0} size={110} f={f} /></At>
          <Tag f={f} at={advice} x={1300} y={1000} text="NOT TAX ADVICE" size={44} color={P.ink2} />
        </g>
        <Accents f={f} c={c} list={XA} Prop={Prop} />
        <Person f={f} who="hero" beats={hero} x={320} y={1190} s={1.4} life={2} />
      </g></g>
      <Vignette id="by" />
    </g>
  )
}

export const BB_YOU = makePiece('bb-you', 'Long: the step-up applies to anyone who inherits shares or a house (not a 401k); unsold gains untaxed at any size; loans vs taxed paychecks; legal; never selling', { mood: 'light', Component: You,
  beats: BEATS,
  sfx: [['s72:stepup', 'chime', 0.4], ['s73:401k', 'thud', 0.4], ['s74:growing', 'flutter', 0.4], ['s75a:legal', 'click', 0.4], ['s77:never', 'impact', 0.5]] })
