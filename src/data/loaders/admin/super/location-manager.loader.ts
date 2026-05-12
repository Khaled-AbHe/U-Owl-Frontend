import { requireSuperAdmin } from "../../../requests/auth.api";
import { getAllLocations } from "../../../requests/location.api";
import { getAllVehicles } from "../../../requests/vehicle.api";

export default async function locationManagerLoader({ request }: any) {
  await requireSuperAdmin(request);
  const locations = await getAllLocations();
  const vehicles = await getAllVehicles();
  return { locations, vehicles };
}
