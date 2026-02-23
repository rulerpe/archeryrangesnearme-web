// scripts/fetch-data.mjs
// Downloads enriched_final.csv from Cloudflare R2 before each build.
// Run: node scripts/fetch-data.mjs
// Required env vars: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
// Optional env vars: R2_BUCKET_NAME (default: archeryrangesnearme-data), R2_OBJECT_KEY (default: enriched_final.csv)
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { createWriteStream, mkdirSync } from 'fs';
import { pipeline } from 'stream/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const OUTPUT_PATH = new URL('../src/data/ranges.csv', import.meta.url).pathname;

const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME = 'archeryrangesnearme-data',
  R2_OBJECT_KEY = 'enriched_final.csv',
} = process.env;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.error('Missing R2 credentials. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY.');
  process.exit(1);
}

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

console.log(`Downloading ${R2_BUCKET_NAME}/${R2_OBJECT_KEY}...`);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });

const { Body } = await client.send(
  new GetObjectCommand({ Bucket: R2_BUCKET_NAME, Key: R2_OBJECT_KEY })
);

await pipeline(Body, createWriteStream(OUTPUT_PATH));
console.log(`Saved to ${OUTPUT_PATH}`);
