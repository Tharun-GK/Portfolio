import { experienceItems } from "@/data/experience";
import { missions } from "@/data/missions";
import { profile } from "@/data/profile";
import { researchItems } from "@/data/research";
import { skills } from "@/data/skills";
import { getGitHubSnapshot } from "@/lib/github";
import {
  buildMissionControlBrief,
  toMissionControlProject,
  type MissionControlSnapshot,
} from "@/lib/mission-control";
import { getActivityRepository } from "@/lib/repositories/static-activity-repository";
import { getProjectRepository } from "@/lib/repositories/static-project-repository";

export async function getMissionControlSnapshot(): Promise<MissionControlSnapshot> {
  const projectRepository = getProjectRepository();
  const [projects, activities, github] = await Promise.all([
    projectRepository.getFeaturedProjects(),
    getActivityRepository().getAllActivities(),
    getGitHubSnapshot(),
  ]);

  const catalog = projects.map(toMissionControlProject);
  const bookmyshift = await projectRepository.getProjectBySlug("bookmyshift");

  return {
    brief: buildMissionControlBrief({
      name: profile.name,
      role: profile.role,
      projects: catalog,
      skills,
      missions,
      research: researchItems,
      experience: experienceItems,
    }),
    skills,
    missions,
    projects: catalog,
    startup: bookmyshift
      ? {
          slug: bookmyshift.slug,
          title: bookmyshift.title,
          shortDescription: bookmyshift.shortDescription,
          status: bookmyshift.status,
          progress: bookmyshift.progress,
        }
      : null,
    research: researchItems,
    activities,
    experience: experienceItems,
    github,
  };
}
