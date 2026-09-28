import Link from "next/link";
import { ActivityFeed } from "@/components/mission-control/ActivityFeed";
import { HudBars } from "@/components/mission-control/HudBars";
import { HudPanel } from "@/components/mission-control/HudPanel";
import { MissionCard } from "@/components/mission-control/MissionCard";
import { StatusBadge } from "@/components/design/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { MISSION_STATUS_LABEL, PROJECT_STATUS_LABEL } from "@/lib/design-tokens";
import { projectStatusCounts, type MissionControlSnapshot } from "@/lib/mission-control";
import type { ProjectStatus } from "@/types/project";

interface MissionWorkspaceProps {
  snapshot: MissionControlSnapshot;
}

export function MissionWorkspace({ snapshot }: MissionWorkspaceProps) {
  const { brief, missions, projects, research, activities, experience, github, startup } =
    snapshot;
  const statusCounts = projectStatusCounts(projects);

  return (
    <div className="mc-hud grid gap-4 px-4 py-6 sm:px-6">
      <HudPanel title="Current work" subtitle="From active missions and records">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">
              Who
            </dt>
            <dd className="mt-1 text-sm leading-6">{brief.who}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">
              Working on
            </dt>
            <dd className="mt-1 text-sm leading-6">{brief.workingOn}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">
              Builds
            </dt>
            <dd className="mt-1 text-sm leading-6">{brief.builds}</dd>
          </div>
        </dl>
      </HudPanel>

      <div className="grid gap-4 xl:grid-cols-2">
        <HudPanel title="Active missions" subtitle="Objectives and execution status">
          <ul className="grid gap-3">
            {missions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </ul>
        </HudPanel>
        <HudPanel title="Mission progress" subtitle="Progress values from mission records">
          <HudBars
            items={missions.map((mission) => ({
              id: mission.id,
              label: mission.title,
              value: mission.progress,
              status: MISSION_STATUS_LABEL[mission.status],
              href: mission.relatedProjectSlug
                ? `/projects/${mission.relatedProjectSlug}`
                : undefined,
            }))}
          />
        </HudPanel>
      </div>

      <HudPanel title="Project execution" subtitle="Linked systems for each mission">
        <ul className="grid gap-3 md:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="block border border-[var(--hud-line)] p-3 hover:border-[var(--accent)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">{project.title}</span>
                  <StatusBadge status={project.status} />
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{project.shortDescription}</p>
                <p className="mt-2 font-mono text-xs text-[var(--accent)]">{project.progress}%</p>
              </Link>
            </li>
          ))}
        </ul>
      </HudPanel>

      <div className="grid gap-4 lg:grid-cols-2">
        <HudPanel title="Research & decision paths">
          <ul className="grid gap-3">
            {research.map((item) => (
              <li key={item.id}>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                  {item.status} · {item.date}
                </p>
                {item.relatedProjectSlug ? (
                  <Link
                    href={`/projects/${item.relatedProjectSlug}`}
                    className="mt-2 inline-block text-sm text-[var(--accent)]"
                  >
                    Related system →
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
          <Link href="/research" className="mt-3 inline-block text-sm text-[var(--accent)]">
            Research Lab →
          </Link>
        </HudPanel>
        <HudPanel title="Activity">
          {activities.length > 0 ? (
            <ActivityFeed activities={activities.slice(0, 6)} />
          ) : (
            <EmptyState title="No activity records." description="Activity appears when the log has entries." />
          )}
        </HudPanel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <HudPanel title="Experience on record">
          <ul className="grid gap-2">
            {experience.map((item) => (
              <li key={item.id} className="text-sm">
                <span className="font-medium">{item.role}</span>
                <span className="text-[var(--muted)]"> · {item.organization}</span>
              </li>
            ))}
          </ul>
          <Link href="/experience" className="mt-3 inline-block text-sm text-[var(--accent)]">
            Full timeline →
          </Link>
        </HudPanel>
        <HudPanel title="GitHub">
          {github.source === "live" && github.repositories.length > 0 ? (
            <ul className="grid gap-2">
              {github.repositories.slice(0, 3).map((repo) => (
                <li key={repo.url}>
                  <Link href={repo.url} rel="noreferrer" target="_blank" className="text-sm font-medium">
                    {repo.name}
                  </Link>
                  <p className="mt-1 text-xs text-[var(--muted)]">{repo.language ?? "Language n/a"}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                Live Data
              </p>
              <p className="mt-2 text-2xl tracking-widest">—</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{github.message ?? "Fetching data..."}</p>
            </div>
          )}
          <Link href="/github" className="mt-3 inline-block text-sm text-[var(--accent)]">
            GitHub module →
          </Link>
        </HudPanel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <HudPanel title="Registry mix">
          <ul className="grid gap-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <li key={status} className="flex items-center justify-between text-sm">
                <span>{PROJECT_STATUS_LABEL[status as ProjectStatus]}</span>
                <span className="font-mono text-[var(--accent)]">{count}</span>
              </li>
            ))}
          </ul>
        </HudPanel>
        <HudPanel title="Startup HQ">
          {startup ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link href={`/projects/${startup.slug}`} className="font-medium">
                  {startup.title}
                </Link>
                <StatusBadge status={startup.status} />
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">{startup.shortDescription}</p>
              <p className="mt-2 font-mono text-xs text-[var(--accent)]">{startup.progress}%</p>
            </div>
          ) : (
            <EmptyState
              title="Startup record unavailable."
              description="BookMyShift is not in the project registry."
            />
          )}
        </HudPanel>
      </div>
    </div>
  );
}
