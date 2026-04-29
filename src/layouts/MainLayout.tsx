import { Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../components/UI/NavBar";
import Footer from "../components/UI/Footer";
import { U_OWL_LOGO } from "../assets";
import { routes } from "../data/routes.data";

type User = { name: string } | null;

export default function MainLayout() {
  // mainLayoutLoader returns the user directly on success,
  // or { user: null } on failure — we normalise both to User | null
  const data = useLoaderData() as User | { user: null };
  const user: User = data && "user" in data ? null : (data as User);

  return (
    <div className="site-wrapper">
      <NavBar imageSrcPath={U_OWL_LOGO} navItems={routes} user={user} />
      <main className="m-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
