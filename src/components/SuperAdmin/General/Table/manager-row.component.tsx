import type { ReactNode } from "react";

interface ManagerRowProps {
  grid: string;
  children: ReactNode;
}

/**
 * A single grid row inside ManagerTable.
 * Pass the same `grid` string produced by colsToGrid() so the
 * row columns always align with the header — no <colgroup> magic needed.
 */
export function ManagerRow({ grid, children }: ManagerRowProps) {
  return (
    <div
      className="border-bottom manager-row"
      style={{
        display: "grid",
        gridTemplateColumns: grid,
        alignItems: "center",
        minHeight: 52,
      }}
    >
      {children}
    </div>
  );
}
