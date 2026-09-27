import { Panel } from "@/components/design/Panel";
import { PublicShell } from "@/components/layout/PublicShell";
import { experienceItems } from "@/data/experience";

export default function ExperiencePage() {
  return (
    <PublicShell
      title="Experience"
      description="Timeline of founding work and independent engineering. No internships or awards are listed unless they exist in the data files."
    >
      <ol className="grid gap-4">
        {experienceItems.map((item) => (
          <Panel as="li" key={item.id}>
            <h2 className="text-lg font-medium">
              {item.role} · {item.organization}
            </h2>
            <p className="mt-1 font-mono text-xs text-[var(--muted)]">
              {item.startDate}
              {item.endDate ? ` – ${item.endDate}` : " – Present"}
            </p>
            <p className="mt-3 text-sm text-[var(--muted)]">{item.description}</p>
          </Panel>
        ))}
      </ol>
    </PublicShell>
  );
}
