import { Search, X } from "lucide-react";
import styles from "./NavBar.module.css";

interface NavSearchProps {
  isOpen: boolean;
  query: string;
  onToggle: () => void;
  onQueryChange: (value: string) => void;
  /** Renders the expanded input inline (desktop) vs. below the bar (mobile) */
}

export function NavSearch({
  isOpen,
  query,
  onToggle,
  onQueryChange,
}: NavSearchProps) {

  return (
    <>
      <div className={`${styles.navbarSearch} ${isOpen ? styles.navbarSearchOpen : ""}`}>
        <input
          type="search"
          className={styles.navbarSearchInput}
          placeholder="Search…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search"
          />
      </div>
      <button className={styles.btnIcon} onClick={onToggle} aria-label="Toggle search">
        {isOpen ? <X size={18} /> : <Search size={18} />}
      </button>
    </>
  );
}