"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CommandIcon } from "@/components/command-center/CommandIcons";
import { profile } from "@/data/profile";
import { COMMAND_NAV, commandNavHash, isCommandNavActive } from "@/lib/command-nav";
import { cn } from "@/lib/utils";

export function CommandSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.replace(/^#/, ""));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-[var(--hud-line)] px-5 py-5">
        <p className="font-mono text-lg tracking-[0.28em] text-[var(--accent)]">TGK</p>
        <p className="mt-2 text-sm font-medium">{profile.name}</p>
        <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">
          Building · Learning · Growing
        </p>
      </div>
      <nav aria-label="Command navigation" className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <ul className="grid gap-1">
          {COMMAND_NAV.map((item) => {
            const active = isCommandNavActive(item.href, pathname, hash);
            return (
              <li key={`${item.label}-${item.href}`}>
                <Link
                  href={item.href}
                  onClick={() => {
                    setHash(commandNavHash(item.href) ?? "");
                    onNavigate?.();
                  }}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 border px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "command-nav-active border-[rgba(79,212,238,0.55)] text-[var(--text)]"
                      : "border-transparent text-[#9eb4c2] hover:border-[var(--hud-line)] hover:text-[var(--text)]",
                  )}
                >
                  <CommandIcon
                    name={item.icon}
                    className={cn("h-4 w-4 shrink-0", active ? "text-[var(--accent)]" : "opacity-70")}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-[var(--hud-line)] px-5 py-4">
        <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em]">
          <span
            className={cn(
              "inline-block h-2 w-2 rounded-full",
              online ? "bg-[var(--status-completed)]" : "bg-[var(--status-archived)]",
            )}
            aria-hidden
          />
          {online ? "System online" : "System offline"}
        </p>
        <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
          Exploring.
          <br />
          Building.
          <br />
          Impacting.
        </p>
      </div>
    </div>
  );
}
