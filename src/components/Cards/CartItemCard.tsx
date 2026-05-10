import { Trash2, Loader } from "lucide-react";
import type { FetcherWithComponents } from "react-router-dom";
import { fmt } from "../../pages/Client/Cart/cart.utils";
import type { OrderItem } from "../../types/order-item.entity";

interface CartItemCardProps {
  item: OrderItem;
  removeFetcher: FetcherWithComponents<unknown>;
  removingId: number | null;
}

export default function CartItemCard({ item, removeFetcher, removingId }: CartItemCardProps) {
  const isThisRemoving = removingId === item.orderItemId;

  return (
    <div className="cart-card">
      {/* Coloured thumb */}
      <div
        className={`cart-card__thumb cart-card__thumb--${item.vehicle.vehicleType.toLowerCase()}`}
      >
        <span className="cart-card__thumb-label">{item.vehicle.vehicleType}</span>
      </div>

      {/* Info */}
      <div className="cart-card__info">
        <div className="cart-card__top">
          <div>
            <p className="cart-card__category">{item.vehicle.vehicleSubtype}</p>
            <h3 className="cart-card__name">{item.vehicle.licensePlate}</h3>
          </div>

          {/* Remove button */}
          <removeFetcher.Form method="post" action="/cart/remove">
            <input type="hidden" name="orderItemId" value={item.orderItemId} />
            <button
              type="submit"
              className="cart-card__remove"
              disabled={isThisRemoving}
              aria-label="Remove item"
            >
              {isThisRemoving ? (
                <Loader size={15} className="cart-spinner" />
              ) : (
                <Trash2 size={15} />
              )}
            </button>
          </removeFetcher.Form>
        </div>

        <div className="cart-card__specs">
          <span>
            {item.vehicle.depth} × {item.vehicle.width} × {item.vehicle.height} cm
          </span>
          <span>Max {item.vehicle.maxWeight.toLocaleString()} kg</span>
          <span>{fmt(item.vehicle.costPerKm)} / km</span>
        </div>

        <div className="cart-card__price-row">
          <span className="cart-card__price-label">Rental cost</span>
          <span className="cart-card__line-total">{fmt(item.itemPrice)}</span>
        </div>
      </div>
    </div>
  );
}
