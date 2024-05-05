import {COUNTRIES_PAGE, REGIONS_PAGE} from "./route-paths.ts";

export const getCountryPagePathById = (countryId: number) =>
  `${COUNTRIES_PAGE}/${countryId}`;

export const getRegionPagePathById = (regionId: number) =>
    `${REGIONS_PAGE}/${regionId}`;
