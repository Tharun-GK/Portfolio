import { StatusBadge } from "@/components/design/StatusBadge";
import type { ProjectStatus } from "@/types/project";

export function ProjectStatus({ status }: { status: ProjectStatus }) {
  return <StatusBadge status={status} />;
}
