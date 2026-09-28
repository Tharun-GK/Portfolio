import type { CityDistrict } from "@/types/city";
import { Building } from "@/components/city/Building";

interface DistrictProps {
  district: CityDistrict;
}

export function District({ district }: DistrictProps) {
  return (
    <section aria-labelledby={district.id}>
      <h2 id={district.id} className="font-medium">
        {district.name}
      </h2>
      <p className="mt-1 text-sm text-[var(--muted)]">{district.summary}</p>
      <ul className="mt-3 grid gap-2">
        {district.buildings.map((building) => (
          <li key={building.id}>
            <Building building={building} />
          </li>
        ))}
      </ul>
    </section>
  );
}
