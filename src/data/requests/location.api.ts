import { request } from "./api-constants";

// Requêtes Location
export const createLocation = async (location: any) => {
  return await request("/locations/create", {
    method: "POST",
    body: JSON.stringify(location),
  });
};

export const updateLocation = async (id: string, location: any) => {
  return await request(`/locations/${id}`, {
    method: "PATCH",
    body: JSON.stringify(location),
  });
};

export const getAllLocations = async () => {
  return await request("/locations/all");
};

export const addVehicleToLocation = async (vehicle: any) => {
  return await request("/locations/addVehicle", {
    method: "POST",
    body: JSON.stringify(vehicle),
  });
};

export const removeVehicleFromLocation = async (vehicle: any) => {
  return await request("/locations/removeVehicle", {
    method: "PATCH",
    body: JSON.stringify(vehicle),
  });
};

export const deleteLocationById = async (id: string) => {
  return await request(`"/locations/${id}"`, {
    method: "DELETE",
  });
};

export const getAllVehiclesFromLocation = async (id: string) => {
  return await request(`"/locations/${id}/vehicles"`);
};
