import { Edit2, Trash2 } from "lucide-react";
import { AvatarBadge } from "./avatar-badge.component";
import { RoleBadge } from "./role-badge.component";
import type { User } from "../../../constants/interfaces/user.entity";

interface UserRowProps {
  user: User;
  index: number;
  pageSize: number;
  safePage: number;
  handleDelete: (user: User) => void;
}

export default function UserRow({ user, index, pageSize, safePage, handleDelete }: UserRowProps) {
  return (
    <tr key={user.userId}>
      <td className="text-secondary small ps-3" style={{ verticalAlign: "middle" }}>
        {(safePage - 1) * pageSize + index + 1}
      </td>

      <td style={{ verticalAlign: "middle", overflow: "hidden" }}>
        <div className="d-flex align-items-center gap-2">
          <AvatarBadge user={user} />
          <div style={{ minWidth: 0 }}>
            <div className="fw-medium small text-truncate">
              {user.name} {user.surname}
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
      <td className="text-secondary small" style={{ verticalAlign: "middle" }}>
        #{user.userId}
      </td>
      <td style={{ verticalAlign: "middle" }}>
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-light p-1"
            style={{ lineHeight: 1 }}
            title={`Edit ${user.name}`}
            aria-label={`Edit ${user.name}`}
          >
            <Edit2 size={13} />
          </button>
          <button
            className="btn btn-sm btn-light p-1 text-danger"
            style={{ lineHeight: 1 }}
            title={`Delete ${user.name}`}
            aria-label={`Delete ${user.name}`}
            onClick={() => handleDelete(user)}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}
