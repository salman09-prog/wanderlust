import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type Props = {
  lat: number;
  lng: number;
  name: string;
};

export default function Map({ lat, lng, name }: Props) {
  const position: [number, number] = [lat, lng];

  return (
    <MapContainer
      center={position}
      zoom={9}
      style={{ height: "400px", width: "100%" }}

    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
}