import { architectures } from "@/data/architectures";
import { projects } from "@/data/projects";
import { useCaseModels } from "@/data/use-cases";
import type { ProjectRepository } from "@/lib/repositories/project-repository";
import type { ArchitectureGraph } from "@/types/architecture";
import type { Project, ProjectCategory } from "@/types/project";
import type { UseCaseModel } from "@/types/use-case";

function clone<T>(value: T): T {
  return structuredClone(value);
}

export class StaticProjectRepository implements ProjectRepository {
  async getAllProjects(): Promise<Project[]> {
    return clone(projects);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const project = projects.find((item) => item.slug === slug);
    return project ? clone(project) : null;
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return clone(projects.filter((item) => item.featured));
  }

  async getProjectsByCategory(category: ProjectCategory): Promise<Project[]> {
    return clone(
      projects.filter(
        (item) => item.category === category || item.categories.includes(category),
      ),
    );
  }

  async getArchitecture(projectSlug: string): Promise<ArchitectureGraph | null> {
    const graph = architectures.find((item) => item.projectSlug === projectSlug);
    return graph ? clone(graph) : null;
  }

  async getUseCases(projectSlug: string): Promise<UseCaseModel | null> {
    const model = useCaseModels.find((item) => item.projectSlug === projectSlug);
    return model ? clone(model) : null;
  }
}

const staticProjectRepository = new StaticProjectRepository();

export function getProjectRepository(): ProjectRepository {
  return staticProjectRepository;
}
