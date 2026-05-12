import { getAllVehicles } from "../../requests/vehicle.api";

export default async function vehiclesLoader() {
  return await getAllVehicles();
}
