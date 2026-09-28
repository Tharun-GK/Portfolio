import type { UseCaseActor, UseCaseItem } from "@/types/use-case";

interface UseCaseDetailProps {
  item: UseCaseItem;
  actors: UseCaseActor[];
}

export function UseCaseDetail({ item, actors }: UseCaseDetailProps) {
  const actorName = (id: string) => actors.find((actor) => actor.id === id)?.name ?? id;

  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border)] p-4">
      <p className="font-medium">{item.name}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">{item.description}</p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Actors: {item.actorIds.map(actorName).join(", ")}
      </p>
      {item.preconditions.length ? (
        <div className="mt-3">
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">Preconditions</p>
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
    </div>
  );
}
