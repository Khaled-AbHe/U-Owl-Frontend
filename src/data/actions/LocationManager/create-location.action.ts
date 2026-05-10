import { createLocation } from "../../requests/api";
import type ActionReturnMessage from "../../../types/action-return.interface";
import { isPresent } from "../actions.helpers";

export async function createLocationAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();

  const data = {
    depotName: formData.get("depotName") as string,
    address: formData.get("address") as string,
    phoneNumber: formData.get("phoneNumber") as string,
  };

  if (!isPresent(data.depotName)) {
    return { type: "error", message: "Depot name is required." };
  }

  if (!isPresent(data.address)) {
    return { type: "error", message: "Address is required." };
  }

  if (!isPresent(data.phoneNumber)) {
    return { type: "error", message: "Phone number is required." };
  }

  try {
    await createLocation({
      depotName: data.depotName,
      address: data.address,
      phoneNumber: data.phoneNumber,
    });
    return { type: "success", message: "Location created." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to create location. Please try again.",
    };
  }
}
