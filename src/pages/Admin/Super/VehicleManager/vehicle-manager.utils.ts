import type { Vehicle } from "../../../../constants/interfaces/vehicle.entity";

export const PAGE_SIZE = 8;

export function getVehicleLabel(v: Vehicle): string {
  return `${v.vehicleType} - ${v.vehicleSubtype}`;
}

export function formatDimensions(v: Vehicle): string {
  return `${v.height}×${v.width}×${v.depth} cm`;
}
