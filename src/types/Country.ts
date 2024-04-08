import {Name} from "./Name.ts";
import {Geometry} from "./Geometry.ts";

export type Country = {
    id: number;
    code_alpha2: string;
    code_alpha3: string;
    name: Name;
    geometry: Geometry;
    phone_code: number;
    osm_id: string;
    del: boolean;
}
