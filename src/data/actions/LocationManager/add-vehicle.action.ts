import type ActionReturnMessage from "../../../types/action-return.interface";
import { addVehicleToLocation } from "../../requests/location.api";

export async function addVehicleToLocationAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();

  const locationId = Number(formData.get("locationId"));
  const vehicleId = Number(formData.get("vehicleId"));

  if (isNaN(locationId) || isNaN(vehicleId)) {
    return { type: "error", message: "Invalid location or vehicle ID." };
  }

  try {
    await addVehicleToLocation({ locationId, vehicleId });
    return { type: "success", message: "Vehicle added to location." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to add vehicle. Please try again.",
    };
  }
}
