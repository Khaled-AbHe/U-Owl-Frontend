import type { DealerFormStatus } from "../../../../types/dealer-form.entity";

export const dealerFormStatusStyles: Record<DealerFormStatus, React.CSSProperties> = {
  Pending: { background: "#FAEEDA", color: "#854F0B" },
  Accepted: { background: "#E1F5EE", color: "#0F6E56" },
  Declined: { background: "#FCEBEB", color: "#A32D2D" },
};
