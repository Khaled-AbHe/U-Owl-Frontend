import { Shield, MapPin, User } from "lucide-react";
import { getRole } from "../../../../pages/Admin/Super/UserManager/user-manager.utils";
import type BadgeProps from "./badge-props.interface";
import { styles } from "./badge-color.constant";
import { StatusBadge } from "../../General/status-badge.component";

export function RoleBadge({ user }: BadgeProps) {
  const role = getRole(user);

  const icons: Record<string, React.ReactNode> = {
    "Super Admin": <Shield size={11} />,
    "Location Admin": <MapPin size={11} />,
    "Client": <User size={11} />,
  };

  return (
    <StatusBadge
      label={role}
      icon={icons[role]}
      style={{ ...styles[role], width: 120, textAlign: "center" }}
    />
  );
}
