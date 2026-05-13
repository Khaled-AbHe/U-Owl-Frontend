export interface TableColumnProps {
  label: string;
  align?: "left" | "center" | "right";
}

export default function ManagerTableHeader({ label, align }: TableColumnProps) {
  return (
    <div
      key={label}
      className="text-primary fw-medium"
      style={{
        fontSize: 14,
        textTransform: "uppercase",
        letterSpacing: ".05em",
        textAlign: align ?? "center",
      }}
    >
      {label}
    </div>
  );
}
