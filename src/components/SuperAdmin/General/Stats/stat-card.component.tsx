import type { StatItem } from "./stat-item.interface";

interface StatCardProps {
  stat: StatItem;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <div
      key={stat.label}
      className="d-flex flex-column bg-white rounded-3 p-3 border"
      style={{
        borderColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="text-primary h6 mb-1 d-flex gap-1" style={{ alignItems: "center" }}>
        <span className="stat-icon">
          <stat.icon size={20} />
        </span>
        {stat.label}
      </div>
      <div className="fw-semibold" style={{ fontSize: 22 }}>
        {stat.count}
      </div>
    </div>
  );
}
