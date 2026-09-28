import { CityLocationCard } from "@/components/city/CityLocationCard";
import type { CityLocation } from "@/types/city-location";

interface CityInspectProps {
  location: CityLocation | null;
}

export function CityInspect({ location }: CityInspectProps) {
  if (!location) {
    return (
      <p className="text-sm text-[var(--muted)]">
        Select a building in the city or a district list item. Open goes to the real public route.
      </p>
    );
  }

  return <CityLocationCard location={location} />;
}
