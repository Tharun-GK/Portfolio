"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/design/StatusBadge";
import type { ManagedWindow } from "@/hooks/useWindowManager";
import type { DesktopPayload } from "@/types/desktop";

interface AppWindowBodyProps {
  window: ManagedWindow;
  desktop: DesktopPayload;
}

export function AppWindowBody({ window, desktop }: AppWindowBodyProps) {
  if (window.appId === "about") {
    return (
      <div>
        <h3 className="text-lg font-medium">{desktop.name}</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">{desktop.role}</p>
        <p className="mt-3 text-sm">{desktop.positioning}</p>
        <p className="mt-3 max-w-prose text-sm leading-6 text-[var(--muted)]">
          {desktop.summary}
        </p>
      </div>
    );
  }

  if (window.appId === "project-lab" || window.appId === "mission-control") {
    return (
      <ul className="grid gap-3">
        {desktop.projects.map((project) => (
          <li key={project.slug} className="rounded-[var(--radius-md)] border border-[var(--border)] p-3">
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
    );
  }

  return (
    <div>
      <p className="text-sm text-[var(--muted)]">
        This window is a quick view. Full content lives on a public page so it stays
        shareable and searchable.
      </p>
      <p className="mt-4">
        <Link href={window.href} className="text-sm text-[var(--accent)]">
          Open {window.title} →
        </Link>
      </p>
    </div>
  );
}
