import { describe, expect, it } from "vitest";
import { cityLocations } from "@/data/city-locations";
import { city } from "@/data/city";
import { buildCityMap } from "@/lib/city-map";
import { getCityLocationByRoute } from "@/types/city-location";

describe("city locations", () => {
  it("maps city places to stable public routes", () => {
    expect(getCityLocationByRoute(cityLocations, "/mission-control")?.id).toBe(
      "loc-mission-control",
    );
    expect(getCityLocationByRoute(cityLocations, "/projects/suraksha-astra")?.name).toBe(
      "Suraksha-Astra Lab",
    );
    expect(cityLocations.every((item) => item.route.startsWith("/"))).toBe(true);
  });

  it("derives districts from locations only", () => {
    const map = buildCityMap(cityLocations);
    const buildingHrefs = map.districts.flatMap((district) =>
      district.buildings.map((building) => building.href),
    );
    expect(new Set(buildingHrefs)).toEqual(
      new Set(cityLocations.map((location) => location.route)),
    );
    expect(city).toEqual(map);
  });

  it("keeps location ids unique", () => {
    const ids = cityLocations.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
