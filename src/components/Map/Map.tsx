import { useRef, useEffect } from "react";
import { config, Map as MapT, Marker, Popup } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";
import { MAPTILER_API_KEY } from "../../data/requests/api-constants";
import { useLoaderData , useFetcher} from "react-router-dom";
import { useState } from "react";

interface Vehicle {
  vehicleId: number;
  licensePlate: string;
  vehicleType: string;
  vehicleSubtype: string;
  isReserved: boolean;
}

interface Location {
  locationId : number;
  depotName: string;
  lon: number;
  lat: number;
  phoneNumber: string;
  inventory: Vehicle[];
}
function groupInventory(inventory: Vehicle[]) {
  const groups: Record<string, { type: string; subtype: string; total: number; available: number; firstAvailableId: number | null }> = {};

  for (const vehicle of inventory) {
    const key = `${vehicle.vehicleType}|${vehicle.vehicleSubtype}`;

    if (!groups[key]) {
      groups[key] = { type: vehicle.vehicleType, subtype: vehicle.vehicleSubtype, total: 0, available: 0, firstAvailableId: null };
    }

    groups[key].total++;

    if (!vehicle.isReserved) {
      groups[key].available++;
      if (groups[key].firstAvailableId === null) {
        groups[key].firstAvailableId = vehicle.vehicleId;
      }
    }
  }

  return Object.values(groups);
}

function AddButton({ vehicleId }: { vehicleId: number }) {
  const fetcher = useFetcher();
  const [added, setAdded] = useState(false);

  function handleClick() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }return (
    <fetcher.Form method="post" action="/cart/add" onSubmit={handleClick}>
      <input type="hidden" name="vehicleId" value={vehicleId} />
      <input type="hidden" name="distance" value="40" />
      <button type="submit" className={added ? "btn-added" : "btn-add"}>
        {added ? "✓ Ajouté" : "+ Ajouter"}
      </button>
    </fetcher.Form>
  );
}

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

    {selected && (
  <div className="location-card">

    <div className="location-card-header">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="location-card-avatar">
          {selected.depotName.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="location-card-name">{selected.depotName}</p>
          <p className="location-card-phone">{selected.phoneNumber}</p>
        </div>
      </div>
      <button className="location-card-close" onClick={() => setSelected(null)}>✕</button>
    </div>

     <div className="vehicle-list">
            {groupInventory(selected.inventory).map((group) => (
              <div key={`${group.type}|${group.subtype}`} className={`vehicle-row ${group.firstAvailableId ? "" : "unavailable"}`}>
                <div>
                  <p className="vehicle-row-name">{group.type} — {group.subtype}</p>
                  <p className="vehicle-row-count">
                    {group.available > 0 ? `${group.available} disponible${group.available > 1 ? "s" : ""}` : "Indisponible"}
                  </p>
                </div>
                {group.firstAvailableId !== null
                  ? <AddButton vehicleId={group.firstAvailableId} />  
                  : <button disabled className="btn-unavailable">Indisponible</button>
                }
              </div>
            ))}
          </div>

  </div>
)}
  </div>
);
};