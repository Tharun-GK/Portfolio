import Link from "next/link";
import { Panel } from "@/components/design/Panel";
import { ProgressBar } from "@/components/design/ProgressBar";
import { StatusBadge } from "@/components/design/StatusBadge";
import { PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/shared/Badge";
import { PROJECT_CATEGORY_LABEL } from "@/lib/constants";
import { getProjectRepository } from "@/lib/repositories";

export default async function ProjectsPage() {
  const projects = await getProjectRepository().getAllProjects();

  return (
    <PublicShell
      title="Project Lab"
      description="Systems presented as products. Filters, architecture, and explorers expand in later phases — the data model already powers these cards."
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id}>
            <Panel as="article" className="h-full">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-medium">
                  <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                </h2>
                <StatusBadge status={project.status} />
                <Badge>{PROJECT_CATEGORY_LABEL[project.category] ?? project.category}</Badge>
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">{project.shortDescription}</p>
              <div className="mt-4">
                <ProgressBar value={project.progress} label="Progress" />
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <Badge>{tech}</Badge>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm">
                <Link href={`/projects/${project.slug}`}>Explore →</Link>
              </p>
            </Panel>
          </li>
        ))}
      </ul>
    </PublicShell>
  );
}
