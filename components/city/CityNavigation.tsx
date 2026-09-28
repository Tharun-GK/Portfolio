"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { CityLocation, CityLocationCategory } from "@/types/city-location";
import { CITY_DISTRICT_META } from "@/lib/city-map";
import { cn } from "@/lib/utils";

interface CityNavigationProps {
  locations: CityLocation[];
  selectedId?: string | null;
  initialCategory?: CityLocationCategory;
}

export function CityNavigation({
  locations,
  selectedId,
  initialCategory,
}: CityNavigationProps) {
  const categories = useMemo(() => {
    const seen = new Set<CityLocationCategory>();
    for (const location of locations) {
      seen.add(location.category);
    }
    return [...seen];
  }, [locations]);

  const [selected, setSelected] = useState<CityLocationCategory>(
    initialCategory ?? categories[0] ?? "core",
  );

  useEffect(() => {
    if (initialCategory) {
      setSelected(initialCategory);
    }
  }, [initialCategory]);
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
        {members.map((location) => {
          const active = location.id === selectedId;
          return (
            <li key={location.id}>
              <Link
                href={`/city?loc=${location.id}`}
                scroll={false}
                aria-current={active ? "true" : undefined}
                className={cn("text-sm hover:underline", active && "text-[var(--accent)]")}
              >
                {location.name}
                <span className="ml-2 text-[var(--muted)]">— {location.description}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
