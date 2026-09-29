import Link from "next/link";
import { Panel } from "@/components/design/Panel";
import { PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/shared/Badge";
import { achievementItems } from "@/data/achievements";
import { researchItems } from "@/data/research";

export default function ResearchPage() {
  return (
    <PublicShell
      title="Research Lab"
      description="Papers, conferences, and research framing. Only titles and facts present in the portfolio data are listed."
    >
      <ol className="relative grid gap-8 border-l border-[var(--border)] pl-6">
        {researchItems.map((item) => (
          <Panel as="li" key={item.id} className="p-5">
            <p className="font-mono text-xs text-[var(--muted)]">{item.date}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-medium">{item.title}</h2>
              <Badge>{item.status}</Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
            <p className="mt-3 font-mono text-xs text-[var(--muted)]">{item.role}</p>
            {item.conference ? (
              <p className="mt-2 text-sm text-[var(--muted)]">{item.conference}</p>
            ) : null}
            {item.topics.length ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.topics.map((topic) => (
                  <li key={topic}>
                    <Badge>{topic}</Badge>
                  </li>
                ))}
              </ul>
            ) : null}
            {item.relatedProjectSlug ? (
              <p className="mt-4">
                <Link
                  href={`/projects/${item.relatedProjectSlug}`}
                  className="text-sm hover:underline"
                >
                  Related system →
                </Link>
              </p>
            ) : null}
          </Panel>
        ))}
      </ol>
      {achievementItems.length ? (
        <section className="mt-10">
          <h2 className="text-lg font-medium">Achievements</h2>
          <ul className="mt-4 grid gap-4">
            {achievementItems.map((item) => (
              <Panel as="li" key={item.id} className="p-5">
                <p className="font-mono text-xs text-[var(--muted)]">{item.date}</p>
                <h3 className="mt-2 text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.detail}</p>
              </Panel>
            ))}
          </ul>
        </section>
      ) : null}
    </PublicShell>
  );
}
