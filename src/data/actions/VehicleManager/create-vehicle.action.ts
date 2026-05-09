import { createVehicle } from "../../requests/api";
import type ActionReturnMessage from "../../../constants/interfaces/action-return.interface";

export async function createVehicleAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();

  const vehicle: Record<string, string | number | boolean> = {
    licensePlate: formData.get("licensePlate") as string,
    vehicleType: formData.get("vehicleType") as string,
    vehicleSubtype: formData.get("vehicleSubtype") as string,
    kilometrage: Number(formData.get("kilometrage")),
    height: Number(formData.get("height")),
    width: Number(formData.get("width")),
    depth: Number(formData.get("depth")),
    maxWeight: Number(formData.get("maxWeight")),
    costPerKm: Number(formData.get("costPerKm")),
    isReserved: false,
  };

  try {
    await createVehicle(vehicle);
    return { type: "success", message: "Vehicle created." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to create vehicle. Please try again.",
    };
  }
}
