// ---------------------------------------------------------------- s59–s72: step four, was it a crash? (mountain night)
// A) A moonlit mountain trail down from a PEAK flag to a -10% CORRECTION flag and a -20% BEAR MARKET flag by a cave.
//    Easy numbers: 100 at the peak, 90, 80. Two hikers: NASDAQ slides to the -10% flag; S&P 500 stops ≈6% down on
//    Friday and climbs back to ≈3% down after Monday. Stamp: NOT A WHOLE-MARKET CRASH.
// B) January 2025: a DeepSeek chip lands; a line plunges -17% (-$589 BILLION, a record), then climbs to a summit flag:
//    FIRST $5 TRILLION COMPANY (Oct 2025).
// C) Fog: nobody knows what's next. A storm passes over Mia, who holds an umbrella; PANIC SELLING locks in a loss
//    (a padlock on a red coin); a wide basket of many company coins (one bad industry hurts less); a SAFE box for money
//    needed soon.
import React from 'react'
import { lerp, on, pop, span, Stage, Vignette } from '../kit'
import { makePiece, type PieceProps } from '../registry'
import { Headline, Label, Person, Stamp, win, type Beat } from '../aimoney/common'
import { AMBER, DayCard, Floor, NEON, RED, Ridge, Sky, StormCloud, Umbrella } from './kit'

const K = {
  was59: 's59:was', crash59: 's59:crash', do59: 's59:do',
  market60: 's60:market', two60: 's60:two', words: 's60:words',
  prices61: 's61:prices', ten61: 's61:10', peak61: 's61:peak', correction61: 's61:correction', twenty61: 's61:20', bear61: 's61:bear', market61: 's61:market',
  picture: 's62:picture', numbers: 's62:numbers', topped: 's62:topped', k100: 's62:100', correction62: 's62:correction', slid62: 's62:slid', k90: 's62:90', bear62: 's62:bear', slid62b: 's62:slid#2', k80: 's62:80',
  thursday63: 's63:thursday', techheavy: 's63:techheavy', nasdaq63: 's63:nasdaq', fell63: 's63:fell', correction63: 's63:correction',
  sp64: 's64:sp', wasnt: "s64:wasn't", close64: 's64:close', friday64: 's64:friday', six64: 's64:6', record64: 's64:record', monday64: 's64:monday', only64: 's64:only', three64: 's64:3', below64b: 's64:below#2',
  sharp: 's65:sharp', scary65: 's65:scary', drop65: 's65:drop', mostly: 's65:mostly', chip65: 's65:chip', not65: 's65:not', crash65: 's65:crash', whole65: 's65:whole',
  happened66: 's66:happened', before66: 's66:before', january: 's66:january', y2025: 's66:2025', cheap: 's66:cheap', model: 's66:model', chinese: 's66:chinese', deepseek: 's66:deepseek', spooked: 's66:spooked',
  nvidia67: 's67:nvidia', fell67: 's67:fell', k17: 's67:17', day67: 's67:day', record67: 's67:record', k589: 's67:589', billion67: 's67:billion',
  less68: 's68:less', year68: 's68:year', later68: 's68:later', became: 's68:became', first68: 's68:first', worth68: 's68:worth', five68: 's68:5', trillion68: 's68:trillion',
  doesnt: "s69:doesn't", bounce: 's69:bounce', time69: 's69:time', nobody69: 's69:nobody', knows: 's69:knows', next69: 's69:next',
  shows: 's70:shows', quickly: 's70:quickly', fear70: 's70:fear', come70: 's70:come', go70: 's70:go', selling70: 's70:selling', panic: 's70:panic', locks: 's70:locks', loss70: 's70:loss',
  spread71: 's71:spread', many71: 's71:many', companies71: 's71:companies', bad71: 's71:bad', industry: 's71:industry', hurts: 's71:hurts', less71: 's71:less',
  money72: 's72:money', need72: 's72:need', soon: 's72:soon', safer: 's72:safer', stocks72: 's72:stocks', scary72: 's72:scary', week72: 's72:week', force: 's72:force', sell72: 's72:sell',
}
type Key = keyof typeof K

