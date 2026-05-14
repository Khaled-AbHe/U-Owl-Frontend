import { requireClient } from "../../requests/auth.api";

export default async function locationLoader({request} : any) {
  await requireClient(request)
  const response = await fetch("http://localhost:3000/api/locations/all");
  if (!response.ok) {
    throw new Error("failed to fetch all locations");
  }
  
  return response.json();
}