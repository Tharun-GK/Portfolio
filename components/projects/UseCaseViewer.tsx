import { Panel } from "@/components/design/Panel";
import { SectionHeading } from "@/components/design/SectionHeading";
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

      <h3 className="mt-6 text-sm font-medium">Actors</h3>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {model.actors.map((actor) => (
          <Panel as="li" key={actor.id} className="p-4">
            <p className="font-medium">{actor.name}</p>
            {actor.description ? (
              <p className="mt-1 text-sm text-[var(--muted)]">{actor.description}</p>
            ) : null}
          </Panel>
        ))}
      </ul>

      <h3 className="mt-6 text-sm font-medium">Flows</h3>
      <ul className="mt-2 grid gap-3">
        {model.useCases.map((item) => (
          <Panel as="li" key={item.id} className="p-4">
            <p className="font-medium">{item.name}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{item.description}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Actors: {item.actorIds.map(actorName).join(", ")}
            </p>
            {item.preconditions.length ? (
              <div className="mt-3">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                  Preconditions
                </p>
                <ul className="mt-1 list-disc pl-5 text-sm text-[var(--muted)]">
                  {item.preconditions.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt-3">
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">Main flow</p>
              <ol className="mt-1 list-decimal pl-5 text-sm text-[var(--muted)]">
                {item.mainFlow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <p className="mt-3 text-sm">
              <span className="text-[var(--text)]">Output: </span>
              <span className="text-[var(--muted)]">{item.output}</span>
            </p>
          </Panel>
        ))}
      </ul>
    </div>
  );
}
