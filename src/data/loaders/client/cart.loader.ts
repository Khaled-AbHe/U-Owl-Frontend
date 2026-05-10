import { getCurrentCart } from "../../requests/api";
import { requireClient } from "../../requests/auth";

export default async function cartLoader({ request }: any) {
  await requireClient(request);
  return await getCurrentCart();
}
