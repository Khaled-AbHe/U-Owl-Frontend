// loaders/auth.loader.js
import { requireAuth } from "../services/auth"

export default async function authLoader({ request } : any) {
  // On attend que requireAuth vérifie la session auprès de NestJS
  // Si l'utilisateur n'est pas connecté, requireAuth jettera (throw) une redirection
  return await requireAuth(request)
}