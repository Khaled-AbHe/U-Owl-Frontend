import { getSingleTrailer} from "../services/api";

export default async function trailerDetailsLoader({ params } : any) {
    return await getSingleTrailer(params.id)
  }