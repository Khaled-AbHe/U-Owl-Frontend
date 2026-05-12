import { request } from "./api-constants";

// Requêtes Cart
export const getAllCarts = async () => {
  return await request("/carts/all");
};

export const getCurrentCart = async () => {
  return await request("/carts/currentCart");
};

export const payCartTotal = async (payment: any) => {
  return await request("/carts/pay", {
    method: "POST",
    body: JSON.stringify(payment),
  });
};
