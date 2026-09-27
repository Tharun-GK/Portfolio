export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIGenerateInput {
  messages: AIMessage[];
  maxTokens?: number;
}

export interface AIGenerateResult {
  text: string;
  provider: string;
}

export interface AIProvider {
  readonly id: string;
  isAvailable(): boolean;
  generate(input: AIGenerateInput): Promise<AIGenerateResult>;
}
