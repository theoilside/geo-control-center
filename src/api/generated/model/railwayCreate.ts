/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * API Geo
 * OpenAPI spec version: 0.1.0
 */
import type { RailwayCreateCityId } from "./railwayCreateCityId";
import type { RailwayCreateNeedAutomaticUpdate } from "./railwayCreateNeedAutomaticUpdate";
import type { RailwayCreateRegionId } from "./railwayCreateRegionId";

export interface RailwayCreate {
  city_id?: RailwayCreateCityId;
  country_id: number;
  express3_code: string;
  is_main: boolean;
  latitude: number;
  longitude: number;
  name: string;
  need_automatic_update?: RailwayCreateNeedAutomaticUpdate;
  osm_id: string;
  osm_type: string;
  region_id?: RailwayCreateRegionId;
  timezone: string;
}