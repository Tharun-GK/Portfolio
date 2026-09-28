import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { Project } from "@/types/project";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <EmptyState
        title="No systems match this query."
        description="Clear search or choose All to see the full lab."
      />
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
