import { Building } from "@/components/city/Building";
import { CityMap } from "@/components/city/CityMap";
import { CityNavigation } from "@/components/city/CityNavigation";
import { District } from "@/components/city/District";
import { PublicShell } from "@/components/layout/PublicShell";
import { city } from "@/data/city";
import { cityLocations } from "@/data/city-locations";
import { locationToBuilding } from "@/lib/city-map";

export default function CityPage() {
  return (
    <PublicShell title={city.name} description={city.summary}>
      <p className="text-sm text-[var(--muted)]">
        Optional exploration. Direct routes, search, and Mission Control remain the fastest paths.
      </p>

      <div className="mt-6 hidden md:block">
        <CityMap locations={cityLocations} />
      </div>

      <div className="mt-6 md:hidden">
        <CityNavigation locations={cityLocations} />
      </div>

      <div className="mt-10 hidden gap-8 md:grid md:grid-cols-2">
        {city.districts.map((district) => (
          <District key={district.id} district={district} />
        ))}
      </div>

      <ul className="sr-only">
        {cityLocations.map((location) => (
          <li key={location.id}>
            <Building building={locationToBuilding(location)} />
          </li>
        ))}
      </ul>
    </PublicShell>
  );
}
