import { COUNTRIES_PAGE } from "./route-paths.ts";

export const getCountryPagePathById = (countryId: number) =>
  `${COUNTRIES_PAGE}/${countryId}`;
