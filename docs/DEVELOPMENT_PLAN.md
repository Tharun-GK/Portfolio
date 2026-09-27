# Development plan

Build incrementally. After each phase: lint, test, build, summarize, then wait for approval before the next major phase.

## Execution constraints

- Do not redesign architecture or change stack without approval
- Do not introduce major dependencies without a stated reason
- Do not rewrite working features wholesale
- Prefer small, reversible diffs

## Phases

| Phase | Status | Scope |
| --- | --- | --- |
| 1 Foundation | Done | Next.js, types, data, repositories, public routes, APIs, tests |
| 2 Design system | Done | Tokens, primitives, docs, mobile nav, status semantics |
| 3 Desktop | Done | Boot (short, skippable), desktop, taskbar, command palette UI, windows on home |
| 4 Mission Control | Next | Denser recruiter IA using existing data |
| 5 Project Lab | Planned | Filters, sort, search UI |
| 6 Project detail | Planned | Tabs; still `/projects/[slug]` |
| 7 Architecture explorer | Planned | SVG/Framer (and React Flow only if needed) |
| 8 Use-case explorer | Planned | Data-driven diagram / mobile cards |
| 9 Tharun City | Planned | Map on desktop; district selector on mobile |
| 10 Research / experience | Planned | Timeline depth; still data-driven |
| 11 GitHub | Planned | Stats, graph, repo cards; still fail-soft |
| 12 AI layer | Planned | Retrieval + provider implementations |
| 13 Database | Planned | Prisma behind repositories |
| 14 Analytics | Planned | Event names from spec; no PII |
| 15 Security | Planned | Rate limits, input validation on public POST |
| 16 Testing | Planned | Integration + e2e |
| 17 Production | Planned | Vercel env, production URLs |

## Phase 3 dependency decision

Framer Motion is installed for **semantic** boot/window opacity only. React Flow is still not added.

## Local loop

```bash
npm install
cp .env.example .env.local
npm run dev
npm run lint
npm test
npm run build
```

## Git

Repository root must be `tharun-os/` (already initialized). Small logical commits per phase. Do not commit `.env.local`.
