import { NextResponse } from "next/server";
import { getProjectRepository } from "@/lib/repositories";

export async function GET() {
  const projects = await getProjectRepository().getAllProjects();

  return NextResponse.json({
    projects: projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      status: project.status,
      category: project.category,
      featured: project.featured,
    })),
  });
}
