"use client";

import { useMemo, useState } from "react";
import type { CityLocation, CityLocationCategory } from "@/types/city-location";
import { CITY_DISTRICT_META } from "@/lib/city-map";
import { Building } from "@/components/city/Building";
import { locationToBuilding } from "@/lib/city-map";

interface CityNavigationProps {
  locations: CityLocation[];
}

export function CityNavigation({ locations }: CityNavigationProps) {
  const categories = useMemo(() => {
    const seen = new Set<CityLocationCategory>();
    for (const location of locations) {
      seen.add(location.category);
    }
    return [...seen];
  }, [locations]);

  const [selected, setSelected] = useState<CityLocationCategory>(categories[0] ?? "core");
  const members = locations.filter((item) => item.category === selected);
  const meta = CITY_DISTRICT_META[selected];

  return (
    <div className="grid gap-3">
      <label className="grid gap-1 text-sm">
        District
        <select
          className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2"
          value={selected}
          onChange={(event) => setSelected(event.target.value as CityLocationCategory)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {CITY_DISTRICT_META[category].name}
            </option>
          ))}
        </select>
      </label>
      <p className="text-sm text-[var(--muted)]">{meta.summary}</p>
      <ul className="grid gap-2">
        {members.map((location) => (
          <li key={location.id}>
            <Building building={locationToBuilding(location)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
