import type { Vehicle } from "./vehicle.entity";

export interface Location {
  locationId: number;
  depotName: string;
  address: string;
  lon: number;
  lat: number;
  phoneNumber: string;
  inventory: Vehicle[];
}

