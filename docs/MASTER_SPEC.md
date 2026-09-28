# THARUN OS — Master Specification

This document is the product and engineering contract for THARUN OS. Implementation must follow it. Changes to architecture, stack, modules, or major dependencies require an explicit decision and approval.

## Product

THARUN OS is an interactive digital environment for the work, systems, research, and ideas of **Tharun G K**. It must not feel like a conventional student portfolio template.

Primary concept:

> An interactive environment for the systems I build, the problems I solve, and the ideas I explore.

Simultaneous goals:

1. **Recruiter efficiency** — understand the person in seconds.
2. **Technical exploration** — inspect projects, architecture, and use cases in depth.

Do not force visitors through animations or Tharun City to reach important information. Public routes remain independently accessible.

## Positioning (v1 content)

- Name: Tharun G K
- Role: Information Science & Technology Student; Full-Stack & Applied AI Developer; Founder of BookMyShift
- Positioning: Founder of BookMyShift | Building India's Trusted Flexible Workforce Platform
- Do not invent internships, metrics, awards, or clinical validation.

## Experience surfaces (product, not all shipped in every phase)

1. Operating system UI (desktop, taskbar, windows)
2. Product-style project discovery
3. Mission Control dashboard
4. Interactive architecture visualization
5. Interactive use-case visualization
6. Optional explorable city
7. Research laboratory
8. Startup headquarters (BookMyShift)
9. Activity stream
10. Command palette
11. GitHub integration
12. AI-assisted content and Q&A (optional, never required)

## Design principles

1. Information hierarchy over decoration
2. Performance over unnecessary visual effects
3. Semantic animation over decorative animation
4. Accessibility over novelty
5. Modularity over duplicated code
6. Data-driven architecture over hardcoded UI
7. Progressive enhancement
8. Mobile-first responsive design
9. SEO-friendly public pages
10. Security by default
11. Easy future expansion
12. Independently maintainable major features

Avoid: generic templates, excessive glassmorphism, random 3D, giant spheres, neon, particle spam, overloaded dashboards, long boot animations, hardcoded project cards, copy-pasted project pages.

## Technology stack (locked unless approved otherwise)

- Frontend: Next.js, TypeScript, React, Tailwind CSS, Framer Motion (when semantic motion is required)
- Visualization: SVG, Framer Motion, React Flow where appropriate
- No Three.js unless a concrete UX need cannot be solved with DOM/SVG
- Backend: Next.js server capabilities and API routes
- Data v1: typed local TypeScript; PostgreSQL + Prisma later behind repositories
- Auth: not in v1; future roles Admin / Owner / Public visitor
- AI: provider interface; never vendor-lock the app
- Deploy: Vercel-first
- Packages: npm

## Data-first rule

The UI must not contain project-specific markup. A project is data. The same object (or repository join) powers Mission Control, Project Lab, search, city, detail, architecture, use cases, activity, and related projects.

Adding a project requires:

1. Project data
2. Assets
3. Architecture data
4. Use-case data

No core UI rewrite.

## Type system

Use strict TypeScript. No `any` unless unavoidable. Discriminated unions where useful.

ProjectStatus: `planning | building | testing | active | completed | archived`

ActivityType: `PROJECT | RESEARCH | INTERNSHIP | CERTIFICATION | HACKATHON | CONFERENCE | LEARNING | STARTUP | GITHUB | ACHIEVEMENT`

## Routing

Stable public routes:

- `/`
- `/mission-control`
- `/projects`
- `/projects/[slug]` (never per-project page files)
- `/city`
- `/research`
- `/experience`
- `/github`
- `/resume`
- `/contact`

Future: `/admin` (not v1)

## Window system

Reusable window manager: open, close, minimize, maximize, restore, focus, z-order, drag on desktop where appropriate. Not every page is a window. SEO-critical pages are normal routes. Windows are an interaction layer.

## Command palette

Ctrl+K and `/`. Search projects, research, experience, skills, city, applications, GitHub. Extensible commands (`open projects`, `search healthcare`, etc.).

## Subsystems (behavior contracts)

### Mission Control

Recruiter dashboard: identity, stack, missions, systems, activity, experience snapshot. Answer quickly: who, what he builds, technologies, current work, accomplishments that exist in data.

### Project Lab

Product-style catalog with filters and search (later phases). Cards from project data only.

### Project detail

Hero through related projects; tabs (Overview, Architecture, Use Cases, Data Flow, Technology, Results). Content from data. Hashes `#architecture` and `#use-cases` remain stable.

### Architecture explorer

Structured nodes and edges. Interactive selection. Play/pause/reset/zoom/fit. Animate data along edges only when communicating flow. Renderer must not know project names.

### Use-case explorer

Actors, use cases, relationships from data. Click a use case for description, preconditions, flow, output.

### Tharun City

Optional navigation. Locations in `data/city-locations.ts` drive the map; districts are derived. Never the only path.

### Research / Experience / BookMyShift HQ / GitHub

As specified in product vision. GitHub must fail soft. BookMyShift is a product HQ, not only a card.

### AI

Modular provider. Retrieval over trusted portfolio data. No hallucinated claims. Portfolio works if AI is down. AI never auto-publishes.

### Analytics

Privacy-conscious events. Never block render. No unnecessary personal data.

## Quality bar

WCAG-oriented: keyboard, focus, reduced motion, semantic HTML, accessible dialogs. Fast first render. Lazy heavy viz. Server components where possible. Loading / empty / error / retry on major subsystems.

## Execution rule

Do not redesign architecture, change the stack, remove modules, introduce major dependencies, or rewrite working features without explaining the reason and obtaining approval.

Never sacrifice maintainability for visual effects, performance for animation, security for convenience, or data integrity for speed.

When uncertain, stop and explain the architectural decision.
