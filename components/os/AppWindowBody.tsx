"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/design/StatusBadge";
import type { ManagedWindow } from "@/lib/window-manager";
import type { DesktopPayload } from "@/types/desktop";

interface AppWindowBodyProps {
  window: ManagedWindow;
  desktop: DesktopPayload;
}

export function AppWindowBody({ window, desktop }: AppWindowBodyProps) {
  return (
    <div className="grid gap-4">
      {window.appId === "about" ? (
        <div>
          <h3 className="text-lg font-medium">{desktop.name}</h3>
          <p className="mt-2 text-sm text-[var(--muted)]">{desktop.role}</p>
          <p className="mt-3 text-sm">{desktop.positioning}</p>
          <p className="mt-3 max-w-prose text-sm leading-6 text-[var(--muted)]">
            {desktop.summary}
          </p>
        </div>
      ) : null}

      {window.appId === "project-lab" || window.appId === "mission-control" ? (
        <ul className="grid gap-2">
          {desktop.projects.map((project) => (
            <li key={project.slug} className="border border-[var(--os-border)] p-3">
              <div className="flex items-center justify-between gap-2">
                <Link href={`/projects/${project.slug}`} className="font-medium">
                  {project.title}
                </Link>
                <StatusBadge status={project.status} />
              </div>
              <p className="mt-1 text-sm text-[var(--muted)]">{project.shortDescription}</p>
            </li>
          ))}
        </ul>
      ) : null}

      {window.appId !== "about" &&
      window.appId !== "project-lab" &&
      window.appId !== "mission-control" ? (
        <p className="text-sm text-[var(--muted)]">
          Quick view only. The public route is the source of truth for this module.
        </p>
      ) : null}

      <p>
        <Link href={window.href} className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--os-cyan)]">
          Open full page
        </Link>
      </p>
    </div>
  );
}
