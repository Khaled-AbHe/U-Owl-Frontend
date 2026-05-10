import { requireSuperAdmin } from "../../../requests/auth";
import { getAllUsers } from "../../../requests/api";

export default async function userManagerLoader({ request }: any) {
  const currentUser = await requireSuperAdmin(request);
  const users = await getAllUsers();
  return { users, currentUserId: currentUser.userId };
}
