import { getCurrentUser } from "../../requests/auth.api";

export default async function mainLayoutLoader() {
  try {
    return await getCurrentUser();
  } catch {
    return { user: null };
  }
}
