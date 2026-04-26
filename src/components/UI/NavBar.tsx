import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search, X } from "lucide-react";
import "./navbar.css";

interface NavItem {
  label: string;
  path: string;
}

interface NavBarProps {
  imageSrcPath: string;
  navItems: NavItem[];
}

const MAIN_LINKS = ["Home", "Truck", "Trailer", "Reservations", "Become A Dealer", "Find Location"];
const AUTH_LINK = ["Sign In"];

function NavBar({ imageSrcPath, navItems }: NavBarProps) {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mainItems = navItems.filter((i) => MAIN_LINKS.includes(i.label));
  const authItems  = navItems.filter((i) => AUTH_LINK.includes(i.label));
  const cartItem   = navItems.find((i) => i.label === "Cart");

  const LABELS: Record<string, string> = {
    BecomeAdealer: "Become a Dealer",
    FindLocation: "Find Location",
    SignIn: "Sign In",
    SignUp: "Sign Up",
  };

  const displayLabel = (label: string) => LABELS[label] ?? label;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white navbar-main">
      <div className="container-xl">

        {/* Logo */}
        <Link className="navbar-brand me-4" to="/">
          <img src={imageSrcPath} height="56" alt="U-Owl logo" />
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMain"
          aria-controls="navMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navMain">

          {/* Main nav links */}
          <ul className="navbar-nav me-auto gap-1">
            {mainItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.label} className="nav-item">
                  <Link
                    className={`nav-link nav-link-custom ${active ? "active" : ""}`}
                    to={item.path}
                  >
                    {displayLabel(item.label)}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">

            {/* Inline search (expands on toggle) */}
            <div className={`navbar-search ${searchOpen ? "navbar-search--open" : ""}`}>
              <input
                type="search"
                className="navbar-search-input form-control form-control-sm"
                placeholder="Search…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
            </div>
            <button
              className="btn btn-icon"
              onClick={() => setSearchOpen((o) => !o)}
              aria-label="Toggle search"
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

            {/* Divider */}
            <div className="navbar-divider d-none d-lg-block" />

            {/* Auth links */}
            {authItems.map((item, i) => (
              <Link
                key={item.label}
                to={item.path}
                className={
                  i === 0
                    ? "btn btn-sm btn-outline-brand"
                    : "btn btn-sm btn-brand"
                }
              >
                {displayLabel(item.label)}
              </Link>
            ))}

            {/* Cart */}
            {cartItem && (
              <Link to={cartItem.path} className="btn btn-icon ms-1" aria-label="Cart">
                <ShoppingCart size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
