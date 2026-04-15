export default function AuthForm({
  title,
  subtitle,
  children,
  onSubmit,
  footer,
}: any) {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <form
        onSubmit={onSubmit}
        className="w-100 rounded bg-white p-4 shadow"
        style={{ maxWidth: "420px" }}
      >
        <div className="mb-4 text-center">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-primary mx-auto mb-2 text-white"
            style={{ width: "56px", height: "56px", fontSize: "20px" }}
          >
            👤
          </div>
          <h2 className="h4 fw-bold text-dark">{title}</h2>
          <p className="text-muted small">{subtitle}</p>
        </div>

        {children}

        <button type="submit" className="btn btn-primary fw-semibold w-100">
          {title}
        </button>

        <div className="position-relative my-4 text-center">
          <hr />

          <span className="position-absolute translate-middle text-muted small start-50 top-50 bg-white px-2">
            or
          </span>
        </div>

        {footer}
      </form>
    </div>
  );
}
