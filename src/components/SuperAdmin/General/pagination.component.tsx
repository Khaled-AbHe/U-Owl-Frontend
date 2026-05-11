import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  listSize: number;
  currentPage: number;
  filtered: any[];
  totalPages: number;
  setPage: (value: React.SetStateAction<number>) => void;
}

export default function Pagination({
  currentPage,
  listSize,
  filtered,
  totalPages,
  setPage,
}: PaginationProps) {
  return (
    <div className="d-flex align-items-center justify-content-between mt-3">
      <span className="text-secondary small">
        Showing {(currentPage - 1) * listSize + 1} -{" "}
        {Math.min(currentPage * listSize, filtered.length)} of {filtered.length}
      </span>
      <div className="d-flex gap-1">
        <button
          className="btn btn-sm btn-light"
          disabled={currentPage === 1}
          onClick={() => setPage((p) => p - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={14} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={`btn btn-sm ${p === currentPage ? "btn-brand" : "btn-light"}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
        <button
          className="btn btn-sm btn-light"
          disabled={currentPage === totalPages}
          onClick={() => setPage((p) => p + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
