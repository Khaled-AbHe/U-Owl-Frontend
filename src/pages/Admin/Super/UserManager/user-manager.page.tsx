import {
  useUserManager,
  PAGE_SIZE,
  type RoleFilter,
  type SortKey,
} from "../../../../hooks/useUserManager.hook";
import { UserPlus } from "lucide-react";
import { CreateUserModal } from "../../../../components/SuperAdmin/UserManager/Forms/create-user-modal.component";
import { EditUserModal } from "../../../../components/SuperAdmin/UserManager/Forms/edit-user-modal.component";
import UserRow from "../../../../components/SuperAdmin/UserManager/user-row.component";
import Pagination from "../../../../components/SuperAdmin/General/pagination.component";
import { ManagerShell } from "../../../../components/SuperAdmin/General/Shells/manager-shell.component";
import { StatsBar } from "../../../../components/SuperAdmin/General/stats-bar.component";
import ManagerToolbar from "../../../../components/SuperAdmin/General/Toolbar/manager-toolbar.component";
import ManagerTable from "../../../../components/SuperAdmin/General/manager-table.component";
import ToolbarFilter from "../../../../components/SuperAdmin/General/Toolbar/toolbar-filter.component";
import { ROLE_FILTER_DATA, SORT_FILTER_DATA, USER_COLUMNS } from "./user-manager.constants";

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
        <StatsBar items={stats} />

        <ManagerToolbar search={search} setSearch={setSearch} setPage={setPage}>
          <ToolbarFilter
            options={ROLE_FILTER_DATA}
            filterKey={roleFilter}
            setFilter={(u) => setRoleFilter(u as RoleFilter)}
            setPage={setPage}
          />
          <ToolbarFilter
            options={SORT_FILTER_DATA}
            filterKey={sortBy}
            setFilter={(u) => setSortBy(u as SortKey)}
          />
        </ManagerToolbar>

        <ManagerTable columns={USER_COLUMNS}>
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
