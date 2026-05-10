import { updateUser } from "../../requests/api";
import type ActionReturnMessage from "../../../types/action-return.interface";
import { changePassword } from "../../requests/auth";
import { isFieldValid, isPresent, RegExpList } from "../actions.helpers";

export async function updateUserAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();
  const userId = formData.get("userId") as string;

  const data = {
    name: formData.get("name"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    password: formData.get("password"),
    userType: formData.get("userType"),
    adminType: formData.get("adminType"),
  };

  if (isPresent(data.email) && !isFieldValid(RegExpList.email, data.email)) {
    return { type: "error", message: "A valid email is required." };
  }

  if (isPresent(data.password) && data.password.length < 6) {
    return { type: "error", message: "Password must be at least 6 characters." };
  }

  const patch: Record<string, string> = {};
  const fields = ["name", "surname", "email", "userType", "adminType"] as const;
  for (const field of fields) {
    if (isPresent(data[field])) patch[field] = data[field] as string;
  }

  try {
    await updateUser(userId, patch);
    if (isPresent(data.password)) await changePassword(userId, data.password);
    return { type: "success", message: "User updated." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to update user. Please try again.",
    };
  }
}
