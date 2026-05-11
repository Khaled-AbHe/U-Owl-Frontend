import {
  useUserManager,
  type RoleFilter,
  type SortKey,
} from "../../../../hooks/managers/useUserManager.hook";
import { UserPlus } from "lucide-react";
import { CreateUserModal } from "../../../../components/SuperAdmin/UserManager/Forms/create-user-modal.component";
import { EditUserModal } from "../../../../components/SuperAdmin/UserManager/Forms/edit-user-modal.component";
import UserRow from "../../../../components/SuperAdmin/UserManager/user-row.component";
import Pagination from "../../../../components/SuperAdmin/General/pagination.component";
import { ManagerShell } from "../../../../components/SuperAdmin/General/Shells/manager-shell.component";
import { StatsBar } from "../../../../components/SuperAdmin/General/Stats/stats-bar.component";
import ManagerToolbar from "../../../../components/SuperAdmin/General/Toolbar/manager-toolbar.component";
import ToolbarFilter from "../../../../components/SuperAdmin/General/Toolbar/toolbar-filter.component";
import { ROLE_FILTER_DATA, SORT_FILTER_DATA, USER_COLUMNS } from "./user-manager.constants";
import ManagerTable from "../../../../components/SuperAdmin/General/Table/manager-table.component";
import { LIST_SIZE } from "../manager.utils";

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
    currentPage,
    visibleRows,
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
        <StatsBar stats={stats} />

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
          {visibleRows.length === 0 ? (
            <div className="text-center text-secondary py-5" style={{ fontSize: 13 }}>
              No users match your search.
            </div>
          ) : (
            visibleRows.map((u, i) => (
              <UserRow
                key={u.userId}
                user={u}
                index={i}
                listSize={LIST_SIZE}
                currentPage={currentPage}
                currentUserId={currentUserId}
                onEdit={setEditingUser}
                onDelete={handleDelete}
              />
            ))
          )}
        </ManagerTable>

        {totalPages > 1 && (
          <Pagination
            listSize={LIST_SIZE}
            currentPage={currentPage}
            filtered={filtered}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </ManagerShell>
    </>
  );
}
