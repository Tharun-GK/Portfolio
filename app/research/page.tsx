import { Panel } from "@/components/design/Panel";
import { PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/shared/Badge";
import { researchItems } from "@/data/research";

export default function ResearchPage() {
  return (
    <PublicShell
      title="Research Lab"
      description="Papers, conferences, and research framing. Only titles and facts present in the portfolio data are listed."
    >
      <ul className="grid gap-4">
        {researchItems.map((item) => (
          <Panel as="li" key={item.id}>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-medium">{item.title}</h2>
              <Badge>{item.status}</Badge>
            </div>
            <p className="mt-3 text-sm text-[var(--muted)]">{item.description}</p>
            <p className="mt-3 font-mono text-xs text-[var(--muted)]">
              {item.role} · {item.date}
            </p>
          </Panel>
        ))}
      </ul>
    </PublicShell>
  );
}
