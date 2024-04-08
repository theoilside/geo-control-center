import {Country} from "../types/Country.ts";

export const countries: Country[] = [
    {
        id: 1,
        code_alpha2: 'RU',
        code_alpha3: 'RUS',
        name: {
            ru: 'Россия',
            en: 'Russia',
        },
        geometry: {
            lat: 64.718,
            lon: 97.69
        },
        phone_code: 7,
        osm_id: '60189',
        del: false,
    },
    {
        id: 2,
        code_alpha2: 'UA',
        code_alpha3: 'UKR',
        name: {
            ru: 'Украина',
            en: 'Ukraine',
        },
        geometry: {
            lat: 60.1,
            lon: 92.45
        },
        phone_code: 380,
        osm_id: '60995',
        del: false,
    },
    {
        id: 3,
        code_alpha2: 'KZ',
        code_alpha3: 'KAZ',
        name: {
            ru: 'Казахстан',
            en: 'Kazakhstan',
        },
        geometry: {
            lat: 52.26,
            lon: 88.652
        },
        phone_code: 7,
        osm_id: '60990',
        del: false,
    },
    {
        id: 4,
        code_alpha2: 'KZ',
        code_alpha3: 'KAZ',
        name: {
            ru: 'Казахстан Ленд',
            en: 'Kazakhstan Land',
        },
        geometry: {
            lat: 52.26,
            lon: 88.652
        },
        phone_code: 7,
        osm_id: '60990',
        del: true,
    },
]
