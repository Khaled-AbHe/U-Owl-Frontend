import { deleteVehicleById } from "../../requests/api";
import type ActionReturnMessage from "../../../types/action-return.interface";

export async function deleteVehicleAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();
  const vehicleId = formData.get("vehicleId") as string;

  try {
    await deleteVehicleById(vehicleId);
    return { type: "success", message: "Vehicle deleted." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to delete vehicle. Please try again.",
    };
  }
}
