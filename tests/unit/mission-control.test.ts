import { describe, expect, it } from "vitest";
import { missions } from "@/data/missions";
import { profile } from "@/data/profile";
import { researchItems } from "@/data/research";
import { skills } from "@/data/skills";
import { experienceItems } from "@/data/experience";
import { buildMissionControlBrief, toMissionControlProject } from "@/lib/mission-control";
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
