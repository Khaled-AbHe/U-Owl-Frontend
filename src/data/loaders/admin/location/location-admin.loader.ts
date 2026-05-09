import { requireLocationAdmin } from "../../../requests/auth";

export default async function locationAdminLoader({ request }: any) {
  return await requireLocationAdmin(request);
}
