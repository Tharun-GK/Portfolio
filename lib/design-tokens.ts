import type { ArchitectureNodeType } from "@/types/architecture";
import type { MissionStatus } from "@/types/mission";
import type { ProjectStatus } from "@/types/project";

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  planning: "Planning",
  building: "Building",
  testing: "Testing",
  active: "Active",
  completed: "Completed",
  archived: "Archived",
};

export const MISSION_STATUS_LABEL: Record<MissionStatus, string> = {
  planned: "Planned",
  "in-progress": "In progress",
  blocked: "Blocked",
  complete: "Complete",
};

const projectStatusVar: Record<ProjectStatus, string> = {
  planning: "var(--status-planning)",
  building: "var(--status-building)",
  testing: "var(--status-testing)",
  active: "var(--status-active)",
  completed: "var(--status-completed)",
  archived: "var(--status-archived)",
};

const missionToProjectStatus: Record<MissionStatus, ProjectStatus> = {
  planned: "planning",
  "in-progress": "building",
  blocked: "testing",
  complete: "completed",
};

export function getProjectStatusColor(status: ProjectStatus): string {
  return projectStatusVar[status];
}

export function getMissionStatusColor(status: MissionStatus): string {
  if (status === "blocked") {
    return "var(--status-blocked)";
  }
  return getProjectStatusColor(missionToProjectStatus[status]);
}

export function getArchitectureNodeColor(type: ArchitectureNodeType): string {
  return `var(--node-${type})`;
}

export function clampProgress(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }
  return Math.min(100, Math.max(0, Math.round(value)));
}
