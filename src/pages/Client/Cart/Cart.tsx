import { useLoaderData, useFetcher, Link } from "react-router-dom";
import { ShoppingCart, Trash2, CreditCard, ArrowRight, Loader } from "lucide-react";
import { useState } from "react";
import "./Cart.css";

// ── Types matching the backend entities ──────────────────────────────────────

interface Vehicle {
  vehicleId: number;
  licencePlate: string;
  vehicleType: "Truck" | "Trailer";
  vehicleSubtype: string;
  costPerKm: number;
  isReserved: boolean;
  height: number;
  width: number;
  depth: number;
  maxWeight: number;
}

interface OrderItem {
  orderItemId: number;
  vehicle: Vehicle;
  itemPrice: number;
}

interface Cart {
  cartId: number;
  totalPrice: number;
  orderItems: OrderItem[];
}

type PaymentMethod = "Credit Card" | "PayPal";

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (value: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(value);

// ── Component ─────────────────────────────────────────────────────────────────

export default function Cart() {
  const cart = useLoaderData() as Cart | null;

  const payFetcher = useFetcher();
  const removeFetcher = useFetcher();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Credit Card");

  const isPaying = payFetcher.state !== "idle";
  const isRemoving = removeFetcher.state !== "idle";
  const removingId = isRemoving ? Number(removeFetcher.formData?.get("orderItemId")) : null;

  const payResult = payFetcher.data as { type: string; message: string } | undefined;
  const removeResult = removeFetcher.data as { type: string; message: string } | undefined;

  const payError = payResult?.type === "error" ? payResult.message : null;
  const removeError = removeResult?.type === "error" ? removeResult.message : null;
  const paySuccess = payResult?.type === "success";

  // ── Render: success ────────────────────────────────────────────────────────
  if (paySuccess) {
    return (
      <div className="page">
        <div className="page-content cart-centered">
          <div className="cart-success__icon">✓</div>
          <h2 className="cart-success__title">Payment received!</h2>
          <p className="cart-status-text">
            Your reservation is confirmed. Check your purchase history for the receipt.
          </p>
          <Link to="/" className="btn btn-brand fw-semibold px-4 mt-3">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  // Optimistically filter out the item being removed
  const visibleItems = cart?.orderItems.filter((item) => item.orderItemId !== removingId) ?? [];

  const visibleTotal = visibleItems.reduce((sum, item) => sum + item.itemPrice, 0);
  const isEmpty = visibleItems.length === 0;

  return (
    <div className="page">
      <div className="page-content">
        {/* Header */}
        <div className="cart-header">
          <h1 className="cart-title">
            <ShoppingCart size={26} strokeWidth={2.2} />
            Your Cart
          </h1>
          {!isEmpty && (
            <span className="cart-count">
              {visibleItems.length} {visibleItems.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {/* Empty state */}
        {isEmpty ? (
          <div className="cart-empty">
            <div className="cart-empty__icon">
              <ShoppingCart size={48} strokeWidth={1.4} />
            </div>
            <h2 className="cart-empty__title">Your cart is empty</h2>
            <p className="cart-empty__sub">Browse our vehicles and add something to get started.</p>
            <Link to="/vehicles" className="btn btn-brand fw-semibold px-4">
              Browse Vehicles
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* ── Left: order items ── */}
            <div className="cart-items">
              {visibleItems.map((item) => (
                <div key={item.orderItemId} className="cart-card">
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
                        <h3 className="cart-card__name">{item.vehicle.licencePlate}</h3>
                      </div>

                      {/* Remove button — submits to /cart/remove */}
                      <removeFetcher.Form method="post" action="/cart/remove">
                        <input type="hidden" name="orderItemId" value={item.orderItemId} />
                        <button
                          type="submit"
                          className="cart-card__remove"
                          disabled={removingId === item.orderItemId}
                          aria-label="Remove item"
                        >
                          {removingId === item.orderItemId ? (
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
              ))}

              {/* Remove error */}
              {removeError && <p className="cart-inline-error">{removeError}</p>}
            </div>

            {/* ── Right: summary ── */}
            <aside className="cart-summary">
              <h2 className="cart-summary__title">Order Summary</h2>

              <div className="cart-summary__rows">
                {visibleItems.map((item) => (
                  <div key={item.orderItemId} className="cart-summary__row">
                    <span className="cart-summary__row-label">
                      {item.vehicle.vehicleSubtype} · {item.vehicle.licencePlate}
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

              {/* Pay button — submits to /cart/pay */}
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

              {/* Pay error */}
              {payError && <p className="cart-inline-error">{payError}</p>}

              <Link to="/vehicles" className="cart-summary__continue">
                ← Continue browsing
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
