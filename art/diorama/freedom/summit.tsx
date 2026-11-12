// ---------------------------------------------------------------- s78–s88: step five, cross the line, then the recap.
// A) Golden-hour summit: Maya breaks the finish ribbon; her pile (25 × spending) stands there and a 4% stream flows from it into her year's sack.
// B) Not "rich" in the usual sense (a yacht crossed); a balance: her money's earnings = her spending.
// C) Two life lines from age 25: saving 10% crosses in her mid seventies, saving half in her early forties.
// D) Work becomes optional: three doors — a job she loves (easel), part time (half a clock), stop (hammock). Flexible: in a bad year her sack shrinks a little and the hourglass lasts longer.
// E) Only about a third of non-retirees say they're on track (3 figures, 1 lit). Recap: the five signposts light up one by one along the road.
// F) Back in the dawn bedroom: Monday, the alarm rings, Maya smiles and points at a calendar: the countdown.
import React from 'react'
import { lerp, on, pop, span } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Person, win } from '../aimoney/common'
import { Alarm, Backdrop, C, Check, Cottage, Cross, Defs, FONT, Grain, Hourglass, Mini, Sack, Signpost, Tag, Tower, Trail, fadeIn, scene } from './kit'

const G = 930

const Summit: React.FC<PieceProps> = ({ f, c }) => {
  const crossing = c('s78:crossing'), line78 = c('s78:line')
  const day = c('s79:day'), reach = c('s79:reach'), twenty79 = c('s79:twenty'), four79 = c('s79:four'), covers = c('s79:covers'), whole = c('s79:whole')
  const rich80 = c('s80:rich'), usual = c('s80:usual'), earn80 = c('s80:earn'), spends80 = c('s80:spends')
  const starts = c('s81:starts'), twentyfive81 = c('s81:twenty'), ten81 = c('s81:ten'), crosses = c('s81:crosses'), seventies = c('s81:seventies'), half81 = c('s81:half'), forties = c('s81:forties')
  const optional = c('s82:optional'), job = c('s82:job'), loves = c('s82:loves'), part = c('s82:part'), stop82 = c('s82:stop')
  const flexible = c('s83:flexible'), less83 = c('s83:less'), bad = c('s83:bad'), last83 = c('s83:last'), longer = c('s83:longer')
  const third84 = c('s84:third'), retired = c('s84:retired'), track = c('s84:track')
  const know85 = c('s85:know'), five85 = c('s85:five')
  const find = c('s86:find'), build = c('s86:build'), clear = c('s86:clear'), widen = c('s86:widen'), work86 = c('s86:work')
  const monday = c('s87:monday'), alarm87 = c('s87:alarm'), exactly = c('s87:exactly'), far = c('s87:far'), last87 = c('s87:last')
  const advice = c('s88:advice'), money88 = c('s88:money')

  const AB = c('s80') - 6, BC = c('s81') - 6, CD = c('s82') - 6, DE = c('s83') - 6, EF = c('s84') - 6, FG = c('s85') - 6, GH = c('s87') - 6
  const A = scene(f, -20, AB), B = scene(f, AB, BC), Cc = scene(f, BC, CD), D = scene(f, CD, DE), E = scene(f, DE, EF), F = scene(f, EF, FG), Gs = scene(f, FG, GH), H = fadeIn(f, GH)

  // # C) the two life lines: age 25 → 76 (10%) and 25 → 42 (50%); x per year
  const AX = 300, YX = 22, age = (a: number) => AX + (a - 25) * YX

  return (
    <g>
      <Defs />
      {/* # A) the summit: break the ribbon; 4% of the pile covers the year */}
      {A > 0 && <g opacity={A}>
        <Backdrop sky="gold" f={f} sun={[1500, 560]} ground={G} />
        <g opacity={1 - on(f, day - 4, 10)}>
          <rect x={700} y={G - 420} width={14} height={420} fill="#5B4636" /><rect x={1206} y={G - 420} width={14} height={420} fill="#5B4636" />
          <path d={`M714 ${G - 380} Q 960 ${G - 360 + 60 * (1 - on(f, line78, 10))} 1206 ${G - 380}`} stroke={C.red} strokeWidth={14} fill="none" opacity={1 - on(f, line78 + 4, 6)} />
          {on(f, line78 + 4, 6) > 0 && <><path d={`M714 ${G - 380} q 60 ${120 * on(f, line78 + 4, 14)} 30 ${220 * on(f, line78 + 4, 14)}`} stroke={C.red} strokeWidth={14} fill="none" /><path d={`M1206 ${G - 380} q -60 ${120 * on(f, line78 + 4, 14)} -30 ${220 * on(f, line78 + 4, 14)}`} stroke={C.red} strokeWidth={14} fill="none" /></>}
          <Person f={f} who="investorF" beats={[[0, 'runA', 'smiling', 'runB', 8], [line78, 'celebrate', 'smiling']]} x={lerp(420, 960, span(f, crossing - 10, line78 + 4))} y={G} s={0.95} />
        </g>
        <g opacity={on(f, day - 4, 10)}>
          <Tower x={720} y={G} h={600} w={260} label={f >= twenty79 ? '25 × HER SPENDING' : undefined} />
          <path d={`M860 ${G - 520} C 1040 ${G - 560} 1160 ${G - 420} 1200 ${G - 260}`} fill="none" stroke={C.cash} strokeWidth={26} strokeLinecap="round" pathLength={1} strokeDasharray={`${on(f, four79, 20)} 1`} />
          <Tag x={1080} y={G - 620} text="4% A YEAR" size={46} o={on(f, four79, 8)} color={C.gold} point="none" />
          <Sack x={1220} y={G - 10} s={lerp(0.6, 1.3, on(f, covers, 20))} o={on(f, four79 + 6, 8)} />
          <Tag x={1220} y={G + 70} text="HER WHOLE YEAR" size={38} o={on(f, whole, 8)} point="none" />
          <Person f={f} who="investorF" beats={[[0, 'present', 'smiling'], [covers, 'celebrate', 'smiling']]} x={1560} y={G} s={0.9} flip />
        </g>
      </g>}

      {/* # B) not "rich" in the usual sense: earnings = spending */}
      {B > 0 && <g opacity={B}>
        <Backdrop sky="gold" f={f} sun={[1500, 560]} ground={G} />
        <g opacity={on(f, AB + 4, 8)} transform={`translate(560 ${G - 160})`}>
          <path d="M-260 40 L260 40 L200 120 L-200 120 Z" fill="#fff" /><path d="M-140 40 L-100 -40 L160 -40 L200 40 Z" fill="#E4ECF4" /><rect x={-60} y={-30} width={160} height={30} fill={C.skyD} opacity={0.6} />
          <path d="M-320 130 Q 0 160 320 130" stroke={C.skyD} strokeWidth={10} fill="none" />
          <Cross x={0} y={30} r={170} p={on(f, usual, 12)} />
        </g>
        <g opacity={on(f, c('s80:just') - 4, 10)} transform={`translate(1300 ${G})`}>
          <rect x={-10} y={-420} width={20} height={420} fill={C.woodD} /><rect x={-120} y={-20} width={240} height={20} rx={6} fill={C.woodD} />
          <g transform={`rotate(${8 * (1 - on(f, spends80, 16))} 0 -420)`}>
            <rect x={-300} y={-430} width={600} height={18} rx={8} fill={C.goldD} />
            <path d="M-260 -412 L-320 -300 L-200 -300 Z" fill="none" stroke={C.goldD} strokeWidth={4} /><ellipse cx={-260} cy={-300} rx={80} ry={16} fill={C.goldD} />
            <path d="M260 -412 L200 -300 L320 -300 Z" fill="none" stroke={C.goldD} strokeWidth={4} /><ellipse cx={260} cy={-300} rx={80} ry={16} fill={C.goldD} />
            <g transform="translate(-260 -300)"><Tag x={0} y={-120} text="WHAT IT EARNS" size={32} o={on(f, earn80, 8)} point="down" color={C.cashD} ink="#fff" /></g>
            <g transform="translate(260 -300)"><Sack x={0} y={0} s={0.55} o={on(f, spends80 - 4, 8)} /><Tag x={0} y={-130} text="WHAT SHE SPENDS" size={32} o={on(f, spends80, 8)} point="down" /></g>
            <g transform="translate(-260 -300)"><circle cx={0} cy={-30} r={34} fill="url(#fr-goldg)" /><circle cx={-30} cy={-14} r={26} fill="url(#fr-goldg)" /><circle cx={30} cy={-14} r={26} fill="url(#fr-goldg)" /></g>
          </g>
        </g>
      </g>}

      {/* # C) two life lines from age 25 */}
      {Cc > 0 && <g opacity={Cc}>
        <Backdrop sky="gold" f={f} sun={null} ground={G + 100} />
        {[[0, 76.4, '10%', 'MID SEVENTIES', ten81, seventies, C.terra], [1, 41.6, '50%', 'EARLY FORTIES', half81, forties, C.cashD]].map(([k, end, rate, label, at, said, col]) => {
          const y = 470 + (k as number) * 260, p = on(f, at as number, 30)
          return <g key={k as number} opacity={on(f, (at as number) - 6, 8)}>
            <rect x={AX - 180} y={y - 40} width={140} height={80} rx={16} fill={col as string} /><text x={AX - 110} y={y + 18} textAnchor="middle" fill="#fff" style={{ font: `400 52px ${FONT.big}` }}>{rate as string}</text>
            <rect x={AX} y={y - 16} width={(age(end as number) - AX) * p} height={32} rx={16} fill={col as string} opacity={0.85} />
            <circle cx={age(end as number)} cy={y} r={26} fill="#fff" stroke={col as string} strokeWidth={8} opacity={on(f, (k === 0 ? c('s81:crosses') : c('s81:there')) as number, 8)} />
            <Tag x={age(end as number)} y={y - 80} text={label as string} size={40} o={on(f, said as number, 8)} />
          </g> })}
        {[25, 35, 45, 55, 65, 75].map((a) => <g key={a} opacity={on(f, twentyfive81, 8)}><line x1={age(a)} y1={360} x2={age(a)} y2={860} stroke="#fff" strokeOpacity={0.35} strokeWidth={3} /><text x={age(a)} y={900} textAnchor="middle" fill={C.ink} style={{ font: `400 36px ${FONT.big}` }} opacity={a === 25 ? 1 : 0.6}>{a === 25 ? 'AGE 25' : ''}</text></g>)}
        <Tag x={AX} y={300} text="STARTS AT 25" size={40} o={on(f, starts, 8)} point="none" />
      </g>}

      {/* # D) work becomes optional: three paths */}
      {D > 0 && <g opacity={D}>
        <Backdrop sky="gold" f={f} sun={[1600, 300]} ground={G} />
        {[[job, 'A JOB SHE LOVES', 0], [part, 'PART TIME', 1], [stop82, 'OR STOP', 2]].map(([at, label, k]) => { const x = 460 + (k as number) * 500, o = on(f, (at as number) - 6, 10)
          return <g key={k as number} opacity={o} transform={`translate(0 ${-20 * (1 - pop(f, at as number, 14))})`}>
            {k === 0 && <g transform={`translate(${x} ${G})`}><path d="M-80 0 L-20 -300 L20 -300 L80 0" stroke={C.woodD} strokeWidth={14} fill="none" /><rect x={-110} y={-330} width={220} height={170} rx={8} fill="#fff" stroke={C.woodD} strokeWidth={6} /><path d="M-70 -200 q 40 -80 90 -40 t 70 -20" stroke={C.terra} strokeWidth={10} fill="none" /><circle cx={50} cy={-280} r={22} fill={C.sun} /><path d="M0 -150 c -30 -30 -60 0 -30 30 l30 30 l30 -30 c30 -30 0 -60 -30 -30 z" fill={C.red} opacity={on(f, loves, 8)} transform="translate(0 -230) scale(0.6)" /></g>}
            {k === 1 && <g transform={`translate(${x} ${G - 220})`}><circle r={150} fill={C.cream} stroke={C.ink} strokeWidth={10} /><path d="M0 0 L0 -150 A150 150 0 0 1 0 150 Z" fill={C.sky} opacity={0.8} /><line x1={0} y1={0} x2={0} y2={-110} stroke={C.ink} strokeWidth={10} strokeLinecap="round" /><circle r={12} fill={C.terra} /></g>}
            {k === 2 && <g transform={`translate(${x} ${G})`}><rect x={-200} y={-300} width={14} height={300} fill={C.woodD} /><rect x={186} y={-300} width={14} height={300} fill={C.woodD} /><path d="M-186 -240 Q 0 -100 186 -240" stroke={C.terra} strokeWidth={40} fill="none" /><path d="M-186 -240 Q 0 -120 186 -240" stroke="#fff" strokeWidth={6} fill="none" opacity={0.5} /></g>}
            <Tag x={x} y={G + 70} text={label as string} size={40} o={1} point="none" />
          </g> })}
      </g>}

      {/* # E) flexible: spend a little less in a bad year → it lasts longer */}
      {E > 0 && <g opacity={E}>
        <Backdrop sky={f >= bad ? 'rain' : 'gold'} f={f} sun={null} ground={G} />
        <Sack x={620} y={G - 10} s={lerp(1.3, 1.05, on(f, less83, 16))} />
        <Tag x={620} y={G + 70} text="A LITTLE LESS IN A BAD YEAR" size={36} o={on(f, less83, 8)} point="none" />
        <Hourglass x={1240} y={G - 20} sand={lerp(0.2, 0.55, span(f, flexible, longer + 30)) - 0.15 * on(f, longer, 16)} s={1.3} />
        <Tag x={1240} y={G - 470} text="LASTS EVEN LONGER" size={42} o={on(f, longer, 8)} color={C.cashD} ink="#fff" />
        <Person f={f} who="investorF" beats={[[0, 'think', 'thinking'], [less83, 'nodA', 'neutral', 'nodB', 12], [c('s83:makes'), 'point', 'neutral'], [longer, 'thumbsUp', 'smiling']]} x={300} y={G} s={0.85} />
      </g>}

      {/* # F) about a third say they're on track */}
      {F > 0 && <g opacity={F}>
        <Backdrop sky="gold" f={f} sun={[1600, 300]} ground={G} />
        {[0, 1, 2].map((k) => <g key={k} opacity={on(f, lerp(c('s84:today'), retired, k / 2), 8)}><Mini x={660 + k * 300} y={G} s={3.2} tone={k === 0 && f >= track ? 'gold' : 'grey'} />{k === 0 && <Check x={660} y={G - 330} r={46} p={on(f, track + 4, 8)} />}<g opacity={on(f, c('s84:say') + k * 4, 8)} transform={`translate(${720 + k * 300} ${G - 300})`}><ellipse rx={50} ry={34} fill={C.cream} /><path d="M-20 26 L-34 50 L0 30 Z" fill={C.cream} /><text y={14} textAnchor="middle" fill={C.ink} style={{ font: `400 40px ${FONT.big}` }}>{k === 0 && f >= track ? '✓' : '…'}</text></g></g>)}
        <Tag x={960} y={G + 70} text="ABOUT 1 IN 3 SAY THEY'RE ON TRACK" size={42} o={on(f, track, 8)} point="none" />
        <Tag x={960} y={300} text="NOT YET RETIRED" size={40} o={on(f, retired, 8)} point="none" />
      </g>}

      {/* # G) the recap: five signposts on the road */}
      {Gs > 0 && <g opacity={Gs}>
        <Backdrop sky="gold" f={f} sun={[1760, 520]} ground={G} />
        <Trail d={`M120 ${G + 60} C 600 ${G + 20} 900 ${G + 70} 1300 ${G + 30} S 1700 ${G - 10} 1820 ${G - 20}`} p={on(f, know85, 24)} w={44} />
        <Cottage x={1760} y={G - 20} s={0.75} lit={on(f, work86, 8)} />
        {([[find, 'YOUR NUMBER'], [build, 'A CUSHION'], [clear, 'NO COSTLY DEBT'], [widen, 'WIDEN THE GAP'], [work86, 'MONEY AT WORK']] as [number, string][]).map(([at, t], k) =>
          <g key={k} transform={`translate(0 ${-18 * (1 - pop(f, at, 14))})`}><Signpost x={250 + k * 330} y={G + 30 - k * 8} text={t} n={k + 1} o={on(f, (k === 0 ? five85 : at) - 4, 8)} lit={on(f, at, 6)} s={1.05} /></g>)}
      </g>}

      {/* # H) next Monday: the alarm, and a smile */}
      {H > 0 && <g opacity={H}>
        <rect width={1920} height={1080} fill="#E9C9B6" /><rect width={1920} height={1080} fill="url(#fr-gold)" opacity={0.3} />
        <rect x={0} y={G - 10} width={1920} height={160} fill="#A8765A" /><rect x={0} y={G - 10} width={1920} height={160} fill="url(#fr-plank)" />
        <g transform="translate(430 250)"><rect x={-14} y={-14} width={508} height={408} rx={12} fill="#F7EADF" /><rect width={480} height={380} rx={6} fill="url(#fr-gold)" /><circle cx={240} cy={300} r={60} fill="#FFE7A6" /><rect width={480} height={380} rx={6} fill="url(#fr-glass)" /><path d="M240 0 L240 380 M0 190 L480 190" stroke="#F7EADF" strokeWidth={12} /></g>
        <g transform={`translate(780 ${G})`}><rect x={-80} y={-140} width={160} height={140} rx={10} fill="url(#fr-woodg)" /></g>
        <Alarm x={780} y={G - 140} f={f} s={0.9} ring={win(f, alarm87 - 4, exactly, 6)} calm={on(f, exactly, 8)} />
        <Person f={f} who="investorF" beats={[[0, 'idle', 'neutral'], [alarm87, 'confident', 'smug'], [exactly, 'point', 'smiling'], [last87, 'relax', 'smiling']]} x={1120} y={G} s={1} />
        <g opacity={on(f, far - 6, 10)} transform="translate(1520 470)"><rect x={-150} y={-170} width={300} height={340} rx={16} fill="#fff" /><rect x={-150} y={-170} width={300} height={80} rx={16} fill={C.terra} /><text y={-112} textAnchor="middle" fill="#fff" style={{ font: `400 50px ${FONT.big}`, letterSpacing: 3 }}>COUNTDOWN</text>
          {Array.from({ length: 12 }, (_, k) => <rect key={k} x={-120 + (k % 4) * 64} y={-70 + Math.floor(k / 4) * 70} width={48} height={48} rx={8} fill={k < Math.floor(12 * on(f, last87, 20)) ? C.cash : '#EDE4D6'} />)}</g>
        <Tag x={960} y={1010} text="HOW THE MONEY WORKS · NOT FINANCIAL ADVICE" size={30} o={on(f, money88, 8)} point="none" />
      </g>}

      <Headline f={f} lines={[[crossing, 'STEP 5: CROSS THE LINE', C.ink, 100], [four79, '4% COVERS HER WHOLE YEAR', C.cashD, 96], [rich80, 'NOT "RICH". JUST COVERED', C.ink, 100], [starts, 'STARTING AT 25', C.ink, 104],
        [optional, 'WORK BECOMES OPTIONAL', C.terraD, 104], [flexible, 'STAY FLEXIBLE', C.ink, 104], [third84, 'ONLY ABOUT A THIRD ON TRACK', C.ink, 96], [know85, 'THE 5 STEPS', C.terraD, 110], [monday, 'NEXT MONDAY...', C.ink, 104]]} />
      <Grain />
    </g>
  )
}

