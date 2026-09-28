import Link from "next/link";
import type { CityBuilding } from "@/types/city";

interface BuildingProps {
  building: CityBuilding;
}

export function Building({ building }: BuildingProps) {
  return (
    <Link href={building.href} className="text-sm hover:underline">
      {building.name}
      <span className="ml-2 text-[var(--muted)]">— {building.summary}</span>
    </Link>
  );
}
