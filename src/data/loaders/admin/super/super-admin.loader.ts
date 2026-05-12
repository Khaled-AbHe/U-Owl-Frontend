import { requireSuperAdmin } from "../../../requests/auth.api";

export default async function superAdminLoader({ request }: any) {
  return await requireSuperAdmin(request);
}
