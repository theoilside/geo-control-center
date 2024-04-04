import { createBrowserRouter } from 'react-router-dom';
import {
    DEFAULT_LAYOUT,
    AUTH_LAYOUT,
    LOGIN_PAGE,
    COUNTRIES_PAGE,
    REGIONS_PAGE,
    // COUNTRY_PAGE,
    // REGION_PAGE,
    // CITIES_PAGE,
    // CITY_PAGE,
    // AIRPORTS_PAGE,
    // AIRPORT_PAGE,
    // RAIL_STATIONS_PAGE,
    // RAIL_STATION_PAGE,
    // METRO_STATIONS_PAGE,
    // METRO_STATION_PAGE,
} from './route-paths';
import BaseLayout from '../layout';
import ErrorPage from '../pages/error-page/error-page'
import CountriesPage from "../pages/table-pages/countries-page/countries-page.tsx";
import RegionsPage from "../pages/table-pages/regions-page/regions-page.tsx";
import LoginPage from "../pages/login-page/login-page.tsx";

const router = createBrowserRouter([
    {
        path: DEFAULT_LAYOUT,
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: COUNTRIES_PAGE,
                element: <CountriesPage />,
            },
            {
                path: REGIONS_PAGE,
                element: <RegionsPage />,
            },
        ],
    },
    {
        path: AUTH_LAYOUT,
        element: <BaseLayout />,
        children: [
            {
                path: LOGIN_PAGE,
                element: <LoginPage />,
            },
        ],
    },
]);

export default router;
