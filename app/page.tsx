import { HomeExperience } from "@/components/os/HomeExperience";
import { profile } from "@/data/profile";
import { SITE_TAGLINE } from "@/lib/constants";
import { getMissionControlSnapshot } from "@/lib/services/mission-control";

export default async function HomePage() {
  const snapshot = await getMissionControlSnapshot();
  const currentFocus =
    snapshot.missions.find((mission) => mission.status === "in-progress")?.title ??
    snapshot.brief.workingOn;

  return (
    <>
      <section className="sr-only">
        <p>
          {profile.name}. {profile.role}. {SITE_TAGLINE}
        </p>
        <ul>
          {snapshot.projects.map((project) => (
            <li key={project.slug}>
              <a href={`/projects/${project.slug}`}>{project.title}</a>
            </li>
          ))}
        </ul>
      </section>
      <HomeExperience
        desktop={{
          name: profile.name,
          role: profile.role,
          positioning: profile.positioning,
          summary: profile.summary,
          projects: snapshot.projects,
          missions: snapshot.missions,
          activities: snapshot.activities,
          researchCount: snapshot.research.length,
          currentFocus,
        }}
      />
    </>
  );
}
