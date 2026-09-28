"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/design/StatusBadge";
import type { DesktopPayload } from "@/types/desktop";

interface SystemRailsProps {
  desktop: DesktopPayload;
  onOpenProjects: () => void;
  compact: boolean;
}

export function SystemRails({ desktop, onOpenProjects, compact }: SystemRailsProps) {
  if (compact) {
    return null;
  }

  return (
    <>
      <aside className="pointer-events-auto absolute bottom-20 left-4 top-14 hidden w-56 lg:block">
        <div className="h-full border border-[var(--os-border)] bg-[var(--os-panel)] p-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--os-amber)]">
            Projects
          </p>
          <ul className="mt-3 grid gap-2">
            {desktop.projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`} className="block">
                  <span className="block text-sm">{project.title}</span>
                  <span className="mt-1 flex items-center gap-2">
                    <StatusBadge status={project.status} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--os-cyan)]"
            onClick={onOpenProjects}
          >
            Launch Project Lab
          </button>
        </div>
      </aside>
      <aside className="pointer-events-auto absolute bottom-20 right-4 top-14 hidden w-56 lg:block">
        <div className="h-full border border-[var(--os-border)] bg-[var(--os-panel)] p-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--os-amber)]">
            Activity
          </p>
          <ol className="mt-3 grid gap-3">
            {desktop.activities.slice(0, 4).map((activity) => (
              <li key={activity.id}>
                {activity.href ? (
                  <Link href={activity.href} className="block">
                    <span className="block font-mono text-[0.65rem] text-[var(--muted)]">
                      {activity.date}
                    </span>
                    <span className="mt-1 block text-sm">{activity.title}</span>
                  </Link>
                ) : (
                  <>
                    <span className="block font-mono text-[0.65rem] text-[var(--muted)]">
                      {activity.date}
                    </span>
                    <span className="mt-1 block text-sm">{activity.title}</span>
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </>
  );
}
