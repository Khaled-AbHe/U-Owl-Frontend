import { requireSuperAdmin } from "../../../requests/auth.api";
import { getAllUsers } from "../../../requests/user.api";

export default async function userManagerLoader({ request }: any) {
  const currentUser = await requireSuperAdmin(request);
  const users = await getAllUsers();
  return { users, currentUserId: currentUser.userId };
}
