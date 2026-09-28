# Design system

## Purpose

Color, type, and motion exist to encode **status, interaction, data flow, and system state**. They are not decoration.

## Tokens

Source of truth: CSS custom properties in `app/globals.css`. Typed accessors: `lib/design-tokens.ts`.

### Surfaces

| Token | Role |
| --- | --- |
| `--bg` | Graphite page |
| `--panel` | Cards / modules |
| `--panel-hover` | Hover affordance |
| `--panel-strong` | Header/nav contrast |
| `--border` | Structure |
| `--text` / `--muted` | Hierarchy |
| `--accent` / `--focus` | Interaction and focus ring |

Accent on public routes is restrained (warm metal). The OS shell (`os-shell`) uses cyan/amber system illumination scoped to the homepage environment only.

### Status (projects)

| Status | Token |
| --- | --- |
| Planning | `--status-planning` |
| Building | `--status-building` |
| Testing | `--status-testing` |
| Active | `--status-active` |
| Completed | `--status-completed` |
| Archived | `--status-archived` |

Missions: blocked uses `--status-blocked`. Other mission states map onto the project scale.

### Architecture nodes

`--node-actor` … `--node-external` tint structure, not brands of specific projects.

## Typography

- IBM Plex Sans: UI and body
- IBM Plex Mono: kicker labels, activity dates, system metadata
- Heading hierarchy is semantic (`h1` in the shell, `h2` in sections)

## Components

| Primitive | Path |
| --- | --- |
| Panel | `components/design/Panel.tsx` |
| StatusBadge | `components/design/StatusBadge.tsx` |
| ProgressBar | `components/design/ProgressBar.tsx` |
| SectionHeading | `components/design/SectionHeading.tsx` |
| Button / Badge / Modal / Tooltip / Loading / EmptyState / ErrorBoundary | `components/shared/` |
| PublicShell / MobileNav | `components/layout/` |
| CityMap / CityNavigation / CityInspect / District / Building | `components/city/` |
| ArchitectureViewer / ArchitectureExplorer / UseCaseViewer / UseCaseExplorer / ProjectDetailTabs | `components/projects/` |

Pages should compose these instead of repeating border/background utilities.

## Motion

- Token durations: `--motion-fast`, `--motion-medium`
- `prefers-reduced-motion` disables animations and shortens transitions globally
- **No Framer Motion in Phase 2.** Add it in Phase 3 for boot/windows only if the motion communicates state
- Progress bars are static width, not looping animation

## Layout

- Desktop: full primary nav in the header
- Mobile: do not fake a window manager. Bottom nav: Home, Projects, Research, Experience, Resume, Contact (`MOBILE_ROUTES`)
- Skip link present
- Focus rings use `--focus`

## Anti-patterns

Glassmorphism stacks, particle backgrounds, rainbow gradients, animation on every card, status colors used as decoration on unrelated UI.
