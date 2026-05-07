import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const DESKTOP_BREAKPOINT = 992;

export function useNavBar() {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when viewport becomes desktop-sized
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close mobile menu on route change instead of per-link onClick
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleSearch = () => setSearchOpen((o) => !o);
  const toggleMenu = () => setMenuOpen((o) => !o);

  return {
    searchOpen,
    searchQuery,
    setSearchQuery,
    menuOpen,
    toggleSearch,
    toggleMenu,
  };
}