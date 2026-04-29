import "./Cart.css";

export default function Cart() {
  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Votre panier à (4 items)</h2>

      <div className="row text-brand fw-semibold border-bottom pb-2 mb-2">
        <div className="col-4">Item</div>
        <div className="col-3">Prix</div>
        <div className="col-3">Quantité</div>
        <div className="col-2">Total</div>
      </div>

      {/* Cart rows will go here */}
    </div>
  );
}
