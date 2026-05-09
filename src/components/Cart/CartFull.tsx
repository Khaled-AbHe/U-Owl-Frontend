import type { FetcherWithComponents } from "react-router-dom";
import "../../pages/Client/Cart/Cart.css";
import CartSummary from "./CartSummary";
import CartItemCard from "../Cards/CartItemCard";
import type { OrderItem } from "../../types/order-item.entity";
import type { PaymentMethod } from "../../types/payment-method.types";

interface CartSummaryProps {
  visibleItems: OrderItem[];
  visibleTotal: number;
  payFetcher: FetcherWithComponents<unknown>;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  isPaying: boolean;
  payError: string | null;
  removeFetcher: FetcherWithComponents<unknown>;
  removeError: string | null;
  removingId: number | null;
}

export default function CartFull({
  visibleItems,
  visibleTotal,
  payFetcher,
  paymentMethod,
  setPaymentMethod,
  isPaying,
  payError,
  removeFetcher,
  removeError,
  removingId,
}: CartSummaryProps) {
  return (
    <div className="cart-layout">
      <div className="cart-items">
        {visibleItems.map((item) => (
          <CartItemCard
            key={item.orderItemId}
            item={item}
            removeFetcher={removeFetcher}
            removingId={removingId}
          />
        ))}
        {removeError && <p className="cart-inline-error">{removeError}</p>}
      </div>

      <CartSummary
        visibleItems={visibleItems}
        visibleTotal={visibleTotal}
        payFetcher={payFetcher}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        isPaying={isPaying}
        payError={payError}
      />
    </div>
  );
}
