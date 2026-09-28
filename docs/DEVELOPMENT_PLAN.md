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
| 4 Mission Control | Done | Denser recruiter IA using existing data |
| 5 Project Lab | Done | Filters, sort, search UI |
| 5.1 OS repair | Done | Window lifecycle fix + command-center desktop |
| 5.2 City navigation | Done | Single location model; optional map + mobile district selector |
| 6 Project detail | Done | Tabs on `/projects/[slug]`; hash deep links |
| 7 Architecture explorer | Done | SVG graph, select, play/pause/reset/zoom/fit; no React Flow |
| 8 Use-case explorer | Done | SVG diagram on desktop; cards on mobile; click for flow details |
| 9 Tharun City | Done | Inspectable map + `?loc=`; lists still skip the city |
| 9.5 City 3D | Done | Optional R3F map; WebGL fallback to 2D; same `cityLocations` |
| 10 Research / experience | Planned | Timeline depth; still data-driven |
| 11 GitHub | Planned | Stats, graph, repo cards; still fail-soft |
| 12 AI layer | Planned | Retrieval + provider implementations |
| 13 Database | Planned | Prisma behind repositories |
| 14 Analytics | Planned | Event names from spec; no PII |
| 15 Security | Planned | Rate limits, input validation on public POST |
| 16 Testing | Planned | Integration + e2e |
| 17 Production | Planned | Vercel env, production URLs |

## Phase 3 dependency decision

Framer Motion is installed for **semantic** boot/window opacity and reduced-motion checks. Architecture and use-case explorers are SVG (no React Flow). Three.js / React Three Fiber is used **only** for the optional `/city` 3D map, with a 2D fallback.

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
