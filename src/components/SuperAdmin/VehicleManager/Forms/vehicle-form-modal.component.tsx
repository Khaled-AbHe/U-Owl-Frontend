import { X, AlertCircle, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import type {
  Vehicle,
  VehicleType,
  VehicleSubtype,
  TruckSubtype,
  TrailerSubtype,
} from "../../../../constants/interfaces/vehicle.entity";

const TRUCK_SUBTYPES: TruckSubtype[] = [
  "Pickup",
  "Cargo Van",
  "Small Box",
  "Medium Box",
  "Large Box",
  "XLarge Box",
];
const TRAILER_SUBTYPES: TrailerSubtype[] = ["Small", "Medium", "Large"];

interface VehicleFormState {
  licensePlate: string;
  vehicleType: VehicleType;
  vehicleSubtype: VehicleSubtype;
  kilometrage: string;
}

const EMPTY_FORM: VehicleFormState = {
  licensePlate: "",
  vehicleType: "Truck",
  vehicleSubtype: "Pickup",
  kilometrage: "",
};

function toFormState(v: Vehicle): VehicleFormState {
  return {
    licensePlate: "",
    vehicleType: v.vehicleType,
    vehicleSubtype: v.vehicleSubtype,
    kilometrage: String(v.kilometrage),
  };
}

interface VehicleFormModalProps {
  vehicle?: Vehicle;
  onClose: () => void;
  onSuccess: () => void;
}

export function VehicleFormModal({ vehicle, onClose, onSuccess }: VehicleFormModalProps) {
  const isEditing = vehicle !== undefined;
  const fetcher = useFetcher();

  const [form, setForm] = useState<VehicleFormState>(() =>
    vehicle ? toFormState(vehicle) : EMPTY_FORM,
  );
  const [errors, setErrors] = useState<Partial<Record<keyof VehicleFormState, string>>>({});

  const isSubmitting = fetcher.state === "submitting";
  const result = fetcher.data as { type: string; message: string } | undefined;
  const actionError = result?.type === "error" ? result.message : null;

  useEffect(() => {
    if (result?.type === "success") {
      onSuccess();
    }
  }, [result]);

  const subtypeOptions = form.vehicleType === "Truck" ? TRUCK_SUBTYPES : TRAILER_SUBTYPES;

  function validate(): boolean {
    const e: Partial<Record<keyof VehicleFormState, string>> = {};

    if (!isEditing && !form.licensePlate.trim()) e.licensePlate = "Required";

    if (isEditing) {
      if (
        !form["kilometrage"].trim() ||
        isNaN(Number(form["kilometrage"])) ||
        Number(form["kilometrage"]) < 0
      ) {
        e["kilometrage"] = "Valid positive number required";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    const fd = new FormData();

    if (isEditing) fd.append("vehicleId", String(vehicle.vehicleId));
    if (!isEditing || form.licensePlate) fd.append("licensePlate", form.licensePlate.trim());
    fd.append("vehicleType", form.vehicleType.trim());
    fd.append("vehicleSubtype", form.vehicleSubtype.trim());
    fd.append("kilometrage", form.kilometrage);

    console.log(fd);
    fetcher.submit(fd, {
      method: "POST",
      action: isEditing ? "/superAdmin/vehicles/update" : "/superAdmin/vehicles/create",
    });
  }

  function field(key: keyof VehicleFormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const next = { ...form, [key]: e.target.value };
      // When vehicle type changes, reset subtype to a valid value for the new type
      if (key === "vehicleType") {
        next.vehicleSubtype = e.target.value === "Truck" ? "Pickup" : "Small";
      }
      setForm(next);
    };
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
        style={{
          width: 480,
          maxWidth: "calc(100vw - 2rem)",
          padding: "1.5rem",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h5 className="mb-0 fw-semibold" style={{ fontSize: 16 }}>
              {isEditing ? "Edit vehicle" : "Add new vehicle"}
            </h5>
            {isEditing && (
              <p className="text-secondary mb-0" style={{ fontSize: 12 }}>
                #{vehicle.vehicleId} · {vehicle.licensePlate}
              </p>
            )}
          </div>
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

        {/* License plate */}
        <div className="mb-3">
          <label className="form-label small fw-medium text-secondary mb-1">
            License plate
            {isEditing}
          </label>
          <input
            type="text"
            className={`form-control form-control-sm${errors.licensePlate ? " is-invalid" : ""}`}
            placeholder={isEditing ? vehicle.licensePlate : "ABC 123"}
            value={form.licensePlate}
            onChange={field("licensePlate")}
          />
          {errors.licensePlate && <div className="invalid-feedback">{errors.licensePlate}</div>}
        </div>

        {/* Type + Subtype */}
        <div className="row g-2 mb-3">
          <div className="col">
            <label className="form-label small fw-medium text-secondary mb-1">Vehicle type</label>
            <select
              className="form-select form-select-sm"
              value={form.vehicleType}
              onChange={field("vehicleType")}
            >
              <option value="Truck">Truck</option>
              <option value="Trailer">Trailer</option>
            </select>
          </div>
          <div className="col">
            <label className="form-label small fw-medium text-secondary mb-1">Subtype</label>
            <select
              className="form-select form-select-sm"
              value={form.vehicleSubtype}
              onChange={field("vehicleSubtype")}
            >
              {subtypeOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isEditing && (
          <>
            {/* Kilometrage */}
            <div className="row g-2 mb-4">
              <label className="form-label small fw-medium text-secondary mb-1">Kilometrage</label>
              <input
                type="number"
                min="0"
                className={`form-control form-control-sm${errors.kilometrage ? " is-invalid" : ""}`}
                value={form.kilometrage}
                onChange={field("kilometrage")}
              />
              {errors.kilometrage && <div className="invalid-feedback">{errors.kilometrage}</div>}
            </div>
          </>
        )}
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
                {isEditing ? "Saving…" : "Creating…"}
              </>
            ) : (
              <>
                <Check size={14} />
                {isEditing ? "Save changes" : "Add vehicle"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
