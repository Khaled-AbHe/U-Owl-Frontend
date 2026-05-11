import { getAllLocations, getAllVehicles } from "../../../requests/api";
import { requireSuperAdmin } from "../../../requests/auth";

export default async function locationManagerLoader({ request }: any) {
  await requireSuperAdmin(request);
  const locations = await getAllLocations();
  const vehicles = await getAllVehicles();
  return { locations, vehicles };
}
