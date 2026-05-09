import { X, AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { useFetcher } from "react-router-dom";
import type { User } from "../../../../constants/interfaces/user.entity";

interface UserFormState {
  name: string;
  surname: string;
  email: string;
  password: string;
  userType: "Client" | "Admin";
  adminType: "Location Admin" | "Super Admin";
}

const EMPTY_FORM: UserFormState = {
  name: "",
  surname: "",
  email: "",
  password: "",
  userType: "Client",
  adminType: "Location Admin",
};

interface UserFormModalProps {
  user?: User; // undefined → create mode, User → edit mode
  onClose: () => void;
  onSuccess: () => void;
}

export function UserFormModal({ user, onClose, onSuccess }: UserFormModalProps) {
  const isEditing = user !== undefined;
  const fetcher = useFetcher();

  const [form, setForm] = useState<UserFormState>(() => {
    if (!user) return EMPTY_FORM;
    return {
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: "",
      userType: user.userType,
      adminType:
        user.adminType === "Location Admin" || user.adminType === "Super Admin"
          ? user.adminType
          : "Location Admin",
    };
  });

  const [errors, setErrors] = useState<Partial<UserFormState>>({});
  const isSubmitting = fetcher.state === "submitting";
  const result = fetcher.data as { type: string; message: string } | undefined;
  const actionError = result?.type === "error" ? result.message : null;

  if (result?.type === "success") {
    onSuccess();
    return null;
  }

  function validate(): boolean {
    const e: Partial<UserFormState> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!isEditing && (!form.password || form.password.length < 6)) e.password = "Min 6 characters";
    if (isEditing && form.password && form.password.length < 6) e.password = "Min 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    const fd = new FormData();
    if (isEditing) fd.append("userId", String(user.userId));
    fd.append("name", form.name.trim());
    fd.append("surname", form.surname.trim());
    fd.append("email", form.email.trim());
    fd.append("userType", form.userType);
    if (form.userType === "Admin") fd.append("adminType", form.adminType);
    if (!isEditing || form.password) fd.append("password", form.password);
    fetcher.submit(fd, {
      method: "POST",
      action: isEditing ? "/superAdmin/users/update" : "/superAdmin/users/create",
    });
  }

  function field<K extends keyof UserFormState>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
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
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h5 className="mb-0 fw-semibold" style={{ fontSize: 16 }}>
              {isEditing ? "Edit user" : "Create new user"}
            </h5>
            {isEditing && (
              <p className="text-secondary mb-0" style={{ fontSize: 12 }}>
                #{user.userId} · {user.email}
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

        <div className="row g-2 mb-1">
          <div className="col">
            <label className="form-label small fw-medium text-secondary mb-1">First name</label>
            <input
              type="text"
              className={`form-control form-control-sm${errors.name ? " is-invalid" : ""}`}
              placeholder={isEditing ? undefined : "Jane"}
              value={form.name}
              onChange={field("name")}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="col">
            <label className="form-label small fw-medium text-secondary mb-1">Last name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder={isEditing ? undefined : "Doe"}
              value={form.surname}
              onChange={field("surname")}
            />
          </div>
        </div>

        <div className="mb-3 mt-2">
          <label className="form-label small fw-medium text-secondary mb-1">Email</label>
          <input
            type="email"
            className={`form-control form-control-sm${errors.email ? " is-invalid" : ""}`}
            placeholder={isEditing ? undefined : "jane@example.com"}
            value={form.email}
            onChange={field("email")}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label small fw-medium text-secondary mb-1">
            {isEditing ? (
              <>
                {" "}
                New password{" "}
                <span className="text-secondary fw-normal" style={{ fontSize: 11 }}>
                  (leave blank to keep current)
                </span>
              </>
            ) : (
              "Password"
            )}
          </label>
          <input
            type="password"
            className={`form-control form-control-sm${errors.password ? " is-invalid" : ""}`}
            placeholder="••••••••"
            value={form.password}
            onChange={field("password")}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label small fw-medium text-secondary mb-1">Account type</label>
          <select
            className="form-select form-select-sm"
            value={form.userType}
            onChange={field("userType")}
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
              onChange={field("adminType")}
            >
              <option value="Location Admin">Location Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
        )}

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
                {isEditing ? "Save changes" : "Create user"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
