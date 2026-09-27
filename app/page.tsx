import Link from "next/link";
import { Panel } from "@/components/design/Panel";
import { SectionHeading } from "@/components/design/SectionHeading";
import { StatusBadge } from "@/components/design/StatusBadge";
import { PublicShell } from "@/components/layout/PublicShell";
import { SITE_TAGLINE } from "@/lib/constants";
import { getPublicNavigation } from "@/lib/navigation";
import { getProjectRepository } from "@/lib/repositories";
import { profile } from "@/data/profile";

export default async function HomePage() {
  const featured = await getProjectRepository().getFeaturedProjects();
  const navigation = getPublicNavigation().filter((item) => item.href !== "/");

  return (
    <PublicShell title={profile.name} description={SITE_TAGLINE}>
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel as="article">
          <h2 className="text-lg font-medium">{profile.role}</h2>
          <p className="mt-3 text-[var(--muted)]">{profile.positioning}</p>
          <p className="mt-4 max-w-prose text-sm leading-6">{profile.summary}</p>
        </Panel>
        <Panel as="aside" className="bg-transparent">
          <h2 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
            System modules
          </h2>
          <ul className="mt-4 grid gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-[var(--radius-md)] px-2 py-2 hover:bg-[var(--panel-hover)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      <section className="mt-10">
        <SectionHeading>Active systems</SectionHeading>
        <ul className="grid gap-4 md:grid-cols-3">
          {featured.map((project) => (
            <Panel as="li" key={project.id} className="p-4">
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
