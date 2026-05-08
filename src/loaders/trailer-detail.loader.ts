import { getSingleTruck } from "../services/api";

export default async function truckDetailLoader({ params } : any) {
    return await getSingleTruck(params.id)
  }