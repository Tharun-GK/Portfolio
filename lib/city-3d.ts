import type { CityLocation, CityLocationCategory } from "@/types/city-location";

export const CITY_WORLD_SPAN = 8;

export function cityPositionToWorld(position: { x: number; y: number }): {
  x: number;
  z: number;
} {
  return {
    x: ((position.x - 50) / 50) * CITY_WORLD_SPAN,
    z: ((position.y - 50) / 50) * CITY_WORLD_SPAN,
  };
}

export const CITY_3D_BUILDING_HEIGHT: Record<CityLocationCategory, number> = {
  core: 1.45,
  mission: 1.15,
  lab: 1.55,
  research: 1.05,
  startup: 1.75,
  profile: 0.95,
};

export const CITY_3D_BUILDING_COLOR: Record<CityLocationCategory, string> = {
  core: "#3f4852",
  mission: "#4a5560",
  lab: "#5a6a72",
  research: "#4d5c56",
  startup: "#6b5e48",
  profile: "#5c5850",
};

export const CITY_3D_SELECTED = "#c4b58a";
export const CITY_3D_PLANNED = "#6d7178";
export const CITY_3D_GROUND = "#121417";
export const CITY_3D_PAD = "#1a1d22";
export const CITY_3D_ROAD = "#2a2f36";

export interface DistrictPad {
  category: CityLocationCategory;
  x: number;
  z: number;
  width: number;
  depth: number;
}

export function districtPads(locations: CityLocation[]): DistrictPad[] {
  const grouped = new Map<CityLocationCategory, CityLocation[]>();
  for (const location of locations) {
    const list = grouped.get(location.category) ?? [];
    list.push(location);
    grouped.set(location.category, list);
  }

  const pads: DistrictPad[] = [];
  for (const [category, members] of grouped) {
    const points = members.map((item) => cityPositionToWorld(item.position));
    const xs = points.map((point) => point.x);
    const zs = points.map((point) => point.z);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minZ = Math.min(...zs);
    const maxZ = Math.max(...zs);
    const pad = 1.15;
    pads.push({
      category,
      x: (minX + maxX) / 2,
      z: (minZ + maxZ) / 2,
      width: Math.max(2.2, maxX - minX + pad * 2),
      depth: Math.max(2.2, maxZ - minZ + pad * 2),
    });
  }
  return pads;
}

export function canUseCity3D(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.matchMedia("(prefers-reduced-data: reduce)").matches) {
    return false;
  }

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean };
    }
  ).connection;
  if (connection?.saveData) {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}
