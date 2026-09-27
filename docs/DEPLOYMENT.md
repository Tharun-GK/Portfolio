# Deployment

## Target

Vercel. No custom server. App Router static generation for public pages; API routes on demand.

## Pre-deploy

```bash
npm install
npm run lint
npm test
npm run build
```

Confirm environment variables on the host. Smoke-test `/`, `/mission-control`, `/projects/suraksha-astra`, `/github`, `/api/health`.

## Environment (Vercel)

| Name | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Canonical + Open Graph (`https://your-domain`) |
| `GITHUB_USERNAME` | Optional | Enables live GitHub |
| `GITHUB_TOKEN` | Optional | Server-only; improves rate limits |
| `AI_API_KEY` | Optional | Unused until a provider is wired |
| `AI_PROVIDER` | Optional | `none` by default |
| `DATABASE_URL` | Optional | Unused until Prisma is enabled |
| `ANALYTICS_ID` | Optional | Must not block pages |

## Git

Connect the **tharun-os** GitHub repository, not a parent home-directory repo. Production branch: `master` unless you standardize on `main` later (that is a git policy decision, not an app rewrite).

## After deploy

- Check project slugs remain stable
- Confirm `/robots.txt` and `/sitemap.xml`
- Confirm GitHub fallback if the API is unset
- Confirm `/api/ai` does not leak keys (503 without provider)

## Rollback

Vercel instant rollback. Keep Phase commits small so a bad visual change is isolated from data-layer commits.
