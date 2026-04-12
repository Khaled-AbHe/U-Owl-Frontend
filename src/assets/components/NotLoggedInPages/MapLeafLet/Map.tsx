import { useRef, useEffect } from "react";
import { config, Map as MapT } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { MAPTILER_API_KEY } from "../../../../API-import";
import "../../../Styles/map.css";

export default function Map() {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<MapT | null>(null);

  useEffect(() => {
    if (!container.current) return;
    if (map.current) return;

    //https://docs.maptiler.com/vite/
    config.apiKey = MAPTILER_API_KEY;
    map.current = new MapT({ container: container.current });
  }, []);

  return (
    <div className="map-wrap">
      <div
        className="map"
        ref={container}
      ></div>
    </div>
  );
}

//height:'300px',width:'100%
