import type { OrderItem } from "./order-item.entity";

export interface Cart {
  cartId: number;
  totalPrice: number;
  orderItems: OrderItem[];
}
