import { getSingleTruck } from "../../requests/vehicle.api";

export default async function truckDetailsLoader({ params }: any) {
  return await getSingleTruck(params.id);
}
