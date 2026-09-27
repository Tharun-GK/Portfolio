import type { ArchitectureGraph } from "@/types/architecture";
import type { Project, ProjectCategory } from "@/types/project";
import type { UseCaseModel } from "@/types/use-case";

export interface ProjectRepository {
  getAllProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectsByCategory(category: ProjectCategory): Promise<Project[]>;
  getArchitecture(projectSlug: string): Promise<ArchitectureGraph | null>;
  getUseCases(projectSlug: string): Promise<UseCaseModel | null>;
}
