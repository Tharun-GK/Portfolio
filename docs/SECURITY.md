# Security

## Boundaries

**Public:** portfolio copy, project data, research, experience, public GitHub metadata.

**Private:** `DATABASE_URL`, `GITHUB_TOKEN`, `AI_API_KEY`, analytics secrets, future admin operations.

Never send private values through public JSON APIs. `/api/projects` returns catalog fields only, not secrets (there are none in project records).

## Environment

- Local secrets: `.env.local` (gitignored)
- Committed template: `.env.example` with empty values
- `NEXT_PUBLIC_SITE_URL` is the only public env expected in v1
- Do not put tokens in `NEXT_PUBLIC_*`

## Current controls

- `poweredByHeader: false` in Next config
- GitHub token used only on the server, sent as `Authorization: Bearer`
- Structured logger must not include secrets or unnecessary visitor data
- Contact page has no form backend in v1 (no stored PII from visitors)
- AI route does not accept a body yet; when it does, validate and rate-limit

## Upcoming (Phase 15)

- Rate-limit `POST /api/ai`
- Validate/sanitize any user-generated strings
- CSP / security headers via Next or Vercel
- Dependency audit before production

## Threat notes

- GitHub username is not a secret; token is
- Fallback GitHub state must not imply a fetch succeeded
- Do not log raw authorization headers
