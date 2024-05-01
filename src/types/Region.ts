import { Name } from "./Name.ts";
import { Geometry } from "./Geometry.ts";

export type Region = {
  id: number;
  name: Name;
  geometry: Geometry;
  locationComponents: {
    countryId: number;
  };
  osmId: string;
  isDel: boolean;
};
