import type { CityBuilding, CityDistrict, CityDistrictKind, CityMapData } from "@/types/city";
import {
  getCityLocationById,
  type CityLocation,
  type CityLocationCategory,
} from "@/types/city-location";

export const CITY_CATEGORY_LABEL: Record<CityLocationCategory, string> = {
  core: "Core",
  mission: "Mission",
  lab: "Lab",
  research: "Research",
  startup: "Startup",
  profile: "Profile",
};

export function parseCityLocParam(
  value: string | string[] | undefined,
  locations: CityLocation[],
): CityLocation | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) {
    return null;
  }
  return getCityLocationById(locations, raw) ?? null;
}

interface DistrictMeta {
  id: string;
  name: string;
  kind: CityDistrictKind;
  summary: string;
}

export const CITY_DISTRICT_META: Record<CityLocationCategory, DistrictMeta> = {
  core: {
    id: "district-core",
    name: "THARUN OS Central",
    kind: "engineering",
    summary: "Operating environment and system core.",
  },
  mission: {
    id: "district-mission",
    name: "Mission District",
    kind: "engineering",
    summary: "Recruiter dashboard and operational snapshot.",
  },
  lab: {
    id: "district-lab",
    name: "Labs",
    kind: "ai",
    summary: "Product lab and applied AI systems.",
  },
  research: {
    id: "district-research",
    name: "Research District",
    kind: "research",
    summary: "Papers, conferences, and research framing.",
  },
  startup: {
    id: "district-startup",
    name: "Startup District",
    kind: "startup",
    summary: "Product headquarters.",
  },
  profile: {
    id: "district-profile",
    name: "Profile District",
    kind: "experience",
    summary: "Identity, resume, and experience timeline.",
  },
};

function buildingKind(category: CityLocationCategory): CityBuilding["kind"] {
  if (category === "research") {
    return "research";
  }
  if (category === "startup") {
    return "startup";
  }
  if (category === "profile") {
    return "experience";
  }
  if (category === "lab") {
    return "project";
  }
  return "project";
}

export function locationToBuilding(location: CityLocation): CityBuilding {
  const projectMatch = location.route.match(/^\/projects\/([^/]+)$/);
  return {
    id: location.id,
    name: location.name,
    kind: buildingKind(location.category),
    summary: location.description,
    href: location.route,
    relatedProjectSlug: projectMatch?.[1],
    relatedResearchId:
      location.route === "/research" ? "research-suraksha-astra" : undefined,
  };
}

export function buildCityMap(locations: CityLocation[]): CityMapData {
  const grouped = new Map<CityLocationCategory, CityLocation[]>();
  for (const location of locations) {
    const list = grouped.get(location.category) ?? [];
    list.push(location);
    grouped.set(location.category, list);
  }

  const districts: CityDistrict[] = [];
  for (const category of Object.keys(CITY_DISTRICT_META) as CityLocationCategory[]) {
    const members = grouped.get(category);
    if (!members?.length) {
      continue;
    }
    const meta = CITY_DISTRICT_META[category];
    districts.push({
      id: meta.id,
      name: meta.name,
      kind: meta.kind,
      summary: meta.summary,
      buildings: members.map(locationToBuilding),
    });
  }

  return {
    name: "Tharun City",
    summary:
      "Optional map of locations. Every node is a public route — the city is never the only way in.",
    districts,
  };
}
