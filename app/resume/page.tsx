import { PublicShell } from "@/components/layout/PublicShell";
import { profile } from "@/data/profile";

export default function ResumePage() {
  return (
    <PublicShell
      title="Resume"
      description="A concise recruiter view. A downloadable PDF can be added under public/resume without changing this route."
    >
      <article className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-5">
        <h2 className="text-lg font-medium">{profile.name}</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">{profile.role}</p>
        <p className="mt-4 max-w-prose text-sm leading-6">{profile.positioning}</p>
        <p className="mt-4 text-sm text-[var(--muted)]">
          PDF resume is not attached yet. Place a file in public/resume and link it here when
          available.
        </p>
      </article>
    </PublicShell>
  );
}
