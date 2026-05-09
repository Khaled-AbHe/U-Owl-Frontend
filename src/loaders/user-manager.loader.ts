import { requireSuperAdmin } from "../services/auth";
import { getAllUsers } from "../services/api";

export default async function userManagerLoader({ request }: any) {
  await requireSuperAdmin(request);
  return await getAllUsers();
}
