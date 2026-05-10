import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import type { Location } from "../../../../types/location.entity";
import { ModalShell } from "../../General/Shells/modal-shell.component";

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

function toFormState(loc: Location): FormState {
  return {
    depotName: loc.depotName,
    address: "",
    phoneNumber: loc.phoneNumber,
  };
}

interface LocationFormModalProps {
  location?: Location; // undefined → create mode, Location → edit mode
  onClose: () => void;
  onSuccess: () => void;
}

export function LocationFormModal({ location, onClose, onSuccess }: LocationFormModalProps) {
  const isEditing = location !== undefined;
  const fetcher = useFetcher();

  const [form, setForm] = useState<FormState>(() =>
    location ? toFormState(location) : EMPTY_FORM,
  );

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
    if (isEditing) fd.append("locationId", String(location.locationId));
    fd.append("depotName", form.depotName.trim());
    if (!isEditing || form.address) fd.append("address", form.address.trim());
    fd.append("phoneNumber", form.phoneNumber.trim());
    fetcher.submit(fd, {
      method: "POST",
      action: isEditing ? "/superAdmin/locations/update" : "/superAdmin/locations/create",
    });
  }

  return (
    <ModalShell
      title={isEditing ? "Edit location" : "Add new location"}
      subtitle={isEditing ? `#${location.locationId} · ${location.depotName}` : undefined}
      width={460}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel={isEditing ? "Save changes" : "Add location"}
      submittingLabel={isEditing ? "Saving…" : "Creating…"}
      actionError={actionError}
    >
      {/* Depot name */}
      <div className="mb-3">
        <label className="form-label small fw-medium text-secondary mb-1">Depot name</label>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder={isEditing ? undefined : "e.g. Montreal North Depot"}
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
          placeholder={isEditing ? undefined : "(514) 000-0000"}
          value={form.phoneNumber}
          onChange={field("phoneNumber")}
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="form-label small fw-medium text-secondary mb-1">
          {isEditing ? (
            <>
              New address{" "}
              <span className="text-secondary fw-normal" style={{ fontSize: 11 }}>
                (leave blank to keep current)
              </span>
            </>
          ) : (
            "Address"
          )}
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder={isEditing ? location.address : "e.g. 123 Rue Saint-Denis, Montréal, QC"}
          value={form.address}
          onChange={field("address")}
        />
      </div>
    </ModalShell>
  );
}
