import Link from "next/link";
import { CommandDesk } from "@/components/command-center/CommandDesk";
import { CommandIcon } from "@/components/command-center/CommandIcons";
import { HudBars } from "@/components/mission-control/HudBars";
import { HudPanel } from "@/components/mission-control/HudPanel";
import { HudRing } from "@/components/mission-control/HudRing";
import { OperatorCore } from "@/components/mission-control/OperatorCore";
import { Badge } from "@/components/shared/Badge";
import { PROJECT_STATUS_LABEL } from "@/lib/design-tokens";
import { projectCategoryCaption, type MissionControlSnapshot } from "@/lib/mission-control";
import { profile } from "@/data/profile";

interface CommandCenterHomeProps {
  snapshot: MissionControlSnapshot;
}

const RING_TONES = ["cyan", "green", "violet"] as const;
const BAR_TONES = ["#4fd4ee", "#5ee0a8", "#b48cff"];

const QUICK_LINKS: {
  href: string;
  label: string;
  external?: boolean;
  download?: string;
}[] = [
  { href: "/projects", label: "View Projects" },
  { href: "/research", label: "Explore Research" },
  { href: "/experience", label: "Check Experience" },
  { href: "/contact", label: "Get in Touch" },
  ...(profile.resumeHref
    ? [{ href: profile.resumeHref, label: "Download Resume", download: "Tharun-G-K-Resume.pdf" }]
    : []),
  ...(profile.socials.github
    ? [{ href: profile.socials.github, label: "GitHub Profile", external: true }]
    : []),
];

export function CommandCenterHome({ snapshot }: CommandCenterHomeProps) {
  const { brief, projects, github, skills } = snapshot;

  return (
    <div className="mc-hud">
      <div className="command-theater">
        <div className="command-operator-slot">
          <OperatorCore name={profile.name} />
        </div>

        <HudPanel
          className="command-float command-float-progress"
          title="Project Progress"
          subtitle="Real projects. Real impact."
          icon={<CommandIcon name="projects" className="h-4 w-4" />}
        >
          <ul className="grid grid-cols-3 gap-1 sm:gap-2">
            {projects.map((project, index) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block rounded-sm focus-visible:outline focus-visible:outline-offset-2"
                >
                  <HudRing
                    value={project.progress}
                    label={project.title}
                    caption={projectCategoryCaption(project)}
                    tone={RING_TONES[index % RING_TONES.length]}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </HudPanel>

        <HudPanel
          className="command-float command-float-overview"
          title="Mission Overview"
          subtitle="Key projects at a glance"
          icon={<CommandIcon name="mission" className="h-4 w-4" />}
        >
          <HudBars
            items={projects.map((project, index) => ({
              id: project.slug,
              label: project.title,
              value: project.progress,
              status: PROJECT_STATUS_LABEL[project.status],
              href: `/projects/${project.slug}`,
              tone: BAR_TONES[index % BAR_TONES.length],
            }))}
          />
        </HudPanel>

        <HudPanel
          className="command-float command-float-github"
          title="GitHub"
          subtitle="Latest activity & repositories"
        >
          {github.source === "live" && github.repositories.length > 0 ? (
            <ul className="grid gap-2">
              {github.repositories.slice(0, 3).map((repo) => (
                <li key={repo.url}>
                  <Link href={repo.url} rel="noreferrer" target="_blank" className="text-sm font-medium">
                    {repo.name}
                  </Link>
                  <p className="mt-1 text-xs text-[var(--muted)]">{repo.language ?? "Language n/a"}</p>
                </li>
              ))}
            </ul>
            ) : (
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                Live Data
              </p>
              <p className="mt-2 text-2xl tracking-widest text-[var(--text)]">—</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{github.message ?? "Fetching data..."}</p>
            </div>
          )}
          {profile.socials.github ? (
            <Link
              href={profile.socials.github}
              rel="noreferrer"
              target="_blank"
              className="mt-3 inline-block text-sm text-[var(--accent)]"
            >
              github.com/Tharun-GK →
            </Link>
          ) : null}
        </HudPanel>

        <HudPanel
          className="command-float command-float-links"
          title="Quick Links"
          subtitle="Jump to key sections"
          icon={<CommandIcon name="contact" className="h-4 w-4" />}
        >
          <ul className="grid gap-2 sm:grid-cols-2">
            {QUICK_LINKS.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                {item.external || item.download ? (
                  <a
                    href={item.href}
                    download={item.download}
                    rel={item.external ? "noreferrer" : undefined}
                    target={item.external ? "_blank" : undefined}
                    className="flex items-center justify-between gap-2 border border-[rgba(79,212,238,0.12)] bg-[rgba(6,14,24,0.45)] px-3 py-2.5 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {item.label}
                    <span aria-hidden>→</span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-2 border border-[rgba(79,212,238,0.12)] bg-[rgba(6,14,24,0.45)] px-3 py-2.5 text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {item.label}
                    <span aria-hidden>→</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </HudPanel>

        <CommandDesk />
      </div>

      <section className="command-records px-4 pb-10 sm:px-6">
        <HudPanel>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <BriefItem term="Who" definition={brief.who} />
            <BriefItem term="Builds" definition={brief.builds} />
            <BriefItem term="Stack" definition={brief.technologies} />
            <BriefItem term="Working on" definition={brief.workingOn} />
            <BriefItem
              term="On record"
              definition={brief.onRecord}
              className="sm:col-span-2 lg:col-span-1"
            />
          </dl>
        </HudPanel>
        <HudPanel id="stack" className="mt-4" title="Skills & Tech">
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li key={skill.id}>
                <Badge>{skill.name}</Badge>
              </li>
            ))}
          </ul>
        </HudPanel>
      </section>
    </div>
  );
}

function BriefItem({
  term,
  definition,
  className,
}: {
  term: string;
  definition: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
        {term}
      </dt>
      <dd className="mt-1 text-sm leading-6">{definition}</dd>
    </div>
  );
}
