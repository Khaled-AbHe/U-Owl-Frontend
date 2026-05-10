import { Edit2, Trash2 } from "lucide-react";
import type { Vehicle } from "../../../types/vehicle.entity";
import {
  VehicleTypeBadge,
  ReservedBadge,
  VehicleSubtypeBadge,
  SafetyBadge,
} from "./Badge/vehicle-type-badge.component";
import { VEHICLE_COLUMNS } from "../../../pages/Admin/Super/VehicleManager/vehicle-manager.constants";
import { ManagerRow } from "../General/Table/manager-row.component";
import { colsToGrid } from "../General/Table/manager-table.component";

const GRID = colsToGrid(VEHICLE_COLUMNS);

interface VehicleRowProps {
  vehicle: Vehicle;
  index: number;
  listSize: number;
  currentPage: number;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
}

export default function VehicleRow({
  vehicle,
  index,
  listSize,
  currentPage,
  onEdit,
  onDelete,
}: VehicleRowProps) {
  return (
    <ManagerRow grid={GRID}>
      {/* # */}
      <div className="d-flex text-secondary small" style={{ justifyContent: "center" }}>
        {(currentPage - 1) * listSize + index + 1}
      </div>

      {/* ID */}
      <div className="d-flex text-secondary small" style={{ justifyContent: "center" }}>
        #{vehicle.vehicleId}
      </div>

      {/* License Plate */}
      <div className="d-flex text-secondary small" style={{ justifyContent: "center" }}>
        {vehicle.licensePlate}
      </div>

      {/* Type */}
      <div className="d-flex" style={{ justifyContent: "center" }}>
        <VehicleTypeBadge vehicle={vehicle} />
      </div>

      {/* Subtype */}
      <div className="d-flex" style={{ justifyContent: "center" }}>
        <VehicleSubtypeBadge vehicle={vehicle} />
      </div>

      {/* Status */}
      <div className="d-flex" style={{ justifyContent: "center" }}>
        <ReservedBadge vehicle={vehicle} />
      </div>

      {/* Safe */}
      <div className="d-flex" style={{ justifyContent: "center" }}>
        <SafetyBadge vehicle={vehicle} />
      </div>

      {/* Cost/km */}
      <div className="d-flex text-secondary small" style={{ justifyContent: "center" }}>
        ${vehicle.costPerKm.toFixed(2)}/km
      </div>

      {/* Actions */}
      <div className="d-flex gap-1 " style={{ justifyContent: "center" }}>
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
    </ManagerRow>
  );
}
