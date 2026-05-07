import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";

export interface NavItem {
  label: string;
  path?: string;
}

interface NavLinksProps {
  items: NavItem[];
  className?: string;
  linkClassName?: string;
}

export function NavLinks({ items, className, linkClassName }: NavLinksProps) {
  const location = useLocation();

  return (
    <ul className={className}>
      {items.map((item) => {
        const active = item.path !== undefined && location.pathname === item.path;
        return (
          <li key={item.label}>
            <Link
              className={`${linkClassName} ${active ? styles.active : ""}`}
              to={item.path ?? "/"}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}