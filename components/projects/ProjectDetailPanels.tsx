import { Panel } from "@/components/design/Panel";
import { SectionHeading } from "@/components/design/SectionHeading";
import { TechnologyBadge } from "@/components/projects/TechnologyBadge";
import type { Project } from "@/types/project";

interface OverviewPanelProps {
  project: Project;
}

export function OverviewPanel({ project }: OverviewPanelProps) {
  return (
    <div className="grid gap-8">
      <section>
        <SectionHeading>Problem</SectionHeading>
        <p className="max-w-prose text-sm leading-6 text-[var(--muted)]">{project.problem}</p>
      </section>
      <section>
        <SectionHeading>Solution</SectionHeading>
        <p className="max-w-prose text-sm leading-6 text-[var(--muted)]">{project.solution}</p>
      </section>
      <section>
        <SectionHeading>Why it matters</SectionHeading>
        <p className="max-w-prose text-sm leading-6 text-[var(--muted)]">{project.whyItMatters}</p>
      </section>
      <section>
        <SectionHeading>Core features</SectionHeading>
        <ul className="grid gap-3">
          {project.features.map((feature) => (
            <Panel as="li" key={feature.title} className="p-4">
              <p className="font-medium">{feature.title}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{feature.description}</p>
            </Panel>
          ))}
        </ul>
      </section>
      <section>
        <SectionHeading>Implementation</SectionHeading>
        <p className="max-w-prose text-sm leading-6 text-[var(--muted)]">{project.implementation}</p>
      </section>
      <section>
        <SectionHeading>Challenges</SectionHeading>
        <p className="max-w-prose text-sm leading-6 text-[var(--muted)]">{project.challenges}</p>
      </section>
      <section>
        <SectionHeading>Future improvements</SectionHeading>
        <p className="max-w-prose text-sm leading-6 text-[var(--muted)]">
          {project.futureImprovements}
        </p>
      </section>
      {project.timeline.length ? (
        <section>
          <SectionHeading>Timeline</SectionHeading>
          <ol className="grid gap-3">
            {project.timeline.map((event) => (
              <Panel as="li" key={`${event.label}-${event.date}`} className="p-4">
                <p className="font-medium">{event.label}</p>
                <p className="mt-1 font-mono text-xs text-[var(--muted)]">{event.date}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{event.description}</p>
              </Panel>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}

export function TechnologyPanel({ project }: OverviewPanelProps) {
  return (
    <div className="grid gap-8">
      <section>
        <SectionHeading>Stack</SectionHeading>
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <TechnologyBadge>{tech}</TechnologyBadge>
            </li>
          ))}
        </ul>
      </section>
      {project.tags.length ? (
        <section>
          <SectionHeading>Tags</SectionHeading>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <TechnologyBadge>{tag}</TechnologyBadge>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

export function ResultsPanel({ project }: OverviewPanelProps) {
  return (
    <div className="grid gap-8">
      <section>
        <SectionHeading>Results</SectionHeading>
        <p className="max-w-prose text-sm leading-6 text-[var(--muted)]">{project.results}</p>
      </section>
      {project.metrics.length ? (
        <section>
          <SectionHeading>Metrics</SectionHeading>
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.metrics.map((metric) => (
              <Panel as="li" key={metric.label} className="p-4">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                  {metric.label}
                </p>
                <p className="mt-1 text-lg font-medium">{metric.value}</p>
              </Panel>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-sm text-[var(--muted)]">
          No quantitative metrics are published for this system yet.
        </p>
      )}
    </div>
  );
}
