export default function AuthForm({
  title,
  subtitle,
  children,
  onSubmit,
  footer,
  header,
  icon,
  iconClass = "",
}: any) {
  const isAdmin = iconClass === "signin-icon--admin";

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "700px" }}>
      <form
        onSubmit={onSubmit}
        className="rounded bg-white p-4 shadow-sm border"
        style={{ width: "460px", maxWidth: "100%" }}
      >
        {/* Optional slot above icon — e.g. User/Admin tabs in SignIn */}
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
          className={`btn fw-semibold w-100 mt-1 ${isAdmin ? "btn-danger" : "btn-brand"}`}
        >
          {title}
        </button>

        <div className="position-relative my-4 text-center">
          <hr />
          {
            !isAdmin && 
            <span className="position-absolute translate-middle text-muted small start-50 top-50 bg-white px-2">
              or
            </span>
          }
        </div>

        {footer}
      </form>
    </div>
  );
}
