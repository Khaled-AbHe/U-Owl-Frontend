import { request } from "./api-constants";

// Requêtes Dealer Form
export const createDealerForm = async (dealerForm: any) => {
  return await request("/dealerform/create", {
    method: "POST",
    body: JSON.stringify(dealerForm),
  });
};

export const deleteDealerForm = async (dealerFormId: string) => {
  return await request(`/dealerform/${dealerFormId}`, {
    method: "DELETE",
  });
};

export const findAllDealerForms = async () => {
  return await request("/dealerform/all");
};

export const findDealerFormById = async (dealerFormId: string) => {
  return await request(`/dealerform/find/${dealerFormId}`);
};

export const updateDealerForm = async (dealerFormId: string) => {
  return await request(`/dealerform/update/${dealerFormId}`, {
    method: "UPDATE",
  });
};
