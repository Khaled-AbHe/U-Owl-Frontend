import type ActionReturnMessage from "../../../types/action-return.interface";
import { addVehicleToCart } from "../../requests/reservations.api";

export async function addVehicleToCartAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();

  const vehicleId = Number(formData.get("vehicleId"));
  const distance = Number(formData.get("distance"));

  if (isNaN(vehicleId) || isNaN(distance)) {
    return { type: "error", message: "Invalid vehicle or distance." };
  }

  try {
    await addVehicleToCart({ vehicleId, distance });
    return { type: "success", message: "Vehicle added to cart!" };
  } catch (error: any) {
    return { type: "error", message: error.message ?? "Failed to add to cart." };
  }
}