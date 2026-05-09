import { X, AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { useFetcher } from "react-router-dom";

interface CreateFormState {
  name: string;
  surname: string;
  email: string;
  password: string;
  userType: "Client" | "Admin";
  adminType: "Location Admin" | "Super Admin";
}

const EMPTY_FORM: CreateFormState = {
  name: "",
  surname: "",
  email: "",
  password: "",
  userType: "Client",
  adminType: "Location Admin",
};

interface CreateModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateUserModal({ onClose, onSuccess }: CreateModalProps) {
  const fetcher = useFetcher();
  const [form, setForm] = useState<CreateFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<CreateFormState>>({});

  const isSubmitting = fetcher.state === "submitting";
  const actionError = fetcher.data?.error;

  if (fetcher.data?.success) {
    onSuccess();
    return null;
  }

  function validate(): boolean {
    const e: Partial<CreateFormState> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.password || form.password.length < 6) e.password = "Min 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("surname", form.surname.trim());
    fd.append("email", form.email.trim());
    fd.append("password", form.password);
    fd.append("userType", form.userType);
    if (form.userType === "Admin") fd.append("adminType", form.adminType);
    fetcher.submit(fd, { method: "POST", action: "/superAdmin/users" });
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
        style={{ width: 420, maxWidth: "calc(100vw - 2rem)", padding: "1.5rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="mb-0 fw-semibold" style={{ fontSize: 16 }}>
            Create new user
          </h5>
          <button className="btn btn-sm btn-light p-1" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* Server error */}
        {actionError && (
          <div
            className="alert alert-danger d-flex align-items-center gap-2 py-2 mb-3"
            style={{ fontSize: 13 }}
          >
            <AlertCircle size={14} />
            {actionError}
          </div>
        )}

        {/* Form */}
        <div className="row g-2 mb-1">
          <div className="col">
            <label className="form-label small fw-medium text-secondary mb-1">First name</label>
            <input
              type="text"
              className={`form-control form-control-sm${errors.name ? " is-invalid" : ""}`}
              placeholder="Jane"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="col">
            <label className="form-label small fw-medium text-secondary mb-1">Last name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Doe"
              value={form.surname}
              onChange={(e) => setForm((f) => ({ ...f, surname: e.target.value }))}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small fw-medium text-secondary mb-1">Email</label>
          <input
            type="email"
            className={`form-control form-control-sm${errors.email ? " is-invalid" : ""}`}
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label small fw-medium text-secondary mb-1">Password</label>
          <input
            type="password"
            className={`form-control form-control-sm${errors.password ? " is-invalid" : ""}`}
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label small fw-medium text-secondary mb-1">Account type</label>
          <select
            className="form-select form-select-sm"
            value={form.userType}
            onChange={(e) =>
              setForm((f) => ({ ...f, userType: e.target.value as "Client" | "Admin" }))
            }
          >
            <option value="Client">Client</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {form.userType === "Admin" && (
          <div className="mb-3">
            <label className="form-label small fw-medium text-secondary mb-1">Admin type</label>
            <select
              className="form-select form-select-sm"
              value={form.adminType}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  adminType: e.target.value as "Location Admin" | "Super Admin",
                }))
              }
            >
              <option value="Location Admin">Location Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
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
                Creating…
              </>
            ) : (
              <>
                <Check size={14} />
                Create user
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
