import styles from "./NavBar.module.css";
import { type NavItem, NavLinks } from "./NavLinks";

interface MobileDrawerProps {
  isOpen: boolean;
  items: NavItem[];
  searchOpen: boolean;
  searchQuery: string;
  onSearchToggle: () => void;
  onSearchQueryChange: (value: string) => void;
}

export function MobileDrawer({
  isOpen,
  items,
}: MobileDrawerProps) {
  return (
    <div className={`${styles.mobileDrawer} ${isOpen ? styles.mobileDrawerOpen : ""}`}>
      <div className={`${styles.mobileDrawerInner} container-xl`}>
        <NavLinks
          items={items}
          className={styles.mobileNavRow}
          linkClassName={styles.mobileNavLink}
        />
      </div>
    </div>
  );
}