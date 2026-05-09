import { getIsRoadSafe, updateVehicle } from "../../requests/api";
import type ActionReturnMessage from "../../../types/action-return.interface";
import { isFieldValid, isPresent, RegExpList } from "../actions.helpers";

export async function updateVehicleAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();
  const vehicleId = formData.get("vehicleId") as string;

  const data = {
    licensePlate: formData.get("licensePlate"),
    vehicleType: formData.get("vehicleType"),
    vehicleSubtype: formData.get("vehicleSubtype"),
    kilometrage: formData.get("kilometrage"),
  };

  const patch: Record<string, string | number> = {};

  if (isPresent(data.licensePlate)) {
    if (!isFieldValid(RegExpList.lp, data.licensePlate)) {
      return { type: "error", message: "Please enter a valid license plate." };
    }
    patch.licensePlate = data.licensePlate;
  }

  if (isPresent(data.vehicleType)) patch.vehicleType = data.vehicleType;
  if (isPresent(data.vehicleSubtype)) patch.vehicleSubtype = data.vehicleSubtype;

  if (isPresent(data.kilometrage)) {
    const km = Number(data.kilometrage);
    if (isNaN(km) || km < 0) {
      return { type: "error", message: "Kilometrage must be a positive number." };
    }
    patch.kilometrage = km;
  }

  try {
    await updateVehicle(vehicleId, patch);
    if (isPresent(data.kilometrage)) await getIsRoadSafe(vehicleId);
    return { type: "success", message: "Vehicle updated." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to update vehicle. Please try again.",
    };
  }
}
