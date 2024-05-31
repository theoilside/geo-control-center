import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  DEFAULT_LAYOUT,
  AUTH_LAYOUT,
  LOGIN_PAGE,
  COUNTRIES_PAGE,
  REGIONS_PAGE,
  COUNTRY_PAGE,
  REGION_PAGE,
  CITIES_PAGE,
  CITY_PAGE,
  // AIRPORTS_PAGE,
  // AIRPORT_PAGE,
  // RAIL_STATIONS_PAGE,
  // RAIL_STATION_PAGE,
  // METRO_STATIONS_PAGE,
  // METRO_STATION_PAGE,
} from "./route-paths";
import BaseLayout from "../layout";
import ErrorPage from "../pages/error-page/error-page";
import CountriesPage from "../pages/table-pages/countries-page/countries-page.tsx";
import RegionsPage from "../pages/table-pages/regions-page/regions-page.tsx";
import LoginPage from "../pages/login-page/login-page.tsx";
import CountryPage from "../pages/object-pages/country-page/country-page.tsx";
import RegionPage from "../pages/object-pages/region-page/region-page.tsx";
import CitiesPage from "../pages/table-pages/cities-page/cities-page.tsx";
import CityPage from "../pages/object-pages/city-page/city-page.tsx";

const router = createBrowserRouter(
  [
    {
      path: DEFAULT_LAYOUT,
      element: <BaseLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Navigate to={COUNTRIES_PAGE} />,
        },
        {
          path: COUNTRIES_PAGE,
          element: <CountriesPage />,
        },
        {
          path: COUNTRY_PAGE,
          element: <CountryPage />,
        },
        {
          path: REGIONS_PAGE,
          element: <RegionsPage />,
        },
        {
          path: REGION_PAGE,
          element: <RegionPage />,
        },
        {
          path: CITIES_PAGE,
          element: <CitiesPage />,
        },
        {
          path: CITY_PAGE,
          element: <CityPage />,
        },
      ],
    },
    {
      path: AUTH_LAYOUT,
      element: <BaseLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: LOGIN_PAGE,
          element: <LoginPage />,
        },
      ],
    },
    {
      path: "/*",
      element: <BaseLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ],
  {
    // Удалить при деплое вне GitHub Pages
    basename: "/geo-control-center",
  },
);

export default router;
