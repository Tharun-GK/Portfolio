import Link from "next/link";
import type { CityLocation } from "@/types/city-location";

const CATEGORY_LABEL: Record<CityLocation["category"], string> = {
  core: "Core",
  mission: "Mission",
  lab: "Lab",
  research: "Research",
  startup: "Startup",
  profile: "Profile",
};

interface CityMapProps {
  locations: CityLocation[];
}

export function CityMap({ locations }: CityMapProps) {
  const hub = locations.find((item) => item.id === "loc-central") ?? locations[0];

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {hub
          ? locations
              .filter((item) => item.id !== hub.id)
              .map((item) => (
                <line
                  key={item.id}
                  x1={hub.position.x}
                  y1={hub.position.y}
                  x2={item.position.x}
                  y2={item.position.y}
                  stroke="currentColor"
                  strokeOpacity="0.18"
                  strokeWidth="0.35"
                />
              ))
          : null}
      </svg>
      <ul className="absolute inset-0">
        {locations.map((location) => (
          <li
            key={location.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${location.position.x}%`, top: `${location.position.y}%` }}
          >
            <Link
              href={location.route}
              className="group flex max-w-36 flex-col items-center text-center outline-none"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-4 ring-[var(--accent)]/20 group-hover:ring-[var(--accent)]/40 group-focus-visible:ring-[var(--accent)]/50" />
              <span className="mt-1 text-[10px] font-medium leading-tight text-[var(--text)]">
                {location.name}
              </span>
              <span className="text-[9px] uppercase tracking-wide text-[var(--muted)]">
                {CATEGORY_LABEL[location.category]}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
