import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@chakra-ui/react";

type MapProps = {
  pointGeometry: {
    lat: number;
    lon: number;
  };
  pointName: string;
  pointType: string;
  zoom: number;
};

function Map({ ...props }: MapProps) {
  return (
    <Card variant={"outline"} width={"40%"}>
      <MapContainer
        center={[props.pointGeometry.lat, props.pointGeometry.lon]}
        zoom={props.zoom}
        scrollWheelZoom={false}
        style={{ height: "100%" }}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[props.pointGeometry.lat, props.pointGeometry.lon]}>
          <Popup>
            {props.pointName} <br /> {props.pointType}
          </Popup>
        </Marker>
      </MapContainer>
    </Card>
  );
}

export default Map;
