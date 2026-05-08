import { getSingleTruck } from "../services/api";

export default async function truckDetails({params}: any) {
    return await getSingleTruck(params.id)
}