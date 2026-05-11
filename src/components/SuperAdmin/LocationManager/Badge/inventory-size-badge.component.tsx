import type { Location } from "../../../../types/location.entity";
import { StatusBadge } from "../../General/status-badge.component";

interface Props {
  location: Location;
}

type SizeKey = "empty" | "small" | "medium" | "large";

const sizeStyles: Record<SizeKey, React.CSSProperties> = {
  empty: { background: "#F1EFE8", color: "#5F5E5A" },
  small: { background: "#E6F1FB", color: "#185FA5" },
  medium: { background: "#E1F5EE", color: "#0F6E56" },
  large: { background: "#EEEDFE", color: "#534AB7" },
};

const sizeLabels: Record<SizeKey, string> = {
  empty: "Empty",
  small: "Small",
  medium: "Medium",
  large: "Large",
};

function getSizeKey(count: number): SizeKey {
  if (count === 0) return "empty";
  if (count <= 3) return "small";
  if (count <= 7) return "medium";
  return "large";
}

export function InventorySizeBadge({ location }: Props) {
  const key = getSizeKey(location.inventory.length);
  return (
    <StatusBadge
      label={`${location.inventory.length} · ${sizeLabels[key]}`}
      style={sizeStyles[key]}
    />
  );
}
