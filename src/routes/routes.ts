import {
  AIRPORTS_PAGE,
  CITIES_PAGE,
  COUNTRIES_PAGE,
  RAIL_STATIONS_PAGE,
  REGIONS_PAGE,
} from "./route-paths.ts";

export const getCountryPagePathById = (countryId: number) =>
  `${COUNTRIES_PAGE}/${countryId}`;

export const getRegionPagePathById = (regionId: number) =>
  `${REGIONS_PAGE}/${regionId}`;

export const getCityPagePathById = (cityId: number) =>
  `${CITIES_PAGE}/${cityId}`;

export const getAirportPagePathById = (airportId: number) =>
  `${AIRPORTS_PAGE}/${airportId}`;

export const getRailStationPagePathById = (railStationId: number) =>
  `${RAIL_STATIONS_PAGE}/${railStationId}`;
