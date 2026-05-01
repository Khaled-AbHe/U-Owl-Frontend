import { requireClient } from "../services/auth"

export default async function clientPageLoader({ request }: any) {
  return await requireClient(request)
}
