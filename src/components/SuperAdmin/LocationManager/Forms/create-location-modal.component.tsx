import { X, AlertCircle, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";

interface FormState {
  depotName: string;
  address: string;
  phoneNumber: string;
}

const EMPTY_FORM: FormState = {
  depotName: "",
  address: "",
  phoneNumber: "",
};

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateLocationModal({ onClose, onSuccess }: Props) {
  const fetcher = useFetcher();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const isSubmitting = fetcher.state === "submitting";
  const result = fetcher.data as { type: string; message: string } | undefined;
  const actionError = result?.type === "error" ? result.message : null;

  useEffect(() => {
    if (result?.type === "success") onSuccess();
  }, [result]);

  function field(key: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function handleSubmit() {
    const fd = new FormData();
    fd.append("depotName", form.depotName.trim());
    fd.append("address", form.address.trim());
    fd.append("phoneNumber", form.phoneNumber.trim());
    fetcher.submit(fd, {
      method: "POST",
      action: "/superAdmin/locations/create",
    });
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3 shadow"
        style={{ width: 460, maxWidth: "calc(100vw - 2rem)", padding: "1.5rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="mb-0 fw-semibold" style={{ fontSize: 16 }}>
            Add new location
          </h5>
          <button className="btn btn-sm btn-light p-1" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {actionError && (
          <div
            className="alert alert-danger d-flex align-items-center gap-2 py-2 mb-3"
            style={{ fontSize: 13 }}
          >
            <AlertCircle size={14} />
            {actionError}
          </div>
        )}

        {/* Depot name */}
        <div className="mb-3">
          <label className="form-label small fw-medium text-secondary mb-1">Depot name</label>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="e.g. Montreal North Depot"
            value={form.depotName}
            onChange={field("depotName")}
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label small fw-medium text-secondary mb-1">Phone number</label>
          <input
            type="tel"
            className="form-control form-control-sm"
            placeholder="(514) 000-0000"
            value={form.phoneNumber}
            onChange={field("phoneNumber")}
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="form-label small fw-medium text-secondary mb-1">Address</label>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="e.g. 123 Rue Saint-Denis, Montréal, QC"
            value={form.address}
            onChange={field("address")}
          />
          <div className="form-text" style={{ fontSize: 11 }}>
            Coordinates will be resolved automatically via geocoding.
          </div>
        </div>

        {/* Footer */}
        <div
          className="d-flex justify-content-end gap-2 pt-3 mt-1"
          style={{ borderTop: "1px solid #f0f0f0" }}
        >
          <button className="btn btn-sm btn-light" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-sm btn-brand d-flex align-items-center gap-1"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm" />
                Creating…
              </>
            ) : (
              <>
                <Check size={14} />
                Add location
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
