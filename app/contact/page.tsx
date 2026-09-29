import { Panel } from "@/components/design/Panel";
import { PublicShell } from "@/components/layout/PublicShell";
import { ResumeDownloadLink } from "@/components/shared/ResumeDownloadLink";
import { profile } from "@/data/profile";

export default function ContactPage() {
  return (
    <PublicShell title="Contact" description="Public contact details from the portfolio profile.">
      <Panel as="article">
        <p className="text-sm font-medium">{profile.name}</p>
        <p className="mt-2 text-sm text-[var(--muted)]">{profile.role}</p>
        <ul className="mt-6 grid gap-3 text-sm">
          {profile.email ? (
            <li>
              Email:{" "}
              <a href={`mailto:${profile.email}`} className="text-[var(--accent)] hover:underline">
                {profile.email}
              </a>
            </li>
          ) : null}
          {profile.socials.github ? (
            <li>
              GitHub:{" "}
              <a
                href={profile.socials.github}
                rel="noreferrer"
                target="_blank"
                className="text-[var(--accent)] hover:underline"
              >
                {profile.socials.github}
              </a>
            </li>
          ) : null}
          {profile.socials.linkedin ? (
            <li>
              LinkedIn:{" "}
              <a
                href={profile.socials.linkedin}
                rel="noreferrer"
                target="_blank"
                className="text-[var(--accent)] hover:underline"
              >
                {profile.socials.linkedin}
              </a>
            </li>
          ) : null}
        </ul>
        <p className="mt-6">
          <ResumeDownloadLink />
        </p>
      </Panel>
    </PublicShell>
  );
}
