// # every diorama piece registers itself here (imported once by the timeline, the gate and the Episode)
import { registerPiece } from './registry'
import { HOOK } from './Hook'
import { ACT1 } from './act1'
import { ACT2 } from './act2'
import { ACT3 } from './act3'
import { ACT4 } from './act4'
import { ACT5 } from './act5'

for (const p of [HOOK, ...ACT1, ...ACT2, ...ACT3, ...ACT4, ...ACT5]) registerPiece(p)
