import { signUpUser } from "../../requests/auth.api";
import type ActionReturnMessage from "../../../types/action-return.interface";
import { isFieldValid, isPresent, RegExpList } from "../actions.helpers";

export async function createUserAction({ request }: any): Promise<ActionReturnMessage> {
  const formData = await request.formData();

  const data = {
    name: formData.get("name"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    password: formData.get("password"),
    userType: formData.get("userType"),
    adminType: formData.get("adminType"),
  };

  if (!isPresent(data.name)) {
    return { type: "error", message: "First name is required." };
  }

  if (!isPresent(data.surname)) {
    return { type: "error", message: "Last name is required." };
  }

  if (!isPresent(data.email) || !isFieldValid(RegExpList.email, data.email)) {
    return { type: "error", message: "A valid email is required." };
  }

  if (!isPresent(data.password) || data.password.length < 6) {
    return { type: "error", message: "Password must be at least 6 characters." };
  }

  const post: Record<string, string> = {
    name: data.name,
    surname: data.surname,
    email: data.email,
    password: data.password,
    userType: data.userType as string,
  };

  if (data.userType === "Admin" && isPresent(data.adminType)) {
    post.adminType = data.adminType;
  }

  try {
    await signUpUser(post);
    return { type: "success", message: "User created." };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message ?? "Failed to create user. Please try again.",
    };
  }
}
