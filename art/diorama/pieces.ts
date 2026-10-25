// # every diorama piece registers itself here (imported once by the timeline, the gate and the Episode)
import type { Mood } from './kit'
import { registerPiece } from './registry'
// # pieces:begin
import { HOOK } from './Hook'
import { ACT1 } from './act1'
import { ACT2 } from './act2'
import { ACT3 } from './act3'
import { ACT4 } from './act4'
import { ACT5 } from './act5'
import { WHERE100 } from './shorts/where100'
import { GIANTS2000 } from './shorts/giants2000'
// # pieces:end

// # the mood of each piece (a plan shot can override it): dark for risk, bubbles and warnings; light (cream) for
// # explaining, good news and the answer — the film breathes between the two with a drawn wipe
const DARK = new Set(['hook', 'loop', 'bets', 'paid-off', 'dotcom', 'flip', 'survivors', 'priced-in'])
export const moodOf = (id: string): Mood => (DARK.has(id) ? 'dark' : 'light')

// # pieces:begin
const ALL = [HOOK, ...ACT1, ...ACT2, ...ACT3, ...ACT4, ...ACT5, ...WHERE100, ...GIANTS2000]
// # pieces:end
for (const p of ALL) registerPiece({ ...p, mood: p.mood ?? moodOf(p.id) })
