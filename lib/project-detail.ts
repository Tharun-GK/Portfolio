export const PROJECT_DETAIL_TABS = [
  { id: "overview", hash: "overview", label: "Overview" },
  { id: "architecture", hash: "architecture", label: "Architecture" },
  { id: "use-cases", hash: "use-cases", label: "Use Cases" },
  { id: "data-flow", hash: "data-flow", label: "Data Flow" },
  { id: "technology", hash: "technology", label: "Technology" },
  { id: "results", hash: "results", label: "Results" },
] as const;

export type ProjectDetailTabId = (typeof PROJECT_DETAIL_TABS)[number]["id"];

export function tabFromHash(hash: string): ProjectDetailTabId {
  const value = hash.replace(/^#/, "").trim().toLowerCase();
  if (!value || value === "overview") {
    return "overview";
  }
  if (value === "use-case") {
    return "use-cases";
  }
  const match = PROJECT_DETAIL_TABS.find((tab) => tab.hash === value);
  return match?.id ?? "overview";
}

export function hashForTab(tab: ProjectDetailTabId): string {
  return tab === "overview" ? "" : `#${tab}`;
}
