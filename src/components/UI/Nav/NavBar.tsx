import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useNavBar } from "../../../hooks/useNaveBar.hook";
import { MobileDrawer } from "./MobileDrawer";
import { NavActions } from "./NavActions";
import { type NavItem, NavLinks } from "./NavLinks";
import { NavSearch } from "./NavSearch";

/** Labels in routes.data.ts that belong in the main nav (excludes Cart, etc.) */
const NAV_ITEM_LABELS = new Set(["Home", "Vehicles", "Find Location", "Become A Dealer"]);

interface NavBarProps {
  imageSrcPath: string;
  navItems: NavItem[];
  user: { name: string } | null;
}

function NavBar({ imageSrcPath, navItems, user }: NavBarProps) {
  const { searchOpen, searchQuery, setSearchQuery, menuOpen, toggleSearch, toggleMenu } =
    useNavBar();

  const mainItems = navItems.filter((i) => NAV_ITEM_LABELS.has(i.label) && i.path !== undefined);
  const cartItem = navItems.find((i) => i.label === "Cart" && i.path !== undefined);

  return (
    <nav className={styles.navbarMain}>
      {/* ── Top bar ── */}
      <div className={`${styles.navbarTopbar} container-xl`}>
        <Link className={styles.navbarBrand} to="/">
          <img src={imageSrcPath} height="52" alt="U-Owl logo" />
        </Link>

        {/* Desktop nav links */}
        <NavLinks
          items={mainItems}
          className={styles.navbarNavDesktop}
          linkClassName={styles.navLinkCustom}
        />

        {/* Desktop right actions */}
        <div className={`${styles.navbarActions} ${styles.navbarActionsDesktop}`}>
          <NavSearch
            isOpen={searchOpen}
            query={searchQuery}
            onToggle={toggleSearch}
            onQueryChange={setSearchQuery}
          />
          <div className={styles.navbarDivider} />
          <NavActions user={user} cartItem={cartItem} />
        </div>

        {/* Mobile right actions + burger */}
        <div className={`${styles.navbarActions} ${styles.navbarActionsMobile}`}>
          <NavSearch
            isOpen={searchOpen}
            query={searchQuery}
            onToggle={toggleSearch}
            onQueryChange={setSearchQuery}
          />
          <NavActions user={user} cartItem={cartItem} />
          <button
            className={`${styles.btnIcon} ${styles.burgerBtn}`}
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <MobileDrawer
        isOpen={menuOpen}
        items={mainItems}
        searchOpen={searchOpen}
        searchQuery={searchQuery}
        onSearchToggle={toggleSearch}
        onSearchQueryChange={setSearchQuery}
      />
    </nav>
  );
}

export default NavBar;