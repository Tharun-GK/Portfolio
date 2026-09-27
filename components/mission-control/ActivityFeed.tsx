import Link from "next/link";
import { Panel } from "@/components/design/Panel";
import type { Activity } from "@/types/activity";

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <ol className="grid gap-2">
      {activities.map((activity) => {
        const content = (
          <>
            <p className="font-mono text-[0.65rem] text-[var(--muted)]">
              {activity.type} · {activity.date}
            </p>
            <p className="mt-1 text-sm font-medium">{activity.title}</p>
          </>
        );

        return (
          <Panel as="li" key={activity.id} className="p-3">
            {activity.href ? (
              <Link href={activity.href} className="block">
                {content}
              </Link>
            ) : (
              content
            )}
          </Panel>
        );
      })}
    </ol>
  );
}
