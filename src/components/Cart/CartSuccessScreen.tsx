import { Link } from "react-router-dom";

export default function CartSuccessScreen() {
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
