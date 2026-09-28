import { describe, expect, it } from "vitest";
import { architectures } from "@/data/architectures";
import { surakshaAstraArchitecture } from "@/data/architectures/suraksha-astra";
import { useCaseModels } from "@/data/use-cases";
import { surakshaAstraUseCases } from "@/data/use-cases/suraksha-astra";
import {
  flowEdgeOrder,
  layoutArchitectureGraph,
  orderedLayers,
} from "@/lib/architecture-layout";
import { layoutUseCaseModel } from "@/lib/use-case-layout";

describe("architecture graph integrity", () => {
  it("only references existing node ids on edges for every graph", () => {
    for (const graph of architectures) {
      const ids = new Set(graph.nodes.map((node) => node.id));
      for (const edge of graph.edges) {
        expect(ids.has(edge.source), `${graph.id}:${edge.id}`).toBe(true);
        expect(ids.has(edge.target), `${graph.id}:${edge.id}`).toBe(true);
      }
    }
  });
});

describe("architecture layout", () => {
  it("places every node and keeps finite coordinates", () => {
    const layout = layoutArchitectureGraph(surakshaAstraArchitecture);
    expect(Object.keys(layout.boxes)).toHaveLength(surakshaAstraArchitecture.nodes.length);
    expect(layout.width).toBeGreaterThan(0);
    expect(layout.height).toBeGreaterThan(0);
    for (const node of surakshaAstraArchitecture.nodes) {
      const box = layout.boxes[node.id];
      expect(box).toBeDefined();
      expect(Number.isFinite(box.x)).toBe(true);
      expect(Number.isFinite(box.y)).toBe(true);
    }
  });

  it("orders flow edges without dropping any", () => {
    const ordered = flowEdgeOrder(surakshaAstraArchitecture);
    expect(ordered).toHaveLength(surakshaAstraArchitecture.edges.length);
    expect(new Set(ordered.map((edge) => edge.id)).size).toBe(
      surakshaAstraArchitecture.edges.length,
    );
  });

  it("puts sources in an earlier or equal layer than targets when possible", () => {
    const layers = orderedLayers(surakshaAstraArchitecture);
    const index = new Map<string, number>();
    layers.forEach((layer, i) => {
      for (const id of layer) {
        index.set(id, i);
      }
    });
    for (const edge of surakshaAstraArchitecture.edges) {
      expect(index.get(edge.source) ?? 0).toBeLessThanOrEqual(index.get(edge.target) ?? 0);
    }
  });
});

describe("use-case model integrity", () => {
  it("only references existing actors and use cases on every model", () => {
    for (const model of useCaseModels) {
      const actors = new Set(model.actors.map((actor) => actor.id));
      const useCases = new Set(model.useCases.map((item) => item.id));
      for (const relationship of model.relationships) {
        expect(actors.has(relationship.actorId)).toBe(true);
        expect(useCases.has(relationship.useCaseId)).toBe(true);
      }
    }
  });
});

describe("use-case layout", () => {
  it("places every actor and use case", () => {
    const layout = layoutUseCaseModel(surakshaAstraUseCases);
    for (const actor of surakshaAstraUseCases.actors) {
      expect(layout.boxes[actor.id]?.kind).toBe("actor");
    }
    for (const item of surakshaAstraUseCases.useCases) {
      expect(layout.boxes[item.id]?.kind).toBe("use-case");
    }
  });
});
