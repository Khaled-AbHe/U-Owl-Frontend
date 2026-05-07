import { ShoppingCart } from "lucide-react";
import { Form, Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import type { NavItem } from "./NavLinks";

interface NavActionsProps {
  user: { name: string } | null;
  cartItem: NavItem | undefined;
}

export function NavActions({ user, cartItem }: NavActionsProps) {
  return (
    <>
      {user ? (
        <Form method="POST" action="/auth/signOut">
          <button type="submit" className={styles.btnOutlineBrand}>
            Sign Out
          </button>
        </Form>
      ) : (
        <Link to="/auth/signIn" className={styles.btnOutlineBrand}>
          Sign In
        </Link>
      )}
      {cartItem?.path && (
        <Link to={cartItem.path} className={styles.btnIcon} aria-label="Cart">
          <ShoppingCart size={20} />
        </Link>
      )}
    </>
  );
}