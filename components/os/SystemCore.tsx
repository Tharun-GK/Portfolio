"use client";

import { SITE_NAME } from "@/lib/constants";
import { DESKTOP_APPS, type DesktopApp } from "@/lib/os-apps";
import type { DesktopPayload } from "@/types/desktop";

interface SystemCoreProps {
  desktop: DesktopPayload;
  onOpen: (app: DesktopApp) => void;
}

export function SystemCore({ desktop, onOpen }: SystemCoreProps) {
  const launchers = DESKTOP_APPS.filter((app) =>
    ["mission-control", "project-lab", "research", "github", "about"].includes(app.id),
  );

  return (
    <div className="pointer-events-auto mx-auto flex max-w-xl flex-col items-center px-4 pt-16 text-center">
      <div className="os-core relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
        <div className="absolute inset-0 rounded-full border border-[var(--os-border)]" />
        <div className="absolute inset-6 rounded-full border border-[var(--os-cyan)]/30" />
        <div className="absolute inset-12 rounded-full border border-[var(--os-border)]" />
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--os-cyan)]">
            {SITE_NAME}
          </p>
          <p className="mt-2 text-sm text-[var(--text)]">{desktop.name}</p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--os-amber)]">
            System online
          </p>
        </div>
      </div>
      <dl className="mt-6 grid w-full grid-cols-2 gap-3 text-left sm:grid-cols-4">
        <CoreStat label="Projects" value={String(desktop.projects.length)} />
        <CoreStat label="Missions" value={String(desktop.missions.length)} />
        <CoreStat label="Research" value={String(desktop.researchCount)} />
        <CoreStat label="Activity" value={String(desktop.activities.length)} />
      </dl>
      <p className="mt-4 max-w-md text-sm text-[var(--muted)]">{desktop.currentFocus}</p>
      <ul className="mt-6 flex flex-wrap justify-center gap-2">
        {launchers.map((app) => (
          <li key={app.id}>
            <button
              type="button"
              onClick={() => onOpen(app)}
              className="border border-[var(--os-border)] bg-[var(--os-panel)] px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] hover:border-[var(--os-cyan)]"
            >
              {app.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoreStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[var(--os-border)] bg-[var(--os-panel)] px-3 py-2">
      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--muted)]">
        {label}
      </dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}
