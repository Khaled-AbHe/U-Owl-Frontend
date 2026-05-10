import { requireClient } from "../../requests/auth";

export default async function clientPageLoader({ request }: any) {
  return await requireClient(request);
}
