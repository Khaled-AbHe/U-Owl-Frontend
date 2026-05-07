import { useLoaderData, useSearchParams } from "react-router-dom";
import "./Vehicles.css"
import VehiclesList from "../../../components/Vehicle/VehiclesList"
import type { Vehicle } from "../../../components/Vehicle/VehiclesList";


export default function Vehicles(){
    const [searchParams, setSearchParams] = useSearchParams();

    const vehicles = useLoaderData() as Vehicle[];

    return(
        <div className="vehicles-list-container">
            <h1>Find your perfect equipement to move out</h1>
            <VehiclesList
                vehicles={vehicles}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
        </div>
    )
}