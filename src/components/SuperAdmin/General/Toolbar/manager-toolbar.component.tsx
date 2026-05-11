import { Search } from "lucide-react";
import type { ReactNode } from "react";

interface ManagerToolbarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  children: ReactNode;
}

export default function ManagerToolbar({
  search,
  setSearch,
  setPage,
  children,
}: ManagerToolbarProps) {
  return (
    <>
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <div className="position-relative flex-grow-1" style={{ maxWidth: 280 }}>
          <Search
            size={14}
            className="position-absolute text-secondary"
            style={{ top: "50%", left: 10, transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            className="form-control form-control-sm"
            style={{ paddingLeft: 30 }}
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        {children}
      </div>
    </>
  );
}
