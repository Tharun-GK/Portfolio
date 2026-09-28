import Link from "next/link";
import { StatusBadge } from "@/components/design/StatusBadge";
import { ProjectMetrics } from "@/components/projects/ProjectMetrics";
import { Badge } from "@/components/shared/Badge";
import { PROJECT_CATEGORY_LABEL } from "@/lib/constants";
import type { Project } from "@/types/project";

interface ProjectHeroProps {
  project: Project;
  related: Project[];
}

export function ProjectHero({ project, related }: ProjectHeroProps) {
  const links = [
    project.links.github ? { href: project.links.github, label: "GitHub" } : null,
    project.links.liveDemo ? { href: project.links.liveDemo, label: "Live demo" } : null,
    project.links.document ? { href: project.links.document, label: "Document" } : null,
  ].filter((item): item is { href: string; label: string } => item !== null);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        {project.categories.map((category) => (
          <Badge key={category}>{PROJECT_CATEGORY_LABEL[category] ?? category}</Badge>
        ))}
      </div>
      <ProjectMetrics progress={project.progress} />
      <p className="max-w-prose text-sm leading-6 text-[var(--muted)]">{project.description}</p>
      {links.length ? (
        <ul className="flex flex-wrap gap-3 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:underline" rel="noreferrer noopener" target="_blank">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      {related.length ? (
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
            Related systems
          </p>
          <ul className="mt-2 flex flex-wrap gap-3 text-sm">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/projects/${item.slug}`} className="hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
