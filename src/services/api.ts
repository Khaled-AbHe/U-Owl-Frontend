// API URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

// Fonction "squelette" pour faire des requêtes à l'API
async function request(path : string, options = {}) {

  const res = await fetch(`${BASE_URL}${path}`, {

    credentials: "include", // Inclure les cookies dans la requête (authentification)
    headers: {
      "Content-Type": "application/json",
    },
    ...options
  })

  // Tenter de parser la réponse en JSON, ou retourner un objet vide si ça échoue
  const data = await res.json().catch(() => ({}))

  // Si la réponse n'est pas OK, on rejette la promesse avec un objet d'erreur
  if (!res.ok) {
    throw {
      message: data.message ?? "Request failed",
      statusText: res.statusText,
      status: res.status
    }
  }
  return data
}

// Requêtes GET
export const getTrucks = async () => await request("/trucks")
export const getSingleTruck = async (id : string) => await request(`/trucks/${id}`)
export const getHostTrucks = async (userId : string) => await request(`/users/${userId}/trucks`)
export const getSingleHostTruck = async (userId : string, TruckId : string) => await request(`/users/${userId}/trucks/${TruckId}`)

export const getTrailers = async () => await request("trailers")
export const getSingleTrailer = async (id : string) => await request(`/trailers/${id}`)
export const getHostTrailers  = async (userId : string) => await request(`/users/${userId}/trailers`)
export const getSingleHostTrailer = async (userId : string, TrailerId : string) => await request(`/users/${userId}/trailers/${TrailerId}`)

// Requêtes AUTH
export const loginUser = async (creds : any) => (
  await request("/auth/signin", {
    method: "POST",
    body: JSON.stringify(creds)
  }))

export const registerUser = async (creds : any) => (
  await request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(creds)
  }))


export const getCurrentUser = async () => {
  return await request("/auth/whoami")
}

export const logoutUser = async () => {
  return await request("/auth/signout", {
    method: "POST"
  })
}

// Requêtes POST
export async function createTruck(truck : any) {
  return await request("/trucks", {
    method: "POST",
    body: JSON.stringify(truck)
  })
}


export async function createTrailer(trailer : any) {
  return await request("/trailers", {
    method: "POST",
    body: JSON.stringify(trailer)
  })
}

