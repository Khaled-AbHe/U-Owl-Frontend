import type { DealerForm } from "../../../../types/dealer-form.entity";
import { ModalShell } from "../../General/Shells/modal-shell.component";
import { DetailRow } from "./detail-row.component";

interface ViewDealerFormModalProps {
  form: DealerForm;
  viewFormRows: any[];
  onClose: () => void;
}

export function ViewDealerFormModal({ form, viewFormRows, onClose }: ViewDealerFormModalProps) {
  return (
    <ModalShell
      title="Application details"
      subtitle={`#${form.dealerFormId} · submitted by ${form.fullName}`}
      width={440}
      onClose={onClose}
    >
      <div className="mb-1">
        {viewFormRows.map((row) => {
          return <DetailRow icon={<row.icon size={14} />} label={row.label} value={row.value} />;
        })}
      </div>
    </ModalShell>
  );
}
