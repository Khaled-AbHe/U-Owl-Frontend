import type { ReactNode } from "react";

interface ColumnDef {
  label: string;
  width?: number | string;
}

interface ManagerTableProps {
  columns: ColumnDef[];
  children: ReactNode;
}

export default function ManagerTable({ columns, children }: ManagerTableProps) {
  return (
    <div className="bg-white rounded-3 border overflow-hidden" style={{ borderColor: "#f0f0f0" }}>
      <table className="table table-hover mb-0" style={{ tableLayout: "fixed" }}>
        <colgroup>
          {columns.map((col, i) =>
            col.width != null ? <col key={i} style={{ width: col.width }} /> : <col key={i} />,
          )}
        </colgroup>
        <thead className="table-light border-bottom">
          <tr>
            {columns.map((col) => (
              <th
                key={col.label}
                className="text-secondary fw-medium small py-2 ps-3"
                style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em" }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        {/* Body of the table is here */}
        {children}
      </table>
    </div>
  );
}
