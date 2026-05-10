import { deleteLocationById } from "../../requests/api";
import type ActionReturnMessage from "../../../types/action-return.interface";

export async function deleteLocationAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();
  const locationId = formData.get("locationId") as string;

  try {
    await deleteLocationById(locationId);
    return { type: "success", message: "Location deleted." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to delete location. Please try again.",
    };
  }
}
