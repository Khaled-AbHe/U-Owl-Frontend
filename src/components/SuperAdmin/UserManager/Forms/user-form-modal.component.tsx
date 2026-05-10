import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import type { User } from "../../../../types/user.entity";
import { ModalShell } from "../../General/Shells/modal-shell.component";

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

  const isSubmitting = fetcher.state === "submitting";
  const result = fetcher.data as { type: string; message: string } | undefined;
  const actionError = result?.type === "error" ? result.message : null;

  useEffect(() => {
    if (result?.type === "success") {
      onSuccess();
    }
  }, [result]);

  function handleSubmit() {
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
    <ModalShell
      title={isEditing ? "Edit user" : "Create new user"}
      subtitle={isEditing ? `#${user.userId} · ${user.email}` : undefined}
      width={420}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel={isEditing ? "Save changes" : "Create user"}
      submittingLabel={isEditing ? "Saving…" : "Creating…"}
      actionError={actionError}
    >
      <div className="row g-2 mb-1">
        <div className="col">
          <label className="form-label small fw-medium text-secondary mb-1">First name</label>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder={isEditing ? undefined : "Jane"}
            value={form.name}
            onChange={field("name")}
          />
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
          className="form-control form-control-sm"
          placeholder={isEditing ? undefined : "jane@example.com"}
          value={form.email}
          onChange={field("email")}
        />
      </div>

      <div className="mb-3">
        <label className="form-label small fw-medium text-secondary mb-1">
          {isEditing ? (
            <>
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
          className="form-control form-control-sm"
          placeholder="••••••••"
          value={form.password}
          onChange={field("password")}
        />
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
    </ModalShell>
  );
}
