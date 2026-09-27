# THARUN OS

An interactive environment for the systems Tharun G K builds, the problems he solves, and the ideas he explores.

THARUN OS is a product-shaped portfolio: data-driven systems, public routes for recruiters, and a later OS interaction layer. It is not a template of animated cards.

## Current phase

**Phase 1 — Foundation** is in place:

- Next.js App Router, TypeScript, Tailwind CSS
- Domain types and static seed data
- Repository interfaces (UI does not import project files directly)
- Public routes, project slugs, metadata
- Health and read APIs
- AI provider interface (disabled)
- GitHub service with fallback
- Unit tests for retrieval, search, and graph integrity

Later phases add the desktop shell, window manager, architecture explorer, city map, and production hardening. See the roadmap below.

## Architecture

```
Page / API route
    → Feature / layout components
        → Repositories / services / search
            → Typed data (today) or PostgreSQL (later)
                → GitHub / AI providers (optional)
```

Adding a project should mean new data (and optional assets), not a new page component:

1. `data/projects.ts`
2. `data/architectures/<slug>.ts`
3. `data/use-cases/<slug>.ts`
4. Assets under `public/images/projects/<slug>/`

`ArchitectureViewer` and `UseCaseViewer` (later phases) must remain project-agnostic.

```
Presentation
    UI components
        Feature containers
            Application services (search, github, ai, analytics)
                Domain / repositories
                    Static TypeScript  →  Prisma/PostgreSQL
```

## Tech stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS 4
- Vitest
- Vercel-first deployment
- Prisma schema is documented but **not connected** in version 1

## Folder structure

```
app/                 Public routes and API
components/          Layout + shared primitives (OS UI in later phases)
data/                Source of truth for v1
lib/                 Services, search, repositories, AI/GitHub boundaries
hooks/               Client interaction hooks
types/               Domain types
prisma/schema.prisma Future database model
tests/               Unit tests; integration/e2e later
```

## Development setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example`. Never commit `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL / Open Graph |
| `DATABASE_URL` | Reserved for PostgreSQL |
| `GITHUB_TOKEN` | Server-only GitHub access |
| `GITHUB_USERNAME` | Public GitHub user to fetch |
| `AI_API_KEY` | Server-only, unused until an AI provider is wired |
| `ANALYTICS_ID` | Reserved; analytics must not block render |

## Testing, lint, build

```bash
npm run lint
npm test
npm run build
```

## Database

Version 1 reads typed local data through `ProjectRepository` / `ActivityRepository`. To introduce PostgreSQL later, implement the same interfaces with Prisma and switch `getProjectRepository()` — pages should not change.

## AI

Application code depends on `AIProvider`, not a vendor SDK. The current provider is `none`. The portfolio must keep working when AI is down (`POST /api/ai` returns 503).

## Deployment

Vercel: connect the GitHub repository, set environment variables, deploy. Confirm `npm run lint`, `npm test`, and `npm run build` before a production push.

## Git

This directory must be its **own** Git repository. Do not commit THARUN OS into a parent home-directory repo.

## Roadmap

1. Foundation (this phase)
2. Design system
3. THARUN OS desktop + boot
4. Mission Control density
5. Project Lab filters
6. Richer project tabs (still `/projects/[slug]`)
7. Architecture explorer
8. Use-case explorer
9. Tharun City map
10. Research / experience depth
11. GitHub graphs
12. AI assistant + retrieval
13. Prisma persistence
14. Analytics events
15. Security pass
16. Testing (e2e)
17. Production deploy

## Contribution workflow

Small logical commits per phase. Do not invent internships, metrics, or clinical claims. If a fact is not in `data/`, it does not belong in the UI.
