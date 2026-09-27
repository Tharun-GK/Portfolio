import Link from "next/link";
import { Panel } from "@/components/design/Panel";
import { ProgressBar } from "@/components/design/ProgressBar";
import { SectionHeading } from "@/components/design/SectionHeading";
import { StatusBadge } from "@/components/design/StatusBadge";
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
        <Panel as="article">
          <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
            Identity
          </h2>
          <p className="mt-3 text-lg font-medium">{profile.name}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{profile.role}</p>
          <p className="mt-3 text-sm">{profile.positioning}</p>
        </Panel>
        <Panel as="article">
          <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
            Stack
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li key={skill.id}>
                <Badge>{skill.name}</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      <section className="mt-8">
        <SectionHeading>Active missions</SectionHeading>
        <ul className="grid gap-3">
          {missions.map((mission) => (
            <Panel as="li" key={mission.id} className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-medium">{mission.title}</h3>
                <StatusBadge status={mission.status} />
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">{mission.summary}</p>
              <div className="mt-3">
                <ProgressBar value={mission.progress} label={mission.focus} />
              </div>
            </Panel>
          ))}
        </ul>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading>Systems</SectionHeading>
          <ul className="grid gap-3">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="block rounded-[var(--radius-lg)] border border-[var(--border)] p-4 hover:bg-[var(--panel-hover)]"
                >
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
          <SectionHeading>Recent activity</SectionHeading>
          <ol className="grid gap-3">
            {activities.map((activity) => (
              <Panel as="li" key={activity.id} className="p-4">
                <p className="font-mono text-xs text-[var(--muted)]">
                  {activity.type} · {activity.date}
                </p>
                <p className="mt-1 font-medium">{activity.title}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{activity.description}</p>
              </Panel>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-8">
        <SectionHeading>Experience snapshot</SectionHeading>
        <ul className="grid gap-3">
          {experienceItems.map((item) => (
            <Panel as="li" key={item.id} className="p-4">
              <p className="font-medium">
                {item.role} · {item.organization}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.description}</p>
            </Panel>
          ))}
        </ul>
      </section>
    </PublicShell>
  );
}
