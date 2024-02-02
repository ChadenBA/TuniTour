import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import "../../Styles/map.css"
import Footer from "../../components/userComponent/Footer"
import LeafletRoutingMachine from "../../components/userComponent/LeafletRoutingMachine";

export default function Map() {
  const position = [36.8065, 10.1815]
  return (
    <div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletRoutingMachine />
      </MapContainer>
      <Footer />
    </div>
  )
}
let DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png",

});
L.Marker.prototype.options.icon = DefaultIcon;