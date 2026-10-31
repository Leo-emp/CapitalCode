// # CLI: cloud — one-time cloud render setup (S3 bucket, Lambda function, art site, GitHub secrets) and a status check
import { spawnSync } from 'node:child_process'
import { register } from '../cli'
import { ensureBucket, ensureFunction, ensureSite, GH_REPO, LAMBDA, loadAws } from '../cloud'
import { refuse, result } from '../result'

const log = (s: string) => console.log(`  ${s}`)

// # The runners read the same S3 bucket, so they get the same keys — passed on stdin, never on the command line or in logs
const setSecret = (name: string, value: string) => {
  const p = spawnSync('gh', ['secret', 'set', name, '-R', GH_REPO], { input: value, encoding: 'utf8' })
  if (p.status !== 0) refuse(`gh secret set ${name} failed: ${(p.stderr || '').trim().split('\n')[0]}`)
}

register('cloud', 'cloud setup|status  — prepare AWS Lambda + GitHub Actions rendering (keys from .env.local, never printed)', async (a) => {
  const sub = a[0] ?? 'status'
  let aws: ReturnType<typeof loadAws>
  try { aws = loadAws() } catch (e) { return refuse((e as Error).message) }
  if (sub === 'setup') {
    const { bucketName } = await ensureBucket()
    log(`bucket ${bucketName} (${aws.region})`)
    const functionName = await ensureFunction()
    log(`lambda ${functionName} (${LAMBDA.memorySizeInMb} MB, ${LAMBDA.timeoutInSeconds} s)`)
    const { serveUrl } = await ensureSite(log)
    log('art site ready')
    setSecret('CC_AWS_ACCESS_KEY_ID', aws.keyId)
    setSecret('CC_AWS_SECRET_ACCESS_KEY', aws.secret)
    log(`github secrets set on ${GH_REPO}`)
    return result({ ok: true, region: aws.region, bucketName, functionName, site: serveUrl.split('/sites/')[1] ?? '' })
  }
  if (sub === 'status') {
    const { getFunctions, getSites } = await import('@remotion/lambda')
    const fns = await getFunctions({ region: aws.region, compatibleOnly: true })
    const { sites } = await getSites({ region: aws.region })
    const wf = spawnSync('gh', ['workflow', 'view', 'render.yml', '-R', GH_REPO], { encoding: 'utf8' })
    return result({ ok: fns.length > 0 && wf.status === 0, region: aws.region, lambdas: fns.map((f) => f.functionName), sites: sites.filter((s) => s.id.startsWith('cc-')).map((s) => s.id), githubWorkflow: wf.status === 0 })
  }
  refuse('use: cloud setup | cloud status')
})
