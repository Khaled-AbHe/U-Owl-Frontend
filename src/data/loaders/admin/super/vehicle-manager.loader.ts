import { requireSuperAdmin } from "../../../requests/auth";
import { getAllVehicles } from "../../../requests/api";

export default async function vehicleManagerLoader({ request }: any) {
  await requireSuperAdmin(request);
  const vehicles = await getAllVehicles();
  console.log(vehicles);
  return { vehicles };
}
