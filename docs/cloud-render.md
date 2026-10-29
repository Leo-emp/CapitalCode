# Cloud render (AWS Lambda + GitHub Actions)

One whole video renders on one machine, so three can run at once:

| Command | Where | Best for |
|---|---|---|
| `render <job> --on=aws` | AWS Lambda (Singapore) | CapitalCode long videos, ~2–5 min |
| `render <job> --on=github` | GitHub Actions, up to 10 free runners | any Remotion video when AWS is busy |
| `render <job>` | this laptop | Shorts, as before |

`run <job> --on=…` and `CC_RENDER_ON=aws` work too. Both clouds read the art from one S3 site per
art version; the laptop still mixes the voice + SFX and writes `final.mp4`. A crash mid-render resumes
the same cloud render (`render/cloud.json`) instead of paying for a new one.

## Owner setup (once, ~15 min)

1. **AWS account** — aws.amazon.com → Create account (card needed; we stay in the free tier).
2. **$1 budget alert** — Billing → Budgets → Create → "Zero spend budget" template, your email.
3. **Role** — IAM → Roles → Create role → AWS service → Lambda → name it exactly
   `remotion-lambda-role`, then add an inline policy from `docs/aws/role-policy.json`.
4. **User** — IAM → Users → Create user `capitalcode-render` (no console access) → Add inline
   policy from `docs/aws/user-policy.json`.
5. **Access key** — that user → Security credentials → Create access key → "Application running
   outside AWS". Put these in `C:\Users\User\capitalcode\.env.local` (never share them):
   ```
   REMOTION_AWS_ACCESS_KEY_ID=...
   REMOTION_AWS_SECRET_ACCESS_KEY=...
   REMOTION_AWS_REGION=ap-southeast-1
   ```
6. **Quota** — Service Quotas → AWS Lambda → "Concurrent executions" → request 1000 (free; new
   accounts start at 10). Until it is raised, set `CC_LAMBDA_MAX=9`.
7. Tell Claude "run cloud setup" → it creates the bucket, function and site and stores the keys as
   GitHub secrets (`npx tsx agent/cli.ts cloud setup`, then `cloud status`).

## Free limits (check the pricing pages; rough numbers)

- Lambda: 400,000 GB-s/month free — about 10 long videos or 50 Shorts at 2 GB.
- GitHub Actions: unlimited minutes on a public repo, 2,000/month on a private one.
- The CapitalCode repo is **public**: run names and the art site URL are visible; keys are not
  (GitHub secrets). Videos never go to GitHub — parts go to the private S3 bucket and are deleted.
