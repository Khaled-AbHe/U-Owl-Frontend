import { getRole, getInitials } from "../../../../pages/Admin/Super/UserManager/user-manager.utils";
import type BadgeProps from "./badge-props.interface";

export function AvatarBadge({ user }: BadgeProps) {
  const role = getRole(user);
  const colorMap: Record<string, string> = {
    "Super Admin": "background:#EEEDFE; color:#3C3489",
    "Location Admin": "background:#E1F5EE; color:#085041",
    Client: "background:#E6F1FB; color:#0C447C",
  };
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
        ...Object.fromEntries(
          colorMap[role].split(";").map((s) => s.trim().split(": ") as [string, string]),
        ),
      }}
    >
      {getInitials(user)}
    </div>
  );
}
