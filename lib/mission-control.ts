import type { Activity } from "@/types/activity";
import type { ExperienceItem } from "@/types/experience";
import type { Mission } from "@/types/mission";
import type { Skill } from "@/types/profile";
import type { Project, ProjectStatus } from "@/types/project";
import type { ResearchItem } from "@/types/research";
import type { GitHubSnapshot } from "@/lib/github";

export interface MissionControlProject {
  slug: string;
  title: string;
  shortDescription: string;
  status: ProjectStatus;
  progress: number;
  technologies: string[];
}

export interface MissionControlStartup {
  slug: string;
  title: string;
  shortDescription: string;
  status: ProjectStatus;
  progress: number;
}

export interface MissionControlBrief {
  who: string;
  builds: string;
  technologies: string;
  workingOn: string;
  onRecord: string;
}

export interface MissionControlSnapshot {
  brief: MissionControlBrief;
  skills: Skill[];
  missions: Mission[];
  projects: MissionControlProject[];
  startup: MissionControlStartup | null;
  research: ResearchItem[];
  activities: Activity[];
  experience: ExperienceItem[];
  github: GitHubSnapshot;
}

export function toMissionControlProject(project: Project): MissionControlProject {
  return {
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    status: project.status,
    progress: project.progress,
    technologies: project.technologies.slice(0, 4),
  };
}

export function buildMissionControlBrief(input: {
  name: string;
  role: string;
  projects: MissionControlProject[];
  skills: Skill[];
  missions: Mission[];
  research: ResearchItem[];
  experience: ExperienceItem[];
}): MissionControlBrief {
  const activeMissions = input.missions.filter(
    (mission) => mission.status === "in-progress" || mission.status === "planned",
  );

  const onRecordParts = [
    ...input.experience.map((item) => `${item.role}, ${item.organization}`),
    ...input.research.map((item) => item.title),
  ];

  return {
    who: `${input.name} — ${input.role}`,
    builds: input.projects.map((project) => project.title).join(" · ") || "No systems listed.",
    technologies: input.skills.map((skill) => skill.name).join(", "),
    workingOn:
      activeMissions.map((mission) => mission.title).join(" · ") || "No active missions listed.",
    onRecord: onRecordParts.join(" · ") || "No additional records in the portfolio data.",
  };
}
