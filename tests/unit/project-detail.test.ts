import { describe, expect, it } from "vitest";
import { hashForTab, tabFromHash } from "@/lib/project-detail";

describe("project detail tabs", () => {
  it("maps architecture and use-case hashes used by commands", () => {
    expect(tabFromHash("#architecture")).toBe("architecture");
    expect(tabFromHash("#use-cases")).toBe("use-cases");
    expect(tabFromHash("#data-flow")).toBe("data-flow");
    expect(tabFromHash("")).toBe("overview");
    expect(tabFromHash("#unknown")).toBe("overview");
  });

  it("keeps overview as a clean path", () => {
    expect(hashForTab("overview")).toBe("");
    expect(hashForTab("architecture")).toBe("#architecture");
  });
});
