// API URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

// Fonction "squelette" pour faire des requêtes à l'API
export async function request(path: string, options = {}) {
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

// Requêtes Trucks
export const getTrucks = async () => await request("/trucks")
export const getSingleTruck = async (id: string) => await request(`/trucks/${id}`)
export const getHostTrucks = async (userId: string) => await request(`/users/${userId}/trucks`)
export const getSingleHostTruck = async (userId: string, TruckId: string) => await request(`/users/${userId}/trucks/${TruckId}`)

// Requêtes Trailers
export const getTrailers = async () => await request("/trailers")
export const getSingleTrailer = async (id: string) => await request(`/trailers/${id}`)
export const getHostTrailers = async (userId: string) => await request(`/users/${userId}/trailers`)
export const getSingleHostTrailer = async (userId: string, TrailerId: string) => await request(`/users/${userId}/trailers/${TrailerId}`)

// Requêtes Cart
export const getAllCarts = async () => await request("/carts/all")
export const getCurrentCart = async () => await request("/carts/currentCart")
export const payCartTotal = async (payment: any) => await request("/carts/pay", {
  method: "POST",
  body: JSON.stringify(payment)
})

// Requêtes Location
export const createLocation = async (location: any) => await request("/locations/create", {
  method: "POST",
  body: JSON.stringify(location)
})
export const getAllLocation = async () => await request("/locations/all")
export const addVehicleToLocation = async (vehicle: any) => await request("/locations/addVehicle", {
  method: "POST",
  body: JSON.stringify(vehicle)
})
export const removeVehicleFromLocation = async (vehicle: any) => await request("/locations/removeVehicle", {
  method: "PATCH",
  body: JSON.stringify(vehicle)
})

// Requêtes User
export const getAllUsers = async () => await request("/users")
export const getUserById = async (id: string) => await request(`/users/${id}`)
export const updateUser = async (id: string, user: any) => await request(`/users/${id}`, {
  method: "PATCH",
  body: JSON.stringify(user)
})
export const deleteUserById = async (id: string) => await request(`/users/${id}`, {
  method: "DELETE"
})

// Requêtes Vehicle
export const getAllVehicles = async () => await request("/vehicles/all")
export const getAllTrucks = async () => await request("/vehicles/trucks")
export const getAllTrailers = async () => await request("/vehicles/trailers")
export const getVehicleById = async (id: string) => await request(`/vehicles/${id}`)
export const getIsRoadSafe = async (id: string) => await request(`/vehicles/${id}/roadsafe`)
export const createVehicle = async (vehicle: any) => await request("/vehicles/create", {
  method: "POST",
  body: JSON.stringify(vehicle)
})
export const updateVehicle = async (id: string, vehicle: any) => await request(`/vehicles/${id}`, {
  method: "PATCH",
  body: JSON.stringify(vehicle)
})
export const deleteVehicleById = async (id: string) => await request(`/vehicles/${id}`, {
  method: "DELETE"
})