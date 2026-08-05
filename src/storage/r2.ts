import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { env, envOr } from '@/lib/env'

// # Cloudflare R2 is S3-compatible — use AWS SDK with R2 endpoint
let _client: S3Client | null = null

function getClient(): S3Client {
  if (!_client) {
    _client = new S3Client({
      region: 'auto',
      endpoint: `https://${env('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env('R2_ACCESS_KEY_ID'),
        secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
      },
    })
  }
  return _client
}

// # Upload a buffer to R2 and return the public URL
export async function uploadToR2(
  key: string,
  data: Buffer | Uint8Array,
  contentType: string
): Promise<string> {
  const bucket = envOr('R2_BUCKET_NAME', 'capitalcode')

  await getClient().send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: data,
    ContentType: contentType,
  }))

  // # Return public URL (R2 bucket must have public access enabled)
  const publicUrl = envOr('R2_PUBLIC_URL', `https://${bucket}.r2.dev`)
  return `${publicUrl}/${key}`
}
