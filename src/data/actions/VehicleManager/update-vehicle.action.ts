import { updateVehicle } from "../../requests/api";
import type ActionReturnMessage from "../../../constants/interfaces/action-return.interface";

export async function updateVehicleAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();
  const vehicleId = formData.get("vehicleId") as string;

  const numericFields = ["kilometrage", "height", "width", "depth", "maxWeight", "costPerKm"];
  const stringFields = ["licensePlate", "vehicleType", "vehicleSubtype"];

  const patch: Record<string, string | number> = {};

  for (const field of stringFields) {
    const val = formData.get(field) as string | null;
    if (val !== null && val.trim() !== "") patch[field] = val.trim();
  }

  for (const field of numericFields) {
    const val = formData.get(field) as string | null;
    if (val !== null && val.trim() !== "") patch[field] = Number(val);
  }

  try {
    await updateVehicle(vehicleId, patch);
    return { type: "success", message: "Vehicle updated." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to update vehicle. Please try again.",
    };
  }
}
