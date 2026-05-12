import type ActionReturnMessage from "../../../types/action-return.interface";
import { updateLocation } from "../../requests/location.api";
import { isPresent } from "../actions.helpers";

export async function updateLocationAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();
  const locationId = formData.get("locationId") as string;

  const data = {
    depotName: formData.get("depotName") as string,
    address: formData.get("address") as string,
    phoneNumber: formData.get("phoneNumber") as string,
  };

  const patch: Record<string, string> = {};
  if (isPresent(data.depotName)) patch.depotName = data.depotName;
  if (isPresent(data.address)) patch.address = data.address;
  if (isPresent(data.phoneNumber)) patch.phoneNumber = data.phoneNumber;

  try {
    await updateLocation(locationId, patch);
    return { type: "success", message: "Location updated." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to update location. Please try again.",
    };
  }
}
