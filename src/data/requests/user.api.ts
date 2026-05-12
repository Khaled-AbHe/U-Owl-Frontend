import { request } from "./api-constants";

// Requêtes User
export const getAllUsers = async () => {
  return await request("/users");
};

export const getUserById = async (id: string) => {
  return await request(`/users/${id}`);
};

export const updateUser = async (id: string, user: any) => {
  return await request(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
  });
};

export const deleteUserById = async (id: string) => {
  return await request(`/users/${id}`, {
    method: "DELETE",
  });
};
