import { request } from "./api-constants";

// Requêtes Vehicle
export const getAllVehicles = async () => {
  return await request("/vehicles/all");
};

export const getAllTrucks = async () => {
  return await request("/vehicles/trucks");
};

export const getAllTrailers = async () => {
  return await request("/vehicles/trailers");
};

export const getVehicleById = async (vehicleId: string) => {
  return await request(`/vehicles/${vehicleId}`);
};

export const getIsRoadSafe = async (vehicleId: string) => {
  return await request(`/vehicles/${vehicleId}/roadsafe`);
};

export const createVehicle = async (vehicle: any) => {
  return await request("/vehicles/create", {
    method: "POST",
    body: JSON.stringify(vehicle),
  });
};

export const updateVehicle = async (vehicleId: string, vehicle: any) => {
  return await request(`/vehicles/${vehicleId}`, {
    method: "PATCH",
    body: JSON.stringify(vehicle),
  });
};

export const deleteVehicleById = async (vehicleId: string) => {
  return await request(`/vehicles/${vehicleId}`, {
    method: "DELETE",
  });
};

// Requêtes Trucks
export const getTrucks = async () => {
  return await request("/trucks");
};

export const getSingleTruck = async (truckId: string) => {
  return await request(`/trucks/${truckId}`);
};

export const getHostTrucks = async (userId: string) => {
  return await request(`/users/${userId}/trucks`);
};

export const getSingleHostTruck = async (userId: string, truckId: string) => {
  return await request(`/users/${userId}/trucks/${truckId}`);
};

// Requêtes Trailers
export const getTrailers = async () => {
  return await request("/trailers");
};

export const getSingleTrailer = async (trailerId: string) => {
  return await request(`/trailers/${trailerId}`);
};

export const getHostTrailers = async (userId: string) => {
  return await request(`/users/${userId}/trailers`);
};

export const getSingleHostTrailer = async (userId: string, trailerId: string) => {
  return await request(`/users/${userId}/trailers/${trailerId}`);
};
