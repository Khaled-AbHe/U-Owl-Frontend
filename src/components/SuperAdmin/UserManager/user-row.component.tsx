import { Edit2, Trash2 } from "lucide-react";
import type { User } from "../../../types/user.entity";
import { AvatarBadge } from "./Badge/avatar-badge.component";
import { RoleBadge } from "./Badge/role-badge.component";
import { USER_COLUMNS } from "../../../pages/Admin/Super/UserManager/user-manager.constants";
import { ManagerRow } from "../General/Table/manager-row.component";
import { colsToGrid } from "../General/Table/manager-table.component";

const GRID = colsToGrid(USER_COLUMNS);

interface UserRowProps {
  user: User;
  index: number;
  listSize: number;
  safePage: number;
  currentUserId: number;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserRow({
  user,
  index,
  listSize,
  safePage,
  currentUserId,
  onEdit,
  onDelete,
}: UserRowProps) {
  const isSelf = user.userId === currentUserId;

  return (
    <ManagerRow grid={GRID}>
      {/* # */}
      <div className="d-flex text-secondary small" style={{ justifyContent: "center" }}>
        {(safePage - 1) * listSize + index + 1}
      </div>

      {/* ID */}
      <div className="d-flex text-secondary small " style={{ justifyContent: "center" }}>
        #{user.userId}
      </div>

      {/* User */}
      <div
        className="d-flex align-items-center gap-2 "
        style={{ overflow: "hidden", justifyContent: "left" }}
      >
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

      {/* Role */}
      <div className="d-flex" style={{ justifyContent: "center" }}>
        <RoleBadge user={user} />
      </div>

      {/* Actions */}
      <div className="d-flex gap-1 " style={{ justifyContent: "center" }}>
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
    </ManagerRow>
  );
}
