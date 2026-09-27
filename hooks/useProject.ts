import { getProjectRepository } from "@/lib/repositories";
import type { Project } from "@/types/project";

export async function getProject(slug: string): Promise<Project | null> {
  return getProjectRepository().getProjectBySlug(slug);
}

export async function listProjects(): Promise<Project[]> {
  return getProjectRepository().getAllProjects();
}
