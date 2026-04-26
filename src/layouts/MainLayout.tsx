import { Outlet } from "react-router-dom";
import NavBar from "../components/UI/NavBar";
import Footer from "../components/UI/Footer";
import { U_OWL_LOGO } from "../assets";
import { routes } from "../data/routes.data";

export default function MainLayout() {
  return (
    <div className="site-wrapper">
      <NavBar imageSrcPath={U_OWL_LOGO} navItems={routes} />
      <main className="m-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
