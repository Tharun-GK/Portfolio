import Link from "next/link";
import { Panel } from "@/components/design/Panel";
import { ProjectMetrics } from "@/components/projects/ProjectMetrics";
import { ProjectStatus } from "@/components/projects/ProjectStatus";
import { TechnologyBadge } from "@/components/projects/TechnologyBadge";
import { Badge } from "@/components/shared/Badge";
import { PROJECT_CATEGORY_LABEL } from "@/lib/constants";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Panel as="article" className="flex h-full flex-col">
      <div
        aria-hidden
        className="mb-4 flex h-24 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--panel-strong)] font-mono text-xs text-[var(--muted)]"
      >
        {project.title}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-medium">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h2>
        <ProjectStatus status={project.status} />
        <Badge>{PROJECT_CATEGORY_LABEL[project.category] ?? project.category}</Badge>
      </div>
      <p className="mt-3 flex-1 text-sm text-[var(--muted)]">{project.shortDescription}</p>
      <div className="mt-4">
        <ProjectMetrics progress={project.progress} />
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <li key={tech}>
            <TechnologyBadge>{tech}</TechnologyBadge>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex flex-wrap gap-4 text-sm">
        <Link href={`/projects/${project.slug}`}>Explore</Link>
        {project.links.github ? (
          <Link href={project.links.github} rel="noreferrer" target="_blank">
            GitHub
          </Link>
        ) : null}
      </p>
    </Panel>
  );
}
