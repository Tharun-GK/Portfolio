import { describe, expect, it } from "vitest";
import { cityLocations } from "@/data/city-locations";
import { getCityLocationByRoute } from "@/types/city-location";

describe("city locations", () => {
  it("maps future city places to stable public routes", () => {
    expect(getCityLocationByRoute(cityLocations, "/mission-control")?.id).toBe(
      "loc-mission-control",
    );
    expect(getCityLocationByRoute(cityLocations, "/projects/suraksha-astra")?.name).toBe(
      "Suraksha-Astra Lab",
    );
    expect(cityLocations.every((item) => item.route.startsWith("/"))).toBe(true);
  });
});
