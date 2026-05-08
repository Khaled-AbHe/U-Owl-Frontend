import { requireLocationAdmin } from "../services/auth"

export default async function locationAdminLoader({ request }: any) {
  return await requireLocationAdmin(request)
}

