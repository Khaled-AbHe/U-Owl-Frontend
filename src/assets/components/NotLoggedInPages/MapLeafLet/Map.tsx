import { useRef, useEffect } from "react";
import { config, Map as MapT, Marker, Popup } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { MAPTILER_API_KEY } from "../../../../API-import";
import "../../../Styles/map.css";

export default function Map() {
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

    new Marker({ color: "RED" })
      .setLngLat([-73, 46])
      .setPopup(new Popup().setText("U-Owl Dealer 1 : Georges Laraque"))
      .addTo(map.current);

    new Marker({ color: "BLUE" })
      .setLngLat([-73.6, 45.5])
      .setPopup(new Popup().setText("My Position"))
      .addTo(map.current);

    new Marker({ color: "RED" })
      .setLngLat([-73, 46.4])
      .setPopup(new Popup().setText("U-Owl Dealer 2 : Lewis Lefou"))
      .addTo(map.current);

    new Marker({ color: "RED" })
      .setLngLat([-73.4, 45.3])
      .setPopup(new Popup().setText("U-Owl Dealer 3 : Shahin Ouest"))
      .addTo(map.current);
  }, [quebec.lng, quebec.lat, zoom]);

  return (
    <div className="map-wrap">
      <div className="map" ref={container}></div>
    </div>
  );
}

//height:'300px',width:'100%
