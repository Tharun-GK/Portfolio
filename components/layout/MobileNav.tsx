"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMobileNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const links = getMobileNavigation();

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--panel-strong)] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-6 text-[0.65rem]">
        {links.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex min-h-[var(--mobile-nav-height)] items-center justify-center px-1 text-center",
                  active ? "text-[var(--accent)]" : "text-[var(--muted)]",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
