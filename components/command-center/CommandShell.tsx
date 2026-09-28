"use client";

import { type ReactNode, useState } from "react";
import { CommandAtmosphere } from "@/components/command-center/CommandAtmosphere";
import { CommandClock } from "@/components/command-center/CommandClock";
import { CommandSidebar } from "@/components/command-center/CommandSidebar";
import { CommandIcon } from "@/components/command-center/CommandIcons";

export function CommandShell({
  children,
  title,
  kicker,
}: {
  children: ReactNode;
  title: string;
  kicker: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="command-center mc-hud relative min-h-screen overflow-x-hidden">
      <CommandAtmosphere />
      <a
        href="#command-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--panel)] focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <aside className="command-rail hidden lg:flex">
        <CommandSidebar />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
          <div className="command-rail command-rail-drawer relative z-10 h-full w-[min(18rem,86vw)]">
            <CommandSidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="relative z-[1] flex min-h-screen flex-col lg:pl-[16.75rem]">
        <header className="command-header flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="border border-[var(--hud-line)] px-2 py-1 text-[var(--accent)] lg:hidden"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open navigation</span>
              <CommandIcon name="mission" className="h-5 w-5" />
            </button>
            <div>
              <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--accent)]">
                <CommandIcon name="mission" className="h-3.5 w-3.5" />
                {title}
              </p>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                {kicker}
              </p>
            </div>
          </div>
          <CommandClock />
        </header>
        <main id="command-content" className="relative flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
