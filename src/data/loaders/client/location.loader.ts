import { requireClient } from "../../requests/auth.api";
import { getAllLocations } from "../../requests/location.api";

export default async function locationLoader({request} : any) {
  await requireClient(request)
  return await getAllLocations();
}