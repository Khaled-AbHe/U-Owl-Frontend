import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import type {
  Vehicle,
  VehicleType,
  VehicleSubtype,
  TruckSubtype,
  TrailerSubtype,
} from "../../../../types/vehicle.entity";
import { ModalShell } from "../../General/Shells/modal-shell.component";

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

  const isSubmitting = fetcher.state === "submitting";
  const result = fetcher.data as { type: string; message: string } | undefined;
  const actionError = result?.type === "error" ? result.message : null;

  useEffect(() => {
    if (result?.type === "success") {
      onSuccess();
    }
  }, [result]);

  const subtypeOptions = form.vehicleType === "Truck" ? TRUCK_SUBTYPES : TRAILER_SUBTYPES;

  function handleSubmit() {
    const fd = new FormData();

    if (isEditing) fd.append("vehicleId", String(vehicle.vehicleId));
    if (!isEditing || form.licensePlate) fd.append("licensePlate", form.licensePlate.trim());
    fd.append("vehicleType", form.vehicleType.trim());
    fd.append("vehicleSubtype", form.vehicleSubtype.trim());
    fd.append("kilometrage", form.kilometrage);

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
    <ModalShell
      title={isEditing ? "Edit vehicle" : "Add new vehicle"}
      subtitle={isEditing ? `#${vehicle.vehicleId} · ${vehicle.licensePlate}` : undefined}
      width={480}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel={isEditing ? "Save changes" : "Add vehicle"}
      submittingLabel={isEditing ? "Saving…" : "Creating…"}
      actionError={actionError}
    >
      {/* License plate */}
      <div className="mb-3">
        <label className="form-label small fw-medium text-secondary mb-1">License plate</label>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder={isEditing ? vehicle.licensePlate : "ABC 123"}
          value={form.licensePlate}
          onChange={field("licensePlate")}
        />
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
        <div className="mb-4">
          <label className="form-label small fw-medium text-secondary mb-1">Kilometrage</label>
          <input
            type="number"
            min="0"
            className="form-control form-control-sm"
            value={form.kilometrage}
            onChange={field("kilometrage")}
          />
        </div>
      )}
    </ModalShell>
  );
}
