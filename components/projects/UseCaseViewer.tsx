import { Panel } from "@/components/design/Panel";
import { SectionHeading } from "@/components/design/SectionHeading";
import { UseCaseExplorer } from "@/components/projects/UseCaseExplorer";
import { EmptyState } from "@/components/shared/EmptyState";
import type { UseCaseModel } from "@/types/use-case";

interface UseCaseViewerProps {
  model: UseCaseModel | null;
}

export function UseCaseViewer({ model }: UseCaseViewerProps) {
  if (!model) {
    return (
      <EmptyState
        title="Use-case information is currently unavailable."
        description="This project does not yet have a structured use-case model."
      />
    );
  }

  const actorName = (id: string) =>
    model.actors.find((actor) => actor.id === id)?.name ?? id;

  return (
    <div>
      <SectionHeading eyebrow="Use cases">{model.title}</SectionHeading>
      <p className="max-w-prose text-sm leading-6 text-[var(--muted)]">{model.description}</p>
      <div className="mt-4">
        <UseCaseExplorer model={model} />
      </div>

      <h3 className="mt-8 text-sm font-medium">All flows</h3>
      <ul className="mt-2 grid gap-3">
        {model.useCases.map((item) => (
          <Panel as="li" key={item.id} className="p-4">
            <p className="font-medium">{item.name}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{item.description}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Actors: {item.actorIds.map(actorName).join(", ")}
            </p>
          </Panel>
        ))}
      </ul>
    </div>
  );
}
