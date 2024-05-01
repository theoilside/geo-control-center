import { City } from "../types/City.ts";

export const cities: City[] = [
  {
    id: 1,
    code: "SVX",
    name: {
      ru: "Екатеринбург",
      en: "Yekaterinburg",
    },
    geometry: {
      lat: 56.83820583574083,
      lon: 60.60337509959938,
    },
    timezone: "Asia/Yekaterinburg",
    locationComponents: {
      regionId: 5,
      countryId: 1,
    },
    osmId: "6564910",
    isDel: false,
  },
  {
    id: 2,
    code: "AKX",
    name: {
      ru: "Актобе",
      en: "Aktobe",
    },
    geometry: {
      lat: 50.299650668133,
      lon: 57.157612800598,
    },
    timezone: "Asia/Aqtau",
    locationComponents: {
      countryId: 3,
    },
    osmId: "2485052",
    isDel: false,
  },
  {
    id: 3,
    code: "SDF",
    name: {
      ru: "Луисвилл",
      en: "Louisville",
    },
    geometry: {
      lat: 40.83760070800781,
      lon: -81.25963592529297,
    },
    timezone: "America/New_York",
    locationComponents: {
      countryId: 3,
    },
    osmId: "1804307",
    isDel: false,
  },
];
