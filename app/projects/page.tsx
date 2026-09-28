import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PublicShell } from "@/components/layout/PublicShell";
import { parseProjectLabQuery, queryProjectLab } from "@/lib/project-lab";
import { getProjectRepository } from "@/lib/repositories";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = parseProjectLabQuery(params);
  const projects = queryProjectLab(await getProjectRepository().getAllProjects(), query);

  return (
    <PublicShell
      title="Project Lab"
      description="Browse systems as products. Filters, sort, and search are URL state — shareable and usable without extra client logic."
    >
      <div className="grid gap-6">
        <ProjectFilters query={query} resultCount={projects.length} />
        <ProjectGrid projects={projects} />
      </div>
    </PublicShell>
  );
}
