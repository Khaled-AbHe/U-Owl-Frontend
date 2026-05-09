import { signUpUser } from "../../services/auth";

export async function createUserAction({ request }: any) {
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
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message ?? "Failed to create user. Please try again.",
    };
  }
}
