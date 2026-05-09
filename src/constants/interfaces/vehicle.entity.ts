export type VehicleType = "Truck" | "Trailer";

export type TruckSubtype =
  | "Pickup"
  | "Cargo Van"
  | "Small Box"
  | "Medium Box"
  | "Large Box"
  | "XLarge Box";

export type TrailerSubtype = "Small" | "Medium" | "Large";

export type VehicleSubtype = TruckSubtype | TrailerSubtype;

export interface Vehicle {
  vehicleId: number;
  licensePlate: string;
  vehicleType: VehicleType;
  vehicleSubtype: VehicleSubtype;
  kilometrage: number;
  costPerKm: number;
  isReserved: boolean;
  isSafe: boolean;
  height: number;
  width: number;
  depth: number;
  maxWeight: number;
}
