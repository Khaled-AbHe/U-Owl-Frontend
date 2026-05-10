import { StatCard } from "./stat-card.component";
import type { StatItem } from "./stat-item.interface";

interface StatsBarProps {
  stats: StatItem[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div
      className="mb-4"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
      }}
    >
      {stats.map((s) => (
        <StatCard stat={s} />
      ))}
    </div>
  );
}
