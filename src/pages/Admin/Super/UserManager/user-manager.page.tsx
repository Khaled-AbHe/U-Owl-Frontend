import { useUserManager, PAGE_SIZE } from "../../../../hooks/useUserManager.hook";
import { UserPlus, Search } from "lucide-react";
import { CreateUserModal } from "../../../../components/SuperAdmin/UserManager/Forms/create-user-modal.component";
import { EditUserModal } from "../../../../components/SuperAdmin/UserManager/Forms/edit-user-modal.component";
import UserRow from "../../../../components/SuperAdmin/UserManager/user-row.component";
import Pagination from "../../../../components/SuperAdmin/UserManager/pagination.component";
import type { RoleFilter, SortKey } from "../../../../hooks/useUserManager.hook";

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

      <div className="page">
        <div className="page-content">
          {/* Header */}
          <div className="d-flex align-items-start justify-content-between mb-4">
            <div>
              <h4 className="mb-1 fw-semibold">User Manager</h4>
              <p className="text-secondary small mb-0">Manage all accounts across the platform</p>
            </div>
            <button
              className="btn btn-sm btn-brand d-flex align-items-center gap-2"
              onClick={() => setShowCreateModal(true)}
            >
              <UserPlus size={15} />
              Create user
            </button>
          </div>

          {/* Stats */}
          <div className="row g-3 mb-4">
            {[
              { label: "Total users", value: stats.total },
              { label: "Clients", value: stats.clients },
              { label: "Location admins", value: stats.locAdmins },
              { label: "Super admins", value: stats.superAdmins },
            ].map((s) => (
              <div className="col-6 col-md-3" key={s.label}>
                <div className="bg-white rounded-3 p-3 border" style={{ borderColor: "#f0f0f0" }}>
                  <div className="text-secondary small mb-1">{s.label}</div>
                  <div className="fw-semibold" style={{ fontSize: 22 }}>
                    {s.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
            <div className="position-relative flex-grow-1" style={{ maxWidth: 280 }}>
              <Search
                size={14}
                className="position-absolute text-secondary"
                style={{ top: "50%", left: 10, transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                className="form-control form-control-sm"
                style={{ paddingLeft: 30 }}
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
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
          </div>

          {/* Table */}
          <div
            className="bg-white rounded-3 border overflow-hidden"
            style={{ borderColor: "#f0f0f0" }}
          >
            <table className="table table-hover mb-0" style={{ tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: 40 }} />
                <col />
                <col style={{ width: 150 }} />
                <col style={{ width: 80 }} />
                <col style={{ width: 90 }} />
              </colgroup>
              <thead className="table-light border-bottom">
                <tr>
                  {["#", "User", "Role", "ID", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="text-secondary fw-medium small py-2 ps-3"
                      style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
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
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              pageSize={PAGE_SIZE}
              safePage={safePage}
              filtered={filtered}
              totalPages={totalPages}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
