export function Loading({ label = "Loading" }: { label?: string }) {
  return (
    <p role="status" className="text-sm text-[var(--muted)]">
      {label}…
    </p>
  );
}
