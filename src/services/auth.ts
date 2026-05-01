import { redirect } from "react-router-dom"
import { request } from "./api"

// Requêtes Auth
export const signInUser = async (creds: any) => await request("/auth/signin", {
  method: "POST",
  body: JSON.stringify(creds)
})

export const signUpUser = async (creds: any) => await request("/auth/signup", {
  method: "POST",
  body: JSON.stringify(creds)
})

export const signOutUser = async () => await request("/auth/signout", {
  method: "POST"
})

export const getCurrentUser = async () => await request("/auth/whoami")

// Guards
export async function requireAuth(loaderRequest: any) {
  const pathname = new URL(loaderRequest.url).pathname
  const message = "You must log in first!"

  try {
    return await getCurrentUser()
  } catch (error: any) {
    if (error.status !== 401 && error.status !== 403) throw error
    throw redirect(`/auth/signIn?redirectTo=${pathname}&message=${message}`)
  }
}

export async function requireClient(loaderRequest: any) {
  const user = await requireAuth(loaderRequest)

  if (user.userType !== "Client") {
    throw redirect("/")
  }

  return user
}

export async function requireSuperAdmin(loaderRequest: any) {
  const user = await requireAuth(loaderRequest)

  if (user.userType !== "Admin" || user.adminType !== "Super Admin") {
    throw redirect("/")
  }

  return user
}

export async function requireLocationAdmin(loaderRequest: any) {
  const user = await requireAuth(loaderRequest)

  if (user.userType !== "Admin" || user.adminType !== "Location Admin") {
    throw redirect("/")
  }

  return user
}