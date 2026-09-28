"use client";

import Link from "next/link";
import { DesktopClock } from "@/components/os/DesktopClock";
import { useWindowManager } from "@/hooks/useWindowManager";
import { DESKTOP_APPS, type DesktopApp } from "@/lib/os-apps";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TaskbarProps {
  onCommand: () => void;
  onOpenApp: (app: DesktopApp) => void;
}

export function Taskbar({ onCommand, onOpenApp }: TaskbarProps) {
  const { windows, focusedId, restoreWindow, focusWindow } = useWindowManager();

  return (
    <footer className="absolute inset-x-0 bottom-0 z-50 flex h-14 items-center gap-3 border-t border-[var(--os-border)] bg-[var(--os-chrome)] px-3">
      <p className="font-mono text-[0.65rem] tracking-[0.16em] text-[var(--os-cyan)]">
        {SITE_NAME}
      </p>
      <details className="relative">
        <summary className="cursor-pointer list-none rounded-sm px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--text)]">
          Apps
        </summary>
        <ul className="absolute bottom-10 left-0 z-50 w-52 border border-[var(--os-border)] bg-[var(--os-panel)] p-1">
          {DESKTOP_APPS.map((app) => (
            <li key={app.id}>
              <button
                type="button"
                className="w-full px-2 py-1.5 text-left text-xs hover:bg-[var(--panel-hover)]"
                onClick={() => onOpenApp(app)}
              >
                {app.title}
              </button>
            </li>
          ))}
        </ul>
      </details>
      <button
        type="button"
        className="rounded-sm px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--text)]"
        onClick={onCommand}
        aria-keyshortcuts="Control+K Meta+K"
      >
        Search
      </button>
      <ul className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {windows.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={cn(
                "max-w-40 truncate border px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em]",
                item.state === "minimized"
                  ? "border-transparent text-[var(--muted)]"
                  : focusedId === item.id
                    ? "border-[var(--os-cyan)] text-[var(--os-cyan)]"
                    : "border-[var(--os-border)] text-[var(--muted)]",
              )}
              onClick={() =>
                item.state === "minimized" ? restoreWindow(item.id) : focusWindow(item.id)
              }
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
      <DesktopClock />
      <Link
        href="/mission-control"
        className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--text)]"
      >
        Pages
      </Link>
    </footer>
  );
}
