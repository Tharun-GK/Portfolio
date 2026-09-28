import Link from "next/link";
import { Badge } from "@/components/shared/Badge";
import { CITY_CATEGORY_LABEL } from "@/lib/city-map";
import type { CityLocation } from "@/types/city-location";

interface CityInspectProps {
  location: CityLocation | null;
}

export function CityInspect({ location }: CityInspectProps) {
  if (!location) {
    return (
      <p className="text-sm text-[var(--muted)]">
        Select a node to inspect it. District lists and public routes skip the map entirely.
      </p>
    );
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--panel)] p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-medium">{location.name}</h2>
        <Badge>{location.status}</Badge>
        <Badge>{CITY_CATEGORY_LABEL[location.category]}</Badge>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{location.description}</p>
      <p className="mt-4">
        <Link href={location.route} className="text-sm hover:underline">
          Open {location.route}
        </Link>
      </p>
    </div>
  );
}
