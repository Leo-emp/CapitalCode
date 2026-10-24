// ============================================================
// VIGNETTE REGISTRY — every animated mini-scene, by id.
// ============================================================
import { byId } from '../registry'
import { MONEY_VIGNETTES } from './money'
import { STORY_VIGNETTES } from './story'

export const VIGNETTES = [...MONEY_VIGNETTES, ...STORY_VIGNETTES]
export const getVignette = (id: string) => byId(VIGNETTES, id, 'vignette')
export type { VignetteEntry, VignetteProps } from './kit'
