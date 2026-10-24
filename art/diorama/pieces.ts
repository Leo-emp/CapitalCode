// # every diorama piece registers itself here (imported once by the timeline, the gate and the Episode)
import { registerPiece } from './registry'
import { HOOK } from './Hook'
import { ACT1 } from './act1'

for (const p of [HOOK, ...ACT1]) registerPiece(p)
