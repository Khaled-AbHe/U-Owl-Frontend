import { removeOrderItem } from "../../services/api";
import type ActionReturnMessage from "../../interfaces/action-return.interface";

export async function removeOrderItemAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();
  const orderItemId = parseInt(formData.get("orderItemId") as string);

  if (isNaN(orderItemId)) {
    return { type: "error", message: "Invalid item." };
  }

  try {
    await removeOrderItem(orderItemId);
    return { type: "success", message: "Item removed." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Could not remove item.",
    };
  }
}
