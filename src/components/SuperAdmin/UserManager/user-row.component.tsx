import { Edit2, Trash2 } from "lucide-react";
import type { User } from "../../../types/user.entity";
import { AvatarBadge } from "./Badge/avatar-badge.component";
import { RoleBadge } from "./Badge/role-badge.component";

interface UserRowProps {
  user: User;
  index: number;
  pageSize: number;
  safePage: number;
  currentUserId: number;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserRow({
  user,
  index,
  pageSize,
  safePage,
  currentUserId,
  onEdit,
  onDelete,
}: UserRowProps) {
  const isSelf = user.userId === currentUserId;

  return (
    <tr>
      <td className="text-secondary small ps-3" style={{ verticalAlign: "middle" }}>
        {(safePage - 1) * pageSize + index + 1}
      </td>

      <td className="text-secondary small" style={{ verticalAlign: "middle" }}>
        #{user.userId}
      </td>

      <td style={{ verticalAlign: "middle", overflow: "hidden" }}>
        <div className="d-flex align-items-center gap-2">
          <AvatarBadge user={user} />
          <div style={{ minWidth: 0 }}>
            <div className="fw-medium small text-truncate">
              {user.name} {user.surname} {isSelf && "(You)"}
            </div>
            <div className="text-secondary text-truncate" style={{ fontSize: 12 }}>
              {user.email}
            </div>
          </div>
        </div>
      </td>

      <td style={{ verticalAlign: "middle" }}>
        <RoleBadge user={user} />
      </td>

      <td style={{ verticalAlign: "middle" }}>
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-light p-1"
            style={{ lineHeight: 1 }}
            title={`Edit ${user.name}`}
            aria-label={`Edit ${user.name}`}
            onClick={() => onEdit(user)}
          >
            <Edit2 size={13} />
          </button>
          <button
            className="btn btn-sm btn-light p-1 text-danger"
            style={{ lineHeight: 1 }}
            title={isSelf ? "You cannot delete your own account" : `Delete ${user.name}`}
            aria-label={`Delete ${user.name}`}
            onClick={() => onDelete(user)}
            disabled={isSelf}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}
