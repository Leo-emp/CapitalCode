// # The scene library: one list the engine and style bible can query
import { byId, byTag } from '../registry'
import { STREET_SCENES } from './street'
import { WORK_SCENES } from './work'
import { WORLD_SCENES } from './world'
import { NICHE_SCENES } from './niche'
import { INTERIOR_SCENES } from './interiors'
import { PLACE_SCENES } from './places'
import { PLACE2_SCENES } from './places2'

export type { Anchor, SceneEntry, SceneProps } from './kit'
// # redrawn rooms (interiors.tsx) replace the old line-art versions with the same id
const REDRAWN = new Set(INTERIOR_SCENES.map((s) => s.id))
export const SCENES = [...[...STREET_SCENES, ...WORK_SCENES, ...WORLD_SCENES, ...NICHE_SCENES].filter((s) => !REDRAWN.has(s.id)), ...INTERIOR_SCENES, ...PLACE_SCENES, ...PLACE2_SCENES]
export const getScene = (id: string) => byId(SCENES, id, 'scene')
export const findScenes = (tag: string) => byTag(SCENES, tag)
