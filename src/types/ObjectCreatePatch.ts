import {
  AirportCreate,
  AirportUpdate,
  CityCreate,
  CityUpdate,
  CountryCreate,
  CountryUpdate,
  RailwayCreate,
  RailwayUpdate,
  RegionCreate,
  RegionUpdate,
} from "../api/generated/model";

export type ObjectCreatePatch =
  | CountryCreate
  | CountryUpdate
  | RegionCreate
  | RegionUpdate
  | CityCreate
  | CityUpdate
  | AirportCreate
  | AirportUpdate
  | RailwayCreate
  | RailwayUpdate;
