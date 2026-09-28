import type { UseCaseModel, UseCaseRelationship } from "@/types/use-case";

export const UC_BOX_WIDTH = 176;
export const UC_BOX_HEIGHT = 56;
const GAP_Y = 18;
const GAP_X = 120;
const PAD = 28;

export interface LayoutBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  kind: "actor" | "use-case";
}

export interface UseCaseLayout {
  width: number;
  height: number;
  boxes: Record<string, LayoutBox>;
}

export function layoutUseCaseModel(model: UseCaseModel): UseCaseLayout {
  const rows = Math.max(model.actors.length, model.useCases.length, 1);
  const height = PAD * 2 + rows * UC_BOX_HEIGHT + Math.max(0, rows - 1) * GAP_Y;
  const boxes: Record<string, LayoutBox> = {};

  const place = (
    ids: { id: string }[],
    column: number,
    kind: LayoutBox["kind"],
  ) => {
    const colH = ids.length * UC_BOX_HEIGHT + Math.max(0, ids.length - 1) * GAP_Y;
    const startY = PAD + (height - PAD * 2 - colH) / 2;
    ids.forEach((item, index) => {
      boxes[item.id] = {
        id: item.id,
        kind,
        x: PAD + column * (UC_BOX_WIDTH + GAP_X),
        y: startY + index * (UC_BOX_HEIGHT + GAP_Y),
        width: UC_BOX_WIDTH,
        height: UC_BOX_HEIGHT,
      };
    });
  };

  place(model.actors, 0, "actor");
  place(model.useCases, 1, "use-case");

  const width = PAD * 2 + 2 * UC_BOX_WIDTH + GAP_X;
  return { width, height, boxes };
}

export function relationshipPath(
  from: LayoutBox,
  to: LayoutBox,
): string {
  const x1 = from.x + from.width;
  const y1 = from.y + from.height / 2;
  const x2 = to.x;
  const y2 = to.y + to.height / 2;
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`;
}

export function dashForKind(kind: UseCaseRelationship["kind"]): string | undefined {
  if (kind === "includes") {
    return "8 5";
  }
  if (kind === "extends") {
    return "3 5";
  }
  return undefined;
}
