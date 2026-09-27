"use client";

import Link from "next/link";
import { DesktopClock } from "@/components/os/DesktopClock";
import { useWindowManager } from "@/hooks/useWindowManager";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TaskbarProps {
  onCommand: () => void;
}

export function Taskbar({ onCommand }: TaskbarProps) {
  const { windows, focusedId, restoreWindow, focusWindow, minimizeWindow } =
    useWindowManager();

  return (
    <footer className="absolute inset-x-0 bottom-0 z-50 flex h-14 items-center gap-3 border-t border-[var(--border)] bg-[var(--panel-strong)] px-3">
      <p className="font-mono text-xs tracking-wide text-[var(--accent)]">{SITE_NAME}</p>
      <button
        type="button"
        className="rounded-[var(--radius-sm)] px-2 py-1 text-xs text-[var(--muted)] hover:bg-[var(--panel-hover)] hover:text-[var(--text)]"
        onClick={onCommand}
        aria-keyshortcuts="Control+K Meta+K"
      >
        Search Ctrl+K
      </button>
      <ul className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {windows.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={cn(
                "max-w-40 truncate rounded-[var(--radius-sm)] px-2 py-1 text-xs",
                focusedId === item.id && item.state !== "minimized"
                  ? "bg-[var(--panel-hover)] text-[var(--text)]"
                  : "text-[var(--muted)]",
              )}
              onClick={() =>
                item.state === "minimized" ? restoreWindow(item.id) : focusWindow(item.id)
              }
              onDoubleClick={() => minimizeWindow(item.id)}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
      <p className="hidden text-xs text-[var(--muted)] md:block">System ready</p>
      <DesktopClock />
      <Link href="/mission-control" className="text-xs text-[var(--muted)] hover:text-[var(--text)]">
        Pages
      </Link>
    </footer>
  );
}
