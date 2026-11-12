// ---------------------------------------------------------------- s1–s7: the personal hook (owner rule r81).
// A) Maya's bedroom at dawn: the alarm rings, she slumps; "imagine" — the clock goes calm, a cash stack pays three bills (PAID), the boss in the doorway gets a "no".
// B) The wall opens onto a sunrise hill: Maya celebrates "freedom"; a mansion (rich parents) and a lottery ticket are each crossed.
// C) Three adults; one of them (more than one in three) holds a $400 bill and an empty wallet.
// D) Maya wonders; a SALARY envelope appears and is crossed; then the road: $400 post on the left, five signposts, the WORK OPTIONAL cottage at the end.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, fly, win, type Beat } from '../aimoney/common'
import { Alarm, Backdrop, C, Cottage, Cross, Defs, Envelope, FONT, Grain, Signpost, Stack, Tag, Trail, Check, fadeIn, scene } from './kit'

const G = 930

// # the bedroom: dawn wall, a big window onto the city, bed, nightstand, door on the right
const Bedroom: React.FC<{ f: number; door: number }> = ({ f, door }) => (
  <g>
    <rect width={1920} height={1080} fill="#E9C9B6" />
    <rect width={1920} height={1080} fill="url(#fr-dawn)" opacity={0.25} />
    <rect x={0} y={G - 10} width={1920} height={160} fill="#A8765A" /><rect x={0} y={G - 10} width={1920} height={160} fill="url(#fr-plank)" />
    <rect x={0} y={G - 26} width={1920} height={18} fill="#F4E2D2" />
    {/* # window */}
    <g transform="translate(430 250)">
      <rect x={-14} y={-14} width={508} height={408} rx={12} fill="#F7EADF" />
      <rect x={0} y={0} width={480} height={380} rx={6} fill="url(#fr-dawn)" />
      <circle cx={330} cy={300} r={150} fill="url(#fr-sunglow)" opacity={0.9} /><circle cx={330} cy={300} r={44} fill="#FFE7A6" />
      {[[20, 210, 70], [100, 160, 60], [170, 230, 80], [260, 190, 50], [320, 250, 90], [400, 200, 64]].map(([x, h, w], k) =>
        <g key={k}><rect x={x} y={380 - h} width={w} height={h} fill="#6E5A7E" />{Array.from({ length: 6 }, (_, j) => <rect key={j} x={x + 10 + (j % 2) * (w / 2 - 6)} y={380 - h + 18 + Math.floor(j / 2) * 40} width={12} height={16} fill="#FFD9A0" opacity={((k + j + Math.floor(f / 50)) % 3) ? 0.8 : 0.2} />)}</g>)}
      <rect x={0} y={0} width={480} height={380} rx={6} fill="url(#fr-glass)" />
      <path d="M240 0 L240 380 M0 190 L480 190" stroke="#F7EADF" strokeWidth={12} />
      <rect x={-40} y={-30} width={80} height={440} rx={10} fill={C.terra} opacity={0.85} /><rect x={440} y={-30} width={80} height={440} rx={10} fill={C.terra} opacity={0.85} />
    </g>
    {/* # bed with a soft blanket and pillow */}
    <g transform={`translate(120 ${G})`}>
      <rect x={0} y={-230} width={30} height={230} rx={8} fill="url(#fr-woodg)" />
      <rect x={10} y={-130} width={560} height={90} rx={20} fill="#F4F0EA" />
      <path d="M20 -128 Q300 -170 570 -128 L570 -50 L20 -50 Z" fill={C.sky} /><path d="M20 -128 Q300 -170 570 -128 L570 -110 Q300 -150 20 -110 Z" fill="#fff" opacity={0.25} />
      <rect x={40} y={-170} width={150} height={56} rx={26} fill="#FFFFFF" />
      <rect x={10} y={-50} width={560} height={40} rx={8} fill="url(#fr-woodg)" />
    </g>
    {/* # nightstand */}
    <g transform={`translate(780 ${G})`}><rect x={-80} y={-140} width={160} height={140} rx={10} fill="url(#fr-woodg)" /><rect x={-64} y={-96} width={128} height={10} rx={4} fill="#000" opacity={0.15} /><circle cx={0} cy={-56} r={8} fill={C.gold} /></g>
    {/* # door on the right (swings open on "boss") */}
    <g transform={`translate(1560 ${G})`}>
      <rect x={0} y={-520} width={260} height={520} fill="#6B4A44" />
      <rect x={-16} y={-536} width={292} height={20} rx={6} fill="#F4E2D2" />
      <path d={`M0 -520 L${260 - 200 * door} ${-520 + 40 * door} L${260 - 200 * door} ${-40 * door} L0 0 Z`} fill="#C99A78" />
    </g>
  </g>
)

