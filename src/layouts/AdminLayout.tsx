import { Form, Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Truck,
  Settings,
  LogOut,
  Shield,
  CalendarCheck,
  ClipboardList,
} from "lucide-react";
import { U_OWL_LOGO } from "../assets";
import type { User } from "../interfaces/user.entity";

const SUPER_NAV_ITEMS = [
  { label: "Dashboard", path: "/superAdmin/dashboard",  icon: LayoutDashboard },
  { label: "Users",     path: "/superAdmin/users",      icon: Users },
  { label: "Locations", path: "/superAdmin/locations",  icon: MapPin },
  { label: "Vehicles",  path: "/superAdmin/vehicles",   icon: Truck },
  { label: "Settings",  path: "/superAdmin/settings",   icon: Settings },
];

const LOCATION_NAV_ITEMS = [
  { label: "Dashboard",    path: "/locationAdmin/dashboard",    icon: LayoutDashboard },
  { label: "Fleet",        path: "/locationAdmin/fleet",        icon: Truck },
  { label: "Reservations", path: "/locationAdmin/reservations", icon: CalendarCheck },
  { label: "Reports",      path: "/locationAdmin/reports",      icon: ClipboardList },
  { label: "Settings",     path: "/locationAdmin/settings",     icon: Settings },
];

export default function AdminLayout() {
  const user: User = useLoaderData();

  const isSuperAdmin = user?.adminType === "Super Admin";

  const navItems    = isSuperAdmin ? SUPER_NAV_ITEMS : LOCATION_NAV_ITEMS;
  const roleIcon   = isSuperAdmin ? <Shield size={28} color="#389fff" /> : <MapPin size={28} color="#389fff" />;
  const roleLabel  = isSuperAdmin ? "Super Admin" : "Location Admin";
  const sidebarBg   = isSuperAdmin ? { background: "#212529" } : { background: "#1e3a5f" };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f1f5f9" }}>

      {/* Sidebar */}
      <aside
        className="d-flex flex-column text-white"
        style={{ width: "240px", minHeight: "100vh", flexShrink: 0, ...sidebarBg }}
      >
        {/* Brand */}
        <div
          className="d-flex align-items-center px-3 py-3"
          style={{ minHeight: "64px", gap: "10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          {roleIcon}
          <span className="fw-bold fs-6 text-white text-nowrap">{roleLabel}</span>
        </div>

        {/* Nav links */}
        <nav className="flex-grow-1 py-2">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `d-flex align-items-center gap-3 px-3 py-2 text-decoration-none
                 ${isActive ? "text-white border-start border-3 border-primary" : ""}`
              }
              style={({ isActive }) => ({
                transition: "background 0.15s",
                background: isActive ? "rgba(56,159,255,0.15)" : "transparent",
                color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
              })}
            >
              <Icon size={20} style={{ flexShrink: 0 }} />
              <span className="small fw-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">

        {/* Top bar */}
        <header
          className="d-flex align-items-center justify-content-between bg-white border-bottom px-4"
          style={{ height: "64px", flexShrink: 0 }}
        >
          <Link to="/">
            <img src={U_OWL_LOGO} height="40" alt="U-Owl" />
          </Link>

          <div className="d-flex align-items-center gap-3">
            <Form method="POST" action="/auth/signOut">
              <button 
                type="submit"
                className={`btn btn-sm btn-outline-danger d-flex align-items-center gap-1`}
                >
                <LogOut size={14} />
                Sign Out
              </button>
            </Form>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-grow-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}