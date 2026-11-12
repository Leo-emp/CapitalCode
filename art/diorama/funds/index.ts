// # the scenes of "Index Funds vs Mutual Funds vs ETFs vs Hedge Funds" — one file each
import { FD_HOOK } from './hook'
import { FD_POT } from './pot'
import { FD_MUTUAL } from './mutual'
import { FD_INDEX } from './indexfund'
import { FD_ETF } from './etf'
import { FD_HEDGE } from './hedge'
import { FD_PAYOFF } from './payoff'

export const FUNDS = [FD_HOOK, FD_POT, FD_MUTUAL, FD_INDEX, FD_ETF, FD_HEDGE, FD_PAYOFF]
