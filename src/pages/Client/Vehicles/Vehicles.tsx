import {
  Title,
  ShowingCompanyDescription,
  trucksCards,
  trucksStorageCards,
  dimensionsCards,
} from "../../../data/vehicles-cards.data";
import "./Vehicles.css"

export default function Vehicles() {
  return (
    <div className="vehicles-list-container">
      <h1>{Title}</h1>
      <h5>{ShowingCompanyDescription}</h5>
 
      <table className="vehicles-table">
        <thead>
          <tr>
            <th className="vehicles-table__corner">Choose The Right Size Moving Truck</th>
            {trucksCards.map((truck, i) => (
              <th key={i} className="vehicles-table__truck-header">
                <img src={truck.img} alt={truck.type} />
                <span className="truck-type">{truck.type}</span>
                <span className="truck-desc">{truck.desc}</span>
              </th>
            ))}
          </tr>
        </thead>
 
        <tbody>
          <tr className="vehicles-table__section-header">
            <td>What Fits into a Truck</td>
          </tr>
          <tr>
            <td className="vehicles-table__label">Equivalent Storage Room</td>
            {trucksStorageCards.map((s, i) => (
              <td key={i}>{s.storage}</td>
            ))}
          </tr>
 
          <tr className="vehicles-table__section-header">
            <td>Vehicle Size & Dimensions</td>
          </tr>
          <tr>
            <td className="vehicles-table__label">Equivalent Truck Sizes</td>
            {dimensionsCards.map((d, i) => <td key={i}>{d.equivalentTruckSizes}</td>)}
          </tr>
          <tr>
            <td className="vehicles-table__label">Inside Dimensions (LxWxH)</td>
            {dimensionsCards.map((d, i) => <td key={i}>{d.insideDimensions}</td>)}
          </tr>
          <tr>
            <td className="vehicles-table__label">Deck Height From Ground</td>
            {dimensionsCards.map((d, i) => <td key={i}>{d.deckHeightFromGround}</td>)}
          </tr>
          <tr>
            <td className="vehicles-table__label">Deck Length</td>
            {dimensionsCards.map((d, i) => <td key={i}>{d.deckLength}</td>)}
          </tr>
          <tr>
            <td className="vehicles-table__label">Volume</td>
            {dimensionsCards.map((d, i) => <td key={i}>{d.volume}</td>)}
          </tr>
          <tr>
            <td className="vehicles-table__label">Max Load</td>
            {dimensionsCards.map((d, i) => <td key={i}>{d.maxLoad}</td>)}
          </tr>
          <tr>
            <td className="vehicles-table__label">Gross Vehicle Weight</td>
            {dimensionsCards.map((d, i) => <td key={i}>{d.grossVehicleWeight}</td>)}
          </tr>
          <tr>
            <td className="vehicles-table__label">Empty Weight</td>
            {dimensionsCards.map((d, i) => <td key={i}>{d.emptyWeight}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
