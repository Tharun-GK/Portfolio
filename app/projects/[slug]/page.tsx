import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Panel } from "@/components/design/Panel";
import { StatusBadge } from "@/components/design/StatusBadge";
import { PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/shared/Badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { PROJECT_CATEGORY_LABEL } from "@/lib/constants";
import { getArchitectureNodeColor } from "@/lib/design-tokens";
import { getProjectRepository } from "@/lib/repositories";
import { getSiteUrl } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjectRepository().getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectRepository().getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const url = `${getSiteUrl()}/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const repository = getProjectRepository();
  const project = await repository.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const architecture = project.architectureId
    ? await repository.getArchitecture(project.slug)
    : null;
  const useCases = project.useCaseId
    ? await repository.getUseCases(project.slug)
    : null;

  return (
    <PublicShell title={project.title} description={project.shortDescription}>
      <div className="flex flex-wrap gap-2">
        <StatusBadge status={project.status} />
        {project.categories.map((category) => (
          <Badge key={category}>
            {PROJECT_CATEGORY_LABEL[category] ?? category}
          </Badge>
        ))}
      </div>

      <div className="mt-8 grid gap-8">
        <section>
          <h2 className="text-lg font-medium">Problem</h2>
          <p className="mt-2 max-w-prose text-sm leading-6 text-[var(--muted)]">
            {project.problem}
          </p>
        </section>
        <section>
          <h2 className="text-lg font-medium">Solution</h2>
          <p className="mt-2 max-w-prose text-sm leading-6 text-[var(--muted)]">
            {project.solution}
          </p>
        </section>
        <section>
          <h2 className="text-lg font-medium">Why it matters</h2>
          <p className="mt-2 max-w-prose text-sm leading-6 text-[var(--muted)]">
            {project.whyItMatters}
          </p>
        </section>
        <section>
          <h2 className="text-lg font-medium">Core features</h2>
          <ul className="mt-3 grid gap-3">
            {project.features.map((feature) => (
              <Panel as="li" key={feature.title} className="p-4">
                <p className="font-medium">{feature.title}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{feature.description}</p>
              </Panel>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-medium">Technology</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        </section>
        <section id="architecture">
          <h2 className="text-lg font-medium">Architecture</h2>
          {architecture ? (
            <ol className="mt-3 grid gap-2">
              {architecture.nodes.map((node) => (
                <li
                  key={node.id}
                  className="rounded-[var(--radius-md)] border border-[var(--border)] p-3"
                  style={{ borderLeftColor: getArchitectureNodeColor(node.type), borderLeftWidth: 3 }}
                >
                  <p className="font-medium">{node.label}</p>
                  <p className="text-sm text-[var(--muted)]">{node.purpose}</p>
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState
              title="Architecture information is currently unavailable."
              description="This project does not yet have a structured architecture graph."
            />
          )}
        </section>
        <section id="use-cases">
          <h2 className="text-lg font-medium">Use cases</h2>
          {useCases ? (
            <ul className="mt-3 grid gap-3">
              {useCases.useCases.map((item) => (
                <Panel as="li" key={item.id} className="p-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-[var(--muted)]">{item.description}</p>
                </Panel>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Use-case information is currently unavailable."
              description="This project does not yet have a structured use-case model."
            />
          )}
        </section>
        <section>
          <h2 className="text-lg font-medium">Results</h2>
          <p className="mt-2 max-w-prose text-sm leading-6 text-[var(--muted)]">
            {project.results}
          </p>
        </section>
      </div>
    </PublicShell>
  );
}
