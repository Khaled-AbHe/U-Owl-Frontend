import { getSingleTrailer } from "../../requests/api";

export default async function trailerDetailsLoader({ params }: any) {
  return await getSingleTrailer(params.id);
}
