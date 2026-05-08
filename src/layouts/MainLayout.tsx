import { Outlet, useLoaderData } from "react-router-dom";
import Footer from "../components/UI/Footer";
import { U_OWL_LOGO } from "../assets";
import { mainRoutes } from "../data/routes.data";
import NavBar from "../components/UI/Nav/NavBar";

type User = { name: string } | null;

export default function MainLayout() {
  // mainLayoutLoader returns the user directly on success,
  // or { user: null } on failure — we normalise both to User | null
  const data = useLoaderData() as User | { user: null };
  const user: User = data && "user" in data ? null : (data as User);

  return (
    <div className="site-wrapper">
      <NavBar imageSrcPath={U_OWL_LOGO} navItems={mainRoutes} user={user} />
      <main className="m-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
