import Link from "next/link";
import { Panel } from "@/components/design/Panel";
import { PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/shared/Badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { getGitHubSnapshot } from "@/lib/github";

export default async function GitHubPage() {
  const snapshot = await getGitHubSnapshot();

  return (
    <PublicShell
      title="GitHub"
      description="Public repository activity, loaded on the server. If GitHub is unavailable, this page stays up with a fallback state."
    >
      {snapshot.source === "fallback" ? (
        <EmptyState
          title="GitHub data temporarily unavailable."
          description={
            snapshot.message ??
            "Live repository list could not be loaded. The profile is still https://github.com/Tharun-GK."
          }
        />
      ) : null}

      {snapshot.username ? (
        <p className="mt-4 text-sm">
          Profile:{" "}
          <Link
            href={`https://github.com/${snapshot.username}`}
            rel="noreferrer"
            target="_blank"
            className="text-[var(--accent)] hover:underline"
          >
            https://github.com/{snapshot.username}
          </Link>
        </p>
      ) : null}

      {snapshot.repositories.length > 0 ? (
        <ul className="mt-6 grid gap-3">
          {snapshot.repositories.map((repo) => (
            <Panel as="li" key={repo.url} className="p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-medium">
                  <Link href={repo.url} rel="noreferrer" target="_blank">
                    {repo.name}
                  </Link>
                </h2>
                {repo.language ? <Badge>{repo.language}</Badge> : null}
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {repo.description ?? "No description."}
              </p>
            </Panel>
          ))}
        </ul>
      ) : snapshot.source === "live" ? (
        <EmptyState
          title="No public repositories returned."
          description="The GitHub user is configured, but this snapshot is empty."
        />
      ) : null}
    </PublicShell>
  );
}
