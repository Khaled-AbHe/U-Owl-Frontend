export interface Vehicle {
  vehicleId: number;
  licensePlate: string;
  vehicleType: "Truck" | "Trailer";
  vehicleSubtype: string;
  costPerKm: number;
  isReserved: boolean;
  height: number;
  width: number;
  depth: number;
  maxWeight: number;
}

export interface OrderItem {
  orderItemId: number;
  vehicle: Vehicle;
  itemPrice: number;
}

export interface Cart {
  cartId: number;
  totalPrice: number;
  orderItems: OrderItem[];
}

export type PaymentMethod = "Credit Card" | "PayPal";
