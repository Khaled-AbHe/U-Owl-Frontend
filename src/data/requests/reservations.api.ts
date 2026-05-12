import { request } from "./api-constants";

// Requêtes Reservations
export const addVehicleToCart = async (data: { vehicleId: number; distance: number }) => {
  return await request("/reservations/addVehicle", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const removeOrderItem = async (orderItemId: number) => {
  return await request(`/reservations/removeOrderItem/${orderItemId}`, {
    method: "PATCH",
  });
};
