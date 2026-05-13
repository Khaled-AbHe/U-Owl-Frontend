import type { ReactNode } from "react";
import ManagerTableHeader from "./manager-table-header.component";

export interface ColumnDef {
  label: string;
  /** px number, CSS string (e.g. "2fr"), or omit for "1fr" */
  width?: number | string;
  /** Header text alignment — defaults to "center" */
  align?: "left" | "center" | "right";
}

interface ManagerTableProps {
  columns: ColumnDef[];
  children: ReactNode;
}

/** Converts a ColumnDef array into a CSS grid-template-columns string. */
export function colsToGrid(columns: ColumnDef[]): string {
  return columns
    .map((col) => {
      if (col.width == null) return "1fr";
      if (typeof col.width === "number") return `${col.width}px`;
      return col.width;
    })
    .join(" ");
}

export default function ManagerTable({ columns, children }: ManagerTableProps) {
  const grid = colsToGrid(columns);

  return (
    <div className="bg-white rounded-3 border overflow-hidden" style={{ borderColor: "#f0f0f0" }}>
      {/* Header row */}
      <div
        className="table-light border-bottom"
        style={{ display: "grid", gridTemplateColumns: grid, padding: "6px 0" }}
      >
        {columns.map((col) => (
          <ManagerTableHeader label={col.label} align={col.align} />
        ))}
      </div>

      {/* Body — each ManagerRow must receive and apply the same grid string */}
      <div>
        {children}
      </div>
    </div>
  );
}
