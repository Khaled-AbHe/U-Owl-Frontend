import { getAllVehicles } from "../services/api"

export default async function vehiclesLoader() {
    return await getAllVehicles();
}


