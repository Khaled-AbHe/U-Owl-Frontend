import { Edit2, Trash2 } from "lucide-react";
import type { Vehicle } from "../../../constants/interfaces/vehicle.entity";
import {
  VehicleTypeBadge,
  ReservedBadge,
  VehicleSubtypeBadge,
  SafetyBadge,
} from "./Badge/vehicle-type-badge.component";

interface VehicleRowProps {
  vehicle: Vehicle;
  index: number;
  pageSize: number;
  safePage: number;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
}

export default function VehicleRow({
  vehicle,
  index,
  pageSize,
  safePage,
  onEdit,
  onDelete,
}: VehicleRowProps) {
  return (
    <tr>
      <td className="text-secondary small ps-3" style={{ verticalAlign: "middle" }}>
        {(safePage - 1) * pageSize + index + 1}
      </td>

      <td className="text-secondary small" style={{ verticalAlign: "middle" }}>
        #{vehicle.vehicleId}
      </td>

      <td className="text-secondary small" style={{ verticalAlign: "middle" }}>
        {vehicle.licensePlate}
      </td>

      <td style={{ verticalAlign: "middle" }}>
        <VehicleTypeBadge vehicle={vehicle} />
      </td>

      <td style={{ verticalAlign: "middle" }}>
        <VehicleSubtypeBadge vehicle={vehicle} />
      </td>

      <td style={{ verticalAlign: "middle" }}>
        <ReservedBadge vehicle={vehicle} />
      </td>

      <td className="text-secondary small" style={{ verticalAlign: "middle" }}>
        <SafetyBadge vehicle={vehicle} />
      </td>

      <td className="text-secondary small" style={{ verticalAlign: "middle" }}>
        ${vehicle.costPerKm.toFixed(2)}/km
      </td>

      <td style={{ verticalAlign: "middle" }}>
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-light p-1"
            style={{ lineHeight: 1 }}
            title={`Edit vehicle #${vehicle.vehicleId}`}
            aria-label={`Edit vehicle #${vehicle.vehicleId}`}
            onClick={() => onEdit(vehicle)}
          >
            <Edit2 size={13} />
          </button>
          <button
            className="btn btn-sm btn-light p-1 text-danger"
            style={{ lineHeight: 1 }}
            title={`Delete vehicle #${vehicle.vehicleId}`}
            aria-label={`Delete vehicle #${vehicle.vehicleId}`}
            onClick={() => onDelete(vehicle)}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}