const BEATS = ["s80:just", "s80:need", "s80:money", "s81:crosses", "s81:there", "s83:makes", "s84:today", "s84:say", "s84:savings", 's78:line', 's79:day', 's79:reach', 's79:twenty', 's79:four', 's79:covers', 's79:whole', 's80:rich', 's80:usual', 's80:earn', 's80:spends',
  's81:starts', 's81:twenty', 's81:ten', 's81:seventies', 's81:half', 's81:forties', 's82:optional', 's82:job', 's82:loves', 's82:part', 's82:stop', 's83:flexible', 's83:less', 's83:bad', 's83:longer',
  's84:third', 's84:retired', 's84:track', 's85:know', 's85:five', 's86:find', 's86:build', 's86:clear', 's86:widen', 's86:work', 's87:monday', 's87:alarm', 's87:exactly', 's87:far', 's87:last', 's88:money']
export const FR_SUMMIT = makePiece('fr-summit', 'Freedom step five: golden-hour finish, Maya runs through and breaks a red ribbon; her tower (25 × HER SPENDING) pours a 4% A YEAR stream into a growing sack (HER WHOLE YEAR); a yacht crossed, a balance levels WHAT IT EARNS against WHAT SHE SPENDS; two life lines from age 25: 10% reaches the MID SEVENTIES, 50% the EARLY FORTIES; three choices: an easel with a heart (A JOB SHE LOVES), a half-shaded clock (PART TIME), a hammock (OR STOP); a bad-year sack shrinks a little and the hourglass LASTS EVEN LONGER; three big figures, one gold and ticked (ABOUT 1 IN 3 SAY THEY\'RE ON TRACK); the golden road with five lit signposts (YOUR NUMBER, A CUSHION, NO COSTLY DEBT, WIDEN THE GAP, MONEY AT WORK); next Monday the alarm rings, Maya smiles at a COUNTDOWN calendar', {
  mood: 'light', Component: Summit, beats: BEATS,
  sfx: [['s78:line', 'chime', 0.22], ['s79:four', 'cash', 0.15], ['s80:usual', 'swish', 0.15], ['s81:forties', 'ding', 0.15], ['s82:stop', 'pop', 0.12], ['s84:track', 'pop', 0.12], ['s86:work', 'chime', 0.18], ['s87:alarm', 'ding', 0.2]] })
