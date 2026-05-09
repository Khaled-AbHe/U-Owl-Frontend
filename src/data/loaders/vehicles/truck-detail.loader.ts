import { getSingleTruck } from "../../requests/api";

export default async function truckDetailsLoader({ params }: any) {
  return await getSingleTruck(params.id);
}
