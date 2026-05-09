import { getCurrentUser } from "../../requests/auth";

export default async function mainLayoutLoader() {
  try {
    return await getCurrentUser();
  } catch {
    return { user: null };
  }
}
