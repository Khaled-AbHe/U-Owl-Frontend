import { requireSuperAdmin } from "../../../requests/auth.api";
import { getAllVehicles } from "../../../requests/vehicle.api";

export default async function vehicleManagerLoader({ request }: any) {
  await requireSuperAdmin(request);
  const vehicles = await getAllVehicles();
  return { vehicles };
}
