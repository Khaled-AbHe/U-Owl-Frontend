import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../../hooks/useCart.hook";
import type { PaymentMethod } from "../../../constants/types/cart.types";
import "./Cart.css";
import CartEmpty from "../../../components/Cart/CartEmpty";
import CartFull from "../../../components/Cart/CartFull";
import CartSuccessScreen from "../../../components/Cart/CartSuccessScreen";

export default function Cart() {
  const {
    payFetcher,
    removeFetcher,
    isPaying,
    removingId,
    payError,
    removeError,
    paySuccess,
    visibleItems,
    visibleTotal,
    isEmpty,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Credit Card");

  if (paySuccess) {
    return <CartSuccessScreen />;
  }

  return (
    <div className="page">
      <div className="page-content">
        {/* Header */}
        <div className="cart-header">
          <h1 className="cart-title">
            <ShoppingCart size={26} strokeWidth={2.2} />
            Your Cart
          </h1>
        </div>

        {isEmpty ? (
          <CartEmpty />
        ) : (
          <CartFull
            visibleItems={visibleItems}
            visibleTotal={visibleTotal}
            payFetcher={payFetcher}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            isPaying={isPaying}
            payError={payError}
            removeFetcher={removeFetcher}
            removeError={removeError}
            removingId={removingId}
          />
        )}
      </div>
    </div>
  );
}
