import type ActionReturnMessage from "../../../types/action-return.interface";
import { deleteUserById } from "../../requests/user.api";

export async function deleteUserAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();
  const userId = formData.get("userId") as string;

  try {
    await deleteUserById(userId);
    return { type: "success", message: "User deleted." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to delete user. Please try again.",
    };
  }
}
