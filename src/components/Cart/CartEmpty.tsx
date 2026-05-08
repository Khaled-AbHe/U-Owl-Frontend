import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import "../../pages/Client/Cart/Cart.css";

export default function CartEmpty() {
  return (
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
  );
}
