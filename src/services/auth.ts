import { redirect } from "react-router-dom"
import { getCurrentUser } from "./api"

export async function requireAuth(request : any) {
  const pathname = new URL(request.url).pathname
  const message = "You must log in first!"

  try {
    return await getCurrentUser()
  } catch (error : any) {
    if (error.status !== 401) {
      throw error
    }
    throw redirect(`/login?redirectTo=${pathname}&message=${message}`)
  }
}
