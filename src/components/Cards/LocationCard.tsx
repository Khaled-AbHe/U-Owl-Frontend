import { AddButton } from "../Map/AddButton";
import type { Vehicle } from "../../types/vehicle.entity";
import type { Location } from "../../types/location.entity";

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

export default function LocationCard({location, onClose}: {location : Location; onClose : () => void}){
      return (
    <div className="location-card">
      <div className="location-card-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="location-card-avatar">
            {location.depotName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="location-card-name">{location.depotName}</p>
            <p className="location-card-phone">{location.phoneNumber}</p>
          </div>
        </div>
        <button className="location-card-close" onClick={onClose}>✕</button>
      </div>

      <div className="vehicle-list">
        {groupInventory(location.inventory).map((group) => (
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
  );
}
