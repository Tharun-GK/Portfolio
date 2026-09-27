export type CityDistrictKind =
  | "ai"
  | "research"
  | "startup"
  | "engineering"
  | "experience"
  | "learning";

export type CityBuildingKind =
  | "project"
  | "research"
  | "experience"
  | "startup"
  | "achievement";

export interface CityBuilding {
  id: string;
  name: string;
  kind: CityBuildingKind;
  summary: string;
  href: string;
  relatedProjectSlug?: string;
  relatedResearchId?: string;
  relatedExperienceId?: string;
}

export interface CityDistrict {
  id: string;
  name: string;
  kind: CityDistrictKind;
  summary: string;
  buildings: CityBuilding[];
}

export interface CityMapData {
  name: string;
  summary: string;
  districts: CityDistrict[];
}
