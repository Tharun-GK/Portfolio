import { cityLocations } from "@/data/city-locations";
import { buildCityMap } from "@/lib/city-map";

export const city = buildCityMap(cityLocations);
