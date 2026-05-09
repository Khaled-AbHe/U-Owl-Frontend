import { signUpUser } from "../../requests/auth";
import type ActionReturnMessage from "../../../constants/interfaces/action-return.interface";

export async function createUserAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();

  const userType = formData.get("userType") as string;

  const userInfo: Record<string, string> = {
    name: formData.get("name") as string,
    surname: formData.get("surname") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    userType,
  };

  if (userType === "Admin") {
    userInfo.adminType = formData.get("adminType") as string;
  }

  try {
    await signUpUser(userInfo);
    return { type: "success", message: "User created." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to create user. Please try again.",
    };
  }
}
