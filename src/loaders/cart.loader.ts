import { getCurrentCart } from "../services/api";
import { requireClient } from "../services/auth";

export default async function cartLoader({ request }: any) {
  await requireClient(request);
  return await getCurrentCart();
}
