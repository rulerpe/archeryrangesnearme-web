# Archery Ranges Near Me — Web

Static directory site listing ~2,900 archery ranges across the US. Built with Astro, hosted on Cloudflare Pages

## Stack

- **Astro** — static site generator, zero JS by default
- **Cloudflare Pages** — hosting and CDN
- **Cloudflare R2** — private storage for the source CSV

## How it works

At build time, the site downloads `enriched_final.csv` from a private R2 bucket and generates ~5,600 static HTML pages. No database, no server.

## Pages

| URL pattern | Example |
|---|---|
| `/` | Homepage — state index |
| `/archery-ranges/texas/` | All ranges in Texas |
| `/archery-ranges/texas/austin/` | All ranges in Austin, TX |
| `/archery-ranges/texas/austin/range-name/` | Individual listing |
| `/archery-ranges/indoor/` | All indoor ranges (US) |
| `/archery-ranges/texas/indoor/` | Indoor ranges in Texas |

Feature filters: `indoor` · `outdoor` · `with-lessons` · `with-rental` · `with-pro-shop` · `with-3d-course` · `with-leagues` · `with-tournaments` · `walk-in`

## Local development

**1. Copy `.env.example` to `.env` and fill in R2 credentials:**

```
PUBLIC_GA_ID=G-XXXXXXXXXX
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=archeryrangesnearme-data
R2_OBJECT_KEY=enriched_final.csv
```

**2. Fetch the CSV and start dev server:**

```bash
node scripts/fetch-data.mjs
npm run dev
```

Or copy `enriched_final.csv` directly to `src/data/ranges.csv` and run `npm run dev`.

## Build

```bash
npm run build   # fetches CSV from R2, then runs astro build
```

Output goes to `dist/`. The CSV is gitignored and never committed.

## Tests

```bash
npm test
```

Unit tests cover the data layer (CSV parsing, slug generation), feature filters, and SEO utilities.

## Deployment

Hosted on Cloudflare Pages. Every push to `main` triggers a build.

Cloudflare Pages environment variables needed:

| Variable | Type |
|---|---|
| `PUBLIC_GA_ID` | Plain text |
| `R2_BUCKET_NAME` | Plain text |
| `R2_OBJECT_KEY` | Plain text |
| `R2_ACCOUNT_ID` | Secret |
| `R2_ACCESS_KEY_ID` | Secret |
| `R2_SECRET_ACCESS_KEY` | Secret |

## Updating data

When the data pipeline produces a new `enriched_final.csv`, upload it to R2 (see the data pipeline repo), then trigger a redeploy on Cloudflare Pages.
