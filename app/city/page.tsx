import Link from "next/link";
import { Panel } from "@/components/design/Panel";
import { PublicShell } from "@/components/layout/PublicShell";
import { city } from "@/data/city";

export default function CityPage() {
  return (
    <PublicShell
      title={city.name}
      description={`${city.summary} Interactive map rendering arrives in a later phase; districts are already data.`}
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {city.districts.map((district) => (
          <Panel as="li" key={district.id}>
            <h2 className="font-medium">{district.name}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{district.summary}</p>
            <ul className="mt-4 grid gap-2">
              {district.buildings.map((building) => (
                <li key={building.id}>
                  <Link href={building.href} className="text-sm hover:underline">
                    {building.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </ul>
    </PublicShell>
  );
}
