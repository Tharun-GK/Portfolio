import Link from "next/link";
import { ActivityFeed } from "@/components/mission-control/ActivityFeed";
import { MissionCard } from "@/components/mission-control/MissionCard";
import { Panel } from "@/components/design/Panel";
import { ProgressBar } from "@/components/design/ProgressBar";
import { SectionHeading } from "@/components/design/SectionHeading";
import { StatusBadge } from "@/components/design/StatusBadge";
import { Badge } from "@/components/shared/Badge";
import { EmptyState } from "@/components/shared/EmptyState";
import type { MissionControlSnapshot } from "@/lib/mission-control";

interface MissionDashboardProps {
  snapshot: MissionControlSnapshot;
}

export function MissionDashboard({ snapshot }: MissionDashboardProps) {
  const { brief, missions, projects, startup, research, activities, experience, skills, github } =
    snapshot;

  return (
    <div className="grid gap-8">
      <section aria-labelledby="recruiter-brief">
        <h2 id="recruiter-brief" className="sr-only">
          Recruiter brief
        </h2>
        <Panel>
          <dl className="grid gap-4 sm:grid-cols-2">
            <BriefItem term="Who" definition={brief.who} />
            <BriefItem term="Builds" definition={brief.builds} />
            <BriefItem term="Technologies" definition={brief.technologies} />
            <BriefItem term="Working on" definition={brief.workingOn} />
            <BriefItem term="On record" definition={brief.onRecord} className="sm:col-span-2" />
          </dl>
        </Panel>
      </section>

      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Signal label="Systems" value={String(projects.length)} href="/projects" />
        <Signal label="Missions" value={String(missions.length)} />
        <Signal label="Research" value={String(research.length)} href="/research" />
        <Signal
          label="GitHub"
          value={github.source === "live" ? String(github.repositoryCount) : "—"}
          href="/github"
        />
      </ul>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading>Active missions</SectionHeading>
          <ul className="grid gap-3">
            {missions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading>Current systems</SectionHeading>
          <ul className="grid gap-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="block rounded-[var(--radius-lg)] border border-[var(--border)] p-4 hover:bg-[var(--panel-hover)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium">{project.title}</span>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{project.shortDescription}</p>
                  <div className="mt-3">
                    <ProgressBar value={project.progress} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading>Recent activity</SectionHeading>
          <ActivityFeed activities={activities} />
        </div>
        <div className="grid gap-8">
          <div>
            <SectionHeading>Startup</SectionHeading>
            {startup ? (
              <Panel>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-medium">
                    <Link href={`/projects/${startup.slug}`}>{startup.title} HQ</Link>
                  </h3>
                  <StatusBadge status={startup.status} />
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{startup.shortDescription}</p>
                <div className="mt-3">
                  <ProgressBar value={startup.progress} label="Product" />
                </div>
              </Panel>
            ) : (
              <EmptyState
                title="Startup record unavailable."
                description="BookMyShift is not in the project registry."
              />
            )}
          </div>
          <div>
            <SectionHeading>Research</SectionHeading>
            <ul className="grid gap-3">
              {research.map((item) => (
                <Panel as="li" key={item.id} className="p-4">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-2 font-mono text-xs text-[var(--muted)]">
                    {item.status} · {item.date}
                  </p>
                  <p className="mt-2">
                    <Link href="/research" className="text-sm text-[var(--accent)]">
                      Research Lab →
                    </Link>
                  </p>
                </Panel>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading>Stack</SectionHeading>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li key={skill.id}>
                <Badge>{skill.name}</Badge>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading>Experience</SectionHeading>
          <ul className="grid gap-2">
            {experience.map((item) => (
              <li key={item.id} className="text-sm">
                <span className="font-medium">{item.role}</span>
                <span className="text-[var(--muted)]"> · {item.organization}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            <Link href="/experience" className="text-sm text-[var(--accent)]">
              Full timeline →
            </Link>
          </p>
        </div>
      </section>

      <section>
        <SectionHeading>GitHub</SectionHeading>
        {github.source === "fallback" ? (
          <EmptyState
            title="GitHub data temporarily unavailable."
            description={github.message ?? "Live repository counts are not loaded."}
          />
        ) : (
          <ul className="grid gap-2 md:grid-cols-3">
            {github.repositories.slice(0, 3).map((repo) => (
              <Panel as="li" key={repo.url} className="p-3">
                <Link href={repo.url} rel="noreferrer" target="_blank" className="text-sm font-medium">
                  {repo.name}
                </Link>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {repo.language ?? "Language n/a"}
                </p>
              </Panel>
            ))}
          </ul>
        )}
        <p className="mt-3">
          <Link href="/github" className="text-sm text-[var(--accent)]">
            GitHub module →
          </Link>
        </p>
      </section>
    </div>
  );
}

function BriefItem({
  term,
  definition,
  className,
}: {
  term: string;
  definition: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
        {term}
      </dt>
      <dd className="mt-1 text-sm leading-6">{definition}</dd>
    </div>
  );
}

function Signal({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <Panel as="div" className="p-4">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-medium">{value}</p>
    </Panel>
  );

  if (!href) {
    return <li>{inner}</li>;
  }

  return (
    <li>
      <Link href={href} className="block">
        {inner}
      </Link>
    </li>
  );
}
