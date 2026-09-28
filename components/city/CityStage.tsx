"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { City3DBoundary } from "@/components/city/City3DBoundary";
import { CityMap } from "@/components/city/CityMap";
import { canUseCity3D } from "@/lib/city-3d";
import type { CityLocation } from "@/types/city-location";

const CityCanvas = dynamic(
  () => import("@/components/city/CityCanvas").then((mod) => mod.CityCanvas),
  { ssr: false },
);

interface CityStageProps {
  locations: CityLocation[];
  selectedId?: string | null;
}

export function CityStage({ locations, selectedId }: CityStageProps) {
  const [use3d, setUse3d] = useState(false);

  useEffect(() => {
    setUse3d(canUseCity3D());
  }, []);

  const map2d = (
    <div className="hidden md:block">
      <CityMap locations={locations} selectedId={selectedId} />
    </div>
  );

  if (!use3d) {
    return map2d;
  }

  return (
    <City3DBoundary fallback={map2d}>
      <CityCanvas locations={locations} selectedId={selectedId} />
    </City3DBoundary>
  );
}
