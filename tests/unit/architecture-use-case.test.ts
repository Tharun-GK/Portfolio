import { describe, expect, it } from "vitest";
import { surakshaAstraArchitecture } from "@/data/architectures/suraksha-astra";
import { surakshaAstraUseCases } from "@/data/use-cases/suraksha-astra";

describe("architecture graph integrity", () => {
  it("only references existing node ids on edges", () => {
    const ids = new Set(surakshaAstraArchitecture.nodes.map((node) => node.id));
    for (const edge of surakshaAstraArchitecture.edges) {
      expect(ids.has(edge.source)).toBe(true);
      expect(ids.has(edge.target)).toBe(true);
    }
  });
});

describe("use-case model integrity", () => {
  it("only references existing actors and use cases", () => {
    const actors = new Set(surakshaAstraUseCases.actors.map((actor) => actor.id));
    const useCases = new Set(surakshaAstraUseCases.useCases.map((item) => item.id));

    for (const relationship of surakshaAstraUseCases.relationships) {
      expect(actors.has(relationship.actorId)).toBe(true);
      expect(useCases.has(relationship.useCaseId)).toBe(true);
    }
  });
});
