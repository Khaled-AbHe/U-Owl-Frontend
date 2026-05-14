import { useRef, useEffect } from "react";
import { config, Map as MapT, Marker, Popup } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import { MAPTILER_API_KEY } from "../../data/requests/api-constants";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import type { Location } from "../../types/location.entity";
import LocationCard from "../Cards/LocationCard";

export default function Map() {
  const locations = useLoaderData() as Location[];
  const [selected, setSelected] = useState<Location | null>(null);
  

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
        const marker = new Marker()
          .setLngLat([location.lon, location.lat])
          .setPopup(new Popup().setText(location.depotName))
          .addTo(map.current!);

          marker.getElement().addEventListener("click", () => {
            setSelected(location);
          });
      });
    });
  }, [quebec.lng, quebec.lat, zoom, locations]);

  return (
    <div className="map-wrap">
    <div className="map" ref={container}></div>
    {selected && <LocationCard location={selected} onClose={() => setSelected(null)} />}
  </div>
);
};