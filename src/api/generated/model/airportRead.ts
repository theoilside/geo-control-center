/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * API Geo
 * OpenAPI spec version: 0.1.0
 */
import type { AirportReadDeletedAt } from "./airportReadDeletedAt";
import type { AirportReadIataEn } from "./airportReadIataEn";
import type { AirportReadIataRu } from "./airportReadIataRu";
import type { AirportReadNeedAutomaticUpdate } from "./airportReadNeedAutomaticUpdate";

export interface AirportRead {
  /** The identifier for the city where the airport is located */
  city_id: number;
  /** The timestamp of when the airport was deleted */
  deleted_at?: AirportReadDeletedAt;
  /** The international IATA code in English */
  iata_en?: AirportReadIataEn;
  /** The international IATA code in Russian */
  iata_ru?: AirportReadIataRu;
  /** The unique identifier for the airport */
  id: number;
  /** The timestamp of the last update */
  last_updated_at: string;
  /** The latitude coordinate of the airport */
  latitude: number;
  /** The longitude coordinate of the airport */
  longitude: number;
  /** The name of the airport */
  name: string;
  /** Flag indicating if automatic updates are needed */
  need_automatic_update?: AirportReadNeedAutomaticUpdate;
  /** The OpenStreetMap identifier for the airport */
  osm_id: string;
  /** The OpenStreetMap type for the airport */
  osm_type: string;
  /** The timezone of the airport by IANA format */
  timezone: string;
}
