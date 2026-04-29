import { getSingleTruck } from "../services/api";

export default async function TruckDetailLoader({ params } : any) {
    return await getSingleTruck(params.id)
  }