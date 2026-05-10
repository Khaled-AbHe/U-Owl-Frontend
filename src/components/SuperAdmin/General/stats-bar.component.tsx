import type { LucideProps } from "lucide-react";

interface StatItem {
  label: string;
  value: number | string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

interface StatsBarProps {
  items: StatItem[];
}

export function StatsBar({ items }: StatsBarProps) {
  return (
    <div
      className="mb-4"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
      }}
    >
      {items.map((s) => (
        <div
          key={s.label}
          className="d-flex flex-column bg-white rounded-3 p-3 border"
          style={{
            borderColor: "#f0f0f0",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="text-primary h6 mb-1 d-flex gap-1" style={{ alignItems: "center" }}>
            <span className="stat-icon">
              <s.icon size={20} />
            </span>
            {s.label}
          </div>
          <div className="fw-semibold" style={{ fontSize: 22 }}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
