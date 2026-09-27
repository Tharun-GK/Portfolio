# AI architecture

AI is optional. The site must work with `AI_PROVIDER=none` and no keys.

## Boundary

```
UI / API route
    → lib/ai/service.ts
        → AIProvider (lib/ai/provider.ts)
            → none | OpenAI | Anthropic | local (future)
```

Application code must depend on `AIProvider`, not a vendor SDK.

## Current implementation

- `UnavailableProvider` (`id: "none"`)
- `askPortfolioAssistant(question, context)` returns a structured error if unavailable
- `POST /api/ai` returns **503** when no provider is configured; **501** placeholder when a provider exists but request handling is not enabled yet
- System prompt (`lib/ai/prompts.ts`) forbids invented internships, metrics, employers, awards, and clinical claims

## Target assistant pipeline (Phase 12)

```
User query
    → Intent detection
    → Portfolio search / retrieval (projects, research, experience, skills, public GitHub)
    → Trusted context only
    → LLM
    → Grounded response
```

If context does not contain the answer, the assistant must say so.

## RAG (modular, not mandatory)

Documents → chunk → embed → vector store → retriever → LLM.

Do not block the base portfolio on embeddings or a vector database.

## Content automation (future admin)

AI may draft descriptions, tags, and activity entries. **Humans publish.** Never auto-publish.

## Security

- Keys only in server env (`AI_API_KEY`)
- Never expose keys to the client
- Rate-limit public AI endpoints before they accept user text
- Do not log prompts that contain unnecessary visitor PII
