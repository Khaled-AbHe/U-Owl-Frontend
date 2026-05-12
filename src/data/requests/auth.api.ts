import { redirect } from "react-router-dom";
import { request } from "./api-constants";

// Requêtes Auth
export const signInUser = async (creds: any) => {
  return await request("/auth/signin", {
    method: "POST",
    body: JSON.stringify(creds),
  });
};

export const signUpUser = async (creds: any) => {
  return await request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(creds),
  });
};

export const signOutUser = async () => {
  return await request("/auth/signout", {
    method: "POST",
  });
};

export const getCurrentUser = async () => {
  return await request("/auth/whoami");
};

export const changePassword = async (userId: string, password: string) => {
  return await request(`/users/${userId}/changePassword/${password}`, {
    method: "PATCH",
  });
};

// Guards
export async function requireAuth(loaderRequest: any) {
  const pathname = new URL(loaderRequest.url).pathname;
  const message = "You must log in first!";

  try {
    return await getCurrentUser();
  } catch (error: any) {
    if (error.status !== 401 && error.status !== 403) throw error;
    throw redirect(`/auth/signIn?redirectTo=${pathname}&message=${message}`);
  }
}

export async function requireClient(loaderRequest: any) {
  const user = await requireAuth(loaderRequest);

  if (user.userType !== "Client") {
    throw redirect("/");
  }

  return user;
}

export async function requireSuperAdmin(loaderRequest: any) {
  const user = await requireAuth(loaderRequest);

  if (user.userType !== "Admin" || user.adminType !== "Super Admin") {
    throw redirect("/");
  }

  return user;
}

export async function requireLocationAdmin(loaderRequest: any) {
  const user = await requireAuth(loaderRequest);

  if (user.userType !== "Admin" || user.adminType !== "Location Admin") {
    throw redirect("/");
  }

  return user;
}
