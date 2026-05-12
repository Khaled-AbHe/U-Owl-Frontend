import { requireClient } from "../../requests/auth.api";
import { getCurrentCart } from "../../requests/cart.api";

export default async function cartLoader({ request }: any) {
  await requireClient(request);
  return await getCurrentCart();
}
