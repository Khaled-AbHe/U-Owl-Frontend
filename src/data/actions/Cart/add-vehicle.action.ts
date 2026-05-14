import type ActionReturnMessage from "../../../types/action-return.interface";
import { addVehicleToCart } from "../../requests/reservations.api";
import { isPresent } from "../actions.helpers";

export async function addVehicleToCartAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();

  const vehicleId = formData.get("vehicleId");
  const distance = formData.get("distance");

  if(!isPresent(vehicleId) || !isPresent(distance)){
    return {type: "error", message: "Arguments are missing"};
  }

  const nVehicleId = Number(vehicleId);
  const nDistance = Number(distance);

  if (isNaN(nVehicleId) || isNaN(nDistance)) {
    return { type: "error", message: "Invalid vehicle or distance." };
  }

  try {
    await addVehicleToCart({ vehicleId : nVehicleId, distance : nDistance});
    return { type: "success", message: "Vehicle added to cart!" };
  } catch (error: any) {
    return { type: "error", message: error.message ?? "Failed to add to cart." };
  }
}