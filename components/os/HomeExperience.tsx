"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Panel } from "@/components/design/Panel";
import { SectionHeading } from "@/components/design/SectionHeading";
import { StatusBadge } from "@/components/design/StatusBadge";
import { PublicShell } from "@/components/layout/PublicShell";
import { Desktop } from "@/components/os/Desktop";
import { SITE_TAGLINE } from "@/lib/constants";
import type { DesktopPayload } from "@/types/desktop";

interface HomeExperienceProps {
  desktop: DesktopPayload;
}

export function HomeExperience({ desktop }: HomeExperienceProps) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsDesktop(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  if (isDesktop === null) {
    return <div className="min-h-screen bg-[var(--bg)]" />;
  }

  if (isDesktop) {
    return <Desktop desktop={desktop} />;
  }

  return (
    <PublicShell title={desktop.name} description={SITE_TAGLINE}>
      <Panel as="article">
        <h2 className="text-lg font-medium">{desktop.role}</h2>
        <p className="mt-3 text-[var(--muted)]">{desktop.positioning}</p>
        <p className="mt-4 max-w-prose text-sm leading-6">{desktop.summary}</p>
      </Panel>
      <section className="mt-8">
        <SectionHeading>Active systems</SectionHeading>
        <ul className="grid gap-4">
          {desktop.projects.map((project) => (
            <Panel as="li" key={project.slug} className="p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium">
                  <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                </h3>
                <StatusBadge status={project.status} />
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">{project.shortDescription}</p>
            </Panel>
          ))}
        </ul>
      </section>
    </PublicShell>
  );
}
