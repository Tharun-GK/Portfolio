import { Panel } from "@/components/design/Panel";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Panel className="border-dashed bg-transparent">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-2 max-w-prose text-sm text-[var(--muted)]">{description}</p>
    </Panel>
  );
}
