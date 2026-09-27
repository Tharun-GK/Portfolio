"use client";

import { DESKTOP_APPS, type DesktopApp } from "@/lib/os-apps";

interface AppIconProps {
  app: DesktopApp;
  onOpen: (app: DesktopApp) => void;
}

export function AppIcon({ app, onOpen }: AppIconProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(app)}
      onDoubleClick={() => onOpen(app)}
      className="flex w-28 flex-col items-center gap-2 rounded-[var(--radius-md)] p-3 text-center hover:bg-[var(--panel-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <span
        aria-hidden
        className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--panel)] font-mono text-xs text-[var(--accent)]"
      >
        {app.title
          .split(" ")
          .slice(0, 2)
          .map((part) => part[0])
          .join("")}
      </span>
      <span className="text-xs leading-4">{app.title}</span>
    </button>
  );
}

export function AppIconGrid({ onOpen }: { onOpen: (app: DesktopApp) => void }) {
  return (
    <ul className="grid grid-cols-2 content-start gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {DESKTOP_APPS.map((app) => (
        <li key={app.id}>
          <AppIcon app={app} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  );
}
