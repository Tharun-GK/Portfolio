import Link from "next/link";
import { type ReactNode } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import { SITE_NAME } from "@/lib/constants";
import { getPublicNavigation } from "@/lib/navigation";

export function PublicShell({
  children,
  title,
  description,
  wide = false,
}: {
  children: ReactNode;
  title: string;
  description: string;
  wide?: boolean;
}) {
  const navigation = getPublicNavigation();

  return (
    <div className="min-h-screen pb-[calc(var(--mobile-nav-height)+env(safe-area-inset-bottom))] md:pb-0">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--panel)] focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            {SITE_NAME}
          </Link>
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex flex-wrap gap-3 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[var(--muted)] hover:text-[var(--text)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="content" className={`mx-auto px-4 py-10 ${wide ? "max-w-7xl" : "max-w-6xl"}`}>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)]">
          {SITE_NAME}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">{description}</p>
        <div className="mt-8">{children}</div>
      </main>
      <MobileNav />
    </div>
  );
}
