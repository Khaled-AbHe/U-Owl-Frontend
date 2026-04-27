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

export const getTrailers = async () => await request("/trailers")
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

// Requete Cart
export const getAllCarts = async () => {
    return await request("/carts/all")
}
   

export const getCurrentCart = async () =>{
    return await request("/carts/currentCart")
}
export const payCartTotal = async (payment : any) =>{
    return await request("/carts/pay",{
        method: 'POST',
        body: JSON.stringify(payment)
    })
}

// Requete Reservation (PATCH)
export const addItem = async(reservation : any) =>{
    return await request('/reservations/addVehicle',{
        method: 'PATCH',
        body: JSON.stringify(reservation)
    })
}

export const removeItem = async(reservation : any) =>{
    return await request('/reservations/removeOrderItem/${orderItemId}',{
        method: 'PATCH',
        body: JSON.stringify(reservation)
    })
}



// Requete Location
export const createLocation = async(location : any) => {
    return await request("/locations/create", {
        method : 'POST',
        body : JSON.stringify(location)
    })
}

export const getAllLocation = async () => {
    return await request('/locations/all')
}
export const addVehicleToLocation = async (vehicle : any) => {
    return await request('/locations/addVehicle',{
        method : 'POST',
        body : JSON.stringify(vehicle)
    })
}
export const removeVehicleFromLocation = async (vehicle : any) => {
    return await request('/locations/removeVehicle',{
        method: 'PATCH',
        body: JSON.stringify(vehicle)
    })
}

// Requete User
export const updateUser = async (user : any) => {
    return await request('/users/${id}',{
        method: 'PATCH',
        body : JSON.stringify(user)
    })
}
export const deleteUserById = async (user : any) => {
    return await request('/users/${id}',{
        method : 'DELETE',
        body : JSON.stringify(user)
    })
}
// Requete GET (user)
export const getUserById = async () => {
    return await request('/users/${id}')
}

export const getAllUsers = async () => {
    return await request('/users')
}

// Requete Vehicle
export const createVehicle = async (vehicle : any) => {
    return await request('/vehicles/create',{
        method : 'POST',
        body : JSON.stringify(vehicle)
    })
}

// Requete GET (vehicle)
export const getAllVehicles = async () => {
    return await request('/vehicles/all')
}

export const getAllTrucks = async () => {
    return await request('/vehicles/trucks')
}

export const getAllTrailers = async () => {
    return await request('/vehicles/trailers')
}

export const getVehicleById = async () => {
    return await request('/vehicles/${id}')
}

export const getIsRoadSafe = async () => {
    return await request('/vehicles/${id}/roadsafe')
}

// Requete DELETE (vehicle)
export const deleteVehicleById = async (vehicle : any) => {
    return await request('/vehicles/${id}',{
        method : 'DELETE',
        body : JSON.stringify(vehicle)
    })
}

// Requete PATCH (vehicle)
export const updateVehicle = async (vehicle : any) => {
    return await request('/vehicles/${id}',{
        method: 'PATCH',
        body: JSON.stringify(vehicle)
    })
}
        

