import type ActionReturnMessage from "../../../types/action-return.interface";
import { createVehicle } from "../../requests/vehicle.api";
import { isFieldValid, isPresent, RegExpList } from "../actions.helpers";

export async function createVehicleAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();

  const data = {
    licensePlate: formData.get("licensePlate"),
    vehicleSubtype: formData.get("vehicleSubtype"),
  };

  if (!isPresent(data.licensePlate)) {
    return { type: "error", message: "License plate is required." };
  }

  if (!isPresent(data.vehicleSubtype)) {
    return { type: "error", message: "Subtype is required." };
  }

  if (!isFieldValid(RegExpList.lp, data.licensePlate)) {
    return {
      type: "error",
      message: "Please enter a valid license plate.",
    };
  }

  try {
    await createVehicle(data);
    return { type: "success", message: "Vehicle created." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to create vehicle. Please try again.",
    };
  }
}
