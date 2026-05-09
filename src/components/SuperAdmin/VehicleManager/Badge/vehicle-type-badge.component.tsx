import { Truck, Package } from "lucide-react";
import type { Vehicle } from "../../../../constants/interfaces/vehicle.entity";
import { vehicleTypeStyles, reservedStyles } from "./vehicle-badge-color.constant";

interface Props {
  vehicle: Vehicle;
}

export function VehicleTypeBadge({ vehicle }: Props) {
  const style = vehicleTypeStyles[vehicle.vehicleType] ?? {};
  const icon = vehicle.vehicleType === "Truck" ? <Truck size={11} /> : <Package size={11} />;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 9px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 500,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {icon}
      {vehicle.vehicleType}
    </span>
  );
}

export function VehicleSubtypeBadge({ vehicle }: Props) {
  const style = vehicleTypeStyles[vehicle.vehicleType] ?? {};
  const icon = vehicle.vehicleType === "Truck" ? <Truck size={11} /> : <Package size={11} />;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 9px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 500,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {icon}
      {vehicle.vehicleSubtype}
    </span>
  );
}

export function ReservedBadge({ vehicle }: Props) {
  const key = !vehicle.isReserved ? "yes" : "no";
  const style = reservedStyles[key];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 9px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 500,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {vehicle.isReserved ? "Reserved" : "Available"}
    </span>
  );
}

export function SafetyBadge({ vehicle }: Props) {
  const key = vehicle.isSafe ? "yes" : "no";
  const style = reservedStyles[key];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 9px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 500,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {vehicle.isSafe ? "Safe" : "Danger"}
    </span>
  );
}
