import { redirect } from "react-router-dom";
import { signUpUser } from "../services/auth";

export async function signUpAction({ request }: any) {
  const formData = await request.formData();
  const userInfo = {
    name: formData.get("name"),
    email: formData.get("email"),
    userType: "Client",
    password: formData.get("password"),
  };

  try {
    await signUpUser(userInfo);
    return redirect(`/auth/signIn`);

  } catch (error: any) {
    return error.message
      ? `Registration failed (${error.message}).`
      : "Registration failed. Please try again.";
  }
}
