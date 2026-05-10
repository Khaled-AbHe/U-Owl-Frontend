import {Link, type SetURLSearchParams} from "react-router-dom";
import "./VehiclesList.css"
import  { type VehicleType, type TruckType, type TrailerType}  from "./VehiclesType"
import { getSubtypeImg } from "./VehiclesSubtypeImg";


export interface Vehicle{
    vehicleId : number,
    licensePlate : string,
    vehicleType : VehicleType,
    vehicleSubtype : TruckType | TrailerType,
    kilometrage : number,
    height : number,
    width : number,
    depth : number,
    maxWeight : number,
    costPerKm : number,
    isReserved : boolean

    price?: number,
    imageUrl?: string

}

interface Props{
    vehicles : Vehicle[],
    searchParams : URLSearchParams,
    setSearchParams : SetURLSearchParams
}

export default function VehiclesList({ vehicles, searchParams, setSearchParams }: Props) {
  const typeFilter = searchParams.get("type");

    const displayedVehicles = typeFilter
    ? vehicles?.filter(v => v.vehicleType.toLowerCase() === typeFilter.toLowerCase()) || [] : vehicles
    
    const vehicleElements = displayedVehicles?.map(vehicle => (
        <Link to={`${vehicle.vehicleId}`} key={vehicle.vehicleId} className="nav-button">
            <div className = "vehicle-tile">
                <img src={getSubtypeImg(vehicle.vehicleSubtype)} alt="Image is not available" />
                <div className="vehicle-info">
                    <h3>{vehicle.vehicleSubtype}</h3>
                    <p>${vehicle.price}<span>/day</span></p>
                </div>
                <i className={`vehicle-type ${vehicle.vehicleSubtype} selected`}>{vehicle.vehicleType}</i>
            </div>
        </Link>
    )) || []
    
    return (
        <>
            <div className="vehicle-list-filter-buttons">
                <button className={`vehicle-type Truck ${typeFilter === "Truck" ? "selected" : ""}`} onClick={() => setSearchParams({type : "Truck"})}>Truck</button>
                <button className={`vehicle-type Trailer ${typeFilter === "Trailer" ? "selected" : ""}`} onClick={() => setSearchParams({type : "Trailer"})}>Trailer</button>
                {typeFilter
                    ? <button className="vehicle-type clear-filters" onClick={() => setSearchParams()}>Clear Filter</button> : undefined
                }
            </div>

      <div className="vehicle-list">{vehicleElements}</div>
    </>
  );
}
