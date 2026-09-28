import { PROJECT_CATEGORY_LABEL } from "@/lib/constants";
import type { Project, ProjectCategory } from "@/types/project";

export const PROJECT_LAB_CATEGORIES = [
  "all",
  "ai-ml",
  "full-stack",
  "research",
  "startup",
  "healthcare",
  "cybersecurity",
  "other",
] as const;

export type ProjectLabCategoryFilter = (typeof PROJECT_LAB_CATEGORIES)[number];

export const PROJECT_LAB_SORTS = ["featured", "recent", "active", "completed"] as const;

export type ProjectLabSort = (typeof PROJECT_LAB_SORTS)[number];

export interface ProjectLabQuery {
  q: string;
  category: ProjectLabCategoryFilter;
  sort: ProjectLabSort;
}

const ACTIVE_STATUSES = new Set(["active", "building", "testing"]);

function firstParam(
  value: string | string[] | undefined,
): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

export function parseProjectLabQuery(
  params: Record<string, string | string[] | undefined>,
): ProjectLabQuery {
  const q = firstParam(params.q).trim();
  const categoryRaw = firstParam(params.category);
  const sortRaw = firstParam(params.sort);

  const category = PROJECT_LAB_CATEGORIES.includes(
    categoryRaw as ProjectLabCategoryFilter,
  )
    ? (categoryRaw as ProjectLabCategoryFilter)
    : "all";

  const sort = PROJECT_LAB_SORTS.includes(sortRaw as ProjectLabSort)
    ? (sortRaw as ProjectLabSort)
    : "featured";

  return { q, category, sort };
}

function matchesQuery(project: Project, q: string): boolean {
  if (!q) {
    return true;
  }

  const haystack = [
    project.title,
    project.shortDescription,
    project.description,
    project.category,
    PROJECT_CATEGORY_LABEL[project.category] ?? "",
    ...project.categories,
    ...project.categories.map((item) => PROJECT_CATEGORY_LABEL[item] ?? item),
    ...project.technologies,
    ...project.tags,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q.toLowerCase());
}

function matchesCategory(project: Project, category: ProjectLabCategoryFilter): boolean {
  if (category === "all") {
    return true;
  }

  return project.category === category || project.categories.includes(category as ProjectCategory);
}

function compareProjects(a: Project, b: Project, sort: ProjectLabSort): number {
  if (sort === "recent") {
    return b.updatedAt.localeCompare(a.updatedAt);
  }

  if (sort === "featured") {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    return b.updatedAt.localeCompare(a.updatedAt);
  }

  if (sort === "active") {
    const aActive = ACTIVE_STATUSES.has(a.status) ? 1 : 0;
    const bActive = ACTIVE_STATUSES.has(b.status) ? 1 : 0;
    if (aActive !== bActive) {
      return bActive - aActive;
    }
    return b.progress - a.progress;
  }

  const aDone = a.status === "completed" ? 2 : a.status === "archived" ? 1 : 0;
  const bDone = b.status === "completed" ? 2 : b.status === "archived" ? 1 : 0;
  if (aDone !== bDone) {
    return bDone - aDone;
  }
  return b.updatedAt.localeCompare(a.updatedAt);
}

export function queryProjectLab(projects: Project[], query: ProjectLabQuery): Project[] {
  return projects
    .filter((project) => matchesCategory(project, query.category) && matchesQuery(project, query.q))
    .sort((a, b) => compareProjects(a, b, query.sort));
}
