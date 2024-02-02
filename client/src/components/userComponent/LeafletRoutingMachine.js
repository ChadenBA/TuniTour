import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = () => {
  const map = useMap()
  let DefaultIcon = L.icon({
    iconUrl: "https://www.gifsanimes.com/data/media/1635/marche-a-pied-image-animee-0013.gif",
    iconSize: [90, 90],
  });
  useEffect(() => {
    var marker1 = L.marker([36.8065, 10.1815], { icon: DefaultIcon }).addTo(map)
    map.on("click", function (e) {
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
      L.Routing.control({
        waypoints: [
          L.latLng(36.8065, 10.1815),
          L.latLng(e.latlng.lat, e.latlng.lng)
        ],
        lineOptions: {
          styles: [
            {
              color: "blue",
              weight: 3,
              opacity: 0.7
            }
          ]
        },
        routeWhileDragging: false,
        geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: true,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false
      })
        .on("routesfound", function (e) {
          e.routes[0].coordinates.forEach((c, i) => {
            setTimeout(() => {
              marker1.setLatLng([c.lat, c.lng]);
            }, 100 * i)
          })
        })
        .addTo(map);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null;
};

export default LeafletRoutingMachine;
