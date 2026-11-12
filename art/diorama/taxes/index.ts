// # the scenes of "How Tax Brackets Actually Work" — one file each, drawn fresh for this video (r82/r83)
import { TX_HOOK } from './hook'
import { TX_STAIRS } from './stairs'
import { TX_DEDUCT } from './deduct'
import { TX_FILL } from './fill'
import { TX_RAISE } from './raise'
import { TX_CREEP } from './creep'
import { TX_OTHER } from './other'
import { TX_PAYOFF } from './payoff'

export const TAXES = [TX_HOOK, TX_STAIRS, TX_DEDUCT, TX_FILL, TX_RAISE, TX_CREEP, TX_OTHER, TX_PAYOFF]
