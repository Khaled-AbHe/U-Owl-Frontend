import { getRole, getInitials } from "../../../../pages/Admin/Super/UserManager/user-manager.utils";
import { styles } from "./badge-color.constant";
import type BadgeProps from "./badge-props.interface";

export function AvatarBadge({ user }: BadgeProps) {
  const role = getRole(user);

  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 600,
        flexShrink: 0,
        ...styles[role],
      }}
    >
      {getInitials(user)}
    </div>
  );
}
