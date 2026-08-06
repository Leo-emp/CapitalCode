// # Dashboard auth — simple password check via DASHBOARD_PASSWORD env var
// # Returns 401 if missing or wrong, used by all /api/dashboard routes
import { NextRequest, NextResponse } from 'next/server'
import { envOr } from '@/lib/env'

export function authCheck(req: NextRequest): NextResponse | null {
  const password = envOr('DASHBOARD_PASSWORD', '')
  if (!password) return null // # No password set = open access (dev mode)

  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.slice(7)
  if (token !== password) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return null // # Auth passed
}

// # Cron secret check for automated endpoints
export function cronCheck(req: NextRequest): NextResponse | null {
  const secret = envOr('CRON_SECRET', '')
  if (!secret) return null

  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return null
}
