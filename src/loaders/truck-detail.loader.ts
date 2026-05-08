import { getSingleTruck } from "../services/api";

export default async function truckDetailsLoader({params}: any) {
    return await getSingleTruck(params.id)
}