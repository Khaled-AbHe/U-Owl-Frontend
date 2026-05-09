import { Shield, MapPin, User } from "lucide-react";
import { getRole } from "../../../../pages/Admin/Super/UserManager/user-manager.utils";
import type BadgeProps from "./badge-props.interface";

export function RoleBadge({ user }: BadgeProps) {
  const role = getRole(user);
  const styles: Record<string, React.CSSProperties> = {
    "Super Admin": { background: "#EEEDFE", color: "#534AB7" },
    "Location Admin": { background: "#E1F5EE", color: "#0F6E56" },
    Client: { background: "#E6F1FB", color: "#185FA5" },
  };
  const icons: Record<string, React.ReactNode> = {
    "Super Admin": <Shield size={11} />,
    "Location Admin": <MapPin size={11} />,
    Client: <User size={11} />,
  };

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
        ...styles[role],
      }}
    >
      {icons[role]}
      {role}
    </span>
  );
}
