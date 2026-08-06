// # Dashboard auth — password check via DASHBOARD_PASSWORD env var
// # Fails closed in production (500 if no password set), open in dev
import { NextRequest, NextResponse } from 'next/server'
import { envOr } from '@/lib/env'
import { timingSafeEqual } from 'crypto'

// # Constant-time string comparison to prevent timing attacks
function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export function authCheck(req: NextRequest): NextResponse | null {
  const password = envOr('DASHBOARD_PASSWORD', '')

  // # Fail closed in production — refuse to serve without a password
  if (!password) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }
    return null // # Dev mode only — open access
  }

  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.slice(7)
  if (!safeCompare(token, password)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return null // # Auth passed
}

// # Cron secret check for automated endpoints — also fails closed in production
export function cronCheck(req: NextRequest): NextResponse | null {
  const secret = envOr('CRON_SECRET', '')

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }
    return null
  }

  const authHeader = req.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (!safeCompare(token, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return null
}
