"use client";

import { DesktopClock } from "@/components/os/DesktopClock";
import { SITE_NAME } from "@/lib/constants";

interface SystemStatusBarProps {
  currentFocus: string;
}

export function SystemStatusBar({ currentFocus }: SystemStatusBarProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-40 flex h-10 items-center justify-between gap-3 border-b border-[var(--os-border)] bg-[var(--os-chrome)] px-4">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--os-cyan)]">
        {SITE_NAME} · Online
      </p>
      <p className="hidden min-w-0 truncate font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--muted)] lg:block">
        Focus · {currentFocus}
      </p>
      <DesktopClock />
    </header>
  );
}
