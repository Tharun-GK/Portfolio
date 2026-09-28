import { describe, expect, it } from "vitest";
import { cityLocations } from "@/data/city-locations";
import {
  CITY_ROAD_LINES,
  CITY_SITES,
  cameraPoseFor,
  cityPositionToWorld,
  districtPadsFromSites,
  getCitySite,
  locationCameraPose,
  requireCitySites,
} from "@/lib/city-3d";

describe("city 3d mapping", () => {
  it("gives every cityLocations entry a unique plot off the road centerlines", () => {
    const sites = requireCitySites(cityLocations);
    expect(sites).toHaveLength(cityLocations.length);
    expect(Object.keys(CITY_SITES)).toHaveLength(cityLocations.length);
    const road = new Set(CITY_ROAD_LINES.map(String));
    for (const site of sites) {
      expect(road.has(String(site.x))).toBe(false);
      expect(road.has(String(site.z))).toBe(false);
    }
  });

  it("keeps the 2D map helper for the fallback canvas", () => {
    expect(cityPositionToWorld({ x: 50, y: 50 })).toEqual({ x: 0, z: 0 });
  });

  it("builds a pad per occupied district from 3D plots", () => {
    const pads = districtPadsFromSites(cityLocations);
    const categories = new Set(cityLocations.map((item) => item.category));
    expect(pads).toHaveLength(categories.size);
  });

  it("computes a closer location camera than overview", () => {
    const gks = cityLocations.find((item) => item.id === "loc-gks");
    expect(gks).toBeDefined();
    const overview = cameraPoseFor("overview", cityLocations, null);
    const close = cameraPoseFor("location", cityLocations, gks ?? null);
    const site = getCitySite("loc-gks");
    expect(site).toBeDefined();
    if (site) {
      expect(locationCameraPose(site).target[0]).toBe(site.x);
    }
    const overviewDist = Math.hypot(...overview.position);
    const closeDist = Math.hypot(
      close.position[0] - (site?.x ?? 0),
      close.position[2] - (site?.z ?? 0),
    );
    expect(closeDist).toBeLessThan(overviewDist);
  });

  it("keeps Open destinations on real cityLocations routes", () => {
    expect(cityLocations.find((item) => item.id === "loc-gks")?.route).toBe(
      "/projects/gks-care",
    );
    expect(cityLocations.find((item) => item.id === "loc-bookmyshift")?.route).toBe(
      "/projects/bookmyshift",
    );
  });

  it("flies closer on approach than on location view", () => {
    const site = getCitySite("loc-bookmyshift");
    expect(site).toBeDefined();
    if (!site) {
      return;
    }
    const mid = locationCameraPose(site, 1);
    const near = locationCameraPose(site, 2);
    const midDist = Math.hypot(mid.position[0] - site.x, mid.position[2] - site.z);
    const nearDist = Math.hypot(near.position[0] - site.x, near.position[2] - site.z);
    expect(nearDist).toBeLessThan(midDist);
  });
});
