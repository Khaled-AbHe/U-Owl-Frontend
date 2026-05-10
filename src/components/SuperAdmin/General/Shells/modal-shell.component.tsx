import { X, AlertCircle, Check } from "lucide-react";

interface ModalShellProps {
  title: string;
  subtitle?: string;
  width?: number;
  onClose: () => void;
  // Footer
  submitLabel: string;
  submittingLabel: string;
  isSubmitting: boolean;
  onSubmit: () => void;
  // Error
  actionError?: string | null;
  children: React.ReactNode;
}

export function ModalShell({
  title,
  subtitle,
  width = 460,
  onClose,
  submitLabel,
  submittingLabel,
  isSubmitting,
  onSubmit,
  actionError,
  children,
}: ModalShellProps) {
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
          width,
          maxWidth: "calc(100vw - 2rem)",
          padding: "1.5rem",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between mb-3">
          <div>
            <h5 className="mb-0 fw-semibold" style={{ fontSize: 16 }}>
              {title}
            </h5>
            {subtitle && (
              <p className="text-secondary mb-0" style={{ fontSize: 12 }}>
                {subtitle}
              </p>
            )}
          </div>
          <button className="btn btn-sm btn-light p-1" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* Error */}
        {actionError && (
          <div
            className="alert alert-danger d-flex align-items-center gap-2 py-2 mb-3"
            style={{ fontSize: 13 }}
          >
            <AlertCircle size={14} />
            {actionError}
          </div>
        )}

        {/* Form fields */}
        {children}

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
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm" />
                {submittingLabel}
              </>
            ) : (
              <>
                <Check size={14} />
                {submitLabel}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
