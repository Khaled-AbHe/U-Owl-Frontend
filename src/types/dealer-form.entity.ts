export type DealerFormStatus = "Pending" | "Accepted" | "Declined";

export interface DealerForm {
  dealerFormId: number;
  fullName: string;
  businessName: string;
  email: string;
  businessEmail: string;
  phoneNumber: string;
  city: string;
  postalCode: string;
  status: DealerFormStatus;
}
