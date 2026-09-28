import type { Activity } from "@/types/activity";
import type { ExperienceItem } from "@/types/experience";
import type { Mission } from "@/types/mission";
import type { Skill } from "@/types/profile";
import type { Project, ProjectCategory, ProjectStatus } from "@/types/project";
import { PROJECT_CATEGORY_LABEL } from "@/lib/constants";
import type { ResearchItem } from "@/types/research";
import type { GitHubSnapshot } from "@/lib/github";

export interface MissionControlProject {
  slug: string;
  title: string;
  shortDescription: string;
  status: ProjectStatus;
  progress: number;
  technologies: string[];
  categories: ProjectCategory[];
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

export function projectStatusCounts(
  projects: MissionControlProject[],
): Partial<Record<ProjectStatus, number>> {
  const counts: Partial<Record<ProjectStatus, number>> = {};
  for (const project of projects) {
    counts[project.status] = (counts[project.status] ?? 0) + 1;
  }
  return counts;
}

export function toMissionControlProject(project: Project): MissionControlProject {
  return {
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    status: project.status,
    progress: project.progress,
    technologies: project.technologies.slice(0, 4),
    categories: project.categories,
  };
}

export function projectCategoryCaption(project: MissionControlProject): string {
  return project.categories
    .slice(0, 2)
    .map((category) => PROJECT_CATEGORY_LABEL[category] ?? category)
    .join(" / ");
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
