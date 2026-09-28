import { Panel } from "@/components/design/Panel";
import { SectionHeading } from "@/components/design/SectionHeading";
import { EmptyState } from "@/components/shared/EmptyState";
import { getArchitectureNodeColor } from "@/lib/design-tokens";
import type { ArchitectureGraph } from "@/types/architecture";

interface ArchitectureViewerProps {
  architecture: ArchitectureGraph | null;
}

export function ArchitectureViewer({ architecture }: ArchitectureViewerProps) {
  if (!architecture) {
    return (
      <EmptyState
        title="Architecture information is currently unavailable."
        description="This project does not yet have a structured architecture graph."
      />
    );
  }

  return (
    <div>
      <SectionHeading eyebrow="System graph">{architecture.title}</SectionHeading>
      <p className="max-w-prose text-sm leading-6 text-[var(--muted)]">
        {architecture.description}
      </p>
      <ol className="mt-4 grid gap-2">
        {architecture.nodes.map((node) => (
          <Panel as="li" key={node.id} className="p-4">
            <div
              className="rounded-[var(--radius-md)] border-l-[3px] pl-3"
              style={{ borderLeftColor: getArchitectureNodeColor(node.type) }}
            >
              <p className="font-medium">{node.label}</p>
              <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                {node.type}
                {node.technology ? ` · ${node.technology}` : ""}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">{node.purpose}</p>
              {node.description ? (
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{node.description}</p>
              ) : null}
              {node.input || node.output ? (
                <dl className="mt-3 grid gap-1 text-sm">
                  {node.input ? (
                    <div>
                      <dt className="inline text-[var(--text)]">Input: </dt>
                      <dd className="inline text-[var(--muted)]">{node.input}</dd>
                    </div>
                  ) : null}
                  {node.output ? (
                    <div>
                      <dt className="inline text-[var(--text)]">Output: </dt>
                      <dd className="inline text-[var(--muted)]">{node.output}</dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}
            </div>
          </Panel>
        ))}
      </ol>
    </div>
  );
}
