import { getSingleTrailer } from "../../requests/vehicle.api";

export default async function trailerDetailsLoader({ params }: any) {
  return await getSingleTrailer(params.id);
}
