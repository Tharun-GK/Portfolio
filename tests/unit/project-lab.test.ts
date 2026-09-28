import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { parseProjectLabQuery, queryProjectLab } from "@/lib/project-lab";

describe("parseProjectLabQuery", () => {
  it("defaults to all / featured", () => {
    expect(parseProjectLabQuery({})).toEqual({ q: "", category: "all", sort: "featured" });
  });

  it("ignores unknown category and sort values", () => {
    expect(parseProjectLabQuery({ category: "space", sort: "popular" })).toEqual({
      q: "",
      category: "all",
      sort: "featured",
    });
  });
});

describe("queryProjectLab", () => {
  it("filters healthcare systems", () => {
    const result = queryProjectLab(projects, {
      q: "",
      category: "healthcare",
      sort: "featured",
    });
    expect(result.map((item) => item.slug)).toEqual(["gks-care"]);
  });

  it("finds Suraksha from search text", () => {
    const result = queryProjectLab(projects, {
      q: "Suraksha",
      category: "all",
      sort: "featured",
    });
    expect(result[0]?.slug).toBe("suraksha-astra");
  });

  it("finds python across technologies", () => {
    const result = queryProjectLab(projects, {
      q: "python",
      category: "all",
      sort: "featured",
    });
    expect(result.some((item) => item.slug === "suraksha-astra")).toBe(true);
  });

  it("ranks higher-progress in-progress systems first when sorting by active", () => {
    const result = queryProjectLab(projects, {
      q: "",
      category: "all",
      sort: "active",
    });
    expect(result[0]?.slug).toBe("suraksha-astra");
  });
});
