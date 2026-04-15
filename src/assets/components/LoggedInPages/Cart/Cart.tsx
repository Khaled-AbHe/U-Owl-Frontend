export default function Cart() {
  return (
    <div>
      <p style={{textAlign: "center", fontSize: 30}}>Votre panier à (4 items)</p>
      
      <div style={{display: 'flex', gap: '350px'}}>
        <p style={{textAlign: "left", fontSize: 20, color: "#389fff"}}>Item</p>
        <p style={{textAlign: "left", fontSize: 20, color: "#389fff"}}>Prix</p>
        <p style={{textAlign: "left", fontSize: 20, color: "#389fff"}}>Quantité</p>
        <p style={{textAlign: "left", fontSize: 20, color: "#389fff"}}>Total</p>
      </div>
      
      <div className="ligne"></div>
    </div>
  )
}
