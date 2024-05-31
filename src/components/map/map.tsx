import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@chakra-ui/react";

type MapProps = {
  pointGeometry: {
    lat?: number;
    lon?: number;
  };
  pointName?: string;
  pointType: string;
  zoom: number;
};

function Map({ ...props }: MapProps) {
  return (
    <Card variant={"outline"} width={"40vw"} minWidth={'200px'} height={'100%'}>
      <MapContainer
        center={[props.pointGeometry.lat ?? 0, props.pointGeometry.lon ?? 0]}
        zoom={props.zoom}
        scrollWheelZoom={false}
        style={{ height: "100%" }}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/*https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png*/}
        {/*https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png*/}
        <Marker position={[props.pointGeometry.lat ?? 0, props.pointGeometry.lon ?? 0]}>
          <Popup>
            {props.pointName} ({props.pointType}) <br /> {props.pointGeometry.lat ?? 0}, {props.pointGeometry.lon ?? 0}
          </Popup>
        </Marker>
      </MapContainer>
    </Card>
  );
}

export default Map;
