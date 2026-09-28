import type { CityLocation, CityLocationCategory } from "@/types/city-location";

export type CityCameraMode = "overview" | "district" | "location" | "approach";

export type CityBuildingStyle = "tower" | "hall" | "lab" | "campus" | "studio" | "office";

export interface CitySite {
  id: string;
  x: number;
  z: number;
  rotY: number;
  style: CityBuildingStyle;
  storeys: number;
}

/** Presentation-only plots. Identity still lives on cityLocations. */
export const CITY_SITES: Record<string, Omit<CitySite, "id">> = {
  "loc-central": { x: 3.6, z: 3.6, rotY: Math.PI, style: "tower", storeys: 6 },
  "loc-mission-control": { x: 3.6, z: -11.2, rotY: 0, style: "hall", storeys: 4 },
  "loc-suraksha": { x: -11.2, z: -11.2, rotY: Math.PI / 2, style: "lab", storeys: 5 },
  "loc-project-lab": { x: -11.2, z: 3.6, rotY: Math.PI / 2, style: "lab", storeys: 4 },
  "loc-gks": { x: -11.2, z: 11.2, rotY: Math.PI / 2, style: "lab", storeys: 4 },
  "loc-research": { x: 3.6, z: 11.2, rotY: Math.PI, style: "campus", storeys: 3 },
  "loc-bookmyshift": { x: 11.2, z: 3.6, rotY: -Math.PI / 2, style: "studio", storeys: 5 },
  "loc-experience": { x: 11.2, z: 11.2, rotY: -Math.PI / 2, style: "office", storeys: 4 },
  "loc-about": { x: 11.2, z: -11.2, rotY: -Math.PI / 2, style: "office", storeys: 3 },
};

export const CITY_ROAD_LINES = [-16, -8, 0, 8, 16] as const;
export const CITY_ROAD_HALF = 0.9;
export const CITY_ROAD_SPAN = 36;

export function getCitySite(id: string): CitySite | undefined {
  const plot = CITY_SITES[id];
  if (!plot) {
    return undefined;
  }
  return { id, ...plot };
}

export function requireCitySites(locations: CityLocation[]): CitySite[] {
  return locations.map((location) => {
    const site = getCitySite(location.id);
    if (!site) {
      throw new Error(`Missing city plot for ${location.id}`);
    }
    return site;
  });
}

export const CITY_3D_GROUND = "#121417";
export const CITY_3D_GRASS = "#1c2420";
export const CITY_3D_PAD = "#1a1d22";
export const CITY_3D_ROAD = "#2c3036";
export const CITY_3D_SIDEWALK = "#3a3f46";
export const CITY_3D_CURB = "#4a4f56";
export const CITY_3D_MARKING = "#d7d2c6";
export const CITY_3D_CENTERLINE = "#c4b58a";
export const CITY_3D_SELECTED = "#c4b58a";
export const CITY_3D_PLANNED = "#6d7178";

export const CITY_3D_BUILDING_COLOR: Record<CityLocationCategory, string> = {
  core: "#4a5560",
  mission: "#3f4a58",
  lab: "#4d5c64",
  research: "#44554c",
  startup: "#6b5e48",
  profile: "#58544c",
};

export interface DistrictPad {
  category: CityLocationCategory;
  x: number;
  z: number;
  width: number;
  depth: number;
}

export function districtPadsFromSites(locations: CityLocation[]): DistrictPad[] {
  const grouped = new Map<CityLocationCategory, CitySite[]>();
  for (const location of locations) {
    const site = getCitySite(location.id);
    if (!site) {
      continue;
    }
    const list = grouped.get(location.category) ?? [];
    list.push(site);
    grouped.set(location.category, list);
  }

  const pads: DistrictPad[] = [];
  for (const [category, members] of grouped) {
    const xs = members.map((item) => item.x);
    const zs = members.map((item) => item.z);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minZ = Math.min(...zs);
    const maxZ = Math.max(...zs);
    const pad = 3.4;
    pads.push({
      category,
      x: (minX + maxX) / 2,
      z: (minZ + maxZ) / 2,
      width: Math.max(6, maxX - minX + pad * 2),
      depth: Math.max(6, maxZ - minZ + pad * 2),
    });
  }
  return pads;
}

export interface CameraPose {
  position: [number, number, number];
  target: [number, number, number];
}

export function overviewCameraPose(): CameraPose {
  return { position: [20, 24, 20], target: [0, 0, 0] };
}

export function locationCameraPose(site: CitySite, closeness = 1): CameraPose {
  const back = closeness === 2 ? 4.1 : 7.4;
  const height = closeness === 2 ? 3.35 : 5.6;
  const dx = Math.sin(site.rotY) * back;
  const dz = Math.cos(site.rotY) * back;
  return {
    position: [site.x + dx, height, site.z + dz],
    target: [site.x, site.storeys * 0.42, site.z],
  };
}

export function districtCameraPose(locations: CityLocation[], category: CityLocationCategory): CameraPose {
  const pads = districtPadsFromSites(locations.filter((item) => item.category === category));
  const pad = pads[0];
  if (!pad) {
    return overviewCameraPose();
  }
  return {
    position: [pad.x + 11, 14, pad.z + 11],
    target: [pad.x, 0.4, pad.z],
  };
}

export function cameraPoseFor(
  mode: CityCameraMode,
  locations: CityLocation[],
  selected: CityLocation | null,
): CameraPose {
  if (mode === "overview" || !selected) {
    return overviewCameraPose();
  }
  const site = getCitySite(selected.id);
  if (!site) {
    return overviewCameraPose();
  }
  if (mode === "district") {
    return districtCameraPose(locations, selected.category);
  }
  return locationCameraPose(site, mode === "approach" ? 2 : 1);
}

export function lampPositions(compact: boolean): [number, number, number][] {
  const step = compact ? 8 : 5.5;
  const offset = CITY_ROAD_HALF + 0.55;
  const points: [number, number, number][] = [];
  for (const line of CITY_ROAD_LINES) {
    for (let t = -16; t <= 16; t += step) {
      points.push([line + offset, 0, t]);
      points.push([t, 0, line + offset]);
    }
  }
  return points;
}

export function treePositions(compact: boolean): [number, number, number][] {
  const plaza: [number, number, number][] = [
    [-2.2, 0, -2.2],
    [2.2, 0, -2.4],
    [-2.4, 0, 2.1],
    [2.1, 0, 2.3],
    [0, 0, -3.1],
  ];
  if (compact) {
    return plaza.slice(0, 3);
  }
  return [
    ...plaza,
    [-14.4, 0, 0],
    [14.4, 0, 0],
    [0, 0, -14.4],
    [0, 0, 14.4],
    [-6.2, 0, -14.5],
    [6.2, 0, 14.5],
  ];
}

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
