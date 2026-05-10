import { Edit2, Package, Trash2 } from "lucide-react";
import type { Location } from "../../../types/location.entity";
import { InventorySizeBadge } from "./Badge/inventory-size-badge.component";

interface LocationRowProps {
  location: Location;
  index: number;
  pageSize: number;
  safePage: number;
  onManage: (location: Location) => void;
  onDelete: (location: Location) => void;
}

export default function LocationRow({
  location,
  index,
  pageSize,
  safePage,
  onManage,
  onDelete,
}: LocationRowProps) {
  return (
    <tr>
      <td className="text-secondary small ps-3" style={{ verticalAlign: "middle" }}>
        {(safePage - 1) * pageSize + index + 1}
      </td>

      <td className="text-secondary small" style={{ verticalAlign: "middle" }}>
        #{location.locationId}
      </td>

      <td style={{ verticalAlign: "middle" }}>
        <div className="fw-medium small">{location.depotName}</div>
        <div className="text-secondary" style={{ fontSize: 12 }}>
          {location.phoneNumber}
        </div>
      </td>

      <td className="text-secondary small" style={{ verticalAlign: "middle" }}>
        {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
      </td>

      <td style={{ verticalAlign: "middle" }}>
        <InventorySizeBadge location={location} />
      </td>

      <td style={{ verticalAlign: "middle" }}>
        <div className="d-flex align-items-center gap-1">
          <button
            className="btn btn-sm btn-light p-1 d-flex align-items-center gap-1"
            style={{ lineHeight: 1, fontSize: 12 }}
            title={`Manage inventory for ${location.depotName}`}
            aria-label={`Manage inventory for ${location.depotName}`}
            onClick={() => onManage(location)}
          >
            <Edit2 size={13} />
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
      </td>
    </tr>
  );
}
