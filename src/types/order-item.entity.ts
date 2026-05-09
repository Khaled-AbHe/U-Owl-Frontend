import type { Vehicle } from "./vehicle.entity";

export interface OrderItem {
  orderItemId: number;
  vehicle: Vehicle;
  itemPrice: number;
}
