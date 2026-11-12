// ---------------------------------------------------------------- s70–s74: the whole picture (the greenhouse at dusk).
// One glass box with Jordan's plants in the middle; each line lights one part of it:
// 1) the box and the plants inside (a box with tax rules; inside: your investments);
// 2) a WORK badge and an IRA key beside it, with the limit bar and the MATCH coin (who gives it to you);
// 3) a NOW | LATER tax switch on the door (traditional or Roth);
// 4) the red strings and the 59½ / 73 tags (the rules are the price of the break);
// then the enrollment form from the hook comes back, filled in and ticked: WHO PAYS THE TAX — AND WHEN.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, type Beat } from '../aimoney/common'
import { BB, Box, Coin, Form, GreenRoom, Label, Plant, R } from './kit'

const G = 920

const Whole: React.FC<PieceProps> = ({ f, c }) => {
  const retirement70 = c('s70:retirement'), box70 = c('s70:box'), tax70 = c('s70:tax'), rules70 = c('s70:rules'), inside70 = c('s70:inside'), investments70 = c('s70:investments'), only70 = c('s70:only'), changes70 = c('s70:changes')
  const gives71 = c('s71:gives'), decides71 = c('s71:decides'), limits71 = c('s71:limits'), whether71 = c('s71:whether'), match71 = c('s71:match')
  const traditional72 = c('s72:traditional'), roth72 = c('s72:roth'), decides72 = c('s72:decides'), pay72 = c('s72:pay'), now72 = c('s72:now'), later72 = c('s72:later')
  const rules73 = c('s73:rules'), taking73 = c('s73:taking'), price73 = c('s73:price'), break73 = c('s73:break')
  const form74 = c('s74:form'), work74 = c('s74:work'), alphabet74 = c('s74:alphabet'), anymore74 = c('s74:anymore'), choice74 = c('s74:choice'), who74 = c('s74:who'), pays74 = c('s74:pays'), when74 = c('s74:when')

  const END = form74 - 6, fin = on(f, END, 14)
  const jBeats: Beat[] = [[0, 'explain', 'smiling'], [inside70, 'point', 'neutral'], [gives71, 'present', 'smiling'], [traditional72, 'weighA', 'thinking', 'weighB', 18], [rules73, 'explain', 'neutral'], [form74, 'holdUp', 'smiling'], [choice74, 'point', 'smiling'], [when74, 'thumbsUp', 'smiling']]
  const sw = f < later72 ? on(f, now72, 10) * 0 : on(f, later72, 10)

  return (
    <g>
      <GreenRoom id="rt-w" f={f} mood="dusk" floor={G} />
      <Person f={f} who="investor" beats={jBeats} x={300} y={G + 10} s={0.95} />
      <g opacity={1 - fin}>
        <g opacity={0.45 + 0.55 * on(f, retirement70, 12)}>
          <Box x={1100} y={G} s={1.15} glow={on(f, box70, 10)} door="out">
            <g opacity={on(f, inside70 - 4, 10)}><Plant x={-80} y={-30} s={1} grow={0.85} f={f} /><Plant x={100} y={-30} s={0.85} grow={0.6} f={f} leaves={R.leafL} /></g>
          </Box>
          <g opacity={on(f, tax70, 8) * (1 - on(f, gives71, 8))}><Label x={1100} y={G + 60} text={f >= investments70 ? 'INSIDE: YOUR INVESTMENTS' : 'A BOX WITH TAX RULES'} size={40} /></g>
          <g opacity={on(f, only70, 8) * (1 - on(f, gives71, 8))}><Label x={1100} y={250} text={f >= changes70 ? 'THE BOX ONLY CHANGES THE TAX' : 'THE BOX…'} size={46} fill={R.paper} /></g>
        </g>
        {/* who gives it to you */}
        <g opacity={on(f, gives71 - 4, 10)}>
          <g transform="translate(660 520)"><rect x={-110} y={-50} width={220} height={100} rx={16} fill={R.slate} /><text y={16} textAnchor="middle" fill={R.paper} style={BB(46)}>WORK</text></g>
          <g transform="translate(660 660)" opacity={on(f, decides71, 8)}><circle cx={-50} r={34} fill="none" stroke={R.brass} strokeWidth={12} /><rect x={-20} y={-8} width={110} height={16} fill={R.brass} /><Label x={20} y={70} text="OR YOU (IRA)" size={32} /></g>
          <g opacity={on(f, limits71, 8)}><rect x={830} y={G - 470} width={540} height={14} rx={7} fill={R.red} /><Label x={1100} y={G - 500} text="LIMITS" size={34} fill={R.red} ink={R.paper} /></g>
          <g opacity={on(f, match71, 8)}><Coin x={1480} y={G - 360 - 10 * pop(f, match71, 12)} s={1.2} text="MATCH" /></g>
        </g>
        {/* when you pay the tax */}
        <g opacity={on(f, traditional72 - 4, 10)} transform="translate(1100 300)">
          <rect x={-200} y={-50} width={400} height={100} rx={50} fill={R.ink} />
          <rect x={-192 + 196 * sw} y={-42} width={188} height={84} rx={42} fill={sw > 0.5 ? R.grey : R.gold} />
          <text x={-98} y={16} textAnchor="middle" fill={R.paper} style={BB(44)}>NOW</text><text x={98} y={16} textAnchor="middle" fill={R.paper} style={BB(44)}>LATER</text>
          <Label x={0} y={110} text={f >= decides72 ? 'ROTH OR TRADITIONAL: WHEN YOU PAY' : 'TRADITIONAL OR ROTH'} size={34} o={on(f, roth72, 8)} />
        </g>
        {/* the rules: the price */}
        <g opacity={on(f, rules73 - 4, 10)}>
          {[-1, 1].map((k) => <path key={k} d={`M${1100 + k * 260} ${G - 20} Q${1100 + k * 130} ${G - 330} 1100 ${G - 510}`} fill="none" stroke={R.red} strokeWidth={9} />)}
          <g opacity={on(f, taking73, 8)}><Label x={1520} y={G - 200} text="59½ · 73" size={40} fill={R.red} ink={R.paper} /></g>
          <g opacity={on(f, price73, 8)}><Label x={1100} y={G + 60} text={f >= break73 ? 'THE PRICE OF THE TAX BREAK' : 'THE RULES'} size={40} /></g>
        </g>
      </g>
      {/* the form from the hook, filled in */}
      <g opacity={fin}>
        <Form x={1100} y={500 - 10 * pop(f, form74, 14)} s={1.15} r={-2} pct="6%" checks={f >= choice74 ? [0, 1, 2] : f >= anymore74 ? [0] : []} />
        <g opacity={on(f, alphabet74, 8) * (1 - on(f, who74, 8))}><Label x={1100} y={G + 40} text="NOT ALPHABET SOUP ANYMORE" size={44} /></g>
        <g opacity={on(f, who74, 8)}><Label x={1100} y={G + 40} text={f >= when74 ? 'WHO PAYS THE TAX — AND WHEN' : 'WHO PAYS THE TAX…'} size={50} fill={R.forest} ink={R.paper} /></g>
      </g>
      <Headline f={f} lines={[[retirement70, 'THE WHOLE PICTURE', R.paper, 100], [gives71, 'WHO GIVES YOU THE BOX', R.paper, 96], [traditional72, 'WHEN YOU PAY THE TAX', R.paper, 96], [rules73, 'THE PRICE OF THE BREAK', R.paper, 96], [form74, 'THAT FORM AT WORK', R.paper, 100]]} />
    </g>
  )
}

export const RT_WHOLE = makePiece('rt-whole', "The whole picture: the greenhouse at dusk; one glass box with Jordan's plants inside lights up (a box with tax rules, inside your investments, the box only changes the tax); a WORK badge and an IRA key appear beside it with a red limit bar and a gold MATCH coin (who gives you the box); a NOW | LATER switch flips (traditional or Roth decides when you pay); red strings and a 59 and a half / 73 tag tie the box (the price of the tax break); then the enrollment form from the hook returns, filled in at 6 percent and ticked: not alphabet soup anymore, who pays the tax and when", {
  mood: 'dark', Component: Whole,
  beats: ["s70:retirement", "s70:box", "s70:tax", "s70:inside", "s70:investments", "s70:only", "s70:changes", "s71:gives", "s71:decides", "s71:limits", "s71:match", "s72:traditional", "s72:roth", "s72:decides", "s72:now", "s72:later", "s73:rules", "s73:taking", "s73:price", "s73:break", "s74:form", "s74:alphabet", "s74:anymore", "s74:choice", "s74:who", "s74:when"],
  sfx: [['s72:later', 'click', 0.1], ['s74:when', 'chime', 0.12]] })
