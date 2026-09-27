import type { MetadataRoute } from "next";
import { getProjectRepository } from "@/lib/repositories";
import { getSiteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const projects = await getProjectRepository().getAllProjects();

  const staticRoutes = [
    "",
    "/mission-control",
    "/projects",
    "/city",
    "/research",
    "/experience",
    "/github",
    "/resume",
    "/contact",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt),
    })),
  ];
}
