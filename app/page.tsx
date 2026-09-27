import Link from "next/link";
import { PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/shared/Badge";
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
        <article className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-5">
          <h2 className="text-lg font-medium">{profile.role}</h2>
          <p className="mt-3 text-[var(--muted)]">{profile.positioning}</p>
          <p className="mt-4 max-w-prose text-sm leading-6">{profile.summary}</p>
        </article>
        <aside className="rounded-lg border border-[var(--border)] p-5">
          <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
            System modules
          </h2>
          <ul className="mt-4 grid gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-2 py-2 hover:bg-[var(--panel-hover)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Active systems</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {featured.map((project) => (
            <li
              key={project.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium">
                  <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                </h3>
                <Badge tone="status">{project.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">{project.shortDescription}</p>
            </li>
          ))}
        </ul>
      </section>
    </PublicShell>
  );
}
