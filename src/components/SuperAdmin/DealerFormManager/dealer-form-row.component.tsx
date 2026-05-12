import { Check, Eye, X, Trash2 } from "lucide-react";
import type { DealerForm } from "../../../types/dealer-form.entity";
import { DealerFormStatusBadge } from "./Badge/dealer-form-status-badge.component";
import { DEALER_FORM_COLUMNS } from "../../../pages/Admin/Super/DealerFormManager/dealer-form-manager.constants";
import { ManagerRow } from "../General/Table/manager-row.component";
import { colsToGrid } from "../General/Table/manager-table.component";

const GRID = colsToGrid(DEALER_FORM_COLUMNS);

interface DealerFormRowProps {
  form: DealerForm;
  index: number;
  listSize: number;
  currentPage: number;
  isAccepting: boolean;
  isDeclining: boolean;
  onView: (form: DealerForm) => void;
  onAccept: (form: DealerForm) => void;
  onDecline: (form: DealerForm) => void;
  onDelete: (form: DealerForm) => void;
}

export default function DealerFormRow({
  form,
  index,
  listSize,
  currentPage,
  isAccepting,
  isDeclining,
  onView,
  onAccept,
  onDecline,
  onDelete,
}: DealerFormRowProps) {
  const isPending = form.status === "Pending";

  return (
    <ManagerRow grid={GRID}>
      {/* # */}
      <div className="d-flex text-secondary small" style={{ justifyContent: "center" }}>
        {(currentPage - 1) * listSize + index + 1}
      </div>

      {/* ID */}
      <div className="d-flex text-secondary small" style={{ justifyContent: "center" }}>
        #{form.dealerFormId}
      </div>

      {/* Applicant */}
      <div className="d-flex flex-column" style={{ overflow: "hidden", justifyContent: "left" }}>
        <div className="fw-medium small text-truncate">{form.fullName}</div>
        <div className="text-secondary text-truncate" style={{ fontSize: 12 }}>
          {form.email}
        </div>
      </div>

      {/* Business */}
      <div className="d-flex flex-column" style={{ overflow: "hidden", justifyContent: "left" }}>
        <div className="fw-medium small text-truncate">{form.businessName}</div>
        <div className="text-secondary text-truncate" style={{ fontSize: 12 }}>
          {form.businessEmail}
        </div>
      </div>

      {/* Location */}
      <div className="d-flex flex-column" style={{ justifyContent: "center" }}>
        <div className="small text-truncate">{form.city}</div>
        <div className="text-secondary" style={{ fontSize: 12 }}>
          {form.postalCode}
        </div>
      </div>

      {/* Status */}
      <div className="d-flex" style={{ justifyContent: "center" }}>
        <DealerFormStatusBadge status={form.status} />
      </div>

      {/* Actions */}
      <div className="d-flex gap-1" style={{ justifyContent: "center" }}>
        <button
          className="btn btn-sm btn-light p-1"
          style={{ lineHeight: 1 }}
          title={`View application from ${form.fullName}`}
          aria-label={`View application from ${form.fullName}`}
          onClick={() => onView(form)}
        >
          <Eye size={13} />
        </button>
        <button
          className="btn btn-sm btn-light p-1 text-success"
          style={{ lineHeight: 1 }}
          title={isPending ? `Approve ${form.fullName}'s application` : "Already resolved"}
          aria-label={`Approve application from ${form.fullName}`}
          onClick={() => onAccept(form)}
          disabled={!isPending || isAccepting || isDeclining}
        >
          <Check size={13} />
        </button>
        <button
          className="btn btn-sm btn-light p-1 text-warning"
          style={{ lineHeight: 1 }}
          title={isPending ? `Decline ${form.fullName}'s application` : "Already resolved"}
          aria-label={`Decline application from ${form.fullName}`}
          onClick={() => onDecline(form)}
          disabled={!isPending || isAccepting || isDeclining}
        >
          <X size={13} />
        </button>
        <button
          className="btn btn-sm btn-light p-1 text-danger"
          style={{ lineHeight: 1 }}
          title={`Delete application from ${form.fullName}`}
          aria-label={`Delete application from ${form.fullName}`}
          onClick={() => onDelete(form)}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </ManagerRow>
  );
}
