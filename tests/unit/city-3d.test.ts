import { describe, expect, it } from "vitest";
import { cityLocations } from "@/data/city-locations";
import { CITY_WORLD_SPAN, cityPositionToWorld, districtPads } from "@/lib/city-3d";

describe("city 3d mapping", () => {
  it("places central at the world origin", () => {
    const world = cityPositionToWorld({ x: 50, y: 50 });
    expect(world.x).toBe(0);
    expect(world.z).toBe(0);
  });

  it("maps every location from the same cityLocations source", () => {
    for (const location of cityLocations) {
      const world = cityPositionToWorld(location.position);
      expect(Math.abs(world.x)).toBeLessThanOrEqual(CITY_WORLD_SPAN);
      expect(Math.abs(world.z)).toBeLessThanOrEqual(CITY_WORLD_SPAN);
    }
  });

  it("builds a pad per occupied district", () => {
    const pads = districtPads(cityLocations);
    const categories = new Set(cityLocations.map((item) => item.category));
    expect(pads).toHaveLength(categories.size);
  });
});
