import { requireSuperAdmin } from "../../../requests/auth.api";
import { findAllDealerForms } from "../../../requests/dealer-form.api";

export default async function dealerFormManagerLoader({ request }: any) {
  await requireSuperAdmin(request);
  const dealerForms = await findAllDealerForms();
  return { dealerForms };
}
