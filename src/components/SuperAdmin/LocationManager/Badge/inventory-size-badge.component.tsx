import type { Location } from "../../../../types/location.entity";

interface Props {
  location: Location;
}

type SizeKey = "empty" | "small" | "medium" | "large";

const sizeStyles: Record<SizeKey, React.CSSProperties> = {
  empty:  { background: "#F1EFE8", color: "#5F5E5A" },
  small:  { background: "#E6F1FB", color: "#185FA5" },
  medium: { background: "#E1F5EE", color: "#0F6E56" },
  large:  { background: "#EEEDFE", color: "#534AB7" },
};

const sizeLabels: Record<SizeKey, string> = {
  empty:  "Empty",
  small:  "Small",
  medium: "Medium",
  large:  "Large",
};

function getSizeKey(count: number): SizeKey {
  if (count === 0) return "empty";
  if (count <= 3) return "small";
  if (count <= 7) return "medium";
  return "large";
}

export function InventorySizeBadge({ location }: Props) {
  const key = getSizeKey(location.inventory.length);
  const style = sizeStyles[key];

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
      {location.inventory.length} · {sizeLabels[key]}
    </span>
  );
}
