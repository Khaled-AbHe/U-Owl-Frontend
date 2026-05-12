import type ActionReturnMessage from "../../../types/action-return.interface";
import { deleteLocationById } from "../../requests/location.api";

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
