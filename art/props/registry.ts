// # The prop library: one list the engine and style bible can query
import { byId, byTag } from '../registry'
import { BUSINESS_PROPS } from './business'
import { MONEY_PROPS } from './money'
import { TECH_PROPS } from './tech'

export type { PropProps } from './frame'
export const PROPS = [...MONEY_PROPS, ...BUSINESS_PROPS, ...TECH_PROPS]
export const getProp = (id: string) => byId(PROPS, id, 'prop')
export const findProps = (tag: string) => byTag(PROPS, tag)
