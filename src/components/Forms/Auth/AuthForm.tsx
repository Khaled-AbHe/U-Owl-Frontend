import { Form } from "react-router-dom";

export default function AuthForm({
  title,
  subtitle,
  children,
  footer,
  header,
  icon,
  iconClass = "",
  isSubmitting = false,
  error,
}: any) {
  const isAdmin = iconClass === "signin-icon--admin";

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "700px" }}>
      {/* No onSubmit — React Router's <Form> handles submission natively */}
      <Form
        method="POST"
        className="rounded bg-white p-4 shadow-sm border"
        style={{ width: "460px", maxWidth: "100%" }}
        replace
      >
        {header}

        <div className="mb-4 text-center">
          <div
            className={`d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3 text-white ${iconClass}`}
            style={{ width: "56px", height: "56px", fontSize: "20px" }}
          >
            {icon}
          </div>
          <h2 className="h4 fw-bold text-dark mb-1">{title}</h2>
          <p className="text-muted small mb-0">{subtitle}</p>
        </div>

        {children}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn fw-semibold w-100 mt-1 ${isAdmin ? "btn-danger" : "btn-brand"}`}
        >
          {isSubmitting ? "Loading..." : title}
        </button>

        {/* Error returned by the action is displayed here */}
        {error && (
          <div className="alert alert-danger py-2 small mt-2 text-center" role="alert">
            {error}
          </div>
        )}

        <div className="position-relative my-4 text-center">
          <hr />
          {!isAdmin && (
            <span className="position-absolute translate-middle text-muted small start-50 top-50 bg-white px-2">
              or
            </span>
          )}
        </div>

        {footer}
      </Form>
    </div>
  );
}
