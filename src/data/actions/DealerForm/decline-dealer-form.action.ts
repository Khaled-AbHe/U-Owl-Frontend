import type ActionReturnMessage from "../../../types/action-return.interface";
import { updateDealerForm } from "../../requests/dealer-form.api";

export async function declineDealerFormAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();
  const dealerFormId = formData.get("dealerFormId") as string;

  try {
    await updateDealerForm(dealerFormId, { status: "Declined" });
    return { type: "success", message: "Application declined." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to decline application. Please try again.",
    };
  }
}
