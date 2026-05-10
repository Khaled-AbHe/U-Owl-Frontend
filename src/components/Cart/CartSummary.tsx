import { Link } from "react-router-dom";
import { CreditCard, ArrowRight, Loader } from "lucide-react";
import type { FetcherWithComponents } from "react-router-dom";
import { fmt } from "../../pages/Client/Cart/cart.utils";
import type { PaymentMethod } from "../../types/payment-method.types";
import type { OrderItem } from "../../types/order-item.entity";

interface CartSummaryProps {
  visibleItems: OrderItem[];
  visibleTotal: number;
  payFetcher: FetcherWithComponents<unknown>;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  isPaying: boolean;
  payError: string | null;
}

export default function CartSummary({
  visibleItems,
  visibleTotal,
  payFetcher,
  paymentMethod,
  setPaymentMethod,
  isPaying,
  payError,
}: CartSummaryProps) {
  return (
    <aside className="cart-summary">
      <h2 className="cart-summary__title">Order Summary</h2>

      <div className="cart-summary__rows">
        {visibleItems.map((item) => (
          <div key={item.orderItemId} className="cart-summary__row">
            <span className="cart-summary__row-label">
              {item.vehicle.vehicleSubtype} · {item.vehicle.licensePlate}
            </span>
            <span>{fmt(item.itemPrice)}</span>
          </div>
        ))}
      </div>

      <div className="cart-summary__divider" />

      <div className="cart-summary__total">
        <span>Total</span>
        <span>{fmt(visibleTotal)}</span>
      </div>

      {/* Payment method */}
      <div className="cart-pay-method">
        <p className="cart-pay-method__label">
          <CreditCard size={14} aria-hidden="true" /> Payment method
        </p>
        <div className="cart-pay-method__options">
          {(["Credit Card", "PayPal"] as PaymentMethod[]).map((m) => (
            <button
              key={m}
              type="button"
              className={`cart-pay-method__btn${paymentMethod === m ? " cart-pay-method__btn--active" : ""}`}
              onClick={() => setPaymentMethod(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Pay button */}
      <payFetcher.Form method="post" action="/cart/pay">
        <input type="hidden" name="method" value={paymentMethod} />
        <input type="hidden" name="amount" value={visibleTotal} />
        <button
          type="submit"
          className="btn btn-brand w-100 fw-semibold cart-summary__cta"
          disabled={isPaying}
        >
          {isPaying ? (
            <>
              <Loader size={15} className="cart-spinner" /> Processing…
            </>
          ) : (
            <>
              {`Pay ${fmt(visibleTotal)}`} <ArrowRight size={15} />
            </>
          )}
        </button>
      </payFetcher.Form>

      {payError && <p className="cart-inline-error">{payError}</p>}

      <Link to="/vehicles" className="cart-summary__continue">
        ← Continue browsing
      </Link>
    </aside>
  );
}
