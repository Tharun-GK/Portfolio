import { PublicShell } from "@/components/layout/PublicShell";

export default function NotFound() {
  return (
    <PublicShell
      title="Not found"
      description="This route is not part of THARUN OS. Use the primary navigation or return home."
    >
      <p className="text-sm text-[var(--muted)]">
        Project URLs are stable slugs such as /projects/suraksha-astra.
      </p>
    </PublicShell>
  );
}
