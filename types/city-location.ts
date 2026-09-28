export type CityLocationCategory =
  | "core"
  | "mission"
  | "lab"
  | "research"
  | "startup"
  | "profile";

export type CityLocationStatus = "online" | "planned";

export interface CityLocation {
  id: string;
  name: string;
  description: string;
  route: string;
  category: CityLocationCategory;
  position: { x: number; y: number };
  status: CityLocationStatus;
}

export function getCityLocationById(
  locations: CityLocation[],
  id: string,
): CityLocation | undefined {
  return locations.find((item) => item.id === id);
}

export function getCityLocationByRoute(
  locations: CityLocation[],
  route: string,
): CityLocation | undefined {
  return locations.find((item) => item.route === route);
}
