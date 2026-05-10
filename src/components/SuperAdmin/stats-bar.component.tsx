import type { ReactNode } from "react";

interface StatItem {
  label: string;
  value: number | string;
  icon?: ReactNode;
}

interface StatsBarProps {
  items: StatItem[];
}

/**
 * Renders a row of stat cards (total counts, breakdowns, etc.).
 */
export function StatsBar({ items }: StatsBarProps) {
  return (
    <div className="row g-3 mb-4">
      {items.map((s) => (
        <div className="col-6 col-md-3" key={s.label}>
          <div className="bg-white rounded-3 p-3 border" style={{ borderColor: "#f0f0f0" }}>
            <div className="text-secondary small mb-1 d-flex align-items-center gap-1">
              {s.icon && <span className="stat-icon">{s.icon}</span>}
              {s.label}
            </div>
            <div className="fw-semibold" style={{ fontSize: 22 }}>
              {s.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
