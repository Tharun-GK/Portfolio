import { describe, expect, it } from "vitest";
import {
  clampProgress,
  getArchitectureNodeColor,
  getMissionStatusColor,
  getProjectStatusColor,
} from "@/lib/design-tokens";

describe("design tokens", () => {
  it("maps project status to CSS variables", () => {
    expect(getProjectStatusColor("active")).toBe("var(--status-active)");
    expect(getProjectStatusColor("archived")).toBe("var(--status-archived)");
  });

  it("uses a distinct blocked color for missions", () => {
    expect(getMissionStatusColor("blocked")).toBe("var(--status-blocked)");
    expect(getMissionStatusColor("in-progress")).toBe("var(--status-building)");
  });

  it("maps architecture node types without project-specific knowledge", () => {
    expect(getArchitectureNodeColor("decision")).toBe("var(--node-decision)");
    expect(getArchitectureNodeColor("model")).toBe("var(--node-model)");
  });

  it("clamps progress into a percent range", () => {
    expect(clampProgress(140)).toBe(100);
    expect(clampProgress(-4)).toBe(0);
    expect(clampProgress(33.4)).toBe(33);
  });
});
