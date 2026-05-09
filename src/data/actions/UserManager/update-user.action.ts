import { updateUser } from "../../requests/api";
import type ActionReturnMessage from "../../../constants/interfaces/action-return.interface";
import { changePassword } from "../../requests/auth";

export async function updateUserAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();
  const userId = formData.get("userId") as string;

  const patch: Record<string, string> = {};
  const fields = ["name", "surname", "email", "userType", "adminType"] as const;

  for (const field of fields) {
    const val = formData.get(field) as string | null;
    if (val !== null && val.trim() !== "") {
      patch[field] = val.trim();
    }
  }

  try {
    await updateUser(userId, patch);
    await changePassword(userId, formData.get("password"));
    return { type: "success", message: "User updated." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to update user. Please try again.",
    };
  }
}
