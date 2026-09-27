import { Badge } from "@/components/shared/Badge";
import {
  getMissionStatusColor,
  getProjectStatusColor,
  MISSION_STATUS_LABEL,
  PROJECT_STATUS_LABEL,
} from "@/lib/design-tokens";
import type { MissionStatus } from "@/types/mission";
import type { ProjectStatus } from "@/types/project";

interface StatusBadgeProps {
  status: ProjectStatus | MissionStatus;
}

const PROJECT_STATUSES: readonly ProjectStatus[] = [
  "planning",
  "building",
  "testing",
  "active",
  "completed",
  "archived",
];

function isProjectStatus(status: StatusBadgeProps["status"]): status is ProjectStatus {
  return (PROJECT_STATUSES as readonly string[]).includes(status);
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = isProjectStatus(status)
    ? PROJECT_STATUS_LABEL[status]
    : MISSION_STATUS_LABEL[status];
  const color = isProjectStatus(status)
    ? getProjectStatusColor(status)
    : getMissionStatusColor(status);

  return (
    <Badge tone="status" className="border-current" style={{ color, borderColor: color }}>
      {label}
    </Badge>
  );
}