// # position on the trail for a fall of p % (0 = peak, 10 = correction flag, 20 = bear flag)
const trail = (p: number): [number, number] => p <= 10 ? [lerp(520, 980, p / 10), lerp(360, 620, p / 10)] : [lerp(980, 1440, (p - 10) / 10), lerp(620, 820, (p - 10) / 10)]
// # a hiker marker: round badge with a name, standing on the trail
const Hiker: React.FC<{ p: number; name: string; col: string; o?: number; up?: number }> = ({ p, name, col, o = 1, up = 0 }) => {
  const [x, y] = trail(p)
  return <g opacity={o} transform={`translate(${x} ${y - up})`}><rect x={-4} y={-70} width={8} height={70} fill="#E8E6FF" /><circle cx={0} cy={-90} r={34} fill={col} stroke="#FFFFFF" strokeWidth={5} /><rect x={-80} y={-170} width={160} height={50} rx={12} fill={col} /><Label x={0} y={-134} text={name} size={36} font="Bebas Neue" color="#0A0820" /></g>
}

const Crash: React.FC<PieceProps> = ({ f, c }) => {
  const q = Object.fromEntries(Object.entries(K).map(([k, v]) => [k, c(v)])) as Record<Key, number>
  const AB = q.happened66 - 8, BC = q.doesnt - 8
  const A = win(f, 0, AB), B = win(f, AB, BC), C = on(f, BC, 10)
  const nas = lerp(0, 10.4, span(f, q.nasdaq63, q.correction63 + 10))
  const spx = f < q.monday64 ? lerp(0, 5.65, span(f, q.sp64, q.six64 + 10)) : lerp(5.65, 3.44, span(f, q.monday64, q.three64 + 20))
  // # DeepSeek line: 0..1 progress; plunge then climb
  const dsT = span(f, q.fell67, q.trillion68 + 30)
  const mia: Beat[] = [[BC, 'idle', 'neutral'], [q.nobody69, 'shrug', 'thinking'], [q.fear70, 'idle', 'worried'], [q.go70, 'relief', 'smiling'], [q.panic, 'stop', 'worried'], [q.spread71, 'present', 'smiling'], [q.safer, 'confident', 'smiling']]
  const storm = win(f, q.fear70, q.go70 + 20, 10)
  return (
    <g>
      <Stage id="nv-crash" frame={f} />
      {/* # A) the trail: correction vs bear market */}
      {A > 0 && <g opacity={A}>
        <Sky id="nvc-sky" top="#060518" bottom="#22225A" glow="#9FB4FF" gx={1600} gy={160} f={f} />
        <circle cx={1640} cy={170} r={70} fill="#E8EAFF" opacity={0.9} />
        <path d="M0 520 L300 300 L560 460 L820 260 L1120 480 L1420 300 L1920 560 L1920 1080 L0 1080 Z" fill="#141436" opacity={0.8} />
        <Ridge id="nvc-ridge" flags={on(f, q.correction61, 10)} bear={on(f, q.bear61, 12)} />
        <g opacity={on(f, q.k100, 8)}><Label x={420} y={300} text="100" size={64} font="Bebas Neue" color={NEON} /></g>
        <g opacity={on(f, q.k90, 8)}><Label x={860} y={690} text="90" size={64} font="Bebas Neue" color={AMBER} /></g>
        <g opacity={on(f, q.k80, 8)}><Label x={1320} y={900} text="80" size={64} font="Bebas Neue" color={RED} /></g>
        <Hiker p={nas} name="NASDAQ" col="#FF8A95" o={on(f, q.nasdaq63, 8)} />
        <Hiker p={spx} name="S&P 500" col="#9FF5C8" o={on(f, q.sp64, 8)} up={14 * win(f, q.below64b, q.below64b + 16, 4)} />
        <g opacity={on(f, q.six64, 8)}>{(() => { const [x, y] = trail(spx); return <Label x={x - 40} y={y - 20} text={f >= q.three64 ? '≈3% BELOW RECORD' : '≈6% BELOW RECORD'} size={40} anchor="end" font="Bebas Neue" color="#9FF5C8" /> })()}</g>
        {f >= q.not65 - 4 && <Stamp x={1590} y={520} text="NOT A WHOLE-MARKET CRASH" f={f} at={q.not65} size={64} color={NEON} />}
        <g opacity={on(f, q.mostly, 8)}><Label x={1590} y={400} text="A SHARP DROP, MOSTLY AI AND CHIPS" size={46} font="Bebas Neue" color={AMBER} /></g>
      </g>}
      {/* # B) it happened before: DeepSeek, Jan 2025 */}
      {B > 0 && <g opacity={B}>
        <Sky id="nvc-sky2" top="#07061A" bottom="#1B2A50" glow={NEON} gx={1500} gy={300} f={f} />
        <Floor id="nvc-floor2" y={940} top="#121236" bottom="#05040F" rim="#6F8CFF" />
        <DayCard x={260} y={330} day="JANUARY" date="2025" o={on(f, q.january, 8)} lit={win(f, q.january, q.cheap, 6)} col="#7A5AA8" s={0.85} />
        <g opacity={on(f, q.cheap, 8) * (1 - on(f, q.fell67, 8))} transform={`translate(800 ${520 - 10 * pop(f, q.deepseek, 12)})`}><rect x={-160} y={-100} width={320} height={200} rx={20} fill="#1C2740" stroke="#7EC8FF" strokeWidth={5} />
          <Label x={0} y={-20} text={f >= q.deepseek ? 'DEEPSEEK' : 'CHEAP AI MODEL'} size={56} font="Bebas Neue" color="#7EC8FF" /><Label x={0} y={50} text="FROM A CHINESE COMPANY" size={34} font="Bebas Neue" color="#C9C6F0" o={on(f, q.chinese, 8)} /></g>
        {/* the line: start 520,520 → plunge to 700,760 → climb to 1600,260 */}
        <g opacity={on(f, q.nvidia67, 8)}>
          {(() => {
            const pts: [number, number][] = [[460, 500], [560, 520], [640, 760], [760, 700], [900, 640], [1060, 560], [1220, 520], [1380, 400], [1560, 280]]
            const n = Math.max(1, Math.round(pts.length * Math.min(1, dsT * 1.05)))
            const d = pts.slice(0, n).map(([x, y], k) => `${k ? 'L' : 'M'}${x} ${y}`).join(' ')
            const [lx, ly] = pts[n - 1]
            return <g><path d={d} fill="none" stroke={n <= 3 ? RED : NEON} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" /><circle cx={lx} cy={ly} r={16} fill={n <= 3 ? RED : NEON} /></g>
          })()}
          <g opacity={on(f, q.k17, 8)} transform={`translate(640 ${860 - 10 * pop(f, q.k589, 12)})`}><rect x={-230} y={-50} width={460} height={100} rx={16} fill="#2A0A16" stroke={RED} strokeWidth={4} />
            <Label x={0} y={16} text={f >= q.k589 ? '-17% · -$589B, A RECORD' : '-17% IN ONE DAY'} size={48} font="Bebas Neue" color={RED} /></g>
          <g opacity={on(f, q.five68, 10)} transform={`translate(1560 ${200 - 10 * pop(f, q.trillion68, 12)})`}><rect x={-4} y={-20} width={8} height={100} fill="#E8E6FF" /><path d="M4 -20 L120 10 L4 40 Z" fill={NEON} />
            <Label x={-30} y={60} text="FIRST $5 TRILLION COMPANY" size={46} anchor="end" font="Bebas Neue" color={NEON} /></g>
          <g opacity={on(f, q.later68, 8)}><Label x={1100} y={720} text="LESS THAN A YEAR LATER" size={44} font="Bebas Neue" color="#E8E6FF" /></g>
        </g>
      </g>}
      {/* # C) what to do: calm, spread, safe */}
      {C > 0 && <g opacity={C}>
        <Sky id="nvc-sky3" top="#0B0A2A" bottom={storm > 0.5 ? '#2A1E4A' : '#1E2A5A'} f={f} stars={20} />
        <rect x={0} y={0} width={1920} height={1080} fill="#C9C6F0" opacity={0.15 * win(f, q.nobody69, q.shows, 10)} />
        <Floor id="nvc-floor3" y={900} top="#1A1840" bottom="#07061A" rim={AMBER} />
        <g opacity={win(f, q.nobody69, q.shows, 10)}><Label x={1200} y={500} text="NOBODY KNOWS WHAT HAPPENS NEXT" size={64} font="Bebas Neue" color="#E8E6FF" /></g>
        <StormCloud x={lerp(300, 1500, span(f, q.fear70, q.go70 + 40))} y={260} s={0.9} o={storm} f={f} strike={win(f, q.come70, q.come70 + 12, 3)} />
        <g opacity={on(f, q.fear70, 8) * (1 - on(f, q.spread71, 8))}><Umbrella x={370} y={400} s={1.0} /></g>
        <Person f={f} who="investorF" beats={mia} x={330} y={900} s={1.0} />
        <g opacity={on(f, q.panic, 8) * (1 - on(f, q.spread71, 8))} transform={`translate(1100 ${620 - 10 * pop(f, q.locks, 12)})`}>
          <circle r={110} fill={RED} /><Label x={0} y={24} text="-$" size={90} font="Bebas Neue" color="#FFFFFF" />
          <g transform="translate(110 -90)"><path d="M-40 0 L-40 -40 Q-40 -80 0 -80 Q40 -80 40 -40 L40 0" fill="none" stroke="#C9A13A" strokeWidth={14} /><rect x={-60} y={-10} width={120} height={90} rx={14} fill="#E9C25A" /></g>
          <Label x={0} y={200} text="PANIC SELLING LOCKS IN A LOSS" size={48} font="Bebas Neue" color={RED} /></g>
        <g opacity={on(f, q.spread71, 10) * (1 - on(f, q.money72, 10))}>
          <path d="M760 760 Q1100 900 1440 760 L1400 880 Q1100 980 800 880 Z" fill="#8C6239" />
          {Array.from({ length: 14 }, (_, k) => <circle key={k} cx={830 + (k % 7) * 90} cy={760 - Math.floor(k / 7) * 60} r={36} fill={['#12B872', '#2F8FE0', '#8C93C0', '#E9C25A', '#FF8A95', '#7A5AA8', '#3DAA6E'][k % 7]} opacity={k === 3 && f >= q.bad71 ? 0.35 : 1} />)}
          <Label x={1100} y={560} text={f >= q.hurts ? 'ONE BAD INDUSTRY HURTS LESS' : 'SPREAD ACROSS MANY COMPANIES'} size={52} font="Bebas Neue" color={NEON} /></g>
        <g opacity={on(f, q.money72, 10)} transform={`translate(1150 ${760 - 10 * pop(f, q.safer, 12)})`}>
          <rect x={-200} y={-200} width={400} height={300} rx={24} fill="#3A4C80" stroke="#9FB2E8" strokeWidth={8} /><circle cx={0} cy={-50} r={70} fill="#22305A" stroke="#9FB2E8" strokeWidth={8} />
          {[0, 60, 120, 180, 240, 300].map((a) => <rect key={a} x={-5} y={-120} width={10} height={30} fill="#9FB2E8" transform={`rotate(${a} 0 -50)`} />)}
          <Label x={0} y={170} text="MONEY YOU NEED SOON: SOMEWHERE SAFER" size={46} font="Bebas Neue" color={AMBER} />
          <g opacity={on(f, q.force, 8)}><Label x={0} y={230} text="SO A SCARY WEEK DOESN'T FORCE A SALE" size={40} font="Bebas Neue" color="#E8E6FF" /></g></g>
      </g>}
      <Headline f={f} lines={[[q.was59, 'WAS IT A CRASH?', '#E8E6FF', 110], [q.market60, 'TWO SIMPLE WORDS', '#E8E6FF', 106], [q.picture, 'WITH EASY NUMBERS', '#E8E6FF', 106], [q.thursday63, 'WHERE THE MARKET GOT TO', '#E8E6FF', 100],
        [q.sharp, 'SHARP AND SCARY — NOT A CRASH', NEON, 96], [q.happened66, 'IT’S HAPPENED BEFORE', '#E8E6FF', 104], [q.less68, 'THEN IT CLIMBED BACK', NEON, 104],
        [q.doesnt, 'NO GUARANTEE THIS TIME', '#E8E6FF', 100], [q.shows, 'FEAR COMES AND GOES', '#E8E6FF', 104], [q.spread71, 'SPREAD IT OUT', NEON, 108], [q.money72, 'KEEP NEAR-TERM MONEY SAFE', AMBER, 100]]} />
      <Vignette id="nv-crash" />
    </g>
  )
}

export const NV_CRASH = makePiece('nv-crash', 'Was it a crash: a moonlit mountain trail from a PEAK flag (100) to a -10% CORRECTION flag (90) and a -20% BEAR MARKET flag (80) by a cave with glowing eyes; a NASDAQ hiker slides to the correction flag while an S&P 500 hiker stops ≈6% below its record then climbs back to ≈3%; a NOT A WHOLE-MARKET CRASH stamp; January 2025 — a DEEPSEEK chip card, a line plunging -17% (-$589B, a record) then climbing to a FIRST $5 TRILLION COMPANY flag; fog — nobody knows what happens next; a storm passes over Mia with an umbrella; a red loss coin padlocked (panic selling locks in a loss); a wide basket of many company coins where one dims; a SAFE for money needed soon', {
  mood: 'dark', Component: Crash, beats: Object.values(K),
  sfx: [['s61:correction', 'pop', 0.2], ['s61:bear', 'thud', 0.2], ['s63:correction', 'ding', 0.2], ['s65:not', 'impact', 0.25], ['s67:589', 'thud', 0.25], ['s68:trillion', 'riser', 0.2], ['s70:locks', 'click', 0.2], ['s72:safer', 'chime', 0.2]] })
