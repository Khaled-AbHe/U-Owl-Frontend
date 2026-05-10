import { X, Plus, Trash2, Loader } from "lucide-react";
import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import type { Location } from "../../../../types/location.entity";
import type { Vehicle } from "../../../../types/vehicle.entity";

interface Props {
  // Only the ID is passed in — live inventory is read from the loader directly
  locationId: number;
  allVehicles: Vehicle[];
  onClose: () => void;
}

export function ManageInventoryModal({ locationId, allVehicles, onClose }: Props) {
  const { locations } = useLoaderData() as { locations: Location[]; vehicles: Vehicle[] };

  // Always derived from live loader data, so it updates after every fetcher revalidation
  const location = locations.find((l) => l.locationId === locationId)!;

  const addFetcher = useFetcher();
  const removeFetcher = useFetcher();
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");

  const isAdding = addFetcher.state !== "idle";
  const removingId =
    removeFetcher.state !== "idle" ? Number(removeFetcher.formData?.get("vehicleId")) : null;

  const addError =
    (addFetcher.data as any)?.type === "error" ? (addFetcher.data as any).message : null;
  const removeError =
    (removeFetcher.data as any)?.type === "error" ? (removeFetcher.data as any).message : null;

  // Vehicles not already in this location's live inventory
  const inventoryIds = new Set(location.inventory.map((v) => v.vehicleId));
  const availableVehicles = allVehicles.filter((v) => !inventoryIds.has(v.vehicleId));

  function handleAdd() {
    if (!selectedVehicleId) return;
    const fd = new FormData();
    fd.append("locationId", String(location.locationId));
    fd.append("vehicleId", selectedVehicleId);
    addFetcher.submit(fd, {
      method: "POST",
      action: "/superAdmin/locations/addVehicle",
    });
    setSelectedVehicleId("");
  }

  function handleRemove(vehicleId: number) {
    const fd = new FormData();
    fd.append("locationId", String(location.locationId));
    fd.append("vehicleId", String(vehicleId));
    removeFetcher.submit(fd, {
      method: "POST",
      action: "/superAdmin/locations/removeVehicle",
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
        style={{
          width: 520,
          maxWidth: "calc(100vw - 2rem)",
          padding: "1.5rem",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between mb-3">
          <div>
            <h5 className="mb-0 fw-semibold" style={{ fontSize: 16 }}>
              Manage inventory
            </h5>
            <p className="text-secondary mb-0" style={{ fontSize: 12 }}>
              #{location.locationId} · {location.depotName}
            </p>
          </div>
          <button className="btn btn-sm btn-light p-1" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* Add vehicle */}
        <div
          className="mb-3 p-3 rounded-3"
          style={{ background: "#f8f9fa", border: "1px solid #f0f0f0" }}
        >
          <label className="form-label small fw-medium text-secondary mb-2">
            Add a vehicle to this location
          </label>
          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm flex-grow-1"
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              disabled={isAdding}
            >
              <option value="">Select a vehicle...</option>
              {availableVehicles.map((v) => (
                <option key={v.vehicleId} value={v.vehicleId}>
                  #{v.vehicleId} · {v.licensePlate} — {v.vehicleType} {v.vehicleSubtype}
                </option>
              ))}
            </select>
            <button
              className="btn btn-sm btn-brand d-flex align-items-center gap-1"
              onClick={handleAdd}
              disabled={!selectedVehicleId || isAdding}
            >
              {isAdding ? <Loader size={13} className="cart-spinner" /> : <Plus size={13} />}
              Add
            </button>
          </div>
          {addError && (
            <p className="text-danger small mt-2 mb-0" style={{ fontSize: 12 }}>
              {addError}
            </p>
          )}
          {availableVehicles.length === 0 && !addError && (
            <p className="text-secondary small mt-2 mb-0" style={{ fontSize: 12 }}>
              All vehicles are already assigned to this location.
            </p>
          )}
        </div>

        {/* Current inventory */}
        <p className="fw-medium small text-secondary mb-2" style={{ fontSize: 12 }}>
          Current inventory ({location.inventory.length})
        </p>

        {location.inventory.length === 0 ? (
          <p className="text-center text-secondary py-4" style={{ fontSize: 13 }}>
            No vehicles assigned yet.
          </p>
        ) : (
          <div className="d-flex flex-column gap-1">
            {location.inventory.map((v) => {
              const isThisRemoving = removingId === v.vehicleId;
              return (
                <div
                  key={v.vehicleId}
                  className="d-flex align-items-center justify-content-between px-3 py-2 rounded-3"
                  style={{ background: "#f8f9fa", border: "1px solid #f0f0f0" }}
                >
                  <div>
                    <span className="fw-medium small">{v.licensePlate}</span>
                    <span className="text-secondary small ms-2">
                      {v.vehicleType} · {v.vehicleSubtype}
                    </span>
                  </div>
                  <button
                    className="btn btn-sm btn-light p-1 text-danger"
                    style={{ lineHeight: 1 }}
                    onClick={() => handleRemove(v.vehicleId)}
                    disabled={isThisRemoving}
                    aria-label={"Remove " + v.licensePlate}
                  >
                    {isThisRemoving ? (
                      <Loader size={13} className="cart-spinner" />
                    ) : (
                      <Trash2 size={13} />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {removeError && (
          <p className="text-danger small mt-2 mb-0" style={{ fontSize: 12 }}>
            {removeError}
          </p>
        )}

        <div
          className="d-flex justify-content-end pt-3 mt-3"
          style={{ borderTop: "1px solid #f0f0f0" }}
        >
          <button className="btn btn-sm btn-light" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
