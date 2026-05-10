import { useUserManager, PAGE_SIZE } from "../../../../hooks/useUserManager.hook";
import { UserPlus } from "lucide-react";
import { CreateUserModal } from "../../../../components/SuperAdmin/UserManager/Forms/create-user-modal.component";
import { EditUserModal } from "../../../../components/SuperAdmin/UserManager/Forms/edit-user-modal.component";
import UserRow from "../../../../components/SuperAdmin/UserManager/user-row.component";
import type { RoleFilter, SortKey } from "../../../../hooks/useUserManager.hook";
import Pagination from "../../../../components/SuperAdmin/pagination.component";
import { ManagerShell } from "../../../../components/SuperAdmin/manager-shell.component";
import { StatsBar } from "../../../../components/SuperAdmin/stats-bar.component";
import ManagerToolbar from "../../../../components/SuperAdmin/manager-toolbar.component";
import ManagerTable from "../../../../components/SuperAdmin/manager-table.component";

export default function UserManager() {
  const {
    showCreateModal,
    setShowCreateModal,
    editingUser,
    setEditingUser,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    sortBy,
    setSortBy,
    setPage,
    totalPages,
    safePage,
    slice,
    filtered,
    stats,
    currentUserId,
    handleDelete,
  } = useUserManager();

  return (
    <>
      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => setShowCreateModal(false)}
        />
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={() => setEditingUser(null)}
        />
      )}

      <ManagerShell
        title="User Manager"
        subtitle="Manage all accounts across the platform"
        addLabel="Create user"
        addIcon={<UserPlus size={15} />}
        onClickAdd={() => setShowCreateModal(true)}
      >
        <StatsBar
          items={[
            { label: "Total users", value: stats.total },
            { label: "Clients", value: stats.clients },
            { label: "Location admins", value: stats.locAdmins },
            { label: "Super admins", value: stats.superAdmins },
          ]}
        />

        <ManagerToolbar search={search} setSearch={setSearch} setPage={setPage}>
          <select
            className="form-select form-select-sm"
            style={{ width: "auto" }}
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value as RoleFilter);
              setPage(1);
            }}
          >
            <option value="">All roles</option>
            <option value="Client">Client</option>
            <option value="Location Admin">Location Admin</option>
            <option value="Super Admin">Super Admin</option>
          </select>
          <select
            className="form-select form-select-sm"
            style={{ width: "auto" }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
          >
            <option value="name">Sort: Name</option>
            <option value="id">Sort: ID</option>
            <option value="type">Sort: Role</option>
          </select>
        </ManagerToolbar>

        <ManagerTable
          columns={[
            { label: "#", width: 40 },
            { label: "ID" },
            { label: "User", width: 500 },
            { label: "Role", width: 350 },
            { label: "Actions", width: 100 },
          ]}
        >
          <tbody>
            {slice.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-secondary py-5"
                  style={{ fontSize: 13 }}
                >
                  No users match your search.
                </td>
              </tr>
            ) : (
              slice.map((u, i) => (
                <UserRow
                  key={u.userId}
                  user={u}
                  index={i}
                  pageSize={PAGE_SIZE}
                  safePage={safePage}
                  currentUserId={currentUserId}
                  onEdit={setEditingUser}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </ManagerTable>

        {totalPages > 1 && (
          <Pagination
            pageSize={PAGE_SIZE}
            safePage={safePage}
            filtered={filtered}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </ManagerShell>
    </>
  );
}
