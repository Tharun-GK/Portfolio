import { Panel } from "@/components/design/Panel";
import { PublicShell } from "@/components/layout/PublicShell";
import { ResumeDownloadLink } from "@/components/shared/ResumeDownloadLink";
import { Badge } from "@/components/shared/Badge";
import { achievementItems } from "@/data/achievements";
import { educationItems } from "@/data/education";
import { experienceItems } from "@/data/experience";
import { profile } from "@/data/profile";
import { researchItems } from "@/data/research";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import Link from "next/link";

const SKILL_GROUP_LABEL: Record<string, string> = {
  language: "Programming Languages",
  domain: "Software Development",
  framework: "Frameworks & Libraries",
  platform: "Cloud & Technologies",
  tool: "Tools",
};

const SKILL_GROUP_ORDER = ["language", "domain", "framework", "platform", "tool"] as const;

export default function ResumePage() {
  return (
    <PublicShell
      title="Resume / About"
      description={profile.summary}
    >
      <Panel as="article">
        <h2 className="text-lg font-medium">{profile.name}</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">{profile.role}</p>
        <p className="mt-4 max-w-prose text-sm leading-6">{profile.positioning}</p>
        <p className="mt-4 max-w-prose text-sm leading-6">{profile.summary}</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {profile.email ? (
            <a href={`mailto:${profile.email}`} className="text-[var(--accent)] hover:underline">
              {profile.email}
            </a>
          ) : null}
          {profile.socials.github ? (
            <a
              href={profile.socials.github}
              rel="noreferrer"
              target="_blank"
              className="text-[var(--accent)] hover:underline"
            >
              GitHub
            </a>
          ) : null}
          {profile.socials.linkedin ? (
            <a
              href={profile.socials.linkedin}
              rel="noreferrer"
              target="_blank"
              className="text-[var(--accent)] hover:underline"
            >
              LinkedIn
            </a>
          ) : null}
          <ResumeDownloadLink />
        </div>
      </Panel>

      <section className="mt-8">
        <h2 className="text-lg font-medium">Education</h2>
        <ul className="mt-4 grid gap-3">
          {educationItems.map((item) => (
            <Panel as="li" key={item.id} className="p-4">
              <p className="font-medium">{item.degree}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.institution}</p>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                {item.period}
                {item.score ? ` · CGPA ${item.score}` : ""}
              </p>
            </Panel>
          ))}
        </ul>
      </section>

      <section id="stack" className="mt-8">
        <h2 className="text-lg font-medium">Skills & Tech</h2>
        <div className="mt-4 grid gap-4">
          {SKILL_GROUP_ORDER.map((group) => {
            const items = skills.filter((skill) => skill.group === group);
            if (!items.length) {
              return null;
            }
            return (
              <div key={group}>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {SKILL_GROUP_LABEL[group]}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <li key={skill.id}>
                      <Badge>{skill.name}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium">Experience</h2>
        <ul className="mt-4 grid gap-3">
          {experienceItems.map((item) => (
            <Panel as="li" key={item.id} className="p-4">
              <p className="font-medium">
                {item.role} · {item.organization}
              </p>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                {item.startDate}
                {item.endDate ? ` – ${item.endDate}` : " – Present"}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.description}</p>
            </Panel>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium">Projects</h2>
        <ul className="mt-4 grid gap-3">
          {projects.map((project) => (
            <Panel as="li" key={project.slug} className="p-4">
              <Link href={`/projects/${project.slug}`} className="font-medium hover:underline">
                {project.title}
              </Link>
              <p className="mt-2 text-sm text-[var(--muted)]">{project.shortDescription}</p>
            </Panel>
          ))}
          <Panel as="li" className="p-4">
            <a
              href="https://github.com/Tharun-GK/cloud-chat-app"
              rel="noreferrer"
              target="_blank"
              className="font-medium hover:underline"
            >
              Cloud Chat Application
            </a>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Public repository: cloud-chat-app.
            </p>
          </Panel>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium">Research & Achievements</h2>
        <ul className="mt-4 grid gap-3">
          {researchItems.map((item) => (
            <Panel as="li" key={item.id} className="p-4">
              <p className="font-medium">{item.title}</p>
              {item.conference ? (
                <p className="mt-1 text-sm text-[var(--muted)]">{item.conference}</p>
              ) : null}
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                {item.role} · {item.date}
              </p>
            </Panel>
          ))}
          {achievementItems.map((item) => (
            <Panel as="li" key={item.id} className="p-4">
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.detail}</p>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">{item.date}</p>
            </Panel>
          ))}
        </ul>
      </section>
    </PublicShell>
  );
}
