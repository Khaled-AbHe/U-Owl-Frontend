interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <div
      className="d-flex align-items-start gap-2 py-2"
      style={{ borderBottom: "1px solid #f0f0f0" }}
    >
      <span className="text-secondary mt-1">{icon}</span>
      <div>
        <div
          className="text-secondary"
          style={{
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: ".04em",
          }}
        >
          {label}
        </div>
        <div className="fw-medium small text-truncate">{value}</div>
      </div>
    </div>
  );
}
