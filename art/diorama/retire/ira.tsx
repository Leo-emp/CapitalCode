// ---------------------------------------------------------------- s29–s36: step three, the IRA (a street of bank and brokerage kiosks).
// A) Jordan walks up to a kiosk (BANK OR BROKERAGE) and opens a glass box of their own: IRA.
// B) No employer (the boss figure is crossed); anyone with income from work (three workers' paychecks); a limit bar:
//    2026: $7,500, and $8,600 from age 50.
// C) Choice: a long shelf of many different potted plants (an IRA) next to a short shelf of three (a work plan).
// D) The box rides in a moving van from one kiosk to another; then a gold MATCH coin is crossed (nobody adds money).
// E) Both boxes side by side, 401(K) and IRA; a TAX BREAK coin shrinks as a pay bar passes $81,000;
//    then a big question: WHEN DO YOU PAY THE TAX?
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win, type Beat } from '../aimoney/common'
import { BB, Box, Check, Coin, Label, No, Plant, R, Street, Van } from './kit'

const G = 920

const Kiosk: React.FC<{ x: number; o?: number; name: string; c?: string }> = ({ x, o = 1, name, c = R.forest }) => (
  <g transform={`translate(${x} ${G})`} opacity={o}>
    <ellipse cy={6} rx={200} ry={12} fill="#000" opacity={0.12} />
    <rect x={-170} y={-380} width={340} height={380} fill={R.cream} /><path d="M-200 -380 L200 -380 L180 -440 L-180 -440 Z" fill={c} />
    <rect x={-130} y={-320} width={260} height={150} rx={10} fill={R.sky} /><rect x={-50} y={-160} width={100} height={160} rx={8} fill={R.wood} />
    <text y={-400} textAnchor="middle" fill={R.paper} style={BB(36)}>{name}</text>
  </g>
)

