import { describe, expect, it } from "vitest";
import { resolveCommandQuery } from "@/lib/commands";

describe("resolveCommandQuery", () => {
  it("lists open commands when the query is empty", () => {
    const results = resolveCommandQuery("");
    expect(results.some((item) => item.href === "/mission-control")).toBe(true);
    expect(results.some((item) => item.href === "/projects")).toBe(true);
  });

  it("resolves open mission control", () => {
    const results = resolveCommandQuery("open mission control");
    expect(results[0]?.href).toBe("/mission-control");
  });

  it("expands Suraksha into project actions", () => {
    const results = resolveCommandQuery("Suraksha");
    expect(results.some((item) => item.href === "/projects/suraksha-astra")).toBe(true);
    expect(
      results.some((item) => item.href === "/projects/suraksha-astra#architecture"),
    ).toBe(true);
    expect(results.some((item) => item.description === "View Use Cases")).toBe(true);
  });

  it("finds healthcare from search", () => {
    const results = resolveCommandQuery("healthcare");
    expect(results.some((item) => item.href.includes("gks-care"))).toBe(true);
  });
});
