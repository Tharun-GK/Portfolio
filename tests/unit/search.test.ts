import { describe, expect, it } from "vitest";
import { searchPortfolio } from "@/lib/search";

describe("searchPortfolio", () => {
  it("ranks an exact project title highly", () => {
    const [first] = searchPortfolio("Suraksha-Astra");
    expect(first?.kind).toBe("project");
    expect(first?.href).toBe("/projects/suraksha-astra");
  });

  it("finds healthcare work from a domain query", () => {
    const results = searchPortfolio("healthcare");
    expect(results.some((item) => item.href === "/projects/gks-care")).toBe(true);
  });

  it("finds python as a skill", () => {
    const results = searchPortfolio("python");
    expect(results.some((item) => item.kind === "skill" && item.title === "Python")).toBe(
      true,
    );
  });
});
