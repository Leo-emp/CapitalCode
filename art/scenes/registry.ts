// # The scene library: one list the engine and style bible can query
import { byId, byTag } from '../registry'
import { STREET_SCENES } from './street'
import { WORK_SCENES } from './work'
import { WORLD_SCENES } from './world'

export type { Anchor, SceneEntry, SceneProps } from './kit'
export const SCENES = [...STREET_SCENES, ...WORK_SCENES, ...WORLD_SCENES]
export const getScene = (id: string) => byId(SCENES, id, 'scene')
export const findScenes = (tag: string) => byTag(SCENES, tag)