const Ira: React.FC<PieceProps> = ({ f, c }) => {
  const short29 = c('s29:short'), individual29 = c('s29:individual'), box29 = c('s29:box'), open29 = c('s29:open'), yourself29 = c('s29:yourself'), bank29 = c('s29:bank'), brokerage29 = c('s29:brokerage')
  const no30 = c('s30:no'), employer30 = c('s30:employer'), involved30 = c('s30:involved'), anyone30 = c('s30:anyone'), income30 = c('s30:income'), work30 = c('s30:work'), n7500 = c('s30:7500'), y2026 = c('s30:2026'), n8600 = c('s30:8600'), age30 = c('s30:age')
  const open31 = c('s31:open'), pick31 = c('s31:pick'), wider31 = c('s31:wider'), range31 = c('s31:range'), investments31 = c('s31:investments'), work31 = c('s31:work'), plan31 = c('s31:plan')
  const locked32 = c('s32:locked'), company32 = c('s32:company'), move32 = c('s32:move'), different32 = c('s32:different'), later32 = c('s32:later')
  const dont33 = c("s33:don't"), match33 = c('s33:match'), nobody33 = c('s33:nobody'), extra33 = c('s33:extra'), ira33 = c('s33:ira')
  const have34 = c('s34:have'), k401 = c('s34:401k'), ira34 = c('s34:ira'), same34 = c('s34:same'), time34 = c('s34:time')
  const upfront35 = c('s35:upfront'), tax35 = c('s35:tax'), break35 = c('s35:break'), traditional35 = c('s35:traditional'), shrinking35 = c('s35:shrinking'), single35 = c('s35:single'), earning35 = c('s35:earning'), n81k = c('s35:81000')
  const know36 = c('s36:know'), hands36 = c('s36:hands'), bigger36 = c('s36:bigger'), choice36 = c('s36:choice'), second36 = c('s36:second'), when36 = c('s36:when'), pay36 = c('s36:pay'), tax36 = c('s36:tax')

  const AB = no30 - 4, BC = open31 - 4, CD = locked32 - 4, DE = have34 - 4
  const A = win(f, 0, AB), B = win(f, AB - 8, BC), Cc = win(f, BC - 8, CD), D = win(f, CD - 8, DE), E = on(f, DE - 8, 10)
  const walk = span(f, short29, open29 + 10)
  const jA: Beat[] = [[0, 'walkA', 'smiling', 'walkB', 14], [open29, 'reachDown', 'smiling'], [yourself29, 'present', 'smiling'], [brokerage29, 'point', 'neutral']]
  const bar = span(f, income30, n7500 + 10)
  const van = span(f, move32, later32 + 20)
  const pay = span(f, single35, n81k + 10)

  return (
    <g>
      <Street id="rt-i" f={f} floor={G} />
      {/* # A) opening your own box */}
      {A > 0 && <g opacity={A}>
        <Kiosk x={1350} name="BANK OR BROKERAGE" o={on(f, bank29 - 8, 10) * 0.6 + 0.4} />
        <Person f={f} who="investor" beats={jA} x={lerp(300, 900, walk)} y={G + 10} s={0.95} />
        <g opacity={on(f, box29 - 4, 10)}><Box x={1350} y={G + 6} s={0.75 + 0.1 * on(f, open29, 12)} tag="IRA" tagColor={R.gold} door="in" /></g>
        <g opacity={on(f, individual29, 8)}><Label x={960} y={260} text="INDIVIDUAL RETIREMENT ACCOUNT" size={48} /></g>
        <g opacity={on(f, yourself29, 8)}><Label x={1350} y={G + 60} text="ONE YOU OPEN YOURSELF" size={38} /></g>
      </g>}
      {/* # B) no employer; anyone with income; the limit */}
      {B > 0 && <g opacity={B}>
        <g opacity={on(f, employer30 - 4, 8) * (1 - on(f, anyone30, 8))}><Person f={f} who="owner" beats={[[AB, 'idle', 'neutral']]} x={560} y={G + 10} s={0.85} /><No x={560} y={G - 220} r={150} o={on(f, involved30, 8)} /></g>
        <g opacity={on(f, anyone30 - 4, 10)}>{[0, 1, 2].map((k) => <g key={k} opacity={on(f, anyone30 + k * 3, 8)}>
          <Person f={f} who={['worker', 'investorF', 'buyer'][k]} beats={[[anyone30, 'holdUp', 'smiling']]} x={300 + k * 200} y={G + 10} s={0.75} />
          <Check x={300 + k * 200} y={G - 460} s={0.4} amount="PAY" o={on(f, income30, 8)} /></g>)}
          <g opacity={on(f, work30, 8)}><Label x={500} y={G + 60} text="ANYONE WITH INCOME FROM WORK" size={36} /></g>
        </g>
        <g opacity={on(f, n7500 - 10, 10)} transform={`translate(1400 ${G})`}>
          <Box x={0} y={0} s={0.9} tag="IRA" tagColor={R.gold}>{Array.from({ length: Math.round(12 * bar) }, (_, k) => <ellipse key={k} cx={0} cy={-50 - k * 16} rx={80} ry={14} fill={R.leaf} stroke={R.forestD} strokeWidth={3} />)}</Box>
          <rect x={-230} y={-280} width={460} height={16} rx={8} fill={R.red} opacity={on(f, n7500, 8)} />
          <Label x={0} y={-310} text={f >= y2026 ? '2026: $7,500' : '$7,500'} size={40} fill={R.red} ink={R.paper} o={on(f, n7500, 8)} />
          <Label x={0} y={60} text={f >= age30 ? '$8,600 FROM AGE 50' : ''} size={36} o={on(f, n8600, 8)} />
        </g>
      </g>}
      {/* # C) more choice */}
      {Cc > 0 && <g opacity={Cc}>
        <Person f={f} who="investor" beats={[[BC, 'explain', 'smiling'], [pick31, 'point', 'smiling'], [wider31, 'celebrate', 'smiling'], [plan31, 'shrug', 'neutral']]} x={300} y={G + 10} s={0.95} />
        <g opacity={on(f, pick31 - 4, 10)}>
          <rect x={560} y={G - 230} width={1200} height={22} rx={8} fill={R.wood} />
          {Array.from({ length: 10 }, (_, k) => <g key={k} opacity={on(f, wider31 + k * 2, 6)}><Plant x={620 + k * 120} y={G - 230} s={0.5} grow={0.3 + 0.6 * ((k * 37) % 10) / 10} f={f + k * 10} leaves={[R.gold, R.leafL, R.pot, R.sky][k % 4]} /></g>)}
          <Label x={1160} y={G - 190} text={f >= range31 ? 'IRA: A WIDE RANGE' : 'YOU PICK'} size={38} />
        </g>
        <g opacity={on(f, work31, 10)}>
          <rect x={860} y={G - 30} width={420} height={22} rx={8} fill={R.woodD} />
          {[0, 1, 2].map((k) => <Plant key={k} x={940 + k * 130} y={G - 30} s={0.45} grow={0.5} f={f} />)}
          <Label x={1070} y={G + 40} text="A WORK PLAN'S MENU" size={34} />
        </g>
      </g>}
      {/* # D) the box can move; and no match */}
      {D > 0 && <g opacity={D}>
        <Kiosk x={420} name="BANK A" c={R.slate} /><Kiosk x={1560} name="BROKERAGE B" c={R.pot} />
        <g transform={`translate(${lerp(560, 1340, van)} 0)`}><Van x={0} y={G} s={0.95} f={f * (van > 0 && van < 1 ? 1 : 0)} /><Box x={-65} y={G - 236} s={0.32} tag="IRA" /></g>
        <g opacity={on(f, locked32, 8) * (1 - on(f, dont33, 8))}><Label x={960} y={300} text={f >= move32 ? 'YOU CAN MOVE IT LATER' : 'NOT LOCKED TO ONE COMPANY'} size={46} /></g>
        <g opacity={on(f, match33 - 4, 10)}><Coin x={960} y={480 - 10 * pop(f, match33, 12) - 10 * pop(f, ira33, 12)} s={2.2} text="MATCH" /><No x={960} y={480} r={120} o={on(f, nobody33, 8)} /></g>
        <g opacity={on(f, extra33, 8)}><Label x={960} y={300} text="NOBODY ADDS EXTRA MONEY" size={46} fill={R.red} ink={R.paper} /></g>
      </g>}
      {/* # E) both boxes; the tax break shrinks above $81,000; the question */}
      {E > 0 && <g opacity={E}>
        <Person f={f} who="investor" beats={[[DE, 'present', 'smiling'], [k401, 'point', 'neutral'], [ira34, 'point', 'neutral'], [shrinking35, 'nervous', 'worried'], [know36, 'explain', 'smiling'], [when36, 'think', 'thinking']]} x={280} y={G + 10} s={0.95} />
        <g opacity={on(f, k401 - 4, 10) * (1 - on(f, bigger36, 10))}><Box x={700} y={G} s={0.75} tag="401(K)" tagColor={R.gold} /></g>
        <g opacity={on(f, ira34 - 4, 10) * (1 - on(f, bigger36, 10))}><Box x={1050} y={G} s={0.75} tag="IRA" tagColor={R.gold} /></g>
        <g opacity={on(f, same34, 8) * (1 - on(f, upfront35, 8))}><Label x={875} y={G + 60} text={f >= time34 ? 'BOTH AT THE SAME TIME' : 'BOTH?'} size={40} fill={R.forest} ink={R.paper} /></g>
        <g opacity={on(f, upfront35, 10) * (1 - on(f, bigger36, 10))}>
          <Coin x={1450} y={420} s={2.2 * (1 - 0.6 * on(f, shrinking35, 20))} text="BREAK" />
          <g opacity={on(f, traditional35, 8)}><Label x={1450} y={250} text="TRADITIONAL IRA TAX BREAK" size={38} /></g>
          <g transform={`translate(1200 ${G - 60})`} opacity={on(f, single35, 8)}><rect width={500} height={40} rx={20} fill={R.cream} stroke={R.ink} strokeOpacity={0.2} /><rect width={500 * pay} height={40} rx={20} fill={R.slate} />
            <rect x={310} y={-20} width={6} height={80} fill={R.red} /><text x={313} y={-30} textAnchor="middle" fill={R.red} style={BB(34)}>$81,000</text>
            <text x={250} y={90} textAnchor="middle" fill={R.ink} style={BB(32)}>{f >= earning35 ? 'SINGLE, WITH A WORK PLAN' : 'PAY'}</text></g>
        </g>
        <g opacity={on(f, bigger36 - 4, 10)} transform={`translate(1100 ${420 - 10 * pop(f, when36, 12)}) scale(${1 + 0.05 * pop(f, pay36, 12) + 0.05 * pop(f, tax36, 12)})`}>
          <rect x={-360} y={-90} width={720} height={180} rx={28} fill={R.grey} /><text y={-10} textAnchor="middle" fill={R.paper} style={BB(46)}>{f >= second36 ? 'QUESTION 2' : 'THE BIGGER CHOICE'}</text>
          <text y={56} textAnchor="middle" fill={R.paper} style={BB(56)}>{f >= when36 ? 'WHEN DO YOU PAY THE TAX?' : ''}</text>
        </g>
        <g opacity={on(f, hands36, 8) * (1 - on(f, bigger36, 8))}><Label x={1100} y={300} text="WHO HANDS YOU THE BOX: DONE" size={42} fill={R.forest} ink={R.paper} /></g>
      </g>}
      <Headline f={f} lines={[[short29, 'STEP 3: THE IRA', R.ink, 100], [no30, 'NO EMPLOYER NEEDED', R.ink, 96], [open31, 'MORE CHOICE', R.ink, 100], [locked32, 'IT CAN MOVE, NO MATCH', R.ink, 96], [have34, 'BOTH AT ONCE', R.ink, 100]]} />
    </g>
  )
}

