// scripts/fetch-data.mjs
// Downloads enriched_final.csv from Cloudflare R2 before each build.
// Run: node scripts/fetch-data.mjs
// Required env vars: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
// Optional env vars: R2_BUCKET_NAME (default: archeryrangesnearme-data), R2_OBJECT_KEY (default: enriched_final.csv)
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { createWriteStream, mkdirSync, readFileSync, existsSync } from 'fs';
import { pipeline } from 'stream/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Load .env for local development (not present on Cloudflare Pages)
if (existsSync('.env')) {
  readFileSync('.env', 'utf8').split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eq = trimmed.indexOf('=');
    if (eq === -1) return;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (key && !(key in process.env)) process.env[key] = val;
  });
}

const OUTPUT_PATH = new URL('../src/data/ranges.csv', import.meta.url).pathname;

const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME = 'archeryrangesnearme-data',
  R2_OBJECT_KEY = 'enriched_final.csv',
} = process.env;

// Debug: show which R2 vars are present (values masked for security)
console.log('[fetch-data] Env var check:');
console.log('  R2_ACCOUNT_ID    :', R2_ACCOUNT_ID    ? `set (${R2_ACCOUNT_ID.length} chars)` : 'MISSING');
console.log('  R2_ACCESS_KEY_ID :', R2_ACCESS_KEY_ID ? `set (${R2_ACCESS_KEY_ID.length} chars)` : 'MISSING');
console.log('  R2_SECRET_ACCESS_KEY:', R2_SECRET_ACCESS_KEY ? `set (${R2_SECRET_ACCESS_KEY.length} chars)` : 'MISSING');
console.log('  R2_BUCKET_NAME   :', R2_BUCKET_NAME);
console.log('  R2_OBJECT_KEY    :', R2_OBJECT_KEY);

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
