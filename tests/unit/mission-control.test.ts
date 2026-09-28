import { describe, expect, it } from "vitest";
import { missions } from "@/data/missions";
import { profile } from "@/data/profile";
import { researchItems } from "@/data/research";
import { skills } from "@/data/skills";
import { experienceItems } from "@/data/experience";
import {
  buildMissionControlBrief,
  projectCategoryCaption,
  projectStatusCounts,
  toMissionControlProject,
} from "@/lib/mission-control";
import { commandNavUsesExistingRoutes, isCommandNavActive } from "@/lib/command-nav";
import { projects } from "@/data/projects";

describe("buildMissionControlBrief", () => {
  it("answers recruiter questions from existing records", () => {
    const brief = buildMissionControlBrief({
      name: profile.name,
      role: profile.role,
      projects: projects.map(toMissionControlProject),
      skills,
      missions,
      research: researchItems,
      experience: experienceItems,
    });

    expect(brief.who).toContain("Tharun G K");
    expect(brief.builds).toContain("Suraksha-Astra");
    expect(brief.builds).toContain("BookMyShift");
    expect(brief.technologies).toContain("Python");
    expect(brief.workingOn.length).toBeGreaterThan(10);
    expect(brief.onRecord).toContain("Founder");
    expect(brief.onRecord).not.toContain("clinically validated");
  });
});

describe("projectStatusCounts", () => {
  it("tallies only statuses that exist on projects", () => {
    const counts = projectStatusCounts(projects.map(toMissionControlProject));
    const total = Object.values(counts).reduce((sum, value) => sum + (value ?? 0), 0);
    expect(total).toBe(projects.length);
  });
});

describe("project progress source of truth", () => {
  it("keeps published project progress values", () => {
    const mapped = Object.fromEntries(
      projects.map(toMissionControlProject).map((project) => [project.slug, project.progress]),
    );
    expect(mapped["suraksha-astra"]).toBe(70);
    expect(mapped["gks-care"]).toBe(55);
    expect(mapped["bookmyshift"]).toBe(60);
  });

  it("captions categories from existing labels", () => {
    const suraksha = toMissionControlProject(
      projects.find((item) => item.slug === "suraksha-astra")!,
    );
    expect(projectCategoryCaption(suraksha)).toContain("Cybersecurity");
  });
});

describe("command navigation", () => {
  it("only links to existing public routes", () => {
    expect(commandNavUsesExistingRoutes()).toBe(true);
  });

  it("marks home and mission control from the real pathname", () => {
    expect(isCommandNavActive("/", "/")).toBe(true);
    expect(isCommandNavActive("/", "/mission-control")).toBe(false);
    expect(isCommandNavActive("/mission-control", "/")).toBe(false);
    expect(isCommandNavActive("/mission-control", "/mission-control")).toBe(true);
    expect(isCommandNavActive("/projects", "/projects/bookmyshift")).toBe(true);
    expect(isCommandNavActive("/research", "/mission-control")).toBe(false);
    expect(isCommandNavActive("/#stack", "/", "stack")).toBe(true);
    expect(isCommandNavActive("/", "/", "stack")).toBe(false);
  });
});
