import { PublicShell } from "@/components/layout/PublicShell";
import { profile } from "@/data/profile";

export default function ContactPage() {
  return (
    <PublicShell
      title="Contact"
      description="Public contact surface. No form backend is enabled in version 1, so nothing sensitive is collected here."
    >
      <article className="rounded-lg border border-[var(--border)] p-5">
        <p className="text-sm">{profile.name}</p>
        <p className="mt-2 text-sm text-[var(--muted)]">{profile.positioning}</p>
        {profile.email ? (
          <p className="mt-4 text-sm">
            Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        ) : (
          <p className="mt-4 text-sm text-[var(--muted)]">
            Add a public email in data/profile.ts when you want it listed. Do not commit private
            addresses you do not want indexed.
          </p>
        )}
      </article>
    </PublicShell>
  );
}
