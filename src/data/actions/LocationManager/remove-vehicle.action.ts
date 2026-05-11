import { removeVehicleFromLocation } from "../../requests/api";
import type ActionReturnMessage from "../../../types/action-return.interface";

export async function removeVehicleFromLocationAction({
  request,
}: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();

  const locationId = Number(formData.get("locationId"));
  const vehicleId = Number(formData.get("vehicleId"));

  if (isNaN(locationId) || isNaN(vehicleId)) {
    return { type: "error", message: "Invalid location or vehicle ID." };
  }

  try {
    await removeVehicleFromLocation({ locationId, vehicleId });
    return { type: "success", message: "Vehicle removed from location." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to remove vehicle. Please try again.",
    };
  }
}
