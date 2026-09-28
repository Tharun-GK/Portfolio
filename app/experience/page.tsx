import Link from "next/link";
import { Panel } from "@/components/design/Panel";
import { PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/shared/Badge";
import { experienceItems } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <PublicShell
      title="Experience"
      description="Timeline of founding work and independent engineering. No internships or awards are listed unless they exist in the data files."
    >
      <ol className="relative grid gap-8 border-l border-[var(--border)] pl-6">
        {experienceItems.map((item) => (
          <Panel as="li" key={item.id} className="p-5">
            <p className="font-mono text-xs text-[var(--muted)]">
              {item.startDate}
              {item.endDate ? ` – ${item.endDate}` : " – Present"}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-medium">
                {item.role} · {item.organization}
              </h2>
              <Badge>{item.kind}</Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
            {item.skills.length ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.skills.map((skill) => (
                  <li key={skill}>
                    <Badge>{skill}</Badge>
                  </li>
                ))}
              </ul>
            ) : null}
            {item.achievements.length ? (
              <ul className="mt-3 list-disc pl-5 text-sm text-[var(--muted)]">
                {item.achievements.map((line) => (
                  <li key={line}>{line}</li>
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
    </PublicShell>
  );
}
