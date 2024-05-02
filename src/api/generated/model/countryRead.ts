/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * API Geo
 * OpenAPI spec version: 0.1.0
 */
import type { CountryReadDeletedAt } from "./countryReadDeletedAt";
import type { CountryReadNeedAutomaticUpdate } from "./countryReadNeedAutomaticUpdate";

export interface CountryRead {
  deleted_at: CountryReadDeletedAt;
  id: number;
  iso3116_alpha2: string;
  iso3166_alpha3: string;
  last_updated_at: string;
  latitude: number;
  longitude: number;
  name: string;
  need_automatic_update?: CountryReadNeedAutomaticUpdate;
  osm_id: string;
  osm_type: string;
  phone_code: string;
  phone_mask: string;
}