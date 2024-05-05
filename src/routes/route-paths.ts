export const DEFAULT_LAYOUT = "";

export const AUTH_LAYOUT = "/auth";
export const LOGIN_PAGE = `${AUTH_LAYOUT}/login`;

export const COUNTRIES_PAGE = `${DEFAULT_LAYOUT}/countries`;
export const COUNTRY_PAGE = `${COUNTRIES_PAGE}/:objectId`;

export const REGIONS_PAGE = `${DEFAULT_LAYOUT}/regions`;
export const REGION_PAGE = `${REGIONS_PAGE}/:objectId`;

export const CITIES_PAGE = `${DEFAULT_LAYOUT}/cities`;
export const CITY_PAGE = `${CITIES_PAGE}/:cityId`;

export const AIRPORTS_PAGE = `${DEFAULT_LAYOUT}/airports`;
export const AIRPORT_PAGE = `${AIRPORTS_PAGE}/:airportId`;

export const RAIL_STATIONS_PAGE = `${DEFAULT_LAYOUT}/rail_stations`;
export const RAIL_STATION_PAGE = `${RAIL_STATIONS_PAGE}/:railStationId`;

export const METRO_STATIONS_PAGE = `${DEFAULT_LAYOUT}/metro_stations`;
export const METRO_STATION_PAGE = `${METRO_STATIONS_PAGE}/:metroStationId`;
