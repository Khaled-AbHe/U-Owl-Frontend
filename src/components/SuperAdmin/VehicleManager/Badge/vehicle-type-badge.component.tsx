import { Truck, Package } from "lucide-react";
import type { Vehicle, VehicleType } from "../../../../types/vehicle.entity";
import { vehicleTypeStyles, reservedStyles } from "./vehicle-badge-color.constant";
import { StatusBadge } from "../../General/status-badge.component";

interface Props {
  vehicle: Vehicle;
}

function vehicleIcon(type: VehicleType) {
  return type === "Truck" ? <Truck size={11} /> : <Package size={11} />;
}

export function VehicleTypeBadge({ vehicle }: Props) {
  return (
    <StatusBadge
      label={vehicle.vehicleType}
      icon={vehicleIcon(vehicle.vehicleType)}
      style={vehicleTypeStyles[vehicle.vehicleType] ?? {}}
    />
  );
}

export function VehicleSubtypeBadge({ vehicle }: Props) {
  return (
    <StatusBadge
      label={vehicle.vehicleSubtype}
      style={vehicleTypeStyles[vehicle.vehicleType] ?? {}}
    />
  );
}

export function ReservedBadge({ vehicle }: Props) {
  return (
    <StatusBadge
      label={vehicle.isReserved ? "Reserved" : "Available"}
      style={reservedStyles[vehicle.isReserved ? "no" : "yes"]}
    />
  );
}

export function SafetyBadge({ vehicle }: Props) {
  return (
    <StatusBadge
      label={vehicle.isSafe ? "Safe" : "Danger"}
      style={reservedStyles[vehicle.isSafe ? "yes" : "no"]}
    />
  );
}
