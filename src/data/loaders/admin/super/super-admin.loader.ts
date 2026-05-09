import { requireSuperAdmin } from "../../../requests/auth";

export default async function superAdminLoader({ request }: any) {
  return await requireSuperAdmin(request);
}
