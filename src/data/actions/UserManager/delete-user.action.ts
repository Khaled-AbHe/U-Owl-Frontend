import { deleteUserById } from "../../requests/api";
import type ActionReturnMessage from "../../../constants/interfaces/action-return.interface";

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
