import React, { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
const LeafletGeocoder = () => {
  const map = useMap();
  useEffect(() => {
    L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default LeafletGeocoder;
