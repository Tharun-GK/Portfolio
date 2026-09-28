import { Panel } from "@/components/design/Panel";
import { SectionHeading } from "@/components/design/SectionHeading";
import { EmptyState } from "@/components/shared/EmptyState";
import type { ArchitectureGraph } from "@/types/architecture";

interface DataFlowListProps {
  architecture: ArchitectureGraph | null;
}

export function DataFlowList({ architecture }: DataFlowListProps) {
  if (!architecture?.edges.length) {
    return (
      <EmptyState
        title="Data-flow information is currently unavailable."
        description="This project does not yet have architecture edges to describe movement between nodes."
      />
    );
  }

  const labelFor = (nodeId: string) =>
    architecture.nodes.find((node) => node.id === nodeId)?.label ?? nodeId;

  return (
    <div>
      <SectionHeading eyebrow="Edges">{architecture.title}</SectionHeading>
      <p className="max-w-prose text-sm leading-6 text-[var(--muted)]">
        Structured flow from the same architecture graph. Interactive playback is a later phase.
      </p>
      <ol className="mt-4 grid gap-2">
        {architecture.edges.map((edge) => (
          <Panel as="li" key={edge.id} className="p-4">
            <p className="font-medium">
              {labelFor(edge.source)}
              <span className="mx-2 text-[var(--muted)]" aria-hidden>
                →
              </span>
              {labelFor(edge.target)}
            </p>
            {edge.label ? (
              <p className="mt-1 text-sm text-[var(--muted)]">{edge.label}</p>
            ) : null}
          </Panel>
        ))}
      </ol>
    </div>
  );
}
