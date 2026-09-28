import Link from "next/link";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { CITY_CATEGORY_LABEL } from "@/lib/city-map";
import { cn } from "@/lib/utils";
import type { CityLocation } from "@/types/city-location";

interface CityLocationCardProps {
  location: CityLocation;
  onNavigateHere?: () => void;
  onOverview?: () => void;
  compact?: boolean;
}

export function CityLocationCard({
  location,
  onNavigateHere,
  onOverview,
  compact = false,
}: CityLocationCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--panel)] shadow-[var(--shadow-panel)]",
        compact ? "p-4" : "p-5",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-medium">{location.name}</h2>
        <Badge>{location.status}</Badge>
        <Badge>{CITY_CATEGORY_LABEL[location.category]}</Badge>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{location.description}</p>
      <div className="mt-4 grid gap-2">
        {onNavigateHere ? (
          <Button type="button" variant="quiet" onClick={onNavigateHere}>
            Navigate Here
          </Button>
        ) : null}
        <Link
          href={location.route}
          className="inline-flex min-h-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-3 py-2 text-sm font-medium text-[var(--bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Open {location.name} →
        </Link>
        {onOverview ? (
          <Button type="button" variant="ghost" onClick={onOverview}>
            ← Overview
          </Button>
        ) : (
          <Link href="/city" className="inline-flex min-h-10 items-center justify-center px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--text)]">
            ← Overview
          </Link>
        )}
      </div>
    </div>
  );
}
