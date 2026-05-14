import { useRef, useEffect } from "react";
import { config, Map as MapT, Marker, Popup } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import { MAPTILER_API_KEY } from "../../data/requests/api-constants";
import { useLoaderData } from "react-router-dom";

interface Location {
  depotName: string;
  lon: number;
  lat: number;
  phoneNumber: string;
}

export default function Map() {
  const locations = useLoaderData() as Location[];

  const container = useRef<HTMLDivElement>(null);
  const map = useRef<MapT | null>(null);

  const quebec = { lng: -74, lat: 46 };
  const zoom = 6;

  //https://docs.maptiler.com/vite/
  config.apiKey = MAPTILER_API_KEY;

  useEffect(() => {
    if (!container.current) return;
    if (map.current) return;

    map.current = new MapT({
      container: container.current,
      center: [quebec.lng, quebec.lat],
      zoom: zoom,
    });

    // Search
    //https://docs.maptiler.com/sdk-js/examples/geocoding-filter-types/
    // Geocontrol
    const gc = new GeocodingControl({
      types: ["poi"],
    });

    map.current.addControl(gc, "top-left");
    map.current.on("load", function () {
      locations.forEach((location: Location) => {
        new Marker()
          .setLngLat([location.lon, location.lat])
          .setPopup(new Popup().setText(location.depotName))
          .addTo(map.current!);
      });

      // const userLocation = map.getCenter()
      // gc.setOptions({
      //   proximity:  [userLocation.lat,userLocation.lon]
      // })
      //To implement once we link backend
      // const userLocation =  map.getCenter();`
      // gc.setOptions({
      // proximity: [userLocation.lat, userLocation.lng]})
    });
  }, [quebec.lng, quebec.lat, zoom, locations]);

  return (
    <div className="map-wrap">
      <div className="map" ref={container}></div>
    </div>
  );
}

