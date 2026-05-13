import styles from "./NavBar.module.css";
import { type NavItem, NavLinks } from "./NavLinks";

interface MobileDrawerProps {
  isOpen: boolean;
  items: NavItem[];
}

export function MobileDrawer({ isOpen, items }: MobileDrawerProps) {
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
