import { requireLocationAdmin } from "../../../requests/auth.api";

export default async function locationAdminLoader({ request }: any) {
  return await requireLocationAdmin(request);
}
