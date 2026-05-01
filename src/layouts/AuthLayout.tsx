import { Navigate, Outlet, useLocation } from "react-router-dom";
import { U_OWL_LOGO } from "../assets";
import Footer from "../components/UI/Footer";

export default function AuthLayout() {
  const location = useLocation();

  // Redirect /auth (exact) → /auth/signIn
  if (location.pathname === "/auth" || location.pathname === "/auth/") {
    return <Navigate to="/auth/signIn" replace />;
  }

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <header className="bg-white border-bottom py-2 px-4">
        <a href="/" className="d-inline-block">
          <img src={U_OWL_LOGO} height="48" alt="U-Owl logo" />
        </a>
      </header>

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
