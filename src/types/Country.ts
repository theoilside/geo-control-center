import { Name } from "./Name.ts";
import { Geometry } from "./Geometry.ts";

export type Country = {
  id: number;
  codeAlpha2: string;
  codeAlpha3: string;
  name: Name;
  geometry: Geometry;
  phoneCode: number;
  osmId: string;
  isDel: boolean;
};
