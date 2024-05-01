import { Name } from "./Name.ts";
import { Geometry } from "./Geometry.ts";

export type City = {
  id: number;
  code: string;
  name: Name;
  geometry: Geometry;
  timezone: string;
  locationComponents: {
    regionId?: number;
    countryId: number;
  };
  osmId: string;
  isDel: boolean;
};
