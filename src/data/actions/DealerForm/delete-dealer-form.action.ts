import type ActionReturnMessage from "../../../types/action-return.interface";
import { deleteDealerForm } from "../../requests/dealer-form.api";

export async function deleteDealerFormAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();
  const dealerFormId = formData.get("dealerFormId") as string;

  try {
    await deleteDealerForm(dealerFormId);
    return { type: "success", message: "Application deleted." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to delete application. Please try again.",
    };
  }
}
