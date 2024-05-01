/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * API Geo
 * OpenAPI spec version: 0.1.0
 */
import type { CityCreateIata } from "./cityCreateIata";
import type { CityCreateNeedAutomaticUpdate } from "./cityCreateNeedAutomaticUpdate";

export interface CityCreate {
  country_id: number;
  iata?: CityCreateIata;
  latitude: number;
  longitude: number;
  name: string;
  need_automatic_update?: CityCreateNeedAutomaticUpdate;
  osm_id: string;
  osm_type: string;
  region_id: number;
  timezone: string;
}
