import { requireSuperAdmin } from "../services/auth"

export default async function superAdminLoader({ request }: any) {
  return await requireSuperAdmin(request)
}
