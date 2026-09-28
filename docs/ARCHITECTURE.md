# Architecture

## Intent

THARUN OS is layered so presentation never owns domain rules, and so PostgreSQL or a CMS can replace static files without rewriting pages.

```
Presentation (app routes)
        ↓
Layout / feature UI
        ↓
Application services (search, github, ai, analytics, design tokens)
        ↓
Repositories (interfaces)
        ↓
Static TypeScript data  →  future Prisma/PostgreSQL
        ↓
External: GitHub, AI providers
```

## Current mapping

| Layer | Location |
| --- | --- |
| Pages / metadata / API | `app/` |
| Shell and primitives | `components/layout`, `components/shared`, `components/design` |
| Domain types | `types/` |
| Seed data | `data/` |
| Repositories | `lib/repositories/` |
| Services | `lib/github.ts`, `lib/ai/`, `lib/search.ts`, `lib/analytics.ts` |
| DB boundary | `lib/db/client.ts`, `prisma/schema.prisma` (not connected in v1) |

Pages call `getProjectRepository()`, not `data/projects.ts`.

## Data flow for a project

```
data/projects.ts
data/architectures/<slug>.ts
data/use-cases/<slug>.ts
        ↓
StaticProjectRepository
        ↓
/projects/[slug]  +  Mission Control  +  search  +  city locations
```

Architecture and use-case **graphs are data**. `layoutArchitectureGraph` / `layoutUseCaseModel` position nodes; explorers render SVG. Lists and cards remain so diagrams are never required.

## Window manager

`hooks/useWindowManager.ts` is a small client store (open/close/minimize/maximize/focus). It is not global Redux. The homepage OS shell (Phase 3) will attach to this hook. Public routes remain real URLs.

## Command search

`lib/search.ts` ranks exact title, prefix, contains, then keywords (tags, tech, category). `hooks/useCommandPalette.ts` binds Ctrl+K and `/`. Palette UI is Phase 3.

## Failure isolation

- GitHub: live snapshot or fallback message; page still renders
- AI: provider `none`; `POST /api/ai` returns 503
- Database: `isDatabaseEnabled()` is false until Prisma is wired
- Missing architecture/use cases: empty states on the project page
- UI errors: `ErrorBoundary` (client) around future interactive islands

## What must not happen

- New `app/projects/suraksha-astra/page.tsx`
- UI components importing a single project's architecture file
- Vendor SDKs called from React components
- Secrets in `NEXT_PUBLIC_*`

## Approved stack

Next.js App Router, React, TypeScript, Tailwind CSS 4. Framer Motion and React Flow are **planned** for explorers and OS motion; they are not installed until the phase that needs them. Three.js is not used.

## Future swap

Replace `StaticProjectRepository` with `DatabaseProjectRepository` behind `getProjectRepository()`. Keep method names: `getAllProjects`, `getProjectBySlug`, `getFeaturedProjects`, `getProjectsByCategory`, `getArchitecture`, `getUseCases`.
