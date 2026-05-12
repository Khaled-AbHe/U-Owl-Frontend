import { requireClient } from "../../requests/auth.api";

export default async function clientPageLoader({ request }: any) {
  return await requireClient(request);
}
