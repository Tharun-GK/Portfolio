"use client";

import { useEffect, useState } from "react";
import { ArchitectureViewer } from "@/components/projects/ArchitectureViewer";
import { DataFlowList } from "@/components/projects/DataFlowList";
import {
  OverviewPanel,
  ResultsPanel,
  TechnologyPanel,
} from "@/components/projects/ProjectDetailPanels";
import { UseCaseViewer } from "@/components/projects/UseCaseViewer";
import {
  PROJECT_DETAIL_TABS,
  hashForTab,
  tabFromHash,
  type ProjectDetailTabId,
} from "@/lib/project-detail";
import { cn } from "@/lib/utils";
import type { ArchitectureGraph } from "@/types/architecture";
import type { Project } from "@/types/project";
import type { UseCaseModel } from "@/types/use-case";

interface ProjectDetailTabsProps {
  project: Project;
  architecture: ArchitectureGraph | null;
  useCases: UseCaseModel | null;
}

export function ProjectDetailTabs({
  project,
  architecture,
  useCases,
}: ProjectDetailTabsProps) {
  const [tab, setTab] = useState<ProjectDetailTabId>("overview");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setTab(tabFromHash(window.location.hash));
    sync();
    setReady(true);
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <div className="mt-10">
      <div
        role="tablist"
        aria-label="Project sections"
        className="flex gap-1 overflow-x-auto border-b border-[var(--border)] pb-px"
      >
        {PROJECT_DETAIL_TABS.map((item) => {
          const selected = tab === item.id;
          return (
            <a
              key={item.id}
              role="tab"
              id={`tab-${item.id}`}
              href={hashForTab(item.id) || "#overview"}
              aria-selected={selected}
              aria-controls={item.hash}
              className={cn(
                "shrink-0 rounded-t-[var(--radius-md)] px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                selected
                  ? "border border-b-transparent border-[var(--border)] bg-[var(--panel)] text-[var(--text)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]",
              )}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </a>
          );
        })}
      </div>

      {PROJECT_DETAIL_TABS.map((item) => {
        const selected = tab === item.id;
        return (
          <section
            key={item.id}
            role="tabpanel"
            id={item.hash}
            aria-labelledby={`tab-${item.id}`}
            hidden={ready && !selected}
            className={cn("mt-6", ready && !selected && "hidden")}
          >
            {item.id === "overview" ? <OverviewPanel project={project} /> : null}
            {item.id === "architecture" ? (
              <ArchitectureViewer architecture={architecture} />
            ) : null}
            {item.id === "use-cases" ? <UseCaseViewer model={useCases} /> : null}
            {item.id === "data-flow" ? <DataFlowList architecture={architecture} /> : null}
            {item.id === "technology" ? <TechnologyPanel project={project} /> : null}
            {item.id === "results" ? <ResultsPanel project={project} /> : null}
          </section>
        );
      })}
    </div>
  );
}
