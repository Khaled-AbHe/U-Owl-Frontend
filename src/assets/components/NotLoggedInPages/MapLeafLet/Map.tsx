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

    const dealers = [
      {
        color: "RED",
        lon: -73,
        lat: 46,
        Title: "U-Owl Dealer: ",
        name: "Georges Laraque",
      },
      {
        color: "BLUE",
        lon: -73.6,
        lat: 45.5,
        Title: "U-Owl Dealer: ",
        name: "Georges Laraque",
      },
      {
        color: "RED",
        lon: -73,
        lat: 46.4,
        Title: "U-Owl Dealer: ",
        name: "Lewis Lefou",
      },
      {
        color: "RED",
        lon: -73.4,
        lat: 45.3,
        Title: "U-Owl Dealer: ",
        name: "Shahin Ouest",
      }
  ]

  dealers.map(item => {
    new Marker({ color: item.color})
      .setLngLat([item.lon,item.lat])
      .setPopup(new Popup().setText(item.Title + item.name))
      .addTo(map.current)
  })

  const userLon = -73.6
  const userLat = 45.5
  const userPos = "My Position"

  new Marker({ color: "Blue"})
      .setLngLat([userLon,userLat])
      .setPopup(new Popup().setText(userPos))
      .addTo(map.current)

  }, [quebec.lng, quebec.lat, zoom]);

  return (
    <div className="map-wrap">
      <div className="map" ref={container}></div>
    </div>
  );
}

//height:'300px',width:'100%
