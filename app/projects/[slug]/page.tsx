import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailTabs } from "@/components/projects/ProjectDetailTabs";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { PublicShell } from "@/components/layout/PublicShell";
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

  const [architecture, useCases, catalog] = await Promise.all([
    project.architectureId ? repository.getArchitecture(project.slug) : Promise.resolve(null),
    project.useCaseId ? repository.getUseCases(project.slug) : Promise.resolve(null),
    repository.getAllProjects(),
  ]);

  const related = catalog.filter((item) => project.relatedProjectSlugs.includes(item.slug));

  return (
    <PublicShell title={project.title} description={project.shortDescription}>
      <ProjectHero project={project} related={related} />
      <ProjectDetailTabs
        project={project}
        architecture={architecture}
        useCases={useCases}
      />
    </PublicShell>
  );
}
