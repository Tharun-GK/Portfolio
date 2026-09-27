import { HomeExperience } from "@/components/os/HomeExperience";
import { SITE_TAGLINE } from "@/lib/constants";
import { getProjectRepository } from "@/lib/repositories";
import { profile } from "@/data/profile";
import type { DesktopPayload } from "@/types/desktop";

export default async function HomePage() {
  const featured = await getProjectRepository().getFeaturedProjects();

  const desktop: DesktopPayload = {
    name: profile.name,
    role: profile.role,
    positioning: profile.positioning,
    summary: profile.summary,
    projects: featured.map((project) => ({
      slug: project.slug,
      title: project.title,
      shortDescription: project.shortDescription,
      status: project.status,
    })),
  };

  return (
    <>
      <section className="sr-only">
        <p>
          {profile.name}. {profile.role}. {SITE_TAGLINE}
        </p>
        <ul>
          {desktop.projects.map((project) => (
            <li key={project.slug}>
              <a href={`/projects/${project.slug}`}>{project.title}</a>
            </li>
          ))}
        </ul>
      </section>
      <HomeExperience desktop={desktop} />
    </>
  );
}