const Hook: React.FC<PieceProps> = ({ f, c }) => {
  const alarm = c('s1:alarm'), off = c('s1:off'), anything = c('s1:anything'), hour = c('s1:hour')
  const imagine = c('s2:imagine'), never = c('s2:never'), ring = c('s2:ring'), money = c('s2:money'), pays = c('s2:pays'), bills = c('s2:bills'), boss = c('s2:boss')
  const freedom = c('s3:freedom'), rich = c('s3:rich'), parents = c('s3:parents'), lottery = c('s3:lottery'), ticket = c('s3:ticket')
  const three = c('s4:three'), adults = c('s4:adults'), surprise4 = c('s4:surprise'), bill4 = c('s4:bill'), cash4 = c('s4:cash'), savings4 = c('s4:savings')
  const thinking = c('s5:thinking'), me = c('s5:me')
  const surprise6 = c('s6:surprise'), fast = c('s6:fast'), salary = c('s6:salary')
  const step7 = c('s7:step'), emergency = c('s7:emergency'), life = c('s7:life'), optional = c('s7:optional'), five = c('s7:five'), steps7 = c('s7:steps')

  const AB = c('s3') - 6, BC = c('s4') - 6, CD = c('s5') - 6, DE = c('s7') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = fadeIn(f, DE)

  // # A) bills fly from the stack to the window ledge and get PAID ticks
  const billT = [0, 1, 2].map((k) => lerp(pays, bills + 4, k / 2))
  const mayaA: Beat[] = [[0, 'slump', 'worried'], [alarm, 'shock', 'shocked'], [anything, 'facepalm', 'worried'], [c('s1:hour'), 'slump', 'worried'], [imagine, 'lookFar', 'thinking'], [never, 'relief', 'smiling'], [c('s2:again'), 'relax', 'smiling'], [money, 'present', 'smiling'], [boss, 'crossNoA', 'smug', 'crossNoB', 10]]

  // # D/E) the walk along the road
  const walkX = lerp(250, 420, span(f, step7, emergency + 20))

  return (
    <g>
      <Defs />

      {/* # A) bedroom */}
      {A > 0 && <g opacity={A}>
        <Bedroom f={f} door={on(f, boss - 12, 12)} />
        <Alarm x={780} y={G - 140} f={f} s={0.9} ring={win(f, alarm - 4, never, 6)} calm={on(f, never, 8)} />
        <Person f={f} who="investorF" beats={mayaA} x={1120} y={G} s={1} />
        <Tag x={1120} y={G - 470} text="MAYA" o={win(f, imagine, money, 8)} size={40} />
        {/* # the money pays the bills */}
        <g opacity={win(f, money - 4, boss - 4, 8)}>
          <Stack x={1390} y={G} n={4 * on(f, money, 14)} s={0.9} />
          {billT.map((t0, k) => { const fl = fly(f, t0, [1390, G - 200], [1240 + 0 * k, 330 + 150 * k], 18, 120)
            return f >= t0 ? <g key={k} transform={`translate(${fl.x} ${fl.y})`} opacity={fl.o}><Envelope x={0} y={0} s={0.62} text={['RENT', 'FOOD', 'POWER'][k]} /><Check x={74} y={-40} r={28} p={on(f, t0 + 18, 8)} /></g> : null })}
        </g>
        <g opacity={win(f, boss - 10, AB, 8)}>
          <Person f={f} who="owner" beats={[[0, 'armsCrossed', 'angry'], [boss + 10, 'shrug', 'worried']]} x={1690} y={G} s={0.95} flip />
          <Cross x={1690} y={G - 300} r={110} p={on(f, boss + 6, 12)} />
        </g>
      </g>}

      {/* # B) the wall opens: sunrise hill, not rich parents, not a lottery ticket */}
      {B > 0 && <g opacity={B}>
        <Backdrop sky="dawn" f={f} sun={[960, 640]} ground={G} />
        <Person f={f} who="investorF" beats={[[0, 'lookFar', 'smiling'], [freedom, 'celebrate', 'smiling'], [c('s3:no'), 'stop', 'smug'], [rich, 'crossNoA', 'smug', 'crossNoB', 10], [ticket + 6, 'confident', 'smiling']]} x={960} y={G} s={1} />
        <g opacity={on(f, rich - 4, 10)}>
          <g transform={`translate(470 ${G})`}><Cottage x={0} y={0} s={1.05} /><rect x={-150} y={-300} width={300} height={0} /></g>
          <Tag x={470} y={G - 380} text="RICH PARENTS" size={38} o={on(f, parents, 8)} />
          <Cross x={470} y={G - 150} r={130} p={on(f, parents + 4, 12)} />
        </g>
        <g opacity={on(f, lottery - 4, 10)}>
          <g transform={`translate(1450 ${G - 200}) rotate(-8)`}>
            <rect x={-170} y={-80} width={340} height={160} rx={14} fill={C.gold} stroke={C.goldD} strokeWidth={5} />
            <path d="M-170 -20 a20 20 0 0 1 0 40 M170 -20 a20 20 0 0 0 0 40" fill={C.cream} />
            <text y={-12} textAnchor="middle" fill={C.ink} style={{ font: `400 52px ${FONT.big}`, letterSpacing: 3 }}>LOTTERY</text>
            {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={-100 + k * 50} cy={42} r={18} fill={C.cream} />)}
          </g>
          <Cross x={1450} y={G - 200} r={140} p={on(f, ticket + 2, 12)} />
        </g>
      </g>}

      {/* # C) three adults; one can't pay a surprise $400 with cash or savings */}
      {Cc > 0 && <g opacity={Cc}>
        <Backdrop sky="day" f={f} sun={null} ground={G} />
        {(['buyer', 'worker', 'investor'] as const).map((who, k) => {
          const hit = k === 2
          return <g key={who} opacity={on(f, lerp(c('s4:right'), adults, k / 2), 10)}>
            <Person f={f} who={who} beats={hit ? [[0, 'idle', 'neutral'], [surprise4, 'shock', 'shocked'], [cash4, 'emptyPockets', 'worried']] : [[0, 'idle', 'neutral'], [surprise4, 'idle', 'thinking']]} x={560 + k * 400} y={G} s={0.95} flip={k === 2} />
          </g>
        })}
        <g opacity={on(f, bill4, 10)} transform={`translate(1360 ${G - 560 + 30 * (1 - pop(f, bill4, 14))})`}>
          <rect x={-120} y={-70} width={240} height={140} rx={12} fill="#fff" stroke={C.red} strokeWidth={6} />
          <text y={10} textAnchor="middle" fill={C.red} style={{ font: `400 70px ${FONT.big}` }}>$400</text>
          <text y={52} textAnchor="middle" fill={C.inkSoft} style={{ font: `400 28px ${FONT.big}`, letterSpacing: 2 }}>CAR REPAIR</text>
        </g>
        <Tag x={960} y={1010} text={f >= savings4 ? "CAN'T COVER IT WITH CASH OR SAVINGS" : 'MORE THAN 1 IN 3 ADULTS'} size={42} o={on(f, three, 8)} point="none" color={f >= savings4 ? C.red : C.cream} ink={f >= savings4 ? '#fff' : C.ink} />
      </g>}

      {/* # D) Maya wonders; it's not the salary */}
      {D > 0 && <g opacity={D}>
        <Backdrop sky="day" f={f} sun={[1600, 300]} ground={G} />
        <Person f={f} who="investorF" beats={[[0, 'think', 'thinking'], [c('s5:okay'), 'shrug', 'thinking'], [c('s5:someone'), 'holdChest', 'thinking'], [me, 'scratchHead', 'thinking'], [c('s6:really'), 'think', 'thinking'], [surprise6, 'pointUp', 'smiling'], [salary, 'crossNoA', 'smug', 'crossNoB', 10]]} x={760} y={G} s={1.05} />
        <g opacity={on(f, fast - 4, 10)}><Alarm x={1180} y={G - 560} f={f} s={0.7} calm={1} /><text x={1180} y={G - 690} textAnchor="middle" fill={C.ink} style={{ font: `400 48px ${FONT.big}` }}>HOW FAST?</text></g>
        <g opacity={on(f, salary - 6, 10)}><Envelope x={1300} y={G - 200} s={1.3} text="SALARY" /><Cross x={1300} y={G - 200} r={150} p={on(f, salary + 6, 12)} /></g>
      </g>}

      {/* # E) the road: $400 emergency → five steps → work optional */}
      {E > 0 && <g opacity={E}>
        <Backdrop sky="gold" f={f} sun={[1720, 520]} ground={G} />
        <Trail d={`M140 ${G + 60} C 600 ${G + 20} 900 ${G + 70} 1300 ${G + 30} S 1700 ${G - 10} 1800 ${G - 20}`} p={on(f, step7, 30)} w={44} />
        <g opacity={on(f, emergency - 6, 10)}><rect x={186} y={G - 180} width={12} height={180} fill="#5B4636" /><g transform={`translate(192 ${G - 210})`}><rect x={-90} y={-46} width={180} height={92} rx={10} fill="#fff" stroke={C.red} strokeWidth={5} /><text y={18} textAnchor="middle" fill={C.red} style={{ font: `400 52px ${FONT.big}` }}>$400</text></g></g>
        <Person f={f} who="investorF" beats={[[0, 'walkA', 'smiling', 'walkB', 14], [optional, 'pointUp', 'smiling'], [c('s7:okay'), 'thumbsUp', 'smiling']]} x={walkX} y={G + 40} s={0.8} />
        <g opacity={on(f, life - 6, 12)}><Cottage x={1720} y={G - 10} s={0.9} lit={on(f, optional, 8)} /><Tag x={1720} y={G - 330} text="WORK OPTIONAL" size={42} o={on(f, optional, 8)} color={C.cream} /></g>
        {[0, 1, 2, 3, 4].map((k) => { const at = lerp(five, steps7 + 6, k / 4)
          return <g key={k} transform={`translate(0 ${-20 * (1 - pop(f, at, 14))})`}><Signpost x={640 + k * 225} y={G + 30 - k * 8} text={'STEP ' + (k + 1)} o={on(f, at, 8)} lit={win(f, at, at + 20, 4)} s={0.95} /></g> })}
      </g>}
      <Headline f={f} lines={[[c('s1:monday'), 'MONDAY MORNING', C.ink, 100], [imagine, 'WHAT IF IT NEVER RANG AGAIN?', C.ink, 92], [freedom, 'FINANCIAL FREEDOM', C.terraD, 110], [bill4, 'A SURPRISE $400 BILL', C.ink, 100],
        [thinking, 'HOW WOULD I EVER GET THERE?', C.ink, 96], [salary, "IT'S NOT YOUR SALARY", C.terraD, 104], [step7, 'STEP BY STEP', C.ink, 104], [five, '5 STEPS', C.terraD, 120]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s1:hour", "s2:again", "s3:no", "s4:right", "s4:more", "s5:okay", "s5:someone", "s6:really", "s7:okay", 's1:alarm', 's1:anything', 's2:imagine', 's2:never', 's2:money', 's2:pays', 's2:bills', 's2:boss', 's3:freedom', 's3:rich', 's3:parents', 's3:lottery', 's3:ticket',
  's4:three', 's4:adults', 's4:surprise', 's4:bill', 's4:cash', 's4:savings', 's5:thinking', 's5:me', 's6:surprise', 's6:fast', 's6:salary', 's7:step', 's7:emergency', 's7:life', 's7:optional', 's7:five', 's7:steps']
export const FR_HOOK = makePiece('fr-hook', 'Freedom hook: Maya\'s dawn bedroom, alarm rings, she slumps; imagine: clock calms, a cash stack pays RENT/FOOD/POWER envelopes (ticks), the boss in the doorway gets a no; sunrise hill, she celebrates FINANCIAL FREEDOM, rich-parents house and lottery ticket crossed; three adults, one with a $400 bill and empty pockets (more than 1 in 3); Maya wonders, HOW FAST? clock, SALARY envelope crossed; a golden road from a $400 post past five numbered signposts to a WORK OPTIONAL cottage', {
  mood: 'light', Component: Hook, beats: BEATS,
  sfx: [['s1:alarm', 'ding', 0.25], ['s2:bills', 'cash', 0.18], ['s3:freedom', 'chime', 0.2], ['s4:bill', 'thud', 0.2], ['s6:salary', 'swish', 0.18], ['s7:five', 'pop', 0.18]] })
