import Link from "next/link";
import { PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/shared/Badge";
import { activities } from "@/data/activities";
import { experienceItems } from "@/data/experience";
import { missions } from "@/data/missions";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { getProjectRepository } from "@/lib/repositories";

export default async function MissionControlPage() {
  const projects = await getProjectRepository().getFeaturedProjects();

  return (
    <PublicShell
      title="Mission Control"
      description="Who Tharun is, what he builds, which systems are active, and what is in motion — without dashboard clutter."
    >
      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-5">
          <h2 className="text-sm uppercase tracking-[0.14em] text-[var(--muted)]">Identity</h2>
          <p className="mt-3 text-lg font-medium">{profile.name}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{profile.role}</p>
          <p className="mt-3 text-sm">{profile.positioning}</p>
        </article>
        <article className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-5">
          <h2 className="text-sm uppercase tracking-[0.14em] text-[var(--muted)]">Stack</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li key={skill.id}>
                <Badge>{skill.name}</Badge>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium">Active missions</h2>
        <ul className="mt-4 grid gap-3">
          {missions.map((mission) => (
            <li
              key={mission.id}
              className="rounded-lg border border-[var(--border)] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-medium">{mission.title}</h3>
                <Badge tone="status">{mission.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">{mission.summary}</p>
              <p className="mt-2 text-xs text-[var(--muted)]">
                Progress {mission.progress}% · {mission.focus}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-medium">Systems</h2>
          <ul className="mt-4 grid gap-3">
            {projects.map((project) => (
              <li key={project.id}>
                <Link href={`/projects/${project.slug}`} className="block rounded-lg border border-[var(--border)] p-4 hover:bg-[var(--panel-hover)]">
                  <span className="font-medium">{project.title}</span>
                  <span className="mt-1 block text-sm text-[var(--muted)]">
                    {project.shortDescription}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-medium">Recent activity</h2>
          <ol className="mt-4 grid gap-3">
            {activities.map((activity) => (
              <li key={activity.id} className="rounded-lg border border-[var(--border)] p-4">
                <p className="text-xs text-[var(--muted)]">
                  {activity.type} · {activity.date}
                </p>
                <p className="mt-1 font-medium">{activity.title}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{activity.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium">Experience snapshot</h2>
        <ul className="mt-4 grid gap-3">
          {experienceItems.map((item) => (
            <li key={item.id} className="rounded-lg border border-[var(--border)] p-4">
              <p className="font-medium">
                {item.role} · {item.organization}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </PublicShell>
  );
}
