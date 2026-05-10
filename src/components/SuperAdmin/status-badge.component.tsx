import type { CSSProperties, ReactNode } from "react";

interface StatusBadgeProps {
  label: string;
  icon?: ReactNode;
  style: CSSProperties;
}

/**
 * Base pill badge used by all SuperAdmin manager badge components.
 * Handles all layout/typography — callers only supply label, icon, and colours.
 */
export function StatusBadge({ label, icon, style }: StatusBadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 9px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 500,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {icon}
      {label}
    </span>
  );
}
