# Data model

Version 1 is typed TypeScript in `data/`. `prisma/schema.prisma` documents the relational target. UI must not care which backend is used.

## Project

Stable identity is `slug` (example: `suraksha-astra`). Fields include title, descriptions, category/categories, status, progress, technologies, problem/solution/why, features, implementation, results, challenges, future improvements, metrics, timeline, links, images, `architectureId`, `useCaseId`, related slugs, tags, featured, `updatedAt`.

Status: `planning | building | testing | active | completed | archived`

Category: `ai-ml | full-stack | research | startup | healthcare | cybersecurity | other`

## Architecture graph

`ArchitectureGraph`: id, projectSlug, title, description, nodes[], edges[].

Node: id, label, type (`actor | client | service | processing | model | data | decision | external`), optional technology, description, purpose, input, output, responsibility.

Edge: id, source, target, optional label. Source/target must be node ids (enforced in unit tests).

## Use-case model

Actors, use cases (description, actorIds, preconditions, mainFlow, output), relationships (`associates | includes | extends`).

## Other aggregates

- **Mission**: status `planned | in-progress | blocked | complete`, progress, related project
- **Activity**: ActivityType union, date, optional related ids/href
- **Research / Experience / Skill / Profile / City** (districts → buildings → href)

## Seed systems

1. Suraksha-Astra — AI / cybersecurity / research; multimodal safety; layered risk; no invented production metrics
2. GKS-CARE — AI / healthcare; simulated monitoring; **not** clinically validated
3. BookMyShift — startup / workforce platform; verification → hire → completion → payment confirmation → ratings

## Repository API

```
getAllProjects()
getProjectBySlug(slug)
getFeaturedProjects()
getProjectsByCategory(category)
getArchitecture(projectSlug)
getUseCases(projectSlug)
```

Activities: `getAllActivities()`, `getActivitiesByProject(slug)`.

## Integrity rules

- Do not invent facts
- Do not claim clinical validation for GKS-CARE
- Do not put secrets in data files
- Related project slugs must exist before they are shown as links (future validation test)
