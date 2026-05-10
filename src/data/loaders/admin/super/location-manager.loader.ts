import { getAllLocations } from "../../../requests/api";
import { requireSuperAdmin } from "../../../requests/auth";

export default async function locationManagerLoader({ request }: any) {
  await requireSuperAdmin(request);
  const location = await getAllLocations();
  return { location };
}
