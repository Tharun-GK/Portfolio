import Link from "next/link";
import { ProgressBar } from "@/components/design/ProgressBar";
import { StatusBadge } from "@/components/design/StatusBadge";
import { Panel } from "@/components/design/Panel";
import type { Mission } from "@/types/mission";

interface MissionCardProps {
  mission: Mission;
}

export function MissionCard({ mission }: MissionCardProps) {
  const href = mission.relatedProjectSlug
    ? `/projects/${mission.relatedProjectSlug}`
    : undefined;

  return (
    <Panel as="li" className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-medium">
          {href ? <Link href={href}>{mission.title}</Link> : mission.title}
        </h3>
        <StatusBadge status={mission.status} />
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">{mission.summary}</p>
      <div className="mt-3">
        <ProgressBar value={mission.progress} label={mission.focus} />
      </div>
    </Panel>
  );
}
