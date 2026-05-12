import type ActionReturnMessage from "../../../types/action-return.interface";
import { updateDealerForm } from "../../requests/dealer-form.api";

export async function approveDealerFormAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();
  const dealerFormId = formData.get("dealerFormId") as string;

  try {
    await updateDealerForm(dealerFormId, { status: "Accepted" });
    return { type: "success", message: "Application accepted." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to accept application. Please try again.",
    };
  }
}
