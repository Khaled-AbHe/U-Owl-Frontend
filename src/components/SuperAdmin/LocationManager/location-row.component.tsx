import { Edit2, Package, Trash2 } from "lucide-react";
import type { Location } from "../../../types/location.entity";
import { InventorySizeBadge } from "./Badge/inventory-size-badge.component";
import { LOCATION_COLUMNS } from "../../../pages/Admin/Super/LocationManager/location-manager.constants";
import { ManagerRow } from "../General/Table/manager-row.component";
import { colsToGrid } from "../General/Table/manager-table.component";

const GRID = colsToGrid(LOCATION_COLUMNS);

interface LocationRowProps {
  location: Location;
  index: number;
  listSize: number;
  currentPage: number;
  onEdit: (location: Location) => void;
  onManage: (location: Location) => void;
  onDelete: (location: Location) => void;
}

export default function LocationRow({
  location,
  index,
  listSize,
  currentPage,
  onEdit,
  onManage,
  onDelete,
}: LocationRowProps) {
  return (
    <ManagerRow grid={GRID}>
      {/* # */}
      <div className="d-flex text-secondary small" style={{ justifyContent: "center" }}>
        {(currentPage - 1) * listSize + index + 1}
      </div>

      {/* ID */}
      <div className="d-flex text-secondary small " style={{ justifyContent: "center" }}>
        #{location.locationId}
      </div>

      {/* Depot */}
      <div className="d-flex flex-column" style={{ overflow: "hidden", justifyContent: "left" }}>
        <div className="fw-medium small">{location.depotName}</div>
        <div className="text-secondary" style={{ fontSize: 12 }}>
          {location.phoneNumber}
        </div>
      </div>

      {/* Address */}
      <div>
        <div className="fw-medium small">{location.address}</div>
        <div className="text-secondary small">
          Lon: {location.lon.toFixed(2)} / Lat: {location.lat.toFixed(2)}
        </div>
      </div>

      {/* Inventory */}
      <div className="d-flex " style={{ justifyContent: "center" }}>
        <InventorySizeBadge location={location} />
      </div>

      {/* Actions */}
      <div className="d-flex gap-1 " style={{ justifyContent: "center" }}>
        <button
          className="btn btn-sm btn-light p-1"
          style={{ lineHeight: 1 }}
          title={`Edit ${location.depotName}`}
          aria-label={`Edit ${location.depotName}`}
          onClick={() => onEdit(location)}
        >
          <Edit2 size={13} />
        </button>
        <button
          className="btn btn-sm btn-light p-1"
          style={{ lineHeight: 1 }}
          title={`Manage inventory for ${location.depotName}`}
          aria-label={`Manage inventory for ${location.depotName}`}
          onClick={() => onManage(location)}
        >
          <Package size={13} />
        </button>
        <button
          className="btn btn-sm btn-light p-1 text-danger"
          style={{ lineHeight: 1 }}
          title={`Delete ${location.depotName}`}
          aria-label={`Delete ${location.depotName}`}
          onClick={() => onDelete(location)}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </ManagerRow>
  );
}
