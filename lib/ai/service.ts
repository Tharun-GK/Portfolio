import type { AIGenerateInput, AIGenerateResult, AIProvider } from "@/lib/ai/provider";
import { PORTFOLIO_ASSISTANT_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { logger } from "@/lib/logger";

class UnavailableProvider implements AIProvider {
  readonly id = "none";

  isAvailable(): boolean {
    return false;
  }

  async generate(): Promise<AIGenerateResult> {
    throw new Error("AI provider is not configured.");
  }
}

const provider: AIProvider = new UnavailableProvider();

export function getAIProvider(): AIProvider {
  return provider;
}

export async function askPortfolioAssistant(
  question: string,
  context: string,
): Promise<{ ok: true; text: string } | { ok: false; error: string }> {
  if (!provider.isAvailable()) {
    return {
      ok: false,
      error: "AI services are unavailable. The portfolio remains fully usable without them.",
    };
  }

  const input: AIGenerateInput = {
    messages: [
      { role: "system", content: PORTFOLIO_ASSISTANT_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Portfolio context:\n${context}\n\nQuestion:\n${question}`,
      },
    ],
  };

  try {
    const result = await provider.generate(input);
    return { ok: true, text: result.text };
  } catch (error) {
    logger.error("ai_generate_failed", {
      reason: error instanceof Error ? error.message : "unknown",
    });
    return {
      ok: false,
      error: "The assistant could not complete this request.",
    };
  }
}
