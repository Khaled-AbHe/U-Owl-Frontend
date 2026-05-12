import { request } from "./api-constants";

// Requêtes Dealer Form
export const createDealerForm = async (dealerForm: any) => {
  return await request("/dealer-form/create", {
    method: "POST",
    body: JSON.stringify(dealerForm),
  });
};

export const deleteDealerForm = async (dealerFormId: string) => {
  return await request(`/dealer-form/${dealerFormId}`, {
    method: "DELETE",
  });
};

export const findAllDealerForms = async () => {
  return await request("/dealer-form/all");
};

export const findDealerFormById = async (dealerFormId: string) => {
  return await request(`/dealer-form/find/${dealerFormId}`);
};

export const updateDealerForm = async (dealerFormId: string) => {
  return await request(`/dealer-form/update/${dealerFormId}`, {
    method: "UPDATE",
  });
};
