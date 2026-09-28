import type { ArchitectureEdge, ArchitectureGraph } from "@/types/architecture";

export const ARCH_NODE_WIDTH = 188;
export const ARCH_NODE_HEIGHT = 68;
const GAP_X = 70;
const GAP_Y = 28;
const PAD = 28;

export interface LayoutBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ArchitectureLayout {
  width: number;
  height: number;
  boxes: Record<string, LayoutBox>;
  layers: string[][];
}

export function orderedLayers(graph: ArchitectureGraph): string[][] {
  const ids = graph.nodes.map((node) => node.id);
  const outgoing = new Map<string, string[]>();
  const indegree = new Map<string, number>();

  for (const id of ids) {
    outgoing.set(id, []);
    indegree.set(id, 0);
  }

  for (const edge of graph.edges) {
    if (!indegree.has(edge.source) || !indegree.has(edge.target)) {
      continue;
    }
    outgoing.get(edge.source)?.push(edge.target);
    indegree.set(edge.target, (indegree.get(edge.target) ?? 0) + 1);
  }

  const remaining = new Set(ids);
  const layers: string[][] = [];
  let frontier = ids.filter((id) => indegree.get(id) === 0);

  while (frontier.length) {
    layers.push(frontier);
    for (const id of frontier) {
      remaining.delete(id);
    }
    const next: string[] = [];
    const seen = new Set<string>();
    for (const id of frontier) {
      for (const target of outgoing.get(id) ?? []) {
        if (!remaining.has(target)) {
          continue;
        }
        const degree = (indegree.get(target) ?? 1) - 1;
        indegree.set(target, degree);
        if (degree <= 0 && !seen.has(target)) {
          seen.add(target);
          next.push(target);
        }
      }
    }
    frontier = next;
  }

  if (remaining.size) {
    layers.push([...remaining]);
  }

  return layers;
}

export function layoutArchitectureGraph(graph: ArchitectureGraph): ArchitectureLayout {
  const nodeOrder = new Map(graph.nodes.map((node, index) => [node.id, index]));
  const layers = orderedLayers(graph).map((layer) =>
    [...layer].sort((a, b) => (nodeOrder.get(a) ?? 0) - (nodeOrder.get(b) ?? 0)),
  );
  const tallest = Math.max(...layers.map((layer) => layer.length), 1);
  const height = PAD * 2 + tallest * ARCH_NODE_HEIGHT + Math.max(0, tallest - 1) * GAP_Y;
  const boxes: Record<string, LayoutBox> = {};

  layers.forEach((layer, column) => {
    const columnHeight =
      layer.length * ARCH_NODE_HEIGHT + Math.max(0, layer.length - 1) * GAP_Y;
    const startY = PAD + (height - PAD * 2 - columnHeight) / 2;
    layer.forEach((id, row) => {
      boxes[id] = {
        id,
        x: PAD + column * (ARCH_NODE_WIDTH + GAP_X),
        y: startY + row * (ARCH_NODE_HEIGHT + GAP_Y),
        width: ARCH_NODE_WIDTH,
        height: ARCH_NODE_HEIGHT,
      };
    });
  });

  const width =
    PAD * 2 + layers.length * ARCH_NODE_WIDTH + Math.max(0, layers.length - 1) * GAP_X;

  return { width, height, boxes, layers };
}

export function cubicEdgePath(from: LayoutBox, to: LayoutBox): string {
  const x1 = from.x + from.width;
  const y1 = from.y + from.height / 2;
  const x2 = to.x;
  const y2 = to.y + to.height / 2;
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`;
}

export function flowEdgeOrder(graph: ArchitectureGraph): ArchitectureEdge[] {
  const layerIndex = new Map<string, number>();
  orderedLayers(graph).forEach((layer, index) => {
    for (const id of layer) {
      layerIndex.set(id, index);
    }
  });

  const original = new Map(graph.edges.map((edge, index) => [edge.id, index]));

  return [...graph.edges].sort((a, b) => {
    const sourceDelta = (layerIndex.get(a.source) ?? 0) - (layerIndex.get(b.source) ?? 0);
    if (sourceDelta !== 0) {
      return sourceDelta;
    }
    return (original.get(a.id) ?? 0) - (original.get(b.id) ?? 0);
  });
}

export function pointOnPath(
  path: SVGPathElement,
  progress: number,
): { x: number; y: number } {
  const length = path.getTotalLength();
  const clamped = Math.min(1, Math.max(0, progress));
  const point = path.getPointAtLength(length * clamped);
  return { x: point.x, y: point.y };
}
