import { payCartTotal } from "../../services/api";
import type ActionReturnMessage from "../../constants/interfaces/action-return.interface";

export async function cartPayAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();

  const method = formData.get("method") as string;
  const amount = parseFloat(formData.get("amount") as string);

  if (!method || isNaN(amount)) {
    return { type: "error", message: "Invalid payment details." };
  }

  try {
    await payCartTotal({ method, amount });
    return { type: "success", message: "Payment received!" };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Payment failed. Please try again.",
    };
  }
}
