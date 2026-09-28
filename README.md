# THARUN OS

An interactive environment for the systems Tharun G K builds, the problems he solves, and the ideas he explores.

THARUN OS is a product-shaped portfolio: data-driven systems, public routes for recruiters, and a later OS interaction layer. It is not a template of animated cards.

## Current phase

**Phase 10 — Command dashboard + research/experience depth.** Mission Control is a HUD of real progress rings and records. Phase 11 (GitHub graphs) is not started.

Engineering docs live in [`docs/`](docs/):

- [MASTER_SPEC.md](docs/MASTER_SPEC.md)
- [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [DEVELOPMENT_PLAN.md](docs/DEVELOPMENT_PLAN.md)
- [DATA_MODEL.md](docs/DATA_MODEL.md)
- [AI_ARCHITECTURE.md](docs/AI_ARCHITECTURE.md)
- [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)
- [SECURITY.md](docs/SECURITY.md)
- [DEPLOYMENT.md](docs/DEPLOYMENT.md)

Later phases add the desktop shell, explorers, and production hardening. See [docs/DEVELOPMENT_PLAN.md](docs/DEVELOPMENT_PLAN.md).

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

`ArchitectureViewer` and `UseCaseViewer` consume graphs from the repository. They must stay project-agnostic. Explorers lay out SVG from data (no React Flow).

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
- Three.js / React Three Fiber (optional city map only)
- Vitest
- Vercel-first deployment
- Prisma schema is documented but **not connected** in version 1

## Folder structure

```
app/                 Public routes and API
components/          Layout, design primitives, shared UI
docs/                Spec and architecture
data/                Source of truth for v1
lib/                 Services, search, repositories, tokens
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

1. Foundation (done)
2. Design system (done)
3. THARUN OS desktop + boot (done)
4. Mission Control density (done)
5. Project Lab filters (done)
5.1 Window manager repair + command-center desktop (done)
5.2 City navigation from one location model (done)
6. Project detail tabs (done)
7. Architecture explorer (done)
8. Use-case explorer (done)
9. Tharun City map (done)
9.5 Optional 3D city map (done)
10. Command dashboard + research/experience (done)
11. GitHub graphs
11. GitHub graphs
12. AI assistant + retrieval
13. Prisma persistence
14. Analytics events
15. Security pass
16. Testing (e2e)
17. Production deploy

## Contribution workflow

Small logical commits per phase. Do not invent internships, metrics, or clinical claims. If a fact is not in `data/`, it does not belong in the UI.