export const RT_IRA = makePiece('rt-ira', "Step three, the IRA: on a street of kiosks Jordan walks to a bank or brokerage and opens a glass box of their own labelled IRA (individual retirement account); the boss is crossed (no employer), three workers hold up paychecks (anyone with income from work) and a coin stack in the IRA box rises to a red bar (2026: 7,500 dollars, 8,600 from age 50); a long shelf of many different potted plants (a wide range of investments) above a short shelf of three (a work plan's menu); a moving van carries the IRA box from Bank A to Brokerage B; a big gold MATCH coin is crossed (nobody adds extra money); a 401(K) box and an IRA box side by side (both at the same time); a TAX BREAK coin shrinks as a pay bar passes 81,000 dollars (single, with a work plan); a grey sign asks question 2: when do you pay the tax?", {
  mood: 'light', Component: Ira,
  beats: ["s29:short", "s29:individual", "s29:box", "s29:open", "s29:yourself", "s29:bank", "s29:brokerage", "s30:no", "s30:employer", "s30:involved", "s30:anyone", "s30:income", "s30:work", "s30:7500", "s30:2026", "s30:8600", "s30:age", "s31:open", "s31:pick", "s31:wider", "s31:range", "s31:work", "s31:plan", "s32:locked", "s32:move", "s32:later", "s33:don't", "s33:match", "s33:nobody", "s33:extra", "s33:ira", "s34:have", "s34:401k", "s34:ira", "s34:same", "s34:time", "s35:upfront", "s35:traditional", "s35:shrinking", "s35:single", "s35:earning", "s35:81000", "s36:know", "s36:hands", "s36:bigger", "s36:second", "s36:when", "s36:pay", "s36:tax"],
  sfx: [['s30:7500', 'tick', 0.1], ['s32:move', 'whoosh', 0.1], ['s33:nobody', 'thud', 0.1]] })
