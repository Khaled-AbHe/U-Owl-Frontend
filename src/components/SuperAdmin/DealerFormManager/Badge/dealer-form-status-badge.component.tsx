import { Clock, CheckCircle, XCircle } from "lucide-react";
import type { DealerFormStatus } from "../../../../types/dealer-form.entity";
import { dealerFormStatusStyles } from "./dealer-form-badge-color.constant";
import { StatusBadge } from "../../General/status-badge.component";

interface Props {
  status: DealerFormStatus;
}

const icons: Record<DealerFormStatus, React.ReactNode> = {
  Pending: <Clock size={11} />,
  Accepted: <CheckCircle size={11} />,
  Declined: <XCircle size={11} />,
};

export function DealerFormStatusBadge({ status }: Props) {
  return (
    <StatusBadge
      label={status}
      icon={icons[status]}
      style={{ ...dealerFormStatusStyles[status], width: 90, textAlign: "center" }}
    />
  );
}
