import { getAllVehicles } from "../../requests/api";

export default async function vehiclesLoader() {
  return await getAllVehicles();
}
